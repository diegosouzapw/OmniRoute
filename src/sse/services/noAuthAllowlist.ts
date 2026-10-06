import { SYNTHETIC_NOAUTH_CONNECTION_ID } from "@omniroute/open-sse/services/autoCombo/resilienceCandidateFilter.ts";

/**
 * #9057 gate for the synthetic keyless connection: allowed when there is no
 * allowlist, or when the allowlist names the synthetic id explicitly. The auto
 * combo pins keyless targets to "noauth", and pin-fail-closed
 * (`implicitPinAllowlist`) turns that pin into the allowlist ["noauth"].
 */
export function allowlistPermitsSyntheticNoAuth(
  allowedConnections: string[] | null | undefined
): boolean {
  if (!Array.isArray(allowedConnections) || allowedConnections.length === 0) return true;
  return allowedConnections.includes(SYNTHETIC_NOAUTH_CONNECTION_ID);
}
