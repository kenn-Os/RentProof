import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { ArrowLeft, Gavel, FileCheck, Scale, AlertTriangle } from 'lucide-react'

export default function TermsOfServicePage() {
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
            <Gavel className="h-3 w-3" />
            RP-PROTOCOL-TERMS-v2.0
          </div>
          <h1 className="font-display text-6xl font-bold tracking-tight mb-6">Terms of Service</h1>
          <p className="text-sm font-bold text-ink-400 uppercase tracking-[0.2em] italic">
            Revised: {lastUpdated} <span>//</span> Institutional Standard
          </p>
        </header>

        <div className="grid gap-20 lg:grid-cols-12">
          <aside className="lg:col-span-4 hidden lg:block sticky top-32 h-fit">
            <nav className="space-y-6">
              {[
                { id: '01', title: 'Service Definition' },
                { id: '02', title: 'User Obligations' },
                { id: '03', title: 'Verification Standard' },
                { id: '04', title: 'Liability Limits' },
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
                <FileCheck className="h-4 w-4 text-brand-600" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-900">01/ Service Definition</h2>
              </div>
              <p className="text-lg font-medium leading-relaxed text-ink-700">
                RentProof (the &quot;Service&quot;) provides a platform for the 
                creation, verification, and archival of rent payment documentation. 
                We are a documentation utility. We are not a bank, payment processor, 
                escrow agent, or legal counsel.
              </p>
              <div className="mt-8 p-6 bg-paper-200 border-l-2 border-brand-600 border-y border-ink-900/5">
                <p className="text-xs font-bold text-ink-900 uppercase tracking-widest leading-loose">
                  RentProof provides the verification layer but does NOT facilitate 
                  the actual transfer of funds between parties.
                </p>
              </div>
            </section>

            <section>
              <div className="mb-6 flex items-center gap-3">
                <Scale className="h-4 w-4 text-brand-600" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-900">02/ Accuracy of Declarations</h2>
              </div>
              <p className="text-lg font-medium leading-relaxed text-ink-700">
                By entering payment data, you declare under the RentProof protocol 
                standards that the provided transaction details are accurate. 
                Landlords/Agents then verify this declaration. Misrepresenting 
                transaction data constitutes a violation of these terms and 
                may result in account termination.
              </p>
            </section>

            <section>
              <div className="mb-6 flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-brand-600" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-900">03/ Limitation of Liability</h2>
              </div>
              <p className="text-lg font-medium leading-relaxed text-ink-700">
                RentProof and its parent entities are not liable for any disputes, 
                financial losses, or legal costs arising between users of the 
                system. The RentProof mark and generated receipts serve as neutral 
                evidence of a mutually confirmed event, but their admissibility 
                in specific courts is subject to local jurisdiction rules.
              </p>
            </section>

            <section className="bg-paper-200 p-12 italic text-ink-600 border border-ink-900/10">
              <p className="text-sm leading-relaxed max-w-md mx-auto text-center">
                &quot;The protocol exists to bridge the trust gap. By using 
                RentProof, you accept the responsibility of being the primary 
                auditor of your own rental documentation.&quot;
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-ink-900/10 py-16 bg-paper-100">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between gap-8 items-center">
          <div className="flex items-center gap-3">
            <Logo iconOnly size="sm" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400">RentProof Institutional // 2026</span>
          </div>
          <div className="flex gap-12">
            <Link href="/privacy-policy" className="text-[10px] font-bold uppercase tracking-widest text-ink-500 hover:text-ink-900">Privacy Policy</Link>
            <Link href="/protocol" className="text-[10px] font-bold uppercase tracking-widest text-ink-500 hover:text-ink-900">Protocol Standards</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
