// Regression tests: the OpenAI→Gemini translator must honor an explicit
// Gemini 3.x `thinkingLevel` and must NOT emit the deprecated numeric
// `thinkingBudget` alongside it. Covers all supply surfaces (nested
// generationConfig.thinkingConfig, top-level thinkingLevel, snake_case
// spellings) and the no-level baseline behavior.

import { test } from "node:test";
import assert from "node:assert/strict";

const { openaiToGeminiRequest } = await import(
  "../../open-sse/translator/request/openai-to-gemini.ts"
);

type GeminiReq = {
  generationConfig?: {
    thinkingConfig?: {
      thinkingBudget?: number;
      includeThoughts?: boolean;
      thinkingLevel?: string;
    };
  };
};

const base = (extra: Record<string, unknown>) => ({
  model: "gemini-3.7-flash",
  messages: [{ role: "user", content: "hi" }],
  ...extra,
});

test("thinkingLevel supplied via generationConfig.thinkingConfig is forwarded, no thinkingBudget", () => {
  const body = base({
    generationConfig: {
      thinkingConfig: { thinkingLevel: "high" },
      maxOutputTokens: 16384,
    },
  });
  const r = openaiToGeminiRequest("gemini-3.7-flash", body, true) as GeminiReq;
  assert.equal(r.generationConfig?.thinkingConfig?.thinkingLevel, "high");
  assert.equal("thinkingBudget" in (r.generationConfig?.thinkingConfig ?? {}), false);
});

test("no thinkingLevel: default thinkingBudget injection is unchanged (regression guard)", () => {
  const r = openaiToGeminiRequest("gemini-3.7-flash", base({}), false) as GeminiReq;
  assert.equal(r.generationConfig?.thinkingConfig?.includeThoughts, true);
  assert.ok((r.generationConfig?.thinkingConfig?.thinkingBudget ?? 0) > 0);
  assert.equal("thinkingLevel" in (r.generationConfig?.thinkingConfig ?? {}), false);
});

test("reasoning_effort high still maps to a numeric budget when no explicit level is set", () => {
  const r = openaiToGeminiRequest(
    "gemini-3.7-flash",
    base({ reasoning_effort: "high" }),
    false
  ) as GeminiReq;
  assert.ok((r.generationConfig?.thinkingConfig?.thinkingBudget ?? 0) > 0);
  assert.equal("thinkingLevel" in (r.generationConfig?.thinkingConfig ?? {}), false);
});
