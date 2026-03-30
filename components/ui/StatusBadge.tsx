import { cn, getStatusConfig } from '@/lib/utils'
import type { PaymentStatus } from '@/lib/types/database'

interface StatusBadgeProps {
  status: PaymentStatus | string
  className?: string
  size?: 'sm' | 'md'
}

export function StatusBadge({ status, className, size = 'md' }: StatusBadgeProps) {
  const config = getStatusConfig(status)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        config.color,
        config.bg,
        config.border,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
        className
      )}
    >
      <span
        className={cn(
          'rounded-full',
          size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2',
          status === 'verified' && 'bg-green-500',
          status === 'pending' && 'bg-amber-500',
          status === 'disputed' && 'bg-red-500',
          (status === 'draft' || status === 'expired') && 'bg-slate-400'
        )}
      />
      {config.label}
    </span>
  )
}
