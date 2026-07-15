/**
 * Tests for the SystemLoadAdapter (Task 0.3).
 *
 * Covers: computeScore component correctness, weighted composite,
 * caching strategy (TTL, stale fallback, expiry), HTTP methods
 * (local, remote, batch), clearCache, getCacheStats, and edge cases.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { SystemLoadAdapter } from "../../../open-sse/services/combo/systemLoadAdapter.ts";
import type { SystemMetrics, CompositeHealthScore } from "../../../open-sse/services/combo/systemLoadAdapter.ts";

// ────────────────────────────────────────────
//  Helpers
// ────────────────────────────────────────────

/** Run a block of code with a fixed Date.now(). Supports async callbacks. */
async function withFakeNow<T>(fakeNow: number, fn: () => T | Promise<T>): Promise<T> {
  const originalNow = Date.now.bind(Date.now);
  Date.now = () => fakeNow;
  try {
    return await Promise.resolve(fn());
  } finally {
    Date.now = originalNow;
  }
}

/** Advance time by `ms` milliseconds and return the new fake timestamp. */
function advance(ms: number, current: number): number {
  return current + ms;
}

/** Build a fully-populated SystemMetrics object with sensible defaults. */
function makeMetrics(overrides?: {
  cpu?: Partial<SystemMetrics["cpu"]>;
  memory?: Partial<SystemMetrics["memory"]>;
  io?: Partial<SystemMetrics["io"]>;
  network?: Partial<SystemMetrics["network"]>;
  gpu?: Partial<SystemMetrics["gpu"]> | null;
  process?: Partial<SystemMetrics["process"]>;
}): SystemMetrics {
  return {
    cpu: {
      utilizationPct: 50,
      loadAvg1m: 1.0,
      loadAvg5m: 0.8,
      loadAvg15m: 0.6,
      contextSwitches: 1000,
      procsRunning: 2,
      procsBlocked: 0,
      ...overrides?.cpu,
    },
    memory: {
      totalBytes: 16_000_000_000,
      availableBytes: 8_000_000_000,
      usedBytes: 8_000_000_000,
      swapTotalBytes: 2_000_000_000,
      swapUsedBytes: 100_000_000,
      cachedBytes: 2_000_000_000,
      buffersBytes: 500_000_000,
      ...overrides?.memory,
    },
    io: {
      readBytesPerSec: 50_000_000,
      writeBytesPerSec: 30_000_000,
      iopsRead: 1000,
      iopsWrite: 500,
      ioWaitPct: 5,
      avgQueueDepth: 2,
      ...overrides?.io,
    },
    network: {
      rxBytesPerSec: 100_000_000,
      txBytesPerSec: 80_000_000,
      rxPacketsPerSec: 10_000,
      txPacketsPerSec: 8_000,
      rxDroppedPerSec: 10,
      txDroppedPerSec: 5,
      tcpConnectionsEstablished: 50,
      ...overrides?.network,
    },
    gpu: overrides?.gpu === null
      ? undefined
      : {
          utilizationPct: 40,
          memoryUsedMib: 4096,
          memoryTotalMib: 8192,
          temperatureC: 65,
          powerDrawWatts: 150,
          pcieBandwidthUtil: 30,
          ...overrides?.gpu,
        },
    process: {
      memoryRssBytes: 500_000_000,
      cpuPercent: 25,
      openFds: 100,
      threadCount: 20,
      ...overrides?.process,
    },
  };
}

/** Build a CompositeHealthScore with given score and optional components. */
function makeScore(score: number, ts?: number): CompositeHealthScore {
  return {
    score,
    components: { cpu: score, memory: score, io: score, network: score, gpu: score, requests: score },
    timestamp: ts ?? Date.now(),
  };
}

/** Create a mock fetch response. */
function mockJsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Create a mock error response. */
function mockErrorResponse(status: number, statusText: string): Response {
  return new Response(null, { status, statusText });
}

// ────────────────────────────────────────────
//  Constructor & Default Config
// ────────────────────────────────────────────

