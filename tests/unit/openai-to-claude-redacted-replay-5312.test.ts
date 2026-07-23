/**
 * TDD regression for #5312 (FIX D / RC-D) and #5945.
 *
 * #5312 (FIX D / RC-D): openai-to-claude reconstructed a Claude `thinking` block from
 * signature-less `reasoning_content` and stamped it with the fabricated
 * DEFAULT_THINKING_CLAUDE_SIGNATURE. Anthropic validates signatures and rejects the
 * fake one with 400 "Invalid signature in thinking block" — and claudeHelper's
 * latest-assistant guard preserves the block verbatim, so the fake signature leaks
 * upstream.
 *
 * Fix (#5312): when a precursor thinking block IS required by Anthropic's schema
 * (assistant turn has tool_use AND the outbound request has extended thinking
 * enabled), emit a signature-less `redacted_thinking` placeholder (matching what
 * prepareClaudeRequest produces downstream) instead of a fabricated-signature
 * `thinking` block. A REAL part.signature must always be preserved verbatim — never
 * overwritten with the default.
 *
 * #5945 (over-correction of #5312): the original #5312 fix injected the
 * redacted_thinking placeholder UNCONDITIONALLY whenever ANY assistant history
 * message carried non-empty `reasoning_content` — regardless of whether the current
 * outbound request has thinking enabled, and regardless of whether that assistant
 * turn even contains a `tool_use` block (the only case Anthropic's schema actually
 * requires a preceding thinking/redacted_thinking block). This fabricated a content
 * block the client never sent; reported by dev-cj: Claude Sonnet 5 via the "Pi"
 * harness detected the extra block and refused the turn as prompt injection.
 *
 * Fix (#5945): gate the injection on BOTH (a) the assistant turn containing a
 * tool_use block and (b) the outbound request having extended thinking enabled.
 * Otherwise `reasoning_content` is dropped silently — it carries no useful signal
 * for a plain-text replay turn, and the client never asked for it to appear.
 *
 * These two fixes are not in tension: #5312 legitimately fixed a real Anthropic 400
 * for the case the redacted_thinking block IS required; #5945 narrows the trigger to
 * exactly that case instead of firing for every reasoning_content-bearing message.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest } = await import(
  "../../open-sse/translator/request/openai-to-claude.ts"
);
const { DEFAULT_THINKING_CLAUDE_SIGNATURE } = await import(
  "../../open-sse/config/defaultThinkingSignature.ts"
);

test("#5945: reasoning_content on a plain-text assistant turn (no tool_use, thinking not requested) yields NO redacted_thinking/thinking block", () => {
  const result = openaiToClaudeRequest(
    "claude-opus-4-8",
    {
      messages: [
        { role: "user", content: "hello" },
        { role: "assistant", reasoning_content: "thinking about it", content: "hi there" },
      ],
      // no body.thinking / body.reasoning_effort — thinking is NOT enabled for this request.
    },
    false
  );

  const assistant = result.messages.find((m) => m.role === "assistant");
  assert.ok(assistant, "expected assistant message");

  // No fabricated block at all — reasoning_content must be dropped silently, exactly
  // like OPENAI_INCOMPATIBLE_ECHO_FIELDS drops other echo-only fields.
  assert.equal(
    assistant.content.find((b) => b && (b.type === "thinking" || b.type === "redacted_thinking")),
    undefined,
    "must NOT fabricate a thinking/redacted_thinking block the client never sent"
  );
  assert.deepEqual(
    assistant.content.map((b) => b.type),
    ["text"],
    "assistant content should contain only the real text block"
  );
});

test("#5945: reasoning_content + tool_use, but thinking NOT enabled on the outbound request, yields NO injection", () => {
  const result = openaiToClaudeRequest(
    "claude-opus-4-8",
    {
      messages: [
        { role: "user", content: "hello" },
        {
          role: "assistant",
          reasoning_content: "thinking about it",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "get_weather", arguments: "{}" },
            },
          ],
        },
      ],
      // no body.thinking / body.reasoning_effort — thinking is NOT enabled.
    },
    false
  );

  const assistant = result.messages.find((m) => m.role === "assistant");
  assert.ok(assistant, "expected assistant message");
  assert.equal(
    assistant.content.find((b) => b && (b.type === "thinking" || b.type === "redacted_thinking")),
    undefined,
    "must NOT inject a precursor thinking block when the request itself has thinking disabled"
  );
  assert.ok(
    assistant.content.some((b) => b.type === "tool_use"),
    "tool_use block must still be present"
  );
});

test("#5312: reasoning_content + tool_use + thinking ENABLED still gets a signature-less redacted_thinking precursor (the legitimate #5312 400-fix case)", () => {
  const result = openaiToClaudeRequest(
    "claude-opus-4-8",
    {
      thinking: { type: "enabled", budget_tokens: 4096 },
      messages: [
        { role: "user", content: "hello" },
        {
          role: "assistant",
          reasoning_content: "thinking about it",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "get_weather", arguments: "{}" },
            },
          ],
        },
      ],
    },
    false
  );

  const assistant = result.messages.find((m) => m.role === "assistant");
  assert.ok(assistant, "expected assistant message");

  // No block may carry the fabricated default signature on a `thinking`-typed block.
  const fake = assistant.content.find(
    (b) => b && b.type === "thinking" && b.signature === DEFAULT_THINKING_CLAUDE_SIGNATURE
  );
  assert.equal(fake, undefined, "must NOT emit a `thinking` block with the fabricated signature");

  // It becomes a redacted_thinking placeholder (Anthropic accepts without sig check),
  // and it must precede the tool_use block.
  assert.equal(assistant.content[0].type, "redacted_thinking", "must be the precursor block");
  assert.equal(assistant.content[0].data, DEFAULT_THINKING_CLAUDE_SIGNATURE);
  assert.equal(
    assistant.content[0].signature,
    undefined,
    "redacted_thinking must not carry a signature"
  );
  assert.ok(
    assistant.content.some((b) => b.type === "tool_use"),
    "tool_use block must still be present"
  );
});

test("#5312 RC-D: a REAL thinking signature is preserved verbatim", () => {
  const REAL_SIG = "ErUBCkYI... real-anthropic-signature ...xyz==";
  const result = openaiToClaudeRequest(
    "claude-opus-4-8",
    {
      messages: [
        { role: "user", content: "hello" },
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "real reasoning", signature: REAL_SIG },
            { type: "text", text: "answer" },
          ],
        },
      ],
    },
    false
  );

  const assistant = result.messages.find((m) => m.role === "assistant");
  assert.ok(assistant, "expected assistant message");
  const thinking = assistant.content.find((b) => b && b.type === "thinking");
  assert.ok(thinking, "expected the real thinking block to survive");
  assert.equal(thinking.signature, REAL_SIG, "real signature must be preserved verbatim");
  assert.notEqual(
    thinking.signature,
    DEFAULT_THINKING_CLAUDE_SIGNATURE,
    "real signature must never be overwritten with the default"
  );
});
