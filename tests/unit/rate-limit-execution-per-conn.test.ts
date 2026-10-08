import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

import * as rateLimitManager from "../../open-sse/services/rateLimitManager.ts";
import { updateProviderConnectionSchema } from "../../src/shared/validation/schemas/provider.ts";
import * as resilienceSettings from "../../src/lib/resilience/settings.ts";

function parse(overrides: unknown) {
  return updateProviderConnectionSchema.safeParse({ name: "test", rateLimitOverrides: overrides });
}

describe("rateLimitOverrides executionMaxWaitMs per-connection", () => {
  it("accepts executionMaxWaitMs per-connection", () => {
    const r = parse({ executionMaxWaitMs: 300000 });
    assert.ok(r.success, String((r as { error?: unknown }).error));
    assert.equal(
      (r as { data: { rateLimitOverrides: { executionMaxWaitMs: number } } }).data
        .rateLimitOverrides.executionMaxWaitMs,
      300000
    );
  });

  it("rejects unknown key still strict", () => {
    const r = parse({ bogus: 1 } as unknown as Record<string, unknown>);
    assert.equal(r.success, false);
  });
});

describe("resolveExecutionMaxWaitMs per-connection", () => {
  beforeEach(async () => {
    await rateLimitManager.__resetRateLimitManagerForTests();
  });

  afterEach(async () => {
    await rateLimitManager.__resetRateLimitManagerForTests();
  });

  it("per-connection executionMaxWaitMs wins over global fallback", async () => {
    await rateLimitManager.applyRequestQueueSettings({
      ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
      executionMaxWaitMs: 600000,
    });
    rateLimitManager.refreshConnectionRateLimits("conn1", {
      executionMaxWaitMs: 120000,
    } as unknown as Record<string, number>);
    assert.equal(rateLimitManager.resolveExecutionMaxWaitMs("conn1"), 120000);
    assert.equal(rateLimitManager.resolveExecutionMaxWaitMs("conn2"), 600000);
    assert.equal(rateLimitManager.resolveExecutionMaxWaitMs(undefined), 600000);
  });

  it("execMs is clamped to upstream timeout — never undercuts mid-flight", async () => {
    await rateLimitManager.applyRequestQueueSettings({
      ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
      autoEnableApiKeyProviders: false,
      concurrentRequests: 1,
      requestsPerMinute: 100000,
      minTimeBetweenRequestsMs: 0,
      executionMaxWaitMs: 5000,
    });

    const conn = "exec-clamp-conn";
    rateLimitManager.enableRateLimitProtection(conn);
    rateLimitManager.refreshConnectionRateLimits(conn, {
      executionMaxWaitMs: 10000,
    } as unknown as Record<string, number>);
    assert.equal(rateLimitManager.resolveExecutionMaxWaitMs(conn), 10000);

    // Proof that clamp uses max(perConn, upstream): a tight per-conn budget of 50ms
    // would kill a 150ms execution, but when upstream is 30s the effective
    // expiration is 30s so the same 150ms execution must survive. Without the
    // max() clamp it would fail with RATE_LIMIT_EXECUTION_TIMEOUT (504).
    const tightPerConnMs = 50;
    const upstreamMs = 30000;
    rateLimitManager.refreshConnectionRateLimits(conn, {
      executionMaxWaitMs: tightPerConnMs,
    } as unknown as Record<string, number>);
    assert.equal(rateLimitManager.resolveExecutionMaxWaitMs(conn), tightPerConnMs);
    const fakeExecutor = { getTimeoutMs: () => upstreamMs };
    const result = await rateLimitManager.withRateLimit(
      "openai",
      conn,
      "gpt-4o",
      async () => {
        await new Promise((r) => setTimeout(r, 150));
        return "ok";
      },
      null,
      undefined,
      undefined,
      {
        executor: fakeExecutor as unknown as { getTimeoutMs: () => unknown },
        providerSpecificData: {},
      }
    );
    assert.equal(
      result,
      "ok",
      "150ms execution must survive: clamped expiration is 30s, not tight 50ms"
    );

    // Conversely, per-conn larger than upstream wins.
    rateLimitManager.refreshConnectionRateLimits(conn, {
      executionMaxWaitMs: 50000,
    } as unknown as Record<string, number>);
    const fakeShort = { getTimeoutMs: () => 5000 };
    const result2 = await rateLimitManager.withRateLimit(
      "openai",
      conn,
      "gpt-4o",
      async () => "ok2",
      null,
      undefined,
      undefined,
      {
        executor: fakeShort as unknown as { getTimeoutMs: () => unknown },
        providerSpecificData: {},
      }
    );
    assert.equal(result2, "ok2");
  });
});
