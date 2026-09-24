import {
  ACCOUNT_DEACTIVATED_SIGNALS,
  CREDITS_EXHAUSTED_SIGNALS,
  isAccountDeactivated,
  isCreditsExhausted,
  isDailyQuotaExhausted,
  isOAuthInvalidToken,
} from "./accountFallback.ts";
import { isSubscriptionQuotaText } from "./quotaTextCooldowns.ts";
import { getProviderCategory, getRegistryEntry } from "../config/providerRegistry.ts";

// Terminal stop signals where an empty content payload is still a legitimate,
// successful completion (truncated at the token limit, or a tool-call turn) —
// NOT a silent "fake success" failure. Used to avoid rewriting a valid HTTP 200
// (e.g. a Claude Code `max_tokens: 1` connectivity ping) into a synthetic 502.
const LEGIT_EMPTY_CLAUDE_STOP = new Set(["max_tokens", "tool_use"]);
const LEGIT_EMPTY_OPENAI_FINISH = new Set(["length", "tool_calls", "content_filter"]);

// #14160: first-party APIs where an empty completion carrying a NORMAL terminal
// stop reason ("stop" / "end_turn") is a real answer — some prompts legitimately
// produce no text — not a disguised upstream failure. The fake-success guard
// exists for free-tier/scraping providers (pollinations, perplexity-web — #13461)
// whose failure mode is an empty 200 shell; flagging a first-party empty stop
// turned valid answers into synthetic 502s that fed model lockout and drained
// the reporter's whole connection pool. Providers outside this set keep the
// guard unchanged, including on empty stop completions.
const TRUSTED_EMPTY_STOP_PROVIDERS = new Set(["antigravity"]);
const NORMAL_STOP_OPENAI_FINISH = new Set(["stop"]);
const NORMAL_STOP_CLAUDE_STOP = new Set(["end_turn"]);

