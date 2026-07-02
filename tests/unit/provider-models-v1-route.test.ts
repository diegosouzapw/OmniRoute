/**
 * Tests for GET /api/v1/providers/[provider]/models
 * Covers the connection-ID fallback path added in PR #3402.
 *
 * Run: node --import tsx/esm --test tests/unit/provider-models-v1-route.test.ts
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-v1-provider-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const serviceModelsDb = await import("../../src/lib/db/serviceModels.ts");
const routeModule = await import(
  "../../src/app/api/v1/providers/[provider]/models/route.ts"
);

function makeRequest(provider: string) {
  return new Request(`http://localhost/api/v1/providers/${encodeURIComponent(provider)}/models`);
}

async function callGET(provider: string) {
  return routeModule.GET(makeRequest(provider), {
    params: Promise.resolve({ provider }),
  });
}

test.beforeEach(() => {
  core.resetDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET /v1/providers/:provider/models returns 400 for completely unknown provider", async () => {
  const res = await callGET("utterly-unknown-provider-xyz");
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.equal(body.error?.code, "invalid_provider");
  assert.ok(body.error?.message?.includes("utterly-unknown-provider-xyz"));
});

test("GET /v1/providers/:provider/models accepts openai-compatible connection ID format", async () => {
  const connectionId = "openai-compatible-chat-a1b2c3d4-e5f6-7890-abcd-ef1234567890";
  // A valid compatible connection ID should NOT return 400 (passes validation gate)
  const res = await callGET(connectionId);
  // The catalog may return 200 with empty data or non-200 for other reasons,
  // but it must NOT return the "Unknown provider" 400 error.
  if (res.status === 400) {
    const body = await res.json();
    assert.notEqual(
      body.error?.code,
      "invalid_provider",
      "openai-compatible-chat-* IDs must bypass the unknown-provider 400 gate"
    );
  }
});

test("GET /v1/providers/:provider/models accepts anthropic-compatible connection ID format", async () => {
  const connectionId = "anthropic-compatible-chat-deadbeef-0000-0000-0000-000000000000";
  const res = await callGET(connectionId);
  if (res.status === 400) {
    const body = await res.json();
    assert.notEqual(body.error?.code, "invalid_provider");
  }
});

test("GET /v1/providers/:provider/models returns synced embedded service models", async () => {
  serviceModelsDb.saveServiceModels("cliproxyapi", [
    { id: "cli/gpt-5", name: "GPT-5 via CLIProxyAPI" },
    { id: "old-model" },
  ]);
  serviceModelsDb.saveServiceModels("cliproxyapi", [
    { id: "cli/gpt-5", name: "GPT-5 via CLIProxyAPI" },
  ]);

  const res = await callGET("cliproxyapi");
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.equal(body.object, "list");
  assert.deepEqual(
    body.data.map((model: any) => model.id),
    ["cli/gpt-5"]
  );
  assert.equal(body.data[0].owned_by, "cliproxyapi");
  assert.equal(body.data[0].parent, null);
});

test("GET /v1/providers/:provider/models rejects non-matching connection-like strings", async () => {
  // Looks like a connection ID but with wrong prefix
  const res = await callGET("custom-compatible-chat-a1b2c3d4-e5f6-7890-abcd-ef1234567890");
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.equal(body.error?.code, "invalid_provider");
});
