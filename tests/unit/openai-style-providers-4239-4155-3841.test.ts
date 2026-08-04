/**
 * Batch coverage for three named OpenAI-style aggregator providers harvested in
 * the v3.8.30 cycle — all follow the zenmux (PR #4202) shape:
 *   - #4239 OpenAdapter  (https://api.openadapter.in/v1)
 *   - #4155 dit.ai       (https://api.dit.ai/v1)
 *   - #3841 TokenRouter  (https://api.tokenrouter.com/v1)
 *
 * Each is registered in APIKEY_PROVIDERS + PROVIDER_ENDPOINTS + the modular
 * registry, and added to NAMED_OPENAI_STYLE_PROVIDERS so `/models` serves the
 * live upstream catalog (falling back to the seeded list when the fetch fails).
 *
 * NOTE (Rule #18): the base paths were confirmed live (each returns a 401
 * OpenAI-style error body, i.e. the endpoint exists and requires a Bearer key).
 * The exact upstream model-id list could not be fetched without a key, so the
 * seed lists below are intentionally minimal — populated only from author/doc
 * confirmed ids (TokenRouter deepseek ids come from production via #3946). Live
 * discovery via NAMED_OPENAI_STYLE_PROVIDERS is the source of truth at runtime.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #6967 — every top-level `await` and every `test.after()` registration MUST
// happen BEFORE the first `test()` call in this file. Node's test runner
// starts executing already-registered top-level tests as soon as module
// evaluation yields on an `await` — it does not wait for the rest of the
// module to finish registering subtests first. When the DB setup (dynamic
// imports + `test.after()`) previously sat *between* the two SPECS loops
// below, the runner would already be mid-flight on the first DB-touching
// subtest by the time `test.after()` ran, so it bound the cleanup hook to
// that in-progress test's own lifecycle instead of the file root. The hook
// then fired while `modelsRoute.GET()` was still executing inside that
// subtest — closing the shared DB singleton and rm -rf'ing TEST_DATA_DIR out
// from under it — surfaced nondeterministically as "Nenhum driver SQLite
// disponível" / "Cannot open database because the directory does not exist"
// 500s (#6967). Doing every await + `test.after()` up front, before any
// `test()` call, guarantees the runner has no subtest running yet when the
// hook is registered, so it binds to the file root as intended.
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-providers-batch-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

interface ProviderSpec {
  id: string;
  alias: string;
  name: string;
  website: string;
  chatUrl: string;
  modelsUrl: string;
  seedSample: string;
}

const SPECS: ProviderSpec[] = [
  {
    id: "openadapter",
    alias: "oad",
    name: "OpenAdapter",
    website: "https://openadapter.dev",
    chatUrl: "https://api.openadapter.in/v1/chat/completions",
    modelsUrl: "https://api.openadapter.in/v1/models",
    seedSample: "glm-4.7",
  },
  {
    id: "dit",
    alias: "dai",
    name: "DIT.ai",
    website: "https://dit.ai",
    chatUrl: "https://api.dit.ai/v1/chat/completions",
    modelsUrl: "https://api.dit.ai/v1/models",
    seedSample: "gpt-5.4",
  },
  {
    id: "tokenrouter",
    alias: "trk",
    name: "TokenRouter",
    website: "https://tokenrouter.com",
    chatUrl: "https://api.tokenrouter.com/v1/chat/completions",
    modelsUrl: "https://api.tokenrouter.com/v1/models",
    seedSample: "deepseek-v4-pro",
  },
];

for (const spec of SPECS) {
  test(`${spec.name} is registered as an API-key provider with the canonical identity`, () => {
    const entry = APIKEY_PROVIDERS[spec.id];
    assert.ok(entry, `APIKEY_PROVIDERS.${spec.id} must be defined`);
    assert.equal(entry.id, spec.id);
    assert.equal(entry.alias, spec.alias);
    assert.equal(entry.name, spec.name);
    assert.equal(entry.website, spec.website);
    assert.equal(typeof entry.textIcon, "string");
  });

  test(`${spec.name} exposes the OpenAI-compatible chat completions URL`, () => {
    assert.equal(PROVIDER_ENDPOINTS[spec.id], spec.chatUrl);
  });

  test(`${spec.name} registry entry uses OpenAI format with bearer apikey auth`, () => {
    const entry = providerRegistry[spec.id];
    assert.ok(entry, `providerRegistry.${spec.id} must be defined`);
    assert.equal(entry.id, spec.id);
    assert.equal(entry.alias, spec.alias);
    assert.equal(entry.format, "openai");
    assert.equal(entry.executor, "default");
    assert.equal(entry.authType, "apikey");
    assert.equal(entry.authHeader, "bearer");
    assert.equal(entry.baseUrl, spec.chatUrl);
    assert.equal(entry.modelsUrl, spec.modelsUrl);
  });

  test(`${spec.name} ships a non-empty unique seed catalog including ${spec.seedSample}`, () => {
    const models = providerRegistry[spec.id].models;
    const ids = models.map((m: { id: string }) => m.id);
    assert.ok(ids.length >= 1, "seed list must be non-empty for the fallback path");
    assert.equal(new Set(ids).size, ids.length, "model ids must be unique");
    assert.ok(ids.includes(spec.seedSample), `seed list must include ${spec.seedSample}`);
  });
}

// ── Live /models discovery + fallback (the NAMED_OPENAI_STYLE_PROVIDERS branch) ──

interface ModelsBody {
  provider: string;
  models: Array<{ id: string }>;
  source?: string;
}

for (const spec of SPECS) {
  test(`#${spec.id} import fetches the live ${spec.modelsUrl} catalog`, async () => {
    resetStorage();
    const connection = await providersDb.createProviderConnection({
      provider: spec.id,
      authType: "apikey",
      name: `${spec.id}-live`,
      apiKey: `${spec.alias}-key`,
    });

    let fetched = false;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url) => {
      if (String(url) === spec.modelsUrl) {
        fetched = true;
        return Response.json({
          object: "list",
          data: [{ id: "live-only-model-xyz" }, { id: spec.seedSample }],
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
      assert.equal(body.provider, spec.id);
      assert.equal(body.source, "api", "should serve the live upstream catalog");
      assert.ok(fetched, `should have probed ${spec.modelsUrl}`);
      const ids = body.models.map((m) => m.id);
      assert.ok(ids.includes("live-only-model-xyz"), `live model missing: ${ids.join(",")}`);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  test(`#${spec.id} import falls back to the local seed catalog when the live fetch fails`, async () => {
    resetStorage();
    const connection = await providersDb.createProviderConnection({
      provider: spec.id,
      authType: "apikey",
      name: `${spec.id}-fallback`,
      apiKey: `${spec.alias}-key-2`,
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
      assert.equal(body.provider, spec.id);
      assert.equal(body.source, "local_catalog", "import must not break when upstream is down");
      assert.ok(body.models.length > 0, "fallback catalog should be non-empty");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
}
