import test from "node:test";
import assert from "node:assert/strict";

const { opencodeProvider } = await import(
  "../../open-sse/config/providers/registry/opencode/index.ts"
);

function modelIds(): string[] {
  return (opencodeProvider.models ?? []).map((m) => m.id);
}

const DELISTED_FREE_MODELS = [
  "minimax-m3-free",
  "minimax-m2.5-free",
  "ling-2.6-1t-free",
  "trinity-large-preview-free",
  "nemotron-3-super-free",
  "qwen3.6-plus-free",
];

const LIVE_FREE_MODELS_MISSING_FROM_CATALOG = [
  "mimo-v2.5-free",
  "hy3-free",
  "nemotron-3-ultra-free",
  "north-mini-code-free",
];

test("issue #6998: oc registry does not advertise delisted free-tier models", () => {
  const ids = modelIds();
  for (const delisted of DELISTED_FREE_MODELS) {
    assert.ok(!ids.includes(delisted), `oc registry still advertises delisted upstream model "${delisted}"`);
  }
});

test("issue #6998: oc registry advertises the current live free-tier models", () => {
  const ids = modelIds();
  for (const live of LIVE_FREE_MODELS_MISSING_FROM_CATALOG) {
    assert.ok(ids.includes(live), `oc registry is missing live upstream free-tier model "${live}"`);
  }
});
