import { Input, Select } from "@/components/ui/FormFields";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Protocol Prefs" };

export default function SettingsPage() {
  const profile = {
    full_name: "Kennedy Osuji",
    email: "kennedy@example.com",
    role: "tenant",
    entity_id: "RP-8829-X",
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12 border-b border-ink-900/10 pb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-audit-600 mb-2 font-mono">
          SYSTEM-CONFIGURATION-v1.0
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ink-900">
          Settings
        </h1>
        <p className="mt-2 text-xs md:text-sm font-medium text-ink-500 leading-relaxed uppercase tracking-widest">
          Account ID:{" "}
          <span className="text-ink-900 font-bold font-mono">
            {profile.entity_id}
          </span>
        </p>
      </div>

      <div className="space-y-12">
        <section className="border border-ink-900/15 bg-paper-50 p-8">
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-ink-900 mb-1">
              Profile Details
            </h2>
            <p className="text-[11px] font-medium text-ink-500 uppercase tracking-widest">
              Core identity details saved in the system
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Full Legal Name"
              defaultValue={profile.full_name}
              readOnly
              hint="Authenticated identity — cannot be modified manually"
            />
            <Input
              label="Communication Uplink (Email)"
              defaultValue={profile.email}
              type="email"
            />
            <div className="md:col-span-2">
              <Select
                label="Primary Protocol Role"
                defaultValue={profile.role}
                disabled
                options={[
                  { value: "tenant", label: "Tenant Protocol" },
                  { value: "landlord", label: "Landlord Protocol" },
                  { value: "agent", label: "Agent Protocol" },
                ]}
                hint="Your clearance level is fixed by the system administrator"
              />
            </div>
          </div>
        </section>

        <section className="border border-ink-900/15 bg-paper-50 p-8">
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-ink-900 mb-1">
              Notifications
            </h2>
            <p className="text-[11px] font-medium text-ink-500 uppercase tracking-widest">
              Automated alerts and payment updates
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-ink-900/5 pb-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-ink-900">
                  Push Notifications
                </p>
                <p className="text-[10px] font-medium text-ink-500 mt-1 uppercase tracking-wider">
                  Immediate mobile response for urgent manifests
                </p>
              </div>
              <div className="h-5 w-10 bg-brand-600 rounded-full relative p-1 cursor-pointer">
                <div className="h-3 w-3 bg-paper-50 rounded-full absolute right-1" />
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-ink-900/5 pb-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-ink-900">
                  Email Archival Copies
                </p>
                <p className="text-[10px] font-medium text-ink-500 mt-1 uppercase tracking-wider">
                  Forward a digital copy of every verified manifest to your
                  uplink
                </p>
              </div>
              <div className="h-5 w-10 bg-brand-600 rounded-full relative p-1 cursor-pointer">
                <div className="h-3 w-3 bg-paper-50 rounded-full absolute right-1" />
              </div>
            </div>
          </div>
        </section>

        {/* Section: Security Clearances */}
        <section className="border border-ink-900/15 bg-paper-50 p-8">
          <div className="mb-8 border-b border-ink-900/10 pb-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-ink-900 mb-1">
              Security & Privacy
            </h2>
            <p className="text-[11px] font-medium text-ink-500 uppercase tracking-widest">
              Passkey management and login records
            </p>
          </div>

          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <Input
                label="Current Passkey"
                type="password"
                placeholder="••••••••"
              />
              <Input
                label="New System Passkey"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-ink-900/10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-audit-600 italic">
                Critical: High-level changes require biometric verification
              </p>
              <Button className="px-10 h-11 text-[10px] font-bold uppercase tracking-widest rounded-sm bg-ink-900 text-paper-50 hover:bg-ink-800 transition-colors">
                Update Registry
              </Button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="border border-audit-600/20 bg-audit-600/5 p-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-audit-600 mb-2">
            Account Deletion
          </h2>
          <p className="text-[11px] font-medium text-audit-900/60 uppercase tracking-widest mb-6">
            Permanent deletion of your account and payment history
          </p>
          <Button
            variant="outline"
            className="border-audit-600 text-audit-600 hover:bg-audit-600 hover:text-paper-50 text-[10px] font-bold uppercase tracking-widest rounded-sm"
          >
            Terminate Session & Delete Data
          </Button>
        </section>
      </div>
    </div>
  );
}
