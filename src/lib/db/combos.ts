/**
 * db/combos.js — Combo CRUD operations.
 */

import { v4 as uuidv4 } from "uuid";
import { getDbInstance } from "./core";
import { backupDbFile } from "./backup";
import { normalizeComboRecord } from "@/lib/combos/steps";

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

function getComboNameSet(
  db: ReturnType<typeof getDbInstance>,
  extraNames: string[] = []
): Set<string> {
  const rows = db.prepare("SELECT name FROM combos").all();
  const names = new Set<string>();

  for (const row of rows) {
    const record = asRecord(row);
    if (typeof record.name === "string" && record.name.trim().length > 0) {
      names.add(record.name.trim());
    }
  }

  for (const name of extraNames) {
    if (typeof name === "string" && name.trim().length > 0) {
      names.add(name.trim());
    }
  }

  return names;
}

function normalizeStoredCombo(
  combo: JsonRecord,
  db: ReturnType<typeof getDbInstance>,
  extraNames: string[] = []
): JsonRecord {
  return normalizeComboRecord(combo, {
    allCombos: getComboNameSet(db, extraNames),
  }) as JsonRecord;
}

function parseComboRow(row: unknown): JsonRecord | null {
  const payload = getSerializedData(row);
  if (!payload) return null;
  return withSortOrder(payload, getSortOrder(row));
}

function getNextSortOrder() {
  const db = getDbInstance();
  const row = db.prepare("SELECT COALESCE(MAX(sort_order), 0) AS sort_order FROM combos").get();
  const sortOrder = getSortOrder(row);
  return (sortOrder ?? 0) + 1;
}

export async function getCombos() {
  const db = getDbInstance();
  const rawCombos = db
    .prepare("SELECT data, sort_order FROM combos ORDER BY sort_order ASC, name COLLATE NOCASE ASC")
    .all()
    .map((row) => parseComboRow(row))
    .filter((row): row is JsonRecord => row !== null);

  const comboNames = rawCombos
    .map((combo) => (typeof combo.name === "string" ? combo.name.trim() : ""))
    .filter((name): name is string => name.length > 0);

  return rawCombos.map((combo) =>
    normalizeComboRecord(combo, {
      allCombos: comboNames,
    })
  );
}

export async function getComboById(id: string) {
  const db = getDbInstance();
  const row = db.prepare("SELECT data, sort_order FROM combos WHERE id = ?").get(id);
  const combo = parseComboRow(row);
  if (!combo) return null;
  return normalizeStoredCombo(combo, db, typeof combo.name === "string" ? [combo.name] : []);
}

export async function getComboByName(name: string) {
  const db = getDbInstance();
  const row = db.prepare("SELECT data, sort_order FROM combos WHERE name = ?").get(name);
  const combo = parseComboRow(row);
  if (!combo) return null;
  return normalizeStoredCombo(combo, db, [name]);
}

export async function createCombo(data: JsonRecord) {
  const db = getDbInstance();
  const now = new Date().toISOString();
  const sortOrder = typeof data.sortOrder === "number" ? data.sortOrder : getNextSortOrder();
  const comboId = typeof data.id === "string" && data.id.trim().length > 0 ? data.id : uuidv4();
  const combo = normalizeStoredCombo(
    {
      ...data,
      id: comboId,
      name: data.name,
      models: data.models || [],
      strategy: data.strategy || "priority",
      config: data.config || {},
      isHidden: Boolean(data.isHidden),
      sortOrder,
      createdAt: now,
      updatedAt: now,
    },
    db,
    typeof data.name === "string" ? [data.name] : []
  );

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

  const current = parseComboRow(existing);
  if (!current) return null;
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
  // Remove fields explicitly set to null (for deletion support)
  for (const key of Object.keys(data)) {
    if (data[key] === null) {
      delete merged[key];
    }
  }
  const currentName = typeof current.name === "string" ? current.name : "";
  const nextName =
    typeof merged["name"] === "string" && merged["name"].trim().length > 0
      ? merged["name"]
      : currentName;
  const normalizedMerged = normalizeStoredCombo({ ...merged, name: nextName }, db, [nextName]);

  db.prepare(
    "UPDATE combos SET name = ?, data = ?, sort_order = ?, updated_at = ? WHERE id = ?"
  ).run(nextName, JSON.stringify(normalizedMerged), sortOrder, normalizedMerged.updatedAt, id);

  backupDbFile("pre-write");
  return normalizedMerged;
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
  const comboNames = rows
    .map((row) => {
      const combo = parseComboRow(row);
      return combo && typeof combo.name === "string" ? combo.name.trim() : "";
    })
    .filter((name): name is string => name.length > 0);

  const reorderTransaction = db.transaction(() => {
    orderedIds.forEach((id, index) => {
      const row = rowById.get(id);
      const combo = row ? parseComboRow(row) : null;
      if (!combo) return;
      const sortOrder = index + 1;
      const updatedCombo = normalizeComboRecord(
        { ...combo, sortOrder, updatedAt: now },
        { allCombos: comboNames }
      );
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
