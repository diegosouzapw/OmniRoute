// Pure-ish per-attempt request/result helpers for the Antigravity executor (#7408
// complexity-gate decomposition): building + sending one upstream request, and
// building the final non-streaming/streaming result. No host state of their own —
// callers inject `provider` and `onCreditsUpdate` so this module doesn't need to
// import the executor's credit-balance cache. Extracted from antigravity.ts
// (file-size cap), mirroring the existing antigravity/streamingPassthrough.ts and
// antigravity/sseCollect.ts submodule pattern.
import { mergeAbortSignals, type ExecutorLog } from "../base.ts";
import { applyFingerprint, isCliCompatEnabled } from "../../config/cliFingerprints.ts";
import { buildAntigravityUpstreamError } from "../antigravityUpstreamError.ts";
import {
  HTTP_STATUS,
  STREAM_READINESS_TIMEOUT_MS,
  ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE,
} from "../../config/constants.ts";
import { injectCreditsField, handleCreditsFailure } from "../../services/antigravityCredits.ts";
import { sanitizeAntigravityToolPayload } from "../../config/toolCloaking.ts";
import {
  applyAntigravityClientProfileHeaders,
  removeHeaderCaseInsensitive,
} from "../../services/antigravityClientProfile.ts";
import * as prl from "../../utils/providerRequestLogging.ts";
import {
  createCreditsExtractionTransform as createCreditsExtractionTransformImpl,
  buildSsePassthroughResult,
  type SsePassthroughResult,
} from "./streamingPassthrough.ts";
import type { AntigravityCredentials } from "../antigravity.ts";

const LONG_RETRY_THRESHOLD_MS = 60_000;
const CREDITS_EXHAUSTED_TTL_MS = 5 * 60 * 60 * 1000; // 5 hours

/** Invoked with a fresh GOOGLE_ONE_AI credit balance to persist in the caller's cache. */
export type OnAntigravityCreditsUpdate = (accountId: string, balance: number) => void;

/**
 * Per-account GOOGLE_ONE_AI credits-exhausted tracker.
 * Key: accountId (OAuth subject / email). Value: expiry timestamp.
 * When credits hit 0 we skip the credit retry for CREDITS_EXHAUSTED_TTL_MS.
 * Lives here (not antigravity.ts) so both this module's tryCreditsRetry and
 * antigravity.ts's tryResolveRetryFromErrorBody can share it via a single import
 * direction (antigravity.ts -> executeAttempt.ts), avoiding a circular import.
 */
const MAX_CREDITS_EXHAUSTED_ENTRIES = 50;
const creditsExhaustedUntil = new Map<string, number>();

const _creditsExhaustedSweep = setInterval(() => {
  const now = Date.now();
  for (const [key, until] of creditsExhaustedUntil) {
    if (now >= until) creditsExhaustedUntil.delete(key);
  }
}, 60_000);
if (typeof _creditsExhaustedSweep === "object" && "unref" in _creditsExhaustedSweep) {
  (_creditsExhaustedSweep as { unref?: () => void }).unref?.();
}

/** True while `accountId`'s Google One AI credits are marked exhausted. @internal */
export function isCreditsExhausted(accountId: string): boolean {
  const until = creditsExhaustedUntil.get(accountId);
  if (!until) return false;
  if (Date.now() >= until) {
    creditsExhaustedUntil.delete(accountId);
    return false;
  }
  return true;
}

/** Mark an account's Google One AI credits as exhausted for CREDITS_EXHAUSTED_TTL_MS. */
export function markCreditsExhausted(accountId: string): void {
  if (
    creditsExhaustedUntil.size >= MAX_CREDITS_EXHAUSTED_ENTRIES &&
    !creditsExhaustedUntil.has(accountId)
  ) {
    const now = Date.now();
    for (const [key, until] of creditsExhaustedUntil) {
      if (now >= until) {
        creditsExhaustedUntil.delete(key);
      }
    }
    if (creditsExhaustedUntil.size >= MAX_CREDITS_EXHAUSTED_ENTRIES) {
      const oldestKey = creditsExhaustedUntil.keys().next().value;
      if (oldestKey !== undefined) creditsExhaustedUntil.delete(oldestKey);
    }
  }
  creditsExhaustedUntil.set(accountId, Date.now() + CREDITS_EXHAUSTED_TTL_MS);
}

