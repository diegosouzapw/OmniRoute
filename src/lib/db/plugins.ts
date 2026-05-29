/**
 * Plugin DB module — CRUD operations for the plugins table.
 *
 * @module db/plugins
 */

import { getDbInstance } from "./core";
import { logger } from "../../../open-sse/utils/logger.ts";

const log = logger("DB_PLUGINS");

// ── Types ──

export interface PluginRow {
  id: string;
  name: string;
  version: string;
  description: string | null;
  author: string | null;
  license: string;
  main: string;
  source: string;
  tags: string; // JSON array
  status: "installed" | "active" | "inactive" | "error";
  enabled: number; // 0 | 1
  manifest: string; // JSON
  config: string; // JSON
  configSchema: string; // JSON
  hooks: string; // JSON array
  permissions: string; // JSON array
  pluginDir: string;
  errorMessage: string | null;
  installedAt: string;
  updatedAt: string;
  activatedAt: string | null;
}

export interface PluginCreateInput {
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: string;
  license?: string;
  main: string;
  source?: string;
  tags?: string[];
  status?: PluginRow["status"];
  enabled?: boolean;
  manifest: Record<string, unknown>;
  config?: Record<string, unknown>;
  configSchema?: Record<string, unknown>;
  hooks?: string[];
  permissions?: string[];
  pluginDir: string;
}

// ── Helpers ──

function rowToPlugin(row: any): PluginRow {
  return {
    id: row.id,
    name: row.name,
    version: row.version,
    description: row.description,
    author: row.author,
    license: row.license,
    main: row.main,
    source: row.source,
    tags: row.tags,
    status: row.status,
    enabled: row.enabled,
    manifest: row.manifest,
    config: row.config,
    configSchema: row.config_schema,
    hooks: row.hooks,
    permissions: row.permissions,
    pluginDir: row.plugin_dir,
    errorMessage: row.error_message,
    installedAt: row.installed_at,
    updatedAt: row.updated_at,
    activatedAt: row.activated_at,
  };
}

// ── CRUD ──

export function insertPlugin(input: PluginCreateInput): PluginRow {
  const db = getDbInstance();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO plugins (
      id, name, version, description, author, license, main, source, tags,
      status, enabled, manifest, config, config_schema, hooks, permissions,
      plugin_dir, installed_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    input.id,
    input.name,
    input.version,
    input.description ?? null,
    input.author ?? null,
    input.license ?? "MIT",
    input.main,
    input.source ?? "local",
    JSON.stringify(input.tags ?? []),
    input.status ?? "installed",
    input.enabled ? 1 : 0,
    JSON.stringify(input.manifest),
    JSON.stringify(input.config ?? {}),
    JSON.stringify(input.configSchema ?? {}),
    JSON.stringify(input.hooks ?? []),
    JSON.stringify(input.permissions ?? []),
    input.pluginDir,
    now,
    now
  );

  log.info("plugin.inserted", { id: input.id, name: input.name });
  const plugin = getPluginByName(input.name);
  if (!plugin) {
    throw new Error(`Failed to retrieve plugin '${input.name}' after insertion`);
  }
  return plugin;
}

export function getPluginById(id: string): PluginRow | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM plugins WHERE id = ?").get(id);
  return row ? rowToPlugin(row) : null;
}

export function getPluginByName(name: string): PluginRow | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM plugins WHERE name = ?").get(name);
  return row ? rowToPlugin(row) : null;
}

export function listPlugins(status?: PluginRow["status"]): PluginRow[] {
  const db = getDbInstance();
  const rows = status
    ? db.prepare("SELECT * FROM plugins WHERE status = ? ORDER BY name").all(status)
    : db.prepare("SELECT * FROM plugins ORDER BY name").all();
  return rows.map(rowToPlugin);
}

export function updatePluginStatus(
  name: string,
  status: PluginRow["status"],
  errorMessage?: string
): boolean {
  const db = getDbInstance();
  const now = new Date().toISOString();
  const activatedAt = status === "active" ? now : null;

  const result = db
    .prepare(
      `UPDATE plugins SET status = ?, enabled = ?, error_message = ?,
       updated_at = ?, activated_at = COALESCE(?, activated_at)
       WHERE name = ?`
    )
    .run(status, status === "active" ? 1 : 0, errorMessage ?? null, now, activatedAt, name);

  if (result.changes > 0) {
    log.info("plugin.status_updated", { name, status });
  }
  return result.changes > 0;
}

export function updatePluginConfig(name: string, config: Record<string, unknown>): boolean {
  const db = getDbInstance();
  const now = new Date().toISOString();

  const result = db
    .prepare("UPDATE plugins SET config = ?, updated_at = ? WHERE name = ?")
    .run(JSON.stringify(config), now, name);

  return result.changes > 0;
}

export function deletePlugin(name: string): boolean {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM plugins WHERE name = ?").run(name);
  if (result.changes > 0) {
    log.info("plugin.deleted", { name });
  }
  return result.changes > 0;
}

export function pluginExists(name: string): boolean {
  const db = getDbInstance();
  const row = db.prepare("SELECT 1 FROM plugins WHERE name = ?").get(name);
  return !!row;
}
