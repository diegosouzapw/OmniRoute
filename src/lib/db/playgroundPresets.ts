/**
 * db/playgroundPresets.ts — Playground Studio preset persistence.
 *
 * CRUD operations for the playground_presets table (migration 076).
 * All queries use db.prepare() (better-sqlite3) — never raw db.exec() or
 * string interpolation.
 *
 * @module lib/db/playgroundPresets
 */

import { getDbInstance } from "./core";
import { randomUUID } from "node:crypto";

// TODO(F1-merge): swap to import from "@/shared/schemas/playground" after F1 lands
export interface PlaygroundPresetListItem {
  id: string;
  name: string;
  endpoint: string;
  model: string;
  system: string | null;
  params: Record<string, unknown>;
  created_at: string;
}

type PlaygroundPresetRow = {
  id: string;
  name: string;
  endpoint: string;
  model: string;
  system: string | null;
  params_json: string;
  created_at: string;
};

function rowToItem(row: PlaygroundPresetRow): PlaygroundPresetListItem {
  let params: Record<string, unknown> = {};
  try {
    const parsed = JSON.parse(row.params_json);
    if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
      params = parsed as Record<string, unknown>;
    }
  } catch {
    params = {};
  }
  return {
    id: row.id,
    name: row.name,
    endpoint: row.endpoint,
    model: row.model,
    system: row.system,
    params,
    created_at: row.created_at,
  };
}

/**
 * Returns all presets ordered by created_at descending (newest first).
 * Accepts optional limit/offset for pagination.
 */
export function listPlaygroundPresets(options?: { limit?: number; offset?: number }): {
  items: PlaygroundPresetListItem[];
  total: number;
} {
  const db = getDbInstance();
  const limit = options?.limit;
  const offset = options?.offset ?? 0;
  let sql = "SELECT * FROM playground_presets ORDER BY created_at DESC";
  const params: unknown[] = [];
  if (limit !== undefined) {
    sql += " LIMIT ? OFFSET ?";
    params.push(limit, offset);
  }
  const rows = db.prepare(sql).all(...params) as PlaygroundPresetRow[];
  const totalRow = db.prepare("SELECT count(*) as cnt FROM playground_presets").get() as {
    cnt: number;
  };
  return { items: rows.map(rowToItem), total: totalRow.cnt };
}

/**
 * Returns a single preset by id, or null when not found.
 */
export function getPlaygroundPreset(id: string): PlaygroundPresetListItem | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM playground_presets WHERE id = ? LIMIT 1").get(id) as
    PlaygroundPresetRow | undefined;
  if (!row) return null;
  return rowToItem(row);
}

/**
 * Creates a new preset. Generates a UUID v4 for the id.
 * Returns the persisted row via getPlaygroundPreset.
 */
export function createPlaygroundPreset(input: {
  name: string;
  endpoint: string;
  model: string;
  system: string | null | undefined;
  params: Record<string, unknown>;
}): PlaygroundPresetListItem {
  const db = getDbInstance();
  const id = randomUUID();
  const params_json = JSON.stringify(input.params ?? {});
  const system = input.system ?? null;

  db.prepare(
    "INSERT INTO playground_presets (id, name, endpoint, model, system, params_json) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(id, input.name, input.endpoint, input.model, system, params_json);

  const created = getPlaygroundPreset(id);
  // created cannot be null here — we just inserted the row
  return created as PlaygroundPresetListItem;
}

/**
 * Updates only the supplied fields on an existing preset.
 * Returns the updated row, or null when the id does not exist.
 */
export function updatePlaygroundPreset(
  id: string,
  patch: Partial<{
    name: string;
    endpoint: string;
    model: string;
    system: string | null;
    params: Record<string, unknown>;
  }>
): PlaygroundPresetListItem | null {
  const db = getDbInstance();

  // Verify row exists before building the dynamic UPDATE
  const existing = getPlaygroundPreset(id);
  if (!existing) return null;

  const setClauses: string[] = [];
  const values: unknown[] = [];

  if (patch.name !== undefined) {
    setClauses.push("name = ?");
    values.push(patch.name);
  }
  if (patch.endpoint !== undefined) {
    setClauses.push("endpoint = ?");
    values.push(patch.endpoint);
  }
  if (patch.model !== undefined) {
    setClauses.push("model = ?");
    values.push(patch.model);
  }
  if ("system" in patch) {
    setClauses.push("system = ?");
    values.push(patch.system ?? null);
  }
  if (patch.params !== undefined) {
    setClauses.push("params_json = ?");
    values.push(JSON.stringify(patch.params));
  }

  if (setClauses.length === 0) {
    // Empty patch — return current row unchanged
    return existing;
  }

  values.push(id);
  db.prepare(`UPDATE playground_presets SET ${setClauses.join(", ")} WHERE id = ?`).run(...values);

  return getPlaygroundPreset(id);
}

/**
 * Deletes a preset by id.
 * Returns true when a row was deleted, false when the id did not exist.
 */
export function deletePlaygroundPreset(id: string): boolean {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM playground_presets WHERE id = ?").run(id);
  return result.changes > 0;
}
