import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  tokenizeWordPiece,
  meanPool,
  _injectModel,
  type PotionModel,
} from "../../src/lib/memory/embedding/staticPotion";
import type { EmbeddingError } from "../../src/lib/memory/embedding/types";
import { invalidate as invalidateCache } from "../../src/lib/memory/embedding/cache";

// ---- Mock model setup ----
// Vocab: {"[UNK]":0, "hello":1, "world":2}
// Matrix: 3 rows × 4 dims
// Row 0 ([UNK]):  [0.0, 0.0, 0.0, 0.0]
// Row 1 (hello):  [1.0, 0.0, 0.0, 0.0]
// Row 2 (world):  [0.0, 1.0, 0.0, 0.0]

function makeMockModel(): PotionModel {
  const vocab: Record<string, number> = { "[UNK]": 0, "hello": 1, "world": 2 };
  const matrix = new Float32Array([
    0.0, 0.0, 0.0, 0.0,  // row 0 = [UNK]
    1.0, 0.0, 0.0, 0.0,  // row 1 = hello
    0.0, 1.0, 0.0, 0.0,  // row 2 = world
  ]);
  return { vocab, matrix, dim: 4, vocabSize: 3, unkIdx: 0 };
}

describe("memory-embedding-static-potion tokenizer", () => {
  const mock = makeMockModel();

  it("tokenizes known words to their vocab IDs", () => {
    const ids = tokenizeWordPiece("hello world", mock.vocab);
    assert.deepStrictEqual(ids, [1, 2]);
  });

  it("unknown words fall back to [UNK] (id=0)", () => {
    const ids = tokenizeWordPiece("foo bar", mock.vocab);
    assert.deepStrictEqual(ids, [0, 0]);
  });

  it("mixed known and unknown tokens", () => {
    const ids = tokenizeWordPiece("hello foo world", mock.vocab);
    assert.deepStrictEqual(ids, [1, 0, 2]);
  });

  it("empty string returns no tokens", () => {
    const ids = tokenizeWordPiece("", mock.vocab);
    assert.deepStrictEqual(ids, []);
  });

  it("case-insensitive tokenization", () => {
    // tokenizeWordPiece lowercases input
    const ids = tokenizeWordPiece("Hello World", mock.vocab);
    assert.deepStrictEqual(ids, [1, 2]);
  });
});

describe("memory-embedding-static-potion mean pooling", () => {
  const mock = makeMockModel();

  it("mean pools hello + world to [0.5, 0.5, 0, 0]", () => {
    const ids = [1, 2]; // hello, world
    const result = meanPool(ids, mock.matrix, mock.dim, mock.vocabSize, mock.unkIdx);
    assert.ok(result instanceof Float32Array);
    assert.strictEqual(result.length, 4);
    assert.ok(Math.abs(result[0] - 0.5) < 0.001, `dim0 should be 0.5, got ${result[0]}`);
    assert.ok(Math.abs(result[1] - 0.5) < 0.001, `dim1 should be 0.5, got ${result[1]}`);
    assert.ok(Math.abs(result[2] - 0.0) < 0.001, `dim2 should be 0, got ${result[2]}`);
  });

  it("pooling [UNK] returns zero vector", () => {
    const ids = [0]; // [UNK]
    const result = meanPool(ids, mock.matrix, mock.dim, mock.vocabSize, mock.unkIdx);
    for (const v of result) {
      assert.ok(Math.abs(v) < 0.001, `All dims should be 0, got ${v}`);
    }
  });

  it("empty token list returns zero vector", () => {
    const result = meanPool([], mock.matrix, mock.dim, mock.vocabSize, mock.unkIdx);
    for (const v of result) {
      assert.ok(Math.abs(v) < 0.001, `All dims should be 0, got ${v}`);
    }
  });

  it("out-of-range token ID falls back to unkIdx", () => {
    const ids = [999]; // out of range
    const result = meanPool(ids, mock.matrix, mock.dim, mock.vocabSize, mock.unkIdx);
    // Should use row 0 ([UNK]) = all zeros
    for (const v of result) {
      assert.ok(Math.abs(v) < 0.001, `All dims should be 0 (unk), got ${v}`);
    }
  });
});

describe("memory-embedding-static-potion embedStatic with mock", () => {
  beforeEach(() => {
    invalidateCache();
    _injectModel(makeMockModel());
  });

  it("embedStatic returns EmbeddingResult for 'hello world'", async () => {
    const { embedStatic } = await import("../../src/lib/memory/embedding/staticPotion");
    const result = await embedStatic("hello world");
    assert.ok("vector" in result, "Should return EmbeddingResult");
    assert.ok((result as { vector: Float32Array }).vector instanceof Float32Array);
    assert.strictEqual((result as { dimensions: number }).dimensions, 4);
    assert.strictEqual((result as { source: string }).source, "static");
  });

  it("embedStatic uses [UNK] for 'foo' (not in mock vocab)", async () => {
    const { embedStatic } = await import("../../src/lib/memory/embedding/staticPotion");
    const result = await embedStatic("foo");
    assert.ok("vector" in result);
    const vec = (result as { vector: Float32Array }).vector;
    // foo -> [UNK] -> row 0 = [0, 0, 0, 0]
    for (const v of vec) {
      assert.ok(Math.abs(v) < 0.001, `Should be 0 for UNK, got ${v}`);
    }
  });

  it("model load failure returns EmbeddingError with reason model_load_failed", async () => {
    // Plan 21 fix: previously this test was tautological (`assert.ok(true)`).
    // Force a real load-failure path: point the cache dir at /dev/null/<subdir>
    // so fs.mkdir() fails with ENOTDIR (/dev/null is a file, not a dir).
    // embedStatic catches the error and must return EmbeddingError with
    // reason="model_load_failed" (staticPotion.ts:225-232).
    _injectModel(null);
    const prevCacheDir = process.env.MEMORY_STATIC_CACHE_DIR;
    process.env.MEMORY_STATIC_CACHE_DIR = `/dev/null/potion-load-fail-${process.pid}-${Date.now()}`;
    try {
      const { embedStatic } = await import(
        "../../src/lib/memory/embedding/staticPotion"
      );
      const result = await embedStatic("hello world");
      assert.ok(
        !("vector" in result),
        `Expected EmbeddingError but got result with vector: ${JSON.stringify(result)}`
      );
      const err = result as EmbeddingError;
      assert.strictEqual(err.source, "static");
      assert.strictEqual(err.reason, "model_load_failed");
      assert.ok(
        typeof err.message === "string" && err.message.length > 0,
        "EmbeddingError.message must be a non-empty sanitized string"
      );
    } finally {
      if (prevCacheDir === undefined) {
        delete process.env.MEMORY_STATIC_CACHE_DIR;
      } else {
        process.env.MEMORY_STATIC_CACHE_DIR = prevCacheDir;
      }
      _injectModel(makeMockModel()); // restore for other tests
    }
  });

  it("second call reuses singleton model (no re-load)", async () => {
    const { embedStatic } = await import("../../src/lib/memory/embedding/staticPotion");
    // First call
    const r1 = await embedStatic("hello");
    // Second call — should reuse singleton
    const r2 = await embedStatic("hello");
    assert.ok("vector" in r1);
    assert.ok("vector" in r2);
    // Both succeed with same model
    assert.strictEqual((r1 as { source: string }).source, "static");
    assert.strictEqual((r2 as { source: string }).source, "static");
  });
});
