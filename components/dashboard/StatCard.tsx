import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  iconBg?: string
  trend?: { value: string; positive: boolean }
  className?: string
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-sm border border-ink-900/15 bg-paper-50 p-6',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-ink-600">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-ink-900">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-[11px] font-medium text-ink-500">{subtitle}</p>
          )}
          {trend && (
            <div
              className={cn(
                'mt-3 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide',
                trend.positive ? 'text-brand-600' : 'text-audit-600'
              )}
            >
              <span>{trend.positive ? '↑' : '↓'}</span>
              {trend.value}
            </div>
          )}
        </div>
        {icon && (
          <div className="flex h-6 w-6 shrink-0 items-center justify-center text-ink-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
