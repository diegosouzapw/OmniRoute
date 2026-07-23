/**
 * TDD regression for #4202: ZenMux `GET /models` served a stale 9-entry hardcoded
 * registry list (source:"local_catalog", "API unavailable — using local catalog")
 * instead of the live upstream catalog, so the free models ZenMux advertises
 * (e.g. `z-ai/glm-5.2-free`, `moonshotai/kimi-k2.7-code-free`) never showed up.
 *
 * Root cause: `zenmux` carries a correct `modelsUrl` in the registry, but is not
 * classified by any live-fetch branch of the import route — not `openai-compatible-*`,
 * not self-hosted, and not in NAMED_OPENAI_STYLE_PROVIDERS. So the route never probes
 * the upstream `/models` and falls through to the registry's hardcoded `models[]`.
 *
 * Fix: add `zenmux` to NAMED_OPENAI_STYLE_PROVIDERS so the route does a live
 * `<baseUrl>/models` fetch (the `/chat/completions`-stripped `${base}/models` candidate
 * resolves to `https://zenmux.ai/api/v1/models`), falling back to the local catalog
 * only when the upstream fetch fails — import never breaks. Mirrors #3976 (llm7/byteplus).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-4202-"));
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

test("#4202 ZenMux import fetches the live /api/v1/models catalog (incl. the free models)", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "zenmux",
    authType: "apikey",
    name: "zenmux-live",
    apiKey: "zm-key",
  });

  let fetched = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    // `${base}/models` after stripping `/chat/completions` → the registry modelsUrl.
    if (String(url) === "https://zenmux.ai/api/v1/models") {
      fetched = true;
      return Response.json({
        object: "list",
        data: [
          { id: "z-ai/glm-5.2-free" },
          { id: "moonshotai/kimi-k2.7-code-free" },
          { id: "openai/gpt-5" },
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
    assert.equal(body.provider, "zenmux");
    assert.equal(body.source, "api", "should serve the live upstream catalog, not local_catalog");
    assert.ok(fetched, "should have probed https://zenmux.ai/api/v1/models");
    const ids = body.models.map((m) => m.id);
    assert.ok(
      ids.includes("z-ai/glm-5.2-free"),
      `live free models missing from catalog: ${ids.join(",")}`
    );
    assert.ok(ids.includes("moonshotai/kimi-k2.7-code-free"), `live free models missing: ${ids.join(",")}`);
    // The stale hardcoded registry entry must not be what we serve.
    assert.ok(
      !ids.includes("mistralai/mistral-large-2512"),
      "served the stale hardcoded registry catalog instead of the live list"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#4202 ZenMux import falls back to the local catalog when the live fetch fails", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "zenmux",
    authType: "apikey",
    name: "zenmux-fallback",
    apiKey: "zm-key-2",
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
    assert.equal(body.provider, "zenmux");
    assert.equal(body.source, "local_catalog", "import must not break when upstream is down");
    assert.ok(body.models.length > 0, "fallback catalog should be non-empty");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
