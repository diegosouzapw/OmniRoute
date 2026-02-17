/**
 * db/combos.js — Combo CRUD operations.
 */

import { v4 as uuidv4 } from "uuid";
import { getDbInstance } from "./core";
import { backupDbFile } from "./backup";

export async function getCombos() {
  const db = getDbInstance();
  return db
    .prepare("SELECT data FROM combos ORDER BY name")
    .all()
    .map((r) => JSON.parse(r.data));
}

export async function getComboById(id) {
  const db = getDbInstance();
  const row = db.prepare("SELECT data FROM combos WHERE id = ?").get(id);
  return row ? JSON.parse(row.data) : null;
}

export async function getComboByName(name) {
  const db = getDbInstance();
  const row = db.prepare("SELECT data FROM combos WHERE name = ?").get(name);
  return row ? JSON.parse(row.data) : null;
}

export async function createCombo(data) {
  const db = getDbInstance();
  const now = new Date().toISOString();

  const combo = {
    id: uuidv4(),
    name: data.name,
    models: data.models || [],
    strategy: data.strategy || "priority",
    config: data.config || {},
    createdAt: now,
    updatedAt: now,
  };

  db.prepare(
    "INSERT INTO combos (id, name, data, created_at, updated_at) VALUES (?, ?, ?, ?, ?)"
  ).run(combo.id, combo.name, JSON.stringify(combo), now, now);

  backupDbFile("pre-write");
  return combo;
}

export async function updateCombo(id, data) {
  const db = getDbInstance();
  const existing = db.prepare("SELECT data FROM combos WHERE id = ?").get(id);
  if (!existing) return null;

  const current = JSON.parse(existing.data);
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

export async function deleteCombo(id) {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM combos WHERE id = ?").run(id);
  if (result.changes === 0) return false;
  backupDbFile("pre-write");
  return true;
}
