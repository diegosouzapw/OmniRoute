import test from "node:test";
import assert from "node:assert/strict";

import { getModelInfoCore } from "../../open-sse/services/model.ts";

// These tests cover the early-return path added in this PR (open-sse/services/model.ts):
// when a local alias map provides a slashful string target (e.g. "openai/gpt-4o"),
// the alias target is parsed directly as <provider>/<model> and returned
// immediately, before shouldTreatAsExactModelId() / cross-proxy inference can
// misclassify the target.

test("local alias with slashful string target returns provider/model directly", async () => {
  const result = await getModelInfoCore("my-alias", {
    "my-alias": "openai/gpt-4o",
  });
  assert.deepEqual(result, {
    provider: "openai",
    model: "gpt-4o",
    extendedContext: false,
  });
});

test("local alias early-return preserves extendedContext from [1m] suffix on input", async () => {
  const result = await getModelInfoCore("my-alias[1m]", {
    "my-alias": "openai/gpt-4o",
  });
  assert.deepEqual(result, {
    provider: "openai",
    model: "gpt-4o",
    extendedContext: true,
  });
});

test("local alias early-return preserves the slashful target's model part verbatim (no cross-proxy normalization)", async () => {
  // The early-return is intentionally narrower than the object-target path:
  // it only applies provider-scoped alias resolution, not the global
  // cross-proxy normalization (CROSS_PROXY_MODEL_ALIASES). This mirrors the
  // PR's intent — "user-provided 2nd arg wins, parsed directly" — and avoids
  // double-resolving aliases the user already pinned to a canonical pair.
  const result = await getModelInfoCore("sf-qwen", {
    "sf-qwen": "siliconflow/qwen3-coder:480b",
  });
  assert.deepEqual(result, {
    provider: "siliconflow",
    model: "qwen3-coder:480b",
    extendedContext: false,
  });
});

test("local alias with non-slashful string target falls through to standard alias resolution", async () => {
  // No "/" in the target → early-return guard doesn't fire; existing
  // resolveModelAliasTarget path handles it. We assert that the legacy path
  // still works and isn't shadowed by the new shortcut.
  const result = await getModelInfoCore("legacy-alias", {
    "legacy-alias": "gpt-oss:120b",
  });
  // The legacy path resolves through cross-proxy / provider inference;
  // we only assert that the early-return did NOT trip (model is normalized,
  // not returned verbatim with provider=null,model="gpt-oss:120b").
  assert.notEqual(result.model, "gpt-oss:120b");
});

test("local alias with object target (not string) falls through to standard resolution", async () => {
  // The early-return guard checks `typeof aliases[parsed.model] === "string"`.
  // Object targets must keep going through resolveModelAliasTarget.
  const result = await getModelInfoCore("sf-qwen-obj", {
    "sf-qwen-obj": { provider: "siliconflow", model: "qwen3-coder:480b" },
  });
  assert.deepEqual(result, {
    provider: "siliconflow",
    model: "Qwen/Qwen3-Coder-480B-A35B-Instruct",
    extendedContext: false,
  });
});
