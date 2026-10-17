import { CORS_HEADERS } from "./cors.ts";
import { unwrapClinepassEnvelope } from "./clinepassEnvelope.ts";
import { extractJsonErrorFields } from "./tencentEnvelope.ts";
import {
  redactSensitiveErrorText,
  sanitizeErrorMessage,
  sanitizeUpstreamDetails,
} from "./errorSanitization.ts";
import { getDefaultErrorMessage, getErrorInfo } from "../config/errorConfig.ts";
import { normalizePayloadForLog } from "@/lib/logPayloads";
import type { ModelCooldownErrorPayload } from "@/types";
import { buildPassthroughErrorResponse } from "./upstreamErrorPassthrough.ts";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { resolveRetryAfterInstant } from "./retryAfterInstant.ts";
import { parseAntigravityRetryTime, parseProseRetryDelayMs } from "./proseRetryDelay.ts";
import { parseDetailedRetryHintFromJsonBody } from "../services/retryAfterJson.ts";

import {
  isSafePublicErrorIdentifier,
  projectPublicErrorIdentifier,
} from "./publicErrorIdentifiers.ts";
export { projectPublicErrorIdentifier } from "./publicErrorIdentifiers.ts";

export { parseRetryAfterHeader, resolveRetryAfterInstant } from "./retryAfterInstant.ts";
export { parseAntigravityRetryTime, parseProseRetryDelayMs };

export { redactSensitiveErrorText, sanitizeErrorMessage, sanitizeUpstreamDetails };

/** Client-visible error shape; dynamic fields are projected through canonical boundaries. */
interface ErrorResponseBody {
  error: {
    message: string;
    type?: string;
    code?: string;
    reason?: string;
    /** Seconds until the caller may retry — only ever set for a resolved FUTURE instant. */
    retry_after?: number;
    /** ISO-8601 instant the underlying quota/limit resets — pairs with retry_after. */
    reset_at?: string;
  };
  upstream_details?: Record<string, unknown> | null; // sanitized upstream provider body
}

/** Optional caller classification; when set, wins over status-derived defaults. */
export type ErrorBodyClassification = {
  type?: string;
  code?: string;
  reason?: string;
  /** ISO / epoch-ms / Date the underlying quota/limit resets — see resolveRetryAfterInstant(). */
  retryAfter?: string | number | Date | null;
};

/**
 * Build OpenAI-compatible error response body. Message is always sanitized
 * so callers do not need to remember to strip stack traces themselves.
 * Optional third argument `upstreamDetails` (raw parsed provider body) is
 * sanitized by sanitizeUpstreamDetails before inclusion as `upstream_details`.
 * Optional fourth argument `classification` preserves an explicit type/code
 * instead of re-deriving both from the status-code table; a `retryAfter` on it
 * populates `retry_after`/`reset_at` when it resolves to a future instant.
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
  const retryAfterFields = resolveRetryAfterInstant(classification?.retryAfter);

  const body: ErrorResponseBody = {
    error: {
      message: safeMessage,
      type: projectPublicErrorIdentifier(classification?.type, errorInfo.type),
      code: projectPublicErrorIdentifier(classification?.code, errorInfo.code),
      reason: safeReason,
      ...retryAfterFields,
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
/** #12659: one skip reason's targets, surfaced on an ALL_TARGETS_SKIPPED body. */
export interface ComboSkippedTargetGroup {
  reason: string;
  targets: string[];
}
export interface ComboDiagnostics {
  poolSize: number;
  attempted: number;
  excluded: ComboExclusion[];
  attemptOrder: Array<{ provider: string; model: string }>;
  terminalReason: string;
  /** Optional next-step hint — populated when the dispatcher can recommend a recovery action. */
  recovery?: ComboRecoveryHint;
  /**
   * #12659: per-target skip reasons (e.g. `persisted_cooldown`) recorded on the
   * decision trace but not captured by `excluded` (which only sources from
   * exhaustedProviders/exhaustedConnections). Optional — populated only when
   * the caller has a decision trace to summarize.
   */
  skippedTargets?: ComboSkippedTargetGroup[];
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
  // Reject empty/whitespace-only next_step: it must render as a non-blank header + body hint.
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
  if (Array.isArray(d?.skippedTargets) && d.skippedTargets.length > 0) {
    out.skippedTargets = d.skippedTargets.slice(0, 32).map((g) => ({
      reason: clampDiagStr(g?.reason, 64),
      targets: (g?.targets ?? []).slice(0, 32).map((t) => clampDiagStr(t, 96)),
    }));
  }
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
  opts: { code?: string; type?: string; retryAfter?: ErrorBodyClassification["retryAfter"] } = {}
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
  if (typeof body.error.retry_after === "number") {
    headers["Retry-After"] = String(body.error.retry_after);
  }

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
  const body = buildErrorBody(statusCode, sanitizeErrorMessage(message), undefined, classification);
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (typeof body.error.retry_after === "number")
    headers["Retry-After"] = String(body.error.retry_after);
  return new Response(JSON.stringify(body), { status: statusCode, headers });
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

/**
 * #13672 — opt-in RETRY_AFTER_PROVENANCE_ENABLED (default off). Fails closed to
 * the legacy Retry-After contract when the flag store cannot be read.
 */
export function isRetryAfterProvenanceEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("RETRY_AFTER_PROVENANCE_ENABLED");
  } catch {
    return false;
  }
}