class AntigravityPreResponseTimeoutError extends Error {
  code = ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE;
  status = HTTP_STATUS.GATEWAY_TIMEOUT;

  constructor(timeoutMs: number, url: string) {
    super(`Antigravity upstream did not return response headers within ${timeoutMs}ms: ${url}`);
    this.name = "TimeoutError";
  }
}

function getAbortErrorCode(error: unknown): string | null {
  if (!error || typeof error !== "object") return null;
  const value = (error as { code?: unknown }).code;
  return typeof value === "string" ? value : null;
}

function isAntigravityPreResponseTimeout(error: unknown): boolean {
  return getAbortErrorCode(error) === ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE;
}

export function isAbortError(error: unknown): boolean {
  return (
    (error instanceof DOMException && error.name === "AbortError") ||
    (error instanceof Error && error.name === "AbortError")
  );
}

/**
 * `fetch()` wrapper that aborts if the upstream never returns response headers
 * within `timeoutMs` (default STREAM_READINESS_TIMEOUT_MS) — distinct from the
 * overall FETCH_TIMEOUT_MS, which bounds the whole request including body streaming.
 * Shared by every fetch attempt in executeOnce() (initial, 403-retry, credits-retry).
 */
export async function fetchAntigravityWithReadinessTimeout(
  url: string,
  init: RequestInit,
  timeoutMs = STREAM_READINESS_TIMEOUT_MS
): Promise<Response> {
  const boundedTimeoutMs = Math.max(0, Math.floor(timeoutMs));
  if (boundedTimeoutMs <= 0) {
    return fetch(url, init);
  }

  const timeoutController = new AbortController();
  let timeoutId: ReturnType<typeof setTimeout> | null = setTimeout(() => {
    timeoutController.abort(new AntigravityPreResponseTimeoutError(boundedTimeoutMs, url));
  }, boundedTimeoutMs);

  const existingSignal = init.signal instanceof AbortSignal ? init.signal : null;
  const combinedSignal = existingSignal
    ? mergeAbortSignals(existingSignal, timeoutController.signal)
    : timeoutController.signal;

  try {
    return await fetch(url, { ...init, signal: combinedSignal });
  } catch (error) {
    if (
      timeoutController.signal.aborted &&
      isAntigravityPreResponseTimeout(timeoutController.signal.reason)
    ) {
      throw timeoutController.signal.reason;
    }
    throw error;
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }
}

/** ExecutorLog with every method always callable — see toSafeAntigravityLog(). */
export type SafeAntigravityLog = Required<ExecutorLog>;

function noopLogFn(): void {}

/**
 * Normalize a possibly-null/undefined ExecutorLog into an object with all four
 * methods always callable, so the request/retry helpers below can call
 * `l.debug(...)` directly instead of repeating `log?.debug?.(...)` at every call
 * site. This isn't just style: the complexity linter (eslint `complexity` rule)
 * weighs each `?.` link in a chain as its own branch — a doubly-chained
 * `log?.debug?.(...)` costs +2 — so a logging-heavy helper can rack up a large
 * complexity score with zero real decision points. Resolving once here keeps
 * the actual branch count legible in the functions that matter.
 */
export function toSafeAntigravityLog(log: ExecutorLog | null | undefined): SafeAntigravityLog {
  return {
    debug: log?.debug ? log.debug.bind(log) : noopLogFn,
    info: log?.info ? log.info.bind(log) : noopLogFn,
    warn: log?.warn ? log.warn.bind(log) : noopLogFn,
    error: log?.error ? log.error.bind(log) : noopLogFn,
  };
}

/** Flatten a 429/503 error JSON body (message + `error.details[].reason`) into one string. */
export function buildAntigravity429ErrorMessage(errorJson: unknown): string {
  const obj = errorJson as
    { error?: { message?: unknown; details?: unknown }; message?: unknown } | null | undefined;
  let errorMessage = String(obj?.error?.message || obj?.message || "");
  const details = obj?.error?.details;
  if (Array.isArray(details)) {
    for (const detail of details) {
      const reason = (detail as { reason?: unknown } | null)?.reason;
      if (reason) errorMessage += ` ${reason}`;
    }
  }
  return errorMessage;
}

