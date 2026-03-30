'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { CreatePaymentForm } from '@/lib/types/database'

// ── Create a new rent payment record ──────────────────────
export async function createRentPayment(formData: CreatePaymentForm) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  // Verify tenancy belongs to this tenant
  const { data: tenancy, error: tenancyError } = await supabase
    .from('tenancies')
    .select('id, property_id, tenant_id')
    .eq('id', formData.tenancy_id)
    .eq('tenant_id', user.id)
    .single()

  if (tenancyError || !tenancy) {
    return { error: 'Tenancy not found or access denied' }
  }

  // Generate receipt ID via database function
  const { data: receiptIdResult } = await supabase
    .rpc('generate_receipt_id', { country_code: 'GB' })

  const receiptId = receiptIdResult as string

  // Generate confirmation token
  const { data: tokenResult } = await supabase
    .rpc('generate_confirmation_token')

  const confirmationToken = tokenResult as string

  // Token expires in 30 days
  const tokenExpiresAt = new Date()
  tokenExpiresAt.setDate(tokenExpiresAt.getDate() + 30)

  // Create payment record
  const { data: payment, error: paymentError } = await supabase
    .from('rent_payments')
    .insert({
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
      token_expires_at: tokenExpiresAt.toISOString(),
    })
    .select()
    .single()

  if (paymentError || !payment) {
    return { error: paymentError?.message ?? 'Failed to create payment record' }
  }

  // Log audit
  await supabase.from('audit_logs').insert({
    user_id: user.id,
    action: 'CREATE_RECEIPT',
    target_id: payment.id,
    target_type: 'rent_payment',
    metadata: { receipt_id: receiptId, amount: formData.amount },
  })

  revalidatePath('/dashboard/tenant')
  revalidatePath('/dashboard/tenant/payments')

  return {
    data: payment,
    confirmationToken,
    confirmationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/verify/confirm/${confirmationToken}`,
  }
}

// ── Upload payment evidence ───────────────────────────────
export async function uploadEvidence(paymentId: string, file: File) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const fileExt = file.name.split('.').pop()
  const filePath = `${user.id}/${paymentId}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('rent-evidence')
    .upload(filePath, file, { upsert: true })

  if (uploadError) return { error: uploadError.message }

  const { data: urlData } = supabase.storage
    .from('rent-evidence')
    .getPublicUrl(filePath)

  await supabase
    .from('rent_payments')
    .update({ evidence_url: urlData.publicUrl })
    .eq('id', paymentId)

  revalidatePath('/dashboard/tenant/payments')
  return { data: urlData.publicUrl }
}

// ── Landlord confirms a payment via token ────────────────
export async function confirmPaymentByToken(token: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be signed in to confirm a payment' }
  }

  // Find payment by token
  const { data: payment, error: findError } = await supabase
    .from('rent_payments')
    .select(
      `
      id,
      receipt_id,
      status,
      confirmation_token,
      token_expires_at,
      tenancy_id,
      tenancies (
        property_id,
        properties (
          landlord_id
        )
      )
    `
    )
    .eq('confirmation_token', token)
    .single()

  if (findError || !payment) {
    return { error: 'Invalid or expired confirmation link' }
  }

  // Check token expiry
  if (
    payment.token_expires_at &&
    new Date(payment.token_expires_at) < new Date()
  ) {
    return { error: 'This confirmation link has expired' }
  }

  if (payment.status === 'verified') {
    return { error: 'This payment has already been confirmed' }
  }

  // Verify the confirmer is the landlord
  const tenancy = payment.tenancies as any
  const property = tenancy?.properties as any
  if (property?.landlord_id !== user.id) {
    return { error: 'Only the landlord of this property can confirm this payment' }
  }

  // Update payment status
  const { error: updateError } = await supabase
    .from('rent_payments')
    .update({ status: 'verified' })
    .eq('id', payment.id)

  if (updateError) return { error: updateError.message }

  // Create confirmation record
  const { error: confirmError } = await supabase
    .from('confirmations')
    .insert({
      rent_payment_id: payment.id,
      confirmed_by: user.id,
    })

  if (confirmError) return { error: confirmError.message }

  // Audit log
  await supabase.from('audit_logs').insert({
    user_id: user.id,
    action: 'CONFIRM_PAYMENT',
    target_id: payment.id,
    target_type: 'rent_payment',
    metadata: { receipt_id: payment.receipt_id },
  })

  revalidatePath('/dashboard/landlord')
  revalidatePath('/dashboard/landlord/confirmations')

  return { data: { receipt_id: payment.receipt_id } }
}

// ── Raise a dispute ──────────────────────────────────────
export async function raiseDispute(
  paymentId: string,
  reason: string,
  evidenceUrl?: string
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase.from('disputes').insert({
    rent_payment_id: paymentId,
    raised_by: user.id,
    reason,
    evidence_url: evidenceUrl ?? null,
  })

  if (error) return { error: error.message }

  await supabase
    .from('rent_payments')
    .update({ status: 'disputed' })
    .eq('id', paymentId)

  await supabase.from('audit_logs').insert({
    user_id: user.id,
    action: 'DISPUTE_RAISED',
    target_id: paymentId,
    target_type: 'rent_payment',
    metadata: { reason },
  })

  revalidatePath('/dashboard/tenant')
  revalidatePath('/dashboard/landlord')

  return { data: true }
}
