/**
 * Learned Limit Store — Persistence for rate-limit learning.
 *
 * Extracted from `rateLimitManager.ts` so the pure read/write math is
 * testable without spinning up the bottleneck orchestrator. Owns:
 *   - The in-memory ring of `LearnedLimitEntry` (provider × connection)
 *   - The 60s debounce of `persistLearnedLimits` writes
 *   - The async persistence path (DB or Keyv)
 *
 * @see open-sse/services/rateLimitManager.ts for the orchestrator that
 *      consumes this store.
 */

export interface LearnedLimitEntry {
  provider: string;
  connectionId: string;
  lastUpdated: number;
  limit?: number;
  remaining?: number;
  minTime?: number;
}

export interface LearnedLimitSink {
  /** Persist the JSON-encoded entries blob. Should be cheap & non-throwing. */
  saveLearnedLimits: (json: string) => Promise<void> | void;
  /** Load a previously persisted JSON blob (or null if none). */
  loadLearnedLimits: () => Promise<string | null> | string | null;
}

export const MAX_LEARNED_LIMITS = 200;
export const PERSIST_DEBOUNCE_MS = 60_000;
export const INACTIVE_LIMITER_MS = 24 * 60 * 60 * 1000; // 24h

/**
 * A pure helper: clamp `remaining` to `[0, limit]` and drop NaN/negative
 * numerics so we never persist bad data that the orchestrator will
 * trust on next restart.
 */
export function clampLearnedLimit(input: {
  limit?: number;
  remaining?: number;
}): { limit?: number; remaining?: number } {
  const out: { limit?: number; remaining?: number } = {};
  if (typeof input.limit === "number" && Number.isFinite(input.limit) && input.limit > 0) {
    out.limit = input.limit;
  }
  if (typeof input.remaining === "number" && Number.isFinite(input.remaining) && input.remaining >= 0) {
    out.remaining = Math.min(input.remaining, out.limit ?? input.remaining);
  }
  return out;
}

type LoggerLike = { debug: (...args: unknown[]) => void; error: (...args: unknown[]) => void };

/**
 * The store class. Designed to be a singleton inside the rate-limit
 * module — instantiate once, share across providers.
 */
export class LearnedLimitStore {
  private entries = new Map<string, LearnedLimitEntry>();
  private persistTimer: NodeJS.Timeout | null = null;
  private pendingAsyncOperations = new Set<Promise<unknown>>();
  private hydrated = false;

  constructor(
    private readonly sink: LearnedLimitSink,
    private readonly logger: LoggerLike,
    private readonly opts: { maxEntries?: number; debounceMs?: number } = {},
  ) {}

  /** Test seam: clear the in-memory state without touching the sink. */
  __resetForTests(): void {
    this.entries.clear();
    if (this.persistTimer) {
      clearTimeout(this.persistTimer);
      this.persistTimer = null;
    }
    this.pendingAsyncOperations.clear();
    this.hydrated = false;
  }

  /** Read-only snapshot — defensive copy. */
  getLearnedLimits(): LearnedLimitEntry[] {
    return Array.from(this.entries.values()).map((e) => ({ ...e }));
  }

  /**
   * Upsert an entry. The `key` defaults to `${provider}::${connectionId}`.
   * Non-positive limit/remaining are silently dropped (clampLearnedLimit).
   */
  recordLearnedLimit(provider: string, connectionId: string, partial: Partial<Omit<LearnedLimitEntry, "provider" | "connectionId" | "lastUpdated">>): void {
    const clamped = clampLearnedLimit({ limit: partial.limit, remaining: partial.remaining });
    const next: LearnedLimitEntry = {
      provider,
      connectionId,
      lastUpdated: Date.now(),
      ...(clamped.limit !== undefined ? { limit: clamped.limit } : {}),
      ...(clamped.remaining !== undefined ? { remaining: clamped.remaining } : {}),
      ...(typeof partial.minTime === "number" && Number.isFinite(partial.minTime) ? { minTime: partial.minTime } : {}),
    };
    this.entries.set(`${provider}::${connectionId}`, next);
    this.evictIfOverCapacity();
    this.schedulePersist();
  }

