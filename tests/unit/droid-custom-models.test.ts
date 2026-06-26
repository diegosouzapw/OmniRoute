import test from "node:test";
import assert from "node:assert/strict";

import {
  buildDroidCustomModels,
  isOmniRouteCustomModel,
  normalizeDroidModelList,
} from "../../src/shared/services/droidCustomModels.ts";

test("normalizeDroidModelList accepts legacy single `model` string", () => {
  assert.deepEqual(normalizeDroidModelList({ model: "openai/gpt-5" }), ["openai/gpt-5"]);
});

test("normalizeDroidModelList accepts `models` array (upstream #618)", () => {
  assert.deepEqual(
    normalizeDroidModelList({ models: ["openai/gpt-5", "anthropic/claude-4"] }),
    ["openai/gpt-5", "anthropic/claude-4"]
  );
});

test("normalizeDroidModelList prefers `models` over legacy `model`", () => {
  assert.deepEqual(
    normalizeDroidModelList({ model: "legacy/old", models: ["openai/gpt-5"] }),
    ["openai/gpt-5"]
  );
});

test("normalizeDroidModelList trims and dedupes, drops empty/non-string", () => {
  assert.deepEqual(
    normalizeDroidModelList({
      models: [" openai/gpt-5 ", "openai/gpt-5", "", "  ", 42, null, "anthropic/claude-4"],
    }),
    ["openai/gpt-5", "anthropic/claude-4"]
  );
});

test("normalizeDroidModelList returns [] on missing/invalid input", () => {
  assert.deepEqual(normalizeDroidModelList({}), []);
  assert.deepEqual(normalizeDroidModelList({ model: 7 as unknown }), []);
  assert.deepEqual(normalizeDroidModelList({ models: "not-an-array" as unknown }), []);
});

test("buildDroidCustomModels emits one entry per model with sequential ids", () => {
  const out = buildDroidCustomModels(["openai/gpt-5", "anthropic/claude-4"], {
    baseUrl: "http://localhost:20128/v1",
    apiKey: "sk_omniroute",
  });

  assert.equal(out.length, 2);
  assert.equal(out[0].id, "custom:OmniRoute-0");
  assert.equal(out[0].index, 0);
  assert.equal(out[0].model, "openai/gpt-5");
  assert.equal(out[0].displayName, "openai/gpt-5");
  assert.equal(out[0].provider, "openai");
  assert.equal(out[0].maxOutputTokens, 131072);
  assert.equal(out[0].noImageSupport, false);
  assert.equal(out[0].baseUrl, "http://localhost:20128/v1");
  assert.equal(out[0].apiKey, "sk_omniroute");
  assert.equal(out[1].id, "custom:OmniRoute-1");
  assert.equal(out[1].index, 1);
});

test("buildDroidCustomModels promotes activeModel to index 0", () => {
  const out = buildDroidCustomModels(["openai/gpt-5", "anthropic/claude-4", "google/gemini"], {
    baseUrl: "http://localhost:20128/v1",
    apiKey: "sk_omniroute",
    activeModel: "anthropic/claude-4",
  });

  assert.equal(out[0].model, "anthropic/claude-4");
  assert.equal(out[0].id, "custom:OmniRoute-0");
  assert.equal(out[0].index, 0);
  // Remaining entries are re-indexed in their original relative order
  assert.equal(out[1].model, "openai/gpt-5");
  assert.equal(out[1].id, "custom:OmniRoute-1");
  assert.equal(out[1].index, 1);
  assert.equal(out[2].model, "google/gemini");
  assert.equal(out[2].id, "custom:OmniRoute-2");
  assert.equal(out[2].index, 2);
});

test("buildDroidCustomModels keeps order when activeModel is not in the list", () => {
  const out = buildDroidCustomModels(["openai/gpt-5", "anthropic/claude-4"], {
    baseUrl: "http://localhost:20128/v1",
    apiKey: "sk_omniroute",
    activeModel: "unknown/model",
  });
  assert.equal(out[0].model, "openai/gpt-5");
  assert.equal(out[1].model, "anthropic/claude-4");
});

test("buildDroidCustomModels keeps order when activeModel === '' (no promotion)", () => {
  const out = buildDroidCustomModels(["openai/gpt-5", "anthropic/claude-4"], {
    baseUrl: "http://localhost:20128/v1",
    apiKey: "sk_omniroute",
    activeModel: "",
  });
  assert.equal(out[0].model, "openai/gpt-5");
  assert.equal(out[1].model, "anthropic/claude-4");
});

test("buildDroidCustomModels throws on empty list", () => {
  assert.throws(
    () =>
      buildDroidCustomModels([], {
        baseUrl: "http://localhost:20128/v1",
        apiKey: "sk_omniroute",
      }),
    /requires at least one model/
  );
});

test("isOmniRouteCustomModel matches any custom:OmniRoute-<i> id (multi-model)", () => {
  assert.equal(isOmniRouteCustomModel({ id: "custom:OmniRoute-0" }), true);
  assert.equal(isOmniRouteCustomModel({ id: "custom:OmniRoute-1" }), true);
  assert.equal(isOmniRouteCustomModel({ id: "custom:OmniRoute-42" }), true);
  assert.equal(isOmniRouteCustomModel({ id: "custom:Other-0" }), false);
  assert.equal(isOmniRouteCustomModel({ id: 42 as unknown }), false);
  assert.equal(isOmniRouteCustomModel(null), false);
  assert.equal(isOmniRouteCustomModel(undefined), false);
  assert.equal(isOmniRouteCustomModel({}), false);
});
