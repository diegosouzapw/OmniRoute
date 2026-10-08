import test from "node:test";
import assert from "node:assert/strict";

/**
 * #15534 triage probes — pinned expectations for the combo codex→claude fallback
 * path. Each test documents what the current pipeline guarantees so a regression
 * (any path that starts minting a foreign signature) turns red here.
 *
 * The incident report shows an assistant thinking block with EMPTY text and a
 * NON-EMPTY ~2408-char signature replayed to Anthropic (400 invalid signature).
 * These tests verify the OmniRoute translation chain cannot produce that shape
 * from codex reasoning items.
 */

const { translateResponse } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");
const { dropUnsignedPassthroughThinkingBlocks } =
  await import("../../open-sse/handlers/chatCore/passthroughHelpers.ts");

function translateResponsesSseToClaude(events) {
  const state = {};
  const out = [];
  for (const event of events) {
    for (const chunk of translateResponse(FORMATS.OPENAI_RESPONSES, FORMATS.CLAUDE, event, state)) {
      out.push(chunk);
    }
  }
  for (const chunk of translateResponse(FORMATS.OPENAI_RESPONSES, FORMATS.CLAUDE, null, state)) {
    out.push(chunk);
  }
  return out;
}

test("#15534: encrypted-only codex reasoning never surfaces a thinking block on the Claude client", () => {
  const events = [
    {
      type: "response.output_item.done",
      item: {
        type: "reasoning",
        id: "rs_enc",
        encrypted_content: "ENCRYPTED_STATE_2408_CHARS",
        summary: [],
      },
    },
    {
      type: "response.output_item.done",
      item: { type: "message", id: "msg_1", content: [{ type: "output_text", text: "hi" }] },
    },
  ];
  const out = translateResponsesSseToClaude(events);
  const thinkingStarts = out.filter(
    (e) => e?.type === "content_block_start" && e?.content_block?.type === "thinking"
  );
  assert.equal(thinkingStarts.length, 0, "opaque-only reasoning must not open a thinking block");
  const anySignature = JSON.stringify(out).includes("signature");
  assert.equal(anySignature, false, "no signature may be synthesized anywhere in the stream");
});

test("#15534: plaintext codex reasoning becomes an UNSIGNED thinking block (dropped on replay, never signed)", () => {
  const events = [
    {
      type: "response.output_item.done",
      item: {
        type: "reasoning",
        id: "rs_plain",
        content: [{ type: "reasoning_text", text: "planning the tool call" }],
        summary: [],
      },
    },
  ];
  const out = translateResponsesSseToClaude(events);
  const thinkingStarts = out.filter(
    (e) => e?.type === "content_block_start" && e?.content_block?.type === "thinking"
  );
  assert.ok(thinkingStarts.length > 0, "plaintext reasoning opens a thinking block");
  assert.equal(
    thinkingStarts[0].content_block.signature,
    undefined,
    "the thinking block must be unsigned — OmniRoute never mints a signature for codex reasoning"
  );
});

test("#15534: an unsigned thinking block from the codex leg is dropped by the Claude passthrough guard", () => {
  const messages = [
    { role: "user", content: [{ type: "text", text: "hi" }] },
    {
      role: "assistant",
      content: [
        { type: "thinking", thinking: "" },
        { type: "text", text: "answer" },
      ],
    },
  ];
  const out = dropUnsignedPassthroughThinkingBlocks(messages) as typeof messages;
  const assistant = out.find((m) => m.role === "assistant");
  assert.deepEqual(
    assistant.content.map((b) => b.type),
    ["text"],
    "unsigned thinking must be dropped before an Anthropic replay"
  );
});

test("#15534: openai→claude request translation drops unsigned thinking and never fabricates a signature", () => {
  const result = openaiToClaudeRequest(
    "claude-opus-5-5",
    {
      messages: [
        { role: "user", content: "hello" },
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "", signature: "" },
            { type: "text", text: "prior turn" },
          ],
        },
        { role: "user", content: "again" },
      ],
    },
    false
  );
  const assistant = result.messages.find((m) => m.role === "assistant");
  const thinking = assistant.content.filter((b) => b?.type === "thinking");
  assert.equal(thinking.length, 0, "empty-signature thinking is dropped (#6953)");
  assert.equal(
    JSON.stringify(result).includes("signature"),
    false,
    "no fabricated thinking signature is added to the outbound body"
  );
});

test("#15534: a signed empty thinking block is preserved for genuine Anthropic replay", () => {
  // Anthropic SSE can emit a signature_delta without a thinking_delta; neither
  // an empty string nor the signature's length proves foreign provenance.
  const messages = [
    { role: "user", content: [{ type: "text", text: "hi" }] },
    {
      role: "assistant",
      content: [
        { type: "thinking", thinking: "", signature: "OPAQUE_ANTHROPIC_SIGNATURE" },
        { type: "text", text: "answer" },
      ],
    },
  ];
  assert.equal(dropUnsignedPassthroughThinkingBlocks(messages), messages);
});

test("#15534: an assistant turn of only an unsigned thinking block is removed entirely, keeping tool cycles valid", () => {
  const messages = [
    { role: "user", content: [{ type: "text", text: "hi" }] },
    {
      role: "assistant",
      content: [{ type: "thinking", thinking: "", signature: "" }],
    },
    {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "toolu_1", content: "ok" }],
    },
  ];
  const out = dropUnsignedPassthroughThinkingBlocks(messages) as typeof messages;
  assert.equal(out.length, 2, "the emptied assistant turn is removed");
  assert.deepEqual(
    out.map((m) => m.role),
    ["user", "user"]
  );
});
