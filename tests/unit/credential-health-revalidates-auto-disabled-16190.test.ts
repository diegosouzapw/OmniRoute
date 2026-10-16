/**
 * #16190: a connection the gateway switched off by itself (refresh retry budget
 * exhausted, auto-disable after a ban-looking diagnosis, ...) was never tested
 * again. The credential-health sweep only loads `isActive: true` rows, so a
 * credential that recovered stayed out of rotation until an operator re-tested
 * it by hand.
 *
 * The sweep now gives those connections a slow, capped retest, and a passing
 * test switches them back on. It never touches a connection an operator
 * switched off (operatorDisabledAt, #14941; the connection toggle and the
 * health autopilot card both record it), a connection that was never
 * activated, or an inactive row that carries no record of who switched it off:
 * rows written before the operator marker existed look exactly like operator
 * choices, so only an explicit automatic-disable marker opts a row in.
 *
 * Provider validation is stubbed (no real network), same pattern as
 * tests/unit/connection-test-respects-operator-disable.test.ts. The sweep runs
 * under a mocked clock so the retest interval can elapse without waiting.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { mock } from "node:test";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-revalidate-16190-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "revalidate-auto-disabled-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK = "true";

const VALIDATION_HOST = "https://proxy.revalidate-16190.example.com";
const VALIDATION_PATH = /^https:\/\/proxy\.revalidate-16190\.example\.com\/([a-z0-9-]+)\/v1\//;
const HOUR_MS = 60 * 60 * 1000;

// Per-node probe accounting: each node gets its own base URL, so a test can tell
// whether ITS connection was probed and make only ITS probes fail.
const probeCalls = new Map<string, number>();
const failingNodes = new Set<string>();
const originalFetch = globalThis.fetch;
globalThis.fetch = (async (input: string | URL | Request) => {
  const url =
    typeof input === "string" ? input : input instanceof Request ? input.url : input.toString();
  const match = VALIDATION_PATH.exec(url);
  if (match) {
    const node = match[1];
    probeCalls.set(node, (probeCalls.get(node) ?? 0) + 1);
    if (failingNodes.has(node)) {
      return new Response(JSON.stringify({ error: { message: "invalid api key" } }), {
        status: 401,
      });
    }
    return new Response(JSON.stringify({ data: [] }), { status: 200 });
  }
  return new Response("not found", { status: 404 });
}) as typeof fetch;

const core = await import("../../src/lib/db/core.ts");
const providerNodesRoute = await import("../../src/app/api/provider-nodes/route.ts");
const providersRoute = await import("../../src/app/api/providers/route.ts");
const providerByIdRoute = await import("../../src/app/api/providers/[id]/route.ts");
const { testSingleConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");
const { updateProviderConnection } = await import("../../src/lib/db/providers.ts");
const scheduler = await import("../../src/lib/credentialHealth/scheduler.ts");
const operatorDisable = await import("../../src/lib/providers/operatorDisable.ts");
const autopilot = await import("../../src/lib/monitoring/providerHealthAutopilot.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");

const OPERATOR_DISABLED_AT_KEY = operatorDisable.OPERATOR_DISABLED_AT_KEY;
// Not imported from the module on purpose: the marker is persisted JSON, and the
// name is part of the stored contract.
const AUTO_DISABLED_AT_KEY = "autoDisabledAt";
const BASE_NOW = Date.now();

async function readJsonObject(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();
  try {
    const parsed = JSON.parse(text) as unknown;
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

const settle = () => new Promise((resolve) => setTimeout(resolve, 50));

async function createConnection(node: string): Promise<string> {
  const nodeResponse = await providerNodesRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/provider-nodes", {
      method: "POST",
      body: {
        type: "openai-compatible",
        name: `Revalidate ${node}`,
        prefix: node,
        apiType: "chat",
        baseUrl: `${VALIDATION_HOST}/${node}/v1`,
      },
    })
  );
  const nodeBody = await readJsonObject(nodeResponse);
  assert.equal(
    nodeResponse.status,
    201,
    `create provider-node failed: ${JSON.stringify(nodeBody)}`
  );
  const nodeId = (nodeBody.node as { id: string }).id;

  const response = await providersRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/providers", {
      method: "POST",
      body: { provider: nodeId, apiKey: `sk-revalidate-${node}`, name: `Revalidate ${node}` },
    })
  );
  const body = await readJsonObject(response);
  assert.equal(response.status, 201, `create connection failed: ${JSON.stringify(body)}`);
  // POST fires a background auto-test; let it land before the test acts.
  await settle();
  return (body.connection as { id: string }).id;
}

async function activeConnection(node: string): Promise<string> {
  const connectionId = await createConnection(node);
  const result = await testSingleConnection(connectionId);
  assert.equal(result.valid, true, `expected a passing test, got ${JSON.stringify(result)}`);
  assert.equal(readRow(connectionId).isActive, 1, "a passing test activates a new connection");
  return connectionId;
}

/** The gateway switching a connection off by itself, e.g. tokenHealthCheck's refresh budget. */
async function gatewayDisable(connectionId: string): Promise<void> {
  await updateProviderConnection(connectionId, {
    isActive: false,
    testStatus: "expired",
    lastError: "Refresh token rejected (upstream_auth_error). Please re-authenticate this account.",
    lastErrorAt: new Date().toISOString(),
    lastErrorType: "upstream_auth_error",
    errorCode: "401",
  });
  assert.equal(readRow(connectionId).isActive, 0);
}

