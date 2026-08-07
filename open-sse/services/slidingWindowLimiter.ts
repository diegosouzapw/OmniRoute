/**
 * Sliding-window rate limiter (free-claude-code port, Fase 8.2).
 *
 * A small, dependency-free fallback limiter for providers that do NOT expose
 * rate-limit headers (so the adaptive Bottleneck path in rateLimitManager never
 * learns a reservoir) but have a documented fixed cap. Bottleneck's reservoir is a
 * fixed-window counter that refills in one burst every interval; a true sliding
 * window enforces "no more than N requests in ANY trailing windowMs", which avoids
 * the 2× burst at window boundaries that can trip an upstream 429.
 *
 * It is intentionally a pure allowed/blocked oracle (no internal queueing) — the
 * caller decides whether to wait `retryAfterMs` or fall back. See
 * `withRateLimit` in rateLimitManager.ts for the opt-in wiring, gated on
 * PROVIDER_DEFAULT_RATE_LIMITS so existing providers are unaffected.
 */

export interface RateLimitWindow {
  /** Max requests permitted in any trailing `windowMs`. */
  requests: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

export interface AcquireResult {
  allowed: boolean;
  /** When blocked, ms until the oldest in-window hit ages out and a slot frees. 0 when allowed. */
  retryAfterMs: number;
}

export interface RateLimitScope {
  key: string;
  window: RateLimitWindow;
}

export interface SlidingWindowLease {
  /** Release a lease that was acquired but never dispatched upstream. */
  release(): void;
}

export interface MultiAcquireResult extends AcquireResult {
  lease?: SlidingWindowLease;
}

interface Hit {
  id: number;
  timestamp: number;
}

// Hard ceiling on distinct keys tracked, so a pathological key space (e.g. a
// per-request id leaking into the key) can never grow the map without bound.
const MAX_KEYS = 5000;

export class SlidingWindowLimiter {
  private readonly hits = new Map<string, Hit[]>();
  private readonly now: () => number;
  private nextHitId = 1;

  constructor(opts: { now?: () => number } = {}) {
    this.now = opts.now ?? Date.now;
  }

  /**
   * Try to consume one slot for `key`. Records a timestamp and returns
   * `{allowed:true}` when under the cap; returns `{allowed:false, retryAfterMs}`
   * (without recording) when the trailing window is saturated.
   */
  tryAcquire(key: string, window: RateLimitWindow): AcquireResult {
    const result = this.tryAcquireMany([{ key, window }]);
    return { allowed: result.allowed, retryAfterMs: result.retryAfterMs };
  }

  /**
   * Acquire all supplied scopes atomically. No scope is recorded unless every
   * configured scope has capacity, preventing a global lease from being held
   * while a narrower provider/account lease is unavailable.
   */
  tryAcquireMany(scopes: readonly RateLimitScope[]): MultiAcquireResult {
    const activeScopes = scopes.filter(({ window }) => window.requests > 0 && window.windowMs > 0);
    if (activeScopes.length === 0) return { allowed: true, retryAfterMs: 0 };

    const now = this.now();
    const prepared = activeScopes.map((scope) => {
      const cutoff = now - scope.window.windowMs;
      const previous = this.hits.get(scope.key);
      const live = previous ? previous.filter((hit) => hit.timestamp > cutoff) : [];
      const retryAfterMs =
        live.length >= scope.window.requests
          ? Math.max(0, live[0].timestamp + scope.window.windowMs - now)
          : 0;
      return { scope, live, retryAfterMs };
    });

    const retryAfterMs = prepared.reduce((max, entry) => Math.max(max, entry.retryAfterMs), 0);
    for (const entry of prepared) this.set(entry.scope.key, entry.live);
    if (retryAfterMs > 0) return { allowed: false, retryAfterMs };

    const entries = prepared.map((entry) => {
      const hit = { id: this.nextHitId++, timestamp: now };
      entry.live.push(hit);
      this.set(entry.scope.key, entry.live);
      return { key: entry.scope.key, id: hit.id };
    });

    let released = false;
    return {
      allowed: true,
      retryAfterMs: 0,
      lease: {
        release: () => {
          if (released) return;
          released = true;
          for (const entry of entries) {
            const live = this.hits.get(entry.key);
            if (!live) continue;
            const remaining = live.filter((hit) => hit.id !== entry.id);
            if (remaining.length > 0) this.hits.set(entry.key, remaining);
            else this.hits.delete(entry.key);
          }
        },
      },
    };
  }

  /** Clear history for one key, or all keys when called with no argument. */
  reset(key?: string): void {
    if (key === undefined) this.hits.clear();
    else this.hits.delete(key);
  }

  private set(key: string, live: Hit[]): void {
    if (live.length === 0) {
      this.hits.delete(key);
      return;
    }
    if (!this.hits.has(key) && this.hits.size >= MAX_KEYS) {
      // Evict the least-recently-inserted key (Map preserves insertion order).
      const oldest = this.hits.keys().next().value;
      if (oldest !== undefined) this.hits.delete(oldest);
    }
    this.hits.set(key, live);
  }
}
