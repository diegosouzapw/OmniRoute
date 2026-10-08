/**
 * TDD regression for #15307: Xiaomi MiMo "import models" served the 2-entry
 * hardcoded registry seed with "API unavailable — using local catalog", even
 * though the upstream `GET /v1/models` answers with a full live catalog
 * (8 models on the token-plan host, including mimo-v2.6-pro / mimo-v2.6-flash
 * and the ASR/TTS variants) and chat completions work against the same key.
 *
 * Root cause: `xiaomi-mimo` / `xiaomi-mimo-token-plan` are keyed OpenAI-style
 * providers with a real registry `baseUrl`, but are not classified by any
 * live-fetch branch of the import route — they are not `openai-compatible-*`,
 * not self-hosted, and were not in NAMED_OPENAI_STYLE_PROVIDERS. So the route
 * never probed the upstream `/models` and fell through to the registry's tiny
 * hardcoded `models[]` (2 entries), while inference kept working through
 * DefaultExecutor. Same case as #4249 (vercel-ai-gateway), #4202 (zenmux) and
 * #3976 (llm7/byteplus).
 *
 * Fix: add `xiaomi-mimo` and `xiaomi-mimo-token-plan` to
 * NAMED_OPENAI_STYLE_PROVIDERS so the route does a live `<baseUrl>/models`
 * fetch, falling back to the local catalog only when the upstream fetch fails —
 * import never breaks.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15307-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const providerSets = await import(
  "../../src/app/api/providers/[id]/models/discovery/providerSets.ts"
);

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

interface ModelsBody {
  provider: string;
  connectionId: string;
  models: Array<{ id: string }>;
  source?: string;
}

test("#15307 xiaomi-mimo providers are classified for live /models discovery", () => {
  assert.ok(providerSets.isNamedOpenAIStyleProvider("xiaomi-mimo"));
  assert.ok(providerSets.isNamedOpenAIStyleProvider("xiaomi-mimo-token-plan"));
});

test("#15307 xiaomi-mimo import fetches the live /v1/models catalog", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "xiaomi-mimo",
    authType: "apikey",
    name: "mimo-live",
    apiKey: "mk_test_key",
  });

  let fetched = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    // `${base}/models` after stripping `/v1` → `https://api.xiaomimimo.com/v1/models`.
    if (String(url) === "https://api.xiaomimimo.com/v1/models") {
      fetched = true;
      return Response.json({
        object: "list",
        data: [
          { id: "mimo-v2.5-pro" },
          { id: "mimo-v2.5" },
          { id: "mimo-v2.6-pro" },
          { id: "mimo-v2.6-flash" },
          { id: "mimo-v2.5-asr" },
          { id: "mimo-v2.5-tts" },
          { id: "mimo-v2.5-tts-voiceclone" },
          { id: "mimo-v2.5-tts-voicedesign" },
        ],
      });
    }
    // Bogus probe variants (…/v1/v1/models, …/models) → 404
    return new Response("not found", { status: 404 });
  };

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as ModelsBody;
    assert.equal(body.provider, "xiaomi-mimo");
    assert.equal(body.source, "api", "should serve the live upstream catalog, not local_catalog");
    assert.ok(fetched, "should have probed https://api.xiaomimimo.com/v1/models");
    const ids = body.models.map((m) => m.id);
    for (const expected of ["mimo-v2.6-pro", "mimo-v2.6-flash", "mimo-v2.5-asr", "mimo-v2.5-tts"]) {
      assert.ok(
        ids.includes(expected),
        `live model ${expected} missing from catalog: ${ids.join(",")}`
      );
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#15307 xiaomi-mimo-token-plan import fetches the live token-plan /v1/models catalog", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "xiaomi-mimo-token-plan",
    authType: "apikey",
    name: "mimo-tp-live",
    apiKey: "tp_test_key",
  });

  let fetched = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (String(url) === "https://token-plan-sgp.xiaomimimo.com/v1/models") {
      fetched = true;
      return Response.json({
        object: "list",
        data: [{ id: "mimo-v2.5-pro" }, { id: "mimo-v2.5" }, { id: "mimo-v2.6-pro" }],
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
    assert.equal(body.provider, "xiaomi-mimo-token-plan");
    assert.equal(body.source, "api", "should serve the live upstream catalog, not local_catalog");
    assert.ok(fetched, "should have probed https://token-plan-sgp.xiaomimimo.com/v1/models");
    const ids = body.models.map((m) => m.id);
    assert.ok(ids.includes("mimo-v2.6-pro"), `live model missing: ${ids.join(",")}`);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#15307 xiaomi-mimo import falls back to the local catalog when the live fetch fails", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "xiaomi-mimo",
    authType: "apikey",
    name: "mimo-fallback",
    apiKey: "mk_test_key_2",
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
    assert.equal(body.provider, "xiaomi-mimo");
    assert.equal(body.source, "local_catalog", "import must not break when upstream is down");
    assert.ok(body.models.length > 0, "fallback catalog should be non-empty");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
