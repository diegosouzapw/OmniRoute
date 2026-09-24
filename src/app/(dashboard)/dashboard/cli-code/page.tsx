import { getMachineId } from "@/shared/utils/machine";
import CliCodePageClient from "./CliCodePageClient";
import { getCompanionTargets } from "@/lib/cli-helper/companionTargets";

export default async function CliCodePage() {
  const machineId = await getMachineId();
  return <CliCodePageClient machineId={machineId} companionTargets={getCompanionTargets()} />;
}
