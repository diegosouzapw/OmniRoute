/**
 * #11284 — Antigravity OAuth connect-time DEGRADE marking for accounts without
 * a Cloud Code projectId. Shared helper used by the OAuth route's `exchange`,
 * `poll-callback`, and the shared persistOAuthConnection path.
 *
 * Maintainer direction on #11284: do NOT reject the connect — SAVE the
 * connection but mark it degraded, so the refresh token stays stored and the
 * request-time bootstrap can self-heal it (persistDiscoveredAntigravityProjectId
 * flips the row back to active). Confirmed-BYOP accounts get disabled by
 * markAntigravityMissingCloudCodeProject() on the first dispatch instead.
 */

export type AntigravityDegradedProjectState = {
  /** Persist with this status instead of "active". */
  testStatus: "degraded";
  errorCode: string;
  lastErrorType: string;
  lastError: string;
  /** Non-fatal warning surfaced in the connect response for the dashboard. */
  warning: string;
};

/** Providers whose Cloud Code projectId is expected at connect time. */
const PROJECT_EXPECTED_PROVIDERS = new Set(["antigravity", "agy"]);

const BYOP_WARNING =
  "Connected, but Google did not assign a Cloud Code project to this account (BYOP). " +
  "Create a GCP Project at console.cloud.google.com and complete Gemini Code Assist onboarding; " +
  "the account is marked degraded until then and cannot serve requests.";

const DISCOVERY_FAILED_WARNING =
  "Connected, but the Google Cloud Code projectId could not be discovered during login " +
  "(loadCodeAssist/onboardUser failed). The account is marked degraded; discovery retries " +
  "automatically on the first request.";

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

/** Cloud Code project id from either the mapped token top-level or providerSpecificData. */
function extractAntigravityProjectId(
  tokenData: Record<string, unknown> | null | undefined
): string {
  if (!tokenData) return "";
  const nested = toRecord(tokenData.providerSpecificData);
  for (const candidate of [tokenData.projectId, nested.projectId]) {
    if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
  }
  return "";
}

/**
 * #11284: when projectId discovery failed at connect time, return the degrade
 * fields to persist (testStatus:"degraded" + typed error markers) instead of
 * silently saving a false "active". Returns null for healthy payloads.
 *
 * The original gate only fired when `projectDiscoveryOutcome` was set. Paste
 * credentials, persistOAuthConnection, and agy CLI import can persist an empty
 * projectId without that flag -- treat the empty id itself as the signal.
 */
export function antigravityDegradedProjectState(
  provider: string,
  tokenData: Record<string, unknown> | null | undefined
): AntigravityDegradedProjectState | null {
  if (!PROJECT_EXPECTED_PROVIDERS.has(provider)) return null;
  if (extractAntigravityProjectId(tokenData)) return null;
  const outcome = tokenData?.projectDiscoveryOutcome;
  const resolvedOutcome =
    outcome === "discovery_failed" ? "discovery_failed" : "requires_manual_project";
  console.warn(
    `[oauth] ${provider}: marking connection degraded - no Cloud Code projectId (${String(resolvedOutcome)}) (#11284)`
  );
  return {
    testStatus: "degraded",
    errorCode: "missing_project_id",
    lastErrorType: "oauth_missing_project_id",
    lastError:
      resolvedOutcome === "requires_manual_project" ? BYOP_WARNING : DISCOVERY_FAILED_WARNING,
    warning:
      resolvedOutcome === "requires_manual_project" ? BYOP_WARNING : DISCOVERY_FAILED_WARNING,
  };
}

/** Persist fields that MUST win over a spread tokenData payload. */
export function antigravityPersistStatus(
  degradedProject: AntigravityDegradedProjectState | null | undefined
): {
  testStatus: "degraded" | "active";
  errorCode: string | null;
  lastErrorType: string | null;
  lastError: string | null;
} {
  if (degradedProject) {
    return {
      testStatus: degradedProject.testStatus,
      errorCode: degradedProject.errorCode,
      lastErrorType: degradedProject.lastErrorType,
      lastError: degradedProject.lastError,
    };
  }
  return {
    testStatus: "active",
    errorCode: null,
    lastErrorType: null,
    lastError: null,
  };
}
