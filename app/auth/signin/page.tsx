'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShieldCheck, Eye, EyeOff } from 'lucide-react'
import { signIn } from '@/app/auth/actions'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/FormFields'

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await signIn(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-slate-950 p-12 md:flex">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
            <ShieldCheck className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="font-display text-lg font-semibold text-white">
            RentProof
          </span>
        </Link>

        <div>
          <blockquote className="font-display text-2xl font-medium italic leading-relaxed text-white">
            &quot;Finally, a receipt system both sides trust.&quot;
          </blockquote>
          <p className="mt-4 text-sm text-slate-400">
            — A landlord who&apos;s been through a tribunal
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {['Neutral', 'Timestamped', 'Verified'].map((t) => (
            <div
              key={t}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center text-xs font-medium text-slate-300"
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link
            href="/"
            className="mb-8 flex items-center gap-2 md:hidden"
          >
            <ShieldCheck className="h-5 w-5 text-slate-900" />
            <span className="font-display font-semibold text-slate-900">
              RentProof
            </span>
          </Link>

          <h1 className="font-display text-2xl font-bold text-slate-900">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Sign in to your account to continue
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                placeholder="••••••••"
                required
                autoComplete="current-password"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="rounded border-slate-300"
                />
                Remember me
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-green-600 hover:text-green-700"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={loading}
            >
              Sign in
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/signup"
              className="font-medium text-slate-900 hover:underline"
            >
              Create one free
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
