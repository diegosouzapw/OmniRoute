import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-a2a-enabled-route-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY;

process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_API_KEY;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const statusRoute = await import("../../src/app/api/a2a/status/route.ts");
const a2aRoute = await import("../../src/app/a2a/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeJsonRpcRequest(body: unknown): NextRequest {
  return new Request("http://localhost/a2a", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  }) as unknown as NextRequest;
}

test.beforeEach(async () => {
  delete process.env.OMNIROUTE_API_KEY;
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }

  if (ORIGINAL_OMNIROUTE_API_KEY === undefined) {
    delete process.env.OMNIROUTE_API_KEY;
  } else {
    process.env.OMNIROUTE_API_KEY = ORIGINAL_OMNIROUTE_API_KEY;
  }
});

test("A2A status reports disabled and offline when the endpoint is off", async () => {
  const response = await statusRoute.GET();
  const body = (await response.json()) as Record<string, unknown>;

  assert.equal(response.status, 200);
  assert.equal(body.status, "disabled");
  assert.equal(body.enabled, false);
  assert.equal(body.online, false);
  assert.equal(body.agent, null);
});

test("A2A JSON-RPC rejects requests while the endpoint is disabled", async () => {
  const response = await a2aRoute.POST(
    makeJsonRpcRequest({
      jsonrpc: "2.0",
      id: "disabled-check",
      method: "message/send",
      params: { message: { role: "user", content: "hello" } },
    })
  );
  const body = (await response.json()) as {
    id?: string | number | null;
    error?: { code?: number; message?: string };
  };

  assert.equal(response.status, 503);
  assert.equal(body.id, "disabled-check");
  assert.equal(body.error?.code, -32000);
  assert.match(body.error?.message || "", /disabled/i);
});

test("A2A JSON-RPC checks auth before returning disabled state", async () => {
  process.env.OMNIROUTE_API_KEY = "test-secret";

  const response = await a2aRoute.POST(
    makeJsonRpcRequest({
      jsonrpc: "2.0",
      id: "unauthorized-disabled-check",
      method: "message/send",
      params: { message: { role: "user", content: "hello" } },
    })
  );
  const body = (await response.json()) as {
    error?: { code?: number; message?: string };
  };

  assert.equal(response.status, 400);
  assert.equal(body.error?.code, -32600);
  assert.match(body.error?.message || "", /Unauthorized/i);
});

test("A2A status reports online only after enabling the endpoint", async () => {
  await settingsDb.updateSettings({ a2aEnabled: true });

  const response = await statusRoute.GET();
  const body = (await response.json()) as Record<string, unknown>;

  assert.equal(response.status, 200);
  assert.equal(body.status, "ok");
  assert.equal(body.enabled, true);
  assert.equal(body.online, true);
  assert.equal(typeof body.tasks, "object");
});
