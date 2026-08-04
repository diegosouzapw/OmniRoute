import { test } from "node:test";
import assert from "node:assert/strict";
import { claudeToGeminiRequest } from "../../open-sse/translator/request/claude-to-gemini.ts";
import { openaiToGeminiRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";

// Regression guard for #8231: the standard Gemini API surface (non-Antigravity)
// unconditionally injected HARM_CATEGORY_CIVIC_INTEGRITY into the default
// safetySettings, which upstream dynamic validation rejects for some
// models/endpoints with `safety_settings[4]: element predicate failed` — a hard
// 400 on every request through that model. #5003 already fixed this for the
// Antigravity/Cloud Code surface (open-sse/executors/antigravity.ts); this test
// pins the same behavior for claude-to-gemini.ts and openai-to-gemini.ts.

test("[repro #8231] claude-to-gemini default safetySettings must not force HARM_CATEGORY_CIVIC_INTEGRITY", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-pro",
    { messages: [{ role: "user", content: "hi" }] },
    false,
    null
  );
  const categories = (result.safetySettings as Array<{ category: string }>).map(
    (s) => s.category
  );
  assert.equal(
    categories.includes("HARM_CATEGORY_CIVIC_INTEGRITY"),
    false,
    `got ${JSON.stringify(categories)}`
  );
});

test("[repro #8231] openai-to-gemini default safetySettings must not force HARM_CATEGORY_CIVIC_INTEGRITY", () => {
  const result = openaiToGeminiRequest(
    "gemini-2.5-pro",
    { messages: [{ role: "user", content: "hi" }] },
    false,
    null
  );
  const categories = (result.safetySettings as Array<{ category: string }>).map(
    (s) => s.category
  );
  assert.equal(
    categories.includes("HARM_CATEGORY_CIVIC_INTEGRITY"),
    false,
    `got ${JSON.stringify(categories)}`
  );
});

test("[repro #8231] claude-to-gemini preserves caller-supplied safetySettings that explicitly request HARM_CATEGORY_CIVIC_INTEGRITY", () => {
  const explicit = [{ category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "BLOCK_NONE" }];
  const result = claudeToGeminiRequest(
    "gemini-2.5-pro",
    { messages: [{ role: "user", content: "hi" }], safetySettings: explicit },
    false,
    null
  );
  assert.deepEqual(result.safetySettings, explicit);
});

test("[repro #8231] openai-to-gemini preserves caller-supplied safetySettings that explicitly request HARM_CATEGORY_CIVIC_INTEGRITY", () => {
  const explicit = [{ category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "BLOCK_NONE" }];
  const result = openaiToGeminiRequest(
    "gemini-2.5-pro",
    { messages: [{ role: "user", content: "hi" }], safetySettings: explicit },
    false,
    null
  );
  assert.deepEqual(result.safetySettings, explicit);
});
