import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { ArrowLeft, Shield, Eye, Lock, FileText } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const lastUpdated = 'April 5, 2026';

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

      <main className="mx-auto max-w-4xl px-6 py-20">
        <header className="mb-20 border-b border-ink-900/10 pb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-ink-900/10 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-600 mb-8 font-mono">
            <Shield className="h-3 w-3" />
            RP-PROTOCOL-PRIVACY-v2.0
          </div>
          <h1 className="font-display text-6xl font-bold tracking-tight mb-6">Privacy Policy</h1>
          <p className="text-sm font-bold text-ink-400 uppercase tracking-[0.2em] italic">
            Effective Date: {lastUpdated} <span>//</span> Institutional Standard
          </p>
        </header>

        <div className="grid gap-20 lg:grid-cols-12">
          <aside className="lg:col-span-4 hidden lg:block sticky top-32 h-fit">
            <nav className="space-y-6">
              {[
                { id: '01', title: 'Data Neutrality' },
                { id: '02', title: 'Security Standard' },
                { id: '03', title: 'Audit Logs' },
                { id: '04', title: 'Privacy Controls' },
              ].map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-ink-200 font-mono">{item.id}</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-ink-500 group-hover:text-ink-900 transition-colors">
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </nav>
          </aside>

          <div className="lg:col-span-8 space-y-20">
            <section>
              <div className="mb-6 flex items-center gap-3">
                <Eye className="h-4 w-4 text-brand-600" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-900">01/ Data Collection Neutrality</h2>
              </div>
              <p className="text-lg font-medium leading-relaxed text-ink-700">
                RentProof operates as a neutral documentation utility. We collect 
                only the minimum viable data points required to establish a 
                verifiable rent payment record: email identifiers, transaction 
                metadata (amount, date, reference), and property address identifiers.
              </p>
              <div className="mt-8 p-6 bg-paper-200 border-l-2 border-brand-600 text-sm font-bold text-ink-600 uppercase tracking-wide">
                We do not integrate with banking APIs or track physical movement.
              </div>
            </section>

            <section>
              <div className="mb-6 flex items-center gap-3">
                <Lock className="h-4 w-4 text-brand-600" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-900">02/ Encrypted Storage Protocol</h2>
              </div>
              <p className="text-lg font-medium leading-relaxed text-ink-700">
                All protocol records are encrypted at rest and in transit. Your 
                personal data is never shared with third-party advertising networks. 
                Information is only utilized to generate the RentProof mark of 
                verification for your specific transactions.
              </p>
            </section>

            <section>
              <div className="mb-6 flex items-center gap-3">
                <FileText className="h-4 w-4 text-brand-600" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-900">03/ Permanent Audit Logs</h2>
              </div>
              <p className="text-lg font-medium leading-relaxed text-ink-700">
                To maintain the integrity of the RentProof standard, once a 
                receipt is mutually verified by both parties, the record metadata 
                is permanently locked within our archival system. This ensures 
                that no party can unilaterally alter a confirmed payment history 
                during legal disputes.
              </p>
            </section>

            <section className="bg-ink-900 p-10 text-paper-50">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-paper-50/40 mb-4 font-mono">
                DATA-SUBJECT-RIGHTS
              </h3>
              <p className="text-sm font-bold uppercase tracking-widest leading-relaxed mb-8">
                In accordance with global standards (GDPR, CCPA), users retain the 
                right to access and anonymize their personal profiles. Verified 
                receipts involving multiple counterparties remain in the protocol 
                archive to protect the integrity of the shared record.
              </p>
              <Link href="mailto:privacy@rentproof.app" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-600 border-b border-brand-600 pb-1">
                Contact Data Protection Officer
              </Link>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-ink-900/10 py-16 bg-paper-100">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Logo iconOnly size="sm" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400">RentProof Institutional // 2026</span>
          </div>
          <div className="flex gap-12">
            <Link href="/terms-of-service" className="text-[10px] font-bold uppercase tracking-widest text-ink-500 hover:text-ink-900">Terms of Service</Link>
            <Link href="/protocol" className="text-[10px] font-bold uppercase tracking-widest text-ink-500 hover:text-ink-900">Protocol Standards</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
