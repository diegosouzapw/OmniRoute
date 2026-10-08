/**
 * Stream-recovery primitives — opt-in transparent retry of truncated upstream streams.
 *
 * Ported from free-claude-code's always-on recovery (`core/anthropic/stream_recovery.py`).
 * OmniRoute keeps the holdback OFF by default (see ResilienceSettings.streamRecovery)
 * because holding the opening SSE window adds up to STREAM_RECOVERY.HOLDBACK_MS of
 * time-to-first-token latency on every streaming request. When enabled, an upstream
 * truncation that happens *before* any byte reaches the client is retried invisibly.
 *
 * This module is pure/deterministic (clock injectable) so it is fully unit-testable
 * without real sockets. The ReadableStream wiring lives in `createRecoverableStream`.
 */
import { STREAM_RECOVERY } from "../config/constants.ts";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import {
  createThroughputWatchdog,
  ThroughputWatchdogError,
  type ThroughputWatchdogOptions,
} from "./throughputWatchdog.ts";

export { ThroughputWatchdogError } from "./throughputWatchdog.ts";

const TOOLCALL_ORDER_FIX_FLAG = "STREAM_RECOVERY_TOOLCALL_ORDER_FIX";

/**
 * Read the opt-in tool-call-safe continuation flag. Fail-closed: any resolution failure
 * (DB not ready, unknown key) keeps the release behavior.
 */
function isToolcallOrderFixEnabled(): boolean {
  try {
    return isFeatureFlagEnabled(TOOLCALL_ORDER_FIX_FLAG);
  } catch {
    return false;
  }
}

/** Raised internally when an upstream stream ends without a terminal SSE marker. */
export class TruncatedStreamError extends Error {
  constructor(message = "Provider stream ended without a terminal marker") {
    super(message);
    this.name = "TruncatedStreamError";
  }
}

export interface HoldbackBufferOptions {
  /** Hold window in ms before auto-committing (default STREAM_RECOVERY.HOLDBACK_MS). */
  holdbackMs?: number;
  /** Byte cap before auto-committing (default STREAM_RECOVERY.BUFFER_MAX_BYTES). */
  maxBytes?: number;
  /** Injectable monotonic clock (ms) for deterministic tests. */
  now?: () => number;
}

/**
 * Briefly holds the opening chunks of an SSE stream so an early cutoff can be
 * retried invisibly. Once committed (holdback window elapsed OR byte cap reached
 * OR `flush()` called), bytes flow downstream and a transparent retry is no longer
 * possible — exactly mirroring free-claude-code's RecoveryHoldbackBuffer semantics.
 */
export class HoldbackBuffer {
  private chunks: Uint8Array[] = [];
  private bytes = 0;
  private startedAt: number | null = null;
  private readonly holdbackMs: number;
  private readonly maxBytes: number;
  private readonly now: () => number;
  committed = false;

  constructor(options: HoldbackBufferOptions = {}) {
    this.holdbackMs = options.holdbackMs ?? STREAM_RECOVERY.HOLDBACK_MS;
    this.maxBytes = options.maxBytes ?? STREAM_RECOVERY.BUFFER_MAX_BYTES;
    this.now = options.now ?? (() => Date.now());
  }

  /**
   * Buffer `chunk` until the holdback window elapses or the byte cap is reached.
   * Returns the chunks to emit downstream now: `[]` while still holding, or every
   * buffered chunk (the just-pushed one included) at the moment of commit. After
   * commit, chunks pass straight through.
   */
  push(chunk: Uint8Array): Uint8Array[] {
    if (this.committed) return [chunk];
    if (this.startedAt === null) this.startedAt = this.now();
    this.chunks.push(chunk);
    this.bytes += chunk.byteLength;
    if (this.bytes >= this.maxBytes || this.now() - this.startedAt >= this.holdbackMs) {
      return this.flush();
    }
    return [];
  }

  /** Commit and return everything held so far. */
  flush(): Uint8Array[] {
    if (this.committed) return [];
    this.committed = true;
    const out = this.chunks;
    this.chunks = [];
    this.bytes = 0;
    this.startedAt = null;
    return out;
  }

  /** Drop held chunks WITHOUT committing — used before a transparent retry. */
  discard(): void {
    this.chunks = [];
    this.bytes = 0;
    this.startedAt = null;
  }

  get hasBuffered(): boolean {
    return this.chunks.length > 0;
  }

