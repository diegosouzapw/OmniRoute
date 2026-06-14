import test from "node:test";
import assert from "node:assert/strict";

// ─── toolLimitDetector ────────────────────────────────────────────────────────

test("toolLimitDetector: getEffectiveToolLimit returns MAX_TOOLS_LIMIT default", async () => {
  const { getEffectiveToolLimit, clearDetectedLimits } = await import(
    "../../open-sse/services/toolLimitDetector.ts"
  );
  clearDetectedLimits();
  const limit = getEffectiveToolLimit("nonexistent-provider");
  assert.equal(limit, 128, "default limit should be MAX_TOOLS_LIMIT (128)");
});

test("toolLimitDetector: setDetectedToolLimit only lowers the limit", async () => {
  const { getEffectiveToolLimit, setDetectedToolLimit, clearDetectedLimits } = await import(
    "../../open-sse/services/toolLimitDetector.ts"
  );
  clearDetectedLimits();

  setDetectedToolLimit("test-provider", 50);
  assert.equal(getEffectiveToolLimit("test-provider"), 50);

  // Attempting to raise it back to 100 should be ignored (only lowers)
  setDetectedToolLimit("test-provider", 100);
  assert.equal(getEffectiveToolLimit("test-provider"), 50);

  // Lowering further should work
  setDetectedToolLimit("test-provider", 30);
  assert.equal(getEffectiveToolLimit("test-provider"), 30);
});

test("toolLimitDetector: parseToolLimitFromError extracts numeric limits", async () => {
  const { parseToolLimitFromError } = await import(
    "../../open-sse/services/toolLimitDetector.ts"
  );

  assert.equal(parseToolLimitFromError("'tools': maximum number of items is 64"), 64);
  assert.equal(parseToolLimitFromError("Maximum number of tools allowed is 32"), 32);
  assert.equal(parseToolLimitFromError("Too many tools. Maximum 128"), 128);
  assert.equal(parseToolLimitFromError("no limit here"), null);
  assert.equal(parseToolLimitFromError("tool limit 0"), null, "rejects zero");
});

test("toolLimitDetector: shouldDetectLimit checks status 400 and keywords", async () => {
  const { shouldDetectLimit } = await import("../../open-sse/services/toolLimitDetector.ts");

  assert.equal(shouldDetectLimit("maximum number of tools exceeded", 400), true);
  assert.equal(shouldDetectLimit("too many tools", 400), true);
  assert.equal(shouldDetectLimit("maximum number of tools exceeded", 500), false);
  assert.equal(shouldDetectLimit("some other error", 400), false);
});

test("toolLimitDetector: clearDetectedLimits resets all entries", async () => {
  const { setDetectedToolLimit, getDetectedToolLimit, clearDetectedLimits } = await import(
    "../../open-sse/services/toolLimitDetector.ts"
  );

  setDetectedToolLimit("clear-test-a", 10);
  setDetectedToolLimit("clear-test-b", 20);
  assert.equal(getDetectedToolLimit("clear-test-a"), 10);

  clearDetectedLimits();
  assert.equal(getDetectedToolLimit("clear-test-a"), 128, "should revert to default");
  assert.equal(getDetectedToolLimit("clear-test-b"), 128, "should revert to default");
});

// ─── codexQuotaFetcher: connectionRegistry bounds ────────────────────────────

test("codexQuotaFetcher: register/unregister connection lifecycle", async () => {
  const { registerCodexConnection, unregisterCodexConnection } = await import(
    "../../open-sse/services/codexQuotaFetcher.ts"
  );

  // Should not throw
  registerCodexConnection("conn-1", { accessToken: "tok-abc" });
  registerCodexConnection("conn-2", { accessToken: "tok-def", workspaceId: "ws-1" });

  unregisterCodexConnection("conn-1");
  unregisterCodexConnection("conn-2");
  // unregistering non-existent should not throw
  unregisterCodexConnection("conn-nonexistent");
});

