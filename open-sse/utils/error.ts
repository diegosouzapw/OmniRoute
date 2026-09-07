import { CORS_HEADERS } from "./cors.ts";
import { unwrapClinepassEnvelope } from "./clinepassEnvelope.ts";
import {
  redactSensitiveErrorText,
  sanitizeErrorMessage,
  sanitizeUpstreamDetails,
} from "./errorSanitization.ts";
import { getDefaultErrorMessage, getErrorInfo } from "../config/errorConfig.ts";
import { normalizePayloadForLog } from "@/lib/logPayloads";
import type { ModelCooldownErrorPayload } from "@/types";
import { buildPassthroughErrorResponse } from "./upstreamErrorPassthrough.ts";

export { redactSensitiveErrorText, sanitizeErrorMessage, sanitizeUpstreamDetails };

/** Client-visible error shape; dynamic fields are projected through canonical boundaries. */
interface ErrorResponseBody {
  error: {
    message: string;
    type?: string;
    code?: string;
    reason?: string;
  };
  upstream_details?: Record<string, unknown> | null; // sanitized upstream provider body
}

/** Optional caller classification; when set, wins over status-derived defaults. */
export type ErrorBodyClassification = {
  type?: string;
  code?: string;
  reason?: string;
};

const PUBLIC_ERROR_IDENTIFIER = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;
const SAFE_PUBLIC_ERROR_IDENTIFIERS = new Set([
  "abort",
  "aborted",
  "account_semaphore_capacity",
  "acp_cancelled",
  "acp_early_exit",
  "acp_error",
  "acp_output_too_large",
  "acp_session_mismatch",
  "acp_timeout",
  "admission_aborted",
  "admission_deadline",
  "admission_lane_evicted",
  "admission_oversized",
  "admission_queue_full",
  "admission_shutdown",
  "admission_unavailable",
  "all_accounts_inactive",
  "all_targets_skipped",
  "antigravity_pre_response_timeout",
  "api_error",
  "authentication_error",
  "authentication_required",
  "auth_error",
  "bad_gateway",
  "bad_request",
  "bedrock_stream_error",
  "billing_error",
  "blackbox_auth_required",
  "blackbox_rate_limit",
  "blackbox_subscription_required",
  "body_exceeds_budget",
  "browser_stream_inconsistent",
  "capability_mismatch",
  "cf_mitigated_challenge",
  "chat_admission_busy",
  "chat_history_too_large",
  "chatgpt_web_codex_error",
  "chatgpt_web_codex_turn_failed",
  "chatgpt_session_expired",
  "chatgpt_submission_ambiguous",
  "chatgpt_submitted_turn_failed",
  "chatgpt_subscription_unavailable",
  "client_cancelled",
  "client_closed_request",
  "client_disconnected",
  "cli_not_found",
  "cloudflare_challenge",
  "cloudflare_or_bot",
  "codex_app_server_unconfigured",
  "codex_app_server_turn_failed",
  "combo_target_timeout",
  "combo_timeout",
  "compaction_control_unavailable",
  "compaction_handoff_failed",
  "connector_error",
  "connector_not_found",
  "connection_error",
  "context_length_exceeded",
  "context_window",
  "chipotle_error",
  "devin_agentic_error",
  "devin_cli_error",
  "devin_desktop_error",
  "devin_internal_tool_execution",
  "duplicate_tool_use_id",
  "direct_response_start_timeout",
  "eai_again",
  "econnrefused",
  "econnreset",
  "empty_acp_output",
  "empty_content",
  "empty_messages",
  "empty_response",
  "executor_contract_violation",
  "error",
  "etimedout",
  "executor_error",
  "feature_disabled",
  "gateway_timeout",
  "gemini_tpm_exhausted",
  "gcp_project_required",
  "grok_error",
  "insufficient_quota",
  "incompatible_reasoning_effort",
  "internal_server_error",
  "invalid_acp_frame",
  "invalid_acp_upstream",
  "invalid_api_key",
  "invalid_kiro_tool_call",
  "invalid_request",
  "invalid_request_error",
  "invalid_previous_response_binding",
  "invalid_tool_arguments",
  "invalid_tool_choice",
  "invalid_tool_json",
  "invalid_tool_name",
  "invalid_tools",
  "invalid_trailer",
  "lease_action_invalid",
  "lease_api_key_invalid",
  "lease_authentication_required",
  "lease_authorization_mismatch",
  "lease_capacity_unavailable",
  "lease_connection_mismatch",
  "lease_content_type_required",
  "lease_context_invalid",
  "lease_context_required",
  "lease_error",
  "lease_fence_stale",
  "lease_key_configuration_invalid",
  "lease_key_policy_invalid",
  "lease_model_invalid",
  "lease_no_eligible_connection",
  "lmarena_error",
  "lease_required",
  "lease_scope_required",
  "lease_service_unavailable",
  "lease_eligibility_unavailable",
  "lease_unsupported_route",
  "lease_unsupported_transport",
  "message_limit",
  "missing_credits",
  "meta_ai_empty_response",
  "meta_ai_mode_switch_failed",
  "meta_ai_warmup_failed",
  "meta_ai_ws_error",
  "missing_tool_name",
  "missing_tool_use_id",
  "mixed_tool_narrative",
  "missing_authorization",
  "missing_cookie",
  "missing_project_id",
  "missing_credentials",
  "missing_session_id",
  "model_not_found",
  "model_not_supported",
  "model_shutdown",
  "multipart_protocol_violation",
  "multiple_tool_requests",
  "native_codex_pinned_model_unavailable",
  "network_error",
  "no_free_eligible_connection",
  "not_found",
  "oauth_missing_project_id",
  "orphan_tool_result",
  "payload_too_large",
  "payment_required",
  "permission_error",
  "premium_model_requires_key",
  "prompt_attachment_integrity",
  "provider_error",
  "provider_retired",
  "provider_unavailable",
  "pplx_error",
  "proxy_unavailable",
  "proxy_family_unavailable",
  "proxy_request_failed",
  "proxy_unreachable",
  "quota_exhausted",
  "quota_not_allocated",
  "quota_only",
  "rate_limit_error",
  "rate_limit_execution_timeout",
  "rate_limit_exceeded",
  "rate_limit_queue_full",
  "rate_limit_queue_timeout",
  "rate_limit_queue_wedged",
  "rate_limit_longer_reached",
  "rate_limit_reached",
  "rate_limited",
  "reached_limit",
  "relay_timeout",
  "resource_pressure",
  "resource_exhausted",
  "request_failed",
  "risk_session_stale",
  "server_error",
  "semaphore_queue_full",
  "semaphore_timeout",
  "service_unavailable",
  "service_not_running",
  "session_expired",
  "session_pool_exhausted",
  "spawn_failed",
  "stream_error",
  "stream_disconnected",
  "stream_early_eof",
  "stream_idle_timeout",
  "stream_pipeline_error",
  "stream_readiness_timeout",
  "stream_terminated",
  "stream_timeout",
  "storage_encryption_stale",
  "structure_limit",
  "structured_output",
  "structured_output_validation_failed",
  "timeout_error",
  "timeout",
  "token_limit_exceeded",
  "token_required",
  "tls_client_unavailable",
  "tls_circuit_open",
  "tls_fingerprint_failed",
  "tls_session_capacity",
  "tool_calling_not_supported",
  "tools",
  "undeclared_historical_tool",
  "und_err_body_timeout",
  "und_err_connect_timeout",
  "und_err_headers_timeout",
  "und_err_socket",
  "unexpected_acp_response",
  "unexecuted_tool_intent",
  "unavailable",
  "unknown_devin_model",
  "unknown_tool",
  "unverified_codex_client",
  "unsafe_devin_home",
  "unsupported_acp_version",
  "unsupported_content_block",
  "unsupported_control_for_provider",
  "unsupported_endpoint",
  "unsupported_image_block",
  "unsupported_role",
  "unsupported_system_block",
  "upstream_error",
  "upstream_access_denied",
  "upstream_auth_error",
  "upstream_empty_response",
  "upstream_response_failed",
  "upstream_response_error",
  "upstream_server_error",
  "upstream_protocol_error",
  "upstream_timeout",
  "upstream_websocket_connect_failed",
  "upstream_websocket_error",
  "usage_limit_reached",
  "unsupported_feature",
  "unsupported_runtime",
  "video_artifact_content_type_invalid",
  "video_artifact_download_failed",
  "video_artifact_not_ready",
  "video_artifact_signature_invalid",
  "video_artifact_too_large",
  "video_artifact_unavailable",
  "video_artifact_url_blocked",
  "video_artifact_url_invalid",
  "vision",
  "claude_web_protocol_error",
  "wreq_unavailable",
]);

