import {
  isAccountDeactivated,
  isCreditsExhausted,
  isDailyQuotaExhausted,
  isOAuthInvalidToken,
} from "./accountFallback.ts";
import { getProviderCategory, getRegistryEntry } from "../config/providerRegistry.ts";

// Terminal stop signals where an empty content payload is still a legitimate,
// successful completion (truncated at the token limit, or a tool-call turn) —
// NOT a silent "fake success" failure. Used to avoid rewriting a valid HTTP 200
// (e.g. a Claude Code `max_tokens: 1` connectivity ping) into a synthetic 502.
const LEGIT_EMPTY_CLAUDE_STOP = new Set(["max_tokens", "tool_use"]);
const LEGIT_EMPTY_OPENAI_FINISH = new Set(["length", "tool_calls", "content_filter"]);

export function isEmptyContentResponse(responseBody: unknown): boolean {
  if (!responseBody || typeof responseBody !== "object") return false;

  const body = responseBody as Record<string, unknown>;

  if (Array.isArray(body.choices)) {
    const firstChoice = body.choices[0] as Record<string, unknown> | undefined;
    if (!firstChoice) return true;

    const message = firstChoice.message as Record<string, unknown> | undefined;
    const delta = firstChoice.delta as Record<string, unknown> | undefined;

    const content = message?.content ?? delta?.content;
    const reasoningContent = message?.reasoning_content ?? delta?.reasoning_content;
    const hasToolCalls =
      (Array.isArray(message?.tool_calls) && (message.tool_calls as unknown[]).length > 0) ||
      (Array.isArray(delta?.tool_calls) && (delta.tool_calls as unknown[]).length > 0);

    const hasContent = content !== null && content !== undefined && content !== "";
    const hasReasoning =
      reasoningContent !== null && reasoningContent !== undefined && reasoningContent !== "";

    // A response truncated at the token limit (finish_reason "length") is a valid,
    // successful completion even with empty text — do not flag it as a fake success.
    const finishReason =
      typeof firstChoice.finish_reason === "string" ? firstChoice.finish_reason : "";
    if (LEGIT_EMPTY_OPENAI_FINISH.has(finishReason)) return false;

    return !hasContent && !hasReasoning && !hasToolCalls;
  }

  if (Array.isArray(body.content)) {
    if (body.content.length > 0) return false;
    // Empty content array: a response truncated at max_tokens (or one that stopped
    // to emit a tool_use block) is a legitimate terminal state, not a silent
    // failure. Only flag empty content when no such terminal stop_reason is present.
    const stopReason = typeof body.stop_reason === "string" ? body.stop_reason : "";
    return !LEGIT_EMPTY_CLAUDE_STOP.has(stopReason);
  }

  if (typeof body.text === "string") {
    return body.text.trim() === "";
  }

  if ("content" in body) {
    const content = body.content;
    return content === null || content === undefined || content === "";
  }

  return false;
}

export const PROVIDER_ERROR_TYPES = {
  RATE_LIMITED: "rate_limited",
  UNAUTHORIZED: "unauthorized",
  ACCOUNT_DEACTIVATED: "account_deactivated",
  FORBIDDEN: "forbidden",
  SERVER_ERROR: "server_error",
  QUOTA_EXHAUSTED: "quota_exhausted",
  PROJECT_ROUTE_ERROR: "project_route_error",
  CONTEXT_OVERFLOW: "context_overflow",
  OAUTH_INVALID_TOKEN: "oauth_invalid_token",
  EMPTY_CONTENT: "empty_content",
  MODEL_NOT_FOUND: "model_not_found",
};

export const CONTEXT_OVERFLOW_SIGNALS = [
  "context overflow",
  "prompt too large",
  "context window",
  "maximum context",
  "exceeds context",
  "input too long",
  "token limit",
  "too many tokens",
  "context length",
  "exceed.*context",
  "messages exceed",
];

export const CONTEXT_OVERFLOW_REGEX = new RegExp(CONTEXT_OVERFLOW_SIGNALS.join("|"), "i");

export function isContextOverflow(errorText: string): boolean {
  return CONTEXT_OVERFLOW_REGEX.test(String(errorText || ""));
}

// Matches phrasing like `Model minimax-m3-free is not supported` or
// `model "gpt-9" is not supported` — free-tier/aggregator providers name the
// specific model in the sentence instead of using a fixed fragment like
// "model not supported". Shared by modelFamilyFallback.ts's
// isModelUnavailableError() (400/403/404) and this module's 401 branch below,
// so the same phrasing locks the model out on either status. Bounded
// quantifier ({0,80}) keeps it ReDoS-safe. (#7268)
const MODEL_NAMED_UNSUPPORTED_REGEX = /\bmodel\b[^\n]{0,80}\bis not supported\b/i;

export function containsModelUnavailableMessage(errorMessage: string): boolean {
  return MODEL_NAMED_UNSUPPORTED_REGEX.test(String(errorMessage || "").toLowerCase());
}

