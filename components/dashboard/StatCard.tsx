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
  iconBg = 'bg-slate-100',
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 bg-white p-5 shadow-sm',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {title}
          </p>
          <p className="mt-1.5 font-display text-2xl font-bold text-slate-900">
            {value}
          </p>
          {subtitle && (
            <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
          )}
          {trend && (
            <div
              className={cn(
                'mt-2 inline-flex items-center gap-1 text-xs font-medium',
                trend.positive ? 'text-green-600' : 'text-red-500'
              )}
            >
              <span>{trend.positive ? '↑' : '↓'}</span>
              {trend.value}
            </div>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg',
              iconBg
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
