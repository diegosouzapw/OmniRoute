/**
 * Canonical streaming timing instrumentation (TTFT / ITL / interruption).
 *
 * One reusable seam for measuring the streaming path. It is created once per
 * stream and marked from the SSE transform:
 *
 *   markByte()     — first upstream chunk received (bytes arrived from provider)
 *   markForward()  — first chunk forwarded to the client (first SSE chunk enqueued)
 *
 * `ttft()` is therefore **first-forwarded-SSE-chunk latency**, NOT token-level
 * TTFT. We document that distinction explicitly: a single SSE chunk can carry
 * zero, one, or many tokens, and chunk boundaries do not map to token
 * boundaries. If a future implementation can measure actual token timing it
 * should extend this seam, not bypass it.
 *
 * ITL (inter-token latency) is approximated by the mean gap between forwarded
 * SSE chunks (bounded sample window). It is a chunk-latency proxy, again not
 * true token timing — callers must label it as such.
 *
 * The object is cheap to construct, plain mutable state, and safe under the
 * event loop's single thread (each stream owns its own instance).
 *
 * All timestamps are sampled from `performance.now()` (a monotonic clock,
 * milliseconds since an arbitrary process-relative origin), NOT `Date.now()`
 * (wall clock). Every field here is consumed only as an intra-instance delta
 * (`ttftMs`, `avgItlMs`, `totalMs`), so a monotonic source keeps TTFT/ITL
 * immune to NTP steps and wall-clock jumps that would otherwise poison the
 * router's quality signals. Consequently these values are NOT epoch timestamps
 * and must never be serialized, persisted, or compared across StreamTiming
 * instances as absolute times — the same convention `earlyStreamKeepalive.ts`
 * already follows on this streaming path.
 */
import { attachTokensPerSecond, generationDurationMs } from "./generationThroughput.ts";
import { sseChunkCarriesOutput } from "./sseOutputSignal.ts";

export interface StreamTiming {
  startedAt: number;
  firstByteAt: number | null;
  firstForwardAt: number | null;
  /** First forwarded chunk that carried text, reasoning or a tool call. */
  firstOutputAt: number | null;
  lastForwardAt: number | null;
  /** Mean gap between forwarded chunks (ms), bounded window. */
  interChunkGaps: number[];
  forwardedChunks: number;
  interrupted: boolean;
  markByte(): void;
  markForward(): void;
  /** Mark the first forwarded chunk that carries output the user can see. */
  markOutput(): void;
  /**
   * Inspect a forwarded SSE chunk and mark the first one that carries output. The first
   * MAX_OUTPUT_PROBES chunks are parsed in full, then one chunk out of OUTPUT_PROBE_STRIDE, so
   * output that starts after the window is still seen and an unrecognized client format cannot
   * turn this into per-chunk parsing for the whole stream.
   */
  observeOutput(bytes: Uint8Array): void;
  markInterrupted(): void;
  /** First-forwarded-SSE-chunk latency in ms, or null if nothing was forwarded. */
  ttftMs(): number | null;
  /**
   * Time from stream start to the first forwarded chunk carrying output, or null when no
   * chunk carried any. Unlike ttftMs(), keepalive, role-only and lifecycle frames are skipped.
   */
  firstOutputMs(): number | null;
  /** Mean inter-chunk gap in ms, or null when fewer than 2 chunks were forwarded. */
  avgItlMs(): number | null;
  /** Time from stream start to completion (ms). */
  totalMs(): number;
  /** Timing fields of a stream completion payload. */
  completionTiming(): {
    ttft: number | null;
    firstOutputMs: number | null;
    itlMs: number | null;
    interrupted: boolean;
  };
  /**
   * Attach gateway-measured tok/s (TTFT excluded). No-op when TTFT is unknown.
   */
  withTps<T>(usage: T): T;
}