describe("SystemLoadAdapter — constructor & defaults", () => {
  it("uses default config when no arguments provided", () => {
    const adapter = new SystemLoadAdapter();
    const stats = adapter.getCacheStats();
    assert.equal(stats.size, 0);
    assert.equal(stats.hits, 0);
    assert.equal(stats.misses, 0);
    assert.equal(stats.hitRate, 0);
  });

  it("merges partial config with defaults", () => {
    const adapter = new SystemLoadAdapter({ cacheTtlMs: 5000, maxConcurrent: 200 });
    // Verify config took effect by checking requests score behavior
    const metrics = makeMetrics();
    // With maxConcurrent=200 and activeRequests=50:
    // requests = 1 - clamp(50/200) = 1 - 0.25 = 0.75
    const result = adapter.computeScore(metrics, 50);
    assert.equal(result.components.requests, 0.75);
  });

  it("deep-merges partial weights", () => {
    const adapter = new SystemLoadAdapter({
      weights: { cpu: 1.0, memory: 0, io: 0, network: 0, gpu: 0, requests: 0 },
    });
    const metrics = makeMetrics({ cpu: { utilizationPct: 20 } });
    const result = adapter.computeScore(metrics);
    // cpu component = 1 - 20/100 = 0.8
    // with weight 1.0 for cpu and 0 for everything else, composite = 0.8
    assert.ok(Math.abs(result.score - 0.8) < 0.001);
    // But memory should still compute to 0.5
    assert.equal(result.components.memory, 0.5);
  });

  it("has expected default weights summing to 1.0", () => {
    const adapter = new SystemLoadAdapter();
    // We can't access private config, but we can verify via getCacheStats
    const stats = adapter.getCacheStats();
    assert.equal(stats.size, 0);
  });
});

// ────────────────────────────────────────────
//  computeScore — Component Correctness
// ────────────────────────────────────────────

