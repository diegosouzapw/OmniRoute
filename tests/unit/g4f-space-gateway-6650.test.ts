/**
 * Issue #6650 — Add g4f.space no-key gateway (Groq/Ollama/Pollinations/NVIDIA/Gemini
 * via gpt4free).
 *
 * Live-verified reachability (triage, not re-verified in CI — see plan-file):
 *   GET https://g4f.space/api/nvidia/models        → 200, real model list
 *   GET https://g4f.space/api/ollama/v1/models     → 200, real model list
 *   GET https://g4f.space/api/pollinations/v1/models → 200, real model list
 *   GET https://g4f.space/api/gemini/v1/models     → 200, real model list
 *   GET https://g4f.space/api/groq/...              → live Groq backend
 *
 * Verifies each of the 5 sub-path providers is wired end-to-end the same way as
 * the other no-key gateway providers (hackclub, uncloseai):
 *   - present in the executor REGISTRY with a no-key OpenAI-compatible shape
 *   - resolvable through getExecutor() (falls through to DefaultExecutor)
 *   - listed in AGGREGATOR_PROVIDER_IDS so it shows up in the aggregator
 *     category on the dashboard
 *   - allowed to skip API key validation (providerAllowsOptionalApiKey)
 *   - has provider metadata (name/website/free-tier note) in the apikey
 *     gateway catalog
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
}

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { getExecutor, DefaultExecutor } = await import("../../open-sse/executors/index.ts");
const { AGGREGATOR_PROVIDER_IDS, providerAllowsOptionalApiKey } = await import(
  "../../src/shared/constants/providers.ts"
);
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");

const SUB_PATHS: Record<string, string> = {
  "g4f-groq": "groq",
  "g4f-gemini": "gemini",
  "g4f-pollinations": "pollinations",
  "g4f-ollama": "ollama",
  "g4f-nvidia": "nvidia",
};

for (const [id, subPath] of Object.entries(SUB_PATHS)) {
  test(`#6650 ${id} is registered in the executor registry with a no-key OpenAI-compatible shape`, () => {
    const entry = (REGISTRY as Record<string, RegistryEntryShape>)[id];
    assert.ok(entry, `${id} should be present in the executor registry`);
    assert.equal(entry.format, "openai");
    assert.equal(entry.executor, "default");
    assert.equal(entry.baseUrl, `https://g4f.space/api/${subPath}/v1/chat/completions`);
    assert.equal(entry.modelsUrl, `https://g4f.space/api/${subPath}/v1/models`);
    assert.equal(entry.authType, "optional");
    assert.equal(entry.passthroughModels, true);
    assert.ok(
      Array.isArray(entry.models) && entry.models.length > 0,
      `${id} must seed a fallback model list`
    );
  });

  test(`#6650 ${id} resolves through getExecutor() as a DefaultExecutor instance`, () => {
    const executor = getExecutor(id);
    assert.ok(
      executor instanceof DefaultExecutor,
      `${id} has no custom executor — must fall through to DefaultExecutor`
    );
  });

  test(`#6650 ${id} is classified as an aggregator/gateway provider`, () => {
    assert.ok(
      AGGREGATOR_PROVIDER_IDS.has(id),
      `${id} must be listed in AGGREGATOR_PROVIDER_IDS alongside hackclub/uncloseai`
    );
  });

  test(`#6650 ${id} allows optional (no-key) API key validation`, () => {
    assert.equal(providerAllowsOptionalApiKey(id), true);
  });

  test(`#6650 ${id} has provider metadata with free-tier info`, () => {
    const meta = (APIKEY_PROVIDERS as Record<string, ApikeyMetaShape>)[id];
    assert.ok(meta, `${id} should have an APIKEY_PROVIDERS metadata entry`);
    assert.equal(meta.id, id);
    assert.equal(meta.website, "https://g4f.space");
    assert.equal(meta.hasFree, true);
    assert.equal(typeof meta.freeNote, "string");
    assert.ok((meta.freeNote as string).length > 0);
  });
}
