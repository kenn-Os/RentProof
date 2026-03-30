import Link from 'next/link'
import {
  ShieldCheck,
  FileCheck2,
  Clock,
  CheckCircle2,
  ArrowRight,
  Building2,
  Users,
  Briefcase,
  Lock,
  Globe2,
  Star,
  ChevronRight,
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Nav ──────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
              <ShieldCheck className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="font-display text-lg font-semibold text-slate-900">
              RentProof
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#how-it-works"
              className="text-sm text-slate-600 transition-colors hover:text-slate-900"
            >
              How It Works
            </Link>
            <Link
              href="#for-who"
              className="text-sm text-slate-600 transition-colors hover:text-slate-900"
            >
              Who It's For
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-slate-600 transition-colors hover:text-slate-900"
            >
              Pricing
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/signin"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Get started
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 pb-32 pt-24">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        {/* Green glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/10 blur-[100px] rounded-full" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-slate-300">
            <span className="flex h-1.5 w-1.5 rounded-full bg-green-400" />
            Neutral · Timestamped · Mutually Confirmed
          </div>

          <h1 className="font-display text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Rent paid.
            <br />
            <span className="text-green-400">Proven.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            RentProof generates legally structured, time-stamped, mutually
            confirmed rent receipts — independent of banks. The neutral
            verification layer between tenants and landlords.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-green-500 px-7 text-base font-semibold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-green-400 hover:shadow-green-400/30"
            >
              Start for free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/verify/demo"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 text-base font-medium text-white transition-all hover:bg-white/10"
            >
              <FileCheck2 className="h-4 w-4" />
              View sample receipt
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-12">
            {[
              { value: 'Neutral', label: 'Third-party verification' },
              { value: 'Instant', label: 'PDF receipt generation' },
              { value: 'Audit-ready', label: 'Court-admissible records' },
            ].map((stat) => (
              <div key={stat.value} className="text-center">
                <div className="font-display text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Problem ───────────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
                The Problem
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-slate-900">
                Rent payment disputes cost{' '}
                <em>thousands</em> to resolve
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                In the UK, Nigeria, and beyond — rent is paid by transfer or
                cash, bank references are vague, and landlords sometimes deny
                receipt. Courts require structured evidence. There is no neutral
                verification layer.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                'Rent paid — but landlord claims otherwise',
                'Bank ref just says "payment" — no details',
                'Cash payments leave zero paper trail',
                'Courts need structured, dated evidence',
                'Letting agents need proper audit trails',
              ].map((problem) => (
                <div
                  key={problem}
                  className="flex items-start gap-3 rounded-lg border border-red-100 bg-red-50 p-3.5"
                >
                  <span className="mt-0.5 text-red-500">✗</span>
                  <p className="text-sm text-slate-700">{problem}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────── */}
      <section id="how-it-works" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
              How It Works
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-slate-900">
              Three steps to verified proof
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: '01',
                icon: <FileCheck2 className="h-6 w-6" />,
                title: 'Tenant logs payment',
                description:
                  'Enter property, rent period, amount, and payment method. Optionally upload a bank screenshot. System generates a unique receipt ID and timestamp.',
                color: 'bg-slate-900 text-white',
              },
              {
                step: '02',
                icon: <CheckCircle2 className="h-6 w-6" />,
                title: 'Landlord confirms',
                description:
                  'Landlord receives a secure one-click confirmation link. On confirmation, receipt status updates to Verified and both parties receive signed documentation.',
                color: 'bg-green-600 text-white',
              },
              {
                step: '03',
                icon: <Lock className="h-6 w-6" />,
                title: 'Record locked forever',
                description:
                  'Tamper-resistant record stored permanently. Download audit-ready PDF any time. If landlord doesn\'t respond, the timestamped declaration stands as documented proof.',
                color: 'bg-slate-700 text-white',
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                {i < 2 && (
                  <ChevronRight className="absolute -right-4 top-6 hidden h-5 w-5 text-slate-300 md:block" />
                )}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
                    >
                      {item.icon}
                    </div>
                    <span className="font-display text-4xl font-bold text-slate-100">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mb-2 font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── For Who ───────────────────────────────────────── */}
      <section id="for-who" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
              Who It's For
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-slate-900">
              Built for the whole rental chain
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Users className="h-6 w-6 text-blue-600" />,
                bg: 'bg-blue-50',
                title: 'Tenants',
                features: [
                  'Record every rent payment',
                  'Download verified receipts',
                  'Build a payment history',
                  'Protect yourself in disputes',
                  'Evidence for benefit claims',
                ],
              },
              {
                icon: <Building2 className="h-6 w-6 text-green-600" />,
                bg: 'bg-green-50',
                title: 'Landlords',
                features: [
                  'One-click payment confirmation',
                  'View full payment timeline',
                  'Export rent history',
                  'Manage multiple properties',
                  'Reduce dispute exposure',
                ],
              },
              {
                icon: <Briefcase className="h-6 w-6 text-violet-600" />,
                bg: 'bg-violet-50',
                title: 'Letting Agents',
                features: [
                  'Bulk tenant management',
                  'Automated receipt generation',
                  'Audit-ready reporting',
                  'Portfolio-level oversight',
                  'Professional documentation',
                ],
              },
            ].map((role) => (
              <div
                key={role.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${role.bg}`}
                >
                  {role.icon}
                </div>
                <h3 className="mb-4 text-lg font-semibold text-slate-900">
                  {role.title}
                </h3>
                <ul className="space-y-2">
                  {role.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Strong ────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
                Global Utility
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold text-slate-900">
                Built for UK & Nigeria. Ready for the world.
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                In the UK, RentProof is invaluable for benefit claims, mortgage
                reviews, and dispute resolution. In Nigeria, it's transformative
                — providing structured documentation in a cash-heavy rental
                market.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <Globe2 className="h-5 w-5 text-green-600" />
                <p className="text-sm text-slate-600">
                  Multi-currency · Multi-country · Multi-language (coming soon)
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Legally Neutral',
                  body: 'RentProof does not hold money, act as escrow, or replace contracts — it provides structured documentation only.',
                },
                {
                  title: 'Tamper-Resistant',
                  body: 'Every record is timestamped server-side. Status changes are audit-logged and immutable.',
                },
                {
                  title: 'Dispute-Ready',
                  body: 'Even without landlord confirmation, your timestamped payment declaration and uploaded evidence constitutes documented proof.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    <h4 className="font-semibold text-slate-900">{item.title}</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────── */}
      <section id="pricing" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
              Pricing
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-slate-900">
              Simple, transparent plans
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Tenant',
                price: '£4',
                period: '/month',
                description: 'For renters who want complete peace of mind',
                features: [
                  'Unlimited rent receipts',
                  'Landlord confirmation flow',
                  'PDF download & storage',
                  'Payment history archive',
                  'Evidence file upload',
                ],
                cta: 'Start free trial',
                highlight: false,
              },
              {
                name: 'Landlord',
                price: '£15',
                period: '/month',
                description: 'For landlords managing up to 5 properties',
                features: [
                  'Up to 5 properties',
                  'Confirm payments easily',
                  'Full payment timeline',
                  'Export rent history',
                  'Priority support',
                ],
                cta: 'Get started',
                highlight: true,
              },
              {
                name: 'Agent',
                price: 'Custom',
                period: '',
                description: 'For letting agents managing portfolios',
                features: [
                  'Unlimited properties',
                  'Bulk tenant management',
                  'Automated receipts',
                  'Audit-ready reporting',
                  'Dedicated account manager',
                ],
                cta: 'Contact us',
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-7 ${
                  plan.highlight
                    ? 'border-green-400 bg-slate-900 shadow-lg shadow-slate-900/20'
                    : 'border-slate-200 bg-white'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                      <Star className="h-3 w-3" />
                      Most popular
                    </span>
                  </div>
                )}

                <h3
                  className={`text-sm font-semibold uppercase tracking-widest ${
                    plan.highlight ? 'text-green-400' : 'text-green-600'
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mt-2 flex items-end gap-1">
                  <span
                    className={`font-display text-4xl font-bold ${
                      plan.highlight ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`mb-1 text-sm ${
                      plan.highlight ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  className={`mt-2 text-sm ${
                    plan.highlight ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {plan.description}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-center gap-2 text-sm ${
                        plan.highlight ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      <CheckCircle2
                        className={`h-4 w-4 flex-shrink-0 ${
                          plan.highlight ? 'text-green-400' : 'text-green-500'
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/auth/signup"
                  className={`mt-8 flex h-10 w-full items-center justify-center rounded-lg text-sm font-medium transition-all ${
                    plan.highlight
                      ? 'bg-green-500 text-white hover:bg-green-400'
                      : 'border border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Per-receipt pricing also available at £1 per verified receipt.
            No lock-in. Cancel anytime.
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 py-24">
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(34,197,94,0.15) 0%, transparent 50%),
                             radial-gradient(circle at 80% 50%, rgba(59,130,246,0.1) 0%, transparent 50%)`,
          }}
        />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-white">
            Start protecting your payments today
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Join tenants and landlords who've stopped arguing and started proving.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/signup"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-green-500 px-8 text-base font-semibold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-green-400"
            >
              Create free account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="border-t border-slate-100 bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-base font-semibold text-slate-900">
                RentProof
              </span>
            </div>
            <p className="text-xs text-slate-400 text-center max-w-md">
              RentProof is a documentation utility. It does not hold money, act
              as escrow, or provide legal advice. Records are structured payment
              declarations, not bank statements.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-slate-900">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-slate-900">
                Terms
              </Link>
              <Link href="/verify" className="hover:text-slate-900">
                Verify
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
