import test from "node:test";
import assert from "node:assert/strict";

const { redactPassthroughThinkingSignatures } = await import("../../open-sse/handlers/chatCore.ts");

const SIG = "SYNTHETIC_SIGNATURE_FIXTURE";

// Regression for #2454 (Error 2): historical thinking signatures are bound to the
// original auth token; after a model switch the proxy uses a different token and
// Anthropic rejects them. Convert ALL thinking/redacted_thinking blocks (incl. last).

test("#2454 converts all thinking blocks to redacted_thinking with synthetic signature", () => {
  const messages = [
    { role: "user", content: [{ type: "text", text: "hi" }] },
    {
      role: "assistant",
      content: [
        { type: "thinking", thinking: "reasoning", signature: "TOKEN_A_SIG_1" },
        { type: "text", text: "answer 1" },
      ],
    },
    { role: "user", content: [{ type: "text", text: "more" }] },
    {
      role: "assistant",
      content: [
        { type: "thinking", thinking: "reasoning 2", signature: "TOKEN_A_SIG_2" },
        { type: "text", text: "answer 2" },
      ],
    },
  ];

  const out = redactPassthroughThinkingSignatures(messages, SIG) as any[];

  for (const msg of out) {
    if (msg.role !== "assistant") continue;
    for (const block of msg.content) {
      if (block.type === "redacted_thinking") {
        assert.equal(block.data, SIG, "redacted_thinking carries the synthetic signature");
        assert.equal(block.signature, undefined, "original signature is dropped");
        assert.equal(block.thinking, undefined, "plaintext thinking is dropped");
      }
      assert.notEqual(block.type, "thinking", "no raw thinking block must survive (incl. last)");
    }
  }
  // text blocks are preserved verbatim
  assert.equal(out[1].content[1].text, "answer 1");
  assert.equal(out[3].content[1].text, "answer 2");
});

test("#2454 leaves messages without thinking untouched (same reference)", () => {
  const messages = [
    { role: "user", content: [{ type: "text", text: "hi" }] },
    { role: "assistant", content: [{ type: "text", text: "plain answer" }] },
  ];
  const out = redactPassthroughThinkingSignatures(messages, SIG) as any[];
  assert.equal(out[1], messages[1], "unchanged assistant message keeps its reference");
});

test("#2454 already-redacted thinking blocks are re-stamped with the synthetic signature", () => {
  const messages = [
    {
      role: "assistant",
      content: [{ type: "redacted_thinking", data: "STALE_TOKEN_B_DATA" }],
    },
  ];
  const out = redactPassthroughThinkingSignatures(messages, SIG) as any[];
  assert.equal(out[0].content[0].data, SIG);
});

test("#2454 non-array messages pass through", () => {
  assert.equal(redactPassthroughThinkingSignatures(undefined, SIG), undefined);
  assert.equal(redactPassthroughThinkingSignatures(null, SIG), null);
});
