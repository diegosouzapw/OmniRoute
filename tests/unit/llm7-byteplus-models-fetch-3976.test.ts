/**
 * TDD regression for #3976: LLM7 (and BytePlus) `GET /models` returned a stale
 * hardcoded list instead of the live catalog.
 *
 * Root cause: `llm7`/`byteplus` carry a correct `modelsUrl` in the registry, but
 * neither is classified by any live-fetch branch of the import route — not
 * `openai-compatible-*`, not self-hosted, and not in NAMED_OPENAI_STYLE_PROVIDERS.
 * So the route never probes the upstream `/models` and falls through to the
 * registry's hardcoded `models[]` (4 entries), reported as `source:"local_catalog"`.
 *
 * Fix: add `llm7` and `byteplus` to NAMED_OPENAI_STYLE_PROVIDERS so the route
 * does a live `<baseUrl>/models` fetch (falling back to the local catalog only
 * when the upstream fetch fails, so import never breaks).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-3976-"));
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

interface ModelsBody {
  provider: string;
  connectionId: string;
  models: Array<{ id: string }>;
  source?: string;
}

test("#3976 LLM7 import fetches the live /v1/models catalog (not the 4 hardcoded models)", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "llm7",
    authType: "apikey",
    name: "llm7-live",
    apiKey: "llm7-key",
  });

  let fetched = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (String(url) === "https://api.llm7.io/v1/models") {
      fetched = true;
      return Response.json({
        object: "list",
        data: [
          { id: "gpt-5.1-nano-pro" },
          { id: "deepseek-v4-standard" },
          { id: "qwen3.6-coder-pro" },
        ],
      });
    }
    // Bogus probe variants (…/v1/v1/models, …/chat/completions/models) → 404
    return new Response("not found", { status: 404 });
  };

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as ModelsBody;
    assert.equal(body.provider, "llm7");
    assert.equal(body.source, "api", "should serve the live upstream catalog, not local_catalog");
    assert.ok(fetched, "should have probed https://api.llm7.io/v1/models");
    const ids = body.models.map((m) => m.id);
    assert.ok(ids.includes("gpt-5.1-nano-pro"), `live ids missing: ${ids.join(",")}`);
    // The stale hardcoded entries must not be what we serve.
    assert.ok(!ids.includes("gpt-4o-mini-2024-07-18"), "served stale hardcoded catalog");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#3976 LLM7 import falls back to the local catalog when the live fetch fails", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "llm7",
    authType: "apikey",
    name: "llm7-fallback",
    apiKey: "llm7-key-2",
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("bad gateway", { status: 502 });

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as ModelsBody;
    assert.equal(body.provider, "llm7");
    assert.equal(body.source, "local_catalog", "import must not break when upstream is down");
    assert.ok(body.models.length > 0, "fallback catalog should be non-empty");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#3976 BytePlus import fetches the live /api/v3/models catalog", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "byteplus",
    authType: "apikey",
    name: "byteplus-live",
    apiKey: "ark-key",
  });

  let fetched = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (String(url) === "https://ark.ap-southeast.bytepluses.com/api/v3/models") {
      fetched = true;
      return Response.json({
        object: "list",
        data: [{ id: "seed-2.5-live" }, { id: "kimi-k2.5-live" }],
      });
    }
    return new Response("not found", { status: 404 });
  };

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as ModelsBody;
    assert.equal(body.provider, "byteplus");
    assert.equal(body.source, "api");
    assert.ok(fetched, "should have probed https://ark.ap-southeast.bytepluses.com/api/v3/models");
    assert.ok(body.models.map((m) => m.id).includes("seed-2.5-live"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