async function operatorSetActive(connectionId: string, isActive: boolean): Promise<void> {
  const response = await providerByIdRoute.PUT(
    await makeManagementSessionRequest(`http://localhost/api/providers/${connectionId}`, {
      method: "PUT",
      body: { isActive },
    }),
    { params: Promise.resolve({ id: connectionId }) }
  );
  assert.equal(response.status, 200, `PUT isActive failed: ${await response.text()}`);
}

/** An operator confirming a Provider Health Autopilot card action, as the dashboard does. */
async function applyAutopilotAction(
  connectionId: string,
  type: "deactivate_connection" | "reactivate_connection"
): Promise<void> {
  const { provider } = core
    .getDbInstance()
    .prepare("SELECT provider FROM provider_connections WHERE id = ?")
    .get(connectionId) as { provider: string };
  const report = await autopilot.buildProviderHealthAutopilotReport({
    provider,
    includeHealthy: true,
    includeActions: true,
  });
  const action = report.providers
    .flatMap((entry) => entry.issues)
    .flatMap((issue) => issue.actions)
    .find((candidate) => candidate.type === type && candidate.target.connectionId === connectionId);
  assert.ok(action, `the autopilot offers ${type} for this connection`);
  const result = await autopilot.executeProviderHealthAutopilotAction({
    type,
    target: action.target,
    preconditionsHash: action.preconditionsHash,
    confirm: true,
  });
  assert.equal(result.status, 200, `autopilot ${type} failed: ${JSON.stringify(result.body)}`);
}

function readRow(connectionId: string): {
  isActive: number;
  testStatus: string | null;
  lastTested: string | null;
  psd: Record<string, unknown>;
} {
  const row = core
    .getDbInstance()
    .prepare(
      `SELECT is_active, test_status, last_tested, provider_specific_data
       FROM provider_connections WHERE id = ?`
    )
    .get(connectionId) as {
    is_active: number;
    test_status: string | null;
    last_tested: string | null;
    provider_specific_data: string | null;
  };
  return {
    isActive: row.is_active,
    testStatus: row.test_status,
    lastTested: row.last_tested,
    psd: row.provider_specific_data ? JSON.parse(row.provider_specific_data) : {},
  };
}

/** Run one credential-health sweep as if `offsetMs` had passed since the suite started. */
async function sweepAt(offsetMs: number): Promise<void> {
  mock.timers.enable({ apis: ["Date"], now: BASE_NOW + offsetMs });
  try {
    await scheduler.forceSweep();
  } finally {
    mock.timers.reset();
  }
}

