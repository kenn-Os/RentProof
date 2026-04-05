"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Info, Copy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { createRentPayment } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/FormFields";
import type { Tenancy, Property, PaymentMethod } from "@/lib/types/database";

export default function NewPaymentPage() {
  const [loading, setLoading] = useState(false);
  const [tenancies, setTenancies] = useState<
    (Tenancy & { property: Property })[]
  >([]);
  const [selectedTenancy, setSelectedTenancy] = useState<string>("");
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [confirmationUrl, setConfirmationUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Mock data for UI prototype
    const mockTenancies: (Tenancy & { property: Property })[] = [
      {
        id: "tenancy-1",
        tenant_id: "mock-user-123",
        property_id: "prop-1",
        rent_amount: 1200,
        currency: "GBP",
        start_date: "2024-01-01",
        end_date: "2025-01-01",
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        property: {
          id: "prop-1",
          landlord_id: "landlord-123",
          address_line1: "123 Baker Street",
          address_line2: null,
          city: "London",
          postcode: "NW1 6XE",
          country: "GB",
          agent_id: null,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      },
    ];
    setTenancies(mockTenancies);
    setSelectedTenancy(mockTenancies[0].id);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const result = await createRentPayment({
      tenancy_id: selectedTenancy,
      rent_period_start: form.get("rent_period_start") as string,
      rent_period_end: form.get("rent_period_end") as string,
      amount: parseFloat(form.get("amount") as string),
      payment_method: form.get("payment_method") as PaymentMethod,
      payment_reference: form.get("payment_reference") as string,
      notes: form.get("notes") as string,
    });

    if ("error" in result && result.error) {
      toast.error(String(result.error));
      setLoading(false);
      return;
    }

    if (result.confirmationUrl) {
      setConfirmationUrl(result.confirmationUrl);
      toast.success(
        "Payment recorded! Share the confirmation link with your landlord.",
      );
    }

    setLoading(false);
  }

  async function copyConfirmationUrl() {
    if (!confirmationUrl) return;
    await navigator.clipboard.writeText(confirmationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Success state
  if (confirmationUrl) {
    return (
      <div className="flex min-h-full items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Payment Recorded
          </h2>
          <p className="mt-2 text-slate-500">
            Your timestamped payment declaration has been created. Share the
            link below with your landlord for confirmation.
          </p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-2 text-xs font-medium text-slate-500">
              Landlord confirmation link
            </p>
            <div className="flex items-center gap-2">
              <code className="min-w-0 flex-1 truncate rounded bg-white px-3 py-2 text-xs text-slate-700 border border-slate-200">
                {confirmationUrl}
              </code>
              <button
                onClick={copyConfirmationUrl}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-900 transition-colors"
              >
                {copied ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              This link expires in 30 days. If the landlord doesn&apos;t
              confirm, your timestamped record still stands.
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              href="/dashboard/tenant/payments"
              className="flex-1 inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              View all payments
            </Link>
            <Button
              onClick={() => {
                setConfirmationUrl(null);
                setLoading(false);
              }}
              className="flex-1"
            >
              Record another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          href="/dashboard/tenant"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <h1 className="mt-4 font-display text-2xl font-bold text-slate-900">
          Record Rent Payment
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Create a timestamped payment record. A confirmation link will be sent
          to your landlord.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
          {/* Property */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 font-semibold text-slate-900">Property</h2>
            <Select
              label="Select property"
              options={tenancies.map((t) => ({
                value: t.id,
                label: `${t.property?.address_line1}, ${t.property?.city}`,
              }))}
              value={selectedTenancy}
              onChange={(e) => setSelectedTenancy(e.target.value)}
              placeholder="Choose a property..."
              required
            />
            {tenancies.length === 0 && (
              <p className="mt-2 text-sm text-slate-500">
                No active tenancies found.{" "}
                <Link
                  href="/dashboard/tenant"
                  className="text-green-600 underline"
                >
                  Contact your landlord
                </Link>{" "}
                to set one up.
              </p>
            )}
          </div>

          {/* Payment details */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 font-semibold text-slate-900">
              Payment Details
            </h2>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Rent period start"
                  name="rent_period_start"
                  type="date"
                  required
                />
                <Input
                  label="Rent period end"
                  name="rent_period_end"
                  type="date"
                  required
                />
              </div>

              <Input
                label="Amount paid"
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                required
                hint="Enter the exact amount paid in GBP (£)"
              />

              <Select
                label="Payment method"
                name="payment_method"
                options={[
                  { value: "bank_transfer", label: "Bank Transfer" },
                  { value: "cash", label: "Cash" },
                  { value: "standing_order", label: "Standing Order" },
                  { value: "cheque", label: "Cheque" },
                  { value: "other", label: "Other" },
                ]}
                placeholder="Select payment method..."
                required
              />

              <Input
                label="Payment reference"
                name="payment_reference"
                type="text"
                placeholder="e.g. bank ref, transaction ID"
                hint="Optional — the reference shown on your bank statement"
              />

              <Textarea
                label="Notes"
                name="notes"
                placeholder="Any additional notes about this payment..."
                rows={3}
              />
            </div>
          </div>

          {/* Evidence upload */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-1 font-semibold text-slate-900">
              Payment Evidence
            </h2>
            <p className="mb-4 text-sm text-slate-500">
              Optional: upload a bank screenshot or receipt photo to strengthen
              your record.
            </p>
            <label className="flex cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-slate-200 p-6 text-center transition-colors hover:border-slate-300 hover:bg-slate-50">
              <Upload className="mb-2 h-6 w-6 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">
                {evidenceFile ? evidenceFile.name : "Click to upload"}
              </span>
              <span className="mt-1 text-xs text-slate-400">
                PNG, JPG, PDF up to 10MB
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={(e) => setEvidenceFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          <Button type="submit" size="lg" loading={loading} className="w-full">
            Create Payment Record
          </Button>
        </form>

        {/* Sidebar info */}
        <div className="space-y-4">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
            <div className="mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-blue-900">
                How this works
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-blue-800">
              <li>1. You submit this form</li>
              <li>2. A unique receipt ID is generated</li>
              <li>3. A confirmation link is created</li>
              <li>4. You share it with your landlord</li>
              <li>5. Landlord clicks to confirm</li>
              <li>6. Receipt status becomes Verified</li>
            </ul>
          </div>

          <div className="rounded-xl border border-amber-100 bg-amber-50 p-5">
            <h3 className="mb-1.5 text-sm font-semibold text-amber-900">
              If landlord doesn&apos;t confirm
            </h3>
            <p className="text-xs text-amber-700">
              Your timestamped declaration still stands as documented proof. The
              system logs the non-response automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