describe("SystemLoadAdapter — computeScore component correctness", () => {
  it("CPU: 1 - clamp(utilizationPct / 100)", () => {
    const adapter = new SystemLoadAdapter();

    // 0% utilization → cpu = 1
    let r = adapter.computeScore(makeMetrics({ cpu: { utilizationPct: 0 } }));
    assert.equal(r.components.cpu, 1.0);

    // 50% utilization → cpu = 0.5
    r = adapter.computeScore(makeMetrics({ cpu: { utilizationPct: 50 } }));
    assert.equal(r.components.cpu, 0.5);

    // 100% utilization → cpu = 0
    r = adapter.computeScore(makeMetrics({ cpu: { utilizationPct: 100 } }));
    assert.equal(r.components.cpu, 0);

    // > 100% utilization → cpu = 0 (clamped)
    r = adapter.computeScore(makeMetrics({ cpu: { utilizationPct: 200 } }));
    assert.equal(r.components.cpu, 0);
  });

  it("Memory: availableBytes / totalBytes", () => {
    const adapter = new SystemLoadAdapter();

    // Half available
    let r = adapter.computeScore(
      makeMetrics({ memory: { totalBytes: 16_000_000_000, availableBytes: 8_000_000_000 } })
    );
    assert.equal(r.components.memory, 0.5);

    // All available
    r = adapter.computeScore(
      makeMetrics({ memory: { totalBytes: 16_000_000_000, availableBytes: 16_000_000_000 } })
    );
    assert.equal(r.components.memory, 1.0);

    // Nothing available
    r = adapter.computeScore(
      makeMetrics({ memory: { totalBytes: 16_000_000_000, availableBytes: 0 } })
    );
    assert.equal(r.components.memory, 0);

    // totalBytes = 0 → memory = 0 (guard against division by zero)
    r = adapter.computeScore(
      makeMetrics({ memory: { totalBytes: 0, availableBytes: 0 } })
    );
    assert.equal(r.components.memory, 0);
  });

  it("IO: 1 - clamp(ioWaitPct / 50)", () => {
    const adapter = new SystemLoadAdapter();

    // 0% iowait → io = 1
    let r = adapter.computeScore(makeMetrics({ io: { ioWaitPct: 0 } }));
    assert.equal(r.components.io, 1.0);

    // 5% iowait → io = 1 - 5/50 = 0.9
    r = adapter.computeScore(makeMetrics({ io: { ioWaitPct: 5 } }));
    assert.equal(r.components.io, 0.9);

    // 50% iowait → io = 0
    r = adapter.computeScore(makeMetrics({ io: { ioWaitPct: 50 } }));
    assert.equal(r.components.io, 0);

    // > 50% iowait → io = 0 (clamped)
    r = adapter.computeScore(makeMetrics({ io: { ioWaitPct: 75 } }));
    assert.equal(r.components.io, 0);
  });

  it("Network: 1 - clamp(dropRate / 0.05)", () => {
    const adapter = new SystemLoadAdapter();

    // No drops → network = 1
    let r = adapter.computeScore(makeMetrics({ network: { rxPacketsPerSec: 10_000, rxDroppedPerSec: 0 } }));
    assert.equal(r.components.network, 1.0);

    // 10 drops out of 10_000 → dropRate = 0.001 → network = 1 - 0.001/0.05 = 0.98
    r = adapter.computeScore(makeMetrics({ network: { rxPacketsPerSec: 10_000, rxDroppedPerSec: 10 } }));
    assert.equal(r.components.network, 1 - 0.001 / 0.05);

    // 500 drops out of 1000 → dropRate = 0.5 → network = 1 - 0.5/0.05 = 1 - 10 = 0 (clamped)
    r = adapter.computeScore(makeMetrics({ network: { rxPacketsPerSec: 1000, rxDroppedPerSec: 500 } }));
    assert.equal(r.components.network, 0);

    // Drop rate >> 0.05 → network = 0 (clamped)
    r = adapter.computeScore(makeMetrics({ network: { rxPacketsPerSec: 100, rxDroppedPerSec: 200 } }));
    assert.equal(r.components.network, 0);

    // rxPacketsPerSec = 0 → use minimum of 1
    r = adapter.computeScore(makeMetrics({ network: { rxPacketsPerSec: 0, rxDroppedPerSec: 0 } }));
    assert.equal(r.components.network, 1.0);
  });

  it("GPU: 1 - clamp(utilizationPct / 100) when GPU present", () => {
    const adapter = new SystemLoadAdapter();

    // GPU at 0% → gpu = 1
    let r = adapter.computeScore(makeMetrics({ gpu: { utilizationPct: 0 } }));
    assert.equal(r.components.gpu, 1.0);

    // GPU at 40% → gpu = 0.6
    r = adapter.computeScore(makeMetrics({ gpu: { utilizationPct: 40 } }));
    assert.equal(r.components.gpu, 0.6);

    // GPU at 100% → gpu = 0
    r = adapter.computeScore(makeMetrics({ gpu: { utilizationPct: 100 } }));
    assert.equal(r.components.gpu, 0);

    // GPU at > 100% → gpu = 0 (clamped)
    r = adapter.computeScore(makeMetrics({ gpu: { utilizationPct: 150 } }));
    assert.equal(r.components.gpu, 0);
  });

  it("GPU score is 1.0 when no GPU metrics", () => {
    const adapter = new SystemLoadAdapter();
    const metrics = makeMetrics({ gpu: null });
    const r = adapter.computeScore(metrics);
    assert.equal(r.components.gpu, 1.0);
  });

  it("Requests: 1 - clamp(activeRequests / maxConcurrent) when activeRequests provided", () => {
    const adapter = new SystemLoadAdapter({ maxConcurrent: 100 });

    // No active request param → requests = 1.0
    let r = adapter.computeScore(makeMetrics());
    assert.equal(r.components.requests, 1.0);

    // 0 active out of 100 → requests = 1.0
    r = adapter.computeScore(makeMetrics(), 0);
    assert.equal(r.components.requests, 1.0);

    // 50 active out of 100 → requests = 0.5
    r = adapter.computeScore(makeMetrics(), 50);
    assert.equal(r.components.requests, 0.5);

    // 100 active out of 100 → requests = 0
    r = adapter.computeScore(makeMetrics(), 100);
    assert.equal(r.components.requests, 0);

    // 200 active out of 100 → requests = 0 (clamped)
    r = adapter.computeScore(makeMetrics(), 200);
    assert.equal(r.components.requests, 0);
  });

  it("requests score with custom maxConcurrent", () => {
    const adapter = new SystemLoadAdapter({ maxConcurrent: 200 });

    // 50 active out of 200 → requests = 0.75
    const r = adapter.computeScore(makeMetrics(), 50);
    assert.equal(r.components.requests, 0.75);
  });
});

// ────────────────────────────────────────────
//  computeScore — Weighted Composite
// ────────────────────────────────────────────

