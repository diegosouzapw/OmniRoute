/**
 * SystemLoadAdapter — Bridge between the management agent (Rust sidecar)
 * and the EWMA-enhanced P2C routing strategy.
 *
 * Fetches raw system metrics from the management agent (default port 9099),
 * computes composite health scores, and caches results for a configurable TTL.
 * Provides both local and remote node health score retrieval.
 *
 * @module open-sse/services/combo/systemLoadAdapter
 */

// ──────────────────────────────────────────────
//  Types
// ──────────────────────────────────────────────

/** Raw system metrics collected by the management agent. */
export interface SystemMetrics {
  cpu: {
    utilizationPct: number;
    loadAvg1m: number;
    loadAvg5m: number;
    loadAvg15m: number;
    contextSwitches: number;
    procsRunning: number;
    procsBlocked: number;
  };
  memory: {
    totalBytes: number;
    availableBytes: number;
    usedBytes: number;
    swapTotalBytes: number;
    swapUsedBytes: number;
    cachedBytes: number;
    buffersBytes: number;
  };
  io: {
    readBytesPerSec: number;
    writeBytesPerSec: number;
    iopsRead: number;
    iopsWrite: number;
    ioWaitPct: number;
    avgQueueDepth: number;
  };
  network: {
    rxBytesPerSec: number;
    txBytesPerSec: number;
    rxPacketsPerSec: number;
    txPacketsPerSec: number;
    rxDroppedPerSec: number;
    txDroppedPerSec: number;
    tcpConnectionsEstablished: number;
  };
  gpu?: {
    utilizationPct: number;
    memoryUsedMib: number;
    memoryTotalMib: number;
    temperatureC: number;
    powerDrawWatts: number;
    pcieBandwidthUtil: number;
  };
  process: {
    memoryRssBytes: number;
    cpuPercent: number;
    openFds: number;
    threadCount: number;
  };
}

/** Individual component health scores, each in [0.0, 1.0]. */
export interface HealthComponents {
  cpu: number;
  memory: number;
  io: number;
  network: number;
  gpu: number;
  requests: number;
}

/** Composite health score with component breakdown. */
export interface CompositeHealthScore {
  /** Weighted composite score in [0.0, 1.0]. */
  score: number;
  /** Individual component scores. */
  components: HealthComponents;
  /** Timestamp (ms epoch) when this score was computed. */
  timestamp: number;
}

/** Configuration for the SystemLoadAdapter. */
export interface SystemLoadAdapterConfig {
  /** Base URL of the management agent, e.g. "http://localhost:9099". */
  agentBaseUrl: string;
  /** Cache TTL in milliseconds. Default 2000. */
  cacheTtlMs: number;
  /** Maximum concurrent requests for request health computation. Default 100. */
  maxConcurrent: number;
  /** Weights for the composite score computation. */
  weights: {
    cpu: number;
    memory: number;
    io: number;
    network: number;
    gpu: number;
    requests: number;
  };
}

// ──────────────────────────────────────────────
//  Defaults
// ──────────────────────────────────────────────

const DEFAULT_CONFIG: SystemLoadAdapterConfig = {
  agentBaseUrl: "http://localhost:9099",
  cacheTtlMs: 2000,
  maxConcurrent: 100,
  weights: {
    cpu: 0.25,
    memory: 0.20,
    io: 0.10,
    network: 0.10,
    gpu: 0.15,
    requests: 0.20,
  },
};

// ──────────────────────────────────────────────
//  Internal Cache Types
// ──────────────────────────────────────────────

interface CacheEntry {
  score: CompositeHealthScore;
  createdAt: number;
}

// ──────────────────────────────────────────────
//  Helpers
// ──────────────────────────────────────────────

/**
 * Safely clamp a value to [0, 1].
 * Returns 0 for NaN, Infinity, or -Infinity.
 */
function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

/**
 * Safely coerce a value to a finite number.
 * Returns `fallback` if the value is not a finite number.
 */
