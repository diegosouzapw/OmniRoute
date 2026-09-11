// Regression guard for #12107 — `gemini-business` had no model listing.
//
// The provider was registered only in the dashboard/connection catalog
// (src/shared/constants/providers/web-cookie.ts) and had no `RegistryEntry` in
// the model REGISTRY that backs `/v1/models` and `/v1/providers/{provider}/models`.
// The listing route resolved the provider fine, but its catalog filter
// (`owned_by === "gemini-business"`) never matched anything because no registry
// entry ever published a model under that owner — so it returned an empty list
// instead of an error.
//
// The executor (open-sse/executors/gemini-business.ts, MODEL_CATEGORY_MAP) already
// carries the static list of every model id it understands. This suite pins that
// list on the registry entry, mirroring the sibling cookie provider `gemini-web`.

import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY, getRegistryEntry, generateModels, generateAliasMap, getRegisteredProviders } =
  await import("../../open-sse/config/providerRegistry.ts");
const { WEB_COOKIE_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { supportsReasoning, supportsToolCalling } =
  await import("../../src/lib/modelCapabilities.ts");

// Exactly the ids the executor's MODEL_CATEGORY_MAP understands, in map order.
const EXECUTOR_MODEL_IDS = [
  "gemini-3-pro",
  "gemini-3-ultra",
  "gemini-3-flash",
  "gemini-2.5-pro",
  "gemini-2.5-flash",
  "gemini-2.5-flash-thinking",
  "gemini-2.0-pro",
  "gemini-2.0-flash",
  "gemini-2.0-flash-thinking",
  "gemini-3-pro-image",
  "gemini-2.0-flash-image",
  "veo-3.1-generate",
];

test("#12107 gemini-business has a REGISTRY entry wired to its executor", () => {
  const entry = REGISTRY["gemini-business"];
  assert.ok(
    entry,
    "REGISTRY must contain a gemini-business entry — without it /v1/models lists nothing"
  );
  assert.equal(entry.id, "gemini-business");
  assert.equal(entry.executor, "gemini-business");
  assert.equal(entry.format, "openai");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "cookie");
  assert.ok(getRegisteredProviders().includes("gemini-business"));
});

test("#12107 the registry alias matches the dashboard catalog alias", () => {
  // The listing route resolves the provider via getRegistryEntry() (id OR alias)
  // and the dashboard resolves it via WEB_COOKIE_PROVIDERS; both must agree.
  const entry = REGISTRY["gemini-business"];
  const dashboard = WEB_COOKIE_PROVIDERS["gemini-business"];
  assert.ok(entry);
  assert.equal(entry.alias, "gembiz");
  assert.equal(entry.alias, dashboard.alias);
  assert.equal(getRegistryEntry("gembiz"), entry, "alias lookup must resolve to the same entry");
  assert.equal(getRegistryEntry("gemini-business"), entry);
  assert.equal(generateAliasMap()["gemini-business"], "gembiz");
});

test("#12107 gemini-business lists every model id the executor understands", () => {
  const entry = REGISTRY["gemini-business"];
  assert.ok(entry);
  assert.deepEqual(
    entry.models.map(({ id }) => id),
    EXECUTOR_MODEL_IDS,
    "registry ids must mirror the executor's MODEL_CATEGORY_MAP exactly"
  );
  for (const model of entry.models) {
    assert.equal(typeof model.name, "string");
    assert.ok(model.name.length > 0, `${model.id} must carry a display name`);
  }
});

test("#12107 the static catalog surface publishes gemini-business models under its alias", () => {
  // generateModels() is what the static model catalog reads; it keys by alias.
  const byAlias = generateModels();
  assert.ok(
    byAlias.gembiz,
    "generateModels() must expose the gemini-business catalog under 'gembiz'"
  );
  assert.deepEqual(
    byAlias.gembiz.map(({ id }) => id),
    EXECUTOR_MODEL_IDS
  );
});

test("#12107 registry advertises no native tool calling and no reasoning (same contract as gemini-web, #9356)", () => {
  // The executor drives StreamGenerate with a fixed thinking mode and returns
  // plain text only: it never surfaces reasoning_content and has no
  // function-calling channel. Agent routers reading /v1/models must not pick
  // these models for reasoning or native tool work.
  const entry = REGISTRY["gemini-business"];
  assert.ok(entry);
  for (const model of entry.models) {
    assert.equal(model.toolCalling, false, `${model.id} must not advertise native tool calling`);
    assert.equal(model.supportsReasoning, false, `${model.id} must advertise reasoning:false`);

    const input = { provider: "gemini-business", model: model.id };
    assert.equal(supportsReasoning(input), false, `${model.id} resolved reasoning must be false`);
    assert.equal(
      supportsToolCalling(input),
      false,
      `${model.id} resolved native tool calling must be false`
    );
  }
});
