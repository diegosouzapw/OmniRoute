import test from "node:test";
import assert from "node:assert/strict";

const {
  AI_PROVIDERS,
  ALIAS_TO_ID,
  ID_TO_ALIAS,
  getProviderById,
  getProviderByAlias,
  FREE_PROVIDERS,
  OAUTH_PROVIDERS,
  APIKEY_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
  LOCAL_PROVIDERS,
  SEARCH_PROVIDERS,
  AUDIO_ONLY_PROVIDERS,
} = await import("../../src/shared/constants/providers.ts");

const { IMAGE_PROVIDERS, getImageProviders } = await import(
  "../../open-sse/config/imageRegistry.ts"
);

const ALL_SECTIONS = [
  FREE_PROVIDERS,
  OAUTH_PROVIDERS,
  APIKEY_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
  LOCAL_PROVIDERS,
  SEARCH_PROVIDERS,
  AUDIO_ONLY_PROVIDERS,
];

test("AI_PROVIDERS: Object.keys returns all provider IDs", () => {
  const keys = Object.keys(AI_PROVIDERS);
  assert.ok(keys.length > 200, `expected >200 keys, got ${keys.length}`);
  assert.ok(keys.includes("openai"));
  assert.ok(keys.includes("anthropic"));
  assert.ok(keys.includes("deepseek"));
  assert.ok(keys.includes("auto"));
});

test("AI_PROVIDERS: Object.entries returns [id, definition] pairs", () => {
  const entries = Object.entries(AI_PROVIDERS);
  assert.ok(entries.length > 200, `expected >200 entries, got ${entries.length}`);
  const openai = entries.find(([k]) => k === "openai");
  assert.ok(openai, "openai entry missing");
  assert.equal(openai[1].id, "openai");
  assert.equal(openai[1].name, "OpenAI");
});

test("AI_PROVIDERS: bracket access returns the provider", () => {
  const provider = AI_PROVIDERS["openai"];
  assert.ok(provider, "openai provider missing");
  assert.equal(provider.id, "openai");
  assert.equal(provider.name, "OpenAI");
});

test("AI_PROVIDERS: 'in' operator works", () => {
  assert.ok("openai" in AI_PROVIDERS);
  assert.ok("anthropic" in AI_PROVIDERS);
  assert.ok("auto" in AI_PROVIDERS);
  assert.ok(!("nonexistent_provider_xyz" in AI_PROVIDERS));
});

test("AI_PROVIDERS: spread works", () => {
  const spread = { ...AI_PROVIDERS };
  assert.ok(Object.keys(spread).length > 200);
  assert.ok(spread.openai);
  assert.equal(spread.openai.id, "openai");
});

test("ALIAS_TO_ID: maps aliases to IDs correctly", () => {
  assert.equal(ALIAS_TO_ID["cc"], "claude");
  assert.equal(ALIAS_TO_ID["ds"], "deepseek");
  assert.equal(ALIAS_TO_ID["cx"], "codex");
  assert.equal(ALIAS_TO_ID["gh"], "github");
});

test("ALIAS_TO_ID: 'in' operator and Object.keys work", () => {
  assert.ok("cc" in ALIAS_TO_ID);
  assert.ok(!("nonexistent_alias_xyz" in ALIAS_TO_ID));
  const keys = Object.keys(ALIAS_TO_ID);
  assert.ok(keys.length > 100);
});

test("ID_TO_ALIAS: maps IDs to aliases correctly", () => {
  assert.equal(ID_TO_ALIAS["claude"], "cc");
  assert.equal(ID_TO_ALIAS["deepseek"], "ds");
  assert.equal(ID_TO_ALIAS["codex"], "cx");
  assert.equal(ID_TO_ALIAS["github"], "gh");
});

test("ID_TO_ALIAS: every provider ID has an entry", () => {
  const keys = Object.keys(ID_TO_ALIAS);
  assert.ok(keys.length > 200);
  assert.ok(keys.includes("openai"));
  assert.ok(keys.includes("auto"));
});

test("getProviderById: returns correct provider for known ID", () => {
  const provider = getProviderById("openai");
  assert.ok(provider);
  assert.equal(provider.id, "openai");
  assert.equal(provider.name, "OpenAI");
});

test("getProviderById: returns undefined for unknown ID", () => {
  const provider = getProviderById("nonexistent_provider_xyz");
  assert.equal(provider, undefined);
});

test("getProviderByAlias: returns correct provider for known alias", () => {
  const provider = getProviderByAlias("cc");
  assert.ok(provider);
  assert.equal(provider.id, "claude");
  assert.equal(provider.name, "Claude Code");
});

test("getProviderByAlias: returns null for unknown alias", () => {
  const provider = getProviderByAlias("nonexistent_alias_xyz");
  assert.equal(provider, null);
});

test("getProviderByAlias: also matches by ID", () => {
  const provider = getProviderByAlias("openai");
  assert.ok(provider);
  assert.equal(provider.id, "openai");
});

test("IMAGE_PROVIDERS (sub-registry): Object.keys works", () => {
  const keys = Object.keys(IMAGE_PROVIDERS);
  assert.ok(keys.length > 0, "IMAGE_PROVIDERS has no keys");
  assert.ok(keys.includes("openai"));
  assert.ok(keys.includes("together"));
});

test("IMAGE_PROVIDERS (sub-registry): bracket access works", () => {
  const provider = IMAGE_PROVIDERS["openai"];
  assert.ok(provider);
  assert.equal(provider.id, "openai");
  assert.ok(Array.isArray(provider.models));
});

test("IMAGE_PROVIDERS (sub-registry): 'in' operator works", () => {
  assert.ok("openai" in IMAGE_PROVIDERS);
  assert.ok(!("nonexistent" in IMAGE_PROVIDERS));
});

test("IMAGE_PROVIDERS: getImageProviders returns the same data", () => {
  const fromFn = getImageProviders();
  const keysFn = Object.keys(fromFn).sort();
  const keysProxy = Object.keys(IMAGE_PROVIDERS).sort();
  assert.deepEqual(keysFn, keysProxy);
  assert.equal(fromFn["openai"].id, IMAGE_PROVIDERS["openai"].id);
});

test("provider count: total providers > 200 (all sections loaded)", () => {
  let total = 0;
  for (const section of ALL_SECTIONS) {
    total += Object.keys(section).length;
  }
  assert.ok(total > 200, `expected >200 total providers, got ${total}`);
  const proxyKeys = Object.keys(AI_PROVIDERS);
  assert.ok(proxyKeys.length >= total, "proxy should expose at least as many keys as manual count");
});

test("AI_PROVIDERS: lazy init means section changes reflect in proxy", () => {
  const keys1 = Object.keys(AI_PROVIDERS);
  const keys2 = Object.keys(AI_PROVIDERS);
  assert.deepEqual(keys1, keys2, "consecutive reads should be consistent");
});

test("AI_PROVIDERS: getOwnPropertyDescriptor works for enumeration", () => {
  const desc = Object.getOwnPropertyDescriptor(AI_PROVIDERS, "openai");
  assert.ok(desc);
  assert.equal(desc.enumerable, true);
  assert.equal(desc.configurable, true);
  assert.equal(desc.value.id, "openai");
});

test("ALIAS_TO_ID: round-trip alias → ID → alias for claude", () => {
  const id = ALIAS_TO_ID["cc"];
  assert.equal(id, "claude");
  const alias = ID_TO_ALIAS[id];
  assert.equal(alias, "cc");
});

test("AI_PROVIDERS: 'then' key returns undefined (thenable guard)", () => {
  assert.equal(AI_PROVIDERS["then"], undefined);
});
