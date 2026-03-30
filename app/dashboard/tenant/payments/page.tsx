import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import {
  Plus,
  FileDown,
  Search,
} from 'lucide-react'
import { formatCurrency, formatDate, formatRentPeriod, formatPaymentMethod } from '@/lib/utils'
import type { RentPayment } from '@/lib/types/database'

export const metadata = { title: 'My Payments' }

export default async function TenantPaymentsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/signin')

  const { data: payments } = await supabase
    .from('rent_payments')
    .select(
      `
      *,
      tenancy:tenancies(
        *,
        property:properties(*)
      ),
      confirmation:confirmations(*)
    `
    )
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Payment History
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            All your rent payment records
          </p>
        </div>
        <Link href="/dashboard/tenant/payments/new">
          <Button>
            <Plus className="h-4 w-4" />
            Record Payment
          </Button>
        </Link>
      </div>

      {/* Filters (static for now — enhance with client-side filtering) */}
      <div className="mb-5 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search receipts..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <select className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-900">
          <option value="">All statuses</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="disputed">Disputed</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Table */}
      {!payments || payments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-16 text-center">
          <p className="text-sm text-slate-500">No payment records yet.</p>
          <Link href="/dashboard/tenant/payments/new" className="mt-3 inline-block text-sm text-green-600 hover:underline">
            Record your first payment →
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Receipt ID
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Property
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Period
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Amount
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Method
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {(payments as unknown as RentPayment[]).map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <span className="receipt-id-chip rounded bg-slate-100 px-1.5 py-0.5 text-slate-700">
                      {payment.receipt_id}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-900">
                      {payment.tenancy?.property?.address_line1 ?? '—'}
                    </p>
                    <p className="text-xs text-slate-400">
                      {payment.tenancy?.property?.city}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {formatRentPeriod(
                      payment.rent_period_start,
                      payment.rent_period_end
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-slate-900">
                      {formatCurrency(payment.amount, payment.currency)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {formatPaymentMethod(payment.payment_method)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={payment.status} size="sm" />
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-400">
                    {formatDate(payment.created_at)}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/dashboard/tenant/receipts/${payment.id}`}
                      className="flex items-center gap-1 text-xs font-medium text-green-600 hover:text-green-700"
                    >
                      <FileDown className="h-3.5 w-3.5" />
                      PDF
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
