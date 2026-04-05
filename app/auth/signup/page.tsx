'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShieldCheck, Building2, Users, Briefcase, Eye, EyeOff } from 'lucide-react'
import { signUp } from '@/app/auth/actions'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/FormFields'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'
import type { UserRole } from '@/lib/types/database'

const roles: { value: UserRole; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: 'tenant',
    label: 'Tenant',
    description: 'I pay rent and need receipts',
    icon: <Users className="h-5 w-5" />,
  },
  {
    value: 'landlord',
    label: 'Landlord',
    description: 'I own properties and receive rent',
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    value: 'agent',
    label: 'Letting Agent',
    description: 'I manage properties for landlords',
    icon: <Briefcase className="h-5 w-5" />,
  },
]

export default function SignUpPage() {
  const [role, setRole] = useState<UserRole>('tenant')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    formData.set('role', role)
    const result = await signUp(formData)

    if (result && 'error' in result && result.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left */}
      <div className="hidden w-2/5 flex-col justify-between bg-slate-950 p-12 md:flex">
        <Link href="/" className="flex items-center gap-3">
          <Logo iconOnly size="md" />
          <span className="font-display text-lg font-bold text-white uppercase tracking-widest">
            RentProof
          </span>
        </Link>

        <div className="space-y-6">
          {[
            { icon: '🔐', text: 'Tamper-resistant records' },
            { icon: '📋', text: 'Audit-ready PDF receipts' },
            { icon: '✅', text: 'Mutual landlord confirmation' },
            { icon: '⚖️', text: 'Court-admissible documentation' },
            { icon: '🌍', text: 'Works in UK, Nigeria & beyond' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <p className="text-sm text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-500">
          RentProof is a documentation utility. It does not hold money or
          act as escrow.
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 flex items-center gap-2 md:hidden">
            <ShieldCheck className="h-5 w-5 text-slate-900" />
            <span className="font-display font-semibold text-slate-900">
              RentProof
            </span>
          </Link>

          <h1 className="font-display text-2xl font-bold text-slate-900">
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Free to start. No payment details required.
          </p>

          {/* Role selector */}
          <div className="mt-6">
            <p className="mb-2.5 text-sm font-medium text-slate-700">
              I am a...
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-xl border p-3.5 text-center transition-all',
                    role === r.value
                      ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg',
                      role === r.value ? 'bg-white/15' : 'bg-slate-100'
                    )}
                  >
                    {r.icon}
                  </span>
                  <div>
                    <p className="text-xs font-semibold">{r.label}</p>
                    <p
                      className={cn(
                        'text-xs leading-tight',
                        role === r.value ? 'text-slate-300' : 'text-slate-400'
                      )}
                    >
                      {r.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input type="hidden" name="role" value={role} />

            <Input
              label="Full name"
              name="full_name"
              type="text"
              placeholder="Your full name"
              required
              autoComplete="name"
            />

            <Input
              label="Email address"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
            />

            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                required
                minLength={8}
                autoComplete="new-password"
                hint="Use at least 8 characters with a mix of letters and numbers"
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-slate-400 hover:text-slate-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-0.5 rounded border-slate-300"
              />
              <label htmlFor="terms" className="text-xs text-slate-500">
                I agree to the{' '}
                <Link href="/terms" className="text-slate-700 underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-slate-700 underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={loading}
            >
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link
              href="/auth/signin"
              className="font-medium text-slate-900 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