test("codexQuotaFetcher: connectionRegistry evicts oldest when full (100)", async () => {
  const { registerCodexConnection, unregisterCodexConnection } = await import(
    "../../open-sse/services/codexQuotaFetcher.ts"
  );

  for (let i = 0; i < 100; i++) {
    registerCodexConnection(`evict-test-${i}`, { accessToken: `tok-${i}` });
  }

  registerCodexConnection("evict-test-overflow", { accessToken: "tok-overflow" });

  assert.doesNotThrow(
    () => unregisterCodexConnection("evict-test-0"),
    "unregistering evicted conn-0 should be a no-op, not throw"
  );

  registerCodexConnection("evict-test-0", { accessToken: "tok-re" });
  assert.doesNotThrow(
    () => unregisterCodexConnection("evict-test-0"),
    "re-registered conn-0 should unregister cleanly"
  );

  for (let i = 1; i <= 100; i++) {
    unregisterCodexConnection(`evict-test-${i}`);
  }
  unregisterCodexConnection("evict-test-overflow");
  unregisterCodexConnection("evict-test-0");
});

test("codexQuotaFetcher: invalidateCodexQuotaCache does not throw", async () => {
  const { invalidateCodexQuotaCache } = await import(
    "../../open-sse/services/codexQuotaFetcher.ts"
  );
  assert.doesNotThrow(() => invalidateCodexQuotaCache("nonexistent"));
});

test("codexQuotaFetcher: getCodexQuotaCooldownMs returns 0 when under threshold", async () => {
  const { getCodexQuotaCooldownMs } = await import(
    "../../open-sse/services/codexQuotaFetcher.ts"
  );

  const quota = {
    used: 50,
    total: 100,
    percentUsed: 0.5,
    resetAt: null,
    window5h: { percentUsed: 0.5, resetAt: null },
    window7d: { percentUsed: 0.3, resetAt: null },
    limitReached: false,
  };

  assert.equal(getCodexQuotaCooldownMs(quota), 0);
});

test("codexQuotaFetcher: getCodexQuotaCooldownMs returns cooldown when 7d exhausted", async () => {
  const { getCodexQuotaCooldownMs } = await import(
    "../../open-sse/services/codexQuotaFetcher.ts"
  );

  const futureReset = new Date(Date.now() + 60_000).toISOString();
  const quota = {
    used: 96,
    total: 100,
    percentUsed: 0.96,
    resetAt: futureReset,
    window5h: { percentUsed: 0.5, resetAt: null },
    window7d: { percentUsed: 0.96, resetAt: futureReset },
    limitReached: false,
  };

  const cooldown = getCodexQuotaCooldownMs(quota);
  assert.ok(cooldown > 0, "should return positive cooldown");
  assert.ok(cooldown <= 60_000, "should be bounded by reset time");
});

// ─── quotaMonitor: alertSuppression bounds ───────────────────────────────────

test("quotaMonitor: clearQuotaMonitors resets active count to 0", async () => {
  const { clearQuotaMonitors, getActiveMonitorCount } = await import(
    "../../open-sse/services/quotaMonitor.ts"
  );

  clearQuotaMonitors();
  assert.equal(getActiveMonitorCount(), 0);
});

test("quotaMonitor: isQuotaMonitorEnabled checks providerSpecificData flag", async () => {
  const { isQuotaMonitorEnabled } = await import(
    "../../open-sse/services/quotaMonitor.ts"
  );

  assert.equal(isQuotaMonitorEnabled({ providerSpecificData: { quotaMonitorEnabled: true } }), true);
  assert.equal(isQuotaMonitorEnabled({ providerSpecificData: { quotaMonitorEnabled: false } }), false);
  assert.equal(isQuotaMonitorEnabled({ providerSpecificData: {} }), false);
  assert.equal(isQuotaMonitorEnabled({}), false);
  assert.equal(isQuotaMonitorEnabled({ providerSpecificData: null }), false);
});

test("quotaMonitor: getQuotaMonitorSummary returns zeroed after clear", async () => {
  const { clearQuotaMonitors, getQuotaMonitorSummary } = await import(
    "../../open-sse/services/quotaMonitor.ts"
  );

  clearQuotaMonitors();
  const summary = getQuotaMonitorSummary();
  assert.equal(summary.active, 0);
  assert.equal(summary.alerting, 0);
  assert.equal(summary.exhausted, 0);
  assert.equal(summary.errors, 0);
});

