import { getConsistentMachineId } from "./machineId";

export async function getMachineId() {
  return await getConsistentMachineId();
}
