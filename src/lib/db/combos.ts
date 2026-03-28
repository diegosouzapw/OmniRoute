/**
 * db/combos.js — Combo CRUD operations.
 */

import { v4 as uuidv4 } from "uuid";
import { getDbInstance } from "./core";
import { backupDbFile } from "./backup";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function getSerializedData(value: unknown): string | null {
  const row = asRecord(value);
  return typeof row.data === "string" ? row.data : null;
}

export async function getCombos() {
  const db = getDbInstance();
  return db
    .prepare("SELECT data FROM combos ORDER BY name")
    .all()
    .map((row) => getSerializedData(row))
    .filter((row): row is string => row !== null)
    .map((row) => JSON.parse(row));
}

export async function getComboById(id: string) {
  const db = getDbInstance();
  const row = db.prepare("SELECT data FROM combos WHERE id = ?").get(id);
  const payload = getSerializedData(row);
  return payload ? JSON.parse(payload) : null;
}

export async function getComboByName(name: string) {
  const db = getDbInstance();
  const row = db.prepare("SELECT data FROM combos WHERE name = ?").get(name);
  const payload = getSerializedData(row);
  return payload ? JSON.parse(payload) : null;
}

export async function createCombo(data: JsonRecord) {
  const db = getDbInstance();
  const now = new Date().toISOString();

  const combo = {
    id: uuidv4(),
    name: data.name,
    models: data.models || [],
    strategy: data.strategy || "priority",
    config: data.config || {},
    isHidden: Boolean(data.isHidden),
    createdAt: now,
    updatedAt: now,
  };

  db.prepare(
    "INSERT INTO combos (id, name, data, created_at, updated_at) VALUES (?, ?, ?, ?, ?)"
  ).run(combo.id, combo.name, JSON.stringify(combo), now, now);

  backupDbFile("pre-write");
  return combo;
}

export async function updateCombo(id: string, data: JsonRecord) {
  const db = getDbInstance();
  const existing = db.prepare("SELECT data FROM combos WHERE id = ?").get(id);
  if (!existing) return null;

  const serializedCurrent = getSerializedData(existing);
  if (!serializedCurrent) return null;
  const current = JSON.parse(serializedCurrent);
  const merged = { ...current, ...data, updatedAt: new Date().toISOString() };

  db.prepare("UPDATE combos SET name = ?, data = ?, updated_at = ? WHERE id = ?").run(
    merged.name,
    JSON.stringify(merged),
    merged.updatedAt,
    id
  );

  backupDbFile("pre-write");
  return merged;
}

export async function deleteCombo(id: string) {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM combos WHERE id = ?").run(id);
  if (result.changes === 0) return false;
  backupDbFile("pre-write");
  return true;
}
