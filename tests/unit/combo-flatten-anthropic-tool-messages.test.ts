/**
 * Tests for flattenToolHistory — a defensive normalizer that flattens
 * structured tool turns (OpenAI tool_calls + tool role messages, and
 * Anthropic-style tool_use / tool_result content blocks) into plain
 * assistant prose.
 *
 * Why this matters in combo legs: when a combo's panel/expert leg is asked
 * to emit prose (tools stripped) but the prior history still carries tool
 * call structures, agentic models keep emitting tool_calls — returning
 * empty prose and triggering an upstream 503. Flattening the history
 * preserves context but removes the tool-loop trigger.
 *
 * Ported from upstream decolua/9router commits 86162eeb + 9ab14e77 (PR #1910).
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  flattenToolHistory,
  TOOL_CALL_PREFIX,
  TOOL_RESULT_PREFIX,
} from "../../open-sse/utils/flattenToolHistory.ts";

describe("flattenToolHistory", () => {
  it("flattens OpenAI tool role messages into assistant prose", () => {
    const msgs = [
      { role: "user", content: "find files" },
      {
        role: "assistant",
        content: "",
        tool_calls: [{ id: "c1", type: "function", function: { name: "find" } }],
      },
      { role: "tool", tool_call_id: "c1", content: "['a.js']" },
      { role: "user", content: "describe it" },
    ];
    const out = flattenToolHistory(msgs);
    assert.equal(out.length, 4);
    assert.equal(out[0].role, "user");
    // assistant tool_calls flattened
    assert.equal(out[1].tool_calls, undefined);
    assert.ok(typeof out[1].content === "string");
    assert.ok((out[1].content as string).includes("find"));
    assert.ok((out[1].content as string).includes(TOOL_CALL_PREFIX));
    // tool role -> assistant prose
    assert.equal(out[2].role, "assistant");
    assert.ok((out[2].content as string).includes("['a.js']"));
    assert.ok((out[2].content as string).includes(TOOL_RESULT_PREFIX));
    assert.deepEqual(out[3], { role: "user", content: "describe it" });
  });

  it("flattens Anthropic-style tool_use and tool_result content blocks", () => {
    const msgs = [
      { role: "user", content: "do it" },
      {
        role: "assistant",
        content: [
          { type: "text", text: "ok" },
          { type: "tool_use", id: "t1", name: "run" },
        ],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "t1", content: "done" }],
      },
    ];
    const out = flattenToolHistory(msgs);
    assert.equal(out.length, 3);
    // assistant Anthropic tool_use flattened
    assert.equal(out[1].content, `ok\n${TOOL_CALL_PREFIX}run]`);
    // user tool_result flattened (preserved role; content becomes prose)
    assert.equal(out[2].content, `${TOOL_RESULT_PREFIX}done]`);
  });

  it("preserves messages without tool turns unchanged", () => {
    const msgs = [
      { role: "system", content: "you are helpful" },
      { role: "user", content: "hello" },
      { role: "assistant", content: "hi" },
    ];
    const out = flattenToolHistory(msgs);
    assert.deepEqual(out, msgs);
  });

  it("filters out null/undefined entries", () => {
    const msgs = [
      { role: "user", content: "a" },
      null,
      undefined,
      { role: "assistant", content: "b" },
    ] as Array<Record<string, unknown> | null | undefined>;
    const out = flattenToolHistory(msgs);
    assert.equal(out.length, 2);
  });

  it("flattens function role (legacy) into assistant prose", () => {
    const msgs = [
      { role: "user", content: "q" },
      { role: "function", name: "f", content: "result" },
    ];
    const out = flattenToolHistory(msgs);
    assert.equal(out[1].role, "assistant");
    assert.ok((out[1].content as string).includes("result"));
  });

  it("handles assistant with text content + tool_calls (preserves the text)", () => {
    const msgs = [
      {
        role: "assistant",
        content: "thinking out loud",
        tool_calls: [{ function: { name: "search" } }, { function: { name: "fetch" } }],
      },
    ];
    const out = flattenToolHistory(msgs);
    assert.equal(out[0].tool_calls, undefined);
    assert.equal(out[0].content, `thinking out loud\n${TOOL_CALL_PREFIX}search, fetch]`);
  });

  it("handles Anthropic tool_use with no text block (only tool calls)", () => {
    const msgs = [
      {
        role: "assistant",
        content: [
          { type: "tool_use", id: "t1", name: "alpha" },
          { type: "tool_use", id: "t2", name: "beta" },
        ],
      },
    ];
    const out = flattenToolHistory(msgs);
    assert.equal(out[0].content, `${TOOL_CALL_PREFIX}alpha, beta]`);
  });

  it("handles Anthropic tool_result content as array of text blocks", () => {
    const msgs = [
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "t1",
            content: [{ type: "text", text: "file: a.js" }],
          },
        ],
      },
    ];
    const out = flattenToolHistory(msgs);
    assert.equal(out[0].content, `${TOOL_RESULT_PREFIX}file: a.js]`);
  });

  it("is a pure function (does not mutate input)", () => {
    const msgs = [
      { role: "tool", tool_call_id: "c1", content: "x" },
      {
        role: "assistant",
        content: "",
        tool_calls: [{ function: { name: "n" } }],
      },
    ];
    const snapshot = JSON.parse(JSON.stringify(msgs));
    flattenToolHistory(msgs);
    assert.deepEqual(msgs, snapshot);
  });
});
