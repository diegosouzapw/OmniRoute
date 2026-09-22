import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";
import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-health-autopilot-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const autopilot = await import("../../../src/lib/monitoring/providerHealthAutopilot.ts");
const actionsRoute =
  await import("../../../src/app/api/providers/health-autopilot/actions/route.ts");
const reportRoute = await import("../../../src/app/api/providers/health-autopilot/route.ts");
const routeGuard = await import("../../../src/server/authz/routeGuard.ts");
const authzPipeline = await import("../../../src/server/authz/pipeline.ts");
const accountFallback = await import("@omniroute/open-sse/services/accountFallback");
const quotaMonitor = await import("@omniroute/open-sse/services/quotaMonitor.ts");

const PROVIDER = "autopilot-test-provider";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "autopilot-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
}

async function createCooldownConnection(provider = PROVIDER) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "cooling-key",
    apiKey: "test-key",
    isActive: true,
    testStatus: "unavailable",
    lastError: "rate limited",
    lastErrorType: "upstream_rate_limited",
    errorCode: "429",
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
  }) as Promise<Record<string, unknown>>;
}

function findAction(report: autopilot.ProviderAutopilotReport, type: string) {
  for (const provider of report.providers) {
    for (const issue of provider.issues) {
      const action = issue.actions.find((candidate) => candidate.type === type);
      if (action) return action;
    }
  }
  return null;
}

test.beforeEach(async () => {
  accountFallback.clearProviderFailure(PROVIDER);
  quotaMonitor.clearQuotaMonitors();
  await resetStorage();
});

