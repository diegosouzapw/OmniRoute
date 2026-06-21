import { test } from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";

// Regression for #1926: Claude/OpenAI "thinking" fields leaked into the Antigravity
// (Google Cloud Code) request envelope, which Google rejects at the top level with
// `400 Bad input: Error: oneOf at '/' not met` (and, for named fields, `Unknown name
// "thinking"`). This broke every reasoning/thinking model served via Antigravity
// (e.g. `claude-opus-4-x-thinking`). The envelope spreads `...passthroughFields`
// (every top-level body field except a known few), so a top-level thinking field set
// by the unified thinking adapter leaked straight into the envelope Google validates.
//
// The #1944 fix only dropped `output_config`/`output_format`; the thinking family
// (`thinking`, `reasoning_effort`, `reasoning`, `enable_thinking`, `thinking_budget`)
// still passed through. This test guards that the whole family is stripped.

const THINKING_FIELDS = [
  "thinking",
  "reasoning_effort",
  "reasoning",
  "enable_thinking",
  "thinking_budget",
] as const;

test("transformRequest drops Claude/OpenAI thinking fields from the Antigravity envelope (#1926)", async () => {
  const executor = new AntigravityExecutor();
  const body = {
    thinking: { type: "enabled", budget_tokens: 4096 },
    reasoning_effort: "high",
    reasoning: { effort: "high" },
    enable_thinking: true,
    thinking_budget: 4096,
    request: {
      contents: [{ role: "user", parts: [{ text: "hi" }] }],
      generationConfig: {},
    },
  };

  const result = await executor.transformRequest("antigravity/claude-opus-4-8-thinking", body, true, {
    projectId: "project-1",
  });

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  const envelope = result as Record<string, unknown>;

  for (const field of THINKING_FIELDS) {
    assert.equal(
      envelope[field],
      undefined,
      `top-level "${field}" must not reach the Google Cloud Code envelope`
    );
  }
});