function isSafePublicErrorIdentifier(value: string): boolean {
  if (!PUBLIC_ERROR_IDENTIFIER.test(value)) return false;
  if (/^[1-5]\d{2}$/.test(value)) return true;
  if (/^HTTP_[1-5]\d{2}$/i.test(value)) return true;
  return SAFE_PUBLIC_ERROR_IDENTIFIERS.has(value.toLowerCase());
}

/** Project an internal classification onto the bounded client-visible identifier vocabulary. */
export function projectPublicErrorIdentifier(value: unknown, fallback: unknown): string {
  const safeFallback =
    fallback === ""
      ? ""
      : typeof fallback === "string" && isSafePublicErrorIdentifier(fallback)
        ? fallback
        : "error";
  if (typeof value !== "string") return safeFallback;
  return isSafePublicErrorIdentifier(value) ? value : safeFallback;
}

/**
 * Build OpenAI-compatible error response body. Message is always sanitized
 * so callers do not need to remember to strip stack traces themselves.
 * Optional third argument `upstreamDetails` (raw parsed provider body) is
 * sanitized by sanitizeUpstreamDetails before inclusion as `upstream_details`.
 * Optional fourth argument `classification` preserves an explicit type/code
 * instead of re-deriving both from the status-code table.
 */
export function buildErrorBody(
  statusCode: number,
  message: string,
  upstreamDetails?: unknown,
  classification?: ErrorBodyClassification
): ErrorResponseBody {
  const errorInfo = getErrorInfo(statusCode);
  const safeMessage = sanitizeErrorMessage(message) || getDefaultErrorMessage(statusCode);
  const safeReason =
    typeof classification?.reason === "string" && isSafePublicErrorIdentifier(classification.reason)
      ? classification.reason
      : undefined;

  const body: ErrorResponseBody = {
    error: {
      message: safeMessage,
      type: projectPublicErrorIdentifier(classification?.type, errorInfo.type),
      code: projectPublicErrorIdentifier(classification?.code, errorInfo.code),
      reason: safeReason,
    },
  };

  if (upstreamDetails !== undefined && upstreamDetails !== null) {
    const sanitized = sanitizeUpstreamDetails(upstreamDetails);
    if (sanitized !== null && typeof sanitized === "object" && !Array.isArray(sanitized)) {
      body.upstream_details = sanitized as Record<string, unknown>;
    }
  }

  return body;
}

