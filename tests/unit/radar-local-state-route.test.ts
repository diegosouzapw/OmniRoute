/** API contract for persisted Radar local overrides and tombstones. */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-radar-state-api-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-for-radar-local-state";
process.env.INITIAL_PASSWORD = "test-bootstrap-password-for-radar-local-state";

const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/radar/local-model-state/route.ts");

async function authHeaders(): Promise<Record<string, string>> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
  return { Cookie: `auth_token=${token}` };
}

function request(method: string, body?: unknown, headers: Record<string, string> = {}): Request {
  return new Request("http://localhost:20128/api/radar/local-model-state", {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
  delete process.env.RADAR_ENABLED;
  delete process.env.JWT_SECRET;
  delete process.env.INITIAL_PASSWORD;
});

test("flag-off gate runs before authentication", async () => {
  delete process.env.RADAR_ENABLED;
  const response = await route.GET(request("GET"));
  const text = await response.text();

  assert.equal(response.status, 404);
  assert.ok(!text.includes("at /"));
});

test("all local-state mutations require authentication when Radar is enabled", async () => {
  process.env.RADAR_ENABLED = "true";
  const calls = [
    route.GET(request("GET")),
    route.PATCH(request("PATCH", { provider: "groq", modelId: "model", enabled: false })),
    route.PUT(request("PUT", { provider: "groq", modelId: "model", tombstoned: true })),
    route.DELETE(request("DELETE")),
  ];

  for (const response of await Promise.all(calls)) {
    assert.equal(response.status, 401);
    assert.ok(!(await response.text()).includes("at /"));
  }
});

test("authenticated CRUD persists overrides and tombstones without conflating them", async () => {
  process.env.RADAR_ENABLED = "true";
  const headers = await authHeaders();

  const patch = await route.PATCH(
    request(
      "PATCH",
      {
        provider: "groq",
        modelId: "llama-3.3-70b-versatile",
        displayName: "My local Groq",
        enabled: false,
      },
      headers
    )
  );
  assert.equal(patch.status, 200);
  const patched = await patch.json();
  assert.equal(patched.states[0].displayName, "My local Groq");
  assert.equal(patched.states[0].enabled, false);
  assert.equal(patched.states[0].tombstoned, false);

  const hide = await route.PUT(
    request(
      "PUT",
      { provider: "groq", modelId: "llama-3.3-70b-versatile", tombstoned: true },
      headers
    )
  );
  assert.equal(hide.status, 200);
  assert.equal((await hide.json()).states[0].tombstoned, true);

  const removeOverrideUrl = new URL("http://localhost:20128/api/radar/local-model-state");
  removeOverrideUrl.searchParams.set("provider", "groq");
  removeOverrideUrl.searchParams.set("modelId", "llama-3.3-70b-versatile");
  const remove = await route.DELETE(new Request(removeOverrideUrl, { method: "DELETE", headers }));
  assert.equal(remove.status, 200);
  const removed = await remove.json();
  assert.equal(removed.states[0].displayName, null);
  assert.equal(removed.states[0].enabled, null);
  assert.equal(removed.states[0].tombstoned, true, "clearing overrides must not restore a model");

  const restore = await route.PUT(
    request(
      "PUT",
      { provider: "groq", modelId: "llama-3.3-70b-versatile", tombstoned: false },
      headers
    )
  );
  assert.equal(restore.status, 200);
  assert.deepEqual((await restore.json()).states, []);
});

test("strict schemas reject arbitrary fields, empty patches, and control characters", async () => {
  process.env.RADAR_ENABLED = "true";
  const headers = await authHeaders();
  const invalidBodies = [
    { provider: "groq", modelId: "model" },
    { provider: "groq", modelId: "model", enabled: true, origin: "local" },
    { provider: "groq", modelId: "bad\nmodel", enabled: true },
    { provider: "groq", modelId: "model", displayName: "   " },
  ];

  for (const body of invalidBodies) {
    const response = await route.PATCH(request("PATCH", body, headers));
    const text = await response.text();
    assert.equal(response.status, 400);
    assert.ok(!text.includes("at /"));
    assert.ok(!text.includes(".ts:"));
  }
});

test("PATCH e PUT rejeitam o corpo pelo byte real antes de materializar JSON excessivo", async () => {
  process.env.RADAR_ENABLED = "true";
  const headers = await authHeaders();
  const oversizedBody = JSON.stringify({
    provider: "groq",
    modelId: "model",
    enabled: true,
    padding: "x".repeat(16 * 1024),
  });

  for (const [method, handler] of [
    ["PATCH", route.PATCH],
    ["PUT", route.PUT],
  ] as const) {
    const response = await handler(
      new Request("http://localhost:20128/api/radar/local-model-state", {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        body: oversizedBody,
      })
    );
    assert.equal(response.status, 413, method);
  }
});

test("GET returns no-store local state for restore controls", async () => {
  process.env.RADAR_ENABLED = "true";
  const response = await route.GET(request("GET", undefined, await authHeaders()));

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { states: [] });
});