function getChunkedOrFixedBody(bodyStr: string, stream: boolean): BodyInit {
  if (stream) {
    return new ReadableStream(
      {
        async start(controller) {
          controller.enqueue(new TextEncoder().encode(bodyStr));
          controller.close();
        },
      },
      { highWaterMark: 16384 }
    );
  }
  return bodyStr;
}

function cloneAntigravityRequestBody(body: unknown): unknown {
  if (!body || typeof body !== "object") {
    return body;
  }

  let clone: unknown;
  try {
    clone = structuredClone(body);
  } catch {
    clone = JSON.parse(JSON.stringify(body));
  }

  if (clone && typeof clone === "object") {
    delete (clone as Record<string, unknown>)._toolNameMap;
  }
  return clone;
}

function getToolNameMap(body: Record<string, unknown>): Map<string, string> | null {
  return body._toolNameMap instanceof Map ? body._toolNameMap : null;
}

function attachToolNameMap(
  body: Record<string, unknown>,
  toolNameMap: Map<string, string> | null
): Record<string, unknown> {
  if (toolNameMap) {
    Object.defineProperty(body, "_toolNameMap", {
      value: toolNameMap,
      configurable: true,
      enumerable: false,
      writable: true,
    });
  }
  return body;
}

function serializeAntigravityRequest(
  provider: string,
  headers: Record<string, string>,
  body: unknown
): { headers: Record<string, string>; bodyString: string } {
  const serializedBody = cloneAntigravityRequestBody(body);

  if (!isCliCompatEnabled(provider)) {
    return { headers, bodyString: JSON.stringify(serializedBody) };
  }
  return applyFingerprint(provider, { ...headers }, serializedBody);
}

function getRequestTargetModel(body: Record<string, unknown>): string {
  const target = body.model;
  return typeof target === "string" && target.length > 0 ? target : "unknown";
}

/** Sanitize unsupported schema metadata, then apply credits-first injection for one attempt. */
export function finalizeAntigravityRequestBody(
  transformed: Record<string, unknown>,
  useCreditsFirst: boolean,
  log: SafeAntigravityLog
): Record<string, unknown> {
  const toolNameMap = getToolNameMap(transformed);
  let transformedBody = attachToolNameMap(sanitizeAntigravityToolPayload(transformed), toolNameMap);

  // Credits-first: inject GOOGLE_ONE_AI upfront so we never try the normal
  // quota path. If credits are exhausted / disabled shouldUseCreditsFirst()
  // returns false and we fall back to the legacy retry-on-429 flow.
  if (useCreditsFirst) {
    transformedBody = attachToolNameMap(injectCreditsField(transformedBody), toolNameMap);
    log.debug("AG_CREDITS", "Credits-first enabled (ANTIGRAVITY_CREDITS=always)");
  }

  return transformedBody;
}

/** Debug-only dump of outgoing headers (mask Authorization) and envelope shape. */
function dumpAntigravityRequestDebug(
  finalHeaders: Record<string, string>,
  transformedBody: Record<string, unknown>,
  clientProfile: unknown,
  log: SafeAntigravityLog
): void {
  const safeHeaders = { ...finalHeaders };
  if (safeHeaders["Authorization"]) safeHeaders["Authorization"] = "Bearer ***";
  log.debug("AG_REQUEST_HEADERS", JSON.stringify(safeHeaders));

  const envelope = transformedBody as Record<string, unknown>;
  const requestInner = envelope.request as Record<string, unknown> | undefined;
  log.debug(
    "AG_REQUEST_ENVELOPE",
    JSON.stringify({
      fieldOrder: Object.keys(envelope),
      project: envelope.project,
      requestId: envelope.requestId,
      model: envelope.model,
      userAgent: envelope.userAgent,
      requestType: envelope.requestType,
      enabledCreditTypes: envelope.enabledCreditTypes,
      clientProfile,
      sessionId: requestInner?.sessionId,
      generationConfig: requestInner?.generationConfig,
    })
  );
}