/**
 * Sanitized auto-combo diagnostic trace surfaced on a combo terminal failure.
 * Contains ONLY provider/model ids, enumerated reason codes, and counts — never
 * keys, tokens, cookies, credentials, or upstream bodies. Fields are length- and
 * count-capped so the projection is safe to place in HTTP headers too. (QA P0:
 * "Add a sanitized combo diagnostic trace … candidate pool count, excluded
 * provider/model reasons, selected attempt order, terminal failure summary.")
 */
export interface ComboExclusion {
  provider: string;
  model?: string;
  reason: string;
}
/**
 * Next-step suggestion surfaced when a combo cascade fails. Lets the client (e.g.
 * the OpenCode plugin) auto-render an actionable hint in the TUI instead of an
 * opaque "model stopped producing output" error — fixes the silent-stop pattern
 * where the user has no way to recover a session without guessing. Whitelisted to
 * a small set so the projection remains bounded.
 */
export type ComboRecoveryAction =
  /** Cascade failed because every candidate is exhausted — try a different combo or `auto`. */
  | "try-auto"
  /** Upstream asks to retry after a cooldown window — wait, then retry the same combo. */
  | "wait"
  /** Transient failure (network, 5xx) — retry the same combo immediately. */
  | "retry"
  /** Cascade used every account of every provider — switch to a different combo entirely. */
  | "switch-combo";

export interface ComboRecoveryHint {
  /** Machine-readable action verb — consumed by clients to render a UI hint. */
  action: ComboRecoveryAction;
  /** Seconds the client should wait before retrying. Only meaningful when action="wait". */
  retry_after_seconds?: number;
  /** Human-readable next step — sanitized and length-capped for non-MCP clients. */
  next_step: string;
}

export interface ComboExclusion {
  provider: string;
  model?: string;
  reason: string;
}
export interface ComboDiagnostics {
  poolSize: number;
  attempted: number;
  excluded: ComboExclusion[];
  attemptOrder: Array<{ provider: string; model: string }>;
  terminalReason: string;
  /** Optional next-step hint — populated when the dispatcher can recommend a recovery action. */
  recovery?: ComboRecoveryHint;
}

