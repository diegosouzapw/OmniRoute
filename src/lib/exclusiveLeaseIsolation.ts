import { isExclusiveConnectionActivelyLeased } from "./db/exclusiveConnectionLeases";

/** Narrow fail-closed boundary for auxiliary/unmanaged connection activity. */
export async function isConnectionUnavailableToAuxiliaryActivity(connectionId: string) {
  return !connectionId || isExclusiveConnectionActivelyLeased(connectionId);
}
