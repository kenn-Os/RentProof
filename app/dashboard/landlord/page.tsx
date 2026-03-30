import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { StatCard } from '@/components/dashboard/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import {
  Building2,
  Users,
  CheckSquare,
  Clock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { formatCurrency, formatDate, formatRentPeriod } from '@/lib/utils'

export const metadata = { title: 'Landlord Dashboard' }

export default async function LandlordDashboardPage() {
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

  if (profile?.role !== 'landlord') redirect(`/dashboard/${profile?.role}`)

  // Get properties
  const { data: properties } = await supabase
    .from('properties')
    .select('*, tenancies(*, rent_payments(*))')
    .eq('landlord_id', user.id)
    .eq('is_active', true)

  const allTenancies = properties?.flatMap((p: any) => p.tenancies ?? []) ?? []
  const allPayments = allTenancies.flatMap((t: any) => t.rent_payments ?? [])
  const pendingPayments = allPayments.filter((p: any) => p.status === 'pending')
  const verifiedPayments = allPayments.filter((p: any) => p.status === 'verified')

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Landlord Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back, {profile?.full_name.split(' ')[0]}
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
          title="Active Tenants"
          value={allTenancies.filter((t: any) => t.is_active).length}
          icon={<Users className="h-5 w-5 text-blue-600" />}
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Pending Confirmations"
          value={pendingPayments.length}
          subtitle="Action needed"
          icon={<Clock className="h-5 w-5 text-amber-600" />}
          iconBg="bg-amber-50"
        />
        <StatCard
          title="Verified Payments"
          value={verifiedPayments.length}
          icon={<CheckSquare className="h-5 w-5 text-green-600" />}
          iconBg="bg-green-50"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Pending confirmations */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-slate-900">
                  Pending Confirmations
                </h2>
                {pendingPayments.length > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                    {pendingPayments.length}
                  </span>
                )}
              </div>
              <Link
                href="/dashboard/landlord/confirmations"
                className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {pendingPayments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="mb-2 h-10 w-10 text-green-200" />
                <p className="text-sm text-slate-500">
                  All payments confirmed — you're up to date!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {pendingPayments.slice(0, 5).map((payment: any) => {
                  const tenancy = allTenancies.find((t: any) =>
                    t.rent_payments?.some((p: any) => p.id === payment.id)
                  )
                  const property = properties?.find(
                    (prop: any) => prop.id === tenancy?.property_id
                  )

                  return (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {property?.address_line1 ?? 'Property'}
                        </p>
                        <p className="text-xs text-slate-400">
                          {formatRentPeriod(
                            payment.rent_period_start,
                            payment.rent_period_end
                          )}{' '}
                          · {formatDate(payment.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-slate-900">
                          {formatCurrency(payment.amount, payment.currency)}
                        </span>
                        <Link
                          href={`/dashboard/landlord/confirmations/${payment.id}`}
                          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-green-600 px-3 text-xs font-medium text-white hover:bg-green-700 transition-colors"
                        >
                          Confirm
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Properties */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900">Properties</h2>
              <Link
                href="/dashboard/landlord/properties"
                className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
              >
                Manage <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {properties?.length === 0 ? (
              <div className="p-5 text-center">
                <p className="text-sm text-slate-500">
                  No properties yet.{' '}
                  <Link
                    href="/dashboard/landlord/properties/new"
                    className="text-green-600 underline"
                  >
                    Add one
                  </Link>
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {properties?.map((property: any) => {
                  const activeTenancies = (property.tenancies ?? []).filter(
                    (t: any) => t.is_active
                  )
                  return (
                    <div key={property.id} className="p-4">
                      <p className="text-sm font-medium text-slate-900">
                        {property.address_line1}
                      </p>
                      <p className="text-xs text-slate-400">
                        {property.city}, {property.postcode}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                          <Users className="h-3 w-3" />
                          {activeTenancies.length} tenant
                          {activeTenancies.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
