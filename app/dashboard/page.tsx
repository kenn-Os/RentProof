import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // Always redirect to tenant dashboard for UI prototype
  redirect("/dashboard/tenant");
}
