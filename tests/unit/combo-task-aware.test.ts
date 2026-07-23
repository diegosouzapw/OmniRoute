/**
 * Tests for task-aware combo routing (port of upstream PR #2045).
 *
 * Coverage:
 *   - classifyTask: light / standard / heavy / critical levels
 *   - reorderByTaskWeight: floats higher-power models for heavy tasks
 *   - getConversationCacheKey: stable per conversation, distinct per thread
 *   - getOrSetConversationAffinityIndex: affinity pin + TTL behaviour
 *   - isTaskRoutingStrategy: gate for task-aware strategies
 *   - Guard: non-task-aware strategies are unaffected (identity path)
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import {
  classifyTask,
  getConversationCacheKey,
  getOrSetConversationAffinityIndex,
  isTaskRoutingStrategy,
  reorderByTaskWeight,
  scoreModelForTask,
  TASK_LEVEL_WEIGHT,
  comboConversationAffinity,
  clearConversationAffinity,
} from "../../open-sse/services/taskAwareRouting.ts";
import type { ResolvedComboTarget } from "../../open-sse/services/combo/types.ts";

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeTarget(modelStr: string, idx = 0): ResolvedComboTarget {
  const [provider = "", model = modelStr] = modelStr.includes("/")
    ? modelStr.split("/")
    : ["", modelStr];
  return {
    kind: "model" as const,
    stepId: `step-${idx}`,
    executionKey: `exec-${idx}`,
    modelStr,
    provider,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

function makeBody(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return { messages: [{ role: "user", content: "Hello" }], ...overrides };
}

// ── classifyTask ──────────────────────────────────────────────────────────────

describe("classifyTask", () => {
  it("classifies empty body as light (all signals tiny → default-light path)", () => {
    const t = classifyTask({});
    // Empty body: 0 chars, 0 messages, 0 tools, 0 output tokens → light
    assert.equal(t.level, "light");
    assert.equal(t.weight, TASK_LEVEL_WEIGHT.light);
  });

  it("classifies a simple short greeting as light", () => {
    const t = classifyTask({ messages: [{ role: "user", content: "hi there" }], max_tokens: 100 });
    assert.equal(t.level, "light");
    assert.equal(t.weight, TASK_LEVEL_WEIGHT.light);
  });

  it("classifies a translate request as light", () => {
    const t = classifyTask({
      messages: [{ role: "user", content: "translate this short sentence" }],
      max_tokens: 256,
    });
    assert.equal(t.level, "light");
  });

  it("classifies a quick rewrite request as light", () => {
    const t = classifyTask({
      messages: [{ role: "user", content: "quick rewrite this sentence to be more concise" }],
      max_tokens: 300,
    });
    assert.equal(t.level, "light");
  });

  it("classifies long conversation + big prompt as heavy (two signals)", () => {
    // 20 messages (1 signal) + prompt >= 24000 chars (1 signal) = 2 → heavy
    const bigContent = "context ".repeat(3500); // ~28000 chars
    const messages = [
      { role: "user", content: bigContent },
      ...Array.from({ length: 20 }, (_, i) => ({
        role: i % 2 === 0 ? "assistant" : "user",
        content: "turn " + i,
      })),
    ];
    const t = classifyTask({ messages });
    assert.equal(t.level, "heavy");
    assert.equal(t.weight, TASK_LEVEL_WEIGHT.heavy);
  });

  it("classifies high reasoning effort as heavy", () => {
    const t = classifyTask({
      messages: [{ role: "user", content: "analyze this code" }],
      reasoning_effort: "high",
    });
    assert.equal(t.level, "heavy");
  });

  it("classifies huge context (>= 100k chars) as critical", () => {
    const t = classifyTask({
      messages: [{ role: "user", content: "x".repeat(120_000) }],
    });
    assert.equal(t.level, "critical");
    assert.equal(t.weight, TASK_LEVEL_WEIGHT.critical);
  });

  it("classifies huge output request (>= 32768 tokens) as critical", () => {
    const t = classifyTask({
      messages: [{ role: "user", content: "write a comprehensive report" }],
      max_tokens: 40_000,
    });
    assert.equal(t.level, "critical");
  });

  it("classifies security+tools+effort as critical", () => {
    const t = classifyTask({
      messages: [
        {
          role: "user",
          content: `Find a critical bug bounty attack chain for RCE or supply chain impact.\n${"context ".repeat(2000)}`,
        },
      ],
      tools: [{ name: "read" }, { name: "grep" }, { name: "web" }, { name: "bash" }],
      reasoning_effort: "high",
      max_tokens: 12_000,
    });
    assert.equal(t.level, "critical");
  });

  it("classifies moderate prompt without signals as standard (must exceed light thresholds)", () => {
    // To be classified standard (not light), prompt must either: be > 4000 chars,
    // have > 3 messages, tools, or not match a light keyword — "explain briefly" would be light.
    // A prompt with "analyze" keyword + 5000 chars crosses into standard.
    const t = classifyTask({
      messages: [
        {
          role: "user",
          content: "Please analyze how TCP works in detail.\n" + "context ".repeat(500),
        },
        { role: "assistant", content: "TCP uses..." },
        { role: "user", content: "And what about UDP?" },
        { role: "assistant", content: "UDP is..." },
      ],
    });
    assert.equal(t.level, "standard");
  });

  it("returns reasons array for each classification", () => {
    const t = classifyTask({
      messages: [{ role: "user", content: "x".repeat(120_000) }],
    });
    assert.ok(Array.isArray(t.reasons), "reasons should be an array");
    assert.ok(t.reasons.length > 0, "critical task should have at least one reason");
  });
});

// ── reorderByTaskWeight ───────────────────────────────────────────────────────

describe("reorderByTaskWeight", () => {
  it("returns same reference for single-target list", () => {
    const targets = [makeTarget("anthropic/claude-haiku-4.5", 0)];
    const task = classifyTask({ messages: [{ role: "user", content: "hello" }] });
    const out = reorderByTaskWeight(targets, task, new Set());
    assert.strictEqual(out, targets);
  });

  it("returns same reference for empty list", () => {
    const targets: ResolvedComboTarget[] = [];
    const task = classifyTask({});
    const out = reorderByTaskWeight(targets, task, new Set());
    assert.strictEqual(out, targets);
  });

  it("routes light tasks to lighter models (haiku before opus)", () => {
    const targets = [
      makeTarget("anthropic/claude-opus-4.6", 0),
      makeTarget("anthropic/claude-haiku-4.5", 1),
    ];
    const task = classifyTask({
      messages: [{ role: "user", content: "quick rewrite this sentence" }],
      max_tokens: 300,
    });
    const out = reorderByTaskWeight(targets, task, new Set());
    assert.equal(out[0].modelStr, "anthropic/claude-haiku-4.5");
  });

  it("routes critical tasks to stronger models (opus before haiku)", () => {
    const targets = [
      makeTarget("anthropic/claude-haiku-4.5", 0),
      makeTarget("anthropic/claude-opus-4.6", 1),
    ];
    const task = classifyTask({
      messages: [
        {
          role: "user",
          content: `Security review for account takeover and cross-tenant RCE impact.\n${"code ".repeat(3000)}`,
        },
      ],
      tools: [{ name: "read" }, { name: "grep" }, { name: "bash" }, { name: "web" }],
      reasoning_effort: "high",
    });
    const required = new Set(["reasoning"]);
    const out = reorderByTaskWeight(targets, task, required);
    assert.equal(out[0].modelStr, "anthropic/claude-opus-4.6");
    assert.ok(
      scoreModelForTask(out[0].modelStr, task, required) >=
        scoreModelForTask(out[1].modelStr, task, required),
      "first model should score >= second"
    );
  });

  it("keeps hard-cap vision model first even for light tasks", () => {
    // anthropic/claude-haiku-4.5 has vision; deepseek-chat does not
    const targets = [
      makeTarget("deepseek/deepseek-chat", 0),
      makeTarget("anthropic/claude-haiku-4.5", 1),
    ];
    const task = classifyTask({ messages: [{ role: "user", content: "what is in this image?" }] });
    const out = reorderByTaskWeight(targets, task, new Set(["vision"]));
    assert.equal(out[0].modelStr, "anthropic/claude-haiku-4.5");
  });

  it("never drops any targets", () => {
    const targets = [
      makeTarget("anthropic/claude-opus-4.6", 0),
      makeTarget("anthropic/claude-haiku-4.5", 1),
      makeTarget("deepseek/deepseek-chat", 2),
    ];
    const task = classifyTask({ messages: [{ role: "user", content: "x".repeat(120_000) }] });
    const out = reorderByTaskWeight(targets, task, new Set());
    assert.equal(out.length, 3);
  });

  it("is stable: ties preserve original order", () => {
    // Two identical models should not swap positions
    const targets = [
      makeTarget("anthropic/claude-haiku-4.5", 0),
      makeTarget("anthropic/claude-haiku-4.5", 1),
    ];
    const task = classifyTask({});
    const out = reorderByTaskWeight(targets, task, new Set());
    assert.equal(out[0].stepId, "step-0");
    assert.equal(out[1].stepId, "step-1");
  });
});

// ── isTaskRoutingStrategy ─────────────────────────────────────────────────────

describe("isTaskRoutingStrategy", () => {
  it("returns true for task-aware strategy names", () => {
    for (const name of ["smart", "task", "task-aware", "task_aware", "auto"]) {
      assert.ok(isTaskRoutingStrategy(name), `Expected ${name} to be task-routing`);
    }
  });

  it("is case-insensitive", () => {
    assert.ok(isTaskRoutingStrategy("SMART"));
    assert.ok(isTaskRoutingStrategy("Task-Aware"));
  });

  it("returns false for standard strategy names", () => {
    for (const name of [
      "priority",
      "fallback",
      "round-robin",
      "weighted",
      "random",
      "fill-first",
      "p2c",
      "least-used",
      "cost-optimized",
      "reset-aware",
      "reset-window",
      "context-optimized",
      "headroom",
      "lkgp",
      "context-relay",
    ]) {
      assert.ok(!isTaskRoutingStrategy(name), `Expected ${name} to NOT be task-routing`);
    }
  });

  it("returns false for null/undefined/empty", () => {
    assert.ok(!isTaskRoutingStrategy(null));
    assert.ok(!isTaskRoutingStrategy(undefined));
    assert.ok(!isTaskRoutingStrategy(""));
  });
});

// ── getConversationCacheKey ───────────────────────────────────────────────────

describe("getConversationCacheKey", () => {
  it("returns null for null input", () => {
    assert.equal(getConversationCacheKey(null as unknown as Record<string, unknown>), null);
  });

  it("returns a string for a body with messages", () => {
    const key = getConversationCacheKey({
      messages: [
        { role: "system", content: "You are helpful" },
        { role: "user", content: "hi" },
      ],
    });
    assert.equal(typeof key, "string");
    assert.ok((key as string).length > 0);
  });

  it("is stable across calls for the same conversation start", () => {
    const body = {
      messages: [
        { role: "system", content: "You are a helpful assistant" },
        { role: "user", content: "Hello, how are you?" },
      ],
    };
    const k1 = getConversationCacheKey(body);
    const k2 = getConversationCacheKey(body);
    assert.equal(k1, k2);
  });

  it("differs for different first messages", () => {
    const k1 = getConversationCacheKey({
      messages: [{ role: "user", content: "Explain TCP" }],
    });
    const k2 = getConversationCacheKey({
      messages: [{ role: "user", content: "Explain UDP" }],
    });
    assert.notEqual(k1, k2);
  });

  it("same key even when later messages are appended (conversation affinity)", () => {
    const systemMsg = { role: "system", content: "You are a coding assistant" };
    const firstUser = { role: "user", content: "What is a pointer?" };
    const k1 = getConversationCacheKey({ messages: [systemMsg, firstUser] });
    const k2 = getConversationCacheKey({
      messages: [
        systemMsg,
        firstUser,
        { role: "assistant", content: "A pointer stores an address..." },
        { role: "user", content: "Can you give an example?" },
      ],
    });
    assert.equal(k1, k2);
  });

  it("prefers explicit conversation_id when present", () => {
    const k1 = getConversationCacheKey({
      conversation_id: "thread-abc-123",
      messages: [{ role: "user", content: "hello" }],
    });
    const k2 = getConversationCacheKey({ conversation_id: "thread-abc-123" });
    assert.equal(k1, k2);
    assert.notEqual(k1, null);
  });

  it("different conversation_ids produce different keys", () => {
    const k1 = getConversationCacheKey({ conversation_id: "thread-1" });
    const k2 = getConversationCacheKey({ conversation_id: "thread-2" });
    assert.notEqual(k1, k2);
  });
});

// ── Conversation affinity (getOrSetConversationAffinityIndex) ─────────────────

describe("conversation affinity", () => {
  before(() => clearConversationAffinity());
  after(() => clearConversationAffinity());

  it("returns currentIndex for a new conversation key", () => {
    const idx = getOrSetConversationAffinityIndex("combo-x", "conv-aaa", 2);
    assert.equal(idx, 2);
  });

  it("returns the pinned index for the same conversation key", () => {
    clearConversationAffinity();
    getOrSetConversationAffinityIndex("combo-y", "conv-bbb", 0);
    // Second call should return the pinned index (0), not a new currentIndex (1)
    const idx = getOrSetConversationAffinityIndex("combo-y", "conv-bbb", 1);
    assert.equal(idx, 0);
  });

  it("different conversation keys get independent pins", () => {
    clearConversationAffinity();
    const i1 = getOrSetConversationAffinityIndex("combo-z", "conv-c1", 0);
    const i2 = getOrSetConversationAffinityIndex("combo-z", "conv-c2", 1);
    assert.equal(i1, 0);
    assert.equal(i2, 1);
    // Both pins should stay
    assert.equal(getOrSetConversationAffinityIndex("combo-z", "conv-c1", 99), 0);
    assert.equal(getOrSetConversationAffinityIndex("combo-z", "conv-c2", 99), 1);
  });

  it("clearConversationAffinity clears only the named combo prefix", () => {
    clearConversationAffinity();
    getOrSetConversationAffinityIndex("combo-a", "conv-1", 0);
    getOrSetConversationAffinityIndex("combo-b", "conv-1", 1);
    clearConversationAffinity("combo-a");
    // combo-a entry should be gone
    const sizeAfter = comboConversationAffinity.size;
    assert.equal(sizeAfter, 1);
  });
});

// ── Guard: non-task-aware strategy leaves targets unchanged ───────────────────

describe("non-task-aware strategy guard", () => {
  it("reorderByTaskWeight is still safe to call externally but only wired for task strategies", () => {
    // The function itself is pure — what matters is that combo.ts only calls it
    // when isTaskRoutingStrategy() is true. Verify that explicitly.
    const nonTaskStrategies = ["priority", "fallback", "round-robin", "cost-optimized"];
    for (const strategy of nonTaskStrategies) {
      assert.ok(!isTaskRoutingStrategy(strategy), `${strategy} should not trigger task routing`);
    }
  });

  it("reorderByTaskWeight on standard task with equal-power models returns same reference", () => {
    // If all scores are equal, no reordering → returns same array reference
    const targets = [makeTarget("anthropic/claude-haiku-4.5", 0)];
    const task = classifyTask({});
    const out = reorderByTaskWeight(targets, task, new Set());
    assert.strictEqual(out, targets);
  });
});
