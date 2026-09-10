/**
 * Process-local bounded admission for POST /v1/chat/completions.
 *
 * Large chat bodies amplify into multiple transient representations while they are parsed,
 * translated, compressed, and dispatched. A heap snapshot alone cannot prevent two healthy
 * requests from entering that allocation-heavy path together. This module reserves process-
 * local heavyweight capacity before parsing and enforces the hard limit against bytes read,
 * not an untrusted Content-Length header.
 *
 * Process-wide admission budget (#10110): ALL requests — every API key, every
 * session — contend for ONE global heavyweight budget, so the documented
 * "in one process" bound holds against fake-credential sharding. Per-request
 * session identity is used only as a fairness scheduling key: waiters are
 * grouped per session and served round-robin against the shared budget, so one
 * connection's burst cannot starve others (#9654).
 */

import { createLogger } from "../utils/logger";
import v8 from "node:v8";
import { trackRequest } from "../../lib/gracefulShutdown";
import { resolveIngestByteBudget, type IngestBudgetSource } from "./admissionBudget";
import {
  ADMISSION_BYPASS_HEADER,
  isInternalAdmissionBypass,
  resolveSelfLoopBearer,
  resolveSessionId,
} from "./chatAdmissionIdentity";
import {
  bodyExceedsBudgetResponse,
  chatAdmissionRejectionResponse,
  resourcePressureRejectionResponse,
  structuralRejectionResponse,
} from "./chatAdmissionResponses";
import { estimateStructureTokens } from "./chatAdmissionStructureEstimate";
import {
  composeAdmissionLease,
  IngestByteAdmissionController,
  type IngestBudgetAcquireResult,
} from "./ingestByteAdmission";
import {
  getResourcePressureObservation,
  type PressureSeverity,
} from "@omniroute/open-sse/utils/resourcePressure.ts";

function parsePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function parseNonNegativeInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : fallback;
}

export const CHAT_LARGE_BODY_BYTES = parsePositiveInt(
  process.env.OMNIROUTE_CHAT_LARGE_BODY_BYTES,
  256 * 1024
);

export const CHAT_HARD_MAX_BODY_BYTES = parsePositiveInt(
  process.env.OMNIROUTE_CHAT_HARD_MAX_BODY_BYTES,
  50 * 1024 * 1024
);

export const CHAT_MAX_HEAVY_IN_FLIGHT = parsePositiveInt(
  process.env.OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT,
  1
);

/**
 * How long a heavy request waits for heavyweight capacity before giving up with a
 * retryable 503. Agent loops (OpenCode, Claude Code, Cursor…) fan out sub-requests
 * that routinely land on the admission gate together; an immediate 503 makes the
 * client burn its retry budget in seconds and the agent dies mid-task. A short
 * bounded wait serializes the burst instead. `0` (legacy) rejects immediately.
 */
export const CHAT_ADMISSION_QUEUE_MAX_MS = parseNonNegativeInt(
  process.env.OMNIROUTE_CHAT_ADMISSION_QUEUE_MS,
  2000
);

/**
 * Queued-bytes budget for the admission wait (#9654 / U3). A parked waiter holds a
 * fully-buffered request body; several large coding-agent bodies (~750 KB) waiting at
 * once is exactly the heap-amplification scenario chatBodyAdmission was built to stop
 * (#4380). Each lane's controller charges every parked waiter's buffered size against
 * this budget and rejects over-budget waits immediately (retryable 503) instead of
 * parking. Bytes are released when a waiter wakes, aborts, or times out.
 */
export const CHAT_ADMISSION_MAX_QUEUED_BYTES = parsePositiveInt(
  process.env.OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES,
  4 * 1024 * 1024
);

/**
 * Ceiling for the occupancy-derived `Retry-After` on a capacity 503 (#12135). A
 * heavyweight lease is held for the whole SSE lifetime, so the hint is derived from how
 * long capacity has demonstrably been busy (`ChatAdmissionController#retryAfterSeconds`);
 * this cap keeps a multi-minute stream from telling a client to sleep for minutes when
 * another slot may free far sooner.
 */
export const CHAT_ADMISSION_RETRY_AFTER_MAX_SECONDS = 60;

export const CHAT_HEAVY_MESSAGE_COUNT = parsePositiveInt(
  process.env.OMNIROUTE_CHAT_HEAVY_MESSAGE_COUNT,
  200
);
export const CHAT_HEAVY_TOOL_COUNT = parsePositiveInt(
  process.env.OMNIROUTE_CHAT_HEAVY_TOOL_COUNT,
  64
);
export const CHAT_HEAVY_ESTIMATED_TOKENS = parsePositiveInt(
  process.env.OMNIROUTE_CHAT_HEAVY_ESTIMATED_TOKENS,
  32_000
);

/**
 * Heap-pressure shed ratio for the structural admission gate (#10183, #10268).
 *
 * 3.8.48 only shed a heavy request once `heapUsed / heapLimit >= shedRatio` (0.75).
 * 3.8.49 (#9654/#9940) replaced that heap-conditional shed with an unconditional
 * `CHAT_MAX_HEAVY_IN_FLIGHT=1` structural lease, so a second concurrent "heavy"
 * request (coding-agent fan-out is the common trigger) was hard-rejected with a
 * retryable 503 even on a host with ample free RAM. This restores the heap
 * condition as an ADDITIONAL gate layered on top of the bounded-concurrency /
 * per-connection-lane protection from #9654 (that protection stays in force —
 * this constant only decides whether a *busy* lease is still shed with a 503 or
 * admitted anyway because the heap has real headroom).
 */