function responseBodyToString(responseBody: unknown): string {
  if (typeof responseBody === "string") return responseBody;
  if (responseBody !== null && typeof responseBody === "object") {
    try {
      return JSON.stringify(responseBody);
    } catch {
      return "";
    }
  }
  return "";
}

function shouldPreserveQuotaSignalsFor429(provider?: string | null): boolean {
  if (!provider) return true;
  return getProviderCategory(provider) === "oauth";
}

export function classifyProviderError(
  statusCode: number,
  responseBody: unknown,
  provider?: string | null
): string | null {
  const bodyStr = responseBodyToString(responseBody);
  const creditsExhausted = isCreditsExhausted(bodyStr);
  const accountDeactivated = isAccountDeactivated(bodyStr);
  const oauthInvalid = isOAuthInvalidToken(bodyStr);
  const preserveQuota429 = shouldPreserveQuotaSignalsFor429(provider);

  if (creditsExhausted && [400, 402, 403].includes(statusCode)) {
    return PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED;
  }

  if (creditsExhausted && statusCode === 429 && preserveQuota429) {
    return PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED;
  }

  // API-key providers route 429 cooldowns through the resilience-aware fallback layer.
  // OAuth providers keep their existing quota semantics because some of them encode
  // longer quota windows as 429 responses.
  if (statusCode === 429) {
    if (preserveQuota429 && isDailyQuotaExhausted(bodyStr)) {
      return PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED;
    }
    return PROVIDER_ERROR_TYPES.RATE_LIMITED;
  }

  // 404 — model or endpoint not found. Without classification the error
  // falls through to `return null`, so no cooldown/lockout is applied and the
  // retry/backoff loop keeps hammering the dead endpoint until the upstream
  // rate-limits it (404 + 429 storm). Classify as MODEL_NOT_FOUND so the model
  // gets locked via the cooldown layer and retries stop. (#6827)
  if (statusCode === 404) {
    return PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND;
  }

  if (statusCode === 401) {
    if (oauthInvalid) {
      return PROVIDER_ERROR_TYPES.OAUTH_INVALID_TOKEN;
    }
    // Some free-tier/aggregator providers return 401 (instead of 404) for a
    // model the account isn't entitled to, with a body like "Model X is not
    // supported". Without this check the error falls through to a generic
    // UNAUTHORIZED classification, which never triggers lockModel() in
    // chatCore.ts — auto-combo keeps re-selecting the same broken model on
    // every request. Detect the phrasing here, same as the 404 branch above
    // always does regardless of body content. (#7268)
    if (containsModelUnavailableMessage(bodyStr)) {
      return PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND;
    }
    return accountDeactivated
      ? PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED
      : PROVIDER_ERROR_TYPES.UNAUTHORIZED;
  }

  if (statusCode === 402) return PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED;
  if (statusCode === 403 && accountDeactivated) {
    return PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED;
  }
  if (statusCode === 403) {
    // Cloud Code / Antigravity (Gemini Code Assist) 403s are almost always a
    // RECOVERABLE project-config issue — the Cloud AI Companion API not enabled
    // on the project ("has not been used in project …", SERVICE_DISABLED,
    // accessNotConfigured), a stale/mismatched project, or PERMISSION_DENIED on
    // the project — NOT an account ban. Real account bans are already caught by
    // isAccountDeactivated above (→ ACCOUNT_DEACTIVATED). Classifying these as
    // PROJECT_ROUTE_ERROR keeps the account active and recoverable once the
    // project/API is fixed, instead of permanently disabling it on a single
    // fixable 403 (which previously required a full OAuth reconnect). (antigravity-403)
    const p = (provider || "").toLowerCase();
    const isCloudCodeProvider =
      p === "antigravity" ||
      p === "gemini-cli" ||
      p.includes("cloudcode") ||
      p.includes("cloud-code");
    const recoverableProject403 =
      bodyStr.includes("has not been used in project") ||
      bodyStr.includes("SERVICE_DISABLED") ||
      bodyStr.includes("accessNotConfigured") ||
      bodyStr.includes("PERMISSION_DENIED") ||
      /\bit is disabled\b/i.test(bodyStr) ||
      isCloudCodeProvider;
    if (recoverableProject403) {
      return PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR;
    }
    if (provider && getProviderCategory(provider) === "apikey") {
      return null;
    }
    // No-credential ("authType: none") providers — free, stateless per-request
    // token proxies like mimocode/theoldllm — have no real account/credential
    // to revoke. An unrecognized 403 from these is a transient upstream
    // rate-limit/blocklist signal, not an account ban: keep it recoverable so
    // the connection cooldown/retry layer handles it instead of a permanent
    // "banned" state on the first unmatched 403. (#6315, #6345)
    if (provider && getRegistryEntry(provider)?.authType === "none") {
      return null;
    }
    return PROVIDER_ERROR_TYPES.FORBIDDEN;
  }
  if (statusCode >= 500) return PROVIDER_ERROR_TYPES.SERVER_ERROR;

  if (statusCode === 400 && isContextOverflow(bodyStr)) {
    return PROVIDER_ERROR_TYPES.CONTEXT_OVERFLOW;
  }

  return null;
}
