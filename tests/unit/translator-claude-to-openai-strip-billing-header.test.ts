/**
 * Port of decolua/9router commit 0aaa5ab3:
 * The Anthropic upstream injects a dynamic `x-anthropic-billing-header: ...`
 * line at the top of the Claude system prompt for some routes. When we
 * translate Claude → OpenAI and forward to an OpenAI-compatible upstream,
 * that line ends up as part of the assistant's system message — which
 * (a) confuses non-Anthropic models and (b) keeps changing across requests
 * and so destroys prompt-cache hits.
 *
 * Strip a leading `x-anthropic-billing-header: <value>` line from each
 * system entry before assembling the OpenAI request.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIRequest } = await import(
  "../../open-sse/translator/request/claude-to-openai.ts"
);

test("Claude -> OpenAI strips x-anthropic-billing-header from array system entries", () => {
  const result = claudeToOpenAIRequest(
    "gpt-4o",
    {
      system: [
        { text: "x-anthropic-billing-header: abc123\nReal system rule A" },
        { text: "Real system rule B" },
      ],
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
    },
    true
  ) as { messages: Array<{ role: string; content: string }> };

  const sys = result.messages.find((m) => m.role === "system");
  assert.ok(sys, "system message present");
  assert.equal(
    sys!.content.includes("x-anthropic-billing-header"),
    false,
    "billing header line must be stripped"
  );
  assert.equal(
    sys!.content.includes("Real system rule A"),
    true,
    "real rule must survive"
  );
  assert.equal(
    sys!.content.includes("Real system rule B"),
    true,
    "second block must survive"
  );
});

test("Claude -> OpenAI strips x-anthropic-billing-header from a string system field", () => {
  const result = claudeToOpenAIRequest(
    "gpt-4o",
    {
      system: "x-anthropic-billing-header: zzz\nFollow these rules.",
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
    },
    true
  ) as { messages: Array<{ role: string; content: string }> };

  const sys = result.messages.find((m) => m.role === "system");
  assert.ok(sys, "system message present");
  assert.equal(sys!.content, "Follow these rules.");
});

test("Claude -> OpenAI leaves unrelated system content intact (no false positives)", () => {
  const result = claudeToOpenAIRequest(
    "gpt-4o",
    {
      system: "Normal system prompt with no billing header.",
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
    },
    true
  ) as { messages: Array<{ role: string; content: string }> };

  const sys = result.messages.find((m) => m.role === "system");
  assert.equal(sys!.content, "Normal system prompt with no billing header.");
});
