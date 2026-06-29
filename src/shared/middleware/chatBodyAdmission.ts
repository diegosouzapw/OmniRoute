/**
 * Heap-pressure-aware admission guard for POST /v1/chat/completions.
 *
 * Root cause (homelab 3.8.40 OOM crash-loop): a forced-GC heap inspection of the live
 * pod showed a HEALTHY ~350 MB live heap — there is no baseline leak. The crash is a
 * per-request transient: a large coding-agent "compact" body (~750 KB) is cloned +
 * JSON-parsed + fanned out across a round-robin combo, allocating hundreds of MB of JS
 * objects; several concurrent compacts stack those transients past the V8 heap ceiling
 * (`FATAL ERROR: Reached heap limit … heap out of memory`), which kills EVERY in-flight
 * request and restarts the pod.
 *
 * A fixed body-size cap is the wrong tool — those large compacts are LEGITIMATE traffic.
 * Instead this guard sheds a large body with a 503 (Retry-After) ONLY when the V8 heap is
 * ALREADY under pressure, converting a process-wide OOM crash into a single graceful
 * client retry. When the heap is healthy (the normal case) large bodies pass through
 * unchanged, so it is invisible to ordinary traffic. A separate hard cap rejects only
 * pathological (multi-MB) bodies before they are cloned/parsed.
 *
 * @module shared/middleware/chatBodyAdmission
 */

import v8 from "node:v8";
import { CORS_HEADERS } from "../utils/cors";

function parsePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseRatio(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 && parsed < 1 ? parsed : fallback;
}

/**
 * Bodies below this size cannot drive the transient amplification that causes the OOM, so
 * they are always admitted and the heap is never even sampled for them (hot-path cheap).
 * Matches the route's existing large-body log threshold (256 KB).
 */
export const CHAT_LARGE_BODY_BYTES = parsePositiveInt(
  process.env.OMNIROUTE_CHAT_LARGE_BODY_BYTES,
  256 * 1024
);

/** Pathological bodies above this are rejected (413) before any clone/parse. Generous by
 * default so real compacts are never rejected; only absurd payloads are. */
export const CHAT_HARD_MAX_BODY_BYTES = parsePositiveInt(
  process.env.OMNIROUTE_CHAT_HARD_MAX_BODY_BYTES,
  50 * 1024 * 1024
);

/** Shed large bodies once heapUsed/heap_size_limit reaches this fraction. 0.75 leaves
 * headroom for the in-flight request to finish + GC. Healthy idle (~0.11) always admits. */
export const CHAT_HEAP_SHED_RATIO = parseRatio(process.env.OMNIROUTE_CHAT_HEAP_SHED_RATIO, 0.75);

export type ChatAdmissionDecision =
  | { admit: true }
  | { admit: false; status: 413 | 503; code: string; message: string };

/**
 * Pure admission decision — no I/O, fully unit-testable. The route wrapper feeds it live
 * Content-Length + heap figures.
 */
export function evaluateChatBodyAdmission(input: {
  contentLength: number | null;
  heapUsedBytes: number;
  heapLimitBytes: number;
  largeBodyBytes?: number;
  hardMaxBytes?: number;
  shedRatio?: number;
}): ChatAdmissionDecision {
  const largeBodyBytes = input.largeBodyBytes ?? CHAT_LARGE_BODY_BYTES;
  const hardMaxBytes = input.hardMaxBytes ?? CHAT_HARD_MAX_BODY_BYTES;
  const shedRatio = input.shedRatio ?? CHAT_HEAP_SHED_RATIO;
  const cl = input.contentLength;

  // Unknown or small bodies: always admit (cannot cause the crash).
  if (cl === null || !Number.isFinite(cl) || cl < largeBodyBytes) return { admit: true };

  // Pathological body: reject before cloning/parsing, independent of heap state.
  if (cl > hardMaxBytes) {
    return {
      admit: false,
      status: 413,
      code: "PAYLOAD_TOO_LARGE",
      message: `Request body too large for chat completions (max ${Math.floor(
        hardMaxBytes / (1024 * 1024)
      )} MB).`,
    };
  }

  // Large but legitimate body: shed with 503 only when the heap is already under pressure,
  // so a burst of concurrent compacts degrades to per-request retries, not a pod-wide OOM.
  if (input.heapLimitBytes > 0 && input.heapUsedBytes / input.heapLimitBytes >= shedRatio) {
    return {
      admit: false,
      status: 503,
      code: "heap_pressure",
      message: "Service temporarily under memory pressure. Retry shortly.",
    };
  }

  return { admit: true };
}

/** Resolved once at module load (mirrors heapPressure.ts) — heap_size_limit is constant. */
const HEAP_LIMIT_BYTES = v8.getHeapStatistics().heap_size_limit;

/**
 * Route-level guard. Returns a ready 413/503 Response when the request must be shed, or
 * null to proceed. Only samples the heap for large bodies, so ordinary requests pay
 * nothing. The heap figure is logged for INTERNAL telemetry only and never placed in the
 * client response (Hard Rule #12).
 */
export function checkChatAdmission(request: Request): Response | null {
  const clHeader = request.headers.get("content-length");
  const contentLength = clHeader ? Number.parseInt(clHeader, 10) : null;

  // Fast path: small/unknown bodies skip the heap sample entirely.
  if (
    contentLength === null ||
    !Number.isFinite(contentLength) ||
    contentLength < CHAT_LARGE_BODY_BYTES
  ) {
    return null;
  }

  const heapUsedBytes = process.memoryUsage().heapUsed;
  const decision = evaluateChatBodyAdmission({
    contentLength,
    heapUsedBytes,
    heapLimitBytes: HEAP_LIMIT_BYTES,
  });

  if (decision.admit) return null;

  if (decision.status === 503) {
    console.warn(
      `[chat-admission] shedding large body (${contentLength}B) under heap pressure: ` +
        `heapUsed=${Math.round(heapUsedBytes / 1048576)}MB / limit=${Math.round(
          HEAP_LIMIT_BYTES / 1048576
        )}MB`
    );
  }

  const headers: Record<string, string> = {
    ...CORS_HEADERS,
    "Content-Type": "application/json",
  };
  if (decision.status === 503) headers["Retry-After"] = "2";

  return new Response(
    JSON.stringify({
      error: {
        message: decision.message,
        type: decision.status === 413 ? "payload_too_large" : "server_error",
        code: decision.code,
      },
    }),
    { status: decision.status, headers }
  );
}