  /** Concatenated view of the currently-held (uncommitted) chunks, for inspection. */
  peekBuffered(): Uint8Array {
    if (this.chunks.length === 0) return new Uint8Array(0);
    if (this.chunks.length === 1) return this.chunks[0];
    const out = new Uint8Array(this.bytes);
    let offset = 0;
    for (const chunk of this.chunks) {
      out.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return out;
  }
}

const RETRYABLE_TRANSPORT_CODES = new Set([
  "ECONNRESET",
  "ECONNREFUSED",
  "ETIMEDOUT",
  "EPIPE",
  "ENOTFOUND",
  "ENETUNREACH",
  "EHOSTUNREACH",
]);

const RETRYABLE_ERROR_NAMES = new Set(["TimeoutError", "BodyTimeoutError"]);

/**
 * Whether a stream-read error can be retried transparently. Conservative by design:
 * a client cancellation (AbortError) must NEVER be retried, and only obvious
 * transport-level failures (socket resets, undici `terminated`, body timeouts) or an
 * explicit TruncatedStreamError qualify. HTTP-status errors are handled upstream by
 * the executor retry/failover loop, not here.
 */
export function isRetryableStreamError(error: unknown): boolean {
  if (error instanceof TruncatedStreamError || error instanceof ThroughputWatchdogError) {
    return true;
  }
  if (!error || typeof error !== "object") return false;

  const name = (error as { name?: unknown }).name;
  // Client/abort cancellations are intentional — recovering them would replay a
  // request the caller already walked away from.
  if (name === "AbortError" || name === "ResponseAborted") return false;
  if (typeof name === "string" && RETRYABLE_ERROR_NAMES.has(name)) return true;

  const code = (error as { code?: unknown }).code;
  if (typeof code === "string") {
    if (RETRYABLE_TRANSPORT_CODES.has(code)) return true;
    if (code.startsWith("UND_ERR_")) return true; // undici transport family
  }

  const message = (error as { message?: unknown }).message;
  if (typeof message === "string" && /terminated|socket hang up|econnreset/i.test(message)) {
    return true;
  }

  return false;
}

// Terminal SSE markers OmniRoute emits across formats: OpenAI `data: [DONE]`,
// Anthropic `event: message_stop`. Presence means the stream ended cleanly.
const OPENAI_DONE_MARKER = "[DONE]";
const ANTHROPIC_STOP_MARKER = "message_stop";
// A complete Responses-API turn ends with `response.completed`, never `[DONE]` —
// without this the holdback mistakes a short complete Responses stream for a
// truncation and replays it. `failed`/`incomplete` end the turn the same way:
// they are never resumed or retried, only flushed as-is.
const RESPONSES_COMPLETED_MARKER = "response.completed";
const RESPONSES_FAILED_MARKER = "response.failed";
const RESPONSES_INCOMPLETE_MARKER = "response.incomplete";

/**
 * Heuristic check for a terminal SSE marker in the buffered opening window. Used to
 * distinguish a clean short stream from a graceful-but-truncated one (server closed
 * the connection mid-response without erroring). Only ever applied to the small held
 * window (≤ BUFFER_MAX_BYTES), so the full decode is cheap.
 */
export function hasTerminalMarker(bytes: Uint8Array): boolean {
  if (!bytes || bytes.byteLength === 0) return false;
  const text = new TextDecoder().decode(bytes);
  return (
    text.includes(OPENAI_DONE_MARKER) ||
    text.includes(ANTHROPIC_STOP_MARKER) ||
    text.includes(RESPONSES_COMPLETED_MARKER) ||
    text.includes(RESPONSES_FAILED_MARKER) ||
    text.includes(RESPONSES_INCOMPLETE_MARKER)
  );
}

// ──────────────── Mid-stream continuation primitives (Fase 4.4) ────────────────
//
// When a stream truncates AFTER the holdback has committed (bytes already reached the
// client), an early-retry is unsafe (it would replay text the client already saw). For
// plain-text OpenAI-compatible streams we can instead RE-REQUEST with the partial answer
// as an assistant prefill and stitch only the missing suffix. These helpers are pure and
// fully unit-testable; the wiring lives in `createRecoverableStream` (continuation opts).

export interface OpenAiSseScan {
  /** Concatenated assistant text seen across `choices[].delta.content`. */
  text: string;
  /** Concatenated reasoning trace seen across `choices[].delta.reasoning_content`. Some
   *  providers stream the entire answer here and leave `content` empty/null — tracked
   *  separately so a clean stop with reasoning-only output can still be recognized as
   *  "nothing usable was delivered" instead of "a normal empty turn". */
  reasoningText: string;
  /** True if any `choices[].delta.tool_calls` appeared — NEVER continue those. */
  sawToolCall: boolean;
  /**
   * True only when `tool_calls` appeared in this scan AND its own
   * `finish_reason: "tool_calls"` has NOT also appeared in the same scan — i.e. the
   * call is still being streamed (arguments may be mid-flight). Once
   * `finish_reason: "tool_calls"` closes it, the call is complete, not in flight: the
   * client has the full arguments and a truncation past this point only drops
   * trailing prose, which continuation can safely recover.
   */
  sawToolCallInFlight: boolean;
  /**
   * True if a terminal marker for the OVERALL stream appeared: `[DONE]`, or a
   * `finish_reason` other than `"tool_calls"`. A `finish_reason: "tool_calls"` ends
   * that one choice but is not terminal for continuation purposes — the model turn
   * (and the client-visible SSE) is still eligible to be resumed past it.
   */
  terminal: boolean;
  /** The literal `finish_reason` string when present (e.g. "stop", "tool_calls", "length",
   *  "content_filter"), or `null` if none was seen. `terminal` alone is not precise enough
   *  to gate the reasoning-only-stop continuation — it must fire on `"stop"` only. */
  finishReason: string | null;
  /** True if at least one OpenAI-shaped `choices[].delta` was parsed (format gate). */
  parsedOpenAi: boolean;
  /**
   * True if at least one Responses-API event below was parsed (format gate,
   * symmetric with `parsedOpenAi`): text/resasoning deltas, function-call
   * signals, or a terminal lifecycle event.
   */
  parsedResponses: boolean;
}

/** Responses-API `type` values the scanner understands. Anything else is ignored. */
const RESPONSES_TEXT_DELTA = "response.output_text.delta";
const RESPONSES_TEXT_DONE = "response.output_text.done";
const RESPONSES_REASONING_DELTA = "response.reasoning_summary_text.delta";
const RESPONSES_FN_ARGS_DELTA = "response.function_call_arguments.delta";
const RESPONSES_FN_ARGS_DONE = "response.function_call_arguments.done";
const RESPONSES_ITEM_ADDED = "response.output_item.added";
const RESPONSES_ITEM_DONE = "response.output_item.done";
const RESPONSES_COMPLETED = "response.completed";
const RESPONSES_FAILED = "response.failed";
const RESPONSES_INCOMPLETE = "response.incomplete";

/**
 * Scan a slice of OpenAI-compatible SSE for the assistant text, tool-call presence, and
 * a terminal marker. Non-OpenAI bodies (e.g. Anthropic `content_block_delta` events) parse
 * to `parsedOpenAi:false` with empty text, so the caller falls back to current behavior.
 */
export function scanOpenAiSseText(sse: string): OpenAiSseScan {
  const fold: SseScanFold = {
    text: "",
    reasoningText: "",
    sawToolCall: false,
    toolCallFinished: false,
    terminal: false,
    finishReason: null,
    parsedOpenAi: false,
    parsedResponses: false,
  };
  if (typeof sse !== "string" || sse.length === 0) {
    return {
      text: fold.text,
      reasoningText: fold.reasoningText,
      sawToolCall: fold.sawToolCall,
      sawToolCallInFlight: false,
      terminal: fold.terminal,
      finishReason: fold.finishReason,
      parsedOpenAi: fold.parsedOpenAi,
      parsedResponses: fold.parsedResponses,
    };
  }
  for (const line of sse.split("\n")) {
    scanSseLine(line, fold);
  }
  const sawToolCallInFlight = fold.sawToolCall && !fold.toolCallFinished;
  return {
    text: fold.text,
    reasoningText: fold.reasoningText,
    sawToolCall: fold.sawToolCall,
    sawToolCallInFlight,
    terminal: fold.terminal,
    finishReason: fold.finishReason,
    parsedOpenAi: fold.parsedOpenAi,
    parsedResponses: fold.parsedResponses,
  };
}

interface SseScanFold {
  text: string;
  reasoningText: string;
  sawToolCall: boolean;
  toolCallFinished: boolean;
  terminal: boolean;
  finishReason: string | null;
  parsedOpenAi: boolean;
  parsedResponses: boolean;
}

/** Parse one raw SSE line into the running scan fold. */
function scanSseLine(line: string, fold: SseScanFold): void {
  const trimmed = line.trimStart();
  if (!trimmed.startsWith("data:")) return;
  const payload = trimmed.slice(5).trim();
  if (!payload) return;
  if (payload === "[DONE]") {
    fold.terminal = true;
    return;
  }
  let json: unknown;
  try {
    json = JSON.parse(payload);
  } catch {
    return;
  }
  const choices = (json as { choices?: unknown })?.choices;
  if (Array.isArray(choices)) {
    for (const choice of choices) scanChatChoice(choice, fold);
    return;
  }
  // Responses-API events: same scan, allowlisted `type` values only. Gated on
  // `data:` JSON exactly like the chat path above, so a bare `event:` line
  // without a payload stays invisible here (the holdback substring in
  // `hasTerminalMarker` still covers the pre-commit window).
  scanResponsesEvent(json as Record<string, unknown>, {
    addText: (delta) => {
      fold.text += delta;
    },
    addReasoning: (delta) => {
      fold.reasoningText += delta;
    },
    markToolCall: () => {
      fold.sawToolCall = true;
    },
    markToolCallFinished: () => {
      fold.sawToolCall = true;
      fold.toolCallFinished = true;
    },
    markTerminal: () => {
      fold.terminal = true;
    },
    markParsed: () => {
      fold.parsedResponses = true;
    },
  });
}

/** Fold one chat-completions `choices[]` entry into the running scan fold. */
function scanChatChoice(choice: unknown, fold: SseScanFold): void {
  const delta = (choice as { delta?: unknown })?.delta;
  if (delta && typeof delta === "object") {
    fold.parsedOpenAi = true;
    const content = (delta as { content?: unknown }).content;
    if (typeof content === "string") fold.text += content;
    const reasoning = (delta as { reasoning_content?: unknown }).reasoning_content;
    if (typeof reasoning === "string") fold.reasoningText += reasoning;
    const toolCalls = (delta as { tool_calls?: unknown }).tool_calls;
    if (Array.isArray(toolCalls) && toolCalls.length > 0) fold.sawToolCall = true;
  }
  scanChatFinishReason((choice as { finish_reason?: unknown })?.finish_reason, fold);
}

/** Fold one chat-completions `finish_reason` value into the running scan fold. */
function scanChatFinishReason(rawFinishReason: unknown, fold: SseScanFold): void {
  if (rawFinishReason === "tool_calls") {
    // Ends this one choice, but the overall stream/turn stays continuable —
    // never counts as the general terminal marker (see OpenAiSseScan.terminal).
    fold.toolCallFinished = true;
    fold.finishReason = "tool_calls";
  } else if (rawFinishReason != null) {
    fold.terminal = true;
    if (typeof rawFinishReason === "string") fold.finishReason = rawFinishReason;
  }
}

interface ResponsesScanSink {
  addText: (delta: string) => void;
  addReasoning: (delta: string) => void;
  markToolCall: () => void;
  markToolCallFinished: () => void;
  markTerminal: () => void;
  markParsed: () => void;
}

/**
 * Fold one parsed Responses-API `data:` payload into the scan. Only the
 * allowlisted `type` values below set any flag; every other event (lifecycle
 * echoes such as `response.output_text.done`, unknown provider extensions) is
 * ignored. `output_item.*` is gated on a `function_call` item — a plain text
 * turn announces `message` items that must never trip the tool-call lock.
 */
function scanResponsesEvent(json: Record<string, unknown>, sink: ResponsesScanSink): void {
  const eventType = (json as { type?: unknown }).type;
  if (typeof eventType !== "string") return;
  if (eventType === RESPONSES_TEXT_DELTA || eventType === RESPONSES_REASONING_DELTA) {
    scanResponsesTextDelta(json, eventType, sink);
    return;
  }
  if (eventType === RESPONSES_TEXT_DONE) {
    // Lifecycle echo only (downstream drops it); never text, never a tool call.
    return;
  }
  if (eventType === RESPONSES_FN_ARGS_DELTA || eventType === RESPONSES_FN_ARGS_DONE) {
    if (eventType === RESPONSES_FN_ARGS_DONE) sink.markToolCallFinished();
    else sink.markToolCall();
    sink.markParsed();
    return;
  }
  if (eventType === RESPONSES_ITEM_ADDED || eventType === RESPONSES_ITEM_DONE) {
    scanResponsesOutputItem(json, eventType, sink);
    return;
  }
  if (
    eventType === RESPONSES_COMPLETED ||
    eventType === RESPONSES_FAILED ||
    eventType === RESPONSES_INCOMPLETE
  ) {
    // End of transport in every status, including a `completed` carrying a
    // failed response snapshot: never resumed, never retried.
    sink.markTerminal();
    sink.markParsed();
  }
}

/** Fold a text or reasoning delta event into the scan. */
function scanResponsesTextDelta(
  json: Record<string, unknown>,
  eventType: string,
  sink: ResponsesScanSink
): void {
  const delta = (json as { delta?: unknown }).delta;
  if (typeof delta !== "string" || delta.length === 0) {
    sink.markParsed();
    return;
  }
  if (eventType === RESPONSES_REASONING_DELTA) sink.addReasoning(delta);
  else sink.addText(delta);
  sink.markParsed();
}

/** Fold an `output_item.*` event into the scan when it carries a function call. */
function scanResponsesOutputItem(
  json: Record<string, unknown>,
  eventType: string,
  sink: ResponsesScanSink
): void {
  const item = (json as { item?: unknown }).item;
  const itemType = item && typeof item === "object" ? (item as { type?: unknown }).type : undefined;
  if (itemType !== "function_call") return;
  if (eventType === RESPONSES_ITEM_DONE) sink.markToolCallFinished();
  else sink.markToolCall();
  sink.markParsed();
}

export interface ContinuableBody {
  messages?: unknown;
  stream?: unknown;
  [key: string]: unknown;
}

/**
 * Build a re-request body that continues from `assistantSoFar` by appending it as an
 * assistant turn. Chat bodies (`messages`) win over Responses bodies (`input`) when
 * both are present. When `assistantSoFar` is empty (nothing usable was emitted yet —
 * e.g. a clean stop that only produced reasoning), the turns are re-sent unchanged
 * instead of appending an empty assistant turn: this simply re-asks for a real answer.
 * Returns null when the body carries neither a non-empty `messages` array nor a
 * non-empty `input` array (nothing to continue from).
 */
export function makeContinuationBody(
  body: ContinuableBody,
  assistantSoFar: string
): (ContinuableBody & { messages: unknown[] }) | (ContinuableBody & { input: unknown[] }) | null {
  if (!body || typeof body !== "object") return null;
  if (typeof assistantSoFar !== "string") return null;
  if (Array.isArray(body.messages) && body.messages.length > 0) {
    return {
      ...body,
      messages:
        assistantSoFar.length > 0
          ? [...body.messages, { role: "assistant", content: assistantSoFar }]
          : [...body.messages],
      stream: true,
    };
  }
  if (Array.isArray(body.input) && body.input.length > 0) {
    return {
      ...body,
      input:
        assistantSoFar.length > 0
          ? [
              ...body.input,
              {
                type: "message",
                role: "assistant",
                content: [{ type: "output_text", text: assistantSoFar }],
                status: "completed",
              },
            ]
          : [...body.input],
      stream: true,
    };
  }
  return null;
}

/**
 * Make the continuation append-only: strip the longest leading run of `continuation`
 * that duplicates a trailing run of `emitted` (a model re-emitting the last few tokens it
 * already produced). Bounded to a 512-char seam so it stays O(n) on large outputs.
 */
export function trimContinuationOverlap(emitted: string, continuation: string): string {
  if (!continuation) return "";
  if (!emitted) return continuation;
  const max = Math.min(emitted.length, continuation.length, 512);
  for (let k = max; k > 0; k--) {
    if (emitted.endsWith(continuation.slice(0, k))) return continuation.slice(k);
  }
  return continuation;
}

/** Why a post-commit cut was not continued (see `ContinuationOutcome`). */
export type ContinuationRefusal = "budget" | "tool-call" | "not-continuable";

/**
 * Result of one mid-stream continuation decision, for observability only. `attempt` is the
 * continuation counter `onContinue` reported (0 when a cut is refused before any attempt).
 * A refusal is reported only for an abnormal end (read error, watchdog abort, or a graceful
 * end with no terminal marker) of an OpenAI-compatible stream — never for a nominal end.
 */
export type ContinuationOutcome =
  | { attempt: number; outcome: "suffix"; suffixChars: number }
  | { attempt: number; outcome: "overlap-reject"; overlapChars: number }
  | { attempt: number; outcome: "terminal" | "empty" | "no-stream" }
  | { attempt: number; outcome: "refused"; reason: ContinuationRefusal };

export interface RecoverableStreamOptions {
  /** Released exactly once when the wrapped stream closes, errors, or is cancelled. */
  finalize: () => void;
  /** Max transparent re-opens while the holdback is still uncommitted. */
  maxEarlyRetries?: number;
  /** Injectable clock (ms) threaded to the internal holdback buffers (tests). */
  now?: () => number;
  /** Observability hook fired on each early-retry attempt. */
  onRetry?: (attempt: number, error: unknown) => void;
  /**
   * Mid-stream continuation (Fase 4.4): re-request with the already-sent text as an
   * assistant prefill and return a fresh stream whose text is the missing suffix. Called
   * only after a POST-commit truncation of a plain-text OpenAI-compatible stream (never
   * with a tool call in flight). When omitted, a post-commit truncation behaves exactly
   * as in #4131 (error/close passthrough).
   */
  continueStream?: (assistantSoFar: string) => Promise<ReadableStream<Uint8Array> | null>;
  /** Max continuation re-requests after commit (default STREAM_RECOVERY.EARLY_RETRY_MAX). */
  maxContinuations?: number;
  /** Observability hook fired on each continuation attempt. */
  onContinue?: (attempt: number, assistantSoFar: string) => void;
  /** Observability hook fired with each continuation outcome or refused cut. */
  onContinueOutcome?: (event: ContinuationOutcome) => void;
  /** Opt-in active-stream output-quality watchdog. Disabled when omitted. */
  throughputWatchdog?: ThroughputWatchdogOptions;
  /** Sanitized observability hook fired before the active attempt is aborted. */
  onWatchdogAbort?: (error: ThroughputWatchdogError) => void;
}

/**
 * Wrap an upstream SSE body so a truncation that happens *before* any byte reaches the
 * client is retried transparently. While the holdback is uncommitted the opening window
 * is buffered; a retryable read error or a graceful end without a terminal marker triggers
 * a re-open (via `reopen`) up to `maxEarlyRetries` times. Once committed (window elapsed,
 * byte cap reached, or a terminal marker seen) bytes flow straight through and any later
 * failure propagates to the client unchanged — we never replay a request the caller has
 * already started consuming. `finalize` (e.g. semaphore release) runs exactly once.
 */
export function createRecoverableStream(
  initialStream: ReadableStream<Uint8Array>,
  reopen: () => Promise<ReadableStream<Uint8Array> | null>,
  options: RecoverableStreamOptions
): ReadableStream<Uint8Array> {
  const maxRetries = options.maxEarlyRetries ?? STREAM_RECOVERY.EARLY_RETRY_MAX;

  let reader: ReadableStreamDefaultReader<Uint8Array> = initialStream.getReader();
  let holdback = new HoldbackBuffer({ now: options.now });
  let retries = 0;
  let finalized = false;
  let cancelled = false;
  let throughputWatchdog = createThroughputWatchdog(options.throughputWatchdog);

  const runFinalize = () => {
    if (finalized) return;
    finalized = true;
    options.finalize();
  };

  // Drop the dead reader + held window and acquire a fresh upstream. Returns whether a
  // new stream is now in place (false = give up and fall back to best-effort partial).
  const tryReopen = async (error: unknown): Promise<boolean> => {
    // A client cancel during the holdback window must NOT spend an upstream request.
    if (cancelled || retries >= maxRetries) return false;
    retries += 1;
    options.onRetry?.(retries, error);
    try {
      await reader.cancel(error);
    } catch {
      // dead reader — nothing to cancel
    }
    let next: ReadableStream<Uint8Array> | null = null;
    try {
      next = await reopen();
    } catch {
      next = null;
    }
    // Only drop the held window once we actually have a replacement. If reopen
    // fails/exhausts, the caller falls back to flushing those held bytes.
    if (!next) return false;
    reader = next.getReader();
    holdback.discard(); // reuse the (still-uncommitted) buffer for the new attempt
    throughputWatchdog = createThroughputWatchdog(options.throughputWatchdog);
    return true;
  };

  // ── Mid-stream continuation state (no-op unless options.continueStream is set) ──
  const continueEnabled = typeof options.continueStream === "function";
  const maxContinuations = options.maxContinuations ?? STREAM_RECOVERY.EARLY_RETRY_MAX;
  const encoder = new TextEncoder();
  const trackDecoder = new TextDecoder();
  let continuations = 0;
  let emittedTail = ""; // raw SSE not yet scanned (awaiting an event boundary)
  let emittedText = ""; // assistant text already delivered to the client
  let emittedReasoningText = ""; // reasoning trace already delivered (never shown to the client,
  // tracked only to distinguish "a real empty turn" from "the whole
  // answer stayed in the reasoning channel")
  let emittedFinishReason: string | null = null; // literal finish_reason last seen, if any
  let emittedTerminal = false;
  let emittedToolCallInFlight = false;
  let emittedSawToolCall = false; // any tool_call delta seen, complete or not
  let emittedToolCallFinish = false; // any finish_reason "tool_calls" seen
  let emittedParsedOpenAi = false;
  let emittedParsedResponses = false;
  // STREAM_RECOVERY_TOOLCALL_ORDER_FIX, resolved lazily at most once per stream and only
  // on a recovery decision, so the flag costs nothing on streams that end cleanly.
  let toolCallOrderFix: boolean | undefined;
  const isToolCallOrderFixOn = () => (toolCallOrderFix ??= isToolcallOrderFixEnabled());

  // Enqueue to the client and, when continuation is enabled, fold the chunk into the
  // running scan so a later continuation can be prefilled with exactly what was sent.
  const emit = (
    controller: ReadableStreamDefaultController<Uint8Array>,
    chunk: Uint8Array
  ): void => {
    controller.enqueue(chunk);
    if (!continueEnabled) return;
    emittedTail += trackDecoder.decode(chunk, { stream: true });
    const boundary = emittedTail.lastIndexOf("\n\n");
    if (boundary < 0) return;
    const complete = emittedTail.slice(0, boundary + 2);
    emittedTail = emittedTail.slice(boundary + 2);
    const scan = scanOpenAiSseText(complete);
    emittedText += scan.text;
    emittedReasoningText += scan.reasoningText;
    if (scan.finishReason !== null) emittedFinishReason = scan.finishReason;
    if (scan.terminal) emittedTerminal = true;
    if (scan.sawToolCallInFlight) emittedToolCallInFlight = true;
    if (scan.sawToolCall) emittedSawToolCall = true;
    if (scan.finishReason === "tool_calls") emittedToolCallFinish = true;
    if (scan.parsedOpenAi) emittedParsedOpenAi = true;
    if (scan.parsedResponses) emittedParsedResponses = true;
  };

  const flushHeld = (controller: ReadableStreamDefaultController<Uint8Array>) => {
    for (const chunk of holdback.flush()) emit(controller, chunk);
  };

  // A post-commit truncation is continuable for a plain-text OpenAI-compatible stream that
  // has no tool call in flight, AND either:
  //  - has not finished yet (the original #4131 truncation case), or
  //  - finished with a literal finish_reason of "stop" but delivered nothing usable while a
  //    non-empty reasoning trace shows the provider spent its whole turn "thinking" and never
  //    turned that into an answer (some providers put the entire response in
  //    reasoning_content and leave content empty). Gated on the LITERAL "stop" value, not the
  //    generic `terminal` flag — `terminal` also covers "length"/"content_filter"/a bare
  //    [DONE], which are out of scope for this specific recovery.
  //
  // Known consequence of the hallucinatedEmptyStop path (flagged in cross-review, accepted as
  // inherent to tryContinue's existing design, not new to this fix): the original upstream's
  // `finish_reason:"stop"` chunk was already forwarded to the client via `emit()`'s unconditional
  // `controller.enqueue(chunk)` (streamRecovery.ts:381) BEFORE this scan ever runs — that is how
  // `emittedFinishReason`/`emittedTerminal` get set in the first place. So the client sees an
  // empty "stop" marker from the original turn, then — once the continuation succeeds — the real
  // answer plus a SECOND `emitCleanTerminal` from `tryContinue`. This mirrors what already
  // happens for the pre-existing truncation-continuation case (a truncated stream can likewise
  // have partially delivered SSE framing before `tryContinue` appends more); it is not a new
  // double-close of the underlying `ReadableStream` (`controller.close()` runs exactly once,
  // after `tryContinue` returns). An SSE client that treats a bare `finish_reason:"stop"` as an
  // unconditional end-of-turn (rather than waiting for `[DONE]`) may need updating separately —
  // out of scope for this fix, which targets the observed opencode/OmniRoute pairing where the
  // client kept the connection open.
  const hallucinatedEmptyStop = () =>
    emittedFinishReason === "stop" &&
    !emittedSawToolCall &&
    emittedText.length === 0 &&
    emittedReasoningText.length > 0;

  // With STREAM_RECOVERY_TOOLCALL_ORDER_FIX on, any tool-call activity makes the turn
  // non-continuable. The per-batch scan above is order-blind: a batch carrying a finished
  // call followed by a new partial call reports nothing in flight, and a call finished with
  // finish_reason "tool_calls" is a completed turn where only [DONE] can be missing — a
  // continuation there spends an upstream request and appends content plus a second
  // finish_reason after the tool-call finish. Every tool call is either still pending or
  // already finished, so the order-independent check is exact. Off: the release gate.
  const toolCallBlocksContinuation = () =>
    (emittedSawToolCall || emittedToolCallFinish) && isToolCallOrderFixOn();

  const canContinue = () =>
    continueEnabled &&
    continuations < maxContinuations &&
    (emittedParsedOpenAi || emittedParsedResponses) &&
    !emittedToolCallInFlight &&
    (emittedText.length > 0 ? !emittedTerminal : hallucinatedEmptyStop()) &&
    !toolCallBlocksContinuation();

  // Report why a cut is not continued. Silent for non-OpenAI bodies (continuation never
  // applies to them) so the hook stays quiet on every Claude/Gemini-format stream end.
  const reportRefusal = () => {
    if (
      !continueEnabled ||
      (!emittedParsedOpenAi && !emittedParsedResponses) ||
      !options.onContinueOutcome
    )
      return;
    let reason: ContinuationRefusal = "not-continuable";
    if (continuations >= maxContinuations) reason = "budget";
    else if (emittedToolCallInFlight || toolCallBlocksContinuation()) reason = "tool-call";
    options.onContinueOutcome({ attempt: continuations, outcome: "refused", reason });
  };

  // True for the Responses path (see `isResponsesTurn` below): the client stream
  // carries raw upstream Responses events here (translation to chat happens
  // downstream), so the stitched suffix and the clean terminal must speak the
  // same format. Mixed-format turns fall back to the chat envelope.
  const isResponsesTurn = () => emittedParsedResponses && !emittedParsedOpenAi;

  const emitCleanTerminal = (controller: ReadableStreamDefaultController<Uint8Array>) => {
    if (isResponsesTurn()) {
      // A minimal `response.completed` snapshot: the downstream Responses-to-chat
      // translator treats it exactly like a real upstream terminal — usage
      // extraction, snapshot tool-call synthesis, then `computeFinishReason` on
      // the turn state it already accumulated, so `tool_calls` vs `stop` needs
      // no logic here. A second `completed` after `finishReasonSent` resolves to
      // no chunk downstream, so re-stating completion is idempotent.
      controller.enqueue(
        encoder.encode(
          'data: {"type":"response.completed","response":{"status":"completed","output":[]}}\n\n'
        )
      );
      return;
    }
    controller.enqueue(
      encoder.encode('data: {"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n')
    );
    controller.enqueue(encoder.encode("data: [DONE]\n\n"));
  };

  // Re-request from the partial text and stitch the missing suffix into the client stream.
  // Returns true once the recovered stream has been terminated (caller closes); false to
  // fall back to the unchanged #4131 error/close behavior.
  // `cut` is false only for a graceful end that carried a terminal marker (nominal end).
  const tryContinue = async (
    controller: ReadableStreamDefaultController<Uint8Array>,
    cut = true
  ): Promise<boolean> => {
    if (!canContinue()) {
      if (cut) reportRefusal();
      return false;
    }
    continuations += 1;
    options.onContinue?.(continuations, emittedText);
    const report = (event: ContinuationOutcome) => options.onContinueOutcome?.(event);

    let contStream: ReadableStream<Uint8Array> | null = null;
    try {
      contStream = await options.continueStream!(emittedText);
    } catch {
      contStream = null;
    }
    if (!contStream) {
      report({ attempt: continuations, outcome: "no-stream" });
      return false;
    }

    // Drain the continuation fully (recovery favors correctness over token-by-token
    // streaming of the recovered tail), then emit only the de-duplicated suffix.
    const contReader = contStream.getReader();
    const contDecoder = new TextDecoder();
    let raw = "";
    for (;;) {
      let r: ReadableStreamReadResult<Uint8Array>;
      try {
        r = await contReader.read();
      } catch {
        break; // the continuation itself truncated — emit what we have, maybe continue again
      }
      if (r.done) break;
      if (r.value) raw += contDecoder.decode(r.value, { stream: true });
    }

    const scan = scanOpenAiSseText(raw);
    // A continuation whose overlap with what was already emitted falls below the documented
    // threshold is treated as a suspected restart rather than a real resume — see
    // STREAM_RECOVERY.MIN_CONTINUATION_OVERLAP_CHARS for the full trade-off rationale. This
    // is a heuristic, not a proof: it deliberately trades some false-positive rejections of
    // legitimate low-overlap continuations against never silently gluing two unrelated
    // fragments into one corrupted message.
    const overlapResult = trimContinuationOverlap(emittedText, scan.text);
    const overlapChars = scan.text.length - overlapResult.length;
    const isSuspectedRestart =
      emittedText.length > 0 &&
      scan.text.length > 0 &&
      overlapChars < STREAM_RECOVERY.MIN_CONTINUATION_OVERLAP_CHARS;
    if (isSuspectedRestart) {
      report({ attempt: continuations, outcome: "overlap-reject", overlapChars });
      if (await tryContinue(controller)) return true;
      emitCleanTerminal(controller);
      return true;
    }
    const suffix = overlapResult;
    if (suffix) {
      if (isResponsesTurn()) {
        // Same envelope as the upstream text deltas so the downstream
        // translator folds the suffix into a chat `content` chunk with no
        // prior announcement events required.
        emit(
          controller,
          encoder.encode(
            `data: ${JSON.stringify({ type: "response.output_text.delta", output_index: 0, content_index: 0, delta: suffix })}\n\n`
          )
        );
      } else {
        emit(
          controller,
          encoder.encode(
            `data: ${JSON.stringify({ choices: [{ index: 0, delta: { content: suffix } }] })}\n\n`
          )
        );
      }
      report({ attempt: continuations, outcome: "suffix", suffixChars: suffix.length });
    }
    // A clean finish, or a tool call we cannot safely stitch, ends the recovered stream.
    if (scan.terminal || scan.sawToolCall) {
      if (!suffix) report({ attempt: continuations, outcome: "terminal" });
      emitCleanTerminal(controller);
      return true;
    }
    // With STREAM_RECOVERY_TOOLCALL_ORDER_FIX on, a continuation that delivered no text
    // carries no new information (the next re-request replays the same prefill), so close
    // after this one spent request instead of burning the rest of the budget.
    if (scan.text.length === 0 && isToolCallOrderFixOn()) {
      report({ attempt: continuations, outcome: "empty" });
      emitCleanTerminal(controller);
      return true;
    }
    // The continuation truncated too — try again (bounded), else close cleanly so the
    // client never hangs waiting on a partial response.
    if (await tryContinue(controller)) return true;
    emitCleanTerminal(controller);
    return true;
  };

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      // One pull may read several chunks while the opening window is still held; it
      // only returns after producing output, closing, or erroring.
      for (;;) {
        let result: ReadableStreamReadResult<Uint8Array>;
        try {
          result = await reader.read();
        } catch (error) {
          if (cancelled) return; // torn down while awaiting — don't touch the controller
          if (holdback.committed) {
            // Post-commit: an early-retry is unsafe (text already sent). Try mid-stream
            // continuation for a retryable cut; otherwise propagate as before.
            if (isRetryableStreamError(error) && (await tryContinue(controller))) {
              runFinalize();
              controller.close();
              return;
            }
            runFinalize();
            controller.error(error);
            return;
          }
          if (isRetryableStreamError(error) && (await tryReopen(error))) {
            continue;
          }
          // Unrecoverable before commit: emit whatever was held, then close.
          flushHeld(controller);
          runFinalize();
          controller.close();
          return;
        }

        if (cancelled) return; // torn down while awaiting — don't touch the controller
        const { done, value } = result;
        if (done) {
          if (holdback.committed) {
            // Graceful end after commit: try a mid-stream continuation whenever canContinue()
            // says the stream is worth continuing (silent truncation, or a clean-but-empty
            // reasoning-only stop) — canContinue() is the single source of truth here, same as
            // the read-error branch above.
            if (await tryContinue(controller, !emittedTerminal)) {
              runFinalize();
              controller.close();
              return;
            }
            runFinalize();
            controller.close();
            return;
          }
          // Graceful end before commit: clean short stream, or a silent truncation?
          if (hasTerminalMarker(holdback.peekBuffered())) {
            flushHeld(controller);
            runFinalize();
            controller.close();
            return;
          }
          if (await tryReopen(new TruncatedStreamError())) {
            continue;
          }
          flushHeld(controller);
          runFinalize();
          controller.close();
          return;
        }

        if (value === undefined) continue;

        const watchdogDecision = throughputWatchdog.observe(value);
        if (watchdogDecision.abort) {
          const error = new ThroughputWatchdogError();
          options.onWatchdogAbort?.(error);
          if (!holdback.committed && (await tryReopen(error))) continue;
          if (holdback.committed) {
            try {
              await reader.cancel(error);
            } catch {
              // The active attempt may have closed while the watchdog was deciding.
            }
            if (await tryContinue(controller)) {
              runFinalize();
              controller.close();
              return;
            }
            runFinalize();
            controller.error(error);
            return;
          }
          flushHeld(controller);
          runFinalize();
          controller.close();
          return;
        }

        if (holdback.committed) {
          emit(controller, value);
          return;
        }
        const emitted = holdback.push(value);
        if (emitted.length > 0) {
          for (const chunk of emitted) emit(controller, chunk);
          return;
        }
        // Still holding the opening window — read more without yielding.
      }
    },

    async cancel(reason) {
      cancelled = true;
      runFinalize();
      try {
        await reader.cancel(reason);
      } catch {
        // already closed
      }
    },
  });
}