function clampDiagStr(v: unknown, max = 128): string {
  return typeof v === "string" ? sanitizeErrorMessage(v).slice(0, max) : "";
}

const RECOVERY_ROUTE_PLACEHOLDERS = [
  ["/dashboard/providers", "OMNIROUTE_SAFE_DASHBOARD_PROVIDERS_ROUTE"],
] as const;

function clampRecoveryStr(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  let projected = value;
  for (const [route, placeholder] of RECOVERY_ROUTE_PLACEHOLDERS) {
    projected = projected.replaceAll(route, placeholder);
  }
  projected = sanitizeErrorMessage(projected);
  for (const [route, placeholder] of RECOVERY_ROUTE_PLACEHOLDERS) {
    projected = projected.replaceAll(placeholder, route);
  }
  return projected.slice(0, max);
}

/**
 * HTTP header values must exclude controls and remain ByteString-compatible
 * (undici throws a TypeError otherwise — see #6612). Replace every codepoint
 * outside printable ASCII with "?" so header construction never throws.
 */
function toHeaderSafeAscii(v: string): string {
  let out = "";
  for (let i = 0; i < v.length; i++) {
    const code = v.charCodeAt(i);
    out += code < 0x20 || code > 0x7e ? "?" : v[i];
  }
  return out;
}

/**
 * Whitelist sanitizer for the recovery hint. The `action` enum is a closed set;
 * `retry_after_seconds` is clamped to a non-negative integer ≤ 3600; `next_step` is
 * capped and stripped of CR/LF (would break header parsing). Returns undefined when
 * no usable input was supplied so downstream code can branch cleanly on absence.
 */
const RECOVERY_ACTIONS = new Set<ComboRecoveryAction>([
  "try-auto",
  "wait",
  "retry",
  "switch-combo",
]);
export function sanitizeRecoveryHint(
  r: ComboRecoveryHint | null | undefined
): ComboRecoveryHint | undefined {
  if (!r || typeof r !== "object") return undefined;
  const action = typeof r.action === "string" ? (r.action as ComboRecoveryAction) : null;
  if (!action || !RECOVERY_ACTIONS.has(action)) return undefined;
  // Reject empty OR whitespace-only next_step — the value must render usefully as a
  // header and as a body field. A whitespace-only string would print as a blank hint.
  const next_step = clampRecoveryStr(r.next_step, 200).trim();
  if (!next_step) return undefined;
  const hint: ComboRecoveryHint = { action, next_step };
  if (typeof r.retry_after_seconds === "number" && Number.isFinite(r.retry_after_seconds)) {
    hint.retry_after_seconds = Math.max(0, Math.min(3600, Math.floor(r.retry_after_seconds)));
  }
  return hint;
}

/**
 * Whitelist projection — guarantees only id/reason string primitives + integer
 * counts can escape, regardless of what the caller assembled. This is the secret
 * containment boundary for the diagnostic trace.
 */
export function sanitizeComboDiagnostics(d: ComboDiagnostics): ComboDiagnostics {
  const recovery = sanitizeRecoveryHint(d?.recovery);
  const out: ComboDiagnostics = {
    poolSize: Number.isFinite(d?.poolSize) ? d.poolSize : 0,
    attempted: Number.isFinite(d?.attempted) ? d.attempted : 0,
    excluded: (d?.excluded ?? []).slice(0, 64).map((e) => ({
      provider: clampDiagStr(e?.provider, 64),
      ...(e?.model ? { model: clampDiagStr(e.model, 96) } : {}),
      reason: clampDiagStr(e?.reason, 64),
    })),
    attemptOrder: (d?.attemptOrder ?? [])
      .slice(0, 64)
      .map((a) => ({ provider: clampDiagStr(a?.provider, 64), model: clampDiagStr(a?.model, 96) })),
    terminalReason: clampDiagStr(d?.terminalReason, 200),
  };
  if (recovery) out.recovery = recovery;
  return out;
}

/**
 * errorResponse variant that attaches a sanitized combo diagnostic trace as BOTH
 * `x-omniroute-combo-*` headers and a `diagnostics` field in the OpenAI-shaped
 * error body (extra field — backward-compatible with standard error parsers).
 * `opts.code`/`opts.type` override the status-derived defaults (e.g. to preserve
 * the `ALL_ACCOUNTS_INACTIVE` code on the 503 terminal path). When the diagnostic
 * carries a `recovery` hint it is mirrored as `x-omniroute-recovery-action` /
 * `x-omniroute-recovery-next-step` / `x-omniroute-retry-after-seconds` headers and as a
 * top-level `recovery_hint` field on the body so non-header-aware clients (curl,
 * MCP tools, log scrapers) can also pick it up.
 */
