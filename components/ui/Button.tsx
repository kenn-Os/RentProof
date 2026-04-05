import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-medium rounded-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40 select-none'

    const variants = {
      primary:
        'bg-ink-900 text-paper-50 hover:bg-ink-800 focus-visible:ring-ink-900',
      secondary:
        'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-600',
      ghost: 'text-ink-700 hover:bg-paper-200 hover:text-ink-900 focus-visible:ring-ink-400',
      danger:
        'bg-audit-600 text-white hover:bg-audit-700 focus-visible:ring-audit-600',
      outline:
        'border border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-paper-50 focus-visible:ring-ink-900',
    }

    const sizes = {
      sm: 'px-3 h-8 text-xs tracking-tight',
      md: 'px-5 h-10 text-sm tracking-tight',
      lg: 'px-8 h-12 text-base font-semibold tracking-tight',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
