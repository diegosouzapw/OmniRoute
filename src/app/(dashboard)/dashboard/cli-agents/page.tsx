import { getMachineId } from "@/shared/utils/machine";
import CliAgentsPageClient from "./CliAgentsPageClient";

export default async function CliAgentsPage() {
  const machineId = await getMachineId();
  return <CliAgentsPageClient machineId={machineId} />;
}