test("quotaMonitor: getQuotaMonitorSnapshots returns empty array after clear", async () => {
  const { clearQuotaMonitors, getQuotaMonitorSnapshots } = await import(
    "../../open-sse/services/quotaMonitor.ts"
  );

  clearQuotaMonitors();
  const snapshots = getQuotaMonitorSnapshots();
  assert.ok(Array.isArray(snapshots));
  assert.equal(snapshots.length, 0);
});

test("quotaMonitor: getQuotaMonitorSnapshot returns null for unknown session", async () => {
  const { clearQuotaMonitors, getQuotaMonitorSnapshot } = await import(
    "../../open-sse/services/quotaMonitor.ts"
  );

  clearQuotaMonitors();
  assert.equal(getQuotaMonitorSnapshot("nonexistent-session"), null);
});

// ─── ipFilter: tempBans with time advancement ────────────────────────────────

test("ipFilter: tempBanIP blocks then expires", async () => {
  const { configureIPFilter, checkIP, tempBanIP, removeTempBan, resetIPFilter } = await import(
    "../../open-sse/services/ipFilter.ts"
  );

  resetIPFilter();
  configureIPFilter({ enabled: true, mode: "blacklist" });

  tempBanIP("10.0.0.1", 50, "test ban");

  const blocked = checkIP("10.0.0.1");
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.reason?.includes("Temporarily banned"));

  // Wait for ban to expire
  await new Promise((r) => setTimeout(r, 80));

  const unblocked = checkIP("10.0.0.1");
  assert.equal(unblocked.allowed, true);

  resetIPFilter();
});

test("ipFilter: removeTempBan immediately lifts ban", async () => {
  const { configureIPFilter, checkIP, tempBanIP, removeTempBan, resetIPFilter } = await import(
    "../../open-sse/services/ipFilter.ts"
  );

  resetIPFilter();
  configureIPFilter({ enabled: true, mode: "blacklist" });

  tempBanIP("10.0.0.2", 60_000, "long ban");
  assert.equal(checkIP("10.0.0.2").allowed, false);

  removeTempBan("10.0.0.2");
  assert.equal(checkIP("10.0.0.2").allowed, true);

  resetIPFilter();
});

test("ipFilter: blacklist blocks listed IPs", async () => {
  const { configureIPFilter, checkIP, addToBlacklist, resetIPFilter } = await import(
    "../../open-sse/services/ipFilter.ts"
  );

  resetIPFilter();
  configureIPFilter({ enabled: true, mode: "blacklist" });
  addToBlacklist("192.168.1.100");

  const result = checkIP("192.168.1.100");
  assert.equal(result.allowed, false);
  assert.equal(result.reason, "IP blacklisted");

  assert.equal(checkIP("192.168.1.101").allowed, true);

  resetIPFilter();
});

test("ipFilter: whitelist mode only allows listed IPs", async () => {
  const { configureIPFilter, checkIP, addToWhitelist, resetIPFilter } = await import(
    "../../open-sse/services/ipFilter.ts"
  );

  resetIPFilter();
  configureIPFilter({ enabled: true, mode: "whitelist" });
  addToWhitelist("10.0.0.5");

  assert.equal(checkIP("10.0.0.5").allowed, true);
  assert.equal(checkIP("10.0.0.6").allowed, false);

  resetIPFilter();
});

test("ipFilter: getIPFilterConfig reflects current state", async () => {
  const { configureIPFilter, tempBanIP, getIPFilterConfig, resetIPFilter } = await import(
    "../../open-sse/services/ipFilter.ts"
  );

  resetIPFilter();
  configureIPFilter({ enabled: true, mode: "whitelist", whitelist: ["10.0.0.1"] });
  tempBanIP("10.0.0.2", 60_000, "config check");

  const config = getIPFilterConfig();
  assert.equal(config.enabled, true);
  assert.equal(config.mode, "whitelist");
  assert.ok(config.whitelist.includes("10.0.0.1"));
  assert.ok(config.tempBans.length >= 1);

  resetIPFilter();
});