function safeFinite(value: unknown, fallback: number): number {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

// ──────────────────────────────────────────────
//  SystemLoadAdapter
// ──────────────────────────────────────────────

/**
 * SystemLoadAdapter computes composite health scores from system metrics
 * and caches them for TTL duration. Bridges the management agent (Rust sidecar)
 * with the EWMA-enhanced P2C routing strategy.
 */
export class SystemLoadAdapter {
  private config: SystemLoadAdapterConfig;
  private cache: Map<string, CacheEntry>;
  private cacheHits = 0;
  private cacheMisses = 0;

  constructor(config?: Partial<SystemLoadAdapterConfig>) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
      weights: config?.weights
        ? { ...DEFAULT_CONFIG.weights, ...config.weights }
        : DEFAULT_CONFIG.weights,
    };
    this.cache = new Map();
  }

  // ── Public API ────────────────────────────

  /**
   * Fetch local system metrics from the management agent and compute health score.
   *
   * GETs `${agentBaseUrl}/system-load`, expects a `SystemMetrics` JSON body.
   * Caches the result for `cacheTtlMs`. On fetch error, returns a stale cache
   * entry if available, otherwise re-throws the error.
   */
  async getLocalHealthScore(): Promise<CompositeHealthScore> {
    const cacheKey = "local";
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    try {
      const url = `${this.config.agentBaseUrl}/system-load`;
      const response = await fetch(url, {
        signal: AbortSignal.timeout(5_000),
      });

      if (!response.ok) {
        throw new Error(
          `Agent returned ${response.status}: ${response.statusText} for GET /system-load`
        );
      }

      const body = await response.json();
      if (!body || typeof body !== "object" || !body.cpu) {
        throw new TypeError("Malformed /system-load response: missing SystemMetrics fields");
      }
      const metrics = body as SystemMetrics;
      const score = this.computeScore(metrics);
      this.setCache(cacheKey, score);
      return score;
    } catch (err) {
      const stale = this.getStale(cacheKey);
      if (stale) return stale;
      throw err;
    }
  }

  /**
   * Fetch a specific node's health from the management plane.
   *
   * GETs `${agentBaseUrl}/health-score/${nodeId}`, expects a pre-computed
   * `CompositeHealthScore` JSON body. Caches per nodeId.
   */
  async getRemoteHealthScore(nodeId: string): Promise<CompositeHealthScore> {
    const cacheKey = `node:${nodeId}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    try {
      const url = `${this.config.agentBaseUrl}/health-score/${encodeURIComponent(nodeId)}`;
      const response = await fetch(url, {
        signal: AbortSignal.timeout(5_000),
      });

      if (!response.ok) {
        throw new Error(
          `Agent returned ${response.status}: ${response.statusText} for GET /health-score/${nodeId}`
        );
      }

      const body = await response.json();
      if (!body || typeof body !== "object" || typeof body.score !== "number") {
        throw new TypeError("Malformed /health-score response: missing score field");
      }
      const score = body as CompositeHealthScore;
      this.setCache(cacheKey, score);
      return score;
    } catch (err) {
      const stale = this.getStale(cacheKey);
      if (stale) return stale;
      throw err;
    }
  }

  /**
   * Fetch multiple remote nodes' health scores in batch.
   *
   * POSTs to `${agentBaseUrl}/health-scores/batch` with JSON body
   * `{ nodeIds: string[] }`, expects `Record<string, CompositeHealthScore>`.
   * Checks cache first for each node; fetches only uncached (or expired) IDs.
   */
  async batchGetRemoteHealthScores(
    nodeIds: string[]
  ): Promise<Map<string, CompositeHealthScore>> {
    const results = new Map<string, CompositeHealthScore>();
    const uncachedIds: string[] = [];

    for (const nodeId of nodeIds) {
      const cacheKey = `node:${nodeId}`;
      const cached = this.getCached(cacheKey);
      if (cached) {
        results.set(nodeId, cached);
      } else {
        uncachedIds.push(nodeId);
      }
    }

    if (uncachedIds.length === 0) return results;

    try {
      const url = `${this.config.agentBaseUrl}/health-scores/batch`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodeIds: uncachedIds }),
        signal: AbortSignal.timeout(5_000),
      });

      if (!response.ok) {
        throw new Error(
          `Agent returned ${response.status}: ${response.statusText} for POST /health-scores/batch`
        );
      }

      const body = await response.json();
      if (!body || typeof body !== "object") {
        throw new TypeError("Malformed /health-scores/batch response");
      }
      const batch = body as Record<string, CompositeHealthScore>;

      for (const [nodeId, score] of Object.entries(batch)) {
        this.setCache(`node:${nodeId}`, score);
        results.set(nodeId, score);
      }

      return results;
    } catch (err) {
      // On batch fetch error, try stale cache for the uncached nodes
      let staleFound = false;
      for (const nodeId of uncachedIds) {
        if (results.has(nodeId)) continue;
        const stale = this.getStale(`node:${nodeId}`);
        if (stale) {
          results.set(nodeId, stale);
          staleFound = true;
        }
      }

      if (results.size > 0) return results;

      throw err;
    }
  }

  /**
   * Compute a composite health score from raw system metrics.
   *
   * Component scores are each in [0.0, 1.0], computed as:
   *   cpu:     1 - clamp(utilizationPct / 100)
   *   memory:  clamp(availableBytes / totalBytes)
   *   io:      1 - clamp(ioWaitPct / 50)
   *   network: 1 - clamp(rxDroppedPerSec / max(rxPacketsPerSec, 1))
   *   gpu:     gpu present ? 1 - clamp(utilizationPct / 100) : 1.0
   *   requests: activeRequests provided ? 1 - clamp(activeRequests / maxConcurrent) : 1.0
   *
   * Composite is the weighted sum of all component scores, clamped to [0, 1].
   */
  computeScore(metrics: SystemMetrics, activeRequests?: number): CompositeHealthScore {
    const cpu = 1 - clamp01(safeFinite(metrics.cpu.utilizationPct, 100) / 100);

    const totalBytes = safeFinite(metrics.memory.totalBytes, 1);
    const availableBytes = safeFinite(metrics.memory.availableBytes, 0);
    const memory = totalBytes > 0 ? clamp01(availableBytes / totalBytes) : 0;

    const io = 1 - clamp01(safeFinite(metrics.io.ioWaitPct, 100) / 50);

    const rxPacketsPerSec = Math.max(safeFinite(metrics.network.rxPacketsPerSec, 1), 1);
    const rxDropped = safeFinite(metrics.network.rxDroppedPerSec, 0);
    const dropRate = rxDropped / rxPacketsPerSec;
    const network = 1 - clamp01(dropRate / 0.05);

    const gpu = metrics.gpu
      ? 1 - clamp01(safeFinite(metrics.gpu.utilizationPct, 100) / 100)
      : 1.0;

    const requests =
      activeRequests !== undefined
        ? 1 - clamp01(activeRequests / this.config.maxConcurrent)
        : 1.0;

    const components: HealthComponents = { cpu, memory, io, network, gpu, requests };
    const { weights } = this.config;

    const score = clamp01(
      weights.cpu * cpu +
        weights.memory * memory +
        weights.io * io +
        weights.network * network +
        weights.gpu * gpu +
        weights.requests * requests
    );

    return { score, components, timestamp: Date.now() };
  }

  /** Clear all cached health scores. */
  clearCache(): void {
    this.cache.clear();
  }

  /** Get cache statistics (size, hits, misses, hit rate). */
  getCacheStats(): { size: number; hits: number; misses: number; hitRate: number } {
    const total = this.cacheHits + this.cacheMisses;
    return {
      size: this.cache.size,
      hits: this.cacheHits,
      misses: this.cacheMisses,
      hitRate: total > 0 ? this.cacheHits / total : 0,
    };
  }

  // ── Private Cache Helpers ─────────────────

  /**
   * Return a cached score if it exists and has not expired.
   * Increments hits or misses accordingly.
   */
  private getCached(key: string): CompositeHealthScore | null {
    const entry = this.cache.get(key);
    if (!entry) {
      this.cacheMisses++;
      return null;
    }
    if (Date.now() - entry.createdAt < this.config.cacheTtlMs) {
      this.cacheHits++;
      return entry.score;
    }
    // Entry expired — keep it for stale fallback but count as miss
    this.cacheMisses++;
    return null;
  }

  /**
   * Return a stale (possibly expired) cache entry for the given key.
   * Used as a fallback when the management agent is unreachable.
   */
  private getStale(key: string): CompositeHealthScore | null {
    const entry = this.cache.get(key);
    return entry ? entry.score : null;
  }

  /** Store a score in the cache with the current timestamp. */
  private setCache(key: string, score: CompositeHealthScore): void {
    this.cache.set(key, { score, createdAt: Date.now() });
  }
}
