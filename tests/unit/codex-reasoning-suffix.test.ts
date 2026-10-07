import test from "node:test";
import assert from "node:assert/strict";

import {
  CODEX_MAX_ALIAS_MODELS,
  CODEX_ULTRA_ALIAS_MODELS,
  splitCodexReasoningSuffix,
} from "../../open-sse/executors/codex/reasoningSuffix.ts";

test("Codex Astra supports max and ultra aliases without widening other models", () => {
  assert.equal(CODEX_MAX_ALIAS_MODELS.has("gpt-6-astra"), true);
  assert.equal(CODEX_ULTRA_ALIAS_MODELS.has("gpt-6-astra"), true);
  assert.deepEqual(splitCodexReasoningSuffix("gpt-6-astra-max"), {
    baseModel: "gpt-6-astra",
    effort: "max",
  });
  assert.deepEqual(splitCodexReasoningSuffix("gpt-6-astra(ultra)"), {
    baseModel: "gpt-6-astra",
    effort: "ultra",
  });
  assert.deepEqual(splitCodexReasoningSuffix("gpt-6-other-max"), {
    baseModel: "gpt-6-other-max",
    effort: null,
  });
});