/**
 * Send one Antigravity request attempt: serialize + apply the client-profile
 * fingerprint, debug-dump the outgoing envelope, fetch with a readiness timeout,
 * and transparently retry once without `x-goog-user-project` on a 403 (some
 * projects reject that header). Returns the (possibly 403-retried) response
 * plus the headers actually used for it.
 */
export async function sendAntigravityRequest(
  provider: string,
  url: string,
  model: string,
  headers: Record<string, string>,
  transformedBody: Record<string, unknown>,
  credentials: AntigravityCredentials,
  stream: boolean,
  signal: AbortSignal | null | undefined,
  log: SafeAntigravityLog,
  retryAttempt: number
): Promise<{ response: Response; finalHeaders: Record<string, string> }> {
  const serializedRequest = serializeAntigravityRequest(provider, headers, transformedBody);
  let finalHeaders = serializedRequest.headers;
  const clientProfile = applyAntigravityClientProfileHeaders(
    finalHeaders,
    credentials,
    transformedBody
  );

  log.debug(
    "TELEMETRY",
    `[Antigravity] Execute - URL: ${url}, Model: ${model}, Target: ${getRequestTargetModel(transformedBody)}, RetryAttempt: ${retryAttempt}`
  );

  // Dump outgoing headers (mask Authorization) and envelope shape for debugging.
  // Gated behind an explicit typeof check (not just calling log.debug() unconditionally)
  // so the JSON.stringify work below is skipped entirely when debug logging is off.
  if (typeof log.debug === "function") {
    dumpAntigravityRequestDebug(finalHeaders, transformedBody, clientProfile, log);
  }

  await prl.captureCurrentProviderBody(url, finalHeaders, serializedRequest.bodyString, log);
  let response = await fetchAntigravityWithReadinessTimeout(url, {
    method: "POST",
    headers: finalHeaders,
    body: getChunkedOrFixedBody(serializedRequest.bodyString, stream),
    ...(stream ? { duplex: "half" } : {}),
    signal,
  });

  if (response.status === HTTP_STATUS.FORBIDDEN && finalHeaders["x-goog-user-project"]) {
    const retryHeaders = { ...finalHeaders };
    removeHeaderCaseInsensitive(retryHeaders, "x-goog-user-project");
    log.debug("RETRY", "403 with x-goog-user-project, retrying once without it");
    await prl.captureCurrentProviderBody(url, retryHeaders, serializedRequest.bodyString, log);
    response = await fetchAntigravityWithReadinessTimeout(url, {
      method: "POST",
      headers: retryHeaders,
      body: getChunkedOrFixedBody(serializedRequest.bodyString, stream),
      ...(stream ? { duplex: "half" } : {}),
      signal,
    });
    finalHeaders = retryHeaders;
  }

  if (!response.ok) {
    log.warn(
      "TELEMETRY",
      `[Antigravity] Error Response - URL: ${url}, Status: ${response.status}, Model: ${model}`
    );
  }

  return { response, finalHeaders };
}

/**
 * Retry the SAME url with `enabledCreditTypes: ["GOOGLE_ONE_AI"]` injected, for a
 * quota_exhausted 429 that hasn't already tried credits. Returns the result to hand
 * back to the caller of execute() on success (or a non-429 status), or null if the
 * credits retry also failed/429'd (caller falls through to the normal retry logic).
 */
