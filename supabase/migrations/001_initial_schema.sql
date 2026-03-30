-- ============================================================
-- RENTPROOF - SUPABASE DATABASE SCHEMA
-- Version: 1.0.0
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================================
-- TABLE 1: profiles
-- Extends auth.users with role and contact info
-- ============================================================
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text not null,
  role          text not null check (role in ('tenant', 'landlord', 'agent')),
  phone         text,
  company_name  text,                          -- For agents
  avatar_url    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ============================================================
-- TABLE 2: properties
-- ============================================================
create table public.properties (
  id            uuid primary key default uuid_generate_v4(),
  address_line1 text not null,
  address_line2 text,
  city          text not null,
  postcode      text not null,
  country       text not null default 'GB',
  landlord_id   uuid not null references public.profiles(id) on delete restrict,
  agent_id      uuid references public.profiles(id) on delete set null,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ============================================================
-- TABLE 3: tenancies
-- Links tenant to a property with rent terms
-- ============================================================
create table public.tenancies (
  id            uuid primary key default uuid_generate_v4(),
  tenant_id     uuid not null references public.profiles(id) on delete restrict,
  property_id   uuid not null references public.properties(id) on delete restrict,
  start_date    date not null,
  end_date      date,
  rent_amount   numeric(10, 2) not null,
  currency      text not null default 'GBP',
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  -- A tenant can only have one active tenancy per property
  constraint unique_active_tenancy unique (tenant_id, property_id, is_active)
);

-- ============================================================
-- TABLE 4: rent_payments
-- Core receipt record
-- ============================================================
create table public.rent_payments (
  id                  uuid primary key default uuid_generate_v4(),
  tenancy_id          uuid not null references public.tenancies(id) on delete restrict,
  receipt_id          text unique not null,         -- e.g. RP-2026-GB-00391
  rent_period_start   date not null,
  rent_period_end     date not null,
  amount              numeric(10, 2) not null,
  currency            text not null default 'GBP',
  payment_method      text not null check (payment_method in ('bank_transfer', 'cash', 'standing_order', 'cheque', 'other')),
  payment_reference   text,                         -- Bank reference or note
  status              text not null default 'pending' check (status in ('draft', 'pending', 'verified', 'disputed', 'expired')),
  evidence_url        text,                         -- Optional upload (bank screenshot etc.)
  notes               text,
  pdf_url             text,                         -- Generated receipt PDF
  confirmation_token  text unique,                  -- Secure token for landlord link
  token_expires_at    timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  constraint valid_period check (rent_period_end >= rent_period_start),
  constraint positive_amount check (amount > 0)
);

-- ============================================================
-- TABLE 5: confirmations
-- Landlord confirmation log
-- ============================================================
create table public.confirmations (
  id               uuid primary key default uuid_generate_v4(),
  rent_payment_id  uuid not null references public.rent_payments(id) on delete cascade,
  confirmed_by     uuid not null references public.profiles(id) on delete restrict,
  confirmed_at     timestamptz not null default now(),
  ip_address       inet,
  user_agent       text,
  created_at       timestamptz not null default now(),
  -- Only one confirmation per payment
  constraint unique_payment_confirmation unique (rent_payment_id)
);

-- ============================================================
-- TABLE 6: disputes
-- If landlord disputes or tenant raises a dispute
-- ============================================================
create table public.disputes (
  id               uuid primary key default uuid_generate_v4(),
  rent_payment_id  uuid not null references public.rent_payments(id) on delete cascade,
  raised_by        uuid not null references public.profiles(id) on delete restrict,
  reason           text not null,
  evidence_url     text,
  status           text not null default 'open' check (status in ('open', 'resolved', 'escalated')),
  resolved_at      timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ============================================================
-- TABLE 7: audit_logs
-- Tamper-resistant action log for legal admissibility
-- ============================================================
create table public.audit_logs (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references public.profiles(id) on delete set null,
  action      text not null,                        -- CREATE_RECEIPT, CONFIRM_PAYMENT, etc.
  target_id   uuid,                                 -- Affected record ID
  target_type text,                                 -- 'rent_payment', 'tenancy', etc.
  metadata    jsonb,                                -- Additional context
  ip_address  inet,
  created_at  timestamptz not null default now()
);

-- Audit logs are append-only — no update/delete
alter table public.audit_logs enable row level security;

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_properties_landlord on public.properties(landlord_id);
create index idx_properties_agent on public.properties(agent_id);
create index idx_tenancies_tenant on public.tenancies(tenant_id);
create index idx_tenancies_property on public.tenancies(property_id);
create index idx_rent_payments_tenancy on public.rent_payments(tenancy_id);
create index idx_rent_payments_receipt_id on public.rent_payments(receipt_id);
create index idx_rent_payments_status on public.rent_payments(status);
create index idx_rent_payments_token on public.rent_payments(confirmation_token);
create index idx_confirmations_payment on public.confirmations(rent_payment_id);
create index idx_audit_logs_user on public.audit_logs(user_id);
create index idx_audit_logs_target on public.audit_logs(target_id);
create index idx_audit_logs_created on public.audit_logs(created_at desc);

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Auto-update updated_at timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Generate receipt ID in format RP-YYYY-CC-NNNNN
create or replace function public.generate_receipt_id(country_code text default 'GB')
returns text as $$
declare
  year_part text;
  seq_part  text;
  new_id    text;
  counter   int := 0;
begin
  year_part := to_char(now(), 'YYYY');
  loop
    seq_part := lpad(floor(random() * 99999 + 1)::text, 5, '0');
    new_id := 'RP-' || year_part || '-' || upper(country_code) || '-' || seq_part;
    -- Check uniqueness
    if not exists (select 1 from public.rent_payments where receipt_id = new_id) then
      return new_id;
    end if;
    counter := counter + 1;
    if counter > 100 then
      raise exception 'Could not generate unique receipt ID after 100 attempts';
    end if;
  end loop;
end;
$$ language plpgsql security definer;

-- Generate secure confirmation token
create or replace function public.generate_confirmation_token()
returns text as $$
begin
  return encode(gen_random_bytes(32), 'hex');
end;
$$ language plpgsql security definer;

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'tenant')
  );
  return new;
