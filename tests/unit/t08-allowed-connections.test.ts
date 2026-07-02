import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ── Env vars ANTES dos imports dinâmicos ─────────────────────────
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-t08-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "t08-test-secret-key";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const schemas = await import("../../src/shared/validation/schemas.ts");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "../..");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ══════════════════════════════════════════════════════════════════
// Bloco 1 — Schema Zod (updateKeyPermissionsSchema)
// ══════════════════════════════════════════════════════════════════

test("1.1 — allowedConnections com UUID válido é aceito", () => {
  const result = schemas.validateBody(schemas.updateKeyPermissionsSchema, {
    allowedConnections: ["550e8400-e29b-41d4-a716-446655440000"],
  });
  assert.equal(result.success, true);
});

test("1.2 — allowedConnections com string não-UUID é rejeitado", () => {
  const result = schemas.validateBody(schemas.updateKeyPermissionsSchema, {
    allowedConnections: ["nao-e-uuid"],
  });
  assert.equal(result.success, false);
});

test("1.3 — allowedConnections + noLog combinados são aceitos", () => {
  const result = schemas.validateBody(schemas.updateKeyPermissionsSchema, {
    allowedConnections: ["550e8400-e29b-41d4-a716-446655440000"],
    noLog: true,
  });
  assert.equal(result.success, true);
});

test("1.4 — payload vazio é rejeitado pelo superRefine", () => {
  const result = schemas.validateBody(schemas.updateKeyPermissionsSchema, {});
  assert.equal(result.success, false);
});

test("1.5 — allowedConnections array vazio é aceito (não é undefined, superRefine não dispara)", () => {
  const result = schemas.validateBody(schemas.updateKeyPermissionsSchema, {
    allowedConnections: [],
  });
  assert.equal(result.success, true);
});

// ══════════════════════════════════════════════════════════════════
// Bloco 2 — DB (apiKeys.ts)
// ══════════════════════════════════════════════════════════════════

test("2.1 — key criada tem allowedConnections: [] por padrão", async () => {
  const created = await apiKeysDb.createApiKey("test-key", "machine-t08");
  assert.deepEqual(created.allowedConnections, []);
});

test("2.2 — updateApiKeyPermissions persiste array de UUIDs", async () => {
  const created = await apiKeysDb.createApiKey("conn-key", "machine-t08");
  const uuid1 = "550e8400-e29b-41d4-a716-446655440000";
  const uuid2 = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

  const updated = await apiKeysDb.updateApiKeyPermissions(created.id, {
    allowedConnections: [uuid1, uuid2],
  });
  assert.equal(updated, true);

  const row = await apiKeysDb.getApiKeyById(created.id);
  assert.deepEqual(row?.allowedConnections, [uuid1, uuid2]);
});

test("2.3 — getApiKeyById retorna allowedConnections corretamente", async () => {
  const created = await apiKeysDb.createApiKey("by-id-key", "machine-t08");
  const uuid = "550e8400-e29b-41d4-a716-446655440000";

  await apiKeysDb.updateApiKeyPermissions(created.id, { allowedConnections: [uuid] });

  const row = await apiKeysDb.getApiKeyById(created.id);
  assert.ok(Array.isArray(row?.allowedConnections));
  assert.equal(row?.allowedConnections[0], uuid);
});

test("2.4 — getApiKeyMetadata retorna allowedConnections corretamente", async () => {
  const created = await apiKeysDb.createApiKey("meta-key", "machine-t08");
  const uuid = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

  await apiKeysDb.updateApiKeyPermissions(created.id, { allowedConnections: [uuid] });

  const meta = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.ok(Array.isArray(meta?.allowedConnections));
  assert.equal(meta?.allowedConnections[0], uuid);
});

test("2.5 — allowedConnections: [] persiste como array vazio (não null)", async () => {
  const created = await apiKeysDb.createApiKey("empty-conn-key", "machine-t08");
  const uuid = "550e8400-e29b-41d4-a716-446655440000";

  // Primeiro adiciona um UUID
  await apiKeysDb.updateApiKeyPermissions(created.id, { allowedConnections: [uuid] });

  // Reseta para array vazio
  await apiKeysDb.updateApiKeyPermissions(created.id, { allowedConnections: [] });

  const row = await apiKeysDb.getApiKeyById(created.id);
  assert.ok(Array.isArray(row?.allowedConnections));
  assert.deepEqual(row?.allowedConnections, []);
});

test("2.6 — cache é invalidado após update (2ª chamada ao metadata reflete novo valor)", async () => {
  const created = await apiKeysDb.createApiKey("cache-test-key", "machine-t08");
  const uuid = "550e8400-e29b-41d4-a716-446655440000";

  // Primeira chamada popula cache (allowedConnections vazio)
  const before = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.deepEqual(before?.allowedConnections, []);

  // Atualiza — deve invalidar cache
  await apiKeysDb.updateApiKeyPermissions(created.id, { allowedConnections: [uuid] });

  // Segunda chamada deve retornar novo valor (não o cache antigo)
  const after = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.deepEqual(after?.allowedConnections, [uuid]);
});
