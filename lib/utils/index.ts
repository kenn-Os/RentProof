import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  amount: number,
  currency: string = 'GBP'
): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(dateStr: string, formatStr: string = 'dd MMM yyyy'): string {
  try {
    return format(parseISO(dateStr), formatStr)
  } catch {
    return dateStr
  }
}

export function formatRentPeriod(start: string, end: string): string {
  try {
    const s = parseISO(start)
    const e = parseISO(end)
    if (format(s, 'yyyy-MM') === format(e, 'yyyy-MM')) {
      return format(s, 'MMMM yyyy')
    }
    return `${format(s, 'dd MMM yyyy')} – ${format(e, 'dd MMM yyyy')}`
  } catch {
    return `${start} – ${end}`
  }
}

export function formatPaymentMethod(method: string): string {
  const labels: Record<string, string> = {
    bank_transfer: 'Bank Transfer',
    cash: 'Cash',
    standing_order: 'Standing Order',
    cheque: 'Cheque',
    other: 'Other',
  }
  return labels[method] ?? method
}

export function getStatusConfig(status: string): {
  label: string
  color: string
  bg: string
  border: string
} {
  const configs: Record<string, { label: string; color: string; bg: string; border: string }> = {
    verified: {
      label: 'Verified',
      color: 'text-green-700',
      bg: 'bg-green-50',
      border: 'border-green-200',
    },
    pending: {
      label: 'Pending Confirmation',
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
    draft: {
      label: 'Draft',
      color: 'text-slate-600',
      bg: 'bg-slate-50',
      border: 'border-slate-200',
    },
    disputed: {
      label: 'Disputed',
      color: 'text-red-700',
      bg: 'bg-red-50',
      border: 'border-red-200',
    },
    expired: {
      label: 'Expired',
      color: 'text-slate-500',
      bg: 'bg-slate-50',
      border: 'border-slate-200',
    },
  }
  return configs[status] ?? configs.draft
}

export function generateReceiptIdClient(country: string = 'GB'): string {
  const year = new Date().getFullYear()
  const seq = String(Math.floor(Math.random() * 99999) + 1).padStart(5, '0')
  return `RP-${year}-${country.toUpperCase()}-${seq}`
}

export function getConfirmationUrl(token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  return `${baseUrl}/verify/confirm/${token}`
}

export function truncateAddress(address: string, maxLength: number = 40): string {
  return address.length > maxLength ? address.slice(0, maxLength) + '…' : address
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export async function logAuditAction(
  supabase: ReturnType<typeof import('@/lib/supabase/client').createClient>,
  params: {
    user_id?: string
    action: string
    target_id?: string
    target_type?: string
    metadata?: Record<string, unknown>
  }
) {
  await supabase.from('audit_logs').insert({
    user_id: params.user_id ?? null,
    action: params.action,
    target_id: params.target_id ?? null,
    target_type: params.target_type ?? null,
    metadata: params.metadata ?? null,
  })
}
