import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  extractTextContent,
  replaceTextContent,
  type ChatMessageLike,
} from "../../../open-sse/services/compression/messageContent.ts";
import { applyAging } from "../../../open-sse/services/compression/progressiveAging.ts";
import { compressAggressive } from "../../../open-sse/services/compression/aggressive.ts";
import type { AgingThresholds } from "../../../open-sse/services/compression/types.ts";

// ─── ISSUE 1 — B-AGG-TEXTDROP ────────────────────────────────────────────────
// `replaceTextContent` previously dropped every text block after the first via
// flatMap → []. With the standard call pattern (newText = compressed JOIN of all
// text blocks), the joined original content must remain recoverable: nothing the
// model can no longer see may be silently lost.
describe("replaceTextContent — multi-text-block fidelity (B-AGG-TEXTDROP)", () => {
  it("does not silently drop trailing text-block content absent from newText", () => {
    const msg: ChatMessageLike = {
      role: "user",
      content: [
        { type: "text", text: "FIRST block alpha" },
        { type: "image", source: { foo: 1 } },
        { type: "text", text: "SECOND block bravo" },
        { type: "text", text: "THIRD block charlie" },
      ],
    };

    // newText does NOT subsume the trailing blocks (worst case): a caller that
    // only summarized the first block. The trailing blocks' content must not
    // silently vanish.
    const replaced = replaceTextContent(msg, "NEWTEXT-only-first");

    const out = extractTextContent(replaced.content);
    assert.ok(out.includes("NEWTEXT-only-first"), "replacement text missing");
    assert.ok(out.includes("SECOND block bravo"), "second block silently dropped");
    assert.ok(out.includes("THIRD block charlie"), "third block silently dropped");

    // Non-text blocks (image) must survive unchanged.
    const blocks = replaced.content as Array<{ type?: string }>;
    assert.ok(
      blocks.some((b) => b.type === "image"),
      "non-text block must be preserved"
    );
  });

  it("collapses trailing blocks when newText already subsumes them (no duplication)", () => {
    const msg: ChatMessageLike = {
      role: "user",
      content: [
        { type: "text", text: "alpha" },
        { type: "text", text: "bravo" },
      ],
    };
    // Standard call pattern: newText = compressed JOIN of all text blocks.
    const joined = extractTextContent(msg.content); // "alpha\nbravo"
    const replaced = replaceTextContent(msg, joined);
    const blocks = replaced.content as Array<{ type?: string; text?: string }>;
    const textBlocks = blocks.filter((b) => b.type === "text" || b.text !== undefined);
    // Should collapse to a single text block — no duplicated "alpha"/"bravo".
    assert.equal(textBlocks.length, 1, "subsumed trailing blocks should be collapsed");
    assert.equal(extractTextContent(replaced.content), joined);
  });

  it("aging a multi-text-block message keeps all original text represented", () => {
    // Build a long conversation so the first (multi-block) message ages out.
    const first: ChatMessageLike = {
      role: "user",
      content: [
        { type: "text", text: "alpha-marker request: fix login" },
        { type: "text", text: "bravo-marker error: TypeError: boom" },
      ],
    };
    const msgs: ChatMessageLike[] = [first];
    for (let i = 1; i < 8; i++) {
      msgs.push({ role: i % 2 ? "assistant" : "user", content: `filler ${i} ${"z".repeat(60)}` });
    }
    const result = applyAging(msgs, { fullSummary: 10, moderate: 10, light: 3, verbatim: 1 });
    const out = extractTextContent(result.messages[0].content as ChatMessageLike["content"]);
    // Light tier keeps content; both blocks' text must still be present (joined).
    assert.ok(out.includes("alpha-marker"), "first text block lost during aging");
    assert.ok(out.includes("bravo-marker"), "second text block silently dropped during aging");
  });
});

