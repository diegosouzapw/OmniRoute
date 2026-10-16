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

/**
 * Set when the gateway itself switched a connection off (any `isActive:false`
 * write that is not an operator toggle), cleared when it is switched back on.
 * The credential-health sweep retests only connections carrying it (#16190):
 * an inactive row with neither marker may predate the operator marker, so its
 * origin is unknown and it is left alone.
 */
export const AUTO_DISABLED_AT_KEY = "autoDisabledAt";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? { ...(value as JsonRecord) }
    : {};
}

function hasMarker(providerSpecificData: unknown, key: string): boolean {
  const marker = asRecord(providerSpecificData)[key];
  return typeof marker === "string" && marker.length > 0;
}

/**
 * Returns the providerSpecificData to persist when an operator explicitly sets
 * `isActive` through a management endpoint: turning a connection off stamps the
 * marker, turning it on clears it. Either way the operator's choice supersedes
 * an automatic disable.
 */
export function applyOperatorActivationIntent(
  providerSpecificData: unknown,
  isActive: boolean,
  now: string = new Date().toISOString()
): JsonRecord {
  const psd = asRecord(providerSpecificData);
  delete psd[AUTO_DISABLED_AT_KEY];
  if (isActive) {
    delete psd[OPERATOR_DISABLED_AT_KEY];
  } else {
    psd[OPERATOR_DISABLED_AT_KEY] = now;
  }
  return psd;
}

/**
 * Returns the providerSpecificData to persist for an `isActive` write on an
 * existing connection. Switching an active connection off without the operator
 * marker is an automatic disable and stamps AUTO_DISABLED_AT_KEY; switching it
 * on clears that marker. Anything else (no isActive in the write, a connection
 * that was never activated, an operator switch-off, a non-object payload) is
 * returned untouched.
 */
export function applyAutomaticDisableMarker(
  providerSpecificData: unknown,
  wasActive: unknown,
  isActive: unknown,
  now: string = new Date().toISOString()
): unknown {
  if (typeof isActive !== "boolean") return providerSpecificData;
  if (providerSpecificData != null && typeof providerSpecificData !== "object") {
    return providerSpecificData;
  }
  if (isActive) {
    if (!hasMarker(providerSpecificData, AUTO_DISABLED_AT_KEY)) return providerSpecificData;
    const psd = asRecord(providerSpecificData);
    delete psd[AUTO_DISABLED_AT_KEY];
    return psd;
  }
  if (wasActive !== true && wasActive !== 1) return providerSpecificData;
  if (hasMarker(providerSpecificData, OPERATOR_DISABLED_AT_KEY)) return providerSpecificData;
  return { ...asRecord(providerSpecificData), [AUTO_DISABLED_AT_KEY]: now };
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
  // #16784: the marker stays authoritative even when isActive is still true.
  return hasMarker(connection.providerSpecificData, OPERATOR_DISABLED_AT_KEY);
}

/**
 * True when the connection is inactive because the gateway switched it off by
 * itself, and no operator has switched it off since.
 */
export function isAutoDisabled(connection: {
  isActive?: unknown;
  providerSpecificData?: unknown;
}): boolean {
  if (connection.isActive === true || connection.isActive === 1) return false;
  if (isOperatorDisabled(connection)) return false;
  return hasMarker(connection.providerSpecificData, AUTO_DISABLED_AT_KEY);
}
