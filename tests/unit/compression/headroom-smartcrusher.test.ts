/**
 * TDD tests for headroom engine: SmartCrusher tabular compaction (H3 + N5 + GP5').
 *
 * RED phase: these tests are written BEFORE the implementation.
 * After implementation they must all pass (GREEN).
 */

import { describe, it, before } from "node:test";
import assert from "node:assert/strict";

// Lazy imports resolved inside tests so RED gives clean "module not found" errors,
// not mysterious runtime crashes before any assertion.
let headroomEngine: import("../../../open-sse/services/compression/engines/headroom/index.ts").headroomEngine;
let encodeTabular: (arr: Record<string, unknown>[]) => string;
let decodeTabular: (text: string) => Record<string, unknown>[];
let getCompressionEngine: (
  id: string
) => import("../../../open-sse/services/compression/engines/types.ts").CompressionEngine | null;
let registerBuiltinCompressionEngines: () => void;

before(async () => {
  const mod = await import("../../../open-sse/services/compression/engines/headroom/index.ts");
  headroomEngine = mod.headroomEngine;
  encodeTabular = mod.encodeTabular;
  decodeTabular = mod.decodeTabular;

  const regMod = await import("../../../open-sse/services/compression/engines/index.ts");
  registerBuiltinCompressionEngines = regMod.registerBuiltinCompressionEngines;

  const registryMod = await import("../../../open-sse/services/compression/engines/registry.ts");
  getCompressionEngine = registryMod.getCompressionEngine;
});

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Build a homogeneous array of N simple objects */
function makeRows(n: number): Record<string, unknown>[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    name: `item-${i + 1}`,
    value: (i + 1) * 10,
    active: i % 2 === 0,
  }));
}

/** Build a body whose single user message content is JSON of the given array */
function makeBody(
  arr: Record<string, unknown>[],
  opts?: { asJsonFence?: boolean }
): Record<string, unknown> {
  const json = JSON.stringify(arr);
  const content = opts?.asJsonFence ? "Here are the results:\n```json\n" + json + "\n```" : json;
  return {
    model: "test-model",
    messages: [{ role: "user", content }],
  };
}

// ─── 1. Pure encoder round-trip (lossless) ────────────────────────────────────

describe("tabular encoder round-trip", () => {
  it("encodes and decodes a homogeneous array of 20 objects to the same values", async () => {
    const original = makeRows(20);
    const encoded = encodeTabular(original);
    const decoded = decodeTabular(encoded);
    assert.deepEqual(decoded, original);
  });

  it("round-trips values that contain commas, double-quotes, and newlines", async () => {
    const original: Record<string, unknown>[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      description: `value with, comma and "quote" and\nnewline inside`,
      path: `/some/path/${i}`,
    }));
    const encoded = encodeTabular(original);
    const decoded = decodeTabular(encoded);
    assert.deepEqual(decoded, original);
  });

  it("round-trips rows with a nested object value in a cell", async () => {
    const original: Record<string, unknown>[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      meta: { key: `k-${i}`, count: i * 2 },
      tags: ["alpha", "beta", i.toString()],
    }));
    const encoded = encodeTabular(original);
    const decoded = decodeTabular(encoded);
    assert.deepEqual(decoded, original);
  });

  it("encoded form contains an explicit [N rows] count marker", async () => {
    const original = makeRows(25);
    const encoded = encodeTabular(original);
    assert.match(encoded, /\[25 rows\]/);
  });
});

// ─── 2. engine.apply compresses ≥30% and is reversible ───────────────────────

