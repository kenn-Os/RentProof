import Link from 'next/link'
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  PoundSterling,
  CreditCard,
  MapPin,
  Shield,
} from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { formatCurrency, formatDate, formatRentPeriod, formatPaymentMethod } from '@/lib/utils'

interface Props {
  params: Promise<{ receiptId: string }>
}

export async function generateMetadata({ params }: Props) {
  const { receiptId } = await params
  return {
    title: `Receipt ${receiptId} | RentProof`,
    robots: 'noindex',    // Keep receipts out of search results
  }
}

export default async function PublicReceiptPage({ params }: Props) {
  const { receiptId } = await params

  // Mock data for UI prototype
  const payment = {
    receipt_id: receiptId,
    status: 'verified',
    rent_period_start: '2024-03-01',
    rent_period_end: '2024-03-31',
    amount: 1200.00,
    currency: 'GBP',
    payment_method: 'bank_transfer',
    created_at: '2024-04-01T10:00:00Z',
    tenancy: {
      property: {
        city: 'London',
        postcode: 'NW1 6XE',
        country: 'GB'
      }
    },
    confirmation: {
      confirmed_at: '2024-04-02T14:30:00Z'
    }
  }

  const isVerified = payment.status === 'verified'
  const isPending = payment.status === 'pending'

  const property = payment.tenancy?.property
  const confirmation = payment.confirmation

  return (
    <div className="min-h-screen bg-paper-100 flex flex-col">
      {/* ── Nav ──────────────────────────────────────────── */}
      <nav className="border-b border-ink-900/10 bg-paper-50/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo iconOnly size="sm" />
            <span className="font-display text-sm font-bold uppercase tracking-widest text-ink-900">
              RentProof
            </span>
          </Link>
          <div className="hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400 font-mono">
            RECEIPT-VERIFICATION-v1.02
          </div>
        </div>
      </nav>

      <main className="flex-1 mx-auto w-full max-w-2xl px-6 py-16">
        {/* Status banner */}
        <div
          className={`mb-12 flex items-center gap-4 border p-6 ${
            isVerified
              ? 'border-brand-600/20 bg-brand-50/50'
              : isPending
              ? 'border-amber-600/20 bg-amber-50/50'
              : 'border-red-600/20 bg-red-50/50'
          }`}
        >
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center border-2 ${
              isVerified
                ? 'border-brand-600 bg-brand-600/10'
                : isPending
                ? 'border-amber-600 bg-amber-600/10'
                : 'border-red-600 bg-red-600/10'
            }`}
          >
            {isVerified ? (
              <CheckCircle2 className="h-6 w-6 text-brand-600" />
            ) : isPending ? (
              <Clock className="h-6 w-6 text-amber-600" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-red-600" />
            )}
          </div>
          <div className="flex-1">
            <p
              className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1 ${
                isVerified
                  ? 'text-brand-600'
                  : isPending
                  ? 'text-amber-600'
                  : 'text-red-600'
              }`}
            >
              Protocol Status: {isVerified ? 'Verified' : isPending ? 'Pending' : 'Disputed'}
            </p>
            <p className="text-sm font-bold text-ink-900 uppercase tracking-wide">
              {isVerified
                ? `Confirmed by landlord on ${formatDate(confirmation?.confirmed_at ?? '')}`
                : isPending
                ? 'Timestamped declaration recorded. Awaiting validation.'
                : 'A dispute has been raised on this declaration.'}
            </p>
          </div>
        </div>

        {/* Receipt card */}
        <div className="relative overflow-hidden bg-paper-50 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-ink-900/10 p-1">
          <div className="border border-ink-900/5">
            {/* Receipt header */}
            <div className="border-b border-ink-900/10 bg-ink-900 p-6 sm:p-10 text-center">
              <div className="mb-8 inline-flex items-center gap-2 border border-paper-50/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-paper-50/40 font-mono">
                RP-PROTOCOL-RECORD
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-paper-50/60 mb-2">
                Rent Payment Declaration
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold italic tracking-tight text-paper-50">
                {formatRentPeriod(
                  payment.rent_period_start,
                  payment.rent_period_end
                )}
              </h2>
            </div>
  
            {/* Receipt details */}
            <div className="p-6 sm:p-10">
              <div className="receipt-id-chip mb-12 inline-flex items-center gap-3 border border-ink-900/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-ink-900 font-mono">
                <Shield className="h-3 w-3 text-brand-600" />
                {payment.receipt_id}
              </div>
  
              <div className="grid gap-10 sm:grid-cols-2 mb-12">
                <div className="flex items-start gap-4">
                  <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-ink-300" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">Period Covered</p>
                    <p className="text-sm font-bold text-ink-900 uppercase tracking-widest">
                      {formatRentPeriod(
                        payment.rent_period_start,
                        payment.rent_period_end
                      )}
                    </p>
                  </div>
                </div>
  
                <div className="flex items-start gap-4">
                  <PoundSterling className="mt-0.5 h-4 w-4 shrink-0 text-ink-300" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">Total Amount</p>
                    <p className="font-display text-xl sm:text-2xl font-bold text-ink-900">
                      {formatCurrency(payment.amount, payment.currency)}
                    </p>
                  </div>
                </div>
  
                <div className="flex items-start gap-4">
                  <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-ink-300" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">Payment Channel</p>
                    <p className="text-sm font-bold text-ink-900 uppercase tracking-widest">
                      {formatPaymentMethod(payment.payment_method)}
                    </p>
                  </div>
                </div>
  
                {property && (
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-300" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">Archive Address</p>
                      <p className="text-sm font-bold text-ink-900 uppercase tracking-widest">
                        {property.city}, {property.postcode}
                      </p>
                      <p className="text-[10px] font-bold text-ink-400 uppercase tracking-widest mt-0.5">{property.country}</p>
                    </div>
                  </div>
                )}
              </div>
  
              <div className="border-t border-ink-900/10 pt-10">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">Created Date</p>
                    <p className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">
                      {formatDate(payment.created_at, 'dd MMM yyyy, HH:mm')} UTC
                    </p>
                  </div>
                  {isVerified && confirmation && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">Validation Date</p>
                      <p className="text-[10px] font-bold text-brand-600 uppercase tracking-widest">
                        {formatDate(confirmation.confirmed_at, 'dd MMM yyyy, HH:mm')} UTC
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
  
            {/* Fine print */}
            <div className="border-t border-ink-900/10 bg-paper-100 p-8 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400 leading-relaxed max-w-sm mx-auto">
                Official Protocol Record <span className="font-mono opacity-50 px-2">{"//"}</span> Generated by RentProof independent 
                verification platform.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 mb-20 flex items-center justify-center gap-6">
          <Link
            href="/verify"
            className="text-[10px] font-bold uppercase tracking-widest text-ink-600 hover:text-ink-900 transition-colors"
          >
            ← New Audit
          </Link>
          <div className="h-1 w-1 bg-ink-200 rounded-full" />
          <Link
            href="/"
            className="text-[10px] font-bold uppercase tracking-widest text-ink-600 hover:text-ink-900 transition-colors"
          >
            Close Session
          </Link>
        </div>
      </main>

      {/* ── Institutional Footer ───────────────────────────────── */}
      <footer className="border-t border-ink-900/10 py-10 bg-paper-100">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400">
            RentProof Verification Protocol <span className="font-mono opacity-50 px-2">{"//"}</span> v1.02
          </p>
          <div className="flex gap-8">
            <Link href="/terms-of-service" className="text-[10px] font-bold uppercase tracking-widest text-ink-500 hover:text-ink-900 transition-colors">Terms of Service</Link>
            <Link href="/privacy-policy" className="text-[10px] font-bold uppercase tracking-widest text-ink-500 hover:text-ink-900 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