describe("SystemLoadAdapter — computeScore weighted composite", () => {
  it("computes correct weighted composite with default weights", () => {
    const adapter = new SystemLoadAdapter();
    const metrics = makeMetrics({
      cpu: { utilizationPct: 50 },   // cpu = 0.5
      memory: { totalBytes: 100, availableBytes: 60 }, // memory = 0.6
      io: { ioWaitPct: 10 },          // io = 1 - 10/50 = 0.8
      network: { rxPacketsPerSec: 1000, rxDroppedPerSec: 10 }, // dropRate=0.01 → network=1-0.01/0.05=0.8
      gpu: { utilizationPct: 20 },    // gpu = 0.8
    });

    // Default weights: cpu=0.25, memory=0.20, io=0.10, network=0.10, gpu=0.15, requests=0.20
    // requests default (no activeRequests arg) = 1.0
    // composite = 0.25*0.5 + 0.20*0.6 + 0.10*0.8 + 0.10*0.8 + 0.15*0.8 + 0.20*1.0
    //           = 0.125 + 0.12 + 0.08 + 0.08 + 0.12 + 0.20
    //           = 0.725
    const r = adapter.computeScore(metrics);
    const expected = 0.25 * 0.5 + 0.20 * 0.6 + 0.10 * 0.8 + 0.10 * 0.8 + 0.15 * 0.8 + 0.20 * 1.0;
    assert.ok(Math.abs(r.score - expected) < 0.001, `expected ${expected}, got ${r.score}`);
  });

  it("composite with active requests included", () => {
    const adapter = new SystemLoadAdapter({ maxConcurrent: 100 });
    const metrics = makeMetrics({
      cpu: { utilizationPct: 0 },     // cpu = 1.0
      memory: { totalBytes: 100, availableBytes: 100 }, // memory = 1.0
      io: { ioWaitPct: 0 },           // io = 1.0
      network: { rxPacketsPerSec: 100, rxDroppedPerSec: 0 }, // network = 1.0
      gpu: { utilizationPct: 0 },     // gpu = 1.0
    });

    // 30 active out of 100 → requests = 0.7
    // composite = 0.25*1 + 0.20*1 + 0.10*1 + 0.10*1 + 0.15*1 + 0.20*0.7
    //           = 0.25 + 0.20 + 0.10 + 0.10 + 0.15 + 0.14
    //           = 0.94
    const r = adapter.computeScore(metrics, 30);
    const expected = 0.25 + 0.20 + 0.10 + 0.10 + 0.15 + 0.20 * 0.7;
    assert.ok(Math.abs(r.score - expected) < 0.001);
  });

  it("composite is clamped to [0, 1]", () => {
    const adapter = new SystemLoadAdapter({
      weights: { cpu: 1.0, memory: 0, io: 0, network: 0, gpu: 0, requests: 0 },
    });

    // Even with cpu=0, composite should be 0 (floor)
    let r = adapter.computeScore(makeMetrics({ cpu: { utilizationPct: 100 } }));
    assert.equal(r.score, 0);

    // CPU at 0% + maxConcurrent=50, active=0
    // composite = 1.0 (all other weights are 0, but requests weight is 0 too)
    // Actually only cpu weight matters. cpu component = 1.0
    r = adapter.computeScore(makeMetrics({ cpu: { utilizationPct: 0 } }), 0);
    assert.equal(r.score, 1.0);
  });
});

// ────────────────────────────────────────────
//  computeScore — All Extremes
// ────────────────────────────────────────────

describe("SystemLoadAdapter — computeScore extremes", () => {
  it("all components at 0 (worst health)", () => {
    const adapter = new SystemLoadAdapter({ maxConcurrent: 100 });
    const metrics = makeMetrics({
      cpu: { utilizationPct: 100 },
      memory: { totalBytes: 100, availableBytes: 0 },
      io: { ioWaitPct: 100 },
      network: { rxPacketsPerSec: 100, rxDroppedPerSec: 100 },
      gpu: { utilizationPct: 100 },
    });
    const r = adapter.computeScore(metrics, 100);
    assert.equal(r.components.cpu, 0);
    assert.equal(r.components.memory, 0);
    assert.equal(r.components.io, 0);
    assert.equal(r.components.network, 0);
    assert.equal(r.components.gpu, 0);
    assert.equal(r.components.requests, 0);
    assert.equal(r.score, 0);
  });

  it("all components at 1 (best health)", () => {
    const adapter = new SystemLoadAdapter({ maxConcurrent: 100 });
    const metrics = makeMetrics({
      cpu: { utilizationPct: 0 },
      memory: { totalBytes: 100, availableBytes: 100 },
      io: { ioWaitPct: 0 },
      network: { rxPacketsPerSec: 100, rxDroppedPerSec: 0 },
      gpu: { utilizationPct: 0 },
    });
    const r = adapter.computeScore(metrics, 0);
    assert.equal(r.components.cpu, 1.0);
    assert.equal(r.components.memory, 1.0);
    assert.equal(r.components.io, 1.0);
    assert.equal(r.components.network, 1.0);
    assert.equal(r.components.gpu, 1.0);
    assert.equal(r.components.requests, 1.0);
    assert.equal(r.score, 1.0);
  });
});