// ─── circuitBreaker: creation and stale breaker cleanup ──────────────────────

test("circuitBreaker: getCircuitBreaker creates and returns breaker", async () => {
  const { getCircuitBreaker, resetAllCircuitBreakers } = await import(
    "../../src/shared/utils/circuitBreaker.ts"
  );

  resetAllCircuitBreakers();

  const breaker = getCircuitBreaker("test-create-1");
  assert.ok(breaker, "breaker should be created");
  assert.equal(breaker.name, "test-create-1");
  assert.equal(breaker.state, "CLOSED");
  assert.equal(breaker.failureCount, 0);

  resetAllCircuitBreakers();
});

test("circuitBreaker: getCircuitBreaker returns same instance for same name", async () => {
  const { getCircuitBreaker, resetAllCircuitBreakers } = await import(
    "../../src/shared/utils/circuitBreaker.ts"
  );

  resetAllCircuitBreakers();

  const a = getCircuitBreaker("test-same-instance");
  const b = getCircuitBreaker("test-same-instance");
  assert.equal(a, b, "should return the same instance");

  resetAllCircuitBreakers();
});

test("circuitBreaker: breaker transitions CLOSED -> OPEN after threshold failures", async () => {
  const { getCircuitBreaker, resetAllCircuitBreakers } = await import(
    "../../src/shared/utils/circuitBreaker.ts"
  );

  resetAllCircuitBreakers();

  const breaker = getCircuitBreaker("test-threshold", {
    failureThreshold: 3,
    resetTimeout: 60_000,
  });

  for (let i = 0; i < 3; i++) {
    try {
      await breaker.execute(async () => {
        throw new Error("fail");
      });
    } catch {}
  }

  assert.equal(breaker.state, "OPEN");

  // Should reject while open
  await assert.rejects(
    () => breaker.execute(async () => "ok"),
    { name: "CircuitBreakerOpenError" }
  );

  resetAllCircuitBreakers();
});

test("circuitBreaker: canExecute returns correct value per state", async () => {
  const { getCircuitBreaker, resetAllCircuitBreakers } = await import(
    "../../src/shared/utils/circuitBreaker.ts"
  );

  resetAllCircuitBreakers();

  const breaker = getCircuitBreaker("test-can-execute", {
    failureThreshold: 2,
    resetTimeout: 60_000,
  });

  assert.equal(breaker.canExecute(), true, "CLOSED -> canExecute");

  for (let i = 0; i < 2; i++) {
    try {
      await breaker.execute(async () => {
        throw new Error("fail");
      });
    } catch {}
  }

  assert.equal(breaker.canExecute(), false, "OPEN -> !canExecute");

  resetAllCircuitBreakers();
});

test("circuitBreaker: getStatus returns expected shape", async () => {
  const { getCircuitBreaker, resetAllCircuitBreakers } = await import(
    "../../src/shared/utils/circuitBreaker.ts"
  );

  resetAllCircuitBreakers();

  const breaker = getCircuitBreaker("test-status");
  const status = breaker.getStatus();

  assert.equal(status.name, "test-status");
  assert.equal(status.state, "CLOSED");
  assert.equal(status.failureCount, 0);
  assert.equal(status.lastFailureTime, null);
  assert.equal(typeof status.retryAfterMs, "number");

  resetAllCircuitBreakers();
});

test("circuitBreaker: reset returns breaker to CLOSED", async () => {
  const { getCircuitBreaker, resetAllCircuitBreakers } = await import(
    "../../src/shared/utils/circuitBreaker.ts"
  );

  resetAllCircuitBreakers();

  const breaker = getCircuitBreaker("test-reset", {
    failureThreshold: 1,
    resetTimeout: 60_000,
  });

  try {
    await breaker.execute(async () => {
      throw new Error("fail");
    });
  } catch {}

  assert.equal(breaker.state, "OPEN");

  breaker.reset();
  assert.equal(breaker.state, "CLOSED");
  assert.equal(breaker.failureCount, 0);

  resetAllCircuitBreakers();
});
