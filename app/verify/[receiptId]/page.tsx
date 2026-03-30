import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  PoundSterling,
  CreditCard,
  MapPin,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
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
  const supabase = await createClient()

  // Public query — limited fields only (RLS enforces no personal data)
  const { data: payment } = await supabase
    .from('rent_payments')
    .select(
      `
      receipt_id,
      status,
      rent_period_start,
      rent_period_end,
      amount,
      currency,
      payment_method,
      created_at,
      tenancy:tenancies(
        property:properties(city, postcode, country)
      ),
      confirmation:confirmations(confirmed_at)
    `
    )
    .eq('receipt_id', receiptId)
    .single()

  if (!payment) notFound()

  const isVerified = payment.status === 'verified'
  const isPending = payment.status === 'pending'

  const property = (payment.tenancy as unknown as { property: { city: string, postcode: string, country: string } })?.property
  const confirmation = Array.isArray(payment.confirmation)
    ? payment.confirmation[0]
    : payment.confirmation

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-semibold text-slate-900">
              RentProof
            </span>
          </Link>
          <span className="text-xs text-slate-400">
            Public receipt verification
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-10">
        {/* Status banner */}
        <div
          className={`mb-6 flex items-center gap-3 rounded-xl border p-4 ${
            isVerified
              ? 'border-green-200 bg-green-50'
              : isPending
              ? 'border-amber-200 bg-amber-50'
              : 'border-red-200 bg-red-50'
          }`}
        >
          <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
              isVerified
                ? 'bg-green-100'
                : isPending
                ? 'bg-amber-100'
                : 'bg-red-100'
            }`}
          >
            {isVerified ? (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            ) : isPending ? (
              <Clock className="h-5 w-5 text-amber-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-600" />
            )}
          </div>
          <div>
            <p
              className={`font-semibold ${
                isVerified
                  ? 'text-green-900'
                  : isPending
                  ? 'text-amber-900'
                  : 'text-red-900'
              }`}
            >
              {isVerified
                ? 'Payment Verified'
                : isPending
                ? 'Awaiting Landlord Confirmation'
                : 'Payment Disputed'}
            </p>
            <p
              className={`text-sm ${
                isVerified
                  ? 'text-green-700'
                  : isPending
                  ? 'text-amber-700'
                  : 'text-red-700'
              }`}
            >
              {isVerified
                ? `Confirmed by landlord on ${formatDate(confirmation?.confirmed_at ?? '')}`
                : isPending
                ? 'Timestamped declaration recorded. Landlord confirmation pending.'
                : 'A dispute has been raised on this payment.'}
            </p>
          </div>
        </div>

        {/* Receipt card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Receipt header */}
          <div className="border-b border-slate-100 bg-slate-900 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                  Rent Payment Receipt
                </p>
                <p className="mt-1 font-display text-xl font-bold text-white">
                  {formatRentPeriod(
                    payment.rent_period_start,
                    payment.rent_period_end
                  )}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl font-bold text-white">
                  {formatCurrency(payment.amount, payment.currency)}
                </p>
              </div>
            </div>
          </div>

          {/* Receipt details */}
          <div className="divide-y divide-slate-50 p-6">
            <div className="receipt-id-chip mb-4 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-slate-700">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
              {payment.receipt_id}
            </div>

            <div className="grid gap-4 py-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Rent Period</p>
                  <p className="text-sm font-medium text-slate-900">
                    {formatRentPeriod(
                      payment.rent_period_start,
                      payment.rent_period_end
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PoundSterling className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Amount</p>
                  <p className="text-sm font-medium text-slate-900">
                    {formatCurrency(payment.amount, payment.currency)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Payment Method</p>
                  <p className="text-sm font-medium text-slate-900">
                    {formatPaymentMethod(payment.payment_method)}
                  </p>
                </div>
              </div>

              {property && (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Property</p>
                    <p className="text-sm font-medium text-slate-900">
                      {property.city}, {property.postcode}
                    </p>
                    <p className="text-xs text-slate-400">{property.country}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4">
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500">Record Created</p>
                  <p className="text-sm text-slate-700">
                    {formatDate(payment.created_at, 'dd MMM yyyy, HH:mm')} UTC
                  </p>
                </div>
                {isVerified && confirmation && (
                  <div>
                    <p className="text-xs text-slate-500">Confirmed By Landlord</p>
                    <p className="text-sm text-slate-700">
                      {formatDate(confirmation.confirmed_at, 'dd MMM yyyy, HH:mm')} UTC
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 bg-slate-50 p-4 text-center">
            <p className="text-xs text-slate-400">
              This receipt was generated by RentProof — a neutral rent payment
              verification platform. Verify authenticity at{' '}
              <span className="font-medium text-slate-600">rentproof.app</span>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-400">
          <p>
            RentProof is a documentation utility. This is not a bank statement
            or legal contract.
          </p>
          <Link
            href="/"
            className="mt-2 inline-block text-green-600 hover:underline"
          >
            Learn about RentProof →
          </Link>
        </div>
      </div>
    </div>
  )
}