export function errorResponseWithComboDiagnostics(
  statusCode: number,
  message: string,
  diagnostics: ComboDiagnostics,
  opts: { code?: string; type?: string } = {}
): Response {
  const safe = sanitizeComboDiagnostics(diagnostics);
  const body = buildErrorBody(statusCode, message, undefined, opts) as ErrorResponseBody & {
    diagnostics?: ComboDiagnostics;
    recovery_hint?: ComboRecoveryHint;
  };
  body.diagnostics = safe;
  if (safe.recovery) body.recovery_hint = safe.recovery;
  const excludedHeader = toHeaderSafeAscii(
    safe.excluded
      .map((e) => `${e.provider}${e.model ? `/${e.model}` : ""}:${e.reason}`)
      .join(",")
      .slice(0, 900)
  );
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-omniroute-combo-pool-size": String(safe.poolSize),
    "x-omniroute-combo-attempted": String(safe.attempted),
    "x-omniroute-combo-excluded": excludedHeader,
    "x-omniroute-combo-terminal-reason": toHeaderSafeAscii(safe.terminalReason.slice(0, 200)),
  };

  if (safe.recovery) {
    headers["x-omniroute-recovery-action"] = safe.recovery.action;
    // Header limit of 128 chars — keep next_step compact for fast parsing.
    // The body field carries the full 200-char value for richer display.
    headers["x-omniroute-recovery-next-step"] = toHeaderSafeAscii(safe.recovery.next_step).slice(
      0,
      128
    );
    if (
      typeof safe.recovery.retry_after_seconds === "number" &&
      safe.recovery.retry_after_seconds > 0
    ) {
      headers["x-omniroute-retry-after-seconds"] = String(safe.recovery.retry_after_seconds);
    }
  }

  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers,
  });
}

/**
 * Create error Response object (for non-streaming)
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @returns {Response} HTTP Response object
 */
