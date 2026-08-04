/**
 * TDD regression for #4249: the Vercel AI Gateway "import models" button on
 * /models returned nothing usable — clicking import did not load the live
 * catalog, even though manually adding the same models works. (@FerLuisxd)
 *
 * Root cause: `vercel-ai-gateway` carries a real `baseUrl`
 * (`https://ai-gateway.vercel.sh/v1/chat/completions`, format "openai") in the
 * registry, but is not classified by any live-fetch branch of the import route —
 * it is not `openai-compatible-*`, not self-hosted, and not in
 * NAMED_OPENAI_STYLE_PROVIDERS. So the route never probes the upstream `/models`
 * and falls through to the registry's tiny hardcoded `models[]` (5 entries).
 *
 * Fix: add `vercel-ai-gateway` to NAMED_OPENAI_STYLE_PROVIDERS so the route does a
 * live `<baseUrl>/models` fetch. After stripping `/chat/completions`, the
 * `${base}/models` candidate resolves to `https://ai-gateway.vercel.sh/v1/models`
 * (the real Vercel AI Gateway models endpoint), normalized via
 * `normalizeOpenAiLikeModelsResponse`, falling back to the local catalog only when
 * the upstream fetch fails — import never breaks. Mirrors #4202 (zenmux) and
 * #3976 (llm7/byteplus).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-4249-"));
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

test("#4249 Vercel AI Gateway import fetches the live /v1/models catalog", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "vercel-ai-gateway",
    authType: "apikey",
    name: "vag-live",
    apiKey: "vck_key",
  });

  let fetched = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    // `${base}/models` after stripping `/chat/completions` → the gateway endpoint.
    if (String(url) === "https://ai-gateway.vercel.sh/v1/models") {
      fetched = true;
      return Response.json({
        object: "list",
        data: [
          { id: "xai/grok-4" },
          { id: "openai/gpt-5.1" },
          { id: "anthropic/claude-opus-4.5" },
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
    assert.equal(body.provider, "vercel-ai-gateway");
    assert.equal(body.source, "api", "should serve the live upstream catalog, not local_catalog");
    assert.ok(fetched, "should have probed https://ai-gateway.vercel.sh/v1/models");
    const ids = body.models.map((m) => m.id);
    assert.ok(ids.includes("xai/grok-4"), `live models missing from catalog: ${ids.join(",")}`);
    assert.ok(ids.includes("openai/gpt-5.1"), `live models missing: ${ids.join(",")}`);
    // The stale hardcoded registry entry must not be what we serve.
    assert.ok(
      !ids.includes("vercel/v0-1.5-md"),
      "served the stale hardcoded registry catalog instead of the live list"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#4249 Vercel AI Gateway import falls back to the local catalog when the live fetch fails", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "vercel-ai-gateway",
    authType: "apikey",
    name: "vag-fallback",
    apiKey: "vck_key_2",
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
    assert.equal(body.provider, "vercel-ai-gateway");
    assert.equal(body.source, "local_catalog", "import must not break when upstream is down");
    assert.ok(body.models.length > 0, "fallback catalog should be non-empty");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
