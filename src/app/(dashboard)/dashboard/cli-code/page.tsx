import { getMachineId } from "@/shared/utils/machine";
import CliCodePageClient from "./CliCodePageClient";

export default async function CliCodePage() {
  const machineId = await getMachineId();
  return <CliCodePageClient machineId={machineId} />;
}
