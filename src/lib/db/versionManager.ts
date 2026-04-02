/** Version manager tool state persistence. */

import { getDbInstance } from "./core";

interface VersionManagerRow {
  id?: unknown;
  tool?: unknown;
  current_version?: unknown;
  installed_version?: unknown;
  pinned_version?: unknown;
  binary_path?: unknown;
  status?: unknown;
  pid?: unknown;
  port?: unknown;
  api_key?: unknown;
  management_key?: unknown;
  auto_update?: unknown;
  auto_start?: unknown;
  last_health_check?: unknown;
  last_update_check?: unknown;
  health_status?: unknown;
  config_overrides?: unknown;
  error_message?: unknown;
  created_at?: unknown;
  updated_at?: unknown;
}

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function parseConfigOverrides(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "string" || value.trim() === "") return null;
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

function stringifyConfigOverrides(value: Record<string, unknown> | null): string | null {
  if (value === null) return null;
  try {
    return JSON.stringify(value);
  } catch {
    return null;
  }
}

interface VersionManagerTool {
  id: number;
  tool: string;
  currentVersion: string | null;
  installedVersion: string | null;
  pinnedVersion: string | null;
  binaryPath: string | null;
  status: string;
  pid: number | null;
  port: number;
  apiKey: string | null;
  managementKey: string | null;
  autoUpdate: boolean;
  autoStart: boolean;
  lastHealthCheck: string | null;
  lastUpdateCheck: string | null;
  healthStatus: string;
  configOverrides: Record<string, unknown> | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
}

function rowToVersionManager(row: VersionManagerRow): VersionManagerTool {
  const record = toRecord(row);
  return {
    id: typeof record.id === "number" ? record.id : 0,
    tool: typeof record.tool === "string" ? record.tool : "",
    currentVersion:
      record.current_version === null
        ? null
        : typeof record.current_version === "string"
          ? record.current_version
          : null,
    installedVersion:
      record.installed_version === null
        ? null
        : typeof record.installed_version === "string"
          ? record.installed_version
          : null,
    pinnedVersion:
      record.pinned_version === null
        ? null
        : typeof record.pinned_version === "string"
          ? record.pinned_version
          : null,
    binaryPath:
      record.binary_path === null
        ? null
        : typeof record.binary_path === "string"
          ? record.binary_path
          : null,
    status: typeof record.status === "string" ? record.status : "not_installed",
    pid: record.pid === null ? null : typeof record.pid === "number" ? record.pid : null,
    port: typeof record.port === "number" ? record.port : 8317,
    apiKey:
      record.api_key === null ? null : typeof record.api_key === "string" ? record.api_key : null,
    managementKey:
      record.management_key === null
        ? null
        : typeof record.management_key === "string"
          ? record.management_key
          : null,
    autoUpdate:
      record.auto_update === 1 || record.auto_update === true || record.auto_update === "1",
    autoStart: record.auto_start === 1 || record.auto_start === true || record.auto_start === "1",
    lastHealthCheck:
      record.last_health_check === null
        ? null
        : typeof record.last_health_check === "string"
          ? record.last_health_check
          : null,
    lastUpdateCheck:
      record.last_update_check === null
        ? null
        : typeof record.last_update_check === "string"
          ? record.last_update_check
          : null,
    healthStatus: typeof record.health_status === "string" ? record.health_status : "unknown",
    configOverrides: parseConfigOverrides(record.config_overrides),
    errorMessage:
      record.error_message === null
        ? null
        : typeof record.error_message === "string"
          ? record.error_message
          : null,
    createdAt: typeof record.created_at === "string" ? record.created_at : "",
    updatedAt: typeof record.updated_at === "string" ? record.updated_at : "",
  };
}

export async function getVersionManagerStatus(): Promise<VersionManagerTool[]> {
  const db = getDbInstance();
  const rows = db.prepare("SELECT * FROM version_manager").all() as VersionManagerRow[];
  return rows.map(rowToVersionManager);
}

export async function getVersionManagerTool(tool: string): Promise<VersionManagerTool | null> {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM version_manager WHERE tool = ?").get(tool) as
    | VersionManagerRow
    | undefined;
  if (!row) return null;
  return rowToVersionManager(row);
}

