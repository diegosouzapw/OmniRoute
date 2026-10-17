import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

process.env.FETCH_TIMEOUT_MS = "50";
const originalFetch = globalThis.fetch;
const { handleCodexImages } = await import("../../open-sse/handlers/codexImages.ts");
const { getCodexBackendIdentityHeaders } = await import("../../open-sse/config/codexClient.ts");
const credentials = { accessToken: "fixture-token", providerSpecificData: { workspaceId: "fixture-account", workspacePlanType: "plus" } };
const options = { model: "gpt-image-2", provider: "codex", providerConfig: { baseUrl: "https://fixture.invalid/backend-api/codex/responses" }, credentials, log: null };
const PNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=";
const DATA_URL = `data:image/png;base64,${PNG}`;
const payload = { created: 1778832973, data: [{ b64_json: PNG, generation_id: "fixture-generation" }], size: "1024x1536", quality: "high", background: "opaque", usage: { total_tokens: 3 } };

test.after(() => { globalThis.fetch = originalFetch; });

test("dedicated Codex Images forwards an exact engine request, selected auth and original JSON", { timeout: 2000 }, async () => {
  let calls = 0;
  globalThis.fetch = async (url, init) => {
    calls++;
    assert.equal(String(url), "https://fixture.invalid/backend-api/codex/images/generations");
    assert.equal(init?.method, "POST");
    assert.deepEqual(JSON.parse(String(init?.body)), { model: "gpt-image-2.5-sunburst", prompt: " رنگ آبی — café ", n: 1, size: "3840x2160", quality: "high", background: "opaque" });
    const headers = new Headers(init?.headers);
    assert.equal(headers.get("authorization"), "Bearer fixture-token");
    assert.equal(headers.get("chatgpt-account-id"), "fixture-account");
    assert.equal(headers.get("session_id"), "fixture-account");
    assert.equal(headers.get("content-type"), "application/json");
    assert.equal(headers.get("accept"), "application/json");
    for (const [name, value] of Object.entries(getCodexBackendIdentityHeaders())) assert.equal(headers.get(name), value);
    return Response.json(payload, { headers: { "x-codex-imagegen-request-id": "fixture-image-request", "x-request-id": "fixture-outer-request" } });
  };
  const result = await handleCodexImages({ ...options, model: "gpt-image-2.5-sunburst", body: { prompt: " رنگ آبی — café ", n: 1, size: "3840x2160", quality: "high", background: "opaque" } });
  assert.equal(result.success, true);
  if (!result.success) assert.fail("expected image JSON");
  assert.deepEqual(result.data, payload);
  assert.match(result.metadata.warning, /not verified/);
  assert.equal(result.metadata.imagegenRequestId, "fixture-image-request");
  assert.equal(result.metadata.requestId, "fixture-outer-request");
  assert.equal(calls, 1);
});

test("dedicated Codex rejects six references without submitting", { timeout: 2000 }, async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls++; return Response.json(payload); };
  const result = await handleCodexImages({ ...options, operation: "edits", body: { prompt: "fixture", images: Array(6).fill({ image_url: DATA_URL }) } });
  assert.equal(result.success, false);
  if (result.success) assert.fail("expected reference rejection");
  assert.equal(result.status, 400);
  assert.equal(calls, 0);
});

test("dedicated Codex transport never initializes persistent database state", { timeout: 2000 }, () => {
  assert.ok(process.env.DATA_DIR);
  assert.equal(existsSync(join(process.env.DATA_DIR!, "storage.sqlite")), false);
});
