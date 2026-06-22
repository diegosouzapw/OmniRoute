import test from "node:test";
import assert from "node:assert/strict";

// Port of decolua/9router#517: per-request opt-in via the
// `x-omniroute-strip-reasoning` header to unconditionally strip
// `reasoning_content` from non-streaming JSON responses. Some clients
// (Firecrawl AI SDK) have JSON parsers that break on this non-standard
// extension even when there is no visible content, so the default
// "keep reasoning-only messages" behavior is not sufficient.
const { isStripReasoningRequested, getHeaderValueCaseInsensitive } = await import(
  "../../open-sse/handlers/chatCore/headers.ts"
);
const { sanitizeOpenAIResponse } = await import(
  "../../open-sse/handlers/responseSanitizer.ts"
);

test("isStripReasoningRequested is true for truthy header values", () => {
  for (const v of ["true", "1", "yes", "TRUE", "Yes", " true "]) {
    assert.equal(
      isStripReasoningRequested({ "x-omniroute-strip-reasoning": v }),
      true,
      `expected true for ${JSON.stringify(v)}`
    );
  }
});

test("isStripReasoningRequested is case-insensitive on the header NAME", () => {
  assert.equal(isStripReasoningRequested({ "X-OmniRoute-Strip-Reasoning": "true" }), true);
});

test("isStripReasoningRequested works with a Headers instance", () => {
  const h = new Headers();
  h.set("x-omniroute-strip-reasoning", "1");
  assert.equal(isStripReasoningRequested(h), true);
});

test("isStripReasoningRequested is false when absent / empty / falsy", () => {
  assert.equal(isStripReasoningRequested(null), false);
  assert.equal(isStripReasoningRequested(undefined), false);
  assert.equal(isStripReasoningRequested({}), false);
  assert.equal(isStripReasoningRequested({ "x-omniroute-strip-reasoning": "" }), false);
  assert.equal(isStripReasoningRequested({ "x-omniroute-strip-reasoning": "false" }), false);
  assert.equal(isStripReasoningRequested({ "x-omniroute-strip-reasoning": "0" }), false);
  assert.equal(isStripReasoningRequested({ "x-omniroute-strip-reasoning": "no" }), false);
});

test("getHeaderValueCaseInsensitive still resolves the header (sanity)", () => {
  assert.equal(
    getHeaderValueCaseInsensitive(
      { "x-omniroute-strip-reasoning": "true" },
      "x-omniroute-strip-reasoning"
    ),
    "true"
  );
});

// Default behavior (regression guard): reasoning-only messages keep
// reasoning_content. This matches existing logic — non-streaming responses
// only drop reasoning_content when there is ALSO visible content.
test("default: reasoning-only message keeps reasoning_content", () => {
  const out = sanitizeOpenAIResponse({
    id: "chatcmpl-x",
    object: "chat.completion",
    created: 1,
    model: "deepseek-reasoner",
    choices: [
      {
        index: 0,
        message: { role: "assistant", content: "", reasoning_content: "internal thoughts" },
        finish_reason: "stop",
      },
    ],
  }) as { choices: Array<{ message: { reasoning_content?: string } }> };
  assert.equal(out.choices[0].message.reasoning_content, "internal thoughts");
});

// Opt-in port of PR#517: when stripReasoning=true, reasoning_content is
// always removed from the final non-streaming JSON, even on reasoning-only
// messages. Firecrawl AI SDK and similar JSON parsers cannot tolerate it.
test("stripReasoning=true: reasoning-only message has reasoning_content removed", () => {
  const out = sanitizeOpenAIResponse(
    {
      id: "chatcmpl-x",
      object: "chat.completion",
      created: 1,
      model: "deepseek-reasoner",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "", reasoning_content: "internal thoughts" },
          finish_reason: "stop",
        },
      ],
    },
    { stripReasoning: true }
  ) as { choices: Array<{ message: Record<string, unknown> }> };
  assert.equal(out.choices[0].message.reasoning_content, undefined);
  assert.equal("reasoning_content" in out.choices[0].message, false);
});

test("stripReasoning=true: message with both content and reasoning_content has reasoning stripped", () => {
  const out = sanitizeOpenAIResponse(
    {
      id: "chatcmpl-x",
      object: "chat.completion",
      created: 1,
      model: "deepseek-v4",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "visible answer",
            reasoning_content: "internal",
          },
          finish_reason: "stop",
        },
      ],
    },
    { stripReasoning: true }
  ) as { choices: Array<{ message: Record<string, unknown> }> };
  assert.equal(out.choices[0].message.reasoning_content, undefined);
  assert.equal(out.choices[0].message.content, "visible answer");
});
