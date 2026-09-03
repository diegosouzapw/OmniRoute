/**
 * Tests for #3890: prompt-cache misses when memory injection is enabled.
 *
 * When the client uses prompt caching (cache_control breakpoints), the previous behavior
 * prepended the (per-query, varying) memory message at index 0 — shifting the entire
 * cacheable prefix and forcing a cache miss on every turn. With `cacheSafe`, memory is
 * inserted just before the last user message so the cacheable prefix stays byte-stable.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { injectMemory } from "../../../src/lib/memory/injection.ts";
import type { ChatRequest } from "../../../src/lib/memory/injection.ts";
import type { Memory } from "../../../src/lib/memory/types.ts";

function mem(content: string): Memory {
  return {
    id: `mem-${content}`,
    content,
    type: "factual" as any,
    apiKeyId: "k",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    importance: 0.5,
  };
}

function multiTurn(): ChatRequest {
  return {
    model: "anthropic/claude-sonnet-4-6",
    messages: [
      { role: "system", content: "SYSTEM PROMPT", cache_control: { type: "ephemeral" } } as any,
      { role: "user", content: "turn 1 question" },
      { role: "assistant", content: "turn 1 answer" },
      { role: "user", content: "turn 2 question" },
    ],
  };
}

describe("injectMemory cache-safe positioning (#3890)", () => {
  it("default (cacheSafe off) prepends memory at index 0 — unchanged legacy behavior", () => {
    const out = injectMemory(multiTurn(), [mem("dark mode")], "openai");
    assert.equal(out.messages[0].role, "system");
    assert.ok(out.messages[0].content.includes("Memory context"));
    assert.equal(out.messages[1].content, "SYSTEM PROMPT");
  });

  // Note: "openai" here stands in for any non-Claude-family provider that honors the
  // cache-safe mid-array splice (e.g. DashScope/Xiaomi MiMo via OpenAI-format
  // cache_control). Claude-family providers (anthropic/claude/CC-compatible) have their
  // own, narrower gate covered in the "#11290" describe block below.
  it("cacheSafe inserts memory just before the last user message, preserving the prefix", () => {
    const req = multiTurn();
    const prefixBefore = JSON.stringify(req.messages.slice(0, 3)); // sys, u1, a1
    const out = injectMemory(req, [mem("dark mode")], "openai", { cacheSafe: true });

    // The cacheable prefix (system + prior turns up to the last assistant) is byte-identical.
    assert.equal(JSON.stringify(out.messages.slice(0, 3)), prefixBefore);
    // Memory is injected right before the last user message...
    assert.equal(out.messages[3].role, "system");
    assert.ok(out.messages[3].content.includes("Memory context"));
    // ...and the last user message is preserved at the tail.
    assert.equal(out.messages[4].content, "turn 2 question");
    assert.equal(out.messages.length, 5);
    // Memory must NOT be at index 0 (that is what broke caching).
    assert.notEqual(out.messages[0].content, out.messages[3].content);
    assert.equal(out.messages[0].content, "SYSTEM PROMPT");
  });

  it("cacheSafe keeps the cacheable prefix identical across two turns despite different memories", () => {
    // Turn 1: [sys, u1]; Turn 2: [sys, u1, a1, u2]. Different memories retrieved per query.
    // Same conversation, observed on two consecutive turns.
    const turn1: ChatRequest = {
      model: "anthropic/claude-sonnet-4-6",
      messages: [
        { role: "system", content: "SYSTEM PROMPT", cache_control: { type: "ephemeral" } } as any,
        { role: "user", content: "turn 1 question" },
      ],
    };
    const turn2 = multiTurn();

    const out1 = injectMemory(turn1, [mem("A")], "openai", { cacheSafe: true });
    const out2 = injectMemory(turn2, [mem("B")], "openai", { cacheSafe: true });

    // The cache-breakpoint-bearing system message stays at the head, byte-identical, in
    // both turns (and is NOT displaced by the per-query memory) — so the prompt cache
    // created on turn 1 still matches on turn 2. (Memory is inserted before the last user
    // turn: [SYS, MEM_A, u1] and [SYS, u1, a1, MEM_B, u2] respectively.)
    assert.deepEqual(out1.messages[0], out2.messages[0]);
    assert.equal(out1.messages[0].content, "SYSTEM PROMPT");
    assert.equal((out1.messages[0] as any).cache_control?.type, "ephemeral");
    // In turn 2 the earlier turns up to the last assistant are preserved before memory.
    assert.equal(out2.messages[1].content, "turn 1 question");
    assert.equal(out2.messages[2].content, "turn 1 answer");
    assert.ok(out2.messages[3].content.includes("Memory context"));
    assert.equal(out2.messages[4].content, "turn 2 question");
  });

  it("cacheSafe falls back to leading injection when there is no user message", () => {
    const req: ChatRequest = {
      model: "anthropic/claude-sonnet-4-6",
      messages: [{ role: "system", content: "SYS" }],
    };
    const out = injectMemory(req, [mem("x")], "anthropic", { cacheSafe: true });
    assert.equal(out.messages[0].role, "system");
    assert.ok(out.messages[0].content.includes("Memory context"));
    assert.equal(out.messages[1].content, "SYS");
  });
});

/**
 * #11290: Claude Opus 5 tightened server-side validation and started rejecting the
 * #3890 cache-safe mid-array splice with HTTP 400 whenever the assistant turn
 * immediately before the splice point is a plain-text turn (not a server-side tool
 * result). These tests pin the narrower, Claude-family-only gate added to
 * `injectMemory()`: fall back to leading-system-message placement in that specific
 * case, while still honoring the mid-array splice everywhere it is safe (non-Claude
 * providers unconditionally, and Claude providers whose preceding turn IS a server
 * tool result).
 */
