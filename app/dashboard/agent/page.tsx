/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { StatCard } from "@/components/dashboard/StatCard";
import { Property, Tenancy, RentPayment } from "@/lib/types/database";
import { Building2 } from "lucide-react";

export const metadata = { title: "Agent Dashboard" };

export default async function AgentDashboardPage() {
  // Mock data for UI prototype
  const profile = {
    full_name: "Alex Agent",
    company_name: "Prime Rentals Ltd",
    role: "agent",
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
          rent_payments: [
            {
              id: "pay-1",
              status: "verified",
              created_at: new Date().toISOString(),
            },
            {
              id: "pay-2",
              status: "pending",
              created_at: new Date().toISOString(),
            },
          ],
        },
      ],
    },
  ];

  const typedProperties = (mockProperties as unknown as Property[]) ?? [];
  const allTenancies = typedProperties?.flatMap((p) => p.tenancies ?? []) ?? [];
  const allPayments = allTenancies.flatMap((t) => t.rent_payments ?? []);
  const thisMonthPayments = allPayments.filter((p) => {
    const d = new Date(p.created_at);
    const now = new Date();
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 flex flex-col sm:flex-row sm:items-start justify-between border-b border-ink-900/20 pb-8 gap-6 sm:gap-0">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600 mb-2 font-mono">
            AGENCY-DASHBOARD-v1.0
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ink-900">
            {profile?.company_name ?? profile?.full_name}
          </h1>
          <p className="mt-2 text-xs md:text-sm font-medium text-ink-600 leading-relaxed">
            Managed Portfolio: <span className="text-ink-900 font-bold">{typedProperties?.length ?? 0}</span> Properties — Active Records: <span className="text-ink-900 font-bold font-mono tracking-widest">{allPayments.length}</span>
          </p>
        </div>
        <div className="flex items-center gap-4 border-l border-ink-900/10 pl-4 sm:border-l-0 sm:pl-0">
           <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400">
            System Agent:<br />
            <span className="text-ink-700 font-bold">{profile.full_name}</span>
          </p>
        </div>
      </div>

      {/* Stats Table */}
      <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink-900/10 border border-ink-900/10 lg:grid-cols-4">
        <StatCard
          title="Portfolio Total"
          value={typedProperties?.length ?? 0}
          subtitle="Total managed assets"
          className="border-0 bg-paper-50"
        />
        <StatCard
          title="Active Occupancy"
          value={allTenancies.filter((t: Tenancy) => t.is_active).length}
          subtitle="Verified leases"
          className="border-0 bg-paper-50"
        />
        <StatCard
          title="Total Records"
          value={allPayments.length}
          subtitle="Total archival manifests"
          className="border-0 bg-paper-50"
        />
        <StatCard
          title="Period Delta"
          value={thisMonthPayments.length}
          subtitle="New records (current month)"
          className="border-0 bg-paper-50"
        />
      </div>

      {/* Managed Properties Ledger */}
      <div className="border border-ink-900/15 bg-paper-50">
        <div className="flex items-center justify-between border-b border-ink-900/10 p-6 bg-paper-100">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-900 flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Property List
          </h2>
          <Link
            href="/dashboard/agent/tenants"
            className="text-[10px] font-bold uppercase tracking-widest text-brand-600 hover:text-brand-700 transition-colors"
          >
            View All Tenants →
          </Link>
        </div>

        {!typedProperties || typedProperties.length === 0 ? (
          <div className="p-20 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400">No Properties</p>
            <p className="mt-4 text-xs font-medium text-ink-500 max-w-sm mx-auto">
              No assets have been assigned to this agency protocol. Initialize linkage with property owners to begin documentation.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ink-900/10 bg-paper-100/50">
                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-ink-500">
                    Property Address
                  </th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-ink-500">
                    Active Protocols
                  </th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-ink-500">
                    Record Count
                  </th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-ink-500">
                    Audit Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-900/5">
                {typedProperties.map((property: Property) => {
                  const activeTenancies = (property.tenancies ?? []).filter(
                    (t: Tenancy) => t.is_active,
                  );
                  const propertyPayments = (property.tenancies ?? []).flatMap(
                    (t: Tenancy) => t.rent_payments ?? [],
                  );
                  const pending = propertyPayments.filter(
                    (p: RentPayment) => p.status === "pending",
                  ).length;

                  return (
                    <tr
                      key={property.id}
                      className="group transition-colors hover:bg-paper-100"
                    >
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-ink-900 uppercase tracking-tight">
                          {property.address_line1}
                        </p>
                        <p className="text-[11px] font-medium text-ink-500 mt-1">
                          {property.city}, {property.postcode}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-2">
                           <span className="text-sm font-bold text-ink-900">{activeTenancies.length}</span>
                           <span className="text-[9px] font-bold uppercase tracking-widest text-ink-400">Lease(s)</span>
                         </div>
                      </td>
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-2">
                           <span className="text-sm font-bold text-ink-900">{propertyPayments.length}</span>
                           <span className="text-[9px] font-bold uppercase tracking-widest text-ink-400">Records</span>
                         </div>
                      </td>
                      <td className="px-6 py-5">
                        {pending > 0 ? (
                          <div className="flex items-center gap-2">
                             <span className="flex h-5 px-1.5 items-center justify-center rounded-sm bg-audit-600 text-[10px] font-bold text-paper-50">
                              {pending} ACTION
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-ink-300 italic">Verified</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