test.after(async () => {
  accountFallback.clearProviderFailure(PROVIDER);
  quotaMonitor.clearQuotaMonitors();
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;

  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;

  if (ORIGINAL_JWT_SECRET === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
});

test("provider health autopilot reports actionable cooldown and model lockout issues", async () => {
  const connection = await createCooldownConnection();
  accountFallback.lockModel(
    PROVIDER,
    String(connection.id),
    "locked-model",
    "quota_exhausted",
    60_000,
    {}
  );

  try {
    const report = await autopilot.buildProviderHealthAutopilotReport({
      provider: PROVIDER,
      includeHealthy: true,
    });

    assert.equal(report.status, "warning");
    assert.equal(report.summary.connectionCount, 1);
    assert.ok(report.summary.issueCount >= 2);
    assert.ok(findAction(report, "clear_connection_cooldown"));
    assert.ok(findAction(report, "clear_model_lockout"));

    const provider = report.providers.find((entry) => entry.provider === PROVIDER);
    assert.ok(provider);
    assert.equal(provider.signals.connections.cooldown, 1);
    assert.equal(provider.signals.modelLockouts, 1);
  } finally {
    accountFallback.clearModelLock(PROVIDER, String(connection.id), "locked-model");
  }
});

test("provider health autopilot keeps disabled-only inventory visible without degrading routing", async () => {
  const baseline = await autopilot.buildProviderHealthAutopilotReport({ includeHealthy: true });
  await providersDb.createProviderConnection({
    provider: "disabled-clean-provider",
    authType: "apikey",
    name: "disabled-clean",
    apiKey: "test-key",
    isActive: false,
    testStatus: "active",
  });
  await providersDb.createProviderConnection({
    provider: "disabled-terminal-provider",
    authType: "apikey",
    name: "disabled-terminal",
    apiKey: "test-key",
    isActive: false,
    testStatus: "banned",
    lastError: "forbidden",
    lastErrorType: "forbidden",
    errorCode: "403",
  });

  const report = await autopilot.buildProviderHealthAutopilotReport({ includeHealthy: true });

  assert.equal(report.status, "healthy");
  assert.equal(report.summary.providerCount, baseline.summary.providerCount + 2);
  assert.equal(report.summary.healthyCount, baseline.summary.healthyCount + 2);
  assert.equal(report.summary.issueCount, baseline.summary.issueCount + 2);

  const clean = report.providers.find((entry) => entry.provider === "disabled-clean-provider");
  assert.ok(clean);
  assert.equal(clean.state, "healthy");
  assert.equal(clean.score, 1);
  assert.deepEqual(
    clean.issues.map((issue) => issue.kind),
    ["inactive_connection"]
  );

  const terminal = report.providers.find(
    (entry) => entry.provider === "disabled-terminal-provider"
  );
  assert.ok(terminal);
  assert.equal(terminal.state, "healthy");
  assert.equal(terminal.score, 1);
  assert.deepEqual(
    terminal.issues.map((issue) => issue.kind),
    ["terminal_connection_error"]
  );
  assert.equal(terminal.issues[0].severity, "critical");
});

test("provider health autopilot keeps active info-only diagnostics healthy", async () => {
  const providerId = "active-info-only-provider";
  await providersDb.createProviderConnection({
    provider: providerId,
    authType: "apikey",
    name: "active-with-stale-error",
    apiKey: "test-key",
    isActive: true,
    testStatus: "unavailable",
    lastError: "historical upstream error",
    lastErrorType: "upstream_error",
    errorCode: "503",
  });

  const report = await autopilot.buildProviderHealthAutopilotReport({
    provider: providerId,
    includeHealthy: false,
  });

  assert.equal(report.status, "healthy");
  assert.equal(report.summary.providerCount, 1);
  assert.equal(report.summary.healthyCount, 1);
  assert.equal(report.summary.issueCount, 1);
  assert.equal(report.providers.length, 1);
  assert.equal(report.providers[0].state, "healthy");
  assert.equal(report.providers[0].issues[0].kind, "stale_connection_error");
  assert.equal(report.providers[0].issues[0].severity, "info");
});

test("provider health autopilot exposes quota monitor account ids without credentials", async () => {
  const providerId = "account-scoped-monitor-provider";
  const monitored = (await providersDb.createProviderConnection({
    provider: providerId,
    authType: "apikey",
    name: "monitored-account",
    apiKey: "monitored-secret",
    isActive: true,
    testStatus: "active",
  })) as Record<string, unknown>;
  const unmonitored = (await providersDb.createProviderConnection({
    provider: providerId,
    authType: "apikey",
    name: "unmonitored-account",
    apiKey: "unmonitored-secret",
    isActive: true,
    testStatus: "active",
  })) as Record<string, unknown>;
  quotaMonitor.startQuotaMonitor("account-scope-session", providerId, String(monitored.id), {
    providerSpecificData: { quotaMonitorEnabled: true },
  });

  const report = await autopilot.buildProviderHealthAutopilotReport({
    provider: providerId,
    includeHealthy: true,
  });
  const provider = report.providers[0];
  const signal = provider.signals.quotaMonitor as Record<string, unknown>;

  assert.deepEqual(signal.monitoredConnectionIds, [String(monitored.id)]);
  assert.equal((signal.monitoredConnectionIds as string[]).includes(String(unmonitored.id)), false);
  assert.equal(JSON.stringify(signal).includes("monitored-secret"), false);
  assert.equal(JSON.stringify(signal).includes("unmonitored-secret"), false);
});

test("provider health autopilot summary and status do not depend on healthy-row filtering", async () => {
  const baseline = await autopilot.buildProviderHealthAutopilotReport({ includeHealthy: true });
  await providersDb.createProviderConnection({
    provider: "active-healthy-provider",
    authType: "apikey",
    name: "active-healthy",
    apiKey: "test-key",
    isActive: true,
    testStatus: "active",
  });
  await providersDb.createProviderConnection({
    provider: "disabled-inventory-provider",
    authType: "apikey",
    name: "disabled-inventory",
    apiKey: "test-key",
    isActive: false,
    testStatus: "active",
  });

  const full = await autopilot.buildProviderHealthAutopilotReport({ includeHealthy: true });
  const filtered = await autopilot.buildProviderHealthAutopilotReport({ includeHealthy: false });

  assert.equal(full.status, "healthy");
  assert.equal(filtered.status, full.status);
  assert.deepEqual(filtered.summary, full.summary);
  assert.equal(full.providers.length, baseline.providers.length + 2);
  const disabled = filtered.providers.find(
    (entry) => entry.provider === "disabled-inventory-provider"
  );
  assert.ok(disabled);
  assert.equal(disabled.state, "healthy");
  assert.equal(disabled.issues[0].kind, "inactive_connection");
  assert.equal(
    filtered.providers.some((entry) => entry.provider === "active-healthy-provider"),
    false
  );
});

test("provider health autopilot canonicalizes alias-keyed signals while preserving raw breaker actions", async () => {
  const canonicalProvider = "nous-research";
  const aliasProvider = "nous";
  const connection = await createCooldownConnection(canonicalProvider);
  for (let failure = 0; failure < 20; failure += 1) {
    accountFallback.recordProviderFailure(aliasProvider);
  }
  accountFallback.lockModel(
    aliasProvider,
    String(connection.id),
    "alias-locked-model",
    "quota",
    60_000,
    {}
  );

  try {
    const report = await autopilot.buildProviderHealthAutopilotReport({
      provider: aliasProvider,
      includeHealthy: true,
    });
    assert.equal(report.providers.length, 1);
    const provider = report.providers[0];
    assert.equal(provider.provider, canonicalProvider);
    assert.equal(provider.signals.connections.total, 1);
    assert.equal(provider.signals.modelLockouts, 1);

    const clearBreaker = findAction(report, "clear_provider_breaker");
    assert.ok(clearBreaker);
    assert.equal(clearBreaker.target.provider, aliasProvider);

    const applied = await autopilot.executeProviderHealthAutopilotAction({
      type: clearBreaker.type,
      target: clearBreaker.target,
      preconditionsHash: clearBreaker.preconditionsHash,
      confirm: true,
    });
    assert.equal(applied.status, 200);

    const afterReset = await autopilot.buildProviderHealthAutopilotReport({
      provider: aliasProvider,
      includeHealthy: true,
    });
    assert.equal(
      afterReset.providers[0].issues.some((issue) => issue.kind === "provider_circuit_open"),
      false
    );
  } finally {
    accountFallback.clearModelLock(aliasProvider, String(connection.id), "alias-locked-model");
    accountFallback.clearProviderFailure(aliasProvider);
  }
});

test("provider health autopilot action clears cooldown with stale-state protection", async () => {
  await enableManagementAuth();
  const connection = await createCooldownConnection();
  const report = await autopilot.buildProviderHealthAutopilotReport({
    provider: PROVIDER,
    includeHealthy: true,
  });
  const action = findAction(report, "clear_connection_cooldown");
  assert.ok(action);

  const unauthenticated = await actionsRoute.POST(
    new Request("http://localhost/api/providers/health-autopilot/actions", {
      method: "POST",
      body: JSON.stringify({
        type: action.type,
        target: action.target,
        preconditionsHash: action.preconditionsHash,
        confirm: true,
      }),
    })
  );
  assert.equal(unauthenticated.status, 401);

  const stale = await actionsRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/providers/health-autopilot/actions", {
      method: "POST",
      body: {
        type: action.type,
        target: action.target,
        preconditionsHash: "stale-hash",
        confirm: true,
      },
    })
  );
  assert.equal(stale.status, 409);

  const applied = await actionsRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/providers/health-autopilot/actions", {
      method: "POST",
      headers: { origin: "http://localhost", "sec-fetch-site": "same-origin" },
      body: {
        type: action.type,
        target: action.target,
        preconditionsHash: action.preconditionsHash,
        confirm: true,
      },
    })
  );
  assert.equal(applied.status, 200);
  const body = await applied.json();
  assert.equal(body.success, true);

  const updated = (await providersDb.getProviderConnectionById(String(connection.id))) as Record<
    string,
    unknown
  >;
  assert.equal(updated.rateLimitedUntil, undefined);
  assert.equal(updated.lastError, undefined);
  assert.equal(updated.testStatus, "active");
});

