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
