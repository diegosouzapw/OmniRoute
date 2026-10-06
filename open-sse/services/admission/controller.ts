import {
  clampLimit,
  closeAdaptationWindow,
  createAdaptationState,
  noteLatency,
  noteOutcome,
  sampleActiveIntegral,
  setPressure,
  type AdaptationState,
} from "./adaptation.ts";
import { validateConfig, type ValidatedConfig } from "./config.ts";
import { estimateAdmissionCost, normalizeRequestCost } from "./cost.ts";
import { FairCostQueue, type QueueEntry } from "./queue.ts";
import {
  MAX_ADMISSION_WINDOW_MS,
  createAdmissionRejectError,
  type AdaptiveAdmissionConfig,
  type AdmissionAcquireResult,
  type AdmissionAdmitted,
  type AdmissionClock,
  type AdmissionLease,
  type AdmissionPressure,
  type AdmissionRejectCode,
  type AdmissionReleaseMeta,
  type AdmissionReleaseOutcome,
  type AdmissionRequest,
  type AdmissionSnapshot,
  type ShadowDecision,
} from "./types.ts";

/**
 * Idle TTL for per-tenant virtual admission lanes (#9654).
 */
const ADMISSION_LANE_TTL_MS = 60_000;
/** Bounded per-tenant lane map to prevent unbounded memory growth (#9654). */
const ADMISSION_LANE_MAX_SESSIONS = 1_000;

type VirtualDisposition = "active" | "queued" | "rejected" | "none";

const MAX_SAFE_BIGINT = BigInt(Number.MAX_SAFE_INTEGER);