export function errorResponse(
  statusCode: number,
  message: string,
  classification?: ErrorBodyClassification
): Response {
  return new Response(
    JSON.stringify(
      buildErrorBody(statusCode, sanitizeErrorMessage(message), undefined, classification)
    ),
    {
      status: statusCode,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

/**
 * Write error to SSE stream (for streaming)
 * @param {WritableStreamDefaultWriter} writer - Stream writer
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 */
export async function writeStreamError(
  writer: WritableStreamDefaultWriter<Uint8Array>,
  statusCode: number,
  message: string
): Promise<void> {
  const errorBody = buildErrorBody(statusCode, sanitizeErrorMessage(message));
  const encoder = new TextEncoder();
  await writer.write(encoder.encode(`data: ${JSON.stringify(errorBody)}\n\n`));
}

function normalizeRetryAfterSeconds(retryAfter?: string | number | Date | null): number {
  if (typeof retryAfter === "number" && Number.isFinite(retryAfter)) {
    if (retryAfter > 0 && retryAfter < 1_000_000_000) {
      return Math.max(Math.ceil(retryAfter), 1);
    }

    const retryTimeMs = new Date(retryAfter).getTime();
    if (Number.isFinite(retryTimeMs)) {
      return Math.max(Math.ceil((retryTimeMs - Date.now()) / 1000), 1);
    }
  }

  if (retryAfter instanceof Date || typeof retryAfter === "string") {
    const retryTimeMs = new Date(retryAfter).getTime();
    if (Number.isFinite(retryTimeMs)) {
      return Math.max(Math.ceil((retryTimeMs - Date.now()) / 1000), 1);
    }
  }

  return 1;
}

const MAX_PUBLIC_CONTEXT_LABEL_LENGTH = 256;

function projectPublicContextLabel(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const label = value.trim();
  if (
    label.length === 0 ||
    label.length > MAX_PUBLIC_CONTEXT_LABEL_LENGTH ||
    /[\u0000-\u001f\u007f]/.test(label)
  ) {
    return null;
  }
  return sanitizeErrorMessage(label) === label ? label : null;
}

function projectPublicRetryTimestamp(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const timestamp = value.trim();
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(timestamp)) return null;
  const parsed = Date.parse(timestamp);
  return Number.isFinite(parsed) && new Date(parsed).toISOString() === timestamp ? timestamp : null;
}

/**
 * Parse Antigravity error message to extract retry time
 * Example: "You have exhausted your capacity on this model. Your quota will reset after 2h7m23s."
 * @param {string} message - Error message
 * @returns {number|null} Retry time in milliseconds, or null if not found
 */
export function parseAntigravityRetryTime(message: unknown): number | null {
  if (typeof message !== "string") return null;

  // Match patterns like: 2h7m23s, 5m30s, 45s, 1h20m, etc.
  const match = message.match(/reset after (\d+h)?(\d+m)?(\d+s)?/i);
  if (!match) return null;

  let totalMs = 0;

  // Extract hours
  if (match[1]) {
    const hours = parseInt(match[1]);
    totalMs += hours * 60 * 60 * 1000;
  }

  // Extract minutes
  if (match[2]) {
    const minutes = parseInt(match[2]);
    totalMs += minutes * 60 * 1000;
  }

  // Extract seconds
  if (match[3]) {
    const seconds = parseInt(match[3]);
    totalMs += seconds * 1000;
  }

  return totalMs > 0 ? totalMs : null;
}

/**
 * Parse upstream provider error response
 * @param {Response} response - Fetch response from provider
 * @param {string} provider - Provider name (for Antigravity-specific parsing)
 * @returns {Promise<{statusCode: number, message: string, retryAfterMs: number|null, responseBody: unknown}>}
 */
export async function parseUpstreamError(response: Response, provider: string | null = null) {
  let message = "";
  let retryAfterMs: number | null = null;
  let responseBody: unknown = null;
  let errorCode: unknown = undefined;
  let errorType: unknown = undefined;

  try {
    const text = await response.text();
    responseBody = normalizePayloadForLog(text);

    // Try parse as JSON
    try {
      const parsed = JSON.parse(text);
      // Handle array responses (e.g., from some Gemini APIs)
      const json = (Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : parsed) || {};
      // ClinePass wraps upstream errors in a {success:false, error} envelope.
      // Extract the upstream error string (an upstream JSON field, not a local
      // stack) — still routed through sanitizeErrorMessage/buildErrorBody by
      // every consumer below (Rule #12).
      const { error: clinepassEnvError } = unwrapClinepassEnvelope(json, provider);
      const extractedMessage = clinepassEnvError
        ? clinepassEnvError.message
        : json.error?.message ||
          json.message ||
          (typeof json.error === "string" ? json.error : null);
      message =
        typeof extractedMessage === "string"
          ? extractedMessage
          : `Upstream error: ${response.status}`;
      errorCode = json.error?.code || json.code;
      errorType = json.error?.type || json.type;
    } catch {
      message = text;
    }
  } catch {
    message = `Upstream error: ${response.status}`;
    responseBody = { _rawText: message };
  }

  const messageStr = message;

  const retryAfterHeader = response.headers?.get?.("retry-after");
  if (retryAfterHeader && !retryAfterMs) {
    const retryAfterSec = Number.parseInt(retryAfterHeader, 10);
    if (Number.isFinite(retryAfterSec) && retryAfterSec > 0) {
      retryAfterMs = retryAfterSec * 1000;
    } else {
      const retryAfterDate = new Date(retryAfterHeader).getTime();
      if (Number.isFinite(retryAfterDate) && retryAfterDate > Date.now()) {
        retryAfterMs = retryAfterDate - Date.now();
      }
    }
  }

  // Parse Antigravity-specific retry time from error message
  if (provider === "antigravity" && response.status === 429) {
    retryAfterMs = parseAntigravityRetryTime(messageStr);
  }

  // Also parse retry time for other providers (Qwen, etc.) with "quota will reset after XhYmZs" format
  if (response.status === 429 && !retryAfterMs) {
    retryAfterMs = parseAntigravityRetryTime(messageStr);
  }

  // Generic providers: "Please retry after 20s"
  if (response.status === 429 && !retryAfterMs) {
    const retryMatch = messageStr.match(/retry\s+after\s+(\d+)\s*s/i);
    if (retryMatch) {
      retryAfterMs = Number.parseInt(retryMatch[1], 10) * 1000;
    }
  }

  // Cap maximum retry time at 24 hours to prevent infinite wait
  const MAX_RETRY_MS = 24 * 60 * 60 * 1000;
  if (retryAfterMs && retryAfterMs > MAX_RETRY_MS) {
    retryAfterMs = MAX_RETRY_MS;
  }

  const responseHeaders: Record<string, string> | null = response.headers
    ? Object.fromEntries(response.headers.entries())
    : null;

  return {
    statusCode: response.status,
    message: messageStr,
    errorCode,
    errorType,
    retryAfterMs,
    responseBody,
    responseHeaders,
  };
}

/**
 * Create error result for chatCore handler
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {number|null} retryAfterMs - Optional retry-after time in milliseconds
 * @returns {{ success: false, status: number, error: string, response: Response, retryAfterMs?: number }}
 */
export function createErrorResult(
  statusCode: number,
  message: string,
  retryAfterMs: number | null = null,
  errorCode?: string,
  errorType?: string,
  upstreamDetails?: unknown,
  opts?: { passthrough?: boolean }
) {
  const body = buildErrorBody(statusCode, message, upstreamDetails, {
    code: errorCode,
    type: errorType,
  });

  const result: {
    success: false;
    status: number;
    error: string;
    /**
     * #7360: the FULL, un-sanitized upstream message — `error` above is
     * truncated to its first line by sanitizeErrorMessage() (correctly, for
     * the client-facing response body). Server-side classification
     * (checkFallbackError / Gemini TPM-vs-RPD metric detection) needs the
     * complete multi-line text — e.g. Google's metric name and retry hint
     * live on lines 2-3, after the generic "quota exceeded" preamble on
     * line 1. This field NEVER reaches the HTTP response body (`response`
     * below is already built from the sanitized `body`); it exists purely
     * for internal callers that inspect the returned object.
     */
    rawMessage: string;
    errorType?: string;
    errorCode?: string;
    response: Response;
    retryAfterMs?: number;
  } = {
    success: false,
    status: statusCode,
    error: body.error.message,
    rawMessage: message,
    errorType,
    errorCode,
    response: new Response(JSON.stringify(body), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    }),
  };

  // Add retryAfterMs if available (for Antigravity quota errors)
  if (retryAfterMs) {
    result.retryAfterMs = retryAfterMs;
  }

  // Opt-in relay of the recursively sanitized upstream JSON shape (Claude Code
  // auto-recover contract — see upstreamErrorPassthrough.ts). Only swaps `result.response`;
  // `result.error`/`rawMessage`/`errorType`/`errorCode` stay untouched so
  // server-side classification (checkFallbackError, combo retry logic, etc.)
  // never sees a different value depending on this flag.
  if (opts?.passthrough) {
    const passthroughResponse = buildPassthroughErrorResponse(
      statusCode,
      upstreamDetails,
      retryAfterMs ? { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } : undefined
    );
    if (passthroughResponse) {
      result.response = passthroughResponse;
    }
  }

  return result;
}

/**
 * Create unavailable response when all accounts are rate limited
 * @param {number} statusCode - Original error status code
 * @param {string} message - Error message (without retry info)
 * @param {string} retryAfter - ISO timestamp when earliest account becomes available
 * @param {string} retryAfterHuman - Human-readable retry info e.g. "reset after 30s"
 * @returns {Response}
 */
export function unavailableResponse(
  statusCode: number,
  message: string,
  retryAfter?: string | number | Date | null,
  retryAfterHuman?: string
) {
  const retryAfterSec = normalizeRetryAfterSeconds(retryAfter);
  const safeMessage = sanitizeErrorMessage(message) || getDefaultErrorMessage(statusCode);
  const safeRetryAfterHuman = retryAfterHuman ? sanitizeErrorMessage(retryAfterHuman) : "";
  const msg = safeRetryAfterHuman ? `${safeMessage} (${safeRetryAfterHuman})` : safeMessage;
  return new Response(JSON.stringify({ error: { message: msg } }), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": String(retryAfterSec),
    },
  });
}

