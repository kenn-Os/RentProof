import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { StatCard } from '@/components/dashboard/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import {
  Receipt,
  CheckCircle2,
  Clock,
  PoundSterling,
  ArrowRight,
  Plus,
} from 'lucide-react'
import { formatCurrency, formatDate, formatRentPeriod } from '@/lib/utils'

export const metadata = { title: 'Tenant Dashboard' }

export default async function TenantDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/signin')

  // Get profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'tenant') redirect(`/dashboard/${profile?.role}`)

  // Get tenancies with payments
  const { data: tenancies } = await supabase
    .from('tenancies')
    .select(
      `
      *,
      property:properties(*),
      rent_payments(*)
    `
    )
    .eq('tenant_id', user.id)
    .order('created_at', { ascending: false })

  const allPayments = tenancies?.flatMap((t: any) => t.rent_payments ?? []) ?? []
  const totalPaid = allPayments.reduce((sum: number, p: any) => sum + (p.amount ?? 0), 0)
  const verifiedCount = allPayments.filter((p: any) => p.status === 'verified').length
  const pendingCount = allPayments.filter((p: any) => p.status === 'pending').length

  // Recent payments (last 5)
  const recentPayments = [...allPayments]
    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Good day, {profile?.full_name.split(' ')[0]}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here's your rent payment overview
          </p>
        </div>
        <Link
          href="/dashboard/tenant/payments/new"
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          Record Payment
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Paid"
          value={formatCurrency(totalPaid)}
          subtitle="All time"
          icon={<PoundSterling className="h-5 w-5 text-slate-600" />}
          iconBg="bg-slate-100"
        />
        <StatCard
          title="Total Receipts"
          value={allPayments.length}
          icon={<Receipt className="h-5 w-5 text-blue-600" />}
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Verified"
          value={verifiedCount}
          icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
          iconBg="bg-green-50"
        />
        <StatCard
          title="Pending"
          value={pendingCount}
          subtitle="Awaiting confirmation"
          icon={<Clock className="h-5 w-5 text-amber-600" />}
          iconBg="bg-amber-50"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent payments */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900">Recent Payments</h2>
              <Link
                href="/dashboard/tenant/payments"
                className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {recentPayments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Receipt className="mb-3 h-10 w-10 text-slate-200" />
                <p className="text-sm font-medium text-slate-500">
                  No payments yet
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Record your first rent payment to get started
                </p>
                <Link
                  href="/dashboard/tenant/payments/new"
                  className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800"
                >
                  <Plus className="h-4 w-4" /> Record Payment
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {recentPayments.map((payment: any) => {
                  const tenancy = tenancies?.find((t: any) =>
                    t.rent_payments?.some((p: any) => p.id === payment.id)
                  )
                  return (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="receipt-id-chip rounded bg-slate-100 px-1.5 py-0.5 text-slate-600">
                            {payment.receipt_id}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm font-medium text-slate-900">
                          {tenancy?.property?.address_line1 ?? 'Property'}
                        </p>
                        <p className="text-xs text-slate-400">
                          {formatRentPeriod(
                            payment.rent_period_start,
                            payment.rent_period_end
                          )}
                        </p>
                      </div>
                      <div className="ml-4 flex flex-col items-end gap-1.5">
                        <span className="font-semibold text-slate-900">
                          {formatCurrency(payment.amount, payment.currency)}
                        </span>
                        <StatusBadge status={payment.status} size="sm" />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Properties */}
        <div>
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900">My Properties</h2>
            </div>
            {tenancies?.length === 0 ? (
              <div className="p-5 text-center">
                <p className="text-sm text-slate-500">No active tenancies</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {tenancies?.map((tenancy: any) => (
                  <div key={tenancy.id} className="p-4">
                    <p className="text-sm font-medium text-slate-900">
                      {tenancy.property?.address_line1}
                    </p>
                    <p className="text-xs text-slate-500">
                      {tenancy.property?.city}, {tenancy.property?.postcode}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        From {formatDate(tenancy.start_date)}
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {formatCurrency(tenancy.rent_amount, tenancy.currency)}/mo
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
