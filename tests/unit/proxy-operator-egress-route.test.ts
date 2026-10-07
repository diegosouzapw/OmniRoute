import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The operator-egress push route: an authenticated operator pushes dated observed
// addresses per pool member. These tests pin the auth-first order (401 wins over 404
// when the flag is off), the flag-off 404 with zero DB read/write, the six schema
// rejections, the unknown-member `ignored` count, and the happy-path response shape.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-operator-egress-route-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const store = await import("../../src/lib/db/proxyOperatorEgress.ts");
const { POST } = await import("../../src/app/api/settings/proxies/operator-egress/route.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
  process.env.INITIAL_PASSWORD = "operator-egress-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
  process.env.PROXY_OPERATOR_EGRESS_ENABLED = "true";
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  delete process.env.PROXY_OPERATOR_EGRESS_ENABLED;
});

function pushRequest(body: unknown): Request {
  return new Request("http://localhost/api/settings/proxies/operator-egress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function validBody() {
  return {
    version: 1,
    members: [
      {
        host: "203.0.113.1",
        port: 8080,
        addresses: ["198.51.100.1", "198.51.100.2", "198.51.100.3"],
        observedAt: new Date().toISOString(),
      },
    ],
  };
}

async function knownMember(host: string, port: number): Promise<void> {
  await proxiesDb.createProxy({ name: `op-egress ${host}:${port}`, type: "http", host, port });
}

function operatorRowCount(): number {
  return (
    core.getDbInstance().prepare("SELECT COUNT(*) AS n FROM proxy_operator_egress").get() as {
      n: number;
    }
  ).n;
}

test("auth comes first: no auth answers 401 even with the flag off", async () => {
  delete process.env.PROXY_OPERATOR_EGRESS_ENABLED;
  const response = await POST(pushRequest(validBody()));
  assert.equal(response.status, 401);
});

test("flag off with auth answers 404 and touches nothing", async () => {
  delete process.env.PROXY_OPERATOR_EGRESS_ENABLED;
  const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
  const response = await POST(
    await makeManagementSessionRequest("http://localhost/api/settings/proxies/operator-egress", {
      method: "POST",
      body: JSON.stringify(validBody()),
    })
  );
  assert.equal(response.status, 404);
  assert.equal(operatorRowCount(), 0);
});

test("flag on without auth answers 401", async () => {
  const response = await POST(pushRequest(validBody()));
  assert.equal(response.status, 401);
});

test("a non-literal host is rejected", async () => {
  await knownMember("203.0.113.1", 8080);
  const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
  const body = validBody();
  body.members[0].host = "proxy.example.com";
  const response = await POST(
    await makeManagementSessionRequest("http://localhost/api/settings/proxies/operator-egress", {
      method: "POST",
      body: JSON.stringify(body),
    })
  );
  assert.equal(response.status, 400);
});

test("a loopback address is rejected", async () => {
  const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
  const body = validBody();
  body.members[0].addresses = ["127.0.0.1"];
  const response = await POST(
    await makeManagementSessionRequest("http://localhost/api/settings/proxies/operator-egress", {
      method: "POST",
      body: JSON.stringify(body),
    })
  );
  assert.equal(response.status, 400);
});

test("a link-local address is rejected", async () => {
  const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
  const body = validBody();
  body.members[0].addresses = ["169.254.10.20"];
  const response = await POST(
    await makeManagementSessionRequest("http://localhost/api/settings/proxies/operator-egress", {
      method: "POST",
      body: JSON.stringify(body),
    })
  );
  assert.equal(response.status, 400);
});

test("a private address is rejected", async () => {
  const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
  const body = validBody();
  body.members[0].addresses = ["10.0.0.5"];
  const response = await POST(
    await makeManagementSessionRequest("http://localhost/api/settings/proxies/operator-egress", {
      method: "POST",
      body: JSON.stringify(body),
    })
  );
  assert.equal(response.status, 400);
});

test("an observedAt beyond the +5 min future tolerance is rejected", async () => {
  await knownMember("203.0.113.1", 8080);
  const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
  const body = validBody();
  body.members[0].observedAt = new Date(Date.now() + 60 * 60_000).toISOString();
  const response = await POST(
    await makeManagementSessionRequest("http://localhost/api/settings/proxies/operator-egress", {
      method: "POST",
      body: JSON.stringify(body),
    })
  );
  assert.equal(response.status, 400);
});

test("batch and member bounds are rejected", async () => {
  const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
  const tooManyAddresses = validBody();
  tooManyAddresses.members[0].addresses = Array.from(
    { length: 11 },
    (_, i) => `198.51.100.${i + 1}`
  );
  const overMember = await POST(
    await makeManagementSessionRequest("http://localhost/api/settings/proxies/operator-egress", {
      method: "POST",
      body: JSON.stringify(tooManyAddresses),
    })
  );
  assert.equal(overMember.status, 400);

  const tooManyMembers = {
    version: 1,
    members: Array.from({ length: 101 }, (_, i) => ({
      host: "203.0.113.1",
      port: 8000 + i,
      addresses: ["198.51.100.1"],
      observedAt: new Date().toISOString(),
    })),
  };
  const overBatch = await POST(
    await makeManagementSessionRequest("http://localhost/api/settings/proxies/operator-egress", {
      method: "POST",
      body: JSON.stringify(tooManyMembers),
    })
  );
  assert.equal(overBatch.status, 400);
});

test("an unknown member is counted ignored, never a batch error", async () => {
  const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
  const response = await POST(
    await makeManagementSessionRequest("http://localhost/api/settings/proxies/operator-egress", {
      method: "POST",
      body: JSON.stringify(validBody()),
    })
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    version: number;
    stored: number;
    ignored: number;
    rejected: unknown[];
  };
  assert.equal(body.version, 1);
  assert.equal(body.stored, 3);
  assert.equal(body.ignored, 3);
  assert.deepEqual(body.rejected, []);
});

test("happy path: three addresses for one member are stored", async () => {
  await knownMember("203.0.113.1", 8080);
  const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
  const response = await POST(
    await makeManagementSessionRequest("http://localhost/api/settings/proxies/operator-egress", {
      method: "POST",
      body: JSON.stringify(validBody()),
    })
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    version: 1,
    stored: 3,
    ignored: 0,
    rejected: [],
  });
  const now = Date.now();
  const read = store.readOperatorEgressForMember("203.0.113.1", 8080, now);
  assert.equal(read.addresses.size, 3);
});
