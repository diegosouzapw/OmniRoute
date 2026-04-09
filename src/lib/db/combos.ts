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

function getSortOrder(value: unknown): number | null {
  const row = asRecord(value);
  return typeof row.sort_order === "number" ? row.sort_order : null;
}

function withSortOrder(payload: string, sortOrder: number | null): JsonRecord {
  const parsed = JSON.parse(payload) as JsonRecord;
  if (typeof sortOrder === "number") {
    parsed.sortOrder = sortOrder;
  }
  return parsed;
}

function getNextSortOrder() {
  const db = getDbInstance();
  const row = db.prepare("SELECT COALESCE(MAX(sort_order), 0) AS sort_order FROM combos").get();
  const sortOrder = getSortOrder(row);
  return (sortOrder ?? 0) + 1;
}

export async function getCombos() {
  const db = getDbInstance();
  return db
    .prepare("SELECT data, sort_order FROM combos ORDER BY sort_order ASC, name COLLATE NOCASE ASC")
    .all()
    .map((row) => {
      const payload = getSerializedData(row);
      if (!payload) return null;
      return withSortOrder(payload, getSortOrder(row));
    })
    .filter((row): row is JsonRecord => row !== null);
}

export async function getComboById(id: string) {
  const db = getDbInstance();
  const row = db.prepare("SELECT data, sort_order FROM combos WHERE id = ?").get(id);
  const payload = getSerializedData(row);
  return payload ? withSortOrder(payload, getSortOrder(row)) : null;
}

export async function getComboByName(name: string) {
  const db = getDbInstance();
  const row = db.prepare("SELECT data, sort_order FROM combos WHERE name = ?").get(name);
  const payload = getSerializedData(row);
  return payload ? withSortOrder(payload, getSortOrder(row)) : null;
}

export async function createCombo(data: JsonRecord) {
  const db = getDbInstance();
  const now = new Date().toISOString();
  const sortOrder = typeof data.sortOrder === "number" ? data.sortOrder : getNextSortOrder();

  const combo = {
    id: uuidv4(),
    name: data.name,
    models: data.models || [],
    strategy: data.strategy || "priority",
    config: data.config || {},
    isHidden: Boolean(data.isHidden),
    sortOrder,
    createdAt: now,
    updatedAt: now,
  };

  db.prepare(
    "INSERT INTO combos (id, name, data, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(combo.id, combo.name, JSON.stringify(combo), sortOrder, now, now);

  backupDbFile("pre-write");
  return combo;
}

export async function updateCombo(id: string, data: JsonRecord) {
  const db = getDbInstance();
  const existing = db.prepare("SELECT data, sort_order FROM combos WHERE id = ?").get(id);
  if (!existing) return null;

  const serializedCurrent = getSerializedData(existing);
  if (!serializedCurrent) return null;
  const current = withSortOrder(serializedCurrent, getSortOrder(existing));
  const sortOrder =
    typeof data.sortOrder === "number"
      ? data.sortOrder
      : typeof current.sortOrder === "number"
        ? current.sortOrder
        : getNextSortOrder();
  const merged: JsonRecord = {
    ...current,
    ...data,
    sortOrder,
    updatedAt: new Date().toISOString(),
  };
  const currentName = typeof current.name === "string" ? current.name : "";
  const nextName =
    typeof merged["name"] === "string" && merged["name"].trim().length > 0
      ? merged["name"]
      : currentName;

  db.prepare(
    "UPDATE combos SET name = ?, data = ?, sort_order = ?, updated_at = ? WHERE id = ?"
  ).run(nextName, JSON.stringify({ ...merged, name: nextName }), sortOrder, merged.updatedAt, id);

  backupDbFile("pre-write");
  return { ...merged, name: nextName };
}

export async function reorderCombos(comboIds: string[]) {
  const db = getDbInstance();
  const rows = db
    .prepare(
      "SELECT id, name, data, sort_order FROM combos ORDER BY sort_order ASC, name COLLATE NOCASE ASC"
    )
    .all();
  if (rows.length === 0) return [];

  const existingIds = new Set(
    rows
      .map((row) => {
        const record = asRecord(row);
        return typeof record.id === "string" ? record.id : null;
      })
      .filter((id): id is string => id !== null)
  );

  const seen = new Set<string>();
  const requestedIds = comboIds.filter((id) => {
    if (!existingIds.has(id) || seen.has(id)) return false;
    seen.add(id);
    return true;
  });

  const orderedIds = [
    ...requestedIds,
    ...rows
      .map((row) => {
        const record = asRecord(row);
        return typeof record.id === "string" ? record.id : null;
      })
      .filter((id): id is string => id !== null && !seen.has(id)),
  ];

  const update = db.prepare(
    "UPDATE combos SET data = ?, sort_order = ?, updated_at = ? WHERE id = ?"
  );
  const now = new Date().toISOString();
  const rowById = new Map(
    rows.map((row) => {
      const record = asRecord(row);
      return [String(record.id), row];
    })
  );

  const reorderTransaction = db.transaction(() => {
    orderedIds.forEach((id, index) => {
      const row = rowById.get(id);
      const payload = row ? getSerializedData(row) : null;
      if (!payload) return;
      const combo = withSortOrder(payload, getSortOrder(row));
      const sortOrder = index + 1;
      const updatedCombo = { ...combo, sortOrder, updatedAt: now };
      update.run(JSON.stringify(updatedCombo), sortOrder, now, id);
    });
  });

  reorderTransaction();
  backupDbFile("pre-write");
  return getCombos();
}

export async function deleteCombo(id: string) {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM combos WHERE id = ?").run(id);
  if (result.changes === 0) return false;
  backupDbFile("pre-write");
  return true;
}