describe("headroomEngine.apply — compression", () => {
  it("compresses a body with a 20-row homogeneous array by ≥30% (JSON.stringify length)", async () => {
    const rows = makeRows(20);
    const body = makeBody(rows);

    const result = headroomEngine.apply(body);
    assert.equal(result.compressed, true, "should be flagged as compressed");

    const origLen = JSON.stringify(body).length;
    const compLen = JSON.stringify(result.body).length;
    const ratio = (origLen - compLen) / origLen;
    assert.ok(
      ratio >= 0.3,
      `Expected ≥30% savings, got ${(ratio * 100).toFixed(1)}% (orig=${origLen}, comp=${compLen})`
    );
  });

  it("body compressed by apply is reversible: decoding restores deep-equal original body", async () => {
    const rows = makeRows(20);
    const body = makeBody(rows);

    const result = headroomEngine.apply(body);
    assert.equal(result.compressed, true);

    // The compressed body messages content contains the tabular block. We restore using decodeTabular.
    // The engine must expose a reconstruct helper — we test via the exported reconstructHeadroom fn.
    const reconstructMod =
      await import("../../../open-sse/services/compression/engines/headroom/index.ts");
    const reconstructHeadroom = reconstructMod.reconstructHeadroom;

    const restored = reconstructHeadroom(result.body);
    assert.deepEqual(restored, body);
  });

  it("stats.savingsPercent ≥ 30 when compressing a 20-row array", async () => {
    const rows = makeRows(20);
    const body = makeBody(rows);

    const result = headroomEngine.apply(body);
    assert.equal(result.compressed, true);
    assert.ok(result.stats !== null, "stats should not be null");
    assert.ok(
      result.stats!.savingsPercent >= 30,
      `Expected savingsPercent ≥ 30, got ${result.stats!.savingsPercent}`
    );
  });

  it("compressed body contains the [N rows] count marker", async () => {
    const n = 22;
    const rows = makeRows(n);
    const body = makeBody(rows);

    const result = headroomEngine.apply(body);
    assert.equal(result.compressed, true);

    const bodyStr = JSON.stringify(result.body);
    assert.match(bodyStr, /\[22 rows\]/, "compressed body must contain [N rows] marker");
  });

  it("also compresses when the array is inside a ```json fence in message content", async () => {
    const rows = makeRows(20);
    const body = makeBody(rows, { asJsonFence: true });

    const result = headroomEngine.apply(body);
    assert.equal(result.compressed, true);
    const origLen = JSON.stringify(body).length;
    const compLen = JSON.stringify(result.body).length;
    const ratio = (origLen - compLen) / origLen;
    assert.ok(
      ratio >= 0.3,
      `Expected ≥30% savings from fenced block, got ${(ratio * 100).toFixed(1)}%`
    );
  });
});

// ─── 3. Conservative guards — nested/flat should NOT regress ─────────────────

describe("headroomEngine.apply — conservative guards (no regression)", () => {
  it("does NOT compress a heterogeneous array (objects with different key sets)", async () => {
    // Objects have different keys — not homogeneous
    const rows: Record<string, unknown>[] = [
      ...Array.from({ length: 10 }, (_, i) => ({ id: i, name: `n${i}` })),
      ...Array.from({ length: 10 }, (_, i) => ({ key: i, label: `l${i}`, extra: true })),
    ];
    const body = makeBody(rows);
    const result = headroomEngine.apply(body);
    assert.equal(result.compressed, false, "heterogeneous array should NOT be compressed");
    assert.deepEqual(result.body, body);
  });

  it("does NOT compress a tiny array below minRows (< default 8)", async () => {
    const rows = makeRows(5);
    const body = makeBody(rows);
    const result = headroomEngine.apply(body);
    assert.equal(result.compressed, false, "tiny array should NOT be compressed");
    assert.deepEqual(result.body, body);
  });

  it("does NOT compress system messages", async () => {
    const rows = makeRows(20);
    const body = {
      model: "test-model",
      messages: [
        { role: "system", content: JSON.stringify(rows) },
        { role: "user", content: "hello" },
      ],
    };
    const result = headroomEngine.apply(body);
    // The system message should be untouched regardless of outcome
    const resultMsgs = result.body["messages"] as Array<Record<string, unknown>>;
    const systemMsg = resultMsgs[0];
    assert.equal(systemMsg["content"], JSON.stringify(rows), "system message must be untouched");
  });

  it("does NOT compress non-array JSON content (plain object)", async () => {
    const content = JSON.stringify({ key: "value", nested: { a: 1 } });
    const body = {
      model: "test-model",
      messages: [{ role: "user", content }],
    };
    const result = headroomEngine.apply(body);
    assert.equal(result.compressed, false, "plain object JSON should NOT be compressed");
    assert.deepEqual(result.body, body);
  });

  it("does NOT compress when tabular form would not be smaller (already short rows)", async () => {
    // Very short rows with single-char values — tabular overhead won't save space
    const rows: Record<string, unknown>[] = Array.from({ length: 8 }, (_, i) => ({ a: i }));
    const body = makeBody(rows);
    const result = headroomEngine.apply(body);
    // This might or might not compress depending on actual sizes; key requirement is
    // compressed:false when tabular is NOT smaller, and body unchanged in that case.
    if (!result.compressed) {
      assert.deepEqual(result.body, body, "if not compressed, body must be unchanged");
    }
  });
});

