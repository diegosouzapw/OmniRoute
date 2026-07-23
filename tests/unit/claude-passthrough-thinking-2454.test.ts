import test from "node:test";
import assert from "node:assert/strict";

const { redactPassthroughThinkingSignatures } = await import("../../open-sse/handlers/chatCore.ts");

const SIG = "SYNTHETIC_SIGNATURE_FIXTURE";

// `redactPassthroughThinkingSignatures` now passes thinking blocks through
// unchanged. Rewriting them to `redacted_thinking` made the Anthropic Messages
// API reject the request with 400 "thinking or redacted_thinking blocks in the
// latest assistant message cannot be modified" (the blocks are validated against
// the original response). The thinking signature is validated server-side and
// stays valid on replay, so the redaction that targeted #2454 is unnecessary.

test("passes all thinking blocks through unchanged (historical and latest)", () => {
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
        { type: "tool_use", id: "toolu_1", name: "Bash", input: { cmd: "ls" } },
      ],
    },
  ];
  const before = JSON.stringify(messages);

  const out = redactPassthroughThinkingSignatures(messages, SIG);

  assert.equal(out, messages, "returns the same array reference (no copy / no rewrite)");
  assert.equal(JSON.stringify(out), before, "no block is modified");
  // original signatures survive on every turn, historical and latest
  assert.equal((messages[1].content as { type: string }[])[0].type, "thinking");
  assert.equal((messages[1].content as { signature?: string }[])[0].signature, "TOKEN_A_SIG_1");
  assert.equal((messages[3].content as { type: string }[])[0].type, "thinking");
  assert.equal((messages[3].content as { signature?: string }[])[0].signature, "TOKEN_A_SIG_2");
});

test("pre-existing redacted_thinking blocks are not re-stamped", () => {
  const messages = [
    { role: "assistant", content: [{ type: "redacted_thinking", data: "ORIGINAL_DATA" }] },
  ];
  const out = redactPassthroughThinkingSignatures(messages, SIG) as {
    content: { type: string; data: string }[];
  }[];
  assert.equal(out[0].content[0].type, "redacted_thinking");
  assert.equal(out[0].content[0].data, "ORIGINAL_DATA");
});

test("non-array messages pass through", () => {
  assert.equal(redactPassthroughThinkingSignatures(undefined, SIG), undefined);
  assert.equal(redactPassthroughThinkingSignatures(null, SIG), null);
});
