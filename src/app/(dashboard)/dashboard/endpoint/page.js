import { getMachineId } from "@/shared/utils/machine";
import EndpointPageClient from "./EndpointPageClient";

export default async function EndpointPage() {
  const machineId = await getMachineId();
  return <EndpointPageClient machineId={machineId} />;
}
