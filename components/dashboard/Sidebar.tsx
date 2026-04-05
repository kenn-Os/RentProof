"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import {
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
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { signOut } from "@/app/auth/actions";
import type { Profile } from "@/lib/types/database";

interface SidebarProps {
  profile: Profile;
  isOpen: boolean;
  onClose: () => void;
}

const navByRole: Record<
  string,
  { href: string; label: string; icon: React.ReactNode }[]
> = {
  tenant: [
    {
      href: "/dashboard/tenant",
      label: "Overview",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      href: "/dashboard/tenant/payments",
      label: "My Payments",
      icon: <Receipt className="h-4 w-4" />,
    },
    {
      href: "/dashboard/tenant/receipts",
      label: "Receipts",
      icon: <FileText className="h-4 w-4" />,
    },
  ],
  landlord: [
    {
      href: "/dashboard/landlord",
      label: "Overview",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      href: "/dashboard/landlord/confirmations",
      label: "Confirmations",
      icon: <CheckSquare className="h-4 w-4" />,
    },
    {
      href: "/dashboard/landlord/properties",
      label: "Properties",
      icon: <Building2 className="h-4 w-4" />,
    },
  ],
  agent: [
    {
      href: "/dashboard/agent",
      label: "Overview",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      href: "/dashboard/agent/tenants",
      label: "Tenants",
      icon: <Users className="h-4 w-4" />,
    },
    {
      href: "/dashboard/agent/reports",
      label: "Reports",
      icon: <BarChart3 className="h-4 w-4" />,
    },
  ],
};

export function Sidebar({ profile, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async () => {
    startTransition(async () => {
      try {
        await signOut();
      } catch {
        router.push("/");
      }
    });
  };

  const navItems = navByRole[profile.role] ?? [];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-ink-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-ink-900/10 bg-paper-100 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-ink-900/10 px-5 shadow-sm">
          <Logo size="sm" />
          <button 
            onClick={onClose}
            className="p-1 rounded-sm text-ink-400 hover:text-ink-900 lg:hidden"
            aria-label="Close menu"
          >
            <Plus className="h-5 w-5 rotate-45" />
          </button>
        </div>

        <div className="p-4 border-b border-ink-900/10 mb-2">
          {profile.role === "tenant" && (
            <Link
              href="/dashboard/tenant/payments/new"
              className="flex h-9 w-full items-center justify-center gap-2 rounded-sm bg-ink-900 text-[10px] font-bold uppercase tracking-widest text-paper-50 transition-colors hover:bg-ink-800"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Payment
            </Link>
          )}
          {profile.role === "landlord" && (
            <Link
              href="/dashboard/landlord/properties/new"
              className="flex h-9 w-full items-center justify-center gap-2 rounded-sm bg-ink-900 text-[10px] font-bold uppercase tracking-widest text-paper-50 transition-colors hover:bg-ink-800"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Property
            </Link>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
          <p className="px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-ink-400">
            Navigation
          </p>
          {navItems.map((item) => {
            const isActive =
              item.href === `/dashboard/${profile.role}`
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={cn(
                  "sidebar-nav-item flex items-center gap-3 rounded-sm px-3 py-2 text-xs font-bold uppercase tracking-widest",
                  isActive
                    ? "bg-ink-900/5 text-ink-900 border-l-2 border-brand-600"
                    : "text-ink-600 hover:bg-ink-900/5 hover:text-ink-900",
                )}
              >
                <span className={isActive ? "text-brand-600" : "text-ink-400"}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-ink-900/10 p-3 space-y-1">
          <Link
            href="/dashboard/settings"
            onClick={() => onClose()}
            className="sidebar-nav-item flex items-center gap-3 rounded-sm px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-ink-500 hover:bg-ink-900/5 hover:text-ink-900"
          >
            <Settings className="h-3.5 w-3.5" />
            Settings
          </Link>

          {/* Profile */}
          <div className="mt-2 flex items-center gap-3 rounded-sm bg-paper-200 px-3 py-2 border border-ink-900/5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-ink-900 text-[10px] font-bold text-paper-50 uppercase">
              {getInitials(profile.full_name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-bold uppercase tracking-tight text-ink-900 leading-tight">
                {profile.full_name}
              </p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-ink-400 mt-0.5">
                {profile.role}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            disabled={isPending}
            className={cn(
              "sidebar-nav-item flex w-full items-center gap-3 rounded-sm px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-audit-600 hover:bg-audit-600/5 transition-colors disabled:opacity-50",
              isPending && "cursor-wait",
            )}
          >
            <LogOut className="h-3.5 w-3.5" />
            {isPending ? "Logging Out..." : "Sign Out"}
          </button>
        </div>
      </aside>
    </>
  );
}
