/**
 * Web-Session Pool Health — Unit Tests (PR4 of issue #3368)
 *
 * Run: node --import tsx/esm --test tests/unit/web-session-pool-health.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { WebSessionPoolHealthDeps } from "../../open-sse/services/webSessionPoolHealth.ts";
import { getWebSessionPoolHealth } from "../../open-sse/services/webSessionPoolHealth.ts";

type MockPoolStats = {
  provider: string;
  sessions: { total: number; active: number; cooldown: number; dead: number };
  requests: { total: number; success: number; rate429: number; otherErrors: number };
  throughput: string;
  successRate: string;
  elapsed: string;
  createdAt: number;
};

type MockSessionDetail = {
  id: string;
  fingerprint: string;
  status: "active" | "cooldown" | "dead";
  totalRequests: number;
  successfulRequests: number;
  successRate: string;
  inflight: number;
  cooldownRemaining: string;
  age: string;
};

type MockBreakerState = {
  state: string;
  failureCount: number;
  lastFailureTime: number | null;
  retryAfterMs: number;
} | null;

function createMockDeps(overrides: {
  providers?: string[];
  stats?: Record<string, MockPoolStats>;
  sessionDetails?: Record<string, MockSessionDetail[]>;
  breakerCooldown?: Record<string, boolean>;
  breakerRemaining?: Record<string, number | null>;
  breakerStates?: Record<string, MockBreakerState>;
} = {}): WebSessionPoolHealthDeps {
  const providers = overrides.providers ?? [];
  const stats = overrides.stats ?? {};
  const sessionDetails = overrides.sessionDetails ?? {};
  const breakerCooldown = overrides.breakerCooldown ?? {};
  const breakerRemaining = overrides.breakerRemaining ?? {};
  const breakerStates = overrides.breakerStates ?? {};

  return {
    listProviders: () => [...providers],
    getStats: (p: string) => (stats[p] as any) ?? null,
    getSessionDetails: (p: string) => (sessionDetails[p] as any) ?? null,
    isProviderInCooldown: (p: string) => breakerCooldown[p] ?? false,
    getProviderCooldownRemainingMs: (p: string) => breakerRemaining[p] ?? null,
    getProviderBreakerState: (p: string) => breakerStates[p] ?? null,
  };
}

function healthyDeps(provider = "pollinations"): WebSessionPoolHealthDeps {
  const now = Date.now();
  return createMockDeps({
    providers: [provider],
    stats: {
      [provider]: {
        provider,
        sessions: { total: 6, active: 5, cooldown: 1, dead: 0 },
        requests: { total: 100, success: 95, rate429: 3, otherErrors: 2 },
        throughput: "12.3 req/s",
        successRate: "95.0%",
        elapsed: "2h 15m",
        createdAt: now - 2 * 60 * 60 * 1000,
      },
    },
    sessionDetails: {
      [provider]: [
        {
          id: "s1",
          fingerprint: "fp-1",
          status: "active",
          totalRequests: 20,
          successfulRequests: 19,
          successRate: "95.0%",
          inflight: 0,
          cooldownRemaining: "none",
          age: "2h 15m",
        },
        {
          id: "s2",
          fingerprint: "fp-2",
          status: "cooldown",
          totalRequests: 15,
          successfulRequests: 12,
          successRate: "80.0%",
          inflight: 0,
          cooldownRemaining: "5s",
          age: "1h 30m",
        },
      ],
    },
    breakerStates: {
      [provider]: {
        state: "CLOSED",
        failureCount: 0,
        lastFailureTime: null,
        retryAfterMs: 0,
      },
    },
  });
}

function downDeps(provider = "pollinations"): WebSessionPoolHealthDeps {
  const now = Date.now();
  return createMockDeps({
    providers: [provider],
    stats: {
      [provider]: {
        provider,
        sessions: { total: 6, active: 0, cooldown: 2, dead: 4 },
        requests: { total: 50, success: 10, rate429: 30, otherErrors: 10 },
        throughput: "0.5 req/s",
        successRate: "20.0%",
        elapsed: "1h 0m",
        createdAt: now - 60 * 60 * 1000,
      },
    },
    sessionDetails: { [provider]: [] },
    breakerCooldown: { [provider]: true },
    breakerRemaining: { [provider]: 30000 },
    breakerStates: {
      [provider]: {
        state: "OPEN",
        failureCount: 10,
        lastFailureTime: now - 5000,
        retryAfterMs: 30000,
      },
    },
  });
}

describe("getWebSessionPoolHealth", () => {
  it("returns empty report when no pools registered", () => {
    const deps = createMockDeps();
    const report = getWebSessionPoolHealth(undefined, deps);
    assert.equal(report.providers.length, 0);
    assert.ok(report.checkedAt);
  });

  it("returns single-provider report when provider arg given", () => {
    const deps = createMockDeps({
      providers: ["pollinations", "longcat"],
      stats: {
        pollinations: {
          provider: "pollinations",
          sessions: { total: 3, active: 3, cooldown: 0, dead: 0 },
          requests: { total: 10, success: 10, rate429: 0, otherErrors: 0 },
          throughput: "5 req/s",
          successRate: "100.0%",
          elapsed: "10m",
          createdAt: Date.now() - 600000,
        },
      },
      breakerStates: {
        pollinations: { state: "CLOSED", failureCount: 0, lastFailureTime: null, retryAfterMs: 0 },
      },
    });

    const report = getWebSessionPoolHealth("pollinations", deps);
    assert.equal(report.providers.length, 1);
    assert.equal(report.providers[0].provider, "pollinations");
  });

  it("returns all-providers report when no arg given", () => {
    const now = Date.now();
    const deps = createMockDeps({
      providers: ["pollinations", "longcat"],
      stats: {
        pollinations: {
          provider: "pollinations",
          sessions: { total: 3, active: 3, cooldown: 0, dead: 0 },
          requests: { total: 10, success: 10, rate429: 0, otherErrors: 0 },
          throughput: "5 req/s",
          successRate: "100.0%",
          elapsed: "10m",
          createdAt: now - 600000,
        },
        longcat: {
          provider: "longcat",
          sessions: { total: 4, active: 4, cooldown: 0, dead: 0 },
          requests: { total: 20, success: 20, rate429: 0, otherErrors: 0 },
          throughput: "8 req/s",
          successRate: "100.0%",
          elapsed: "20m",
          createdAt: now - 1200000,
        },
      },
      breakerStates: {
        pollinations: { state: "CLOSED", failureCount: 0, lastFailureTime: null, retryAfterMs: 0 },
        longcat: { state: "CLOSED", failureCount: 0, lastFailureTime: null, retryAfterMs: 0 },
      },
    });

    const report = getWebSessionPoolHealth(undefined, deps);
    assert.equal(report.providers.length, 2);
  });

  it('computes health: "down" when breaker in cooldown', () => {
    const deps = downDeps("pollinations");
    const report = getWebSessionPoolHealth("pollinations", deps);
    assert.equal(report.providers[0].health, "down");
    assert.ok(report.providers[0].issues.some((i: string) => i.includes("breaker")));
  });

  it('computes health: "down" when all sessions dead', () => {
    const deps = createMockDeps({
      providers: ["pollinations"],
      stats: {
        pollinations: {
          provider: "pollinations",
          sessions: { total: 4, active: 0, cooldown: 0, dead: 4 },
          requests: { total: 10, success: 2, rate429: 5, otherErrors: 3 },
          throughput: "0.1 req/s",
          successRate: "20.0%",
          elapsed: "30m",
          createdAt: Date.now() - 30 * 60 * 1000,
        },
      },
      sessionDetails: { pollinations: [] },
      breakerStates: {
        pollinations: { state: "CLOSED", failureCount: 0, lastFailureTime: null, retryAfterMs: 0 },
      },
    });

    const report = getWebSessionPoolHealth("pollinations", deps);
    assert.equal(report.providers[0].health, "down");
    assert.ok(report.providers[0].issues.some((i: string) => i.includes("dead")));
  });

  it('computes health: "degraded" when success rate < 80%', () => {
    const deps = createMockDeps({
      providers: ["pollinations"],
      stats: {
        pollinations: {
          provider: "pollinations",
          sessions: { total: 6, active: 4, cooldown: 2, dead: 0 },
          requests: { total: 100, success: 70, rate429: 20, otherErrors: 10 },
          throughput: "5.0 req/s",
          successRate: "70.0%",
          elapsed: "1h",
          createdAt: Date.now() - 60 * 60 * 1000,
        },
      },
      sessionDetails: { pollinations: [] },
      breakerStates: {
        pollinations: { state: "CLOSED", failureCount: 2, lastFailureTime: Date.now() - 60000, retryAfterMs: 0 },
      },
    });

    const report = getWebSessionPoolHealth("pollinations", deps);
    assert.equal(report.providers[0].health, "degraded");
    assert.ok(report.providers[0].issues.some((i: string) => i.includes("success rate")));
  });

  it('computes health: "degraded" when >50% sessions in cooldown/dead', () => {
    const deps = createMockDeps({
      providers: ["pollinations"],
      stats: {
        pollinations: {
          provider: "pollinations",
          sessions: { total: 6, active: 2, cooldown: 3, dead: 1 },
          requests: { total: 100, success: 85, rate429: 10, otherErrors: 5 },
          throughput: "8.0 req/s",
          successRate: "85.0%",
          elapsed: "1h",
          createdAt: Date.now() - 60 * 60 * 1000,
        },
      },
      sessionDetails: { pollinations: [] },
      breakerStates: {
        pollinations: { state: "CLOSED", failureCount: 1, lastFailureTime: Date.now() - 120000, retryAfterMs: 0 },
      },
    });

    const report = getWebSessionPoolHealth("pollinations", deps);
    assert.equal(report.providers[0].health, "degraded");
    assert.ok(report.providers[0].issues.some((i: string) => i.includes("sessions") && i.includes("cooldown")));
  });

  it('computes health: "healthy" when all metrics good', () => {
    const deps = healthyDeps("pollinations");
    const report = getWebSessionPoolHealth("pollinations", deps);
    assert.equal(report.providers[0].health, "healthy");
    assert.equal(report.providers[0].issues.length, 0);
  });

  it('computes health: "healthy" for idle pool with zero requests', () => {
    const deps = createMockDeps({
      providers: ["idle"],
      stats: {
        idle: {
          provider: "idle",
          sessions: { total: 3, active: 3, cooldown: 0, dead: 0 },
          requests: { total: 0, success: 0, rate429: 0, otherErrors: 0 },
          throughput: "0.0 req/s",
          successRate: "0.0%",
          elapsed: "5m",
          createdAt: Date.now() - 5 * 60 * 1000,
        },
      },
      sessionDetails: { idle: [] },
      breakerStates: {
        idle: { state: "CLOSED", failureCount: 0, lastFailureTime: null, retryAfterMs: 0 },
      },
    });

    const report = getWebSessionPoolHealth("idle", deps);
    assert.equal(report.providers[0].health, "healthy");
    assert.equal(report.providers[0].issues.length, 0);
  });

  it("populates issues array with correct messages for down pool", () => {
    const deps = downDeps("pollinations");
    const report = getWebSessionPoolHealth("pollinations", deps);
    const issues = report.providers[0].issues;
    assert.ok(issues.length > 0);
    assert.ok(issues.some((i: string) => i.toLowerCase().includes("breaker")));
  });

  it("handles null pool gracefully (provider has breaker but no pool)", () => {
    const deps = createMockDeps({
      providers: ["ghost"],
      breakerStates: {
        ghost: { state: "CLOSED", failureCount: 0, lastFailureTime: null, retryAfterMs: 0 },
      },
    });

    const report = getWebSessionPoolHealth("ghost", deps);
    assert.equal(report.providers.length, 1);
    assert.equal(report.providers[0].pool, null);
    assert.ok(report.providers[0].breaker !== null);
  });

  it("handles null breaker gracefully (provider has pool but no breaker)", () => {
    const deps = createMockDeps({
      providers: ["nobreaker"],
      stats: {
        nobreaker: {
          provider: "nobreaker",
          sessions: { total: 3, active: 3, cooldown: 0, dead: 0 },
          requests: { total: 50, success: 50, rate429: 0, otherErrors: 0 },
          throughput: "10.0 req/s",
          successRate: "100.0%",
          elapsed: "30m",
          createdAt: Date.now() - 30 * 60 * 1000,
        },
      },
      sessionDetails: { nobreaker: [] },
    });

    const report = getWebSessionPoolHealth("nobreaker", deps);
    assert.equal(report.providers.length, 1);
    assert.ok(report.providers[0].pool !== null);
    assert.equal(report.providers[0].breaker, null);
    assert.equal(report.providers[0].health, "healthy");
  });

  it("returns provider in report even when not in PoolRegistry but arg specified", () => {
    const deps = createMockDeps();
    const report = getWebSessionPoolHealth("nonexistent", deps);
    assert.equal(report.providers.length, 1);
    assert.equal(report.providers[0].provider, "nonexistent");
    assert.equal(report.providers[0].pool, null);
  });

  it("includes session details in report", () => {
    const deps = healthyDeps("pollinations");
    const report = getWebSessionPoolHealth("pollinations", deps);
    assert.ok(report.providers[0].sessions.length > 0);
    assert.equal(report.providers[0].sessions[0].id, "s1");
    assert.equal(report.providers[0].sessions[0].fingerprint, "fp-1");
  });
});