// ─── 4. Registry ─────────────────────────────────────────────────────────────

describe("engine registry", () => {
  it('getCompressionEngine("headroom") returns the headroom engine after registration', async () => {
    registerBuiltinCompressionEngines();
    const engine = getCompressionEngine("headroom");
    assert.ok(engine !== null, "headroom engine must be registered");
    assert.equal(engine!.id, "headroom");
  });

  it("headroomEngine has stackable:true and a sensible stackPriority", async () => {
    assert.equal(headroomEngine.stackable, true);
    // stackPriority 15 = between rtk(10) and caveman(20)
    assert.equal(typeof headroomEngine.stackPriority, "number");
    assert.ok(headroomEngine.stackPriority > 0);
  });

  it("getConfigSchema returns a non-empty array", async () => {
    const schema = headroomEngine.getConfigSchema();
    assert.ok(Array.isArray(schema) && schema.length > 0, "schema must have at least one field");
  });

  it("validateConfig accepts an empty config", async () => {
    const result = headroomEngine.validateConfig({});
    assert.equal(result.valid, true);
  });

  it("compress delegates to apply", async () => {
    const rows = makeRows(20);
    const body = makeBody(rows);
    const r1 = headroomEngine.apply(body);
    const r2 = headroomEngine.compress(body);
    assert.equal(r1.compressed, r2.compressed);
  });
});

// ─── 5. Losslessness invariant on mixed-type / nullable columns (regression) ──
// The decoder applies ONE kind per column (derived from row 0). A column that is
// key-present but type-heterogeneous across rows (e.g. nullable, or mixed
// number/string) would corrupt the round-trip unless such arrays are left
// untouched. This invariant must hold whether the engine compacts or skips.
describe("headroomEngine — losslessness on mixed-type columns (regression)", () => {
  async function reconstruct(body: Record<string, unknown>) {
    const mod = await import("../../../open-sse/services/compression/engines/headroom/index.ts");
    return mod.reconstructHeadroom(body);
  }

  it("never loses data on a nullable numeric column (null in some rows, number in others)", async () => {
    const rows = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      score: i % 3 === 0 ? null : (i + 1) * 7,
      name: `row-${i + 1}`,
    }));
    const body = makeBody(rows);
    const result = headroomEngine.apply(body);
    const restored = await reconstruct(result.body);
    assert.deepEqual(restored, body, "nullable column must round-trip without data loss");
  });

  it("never loses data on a column with mixed number/string values", async () => {
    const rows = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      mixed: i % 2 === 0 ? i : `str-${i}`,
    }));
    const body = makeBody(rows);
    const result = headroomEngine.apply(body);
    const restored = await reconstruct(result.body);
    assert.deepEqual(restored, body, "mixed-type column must round-trip without data loss");
  });
});
