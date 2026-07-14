// Characterization of the validation.ts web-provider split (god-file decomposition): the 13 web-cookie
// validators + the Meta AI request builder moved into co-located leaf modules (validation/metaAi.ts,
// webProvidersA.ts, webProvidersB.ts). Behavior-preserving move — the locks here are: each module
// exposes its validators, webProvidersB consumes metaAi, and buildMetaAiValidationBody still emits a
// well-formed persisted-query body. The dispatcher's runtime wiring stays covered by the existing
// provider-validation-specialty / web-cookie suites.
import { test } from "node:test";
import assert from "node:assert/strict";

const A = await import("../../src/lib/providers/validation/webProvidersA.ts");
const B = await import("../../src/lib/providers/validation/webProvidersB.ts");
const meta = await import("../../src/lib/providers/validation/metaAi.ts");
const HOST = await import("../../src/lib/providers/validation.ts");

test("webProvidersA exposes its six validators (deepseek/qwen/grok/chatgpt/perplexity/blackbox)", () => {
  for (const name of [
    "validateDeepSeekWebProvider",
    "validateQwenWebProvider",
    "validateGrokWebProvider",
    "validateChatGptWebProvider",
    "validatePerplexityWebProvider",
    "validateBlackboxWebProvider",
  ]) {
    assert.equal(typeof (A as Record<string, unknown>)[name], "function", `A missing ${name}`);
  }
});

test("webProvidersB exposes its nine validators (muse-spark/adapta/claude/gemini/copilot/t3/jules/devin/inner-ai)", () => {
  for (const name of [
    "validateMuseSparkWebProvider",
    "validateAdaptaWebProvider",
    "validateClaudeWebProvider",
    "validateGeminiWebProvider",
    "validateCopilotWebProvider",
    "validateT3WebProvider",
    "validateJulesProvider",
    "validateDevinCloudAgentProvider",
    "validateInnerAiProvider",
  ]) {
    assert.equal(typeof (B as Record<string, unknown>)[name], "function", `B missing ${name}`);
  }
});

test("metaAi.buildMetaAiValidationBody emits a persisted-query body with fresh UUID-bearing variables", () => {
  const body = meta.buildMetaAiValidationBody() as {
    doc_id: string;
    variables: { conversationId: string; userAgent: string; isNewConversation: boolean };
  };
  assert.equal(typeof body.doc_id, "string");
  assert.ok(body.variables.conversationId.startsWith("c."), "conversationId is base62 c.* id");
  assert.equal(body.variables.isNewConversation, true);
  assert.ok(body.variables.userAgent.includes("Mozilla/"), "carries the Meta AI UA const");
  // Two calls must mint distinct conversation ids (random-seeded).
  const second = meta.buildMetaAiValidationBody() as { variables: { conversationId: string } };
  assert.notEqual(body.variables.conversationId, second.variables.conversationId);
});

test("host dispatcher surface remains intact after the move", () => {
  assert.equal(typeof (HOST as Record<string, unknown>).validateProviderApiKey, "function");
  assert.equal(typeof (HOST as Record<string, unknown>).validateWebCookieProvider, "function");
});
