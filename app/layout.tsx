import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'RentProof — Neutral Rent Payment Verification',
    template: '%s | RentProof',
  },
  description:
    'RentProof generates time-stamped, mutually confirmed rent receipts — protecting tenants and landlords with legally structured, tamper-resistant payment records.',
  keywords: [
    'rent receipt',
    'rent verification',
    'payment proof',
    'landlord',
    'tenant',
    'rental documentation',
  ],
  openGraph: {
    type: 'website',
    siteName: 'RentProof',
    title: 'RentProof — Neutral Rent Payment Verification',
    description:
      'Time-stamped, mutually confirmed rent receipts. Protect yourself with structured payment documentation.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body bg-slate-50 text-slate-900 antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: 'var(--font-body)',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
            },
          }}
        />
      </body>
    </html>
  )
}