test("provider health autopilot action rejects cross-site mutations", async () => {
  // Cross-site origin validation for browser mutations is centralized in the authz
  // pipeline (#5278): the per-route same-origin check was removed from the actions
  // handler and is now enforced by validateBrowserMutationOrigin inside runAuthzPipeline
  // for MANAGEMENT routes with an unsafe method + dashboard session. Drive the request
  // through the pipeline (the real enforcement point) and assert it is blocked with 403
  // before the route runs, leaving the connection untouched.
  await enableManagementAuth();
  const connection = await createCooldownConnection();
  const report = await autopilot.buildProviderHealthAutopilotReport({
    provider: PROVIDER,
    includeHealthy: true,
  });
  const action = findAction(report, "clear_connection_cooldown");
  assert.ok(action);

  const rawRequest = await makeManagementSessionRequest(
    "http://localhost/api/providers/health-autopilot/actions",
    {
      method: "POST",
      headers: { origin: "https://evil.example", "sec-fetch-site": "cross-site" },
      body: {
        type: action.type,
        target: action.target,
        preconditionsHash: action.preconditionsHash,
        confirm: true,
      },
    }
  );
  const response = await authzPipeline.runAuthzPipeline(new NextRequest(rawRequest), {
    enforce: true,
  });

  assert.equal(response.status, 403);
  assert.equal(response.headers.get("x-omniroute-route-class"), "MANAGEMENT");
  // The pipeline blocks before the route handler runs, so the cooldown is untouched.
  const unchanged = (await providersDb.getProviderConnectionById(String(connection.id))) as Record<
    string,
    unknown
  >;
  assert.ok(unchanged.rateLimitedUntil);
});

