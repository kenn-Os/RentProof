import { cn, getStatusConfig } from '@/lib/utils'
import type { PaymentStatus } from '@/lib/types/database'

interface StatusBadgeProps {
  status: PaymentStatus | string
  className?: string
  size?: 'sm' | 'md'
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = getStatusConfig(status)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
        status === 'verified' && 'border-brand-600/20 bg-brand-600/5 text-brand-600',
        status === 'pending' && 'border-ink-900/20 bg-paper-200 text-ink-700',
        status === 'disputed' && 'border-audit-600/20 bg-audit-600/5 text-audit-600',
        (status === 'draft' || status === 'expired') && 'border-ink-900/10 bg-paper-100 text-ink-500',
        className
      )}
    >
      {config.label}
    </span>
  )
}
