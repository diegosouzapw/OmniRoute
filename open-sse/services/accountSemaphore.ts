/**
 * Hierarchical in-memory concurrency admission.
 *
 * `acquire()` preserves the account-semaphore API. `acquireMany()` admits one
 * request only when every applicable global/provider/account gate has room.
 */
export interface AccountSemaphoreKeyParts {
  provider: string;
  accountKey: string;
}

export interface AcquireAccountSemaphoreOptions {
  maxConcurrency?: number | null;
  timeoutMs?: number;
  signal?: AbortSignal | null;
  maxQueueSize?: number;
}

export interface SemaphoreRequirement {
  key: string;
  maxConcurrency?: number | null;
}

export type AcquireManyOptions = Omit<AcquireAccountSemaphoreOptions, "maxConcurrency">;

interface AcquireRequest {
  keys: string[];
  resolve: (release: () => void) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout> | null;
  signal: AbortSignal | null;
  abortListener: (() => void) | null;
  settled: boolean;
}

interface QueuedAcquire {
  request: AcquireRequest;
}

interface AccountGate {
  running: number;
  maxConcurrency: number;
  queue: QueuedAcquire[];
  blockedUntil: number | null;
  cleanupTimer: ReturnType<typeof setTimeout> | null;
}

export interface AccountSemaphoreStatsEntry {
  running: number;
  queued: number;
  maxConcurrency: number;
  blockedUntil: string | null;
}

const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_MAX_QUEUE_SIZE = 20;
const gates = new Map<string, AccountGate>();
const queuedRequests = new Set<AcquireRequest>();

export function buildAccountSemaphoreKey({
  provider,
  accountKey,
}: AccountSemaphoreKeyParts): string {
  return `${String(provider)}:${String(accountKey)}`;
}

function isBypassed(maxConcurrency?: number | null): boolean {
  return maxConcurrency == null || !Number.isFinite(maxConcurrency) || maxConcurrency <= 0;
}

function createNoopReleaseFn(): () => void {
  let released = false;
  return () => {
    if (released) return;
    released = true;
  };
}

function ensureGate(key: string, maxConcurrency: number): AccountGate {
  const existing = gates.get(key);
  if (existing) {
    existing.maxConcurrency = maxConcurrency;
    return existing;
  }
  const created: AccountGate = {
    running: 0,
    maxConcurrency,
    queue: [],
    blockedUntil: null,
    cleanupTimer: null,
  };
  gates.set(key, created);
  return created;
}

function isBlocked(gate: AccountGate): boolean {
  if (!gate.blockedUntil) return false;
  if (Date.now() >= gate.blockedUntil) {
    gate.blockedUntil = null;
    return false;
  }
  return true;
}

function clearCleanupTimer(gate: AccountGate): void {
  if (!gate.cleanupTimer) return;
  clearTimeout(gate.cleanupTimer);
  gate.cleanupTimer = null;
}

function cleanupGateIfIdle(key: string): void {
  const gate = gates.get(key);
  if (!gate || gate.running > 0 || gate.queue.length > 0 || isBlocked(gate)) return;
  clearCleanupTimer(gate);
  gates.delete(key);
}

function scheduleCleanup(key: string): void {
  const gate = gates.get(key);
  if (!gate) return;
  clearCleanupTimer(gate);
  gate.cleanupTimer = setTimeout(() => {
    gate.cleanupTimer = null;
    cleanupGateIfIdle(key);
  }, 0);
  gate.cleanupTimer.unref?.();
}

function makeAbortError(signal: AbortSignal): Error {
  if (signal.reason instanceof Error) return signal.reason;
  const error = new Error(
    typeof signal.reason === "string" ? signal.reason : "The operation was aborted"
  );
  error.name = "AbortError";
  return error;
}

function createSemaphoreError(code: string, message: string): Error & { code: string } {
  const error = new Error(message) as Error & { code: string };
  error.code = code;
  return error;
}

function removeRequest(request: AcquireRequest): void {
  queuedRequests.delete(request);
  if (request.timer) clearTimeout(request.timer);
  if (request.abortListener && request.signal) {
    request.signal.removeEventListener("abort", request.abortListener);
  }
  for (const key of request.keys) {
    const gate = gates.get(key);
    if (!gate) continue;
    const index = gate.queue.findIndex((queued) => queued.request === request);
    if (index >= 0) gate.queue.splice(index, 1);
    if (gate.running === 0 && gate.queue.length === 0) scheduleCleanup(key);
  }
}

function canAcquire(request: AcquireRequest): boolean {
  return request.keys.every((key) => {
    const gate = gates.get(key);
    return (
      gate != null &&
      !isBlocked(gate) &&
      gate.running < gate.maxConcurrency &&
      gate.queue[0]?.request === request
    );
  });
}

function createCompositeReleaseFn(keys: string[]): () => void {
  let released = false;
  return () => {
    if (released) return;
    released = true;
    for (const key of keys) {
      const gate = gates.get(key);
      if (gate && gate.running > 0) gate.running--;
    }
    drainQueues();
    for (const key of keys) {
      const gate = gates.get(key);
      if (gate && gate.running === 0 && gate.queue.length === 0) scheduleCleanup(key);
    }
  };
}

function drainQueues(): void {
  let progressed = true;
  while (progressed) {
    progressed = false;
    for (const request of queuedRequests) {
      if (request.settled || !canAcquire(request)) continue;
      request.settled = true;
      removeRequest(request);
      for (const key of request.keys) gates.get(key)!.running++;
      request.resolve(createCompositeReleaseFn(request.keys));
      progressed = true;
      break;
    }
  }
}

