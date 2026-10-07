/**
 * Issue #6674 — Add Naga.ac and ChatAnywhere as gpt4free-ecosystem aggregator providers.
 *
 * Verifies both providers are wired end-to-end the same way as the other aggregator
 * gateway providers (g4f-groq, freetheai):
 *   - present in the executor REGISTRY with an OpenAI-compatible shape
 *   - resolvable through getExecutor() (falls through to DefaultExecutor)
 *   - listed in AGGREGATOR_PROVIDER_IDS so they show up in the aggregator category
 *   - has provider metadata (name/website/free-tier note) in the apikey gateway catalog
 *   - Naga.ac allows optional API key (free models); ChatAnywhere requires a key
 */
import test from "node:test";
import assert from "node:assert/strict";

interface RegistryEntryShape {
  format?: string;
  executor?: string;
  baseUrl?: string;
  modelsUrl?: string;
  authType?: string;
  authHeader?: string;
  passthroughModels?: boolean;
  models?: unknown[];
}

interface ApikeyMetaShape {
  id?: string;
  name?: string;
  website?: string;
  hasFree?: boolean;
  freeNote?: string;
  passthroughModels?: boolean;
}

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { getExecutor, DefaultExecutor } = await import("../../open-sse/executors/index.ts");
const { AGGREGATOR_PROVIDER_IDS, providerAllowsOptionalApiKey } = await import(
  "../../src/shared/constants/providers.ts"
);
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");

const PROVIDERS: Record<string, { id: string; authType: string; baseUrl: string; website: string }> = {
  "naga-ac": {
    id: "naga-ac",
    authType: "optional",
    baseUrl: "https://api.naga.ac/v1/chat/completions",
    website: "https://naga.ac",
  },
  chatanywhere: {
    id: "chatanywhere",
    authType: "apikey",
    // #9584 (wave4 gateway audit): moved to the international api.chatanywhere.org
    // endpoint; metadata website is the product page https://chatanywhere.tech.
    baseUrl: "https://api.chatanywhere.org/v1/chat/completions",
    website: "https://chatanywhere.tech",
  },
};

for (const [id, info] of Object.entries(PROVIDERS)) {
  test(`#6674 ${id} is registered in the executor registry with an OpenAI-compatible shape`, () => {
    const entry = (REGISTRY as Record<string, RegistryEntryShape>)[id];
    assert.ok(entry, `${id} should be present in the executor registry`);
    assert.equal(entry.format, "openai");
    assert.equal(entry.executor, "default");
    assert.equal(entry.baseUrl, info.baseUrl);
    assert.equal(entry.authType, info.authType);
    assert.equal(entry.authHeader, "bearer");
    assert.equal(entry.passthroughModels, true);
  });

  test(`#6674 ${id} resolves through getExecutor() as a DefaultExecutor instance`, async () => {
    const executor = await getExecutor(id);
    assert.ok(
      executor instanceof DefaultExecutor,
      `${id} has no custom executor — must fall through to DefaultExecutor`
    );
  });

  test(`#6674 ${id} is classified as an aggregator/gateway provider`, () => {
    assert.ok(
      AGGREGATOR_PROVIDER_IDS.has(id),
      `${id} must be listed in AGGREGATOR_PROVIDER_IDS`
    );
  });

  test(`#6674 ${id} has provider metadata with free-tier info`, () => {
    const meta = (APIKEY_PROVIDERS as Record<string, ApikeyMetaShape>)[id];
    assert.ok(meta, `${id} should have an APIKEY_PROVIDERS metadata entry`);
    assert.equal(meta.id, id);
    assert.equal(meta.website, info.website);
    assert.equal(meta.hasFree, true);
    assert.equal(typeof meta.freeNote, "string");
    assert.ok((meta.freeNote as string).length > 0);
    assert.equal(meta.passthroughModels, true);
  });
}

test("#6674 naga-ac allows optional (no-key) API key validation", () => {
  assert.equal(providerAllowsOptionalApiKey("naga-ac"), true);
});

test("#6674 chatanywhere requires an API key (not optional)", () => {
  assert.equal(providerAllowsOptionalApiKey("chatanywhere"), false);
});