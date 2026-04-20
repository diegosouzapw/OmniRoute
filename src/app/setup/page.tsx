import { redirect } from "next/navigation";

export default function LegacySetupPage() {
  redirect("/dashboard/onboarding");
}
