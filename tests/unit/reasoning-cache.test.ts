/**
 * Unit tests for the Reasoning Replay Cache (Issue #1628).
 *
 * Covers: memory cache, DB fallback, hit/miss counters,
 * provider detection, and cleanup behavior.
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";

import { mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-reasoning-"));

// ──────────── Direct service import ────────────

import {
  cacheReasoningFromAssistantMessage,
  cacheReasoning,
  cacheReasoningBatch,
  deleteReasoningCacheEntry,
  getReasoningCacheServiceEntries,
  lookupReasoning,
  recordReplay,
  getReasoningCacheServiceStats,
  clearReasoningCacheAll,
  requiresReasoningReplay,
  cleanupReasoningCache,
} from "../../open-sse/services/reasoningCache.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { getDbInstance } from "../../src/lib/db/core.ts";
import { getReasoningCache, setReasoningCache } from "../../src/lib/db/reasoningCache.ts";
import { DELETE, GET } from "../../src/app/api/cache/reasoning/route.ts";
import { updateSettings } from "../../src/lib/db/settings";

before(async () => {
  await updateSettings({ requireLogin: false });
});

after(async () => {
  await updateSettings({ requireLogin: true });
});

describe("Reasoning Replay Cache — Service Layer", () => {
  before(() => {
    // Start each suite with a clean slate
    clearReasoningCacheAll();
  });

  after(() => {
    clearReasoningCacheAll();
  });

  it("should store and retrieve reasoning by tool_call_id", () => {
    cacheReasoning(
      "call_test_1",
      "deepseek",
      "deepseek-reasoner",
      "The user wants to read the file..."
    );
    const result = lookupReasoning("call_test_1");
    assert.equal(result, "The user wants to read the file...");
    assert.equal(getReasoningCache("call_test_1")?.reasoning, "The user wants to read the file...");
  });

  it("should fall back to SQLite when memory misses", () => {
    clearReasoningCacheAll();
    setReasoningCache("call_db_only", "deepseek", "deepseek-reasoner", "DB-only reasoning");

    assert.equal(lookupReasoning("call_db_only"), "DB-only reasoning");

    const stats = getReasoningCacheServiceStats();
    assert.equal(stats.hits, 1);
    assert.equal(stats.memoryEntries, 1);
    assert.equal(stats.dbEntries, 1);
  });

  it("should return null for unknown tool_call_id", () => {
    const result = lookupReasoning("call_nonexistent");
    assert.equal(result, null);
  });

  it("should return null for empty tool_call_id", () => {
    const result = lookupReasoning("");
    assert.equal(result, null);
  });

  it("should skip caching when reasoning is empty", () => {
    cacheReasoning("call_empty", "deepseek", "deepseek-chat", "");
    const result = lookupReasoning("call_empty");
    assert.equal(result, null);
  });

  it("should cache reasoning for multiple tool_call_ids (batch)", () => {
    cacheReasoningBatch(
      ["call_batch_1", "call_batch_2", "call_batch_3"],
      "deepseek",
      "deepseek-reasoner",
      "Batch reasoning content"
    );
    assert.equal(lookupReasoning("call_batch_1"), "Batch reasoning content");
    assert.equal(lookupReasoning("call_batch_2"), "Batch reasoning content");
    assert.equal(lookupReasoning("call_batch_3"), "Batch reasoning content");
  });

  it("should capture assistant reasoning for all tool_call IDs", () => {
    clearReasoningCacheAll();

    const cached = cacheReasoningFromAssistantMessage(
      {
        role: "assistant",
        reasoning_content: "Captured assistant reasoning",
        tool_calls: [{ id: "call_capture_1" }, { id: "call_capture_2" }],
      },
      "deepseek",
      "deepseek-reasoner"
    );

    assert.equal(cached, 2);
    assert.equal(lookupReasoning("call_capture_1"), "Captured assistant reasoning");
    assert.equal(lookupReasoning("call_capture_2"), "Captured assistant reasoning");
  });

  it("should capture provider reasoning alias when reasoning_content is absent", () => {
    clearReasoningCacheAll();

    const cached = cacheReasoningFromAssistantMessage(
      {
        role: "assistant",
        reasoning: "Alias reasoning",
        tool_calls: [{ id: "call_capture_alias" }],
      },
      "kimi",
      "kimi-k2.5"
    );

    assert.equal(cached, 1);
    assert.equal(lookupReasoning("call_capture_alias"), "Alias reasoning");
  });

  it("should not overwrite if same tool_call_id is cached again", () => {
    cacheReasoning("call_overwrite", "deepseek", "deepseek-chat", "First reasoning");
    cacheReasoning("call_overwrite", "deepseek", "deepseek-chat", "Updated reasoning");
    // Second write wins (INSERT OR REPLACE)
    const result = lookupReasoning("call_overwrite");
    assert.equal(result, "Updated reasoning");
  });

  it("should track hits and misses correctly", () => {
    clearReasoningCacheAll();

    cacheReasoning("call_hit_test", "deepseek", "deepseek-chat", "test reasoning");

    lookupReasoning("call_hit_test"); // hit
    lookupReasoning("call_hit_test"); // hit
    lookupReasoning("call_miss_test"); // miss

    const stats = getReasoningCacheServiceStats();
    assert.ok(stats.hits >= 2, `Expected at least 2 hits, got ${stats.hits}`);
    assert.ok(stats.misses >= 1, `Expected at least 1 miss, got ${stats.misses}`);
  });

  it("should track replays", () => {
    clearReasoningCacheAll();

    recordReplay();
    recordReplay();
    recordReplay();

    const stats = getReasoningCacheServiceStats();
    assert.ok(stats.replays >= 3, `Expected at least 3 replays, got ${stats.replays}`);
  });

  it("should report correct stats structure", () => {
    clearReasoningCacheAll();

    cacheReasoning("call_stat_1", "deepseek", "deepseek-reasoner", "Reasoning A");
    cacheReasoning("call_stat_2", "kimi", "kimi-k2.5", "Reasoning B from Kimi");

    const stats = getReasoningCacheServiceStats();

    assert.equal(typeof stats.memoryEntries, "number");
    assert.equal(typeof stats.dbEntries, "number");
    assert.equal(typeof stats.totalEntries, "number");
    assert.equal(typeof stats.totalChars, "number");
    assert.equal(typeof stats.hits, "number");
    assert.equal(typeof stats.misses, "number");
    assert.equal(typeof stats.replays, "number");
    assert.equal(typeof stats.replayRate, "string");
    assert.ok(stats.replayRate.endsWith("%"));
    assert.equal(typeof stats.byProvider, "object");
    assert.equal(typeof stats.byModel, "object");
    assert.equal(stats.dbEntries, 2);
    assert.equal(stats.byProvider.deepseek.entries, 1);
    assert.equal(stats.byProvider.kimi.entries, 1);
  });

  it("should list persisted entries for the dashboard API", () => {
    clearReasoningCacheAll();

    cacheReasoning("call_entry_1", "deepseek", "deepseek-reasoner", "Entry reasoning A");
    cacheReasoning("call_entry_2", "kimi", "kimi-k2.5", "Entry reasoning B");

    const deepseekEntries = getReasoningCacheServiceEntries({ provider: "deepseek" }) as Array<{
      toolCallId: string;
      expiresAt: string;
    }>;

    assert.equal(deepseekEntries.length, 1);
    assert.equal(deepseekEntries[0].toolCallId, "call_entry_1");
    assert.doesNotThrow(() => new Date(deepseekEntries[0].expiresAt).toISOString());
  });

  it("should clear all entries", () => {
    cacheReasoning("call_clear_1", "deepseek", "deepseek-chat", "Will be cleared");
    cacheReasoning("call_clear_2", "deepseek", "deepseek-chat", "Also cleared");

    const count = clearReasoningCacheAll();
    assert.ok(count >= 0);

    assert.equal(lookupReasoning("call_clear_1"), null);
    assert.equal(lookupReasoning("call_clear_2"), null);
  });

  it("should delete one entry by tool_call_id", () => {
    clearReasoningCacheAll();

    cacheReasoning("call_delete_1", "deepseek", "deepseek-chat", "Delete me");
    cacheReasoning("call_delete_2", "deepseek", "deepseek-chat", "Keep me");

    assert.equal(deleteReasoningCacheEntry("call_delete_1"), 1);
    assert.equal(lookupReasoning("call_delete_1"), null);
    assert.equal(lookupReasoning("call_delete_2"), "Keep me");
  });

  it("should clear entries by provider only", () => {
    clearReasoningCacheAll();

    cacheReasoning("call_provider_ds", "deepseek", "deepseek-chat", "DeepSeek reasoning");
    cacheReasoning("call_provider_kimi", "kimi", "kimi-k2.5", "Kimi reasoning");

    assert.equal(clearReasoningCacheAll("deepseek"), 1);
    assert.equal(lookupReasoning("call_provider_ds"), null);
    assert.equal(lookupReasoning("call_provider_kimi"), "Kimi reasoning");
  });

  it("should cleanup expired reasoning (no-op when nothing expired)", () => {
    cacheReasoning("call_cleanup_test", "deepseek", "deepseek-chat", "Not expired yet");
    const cleaned = cleanupReasoningCache();
    assert.equal(typeof cleaned, "number");
    // Entry should still be available since TTL is 2 hours
    assert.equal(lookupReasoning("call_cleanup_test"), "Not expired yet");
  });

  it("should not return expired SQLite entries and cleanup should prune them", () => {
    clearReasoningCacheAll();
    setReasoningCache("call_expired", "deepseek", "deepseek-chat", "Expired reasoning", -1_000);

    assert.equal(lookupReasoning("call_expired"), null);
    assert.equal(cleanupReasoningCache(), 1);
    assert.equal(getReasoningCacheServiceStats().dbEntries, 0);
  });

  it("should read and prune legacy ISO expires_at rows", () => {
    clearReasoningCacheAll();

    const db = getDbInstance();
    const futureIso = new Date(Date.now() + 60_000).toISOString();
    const expiredIso = new Date(Date.now() - 60_000).toISOString();
    db.prepare(
      `INSERT INTO reasoning_cache
         (tool_call_id, provider, model, reasoning, char_count, created_at, expires_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'), ?)`
    ).run(
      "call_legacy_iso_active",
      "deepseek",
      "deepseek-chat",
      "Legacy ISO reasoning",
      "Legacy ISO reasoning".length,
      futureIso
    );
    db.prepare(
      `INSERT INTO reasoning_cache
         (tool_call_id, provider, model, reasoning, char_count, created_at, expires_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'), ?)`
    ).run(
      "call_legacy_iso_expired",
      "deepseek",
      "deepseek-chat",
      "Expired legacy ISO reasoning",
      "Expired legacy ISO reasoning".length,
      expiredIso
    );

    assert.equal(lookupReasoning("call_legacy_iso_active"), "Legacy ISO reasoning");
    assert.equal(lookupReasoning("call_legacy_iso_expired"), null);
    const entries = getReasoningCacheServiceEntries({ provider: "deepseek" }) as Array<{
      toolCallId: string;
      expiresAt: string;
    }>;
    assert.equal(
      entries.some((entry) => entry.expiresAt === futureIso),
      true
    );
    assert.equal(cleanupReasoningCache(), 1);
  });
});

describe("Reasoning Replay Cache — Provider Detection", () => {
  it("should detect deepseek as requiring replay", () => {
    assert.equal(requiresReasoningReplay("deepseek", "deepseek-chat"), true);
  });

  it("should detect opencode-go as requiring replay", () => {
    assert.equal(requiresReasoningReplay("opencode-go", "some-model"), true);
  });

  it("should detect siliconflow as requiring replay", () => {
    assert.equal(requiresReasoningReplay("siliconflow", "deepseek-r1"), true);
  });

  it("should detect deepseek-r1 model pattern", () => {
    assert.equal(requiresReasoningReplay("unknown-provider", "deepseek-r1"), true);
  });

  it("should detect deepseek-reasoner model pattern", () => {
    assert.equal(requiresReasoningReplay("unknown-provider", "deepseek-reasoner"), true);
  });

  it("should detect kimi-k2 model pattern", () => {
    assert.equal(requiresReasoningReplay("unknown-provider", "kimi-k2.5"), true);
  });

  it("should detect qwq model pattern", () => {
    assert.equal(requiresReasoningReplay("unknown-provider", "qwq-32b-preview"), true);
  });

  it("should detect qwen-thinking model pattern", () => {
    assert.equal(requiresReasoningReplay("unknown-provider", "qwen3-thinking-235b"), true);
  });

  it("should detect GLM thinking model pattern", () => {
    assert.equal(requiresReasoningReplay("glm", "glm-5-thinking"), true);
  });

  it("should NOT detect a generic openai model", () => {
    assert.equal(requiresReasoningReplay("openai", "gpt-4o"), false);
  });

  it("should NOT detect claude as requiring replay", () => {
    assert.equal(requiresReasoningReplay("anthropic", "claude-opus-4"), false);
  });
});

describe("Reasoning Replay Cache — Translator Replay", () => {
  before(() => {
    clearReasoningCacheAll();
  });

  after(() => {
    clearReasoningCacheAll();
  });

  function translateWithToolHistory(provider: string, model: string, callId: string) {
    return translateRequest(
      FORMATS.OPENAI,
      FORMATS.OPENAI,
      model,
      {
        messages: [
          { role: "user", content: "use a tool" },
          {
            role: "assistant",
            content: null,
            tool_calls: [
              { id: callId, type: "function", function: { name: "read_file", arguments: "{}" } },
            ],
          },
          { role: "tool", tool_call_id: callId, content: "tool result" },
        ],
      },
      false,
      null,
      provider
    );
  }

  it("should inject cached reasoning for DeepSeek instead of empty fallback", () => {
    clearReasoningCacheAll();
    cacheReasoning("call_translate_ds", "deepseek", "deepseek-reasoner", "DeepSeek cached plan");

    const translated = translateWithToolHistory(
      "deepseek",
      "deepseek-reasoner",
      "call_translate_ds"
    );

    assert.equal(translated.messages[1].reasoning_content, "DeepSeek cached plan");
    assert.equal(getReasoningCacheServiceStats().replays, 1);
  });

  it("should preserve client-provided reasoning content", () => {
    clearReasoningCacheAll();
    cacheReasoning("call_preserve", "deepseek", "deepseek-reasoner", "Cached reasoning");

    const translated = translateRequest(
      FORMATS.OPENAI,
      FORMATS.OPENAI,
      "deepseek-reasoner",
      {
        messages: [
          { role: "user", content: "use a tool" },
          {
            role: "assistant",
            content: null,
            reasoning_content: "Client reasoning",
            tool_calls: [
              {
                id: "call_preserve",
                type: "function",
                function: { name: "tool", arguments: "{}" },
              },
            ],
          },
        ],
      },
      false,
      null,
      "deepseek"
    );

    assert.equal(translated.messages[1].reasoning_content, "Client reasoning");
    assert.equal(getReasoningCacheServiceStats().replays, 0);
  });

  it("should inject cached reasoning for Qwen and GLM thinking models", () => {
    clearReasoningCacheAll();
    cacheReasoning("call_qwen_think", "qwen", "qwen3-thinking-235b", "Qwen cached plan");
    cacheReasoning("call_glm_think", "glm", "glm-5-thinking", "GLM cached plan");

    const qwen = translateWithToolHistory("qwen", "qwen3-thinking-235b", "call_qwen_think");
    const glm = translateWithToolHistory("glm", "glm-5-thinking", "call_glm_think");

    assert.equal(qwen.messages[1].reasoning_content, "Qwen cached plan");
    assert.equal(glm.messages[1].reasoning_content, "GLM cached plan");
    assert.equal(getReasoningCacheServiceStats().replays, 2);
  });

  it("should not inject reasoning_content for generic non-reasoning providers", () => {
    clearReasoningCacheAll();
    cacheReasoning("call_openai", "openai", "gpt-4o", "Should not replay");

    const translated = translateWithToolHistory("openai", "gpt-4o", "call_openai");

    assert.equal(translated.messages[1].reasoning_content, undefined);
    assert.equal(getReasoningCacheServiceStats().replays, 0);
  });

  it("should support the full capture then replay flow", () => {
    clearReasoningCacheAll();

    const captured = cacheReasoningFromAssistantMessage(
      {
        role: "assistant",
        reasoning_content: "Full flow cached plan",
        tool_calls: [{ id: "call_full_flow", type: "function" }],
      },
      "deepseek",
      "deepseek-reasoner"
    );

    const translated = translateWithToolHistory("deepseek", "deepseek-reasoner", "call_full_flow");

    assert.equal(captured, 1);
    assert.equal(translated.messages[1].reasoning_content, "Full flow cached plan");
    assert.equal(getReasoningCacheServiceStats().replays, 1);
  });
});

describe("Reasoning Replay Cache — API Route", () => {
  before(() => {
    clearReasoningCacheAll();
  });

  after(() => {
    clearReasoningCacheAll();
  });

  it("should return stats and entries from GET", async () => {
    clearReasoningCacheAll();
    cacheReasoning("call_api_get", "deepseek", "deepseek-reasoner", "API visible reasoning");

    const response = await GET(
      new Request("http://localhost/api/cache/reasoning?provider=deepseek") as never
    );
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.stats.dbEntries, 1);
    assert.equal(body.entries.length, 1);
    assert.equal(body.entries[0].toolCallId, "call_api_get");
  });

  it("should delete a single entry by toolCallId", async () => {
    clearReasoningCacheAll();
    cacheReasoning("call_api_delete_1", "deepseek", "deepseek-reasoner", "Delete API");
    cacheReasoning("call_api_delete_2", "deepseek", "deepseek-reasoner", "Keep API");

    const response = await DELETE(
      new Request("http://localhost/api/cache/reasoning?toolCallId=call_api_delete_1") as never
    );
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.scope, "toolCallId");
    assert.equal(body.cleared, 1);
    assert.equal(lookupReasoning("call_api_delete_1"), null);
    assert.equal(lookupReasoning("call_api_delete_2"), "Keep API");
  });

  it("should delete entries by provider", async () => {
    clearReasoningCacheAll();
    cacheReasoning("call_api_provider_ds", "deepseek", "deepseek-reasoner", "Delete provider");
    cacheReasoning("call_api_provider_kimi", "kimi", "kimi-k2.5", "Keep provider");

    const response = await DELETE(
      new Request("http://localhost/api/cache/reasoning?provider=deepseek") as never
    );
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.scope, "provider");
    assert.equal(body.cleared, 1);
    assert.equal(lookupReasoning("call_api_provider_ds"), null);
    assert.equal(lookupReasoning("call_api_provider_kimi"), "Keep provider");
  });
});
