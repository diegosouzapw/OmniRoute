/**
 * Tests for #6135: cache-safe memory injection inserts a system message at a
 * non-zero index, which strict providers (e.g. xiaomi-mimo / alias `mimo`,
 * serving mimo-v2.5) reject with HTTP 400.
 *
 * For providers flagged system-message-must-be-first, the injected system
 * message MUST remain at index 0 (merged into an existing leading system
 * message, or prepended) instead of being spliced before the last user turn.
 * Non-flagged providers keep the existing cache-safe placement unchanged.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  injectMemory,
  systemMessageMustBeFirst,
} from "../../src/lib/memory/injection.ts";
import type { ChatMessage, ChatRequest } from "../../src/lib/memory/injection.ts";
import { MemoryType } from "../../src/lib/memory/types.ts";
import type { Memory } from "../../src/lib/memory/types.ts";

function mem(content: string): Memory {
  return {
    id: `mem-${content}`,
    content,
    type: MemoryType.FACTUAL,
    apiKeyId: "k",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    importance: 0.5,
  } as unknown as Memory;
}

// Multi-turn conversation with >= 2 user turns → findLastIndex(user) > 0.
function multiTurn(): ChatRequest {
  return {
    model: "mimo-v2.5",
    messages: [
      { role: "system", content: "SYSTEM PROMPT" } as ChatMessage,
      { role: "user", content: "turn 1 question" },
      { role: "assistant", content: "turn 1 answer" },
      { role: "user", content: "turn 2 question" },
    ],
  };
}

describe("injectMemory system-must-be-first (#6135)", () => {
  it("flags xiaomi-mimo (and alias mimo) as system-must-be-first", () => {
    assert.equal(systemMessageMustBeFirst("xiaomi-mimo"), true);
    assert.equal(systemMessageMustBeFirst("mimo"), true);
    // default: unlisted providers keep current (non-first-constrained) behavior
    assert.equal(systemMessageMustBeFirst("anthropic"), false);
    assert.equal(systemMessageMustBeFirst(null), false);
  });

  it("keeps the injected system message at index 0 for a flagged provider even under cacheSafe", () => {
    const out = injectMemory(multiTurn(), [mem("dark mode")], "xiaomi-mimo", {
      cacheSafe: true,
    });

    // The system message must be first...
    assert.equal(
      out.messages.findIndex((m) => m.role === "system"),
      0
    );
    // ...and there must be NO system message at any index > 0.
    const strayIdx = out.messages.findIndex((m, i) => i > 0 && m.role === "system");
    assert.equal(strayIdx, -1);
    // Memory context is present in the leading system message.
    assert.ok(out.messages[0].content.includes("Memory context"));
    assert.ok(out.messages[0].content.includes("dark mode"));
  });

  it("merges memory into an existing leading system message (single system, still first)", () => {
    const out = injectMemory(multiTurn(), [mem("dark mode")], "mimo", {
      cacheSafe: true,
    });
    // Exactly one system message, at index 0, carrying both memory + original.
    const systemCount = out.messages.filter((m) => m.role === "system").length;
    assert.equal(systemCount, 1);
    assert.equal(out.messages[0].role, "system");
    assert.ok(out.messages[0].content.includes("Memory context"));
    assert.ok(out.messages[0].content.includes("SYSTEM PROMPT"));
    // Last user turn preserved at the tail.
    assert.equal(out.messages[out.messages.length - 1].content, "turn 2 question");
  });

  it("prepends a leading system message when there is no existing one (flagged provider)", () => {
    const req: ChatRequest = {
      model: "mimo-v2.5",
      messages: [
        { role: "user", content: "turn 1 question" },
        { role: "assistant", content: "turn 1 answer" },
        { role: "user", content: "turn 2 question" },
      ],
    };
    const out = injectMemory(req, [mem("dark mode")], "xiaomi-mimo", { cacheSafe: true });
    assert.equal(out.messages[0].role, "system");
    assert.ok(out.messages[0].content.includes("Memory context"));
    assert.equal(
      out.messages.findIndex((m, i) => i > 0 && m.role === "system"),
      -1
    );
  });

  it("regression: a NON-flagged provider keeps the existing cache-safe placement", () => {
    const req = multiTurn();
    const out = injectMemory(req, [mem("dark mode")], "anthropic", { cacheSafe: true });
    // Existing behavior: memory inserted just before the last user message (index 3).
    assert.equal(out.messages[3].role, "system");
    assert.ok(out.messages[3].content.includes("Memory context"));
    assert.equal(out.messages[4].content, "turn 2 question");
    assert.equal(out.messages.length, 5);
  });
});
