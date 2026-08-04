import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-page-2998-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-for-provider-pagination-2998";
process.env.INITIAL_PASSWORD = "admin-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providersRoute = await import("../../src/app/api/providers/route.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function createConnection(provider: string, name: string) {
  await providersDb.createProviderConnection({
    provider,
    name,
    authType: "apikey",
    apiKey: `${provider}-${name}-key`,
  });
}

test.beforeEach(resetDb);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET /api/providers filters and counts before applying limit/offset", async () => {
  await createConnection("synthetic", "Synthetic A");
  await createConnection("synthetic", "Synthetic B");
  await createConnection("poe", "Poe A");

  const response = await providersRoute.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/providers?provider=synthetic&limit=1&offset=1"
    )
  );
  const body = (await response.json()) as {
    connections: Array<{ provider: string }>;
    total: number;
  };

  assert.equal(response.status, 200);
  assert.equal(body.total, 2);
  assert.equal(body.connections.length, 1);
  assert.equal(body.connections[0].provider, "synthetic");
});

test("GET /api/providers keeps the unfiltered contract when provider is absent", async () => {
  await createConnection("synthetic", "Synthetic A");
  await createConnection("poe", "Poe A");

  const response = await providersRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/providers")
  );
  const body = (await response.json()) as {
    connections: Array<{ provider: string }>;
    total: number;
  };

  assert.equal(response.status, 200);
  assert.equal(body.total, 2);
  assert.deepEqual(
    new Set(body.connections.map((connection) => connection.provider)),
    new Set(["synthetic", "poe"])
  );
});
