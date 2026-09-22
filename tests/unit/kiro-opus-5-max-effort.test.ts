import assert from "node:assert/strict";
import test from "node:test";

import { buildKiroPayload } from "@omniroute/open-sse/translator/request/openai-to-kiro.ts";
import { appendClaudeEffortVariants } from "@omniroute/open-sse/utils/claudeEffortVariants.ts";
import {
  CANONICAL_EFFORT_VALUES,
  extendCodexGpt56EffortValues,
} from "@/shared/reasoning/effortStandardization.ts";

test("Kiro Opus 5 exposes a distinct max effort variant", () => {
  const effortTiers = extendCodexGpt56EffortValues(
    "kiro",
    "claude-opus-5",
    CANONICAL_EFFORT_VALUES
  );

  assert.deepEqual(effortTiers, ["none", "low", "medium", "high", "xhigh", "max"]);
});

test("Kiro Opus 5 exposes max through the Claude catalog path", () => {
  const models = appendClaudeEffortVariants([
    {
      id: "kr/claude-opus-5",
      owned_by: "kiro",
      root: "claude-opus-5",
    },
  ]);

  assert.ok(models.some((model) => model.id === "kr/claude-opus-5-max"));
});

test("Kiro Opus 5 forwards max as the provider-native adaptive effort", () => {
  const payload = buildKiroPayload(
    "claude-opus-5",
    {
      messages: [{ role: "user", content: "Solve a hard problem" }],
      reasoning_effort: "max",
      max_tokens: 64000,
    },
    false,
    null
  );

  assert.equal(payload.conversationState.currentMessage.userInputMessage.modelId, "claude-opus-5");
  assert.equal(payload.additionalModelRequestFields?.output_config?.effort, "max");
  assert.deepEqual(payload.additionalModelRequestFields?.thinking, {
    type: "adaptive",
    display: "summarized",
  });
});