test.after(() => {
  scheduler.stopCredentialHealthCheck();
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("an automated switch-off records the automatic-disable marker; switch-on and operator intent clear it", async () => {
  const connectionId = await activeConnection("marker");

  await gatewayDisable(connectionId);
  assert.equal(
    typeof readRow(connectionId).psd[AUTO_DISABLED_AT_KEY],
    "string",
    "an isActive:false write that did not come from an operator toggle is an automatic disable"
  );

  await updateProviderConnection(connectionId, { isActive: true });
  assert.equal(AUTO_DISABLED_AT_KEY in readRow(connectionId).psd, false, "switch-on clears it");

  await gatewayDisable(connectionId);
  await operatorSetActive(connectionId, false);
  const operatorOff = readRow(connectionId);
  assert.equal(typeof operatorOff.psd[OPERATOR_DISABLED_AT_KEY], "string");
  assert.equal(
    AUTO_DISABLED_AT_KEY in operatorOff.psd,
    false,
    "an operator switch-off supersedes the automatic marker"
  );
});

test("the sweep switches a gateway-disabled connection back on once its retest passes", async () => {
  const connectionId = await activeConnection("recovers");
  await gatewayDisable(connectionId);

  await sweepAt(7 * HOUR_MS);

  const row = readRow(connectionId);
  assert.equal(row.isActive, 1, "a passing retest must switch a gateway-disabled connection on");
  assert.equal(row.testStatus, "active");
  assert.equal(AUTO_DISABLED_AT_KEY in row.psd, false, "the marker is gone once it is back on");
});

test("the retest is rate limited, and a failing retest keeps the connection off", async () => {
  const node = "still-broken";
  const connectionId = await activeConnection(node);
  await gatewayDisable(connectionId);
  failingNodes.add(node);
  const callsAt = () => probeCalls.get(node) ?? 0;
  const before = callsAt();

  await sweepAt(30 * 60 * 1000);
  assert.equal(callsAt(), before, "no retest right after the gateway switched it off");

  await sweepAt(7 * HOUR_MS);
  const afterFirstRetest = callsAt();
  assert.ok(afterFirstRetest > before, "one retest once the revalidation interval has elapsed");
  assert.equal(readRow(connectionId).isActive, 0, "a failing retest keeps it off");

  await sweepAt(8 * HOUR_MS);
  assert.equal(callsAt(), afterFirstRetest, "a failing retest is not repeated in the next sweep");

  await sweepAt(14 * HOUR_MS);
  assert.ok(callsAt() > afterFirstRetest, "retested again after another interval");
  assert.equal(readRow(connectionId).isActive, 0);
});

test("a connection an operator switched off is never retested by the sweep", async () => {
  const node = "operator-off";
  const connectionId = await activeConnection(node);
  // Even one the gateway had switched off first: the operator's choice wins.
  await gatewayDisable(connectionId);
  await operatorSetActive(connectionId, false);
  const before = probeCalls.get(node) ?? 0;

  await sweepAt(30 * HOUR_MS);

  assert.equal(probeCalls.get(node) ?? 0, before, "an operator-disabled connection is not probed");
  assert.equal(readRow(connectionId).isActive, 0);
});

test("a connection switched off from the health autopilot card is an operator choice and stays off", async () => {
  const node = "autopilot-off";
  const connectionId = await activeConnection(node);
  // The card offers "Disable this connection" on a connection in cooldown.
  await updateProviderConnection(connectionId, {
    testStatus: "unavailable",
    lastError: "rate limited",
    lastErrorType: "upstream_rate_limited",
    errorCode: "429",
    rateLimitedUntil: new Date(BASE_NOW + HOUR_MS).toISOString(),
  });
  await applyAutopilotAction(connectionId, "deactivate_connection");
  const off = readRow(connectionId);
  assert.equal(off.isActive, 0);
  assert.equal(typeof off.psd[OPERATOR_DISABLED_AT_KEY], "string", "operator intent is recorded");
  assert.equal(AUTO_DISABLED_AT_KEY in off.psd, false);
  const before = probeCalls.get(node) ?? 0;

  // Long after the cooldown is over.
  await sweepAt(30 * HOUR_MS);
  assert.equal(probeCalls.get(node) ?? 0, before, "the sweep never retests it");
  assert.equal(readRow(connectionId).isActive, 0);

  const result = await testSingleConnection(connectionId);
  assert.equal(result.valid, true);
  assert.equal(readRow(connectionId).isActive, 0, "a passing test leaves it off, like the toggle");
});

test("reactivating from the health autopilot card clears the operator marker", async () => {
  const connectionId = await activeConnection("autopilot-on");
  await operatorSetActive(connectionId, false);

  await applyAutopilotAction(connectionId, "reactivate_connection");
  const on = readRow(connectionId);
  assert.equal(on.isActive, 1);
  assert.equal(OPERATOR_DISABLED_AT_KEY in on.psd, false, "the operator switched it back on");

  // So a later automatic switch-off is recorded as one.
  await gatewayDisable(connectionId);
  assert.equal(typeof readRow(connectionId).psd[AUTO_DISABLED_AT_KEY], "string");
});

test("an inactive row with no record of who switched it off is left alone", async () => {
  const node = "legacy-off";
  const connectionId = await activeConnection(node);
  // How a pre-#14941 operator toggle left the row: no marker of either kind.
  core
    .getDbInstance()
    .prepare("UPDATE provider_connections SET is_active = 0 WHERE id = ?")
    .run(connectionId);
  const before = probeCalls.get(node) ?? 0;

  await sweepAt(30 * HOUR_MS);

  assert.equal(probeCalls.get(node) ?? 0, before, "an unmarked inactive row is not probed");
  assert.equal(readRow(connectionId).isActive, 0);
});

test("a connection that was never activated is not picked up", async () => {
  const node = "never-active";
  failingNodes.add(node);
  const connectionId = await createConnection(node);
  assert.equal(readRow(connectionId).isActive, 0, "a failing creation test leaves it inactive");
  failingNodes.delete(node);
  const before = probeCalls.get(node) ?? 0;

  await sweepAt(30 * HOUR_MS);

  assert.equal(
    probeCalls.get(node) ?? 0,
    before,
    "creation-time failures still wait for a re-test"
  );
  assert.equal(readRow(connectionId).isActive, 0);
});

test("a banned connection the gateway switched off is never retested", async () => {
  // The terminal write (testStatus banned), a ban recorded only as lastErrorType
  // (defensive), and the combo-managed deactivation, which flips isActive off,
  // records account_deactivated and leaves testStatus as it was.
  const shapes: Array<[string, Record<string, unknown>]> = [
    ["banned-terminal", { testStatus: "banned", lastErrorType: "forbidden", errorCode: "403" }],
    ["banned-combo", { lastErrorType: "forbidden", errorCode: "403" }],
    ["deactivated-combo", { lastErrorType: "account_deactivated", errorCode: "401" }],
  ];
  for (const [node, patch] of shapes) {
    const connectionId = await activeConnection(node);
    await updateProviderConnection(connectionId, { isActive: false, ...patch });
    assert.equal(typeof readRow(connectionId).psd[AUTO_DISABLED_AT_KEY], "string", node);
    const before = probeCalls.get(node) ?? 0;

    await sweepAt(30 * HOUR_MS);

    assert.equal(probeCalls.get(node) ?? 0, before, `${node}: a banned account is not probed`);
    assert.equal(readRow(connectionId).isActive, 0, `${node}: a banned account stays off`);
  }
});

test("a cooldown still in force postpones the retest whatever the testStatus", async () => {
  const node = "cooling-down";
  const connectionId = await activeConnection(node);
  await updateProviderConnection(connectionId, {
    isActive: false,
    testStatus: "credits_exhausted",
    rateLimitedUntil: new Date(BASE_NOW + 48 * HOUR_MS).toISOString(),
  });
  const before = probeCalls.get(node) ?? 0;

  await sweepAt(30 * HOUR_MS);
  assert.equal(probeCalls.get(node) ?? 0, before, "no retest before rateLimitedUntil");

  await sweepAt(49 * HOUR_MS);
  assert.ok((probeCalls.get(node) ?? 0) > before, "retested once the cooldown is over");
});

test("an unverifiable retest does not switch a gateway-disabled connection back on", async () => {
  const connectionId = "auto-disabled-unverifiable-16190";
  const disabledAt = new Date(BASE_NOW - HOUR_MS).toISOString();
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO provider_connections
       (id, provider, auth_type, name, api_key, is_active, test_status,
        provider_specific_data, created_at, updated_at)
       VALUES (?, ?, 'apikey', ?, ?, 0, 'active', ?, ?, ?)`
    )
    .run(
      connectionId,
      "totally-unregistered-test-provider-16190",
      "Revalidate Unverifiable",
      "sk-revalidate-unverifiable",
      JSON.stringify({ [AUTO_DISABLED_AT_KEY]: disabledAt }),
      disabledAt,
      disabledAt
    );

  await sweepAt(30 * HOUR_MS);

  assert.equal(
    readRow(connectionId).isActive,
    0,
    "a skipped (unsupported) test proves nothing about a credential the gateway switched off"
  );
});

test("a sweep the operator turned off (intervalMinutes 0) retests nothing", async () => {
  const node = "sweep-off";
  const connectionId = await activeConnection(node);
  await gatewayDisable(connectionId);
  const before = probeCalls.get(node) ?? 0;

  await settingsDb.updateSettings({
    resilienceSettings: { credentialHealthCheck: { intervalMinutes: 0 } },
  });
  try {
    await sweepAt(30 * HOUR_MS);
  } finally {
    core
      .getDbInstance()
      .prepare("DELETE FROM key_value WHERE namespace = 'settings' AND key = 'resilienceSettings'")
      .run();
    await settingsDb.updateSettings({});
  }

  assert.equal(probeCalls.get(node) ?? 0, before);
  assert.equal(readRow(connectionId).isActive, 0);
});

test("the revalidation kill switch leaves gateway-disabled connections off", async () => {
  const node = "kill-switch";
  const connectionId = await activeConnection(node);
  await gatewayDisable(connectionId);
  const before = probeCalls.get(node) ?? 0;

  process.env.OMNIROUTE_DISABLE_AUTO_DISABLED_REVALIDATION = "1";
  try {
    await sweepAt(30 * HOUR_MS);
  } finally {
    delete process.env.OMNIROUTE_DISABLE_AUTO_DISABLED_REVALIDATION;
  }

  assert.equal(probeCalls.get(node) ?? 0, before);
  assert.equal(readRow(connectionId).isActive, 0);
});
