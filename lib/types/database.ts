export type UserRole = 'tenant' | 'landlord' | 'agent'

export type PaymentMethod = 'bank_transfer' | 'cash' | 'standing_order' | 'cheque' | 'other'

export type PaymentStatus = 'draft' | 'pending' | 'verified' | 'disputed' | 'expired'

export type DisputeStatus = 'open' | 'resolved' | 'escalated'

export type AuditAction =
  | 'CREATE_RECEIPT'
  | 'CONFIRM_PAYMENT'
  | 'DISPUTE_RAISED'
  | 'DISPUTE_RESOLVED'
  | 'PDF_GENERATED'
  | 'TOKEN_SENT'
  | 'PROPERTY_CREATED'
  | 'TENANCY_CREATED'
  | 'PROFILE_UPDATED'

export interface Profile {
  id: string
  full_name: string
  role: UserRole
  phone: string | null
  company_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Property {
  id: string
  address_line1: string
  address_line2: string | null
  city: string
  postcode: string
  country: string
  landlord_id: string
  agent_id: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  // Joined
  landlord?: Profile
  agent?: Profile
}

export interface Tenancy {
  id: string
  tenant_id: string
  property_id: string
  start_date: string
  end_date: string | null
  rent_amount: number
  currency: string
  is_active: boolean
  created_at: string
  updated_at: string
  // Joined
  tenant?: Profile
  property?: Property
  rent_payments?: RentPayment[]
}

export interface RentPayment {
  id: string
  tenancy_id: string
  receipt_id: string
  rent_period_start: string
  rent_period_end: string
  amount: number
  currency: string
  payment_method: PaymentMethod
  payment_reference: string | null
  status: PaymentStatus
  evidence_url: string | null
  notes: string | null
  pdf_url: string | null
  confirmation_token: string | null
  token_expires_at: string | null
  created_at: string
  updated_at: string
  // Joined
  tenancy?: Tenancy
  confirmation?: Confirmation
}

export interface Confirmation {
  id: string
  rent_payment_id: string
  confirmed_by: string
  confirmed_at: string
  ip_address: string | null
  user_agent: string | null
  created_at: string
  // Joined
  confirmed_by_profile?: Profile
}

export interface Dispute {
  id: string
  rent_payment_id: string
  raised_by: string
  reason: string
  evidence_url: string | null
  status: DisputeStatus
  resolved_at: string | null
  created_at: string
  updated_at: string
}

export interface AuditLog {
  id: string
  user_id: string | null
  action: AuditAction | string
  target_id: string | null
  target_type: string | null
  metadata: Record<string, unknown> | null
  ip_address: string | null
  created_at: string
}

// ============================================================
// FORM TYPES
// ============================================================

export interface CreatePaymentForm {
  tenancy_id: string
  rent_period_start: string
  rent_period_end: string
  amount: number
  payment_method: PaymentMethod
  payment_reference?: string
  notes?: string
  evidence_file?: File
}

export interface CreatePropertyForm {
  address_line1: string
  address_line2?: string
  city: string
  postcode: string
  country: string
}

export interface CreateTenancyForm {
  property_id: string
  tenant_email: string
  start_date: string
  end_date?: string
  rent_amount: number
  currency: string
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

export interface ApiResponse<T = unknown> {
  data: T | null
  error: string | null
}

export interface PublicReceiptView {
  receipt_id: string
  status: PaymentStatus
  rent_period_start: string
  rent_period_end: string
  amount: number
  currency: string
  payment_method: PaymentMethod
  created_at: string
  confirmed_at: string | null
  property_city: string
  property_postcode: string
  property_country: string
}

// ============================================================
// DASHBOARD STATS TYPES
// ============================================================

export interface TenantStats {
  total_payments: number
  verified_payments: number
  pending_payments: number
  total_paid: number
  currency: string
}

export interface LandlordStats {
  total_properties: number
  total_tenancies: number
  pending_confirmations: number
  total_receipts: number
}

export interface AgentStats {
  total_properties: number
  total_tenants: number
  pending_confirmations: number
  monthly_receipts: number
}
