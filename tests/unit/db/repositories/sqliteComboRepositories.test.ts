import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import test from "node:test";

import { registerComboRepositoryConformance } from "../../../helpers/persistence/comboRepositoryConformance.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-repository-contract-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
const { sqliteComboRepository } =
  await import("../../../../src/lib/db/repositories/sqliteComboRepository.ts");
const { sqliteModelComboMappingRepository } =
  await import("../../../../src/lib/db/repositories/sqliteModelComboMappingRepository.ts");
const combosDb = await import("../../../../src/lib/db/combos.ts");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

registerComboRepositoryConformance(async () => ({
  combos: sqliteComboRepository,
  mappings: sqliteModelComboMappingRepository,
  reset: resetStorage,
  async corruptComboPayload(comboId: string): Promise<void> {
    core.getDbInstance().prepare("UPDATE combos SET data = ? WHERE id = ?").run("", comboId);
  },
}));

test("legacy combo count facade remains synchronous", async () => {
  await resetStorage();

  assert.equal(typeof combosDb.getCombosCount(), "number");
  assert.equal(combosDb.getCombosCount(), 0);
  await sqliteComboRepository.create({ name: "Counted", models: [] });
  assert.equal(combosDb.getCombosCount(), 1);
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
