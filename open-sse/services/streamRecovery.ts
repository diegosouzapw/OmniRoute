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
  if (error instanceof TruncatedStreamError) return true;
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

/**
 * Heuristic check for a terminal SSE marker in the buffered opening window. Used to
 * distinguish a clean short stream from a graceful-but-truncated one (server closed
 * the connection mid-response without erroring). Only ever applied to the small held
 * window (≤ BUFFER_MAX_BYTES), so the full decode is cheap.
 */
export function hasTerminalMarker(bytes: Uint8Array): boolean {
  if (!bytes || bytes.byteLength === 0) return false;
  const text = new TextDecoder().decode(bytes);
  return text.includes(OPENAI_DONE_MARKER) || text.includes(ANTHROPIC_STOP_MARKER);
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
  /** True if any `choices[].delta.tool_calls` appeared — NEVER continue those. */
  sawToolCall: boolean;
  /** True if a terminal marker (`[DONE]` or a non-null `finish_reason`) appeared. */
  terminal: boolean;
  /** True if at least one OpenAI-shaped `choices[].delta` was parsed (format gate). */
  parsedOpenAi: boolean;
}

/**
 * Scan a slice of OpenAI-compatible SSE for the assistant text, tool-call presence, and
 * a terminal marker. Non-OpenAI bodies (e.g. Anthropic `content_block_delta` events) parse
 * to `parsedOpenAi:false` with empty text, so the caller falls back to current behavior.
 */
export function scanOpenAiSseText(sse: string): OpenAiSseScan {
  let text = "";
  let sawToolCall = false;
  let terminal = false;
  let parsedOpenAi = false;
  if (typeof sse !== "string" || sse.length === 0) {
    return { text, sawToolCall, terminal, parsedOpenAi };
  }
  for (const line of sse.split("\n")) {
    const trimmed = line.trimStart();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload) continue;
    if (payload === "[DONE]") {
      terminal = true;
      continue;
    }
    let json: unknown;
    try {
      json = JSON.parse(payload);
    } catch {
      continue;
    }
    const choices = (json as { choices?: unknown })?.choices;
    if (!Array.isArray(choices)) continue;
    for (const choice of choices) {
      const delta = (choice as { delta?: unknown })?.delta;
      if (delta && typeof delta === "object") {
        parsedOpenAi = true;
        const content = (delta as { content?: unknown }).content;
        if (typeof content === "string") text += content;
        const toolCalls = (delta as { tool_calls?: unknown }).tool_calls;
        if (Array.isArray(toolCalls) && toolCalls.length > 0) sawToolCall = true;
      }
      const finishReason = (choice as { finish_reason?: unknown })?.finish_reason;
      if (finishReason != null) terminal = true;
    }
  }
  return { text, sawToolCall, terminal, parsedOpenAi };
}

export interface ContinuableBody {
  messages?: unknown;
  stream?: unknown;
  [key: string]: unknown;
}

/**
 * Build a re-request body that continues from `assistantSoFar` by appending it as an
 * assistant turn. Returns null when the body has no `messages` array or the partial text
 * is empty (nothing to continue from). Does not mutate the original.
 */
export function makeContinuationBody(
  body: ContinuableBody,
  assistantSoFar: string
): (ContinuableBody & { messages: unknown[] }) | null {
  if (!body || typeof body !== "object") return null;
  if (!Array.isArray(body.messages) || body.messages.length === 0) return null;
  if (typeof assistantSoFar !== "string" || assistantSoFar.length === 0) return null;
  return {
    ...body,
    messages: [...body.messages, { role: "assistant", content: assistantSoFar }],
    stream: true,
  };
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
  let emittedTerminal = false;
  let emittedToolCall = false;
  let emittedParsedOpenAi = false;

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
    if (scan.terminal) emittedTerminal = true;
    if (scan.sawToolCall) emittedToolCall = true;
    if (scan.parsedOpenAi) emittedParsedOpenAi = true;
  };

  const flushHeld = (controller: ReadableStreamDefaultController<Uint8Array>) => {
    for (const chunk of holdback.flush()) emit(controller, chunk);
  };

  // A post-commit truncation is continuable only for a plain-text OpenAI-compatible
  // stream that has not finished and has no tool call in flight.
  const canContinue = () =>
    continueEnabled &&
    continuations < maxContinuations &&
    emittedParsedOpenAi &&
    !emittedToolCall &&
    !emittedTerminal &&
    emittedText.length > 0;

  const emitCleanTerminal = (controller: ReadableStreamDefaultController<Uint8Array>) => {
    controller.enqueue(
      encoder.encode('data: {"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n')
    );
    controller.enqueue(encoder.encode("data: [DONE]\n\n"));
  };

  // Re-request from the partial text and stitch the missing suffix into the client stream.
  // Returns true once the recovered stream has been terminated (caller closes); false to
  // fall back to the unchanged #4131 error/close behavior.
  const tryContinue = async (
    controller: ReadableStreamDefaultController<Uint8Array>
  ): Promise<boolean> => {
    if (!canContinue()) return false;
    continuations += 1;
    options.onContinue?.(continuations, emittedText);

    let contStream: ReadableStream<Uint8Array> | null = null;
    try {
      contStream = await options.continueStream!(emittedText);
    } catch {
      contStream = null;
    }
    if (!contStream) return false;

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
    const suffix = trimContinuationOverlap(emittedText, scan.text);
    if (suffix) {
      emit(
        controller,
        encoder.encode(
          `data: ${JSON.stringify({ choices: [{ index: 0, delta: { content: suffix } }] })}\n\n`
        )
      );
    }
    // A clean finish, or a tool call we cannot safely stitch, ends the recovered stream.
    if (scan.terminal || scan.sawToolCall) {
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
            // Graceful end after commit: if it lacks a terminal marker it is a silent
            // truncation — try to continue; otherwise (clean finish) just close.
            if (!emittedTerminal && (await tryContinue(controller))) {
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