export async function tryCreditsRetry(
  provider: string,
  url: string,
  headers: Record<string, string>,
  transformedBody: Record<string, unknown>,
  credentials: AntigravityCredentials,
  stream: boolean,
  signal: AbortSignal | null | undefined,
  log: SafeAntigravityLog,
  accountId: string,
  onCreditsUpdate: OnAntigravityCreditsUpdate
): Promise<SsePassthroughResult | null> {
  log.info("AG_CREDITS", "Retrying with Google One AI credits");
  const creditsBody = attachToolNameMap(
    injectCreditsField(transformedBody),
    getToolNameMap(transformedBody)
  );
  const serializedCreditsRequest = serializeAntigravityRequest(provider, headers, creditsBody);
  const finalCreditsHeaders = serializedCreditsRequest.headers;
  applyAntigravityClientProfileHeaders(finalCreditsHeaders, credentials, creditsBody);
  try {
    await prl.captureCurrentProviderBody(
      url,
      finalCreditsHeaders,
      serializedCreditsRequest.bodyString,
      log
    );
    const creditsResp = await fetchAntigravityWithReadinessTimeout(url, {
      method: "POST",
      headers: finalCreditsHeaders,
      body: getChunkedOrFixedBody(serializedCreditsRequest.bodyString, stream),
      ...(stream ? { duplex: "half" } : {}),
      signal,
    });
    if (creditsResp.ok || creditsResp.status !== HTTP_STATUS.RATE_LIMITED) {
      log.info("AG_CREDITS", `Credits retry succeeded: ${creditsResp.status}`);
      if (!stream && creditsResp.body) {
        // Raw SSE pass-through + credits extraction (see
        // streamingPassthrough.ts); 499s early if the client
        // already disconnected instead of piping a cancelled body.
        return buildSsePassthroughResult(
          creditsResp.body,
          creditsResp,
          accountId,
          onCreditsUpdate,
          url,
          finalCreditsHeaders,
          creditsBody,
          signal
        );
      }
      return {
        response: creditsResp,
        url,
        headers: finalCreditsHeaders,
        transformedBody: creditsBody,
      };
    }

    // Credit retry also 429'd
    handleCreditsFailure(credentials?.accessToken || "");
    log.warn("AG_CREDITS", "Credits retry also 429'd");

    // Also mark in our legacy exhaustion map to avoid retrying other routes
    markCreditsExhausted(accountId);
    return null;
  } catch (creditsErr) {
    if (signal?.aborted || isAbortError(creditsErr)) {
      throw signal?.reason ?? creditsErr;
    }
    handleCreditsFailure(credentials?.accessToken || "");
    log.warn("AG_CREDITS", `Credits retry failed: ${creditsErr}`);
    return null;
  }
}

/**
 * If we have a 429 with a long retry time (> LONG_RETRY_THRESHOLD_MS), embed
 * `retryAfterMs` in the response body so the caller (combo/account-fallback
 * layer) can read it back out. Returns null (fall back to the original
 * response handling) when the status/retryMs don't qualify, or on error.
 */
export async function tryEmbedLongRetryAfter(
  response: Response,
  retryMs: number | null,
  url: string,
  finalHeaders: Record<string, string>,
  transformedBody: Record<string, unknown>,
  log: ExecutorLog | null | undefined
): Promise<SsePassthroughResult | null> {
  if (
    response.status !== HTTP_STATUS.RATE_LIMITED ||
    !retryMs ||
    retryMs <= LONG_RETRY_THRESHOLD_MS
  ) {
    return null;
  }
  try {
    const respBody = await response.clone().text();
    let obj;
    try {
      obj = JSON.parse(respBody);
    } catch {
      obj = {};
    }
    obj.retryAfterMs = retryMs;
    const modifiedBody = JSON.stringify(obj);
    const modifiedResponse = new Response(modifiedBody, {
      status: response.status,
      headers: response.headers,
    });
    return {
      response: modifiedResponse,
      url,
      headers: finalHeaders,
      transformedBody,
    };
  } catch (err) {
    log?.warn?.("RETRY", `Failed to embed retryAfterMs: ${err}`);
    return null;
  }
}

/** Build the sanitized JSON error result shared by the non-streaming and streaming paths. */
async function buildUpstreamErrorResult(
  response: Response,
  url: string,
  finalHeaders: Record<string, string>,
  transformedBody: Record<string, unknown>
): Promise<SsePassthroughResult> {
  const rawBody = await response
    .clone()
    .text()
    .catch(() => "");
  const errorBody = buildAntigravityUpstreamError(response.status, response.statusText, rawBody);
  return {
    response: new Response(JSON.stringify(errorBody), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    }),
    url,
    headers: finalHeaders,
    transformedBody,
  };
}

/**
 * For non-streaming clients, return the raw SSE stream with a
 * credits-extraction TransformStream.  chatCore's non-streaming path
 * (readNonStreamingResponseBody + parseNonStreamingSSEPayload with
 * Gemini format support) handles draining and conversion to JSON.
 * This replaces the previous collectStreamToResponse() approach which
 * had an artificial timeout (now the standard FETCH_BODY_TIMEOUT_MS
 * of 10 min applies).
 */
