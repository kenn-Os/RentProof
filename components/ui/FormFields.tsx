import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// ── Input ─────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-bold uppercase tracking-widest text-ink-700"
          >
            {label}
            {props.required && <span className="ml-1 text-audit-600">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'flex h-11 w-full rounded-sm border border-ink-900/15 bg-paper-50 px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400',
            'transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink-900 focus-visible:border-ink-900',
            'disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-paper-200 font-medium',
            error && 'border-audit-500 focus-visible:ring-audit-500',
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="text-[11px] font-medium leading-tight text-ink-600">{hint}</p>
        )}
        {error && (
          <p className="text-[11px] font-bold text-audit-600">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

// ── Select ────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, placeholder, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-bold uppercase tracking-widest text-ink-700"
          >
            {label}
            {props.required && <span className="ml-1 text-audit-600">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'flex h-11 w-full rounded-sm border border-ink-900/15 bg-paper-50 px-3 py-2 text-sm text-ink-900 font-medium',
            'transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink-900 focus-visible:border-ink-900',
            'disabled:cursor-not-allowed disabled:opacity-40',
            error && 'border-audit-500',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'

// ── Textarea ──────────────────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs font-bold uppercase tracking-widest text-ink-700"
          >
            {label}
            {props.required && <span className="ml-1 text-audit-600">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'flex min-h-[100px] w-full rounded-sm border border-ink-900/15 bg-paper-50 px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 font-medium',
            'transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink-900 focus-visible:border-ink-900',
            'disabled:cursor-not-allowed disabled:opacity-40',
            error && 'border-audit-500',
            className
          )}
          {...props}
        />
        {hint && !error && <p className="text-[11px] font-medium text-ink-600">{hint}</p>}
        {error && <p className="text-[11px] font-bold text-audit-600">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Input, Select, Textarea }
