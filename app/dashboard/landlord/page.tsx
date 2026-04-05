/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { StatCard } from "@/components/dashboard/StatCard";
import type { Property, Tenancy, RentPayment } from "@/lib/types/database";
import {
  Users,
  Plus,
  CheckCircle2,
} from "lucide-react";
import { formatCurrency, formatDate, formatRentPeriod } from "@/lib/utils";

export const metadata = { title: "Landlord Dashboard" };

export default async function LandlordDashboardPage() {
  // Mock data for UI prototype
  const profile = {
    full_name: "Jane Landlord",
    role: "landlord",
  };

  const mockProperties: any[] = [
    {
      id: "prop-1",
      address_line1: "123 Baker Street",
      city: "London",
      postcode: "NW1 6XE",
      is_active: true,
      tenancies: [
        {
          id: "tenancy-1",
          is_active: true,
          property_id: "prop-1",
          rent_payments: [
            {
              id: "pay-1",
              status: "verified",
              amount: 1200,
              currency: "GBP",
              rent_period_start: "2024-03-01",
              rent_period_end: "2024-03-31",
              created_at: "2024-04-01T10:00:00Z",
            },
            {
              id: "pay-2",
              status: "pending",
              amount: 1200,
              currency: "GBP",
              rent_period_start: "2024-04-01",
              rent_period_end: "2024-04-30",
              created_at: "2024-05-01T09:00:00Z",
            },
          ],
        },
      ],
    },
  ];

  const typedProperties = (mockProperties as unknown as Property[]) ?? [];
  const allTenancies = typedProperties.flatMap((p) => p.tenancies ?? []);
  const allPayments = allTenancies.flatMap((t) => t.rent_payments ?? []);
  const pendingPayments = allPayments.filter((p) => p.status === "pending");
  const verifiedPayments = allPayments.filter((p) => p.status === "verified");

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 flex flex-col sm:flex-row sm:items-start justify-between border-b border-ink-900/20 pb-8 gap-6 sm:gap-0">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-audit-600 mb-2 font-mono">
            PORTFOLIO-OVERVIEW-v1.0
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ink-900">
            Portfolio: {profile?.full_name.split(" ")[0]}
          </h1>
          <p className="mt-2 text-xs md:text-sm font-medium text-ink-600 leading-relaxed">
            Active Properties: <span className="text-ink-900 font-bold">{typedProperties.length}</span> — Pending Review: <span className="text-audit-600 font-bold font-mono tracking-widest">{pendingPayments.length}</span>
          </p>
        </div>
        <Link
          href="/dashboard/landlord/properties/new"
          className="inline-flex items-center justify-center gap-2 rounded-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40 select-none bg-ink-900 text-paper-50 hover:bg-ink-800 px-6 md:px-8 h-12 text-[10px] font-bold uppercase tracking-widest"
        >
          <Plus className="h-4 w-4" />
          Add Property
        </Link>
      </div>

      {/* Stats Table */}
      <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink-900/10 border border-ink-900/10 lg:grid-cols-4">
        <StatCard
          title="Total Properties"
          value={typedProperties?.length ?? 0}
          subtitle="Managed properties"
          className="border-0 bg-paper-50"
        />
        <StatCard
          title="Occupancy"
          value={allTenancies.filter((t: Tenancy) => t.is_active).length}
          subtitle="Active lease protocols"
          className="border-0 bg-paper-50"
        />
        <StatCard
          title="Pending Confirmations"
          value={pendingPayments.length}
          subtitle="Payments awaiting review"
          className="border-0 bg-paper-50"
        />
        <StatCard
          title="Verified Payments"
          value={verifiedPayments.length}
          subtitle="Verified payment records"
          className="border-0 bg-paper-50"
        />
      </div>

      <div className="grid gap-12 lg:grid-cols-5">
        {/* Pending Confirmations */}
        <div className="lg:col-span-3">
          <div className="border border-ink-900/15 bg-paper-50">
            <div className="flex items-center justify-between border-b border-ink-900/10 p-6 bg-paper-100">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-900">
                  Pending Confirmations
                </h2>
                {pendingPayments.length > 0 && (
                  <span className="flex h-5 px-1.5 items-center justify-center rounded-sm bg-audit-600 text-[10px] font-bold text-paper-50">
                    {pendingPayments.length} URGENT
                  </span>
                )}
              </div>
              <Link
                href="/dashboard/landlord/confirmations"
                className="text-[10px] font-bold uppercase tracking-widest text-brand-600 hover:text-brand-700 transition-colors"
              >
                Full Queue →
              </Link>
            </div>

            {pendingPayments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                <CheckCircle2 className="mb-4 h-8 w-8 text-ink-200" />
                <p className="text-sm font-bold uppercase tracking-widest text-ink-400">
                  Records Confirmed
                </p>
                <p className="mt-2 text-xs font-medium text-ink-500 max-w-xs">
                  All payment records have been successfully validated.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-ink-900/5">
                {pendingPayments.slice(0, 5).map((payment: RentPayment) => {
                  const tenancy = allTenancies.find((t: Tenancy) =>
                    t.rent_payments?.some(
                      (p: RentPayment) => p.id === payment.id,
                    ),
                  );
                  const matchProperty = typedProperties.find(
                    (prop: Property) => prop.id === tenancy?.property_id,
                  );

                  return (
                    <div
                      key={payment.id}
                      className="group flex items-center justify-between px-6 py-5 transition-colors hover:bg-paper-100"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-ink-900 uppercase tracking-tight mb-1">
                          {matchProperty?.address_line1 ?? "Generic Property"}
                        </p>
                        <p className="text-[11px] font-medium text-ink-500">
                          {formatRentPeriod(
                            payment.rent_period_start,
                            payment.rent_period_end,
                          )}
                          <span className="mx-2 text-ink-200">|</span>
                          Rec: {formatDate(payment.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-lg font-bold text-ink-900">
                          {formatCurrency(payment.amount, payment.currency)}
                        </span>
                        <Link
                          href={`/dashboard/landlord/confirmations/${payment.id}`}
                          className="inline-flex h-9 items-center justify-center rounded-sm bg-brand-600 px-4 text-[10px] font-bold uppercase tracking-widest text-paper-50 transition-colors hover:bg-brand-700"
                        >
                          Confirm Payment
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Portfolio Table */}
        <div className="lg:col-span-2">
          <div className="border border-ink-900/15 bg-paper-50 sticky top-24">
            <div className="flex items-center justify-between border-b border-ink-900/10 p-6 bg-paper-100">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-900">Property List</h2>
              <Link
                href="/dashboard/landlord/properties"
                className="text-[10px] font-bold uppercase tracking-widest text-ink-500 hover:text-ink-900 transition-colors"
              >
                Manage
              </Link>
            </div>
            {typedProperties.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-4">Registry Empty</p>
                <Link
                  href="/dashboard/landlord/properties/new"
                  className="text-[10px] font-bold uppercase tracking-widest text-brand-600 underline"
                >
                  Initiate Asset Registration
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-ink-900/5">
                {typedProperties.map((property: Property) => {
                  const activeTenancies = (property.tenancies ?? []).filter(
                    (t: Tenancy) => t.is_active,
                  );
                  return (
                    <div key={property.id} className="p-6 transition-colors hover:bg-paper-100">
                      <p className="text-xs font-bold uppercase tracking-widest text-ink-900 mb-1">
                        {property.address_line1}
                      </p>
                      <p className="text-[11px] font-medium text-ink-500 mb-3">
                        {property.city}, {property.postcode}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.05em] text-ink-400">
                          <Users className="h-3 w-3" />
                          {activeTenancies.length} Protocol{activeTenancies.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="p-4 border-t border-ink-900/10 bg-paper-100">
              <Link 
                href="/dashboard/landlord/properties/new"
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
