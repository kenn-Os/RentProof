'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle2, AlertTriangle, Loader2, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { confirmPaymentByToken } from '@/app/dashboard/actions'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatRentPeriod } from '@/lib/utils'

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
    // Mock data for UI prototype
    const mockPayment: Payment = {
      receipt_id: `RP-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'pending',
      rent_period_start: '2024-03-01',
      rent_period_end: '2024-03-31',
      amount: 1200.00,
      currency: 'GBP',
      payment_method: 'bank_transfer',
      tenancy: {
        property: {
          address_line1: '123 Baker Street',
          city: 'London',
          postcode: 'NW1 6XE'
        }
      }
    }
    
    console.log('Mock: Loaded payment for confirmation token', t)
    setPayment(mockPayment)
    setLoading(false)
  }

  async function handleConfirm() {
    if (!token) return
    setConfirming(true)

    const res = await confirmPaymentByToken(token as string)

    if (res.data) {
      setResult({ success: true, receiptId: res.data.receipt_id })
    } else {
      setResult({ success: false, error: 'Failed to confirm payment' })
    }

    setConfirming(false)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper-100">
        <Loader2 className="h-8 w-8 animate-spin text-ink-300" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper-100 px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <Link href="/" className="flex items-center gap-3">
            <Logo iconOnly size="sm" />
            <span className="font-display text-sm font-bold uppercase tracking-widest text-ink-900">
              RentProof
            </span>
          </Link>
        </div>

        {/* Success state */}
        {result?.success && (
          <div className="bg-paper-50 border border-brand-600/20 p-10 text-center shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center border-2 border-brand-600 bg-brand-600/10">
              <CheckCircle2 className="h-8 w-8 text-brand-600" />
            </div>
            <h1 className="font-display text-3xl font-bold text-ink-900 mb-4">
              Audit <span className="italic text-brand-600">Confirmed.</span>
            </h1>
            <p className="text-sm font-medium text-ink-600 leading-relaxed">
              You have successfully confirmed receipt of this rent payment. 
              The protocol record has been updated to Verified.
            </p>
            <div className="mt-8 border border-ink-900/5 bg-paper-100 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">RECORD ID</p>
              <p className="text-xs font-bold text-ink-900 font-mono tracking-widest">
                {result.receiptId}
              </p>
            </div>
            <Link
              href="/"
              className="mt-10 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-600 hover:text-brand-500 group"
            >
              Back to Protocol Home
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

        {/* Error state */}
        {result?.success === false && (
          <div className="bg-paper-50 border border-red-600/20 p-10 text-center shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center border-2 border-red-600 bg-red-600/10">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="font-display text-3xl font-bold text-ink-900 mb-4">
              Audit <span className="italic text-red-600">Rejected.</span>
            </h1>
            <p className="text-sm font-medium text-red-600/80 mb-8">{result.error}</p>
            <p className="text-xs font-bold text-ink-500 uppercase tracking-widest leading-relaxed">
              If this was unintentional, please contact the tenant to re-issue 
              the validation token.
            </p>
            <Link
              href="/"
              className="mt-10 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink-900 group"
            >
              Support Desk
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

        {/* Confirmation prompt */}
        {!result && (
          <div className="bg-paper-50 border border-ink-900/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden">
            {!payment ? (
              <div className="p-10 text-center">
                <AlertTriangle className="mx-auto mb-6 h-12 w-12 text-amber-500" />
                <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">
                  Token Invalid
                </h2>
                <p className="text-sm font-medium text-ink-600 leading-relaxed">
                  This validation link has expired or was previously utilized in the 
                  RentProof protocol.
                </p>
              </div>
            ) : payment.status === 'verified' ? (
              <div className="p-10 text-center">
                <CheckCircle2 className="mx-auto mb-6 h-12 w-12 text-brand-600" />
                <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">
                  Already Audited
                </h2>
                <p className="text-sm font-medium text-ink-600 leading-relaxed">
                  This payment has already been mutually verified. No further action 
                  is required.
                </p>
                <Link href={`/verify/${payment.receipt_id}`} className="mt-8 inline-block text-[10px] font-bold uppercase tracking-widest text-brand-600">
                  View Public Record
                </Link>
              </div>
            ) : (
              <>
                <div className="bg-ink-900 p-10 text-paper-50">
                  <div className="mb-6 inline-flex items-center gap-2 border border-paper-50/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-paper-50/40 font-mono">
                    VALIDATION-REQ
                  </div>
                  <h1 className="font-display text-3xl font-bold italic tracking-tight">
                    Confirm Receipt
                  </h1>
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest text-paper-50/60 leading-relaxed">
                    Verify the following declaration record for mutual 
                    acknowledgment within the RentProof system.
                  </p>
                </div>

                <div className="p-10 space-y-10">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">PROPERTY</p>
                      <p className="text-sm font-bold text-ink-900 uppercase tracking-widest truncate">
                        {payment.tenancy?.property?.address_line1}
                      </p>
                      <p className="text-[10px] font-bold text-ink-500 uppercase tracking-widest mt-0.5">
                        {payment.tenancy?.property?.city}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">AMOUNT</p>
                      <p className="font-display text-xl font-bold text-ink-900">
                        {formatCurrency(payment.amount, payment.currency)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">PERIOD</p>
                      <p className="text-sm font-bold text-ink-900 uppercase tracking-widest">
                        {formatRentPeriod(
                          payment.rent_period_start,
                          payment.rent_period_end
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">METHOD</p>
                      <p className="text-sm font-bold text-ink-900 uppercase tracking-widest">
                        {payment.payment_method?.replace(/_/g, ' ')}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-ink-900/10 pt-10">
                    <p className="mb-6 text-[10px] font-bold text-ink-500 uppercase leading-relaxed tracking-widest italic">
                      Disclaimer: By confirming, you legally acknowledge receipt of 
                      these funds for the specified period.
                    </p>

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        className="flex-1 rounded-none border-ink-900/10 text-ink-600 hover:bg-paper-100 h-14 uppercase tracking-widest text-[10px]"
                        onClick={() =>
                          setResult({
                            success: false,
                            error: 'You declined to confirm this payment declaration.',
                          })
                        }
                      >
                        Decline
                      </Button>
                      <Button
                        variant="primary"
                        className="flex-1 rounded-none bg-ink-900 hover:bg-ink-800 text-paper-50 h-14 uppercase tracking-widest text-[10px]"
                        loading={confirming}
                        onClick={handleConfirm}
                      >
                        Confirm Audit
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <p className="mt-12 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400 leading-relaxed">
          RentProof Documentation Protocol <span className="font-mono opacity-50 px-2">{"//"}</span> Institutional Standard
        </p>
      </div>
    </div>
  )
}
