import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { StatCard } from '@/components/dashboard/StatCard'
import { Property, Tenancy, RentPayment } from '@/lib/types/database'
import {
  Building2,
  Users,
  FileText,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'

export const metadata = { title: 'Agent Dashboard' }

export default async function AgentDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/signin')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'agent') redirect(`/dashboard/${profile?.role}`)

  // Get managed properties
  const { data: properties } = await supabase
    .from('properties')
    .select('*, tenancies(*, rent_payments(*))')
    .eq('agent_id', user.id)
    .eq('is_active', true)

  const typedProperties = properties as unknown as Property[]
  const allTenancies = typedProperties?.flatMap((p) => p.tenancies ?? []) ?? []
  const allPayments = allTenancies.flatMap((t) => t.rent_payments ?? [])
  const thisMonthPayments = allPayments.filter((p) => {
    const d = new Date(p.created_at)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Agent Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Portfolio overview for {profile?.company_name ?? profile?.full_name}
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Properties"
          value={properties?.length ?? 0}
          icon={<Building2 className="h-5 w-5 text-slate-600" />}
          iconBg="bg-slate-100"
        />
        <StatCard
          title="Tenants"
          value={allTenancies.filter((t: Tenancy) => t.is_active).length}
          icon={<Users className="h-5 w-5 text-blue-600" />}
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Total Receipts"
          value={allPayments.length}
          icon={<FileText className="h-5 w-5 text-violet-600" />}
          iconBg="bg-violet-50"
        />
        <StatCard
          title="This Month"
          value={thisMonthPayments.length}
          subtitle="payment records"
          icon={<TrendingUp className="h-5 w-5 text-green-600" />}
          iconBg="bg-green-50"
        />
      </div>

      {/* Properties table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-900">Managed Properties</h2>
          <Link
            href="/dashboard/agent/tenants"
            className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
          >
            All tenants <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {(!properties || properties.length === 0) ? (
          <div className="p-10 text-center">
            <Building2 className="mx-auto mb-3 h-10 w-10 text-slate-200" />
            <p className="text-sm text-slate-500">
              No properties assigned yet. Contact landlords to be added as a managing agent.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Property</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Tenants</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Receipts</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Pending</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {typedProperties.map((property: Property) => {
                  const activeTenancies = (property.tenancies ?? []).filter((t: Tenancy) => t.is_active)
                  const propertyPayments = (property.tenancies ?? []).flatMap((t: Tenancy) => t.rent_payments ?? [])
                  const pending = propertyPayments.filter((p: RentPayment) => p.status === 'pending').length

                  return (
                    <tr key={property.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-900">{property.address_line1}</p>
                        <p className="text-xs text-slate-400">{property.city}, {property.postcode}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">{activeTenancies.length}</td>
                      <td className="px-5 py-4 text-sm text-slate-600">{propertyPayments.length}</td>
                      <td className="px-5 py-4">
                        {pending > 0 ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                            {pending}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
