import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kimi-web-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("kimi-web model discovery sends Kimi auth as bearer and cookie", async () => {
  await resetStorage();
  const jwt = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIn0.signature";
  const connection = await providersDb.createProviderConnection({
    provider: "kimi-web",
    authType: "apikey",
    name: "kimi-web-discovery",
    apiKey: `_ga=ignored; theme=dark; kimi-auth=${jwt}; __cf_bm=ignored`,
  });

  let captured: { url: string; init?: RequestInit } | null = null;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    captured = { url: String(url), init };
    return Response.json({
      availableModels: [
        { key: "k2d6", displayName: "K2.6 Instant" },
        { key: "k2d6-thinking", displayName: "K2.6 Thinking", thinking: true },
        { key: "k2d6-agent", displayName: "K2.6 Agent" },
        { key: "k2d6-agent-ultra", displayName: "K2.6 Agent Swarm" },
      ],
    });
  }) as typeof globalThis.fetch;

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.source, "api");
    assert.deepEqual(
      body.models.map((model: { id: string }) => model.id),
      ["k2d6", "k2d6-thinking"]
    );
    assert.equal(
      captured?.url,
      "https://www.kimi.com/apiv2/kimi.gateway.config.v1.ConfigService/GetAvailableModels"
    );
    assert.equal(captured?.init?.method, "POST");
    assert.equal(captured?.init?.body, "{}");
    const headers = captured?.init?.headers as Record<string, string>;
    assert.equal(headers.Authorization, `Bearer ${jwt}`);
    assert.equal(headers.Cookie, `kimi-auth=${jwt}`);
    assert.equal(headers["connect-protocol-version"], "1");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
