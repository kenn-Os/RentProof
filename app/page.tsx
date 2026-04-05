import Link from 'next/link'
import {
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  Globe2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Nav ──────────────────────────────────────────── */}
      {/* ── Nav ──────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-ink-900/10 bg-paper-100/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <Logo iconOnly size="sm" />
            <span className="font-display text-sm font-bold uppercase tracking-widest text-ink-900">
              RentProof
            </span>
          </Link>
          <div className="hidden items-center gap-10 md:flex">
            <Link
              href="#how-it-works"
              className="text-[11px] font-bold uppercase tracking-widest text-ink-600 transition-colors hover:text-ink-900"
            >
              How it Works
            </Link>
            <Link
              href="#for-who"
              className="text-[11px] font-bold uppercase tracking-widest text-ink-600 transition-colors hover:text-ink-900"
            >
              Audience
            </Link>
            <Link
              href="#pricing"
              className="text-[11px] font-bold uppercase tracking-widest text-ink-600 transition-colors hover:text-ink-900"
            >
              Service
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/signin"
              className="text-xs font-bold uppercase tracking-widest text-ink-700 transition-colors hover:text-ink-900"
            >
              Login
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" variant="primary" className="px-6 rounded-none">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative bg-paper-100 pt-32 pb-40 border-b border-ink-900/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="mb-8 inline-flex items-center gap-2 border border-ink-900/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink-600">
                <span className="h-1.5 w-1.5 bg-brand-600" />
                Verified Payment Documentation
              </div>
              
              <h1 className="font-display text-7xl font-bold leading-[0.95] tracking-tighter text-ink-900 md:text-8xl lg:text-9xl">
                Rent paid.<br />
                <span className="text-brand-600 italic">Proven.</span>
              </h1>
              
              <p className="mt-10 max-w-xl text-xl font-medium leading-relaxed text-ink-700">
                RentProof generates legally structured, mutually confirmed rent 
                receipts independent of banking intermediaries. The neutral 
                verification layer for modern tenancies.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-6">
                <Link href="/auth/signup">
                  <Button size="lg" className="px-10 rounded-none h-14">
                    Create Account
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link
                  href="/verify/demo"
                  className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-ink-900"
                >
                  <span className="flex h-10 w-10 items-center justify-center border border-ink-900 group-hover:bg-ink-900 group-hover:text-white transition-all">
                    <FileCheck2 className="h-4 w-4" />
                  </span>
                  Sample Receipt
                </Link>
              </div>
            </div>

            <div className="hidden lg:col-span-4 lg:flex flex-col justify-end">
              <div className="space-y-12 border-l border-ink-900/10 pl-10 pb-4">
                {[
                  { value: 'Neutral', label: 'Independent party verification' },
                  { value: 'Structured', label: 'Court-admissible PDF records' },
                  { value: 'Permanent', label: 'Verifiable rent receipts' },
                ].map((stat) => (
                  <div key={stat.value}>
                    <div className="font-display text-4xl font-bold text-ink-900 italic">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-ink-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Structural Deficit ────────────────────────── */}
      <section className="bg-paper-200 py-32 border-b border-ink-900/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-20 lg:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600">
                01 — The Structural Deficit
              </p>
              <h2 className="mt-6 font-display text-5xl font-bold tracking-tight text-ink-900 leading-tight">
                Rent payment disputes cost <span className="italic">thousands</span> to resolve.
              </h2>
              <p className="mt-8 text-lg font-medium leading-relaxed text-ink-700">
                Current rent ecosystems rely on vague bank references and verbal 
                agreements. There is no independent, neutral verification layer 
                to bridge the trust gap between transfer and confirmation.
              </p>
            </div>
            <div className="border border-ink-900/10 bg-paper-50 p-1">
              <div className="border border-ink-900/10 p-8">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-900 mb-8 border-b border-ink-900/10 pb-4">
                  Trust Gap Analysis
                </h3>
                <div className="space-y-6">
                  {[
                    { id: 'REC-01', text: 'Landlord negates receipt of funds despite transfer' },
                    { id: 'REC-02', text: 'Bank references contain insufficient metadata' },
                    { id: 'REC-03', text: 'Cash transactions lack verifiable temporal records' },
                    { id: 'REC-04', text: 'Tribunals reject non-structured payment evidence' },
                  ].map((p) => (
                    <div key={p.id} className="grid grid-cols-12 gap-4 items-start py-2 border-b border-ink-900/5 last:border-0 pb-4">
                      <span className="col-span-2 text-[10px] font-bold text-audit-600">{p.id}</span>
                      <p className="col-span-10 text-sm font-medium text-ink-800">{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Protocol Manual ──────────────────────────────── */}
      <section id="how-it-works" className="py-32 bg-paper-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 border-b border-ink-900/10 pb-12">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600">
                02 — The Resolution Protocol
              </p>
              <h2 className="mt-6 font-display text-5xl font-bold tracking-tight text-ink-900 leading-tight">
                Establishing the immutable record.
              </h2>
            </div>
            <p className="max-w-xs text-sm font-medium text-ink-600 leading-relaxed">
              Our three-stage protocol ensures every payment is locked into a 
              verifiable archive accessible by all parties.
            </p>
          </div>

          <div className="grid gap-1 lg:grid-cols-3 bg-ink-900/10 border border-ink-900/10">
            {[
              {
                step: '01',
                title: 'Record Payment',
                description: 'Tenant records payment details including date, amount, and reference. System assigns a unique Receipt ID.',
              },
              {
                step: '02',
                title: 'Verification Link',
                description: 'Counterparty receives a single-use verification token. Upon validation, the record status is upgraded to Verified.',
              },
              {
                step: '03',
                title: 'Vault Protection',
                description: 'Tamper-resistant PDF receipt is generated and secured. Record becomes a permanent part of your payment history.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-paper-50 p-10 hover:bg-paper-100 transition-colors">
                <span className="font-display text-6xl font-bold text-ink-900/5 mb-6 block leading-none">{item.step}</span>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-900 mb-4">{item.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-ink-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Audience ───────────────────────────────────── */}
      <section id="for-who" className="bg-paper-100 py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-20">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600">
              03 — User Benefits
            </p>
            <h2 className="mt-6 font-display text-5xl font-bold tracking-tight text-ink-900 leading-tight">
              A universal standard for the rental chain.
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {[
              {
                title: 'Tenants',
                label: 'Archive Group A',
                features: [
                  'Record rent payments locally',
                  'Generate verified receipts',
                  'Build archival payment history',
                  'Neutral evidence for disputes',
                ],
              },
              {
                title: 'Landlords',
                label: 'Archive Group B',
                features: [
                  'One-click manifest validation',
                  'Consolidated property oversight',
                  'Audited rent history export',
                  'Reduced litigation exposure',
                ],
              },
              {
                title: 'Agents',
                label: 'Service Group C',
                features: [
                  'Portfolio-level documentation',
                  'Bulk receipt management',
                  'Professional reporting standard',
                  'Regulatory compliance logs',
                ],
              },
            ].map((role) => (
              <div
                key={role.title}
                className="group border-t border-ink-900 pb-12 pt-6"
              >
                <div className="flex justify-between items-center mb-10">
                  <h3 className="font-display text-4xl font-bold italic text-ink-900">
                    {role.title}
                  </h3>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-ink-400">{role.label}</span>
                </div>
                <ul className="space-y-4">
                  {role.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-4 text-xs font-bold uppercase tracking-wide text-ink-600"
                    >
                      <span className="mt-1 h-1 w-1 bg-ink-900 group-hover:bg-brand-600 transition-colors" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global Utility ────────────────────────────────── */}
      <section className="py-32 border-y border-ink-900/10 bg-paper-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-24 lg:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600">
                04 — Global Utility
              </p>
              <h2 className="mt-6 font-display text-5xl font-bold tracking-tight text-ink-900 leading-[1.1]">
                Institutional Trust.<br />Global Access.
              </h2>
              <p className="mt-10 text-lg font-medium leading-relaxed text-ink-700">
                Designed for jurisdictions requiring structured documentation. 
                Whether in Nigeria’s cash-heavy market or the UK’s regulated 
                tribunal systems, RentProof provides the protocol for truth.
              </p>

              <div className="mt-12 flex items-center gap-4">
                <Globe2 className="h-4 w-4 text-brand-600" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-ink-500">
                  Universal Metadata Architecture v1.02
                </p>
              </div>
            </div>

            <div className="space-y-1">
              {[
                {
                  title: 'Legally Neutral',
                  body: 'RentProof exists as a documentation protocol only. We do not hold assets or provide legal council.',
                },
                {
                  title: 'Secure Records',
                  body: 'Every record is timestamped. Receipts are immutable once validated.',
                },
                {
                  title: 'Independent Resolution',
                  body: 'Verification stands independent of bank notification, fulfilling the gap between payment and acknowledgment.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-paper-100 p-8 border border-ink-900/5 group hover:border-ink-900/20 transition-all"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4 text-ink-900" />
                    <h4 className="text-xs font-bold uppercase tracking-widest text-ink-900">{item.title}</h4>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-ink-600">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Service tiers ────────────────────────────────── */}
      <section id="pricing" className="bg-paper-100 py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-24">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600">
              05 — Service Provision
            </p>
            <h2 className="mt-6 font-display text-5xl font-bold tracking-tight text-ink-900">
              Transparent scaling.
            </h2>
          </div>

          <div className="grid gap-px bg-ink-900/10 border border-ink-900/10 lg:grid-cols-3">
            {[
              {
                name: 'Tenant Core',
                price: '£4',
                period: '/mo',
                description: 'Personal archive management for renters.',
                features: ['Unlimited receipts', 'Landlord validation flow', 'PDF Receipts', 'Payment history'],
                cta: 'Get Started',
                highlight: false,
              },
              {
                name: 'Landlord Master',
                price: '£15',
                period: '/mo',
                description: 'Portfolio oversight for independent owners.',
                features: ['Up to 5 properties', 'Consolidated timeline', 'Data export (CSV/PDF)', 'Priority support'],
                cta: 'Get Started',
                highlight: true,
              },
              {
                name: 'Enterprise Agent',
                price: 'Custom',
                period: '',
                description: 'Full agency management for letting agencies.',
                features: ['Unlimited properties', 'Bulk management', 'API access (v1.0)', 'Dedicated lead'],
                cta: 'Contact Sales',
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col bg-paper-50 p-12 ${
                  plan.highlight ? 'relative z-10 scale-[1.02] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border-x border-ink-900/20' : ''
                }`}
              >
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-ink-500 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="font-display text-5xl font-bold text-ink-900">{plan.price}</span>
                  <span className="text-sm font-bold text-ink-400 uppercase">{plan.period}</span>
                </div>
                <p className="mt-6 text-sm font-medium text-ink-700 leading-relaxed min-h-[48px]">
                  {plan.description}
                </p>

                <ul className="mt-12 space-y-5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-xs font-bold text-ink-900 uppercase tracking-wide">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-600" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href="/auth/signup" className="w-full">
                  <Button
                    className="rounded-none h-14 w-full"
                    variant={plan.highlight ? 'primary' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-900 py-32">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(34,197,94,0.3) 0%, transparent 50%)`,
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-10 inline-flex items-center gap-2 border border-paper-50/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-paper-50/60 font-mono">
            RP-SYSTEM-JOIN-v1.02
          </div>
          <h2 className="font-display text-5xl font-bold tracking-tight text-paper-50 md:text-6xl">
            Neutrality is our <span className="italic text-brand-600">Standard.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg font-medium leading-relaxed text-paper-50/60">
            Join thousands of tenants and landlords established in the 
            RentProof protocol. Stop arguing. Start proving.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Link href="/auth/signup">
              <Button size="lg" className="px-10 rounded-none h-14 bg-brand-600 hover:bg-brand-500 border-none">
                Create Protocol Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="border-t border-ink-900/10 bg-paper-100 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Link href="/" className="flex items-center gap-3">
                <Logo iconOnly size="sm" />
                <span className="font-display text-sm font-bold uppercase tracking-widest text-ink-900">
                  RentProof
                </span>
              </Link>
              <p className="mt-6 text-[11px] font-bold uppercase leading-relaxed tracking-widest text-ink-500 max-w-xs">
                The independent verification layer for modern rental documentation. 
                Court-admissible structured receipts.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-12 lg:col-span-5">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-900 mb-6">Resources</h4>
                <ul className="space-y-4">
                  <li>
                    <Link href="/verify" className="text-[11px] font-bold uppercase tracking-widest text-ink-600 hover:text-ink-900 transition-colors">
                      Verify Receipt
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources" className="text-[11px] font-bold uppercase tracking-widest text-ink-600 hover:text-ink-900 transition-colors">
                      Resource Hub
                    </Link>
                  </li>
                  <li>
                    <Link href="/protocol" className="text-[11px] font-bold uppercase tracking-widest text-ink-600 hover:text-ink-900 transition-colors">
                      Protocol Standard
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-900 mb-6">Institutional</h4>
                <ul className="space-y-4">
                  <li>
                    <Link href="/privacy-policy" className="text-[11px] font-bold uppercase tracking-widest text-ink-600 hover:text-ink-900 transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-of-service" className="text-[11px] font-bold uppercase tracking-widest text-ink-600 hover:text-ink-900 transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-3 lg:text-right flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400">System Status</p>
                <div className="mt-2 flex items-center gap-2 lg:justify-end text-[10px] font-bold uppercase tracking-widest text-brand-600 font-mono">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-600" />
                  Operational
                </div>
              </div>
              <p className="mt-12 text-[10px] font-bold uppercase tracking-widest text-ink-400 font-mono">
                RP-NODE-01 // © 2026
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
