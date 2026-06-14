/**
 * Session Pool REST API — Unit Tests (PR7 of issue #3368)
 *
 * Run: node --import tsx/esm --test tests/unit/session-pool-rest-api.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { WebSessionPoolHealthDeps } from "../../open-sse/services/webSessionPoolHealth.ts";
import { getWebSessionPoolHealth } from "../../open-sse/services/webSessionPoolHealth.ts";

function createMockDeps(overrides: {
  providers?: string[];
  stats?: Record<string, any>;
  sessionDetails?: Record<string, any[]>;
  breakerCooldown?: Record<string, boolean>;
  breakerRemaining?: Record<string, number | null>;
  breakerStates?: Record<string, any>;
} = {}): WebSessionPoolHealthDeps {
  const providers = overrides.providers ?? [];
  const stats = overrides.stats ?? {};
  const sessionDetails = overrides.sessionDetails ?? {};
  const breakerCooldown = overrides.breakerCooldown ?? {};
  const breakerRemaining = overrides.breakerRemaining ?? {};
  const breakerStates = overrides.breakerStates ?? {};

  return {
    listProviders: () => [...providers],
    getStats: (p: string) => stats[p] ?? null,
    getSessionDetails: (p: string) => sessionDetails[p] ?? null,
    isProviderInCooldown: (p: string) => breakerCooldown[p] ?? false,
    getProviderCooldownRemainingMs: (p: string) => breakerRemaining[p] ?? null,
    getProviderBreakerState: (p: string) => breakerStates[p] ?? null,
  };
}

describe("GET /api/session-pools (list all)", () => {
  it("returns empty report when no pools registered", () => {
    const deps = createMockDeps();
    const report = getWebSessionPoolHealth(undefined, deps);
    assert.equal(report.providers.length, 0);
    assert.ok(report.checkedAt);
  });

  it("returns all registered pools", () => {
    const now = Date.now();
    const deps = createMockDeps({
      providers: ["pollinations", "longcat"],
      stats: {
        pollinations: {
          provider: "pollinations",
          sessions: { total: 6, active: 5, cooldown: 1, dead: 0 },
          requests: { total: 100, success: 95, rate429: 3, otherErrors: 2 },
          throughput: "12.3 req/s",
          successRate: "95.0%",
          elapsed: "2h 15m",
          createdAt: now - 2 * 60 * 60 * 1000,
        },
        longcat: {
          provider: "longcat",
          sessions: { total: 4, active: 4, cooldown: 0, dead: 0 },
          requests: { total: 50, success: 50, rate429: 0, otherErrors: 0 },
          throughput: "8.0 req/s",
          successRate: "100.0%",
          elapsed: "1h",
          createdAt: now - 60 * 60 * 1000,
        },
      },
      sessionDetails: { pollinations: [], longcat: [] },
      breakerStates: {
        pollinations: { state: "CLOSED", failureCount: 0, lastFailureTime: null, retryAfterMs: 0 },
        longcat: { state: "CLOSED", failureCount: 0, lastFailureTime: null, retryAfterMs: 0 },
      },
    });

    const report = getWebSessionPoolHealth(undefined, deps);
    assert.equal(report.providers.length, 2);
    assert.equal(report.providers[0].provider, "pollinations");
    assert.equal(report.providers[1].provider, "longcat");
  });

  it("includes health summary for each pool", () => {
    const deps = createMockDeps({
      providers: ["pollinations"],
      stats: {
        pollinations: {
          provider: "pollinations",
          sessions: { total: 6, active: 5, cooldown: 1, dead: 0 },
          requests: { total: 100, success: 95, rate429: 3, otherErrors: 2 },
          throughput: "12.3 req/s",
          successRate: "95.0%",
          elapsed: "2h",
          createdAt: Date.now() - 2 * 60 * 60 * 1000,
        },
      },
      sessionDetails: { pollinations: [] },
      breakerStates: {
        pollinations: { state: "CLOSED", failureCount: 0, lastFailureTime: null, retryAfterMs: 0 },
      },
    });

    const report = getWebSessionPoolHealth(undefined, deps);
    const pool = report.providers[0];
    assert.ok(pool.pool);
    assert.equal(pool.pool.totalSessions, 6);
    assert.equal(pool.pool.activeSessions, 5);
    assert.equal(pool.health, "healthy");
  });
});

describe("GET /api/session-pools/[provider] (single pool)", () => {
  it("returns specific pool when provider arg given", () => {
    const deps = createMockDeps({
      providers: ["pollinations", "longcat"],
      stats: {
        pollinations: {
          provider: "pollinations",
          sessions: { total: 6, active: 5, cooldown: 1, dead: 0 },
          requests: { total: 100, success: 95, rate429: 3, otherErrors: 2 },
          throughput: "12.3 req/s",
          successRate: "95.0%",
          elapsed: "2h",
          createdAt: Date.now() - 2 * 60 * 60 * 1000,
        },
      },
      sessionDetails: { pollinations: [] },
      breakerStates: {
        pollinations: { state: "CLOSED", failureCount: 0, lastFailureTime: null, retryAfterMs: 0 },
      },
    });

    const report = getWebSessionPoolHealth("pollinations", deps);
    assert.equal(report.providers.length, 1);
    assert.equal(report.providers[0].provider, "pollinations");
  });

  it("returns pool with session details", () => {
    const deps = createMockDeps({
      providers: ["pollinations"],
      stats: {
        pollinations: {
          provider: "pollinations",
          sessions: { total: 2, active: 2, cooldown: 0, dead: 0 },
          requests: { total: 10, success: 10, rate429: 0, otherErrors: 0 },
          throughput: "5.0 req/s",
          successRate: "100.0%",
          elapsed: "30m",
          createdAt: Date.now() - 30 * 60 * 1000,
        },
      },
      sessionDetails: {
        pollinations: [
          {
            id: "s1",
            fingerprint: "fp-1",
            status: "active",
            totalRequests: 5,
            successfulRequests: 5,
            successRate: "100.0%",
            inflight: 0,
            cooldownRemaining: "none",
            age: "30m",
          },
          {
            id: "s2",
            fingerprint: "fp-2",
            status: "active",
            totalRequests: 5,
            successfulRequests: 5,
            successRate: "100.0%",
            inflight: 1,
            cooldownRemaining: "none",
            age: "30m",
          },
        ],
      },
      breakerStates: {
        pollinations: { state: "CLOSED", failureCount: 0, lastFailureTime: null, retryAfterMs: 0 },
      },
    });

    const report = getWebSessionPoolHealth("pollinations", deps);
    const pool = report.providers[0];
    assert.equal(pool.sessions.length, 2);
    assert.equal(pool.sessions[0].id, "s1");
    assert.equal(pool.sessions[1].id, "s2");
  });

  it("returns pool with breaker state when available", () => {
    const now = Date.now();
    const deps = createMockDeps({
      providers: ["pollinations"],
      stats: {
        pollinations: {
          provider: "pollinations",
          sessions: { total: 6, active: 0, cooldown: 2, dead: 4 },
          requests: { total: 50, success: 10, rate429: 30, otherErrors: 10 },
          throughput: "0.5 req/s",
          successRate: "20.0%",
          elapsed: "1h",
          createdAt: now - 60 * 60 * 1000,
        },
      },
      sessionDetails: { pollinations: [] },
      breakerCooldown: { pollinations: true },
      breakerRemaining: { pollinations: 30000 },
      breakerStates: {
        pollinations: {
          state: "OPEN",
          failureCount: 10,
          lastFailureTime: now - 5000,
          retryAfterMs: 30000,
        },
      },
    });

    const report = getWebSessionPoolHealth("pollinations", deps);
    const pool = report.providers[0];
    assert.ok(pool.breaker);
    assert.equal(pool.breaker.state, "OPEN");
    assert.equal(pool.breaker.inCooldown, true);
    assert.equal(pool.breaker.cooldownRemainingMs, 30000);
    assert.equal(pool.health, "down");
  });

  it("returns provider entry even when no pool registered (for 404 detection)", () => {
    const deps = createMockDeps();
    const report = getWebSessionPoolHealth("nonexistent", deps);
    assert.equal(report.providers.length, 1);
    assert.equal(report.providers[0].provider, "nonexistent");
    assert.equal(report.providers[0].pool, null);
  });
});