/** Max number of inter-chunk samples kept (bounds memory). */
const MAX_INTER_CHUNK_GAPS = 32;
/** Max number of forwarded chunks parsed while looking for the first output. */
const MAX_OUTPUT_PROBES = 64;
/** Beyond the full window, probe one forwarded chunk out of this many. */
const OUTPUT_PROBE_STRIDE = 16;

/**
 * Request start → first chunk with text, reasoning or a tool call: `originOffsetMs` is the time
 * from the request start to the stream start. Undefined when the stream carried no output, which
 * keeps the usage row's latency fallback.
 */
export function requestTtftMs(
  originOffsetMs: number | null,
  firstOutputMs: number | null | undefined
): number | undefined {
  return typeof firstOutputMs === "number" &&
    Number.isFinite(firstOutputMs) &&
    originOffsetMs !== null
    ? originOffsetMs + firstOutputMs
    : undefined;
}

const timingByStream = new WeakMap<object, StreamTiming>();

/** Associate a stream with its timing so callers outside the transform can read it. */
export function registerStreamTiming<T extends object>(stream: T, timing: StreamTiming): T {
  timingByStream.set(stream, timing);
  return stream;
}

/**
 * True once the stream forwarded a chunk carrying text, reasoning or a tool call to the
 * client. A failure after that point cannot be retried on another target. Forwarded chunks are
 * parsed in full up to MAX_OUTPUT_PROBES, then one out of OUTPUT_PROBE_STRIDE, so output that
 * starts later is still reported. A probe only sees the chunk it receives: output that stops
 * before the next probed chunk reads false here — the conservative answer (callers keep their
 * pre-output behavior).
 */
export function streamEmittedOutput(stream: object | null | undefined): boolean {
  if (!stream) return false;
  return (timingByStream.get(stream)?.firstOutputAt ?? null) !== null;
}

export function createStreamTiming(): StreamTiming {
  const outputDecoder = new TextDecoder();
  let observedChunks = 0;
  const timing: StreamTiming = {
    startedAt: performance.now(),
    firstByteAt: null,
    firstForwardAt: null,
    firstOutputAt: null,
    lastForwardAt: null,
    interChunkGaps: [],
    forwardedChunks: 0,
    interrupted: false,
    markByte() {
      if (this.firstByteAt === null) this.firstByteAt = performance.now();
    },
    markForward() {
      const now = performance.now();
      if (this.firstForwardAt === null) this.firstForwardAt = now;
      if (this.lastForwardAt !== null && this.interChunkGaps.length < MAX_INTER_CHUNK_GAPS) {
        this.interChunkGaps.push(now - this.lastForwardAt);
      }
      this.lastForwardAt = now;
      this.forwardedChunks += 1;
    },
    markOutput() {
      if (this.firstOutputAt === null) this.firstOutputAt = performance.now();
    },
    observeOutput(bytes) {
      if (this.firstOutputAt !== null) return;
      const observed = observedChunks;
      observedChunks += 1;
      if (observed >= MAX_OUTPUT_PROBES && observed % OUTPUT_PROBE_STRIDE !== 0) return;
      if (sseChunkCarriesOutput(outputDecoder.decode(bytes))) this.markOutput();
    },
    markInterrupted() {
      this.interrupted = true;
    },
    ttftMs() {
      return this.firstForwardAt === null ? null : this.firstForwardAt - this.startedAt;
    },
    firstOutputMs() {
      return this.firstOutputAt === null ? null : this.firstOutputAt - this.startedAt;
    },
    avgItlMs() {
      if (this.interChunkGaps.length === 0) return null;
      const sum = this.interChunkGaps.reduce((a, b) => a + b, 0);
      return sum / this.interChunkGaps.length;
    },
    totalMs() {
      return performance.now() - this.startedAt;
    },
    completionTiming() {
      return {
        ttft: this.ttftMs(),
        firstOutputMs: this.firstOutputMs(),
        itlMs: this.avgItlMs(),
        interrupted: this.interrupted,
      };
    },
    withTps(usage) {
      return attachTokensPerSecond(usage, generationDurationMs(this.totalMs(), this.ttftMs()));
    },
  };
  return timing;
}
