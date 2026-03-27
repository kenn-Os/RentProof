# RentProof

> Neutral Rent Payment Verification Platform

RentProof generates legally structured, time-stamped, mutually confirmed rent receipts — independent of banks. It acts as a rent-proof utility layer between tenants, landlords, and letting agents.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| Backend | Supabase (PostgreSQL + Auth + Storage) |
| PDF Generation | jsPDF + jsPDF-autotable |
| Hosting | Vercel (recommended) |
| Auth | Supabase Auth (email/password + magic link) |

---

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd rentproof
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor**
3. Run the schema: `supabase/migrations/001_initial_schema.sql`
4. Create storage buckets:
   - `rent-evidence` (private, authenticated read)
   - `rent-receipts` (private, authenticated read)

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Fill in your values:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
rentproof/
├── app/
│   ├── auth/
│   │   ├── signin/page.tsx          # Sign in page
│   │   ├── signup/page.tsx          # Sign up (with role selection)
│   │   ├── callback/route.ts        # Auth callback for magic links
│   │   └── actions.ts               # Server actions: signIn, signUp, signOut
│   ├── dashboard/
│   │   ├── layout.tsx               # Dashboard shell (sidebar + auth guard)
│   │   ├── page.tsx                 # Redirects to role dashboard
│   │   ├── actions.ts               # Payment server actions
│   │   ├── tenant/
│   │   │   ├── page.tsx             # Tenant overview
│   │   │   └── payments/
│   │   │       ├── page.tsx         # Payment history
│   │   │       └── new/page.tsx     # Record new payment
│   │   ├── landlord/
│   │   │   ├── page.tsx             # Landlord overview
│   │   │   ├── confirmations/       # Pending confirmations
│   │   │   └── properties/          # Property management
│   │   └── agent/
│   │       ├── page.tsx             # Agent overview
│   │       ├── tenants/             # Tenant management
│   │       └── reports/             # Bulk reporting
│   ├── verify/
│   │   ├── [receiptId]/page.tsx     # Public receipt verification
│   │   └── confirm/[token]/page.tsx # Landlord confirmation page
│   ├── layout.tsx                   # Root layout (fonts, Toaster)
│   ├── page.tsx                     # Landing/marketing page
│   └── globals.css                  # Tailwind + custom styles
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── FormFields.tsx           # Input, Select, Textarea
│   │   └── StatusBadge.tsx
│   └── dashboard/
│       ├── Sidebar.tsx              # Role-aware navigation
│       └── StatCard.tsx             # KPI metric cards
├── lib/
│   ├── supabase/
│   │   ├── client.ts                # Browser client
│   │   └── server.ts                # Server client + admin client
│   ├── types/
│   │   └── database.ts              # Full TypeScript types
│   └── utils/
│       ├── index.ts                 # cn, formatters, helpers
│       └── pdf-generator.ts         # jsPDF receipt generation
├── middleware.ts                     # Auth + role-based routing
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql   # Full DB schema + RLS
```

---

## Database Schema

| Table | Purpose |
|-------|---------|
| `profiles` | Extends auth.users with role (tenant/landlord/agent) |
| `properties` | Properties owned by landlords |
| `tenancies` | Links tenant to property with rent terms |
| `rent_payments` | Core receipt record (status, receipt ID, token) |
| `confirmations` | Landlord confirmation log with timestamp |
| `disputes` | Dispute records with evidence |
| `audit_logs` | Append-only tamper-resistant action log |

---

## Receipt Flow

```
Tenant creates payment → receipt_id generated (e.g. RP-2026-GB-04821)
                       → confirmation_token generated
                       → status: "pending"

Tenant shares confirmation URL with landlord
  └── /verify/confirm/{token}

Landlord clicks → reviews payment details → clicks "Confirm"
               → status → "verified"
               → confirmation record created with timestamp
               → both parties can download PDF
```

---

## Receipt ID Format

```
RP-{YEAR}-{COUNTRY}-{5-DIGIT-SEQ}
e.g. RP-2026-GB-04821
     RP-2026-NG-00103
```

Generated server-side via PostgreSQL function with uniqueness check.

---

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard.

### Supabase Configuration

1. Set **Site URL** in Supabase Auth settings to your Vercel URL
2. Add redirect URL: `https://your-domain.com/auth/callback`
3. Configure email templates for magic links

---

## Receipt PDF

The `lib/utils/pdf-generator.ts` utility generates professional A4 PDFs using jsPDF. It includes:

- RentProof branded header
- Receipt ID with unique format
- Status badge (Verified/Pending)
- Full payment details table
- Landlord confirmation block
- Legal disclaimer footer

Call `downloadReceiptPDF(data)` from any client component after fetching the payment data.

---

## Legal Positioning

RentProof is a **documentation utility**. It does NOT:
- Hold money
- Act as escrow
- Replace tenancy agreements
- Provide legal advice

It provides structured, neutral documentation of rent payment activity. This design avoids financial regulation complexity while providing maximum evidentiary value.

---

## Roadmap

- [ ] Automated email/SMS confirmation dispatch (Resend / Twilio)
- [ ] Multi-currency support (NGN, USD, EUR)
- [ ] Rent credit scoring integration
- [ ] Stripe billing integration
- [ ] Referencing agency API
- [ ] Deposit record logs
- [ ] Arrears tracking
- [ ] Multi-language (Yoruba, Igbo, Hausa)

---

## Licence

Private — all rights reserved.
