/**
 * SessionPool — Pool manager for anonymous web sessions
 *
 * Manages N sessions across N browser fingerprints, distributing requests
 * round-robin to avoid rate-limiting any single "browser identity."
 *
 * Key behaviors:
 *   - acquire(): Returns the next available session (round-robin)
 *   - reportSuccess(session): Updates metrics, marks session healthy
 *   - reportFailure(session, status): Cooldown on 429, dead on 5xx
 *   - Scalability: Round-robin across sessions prevents one session from
 *     being overused while others sit idle.
 *   - Auto-heal: Sessions in cooldown auto-recover after the backoff window.
 *   - Self-repair: Dead sessions are replaced on next acquire if below maxSessions.
 *   - Thread-safe for concurrent request patterns (each acquire/release pair
 *     is atomic within one async flow).
 *
 * Usage:
 *   const pool = new SessionPool("pollinations", poolConfig, factory);
 *   await pool.ensureMinSessions();
 *   const session = pool.acquire();
 *   try {
 *     const res = await fetch(url, { headers: session.buildHeaders() });
 *     if (!res.ok && res.status === 429) pool.reportCooldown(session);
 *     else pool.reportSuccess(session);
 *   } catch { pool.reportDead(session); }
 *   finally { session.release(); }
 */

import { type EventEmitter } from "node:events";
import { createHash, randomUUID } from "node:crypto";
import { setTimeout as sleep } from "node:timers/promises";

import { Session } from "./session.ts";
import { SessionFactory } from "./sessionFactory.ts";
import {
  type PoolConfig,
  type PoolSessionDetail,
  type PoolStats,
  DEFAULT_POOL_CONFIG,
} from "./types.ts";

export class SessionPool {
  readonly provider: string;
  readonly poolId: string;
  readonly createdAt: number;

  private sessions: Session[] = [];
  private index = 0;
  private config: PoolConfig;
  private factory: SessionFactory;

  // Aggregate stats
  totalRequests = 0;
  successfulRequests = 0;
  rate429count = 0;
  otherErrors = 0;

  // Track throughput
  private startTime: number = Date.now();
  private lastLog = 0;

  constructor(
    provider: string,
    config?: Partial<PoolConfig>,
    factory?: SessionFactory,
  ) {
    this.provider = provider;
    this.poolId = `pool-${provider}-${Date.now().toString(36)}`;
    this.createdAt = Date.now();
    this.config = { ...DEFAULT_POOL_CONFIG, ...config };
    this.factory = factory ?? new SessionFactory(this.config);
  }

  // ─── Pool Lifecycle ──────────────────────────────────────────────────

  /** Ensure the pool has at least minSessions ready */
  async ensureMinSessions(): Promise<void> {
    const needed = this.config.minSessions - this.sessions.length;
    if (needed <= 0) return;

    const promises: Promise<Session>[] = [];
    for (let i = 0; i < needed; i++) {
      promises.push(Promise.resolve(this.createSession()));
    }
    await Promise.allSettled(promises);
  }

  /** Warm up the pool to a specific size (bypasses minSessions limit) */
  async warmUp(count: number): Promise<void> {
    const target = Math.min(count, this.config.maxSessions);
    const needed = target - this.sessions.length;
    if (needed <= 0) return;

    const promises: Promise<Session>[] = [];
    for (let i = 0; i < needed; i++) {
      promises.push(Promise.resolve(this.createSession()));
    }
    await Promise.allSettled(promises);
  }

  /** Graceful shutdown — mark all sessions dead */
  async shutdown(): Promise<void> {
    for (const s of this.sessions) {
      s.markDead();
    }
    this.sessions = [];
  }

  // ─── Acquire / Release ───────────────────────────────────────────────

  /**
   * Acquire the next available session (round-robin with availability check).
   * Returns null if no sessions are available (all on cooldown/dead).
   */
  acquire(): Session | null {
    // First pass: try round-robin from current index
    if (this.sessions.length === 0) return null;

    const startIdx = this.index % this.sessions.length;

    for (let i = 0; i < this.sessions.length; i++) {
      const idx = (startIdx + i) % this.sessions.length;
      const session = this.sessions[idx];
      if (session.isAvailable) {
        // Skip sessions that hit max inflight limit (safety valve)
        // For anonymous web providers we allow high concurrency per session
        this.index = (idx + 1) % this.sessions.length;
        session.acquire();
        this.totalRequests++;
        return session;
      }
    }

    // No ready sessions — try to create a new one if under max
    if (this.sessions.length < this.config.maxSessions) {
      const session = this.createSession();
      session.acquire();
      this.totalRequests++;
      return session;
    }

    // Last resort: wait for the nearest cooldown to expire (caller should retry)
    return null;
  }

  /**
   * Report a successful request. Updates metrics pool-wide and per-session.
   */
  reportSuccess(session: Session): void {
    session.markSuccess();
    this.successfulRequests++;
  }