export function isEmptyContentResponse(
  responseBody: unknown,
  opts?: { provider?: string | null }
): boolean {
  const trustedEmptyStop =
    typeof opts?.provider === "string" && TRUSTED_EMPTY_STOP_PROVIDERS.has(opts.provider);
  if (!responseBody || typeof responseBody !== "object") return false;

  const body = responseBody as Record<string, unknown>;

  if (Array.isArray(body.choices)) {
    const firstChoice = body.choices[0] as Record<string, unknown> | undefined;
    if (!firstChoice) return true;

    const message = firstChoice.message as Record<string, unknown> | undefined;
    const delta = firstChoice.delta as Record<string, unknown> | undefined;

    const content = message?.content ?? delta?.content;
    const reasoningContent = message?.reasoning_content ?? delta?.reasoning_content;
    // opencode-routed gateways (e.g. opencode/mimo-v2.5-free) name the reasoning
    // field `reasoning` instead of `reasoning_content` (#6623).
    const reasoningAlt = message?.reasoning ?? delta?.reasoning;
    const hasToolCalls =
      (Array.isArray(message?.tool_calls) && (message.tool_calls as unknown[]).length > 0) ||
      (Array.isArray(delta?.tool_calls) && (delta.tool_calls as unknown[]).length > 0);

    const hasContent = content !== null && content !== undefined && content !== "";
    const hasReasoning =
      (reasoningContent !== null && reasoningContent !== undefined && reasoningContent !== "") ||
      (reasoningAlt !== null && reasoningAlt !== undefined && reasoningAlt !== "");

    // A response truncated at the token limit (finish_reason "length") is a valid,
    // successful completion even with empty text — do not flag it as a fake success.
    const finishReason =
      typeof firstChoice.finish_reason === "string" ? firstChoice.finish_reason : "";
    if (LEGIT_EMPTY_OPENAI_FINISH.has(finishReason)) return false;
    // #14160: on a trusted first-party API, an empty completion that stopped
    // normally is a valid answer — pass it through as a 200 instead of
    // rewriting it into a synthetic 502.
    if (trustedEmptyStop && NORMAL_STOP_OPENAI_FINISH.has(finishReason)) return false;

    return !hasContent && !hasReasoning && !hasToolCalls;
  }

  if (Array.isArray(body.content)) {
    if (body.content.length > 0) return false;
    // Empty content array: a response truncated at max_tokens (or one that stopped
    // to emit a tool_use block) is a legitimate terminal state, not a silent
    // failure. Only flag empty content when no such terminal stop_reason is present.
    const stopReason = typeof body.stop_reason === "string" ? body.stop_reason : "";
    // #14160: same exemption for the Claude wire shape on trusted first-party APIs.
    if (trustedEmptyStop && NORMAL_STOP_CLAUDE_STOP.has(stopReason)) return false;
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
  FINGERPRINT_REJECTION: "fingerprint_rejection",
  GEO_BLOCKED: "geo_blocked",
  // Antigravity BYOP fast-fail (executor 422, code gcp_project_required): the
  // Google account must Bring Its Own GCP Project. Account-specific and
  // fixable by entering a Project ID — never a model lockout and never a ban.
  GCP_PROJECT_REQUIRED: "gcp_project_required",
  // The upstream refused THIS request (policy / request shape), not the
  // credential: the same connection serves the next request. Not terminal on
  // its own — chatCore excludes the connection for a growing cooldown and only
  // a streak of refusals escalates to `banned` (services/requestRejectedStreak).
  // First case: Anthropic's OAuth 403 "Request not allowed" (#12859), which
  // lands on a handful of requests between thousands of 200s on the same token.
  REQUEST_REJECTED: "request_rejected",
} as const;

export type ProviderErrorType = (typeof PROVIDER_ERROR_TYPES)[keyof typeof PROVIDER_ERROR_TYPES];

// Versioned vocabulary persisted in `call_logs.error_type`: every provider error
// family plus the explicit `unknown` for a failure the classifier could not place.
// Derived from PROVIDER_ERROR_TYPES so the two cannot drift. Bump the version when
// a value is removed or renamed (adding a family is backwards compatible).
export type ErrorTypeContract = ProviderErrorType | "unknown";
export const ERROR_TYPE_CONTRACT: readonly ErrorTypeContract[] = Object.freeze([
  ...Object.values(PROVIDER_ERROR_TYPES),
  "unknown",
]);
export const ERROR_TYPE_CONTRACT_VERSION = 1;

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

// Google regional-availability rejection: the Cloud Code / Gemini Code Assist
// API is not offered from every country, and the upstream answers with a 400
// FAILED_PRECONDITION like "User location is not supported for the API use."
// This is an ACCOUNT-INDEPENDENT, location-scoped refusal: every account on
// this server egresses from the same region, so retrying another credential
// cannot help — but routing egress through a proxy in a supported region can.
// Detected here so routing treats it as a non-terminal, cached-per-connection
// exclusion instead of a generic 400 (which would keep re-selecting the same
// account and surface a cryptic "upstream error (400)").
const GEO_BLOCK_SIGNALS = [
  "user location is not supported",
  "location is not supported",
  "not supported for the api use",
  "region is not supported",
  "unsupported location",
  "not available in your location",
  "not available in your region",
];

export function isGeoBlockedError(errorMessage: string): boolean {
  const lower = String(errorMessage || "").toLowerCase();
  return GEO_BLOCK_SIGNALS.some((signal) => lower.includes(signal));
}

// Providers whose upstream surface emits Google's regional-availability
// refusal (GEO_BLOCK_SIGNALS above): Cloud Code / Gemini Code Assist — the
// antigravity executor (antigravity, agy) — and the Gemini Developer API
// (generativelanguage.googleapis.com; gemini, vertex). The gate matters
// because classifyProviderError is shared across every provider: an unrelated
// upstream returning a lookalike "not available in your region" must NOT be
// classified as an egress-fixable geo block, or it would get the non-terminal
// 24h exclusion treatment instead of that provider's own (possibly terminal)
// path.
// OpenCode Zen free-tier refusal. Mirrors isOpencodeFreeTierRefusal in
// open-sse/executors/opencodeGeoBlock.ts, which must stay a leaf module (no
// imports) while this file pulls the registry and the DB — the same mirroring the
// Cloudflare 1010 check uses. The parity test pins both to one vector table.
// Only the relayed sentence is reachable here: parseUpstreamError hands the
// classifier `error.message` and keeps `error.type` aside, so matching the
// machine token alone would never fire. The token stays in the list for callers
// that pass the whole body.
const FREE_TIER_REFUSAL_SIGNALS = ["freetiererror", "free tier can only be used"];

function isOpencodeFreeTierProvider(provider?: string | null): boolean {
  return (provider || "").toLowerCase().startsWith("opencode");
}

function isFreeTierClientRefusal(bodyStr: string): boolean {
  const lower = bodyStr.toLowerCase();
  return FREE_TIER_REFUSAL_SIGNALS.some((signal) => lower.includes(signal));
}

function isGeoBlockEligibleProvider(provider?: string | null): boolean {
  const p = (provider || "").toLowerCase();
  if (
    p === "antigravity" ||
    p === "agy" ||
    p === "gemini" ||
    p === "gemini-cli" ||
    p === "vertex"
  ) {
    return true;
  }
  if (p.includes("cloudcode") || p.includes("cloud-code")) return true;
  // Registry-driven fallback: any provider whose upstream surface is the Cloud
  // Code API (executor/format "antigravity") or the Gemini API (format
  // "gemini") stays eligible even when a new provider id is added later.
  if (!provider) return false;
  const entry = getRegistryEntry(provider);
  if (!entry) return false;
  const surface = `${entry.executor || ""} ${entry.format || ""}`.toLowerCase();
  return surface.includes("antigravity") || surface.includes("gemini");
}

// Cloudflare 1010 "Access denied ... blocked based on your browser's signature" —
// a fingerprint/browser-like rejection issued by the CDN in front of an upstream
// (e.g. opencode.ai/zen/v1), carrying error_code 1010 or error_name
// "browser_signature_banned". Distinct from an auth 403: the account is healthy,
// the CLIENT's TLS/UA signature was refused.
//
// IMPORTANT: the bare number 1010 is NOT matched on its own — a 403 body can
// legitimately contain "1010" as a port, count, request id, or model token
// ("model foo-1010 is not supported", "retry after 1010 seconds"). 1010 is only
// treated as a fingerprint rejection when it appears with an explicit Cloudflare
// key (`error_code` / `error-code`) or the unique `browser_signature_banned` /
// `fingerprint_rejection` tokens. `\\?` tolerates the escaped-quote form that
// appears when the upstream body is nested inside the gateway's error.message JSON.
const CLOUDFLARE_1010_REGEX =
  /(?<![A-Za-z0-9_-])error[\s_-]?code[\\"':=\s]{0,12}1010(?!\w)|(?<![A-Za-z0-9_-])error[-_]\s?1010(?!\w)\/?/i;

// A Cloudflare managed/JS challenge is the SAME class of block as a 1010 — the
// edge refused the CLIENT's signature and demanded an interactive browser
// challenge — but it is a different product surface and carries none of the
// 1010 markers. It arrives as a ~12KB text/html interstitial (with header
// `cf-mitigated: challenge`), so a body-shape match is the only signal
// available to a classifier that sees the body alone.
//
// Observed verbatim on `POST chatgpt.com/backend-api/codex/responses/input_tokens`
// for a HEALTHY Codex OAuth account whose token refreshed successfully in the
// same second and which served normal `/responses` traffic seconds before and
// after: `window._cf_chl_opt = {... cType: 'managed', cZone: 'chatgpt.com' ...}`.
// Without this branch the challenge falls through to FORBIDDEN, and chatCore's
// FORBIDDEN handler writes the terminal `banned`/`isActive:false` state that
// never auto-recovers — taking the whole provider offline until an operator
// reconnects, on a block that says nothing about account health.
//
// IMPORTANT: these markers are matched as full, distinctive Cloudflare-internal
// strings, never as loose words like "challenge" — a provider error body may
// legitimately discuss a "challenge" in prose.
const CLOUDFLARE_CHALLENGE_MARKERS = [
  "_cf_chl_opt",
  "cdn-cgi/challenge-platform",
  'id="challenge-error-text"',
  String.raw`id=\"challenge-error-text\"`,
] as const;

export function isCloudflareChallengeInterstitial(errorText: string): boolean {
  const text = String(errorText || "").toLowerCase();
  return CLOUDFLARE_CHALLENGE_MARKERS.some((marker) => text.includes(marker.toLowerCase()));
}

export function isCloudflareFingerprintRejection(errorText: string): boolean {
  const text = String(errorText || "").toLowerCase();
  return (
    CLOUDFLARE_1010_REGEX.test(text) ||
    text.includes("browser_signature_banned") ||
    text.includes("fingerprint_rejection") ||
    isCloudflareChallengeInterstitial(text)
  );
}

/**
 * Anthropic's OAuth (Claude subscription) surface answers a small fraction of
 * otherwise-valid requests with `403 {"type":"permission_error","message":
 * "Request not allowed"}`. Observed on one install: 200 on the same token 40 s
 * earlier, 200 on the next request after the connection was re-enabled — it is
 * a per-request refusal, not an account ban or a revoked token (a revoked token
 * is a 401 `authentication_error`). Classifying it FORBIDDEN flipped the only
 * Claude connection to the terminal `banned` state on a single response, and
 * every later request was short-circuited with "All 1 connection(s) banned by
 * upstream" until an operator reconnected in the dashboard.
 */
export function isAnthropicOAuthProvider(provider?: string | null): boolean {
  return String(provider || "").toLowerCase() === "claude";
}

export function isAnthropicRequestNotAllowed(errorText: string): boolean {
  return /\brequest not allowed\b/i.test(String(errorText || ""));
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

// A provider can return 404 for request-scoped resources (Files API ids,
// response items, uploads, etc.). These failures describe the request payload,
// not provider/model health. Keep every expression bounded to avoid ReDoS on
// upstream-controlled error bodies.
const RESOURCE_NOT_FOUND_PATTERNS = [
  /\bfiles?\b[^\n]{0,160}\b(?:not found|does not exist)\b/i,
  /\b(?:not found|does not exist)\b[^\n]{0,160}\bfiles?\b/i,
  /\b(?:input[_ -]?file|file[_ -]?id|item|response|vector[_ -]?store|upload)\b[^\n]{0,160}\b(?:not found|does not exist)\b/i,
  /\b(?:not found|does not exist)\b[^\n]{0,160}\b(?:input[_ -]?file|file[_ -]?id|item|response|vector[_ -]?store|upload)\b/i,
  /\bfile-[a-z0-9_-]+\b[^\n]{0,160}\b(?:not found|does not exist)\b/i,
];

/**
 * Whether an upstream error identifies a missing request-scoped resource.
 *
 * Resource signals intentionally take precedence over an outer
 * `code: "model_not_found"` because compatibility layers may synthesize that
 * code from the HTTP status before preserving the upstream file error.
 */
export function isResourceNotFoundResponse(responseBody: unknown): boolean {
  const body = responseBodyToString(responseBody);
  return RESOURCE_NOT_FOUND_PATTERNS.some((pattern) => pattern.test(body));
}

function shouldPreserveQuotaSignalsFor429(provider?: string | null): boolean {
  if (!provider) return true;
  return getProviderCategory(provider) === "oauth";
}

export function classifyProviderError(
  statusCode: number,
  responseBody: unknown,
  provider?: string | null
): ProviderErrorType | null {
  const bodyStr = responseBodyToString(responseBody);
  const creditsExhausted = isCreditsExhausted(bodyStr);
  const subscriptionQuotaExhausted = isSubscriptionQuotaText(bodyStr.toLowerCase());
  const accountDeactivated = isAccountDeactivated(bodyStr);
  const oauthInvalid = isOAuthInvalidToken(bodyStr);
  const preserveQuota429 = shouldPreserveQuotaSignalsFor429(provider);

  if (
    (creditsExhausted || subscriptionQuotaExhausted) &&
    [400, 401, 402, 403].includes(statusCode)
  ) {
    return PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED;
  }

  if ((creditsExhausted || subscriptionQuotaExhausted) && statusCode === 429 && preserveQuota429) {
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
  // gets locked via the cooldown layer and retries stop. Request-scoped
  // resource errors are excluded because retrying another account/model cannot
  // make an unknown file/item id valid. (#6827)
  if (statusCode === 404) {
    if (isResourceNotFoundResponse(responseBody)) return null;
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

  // Google regional-availability refusal (400 FAILED_PRECONDITION "... location
  // is not supported ..."), scoped to the Google AI surfaces that emit it
  // (Cloud Code / Gemini Code Assist + Gemini Developer API — see
  // isGeoBlockEligibleProvider). Account-independent: every credential egresses
  // from the same server region, so fallback to another account cannot succeed
  // — but the connection must be cached as excluded so routing does not
  // re-select it on every request and surface a cryptic generic 400.
  // Non-terminal, like PROJECT_ROUTE_ERROR: the account becomes usable again
  // once egress is routed through a supported-region proxy.
  if (
    (statusCode === 400 || statusCode === 403) &&
    isGeoBlockEligibleProvider(provider) &&
    isGeoBlockedError(bodyStr)
  ) {
    return PROVIDER_ERROR_TYPES.GEO_BLOCKED;
  }

  if (statusCode === 403 && isCloudflareFingerprintRejection(bodyStr)) {
    // Cloudflare 1010 / error_name "browser_signature_banned": the CDN in front of the
    // upstream (e.g. opencode.ai/zen/v1) rejected the CLIENT's TLS/UA signature, not the
    // account's credentials. It says nothing about account health — a different client on
    // the same key succeeds (measured 2026-08-08: curl 200, urllib 403 on byte-identical
    // body). Marking it FORBIDDEN would flow through markAccountUnavailable to the
    // terminal "banned" state and, after two such calls, flip the whole free pool to
    // ALL_ACCOUNTS_INACTIVE. Classify it separately so account state stays untouched.
    return PROVIDER_ERROR_TYPES.FINGERPRINT_REJECTION;
  }
  if (statusCode === 403 && accountDeactivated) {
    return PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED;
  }
  if (
    statusCode === 403 &&
    isAnthropicOAuthProvider(provider) &&
    isAnthropicRequestNotAllowed(bodyStr)
  ) {
    // Per-request refusal on an otherwise healthy Claude OAuth token — see
    // isAnthropicRequestNotAllowed. Must be checked BEFORE the generic 403 →
    // FORBIDDEN fall-through, which bans the connection permanently.
    return PROVIDER_ERROR_TYPES.REQUEST_REJECTED;
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
    // Kiro IDC missing profileArn — AWS returns 403 "User is not authorized to make this call"
    // when the request is sent without a profileArn or to the wrong Q Developer region.
    // This is a recoverable configuration issue, not a ban: the account still works in Kiro IDE.
    // Do NOT classify as FORBIDDEN (which bans permanently). Treat as PROJECT_ROUTE_ERROR
    // so the connection stays active and can be retried after profile discovery (#10725).
    const isKiroProfile403 =
      (p === "kiro" || p === "amazon-q") &&
      bodyStr.includes("User is not authorized to make this call");
    if (isKiroProfile403) {
      return PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR;
    }
    // A Cloudflare Sentinel/Turnstile 403 is a TERMINAL block for browser-session
    // providers: the user's IP/session needs a browser Turnstile challenge, and
    // retrying the same connection will keep 403ing. Classify as FORBIDDEN so
    // the connection gets banned and combo routing falls back to other providers.
    // Must be checked BEFORE the generic apikey-403→null return below, which
    // is designed for normal API-key auth 403s that ARE recoverable.
    if (
      bodyStr.includes("SENTINEL_BLOCKED") ||
      /\bSentinel\b[^\n]{0,80}\bblocked\b/i.test(bodyStr) ||
      /\bTurnstile required\b/i.test(bodyStr)
    ) {
      return PROVIDER_ERROR_TYPES.FORBIDDEN;
    }

    // The free tier refuses the REQUEST (client identity or request shape), not the
    // account: the same credential succeeds on a compliant request, and every
    // sibling account gets the same verdict. FORBIDDEN would ban the connection
    // permanently and GEO_BLOCKED would park a healthy account for 24h, so neither
    // fits. PROJECT_ROUTE_ERROR records the refusal (lastErrorType/lastError/
    // errorCode) and explicitly does not ban — matching how a recoverable
    // project-config 403 is handled above. Must precede the apikey short-circuit
    // below, which would otherwise drop this refusal as unclassified.
    if (isOpencodeFreeTierProvider(provider) && isFreeTierClientRefusal(bodyStr)) {
      return PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR;
    }

    if (provider && getProviderCategory(provider) === "apikey") {
      return null;
    }
    // No-credential ("authType: none") providers — free, stateless per-request
    // token proxies — have no real account/credential
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

  // Antigravity BYOP fast-fail (executor emits 422 with code
  // gcp_project_required when the Google account must Bring Its Own GCP
  // Project). Account-specific and fixable by entering a Project ID in the
  // dashboard — classified separately so chatCore rotates to sibling accounts
  // and excludes the connection instead of locking the model or banning it.
  if (statusCode === 422 && bodyStr.includes("gcp_project_required")) {
    return PROVIDER_ERROR_TYPES.GCP_PROJECT_REQUIRED;
  }

  if (statusCode === 400) {
    if (isContextOverflow(bodyStr)) {
      return PROVIDER_ERROR_TYPES.CONTEXT_OVERFLOW;
    }
    // Some providers (e.g. Antigravity's Pro-fallback chain, #8136) return a
    // plain 400 for a model that is no longer available, instead of 404/401.
    // Without this check the error falls through to `return null`, so
    // lockModel() never fires and the same dead model gets retried on every
    // request. Detect the phrasing here, same as the 401 branch above (#7268).
    if (containsModelUnavailableMessage(bodyStr)) {
      return PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND;
    }
  }

  return null;
}

// ── "Fake success" 2xx body classifier (#13461) ─────────────────────────────
//
// Some free/web-session providers (reported: Pollinations, Perplexity web via
// cookie session) answer a genuine failure — expired session, exhausted
// free-tier credits — with HTTP 200 and a structurally normal completion
// whose assistant message is just the provider's own error prose. Neither
// classifyProviderError above (gated on 400/401/402/403/429 before it ever
// looks at the body — deliberately NOT changed by this fix, see below) nor
// detectMalformedNonStream (open-sse/utils/diagnostics.ts, structural
// emptiness only) catch this, so the error text is translated and forwarded
// to the client as if the model had genuinely answered with that sentence.
//
// Deliberately narrow, by owner decision (2026-09-15):
//   - allowlist-only, starting with the two providers actually reported —
//     never applied globally. classifyProviderError()'s status-code gate is
//     intentionally left untouched; this lives in a separate sibling
//     function instead of loosening that gate.
//   - reuses the EXISTING, already-curated CREDITS_EXHAUSTED_SIGNALS /
//     ACCOUNT_DEACTIVATED_SIGNALS phrase lists (open-sse/services/
//     accountFallback.ts) rather than inventing new fuzzy matching.
//   - only trips on SHORT content whose matched signal covers a large
//     fraction of it — a multi-paragraph answer that merely *mentions* the
//     topic is long and/or the phrase is a small fraction of it, so it is
//     never misclassified.
const FAKE_SUCCESS_BODY_ALLOWLIST = new Set(["pollinations", "perplexity-web"]);

/** Exported for tests; not meant as a general-purpose provider predicate. */
export function isFakeSuccessBodyAllowlistedProvider(provider?: string | null): boolean {
  if (!provider) return false;
  return FAKE_SUCCESS_BODY_ALLOWLIST.has(provider.toLowerCase());
}

// A real prose answer runs to paragraphs; a disguised upstream error is one
// short sentence. Generous headroom above every known signal phrase while
// still excluding genuine longer completions that merely mention the topic.
const FAKE_SUCCESS_MAX_CONTENT_LENGTH = 400;

// The matched signal alone must make up a meaningful share of the message —
// keeps a legitimate answer that references the phrase in passing (as part
// of a much larger sentence/paragraph) from tripping this classifier.
const FAKE_SUCCESS_MIN_SIGNAL_COVERAGE = 0.12;

function matchedSignalCoverage(lowerText: string, signals: readonly string[]): number {
  let best = 0;
  for (const signal of signals) {
    if (lowerText.includes(signal) && signal.length > best) best = signal.length;
  }
  return lowerText.length > 0 ? best / lowerText.length : 0;
}

/**
 * Classify a *successful* (2xx) response's assistant-message text as a
 * disguised upstream failure. Returns the matching ProviderErrorType, or
 * null when the provider is not on the allowlist, the content is too long
 * to be a bare error sentence, or no known signal phrase dominates it.
 *
 * Only ever meaningful for the narrow provider allowlist above — see
 * isFakeSuccessBodyAllowlistedProvider and #13461.
 */
export function classifyFakeSuccessBody(
  content: string,
  provider?: string | null
): ProviderErrorType | null {
  if (!isFakeSuccessBodyAllowlistedProvider(provider)) return null;

  const text = String(content || "").trim();
  if (!text || text.length > FAKE_SUCCESS_MAX_CONTENT_LENGTH) return null;

  const lower = text.toLowerCase();
  if (matchedSignalCoverage(lower, CREDITS_EXHAUSTED_SIGNALS) >= FAKE_SUCCESS_MIN_SIGNAL_COVERAGE) {
    return PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED;
  }
  if (
    matchedSignalCoverage(lower, ACCOUNT_DEACTIVATED_SIGNALS) >= FAKE_SUCCESS_MIN_SIGNAL_COVERAGE
  ) {
    return PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED;
  }
  return null;
}