end;
$$ language plpgsql security definer;

-- ============================================================
-- TRIGGERS
-- ============================================================
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger properties_updated_at
  before update on public.properties
  for each row execute procedure public.handle_updated_at();

create trigger tenancies_updated_at
  before update on public.tenancies
  for each row execute procedure public.handle_updated_at();

create trigger rent_payments_updated_at
  before update on public.rent_payments
  for each row execute procedure public.handle_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.tenancies enable row level security;
alter table public.rent_payments enable row level security;
alter table public.confirmations enable row level security;
alter table public.disputes enable row level security;

-- ---------- profiles ----------
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Agents can view tenant/landlord profiles they work with
create policy "Agents can view related profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.properties p
      join public.tenancies t on t.property_id = p.id
      where p.agent_id = auth.uid()
      and (t.tenant_id = profiles.id or p.landlord_id = profiles.id)
    )
  );

-- ---------- properties ----------
create policy "Landlords can manage their properties"
  on public.properties for all
  using (landlord_id = auth.uid());

create policy "Agents can view their managed properties"
  on public.properties for select
  using (agent_id = auth.uid());

create policy "Tenants can view properties they rent"
  on public.properties for select
  using (
    exists (
      select 1 from public.tenancies t
      where t.property_id = properties.id
      and t.tenant_id = auth.uid()
    )
  );

-- ---------- tenancies ----------
create policy "Tenants can view their tenancies"
  on public.tenancies for select
  using (tenant_id = auth.uid());

create policy "Landlords can view tenancies on their properties"
  on public.tenancies for select
  using (
    exists (
      select 1 from public.properties p
      where p.id = tenancies.property_id
      and p.landlord_id = auth.uid()
    )
  );

create policy "Landlords can create tenancies on their properties"
  on public.tenancies for insert
  with check (
    exists (
      select 1 from public.properties p
      where p.id = property_id
      and p.landlord_id = auth.uid()
    )
  );

create policy "Agents can view tenancies on their properties"
  on public.tenancies for select
  using (
    exists (
      select 1 from public.properties p
      where p.id = tenancies.property_id
      and p.agent_id = auth.uid()
    )
  );

-- ---------- rent_payments ----------
create policy "Tenants can create their own rent payments"
  on public.rent_payments for insert
  with check (
    exists (
      select 1 from public.tenancies t
      where t.id = tenancy_id
      and t.tenant_id = auth.uid()
    )
  );

create policy "Tenants can view their own rent payments"
  on public.rent_payments for select
  using (
    exists (
      select 1 from public.tenancies t
      where t.id = rent_payments.tenancy_id
      and t.tenant_id = auth.uid()
    )
  );

create policy "Landlords can view payments on their properties"
  on public.rent_payments for select
  using (
    exists (
      select 1 from public.tenancies t
      join public.properties p on p.id = t.property_id
      where t.id = rent_payments.tenancy_id
      and p.landlord_id = auth.uid()
    )
  );

create policy "Agents can view payments on their properties"
  on public.rent_payments for select
  using (
    exists (
      select 1 from public.tenancies t
      join public.properties p on p.id = t.property_id
      where t.id = rent_payments.tenancy_id
      and p.agent_id = auth.uid()
    )
  );

-- ---------- confirmations ----------
create policy "Landlords can create confirmations"
  on public.confirmations for insert
  with check (confirmed_by = auth.uid());

create policy "Both parties can view confirmations"
  on public.confirmations for select
  using (
    exists (
      select 1 from public.rent_payments rp
      join public.tenancies t on t.id = rp.tenancy_id
      join public.properties p on p.id = t.property_id
      where rp.id = confirmations.rent_payment_id
      and (t.tenant_id = auth.uid() or p.landlord_id = auth.uid())
    )
  );

-- ---------- audit_logs ----------
create policy "Users can view their own audit logs"
  on public.audit_logs for select
  using (user_id = auth.uid());

create policy "Audit logs are insert-only"
  on public.audit_logs for insert
  with check (true);

-- ============================================================
-- STORAGE BUCKETS (run via Supabase dashboard or API)
-- ============================================================
-- bucket: rent-evidence   (tenant payment screenshots)
-- bucket: rent-receipts   (generated PDFs)
-- Both should have authenticated read, owner write

-- ============================================================
-- SEED DATA (optional — for development)
-- ============================================================
-- Insert test data via application layer to respect auth.users constraint
