/**
 * TDD regression for the provider-model-sweep (2026-06-19): seven providers were
 * classified as "fixed-official" in the registry (their `models[]` is a small
 * hardcoded seed), yet each exposes a real OpenAI-style `/models` endpoint that
 * serves a much larger, constantly-changing live catalog. Hardcoding the full
 * catalog would re-introduce the very staleness the sweep set out to fix, so the
 * correct fix mirrors #4249 (vercel-ai-gateway), #4202 (zenmux) and #3976
 * (llm7/byteplus): add the provider to NAMED_OPENAI_STYLE_PROVIDERS so the
 * import route does a live `<baseUrl>/models` fetch, keeping the small registry
 * seed only as the offline fallback.
 *
 * Root cause (shared with #4249): a keyed `format: "openai"` provider that is not
 * `openai-compatible-*`, not self-hosted, and not in NAMED_OPENAI_STYLE_PROVIDERS
 * never probes upstream `/models`, so the route serves the tiny hardcoded seed.
 *
 * Each case below pins the exact `/models` URL the route derives after stripping
 * `/chat/completions` (and a trailing `/v1`) from the registry baseUrl.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sweep-live-"));
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

// provider → the upstream /models URL the route resolves from its registry baseUrl.
const LIVE_CASES: Array<{ provider: string; liveUrl: string }> = [
  { provider: "venice", liveUrl: "https://api.venice.ai/api/v1/models" },
  { provider: "deepinfra", liveUrl: "https://api.deepinfra.com/v1/openai/models" },
  { provider: "wandb", liveUrl: "https://api.inference.wandb.ai/v1/models" },
  { provider: "pollinations", liveUrl: "https://gen.pollinations.ai/v1/models" },
  { provider: "nscale", liveUrl: "https://inference.api.nscale.com/v1/models" },
  { provider: "inference-net", liveUrl: "https://api.inference.net/v1/models" },
  { provider: "moonshot", liveUrl: "https://api.moonshot.ai/v1/models" },
];

for (const { provider, liveUrl } of LIVE_CASES) {
  test(`sweep: ${provider} import fetches the live /models catalog`, async () => {
    await resetStorage();
    const connection = await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      name: `${provider}-live`,
      apiKey: "sweep-key",
    });

    let fetched = false;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url) => {
      if (String(url) === liveUrl) {
        fetched = true;
        return Response.json({
          object: "list",
          data: [{ id: `${provider}-live-a` }, { id: `${provider}-live-b` }],
        });
      }
      // Bogus probe variants (…/v1/v1/models, …/chat/completions/models) → 404.
      return new Response("not found", { status: 404 });
    };

    try {
      const response = await modelsRoute.GET(
        new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
        { params: { id: connection.id } }
      );
      assert.equal(response.status, 200);
      const body = (await response.json()) as ModelsBody;
      assert.equal(body.provider, provider);
      assert.ok(fetched, `should have probed ${liveUrl}`);
      assert.equal(body.source, "api", "should serve the live upstream catalog, not local_catalog");
      const ids = body.models.map((m) => m.id);
      assert.ok(
        ids.includes(`${provider}-live-a`) && ids.includes(`${provider}-live-b`),
        `live models missing from catalog: ${ids.join(",")}`
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
}

test("sweep: live-discovery providers fall back to the local seed when upstream is down", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "venice",
    authType: "apikey",
    name: "venice-fallback",
    apiKey: "sweep-key-2",
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
    assert.equal(body.provider, "venice");
    assert.equal(body.source, "local_catalog", "import must not break when upstream is down");
    assert.ok(body.models.length > 0, "fallback seed should be non-empty");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
