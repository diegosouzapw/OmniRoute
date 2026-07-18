import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { encrypt } from "@/lib/db/encryption";
import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

// DATA_DIR must be set before the DB core module evaluates its singleton. The
// management session helper also requires JWT_SECRET, set per-test.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-repair-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_KEY = process.env.STORAGE_ENCRYPTION_KEY;
process.env.STORAGE_ENCRYPTION_KEY = "test-repair-encryption-key";

const core = await import("../../../src/lib/db/core.ts");
const proxiesDb = await import("../../../src/lib/db/proxies.ts");
const repairRelayRoute =
  await import("../../../src/app/api/settings/proxies/[id]/repair-relay/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_KEY === undefined) delete process.env.STORAGE_ENCRYPTION_KEY;
  else process.env.STORAGE_ENCRYPTION_KEY = ORIGINAL_KEY;
});

async function createProxy(type: string, notes: string): Promise<string> {
  const created = await proxiesDb.createProxy({
    name: `proxy-${type}`,
    type,
    host: "proxy.example",
    port: 443,
    notes,
    source: "dashboard-custom",
  });
  return created.id;
}

async function createRelay(notes: string): Promise<string> {
  return createProxy("vercel", notes);
}

test("returns 404 when the proxy does not exist", async () => {
  const res = await repairRelayRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/settings/proxies/nope/repair-relay", {
      method: "POST",
    }),
    { params: Promise.resolve({ id: "nope" }) }
  );
  assert.equal(res.status, 404);
});

test("returns 400 when the proxy is not a relay type", async () => {
  const id = await createProxy("http", JSON.stringify({}));
  const res = await repairRelayRoute.POST(
    await makeManagementSessionRequest(`http://localhost/api/settings/proxies/${id}/repair-relay`, {
      method: "POST",
    }),
    { params: Promise.resolve({ id }) }
  );
  assert.equal(res.status, 400);
});

test("returns 404 when the proxy does not exist", async () => {
  const res = await repairRelayRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/settings/proxies/nope/repair-relay", {
      method: "POST",
    }),
    { params: Promise.resolve({ id: "nope" }) }
  );
  assert.equal(res.status, 404);
});

test('mode "noop" when plaintext relayAuth already present', async () => {
  const id = await createRelay(JSON.stringify({ relayAuth: "plain-token" }));
  const res = await repairRelayRoute.POST(
    await makeManagementSessionRequest(`http://localhost/api/settings/proxies/${id}/repair-relay`, {
      method: "POST",
    }),
    { params: Promise.resolve({ id }) }
  );
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.deepEqual(body, { repaired: false, mode: "noop" });
});

test('mode "recovered" re-derives plaintext from the encrypted blob', async () => {
  const enc = encrypt("recoverable-token");
  const id = await createRelay(JSON.stringify({ relayAuthEnc: enc }));
  const res = await repairRelayRoute.POST(
    await makeManagementSessionRequest(`http://localhost/api/settings/proxies/${id}/repair-relay`, {
      method: "POST",
    }),
    { params: Promise.resolve({ id }) }
  );
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.deepEqual(body, { repaired: true, mode: "recovered" });

  const updated = await proxiesDb.getProxyById(id, { includeSecrets: true });
  const parsed = JSON.parse(updated?.notes ?? "{}");
  assert.equal(parsed.relayAuth, "recoverable-token");
});

test('mode "redeploy" (409) when no recoverable auth exists', async () => {
  const id = await createRelay(JSON.stringify({}));
  const res = await repairRelayRoute.POST(
    await makeManagementSessionRequest(`http://localhost/api/settings/proxies/${id}/repair-relay`, {
      method: "POST",
    }),
    { params: Promise.resolve({ id }) }
  );
  assert.equal(res.status, 409);
  const body = await res.json();
  assert.ok(
    typeof body.error?.message === "string" && /redeploy/i.test(body.error.message),
    `409 must explain redeploy; got ${JSON.stringify(body)}`
  );
});
