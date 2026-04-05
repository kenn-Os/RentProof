import { Download, Search, Filter, ShieldCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata = { title: "Receipts Vault" };

export default function ReceiptsPage() {
  const receipts = [
    {
      id: "RCPT-882-1PX",
      amount: 1200,
      currency: "GBP",
      period: "March 2024",
      date: "2024-03-01",
      property: "123 Baker Street",
      hash: "0x8a9b...f2e1",
      status: "verified",
    },
    {
      id: "RCPT-881-2PY",
      amount: 1200,
      currency: "GBP",
      period: "February 2024",
      date: "2024-02-01",
      property: "123 Baker Street",
      hash: "0x7c2d...a3d4",
      status: "verified",
    },
    {
      id: "RCPT-880-3PZ",
      amount: 1150,
      currency: "GBP",
      period: "January 2024",
      date: "2024-01-01",
      property: "45 high Street",
      hash: "0xfe1a...c9b2",
      status: "verified",
    },
  ];

  return (
    <div className="p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 flex items-start justify-between border-b border-ink-900/10 pb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600 mb-2">
            Verified Receipt Records
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink-900">
            Payment Receipts
          </h1>
          <p className="mt-2 text-sm font-medium text-ink-500">
            Receipts Found: <span className="text-ink-900 font-bold">{receipts.length}</span> — Status: <span className="text-brand-600 font-bold uppercase">Synchronized</span>
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-400" />
            <input 
              type="text" 
              placeholder="SEARCH BY HASH..." 
              className="h-10 pl-9 pr-4 rounded-sm border border-ink-900/15 bg-paper-100 text-[10px] font-bold uppercase tracking-widest text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-1 focus:ring-ink-900 w-64"
            />
          </div>
          <Button variant="outline" className="h-10 rounded-sm border-ink-900/15 bg-paper-100 text-[10px] font-bold uppercase tracking-widest text-ink-900 flex items-center gap-2">
            <Filter className="h-3.5 w-3.5" />
            System Filter
          </Button>
        </div>
      </div>

      {/* Main Table */}
      <div className="border border-ink-900/15 bg-paper-50 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-paper-100 border-b border-ink-900/10">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-ink-600">Receipt ID</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-ink-600">Payment Period</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-ink-600">Property</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-ink-600 text-right">Value</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-ink-600 text-center">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-ink-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-900/5">
            {receipts.map((receipt) => (
              <tr key={receipt.id} className="group hover:bg-paper-100 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-ink-900 uppercase tracking-tight mb-1">{receipt.id}</span>
                    <span className="text-[9px] font-mono font-medium text-ink-400 flex items-center gap-1 uppercase tracking-widest">
                      <ShieldCheck className="h-2.5 w-2.5 text-brand-600" />
                      HASH: {receipt.hash}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-ink-900">{receipt.period}</span>
                    <span className="text-[10px] font-medium text-ink-500 uppercase tracking-widest">Rec: {formatDate(receipt.date)}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-xs font-bold text-ink-900 uppercase tracking-tight">{receipt.property}</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <span className="text-sm font-bold text-ink-900">{formatCurrency(receipt.amount, receipt.currency)}</span>
                </td>
                <td className="px-6 py-5 text-center">
                  <StatusBadge status={receipt.status} />
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-paper-200 rounded-sm text-ink-600 hover:text-ink-900 border border-transparent hover:border-ink-900/10 transition-all">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-brand-600 rounded-sm text-brand-600 hover:text-paper-50 border border-brand-600/20 transition-all">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Empty State / Bottom Info */}
        <div className="p-6 bg-paper-100 border-t border-ink-900/10 flex justify-between items-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400">
            End of receipt records — Final synchronization: {new Date().toLocaleTimeString()}
          </p>
          <div className="flex gap-4">
             <Button variant="outline" className="h-8 px-4 text-[9px] font-bold uppercase tracking-widest border-brand-600/40 text-brand-600">Export All (PDF)</Button>
             <Button variant="outline" className="h-8 px-4 text-[9px] font-bold uppercase tracking-widest border-ink-900/40 text-ink-900">Request Verification Review</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
