/**
 * Unit tests for sync integration with fake fetch
 */
import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-syncint-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
const mi = await import("../../../../src/lib/db/modelIntelligence.ts");
const { transformModelgrep } = await import("../../../../src/lib/intelligence/transforms/modelgrep.ts");
const { transformPublicAI } = await import("../../../../src/lib/intelligence/transforms/publicai.ts");

function resetStorage(): void {
  core.resetDbInstance();
  try {
    if (fs.existsSync(TEST_DATA_DIR)) {
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  } catch {
    /* EBUSY */
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

describe("sync integration - end to end with fake fetch", () => {
  beforeEach(() => {
    resetStorage();
  });

  it("transform -> upsert flow with fake modelgrep payload", () => {
    const fakeFetchPayload = [
      {
        model: "Test-Model",
        benchmarks: { mmlu: 90, gpqa: 80 },
      },
    ];
    const transformed = transformModelgrep(fakeFetchPayload);
    assert.ok(transformed.length > 0);
    for (const row of transformed) {
      mi.upsertModelIntelligence(row);
    }
    for (const row of transformed) {
      const entry = mi.getModelIntelligenceBySource(row.model, row.source, row.category);
      assert.ok(entry);
      assert.strictEqual(entry.score, row.score);
      assert.strictEqual(entry.canonicalId, row.canonicalId);
      assert.strictEqual(entry.sourceId, row.sourceId);
    }
  });

  it("transform -> upsert flow with fake publicai payload", () => {
    const fakePayload = [
      { model: "Another-Model", score: 85 },
    ];
    const transformed = transformPublicAI(fakePayload);
    assert.ok(transformed.length > 0);
    for (const row of transformed) {
      mi.upsertModelIntelligence(row);
    }
    const entries = mi.listModelIntelligence({ source: "publicai_index" });
    assert.ok(entries.length >= transformed.length);
  });

  it("deterministic fixtures only - no network calls", () => {
    const payload = { model: "Deterministic", benchmarks: { mmlu: 75 } };
    const result = transformModelgrep([payload]);
    assert.strictEqual(result[0].model, "deterministic");
    assert.strictEqual(result.length, 7);
  });
});
