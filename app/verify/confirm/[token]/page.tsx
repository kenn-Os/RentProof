'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShieldCheck, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react'
import { confirmPaymentByToken } from '@/app/dashboard/actions'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatRentPeriod } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

interface Props {
  params: Promise<{ token: string }>
}

interface Payment {
  receipt_id: string
  status: string
  rent_period_start: string
  rent_period_end: string
  amount: number
  currency: string
  payment_method: string
  tenancy: {
    property: {
      address_line1: string
      city: string
      postcode: string
    }
  }
}

export default function ConfirmPaymentPage({ params }: Props) {
  const [token, setToken] = useState<string | null>(null)
  const [payment, setPayment] = useState<Payment | null>(null)
  const [loading, setLoading] = useState(true)
  const [confirming, setConfirming] = useState(false)
  const [result, setResult] = useState<
    { success: boolean; receiptId?: string; error?: string } | null
  >(null)

  useEffect(() => {
    params.then(({ token: t }) => {
      setToken(t)
      loadPayment(t)
    })
  }, [params])

  async function loadPayment(t: string) {
    const supabase = createClient()
    const { data } = await supabase
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
        tenancy:tenancies(
          property:properties(address_line1, city, postcode)
        )
      `
      )
      .eq('confirmation_token', t)
      .single()

    if (data) {
      setPayment(data as unknown as Payment)
    }
    setLoading(false)
  }

  async function handleConfirm() {
    if (!token) return
    setConfirming(true)

    const res = await confirmPaymentByToken(token)

    if ('error' in res && res.error) {
      setResult({ success: false, error: res.error })
    } else if ('data' in res && res.data) {
      setResult({ success: true, receiptId: res.data.receipt_id })
    }

    setConfirming(false)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-semibold text-slate-900">
              RentProof
            </span>
          </Link>
        </div>

        {/* Success state */}
        {result?.success && (
          <div className="rounded-2xl border border-green-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="receipt-stamp h-8 w-8 text-green-600" />
            </div>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Payment Confirmed
            </h1>
            <p className="mt-2 text-slate-500">
              You&apos;ve confirmed receipt of this rent payment. The tenant&apos;s
              record is now marked as Verified.
            </p>
            <div className="mt-4 rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Receipt ID</p>
              <p className="receipt-id-chip mt-0.5 text-sm text-slate-800">
                {result.receiptId}
              </p>
            </div>
            <Link
              href="/"
              className="mt-6 inline-block text-sm text-green-600 hover:underline"
            >
              Learn about RentProof →
            </Link>
          </div>
        )}

        {/* Error state */}
        {result?.success === false && (
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Confirmation Failed
            </h1>
            <p className="mt-2 text-sm text-red-600">{result.error}</p>
            <p className="mt-3 text-sm text-slate-500">
              If you believe this is an error, contact your tenant or{' '}
              <Link href="/" className="text-green-600 underline">
                RentProof support
              </Link>
              .
            </p>
          </div>
        )}

        {/* Confirmation prompt */}
        {!result && (
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            {!payment ? (
              <div className="p-8 text-center">
                <AlertTriangle className="mx-auto mb-3 h-10 w-10 text-amber-500" />
                <h2 className="font-semibold text-slate-900">
                  Link not found or expired
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  This confirmation link may have expired or already been used.
                </p>
              </div>
            ) : payment.status === 'verified' ? (
              <div className="p-8 text-center">
                <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-green-500" />
                <h2 className="font-semibold text-slate-900">
                  Already confirmed
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  This payment has already been confirmed.
                </p>
              </div>
            ) : (
              <>
                <div className="border-b border-slate-100 p-6">
                  <h1 className="font-display text-xl font-bold text-slate-900">
                    Confirm Rent Receipt
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    A tenant has recorded the following payment. Please review
                    and confirm if accurate.
                  </p>
                </div>

                <div className="divide-y divide-slate-50 p-6">
                  <div className="pb-4">
                    <p className="text-xs text-slate-400">RECEIPT ID</p>
                    <p className="receipt-id-chip mt-0.5 text-sm text-slate-700">
                      {payment.receipt_id}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div>
                      <p className="text-xs text-slate-400">PROPERTY</p>
                      <p className="mt-0.5 text-sm font-medium text-slate-900">
                        {payment.tenancy?.property?.address_line1}
                      </p>
                      <p className="text-xs text-slate-500">
                        {payment.tenancy?.property?.city},{' '}
                        {payment.tenancy?.property?.postcode}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">AMOUNT</p>
                      <p className="mt-0.5 font-display text-lg font-bold text-slate-900">
                        {formatCurrency(payment.amount, payment.currency)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">PERIOD</p>
                      <p className="mt-0.5 text-sm text-slate-700">
                        {formatRentPeriod(
                          payment.rent_period_start,
                          payment.rent_period_end
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">METHOD</p>
                      <p className="mt-0.5 text-sm text-slate-700">
                        {payment.payment_method?.replace(/_/g, ' ')}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="mb-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
                      By clicking confirm, you acknowledge that you received
                      this payment in the amount and period stated above.
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          setResult({
                            success: false,
                            error: 'You declined to confirm this payment.',
                          })
                        }
                      >
                        Decline
                      </Button>
                      <Button
                        variant="secondary"
                        className="flex-1"
                        loading={confirming}
                        onClick={handleConfirm}
                      >
                        Confirm Payment
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-slate-400">
          RentProof is a documentation utility, not a bank or escrow service.
        </p>
      </div>
    </div>
  )
}
