// Split-guard for the provider-models discovery route decomposition
// (refactor: extract 4 pure leaves — helpers / normalizers / providerModelsConfig /
// providerSets — out of src/app/api/providers/[id]/models/route.ts). The leaves are
// DB-free and state-free; this guard pins their public surface and the host wiring
// so a future edit that silently breaks the split fails.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  asRecord,
  toNonEmptyString,
  buildOptionalBearerHeaders,
  buildNamedOpenAiStyleHeaders,
  isLocalOpenAIStyleProvider,
  mergeLocalCatalogModels,
  getAzureOpenAIApiVersion,
} from "../../src/app/api/providers/[id]/models/discovery/helpers.ts";
import { normalizeOpenAiLikeModelsResponse } from "../../src/app/api/providers/[id]/models/discovery/normalizers.ts";
import {
  NAMED_OPENAI_STYLE_PROVIDERS,
  isNamedOpenAIStyleProvider,
} from "../../src/app/api/providers/[id]/models/discovery/providerSets.ts";
import { PROVIDER_MODELS_CONFIG } from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";

// ── helpers leaf ─────────────────────────────────────────────────────────────

test("helpers.asRecord returns plain objects untouched, non-objects as {}", () => {
  assert.deepEqual(asRecord({ a: 1 }), { a: 1 });
  assert.deepEqual(asRecord([1, 2]), {});
  assert.deepEqual(asRecord(null), {});
  assert.deepEqual(asRecord("x"), {});
});

test("helpers.toNonEmptyString trims and rejects blanks/non-strings", () => {
  assert.equal(toNonEmptyString("  hi  "), "hi");
  assert.equal(toNonEmptyString("   "), null);
  assert.equal(toNonEmptyString(7), null);
});

test("helpers.buildOptionalBearerHeaders only adds Authorization when a token is present", () => {
  assert.deepEqual(buildOptionalBearerHeaders("tok"), {
    "Content-Type": "application/json",
    Authorization: "Bearer tok",
  });
  assert.deepEqual(buildOptionalBearerHeaders(null), { "Content-Type": "application/json" });
});

test("helpers.buildNamedOpenAiStyleHeaders adds the reka X-Api-Key only for reka", () => {
  assert.equal(buildNamedOpenAiStyleHeaders("reka", "tok")["X-Api-Key"], "tok");
  assert.equal(buildNamedOpenAiStyleHeaders("openai", "tok")["X-Api-Key"], undefined);
});

test("helpers.mergeLocalCatalogModels dedupes by id, registry wins", () => {
  const merged = mergeLocalCatalogModels(
    [{ id: "a", name: "A" }],
    [
      { id: "a", name: "dup" },
      { id: "b", name: "B" },
    ]
  );
  assert.deepEqual(
    merged.map((m) => m.id),
    ["a", "b"]
  );
  assert.equal(merged.find((m) => m.id === "a")?.name, "A");
});

test("helpers.getAzureOpenAIApiVersion falls back to the pinned default", () => {
  assert.equal(getAzureOpenAIApiVersion({}), "2024-12-01-preview");
  assert.equal(getAzureOpenAIApiVersion({ apiVersion: "2025-01-01" }), "2025-01-01");
});

test("helpers.isLocalOpenAIStyleProvider is false for a hosted provider", () => {
  assert.equal(isLocalOpenAIStyleProvider("openai"), false);
});

// ── normalizers leaf ─────────────────────────────────────────────────────────

test("normalizers.normalizeOpenAiLikeModelsResponse maps ids and applies the fallback owner", () => {
  const out = normalizeOpenAiLikeModelsResponse(
    { data: [{ id: "m1" }, { id: "m2", display_name: "M2", owned_by: "x" }] },
    "acme"
  );
  assert.deepEqual(out, [
    { id: "m1", name: "m1", owned_by: "acme" },
    { id: "m2", name: "M2", owned_by: "x" },
  ]);
});

test("normalizers.normalizeOpenAiLikeModelsResponse drops entries without an id", () => {
  const out = normalizeOpenAiLikeModelsResponse({ data: [{}, { id: "ok" }] }, "acme");
  assert.deepEqual(
    out.map((m) => m.id),
    ["ok"]
  );
});

// ── providerSets leaf ────────────────────────────────────────────────────────

test("providerSets.NAMED_OPENAI_STYLE_PROVIDERS is a populated Set with known members", () => {
  assert.ok(NAMED_OPENAI_STYLE_PROVIDERS instanceof Set);
  assert.ok(NAMED_OPENAI_STYLE_PROVIDERS.size >= 30);
  for (const p of ["zenmux", "api-airforce", "together", "reka"]) {
    assert.ok(NAMED_OPENAI_STYLE_PROVIDERS.has(p), `${p} must be a named OpenAI-style provider`);
  }
});

test("providerSets.isNamedOpenAIStyleProvider matches Set membership", () => {
  assert.equal(isNamedOpenAIStyleProvider("zenmux"), true);
  assert.equal(isNamedOpenAIStyleProvider("definitely-not-a-provider"), false);
});

// ── providerModelsConfig leaf ────────────────────────────────────────────────

test("providerModelsConfig.PROVIDER_MODELS_CONFIG keeps core provider entries", () => {
  assert.equal(PROVIDER_MODELS_CONFIG.claude.url, "https://api.anthropic.com/v1/models");
  assert.equal(PROVIDER_MODELS_CONFIG["qwen-web"].url, "https://chat.qwen.ai/api/v2/models");
});

test("providerModelsConfig keeps the aimlapi live catalog entry", () => {
  assert.equal(PROVIDER_MODELS_CONFIG.aimlapi.url, "https://api.aimlapi.com/models");
});

test("providerModelsConfig aimlapi.parseResponse keeps only chat-completion models when present", () => {
  const parsed = PROVIDER_MODELS_CONFIG.aimlapi.parseResponse([
    { id: "chat-1", type: "chat-completion", info: { name: "Chat 1" } },
    { id: "img-1", type: "image" },
  ]);
  assert.deepEqual(parsed, [{ id: "chat-1", name: "Chat 1" }]);
});

// ── host wiring guard ────────────────────────────────────────────────────────

test("route.ts imports the discovery leaves and no longer declares the moved consts", () => {
  const route = fs.readFileSync(
    path.join("src", "app", "api", "providers", "[id]", "models", "route.ts"),
    "utf-8"
  );
  for (const leaf of ["helpers", "normalizers", "providerSets", "providerModelsConfig"]) {
    assert.match(
      route,
      new RegExp(`from "\\./discovery/${leaf}"`),
      `route must import ./discovery/${leaf}`
    );
  }
  assert.doesNotMatch(
    route,
    /const PROVIDER_MODELS_CONFIG\s*:/,
    "PROVIDER_MODELS_CONFIG must live in the leaf, not route.ts"
  );
  assert.doesNotMatch(
    route,
    /const NAMED_OPENAI_STYLE_PROVIDERS\s*=/,
    "NAMED_OPENAI_STYLE_PROVIDERS must live in the leaf, not route.ts"
  );
});
