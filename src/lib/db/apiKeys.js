/**
 * db/apiKeys.js — API key management.
 */

import { v4 as uuidv4 } from "uuid";
import { getDbInstance, rowToCamel } from "./core.js";
import { backupDbFile } from "./backup.js";

export async function getApiKeys() {
  const db = getDbInstance();
  return db.prepare("SELECT * FROM api_keys ORDER BY created_at").all().map(rowToCamel);
}

export async function createApiKey(name, machineId) {
  if (!machineId) {
    throw new Error("machineId is required");
  }

  const db = getDbInstance();
  const now = new Date().toISOString();

  const { generateApiKeyWithMachine } = await import("@/shared/utils/apiKey");
  const result = generateApiKeyWithMachine(machineId);

  const apiKey = {
    id: uuidv4(),
    name: name,
    key: result.key,
    machineId: machineId,
    createdAt: now,
  };

  db.prepare(
    "INSERT INTO api_keys (id, name, key, machine_id, created_at) VALUES (?, ?, ?, ?, ?)"
  ).run(apiKey.id, apiKey.name, apiKey.key, apiKey.machineId, apiKey.createdAt);

  backupDbFile("pre-write");
  return apiKey;
}

export async function deleteApiKey(id) {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM api_keys WHERE id = ?").run(id);
  if (result.changes === 0) return false;
  backupDbFile("pre-write");
  return true;
}

export async function validateApiKey(key) {
  const db = getDbInstance();
  const row = db.prepare("SELECT 1 FROM api_keys WHERE key = ?").get(key);
  return !!row;
}

export async function getApiKeyMetadata(key) {
  if (!key) return null;
  const db = getDbInstance();
  const row = db.prepare("SELECT id, name, machine_id FROM api_keys WHERE key = ?").get(key);
  if (!row) return null;
  return { id: row.id, name: row.name, machineId: row.machine_id };
}
