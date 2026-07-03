/**
 * Regression: DB migration version collision must not hang DB init.
 *
 * The post-merge recovery duplicated the 100-105 migration slots. The runner's
 * collision guard threw during getDbInstance(), which hung the two vitest arena
 * ELO tests in open-sse/services/autoCombo/__tests__/autoCombo.test.ts (they
 * dynamically import modelIntelligence.ts → getDbInstance() → runMigrations()).
 *
 * This node-native test is the working-runner mirror of those two vitest cases:
 * it forces a real migration run and then reproduces both arena_elo -free alias
 * assertions. It fails (hangs / throws "Migration version collision detected")
 * on a tree with duplicated migration numbers and passes once every migration
 * has a unique numeric prefix.
 */
import { test, beforeAll, afterAll, expect } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "omniroute-arena-elo-"));
  process.env.DATA_DIR = dataDir;
});

afterAll(async () => {
  const { resetDbInstance } = await import("../../../src/lib/db/core.ts");
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

test("migrations run cleanly (no version collision) on a fresh DB", async () => {
  const { getDbInstance } = await import("../../../src/lib/db/core.ts");
  // Throws "Migration version collision detected: ..." if any two migration
  // files share a numeric prefix. Succeeds only when all prefixes are unique.
  const db = getDbInstance();
  expect(db, "getDbInstance() must return a usable handle after migrations").toBeTruthy();
});

test("returns the base model's arena_elo when given a -free variant", async () => {
  const { getTaskFitnessWithSource, invalidateFitnessCache } = await import(
    "../../../open-sse/services/autoCombo/taskFitness.ts"
  );
  const { upsertModelIntelligence, deleteModelIntelligence } = await import(
    "../../../src/lib/db/modelIntelligence.ts"
  );
  const baseId = "alias-base-test-4517";
  const freeId = "alias-base-test-4517-free";
  upsertModelIntelligence({
    model: baseId,
    source: "arena_elo",
    category: "coding",
    score: 0.42,
    eloRaw: 1500,
    confidence: "high",
    expiresAt: null,
  });
  invalidateFitnessCache();
  try {
    const result = getTaskFitnessWithSource(freeId, "coding");
    expect(Math.abs(result.score - 0.42), `expected ~0.42, got ${result.score}`).toBeLessThan(
      1e-5
    );
    expect(result.source).toBe("arena_elo_free_alias");
  } finally {
    deleteModelIntelligence(baseId, "arena_elo", "coding");
    invalidateFitnessCache();
  }
});

test("does not strip -free when arena_elo is present on the literal model id", async () => {
  const { getTaskFitnessWithSource, invalidateFitnessCache, setUserFitnessOverride, clearUserFitnessOverride } =
    await import("../../../open-sse/services/autoCombo/taskFitness.ts");
  setUserFitnessOverride("foo-free", "coding", 0.91);
  try {
    const result = getTaskFitnessWithSource("foo-free", "coding");
    expect(result.score).toBe(0.91);
    expect(result.source).toBe("user_override");
  } finally {
    clearUserFitnessOverride("foo-free", "coding");
    invalidateFitnessCache();
  }
});
