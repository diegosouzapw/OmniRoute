/**
 * A passing (or unverifiable/skipped) connection test is the activation signal
 * for a connection that was never switched on (#11446: POST /api/providers
 * creates connections isActive:false). It must NOT turn back on a connection an
 * operator switched off on purpose: retesting a disabled connection (single test
 * or "retest selected") used to re-enable it, including pay-per-token ones.
 *
 * The management toggles (PUT /api/providers/[id] and the bulk PATCH
 * /api/providers) record the operator's intent in providerSpecificData, and
 * testSingleConnection() leaves such a connection off until an operator turns
 * it back on explicitly.
 *
 * All outbound provider validation traffic is stubbed (no real network), same
 * pattern as tests/unit/verified-connection-activation-11446.test.ts.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-operator-disable-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "operator-disable-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const VALIDATION_BASE_URL = "https://proxy.operator-disable.example.com/v1";
const originalFetch = globalThis.fetch;
// When set, every validation probe waits on this promise before answering, so a
// test can hold a connection test mid-probe while the operator acts.
let probeGate: Promise<void> | null = null;
globalThis.fetch = (async (input: string | URL | Request) => {
  const url =
    typeof input === "string" ? input : input instanceof Request ? input.url : input.toString();
  if (url === `${VALIDATION_BASE_URL}/models`) {
    if (probeGate) await probeGate;
    return new Response(JSON.stringify({ data: [] }), { status: 200 });
  }
  return new Response("not found", { status: 404 });
}) as typeof fetch;

const core = await import("../../src/lib/db/core.ts");
const providerNodesRoute = await import("../../src/app/api/provider-nodes/route.ts");
const providersRoute = await import("../../src/app/api/providers/route.ts");
const providerByIdRoute = await import("../../src/app/api/providers/[id]/route.ts");
const { testSingleConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");
const { OPERATOR_DISABLED_AT_KEY } = await import("../../src/lib/providers/operatorDisable.ts");

async function readJsonObject(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();
  try {
    const parsed = JSON.parse(text) as unknown;
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

async function createCompatibleNode(prefix: string): Promise<string> {
  const response = await providerNodesRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/provider-nodes", {
      method: "POST",
      body: {
        type: "openai-compatible",
        name: `Operator Disable Node ${prefix}`,
        prefix,
        apiType: "chat",
        baseUrl: VALIDATION_BASE_URL,
      },
    })
  );
  const body = await readJsonObject(response);
  assert.equal(response.status, 201, `create provider-node failed: ${JSON.stringify(body)}`);
  return (body.node as { id: string }).id;
}

async function createConnection(nodeId: string, name: string): Promise<string> {
  const response = await providersRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/providers", {
      method: "POST",
      body: { provider: nodeId, apiKey: "sk-operator-disable-test", name },
    })
  );
  const body = await readJsonObject(response);
  assert.equal(response.status, 201, `create connection failed: ${JSON.stringify(body)}`);
  return (body.connection as { id: string }).id;
}

async function setActive(connectionId: string, isActive: boolean): Promise<void> {
  const response = await providerByIdRoute.PUT(
    await makeManagementSessionRequest(`http://localhost/api/providers/${connectionId}`, {
      method: "PUT",
      body: { isActive },
    }),
    { params: Promise.resolve({ id: connectionId }) }
  );
  assert.equal(response.status, 200, `PUT isActive failed: ${await response.text()}`);
}

function readRow(connectionId: string): { isActive: number; psd: Record<string, unknown> } {
  const row = core
    .getDbInstance()
    .prepare("SELECT is_active, provider_specific_data FROM provider_connections WHERE id = ?")
    .get(connectionId) as { is_active: number; provider_specific_data: string | null };
  return {
    isActive: row.is_active,
    psd: row.provider_specific_data ? JSON.parse(row.provider_specific_data) : {},
  };
}

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a passing test does not re-enable a connection the operator switched off", async () => {
  const nodeId = await createCompatibleNode("opdisable-single");
  const connectionId = await createConnection(nodeId, "Operator Disable Single");

  // Never activated: the first passing test still activates it (#11446).
  const first = await testSingleConnection(connectionId);
  assert.equal(first.valid, true, `expected a passing test, got ${JSON.stringify(first)}`);
  assert.equal(readRow(connectionId).isActive, 1, "first passing test must activate");

  // Operator switches it off on purpose.
  await setActive(connectionId, false);
  assert.equal(readRow(connectionId).isActive, 0);
  assert.equal(typeof readRow(connectionId).psd[OPERATOR_DISABLED_AT_KEY], "string");

  // Re-testing must not turn it back on.
  const second = await testSingleConnection(connectionId);
  assert.equal(second.valid, true, `expected a passing test, got ${JSON.stringify(second)}`);
  assert.equal(
    readRow(connectionId).isActive,
    0,
    "a passing test must leave an operator-disabled connection disabled"
  );

  // Explicit operator re-enable clears the marker.
  await setActive(connectionId, true);
  const reenabled = readRow(connectionId);
  assert.equal(reenabled.isActive, 1);
  assert.equal(OPERATOR_DISABLED_AT_KEY in reenabled.psd, false);
});

test("bulk deactivation is also respected by a later passing test", async () => {
  const nodeId = await createCompatibleNode("opdisable-bulk");
  const connectionId = await createConnection(nodeId, "Operator Disable Bulk");
  await testSingleConnection(connectionId);
  assert.equal(readRow(connectionId).isActive, 1);

  const response = await providersRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/providers", {
      method: "PATCH",
      body: { ids: [connectionId], isActive: false },
    })
  );
  assert.equal(response.status, 200, `bulk PATCH failed: ${await response.text()}`);
  assert.equal(readRow(connectionId).isActive, 0);

  const result = await testSingleConnection(connectionId);
  assert.equal(result.valid, true);
  assert.equal(
    readRow(connectionId).isActive,
    0,
    "a passing test must leave a bulk-disabled connection disabled"
  );
});

test("a skipped (unverifiable) test does not re-enable an operator-disabled connection", async () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO provider_connections
     (id, provider, auth_type, name, api_key, is_active, test_status,
      provider_specific_data, created_at, updated_at)
     VALUES (?, ?, 'apikey', ?, ?, 0, 'active', ?, ?, ?)`
  ).run(
    "operator-disabled-skip-connection",
    "totally-unregistered-test-provider-opdisable",
    "Operator Disable Skip",
    "sk-operator-disable-skip",
    JSON.stringify({ [OPERATOR_DISABLED_AT_KEY]: now }),
    now,
    now
  );

  const result = await testSingleConnection("operator-disabled-skip-connection");
  assert.equal(result.skipped, true, `expected a skipped test, got ${JSON.stringify(result)}`);
  assert.equal(
    readRow("operator-disabled-skip-connection").isActive,
    0,
    "an unverifiable test must leave an operator-disabled connection disabled"
  );
});

test("an operator disable during an in-flight probe is not undone when the probe passes", async () => {
  // The probe of a connection test can take seconds, and POST /api/providers
  // fires one in the background on create. When the operator switched the
  // connection off while such a probe was still in flight, the test decided on
  // the snapshot it read before the probe and turned the connection back on
  // (this race made the two tests above flaky in CI).
  let releaseProbe: () => void = () => {};
  probeGate = new Promise<void>((resolve) => {
    releaseProbe = resolve;
  });
  try {
    const nodeId = await createCompatibleNode("opdisable-inflight");
    const connectionId = await createConnection(nodeId, "Operator Disable In-Flight");
    assert.equal(readRow(connectionId).isActive, 0, "a new connection starts inactive");

    const inFlight = testSingleConnection(connectionId);
    // Let the test read its snapshot and reach the gated probe.
    await new Promise((resolve) => setTimeout(resolve, 50));

    await setActive(connectionId, false);
    assert.equal(typeof readRow(connectionId).psd[OPERATOR_DISABLED_AT_KEY], "string");

    releaseProbe();
    const result = await inFlight;
    assert.equal(result.valid, true, `expected a passing test, got ${JSON.stringify(result)}`);
    // The create route's background auto-test was held by the same gate.
    await new Promise((resolve) => setTimeout(resolve, 50));

    const row = readRow(connectionId);
    assert.equal(row.isActive, 0, "an in-flight passing probe must not undo an operator disable");
    assert.equal(typeof row.psd[OPERATOR_DISABLED_AT_KEY], "string");
  } finally {
    releaseProbe();
    probeGate = null;
  }
});
