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
import { injectMemory } from "../../src/lib/memory/injection.ts";
import type { ChatRequest } from "../../src/lib/memory/injection.ts";
import type { Memory } from "../../src/lib/memory/types.ts";

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
    const out = injectMemory(multiTurn(), [mem("dark mode")], "anthropic");
    assert.equal(out.messages[0].role, "system");
    assert.ok(out.messages[0].content.includes("Memory context"));
    assert.equal(out.messages[1].content, "SYSTEM PROMPT");
  });

  it("cacheSafe inserts memory just before the last user message, preserving the prefix", () => {
    const req = multiTurn();
    const prefixBefore = JSON.stringify(req.messages.slice(0, 3)); // sys, u1, a1
    const out = injectMemory(req, [mem("dark mode")], "anthropic", { cacheSafe: true });

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

    const out1 = injectMemory(turn1, [mem("A")], "anthropic", { cacheSafe: true });
    const out2 = injectMemory(turn2, [mem("B")], "anthropic", { cacheSafe: true });

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

  // ── #6135: systemMessageMustBeFirst for strict providers ──

  it("cacheSafe + non-strict provider injects memory mid-array (lenient path)", () => {
    const req = multiTurn();
    const out = injectMemory(req, [mem("dark mode")], "anthropic", {
      cacheSafe: true,
      systemMessageMustBeFirst: false,
    });
    // Lenient: memory inserted before last user message, NOT at index 0
    assert.equal(out.messages[0].content, "SYSTEM PROMPT");
    assert.equal(out.messages[3].role, "system");
    assert.ok(out.messages[3].content.includes("Memory context"));
    assert.equal(out.messages[4].content, "turn 2 question");
  });

  it("cacheSafe + strict provider merges memory into existing system[0]", () => {
    const req = multiTurn(); // [sys, u1, a1, u2]
    const out = injectMemory(req, [mem("dark mode")], "xiaomi-mimo", {
      cacheSafe: true,
      systemMessageMustBeFirst: true,
    });
    // Memory merged into the existing system message at index 0
    assert.equal(out.messages.length, 4, "no extra message added — merged into system[0]");
    assert.equal(out.messages[0].role, "system");
    assert.ok(out.messages[0].content.includes("Memory context"));
    assert.ok(out.messages[0].content.includes("SYSTEM PROMPT"));
    // No system message exists after index 0
    const systemRolesAfterZero = out.messages.slice(1).filter((m) => m.role === "system");
    assert.equal(systemRolesAfterZero.length, 0, "no system messages after index 0");
    // Rest of conversation preserved
    assert.equal(out.messages[1].content, "turn 1 question");
    assert.equal(out.messages[2].content, "turn 1 answer");
    assert.equal(out.messages[3].content, "turn 2 question");
  });

  it("cacheSafe + strict provider unshifts when no system message at index 0", () => {
    const req: ChatRequest = {
      model: "xiaomi-mimo/mimo-v2.5-pro",
      messages: [
        { role: "user", content: "turn 1 question" },
        { role: "assistant", content: "turn 1 answer" },
        { role: "user", content: "turn 2 question" },
      ],
    };
    const out = injectMemory(req, [mem("context")], "xiaomi-mimo", {
      cacheSafe: true,
      systemMessageMustBeFirst: true,
    });
    // Memory unshifted to index 0 as a new system message
    assert.equal(out.messages[0].role, "system");
    assert.ok(out.messages[0].content.includes("Memory context"));
    assert.equal(out.messages[1].content, "turn 1 question");
    assert.equal(out.messages[2].content, "turn 1 answer");
    assert.equal(out.messages[3].content, "turn 2 question");
    // No system messages after index 0
    const systemRolesAfterZero = out.messages.slice(1).filter((m) => m.role === "system");
    assert.equal(systemRolesAfterZero.length, 0, "no system messages after index 0");
  });

  it("strict provider without cacheSafe still enforces system at index 0", () => {
    const req = multiTurn(); // [sys, u1, a1, u2]
    const out = injectMemory(req, [mem("fact")], "xiaomi-mimo", {
      systemMessageMustBeFirst: true,
    });
    // Memory merged into existing system message at index 0
    assert.equal(out.messages[0].role, "system");
    assert.ok(out.messages[0].content.includes("Memory context"));
    assert.ok(out.messages[0].content.includes("SYSTEM PROMPT"));
    // Merged — same message count as input
    assert.equal(out.messages.length, 4);
    // No system messages after index 0
    const systemRolesAfterZero = out.messages.slice(1).filter((m) => m.role === "system");
    assert.equal(systemRolesAfterZero.length, 0, "no system messages after index 0");
  });
});