/** Snapshot numbers are always finite safe integers; never emit rounded unsafe Number values. */
function saturateSnapshotNumber(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  if (value >= Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER;
  return Math.floor(value);
}

function bigintToSnapshotNumber(value: bigint): number {
  if (value <= 0n) return 0;
  if (value >= MAX_SAFE_BIGINT) return Number.MAX_SAFE_INTEGER;
  return Number(value);
}

function addSaturated(total: number, delta: number): number {
  if (delta <= 0) return saturateSnapshotNumber(total);
  if (total >= Number.MAX_SAFE_INTEGER - delta) return Number.MAX_SAFE_INTEGER;
  return total + delta;
}

interface ActiveLeaseRecord {
  id: string;
  cost: number;
  released: boolean;
  admittedAtMs: number;
  virtualDisposition: VirtualDisposition;
}

interface QueuedPayload {
  resolve: (value: AdmissionAdmitted) => void;
  reject: (err: Error) => void;
  signal?: AbortSignal;
  onAbort?: () => void;
}

let leaseSeq = 0;

function nextId(prefix: string): string {
  leaseSeq += 1;
  return `${prefix}-${leaseSeq}`;
}

function defaultClock(): AdmissionClock {
  return {
    now: () => Date.now(),
    setTimer: (fn, delayMs) => {
      const handle = setTimeout(fn, delayMs);
      // Window/deadline timers must not pin the event loop open when idle.
      if (typeof handle.unref === "function") handle.unref();
      return handle;
    },
    clearTimer: (id) => clearTimeout(id as ReturnType<typeof setTimeout>),
  };
}

/**
 * Dependency-injected weighted adaptive admission controller.
 * Pure in-process core: no env/settings/route wiring.
 */
export class AdaptiveAdmissionController {
  private config: ValidatedConfig;
  private readonly clock: AdmissionClock;
  private adaptation: AdaptationState;
  private queue: FairCostQueue<QueuedPayload>;
  private virtualQueue: FairCostQueue<{ recordId: string }>;
  /** Per-tenant virtual admission lanes (#9654). */
  private readonly virtualLanes = new Map<
    string,
    {
      queue: FairCostQueue<QueuedPayload>;
      lastUsedMs: number;
    }
  >();
  /** Eviction timer for idle lanes; re-armed when a lane is created. */
  private laneEvictionTimer: unknown = undefined;
  private readonly active = new Map<string, ActiveLeaseRecord>();
  private activeCost = 0n;
  private virtualActiveCost = 0;
  private virtualActiveCount = 0;
  private lastSampleMs: number;
  private windowTimer: unknown = undefined;
  private shutDown = false;

  private admittedCount = 0;
  private rejectedCount = 0;
  private wouldAdmitCount = 0;
  private wouldQueueCount = 0;
  private wouldRejectCount = 0;

  constructor(config: AdaptiveAdmissionConfig, clock?: Partial<AdmissionClock>) {
    this.config = validateConfig(config);
    this.clock = {
      now: clock?.now ?? defaultClock().now,
      setTimer: clock?.setTimer ?? defaultClock().setTimer,
      clearTimer: clock?.clearTimer ?? defaultClock().clearTimer,
    };
    const now = this.clock.now();
    this.adaptation = createAdaptationState(
      this.config.initialLimit,
      this.config.minLimit,
      this.config.maxLimit,
      now
    );
    this.queue = new FairCostQueue(this.config.maxQueueCount, this.config.maxQueueCost);
    this.virtualQueue = new FairCostQueue(this.config.maxQueueCount, this.config.maxQueueCost);
    this.lastSampleMs = now;
    this.armWindowTimer();
  }

  updateConfig(config: AdaptiveAdmissionConfig): void {
    const next = validateConfig(config);
    this.sampleIntegral();
    this.config = next;
    this.adaptation.currentLimit = Math.min(
      next.maxLimit,
      Math.max(next.minLimit, this.adaptation.currentLimit)
    );
    // #10111: the idle-recovery ceiling must track a new initialLimit (and the
    // possibly-also-new min/maxLimit) instead of staying pinned to the value computed
    // at construction time — otherwise a raised initialLimit can never recover past the
    // stale ceiling, and a lowered one leaves the ceiling above the new maxLimit.
    this.adaptation.recoveryCeiling = clampLimit(next.initialLimit, next.minLimit, next.maxLimit);
    this.adaptation.windowStartMs = this.clock.now();
    this.adaptation.windowActiveCostIntegral = 0;
    this.adaptation.windowCompleted = 0;
    this.adaptation.windowLatencySamples = 0;
    this.adaptation.freezeGrowth = false;
    this.adaptation.criticalDecreaseConsumed = false;
    this.adaptation.pressure = "normal";
    this.lastSampleMs = this.clock.now();

    const drained = this.queue.drain();
    this.queue = new FairCostQueue(next.maxQueueCount, next.maxQueueCost);
    // Drain per-tenant virtual lane queues (#9654).
    for (const [, lane] of this.virtualLanes) {
      for (const entry of lane.queue.drain()) {
        drained.push(entry);
      }
    }
    this.virtualLanes.clear();
    this.clearLaneEviction();
    for (const entry of drained) {
      if (next.mode !== "enforce") {
        this.clearEntryTimer(entry);
        this.detachAbort(entry);
        entry.payload.resolve(this.admit(entry.cost));
        continue;
      }
      // Cost above the new enforce limit must fail closed immediately, never strand until deadline.
      if (entry.cost > this.adaptation.currentLimit) {
        this.failQueued(
          entry,
          "ADMISSION_OVERSIZED",
          "request cost exceeds max budget after config update"
        );
        continue;
      }
      if (!this.queue.enqueue(entry)) {
        this.failQueued(entry, "ADMISSION_QUEUE_FULL", "queue capacity reduced");
      }
    }

    this.rebuildVirtualState(next.mode === "shadow");
    this.armWindowTimer();
    if (next.mode === "enforce") {
      this.dispatch();
    }
  }

  snapshot(): AdmissionSnapshot {
    this.sampleIntegral();
    return {
      mode: this.config.mode,
      currentLimit: this.adaptation.currentLimit,
      minLimit: this.config.minLimit,
      maxLimit: this.config.maxLimit,
      activeCost: bigintToSnapshotNumber(this.activeCost),
      activeCount: saturateSnapshotNumber(this.active.size),
      queuedCost: saturateSnapshotNumber(this.queue.totalCost),
      queuedCount: saturateSnapshotNumber(this.queue.size),
      virtualActiveCost: saturateSnapshotNumber(this.virtualActiveCost),
      virtualActiveCount: saturateSnapshotNumber(this.virtualActiveCount),
      virtualQueuedCost: saturateSnapshotNumber(this.virtualQueue.totalCost),
      virtualQueuedCount: saturateSnapshotNumber(this.virtualQueue.size),
      virtualLanes: this.config.virtualLanes === true,
      laneCount: saturateSnapshotNumber(this.virtualLanes.size),
      laneQueuedCost: saturateSnapshotNumber(this.laneTotalQueuedCost()),
      laneQueuedCount: saturateSnapshotNumber(this.laneTotalQueuedCount()),
      laneTenants: this.laneTenantSnapshot(),
      admittedCount: saturateSnapshotNumber(this.admittedCount),
      rejectedCount: saturateSnapshotNumber(this.rejectedCount),
      wouldAdmitCount: saturateSnapshotNumber(this.wouldAdmitCount),
      wouldQueueCount: saturateSnapshotNumber(this.wouldQueueCount),
      wouldRejectCount: saturateSnapshotNumber(this.wouldRejectCount),
      shortLatencyEwma: this.adaptation.shortLatencyEwma,
      longLatencyEwma: this.adaptation.longLatencyEwma,
      utilization: this.adaptation.utilization,
      pressure: this.adaptation.pressure,
      shutdown: this.shutDown,
    };
  }

  observePressure(pressure: AdmissionPressure): void {
    setPressure(this.adaptation, pressure);
    if (pressure === "critical") {
      // Immediate fast decrease once per window; window close must not re-apply it.
      if (!this.adaptation.criticalDecreaseConsumed) {
        this.adaptation.currentLimit = Math.max(
          this.config.minLimit,
          Math.floor(this.adaptation.currentLimit * this.config.adaptation.criticalDecreaseFactor)
        );
        this.adaptation.criticalDecreaseConsumed = true;
        this.dispatch();
        this.dispatchVirtual();
      }
    }
  }

  /** Deterministic window tick for tests / injected clocks. */
  tick(): void {
    this.sampleIntegral();
    this.evictIdleLanes();
    closeAdaptationWindow(this.adaptation, this.config.adaptation, this.clock.now());
    // Real queue first, then virtual: raised limits must promote shadow-queued work
    // before newer arrivals are classified against the updated budget.
    this.dispatch();
    this.dispatchVirtual();
  }

  async acquire(request: AdmissionRequest): Promise<AdmissionAcquireResult> {
    if (this.shutDown) {
      return this.reject("ADMISSION_SHUTDOWN", "admission controller is shut down");
    }

    if (request.signal?.aborted) {
      return this.reject("ADMISSION_ABORTED", "request aborted before acquire");
    }

    if (request.pressure) setPressure(this.adaptation, request.pressure);

    const cost = this.resolveCost(request);
    const mode = this.config.mode;

    if (mode === "off") {
      return this.admitVirtual(cost);
    }

    const limit = this.adaptation.currentLimit;

    if (mode === "shadow") {
      return this.acquireShadow(request, cost, limit);
    }

    // enforce
    if (cost > limit) {
      // #10111 solo-progress: the adaptive aggregate limit can collapse below an
      // individually-valid request (a slow-provider turn shrinks currentLimit via the
      // latency gradient, and no increase can fire because every path to "completed"
      // requires an admission). A request within the healthy aggregate ceiling must never
      // be terminally rejected as oversized while the system is otherwise idle — admit a
      // single bounded solo request so the pipeline keeps making progress and the limit can
      // recover. The hard per-request ceiling (maxLimit), the critical/high pressure fuse,
      // and a busy system (active/queued work present) all take precedence over solo.
      if (this.shouldAdmitSolo(cost)) {
        return this.admit(cost);
      }
      return this.reject("ADMISSION_OVERSIZED", "request cost exceeds max budget");
    }

    // Once work is queued, every newer request joins the same fair queue even if it
    // currently fits. This makes bounded bypass accounting effective and prevents
    // direct arrivals from indefinitely jumping an older reserved weighted request.
    if (this.queue.size === 0 && this.activeCost + BigInt(cost) <= BigInt(limit)) {
      return this.admit(cost);
    }

    if (!this.queue.canAccept(cost)) {
      return this.reject("ADMISSION_QUEUE_FULL", "admission queue is full");
    }

    return this.enqueue(request, cost);
  }

  shutdown(): void {
    if (this.shutDown) return;
    this.shutDown = true;
    if (this.windowTimer !== undefined) {
      this.clock.clearTimer(this.windowTimer);
      this.windowTimer = undefined;
    }
    const drained = this.queue.drain();
    for (const entry of drained) {
      this.clearEntryTimer(entry);
      this.detachAbort(entry);
      entry.payload.reject(
        createAdmissionRejectError("ADMISSION_SHUTDOWN", "admission controller shut down")
      );
      this.rejectedCount += 1;
    }
    // Drain per-tenant virtual lane queues (#9654).
    for (const [, lane] of this.virtualLanes) {
      for (const entry of lane.queue.drain()) {
        this.clearEntryTimer(entry);
        this.detachAbort(entry);
        entry.payload.reject(
          createAdmissionRejectError("ADMISSION_SHUTDOWN", "admission controller shut down")
        );
        this.rejectedCount += 1;
      }
    }
    this.virtualLanes.clear();
    this.clearLaneEviction();
  }

  /**
   * #10111: whether a request that currently exceeds the temporary aggregate limit may run
   * solo. True only when the request fits the healthy aggregate ceiling (maxLimit), the
   * system is otherwise idle (no active/queued/lane work) and pressure is normal — so an
   * individually-valid request is not terminally rejected as oversized just because a
   * latency-gradient decrease collapsed the temporary limit. Under genuine load, critical
   * pressure, or an over-ceiling request the caller falls through to the terminal reject.
   */
  private shouldAdmitSolo(cost: number): boolean {
    return (
      cost <= this.config.maxLimit &&
      this.active.size === 0 &&
      this.queue.size === 0 &&
      this.laneTotalQueuedCount() === 0 &&
      this.adaptation.pressure === "normal"
    );
  }

  private resolveCost(request: AdmissionRequest): number {
    if (request.cost !== undefined) {
      return normalizeRequestCost(request.cost, this.config.maxRequestCost);
    }
    if (request.features) {
      return estimateAdmissionCost(request.features, this.config.costConfig);
    }
    return 1;
  }

  private acquireShadow(request: AdmissionRequest, cost: number, limit: number): AdmissionAdmitted {
    let decision: ShadowDecision;
    let disposition: VirtualDisposition;
    if (cost > limit || !Number.isSafeInteger(cost)) {
      decision = "would-reject";
      disposition = "rejected";
      this.wouldRejectCount += 1;
    } else if (this.virtualActiveCost + cost <= limit) {
      decision = "would-admit";
      disposition = "active";
      this.virtualActiveCost = addSaturated(this.virtualActiveCost, cost);
      this.virtualActiveCount = addSaturated(this.virtualActiveCount, 1);
      this.wouldAdmitCount = addSaturated(this.wouldAdmitCount, 1);
    } else if (this.virtualQueue.canAccept(cost)) {
      decision = "would-queue";
      disposition = "queued";
      this.wouldQueueCount += 1;
    } else {
      decision = "would-reject";
      disposition = "rejected";
      this.wouldRejectCount += 1;
    }

    const admitted = this.admit(cost, disposition);
    if (disposition === "queued") {
      this.virtualQueue.enqueue({
        id: admitted.lease.id,
        tenantKey: request.tenantKey || "_default",
        cost,
        enqueuedAtMs: this.clock.now(),
        deadlineMs: Number.MAX_SAFE_INTEGER,
        payload: { recordId: admitted.lease.id },
      });
    }
    return { ...admitted, shadowDecision: decision };
  }

  private admitVirtual(cost: number): AdmissionAdmitted {
    // Mode off: no accounting.
    const id = nextId("lease");
    const lease: AdmissionLease = {
      id,
      cost,
      get released() {
        return true;
      },
      release: () => {
        /* no-op */
      },
    };
    this.admittedCount += 1;
    return { status: "admitted", lease };
  }

  private admit(cost: number, virtualDisposition: VirtualDisposition = "none"): AdmissionAdmitted {
    this.sampleIntegral();
    const id = nextId("lease");
    const record: ActiveLeaseRecord = {
      id,
      cost,
      released: false,
      admittedAtMs: this.clock.now(),
      virtualDisposition,
    };
    this.active.set(id, record);
    this.activeCost += BigInt(cost);
    this.admittedCount += 1;

    const controller = this;
    const lease: AdmissionLease = {
      id,
      cost,
      get released() {
        return record.released;
      },
      release(outcome: AdmissionReleaseOutcome = "success", meta?: AdmissionReleaseMeta) {
        controller.releaseLease(record, outcome, meta);
      },
    };
    return { status: "admitted", lease };
  }

  private releaseLease(
    record: ActiveLeaseRecord,
    outcome: AdmissionReleaseOutcome,
    meta?: AdmissionReleaseMeta
  ): void {
    if (record.released) return;
    record.released = true;
    // Sample while the lease still contributes to activeCost so utilization EWMA sees load.
    this.sampleIntegral();
    if (this.active.has(record.id)) {
      this.active.delete(record.id);
      this.activeCost -= BigInt(record.cost);
    }

    const latency =
      meta?.latencyMs !== undefined
        ? meta.latencyMs
        : Math.max(0, this.clock.now() - record.admittedAtMs);
    noteLatency(this.adaptation, latency, this.config.adaptation);
    noteOutcome(this.adaptation, outcome);
    this.adaptation.windowCompleted += 1;
    if (meta?.pressure) setPressure(this.adaptation, meta.pressure);
    this.releaseVirtual(record);

    this.dispatch();
  }

  private enqueue(request: AdmissionRequest, cost: number): AdmissionAcquireResult {
    const id = nextId("q");
    const maxWait = normalizeRequestCost(
      request.maxWaitMs ?? this.config.defaultMaxWaitMs,
      MAX_ADMISSION_WINDOW_MS
    );
    const now = this.clock.now();
    const deadlineMs = Math.min(Number.MAX_SAFE_INTEGER, now + maxWait);

    let settle: {
      resolve: (v: AdmissionAdmitted) => void;
      reject: (e: Error) => void;
    };
    const promise = new Promise<AdmissionAdmitted>((resolve, reject) => {
      settle = { resolve, reject };
    });

    const entry: QueueEntry<QueuedPayload> = {
      id,
      tenantKey: request.tenantKey && request.tenantKey.length > 0 ? request.tenantKey : "_default",
      cost,
      enqueuedAtMs: now,
      deadlineMs,
      payload: {
        resolve: (v) => settle.resolve(v),
        reject: (e) => settle.reject(e),
        signal: request.signal,
      },
    };

    // Per-tenant virtual admission lanes (#9654): when enabled via
    // OMNIROUTE_CHAT_VIRTUAL_LANES=1, requests with a tenantKey are enqueued into
    // a per-tenant lane queue instead of the shared queue, so one tenant's
    // burst does not 503 other sessions. Lanes are bounded by
    // ADMISSION_LANE_MAX_SESSIONS and idle-evicted after ADMISSION_LANE_TTL_MS.
    // Default: OFF — preserves the shared FairCostQueue round-robin behavior.
    if (entry.tenantKey !== "_default" && this.config.virtualLanes) {
      const lane = this.getOrCreateLane(entry.tenantKey);
      if (!lane.queue.enqueue(entry)) {
        this.removeEmptyLane(entry.tenantKey);
        return this.reject("ADMISSION_QUEUE_FULL", "admission lane queue is full");
      }
      this.armLaneEviction();
    } else if (!this.queue.enqueue(entry)) {
      return this.reject("ADMISSION_QUEUE_FULL", "admission queue is full");
    }
    this.dispatch();

    entry.timerId = this.clock.setTimer(
      () => {
        this.expireEntry(id, "ADMISSION_DEADLINE", "admission wait deadline exceeded");
      },
      Math.max(0, deadlineMs - now)
    );

    if (request.signal) {
      const onAbort = () => {
        this.expireEntry(id, "ADMISSION_ABORTED", "request aborted while queued");
      };
      entry.payload.onAbort = onAbort;
      request.signal.addEventListener("abort", onAbort, { once: true });
    }

    // Capacity may have freed between check and enqueue in concurrent hosts; try dispatch.
    this.dispatch();

    return { status: "queued", promise };
  }

  private expireEntry(id: string, code: AdmissionRejectCode, message: string): void {
    let entry = this.queue.removeById(id);
    if (!entry) {
      // Search per-tenant lane queues (#9654).
      for (const [, lane] of this.virtualLanes) {
        entry = lane.queue.removeById(id);
        if (entry) {
          this.removeEmptyLane(entry.tenantKey);
          break;
        }
      }
    }
    if (!entry) return;
    this.clearEntryTimer(entry);
    this.detachAbort(entry);
    entry.payload.reject(createAdmissionRejectError(code, message));
    this.rejectedCount += 1;
    // Resume enforce dispatch so a now-fitting successor is not stranded until
    // unrelated activity. dispatch() is a no-op after shutdown / non-enforce.
    this.dispatch();
  }

  private failQueued(
    entry: QueueEntry<QueuedPayload>,
    code: AdmissionRejectCode,
    message: string
  ): void {
    this.clearEntryTimer(entry);
    this.detachAbort(entry);
    entry.payload.reject(createAdmissionRejectError(code, message));
    this.rejectedCount += 1;
  }

  private dispatch(): void {
    if (this.shutDown || this.config.mode !== "enforce") return;
    while (this.queue.size > 0) {
      const limit = this.adaptation.currentLimit;
      const available = BigInt(limit) - this.activeCost;
      if (available <= 0n) return;
      const entry = this.queue.dequeue(Number(available));
      if (!entry) return;
      this.clearEntryTimer(entry);
      this.detachAbort(entry);
      if (entry.payload.signal?.aborted) {
        entry.payload.reject(
          createAdmissionRejectError("ADMISSION_ABORTED", "request aborted while queued")
        );
        this.rejectedCount += 1;
        continue;
      }
      if (this.clock.now() >= entry.deadlineMs) {
        entry.payload.reject(
          createAdmissionRejectError("ADMISSION_DEADLINE", "admission wait deadline exceeded")
        );
        this.rejectedCount += 1;
        continue;
      }
      entry.payload.resolve(this.admit(entry.cost));
    }
    this.dispatchLanes();
  }

  /** Round-robin dispatch across per-tenant virtual lane queues (#9654). */
  private dispatchLanes(): void {
    if (this.shutDown || this.config.mode !== "enforce") return;
    if (this.virtualLanes.size === 0) return;

    const keys = Array.from(this.virtualLanes.keys());
    for (const key of keys) {
      const lane = this.virtualLanes.get(key);
      if (!lane) continue;
      // Dispatch as many entries from this lane as capacity allows,
      // then break to give other lanes a fair share.
      while (lane.queue.size > 0) {
        const limit = this.adaptation.currentLimit;
        const available = BigInt(limit) - this.activeCost;
        if (available <= 0n) return;
        const entry = lane.queue.dequeue(Number(available));
        if (!entry) break; // head doesn't fit
        this.clearEntryTimer(entry);
        this.detachAbort(entry);
        if (entry.payload.signal?.aborted) {
          entry.payload.reject(
            createAdmissionRejectError("ADMISSION_ABORTED", "request aborted while queued")
          );
          this.rejectedCount += 1;
          continue;
        }
        if (this.clock.now() >= entry.deadlineMs) {
          entry.payload.reject(
            createAdmissionRejectError("ADMISSION_DEADLINE", "admission wait deadline exceeded")
          );
          this.rejectedCount += 1;
          continue;
        }
        entry.payload.resolve(this.admit(entry.cost));
        break; // yield to next lane for fairness
      }
      this.removeEmptyLane(key);
    }
  }

  private getOrCreateLane(tenantKey: string): {
    queue: FairCostQueue<QueuedPayload>;
    lastUsedMs: number;
  } {
    let lane = this.virtualLanes.get(tenantKey);
    if (!lane) {
      // Evict oldest lane if at capacity (LRU).
      if (this.virtualLanes.size >= ADMISSION_LANE_MAX_SESSIONS) {
        const oldestKey = this.oldestLaneKey();
        if (oldestKey) {
          this.deleteLane(oldestKey);
        }
      }
      // Per-lane queue uses the same maxQueueCount/maxQueueCost as the shared
      // queue. Total memory is bounded by ADMISSION_LANE_MAX_SESSIONS (1000)
      // × per-lane queue caps — each lane's FairCostQueue rejects when full.
      lane = {
        queue: new FairCostQueue(this.config.maxQueueCount, this.config.maxQueueCost),
        lastUsedMs: this.clock.now(),
      };
      this.virtualLanes.set(tenantKey, lane);
    }
    lane.lastUsedMs = this.clock.now();
    return lane;
  }

  private removeEmptyLane(tenantKey: string): void {
    const lane = this.virtualLanes.get(tenantKey);
    if (lane && lane.queue.size === 0) {
      this.virtualLanes.delete(tenantKey);
    }
  }

  /** Drain and reject all pending entries in a lane before removing it from the map. */
  private deleteLane(tenantKey: string): void {
    const lane = this.virtualLanes.get(tenantKey);
    if (!lane) return;
    for (const entry of lane.queue.drain()) {
      this.clearEntryTimer(entry);
      this.detachAbort(entry);
      entry.payload.reject(
        createAdmissionRejectError("ADMISSION_LANE_EVICTED", "connection lane evicted")
      );
      this.rejectedCount += 1;
    }
    this.virtualLanes.delete(tenantKey);
  }

  private oldestLaneKey(): string | undefined {
    let oldest: string | undefined;
    let oldestMs = Infinity;
    for (const [key, lane] of this.virtualLanes) {
      if (lane.lastUsedMs <= oldestMs) {
        oldestMs = lane.lastUsedMs;
        oldest = key;
      }
    }
    return oldest;
  }

  private evictIdleLanes(): void {
    const now = this.clock.now();
    const keysToDelete: string[] = [];
    for (const [key, lane] of this.virtualLanes) {
      if (now - lane.lastUsedMs >= ADMISSION_LANE_TTL_MS) {
        keysToDelete.push(key);
      }
    }
    for (const key of keysToDelete) {
      this.deleteLane(key);
    }
    if (this.virtualLanes.size > 0) {
      this.armLaneEviction();
    } else {
      this.clearLaneEviction();
    }
  }

  private armLaneEviction(): void {
    this.clearLaneEviction();
    this.laneEvictionTimer = this.clock.setTimer(
      () => this.evictIdleLanes(),
      ADMISSION_LANE_TTL_MS
    );
  }

  private clearLaneEviction(): void {
    if (this.laneEvictionTimer !== undefined) {
      this.clock.clearTimer(this.laneEvictionTimer);
      this.laneEvictionTimer = undefined;
    }
  }

  private laneTotalQueuedCost(): number {
    let total = 0;
    for (const [, lane] of this.virtualLanes) {
      total = addSaturated(total, lane.queue.totalCost);
    }
    return total;
  }

  private laneTotalQueuedCount(): number {
    let count = 0;
    for (const [, lane] of this.virtualLanes) {
      count = addSaturated(count, lane.queue.size);
    }
    return count;
  }

  private laneTenantSnapshot(): ReadonlyArray<{
    tenantKey: string;
    queuedCount: number;
    queuedCost: number;
  }> {
    const arr: { tenantKey: string; queuedCount: number; queuedCost: number }[] = [];
    for (const [tenantKey, lane] of this.virtualLanes) {
      arr.push({
        tenantKey,
        queuedCount: saturateSnapshotNumber(lane.queue.size),
        queuedCost: saturateSnapshotNumber(lane.queue.totalCost),
      });
    }
    return arr;
  }

  private releaseVirtual(record: ActiveLeaseRecord): void {
    if (record.virtualDisposition === "active") {
      this.virtualActiveCost -= record.cost;
      this.virtualActiveCount -= 1;
    } else if (record.virtualDisposition === "queued") {
      this.virtualQueue.removeById(record.id);
    }
    record.virtualDisposition = "none";
    this.dispatchVirtual();
  }

  private dispatchVirtual(): void {
    while (this.virtualQueue.size > 0) {
      const available = this.adaptation.currentLimit - this.virtualActiveCost;
      if (available <= 0) return;
      const entry = this.virtualQueue.dequeue(available);
      if (!entry) return;
      const record = this.active.get(entry.payload.recordId);
      if (!record || record.released) continue;
      record.virtualDisposition = "active";
      this.virtualActiveCost = addSaturated(this.virtualActiveCost, record.cost);
      this.virtualActiveCount = addSaturated(this.virtualActiveCount, 1);
    }
  }

  private rebuildVirtualState(enable: boolean): void {
    this.virtualQueue = new FairCostQueue(this.config.maxQueueCount, this.config.maxQueueCost);
    this.virtualActiveCost = 0;
    this.virtualActiveCount = 0;
    for (const record of this.active.values()) record.virtualDisposition = "none";
    if (!enable) return;
    for (const record of this.active.values()) {
      // Individually oversized work is virtual-rejected, never virtually queued.
      if (record.cost > this.adaptation.currentLimit) {
        record.virtualDisposition = "rejected";
        continue;
      }
      if (record.cost <= this.adaptation.currentLimit - this.virtualActiveCost) {
        record.virtualDisposition = "active";
        this.virtualActiveCost = addSaturated(this.virtualActiveCost, record.cost);
        this.virtualActiveCount = addSaturated(this.virtualActiveCount, 1);
      } else if (
        this.virtualQueue.enqueue({
          id: record.id,
          tenantKey: "_existing",
          cost: record.cost,
          enqueuedAtMs: record.admittedAtMs,
          deadlineMs: Number.MAX_SAFE_INTEGER,
          payload: { recordId: record.id },
        })
      ) {
        record.virtualDisposition = "queued";
      } else {
        record.virtualDisposition = "rejected";
      }
    }
  }

  private reject(code: AdmissionRejectCode, message: string): AdmissionAcquireResult {
    this.rejectedCount += 1;
    return { status: "rejected", code, message };
  }

  private clearEntryTimer(entry: QueueEntry<QueuedPayload>): void {
    if (entry.timerId !== undefined) {
      this.clock.clearTimer(entry.timerId);
      entry.timerId = undefined;
    }
  }

  private detachAbort(entry: QueueEntry<QueuedPayload>): void {
    if (entry.payload.signal && entry.payload.onAbort) {
      entry.payload.signal.removeEventListener("abort", entry.payload.onAbort);
      entry.payload.onAbort = undefined;
    }
  }

  private sampleIntegral(): void {
    const now = this.clock.now();
    const dt = now - this.lastSampleMs;
    if (dt > 0) {
      // Cap at currentLimit before Number conversion so shadow oversubscription never
      // feeds an unsafe rounded activeCost into the utilization integral.
      const limit = this.adaptation.currentLimit;
      const activeForIntegral = this.activeCost >= BigInt(limit) ? limit : Number(this.activeCost);
      sampleActiveIntegral(this.adaptation, activeForIntegral, dt);
      this.lastSampleMs = now;
    }
  }

  private armWindowTimer(): void {
    if (this.windowTimer !== undefined) {
      this.clock.clearTimer(this.windowTimer);
      this.windowTimer = undefined;
    }
    if (this.shutDown || this.config.mode === "off") return;
    const tick = () => {
      this.tick();
      if (!this.shutDown && this.config.mode !== "off") {
        this.windowTimer = this.clock.setTimer(tick, this.config.windowMs);
      }
    };
    this.windowTimer = this.clock.setTimer(tick, this.config.windowMs);
  }
}
