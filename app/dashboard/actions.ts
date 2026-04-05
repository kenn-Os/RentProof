'use server'

import { revalidatePath } from 'next/cache'
import { nanoid } from 'nanoid'
import type { CreatePaymentForm } from '@/lib/types/database'

// ── Create a new rent payment record ──────────────────────
export async function createRentPayment(formData: CreatePaymentForm) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const receiptId = `RP-${Math.floor(100000 + Math.random() * 900000)}`
  const confirmationToken = nanoid(32)

  const payment = {
    id: nanoid(),
    tenancy_id: formData.tenancy_id,
    receipt_id: receiptId,
    rent_period_start: formData.rent_period_start,
    rent_period_end: formData.rent_period_end,
    amount: formData.amount,
    currency: 'GBP',
    payment_method: formData.payment_method,
    payment_reference: formData.payment_reference ?? null,
    notes: formData.notes ?? null,
    status: 'pending',
    confirmation_token: confirmationToken,
    created_at: new Date().toISOString(),
  }

  console.log('Mock: Created rent payment', payment)

  revalidatePath('/dashboard/tenant')
  revalidatePath('/dashboard/tenant/payments')

  return {
    data: payment,
    confirmationToken,
    confirmationUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify/confirm/${confirmationToken}`,
  }
}

// ── Upload payment evidence ───────────────────────────────
export async function uploadEvidence(paymentId: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock public URL
  const mockUrl = `https://placehold.co/600x400?text=Payment+Evidence+${paymentId}`

  console.log('Mock: Uploaded evidence for', paymentId, 'to', mockUrl)

  revalidatePath('/dashboard/tenant/payments')
  return { data: mockUrl }
}

// ── Landlord confirms a payment via token ────────────────
export async function confirmPaymentByToken(token: string) {
  await new Promise((resolve) => setTimeout(resolve, 800))

  console.log('Mock: Confirming payment with token', token)

  revalidatePath('/dashboard/landlord')
  revalidatePath('/dashboard/landlord/confirmations')

  return { data: { receipt_id: `RP-${Math.floor(100000 + Math.random() * 900000)}` } }
}

// ── Raise a dispute ──────────────────────────────────────
export async function raiseDispute(
  paymentId: string,
  reason: string
) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  console.log('Mock: Dispute raised for', paymentId, 'Reason:', reason)

  revalidatePath('/dashboard/tenant')
  revalidatePath('/dashboard/landlord')

  return { data: true }
}