describe("injectMemory cache-safe positioning — Claude-family server-tool-result gate (#11290)", () => {
  it("falls back to leading system-message placement for anthropic when the preceding assistant turn is plain text", () => {
    const out = injectMemory(multiTurn(), [mem("dark mode")], "anthropic", { cacheSafe: true });

    // No splice: the memory is merged into the leading system message instead of being
    // inserted right after the plain-text "turn 1 answer" assistant turn.
    assert.equal(out.messages.length, 4);
    assert.equal(out.messages[0].role, "system");
    assert.ok(out.messages[0].content.includes("Memory context: dark mode"));
    assert.ok(out.messages[0].content.includes("SYSTEM PROMPT"));
    assert.equal(out.messages[1].content, "turn 1 question");
    assert.equal(out.messages[2].content, "turn 1 answer");
    assert.equal(out.messages[3].content, "turn 2 question");
  });

  it("still splices mid-array for anthropic when the preceding assistant turn ends in a server tool result", () => {
    const req: ChatRequest = {
      model: "anthropic/claude-opus-5",
      messages: [
        { role: "system", content: "SYSTEM PROMPT" },
        { role: "user", content: "turn 1 question" },
        {
          role: "assistant",
          content: [
            { type: "server_tool_use", id: "srvtoolu_1", name: "web_search", input: {} },
            { type: "web_search_tool_result", tool_use_id: "srvtoolu_1", content: [] },
          ],
        } as unknown as ChatRequest["messages"][number],
        { role: "user", content: "turn 2 question" },
      ],
    };

    const out = injectMemory(req, [mem("dark mode")], "anthropic", { cacheSafe: true });

    assert.equal(out.messages.length, 5);
    assert.equal(out.messages[0].content, "SYSTEM PROMPT");
    assert.equal(out.messages[3].role, "system");
    assert.ok(out.messages[3].content.includes("Memory context"));
    assert.equal(out.messages[4].content, "turn 2 question");
  });

  it("applies the same fallback to a Claude-Code-compatible passthrough provider id", () => {
    const out = injectMemory(multiTurn(), [mem("dark mode")], "anthropic-compatible-cc-github-copilot", {
      cacheSafe: true,
    });

    assert.equal(out.messages.length, 4);
    assert.equal(out.messages[0].role, "system");
    assert.ok(out.messages[0].content.includes("Memory context: dark mode"));
    assert.ok(out.messages[0].content.includes("SYSTEM PROMPT"));
  });

  it("does not gate non-Claude providers even without a server tool result", () => {
    const out = injectMemory(multiTurn(), [mem("dark mode")], "openai", { cacheSafe: true });

    // Unaffected by #11290: the mid-array splice is preserved for non-Claude providers.
    assert.equal(out.messages.length, 5);
    assert.equal(out.messages[3].role, "system");
    assert.ok(out.messages[3].content.includes("Memory context"));
    assert.equal(out.messages[4].content, "turn 2 question");
  });
});
