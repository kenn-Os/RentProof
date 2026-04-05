import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { ArrowLeft, BookOpen, FileText, HelpCircle, Download, FileCheck, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function ResourcesPage() {
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

      <main className="mx-auto max-w-7xl px-6 py-20">
        <header className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-ink-900/10 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-600 mb-8 font-mono">
            <BookOpen className="h-3 w-3" />
            RP-SYSTEM-RESOURCES-v1.0
          </div>
          <h1 className="font-display text-7xl font-bold tracking-tight mb-8">Resources & Support</h1>
          <p className="mx-auto max-w-2xl text-xl font-medium leading-relaxed text-ink-600">
            Everything you need to successfully integrate the RentProof protocol into your tenancy. 
            Guides, admissibility reports, and technical documentation.
          </p>
        </header>

        <div className="grid gap-px bg-ink-900/10 border border-ink-900/10 lg:grid-cols-3">
          {[
            {
              icon: <FileText className="h-6 w-6" />,
              title: 'Verification Guide',
              description: 'Step-by-step guide for tenants on recording payments and landlords on validating declarations.',
              link: '#',
              cta: 'Read Guide'
            },
            {
              icon: <Shield className="h-6 w-6" />,
              title: 'Admissibility Report',
              description: 'Our annual legal report on how RentProof records have performed in housing tribunals.',
              link: '#',
              cta: 'Download PDF'
            },
            {
              icon: <HelpCircle className="h-6 w-6" />,
              title: 'FAQ Protocol',
              description: 'Frequently asked questions regarding account security, data privacy, and dispute resolution.',
              link: '#',
              cta: 'View FAQ'
            }
          ].map((item) => (
            <div key={item.title} className="bg-paper-50 p-12 transition-colors hover:bg-paper-100 flex flex-col items-center text-center">
              <div className="mb-8 text-ink-900 border border-ink-900/10 p-4">{item.icon}</div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-900 mb-6">{item.title}</h2>
              <p className="text-sm font-medium leading-relaxed text-ink-600 mb-10 flex-1">
                {item.description}
              </p>
              <Button variant="outline" className="rounded-none w-full h-12 uppercase tracking-widest text-[10px] border-ink-900/10">
                {item.cta}
              </Button>
            </div>
          ))}
        </div>

        <section className="mt-32 border border-ink-900/10 bg-paper-200">
          <div className="grid lg:grid-cols-2">
            <div className="p-16 border-r border-ink-900/10">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 mb-8 flex items-center gap-2">
                <FileCheck className="h-4 w-4" />
                Downloadable Artifacts
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Protocol Standard v2.02', size: '2.4MB', icon: <Download className="h-3 w-3" /> },
                  { title: 'Tenant Checklist', size: '0.8MB', icon: <Download className="h-3 w-3" /> },
                  { title: 'Landlord Best Practices', size: '1.2MB', icon: <Download className="h-3 w-3" /> }
                ].map((item) => (
                  <div key={item.title} className="flex items-center justify-between p-4 border border-ink-900/5 bg-paper-50 group cursor-pointer hover:border-ink-900/20 transition-all">
                    <div className="flex items-center gap-4">
                      <span className="text-ink-900">{item.icon}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-ink-900">{item.title}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400 font-mono">{item.size}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-16 flex flex-col justify-center">
              <h2 className="text-4xl font-display font-bold text-ink-900 mb-6 italic leading-snug">
                Need specialized assistance?
              </h2>
              <p className="text-lg font-medium text-ink-600 mb-10 leading-relaxed">
                Connect with our protocol specialists to integrate RentProof into 
                your property management systems or portfolio.
              </p>
              <Button className="rounded-none h-14 bg-ink-900 hover:bg-ink-800 text-paper-50 uppercase tracking-widest text-[11px] w-fit px-12">
                Contact Support Desk
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink-900/10 py-16 bg-paper-100 mt-20">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between gap-8 items-center">
          <div className="flex items-center gap-3">
            <Logo iconOnly size="sm" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400">RentProof Institutional // 2026</span>
          </div>
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-widest text-ink-500">
            <Link href="/privacy-policy" className="hover:text-ink-900">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-ink-900">Terms of Service</Link>
            <Link href="/protocol" className="hover:text-ink-900 text-brand-600">Protocol</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
