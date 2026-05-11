import { v4 as uuidv4 } from "uuid";
import type { CompressionPipelineStep } from "@omniroute/open-sse/services/compression/types.ts";

import { backupDbFile } from "./backup";
import { getDbInstance, rowToCamel } from "./core";

export interface CompressionCombo {
  id: string;
  name: string;
  description: string;
  pipeline: CompressionPipelineStep[];
  languagePacks: string[];
  outputMode: boolean;
  outputModeIntensity: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CompressionComboAssignment {
  id: string;
  compressionComboId: string;
  routingComboId: string;
  createdAt: string;
}

type JsonRecord = Record<string, unknown>;

const DEFAULT_COMPRESSION_COMBO_ID = "default-caveman";
const DEFAULT_COMPRESSION_COMBO_NAME = "Standard Savings";
const DEFAULT_COMPRESSION_COMBO_DESCRIPTION = "Default RTK + Caveman compression pipeline";
const LEGACY_DEFAULT_COMPRESSION_COMBO_DESCRIPTION = "Default Caveman compression pipeline";

function defaultCompressionComboPipeline(): CompressionPipelineStep[] {
  return [
    { engine: "rtk", intensity: "standard" },
    { engine: "caveman", intensity: "full" },
  ];
}

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function parseJsonArray<T>(value: unknown, fallback: T[]): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value !== "string") return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function normalizePipeline(value: unknown): CompressionPipelineStep[] {
  return parseJsonArray<CompressionPipelineStep>(value, []).filter((step) => {
    return (
      step &&
      typeof step === "object" &&
      ["lite", "caveman", "aggressive", "ultra", "rtk"].includes(String(step.engine))
    );
  });
}

function normalizeLanguagePacks(value: unknown): string[] {
  const packs = parseJsonArray<string>(value, ["en"]).filter(
    (pack): pack is string => typeof pack === "string" && pack.trim().length > 0
  );
  return [...new Set(packs.length > 0 ? packs.map((pack) => pack.trim()) : ["en"])];
}

function isLegacySeededDefaultPipeline(pipeline: CompressionPipelineStep[]): boolean {
  if (pipeline.length !== 1) return false;
  const [step] = pipeline;
  return step.engine === "caveman" && (step.intensity === undefined || step.intensity === "full");
}

function upgradeLegacySeededDefaultCompressionCombo(): void {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT name, description, pipeline FROM compression_combos WHERE id = ?")
    .get(DEFAULT_COMPRESSION_COMBO_ID) as
    | { name?: string; description?: string; pipeline?: string }
    | undefined;

  if (!row) return;

  const description = String(row.description ?? "");
  const isSeededMetadata =
    String(row.name ?? "") === DEFAULT_COMPRESSION_COMBO_NAME &&
    (description === LEGACY_DEFAULT_COMPRESSION_COMBO_DESCRIPTION ||
      description === DEFAULT_COMPRESSION_COMBO_DESCRIPTION);

  if (!isSeededMetadata || !isLegacySeededDefaultPipeline(normalizePipeline(row.pipeline))) return;

  db.prepare(
    `
    UPDATE compression_combos
    SET description = ?, pipeline = ?, updated_at = ?
    WHERE id = ?
  `
  ).run(
    DEFAULT_COMPRESSION_COMBO_DESCRIPTION,
    JSON.stringify(defaultCompressionComboPipeline()),
    new Date().toISOString(),
    DEFAULT_COMPRESSION_COMBO_ID
  );
}

