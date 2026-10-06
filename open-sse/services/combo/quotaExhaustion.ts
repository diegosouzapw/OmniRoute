import { checkFallbackError, type ProviderProfile } from "../accountFallback.ts";
import { classifyGeminiQuotaMetricFromText } from "../geminiRateLimitTracker.ts";

const TERMINAL_QUOTA_CODES = new Set([
  "billing_hard_limit_reached",
  "credits_exhausted",
  "insufficient_quota",
  "quota_exhausted",
  // #10966: durable wallet/balance exhaustion signalled on a 403 (not 402/429) by
  // some upstreams — e.g. AUTHZ_INSUFFICIENT_BALANCE, "Insufficient account balance.
  // Top up your account at …".
  "authz_insufficient_balance",
]);

const trustedClassifications = new WeakMap<Response, boolean>();

type ParsedError = {
  text: string;
  structuredError: { code?: string; type?: string } | null;
};

async function parseError(response: Response): Promise<ParsedError> {
  let text = response.statusText;
  let structuredError: ParsedError["structuredError"] = null;
  try {
    const body = (await response.clone().json()) as {
      error?: string | { message?: unknown; code?: unknown; type?: unknown };
      message?: unknown;
    };
    if (typeof body.error === "string") text = body.error;
    else if (body.error && typeof body.error === "object") {
      if (typeof body.error.message === "string") text = body.error.message;
      structuredError = {
        ...(body.error.code == null ? {} : { code: String(body.error.code) }),
        ...(body.error.type == null ? {} : { type: String(body.error.type) }),
      };
    } else if (typeof body.message === "string") text = body.message;
  } catch {
    try {
      text = await response.clone().text();
    } catch {
      // The status and trusted in-process classification remain available.
    }
  }
  return { text, structuredError };
}

export function recordQuotaExhaustionClassification(response: Response, exhausted: boolean): void {
  trustedClassifications.set(response, exhausted);
}

export function withQuotaExhaustionClassification(
  response: Response,
  exhausted: boolean | null
): Response {
  if (exhausted !== null) recordQuotaExhaustionClassification(response, exhausted);
  return response;
}

export async function isQuotaExhaustionResponse(
  response: Response,
  provider: string | null,
  model: string | null,
  profile: ProviderProfile | null = null
): Promise<boolean> {
  const trusted = trustedClassifications.get(response);
  if (trusted !== undefined) return trusted;

  // #10966: 403 is included alongside 402/429 — some upstreams (e.g. durable
  // wallet/balance exhaustion) return a 403 for a terminal quota condition instead
  // of the more common 402/429. The structured-code/text checks below still gate
  // this to genuine quota signals (CREDITS_EXHAUSTED_SIGNALS / TERMINAL_QUOTA_CODES /
  // checkFallbackError's own classification), so a generic auth-only 403 (invalid
  // key, no matching quota signal) still falls through to `false`.
  if (response.status !== 402 && response.status !== 429 && response.status !== 403) return false;

  const { text, structuredError } = await parseError(response);
  if (provider === "gemini" && response.status === 429) {
    const metric = classifyGeminiQuotaMetricFromText(text);
    if (metric === "rpm" || metric === "tpm") return false;
    if (metric === "rpd") return true;
  }
  const normalizedCode = structuredError?.code?.toLowerCase();
  const normalizedType = structuredError?.type?.toLowerCase();
  if (
    (normalizedCode && TERMINAL_QUOTA_CODES.has(normalizedCode)) ||
    (normalizedType && TERMINAL_QUOTA_CODES.has(normalizedType))
  ) {
    return true;
  }

  if (
    /\b(?:billing hard limit reached|credits? exhausted|subscription quota exhausted)\b/i.test(text)
  ) {
    return true;
  }

  if (
    provider?.startsWith("openai-compatible-") ||
    provider?.startsWith("openai-compatible-chat-")
  ) {
    return false;
  }

  return (
    checkFallbackError(
      response.status,
      text,
      0,
      model,
      provider,
      response.headers,
      profile,
      structuredError
    ).reason === "quota_exhausted"
  );
}
