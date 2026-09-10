import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  replaceTextContent,
  type ChatMessageLike,
} from "../../../open-sse/services/compression/messageContent.ts";
import { applyAging } from "../../../open-sse/services/compression/progressiveAging.ts";

// ─── ISSUE #12890 — B-AGG-TR-ORDER ───────────────────────────────────────────
// When the compression pipeline ages/replaces the text of a user message that
// carries a `tool_result` block but NO text block, `replaceTextContent()` used
// to PREPEND the new `{type:"text"}` block:
//
//   [{type:"text"}, {type:"tool_result"}]
//
// The Anthropic Messages API requires `tool_result` blocks to come FIRST in the
// message that follows a `tool_use` — this ordering triggers upstream 400:
//   "`tool_use` ids were found without `tool_result` blocks immediately after".
//
// The text annotation must therefore be appended AFTER the tool_result blocks
// (or, equivalently, never inserted ahead of a tool_result).
describe("replaceTextContent — tool_result ordering (#12890)", () => {
  it("appends (not prepends) the text block when content is a lone tool_result", () => {
    const msg: ChatMessageLike = {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "toolu_01S1dba", content: "raw tool output" }],
    };

    const replaced = replaceTextContent(msg, "[COMPRESSED:aging:fullSummary] summary");
    const blocks = replaced.content as Array<{ type?: string }>;

    // The tool_result MUST remain first so Anthropic accepts the message.
    assert.equal(blocks[0].type, "tool_result", "tool_result block must stay first");
    // The annotation must still be present, just at the end.
    assert.equal(blocks[blocks.length - 1].type, "text", "text annotation must be appended last");
    assert.equal(blocks.length, 2, "exactly the tool_result plus the appended text");
  });

  it("keeps tool_result first even when other non-text blocks precede it", () => {
    const msg: ChatMessageLike = {
      role: "user",
      content: [
        { type: "tool_result", tool_use_id: "toolu_A", content: "out A" },
        { type: "tool_result", tool_use_id: "toolu_B", content: "out B" },
      ],
    };

    const replaced = replaceTextContent(msg, "annotation");
    const blocks = replaced.content as Array<{ type?: string }>;

    assert.equal(blocks[0].type, "tool_result", "first tool_result must stay first");
    assert.ok(
      blocks.filter((b) => b.type === "tool_result").length === 2,
      "both tool_result blocks must survive"
    );
    assert.ok(
      blocks.every((b, i) => b.type !== "text" || i === blocks.length - 1),
      "no text block may appear before a tool_result"
    );
  });

  it("still prepends the text block when there is no tool_result (unchanged behavior)", () => {
    const msg: ChatMessageLike = {
      role: "user",
      content: [{ type: "image", source: { foo: 1 } }],
    };

    const replaced = replaceTextContent(msg, "front text");
    const blocks = replaced.content as Array<{ type?: string; text?: string }>;

    // Non-tool_result messages keep the original prepend behavior.
    assert.equal(blocks[0].type, "text", "text should still lead a non-tool_result message");
    assert.equal(blocks[0].text, "front text");
    assert.ok(
      blocks.some((b) => b.type === "image"),
      "the pre-existing block must be preserved"
    );
  });

  it("aging a lone-tool_result user message keeps the tool_result first (end-to-end)", () => {
    // Build a long enough conversation that the first message ages into the
    // fullSummary tier, which routes through replaceTextContent().
    const first: ChatMessageLike = {
      role: "user",
      content: [
        {
          type: "tool_result",
          tool_use_id: "toolu_01S1dba",
          content: "x".repeat(400),
        },
      ],
    };
    const msgs: ChatMessageLike[] = [first];
    for (let i = 1; i < 8; i++) {
      msgs.push({ role: i % 2 ? "assistant" : "user", content: `filler ${i} ${"z".repeat(60)}` });
    }

    const result = applyAging(msgs, { fullSummary: 10, moderate: 10, light: 3, verbatim: 1 });
    const aged = result.messages[0].content as Array<{ type?: string }>;

    if (Array.isArray(aged)) {
      const firstTr = aged.findIndex((b) => b.type === "tool_result");
      const firstText = aged.findIndex((b) => b.type === "text");
      assert.ok(firstTr !== -1, "tool_result block must survive aging");
      if (firstText !== -1) {
        assert.ok(
          firstTr < firstText,
          "aged message must not place a text block before its tool_result"
        );
      }
    }
  });
});