function ensureCompressionComboTables(): void {
  const db = getDbInstance();
  db.exec(`
    CREATE TABLE IF NOT EXISTS compression_combos (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      pipeline TEXT NOT NULL DEFAULT '[]',
      language_packs TEXT DEFAULT '["en"]',
      output_mode INTEGER DEFAULT 0,
      output_mode_intensity TEXT DEFAULT 'full',
      is_default INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS compression_combo_assignments (
      id TEXT PRIMARY KEY,
      compression_combo_id TEXT NOT NULL REFERENCES compression_combos(id) ON DELETE CASCADE,
      routing_combo_id TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(routing_combo_id)
    );

    CREATE INDEX IF NOT EXISTS idx_compression_combos_default
      ON compression_combos(is_default);
    CREATE INDEX IF NOT EXISTS idx_compression_combo_assignments_combo
      ON compression_combo_assignments(compression_combo_id);
    CREATE INDEX IF NOT EXISTS idx_compression_combo_assignments_routing
      ON compression_combo_assignments(routing_combo_id);
  `);
  db.prepare(
    `
    INSERT OR IGNORE INTO compression_combos (
      id, name, description, pipeline, language_packs, output_mode, output_mode_intensity, is_default
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    DEFAULT_COMPRESSION_COMBO_ID,
    DEFAULT_COMPRESSION_COMBO_NAME,
    DEFAULT_COMPRESSION_COMBO_DESCRIPTION,
    JSON.stringify(defaultCompressionComboPipeline()),
    JSON.stringify(["en"]),
    0,
    "full",
    1
  );
  upgradeLegacySeededDefaultCompressionCombo();
}

function rowToCompressionCombo(row: unknown): CompressionCombo | null {
  if (!row) return null;
  const camel = rowToCamel(row as Record<string, unknown>) as JsonRecord;
  return {
    id: String(camel.id),
    name: String(camel.name ?? ""),
    description: String(camel.description ?? ""),
    pipeline: normalizePipeline(camel.pipeline),
    languagePacks: normalizeLanguagePacks(camel.languagePacks),
    outputMode: Boolean(camel.outputMode),
    outputModeIntensity: String(camel.outputModeIntensity ?? "full"),
    isDefault: Boolean(camel.isDefault),
    createdAt: String(camel.createdAt ?? ""),
    updatedAt: String(camel.updatedAt ?? ""),
  };
}

function rowToAssignment(row: unknown): CompressionComboAssignment | null {
  if (!row) return null;
  const camel = rowToCamel(row as Record<string, unknown>) as JsonRecord;
  return {
    id: String(camel.id),
    compressionComboId: String(camel.compressionComboId),
    routingComboId: String(camel.routingComboId),
    createdAt: String(camel.createdAt ?? ""),
  };
}

function buildComboPayload(data: Partial<CompressionCombo>, existing?: CompressionCombo) {
  const now = new Date().toISOString();
  return {
    id: existing?.id ?? data.id ?? uuidv4(),
    name: data.name?.trim() || existing?.name || "Compression Combo",
    description: data.description ?? existing?.description ?? "",
    pipeline:
      data.pipeline && data.pipeline.length > 0
        ? data.pipeline
        : existing?.pipeline && existing.pipeline.length > 0
          ? existing.pipeline
          : defaultCompressionComboPipeline(),
    languagePacks:
      data.languagePacks && data.languagePacks.length > 0
        ? data.languagePacks
        : existing?.languagePacks && existing.languagePacks.length > 0
          ? existing.languagePacks
          : ["en"],
    outputMode: data.outputMode ?? existing?.outputMode ?? false,
    outputModeIntensity: data.outputModeIntensity ?? existing?.outputModeIntensity ?? "full",
    isDefault: data.isDefault ?? existing?.isDefault ?? false,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}

export function listCompressionCombos(): CompressionCombo[] {
  ensureCompressionComboTables();
  const db = getDbInstance();
  return db
    .prepare("SELECT * FROM compression_combos ORDER BY is_default DESC, name COLLATE NOCASE ASC")
    .all()
    .map(rowToCompressionCombo)
    .filter((combo): combo is CompressionCombo => combo !== null);
}

export function getCompressionCombo(id: string): CompressionCombo | null {
  ensureCompressionComboTables();
  const row = getDbInstance().prepare("SELECT * FROM compression_combos WHERE id = ?").get(id);
  return rowToCompressionCombo(row);
}

export function getDefaultCompressionCombo(): CompressionCombo | null {
  ensureCompressionComboTables();
  const row = getDbInstance()
    .prepare(
      "SELECT * FROM compression_combos WHERE is_default = 1 ORDER BY updated_at DESC LIMIT 1"
    )
    .get();
  return rowToCompressionCombo(row);
}

export function createCompressionCombo(data: Partial<CompressionCombo>): CompressionCombo {
  ensureCompressionComboTables();
  const db = getDbInstance();
  const combo = buildComboPayload(data);
  const tx = db.transaction(() => {
    if (combo.isDefault) db.prepare("UPDATE compression_combos SET is_default = 0").run();
    db.prepare(
      `
      INSERT INTO compression_combos (
        id, name, description, pipeline, language_packs, output_mode, output_mode_intensity,
        is_default, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    ).run(
      combo.id,
      combo.name,
      combo.description,
      JSON.stringify(combo.pipeline),
      JSON.stringify(combo.languagePacks),
      combo.outputMode ? 1 : 0,
      combo.outputModeIntensity,
      combo.isDefault ? 1 : 0,
      combo.createdAt,
      combo.updatedAt
    );
  });
  tx();
  backupDbFile("pre-write");
  return getCompressionCombo(combo.id) as CompressionCombo;
}

