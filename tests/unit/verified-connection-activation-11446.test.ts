/**
 * #11446 — a newly created connection was `isActive:true` immediately, with
 * `testStatus` left at "unknown" until an operator manually clicked "Test" in the
 * dashboard. Since `/v1/models` filters on `isActive` (not `testStatus`), an
 * untested — or outright invalid — key's models were indistinguishable from a
 * provider that actually works.
 *
 * This suite pins the behavior changes that close that gap:
 *   1. POST /api/providers now creates the connection `isActive:false`.
 *   2. testSingleConnection() is the sole activation signal — it flips a
 *      connection to `isActive:true` once a test actually PASSES, or is
 *      `skipped` as unverifiable/unsupported (trusted like before, since it
 *      can never be health-checked); a failing test intentionally leaves
 *      `isActive` untouched.
 *
 * All outbound provider validation traffic is stubbed (no real network) so the
 * suite is deterministic and network-independent, following the same pattern as
 * tests/unit/exclusive-lease-connection-test-isolation.test.ts.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-connection-activation-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "connection-activation-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

// Stub every outbound provider probe deterministically: no test in this suite may
// depend on real network reachability. Requests to the fake compatible-provider
// `/models` endpoint resolve per-test via `nextModelsProbeStatus`; anything else
// (e.g. the unrelated fire-and-forget model-sync self-fetch triggered by POST
// /api/providers) gets a harmless 404 instead of touching the network.
const VALIDATION_BASE_URL = "https://proxy.activation-11446.example.com/v1";
let nextModelsProbeStatus: number | null = 200;
const originalFetch = globalThis.fetch;
globalThis.fetch = (async (input: string | URL | Request) => {
  const url =
    typeof input === "string" ? input : input instanceof Request ? input.url : input.toString();
  if (url === `${VALIDATION_BASE_URL}/models`) {
    if (nextModelsProbeStatus === null) {
      throw new Error("simulated network failure");
    }
    return new Response(JSON.stringify({ data: [] }), { status: nextModelsProbeStatus });
  }
  return new Response("not found", { status: 404 });
}) as typeof fetch;

const core = await import("../../src/lib/db/core.ts");
const providerNodesRoute = await import("../../src/app/api/provider-nodes/route.ts");
const providersRoute = await import("../../src/app/api/providers/route.ts");
const { testSingleConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");

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
        name: `Activation Test Node ${prefix}`,
        prefix,
        apiType: "chat",
        baseUrl: VALIDATION_BASE_URL,
      },
    })
  );
  const body = await readJsonObject(response);
  assert.equal(response.status, 201, `create provider-node failed: ${JSON.stringify(body)}`);
  const node = body.node as { id?: string };
  assert.ok(node.id, "provider node must expose an id");
  return node.id as string;
}

async function createConnection(
  nodeId: string,
  name: string
): Promise<{ id: string; isActive: unknown }> {
  const response = await providersRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/providers", {
      method: "POST",
      body: { provider: nodeId, apiKey: "sk-activation-test", name },
    })
  );
  const body = await readJsonObject(response);
  assert.equal(response.status, 201, `create connection failed: ${JSON.stringify(body)}`);
  const connection = body.connection as { id?: string; isActive?: unknown };
  assert.ok(connection.id, "connection must expose an id");
  return { id: connection.id as string, isActive: connection.isActive };
}

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#11446: POST /api/providers creates a new connection inactive until verified", async () => {
  const nodeId = await createCompatibleNode("activation-create");
  const { isActive } = await createConnection(nodeId, "Activation Create Connection");

  assert.equal(
    isActive,
    false,
    "a newly created connection must start isActive:false — /v1/models must not " +
      "advertise an untested connection's models"
  );
});

test("#11446: testSingleConnection activates a connection once a test actually passes", async () => {
  const nodeId = await createCompatibleNode("activation-pass");
  const { id: connectionId, isActive: createdActive } = await createConnection(
    nodeId,
    "Activation Pass Connection"
  );
  assert.equal(createdActive, false, "precondition: connection must start inactive");

  nextModelsProbeStatus = 200; // the probe will succeed
  const result = await testSingleConnection(connectionId);
  assert.equal(result.valid, true, `expected a passing test, got ${JSON.stringify(result)}`);

  const row = core
    .getDbInstance()
    .prepare("SELECT is_active FROM provider_connections WHERE id = ?")
    .get(connectionId) as { is_active: number };
  assert.equal(
    row.is_active,
    1,
    "a passing test must activate a previously-inactive connection — see #11446"
  );
});

test("#11446: testSingleConnection never activates a connection whose test genuinely fails", async () => {
  const nodeId = await createCompatibleNode("activation-fail");
  const { id: connectionId, isActive: createdActive } = await createConnection(
    nodeId,
    "Activation Fail Connection"
  );
  assert.equal(createdActive, false, "precondition: connection must start inactive");

  nextModelsProbeStatus = 401; // the probe will report an invalid credential
  const result = await testSingleConnection(connectionId);
  assert.equal(result.valid, false, `expected a failing test, got ${JSON.stringify(result)}`);

  const row = core
    .getDbInstance()
    .prepare("SELECT is_active FROM provider_connections WHERE id = ?")
    .get(connectionId) as { is_active: number };
  assert.equal(
    row.is_active,
    0,
    "a failing test must leave an inactive connection inactive — it must never silently " +
      "advertise an unverified/invalid connection"
  );
});

test("#11446: testSingleConnection activates a connection whose test is skipped as unsupported", async () => {
  // A connection whose provider has no registry entry (and matches none of the
  // compatible/specialty validators) makes validateProviderApiKey() return
  // `unsupported: true` deterministically, with no network call — the same
  // "this provider can never be health-checked through the generic test surface"
  // signal the fix treats as neutral-but-trusted. It must still be activated,
  // otherwise it would stay hidden from /v1/models forever under the "only
  // advertise tested connections" default, since it can never produce a passing
  // probe result. (Distinct from an exclusive-lease-busy skip, which is a
  // temporary "try again later" and must NOT activate — see
  // tests/unit/exclusive-lease-connection-test-isolation.test.ts.)
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO provider_connections
     (id, provider, auth_type, name, api_key, is_active, test_status, created_at, updated_at)
     VALUES (?, ?, 'apikey', ?, ?, 0, 'unknown', ?, ?)`
  ).run(
    "activation-skip-connection",
    "totally-unregistered-test-provider-11446",
    "Activation Skip Connection",
    "sk-activation-skip",
    new Date().toISOString(),
    new Date().toISOString()
  );

  const result = await testSingleConnection("activation-skip-connection");
  assert.equal(result.skipped, true, `expected a skipped test, got ${JSON.stringify(result)}`);

  const row = db
    .prepare("SELECT is_active FROM provider_connections WHERE id = ?")
    .get("activation-skip-connection") as { is_active: number };
  assert.equal(
    row.is_active,
    1,
    "a skipped/unsupported test must still activate a previously-inactive connection — see #11446"
  );
});