export const CHAT_ADMISSION_HEAP_SHED_RATIO = (() => {
  const parsed = Number(process.env.OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 1 ? parsed : 0.75;
})();

/**
 * Bounded extra capacity for the "healthy heap" fast path (#10437).
 *
 * The #10183/#10268 fix above admits a busy heavyweight request immediately whenever
 * `heapPressureCheck()` is false — but with no bound of its own, that path let an
 * UNLIMITED number of "healthy heap" requests pile in ahead of the heap-pressure
 * shed, defeating the point of admission control: a slow leak or a burst that never
 * quite trips the heap-pressure ratio could still starve the process. This constant
 * caps how many requests may bypass the primary `CHAT_MAX_HEAVY_IN_FLIGHT` lease via
 * the healthy-heap path at once (tracked independently, per `ChatAdmissionController`
 * instance — see `#activeHealthy` / `tryAcquireHealthyHeadroom`). Once this budget is
 * also exhausted, requests fall through to the SAME bounded-wait/shed path used under
 * real heap pressure, so there is still a real ceiling either way.
 */
export const CHAT_ADMISSION_HEALTHY_HEADROOM = parseNonNegativeInt(
  process.env.OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM,
  CHAT_MAX_HEAVY_IN_FLIGHT
);

/**
 * Live `heapUsed / heap_size_limit` pressure probe, injectable for deterministic
 * tests (`admitChatStructure({ heapPressureCheck })`). Defaults to the real V8
 * heap statistics. Any read failure is treated as "not under pressure" so a
 * transient stats error never turns into a false structural shed.
 */
export function defaultHeapPressureCheck(): boolean {
  try {
    const heapUsed = process.memoryUsage().heapUsed;
    const heapLimit = v8.getHeapStatistics().heap_size_limit;
    if (!Number.isFinite(heapLimit) || heapLimit <= 0) return false;
    return heapUsed / heapLimit >= CHAT_ADMISSION_HEAP_SHED_RATIO;
  } catch {
    return false;
  }
}
/**
 * Optional per-deployment history cap. `0` (the default) disables it.
 *
 * A fixed message count is a *deployment policy*, not a universal property of a chat request:
 * the same 900-message conversation is trivial on a 16 GB host and fatal in a 1 GB container.
 * Enforcing one here rejected conversations before OmniRoute's own compression pipeline — the
 * component that exists precisely to make them servable — ever ran, and returned a terminal 413
 * that no client can retry its way out of. Message count is also not an input the caller fully
 * controls: translation from other protocols expands a single turn into several `messages[]`
 * entries, so the metric an operator caps is partly manufactured by OmniRoute itself.
 *
 * What actually bounds heap growth is the heavyweight lease below (bounded concurrency through
 * the allocation-heavy path) plus the heap-pressure shed in the chat handler. Both remain in
 * force for every request, including large ones. Constrained deployments that still want a hard
 * ceiling opt in with `OMNIROUTE_CHAT_HARD_MAX_MESSAGES`.
 */
export const CHAT_HARD_MAX_MESSAGES = parsePositiveInt(
  process.env.OMNIROUTE_CHAT_HARD_MAX_MESSAGES,
  0
);

export interface ChatAdmissionLease {
  readonly released: boolean;
  release(): void;
}

/** A parked waiter, grouped by fairness key for round-robin dispatch. */
interface AdmissionWaiter {
  readonly key: string;
  readonly resolve: () => void;
}

/**
 * Why a structural shed (503 `chat_admission_busy`) happened (#11244):
 * - `queue_timeout`: the bounded wait expired with no heavyweight capacity freed
 *   (includes the `queueMs=0` legacy immediate-reject path — capacity was busy at
 *   the instant the request arrived).
 * - `queued_bytes_budget`: the queued-bytes heap valve (#9654 / U3) refused to
 *   park the waiter because the buffered-body budget was already exhausted.
 *
 * A client abort mid-wait is deliberately NOT a shed: capacity was never denied,
 * the caller simply left (its 503 is dropped on the dead connection).
 */
export type ChatAdmissionShedReason =
  | "queue_timeout"
  | "queued_bytes_budget"
  | "body_exceeds_budget"
  | "inflight_bytes_budget"
  | "resource_pressure";

/** Read cached pressure severity; sampling failures must not cause false sheds. */
export function defaultPressureSeverity(): PressureSeverity {
  try {
    return getResourcePressureObservation().state.severity;
  } catch {
    return "normal";
  }
}

/**
 * One structural-shed observation, emitted to the shed sink at warn level.
 * `lane` is the opaque fairness key — the HMAC fingerprint produced by
 * `resolveSessionId` (or "anonymous"/"default"), never a raw credential.
 */
export interface ChatAdmissionShedEvent {
  reason: ChatAdmissionShedReason;
  activeHeavy: number;
  waiting: number;
  queuedBytes: number;
  lane: string;
}

export type ChatAdmissionShedSink = (event: ChatAdmissionShedEvent) => void;

const shedLog = createLogger("chat-admission");

/**
 * Default shed sink (#11244): exactly one structured warn per structural shed.
 * The 503 returns BEFORE request logging, so without this line a shed left no
 * trace anywhere. No raw credentials — `lane` is already the HMAC fingerprint,
 * and the shared logger's redaction hook (logRedaction.ts) is the safety net.
 * Nothing is logged for admitted requests (noise).
 */
function defaultChatAdmissionShedSink(event: ChatAdmissionShedEvent): void {
  shedLog.warn(event, "structural chat admission shed (chat_admission_busy)");
}

/**
 * Process-local heavyweight reservation. The capacity check and increment execute in one
 * synchronous JavaScript turn, making acquisition atomic within an OmniRoute process.
 * Unavailable capacity is a bounded wait (see `acquireHeavyWithin`) and only then a
 * retryable 503, so short agent bursts serialize instead of killing the client's
 * retry budget.
 */
export class ChatAdmissionController {
  #activeHeavy = 0;
  #queuedBytes = 0;
  /** #10437: independent counter for the bounded "healthy heap" headroom budget —
   * separate from `#activeHeavy` so it never inflates the documented
   * `CHAT_MAX_HEAVY_IN_FLIGHT` bound, but still a real, finite ceiling instead of
   * the unconditional bypass this replaces. */
  #activeHealthy = 0;
  /** #12135: acquisition time of every live heavy lease, keyed by an opaque token, so the
   * capacity 503 can advertise a `Retry-After` derived from observed occupancy. */
  #heavyLeaseStartedAt = new Map<symbol, number>();
  /** Per-key FIFOs. A key groups one client's waiters so they are served
   * round-robin against the shared budget instead of monopolizing a strict
   * FIFO (see #dispatchFair). */
  #queues = new Map<string, AdmissionWaiter[]>();
  /** Keys in creation order; #fairCursor scans them round-robin. */
  #fairKeys: string[] = [];
  #fairCursor = 0;
  /** #11244: in-memory shed history (total + per reason). The 503 chat_admission_busy
   * response returns before request logging, so without these counters a structural
   * shed was invisible. Same in-memory lifetime as the rest of the snapshot state. */
  #shedTotal = 0;
  #shedsByReason = new Map<string, number>();
  readonly #onShed: ChatAdmissionShedSink;

  readonly #ingestBudget: IngestByteAdmissionController;

  constructor(
    readonly maxHeavyInFlight = 1,
    readonly maxQueuedBytes = CHAT_ADMISSION_MAX_QUEUED_BYTES,
    /** #10437: bounded extra capacity for the healthy-heap fast path. `0` disables
     * the bypass entirely — every busy request then falls through to the same
     * bounded-wait/shed path used under real heap pressure. */
    readonly healthyHeadroom = CHAT_ADMISSION_HEALTHY_HEADROOM,
    /** #11244: sink notified once per structural shed. Defaults to the shared pino
     * logger (warn); tests inject a capture/no-op sink. */
    onShed: ChatAdmissionShedSink = defaultChatAdmissionShedSink,
    /** #503-fanout: see the field-level comment above `#inflightBytes`. */
    budgetOptions: {
      maxInflightBytes?: number;
      budgetSource?: IngestBudgetSource;
      checkPressureSeverity?: () => PressureSeverity;
    } = {}
  ) {
    if (!Number.isSafeInteger(maxHeavyInFlight) || maxHeavyInFlight < 1) {
      throw new RangeError("maxHeavyInFlight must be a positive integer");
    }
    if (!Number.isSafeInteger(maxQueuedBytes) || maxQueuedBytes < 0) {
      throw new RangeError("maxQueuedBytes must be a non-negative integer");
    }
    if (!Number.isSafeInteger(healthyHeadroom) || healthyHeadroom < 0) {
      throw new RangeError("healthyHeadroom must be a non-negative integer");
    }
    this.#onShed = onShed;
    this.#ingestBudget = new IngestByteAdmissionController({
      ...budgetOptions,
      onShed: (reason, lane) => this.recordShed(reason, lane),
    });
  }

  get activeHeavy(): number {
    return this.#activeHeavy;
  }

  /** Active leases held through the bounded healthy-heap headroom budget (#10437). */
  get activeHealthyHeadroom(): number {
    return this.#activeHealthy;
  }

  /**
   * Acquire one slot from the bounded, independent healthy-heap headroom budget
   * (#10437). Unlike `tryAcquireHeavy()`, this never contends with the primary
   * `maxHeavyInFlight` lease — it exists ONLY to give the "heap has real
   * headroom" fast path a finite ceiling instead of an unconditional bypass.
   * Returns `null` once `healthyHeadroom` concurrent leases are already active,
   * at which point the caller must fall through to the bounded-wait/shed path.
   */
  tryAcquireHealthyHeadroom(): ChatAdmissionLease | null {
    if (this.#activeHealthy >= this.healthyHeadroom) return null;
    this.#activeHealthy += 1;
    const done = trackRequest();
    let released = false;
    return {
      get released() {
        return released;
      },
      release: () => {
        if (released) return;
        released = true;
        this.#activeHealthy = Math.max(0, this.#activeHealthy - 1);
        done();
      },
    };
  }

  /** Total buffered bytes currently parked across all queues (heap valve accounting). */
  get queuedBytes(): number {
    return this.#queuedBytes;
  }

  /** Total waiters parked across all keys (diagnostics). */
  get waitingCount(): number {
    let total = 0;
    for (const queue of this.#queues.values()) total += queue.length;
    return total;
  }

  /** Per-key waiter depths (diagnostics) — opaque scheduler keys, never raw credentials. */
  get waitersByKey(): ReadonlyArray<{ key: string; waiting: number }> {
    const out: Array<{ key: string; waiting: number }> = [];
    for (const [key, queue] of this.#queues) out.push({ key, waiting: queue.length });
    return out;
  }

  /** Total structural sheds since process start (#11244). */
  get shedTotal(): number {
    return this.#shedTotal;
  }

  /** Structural sheds by reason since process start (#11244). */
  get shedsByReason(): Record<string, number> {
    const out: Record<string, number> = {};
    for (const [reason, count] of this.#shedsByReason) out[reason] = count;
    return out;
  }

  /**
   * Record one structural shed (503 chat_admission_busy) and notify the shed sink
   * (#11244). Called internally at every capacity-driven give-up point in
   * `acquireHeavyWithin`; public so the aggregate snapshot wiring and tests can
   * exercise the same single path. `lane` is the opaque fairness key (HMAC
   * fingerprint), never a raw credential.
   */
  recordShed(reason: ChatAdmissionShedReason, lane = "default"): void {
    this.#shedTotal += 1;
    this.#shedsByReason.set(reason, (this.#shedsByReason.get(reason) ?? 0) + 1);
    this.#onShed({
      reason,
      activeHeavy: this.#activeHeavy,
      waiting: this.waitingCount,
      queuedBytes: this.#queuedBytes,
      lane,
    });
  }

  tryAcquireHeavy(): ChatAdmissionLease | null {
    if (this.#activeHeavy >= this.maxHeavyInFlight) return null;
    this.#activeHeavy += 1;
    const token = Symbol("heavy-lease");
    this.#heavyLeaseStartedAt.set(token, Date.now());
    const done = trackRequest();
    let released = false;
    return {
      get released() {
        return released;
      },
      release: () => {
        if (released) return;
        released = true;
        this.#activeHeavy = Math.max(0, this.#activeHeavy - 1);
        this.#heavyLeaseStartedAt.delete(token);
        done();
        this.#dispatchFair();
      },
    };
  }

  /**
   * `Retry-After` (whole seconds) for a capacity 503, derived from live occupancy instead
   * of a fixed constant (#12135). A heavyweight lease is held for the ENTIRE SSE lifetime
   * (tens of seconds to minutes), so a fixed 1–2 s hint invited clients to re-send the
   * same ~1 MiB body every second into a gate that could not possibly have cleared. The
   * hint is the larger of:
   *  - `queueMs`, the bounded wait the caller already exhausted — the server itself needed
   *    longer than that, so advertising less is dishonest; and
   *  - the age of the YOUNGEST live heavy lease: the time since heavyweight capacity last
   *    turned over. Every slot has been continuously held at least that long, so it is the
   *    observed floor on how long "busy" has lasted (the oldest lease would be a pessimist
   *    with N slots in flight).
   * Rounded up and capped at `CHAT_ADMISSION_RETRY_AFTER_MAX_SECONDS`. The response
   * builders floor the result at their historical value (1 s structural, 2 s byte-stage),
   * so an idle gate answers exactly as before.
   */
  retryAfterSeconds(queueMs: number, now = Date.now()): number {
    let youngestAgeMs = Number.POSITIVE_INFINITY;
    for (const startedAt of this.#heavyLeaseStartedAt.values()) {
      youngestAgeMs = Math.min(youngestAgeMs, now - startedAt);
    }
    const occupancyMs = Number.isFinite(youngestAgeMs) ? youngestAgeMs : 0;
    const hintSeconds = Math.ceil(Math.max(0, queueMs, occupancyMs) / 1000);
    return Math.min(CHAT_ADMISSION_RETRY_AFTER_MAX_SECONDS, Math.max(1, hintSeconds));
  }

  /**
   * Wait up to `timeoutMs` for heavyweight capacity, retrying atomically on each
   * release. Resolves `null` when the deadline expires with no capacity freed, in
   * which case the caller answers the retryable 503. `timeoutMs <= 0` is the
   * legacy immediate-reject path.
   *
   * Waiters are grouped by `sessionKey` and served round-robin across keys
   * (#dispatchFair), so one client's burst cannot starve another's bounded wait
   * while every key contends for the SAME process-wide budget.
   *
   * When `signal` aborts while parked (client disconnect), the waiter is removed
   * from its queue immediately and the promise resolves `null` early instead of
   * parking for the full `timeoutMs` — the caller's 503 is dropped on the dead
   * connection, so no capacity is consumed and the freed slot never wakes a
   * waiter the client no longer needs. A signal that is already aborted never
   * parks at all.
   *
   * `queuedBytes` is the buffered body size this waiter will hold while parked;
   * it is charged against `maxQueuedBytes` so a burst of large bodies cannot
   * amplify the heap (#4380). An over-budget wait is rejected immediately with
   * `null` (retryable 503) and never parks; the charge is released on wake,
   * abort, or timeout.
   */
  async acquireHeavyWithin(
    timeoutMs: number,
    signal?: AbortSignal,
    queuedBytes = 0,
    sessionKey = "default"
  ): Promise<ChatAdmissionLease | null> {
    const deadline = Date.now() + Math.max(0, Math.floor(timeoutMs));
    for (;;) {
      if (signal?.aborted) return null;
      const lease = this.tryAcquireHeavy();
      if (lease) return lease;
      const remaining = deadline - Date.now();
      if (remaining <= 0) {
        // Wait window exhausted (or queueMs=0 immediate reject) with capacity still
        // busy — the caller answers the retryable 503. Count it (#11244).
        this.recordShed("queue_timeout", sessionKey);
        return null;
      }
      // Heap valve: refuse to park when the queued-bytes budget is exhausted.
      if (queuedBytes > 0 && this.#queuedBytes + queuedBytes > this.maxQueuedBytes) {
        // Same retryable 503, distinct cause: the wait itself would amplify the heap.
        this.recordShed("queued_bytes_budget", sessionKey);
        return null;
      }
      this.#queuedBytes += queuedBytes;
      // Park into this key's FIFO (creating the key on first use).
      let queue = this.#queues.get(sessionKey);
      if (!queue) {
        queue = [];
        this.#queues.set(sessionKey, queue);
        this.#fairKeys.push(sessionKey);
      }
      const lane = queue;
      let resolveParked: (() => void) | null = null;
      const waiter: AdmissionWaiter = {
        key: sessionKey,
        resolve: () => resolveParked?.(),
      };
      const parked = new Promise<void>((resolve) => {
        resolveParked = () => resolve();
        lane.push(waiter);
      });
      let deadlineTimer: ReturnType<typeof setTimeout> | null = null;
      const races: Array<Promise<boolean>> = [
        parked.then(() => false),
        new Promise<boolean>((resolve) => {
          deadlineTimer = setTimeout(() => resolve(true), remaining);
        }),
      ];
      let onAbort: (() => void) | null = null;
      if (signal) {
        races.push(
          new Promise<boolean>((resolve) => {
            const listener = () => resolve(true);
            onAbort = listener;
            signal.addEventListener("abort", listener, { once: true });
            // Already-aborted signals must settle without parking.
            if (signal.aborted) resolve(true);
          })
        );
      }
      const timedOut = await Promise.race(races);
      // The waiter has left its queue (wake, abort, or timeout) — release its charge.
      this.#queuedBytes = Math.max(0, this.#queuedBytes - queuedBytes);
      this.#removeWaiter(waiter);
      // Cancel the deadline timer when abort/release wins; a fired timer is a no-op.
      if (deadlineTimer) clearTimeout(deadlineTimer);
      if (onAbort) signal?.removeEventListener("abort", onAbort);
      if (timedOut) {
        // The deadline timer won the race: a genuine shed. When the client ABORT
        // won instead (signal aborted while parked), capacity was never denied —
        // the 503 is dropped on the dead connection, so it is not counted (#11244).
        if (!signal?.aborted) this.recordShed("queue_timeout", sessionKey);
        return null;
      }
    }
  }

  /** Remove a parked waiter from its key's queue, dropping empty keys. Idempotent. */
  #removeWaiter(waiter: AdmissionWaiter): void {
    const queue = this.#queues.get(waiter.key);
    if (!queue) return;
    const index = queue.indexOf(waiter);
    if (index >= 0) queue.splice(index, 1);
    if (queue.length === 0) this.#removeFairKey(waiter.key);
  }

  #removeFairKey(key: string): void {
    this.#queues.delete(key);
    const index = this.#fairKeys.indexOf(key);
    if (index < 0) return;
    this.#fairKeys.splice(index, 1);
    if (index < this.#fairCursor) this.#fairCursor -= 1;
    if (this.#fairKeys.length === 0) this.#fairCursor = 0;
  }

  /**
   * Round-robin dispatch across per-key queues (#9654 fairness, #10110 global
   * budget). Called on every release; wakes exactly ONE waiter — the head of
   * the next key in rotation — so the freed slot is claimed atomically by the
   * woken waiter's re-loop. A strict FIFO would let one client's burst consume
   * every freed slot; rotating the cursor gives each contending key a turn.
   */
  #dispatchFair(): void {
    if (this.#fairKeys.length === 0) return;
    for (let i = 0; i < this.#fairKeys.length; i++) {
      const key = this.#fairKeys[this.#fairCursor % this.#fairKeys.length];
      this.#fairCursor += 1;
      const queue = this.#queues.get(key);
      if (!queue || queue.length === 0) continue;
      const waiter = queue.shift() as AdmissionWaiter;
      if (queue.length === 0) this.#removeFairKey(key);
      waiter.resolve();
      return;
    }
  }

  get inflightBytes(): number {
    return this.#ingestBudget.inflightBytes;
  }

  get maxInflightBytes(): number {
    return this.#ingestBudget.maxInflightBytes;
  }

  get budgetSource(): IngestBudgetSource {
    return this.#ingestBudget.budgetSource;
  }

  pressureSeverity(): PressureSeverity {
    return this.#ingestBudget.pressureSeverity();
  }

  canFitBudget(bytes: number): boolean {
    return this.#ingestBudget.canFit(bytes);
  }

  tryAcquireBudget(bytes: number): ChatAdmissionLease | null {
    return this.#ingestBudget.tryAcquire(bytes);
  }

  acquireBudgetWithin(
    bytes: number,
    timeoutMs: number,
    signal?: AbortSignal,
    sessionKey = "default"
  ): Promise<IngestBudgetAcquireResult> {
    return this.#ingestBudget.acquireWithin(bytes, timeoutMs, signal, sessionKey);
  }
}

const defaultAdmissionController = new ChatAdmissionController(CHAT_MAX_HEAVY_IN_FLIGHT);

/**
 * Process-wide byte-level admission budget (#10110).
 *
 * Every request — every session, every API key — admits against ONE global
 * ChatAdmissionController, so `CHAT_MAX_HEAVY_IN_FLIGHT` and
 * `CHAT_ADMISSION_MAX_QUEUED_BYTES` are enforced process-wide, exactly as
 * documented in docs/reference/ENVIRONMENT.md. The pre-#10110 design minted a
 * per-session controller per request, multiplying the process bound by up to
 * 64 lanes and letting unauthenticated fake credentials shard capacity.
 *
 * Per-request session identity survives ONLY as a fairness scheduling key:
 * waiters are grouped per key and served round-robin against the shared
 * budget (ChatAdmissionController#dispatchFair), preserving the #9654
 * guarantee that one connection's burst cannot starve others — without any
 * per-key capacity being allocated.
 */

export { ADMISSION_BYPASS_HEADER, resolveSelfLoopBearer, resolveSessionId };

const NULL_LEASE: ChatAdmissionLease = {
  released: true,
  release() {},
};

export class PerConnectionAdmissionController {
  readonly #controller: ChatAdmissionController;

  constructor(
    readonly maxHeavyInFlight = 1,
    // `maxSessions`/`sessionTtlMs` are deprecated pre-#10110 lane-eviction knobs:
    // accepted for API compatibility and ignored — there are no per-session lanes
    // to evict. `onShed` (#11244) is live: it replaces the shed sink of the shared
    // controller (tests inject a capture/no-op sink; production keeps the pino warn).
    // `budget` (#503-fanout) is live: the additive ingest byte-budget gate — see
    // `ChatAdmissionController`'s constructor comment. Absent for every caller
    // except the production singleton below.
    _opts?: {
      maxSessions?: number;
      sessionTtlMs?: number;
      onShed?: ChatAdmissionShedSink;
      budget?: {
        maxInflightBytes?: number;
        budgetSource?: IngestBudgetSource;
        checkPressureSeverity?: () => PressureSeverity;
      };
    }
  ) {
    this.#controller = new ChatAdmissionController(
      maxHeavyInFlight,
      undefined,
      undefined,
      _opts?.onShed,
      _opts?.budget
    );
  }

  /** Returns the process-global budget — the same instance for every session. */
  getController(_sessionId: string): ChatAdmissionController {
    return this.#controller;
  }

  /**
   * Process-wide aggregate snapshot for observability: global totals plus
   * per-key waiter depths and the #11244 shed history (total + per reason).
   * Keys are opaque scheduler keys, never raw credentials.
   */
  snapshot(): {
    activeHeavy: number;
    activeHealthyHeadroom: number;
    queuedBytes: number;
    waiting: number;
    lanes: ReadonlyArray<{ key: string; waiting: number }>;
    shedTotal: number;
    shedsByReason: Record<string, number>;
    /** #503-fanout: live ingest bytes reserved through the byte-budget gate. */
    inflightBytes: number;
    /** #503-fanout: the auto-derived (or overridden) budget ceiling. */
    maxInflightBytes: number;
    /** #503-fanout: which signal the budget was derived from. */
    budgetSource: IngestBudgetSource;
    /** #503-fanout: live multi-signal resource-pressure severity. */
    pressureSeverity: PressureSeverity;
    /** #503-fanout: false on a default deployment — the legacy count cap only
     * binds when the operator explicitly set OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT. */
    countCapEnabled: boolean;
  } {
    return {
      activeHeavy: this.#controller.activeHeavy,
      activeHealthyHeadroom: this.#controller.activeHealthyHeadroom,
      queuedBytes: this.#controller.queuedBytes,
      waiting: this.#controller.waitingCount,
      lanes: this.#controller.waitersByKey,
      shedTotal: this.#controller.shedTotal,
      shedsByReason: this.#controller.shedsByReason,
      inflightBytes: this.#controller.inflightBytes,
      maxInflightBytes: this.#controller.maxInflightBytes,
      budgetSource: this.#controller.budgetSource,
      pressureSeverity: this.#controller.pressureSeverity(),
      countCapEnabled: this.#controller.maxHeavyInFlight < Number.MAX_SAFE_INTEGER,
    };
  }

  get activeHeavy(): number {
    return this.#controller.activeHeavy;
  }

  get queuedBytes(): number {
    return this.#controller.queuedBytes;
  }

  get waitingCount(): number {
    return this.#controller.waitingCount;
  }

  /** No per-session state to clean; kept for API compatibility. */
  dispose(): void {
    // Intentionally empty: the process-global controller owns no session state.
  }
}

/**
 * The legacy count cap (#503-fanout) now binds ONLY when the operator has
 * explicitly set `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Left unset — the
 * default on every deployment that produced the multi-subagent 503 storm —
 * it resolves to effectively unlimited, so the auto-derived ingest byte
 * budget below (`resolveIngestByteBudget()`) is the gate that actually binds.
 * A deployment that already tuned this env var (e.g. `infra/app.env.example`
 * setting `=5`) keeps its exact prior behavior layered on top of the budget.
 */
function resolveLegacyCountCap(): number {
  const raw = process.env.OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT;
  if (raw === undefined || raw.trim() === "") return Number.MAX_SAFE_INTEGER;
  return CHAT_MAX_HEAVY_IN_FLIGHT;
}

const productionIngestBudget = resolveIngestByteBudget();

export const perConnectionAdmissionController = new PerConnectionAdmissionController(
  resolveLegacyCountCap(),
  {
    budget: {
      maxInflightBytes: productionIngestBudget.bytes,
      budgetSource: productionIngestBudget.source,
      checkPressureSeverity: defaultPressureSeverity,
    },
  }
);

export type ChatRequestAdmission =
  | { admit: true; request: Request; lease: ChatAdmissionLease | null }
  | { admit: false; response: Response };

export type ChatStructureAdmission =
  { admit: true; lease: ChatAdmissionLease | null } | { admit: false; response: Response };

const INGEST_NORMAL_MAX_WAIT_MS = 250;

export async function admitChatStructure(
  body: unknown,
  lease: ChatAdmissionLease | null,
  options: {
    controller?: ChatAdmissionController;
    sessionId?: string;
    maxMessages?: number;
    heavyMessages?: number;
    heavyTools?: number;
    heavyTokens?: number;
    queueMs?: number;
    signal?: AbortSignal;
    /**
     * Heap-pressure probe consulted only when heavyweight capacity is busy
     * (#10183, #10268). Defaults to `defaultHeapPressureCheck` (live V8 heap
     * stats). Tests inject a deterministic override.
     */
    heapPressureCheck?: () => boolean;
  } = {}
): Promise<ChatStructureAdmission> {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { admit: true, lease };
  const record = body as Record<string, unknown>;
  const messages = [record.messages, record.input].flat().filter((item) => item != null);
  const tools = Array.isArray(record.tools) ? record.tools : [];
  const maxMessages = options.maxMessages ?? CHAT_HARD_MAX_MESSAGES;
  // Opt-in only: `0`/unset means no history cap, so oversized conversations reach the
  // compression pipeline and the bounded heavyweight path instead of a terminal 413.
  if (maxMessages > 0 && messages.length > maxMessages) {
    return { admit: false, response: structuralRejectionResponse(413, maxMessages) };
  }

  const heavyMessages = options.heavyMessages ?? CHAT_HEAVY_MESSAGE_COUNT;
  const heavyTools = options.heavyTools ?? CHAT_HEAVY_TOOL_COUNT;
  const heavyTokens = options.heavyTokens ?? CHAT_HEAVY_ESTIMATED_TOKENS;
  const countHeavy = messages.length >= heavyMessages || tools.length >= heavyTools;
  if (!countHeavy && lease) return { admit: true, lease };

  const messageEstimate = estimateStructureTokens(messages, heavyTokens);
  const toolEstimate = messageEstimate.exhausted
    ? { tokens: 0, exhausted: true }
    : estimateStructureTokens(tools, heavyTokens - messageEstimate.tokens);
  const estimatedTokens = Math.min(heavyTokens, messageEstimate.tokens + toolEstimate.tokens);
  const heavy =
    countHeavy ||
    messageEstimate.exhausted ||
    toolEstimate.exhausted ||
    estimatedTokens >= heavyTokens;
  if (!heavy || lease) return { admit: true, lease };

  const controller =
    options.controller ??
    (options.sessionId
      ? perConnectionAdmissionController.getController(options.sessionId)
      : defaultAdmissionController);

  // Uncontended fast path: capacity is free on BOTH the legacy count gate and
  // the byte-budget gate (#503-fanout) — mirrors admitChatRequest's composed
  // reserve(). When the count cap is unlimited (the production default since
  // this fix), the byte-budget gate is what actually decides "uncontended":
  // without composing both here, a structurally-heavy-but-byte-light request
  // would always take this fast path and the heap-pressure-conditional shed
  // below would never be reachable in production.
  const immediateCount = controller.tryAcquireHeavy();
  if (immediateCount) {
    const immediateBudget = controller.tryAcquireBudget(CHAT_LARGE_BODY_BYTES);
    if (immediateBudget) {
      return { admit: true, lease: composeAdmissionLease(immediateCount, immediateBudget) };
    }
    immediateCount.release();
  }

  // Heavyweight capacity is momentarily busy (a concurrent heavy request holds the
  // lease). #10183 / #10268: only enter the bounded-wait / shed path — with its
  // queued-bytes heap valve and abort handling (#9654) — when the heap is
  // GENUINELY under pressure. This restores the 3.8.48 `heapUsed/heapLimit >=
  // shedRatio` condition as an additional gate on top of (never a replacement
  // for) the bounded-concurrency / per-connection-lane protection above. A
  // healthy heap has real headroom for a second heavy request even while the
  // single lease is momentarily busy, so admit it immediately instead of
  // parking/shedding a request that has nothing to do with actual resource
  // pressure.
  const heapPressureCheck = options.heapPressureCheck ?? defaultHeapPressureCheck;
  if (!heapPressureCheck()) {
    // #10437: the healthy-heap fast path must still have a real ceiling — an
    // unconditional bypass here let unlimited concurrent "healthy heap"
    // requests pile in ahead of the heap-pressure shed, defeating admission
    // control entirely. Reserve from a separate, bounded headroom budget
    // instead of an unconditional no-op lease; only fall through to the
    // bounded-wait/shed path below (identical to the real-pressure case) once
    // that budget is also exhausted.
    const headroomLease = controller.tryAcquireHealthyHeadroom();
    if (headroomLease) return { admit: true, lease: headroomLease };
  }

  // Structural-only waits happen on byte-light bodies (a byte-heavy body already
  // holds the byte-stage lease), so the conservative 256KB weight bounds the
  // parsed JSON the waiter keeps resident while parked.
  const queueMs = options.queueMs ?? 0;
  const acquiredCount = await controller.acquireHeavyWithin(
    queueMs,
    options.signal,
    CHAT_LARGE_BODY_BYTES,
    options.sessionId
  );
  if (!acquiredCount) {
    return {
      admit: false,
      response: structuralRejectionResponse(
        503,
        maxMessages,
        controller.retryAfterSeconds(queueMs)
      ),
    };
  }

  // #503-fanout: same composed count+budget gate as the fast path above.
  const acquiredBudget = await controller.acquireBudgetWithin(
    CHAT_LARGE_BODY_BYTES,
    queueMs,
    options.signal,
    options.sessionId
  );
  if (acquiredBudget.status !== "acquired") {
    acquiredCount.release();
    return {
      admit: false,
      response: structuralRejectionResponse(
        503,
        maxMessages,
        controller.retryAfterSeconds(queueMs)
      ),
    };
  }
  return {
    admit: true,
    lease: composeAdmissionLease(acquiredCount, acquiredBudget.lease),
  };
}

function parseContentLength(header: string | null): number | null {
  if (header === null || !/^(0|[1-9]\d*)$/.test(header.trim())) return null;
  const parsed = Number(header);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

function rebuildRequest(request: Request, body: Uint8Array): Request {
  const headers = new Headers(request.headers);
  // The inbound value may be absent or dishonest. Let the runtime derive the correct value.
  headers.delete("content-length");
  return new Request(request.url, {
    method: request.method,
    headers,
    body,
    signal: request.signal,
    duplex: "half",
  } as RequestInit & { duplex: "half" });
}

/** Reserve heavyweight capacity and ingest the body with a hard byte bound. */
export async function admitChatRequest(
  request: Request,
  options: {
    controller?: ChatAdmissionController;
    sessionId?: string;
    largeBodyBytes?: number;
    hardMaxBytes?: number;
    queueMs?: number;
    heapPressureCheck?: () => boolean;
  } = {}
): Promise<ChatRequestAdmission> {
  const sessionId = options.sessionId ?? resolveSessionId(request);
  const controller =
    options.controller ?? perConnectionAdmissionController.getController(sessionId);
  const largeBodyBytes = options.largeBodyBytes ?? CHAT_LARGE_BODY_BYTES;
  const hardMaxBytes = options.hardMaxBytes ?? CHAT_HARD_MAX_BODY_BYTES;
  const queueMs = options.queueMs ?? 0;
  const internalBypass = isInternalAdmissionBypass(request);
  const contentLength = parseContentLength(request.headers.get("content-length"));

  // Internal self-loop: skip the heavyweight reservation entirely (the parent
  // request already holds the single lease) but still enforce the hard byte bound.
  if (internalBypass) {
    if (contentLength !== null && contentLength > hardMaxBytes) {
      return { admit: false, response: chatAdmissionRejectionResponse(413, hardMaxBytes) };
    }
    // Sniff bytes for the hard bound without reserving a lease.
    const reader = request.body?.getReader();
    if (!reader) return { admit: true, request, lease: NULL_LEASE };
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        totalBytes += value.byteLength;
        if (totalBytes > hardMaxBytes) {
          await reader.cancel("chat request exceeds hard body limit").catch(() => undefined);
          return { admit: false, response: chatAdmissionRejectionResponse(413, hardMaxBytes) };
        }
        chunks.push(value);
      }
    } catch (error) {
      throw error;
    } finally {
      reader.releaseLock();
    }
    const body = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return { admit: true, request: rebuildRequest(request, body), lease: NULL_LEASE };
  }

  // #503-fanout: shed before spending any bytes on ingestion when the process
  // is under genuine critical resource pressure. No-op for every controller a
  // test constructs directly (default severity is always "normal").
  if (controller.pressureSeverity() === "critical") {
    controller.recordShed("resource_pressure", sessionId);
    return { admit: false, response: resourcePressureRejectionResponse() };
  }

  if (contentLength !== null && contentLength > hardMaxBytes) {
    return { admit: false, response: chatAdmissionRejectionResponse(413, hardMaxBytes) };
  }
  if (
    contentLength !== null &&
    contentLength >= largeBodyBytes &&
    !controller.canFitBudget(contentLength)
  ) {
    controller.recordShed("body_exceeds_budget", sessionId);
    return { admit: false, response: bodyExceedsBudgetResponse(controller.maxInflightBytes) };
  }

  const heapPressureCheck = options.heapPressureCheck ?? defaultHeapPressureCheck;
  let lease: ChatAdmissionLease | null = null;
  // #10437: busy primary + healthy heap uses tryAcquireHealthyHeadroom; else queue/shed.
  // Bodies at/above OMNIROUTE_CHAT_LARGE_BODY_BYTES take this same heavyweight lease.
  const reserve = async (bytes = 0): Promise<boolean> => {
    if (lease) return true;
    const countLease =
      controller.tryAcquireHeavy() ??
      (!heapPressureCheck() ? controller.tryAcquireHealthyHeadroom() : null) ??
      (await controller.acquireHeavyWithin(queueMs, request.signal, bytes, sessionId));
    if (!countLease) return false;

    // Additive ingest byte-budget gate (#503-fanout), layered on top of the
    // legacy count gate above. `maxInflightBytes` defaults to unlimited for
    // every controller a test constructs directly, so this resolves
    // synchronously true there — only the production singleton (built with a
    // real host-derived budget) is ever actually gated by it.
    const severity = controller.pressureSeverity();
    const budgetWaitMs =
      severity === "high" ? queueMs : Math.min(queueMs, INGEST_NORMAL_MAX_WAIT_MS);
    const budgetResult = await controller.acquireBudgetWithin(
      bytes,
      budgetWaitMs,
      request.signal,
      sessionId
    );
    if (budgetResult.status !== "acquired") {
      countLease.release();
      return false;
    }

    lease = composeAdmissionLease(countLease, budgetResult.lease);
    return true;
  };

  // #12135: the capacity 503 advertises an occupancy-derived Retry-After.
  const busyResponse = () =>
    chatAdmissionRejectionResponse(503, hardMaxBytes, controller.retryAfterSeconds(queueMs));

  // A known-large declaration can reserve before ingestion. Unknown lengths are boundedly
  // sniffed below; this avoids consuming scarce heavyweight capacity for small chunked bodies.
  if (
    contentLength !== null &&
    contentLength >= largeBodyBytes &&
    !(await reserve(Math.min(contentLength, hardMaxBytes)))
  ) {
    return { admit: false, response: busyResponse() };
  }

  const reader = request.body?.getReader();
  if (!reader) return { admit: true, request, lease };

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > hardMaxBytes) {
        await reader.cancel("chat request exceeds hard body limit").catch(() => undefined);
        lease?.release();
        return { admit: false, response: chatAdmissionRejectionResponse(413, hardMaxBytes) };
      }
      if (totalBytes >= largeBodyBytes && !controller.canFitBudget(totalBytes)) {
        controller.recordShed("body_exceeds_budget", sessionId);
        await reader.cancel("chat request exceeds ingest budget").catch(() => undefined);
        lease?.release();
        return { admit: false, response: bodyExceedsBudgetResponse(controller.maxInflightBytes) };
      }
      if (totalBytes >= largeBodyBytes && !(await reserve(totalBytes))) {
        await reader.cancel("chat admission capacity unavailable").catch(() => undefined);
        return { admit: false, response: busyResponse() };
      }
      chunks.push(value);
    }
  } catch (error) {
    lease?.release();
    throw error;
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return { admit: true, request: rebuildRequest(request, body), lease };
}

/** Release a lease if a handler rejects; otherwise bind it to the returned response lifecycle. */
export async function releaseChatAdmissionAfterHandler(
  responsePromise: Promise<Response>,
  lease: ChatAdmissionLease | null
): Promise<Response> {
  try {
    return releaseChatAdmissionWhenDone(await responsePromise, lease);
  } catch (error) {
    lease?.release();
    throw error;
  }
}

/** Hold a heavyweight lease through an SSE response without buffering the response body. */
export function releaseChatAdmissionWhenDone(
  response: Response,
  lease: ChatAdmissionLease | null
): Response {
  if (!lease) return response;
  const isStreaming = response.headers.get("content-type")?.includes("text/event-stream");
  if (!isStreaming || !response.body) {
    lease.release();
    return response;
  }

  const reader = response.body.getReader();
  const body = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          lease.release();
          controller.close();
        } else {
          controller.enqueue(value);
        }
      } catch (error) {
        lease.release();
        controller.error(error);
      }
    },
    async cancel(reason) {
      lease.release();
      await reader.cancel(reason).catch(() => undefined);
    },
  });

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