export function providerCircuitOpenResponse(
  provider: string,
  retryAfter?: string | number | Date | null
) {
  const retryAfterSec = normalizeRetryAfterSeconds(retryAfter);
  const safeProvider = projectPublicContextLabel(provider) ?? "unknown";
  return new Response(
    JSON.stringify({
      error: {
        message: `Provider ${safeProvider} circuit breaker is open`,
        type: "server_error",
        code: "provider_circuit_open",
        provider: safeProvider,
        retry_after: retryAfterSec,
      },
    }),
    {
      status: 503,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfterSec),
        "X-OmniRoute-Provider-Breaker": "open",
      },
    }
  );
}

export function buildModelCooldownBody({
  model,
  retryAfterSec,
  retryAfterAt,
  credentialsCoolingCount,
}: {
  model?: string | null;
  retryAfterSec: number;
  retryAfterAt?: string | null;
  credentialsCoolingCount?: number | null;
}): ModelCooldownErrorPayload {
  const resolvedModel = projectPublicContextLabel(model);
  const resolvedRetryAfterAt = projectPublicRetryTimestamp(retryAfterAt);
  const resolvedResetSeconds =
    Number.isFinite(retryAfterSec) && retryAfterSec > 0 ? Math.max(Math.ceil(retryAfterSec), 1) : 1;
  const resolvedCoolingCount =
    typeof credentialsCoolingCount === "number" &&
    Number.isFinite(credentialsCoolingCount) &&
    credentialsCoolingCount > 0
      ? Math.floor(credentialsCoolingCount)
      : null;

  return {
    error: {
      message: resolvedModel
        ? `All credentials for model ${resolvedModel} are cooling down`
        : "All credentials for the requested model are cooling down",
      type: "rate_limit_error",
      code: "model_cooldown",
      ...(resolvedModel ? { model: resolvedModel } : {}),
      reset_seconds: resolvedResetSeconds,
      ...(resolvedRetryAfterAt ? { retry_after: resolvedRetryAfterAt } : {}),
      ...(resolvedCoolingCount ? { credentials_cooling: resolvedCoolingCount } : {}),
    },
  };
}

