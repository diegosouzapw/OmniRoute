import { checkAndRefreshToken } from "./tokenRefresh";
import { getRefreshLeadMs } from "@omniroute/open-sse/services/tokenRefresh.ts";
import { isAllRateLimitedCredentials } from "@/app/api/v1/_shared/rateLimit";
import { isCodexFreePlan } from "@omniroute/open-sse/config/codexPlan.ts";

export type SelectedCodexImageCredentials = {
  accessToken?: string;
  apiKey?: string;
  refreshToken?: string;
  expiresAt?: string;
  connectionId?: string;
  providerSpecificData?: Record<string, unknown>;
};
function isSelectedCredentials(value: object): value is SelectedCodexImageCredentials {
  return (
    "accessToken" in value &&
    typeof value.accessToken === "string" &&
    (!("expiresAt" in value) || value.expiresAt === null || typeof value.expiresAt === "string") &&
    (!("connectionId" in value) || typeof value.connectionId === "string") &&
    (!("providerSpecificData" in value) ||
      value.providerSpecificData === null ||
      (typeof value.providerSpecificData === "object" &&
        !Array.isArray(value.providerSpecificData)))
  );
}
type SelectedResult =
  | { success: true; credentials: SelectedCodexImageCredentials }
  | { success: false; status: number; error: string; retryable: false };

/** Refresh the selected image account once; never select, rotate or retry another account. */
export async function refreshSelectedCodexImageCredentials(
  credentials: unknown,
  signal?: AbortSignal | null
): Promise<SelectedResult> {
  if (signal?.aborted)
    return failSelectedCredentials(499, "Codex Images request cancelled before submission");
  const validation = validateSelectedCodexImageCredentials(credentials);
  if (validation.success === false) return validation;
  const original = validation.credentials;
  try {
    const originalExpiry = original.expiresAt ? Date.parse(original.expiresAt) : null;
    const refreshDue =
      originalExpiry !== null &&
      originalExpiry - Date.now() < getRefreshLeadMs("codex", original.providerSpecificData);
    const selected = await checkAndRefreshToken("codex", original);
    const error = validateRefreshedCodexImageCredentials(selected, original, refreshDue);
    if (error) return failSelectedCredentials(401, error);
    if (signal?.aborted)
      return failSelectedCredentials(499, "Codex Images request cancelled before submission");
    return { success: true, credentials: selected };
  } catch {
    return failSelectedCredentials(
      401,
      "Selected Codex account refresh failed; reconnect that account"
    );
  }
}

function failSelectedCredentials(status: number, error: string): SelectedResult {
  return { success: false, status, error, retryable: false };
}

function validateSelectedCodexImageCredentials(credentials: unknown): SelectedResult {
  if (!credentials || typeof credentials !== "object" || "allExpired" in credentials)
    return failSelectedCredentials(401, "No usable selected Codex account credentials");
  if ("blockedByKeyPolicy" in credentials)
    return failSelectedCredentials(
      403,
      "Selected image connection is not allowed by API key policy"
    );
  if (isAllRateLimitedCredentials(credentials) || "allRateLimited" in credentials)
    return failSelectedCredentials(429, "Selected Codex account is unavailable");
  if (!isSelectedCredentials(credentials))
    return failSelectedCredentials(401, "No usable selected Codex account credentials");
  if (isCodexFreePlan(credentials.providerSpecificData))
    return failSelectedCredentials(403, "Codex Images requires a paid ChatGPT/Codex plan");
  return { success: true, credentials };
}

function validateRefreshedCodexImageCredentials(
  selected: SelectedCodexImageCredentials,
  original: SelectedCodexImageCredentials,
  refreshDue: boolean
): string | null {
  const expiry = selected.expiresAt ? Date.parse(selected.expiresAt) : null;
  const refreshFailed =
    refreshDue &&
    selected.accessToken === original.accessToken &&
    selected.expiresAt === original.expiresAt;
  if (
    !selected.accessToken ||
    refreshFailed ||
    (expiry !== null && (!Number.isFinite(expiry) || expiry <= Date.now()))
  )
    return "Selected Codex account refresh failed; reconnect that account";
  if (
    selected.connectionId !== original.connectionId ||
    selected.providerSpecificData?.workspaceId !== original.providerSpecificData?.workspaceId
  )
    return "Selected Codex account changed during refresh; submission refused";
  return null;
}
