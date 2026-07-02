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
 * with a signature, and tool_use blocks count as output; a genuinely empty `content:[]`
 * (or thinking with neither text nor signature) is still flagged.
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

test("#5108 Claude thinking block with neither text nor signature is still flagged", () => {
  const body = claudeMsg([{ type: "thinking", thinking: "", signature: "" }]);
  assert.equal(detectMalformedNonStream(body), "empty_choices");
});

// Existing OpenAI / Responses behavior must be unchanged.
test("#5108 OpenAI chat completion still validated normally", () => {
  assert.equal(
    detectMalformedNonStream({ choices: [{ message: { content: "hi" } }] }),
    null
  );
  assert.equal(detectMalformedNonStream({ choices: [] }), "empty_choices");
});
