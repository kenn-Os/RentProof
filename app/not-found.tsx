import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900">
        <ShieldCheck className="h-7 w-7 text-white" />
      </div>
      <h1 className="font-display text-4xl font-bold text-slate-900">404</h1>
      <p className="mt-3 text-slate-500">This page doesn't exist.</p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center rounded-lg bg-slate-900 px-5 text-sm font-medium text-white hover:bg-slate-800"
      >
        Go home
      </Link>
    </div>
  )
}
