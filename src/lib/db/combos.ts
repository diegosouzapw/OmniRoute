/**
 * db/combos.js — Combo CRUD operations.
 */

import { v4 as uuidv4 } from "uuid";
import { getDbInstance } from "./core";
import { backupDbFile } from "./backup";
import { invalidateDbCache } from "./readCache";
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
  const parsed = withSortOrder(payload, getSortOrder(row));
  // Merge deduplicated column values back into the record
  const record = asRecord(row);
  if (record.context_cache_protection !== undefined && record.context_cache_protection !== null) {
    // Column is authoritative when explicitly enabled (1).
    // When column is 0 (unset default) preserve the JSON blob value
    // to avoid silently disabling the feature on pre-migration rows.
    if (record.context_cache_protection === 1) {
      parsed.context_cache_protection = true;
    }
    // Column is 0 — keep existing JSON blob value
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
  const rawCombos = db
    .prepare("SELECT data, sort_order, context_cache_protection FROM combos ORDER BY sort_order ASC, name COLLATE NOCASE ASC")
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
  const row = db.prepare("SELECT data, sort_order, context_cache_protection FROM combos WHERE id = ?").get(id);
  const combo = parseComboRow(row);
  if (!combo) return null;
  return normalizeStoredCombo(combo, db, typeof combo.name === "string" ? [combo.name] : []);
}

export async function getComboByName(name: string) {
  const db = getDbInstance();
  const row = db.prepare("SELECT data, sort_order, context_cache_protection FROM combos WHERE name = ?").get(name);
  const combo = parseComboRow(row);
  if (!combo) return null;
  return normalizeStoredCombo(combo, db, [name]);
}

// #4446: case-insensitive name lookup. The opencode dispatch path forwards a
// lowercased combo slug (e.g. "master-light") for a combo provisioned as
// "MASTER-LIGHT"; the default BINARY collation of getComboByName misses it.
// Used only as a fallback after the exact match fails, so it cannot change the
// resolution of any combo that already resolves today.
export async function getComboByNameInsensitive(name: string) {
  const db = getDbInstance();
  const row = db
    .prepare(
      "SELECT data, sort_order, context_cache_protection FROM combos WHERE name = ? COLLATE NOCASE"
    )
    .get(name);
  const combo = parseComboRow(row);
  if (!combo) return null;
  const storedName = typeof combo.name === "string" ? combo.name : name;
  return normalizeStoredCombo(combo, db, [storedName]);
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

  const contextCache = data.context_cache_protection ? 1 : 0;
  db.prepare(
    "INSERT INTO combos (id, name, data, sort_order, created_at, updated_at, context_cache_protection) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).run(combo.id, combo.name, JSON.stringify(combo), sortOrder, now, now, contextCache);

  invalidateDbCache("combos");
  backupDbFile("pre-write");
  return combo;
}

export async function updateCombo(id: string, data: JsonRecord) {
  const db = getDbInstance();
  const existing = db.prepare("SELECT data, sort_order, context_cache_protection FROM combos WHERE id = ?").get(id);
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
  const contextCacheProtection = normalizedMerged.context_cache_protection ? 1 : 0;

  db.prepare(
    "UPDATE combos SET name = ?, data = ?, sort_order = ?, updated_at = ?, context_cache_protection = ? WHERE id = ?"
  ).run(nextName, JSON.stringify(normalizedMerged), sortOrder, normalizedMerged.updatedAt, contextCacheProtection, id);

  invalidateDbCache("combos");
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
  invalidateDbCache("combos");
  backupDbFile("pre-write");
  return getCombos();
}

export async function deleteCombo(id: string) {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM combos WHERE id = ?").run(id);
  if (result.changes === 0) return false;
  invalidateDbCache("combos");
  backupDbFile("pre-write");
  return true;
}

export async function deleteComboByName(name: string) {
  const combo = await getComboByName(name);
  if (!combo || typeof combo.id !== "string") return false;
  return deleteCombo(combo.id);
}

export function setActiveCombo(name: string, db = getDbInstance()) {
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'activeCombo', ?)"
  ).run(JSON.stringify(name));
}
