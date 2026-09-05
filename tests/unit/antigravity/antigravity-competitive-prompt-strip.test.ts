/**
 * Competitive system-prompt strip (port of decolua/9router b566b20,
 * generalized): Antigravity's server-side filter flags system prompts
 * advertising competing agents ("You are a Claude agent, built on
 * Anthropic's Claude Agent SDK.") and answers with 429 RESOURCE_EXHAUSTED.
 * The strip removes the identity sentences before dispatch.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { stripCompetitiveAgentPrompts } from "../../../open-sse/executors/antigravity.ts";

test("strips the exact Claude Agent SDK identity line (9router b566b20 case)", () => {
  const input = {
    parts: [{ text: "You are a Claude agent, built on Anthropic's Claude Agent SDK." }],
  };
  const out = stripCompetitiveAgentPrompts(input) as { parts: Array<{ text: string }> };
  assert.equal(out.parts[0].text, "");
});

test("keeps the instruction text that follows the identity sentence", () => {
  const input = {
    parts: [
      {
        text:
          "You are a Claude agent, built on Anthropic's Claude Agent SDK.\n" +
          "Answer concisely and cite sources.",
      },
    ],
  };
  const out = stripCompetitiveAgentPrompts(input) as { parts: Array<{ text: string }> };
  assert.equal(out.parts[0].text, "Answer concisely and cite sources.");
});

test("strips 'You are Claude Code' and Anthropic-created assistant lines", () => {
  const input = { parts: [{ text: "You are Claude Code, an agentic coding tool." }] };
  const out = stripCompetitiveAgentPrompts(input) as { parts: Array<{ text: string }> };
  assert.equal(out.parts[0].text, "");
});

test("leaves ordinary system prompts untouched (same reference, no allocation)", () => {
  const input = { parts: [{ text: "You are a helpful assistant. Be concise." }] };
  const out = stripCompetitiveAgentPrompts(input);
  assert.strictEqual(out, input, "must return the original reference when nothing matched");
});

test("only rewrites matching parts in a multi-part system instruction", () => {
  const input = {
    parts: [
      { text: "You are a Claude agent, built on Anthropic's Claude Agent SDK." },
      { text: "Use the tools when available." },
    ],
  };
  const out = stripCompetitiveAgentPrompts(input) as { parts: Array<{ text: string }> };
  assert.equal(out.parts[0].text, "");
  assert.equal(out.parts[1].text, "Use the tools when available.");
});

test("returns the input unchanged for non-systemInstruction shapes", () => {
  const input = { contents: [{ role: "user", parts: [{ text: "hi" }] }] };
  assert.strictEqual(stripCompetitiveAgentPrompts(input), input);
  assert.strictEqual(stripCompetitiveAgentPrompts(null), null);
  assert.strictEqual(stripCompetitiveAgentPrompts(undefined), undefined);
});