export function acquire(
  key: string,
  {
    maxConcurrency = null,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    signal = null,
    maxQueueSize = DEFAULT_MAX_QUEUE_SIZE,
  }: AcquireAccountSemaphoreOptions = {}
): Promise<() => void> {
  return acquireMany([{ key, maxConcurrency }], { timeoutMs, signal, maxQueueSize });
}

/**
 * Acquire all enabled requirements as one FIFO reservation.
 *
 * Waiting never increments any gate, preventing a saturated child gate from
 * holding capacity in a parent gate.
 */
export function acquireMany(
  requirements: SemaphoreRequirement[],
  {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    signal = null,
    maxQueueSize = DEFAULT_MAX_QUEUE_SIZE,
  }: AcquireManyOptions = {}
): Promise<() => void> {
  const enabled = new Map<string, number>();
  for (const requirement of requirements) {
    if (isBypassed(requirement.maxConcurrency)) continue;
    const limit = Math.trunc(requirement.maxConcurrency as number);
    enabled.set(requirement.key, Math.min(enabled.get(requirement.key) ?? limit, limit));
  }
  if (enabled.size === 0) return Promise.resolve(createNoopReleaseFn());
  if (signal?.aborted) return Promise.reject(makeAbortError(signal));

  const keys = [...enabled.keys()].sort();
  for (const key of keys) {
    const gate = ensureGate(key, enabled.get(key)!);
    clearCleanupTimer(gate);
  }

  const canAcquireImmediately = keys.every((key) => {
    const gate = gates.get(key)!;
    return gate.queue.length === 0 && gate.running < gate.maxConcurrency && !isBlocked(gate);
  });
  if (canAcquireImmediately) {
    for (const key of keys) gates.get(key)!.running++;
    return Promise.resolve(createCompositeReleaseFn(keys));
  }

  if (maxQueueSize >= 0) {
    for (const key of keys) {
      const gate = gates.get(key)!;
      if (gate.queue.length >= maxQueueSize) {
        return Promise.reject(
          createSemaphoreError(
            "SEMAPHORE_QUEUE_FULL",
            `Semaphore queue full (${maxQueueSize}) for ${key}`
          )
        );
      }
    }
  }

  return new Promise((resolve, reject) => {
    const request: AcquireRequest = {
      keys,
      resolve,
      reject,
      timer: null,
      signal,
      abortListener: null,
      settled: false,
    };
    request.timer = setTimeout(() => {
      if (request.settled) return;
      request.settled = true;
      removeRequest(request);
      reject(
        createSemaphoreError(
          "SEMAPHORE_TIMEOUT",
          `Semaphore timeout after ${timeoutMs}ms for ${keys.join(",")}`
        )
      );
      drainQueues();
    }, timeoutMs);
    request.timer.unref?.();
    if (signal) {
      request.abortListener = () => {
        if (request.settled) return;
        request.settled = true;
        removeRequest(request);
        reject(makeAbortError(signal));
        drainQueues();
      };
      signal.addEventListener("abort", request.abortListener, { once: true });
    }
    queuedRequests.add(request);
    for (const key of keys) gates.get(key)!.queue.push({ request });
    drainQueues();
  });
}

export function markBlocked(key: string, until: Date | string | number): void {
  const untilMs =
    until instanceof Date
      ? until.getTime()
      : typeof until === "number"
        ? Date.now() + Math.max(0, until)
        : new Date(until).getTime();
  if (!Number.isFinite(untilMs) || untilMs <= Date.now()) return;
  const gate = ensureGate(key, gates.get(key)?.maxConcurrency ?? 1);
  clearCleanupTimer(gate);
  gate.blockedUntil = untilMs;
}

export function unblock(key: string): void {
  const gate = gates.get(key);
  if (!gate) return;
  gate.blockedUntil = null;
  drainQueues();
  cleanupGateIfIdle(key);
}

export function getStats(): Record<string, AccountSemaphoreStatsEntry> {
  const stats: Record<string, AccountSemaphoreStatsEntry> = {};
  for (const [key, gate] of gates) {
    stats[key] = {
      running: gate.running,
      queued: gate.queue.length,
      maxConcurrency: gate.maxConcurrency,
      blockedUntil: gate.blockedUntil ? new Date(gate.blockedUntil).toISOString() : null,
    };
  }
  return stats;
}

export function isAccountSemaphoreFull(
  provider: string,
  accountKey: string,
  maxConcurrency?: number | null
): boolean {
  if (isBypassed(maxConcurrency)) return false;
  const gate = gates.get(buildAccountSemaphoreKey({ provider, accountKey }));
  if (!gate) return false;
  const effectiveCap = maxConcurrency ?? gate.maxConcurrency;
  return !isBypassed(effectiveCap) && (gate.running >= effectiveCap || isBlocked(gate));
}

export function reset(key: string): void {
  const gate = gates.get(key);
  if (!gate) return;
  clearCleanupTimer(gate);
  const error = createSemaphoreError("SEMAPHORE_RESET", `Semaphore reset for ${key}`);
  const rejections: AcquireRequest[] = [];
  for (const queued of [...gate.queue]) {
    const request = queued.request;
    if (request.settled) continue;
    request.settled = true;
    removeRequest(request);
    rejections.push(request);
  }
  gates.delete(key);
  for (const request of rejections) request.reject(error);
  drainQueues();
}

export function resetAll(): void {
  const error = createSemaphoreError("SEMAPHORE_RESET", "Semaphore reset");
  const rejections: AcquireRequest[] = [];
  for (const request of [...queuedRequests]) {
    if (request.settled) continue;
    request.settled = true;
    removeRequest(request);
    rejections.push(request);
  }
  for (const gate of gates.values()) clearCleanupTimer(gate);
  gates.clear();
  queuedRequests.clear();
  for (const request of rejections) request.reject(error);
}
