import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-health-autopilot-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const autopilot = await import("../../src/lib/monitoring/providerHealthAutopilot.ts");
const actionsRoute = await import("../../src/app/api/providers/health-autopilot/actions/route.ts");
const reportRoute = await import("../../src/app/api/providers/health-autopilot/route.ts");
const routeGuard = await import("../../src/server/authz/routeGuard.ts");
const authzPipeline = await import("../../src/server/authz/pipeline.ts");
const accountFallback = await import("@omniroute/open-sse/services/accountFallback");

const PROVIDER = "autopilot-test-provider";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
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
  await resetStorage();
});

test.after(async () => {
  accountFallback.clearProviderFailure(PROVIDER);
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

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