// ─── ISSUE 2 — B-AGG-ANTHROPIC-TR ────────────────────────────────────────────
// Anthropic-shape tool_result blocks (a {type:"tool_result"} content block inside
// a user message) must be compressed too, preserving tool_use_id + block type.
describe("aggressive — Anthropic tool_result compression (B-AGG-ANTHROPIC-TR)", () => {
  it("compresses the text inside an Anthropic tool_result block", () => {
    const bigJsonArray = JSON.stringify(
      Array.from({ length: 200 }, (_, i) => ({ id: i, name: `item${i}`, data: "x".repeat(40) }))
    );
    const userMsg: ChatMessageLike = {
      role: "user",
      content: [
        {
          type: "tool_result",
          tool_use_id: "toolu_ABC123",
          content: [{ type: "text", text: bigJsonArray }],
        },
      ],
    };

    const result = compressAggressive([userMsg]);
    const outMsg = result.messages[0];
    const blocks = outMsg.content as Array<Record<string, unknown>>;
    const tr = blocks.find((b) => b.type === "tool_result");

    assert.ok(tr, "tool_result block must survive");
    assert.equal(tr!.type, "tool_result", "block type must be unchanged");
    assert.equal(tr!.tool_use_id, "toolu_ABC123", "tool_use_id must be preserved");

    // The inner text must be smaller than the original (it was compressed).
    const innerText =
      typeof tr!.content === "string"
        ? (tr!.content as string)
        : ((tr!.content as Array<{ type?: string; text?: string }>) ?? [])
            .filter((c) => c.type === "text")
            .map((c) => c.text ?? "")
            .join("\n");
    assert.ok(
      innerText.length < bigJsonArray.length,
      `tool_result inner text was not compressed (orig ${bigJsonArray.length}, got ${innerText.length})`
    );
    assert.ok(result.stats.aggressive!.toolResultSavings > 0, "toolResultSavings must be > 0");
  });

  it("compresses a string-form Anthropic tool_result block", () => {
    const errorOutput =
      "TypeError: Cannot read property 'x' of undefined\n" +
      Array.from({ length: 40 }, (_, i) => `    at fn${i} (file${i}.ts:${i + 1}:${i + 5})`).join(
        "\n"
      );
    const userMsg: ChatMessageLike = {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "toolu_ERR", content: errorOutput }],
    };
    const result = compressAggressive([userMsg]);
    const tr = (result.messages[0].content as Array<Record<string, unknown>>).find(
      (b) => b.type === "tool_result"
    );
    assert.ok(tr, "tool_result block must survive");
    assert.equal(tr!.tool_use_id, "toolu_ERR");
    assert.ok((tr!.content as string).length < errorOutput.length, "string tool_result not compressed");
  });
});

// ─── ISSUE 3 — B-AGG-JSONTAG ─────────────────────────────────────────────────
// Aging must not corrupt structured content (JSON / fenced code block) with a
// literal [COMPRESSED:...] inline prefix.
describe("progressiveAging — structured-content tag safety (B-AGG-JSONTAG)", () => {
  const thresholds: AgingThresholds = { fullSummary: 10, moderate: 10, light: 3, verbatim: 1 };

  function agedFirstContent(content: string, t: AgingThresholds): string {
    const msgs: ChatMessageLike[] = [
      { role: "user", content },
      { role: "assistant", content: "a " + "z".repeat(60) },
      { role: "user", content: "b " + "z".repeat(60) },
      { role: "assistant", content: "c" },
    ];
    const result = applyAging(msgs, t);
    const c = result.messages[0].content;
    return typeof c === "string" ? c : extractTextContent(c as ChatMessageLike["content"]);
  }

  it("keeps pure-JSON content JSON.parse-able after aging", () => {
    const json = JSON.stringify({
      status: "ok",
      items: Array.from({ length: 5 }, (_, i) => ({ id: i, name: `n${i}` })),
      meta: { a: 1, b: 2 },
    });
    const aged = agedFirstContent(json, thresholds);
    // Must remain valid JSON (no inline tag corruption).
    assert.doesNotThrow(() => JSON.parse(aged), `aged JSON not parseable: ${aged.slice(0, 80)}`);
  });

  it("keeps a fenced code block valid after aging (tag outside the fence)", () => {
    const fenced = "```json\n{\n  \"a\": 1,\n  \"b\": [1, 2, 3]\n}\n```";
    const aged = agedFirstContent(fenced, thresholds);
    // The fenced block must still be present and intact.
    assert.ok(aged.includes("```json"), "opening fence lost");
    assert.ok(aged.trimEnd().endsWith("```"), "closing fence lost");
    assert.ok(aged.includes('"a": 1'), "fenced payload corrupted");
  });

  it("does not re-compress structured content on a second aging pass (recursion guard)", () => {
    const json = JSON.stringify({ status: "ok", items: [{ id: 0 }, { id: 1 }], meta: { a: 1 } });
    const msgs: ChatMessageLike[] = [
      { role: "user", content: json },
      { role: "assistant", content: "a " + "z".repeat(60) },
      { role: "user", content: "b " + "z".repeat(60) },
      { role: "assistant", content: "c" },
    ];
    const first = applyAging(msgs, thresholds);
    const second = applyAging(first.messages as ChatMessageLike[], thresholds);
    const firstContent = JSON.stringify(
      first.messages.map((m) => (m as ChatMessageLike).content)
    );
    const secondContent = JSON.stringify(
      second.messages.map((m) => (m as ChatMessageLike).content)
    );
    assert.equal(secondContent, firstContent, "second aging pass changed structured content");
    // And it must still be parseable.
    const c0 = (second.messages[0] as ChatMessageLike).content;
    const text0 = typeof c0 === "string" ? c0 : extractTextContent(c0 as ChatMessageLike["content"]);
    assert.doesNotThrow(() => JSON.parse(text0), "JSON corrupted after two aging passes");
  });
});
