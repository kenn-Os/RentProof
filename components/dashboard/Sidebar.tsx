'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ShieldCheck,
  LayoutDashboard,
  Receipt,
  Building2,
  Users,
  FileText,
  CheckSquare,
  LogOut,
  BarChart3,
  Plus,
  Settings,
} from 'lucide-react'
import { cn, getInitials } from '@/lib/utils'
import { signOut } from '@/app/auth/actions'
import type { Profile } from '@/lib/types/database'

interface SidebarProps {
  profile: Profile
}

const navByRole: Record<
  string,
  { href: string; label: string; icon: React.ReactNode }[]
> = {
  tenant: [
    { href: '/dashboard/tenant', label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: '/dashboard/tenant/payments', label: 'My Payments', icon: <Receipt className="h-4 w-4" /> },
    { href: '/dashboard/tenant/receipts', label: 'Receipts', icon: <FileText className="h-4 w-4" /> },
  ],
  landlord: [
    { href: '/dashboard/landlord', label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: '/dashboard/landlord/confirmations', label: 'Confirmations', icon: <CheckSquare className="h-4 w-4" /> },
    { href: '/dashboard/landlord/properties', label: 'Properties', icon: <Building2 className="h-4 w-4" /> },
  ],
  agent: [
    { href: '/dashboard/agent', label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: '/dashboard/agent/tenants', label: 'Tenants', icon: <Users className="h-4 w-4" /> },
    { href: '/dashboard/agent/reports', label: 'Reports', icon: <BarChart3 className="h-4 w-4" /> },
  ],
}

export function Sidebar({ profile }: SidebarProps) {
  const pathname = usePathname()
  const navItems = navByRole[profile.role] ?? []

  return (
    <aside className="flex h-screen w-60 flex-shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-100 px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900">
          <ShieldCheck className="h-4 w-4 text-white" />
        </div>
        <span className="font-display text-base font-semibold text-slate-900">
          RentProof
        </span>
      </div>

      {/* Quick action */}
      <div className="p-4">
        {profile.role === 'tenant' && (
          <Link
            href="/dashboard/tenant/payments/new"
            className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            Record Payment
          </Link>
        )}
        {profile.role === 'landlord' && (
          <Link
            href="/dashboard/landlord/properties/new"
            className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            Add Property
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 px-3">
        {navItems.map((item) => {
          const isActive =
            item.href === `/dashboard/${profile.role}`
              ? pathname === item.href
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'sidebar-nav-item flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <span className={isActive ? 'text-white' : 'text-slate-400'}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-100 p-4 space-y-1">
        <Link
          href="/dashboard/settings"
          className="sidebar-nav-item flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-900"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>

        {/* Profile */}
        <div className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
            {getInitials(profile.full_name)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">
              {profile.full_name}
            </p>
            <p className="text-xs capitalize text-slate-400">{profile.role}</p>
          </div>
        </div>

        <form action={signOut}>
          <button
            type="submit"
            className="sidebar-nav-item flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  )
}
