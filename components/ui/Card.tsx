import { cn } from '@/lib/utils'

interface CardProps {
  className?: string
  children: React.ReactNode
}

function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-sm border border-ink-900/10 bg-paper-50',
        className
      )}
    >
      {children}
    </div>
  )
}

function CardHeader({ className, children }: CardProps) {
  return (
    <div className={cn('flex flex-col gap-1 p-6 pb-4', className)}>
      {children}
    </div>
  )
}

function CardTitle({ className, children }: CardProps) {
  return (
    <h3 className={cn('text-base font-semibold text-slate-900 leading-tight', className)}>
      {children}
    </h3>
  )
}

function CardDescription({ className, children }: CardProps) {
  return (
    <p className={cn('text-sm text-slate-500', className)}>
      {children}
    </p>
  )
}

function CardContent({ className, children }: CardProps) {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  )
}

function CardFooter({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'flex items-center p-6 pt-0 gap-3',
        className
      )}
    >
      {children}
    </div>
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