/**
 * Seconds until a concrete FUTURE retry time, or null when there is none: absent,
 * non-positive or invalid values, numeric strings, and dates that already elapsed.
 * Unlike normalizeRetryAfterSeconds it never invents a 1s wait; when it returns a
 * number, that number equals normalizeRetryAfterSeconds for the same input.
 */
export function resolveRetryAfterHintSeconds(
  retryAfter?: string | number | Date | null
): number | null {
  if (typeof retryAfter === "number") {
    if (!Number.isFinite(retryAfter) || retryAfter <= 0) return null;
    if (retryAfter < 1_000_000_000) return Math.max(Math.ceil(retryAfter), 1);
  } else if (typeof retryAfter === "string") {
    if (retryAfter.trim() === "" || !Number.isNaN(Number(retryAfter))) return null;
  } else if (!(retryAfter instanceof Date)) {
    return null;
  }
  const now = Date.now();
  const retryTimeMs = new Date(retryAfter).getTime();
  if (!Number.isFinite(retryTimeMs) || retryTimeMs <= now) return null;
  return Math.max(Math.ceil((retryTimeMs - now) / 1000), 1);
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
 * Combo drain paths: ISO retry time read from the prose of an upstream error body,
 * JSON or plain text. Null when RETRY_AFTER_PROVENANCE_ENABLED is off (legacy:
 * only structured retry fields are read) or when the text carries no hint.
 */
export function readProseRetryAfter(text: unknown): string | null {
  if (!isRetryAfterProvenanceEnabled()) return null;
  const ms = parseProseRetryDelayMs(text);
  return ms ? new Date(Date.now() + ms).toISOString() : null;
}

/**
 * Combo drain paths: the upstream error body could not be read for a retry hint.
 * A non-JSON body (an HTML 502 page, plain text) is ordinary, so it logs at debug;
 * a failed clone means the body was already consumed and logs at warn.
 */
export function logRetryHintUnreadable(
  log: { warn: (...args: unknown[]) => void; debug?: (...args: unknown[]) => void },
  tag: string,
  model: string,
  status: number | undefined,
  reason: "unparseable body" | "clone failed"
): void {
  const message = `Retry hint unreadable for ${model} (${reason})`;
  if (reason === "clone failed") log.warn(tag, message, { status });
  else log.debug?.(tag, message, { status });
}

/**
 * Parse upstream provider error response
 * @param {Response} response - Fetch response from provider
 * @param {string} provider - Provider name (for Antigravity-specific parsing)
 * @returns {Promise<{statusCode: number, message: string, retryAfterMs: number|null, responseBody: unknown}>}
 */
export async function parseUpstreamError(response: Response, provider: string | null = null) {
  // Cap maximum retry time at 24 hours to prevent infinite wait
  const MAX_RETRY_MS = 24 * 60 * 60 * 1000;
  let message = "";
  let retryAfterMs: number | null = null;
  let responseBody: unknown = null;
  let errorCode: unknown = undefined;
  let errorType: unknown = undefined;
  let rawText = "";

  try {
    const text = await response.text();
    rawText = text;
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
      const extracted = extractJsonErrorFields(json, clinepassEnvError?.message);
      message =
        typeof extracted.message === "string"
          ? extracted.message
          : `Upstream error: ${response.status}`;
      errorCode = extracted.errorCode;
      errorType = extracted.errorType;
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

  // #16442: a structured google.rpc.RetryInfo detail (`error.details[].retryDelay`)
  // with NO prose hint in the message and NO Retry-After header is still an
  // authoritative upstream window — Gemini 429s carry the delay only there. Read
  // it from the raw body before the prose heuristics, mirroring the structured-
  // first order detectRetryHint() uses on the classification side. Returns null
  // for non-JSON bodies, so this is a no-op on every existing path.
  if (response.status === 429 && !retryAfterMs) {
    const structuredHint = parseDetailedRetryHintFromJsonBody(rawText, MAX_RETRY_MS);
    if (structuredHint) {
      retryAfterMs = structuredHint.retryAfterMs;
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
 * Headers for a createErrorResult response. #16442: a parsed upstream retry hint
 * must ride the REBUILT response, not only the `result.retryAfterMs` field —
 * the fallback engine (chat.ts → markAccountUnavailable → checkFallbackError →
 * detectRetryHint) reads `result.response.headers`, so dropping the header
 * dropped the hint and every Gemini 429 with a details-only google.rpc.RetryInfo
 * locked the model for the 3s base cooldown instead of the real upstream window.
 * Standard seconds form; the passthrough branch below already does the same.
 */
function buildErrorResultHeaders(retryAfterMs: number | null | undefined): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (retryAfterMs && Number.isFinite(retryAfterMs) && retryAfterMs > 0) {
    headers["Retry-After"] = String(Math.ceil(retryAfterMs / 1000));
  }
  return headers;
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
      headers: buildErrorResultHeaders(retryAfterMs),
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
  // #13672 (opt-in): only a concrete future retry time earns a Retry-After header, and the
  // body says whether one existed. Off: legacy header, always present and clamped to >= 1s.
  const provenance = isRetryAfterProvenanceEnabled();
  const retryAfterSec = provenance
    ? resolveRetryAfterHintSeconds(retryAfter)
    : normalizeRetryAfterSeconds(retryAfter);
  const safeMessage = sanitizeErrorMessage(message) || getDefaultErrorMessage(statusCode);
  const safeRetryAfterHuman = retryAfterHuman ? sanitizeErrorMessage(retryAfterHuman) : "";
  const msg = safeRetryAfterHuman ? `${safeMessage} (${safeRetryAfterHuman})` : safeMessage;
  // Preserve unavailableResponse's established bare envelope; adding the generic
  // type/code from buildErrorBody would be an unrelated API-shape change. Only a
  // concrete future hint adds the two structured timing fields.
  const retryFields = resolveRetryAfterInstant(retryAfter);
  const error: {
    message: string;
    retry_after?: number;
    reset_at?: string;
    retry_after_provenance?: "none" | "signal";
  } = { message: msg, ...retryFields };
  if (provenance) error.retry_after_provenance = retryAfterSec === null ? "none" : "signal";
  const effectiveRetryAfterSec = retryFields?.retry_after ?? retryAfterSec;
  return new Response(JSON.stringify({ error }), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
      ...(effectiveRetryAfterSec === null ? {} : { "Retry-After": String(effectiveRetryAfterSec) }),
    },
  });
}

export function providerCircuitOpenResponse(
  provider: string,
  retryAfter?: string | number | Date | null,
  failureKind?: string | null
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
        ...(failureKind ? { failure_kind: failureKind } : {}), // #14960 quota vs rate_limit
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
  const body = buildModelCooldownBody({
    model,
    retryAfterSec,
    retryAfterAt: resolvedRetryAfterAt,
    credentialsCoolingCount,
  });
  return new Response(JSON.stringify(body), {
    status: 429,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": String(retryAfterSec),
      "X-OmniRoute-Local-Cooldown": "model", // = LOCAL_MODEL_COOLDOWN_HEADER (#1731 vs #14190)
    },
  });
}

/**
 * Build an executor-style error result (response + url + headers + transformedBody).
 * Shared by web-cookie executors that return the `{ response, url, headers, transformedBody }` shape.
 */
export function makeExecutorErrorResult(
  status: number,
  message: string,
  body: unknown,
  url: string,
  extraResponseHeaders?: Record<string, string>
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
      {
        status,
        headers: { "Content-Type": "application/json", ...extraResponseHeaders },
      }
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
