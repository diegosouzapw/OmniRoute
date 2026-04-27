import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-count-tokens-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { POST } = await import("../../src/app/api/v1/messages/count_tokens/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider, overrides = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: overrides.name || `${provider}-count-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey || `sk-${provider}-count`,
    isActive: overrides.isActive ?? true,
    testStatus: overrides.testStatus || "active",
    providerSpecificData: overrides.providerSpecificData || {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("messages/count_tokens uses real provider count when Claude-compatible upstream supports it", async () => {
  await seedConnection("anthropic", { apiKey: "sk-ant-count" });

  const originalFetch = globalThis.fetch;
  let captured = null;
  globalThis.fetch = async (url, init = {}) => {
    captured = {
      body: JSON.parse(String(init.body)),
      headers: init.headers,
      url: String(url),
    };
    return new Response(JSON.stringify({ input_tokens: 321 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const response = await POST(
      new Request("http://localhost/api/v1/messages/count_tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "anthropic/claude-opus-4.6",
          messages: [{ role: "user", content: "Count these tokens" }],
        }),
      })
    );

    assert.equal(response.status, 200);
    const body = (await response.json()) as any;
    assert.equal(body.input_tokens, 321);
    assert.equal(body.source, "provider");
    assert.equal(body.provider, "anthropic");
    assert.equal(body.model, "claude-opus-4.6");
    assert.ok(captured.url.endsWith("/v1/messages/count_tokens"));
    assert.equal(captured.body.model, "claude-opus-4.6");
    assert.equal(captured.headers["x-api-key"], "sk-ant-count");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("messages/count_tokens falls back to estimate when model is missing", async () => {
  const response = await POST(
    new Request("http://localhost/api/v1/messages/count_tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "user", content: "abcd" },
          { role: "assistant", content: [{ type: "text", text: "12345678" }] },
        ],
      }),
    })
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as any;
  assert.equal(body.input_tokens, 3);
  assert.equal(body.source, "estimated");
});

test("messages/count_tokens falls back to estimate when real upstream count fails", async () => {
  await seedConnection("anthropic", { apiKey: "sk-ant-fallback" });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("upstream unavailable", { status: 503 });

  try {
    const response = await POST(
      new Request("http://localhost/api/v1/messages/count_tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "anthropic/claude-opus-4.6",
          messages: [{ role: "user", content: "abcd" }],
        }),
      })
    );

    assert.equal(response.status, 200);
    const body = (await response.json()) as any;
    assert.equal(body.input_tokens, 1);
    assert.equal(body.source, "estimated");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
