/**
 * TDD regression for #5312 (FIX D / RC-D): openai-to-claude reconstructed a Claude
 * `thinking` block from signature-less `reasoning_content` and stamped it with the
 * fabricated DEFAULT_THINKING_CLAUDE_SIGNATURE. Anthropic validates signatures and
 * rejects the fake one with 400 "Invalid signature in thinking block" — and
 * claudeHelper's latest-assistant guard preserves the block verbatim, so the fake
 * signature leaks upstream.
 *
 * Fix: emit a signature-less `redacted_thinking` placeholder (matching what
 * prepareClaudeRequest produces downstream). A REAL part.signature must always be
 * preserved verbatim — never overwritten with the default.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest } = await import(
  "../../open-sse/translator/request/openai-to-claude.ts"
);
const { DEFAULT_THINKING_CLAUDE_SIGNATURE } = await import(
  "../../open-sse/config/defaultThinkingSignature.ts"
);

test("#5312 RC-D: signature-less reasoning_content yields no fabricated-signature thinking block", () => {
  const result = openaiToClaudeRequest(
    "claude-opus-4-8",
    {
      messages: [
        { role: "user", content: "hello" },
        { role: "assistant", reasoning_content: "thinking about it", content: "hi there" },
      ],
    },
    false
  );

  const assistant = result.messages.find((m) => m.role === "assistant");
  assert.ok(assistant, "expected assistant message");

  // No block may carry the fabricated default signature.
  const fake = assistant.content.find(
    (b) => b && b.signature === DEFAULT_THINKING_CLAUDE_SIGNATURE
  );
  assert.equal(fake, undefined, "must NOT emit a thinking block with the fabricated signature");

  // No `thinking`-typed block at all from signature-less reasoning_content.
  assert.equal(
    assistant.content.find((b) => b && b.type === "thinking"),
    undefined,
    "signature-less reasoning_content must not produce a `thinking` block"
  );

  // It becomes a redacted_thinking placeholder (Anthropic accepts without sig check).
  const redacted = assistant.content.find((b) => b && b.type === "redacted_thinking");
  assert.ok(redacted, "expected a redacted_thinking placeholder");
  assert.equal(redacted.data, DEFAULT_THINKING_CLAUDE_SIGNATURE);
  assert.equal(redacted.signature, undefined, "redacted_thinking must not carry a signature");
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
