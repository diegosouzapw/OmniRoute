/**
 * #8775 — Detect Cloudflare (and similar edge) errors that explicitly forbid
 * retries. When these bodies are misclassified as short AUTH_ERROR cooldowns,
 * OmniRoute waits 3× for a permanent client-signature ban and burns 21–33s
 * before falling through to the next combo tier.
 *
 * Kept as a pure helper so checkFallbackError stays within its file-size freeze
 * and every branch is unit-testable without DB/auth wiring.
 */

function tryParseJsonObject(text: string): Record<string, unknown> | null {
  const trimmed = text.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return null;
  try {
    const parsed: unknown = JSON.parse(trimmed);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    // Body may be truncated HTML/JSON hybrids — fall through to string probes.
  }
  return null;
}

function hasCloudflareBanSignal(value: unknown): boolean {
  if (typeof value === "number") return value === 1010;
  if (typeof value !== "string") return false;
  const lower = value.toLowerCase();
  return (
    lower.includes("browser_signature_banned") ||
    lower.includes("error 1010") ||
    lower === "1010" ||
    lower.includes("cloudflare")
  );
}

/**
 * Returns true when upstream error text says the failure must not be retried —
 * Cloudflare error 1010 / browser_signature_banned, or an explicit
 * `retryable: false` paired with Cloudflare / owner_action_required signals.
 */
export function isNonRetryableCloudflareError(errorText: string | null | undefined): boolean {
  if (typeof errorText !== "string" || errorText.length === 0) return false;

  const obj = tryParseJsonObject(errorText);
  if (obj) {
    const retryable = obj.retryable;
    const errorCode = obj.error_code ?? obj.errorCode;
    const errorName = typeof obj.error_name === "string" ? obj.error_name : "";
    const cloudflareError = obj.cloudflare_error === true || obj.cloudflareError === true;
    const ownerActionRequired =
      obj.owner_action_required === true || obj.ownerActionRequired === true;

    if (errorCode === 1010 || errorCode === "1010") return true;
    if (errorName.toLowerCase() === "browser_signature_banned") return true;
    if (retryable === false && (cloudflareError || ownerActionRequired)) return true;
    if (retryable === false && hasCloudflareBanSignal(obj.title ?? obj.type ?? obj.detail)) {
      return true;
    }
  }

  // Non-JSON / nested-string fallbacks (logs often stringify the body).
  if (/browser_signature_banned/i.test(errorText)) return true;
  if (/"error_code"\s*:\s*1010\b/.test(errorText)) return true;
  if (
    /"retryable"\s*:\s*false/.test(errorText) &&
    (/"cloudflare_error"\s*:\s*true/.test(errorText) ||
      /"owner_action_required"\s*:\s*true/.test(errorText) ||
      /cloudflare/i.test(errorText))
  ) {
    return true;
  }

  return false;
}

type ApiKeyForbiddenFallback = {
  shouldFallback: boolean;
  cooldownMs: number;
  reason: string;
  baseCooldownMs?: number;
  newBackoffLevel?: number;
  usedUpstreamRetryHint?: boolean;
};

/**
 * Api-key 403 branch helper (#8775): CF 1010 / retryable:false gets cooldown 0
 * so COOLDOWN_RETRY does not wait; other 403s keep the short retryable cooldown.
 */
export function resolveApiKeyForbiddenFallback(
  errorStr: string,
  buildRetryableFallback: (reason: string) => ApiKeyForbiddenFallback,
  authErrorReason: string
): ApiKeyForbiddenFallback {
  if (isNonRetryableCloudflareError(errorStr)) {
    return { shouldFallback: true, cooldownMs: 0, reason: authErrorReason };
  }
  return buildRetryableFallback(authErrorReason);
}

