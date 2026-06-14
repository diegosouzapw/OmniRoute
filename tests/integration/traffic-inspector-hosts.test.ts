/**
 * Integration tests: Traffic Inspector custom hosts CRUD
 *
 * Tests GET /hosts, POST /hosts, DELETE /hosts/[host], PATCH /hosts/[host].
 * DB is isolated per test via a temp DATA_DIR.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ti-hosts-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Boot DB so migrations run
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");

const hostsRoute = await import(
  "../../src/app/api/tools/traffic-inspector/hosts/route.ts"
);
const hostDetailRoute = await import(
  "../../src/app/api/tools/traffic-inspector/hosts/[host]/route.ts"
);

test.beforeEach(async () => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  // Re-init DB with fresh migrations
  await import("../../src/lib/db/core.ts").then((m) => m.getDbInstance());
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET /hosts: returns empty list initially", async () => {
  const res = await hostsRoute.GET();
  assert.equal(res.status, 200);
  const body = await res.json() as { hosts: unknown[] };
  assert.deepEqual(body.hosts, []);
});

test("POST /hosts: adds a host", async () => {
  const req = new Request("http://localhost/api/tools/traffic-inspector/hosts", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ host: "api.openai.com", kind: "llm" }),
  });
  const res = await hostsRoute.POST(req);
  assert.equal(res.status, 201);
  const body = await res.json() as { ok: boolean; host: string };
  assert.equal(body.ok, true);
  assert.equal(body.host, "api.openai.com");

  // Verify it appears in list
  const listRes = await hostsRoute.GET();
  const list = await listRes.json() as { hosts: Array<{ host: string }> };
  assert.ok(list.hosts.some((h) => h.host === "api.openai.com"));
});

test("POST /hosts: rejects empty host string", async () => {
  const req = new Request("http://localhost/api/tools/traffic-inspector/hosts", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ host: "" }),
  });
  const res = await hostsRoute.POST(req);
  assert.equal(res.status, 400);
  const body = await res.json() as { error: { message: string } };
  assert.ok(!body.error.message.includes("at /"), "must not leak stack trace");
});

test("POST /hosts: rejects invalid JSON", async () => {
  const req = new Request("http://localhost/api/tools/traffic-inspector/hosts", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "not json",
  });
  const res = await hostsRoute.POST(req);
  assert.equal(res.status, 400);
});

test("DELETE /hosts/[host]: removes existing host", async () => {
  // Add host first
  const addReq = new Request("http://localhost/api/tools/traffic-inspector/hosts", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ host: "remove-me.example.com", kind: "custom" }),
  });
  await hostsRoute.POST(addReq);

  // Now delete it
  const delRes = await hostDetailRoute.DELETE(
    new Request("http://localhost/"),
    { params: Promise.resolve({ host: "remove-me.example.com" }) }
  );
  assert.equal(delRes.status, 204);

  // Verify gone
  const listRes = await hostsRoute.GET();
  const list = await listRes.json() as { hosts: Array<{ host: string }> };
  assert.ok(!list.hosts.some((h) => h.host === "remove-me.example.com"));
});

test("PATCH /hosts/[host]: toggles enabled flag", async () => {
  // Add host
  const addReq = new Request("http://localhost/api/tools/traffic-inspector/hosts", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ host: "toggle-me.example.com", kind: "app", enabled: true }),
  });
  await hostsRoute.POST(addReq);

  // Disable it
  const patchRes = await hostDetailRoute.PATCH(
    new Request("http://localhost/", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ enabled: false }),
    }),
    { params: Promise.resolve({ host: "toggle-me.example.com" }) }
  );
  assert.equal(patchRes.status, 200);
  const body = await patchRes.json() as { enabled: boolean };
  assert.equal(body.enabled, false);
});

test("PATCH /hosts/[host]: returns 404 for non-existent host", async () => {
  const res = await hostDetailRoute.PATCH(
    new Request("http://localhost/", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ enabled: true }),
    }),
    { params: Promise.resolve({ host: "nonexistent.example.com" }) }
  );
  assert.equal(res.status, 404);
});