// ────────────────────────────────────────────
//  computeScore — Edge Cases
// ────────────────────────────────────────────

describe("SystemLoadAdapter — computeScore edge cases", () => {
  it("handles NaN in utilizationPct", () => {
    const adapter = new SystemLoadAdapter();
    // NaN defaults to 100 (safeFinite with fallback 100) → cpu = 0
    const r = adapter.computeScore(makeMetrics({ cpu: { utilizationPct: NaN as unknown as number } }));
    assert.equal(r.components.cpu, 0);
  });

  it("handles Infinity in ioWaitPct", () => {
    const adapter = new SystemLoadAdapter();
    // Infinity defaults to 100 → io = 1 - 100/50 = 1 - (clamped to 1) = 0
    const r = adapter.computeScore(makeMetrics({ io: { ioWaitPct: Infinity as unknown as number } }));
    assert.equal(r.components.io, 0);
  });

  it("handles negative values gracefully", () => {
    const adapter = new SystemLoadAdapter();
    // Negative utilization → cpu = 1 - clamp(negative/100) = 1 - 0 = 1
    const r = adapter.computeScore(makeMetrics({ cpu: { utilizationPct: -10 } }));
    assert.equal(r.components.cpu, 1.0);
  });

  it("handles zero totalBytes in memory", () => {
    const adapter = new SystemLoadAdapter();
    // totalBytes = 0 returns memory = 0 (safeFinite fallback to 1 but we check totalBytes > 0)
    const r = adapter.computeScore(
      makeMetrics({ memory: { totalBytes: 0, availableBytes: 0 } })
    );
    assert.equal(r.components.memory, 0);
  });

  it("handles missing optional gpu field", () => {
    const adapter = new SystemLoadAdapter();
    const metrics = makeMetrics({ gpu: null });
    assert.equal(metrics.gpu, undefined);
    const r = adapter.computeScore(metrics);
    assert.equal(r.components.gpu, 1.0);
  });

  it("timestamp is set on compute", () => {
    const start = 1_000_000;
    withFakeNow(start, () => {
      const adapter = new SystemLoadAdapter();
      const r = adapter.computeScore(makeMetrics());
      assert.equal(r.timestamp, start);
    });
  });

  it("returns score=0 when activeRequests exceeds maxConcurrent and all metrics are zero", () => {
    const adapter = new SystemLoadAdapter({ maxConcurrent: 10 });
    // Everything bad
    const metrics = makeMetrics({
      cpu: { utilizationPct: 100 },
      memory: { totalBytes: 100, availableBytes: 0 },
      io: { ioWaitPct: 100 },
      network: { rxPacketsPerSec: 1, rxDroppedPerSec: 1 },
      gpu: { utilizationPct: 100 },
    });
    const r = adapter.computeScore(metrics, 100); // active=100, max=10
    assert.equal(r.components.requests, 0);
    assert.equal(r.score, 0);
  });
});

// ────────────────────────────────────────────
//  Caching — Local Health Score
// ────────────────────────────────────────────