  /** Hydrate from the sink. Idempotent. */
  async hydrate(): Promise<void> {
    if (this.hydrated) return;
    this.hydrated = true;
    try {
      const raw = await this.sink.loadLearnedLimits();
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      for (const row of parsed) {
        if (!row || typeof row !== "object") continue;
        const r = row as Record<string, unknown>;
        const provider = typeof r.provider === "string" ? r.provider : null;
        const connectionId = typeof r.connectionId === "string" ? r.connectionId : null;
        if (!provider || !connectionId) continue;
        const limit = typeof r.limit === "number" ? r.limit : undefined;
        const remaining = typeof r.remaining === "number" ? r.remaining : undefined;
        const minTime = typeof r.minTime === "number" ? r.minTime : undefined;
        const lastUpdated = typeof r.lastUpdated === "number" ? r.lastUpdated : Date.now();
        this.entries.set(`${provider}::${connectionId}`, {
          provider,
          connectionId,
          lastUpdated,
          ...(limit !== undefined ? { limit } : {}),
          ...(remaining !== undefined ? { remaining } : {}),
          ...(minTime !== undefined ? { minTime } : {}),
        });
      }
      this.evictIfOverCapacity();
    } catch (err) {
      this.logger.error("[learnedLimitStore] hydrate failed", err);
    }
  }

  /** Flush immediately (used at process shutdown or test teardown). */
  async flush(): Promise<void> {
    if (this.persistTimer) {
      clearTimeout(this.persistTimer);
      this.persistTimer = null;
    }
    await this.persistNow();
  }

  /** Public for the orchestrator's existing `__resetRateLimitManagerForTests`. */
  __flushForTests(): Promise<void> {
    return this.flush();
  }

  /** Read-only access to the async write pool (for graceful shutdown). */
  __pendingAsyncOperationsForTests(): ReadonlySet<Promise<unknown>> {
    return this.pendingAsyncOperations;
  }

  private evictIfOverCapacity(): void {
    const max = this.opts.maxEntries ?? MAX_LEARNED_LIMITS;
    if (this.entries.size <= max) return;
    const sorted = Array.from(this.entries.values()).sort((a, b) => a.lastUpdated - b.lastUpdated);
    const overflow = this.entries.size - max;
    for (let i = 0; i < overflow; i++) {
      const victim = sorted[i];
      if (victim) this.entries.delete(`${victim.provider}::${victim.connectionId}`);
    }
  }

  private schedulePersist(): void {
    if (this.persistTimer) return;
    this.persistTimer = setTimeout(() => {
      this.persistTimer = null;
      void this.persistNow();
    }, this.opts.debounceMs ?? PERSIST_DEBOUNCE_MS);
  }

  private async persistNow(): Promise<void> {
    const snapshot = JSON.stringify(this.getLearnedLimits());
    const op = Promise.resolve(this.sink.saveLearnedLimits(snapshot)).catch((err) => {
      this.logger.error("[learnedLimitStore] save failed", err);
    });
    this.pendingAsyncOperations.add(op);
    try {
      await op;
    } finally {
      this.pendingAsyncOperations.delete(op);
    }
  }
}

/** JSON helpers — exposed so the orchestrator can `JSON.parse(hydrate())`. */
export const learnedLimitsJsonCodec = {
  encode: (entries: LearnedLimitEntry[]): string => JSON.stringify(entries),
  decode: (raw: string): LearnedLimitEntry[] => {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((e): e is LearnedLimitEntry =>
      !!e && typeof e === "object" && typeof (e as LearnedLimitEntry).provider === "string" && typeof (e as LearnedLimitEntry).connectionId === "string",
    );
  },
};
