'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Menu } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Mock profile for UI prototype
  const profile = {
    id: 'mock-user-123',
    full_name: 'John Doe',
    email: 'tenant@example.com',
    role: 'tenant' as const,
    avatar_url: null,
    phone: '+44 123 456 7890',
    company_name: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  return (
    <div className="flex h-screen overflow-hidden bg-paper-200">
      <Sidebar 
        profile={profile} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-900/10 bg-paper-50 px-6 lg:hidden">
          <Logo iconOnly size="sm" />
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-sm p-2 text-ink-600 hover:bg-ink-900/5 hover:text-ink-900"
          >
            <Menu className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
