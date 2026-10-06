/**
 * #5108 — Regression from #4942. A non-streaming `/v1/messages` request to a Claude
 * extended-thinking model returns HTTP 200 with a Claude-shaped body whose `content`
 * array holds only an *empty* thinking block that still carries a valid `signature`:
 *
 *   content: [{ type: "thinking", thinking: "", signature: "Eo…" }]
 *
 * `detectMalformedNonStream` only understood OpenAI Chat Completions (`choices`) and
 * Responses API (`object:"response"`) shapes — a Claude body (`type:"message"`,
 * `content:[…]`) has neither, so it fell through to `empty_choices` and OmniRoute
 * returned 502 (cascading to "All models failed" inside a combo). The signature proves
 * the thinking step actually ran, so this is a valid completion, not an empty one.
 *
 * The detector must understand the Claude shape: text blocks with text, thinking blocks
 * (with or without a signature), redacted_thinking, and tool_use blocks count as output;
 * a genuinely empty terminal `content:[]` (or a terminal `(empty response)` text sentinel)
 * is still flagged. #9971 refined #5108's rule: an empty thinking block is also valid
 * structural output (the upstream can truncate a thinking-only generation before any
 * text/signature lands), so it is no longer flagged — only content-less *terminal* bodies are.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { detectMalformedNonStream } from "../../open-sse/utils/diagnostics.ts";

const claudeMsg = (content: unknown[]) => ({
  type: "message",
  role: "assistant",
  id: "msg_x",
  model: "claude-opus-4-8",
  content,
  stop_reason: "end_turn",
  usage: { input_tokens: 5, output_tokens: 1 },
});

test("#5108 Claude thinking-only block with a signature is valid output (was 502 empty_choices)", () => {
  const body = claudeMsg([{ type: "thinking", thinking: "", signature: "EoABCDEF" }]);
  assert.equal(detectMalformedNonStream(body), null);
});

test("#5108 normal Claude text response is valid output", () => {
  const body = claudeMsg([{ type: "text", text: "hello" }]);
  assert.equal(detectMalformedNonStream(body), null);
});

test("#5108 Claude tool_use response is valid output", () => {
  const body = claudeMsg([{ type: "tool_use", id: "toolu_1", name: "bash", input: {} }]);
  assert.equal(detectMalformedNonStream(body), null);
});

test("#5108 genuinely empty Claude content:[] is still flagged malformed", () => {
  assert.equal(detectMalformedNonStream(claudeMsg([])), "empty_choices");
});

test("Claude Code /model probe: content:[] + max_tokens is not empty_choices", () => {
  const body = {
    ...claudeMsg([]),
    stop_reason: "max_tokens",
  };
  assert.equal(detectMalformedNonStream(body), null);
});

test("#5108/#9971 Claude thinking block with neither text nor signature is valid output (was empty_choices)", () => {
  const body = claudeMsg([{ type: "thinking", thinking: "", signature: "" }]);
  // #9971: an empty thinking block is valid structural output — the upstream can
  // truncate a thinking-only generation before any text/signature lands, and a
  // content-less thinking-only body must not turn into an empty_choices 502.
  assert.equal(detectMalformedNonStream(body), null);
});

// Existing OpenAI / Responses behavior must be unchanged.
test("#5108 OpenAI chat completion still validated normally", () => {
  assert.equal(
    detectMalformedNonStream({ choices: [{ message: { content: "hi" } }] }),
    null
  );
  assert.equal(detectMalformedNonStream({ choices: [] }), "empty_choices");
});
