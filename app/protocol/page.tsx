import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { ArrowLeft, Shield, CheckCircle, Database, Lock, Scale, Zap } from 'lucide-react'

export default function ProtocolPage() {
  return (
    <div className="min-h-screen bg-paper-100 text-ink-900">
      <nav className="border-b border-ink-900/10 bg-paper-50/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group text-ink-600 hover:text-ink-900 transition-colors">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Home</span>
          </Link>
          <Logo iconOnly size="sm" />
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-20 pb-40">
        <header className="mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-ink-900/10 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-600 mb-8 font-mono">
            <Shield className="h-3 w-3" />
            RP-PROTOCOL-SPEC-v2.02
          </div>
          <h1 className="font-display text-7xl font-bold tracking-tight mb-8">Protocol Standards</h1>
          <p className="text-xl font-medium leading-relaxed text-ink-600 max-w-3xl">
            RentProof is not just an application. It is a documentation protocol 
            designed to create institutional trust in rental transactions 
            independent of traditional banking silos.
          </p>
        </header>

        <section className="space-y-32">
          {/* Section 01 */}
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-ink-900 flex items-center gap-3">
                <span className="text-brand-600">01/</span> The Trust Gap
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-2xl font-bold text-ink-900 italic leading-snug mb-8">
                &quot;The gap between payment initiation and counterparty 
                acknowledgment is the primary source of rental disputes.&quot;
              </p>
              <p className="text-lg font-medium leading-relaxed text-ink-700">
                Banks confirm that money moved, but they do NOT confirm that it was 
                for rent, or that the landlord received it. RentProof fills this 
                structural deficit by providing a neutral platform where 
                declarations are matched by validations, creating a court-admissible 
                audit record.
              </p>
            </div>
          </div>

          {/* Section 02 - Technical Pillars */}
          <div className="grid gap-16 lg:grid-cols-12 border-t border-ink-900/10 pt-32">
            <div className="lg:col-span-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-ink-900">
                <span className="text-brand-600">02/</span> Technical Pillars
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-12 sm:grid-cols-2">
                {[
                  {
                    icon: <CheckCircle className="h-5 w-5" />,
                    title: 'Bipartite Validation',
                    body: 'Records remain in &quot;Pending&quot; status until the counterparty interacts with a single-use protocol token.'
                  },
                  {
                    icon: <Lock className="h-5 w-5" />,
                    title: 'Immutable State',
                    body: 'Once a record is verified, its metadata is locked. No party can unilaterally alter historical transaction data.'
                  },
                  {
                    icon: <Database className="h-5 w-5" />,
                    title: 'Structured Metadata',
                    body: 'Every receipt follows the ISO-20022 messaging standards for financial documentation where applicable.'
                  },
                  {
                    icon: <Zap className="h-5 w-5" />,
                    title: 'Temporal Proof',
                    body: 'Transactions are timestamped at creation, validation, and archival, providing a verified temporal sequence.'
                  }
                ].map((pill) => (
                  <div key={pill.title}>
                    <div className="flex items-center gap-3 mb-4 text-ink-900">
                      {pill.icon}
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em]">{pill.title}</h3>
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-ink-600">{pill.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 03 - Legal Strategy */}
          <div className="grid gap-16 lg:grid-cols-12 border-t border-ink-900/10 pt-32">
            <div className="lg:col-span-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-ink-900">
                <span className="text-brand-600">03/</span> Legal Strategy
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-lg font-medium leading-relaxed text-ink-700 mb-12">
                RentProof records are designed to be submitted as &quot;Documentary 
                Evidence&quot; in housing tribunals and small claims courts. 
                By providing a mutually agreed-upon record, we reduce the burden 
                of proof for both tenants and landlords.
              </p>
              <div className="p-12 bg-ink-900 text-paper-50 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-paper-50/40 mb-4 font-mono">
                    ADMISSIBILITY-V2.0
                  </h4>
                  <p className="text-sm font-bold uppercase tracking-widest leading-loose">
                    Records meet &quot;Best Evidence Rule&quot; standards in multiple 
                    jurisdictions by providing a tamper-evident audit trail of 
                    mutual acknowledgement.
                  </p>
                </div>
                <Scale className="h-16 w-16 text-brand-600 shrink-0 opacity-50" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink-900/10 py-16 bg-paper-100">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between gap-8 items-center">
          <div className="flex items-center gap-3">
            <Logo iconOnly size="sm" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400">RentProof Institutional // 2026</span>
          </div>
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-widest text-ink-500">
            <Link href="/privacy-policy" className="hover:text-ink-900">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-ink-900">Terms of Service</Link>
            <Link href="/resources" className="hover:text-ink-900">Resources</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