test("provider health autopilot action accepts LAN dashboard requests (#6277)", async () => {
  // #6277: Docker/LAN deployments (accessed via LAN IP, not localhost) got a
  // spurious 403 "Invalid request origin" clicking "remove cooldown". Root
  // cause: this route carried a DUPLICATE per-route validateBrowserMutationOrigin
  // check re-added by the v3.8.42 release squash after PR #5278 centralized
  // origin enforcement in the authz pipeline. The pipeline's centralized check
  // (src/server/authz/pipeline.ts) strips PEER_IP_HEADER before forwarding the
  // request to the route handler, so by the time this handler runs the peer
  // stamp is gone — exactly what a real post-middleware request looks like.
  // The route must trust the pipeline's verdict and NOT re-validate origin
  // itself; without PEER_IP_HEADER, the per-route check cannot resolve the LAN
  // "direct-local-host" candidate and rejects a same-origin-but-LAN mutation.
  await enableManagementAuth();
  const connection = await createCooldownConnection();
  const report = await autopilot.buildProviderHealthAutopilotReport({
    provider: PROVIDER,
    includeHealthy: true,
  });
  const action = findAction(report, "clear_connection_cooldown");
  assert.ok(action);

  const request = await makeManagementSessionRequest(
    "http://localhost/api/providers/health-autopilot/actions",
    {
      method: "POST",
      headers: { origin: "http://192.168.1.50:20128", "sec-fetch-site": "same-origin" },
      body: {
        type: action.type,
        target: action.target,
        preconditionsHash: action.preconditionsHash,
        confirm: true,
      },
    }
  );
  assert.equal(request.headers.get("x-omniroute-peer-ip"), null);

  const response = await actionsRoute.POST(request);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.success, true);
});

test("provider health autopilot action rejects malformed JSON", async () => {
  await enableManagementAuth();

  const response = await actionsRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/providers/health-autopilot/actions", {
      method: "POST",
      body: "{not-json",
    })
  );

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.equal(body.error.message, "Invalid JSON body");
});

test("provider health autopilot action route is always protected", () => {
  assert.equal(routeGuard.isAlwaysProtectedPath("/api/providers/health-autopilot/actions"), true);
});

test("provider health autopilot report route requires management auth", async () => {
  await enableManagementAuth();
  await createCooldownConnection();

  const unauthenticated = await reportRoute.GET(
    new Request("http://localhost/api/providers/health-autopilot")
  );
  assert.equal(unauthenticated.status, 401);

  const authenticated = await reportRoute.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/providers/health-autopilot?includeHealthy=true"
    )
  );
  assert.equal(authenticated.status, 200);
  const body = await authenticated.json();
  assert.equal(body.summary.connectionCount, 1);
});