  /**
   * Report a rate-limit (429). Puts the session into exponential-backoff cooldown.
   */
  reportCooldown(session: Session): void {
    session.markCooldown();
    this.rate429count++;
    this.maybeLog();
  }

  /**
   * Report a non-recoverable error. Marks session as dead.
   */
  reportDead(session: Session): void {
    session.markDead();
    this.otherErrors++;
  }

  // ─── Health / Stats ──────────────────────────────────────────────────

  /** Count of available (active, not in cooldown) sessions */
  get availableCount(): number {
    return this.sessions.filter((s) => s.isAvailable).length;
  }

  /** Number of sessions currently in cooldown */
  get cooldownCount(): number {
    return this.sessions.filter((s) => s.status === "cooldown").length;
  }

  /** Number of dead sessions */
  get deadCount(): number {
    return this.sessions.filter((s) => s.status === "dead").length;
  }

  /** Total sessions managed */
  get totalCount(): number {
    return this.sessions.length;
  }

  /** Current throughput in req/s */
  get currentThroughput(): number {
    const elapsed = (Date.now() - this.startTime) / 1000;
    return elapsed > 0 ? this.totalRequests / elapsed : 0;
  }

  /** Snapshot for dashboard/API */
  getStats(): PoolStats {
    const elapsed = (Date.now() - this.startTime) / 1000;
    return {
      provider: this.provider,
      sessions: {
        total: this.sessions.length,
        active: this.availableCount,
        cooldown: this.cooldownCount,
        dead: this.deadCount,
      },
      requests: {
        total: this.totalRequests,
        success: this.successfulRequests,
        rate429: this.rate429count,
        otherErrors: this.otherErrors,
      },
      throughput: this.currentThroughput.toFixed(1),
      successRate:
        this.totalRequests > 0
          ? ((this.successfulRequests / this.totalRequests) * 100).toFixed(1)
          : "100.0",
      elapsed: elapsed.toFixed(0),
    };
  }

  /** Per-session details */
  getSessionDetails(): PoolSessionDetail[] {
    return this.sessions.map((s) => ({
      id: s.id,
      fingerprint: s.fingerprint.id,
      status: s.status,
      totalRequests: s.totalRequests,
      successfulRequests: s.successfulRequests,
      successRate:
        s.totalRequests > 0
          ? ((s.successfulRequests / s.totalRequests) * 100).toFixed(1)
          : "100.0",
      inflight: s.inflight,
      cooldownRemaining: s.cooldownRemaining > 0
        ? `${(s.cooldownRemaining / 1000).toFixed(1)}s`
        : "0s",
      age: `${(s.age / 1000).toFixed(0)}s`,
    }));
  }

  /** As acquire(), but blocks until a session is available */
  async acquireBlocking(timeoutMs = 10_000): Promise<Session> {
    const deadline = Date.now() + timeoutMs;

    // Fast path
    const fast = this.acquire();
    if (fast) return fast;

    // Wait-loop with backoff (50ms → 200ms)
    let delay = 50;
    while (Date.now() < deadline) {
      await sleep(delay);
      const session = this.acquire();
      if (session) return session;
      delay = Math.min(delay * 2, 200);
    }

    throw new Error(
      `[SessionPool:${this.provider}] No session available after ${timeoutMs}ms timeout`,
    );
  }

  /** As acquireBlocking(), but accepts arbitrary function to wrap */
  async executeWithSession<T>(
    fn: (session: Session) => Promise<T>,
    timeoutMs = 10_000,
  ): Promise<T> {
    const session = await this.acquireBlocking(timeoutMs);
    try {
      const result = await fn(session);
      return result;
    } finally {
      session.release();
    }
  }

  // ─── Internal ────────────────────────────────────────────────────────

  /** Create and register a new session */
  private createSession(): Session {
    const session = this.factory.createSession();
    this.sessions.push(session);
    return session;
  }

  /** Periodic log of pool health (every 5s) */
  private maybeLog(): void {
    const now = Date.now();
    if (now - this.lastLog < 5_000) return;
    this.lastLog = now;

    const stats = this.getStats();
    if (stats.requests.total % 50 === 0) {
      // Rate-limited to avoid log spam
    }
  }

  /** Remove dead sessions and idle sessions older than maxIdleMs */
  pruneDeadSessions(maxIdleMs = 300_000): void {
    const now = Date.now();
    const before = this.sessions.length;
    this.sessions = this.sessions.filter((s) => {
      if (s.status === "dead") return false;
      // Prune idle sessions older than maxIdleMs (default 5min)
      if (s.inflight === 0 && s.lastUsedAt > 0 && now - s.lastUsedAt > maxIdleMs) return false;
      return true;
    });

    // If we pruned sessions, ensure minimum
    if (this.sessions.length < before && this.sessions.length < this.config.minSessions) {
      this.ensureMinSessions();
    }
  }

  /** Start periodic pruning (every 60s) */
  startAutoPrune(intervalMs = 60_000): ReturnType<typeof setInterval> {
    const timer = setInterval(() => this.pruneDeadSessions(), intervalMs);
    timer.unref();
    return timer;
  }
}