export function modelCooldownResponse({
  model,
  retryAfter,
  retryAfterAt,
  credentialsCoolingCount,
}: {
  model?: string | null;
  retryAfter?: string | number | Date | null;
  retryAfterAt?: string | null;
  credentialsCoolingCount?: number | null;
}) {
  const retryAfterSec = normalizeRetryAfterSeconds(retryAfter);
  const resolvedRetryAfterAt =
    typeof retryAfterAt === "string" && retryAfterAt.length > 0
      ? retryAfterAt
      : typeof retryAfter === "string" && retryAfter.length > 0
        ? retryAfter
        : null;
  return new Response(
    JSON.stringify(
      buildModelCooldownBody({
        model,
        retryAfterSec,
        retryAfterAt: resolvedRetryAfterAt,
        credentialsCoolingCount,
      })
    ),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfterSec),
      },
    }
  );
}

/**
 * Build an executor-style error result (response + url + headers + transformedBody).
 * Shared by web-cookie executors that return the `{ response, url, headers, transformedBody }` shape.
 */
export function makeExecutorErrorResult(
  status: number,
  message: string,
  body: unknown,
  url: string
) {
  return {
    response: new Response(
      JSON.stringify({
        error: {
          message: sanitizeErrorMessage(message),
          type: "upstream_error",
          code: `HTTP_${status}`,
        },
      }),
      { status, headers: { "Content-Type": "application/json" } }
    ),
    url,
    headers: {} as Record<string, string>,
    transformedBody: body,
  };
}

/**
 * Normalize a cookie string: strip a leading "Cookie:" prefix if present.
 */
export function normalizeCookie(raw: string): string {
  return raw?.startsWith("Cookie:") ? raw.slice(7).trim() : raw || "";
}

/**
 * Format provider error with context
 * @param {Error} error - Original error
 * @param {string} provider - Provider name
 * @param {string} model - Model name
 * @param {number|string} statusCode - HTTP status code or error code
 * @returns {string} Formatted error message
 */
export function formatProviderError(
  error: { code?: string | number; message?: string; cause?: unknown } | Error,
  provider: string,
  model: string,
  statusCode?: string | number | null
): string {
  const providerCode = "code" in error ? error.code : undefined;
  const code = statusCode || providerCode || "FETCH_FAILED";
  const message = error.message || "Unknown error";
  // Expose low-level cause (e.g. UND_ERR_SOCKET, ECONNRESET, ETIMEDOUT) for diagnosing fetch failures
  const cause = (error as { cause?: unknown }).cause;
  const causeObj =
    cause && typeof cause === "object" ? (cause as Record<string, unknown>) : undefined;
  const causeCode = typeof causeObj?.code === "string" ? causeObj.code : undefined;
  const causeMsg = typeof causeObj?.message === "string" ? causeObj.message : undefined;
  const causeStr =
    causeCode || causeMsg ? ` (cause: ${[causeCode, causeMsg].filter(Boolean).join(": ")})` : "";
  return `[${code}]: ${message}${causeStr}`;
}