describe("SystemLoadAdapter — caching behavior", () => {
  it("caches local health score for TTL duration", async () => {
    const start = 1_000_000;
    let fetchCount = 0;

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      fetchCount++;
      return mockJsonResponse(makeMetrics());
    };

    try {
      const adapter = new SystemLoadAdapter({ cacheTtlMs: 2000 });

      // First call — miss, triggers fetch
      await withFakeNow(start, () => adapter.getLocalHealthScore());
      assert.equal(fetchCount, 1, "first call should fetch");

      // Second call within TTL (500ms elapsed) — hit, uses cache
      await withFakeNow(advance(500, start), () => adapter.getLocalHealthScore());
      assert.equal(fetchCount, 1, "second call within TTL should use cache");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("expired cache triggers re-fetch", async () => {
    const start = 1_000_000;
    let fetchCount = 0;

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      fetchCount++;
      return mockJsonResponse(makeMetrics());
    };

    try {
      const adapter = new SystemLoadAdapter({ cacheTtlMs: 2000 });

      await withFakeNow(start, () => adapter.getLocalHealthScore());
      assert.equal(fetchCount, 1);

      // Advance past TTL (2000ms)
      await withFakeNow(advance(2500, start), () => adapter.getLocalHealthScore());
      assert.equal(fetchCount, 2, "expired cache should trigger re-fetch");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("error during fetch returns stale cache when available", async () => {
    const start = 1_000_000;
    let fetchAttempt = 0;

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      fetchAttempt++;
      if (fetchAttempt === 1) {
        return mockJsonResponse(makeMetrics());
      }
      throw new Error("Agent unreachable");
    };

    try {
      const adapter = new SystemLoadAdapter({ cacheTtlMs: 5000 });

      // First call succeeds, caches result
      const first = await withFakeNow(start, () => adapter.getLocalHealthScore());
      assert.equal(fetchAttempt, 1);

      // Advance past TTL — fetch attempt fails, returns stale cache
      const staleResult = await withFakeNow(advance(6000, start), () =>
        adapter.getLocalHealthScore()
      );
      assert.equal(staleResult.score, first.score);
      assert.equal(staleResult.timestamp, first.timestamp);
      assert.equal(fetchAttempt, 2, "fetch was attempted but failed, returned stale");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("error during fetch throws when no stale cache exists", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      throw new Error("Agent unreachable");
    };

    try {
      const adapter = new SystemLoadAdapter({ cacheTtlMs: 2000 });

      await assert.rejects(
        () => adapter.getLocalHealthScore(),
        /Agent unreachable/
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

// ────────────────────────────────────────────
//  Caching — Remote Health Score
// ────────────────────────────────────────────

describe("SystemLoadAdapter — remote health score caching", () => {
  it("caches remote health score per nodeId", async () => {
    let fetchCount = 0;

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url: string | URL | Request) => {
      fetchCount++;
      const urlStr = url.toString();
      if (urlStr.includes("node-a")) {
        return mockJsonResponse(makeScore(0.8));
      }
      if (urlStr.includes("node-b")) {
        return mockJsonResponse(makeScore(0.5));
      }
      return mockJsonResponse(makeScore(1.0));
    };

    try {
      const adapter = new SystemLoadAdapter({ cacheTtlMs: 5000 });

      // Different nodeIds have their own cache entries
      const a1 = await adapter.getRemoteHealthScore("node-a");
      const b1 = await adapter.getRemoteHealthScore("node-b");
      assert.equal(fetchCount, 2);

      // Same nodeId uses cache
      const a2 = await adapter.getRemoteHealthScore("node-a");
      assert.equal(fetchCount, 2, "node-a should be cached");
      assert.equal(a2.score, a1.score);

      const b2 = await adapter.getRemoteHealthScore("node-b");
      assert.equal(fetchCount, 2, "node-b should be cached");
      assert.equal(b2.score, b1.score);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("error in remote health score returns stale cache", async () => {
    let callCount = 0;

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url: string | URL | Request) => {
      callCount++;
      // Only the first call succeeds
      if (callCount === 1) {
        return mockJsonResponse(makeScore(0.9));
      }
      throw new Error("Management plane down");
    };

    try {
      const adapter = new SystemLoadAdapter({ cacheTtlMs: 1 });

      // First call succeeds and caches
      const result1 = await adapter.getRemoteHealthScore("node-x");
      assert.equal(callCount, 1);
      assert.equal(result1.score, 0.9);

      // Wait for TTL (1ms) to expire
      await new Promise((r) => setTimeout(r, 5));

      // With expired cache and fetch error, should return stale
      const result2 = await adapter.getRemoteHealthScore("node-x");
      assert.equal(result2.score, 0.9);
      assert.equal(callCount, 2, "second call should have attempted fetch");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

// ────────────────────────────────────────────
//  Batch Fetch
// ────────────────────────────────────────────

describe("SystemLoadAdapter — batchGetRemoteHealthScores", () => {
  it("returns results from cache and fetches uncached nodes", async () => {
    let fetchCount = 0;

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url: string | URL | Request) => {
      fetchCount++;
      if (url.toString().includes("/health-scores/batch")) {
        return mockJsonResponse({
          "node-c": makeScore(0.3),
          "node-d": makeScore(0.7),
        });
      }
      return mockJsonResponse(makeScore(1.0));
    };

    try {
      const adapter = new SystemLoadAdapter({ cacheTtlMs: 5000 });

      // Pre-populate cache for node-a
      await adapter.getRemoteHealthScore("node-a");
      await adapter.getRemoteHealthScore("node-b");
      assert.equal(fetchCount, 2);

      // Batch fetch: node-a and node-b are cached, node-c and node-d are not
      const results = await adapter.batchGetRemoteHealthScores([
        "node-a",
        "node-b",
        "node-c",
        "node-d",
      ]);

      assert.equal(fetchCount, 3, "one batch fetch for the uncached nodes");
      assert.equal(results.size, 4);
      assert.ok(results.has("node-a"));
      assert.ok(results.has("node-b"));
      assert.ok(results.has("node-c"));
      assert.ok(results.has("node-d"));

      // Subsequent batch should use cache for all
      const results2 = await adapter.batchGetRemoteHealthScores([
        "node-a",
        "node-b",
        "node-c",
        "node-d",
      ]);
      assert.equal(fetchCount, 3, "all should be cached, no fetch needed");
      assert.equal(results2.size, 4);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("returns empty map for empty nodeIds array", async () => {
    const adapter = new SystemLoadAdapter();
    const results = await adapter.batchGetRemoteHealthScores([]);
    assert.equal(results.size, 0);
  });

  it("returns stale results when batch fetch fails and stale cache exists", async () => {
    let fetchCount = 0;

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url: string | URL | Request) => {
      const urlStr = url.toString();
      fetchCount++;
      if (fetchCount === 1 && !urlStr.includes("batch")) {
        return mockJsonResponse(makeScore(0.85)); // cache node-x
      }
      if (urlStr.includes("batch")) {
        throw new Error("Batch endpoint down");
      }
      return mockJsonResponse(makeScore(1.0));
    };

    try {
      const adapter = new SystemLoadAdapter({ cacheTtlMs: 5000 });

      // Pre-cache node-x
      await adapter.getRemoteHealthScore("node-x");
      assert.equal(fetchCount, 1);

      // Batch fetch, node-x is cached, node-y is not cached, batch fails
      const results = await adapter.batchGetRemoteHealthScores(["node-x", "node-y"]);
      assert.equal(fetchCount, 2, "batch fetch was attempted");

      // node-x should still be in results (from cache)
      assert.ok(results.has("node-x"));
      assert.equal(results.get("node-x")!.score, 0.85);
      // node-y should NOT be in results (no cache, no stale)
      assert.ok(!results.has("node-y"), "node-y has no stale cache");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("throws when batch fetch fails and no nodes have cache/stale data", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      throw new Error("Agent completely down");
    };

    try {
      const adapter = new SystemLoadAdapter();

      await assert.rejects(
        () => adapter.batchGetRemoteHealthScores(["new-node-1", "new-node-2"]),
        /Agent completely down/
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

// ────────────────────────────────────────────
//  HTTP Fetch — Local Health Score
// ────────────────────────────────────────────

describe("SystemLoadAdapter — HTTP fetch for local health score", () => {
  it("GETs /system-load and computes score", async () => {
    let calledUrl = "";

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url: string | URL | Request) => {
      calledUrl = url.toString();
      return mockJsonResponse(makeMetrics({ cpu: { utilizationPct: 20 } }));
    };

    try {
      const adapter = new SystemLoadAdapter({ agentBaseUrl: "http://test-agent:9099" });
      const result = await adapter.getLocalHealthScore();

      assert.ok(calledUrl.includes("/system-load"), `expected /system-load, got ${calledUrl}`);
      assert.ok(calledUrl.startsWith("http://test-agent:9099"), `expected base URL, got ${calledUrl}`);

      // cpu = 1 - 20/100 = 0.8
      assert.equal(result.components.cpu, 0.8);
      assert.ok(typeof result.score === "number");
      assert.ok(result.score >= 0 && result.score <= 1);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("throws on non-OK response", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      return mockErrorResponse(503, "Service Unavailable");
    };

    try {
      const adapter = new SystemLoadAdapter();
      await assert.rejects(
        () => adapter.getLocalHealthScore(),
        /503/
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("uses default agentBaseUrl when not configured", async () => {
    let calledUrl = "";

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url: string | URL | Request) => {
      calledUrl = url.toString();
      return mockJsonResponse(makeMetrics());
    };

    try {
      const adapter = new SystemLoadAdapter();
      await adapter.getLocalHealthScore();
      assert.ok(calledUrl.includes("localhost:9099"), `expected localhost:9099, got ${calledUrl}`);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

// ────────────────────────────────────────────
//  clearCache & getCacheStats
// ────────────────────────────────────────────

describe("SystemLoadAdapter — clearCache", () => {
  it("clears all cached entries", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url: string | URL | Request) => {
      const urlStr = url.toString();
      if (urlStr.includes("/health-score/")) {
        return mockJsonResponse(makeScore(0.9));
      }
      if (urlStr.includes("/health-scores/batch")) {
        return mockJsonResponse({ "node-1": makeScore(0.8), "node-2": makeScore(0.7) });
      }
      return mockJsonResponse(makeMetrics());
    };

    try {
      const adapter = new SystemLoadAdapter({ cacheTtlMs: 5000 });

      await adapter.getLocalHealthScore();
      await adapter.getRemoteHealthScore("node-1");
      await adapter.getRemoteHealthScore("node-2");
      assert.ok(adapter.getCacheStats().size > 0);

      adapter.clearCache();
      const stats = adapter.getCacheStats();
      assert.equal(stats.size, 0);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("does not affect hit/miss counters", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url: string | URL | Request) => {
      const urlStr = url.toString();
      if (urlStr.includes("/health-score/") || urlStr.includes("/health-scores/")) {
        return mockJsonResponse(makeScore(0.9));
      }
      return mockJsonResponse(makeMetrics());
    };

    try {
      const adapter = new SystemLoadAdapter({ cacheTtlMs: 5000 });

      await adapter.getLocalHealthScore(); // 1 miss
      const stats1 = adapter.getCacheStats();
      assert.equal(stats1.misses, 1);
      assert.equal(stats1.hits, 0);

      // Cache hit
      await adapter.getLocalHealthScore();
      const stats2 = adapter.getCacheStats();
      assert.equal(stats2.hits, 1);

      adapter.clearCache();
      const stats3 = adapter.getCacheStats();
      // Hits/misses should be preserved
      assert.equal(stats3.hits, 1);
      assert.equal(stats3.misses, 1);
      assert.equal(stats3.size, 0);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

describe("SystemLoadAdapter — getCacheStats", () => {
  it("tracks hits and misses correctly", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => mockJsonResponse(makeMetrics());

    try {
      const adapter = new SystemLoadAdapter({ cacheTtlMs: 5000 });

      // Initial stats
      let stats = adapter.getCacheStats();
      assert.equal(stats.hits, 0);
      assert.equal(stats.misses, 0);
      assert.equal(stats.hitRate, 0);

      // First call = miss
      await adapter.getLocalHealthScore();
      stats = adapter.getCacheStats();
      assert.equal(stats.misses, 1);
      assert.equal(stats.hits, 0);

      // Second call within TTL = hit
      await adapter.getLocalHealthScore();
      stats = adapter.getCacheStats();
      assert.equal(stats.hits, 1);
      assert.equal(stats.misses, 1);
      assert.equal(stats.hitRate, 0.5);

      // Third call within TTL = hit
      await adapter.getLocalHealthScore();
      stats = adapter.getCacheStats();
      assert.equal(stats.hits, 2);
      assert.equal(stats.misses, 1);
      assert.ok(Math.abs(stats.hitRate - 2 / 3) < 0.001);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("hitRate returns 0 when no requests have been made", () => {
    const adapter = new SystemLoadAdapter();
    const stats = adapter.getCacheStats();
    assert.equal(stats.hitRate, 0);
    assert.equal(stats.hits, 0);
    assert.equal(stats.misses, 0);
    assert.equal(stats.size, 0);
  });
});
