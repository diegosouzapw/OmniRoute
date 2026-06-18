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

export interface RecoverableStreamOptions {
  /** Released exactly once when the wrapped stream closes, errors, or is cancelled. */
  finalize: () => void;
  /** Max transparent re-opens while the holdback is still uncommitted. */
  maxEarlyRetries?: number;
  /** Injectable clock (ms) threaded to the internal holdback buffers (tests). */
  now?: () => number;
  /** Observability hook fired on each early-retry attempt. */
  onRetry?: (attempt: number, error: unknown) => void;
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
  const makeHoldback = () => new HoldbackBuffer({ now: options.now });

  let reader: ReadableStreamDefaultReader<Uint8Array> = initialStream.getReader();
  let holdback = makeHoldback();
  let retries = 0;
  let finalized = false;

  const runFinalize = () => {
    if (finalized) return;
    finalized = true;
    options.finalize();
  };

  // Drop the dead reader + held window and acquire a fresh upstream. Returns whether a
  // new stream is now in place (false = give up and fall back to best-effort partial).
  const tryReopen = async (error: unknown): Promise<boolean> => {
    if (retries >= maxRetries) return false;
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
    holdback = makeHoldback();
    return true;
  };

  const flushHeld = (controller: ReadableStreamDefaultController<Uint8Array>) => {
    for (const chunk of holdback.flush()) controller.enqueue(chunk);
  };

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      // One pull may read several chunks while the opening window is still held; it
      // only returns after producing output, closing, or erroring.
      // eslint-disable-next-line no-constant-condition
      while (true) {
        let result: ReadableStreamReadResult<Uint8Array>;
        try {
          result = await reader.read();
        } catch (error) {
          if (holdback.committed) {
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

        const { done, value } = result;
        if (done) {
          if (holdback.committed) {
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
          controller.enqueue(value);
          return;
        }
        const emitted = holdback.push(value);
        if (emitted.length > 0) {
          for (const chunk of emitted) controller.enqueue(chunk);
          return;
        }
        // Still holding the opening window — read more without yielding.
      }
    },

    async cancel(reason) {
      runFinalize();
      try {
        await reader.cancel(reason);
      } catch {
        // already closed
      }
    },
  });
}
