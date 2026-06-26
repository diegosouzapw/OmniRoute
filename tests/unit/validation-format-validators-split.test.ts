// Characterization of the validation.ts format-validators split (god-file decomposition): the nine
// wire-format validators moved into two co-located modules by family — validation/openaiFormat.ts
// (bedrock, openai-like, command-code, gemini-like, openai-compatible) and validation/anthropicFormat.ts
// (anthropic-like, claude-oauth-inline, anthropic-compatible, claude-code-compatible). Behavior-
// preserving move; the host keeps only the dispatcher + web-cookie validator. Locks: module surface
// and that the host re-exports the two historically-public validators (route handler + tests import
// them via this module). Runtime behavior stays covered by the provider-validation-* suites.
import { test } from "node:test";
import assert from "node:assert/strict";

const openai = await import("../../src/lib/providers/validation/openaiFormat.ts");
const anthropic = await import("../../src/lib/providers/validation/anthropicFormat.ts");
const HOST = await import("../../src/lib/providers/validation.ts");

test("openaiFormat exposes its five validators", () => {
  for (const name of [
    "validateBedrockProvider",
    "validateOpenAILikeProvider",
    "validateCommandCodeProvider",
    "validateGeminiLikeProvider",
    "validateOpenAICompatibleProvider",
  ]) {
    assert.equal(typeof (openai as Record<string, unknown>)[name], "function", `missing ${name}`);
  }
});

test("anthropicFormat exposes its four validators (incl. the internal claude-oauth-inline)", () => {
  for (const name of [
    "validateAnthropicLikeProvider",
    "validateClaudeOAuthInline",
    "validateAnthropicCompatibleProvider",
    "validateClaudeCodeCompatibleProvider",
  ]) {
    assert.equal(typeof (anthropic as Record<string, unknown>)[name], "function", `missing ${name}`);
  }
});

test("host re-exports the two historically-public validators + keeps the dispatcher", () => {
  assert.equal(typeof (HOST as Record<string, unknown>).validateProviderApiKey, "function");
  assert.equal(typeof (HOST as Record<string, unknown>).validateCommandCodeProvider, "function");
  assert.equal(typeof (HOST as Record<string, unknown>).validateClaudeCodeCompatibleProvider, "function");
  // and the web-cookie validator stays in the host
  assert.equal(typeof (HOST as Record<string, unknown>).validateWebCookieProvider, "function");
});
