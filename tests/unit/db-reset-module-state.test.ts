// TDD — 6A.1 triagem do órfão compression-preview-auth.test.ts (503 em vez de 403).
// Causa-raiz: resetDbInstance()/closeDbInstance() NÃO disparava os resetters do
// registry stateReset.ts (só o restore de backup.ts disparava). Módulos com estado
// amarrado à conexão (ex.: apiKeys.ts `_schemaChecked` + prepared statements)
// ficavam apontando para o schema/conexão antiga: após um segundo reset com DB
// recriado do zero, ensureApiKeysColumns era pulado (memo de processo) e o
// re-prepare explodia com "no such column: is_active" → 503 em vez de 403.
// O mesmo caminho atinge produção via restore de DB antigo sem as colunas-fallback.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-reset-state-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { isValidApiKey } = await import("../../src/sse/services/auth.ts");

async function recreateDataDirFromScratch(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  // Primeiro acesso recria o DB do zero (migrations + colunas-fallback).
  await settingsDb.updateSettings({ requireLogin: true, setupComplete: true });
}

test("api-key validation survives a second resetDbInstance with a recreated DB (module state resetters fire)", async () => {
  await recreateDataDirFromScratch();
  assert.equal(await isValidApiKey("not-a-real-key"), false);

  // Segundo ciclo: sem o wiring resetDbInstance→resetAllDbModuleState, o memo de
  // schema de apiKeys.ts sobrevive ao reset e o prepare lança "no such column".
  await recreateDataDirFromScratch();
  assert.equal(await isValidApiKey("not-a-real-key"), false);
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});
