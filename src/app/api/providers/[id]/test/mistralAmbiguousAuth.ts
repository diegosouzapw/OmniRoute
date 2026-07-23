/**
 * #7638: Mistral's quota-exhausted response is `401 {"detail":"Unauthorized"}` — byte-identical
 * to a genuinely revoked key. Unlike other providers, a bare Mistral 401 with no auth-specific
 * signal in the body cannot be trusted as a hard auth failure; the generic 401/403 branch in
 * classifyFailure() delegates here so it can return an ambiguous diagnosis instead of asserting
 * "Invalid API key" outright.
 * A message that DOES carry an explicit auth signal (e.g. "Invalid API key") still falls
 * through to the normal `upstream_auth_error` result — only the contentless case is ambiguous.
 */
export interface AuthOr401Diagnosis {
  type: string;
  source: string;
  message: string | null;
  code: string | null;
}

/** Param type for classifyFailure() in route.ts — extracted here to keep that frozen file's LOC flat. */
export interface ClassifyFailureArgs {
  error: string;
  statusCode?: number | null;
  refreshFailed?: boolean;
  unsupported?: boolean;
  provider?: string;
}

function isMistralAmbiguous401(provider: string | undefined, normalized: string): boolean {
  if (provider !== "mistral") return false;
  const hasAuthSignal =
    normalized.includes("invalid api key") ||
    normalized.includes("token invalid") ||
    normalized.includes("revoked") ||
    normalized.includes("access denied");
  return !hasAuthSignal;
}

/** Decides the diagnosis for a 401/403 status: ambiguous (Mistral-only) or the generic auth error. */
export function classifyAmbiguousOrAuthError(
  provider: string | undefined,
  normalized: string,
  message: string,
  numericStatus: number
): AuthOr401Diagnosis {
  if (numericStatus === 401 && isMistralAmbiguous401(provider, normalized)) {
    return {
      type: "upstream_ambiguous_auth_or_quota",
      source: "upstream",
      message: message || null,
      code: String(numericStatus),
    };
  }
  return {
    type: "upstream_auth_error",
    source: "upstream",
    message: message || null,
    code: String(numericStatus),
  };
}
