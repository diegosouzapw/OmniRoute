/**
 * db/models.js — Model aliases, MITM aliases, and custom models.
 */

import { getDbInstance } from "./core.js";
import { backupDbFile } from "./backup.js";

// ──────────────── Model Aliases ────────────────

export async function getModelAliases() {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'modelAliases'")
    .all();
  const result = {};
  for (const row of rows) {
    result[row.key] = JSON.parse(row.value);
  }
  return result;
}

export async function setModelAlias(alias, model) {
  const db = getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('modelAliases', ?, ?)"
  ).run(alias, JSON.stringify(model));
  backupDbFile("pre-write");
}

export async function deleteModelAlias(alias) {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = 'modelAliases' AND key = ?").run(alias);
  backupDbFile("pre-write");
}

// ──────────────── MITM Alias ────────────────

export async function getMitmAlias(toolName) {
  const db = getDbInstance();
  if (toolName) {
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'mitmAlias' AND key = ?")
      .get(toolName);
    return row ? JSON.parse(row.value) : {};
  }
  const rows = db.prepare("SELECT key, value FROM key_value WHERE namespace = 'mitmAlias'").all();
  const result = {};
  for (const row of rows) {
    result[row.key] = JSON.parse(row.value);
  }
  return result;
}

export async function setMitmAliasAll(toolName, mappings) {
  const db = getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('mitmAlias', ?, ?)"
  ).run(toolName, JSON.stringify(mappings || {}));
  backupDbFile("pre-write");
}

// ──────────────── Custom Models ────────────────

export async function getCustomModels(providerId) {
  const db = getDbInstance();
  if (providerId) {
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?")
      .get(providerId);
    return row ? JSON.parse(row.value) : [];
  }
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'customModels'")
    .all();
  const result = {};
  for (const row of rows) result[row.key] = JSON.parse(row.value);
  return result;
}

export async function getAllCustomModels() {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'customModels'")
    .all();
  const result = {};
  for (const row of rows) result[row.key] = JSON.parse(row.value);
  return result;
}

export async function addCustomModel(providerId, modelId, modelName, source = "manual") {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?")
    .get(providerId);
  const models = row ? JSON.parse(row.value) : [];

  const exists = models.find((m) => m.id === modelId);
  if (exists) return exists;

  const model = { id: modelId, name: modelName || modelId, source };
  models.push(model);
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('customModels', ?, ?)"
  ).run(providerId, JSON.stringify(models));
  backupDbFile("pre-write");
  return model;
}

export async function removeCustomModel(providerId, modelId) {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?")
    .get(providerId);
  if (!row) return false;

  const models = JSON.parse(row.value);
  const before = models.length;
  const filtered = models.filter((m) => m.id !== modelId);

  if (filtered.length === before) return false;

  if (filtered.length === 0) {
    db.prepare("DELETE FROM key_value WHERE namespace = 'customModels' AND key = ?").run(
      providerId
    );
  } else {
    db.prepare("UPDATE key_value SET value = ? WHERE namespace = 'customModels' AND key = ?").run(
      JSON.stringify(filtered),
      providerId
    );
  }

  backupDbFile("pre-write");
  return true;
}
