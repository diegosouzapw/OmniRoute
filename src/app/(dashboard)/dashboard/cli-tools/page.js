import { getMachineId } from "@/shared/utils/machine";
import CLIToolsPageClient from "./CLIToolsPageClient";

export default async function CLIToolsPage() {
  const machineId = await getMachineId();
  return <CLIToolsPageClient machineId={machineId} />;
}