export function updateCompressionCombo(
  id: string,
  data: Partial<CompressionCombo>
): CompressionCombo | null {
  ensureCompressionComboTables();
  const existing = getCompressionCombo(id);
  if (!existing) return null;
  const combo = buildComboPayload(data, existing);
  const db = getDbInstance();
  const tx = db.transaction(() => {
    if (combo.isDefault) db.prepare("UPDATE compression_combos SET is_default = 0").run();
    db.prepare(
      `
      UPDATE compression_combos
      SET name = ?, description = ?, pipeline = ?, language_packs = ?, output_mode = ?,
          output_mode_intensity = ?, is_default = ?, updated_at = ?
      WHERE id = ?
    `
    ).run(
      combo.name,
      combo.description,
      JSON.stringify(combo.pipeline),
      JSON.stringify(combo.languagePacks),
      combo.outputMode ? 1 : 0,
      combo.outputModeIntensity,
      combo.isDefault ? 1 : 0,
      combo.updatedAt,
      id
    );
  });
  tx();
  backupDbFile("pre-write");
  return getCompressionCombo(id);
}

export function deleteCompressionCombo(id: string): boolean {
  ensureCompressionComboTables();
  const existing = getCompressionCombo(id);
  if (!existing || existing.isDefault) return false;
  const result = getDbInstance().prepare("DELETE FROM compression_combos WHERE id = ?").run(id);
  if (result.changes > 0) backupDbFile("pre-write");
  return result.changes > 0;
}

export function setDefaultCompressionCombo(id: string): boolean {
  ensureCompressionComboTables();
  if (!getCompressionCombo(id)) return false;
  const db = getDbInstance();
  const now = new Date().toISOString();
  db.transaction(() => {
    db.prepare("UPDATE compression_combos SET is_default = 0").run();
    db.prepare("UPDATE compression_combos SET is_default = 1, updated_at = ? WHERE id = ?").run(
      now,
      id
    );
  })();
  backupDbFile("pre-write");
  return true;
}

export function getAssignmentsForCompressionCombo(id: string): CompressionComboAssignment[] {
  ensureCompressionComboTables();
  return getDbInstance()
    .prepare(
      "SELECT * FROM compression_combo_assignments WHERE compression_combo_id = ? ORDER BY routing_combo_id"
    )
    .all(id)
    .map(rowToAssignment)
    .filter((assignment): assignment is CompressionComboAssignment => assignment !== null);
}

export function getCompressionComboForRoutingCombo(
  routingComboId: string
): CompressionCombo | null {
  ensureCompressionComboTables();
  const row = getDbInstance()
    .prepare(
      `
      SELECT c.*
      FROM compression_combos c
      JOIN compression_combo_assignments a ON a.compression_combo_id = c.id
      WHERE a.routing_combo_id = ?
      LIMIT 1
    `
    )
    .get(routingComboId);
  return rowToCompressionCombo(row);
}

export function assignRoutingCombo(compressionComboId: string, routingComboId: string): boolean {
  ensureCompressionComboTables();
  if (!getCompressionCombo(compressionComboId) || !routingComboId.trim()) return false;
  getDbInstance()
    .prepare(
      `
      INSERT OR REPLACE INTO compression_combo_assignments (
        id, compression_combo_id, routing_combo_id, created_at
      )
      VALUES (?, ?, ?, ?)
    `
    )
    .run(uuidv4(), compressionComboId, routingComboId.trim(), new Date().toISOString());
  backupDbFile("pre-write");
  return true;
}

export function unassignRoutingCombo(compressionComboId: string, routingComboId: string): boolean {
  ensureCompressionComboTables();
  const result = getDbInstance()
    .prepare(
      "DELETE FROM compression_combo_assignments WHERE compression_combo_id = ? AND routing_combo_id = ?"
    )
    .run(compressionComboId, routingComboId);
  if (result.changes > 0) backupDbFile("pre-write");
  return result.changes > 0;
}

export function updateAssignments(compressionComboId: string, routingComboIds: string[]): boolean {
  ensureCompressionComboTables();
  if (!getCompressionCombo(compressionComboId)) return false;
  const cleanedIds = [...new Set(routingComboIds.map((id) => id.trim()).filter(Boolean))];
  const db = getDbInstance();
  db.transaction(() => {
    db.prepare("DELETE FROM compression_combo_assignments WHERE compression_combo_id = ?").run(
      compressionComboId
    );
    if (cleanedIds.length > 0) {
      const deleteExisting = db.prepare(
        "DELETE FROM compression_combo_assignments WHERE routing_combo_id = ?"
      );
      const insert = db.prepare(
        `
        INSERT INTO compression_combo_assignments (
          id, compression_combo_id, routing_combo_id, created_at
        )
        VALUES (?, ?, ?, ?)
      `
      );
      for (const routingComboId of cleanedIds) {
        deleteExisting.run(routingComboId);
        insert.run(uuidv4(), compressionComboId, routingComboId, new Date().toISOString());
      }
    }
  })();
  backupDbFile("pre-write");
  return true;
}
