/**
 * Unit tests for intelligence transforms
 */
import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import { transformModelgrep } from "../../../../src/lib/intelligence/transforms/modelgrep.ts";
import { transformPublicAI } from "../../../../src/lib/intelligence/transforms/publicai.ts";
import { transformArenaExternal } from "../../../../src/lib/intelligence/transforms/arenaExternal.ts";
import { transformHuggingFace } from "../../../../src/lib/intelligence/transforms/huggingface.ts";
import { TASK_CATEGORIES } from "../../../../src/lib/intelligence/transforms/shared.ts";

describe("transforms - empty input", () => {
  it("transformModelgrep handles null/undefined/empty", () => {
    assert.deepStrictEqual(transformModelgrep(null), []);
    assert.deepStrictEqual(transformModelgrep(undefined), []);
    assert.deepStrictEqual(transformModelgrep([]), []);
  });

  it("transformPublicAI handles null/undefined/empty", () => {
    assert.deepStrictEqual(transformPublicAI(null), []);
    assert.deepStrictEqual(transformPublicAI(undefined), []);
    assert.deepStrictEqual(transformPublicAI([]), []);
  });

  it("transformArenaExternal handles null/undefined/empty", () => {
    assert.deepStrictEqual(transformArenaExternal(null), []);
    assert.deepStrictEqual(transformArenaExternal(undefined), []);
    assert.deepStrictEqual(transformArenaExternal([]), []);
  });

  it("transformHuggingFace handles null/undefined/empty", () => {
    assert.deepStrictEqual(transformHuggingFace(null), []);
    assert.deepStrictEqual(transformHuggingFace(undefined), []);
    assert.deepStrictEqual(transformHuggingFace([]), []);
  });
});

describe("transforms - garbage input", () => {
  it("transformModelgrep skips garbage rows", () => {
    const result = transformModelgrep([
      null,
      undefined,
      {},
      { model: "" },
      { model: "test" }, // no benchmarks
      { benchmarks: {} }, // no model
      { model: "test", benchmarks: { mmlu: NaN, hellaswag: Infinity } },
    ] as any);
    assert.deepStrictEqual(result, []);
  });

  it("transformPublicAI skips garbage rows", () => {
    const result = transformPublicAI([
      null,
      undefined,
      {},
      { model: "" },
      { model: "test" }, // no score/index
      { score: NaN },
      { id: "test", score: Infinity },
    ] as any);
    assert.deepStrictEqual(result, []);
  });

  it("transformArenaExternal skips garbage rows", () => {
    const result = transformArenaExternal([
      null,
      undefined,
      {},
      { model: "" },
      { model: "test" }, // no elo/score
      { elo: NaN },
      { model: "test", elo: Infinity },
    ] as any);
    assert.deepStrictEqual(result, []);
  });

  it("transformHuggingFace skips garbage rows", () => {
    const result = transformHuggingFace([
      null,
      undefined,
      {},
      { model: "" },
      { model: "test" }, // no downloads/likes
      { downloads: NaN },
      { model: "test", downloads: 0, likes: 0 }, // no positive signal
    ] as any);
    assert.deepStrictEqual(result, []);
  });
});

describe("transforms - valid input", () => {
  it("transformModelgrep produces 7-category output with canonical fields", () => {
    const result = transformModelgrep([
      {
        model: "Claude-3.5-Sonnet",
        benchmarks: { mmlu: 88, hellaswag: 85.5 },
      },
    ]);
    assert.strictEqual(result.length, TASK_CATEGORIES.length);
    for (let i = 0; i < result.length; i++) {
      const row = result[i];
      assert.strictEqual(row.model, "claude-3.5-sonnet"); // normalized
      assert.strictEqual(row.source, "modelgrep_intel");
      assert.strictEqual(row.category, TASK_CATEGORIES[i]);
      assert.ok(row.score >= 0 && row.score <= 1);
      assert.strictEqual(row.canonicalId, "claude-3.5-sonnet");
      assert.strictEqual(row.sourceId, "claude-3.5-sonnet");
      assert.ok(row.matchConfidence >= 0 && row.matchConfidence <= 1);
      assert.strictEqual(row.eloRaw, null);
      assert.strictEqual(row.confidence, null);
      assert.strictEqual(row.expiresAt, null);
    }
  });

  it("transformPublicAI produces 7-category output", () => {
    const result = transformPublicAI([{ id: "GPT-4", score: 95 }]);
    assert.strictEqual(result.length, TASK_CATEGORIES.length);
    for (const row of result) {
      assert.strictEqual(row.model, "gpt-4");
      assert.strictEqual(row.source, "publicai_index");
      assert.ok(row.score >= 0 && row.score <= 1);
      assert.strictEqual(row.canonicalId, "gpt-4");
    }
  });

  it("transformArenaExternal produces 7-category output with eloRaw", () => {
    const result = transformArenaExternal([
      { model: "claude-3.5-sonnet", elo: 1350, score: 1350 },
    ]);
    assert.strictEqual(result.length, TASK_CATEGORIES.length);
    for (const row of result) {
      assert.strictEqual(row.model, "claude-3.5-sonnet");
      assert.strictEqual(row.source, "arena_elo_external");
      assert.ok(row.eloRaw === 1350);
    }
  });

  it("transformHuggingFace produces 7-category output", () => {
    const result = transformHuggingFace([
      { modelId: "llama-3", downloads: 1000000, likes: 1000 },
    ]);
    assert.strictEqual(result.length, TASK_CATEGORIES.length);
    for (const row of result) {
      assert.strictEqual(row.model, "llama-3");
      assert.strictEqual(row.source, "huggingface_meta");
      assert.ok(row.score >= 0 && row.score <= 1);
    }
  });

  it("transforms never invent values when no signal", () => {
    assert.deepStrictEqual(transformModelgrep([{ model: "x", benchmarks: {} }]), []);
    assert.deepStrictEqual(transformPublicAI([{ model: "x" }]), []);
    assert.deepStrictEqual(transformArenaExternal([{ model: "x" }]), []);
    assert.deepStrictEqual(transformHuggingFace([{ model: "x", downloads: 0, likes: 0 }]), []);
  });
});
