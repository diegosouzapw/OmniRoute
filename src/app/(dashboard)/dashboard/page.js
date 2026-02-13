import { redirect } from "next/navigation";
import { getMachineId } from "@/shared/utils/machine";
import { getSettings } from "@/lib/localDb";
import EndpointPageClient from "./endpoint/EndpointPageClient";

// Must be dynamic — depends on DB state (setupComplete) that changes at runtime
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const settings = await getSettings();
  if (!settings.setupComplete) {
    redirect("/dashboard/onboarding");
  }
  const machineId = await getMachineId();
  return <EndpointPageClient machineId={machineId} />;
}
