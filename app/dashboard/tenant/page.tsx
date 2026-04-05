/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Receipt,
  Plus,
} from "lucide-react";
import { formatCurrency, formatDate, formatRentPeriod } from "@/lib/utils";

export const metadata = { title: "Tenant Dashboard" };

export default async function TenantDashboardPage() {
  // Mock data for UI prototype
  const profile = {
    full_name: "John Doe",
    role: "tenant",
  };

  const tenancies: any[] = [
    {
      id: "tenancy-1",
      start_date: "2024-01-01",
      rent_amount: 1200,
      currency: "GBP",
      property: {
        address_line1: "123 Baker Street",
        city: "London",
        postcode: "NW1 6XE",
      },
      rent_payments: [
        {
          id: "pay-1",
          receipt_id: "RP-2024-GB-99001",
          status: "verified",
          rent_period_start: "2024-03-01",
          rent_period_end: "2024-03-31",
          amount: 1200,
          currency: "GBP",
          created_at: "2024-04-01T10:00:00Z",
        },
        {
          id: "pay-2",
          receipt_id: "RP-2024-GB-99002",
          status: "pending",
          rent_period_start: "2024-04-01",
          rent_period_end: "2024-04-30",
          amount: 1200,
          currency: "GBP",
          created_at: "2024-05-01T09:00:00Z",
        },
      ],
    },
  ];

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const allPayments =
    tenancies?.flatMap((t: any) => t.rent_payments ?? []) ?? [];
  const totalPaid = allPayments.reduce(
    (sum: number, p: any) => sum + (p.amount ?? 0),
    0,
  );
  const verifiedCount = allPayments.filter((p: any) => p.status === "verified")
    .length;
  const pendingCount = allPayments.filter((p: any) => p.status === "pending")
    .length;

  // Recent payments (last 5)
  const recentPayments = [...allPayments]
    .sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 flex flex-col sm:flex-row sm:items-start justify-between border-b border-ink-900/20 pb-8 gap-6 sm:gap-0">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600 mb-2">
            Tenant Dashboard
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ink-900">
            Welcome, {profile?.full_name.split(" ")[0]}
          </h1>
          <p className="mt-2 text-xs md:text-sm font-medium text-ink-600 leading-relaxed">
            System status: <span className="text-ink-900 font-bold uppercase tracking-widest text-[9px]">Operational</span> — Records verified to date: <span className="text-ink-900 font-bold font-mono tracking-widest">{verifiedCount}</span>
          </p>
        </div>
        <Link
          href="/dashboard/tenant/payments/new"
          className="inline-flex items-center justify-center gap-2 font-medium rounded-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40 select-none bg-ink-900 text-paper-50 hover:bg-ink-800 px-6 md:px-8 h-12 text-[10px] uppercase tracking-widest"
        >
          <Plus className="h-4 w-4" />
          Add Payment
        </Link>
      </div>

      {/* Stats Table */}
      <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink-900/10 border border-ink-900/10 lg:grid-cols-4">
        <StatCard
          title="Total Payments"
          value={formatCurrency(totalPaid)}
          subtitle="Total recorded liquidity"
          className="border-0 bg-paper-50"
        />
        <StatCard
          title="Total Records"
          value={allPayments.length}
          subtitle="Total unique records"
          className="border-0 bg-paper-50"
        />
        <StatCard
          title="Verified Records"
          value={verifiedCount}
          subtitle="Counterparty validated"
          className="border-0 bg-paper-50"
        />
        <StatCard
          title="Pending Review"
          value={pendingCount}
          subtitle="Awaiting validation"
          className="border-0 bg-paper-50"
        />
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        {/* Recent Audit Manifests */}
        <div className="lg:col-span-8">
          <div className="border border-ink-900/15 bg-paper-50">
            <div className="flex items-center justify-between border-b border-ink-900/10 p-6 bg-paper-100">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-900 flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                Recent Payments
              </h2>
              <Link
                href="/dashboard/tenant/payments"
                className="text-[10px] font-bold uppercase tracking-widest text-brand-600 hover:text-brand-700 transition-colors"
              >
                View All →
              </Link>
            </div>

            {recentPayments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                <p className="text-sm font-bold uppercase tracking-widest text-ink-400">
                  Zero records found
                </p>
                <p className="mt-2 text-xs font-medium text-ink-500 max-w-xs">
                  No payments have been recorded for this account.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-ink-900/5">
                {recentPayments.map((payment: any) => {
                  const tenancy = tenancies?.find((t: any) =>
                    t.rent_payments?.some((p: any) => p.id === payment.id),
                  );
                  return (
                    <div
                      key={payment.id}
                      className="group flex items-center justify-between px-6 py-5 transition-colors hover:bg-paper-100"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10px] font-mono font-bold text-ink-400">
                            {payment.receipt_id}
                          </span>
                          <StatusBadge status={payment.status} />
                        </div>
                        <p className="text-sm font-bold text-ink-900 uppercase tracking-tight">
                          {tenancy?.property?.address_line1 ?? "Generic Property"}
                        </p>
                        <p className="text-[11px] font-medium text-ink-500">
                          Period: {formatRentPeriod(
                            payment.rent_period_start,
                            payment.rent_period_end,
                          )}
                        </p>
                      </div>
                      <div className="ml-4 text-right">
                        <span className="text-lg font-bold text-ink-900 block">
                          {formatCurrency(payment.amount, payment.currency)}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400">
                          GBP / Records
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Entity Entities */}
        <div className="lg:col-span-4">
          <div className="border border-ink-900/15 bg-paper-50 sticky top-24">
            <div className="border-b border-ink-900/10 p-6 bg-paper-100">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-900">Active Properties</h2>
            </div>
            {tenancies?.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400">No Properties</p>
              </div>
            ) : (
              <div className="divide-y divide-ink-900/5">
                {tenancies?.map((tenancy: any) => (
                  <div key={tenancy.id} className="p-6 transition-colors hover:bg-paper-100">
                    <p className="text-xs font-bold uppercase tracking-widest text-ink-900 mb-1">
                      {tenancy.property?.address_line1}
                    </p>
                    <p className="text-[11px] font-medium text-ink-500 mb-4">
                      {tenancy.property?.city}, {tenancy.property?.postcode}
                    </p>
                    <div className="flex items-center justify-between border-t border-ink-900/5 pt-4 mt-2">
                      <div className="text-[10px] uppercase font-bold text-ink-400">
                        Initiated<br />
                        <span className="text-ink-600">{formatDate(tenancy.start_date)}</span>
                      </div>
                      <div className="text-right">
                         <span className="text-sm font-bold text-brand-600 block">
                          {formatCurrency(tenancy.rent_amount, tenancy.currency)}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-ink-400">
                          Monthly Fee
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="p-4 border-t border-ink-900/10 bg-paper-100">
              <Link 
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40 select-none border border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-paper-50 w-full text-[10px] font-bold uppercase tracking-widest h-10"
              >
                Add New Property
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
