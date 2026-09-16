/**
 * Gemini 3.8 Flash talks thinking_level (low|medium|high), not the 3.7 numeric
 * thinkingBudget Omni still emits. includeThoughts:true also shares
 * maxOutputTokens with hidden thoughts, so a review-sized max_tokens=65536
 * request starves visible completion (finish=length, ~2.6k text).
 *
 * Tests hit openaiToGeminiRequest / openaiToAntigravityRequest / claudeToGeminiRequest
 * at the write sites so a helper cannot stay green with the call gone.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToGeminiRequest, openaiToAntigravityRequest } = await import(
  "../../open-sse/translator/request/openai-to-gemini.ts"
);
const { claudeToGeminiRequest } = await import(
  "../../open-sse/translator/request/claude-to-gemini.ts"
);
const { gemini38ThinkingLevelFromBudget } = await import(
  "../../open-sse/services/thinkingBudget.ts"
);

type ThinkingConfig = {
  thinkingBudget?: number;
  thinkingLevel?: string;
  includeThoughts?: boolean;
};

type GeminiReq = {
  generationConfig?: {
    maxOutputTokens?: number;
    thinkingConfig?: ThinkingConfig;
  };
};

type EnvelopeReq = {
  request?: {
    generationConfig?: {
      maxOutputTokens?: number;
      thinkingConfig?: ThinkingConfig;
    };
  };
};

const reviewBody = (extra: Record<string, unknown> = {}) => ({
  messages: [{ role: "user", content: "review diff" }],
  max_tokens: 65536,
  ...extra,
});

function thinkingConfigOf(model: string, extra: Record<string, unknown> = {}) {
  const result = openaiToGeminiRequest(model, reviewBody(extra), false) as GeminiReq;
  return result.generationConfig?.thinkingConfig;
}

test("gemini-3.8-flash-high emits thinkingLevel high, not numeric thinkingBudget", () => {
  const tc = thinkingConfigOf("gemini-3.8-flash-high", { reasoning_effort: "high" });
  assert.equal(tc?.thinkingLevel, "high");
  assert.equal(tc?.thinkingBudget, undefined);
});

test("gemini-3.8-flash-medium emits thinkingLevel medium", () => {
  const tc = thinkingConfigOf("gemini-3.8-flash-medium", { reasoning_effort: "medium" });
  assert.equal(tc?.thinkingLevel, "medium");
  assert.equal(tc?.thinkingBudget, undefined);
});

test("gemini-3.8-flash-low emits thinkingLevel low", () => {
  const tc = thinkingConfigOf("gemini-3.8-flash-low", { reasoning_effort: "low" });
  assert.equal(tc?.thinkingLevel, "low");
  assert.equal(tc?.thinkingBudget, undefined);
});

test("gemini-3.8-flash bare default maps thinkingLevel medium", () => {
  const tc = thinkingConfigOf("gemini-3.8-flash");
  assert.equal(tc?.thinkingLevel, "medium");
  assert.equal(tc?.thinkingBudget, undefined);
});

test("gemini-3.8-flash-tiered default maps thinkingLevel medium", () => {
  const tc = thinkingConfigOf("gemini-3.8-flash-tiered");
  assert.equal(tc?.thinkingLevel, "medium");
  assert.equal(tc?.thinkingBudget, undefined);
});

test("agy/gemini-3.8-flash-high prefix emits thinkingLevel high", () => {
  const tc = thinkingConfigOf("agy/gemini-3.8-flash-high", { reasoning_effort: "high" });
  assert.equal(tc?.thinkingLevel, "high");
  assert.equal(tc?.thinkingBudget, undefined);
});

test("gemini-3.8 review-shaped request does not default-inject includeThoughts", () => {
  const result = openaiToGeminiRequest(
    "gemini-3.8-flash-high",
    reviewBody(),
    false
  ) as GeminiReq;
  assert.equal(result.generationConfig?.maxOutputTokens, 65536);
  assert.equal(result.generationConfig?.thinkingConfig?.thinkingLevel, "high");
  assert.equal(result.generationConfig?.thinkingConfig?.includeThoughts, undefined);
});

test("gemini-3.8 includeThoughts is set only when the client asked for thoughts", () => {
  const silent = thinkingConfigOf("gemini-3.8-flash-high", { reasoning_effort: "high" });
  assert.equal(silent?.includeThoughts, undefined);

  const asked = thinkingConfigOf("gemini-3.8-flash-high", {
    reasoning_effort: "high",
    includeThoughts: true,
  });
  assert.equal(asked?.includeThoughts, true);
  assert.equal(asked?.thinkingLevel, "high");
});

test("gemini-3.8 reasoning_effort none stays an explicit off-switch", () => {
  const tc = thinkingConfigOf("gemini-3.8-flash-high", { reasoning_effort: "none" });
  assert.equal(tc?.thinkingBudget, 0);
  assert.equal(tc?.includeThoughts, false);
  assert.equal(tc?.thinkingLevel, undefined);
});

test("gemini-2.5-flash still emits numeric thinkingBudget (3.8 gate)", () => {
  const result = openaiToGeminiRequest(
    "gemini-2.5-flash",
    reviewBody({ reasoning_effort: "high" }),
    false
  ) as GeminiReq;
  assert.equal(result.generationConfig?.thinkingConfig?.thinkingBudget, 24576);
  assert.equal(result.generationConfig?.thinkingConfig?.includeThoughts, true);
  assert.equal(result.generationConfig?.thinkingConfig?.thinkingLevel, undefined);
});

test("Antigravity envelope keeps maxOutputTokens 65536 and thinkingLevel for 3.8", () => {
  const result = openaiToAntigravityRequest(
    "gemini-3.8-flash-high",
    reviewBody({ reasoning_effort: "high" }),
    false,
    { projectId: "proj-gemini38" }
  ) as EnvelopeReq;
  const gc = result.request?.generationConfig;
  assert.equal(gc?.maxOutputTokens, 65536);
  assert.equal(gc?.thinkingConfig?.thinkingLevel, "high");
  assert.equal(gc?.thinkingConfig?.thinkingBudget, undefined);
  assert.equal(gc?.thinkingConfig?.includeThoughts, undefined);
});

test("gemini-3.8 thinking.budget_tokens maps thinkingLevel, not thinkingBudget", () => {
  const tc = thinkingConfigOf("gemini-3.8-flash-high", {
    thinking: { type: "enabled", budget_tokens: 24576 },
  });
  assert.equal(tc?.thinkingLevel, "high");
  assert.equal(tc?.thinkingBudget, undefined);
  assert.equal(tc?.includeThoughts, undefined);
});

test("claude-to-gemini gemini-3.8 budget_tokens maps thinkingLevel", () => {
  const result = claudeToGeminiRequest(
    "gemini-3.8-flash-high",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "review diff" }] }],
      max_tokens: 65536,
      thinking: { type: "enabled", budget_tokens: 24576 },
    },
    false
  ) as GeminiReq;
  assert.equal(result.generationConfig?.thinkingConfig?.thinkingLevel, "high");
  assert.equal(result.generationConfig?.thinkingConfig?.thinkingBudget, undefined);
  assert.equal(result.generationConfig?.thinkingConfig?.includeThoughts, undefined);
});

test("claude-to-gemini gemini-3.8-flash-high emits thinkingLevel, not includeThoughts", () => {
  const result = claudeToGeminiRequest(
    "gemini-3.8-flash-high",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "review diff" }] }],
      max_tokens: 65536,
      output_config: { effort: "high" },
    },
    false
  ) as GeminiReq;
  assert.equal(result.generationConfig?.maxOutputTokens, 65536);
  assert.equal(result.generationConfig?.thinkingConfig?.thinkingLevel, "high");
  assert.equal(result.generationConfig?.thinkingConfig?.thinkingBudget, undefined);
  assert.equal(result.generationConfig?.thinkingConfig?.includeThoughts, undefined);
});

test("gemini38ThinkingLevelFromBudget rejects budget <= 0", () => {
  assert.throws(
    () => gemini38ThinkingLevelFromBudget("gemini-3.8-flash-high", 0),
    RangeError
  );
  assert.throws(
    () => gemini38ThinkingLevelFromBudget("gemini-3.8-flash-high", -1),
    RangeError
  );
});

test("gemini38ThinkingLevelFromBudget maps 1 and 1024 to low", () => {
  assert.equal(
    gemini38ThinkingLevelFromBudget("gemini-3.8-flash-high", 1),
    "low"
  );
  assert.equal(
    gemini38ThinkingLevelFromBudget("gemini-3.8-flash-high", 1024),
    "low"
  );
});

test("gemini38ThinkingLevelFromBudget maps 1025 through medium cap to medium", () => {
  assert.equal(
    gemini38ThinkingLevelFromBudget("gemini-3.8-flash-medium", 1025),
    "medium"
  );
  assert.equal(
    gemini38ThinkingLevelFromBudget("gemini-3.8-flash-medium", 8192),
    "medium"
  );
});

test("gemini38ThinkingLevelFromBudget maps above medium cap to high", () => {
  assert.equal(
    gemini38ThinkingLevelFromBudget("gemini-3.8-flash-medium", 8193),
    "high"
  );
  assert.equal(
    gemini38ThinkingLevelFromBudget("gemini-3.8-flash-high", 24576),
    "high"
  );
});
