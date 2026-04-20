import { redirect } from "next/navigation";

export default function LegacyDashboardSetupPage() {
  redirect("/dashboard/onboarding");
}
