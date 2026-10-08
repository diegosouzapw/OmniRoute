/**
 * Operator-disable intent for provider connections.
 *
 * `isActive:false` has two very different meanings on a provider connection:
 *
 *   1. "never activated": POST /api/providers creates every connection
 *      `isActive:false`, and the first passing (or unverifiable) connection test
 *      is the activation signal (#11446).
 *   2. "switched off on purpose": an operator toggled the connection off from the
 *      dashboard / management API (for example a pay-per-token key they do not
 *      want in rotation right now).
 *
 * The connection test cannot tell those apart from `isActive` alone, so
 * retesting a disabled connection (the per-connection test, or a batch test in
 * "selected" mode) silently turned it back on. The management write paths
 * record the operator's intent in providerSpecificData (JSON column, no
 * migration) and the test route consults it before activating.
 */

export const OPERATOR_DISABLED_AT_KEY = "operatorDisabledAt";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? { ...(value as JsonRecord) }
    : {};
}

/**
 * Returns the providerSpecificData to persist when an operator explicitly sets
 * `isActive` through a management endpoint: turning a connection off stamps the
 * marker, turning it on clears it.
 */
export function applyOperatorActivationIntent(
  providerSpecificData: unknown,
  isActive: boolean,
  now: string = new Date().toISOString()
): JsonRecord {
  const psd = asRecord(providerSpecificData);
  if (isActive) {
    delete psd[OPERATOR_DISABLED_AT_KEY];
  } else {
    psd[OPERATOR_DISABLED_AT_KEY] = now;
  }
  return psd;
}

/**
 * True when the connection is inactive because an operator switched it off.
 * Automated activation paths (the connection test) must leave such a connection
 * alone; only an explicit operator `isActive:true` turns it back on.
 */
export function isOperatorDisabled(connection: {
  isActive?: unknown;
  providerSpecificData?: unknown;
}): boolean {
  if (connection.isActive === true) return false;
  const marker = asRecord(connection.providerSpecificData)[OPERATOR_DISABLED_AT_KEY];
  return typeof marker === "string" && marker.length > 0;
}