export async function upsertVersionManagerTool(data: {
  tool: string;
  currentVersion?: string | null;
  installedVersion?: string | null;
  pinnedVersion?: string | null;
  binaryPath?: string | null;
  status?: string;
  pid?: number | null;
  port?: number;
  apiKey?: string | null;
  managementKey?: string | null;
  autoUpdate?: boolean;
  autoStart?: boolean;
  healthStatus?: string;
  configOverrides?: Record<string, unknown> | null;
  errorMessage?: string | null;
}): Promise<VersionManagerTool> {
  const db = getDbInstance();
  db.prepare(
    `
    INSERT INTO version_manager (
      tool, current_version, installed_version, pinned_version, binary_path,
      status, pid, port, api_key, management_key, auto_update, auto_start,
      health_status, config_overrides, error_message, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    ON CONFLICT(tool) DO UPDATE SET
      current_version = excluded.current_version,
      installed_version = excluded.installed_version,
      pinned_version = excluded.pinned_version,
      binary_path = excluded.binary_path,
      status = excluded.status,
      pid = excluded.pid,
      port = excluded.port,
      api_key = excluded.api_key,
      management_key = excluded.management_key,
      auto_update = excluded.auto_update,
      auto_start = excluded.auto_start,
      health_status = excluded.health_status,
      config_overrides = excluded.config_overrides,
      error_message = excluded.error_message,
      updated_at = datetime('now')
  `
  ).run(
    data.tool,
    data.currentVersion ?? null,
    data.installedVersion ?? null,
    data.pinnedVersion ?? null,
    data.binaryPath ?? null,
    data.status ?? "not_installed",
    data.pid ?? null,
    data.port ?? 8317,
    data.apiKey ?? null,
    data.managementKey ?? null,
    data.autoUpdate !== undefined ? (data.autoUpdate ? 1 : 0) : 1,
    data.autoStart !== undefined ? (data.autoStart ? 1 : 0) : 0,
    data.healthStatus ?? "unknown",
    stringifyConfigOverrides(data.configOverrides ?? null),
    data.errorMessage ?? null
  );
  const result = await getVersionManagerTool(data.tool);
  if (!result) throw new Error("Failed to retrieve inserted version manager tool");
  return result;
}

export async function updateVersionManagerTool(
  tool: string,
  updates: Record<string, unknown>
): Promise<VersionManagerTool | null> {
  const db = getDbInstance();
  const existing = await getVersionManagerTool(tool);
  if (!existing) return null;

  const sets: string[] = ["updated_at = datetime('now')"];
  const params: Record<string, unknown> = { tool };

  for (const [key, value] of Object.entries(updates)) {
    const dbKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();

    if (key === "configOverrides") {
      sets.push("config_overrides = @configOverrides");
      params.configOverrides = stringifyConfigOverrides(value as Record<string, unknown> | null);
    } else if (key === "autoUpdate" || key === "autoStart") {
      sets.push(`${dbKey} = @${key}`);
      params[key] = value === true ? 1 : 0;
    } else if (value === null) {
      sets.push(`${dbKey} = null`);
    } else {
      sets.push(`${dbKey} = @${key}`);
      params[key] = value;
    }
  }

  db.prepare(`UPDATE version_manager SET ${sets.join(", ")} WHERE tool = @tool`).run(params);
  return getVersionManagerTool(tool);
}

export async function deleteVersionManagerTool(tool: string): Promise<boolean> {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM version_manager WHERE tool = ?").run(tool);
  return result.changes > 0;
}

export async function updateToolHealth(tool: string, healthStatus: string): Promise<boolean> {
  const db = getDbInstance();
  const result = db
    .prepare(
      "UPDATE version_manager SET health_status = ?, last_health_check = datetime('now') WHERE tool = ?"
    )
    .run(healthStatus, tool);
  return result.changes > 0;
}

export async function updateToolVersion(
  tool: string,
  field: "current_version" | "installed_version",
  version: string
): Promise<boolean> {
  const db = getDbInstance();
  const result = db
    .prepare(`UPDATE version_manager SET ${field} = ?, updated_at = datetime('now') WHERE tool = ?`)
    .run(version, tool);
  return result.changes > 0;
}

export async function setToolStatus(
  tool: string,
  status: string,
  pid?: number,
  errorMessage?: string
): Promise<boolean> {
  const db = getDbInstance();
  const result = db
    .prepare(
      pid !== undefined
        ? "UPDATE version_manager SET status = ?, pid = ?, error_message = ?, updated_at = datetime('now') WHERE tool = ?"
        : "UPDATE version_manager SET status = ?, error_message = ?, updated_at = datetime('now') WHERE tool = ?"
    )
    .run(
      ...(pid !== undefined
        ? [status, pid, errorMessage ?? null, tool]
        : [status, errorMessage ?? null, tool])
    );
  return result.changes > 0;
}
