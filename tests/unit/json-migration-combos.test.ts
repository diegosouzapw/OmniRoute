import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-json-migration-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { runJsonMigration } = await import("../../src/lib/db/jsonMigration.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("runJsonMigration normalizes legacy combo strategy names at the import boundary", () => {
  const db = core.getDbInstance();

  runJsonMigration(db, {
    combos: [
      {
        id: "combo-usage",
        name: "combo-usage",
        strategy: "usage",
        models: ["openai/gpt-4o-mini"],
        config: { strategy: "context" },
      },
      {
        id: "combo-unknown",
        name: "combo-unknown",
        strategy: "not-a-real-strategy",
        models: ["openai/gpt-4o-mini"],
      },
    ],
  });

  const rows = db.prepare("SELECT id, data FROM combos ORDER BY id ASC").all() as Array<{
    id: string;
    data: string;
  }>;
  const byId = new Map(rows.map((row) => [row.id, JSON.parse(row.data)]));

  assert.equal(byId.get("combo-usage").strategy, "least-used");
  assert.equal(byId.get("combo-usage").config.strategy, "context-optimized");
  assert.equal(byId.get("combo-unknown").strategy, "priority");
});