async function buildNonStreamingExecuteOnceResult(
  response: Response,
  url: string,
  finalHeaders: Record<string, string>,
  transformedBody: Record<string, unknown>,
  accountId: string,
  signal: AbortSignal | null | undefined,
  onCreditsUpdate: OnAntigravityCreditsUpdate
): Promise<SsePassthroughResult> {
  // #3229: surface a real upstream error instead of masking a 4xx/5xx as an
  // empty `chat.completion` envelope.
  if (!response.ok) {
    return buildUpstreamErrorResult(response, url, finalHeaders, transformedBody);
  }

  if (response.body) {
    // Raw SSE pass-through + credits extraction (see
    // streamingPassthrough.ts); 499s early if the client already
    // disconnected instead of piping a cancelled body.
    return buildSsePassthroughResult(
      response.body,
      response,
      accountId,
      onCreditsUpdate,
      url,
      finalHeaders,
      transformedBody,
      signal
    );
  }

  // No body -- return as-is
  return {
    response,
    url,
    headers: finalHeaders,
    transformedBody,
  };
}

/**
 * Streaming path: wrap the response body in a pass-through TransformStream
 * that extracts remainingCredits from the final SSE chunk(s) without
 * consuming the stream. The client receives the unmodified SSE data.
 *
 * #2461: a non-ok upstream response (e.g. 403) must never be piped through the
 * streaming pass-through below as if it were an SSE body. Google occasionally
 * returns non-UTF8/binary error bodies (observed: gzip-magic-byte payloads) for
 * 403s on this endpoint; reading/forwarding those raw bytes corrupts the
 * client-visible error message. Mirror the non-streaming branch above and build
 * a sanitized JSON error via buildAntigravityUpstreamError (hard rule #12)
 * instead of streaming unknown bytes straight through.
 */
async function buildStreamingExecuteOnceResult(
  response: Response,
  url: string,
  finalHeaders: Record<string, string>,
  transformedBody: Record<string, unknown>,
  accountId: string,
  signal: AbortSignal | null | undefined,
  onCreditsUpdate: OnAntigravityCreditsUpdate
): Promise<SsePassthroughResult> {
  if (!response.ok) {
    return buildUpstreamErrorResult(response, url, finalHeaders, transformedBody);
  }

  if (response.body) {
    // If the downstream client aborts, cancel the upstream fetch body immediately
    // to release the socket back to the Undici agent pool and prevent memory leaks.
    if (signal) {
      const abortHandler = () => {
        try {
          response.body?.cancel().catch(() => {});
        } catch (_) {}
      };
      if (signal.aborted) {
        abortHandler();
      } else {
        signal.addEventListener("abort", abortHandler, { once: true });
      }
    }

    const passThrough = createCreditsExtractionTransformImpl(
      accountId,
      onCreditsUpdate,
      16 * 1024 // 16KB sliding-window cap to prevent OOM
    );
    const tappedBody = response.body.pipeThrough(passThrough);
    const tappedResponse = new Response(tappedBody, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    return {
      response: tappedResponse,
      url,
      headers: finalHeaders,
      transformedBody,
    };
  }

  return {
    response,
    url,
    headers: finalHeaders,
    transformedBody,
  };
}

/** Dispatch to the non-streaming or streaming final-result builder. */
export async function buildFinalAntigravityResult(
  stream: boolean,
  response: Response,
  url: string,
  finalHeaders: Record<string, string>,
  transformedBody: Record<string, unknown>,
  accountId: string,
  signal: AbortSignal | null | undefined,
  onCreditsUpdate: OnAntigravityCreditsUpdate
): Promise<SsePassthroughResult> {
  if (!stream) {
    return buildNonStreamingExecuteOnceResult(
      response,
      url,
      finalHeaders,
      transformedBody,
      accountId,
      signal,
      onCreditsUpdate
    );
  }
  return buildStreamingExecuteOnceResult(
    response,
    url,
    finalHeaders,
    transformedBody,
    accountId,
    signal,
    onCreditsUpdate
  );
}
