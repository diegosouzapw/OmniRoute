/**
 * Durable cleanup for the retired `github-models` provider.
 *
 * Migration 135 only creates a queue.  Startup calls this module after all
 * migrations, legacy JSON import, and probe-failure restoration.  The purge is
 * deliberately column-scoped: provider/model fields and known JSON settings
 * are cleaned, while arbitrary human text (prompts, descriptions, errors) is
 * never rewritten.  Call-log artifact paths are queued one-per-row so a large
 * history cannot become one unbounded JSON value.
 */

import path from "node:path";
import type { SqliteAdapter } from "./adapters/types";
import { cleanupEmptyCallLogDirs, deleteCallArtifact } from "../usage/callLogArtifacts";
import {
  LEGACY_GITHUB_EMBEDDING_IDS,
  LEGACY_GITHUB_EMBEDDING_SIGNATURES,
  isRetiredModel,
  isRetiredProvider,
  scrubRetiredProviderJsonText,
  scrubRetiredProviderJsonValue,
  type RetiredProviderPurgeMatchContext,
} from "./retiredProviderPurgeMatch";

export const RETIRED_PROVIDER_ID = "github-models";
export const RETIRED_MODEL_PREFIX = "ghm/";
export const RETIRED_PROVIDER_PURGE_QUEUE = "retired_provider_purge_queue";
export const RETIRED_PROVIDER_PURGE_ARTIFACTS = "retired_provider_purge_artifacts";

const ARTIFACT_PAGE_SIZE = 100;

type Row = Record<string, unknown>;
type Column = { name: string; pk?: number; notnull?: number };
type QueueRow = {
  provider_id: string;
  model_prefix: string;
  status: "pending" | "artifacts_pending" | "completed";
  attempts: number;
};

type PurgeContext = RetiredProviderPurgeMatchContext & {
  connectionIds: Set<string>;
  providerNodeIds: Set<string>;
  comboIds: Set<string>;
  comboNames: Set<string>;
  quotaPoolIds: Set<string>;
  tokenLimitIds: Set<string>;
  batchIds: Set<string>;
};

export type RetiredProviderPurgeResult = {
  providerId: string;
  status: "pending" | "artifacts_pending" | "completed" | "missing";
  deletedRows: number;
  deletedArtifacts: number;
  artifactErrors: number;
  attempts: number;
};

function quoteIdentifier(identifier: string): string {
  return `"${identifier.replaceAll('"', '""')}"`;
}

function hasTable(db: SqliteAdapter, table: string): boolean {
  const row = db
    .prepare("SELECT 1 AS present FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get(table) as { present?: number } | undefined;
  return row?.present === 1;
}

function getColumns(db: SqliteAdapter, table: string): Column[] {
  if (!hasTable(db, table)) return [];
  return db.prepare(`PRAGMA table_info(${quoteIdentifier(table)})`).all() as Column[];
}

function columnSet(db: SqliteAdapter, table: string): Set<string> {
  return new Set(getColumns(db, table).map((column) => column.name));
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isRetiredNodeValue(value: string, context: PurgeContext): boolean {
  // Provider-node prefixes are stored both as `ghm` and `ghm/` in older
  // databases.  Match those exact values only; a custom prefix such as
  // `ghm-compatible` is not part of this retired provider.
  return (
    isRetiredProvider(value, context) ||
    value === context.modelPrefix ||
    value === context.modelPrefix.replace(/\/$/, "")
  );
}

function isSafeArtifactRelativePath(relativePath: string): boolean {
  if (!relativePath || path.posix.isAbsolute(relativePath) || path.win32.isAbsolute(relativePath)) {
    return false;
  }
  const normalized = path.posix.normalize(relativePath.replaceAll("\\", "/"));
  return normalized !== "." && normalized !== ".." && !normalized.startsWith("../");
}

function addChunked<T>(values: Iterable<T>, size = 200): T[][] {
  const chunks: T[][] = [];
  let chunk: T[] = [];
  for (const value of values) {
    chunk.push(value);
    if (chunk.length >= size) {
      chunks.push(chunk);
      chunk = [];
    }
  }
  if (chunk.length > 0) chunks.push(chunk);
  return chunks;
}

function deleteWhere(db: SqliteAdapter, table: string, where: string, params: unknown[]): number {
  if (!hasTable(db, table)) return 0;
  const result = db.prepare(`DELETE FROM ${quoteIdentifier(table)} WHERE ${where}`).run(...params);
  return Number(result.changes || 0);
}

function deleteByIds(db: SqliteAdapter, table: string, column: string, ids: Set<string>): number {
  if (!hasTable(db, table) || ids.size === 0 || !columnSet(db, table).has(column)) return 0;
  let changed = 0;
  for (const chunk of addChunked(ids)) {
    const placeholders = chunk.map(() => "?").join(",");
    changed += deleteWhere(db, table, `${quoteIdentifier(column)} IN (${placeholders})`, chunk);
  }
  return changed;
}

function collectIdsByProvider(
  db: SqliteAdapter,
  table: string,
  column: string,
  providerId: string
): Set<string> {
  const ids = new Set<string>();
  if (
    !hasTable(db, table) ||
    !columnSet(db, table).has(column) ||
    !columnSet(db, table).has("id")
  ) {
    return ids;
  }
  const rows = db
    .prepare(`SELECT id FROM ${quoteIdentifier(table)} WHERE ${quoteIdentifier(column)} = ?`)
    .all(providerId) as Array<{ id?: unknown }>;
  for (const row of rows) if (isString(row.id) && row.id.length > 0) ids.add(row.id);
  return ids;
}

function collectProviderNodeIds(db: SqliteAdapter, context: PurgeContext): Set<string> {
  const ids = new Set<string>();
  const columns = columnSet(db, "provider_nodes");
  if (!columns.has("id")) return ids;
  const rows = db.prepare("SELECT id, name, prefix FROM provider_nodes").all() as Row[];
  for (const row of rows) {
    if (
      isString(row.id) &&
      [row.id, row.name, row.prefix].some(
        (value) => isString(value) && isRetiredNodeValue(value, context)
      )
    ) {
      ids.add(row.id);
    }
  }
  return ids;
}

function collectIdsByModel(
  db: SqliteAdapter,
  table: string,
  modelColumn: string,
  context: PurgeContext,
  providerColumn?: string
): Set<string> {
  const ids = new Set<string>();
  const columns = columnSet(db, table);
  if (!columns.has("id") || !columns.has(modelColumn)) return ids;
  const liveProviderColumn =
    providerColumn && columns.has(providerColumn) ? providerColumn : undefined;
  const providerSelect = liveProviderColumn ? `, ${quoteIdentifier(liveProviderColumn)}` : "";
  const clauses = [
    `${quoteIdentifier(modelColumn)} LIKE ?`,
    `${quoteIdentifier(modelColumn)} LIKE ?`,
    `${quoteIdentifier(modelColumn)} IN (?, ?)`,
  ];
  const params: unknown[] = [
    `${context.modelPrefix}%`,
    `${context.providerId}/%`,
    ...LEGACY_GITHUB_EMBEDDING_SIGNATURES,
  ];
  if (liveProviderColumn) {
    clauses.push(
      `(${quoteIdentifier(liveProviderColumn)} = 'github' AND ${quoteIdentifier(modelColumn)} IN (?, ?))`
    );
    params.push(...LEGACY_GITHUB_EMBEDDING_IDS);
  }
  const rows = db
    .prepare(
      `SELECT id, ${quoteIdentifier(modelColumn)}${providerSelect}
       FROM ${quoteIdentifier(table)}
       WHERE ${clauses.join(" OR ")}`
    )
    .all(...params) as Row[];
  for (const row of rows) {
    const provider =
      liveProviderColumn && isString(row[liveProviderColumn]) ? row[liveProviderColumn] : undefined;
    if (isString(row[modelColumn]) && isRetiredModel(row[modelColumn], context, provider)) {
      if (isString(row.id)) ids.add(row.id);
    }
  }
  return ids;
}

function collectTokenLimitIds(db: SqliteAdapter, context: PurgeContext): Set<string> {
  const ids = new Set<string>();
  const columns = columnSet(db, "api_key_token_limits");
  if (!columns.has("id") || !columns.has("scope_value")) return ids;
  const rows = db
    .prepare("SELECT id, scope_type, scope_value FROM api_key_token_limits")
    .all() as Row[];
  for (const row of rows) {
    if (!isString(row.id) || !isString(row.scope_value)) continue;
    const scopeType = isString(row.scope_type) ? row.scope_type : "";
    if (
      (scopeType === "provider" && isRetiredProvider(row.scope_value, context)) ||
      (scopeType === "model" && isRetiredModel(row.scope_value, context)) ||
      isRetiredModel(row.scope_value, context)
    ) {
      ids.add(row.id);
    }
  }
  return ids;
}

function buildProviderModelWhere(
  db: SqliteAdapter,
  table: string,
  providerColumns: string[] = [],
  modelColumns: string[] = [],
  connectionColumns: string[] = [],
  context: PurgeContext
): { where: string; params: unknown[] } | null {
  const columns = columnSet(db, table);
  if (columns.size === 0) return null;
  const clauses: string[] = [];
  const params: unknown[] = [];
  const liveProviderColumns = providerColumns.filter((column) => columns.has(column));
  const liveModelColumns = modelColumns.filter((column) => columns.has(column));
  const liveConnectionColumns = connectionColumns.filter((column) => columns.has(column));

  for (const column of liveProviderColumns) {
    clauses.push(`${quoteIdentifier(column)} = ?`);
    params.push(context.providerId);
  }
  for (const column of liveModelColumns) {
    clauses.push(`${quoteIdentifier(column)} LIKE ?`);
    params.push(`${context.modelPrefix}%`);
    clauses.push(`${quoteIdentifier(column)} IN (?, ?)`);
    params.push("github/text-embedding-3-small", "github/text-embedding-3-large");
    for (const providerColumn of liveProviderColumns) {
      clauses.push(
        `(${quoteIdentifier(providerColumn)} = 'github' AND ${quoteIdentifier(column)} IN (?, ?))`
      );
      params.push("text-embedding-3-small", "text-embedding-3-large");
    }
  }
  for (const column of liveConnectionColumns) {
    if (context.connectionIds.size === 0) continue;
    for (const chunk of addChunked(context.connectionIds)) {
      clauses.push(`${quoteIdentifier(column)} IN (${chunk.map(() => "?").join(",")})`);
      params.push(...chunk);
    }
  }
  if (clauses.length === 0) return null;
  return { where: clauses.map((clause) => `(${clause})`).join(" OR "), params };
}

function deleteProviderModelRows(
  db: SqliteAdapter,
  table: string,
  context: PurgeContext,
  spec: {
    provider?: string[];
    model?: string[];
    connection?: string[];
  }
): number {
  const built = buildProviderModelWhere(
    db,
    table,
    spec.provider,
    spec.model,
    spec.connection,
    context
  );
  return built ? deleteWhere(db, table, built.where, built.params) : 0;
}

function getPrimaryKeyColumns(db: SqliteAdapter, table: string): string[] {
  return getColumns(db, table)
    .filter((column) => Number(column.pk || 0) > 0)
    .sort((a, b) => Number(a.pk) - Number(b.pk))
    .map((column) => column.name);
}

function updateByPrimaryKey(
  db: SqliteAdapter,
  table: string,
  primaryKey: string[],
  row: Row,
  updates: Row
): boolean {
  if (primaryKey.length === 0 || Object.keys(updates).length === 0) return false;
  const where = primaryKey.map((column) => `${quoteIdentifier(column)} = ?`).join(" AND ");
  const params = [
    ...Object.keys(updates).map((column) => updates[column]),
    ...primaryKey.map((column) => row[column]),
  ];
  db.prepare(
    `UPDATE ${quoteIdentifier(table)} SET ${Object.keys(updates)
      .map((column) => `${quoteIdentifier(column)} = ?`)
      .join(", ")} WHERE ${where}`
  ).run(...params);
  return true;
}

function deleteByPrimaryKey(
  db: SqliteAdapter,
  table: string,
  primaryKey: string[],
  row: Row
): boolean {
  if (primaryKey.length === 0) return false;
  const where = primaryKey.map((column) => `${quoteIdentifier(column)} = ?`).join(" AND ");
  db.prepare(`DELETE FROM ${quoteIdentifier(table)} WHERE ${where}`).run(
    ...primaryKey.map((column) => row[column])
  );
  return true;
}

function scrubKeyValue(db: SqliteAdapter, context: PurgeContext): number {
  if (!hasTable(db, "key_value")) return 0;
  const primaryKey = getPrimaryKeyColumns(db, "key_value");
  if (primaryKey.length === 0) return 0;
  const namespaces = [
    "customModels",
    "syncedAvailableModels",
    "modelCompatOverrides",
    "modelAliases",
    "mitmAlias",
    "providerLimitsCache",
    "provider_param_filters",
    "interception_rules",
    "ccDiscoveryAliases",
    "proxyConfig",
    "cliToolLastConfig",
    "cliToolInitialConfig",
    "pricing",
    "pricing_synced",
    "models_dev_pricing",
    "lkgp",
    "creditBalance",
    "serviceModels",
  ];
  let changed = 0;
  const columns = columnSet(db, "key_value");
  const rows = db
    .prepare(
      `SELECT namespace, key, value FROM key_value
       WHERE namespace IN (${namespaces.map(() => "?").join(",")})
          OR namespace = 'settings' OR namespace = 'compression'`
    )
    .all(...namespaces) as Row[];
  for (const row of rows) {
    const namespace = isString(row.namespace) ? row.namespace : "";
    const key = isString(row.key) ? row.key : "";
    const directKey =
      isRetiredProvider(key, context) ||
      isRetiredModel(key, context) ||
      key.startsWith(`${context.providerId}:`) ||
      key.startsWith(`provider:${context.providerId}`) ||
      key.startsWith(`model:${context.providerId}/`);
    const directValue =
      isString(row.value) &&
      (isRetiredProvider(row.value, context) || isRetiredModel(row.value, context));

    if (
      directKey ||
      directValue ||
      (namespace === "syncedAvailableModels" && key.startsWith(`${context.providerId}:`))
    ) {
      if (deleteByPrimaryKey(db, "key_value", primaryKey, row)) changed++;
      continue;
    }

    const jsonProvider =
      namespace === "customModels" ||
      namespace === "modelCompatOverrides" ||
      namespace === "providerLimitsCache" ||
      namespace === "provider_param_filters" ||
      namespace === "interception_rules"
        ? key
        : namespace === "syncedAvailableModels"
          ? key.split(":", 1)[0]
          : undefined;
    const cleaned = scrubRetiredProviderJsonText(row.value, context, jsonProvider);
    if (cleaned !== row.value && columns.has("value")) {
      if (updateByPrimaryKey(db, "key_value", primaryKey, row, { value: cleaned })) changed++;
    }
  }
  return changed;
}

function scrubJsonColumns(
  db: SqliteAdapter,
  table: string,
  jsonColumns: string[],
  context: PurgeContext,
  providerColumn?: string
): number {
  const columns = columnSet(db, table);
  const liveJson = jsonColumns.filter((column) => columns.has(column));
  const primaryKey = getPrimaryKeyColumns(db, table);
  if (liveJson.length === 0 || primaryKey.length === 0) return 0;
  let changed = 0;
  const selectColumns = [
    ...new Set([...primaryKey, ...liveJson, ...(providerColumn ? [providerColumn] : [])]),
  ];
  const markerClauses = liveJson.flatMap((column) => [
    `instr(COALESCE(${quoteIdentifier(column)}, ''), ?) > 0`,
    `instr(COALESCE(${quoteIdentifier(column)}, ''), ?) > 0`,
    `instr(COALESCE(${quoteIdentifier(column)}, ''), ?) > 0`,
  ]);
  const markerParams = liveJson.flatMap(() => [
    context.providerId,
    context.modelPrefix,
    "github/text-embedding-3-",
  ]);
  let offset = 0;
  while (true) {
    const rows = db
      .prepare(
        `SELECT ${selectColumns.map(quoteIdentifier).join(", ")}
         FROM ${quoteIdentifier(table)}
         WHERE ${markerClauses.join(" OR ")} LIMIT 250 OFFSET ?`
      )
      .all(...markerParams, offset) as Row[];
    if (rows.length === 0) break;
    let changedInPage = 0;
    for (const row of rows) {
      const updates: Row = {};
      const provider =
        providerColumn && isString(row[providerColumn]) ? row[providerColumn] : undefined;
      for (const column of liveJson) {
        const next = scrubRetiredProviderJsonText(row[column], context, provider);
        if (next !== row[column]) updates[column] = next;
      }
      if (updateByPrimaryKey(db, table, primaryKey, row, updates)) {
        changed++;
        changedInPage++;
      }
    }
    // Updated rows normally disappear from the marker query. Advance only past
    // rows that remained unchanged so a free-text marker cannot starve later
    // structured rows in the same table.
    offset += rows.length - changedInPage;
  }
  return changed;
}

function collectComboIdsAndScrub(db: SqliteAdapter, context: PurgeContext): number {
  if (!hasTable(db, "combos")) return 0;
  const primaryKey = getPrimaryKeyColumns(db, "combos");
  const columns = columnSet(db, "combos");
  if (!columns.has("data") || primaryKey.length === 0) return 0;
  const rows = db.prepare("SELECT id, name, data FROM combos").all() as Row[];
  let changed = 0;
  for (const row of rows) {
    if (!isString(row.id)) continue;
    if (isString(row.name) && isRetiredProvider(row.name, context)) {
      context.comboIds.add(row.id);
      context.comboNames.add(row.name);
      continue;
    }
    let parsed: unknown;
    try {
      parsed = isString(row.data) ? JSON.parse(row.data) : row.data;
    } catch {
      parsed = null;
    }
    if (!parsed || typeof parsed !== "object") continue;
    const cleaned = scrubRetiredProviderJsonValue(parsed, context) as Row;
    const originalModels = (parsed as Row).models;
    const remainingModels = cleaned && Array.isArray(cleaned.models) ? cleaned.models : null;
    if (Array.isArray(originalModels) && remainingModels && remainingModels.length === 0) {
      context.comboIds.add(row.id);
      if (isString(row.name)) context.comboNames.add(row.name);
      continue;
    }
    if (JSON.stringify(cleaned) !== JSON.stringify(parsed)) {
      if (updateByPrimaryKey(db, "combos", primaryKey, row, { data: JSON.stringify(cleaned) }))
        changed++;
    }
  }
  return changed;
}

function matchingCallLogWhere(
  db: SqliteAdapter,
  context: PurgeContext
): { where: string; params: unknown[] } | null {
  return buildProviderModelWhere(
    db,
    "call_logs",
    ["provider"],
    ["model", "requested_model"],
    ["connection_id"],
    context
  );
}

function collectQuotaPoolIds(db: SqliteAdapter, context: PurgeContext): Set<string> {
  const ids = new Set<string>();
  if (!hasTable(db, "quota_pools")) return ids;
  const poolColumns = columnSet(db, "quota_pools");
  if (poolColumns.has("id") && poolColumns.has("connection_id")) {
    const primaryRows = db
      .prepare(
        "SELECT id FROM quota_pools WHERE connection_id IN (SELECT id FROM provider_connections WHERE provider = ?)"
      )
      .all(context.providerId) as Array<{ id?: unknown }>;
    for (const row of primaryRows) if (isString(row.id)) ids.add(row.id);
  }
  if (hasTable(db, "quota_pool_connections")) {
    const memberColumns = columnSet(db, "quota_pool_connections");
    if (memberColumns.has("pool_id") && memberColumns.has("connection_id")) {
      const memberRows = db
        .prepare(
          "SELECT DISTINCT pool_id FROM quota_pool_connections WHERE connection_id IN (SELECT id FROM provider_connections WHERE provider = ?)"
        )
        .all(context.providerId) as Array<{ pool_id?: unknown }>;
      for (const row of memberRows) if (isString(row.pool_id)) ids.add(row.pool_id);
    }
  }
  return ids;
}

function purgeQuotaPools(db: SqliteAdapter, context: PurgeContext): number {
  if (!hasTable(db, "quota_pools") || context.quotaPoolIds.size === 0) return 0;
  const poolColumns = columnSet(db, "quota_pools");
  const hasMembers = hasTable(db, "quota_pool_connections");
  let changed = 0;
  for (const poolId of context.quotaPoolIds) {
    let members: string[] = [];
    if (hasMembers) {
      members = (
        db
          .prepare(
            "SELECT connection_id FROM quota_pool_connections WHERE pool_id = ? ORDER BY created_at ASC"
          )
          .all(poolId) as Array<{ connection_id?: unknown }>
      )
        .map((row) => row.connection_id)
        .filter(isString);
    }
    if (poolColumns.has("connection_id")) {
      const pool = db.prepare("SELECT connection_id FROM quota_pools WHERE id = ?").get(poolId) as
        { connection_id?: unknown } | undefined;
      if (isString(pool?.connection_id) && !members.includes(pool.connection_id)) {
        members.push(pool.connection_id);
      }
    }

    const liveMembers = members.filter((member) => {
      if (context.connectionIds.has(member)) return false;
      if (!hasTable(db, "provider_connections")) return true;
      const connection = db
        .prepare("SELECT 1 AS present FROM provider_connections WHERE id = ? LIMIT 1")
        .get(member) as { present?: number } | undefined;
      return connection?.present === 1;
    });
    const retiredMembers = members.filter((member) => context.connectionIds.has(member));
    if (hasMembers && retiredMembers.length > 0) {
      for (const member of retiredMembers) {
        changed += Number(
          db
            .prepare("DELETE FROM quota_pool_connections WHERE pool_id = ? AND connection_id = ?")
            .run(poolId, member).changes || 0
        );
      }
    }

    if (liveMembers.length > 0) {
      if (poolColumns.has("connection_id")) {
        const pool = db
          .prepare("SELECT connection_id FROM quota_pools WHERE id = ?")
          .get(poolId) as { connection_id?: unknown } | undefined;
        if (!isString(pool?.connection_id) || !liveMembers.includes(pool.connection_id)) {
          changed += Number(
            db
              .prepare("UPDATE quota_pools SET connection_id = ? WHERE id = ?")
              .run(liveMembers[0], poolId).changes || 0
          );
        }
      }
      continue;
    }

    // A pool with no live membership is retired in its entirety.  Remove
    // dependent rows explicitly because some older migrations did not define
    // foreign-key cascades for these tables.
    changed += deleteByIds(db, "quota_allocations", "pool_id", new Set([poolId]));
    changed += deleteByIds(db, "quota_allocation_model_caps", "pool_id", new Set([poolId]));
    if (hasMembers) {
      changed += deleteWhere(db, "quota_pool_connections", "pool_id = ?", [poolId]);
    }
    changed += deleteWhere(db, "quota_pools", "id = ?", [poolId]);
  }
  return changed;
}

function captureCallLogArtifacts(db: SqliteAdapter, context: PurgeContext): number {
  if (!hasTable(db, "call_logs") || !hasTable(db, RETIRED_PROVIDER_PURGE_ARTIFACTS)) return 0;
  const built = matchingCallLogWhere(db, context);
  if (!built) return 0;
  const result = db
    .prepare(
      `INSERT OR IGNORE INTO ${quoteIdentifier(RETIRED_PROVIDER_PURGE_ARTIFACTS)}
        (provider_id, model_prefix, artifact_relpath, status)
       SELECT ?, ?, artifact_relpath, 'pending'
       FROM call_logs
       WHERE ${built.where} AND artifact_relpath IS NOT NULL`
    )
    .run(context.providerId, context.modelPrefix, ...built.params);
  return Number(result.changes || 0);
}

function purgeDataRows(db: SqliteAdapter, context: PurgeContext): number {
  let changed = 0;
  // Combo rows are JSON documents, so identify and remove all-retired combos
  // before deleting the relation rows which reference them.
  changed += collectComboIdsAndScrub(db, context);
  changed += deleteByIds(db, "combos", "id", context.comboIds);
  changed += deleteByIds(db, "provider_nodes", "id", context.providerNodeIds);
  // Quota pools can have both retired and live provider memberships.  Prune
  // only the retired membership and keep/repoint a mixed pool; delete the
  // pool and its allocations only when no live member remains.
  changed += purgeQuotaPools(db, context);

  // Delete detailed request rows before their parent call_logs.  This covers
  // both rows carrying provider/model columns and orphan rows linked only by
  // call_log_id.
  const callLogWhere = matchingCallLogWhere(db, context);
  changed += deleteProviderModelRows(db, "request_detail_logs", context, {
    provider: ["provider"],
    model: ["model"],
  });
  if (callLogWhere && hasTable(db, "request_detail_logs")) {
    changed += deleteWhere(
      db,
      "request_detail_logs",
      `${quoteIdentifier("call_log_id")} IN (SELECT id FROM call_logs WHERE ${callLogWhere.where})`,
      callLogWhere.params
    );
  }
  const directSpecs: Array<
    [string, { provider?: string[]; model?: string[]; connection?: string[] }]
  > = [
    ["provider_connections", { provider: ["provider"] }],
    ["provider_plans", { provider: ["provider"], connection: ["connection_id"] }],
    ["provider_key_limits", { provider: ["provider"] }],
    ["provider_quota_reset_events", { provider: ["provider"], connection: ["connection_id"] }],
    ["quota_snapshots", { provider: ["provider"], connection: ["connection_id"] }],
    ["quota_allocation_model_caps", { model: ["model"] }],
    ["session_account_affinity", { provider: ["provider"], connection: ["connection_id"] }],
    [
      "session_model_history",
      { provider: ["provider"], model: ["model_str"], connection: ["connection_id"] },
    ],
    ["model_context_overrides", { provider: ["provider"], model: ["model_id"] }],
    ["model_capability_overrides", { provider: ["provider"], model: ["model_id"] }],
    ["discovery_results", { provider: ["provider_id"] }],
    ["model_intelligence", { model: ["model"] }],
    ["tier_assignments", { provider: ["provider"], model: ["model"] }],
    ["group_model_permissions", { provider: ["provider"], model: ["model_pattern"] }],
    ["reasoning_cache", { provider: ["provider"], model: ["model"] }],
    ["compression_analytics", { provider: ["provider"] }],
    ["compression_cache_stats", { provider: ["provider"], model: ["model"] }],
    ["hourly_usage_summary", { provider: ["provider"], model: ["model"] }],
    ["daily_usage_summary", { provider: ["provider"], model: ["model"] }],
    ["semantic_cache", { model: ["model"] }],
    ["domain_fallback_chains", { model: ["model"] }],
    ["context_handoffs", { model: ["model", "last_model"] }],
    ["usage_history", { provider: ["provider"], model: ["model"], connection: ["connection_id"] }],
    [
      "call_logs",
      {
        provider: ["provider"],
        model: ["model", "requested_model"],
        connection: ["connection_id"],
      },
    ],
    ["routing_decisions", { provider: ["provider_selected"], model: ["model_selected"] }],
    ["combo_adaptation_state", { provider: ["provider_id"] }],
    ["auto_candidate_overrides", { connection: ["connection_id"] }],
    [
      "reasoning_routing_rules",
      { model: ["model_pattern", "target_model"], connection: ["connection_id"] },
    ],
    ["model_combo_mappings", { model: ["pattern"] }],
    ["registered_keys", { provider: ["provider"] }],
    ["cloud_agent_credentials", { provider: ["provider_id"] }],
    ["skills", { provider: ["source_provider"] }],
    ["upstream_proxy_config", { provider: ["provider_id"] }],
    ["proxy_logs", { provider: ["provider"], connection: ["connection_id"] }],
    ["relay_logs", { model: ["model"] }],
    ["agent_bridge_mappings", { model: ["source_model", "target_model"] }],
    ["playground_presets", { model: ["model"] }],
    ["eval_cases", { model: ["model"] }],
    ["eval_runs", { model: ["target_id", "target_label"] }],
    ["batches", { model: ["model"] }],
    ["api_key_token_limits", { provider: ["scope_value"], model: ["scope_value"] }],
  ];
  for (const [table, spec] of directSpecs)
    changed += deleteProviderModelRows(db, table, context, spec);

  changed += deleteByIds(db, "api_key_token_counters", "limit_id", context.tokenLimitIds);
  changed += deleteByIds(db, "api_key_token_limit_reset_logs", "limit_id", context.tokenLimitIds);
  changed += deleteByIds(db, "batch_item_checkpoints", "batch_id", context.batchIds);
  const retiredScopeIds = new Set([...context.connectionIds, ...context.providerNodeIds]);
  changed += deleteByIds(db, "proxy_assignments", "scope_id", retiredScopeIds);
  changed += deleteByIds(db, "proxy_scope_rotation", "scope_id", retiredScopeIds);
  changed += deleteByIds(db, "compression_combo_assignments", "routing_combo_id", context.comboIds);
  changed += deleteByIds(db, "middleware_hooks", "combo_id", context.comboIds);
  changed += deleteByIds(db, "reasoning_routing_rules", "combo_id", context.comboIds);
  changed += deleteByIds(db, "reasoning_routing_rules", "target_combo_id", context.comboIds);
  changed += deleteByIds(db, "combo_adaptation_state", "combo_id", context.comboIds);
  changed += deleteByIds(db, "routing_decisions", "combo_id", context.comboIds);
  changed += deleteByIds(db, "context_handoffs", "combo_id", context.comboIds);
  changed += deleteByIds(db, "session_model_history", "combo_name", context.comboNames);
  changed += deleteByIds(db, "context_handoffs", "combo_name", context.comboNames);

  // API-key and relay allow-lists are structured configuration, not free text.
  changed += scrubJsonColumns(db, "api_keys", ["allowed_models"], context);
  changed += scrubJsonColumns(db, "relay_tokens", ["allowed_models"], context);
  changed += scrubJsonColumns(db, "proxy_subscriptions", ["rule_providers", "last_nodes"], context);
  changed += scrubJsonColumns(db, "discovery_results", ["models"], context);
  // Request/detail payloads, eval output, batch metadata, A2A payloads,
  // command-session metadata, version-manager overrides, and webhook
  // snapshots are arbitrary user text.  Matching rows are deleted by their
  // structured provider/model columns above; live rows are intentionally not
  // rewritten here.
  changed += scrubKeyValue(db, context);

  // A group can be shared by live pools.  Only remove groups which were left
  // orphaned by the retired pool deletion, never all orphaned user groups.
  if (hasTable(db, "quota_groups") && hasTable(db, "quota_pools")) {
    const groups = db.prepare("SELECT id FROM quota_groups").all() as Array<{ id?: unknown }>;
    for (const group of groups) {
      if (!isString(group.id)) continue;
      const hasPool = db
        .prepare("SELECT 1 AS present FROM quota_pools WHERE group_id = ? LIMIT 1")
        .get(group.id) as { present?: number } | undefined;
      if (!hasPool?.present) {
        // Name-based direct cleanup still handles an explicitly named retired
        // group; unrelated orphan groups are left alone.
        changed += deleteWhere(db, "quota_groups", "id = ? AND name = ?", [
          group.id,
          context.providerId,
        ]);
      }
    }
  }
  return changed;
}

function getQueueRow(db: SqliteAdapter, providerId: string, modelPrefix: string): QueueRow | null {
  if (!hasTable(db, RETIRED_PROVIDER_PURGE_QUEUE)) return null;
  return (
    (db
      .prepare(
        `SELECT provider_id, model_prefix, status, attempts FROM ${quoteIdentifier(RETIRED_PROVIDER_PURGE_QUEUE)} WHERE provider_id = ? AND model_prefix = ?`
      )
      .get(providerId, modelPrefix) as QueueRow | undefined) || null
  );
}

function processArtifacts(
  db: SqliteAdapter,
  queue: QueueRow
): { deleted: number; errors: number; pending: number } {
  if (!hasTable(db, RETIRED_PROVIDER_PURGE_ARTIFACTS)) return { deleted: 0, errors: 0, pending: 0 };
  const rows = db
    .prepare(
      `SELECT artifact_relpath FROM ${quoteIdentifier(RETIRED_PROVIDER_PURGE_ARTIFACTS)} WHERE provider_id = ? AND model_prefix = ? AND status = 'pending' LIMIT ?`
    )
    .all(queue.provider_id, queue.model_prefix, ARTIFACT_PAGE_SIZE) as Array<{
    artifact_relpath?: unknown;
  }>;
  let deleted = 0;
  let errors = 0;
  const mark = db.prepare(
    `UPDATE ${quoteIdentifier(RETIRED_PROVIDER_PURGE_ARTIFACTS)} SET status = 'deleted', deleted_at = datetime('now') WHERE provider_id = ? AND model_prefix = ? AND artifact_relpath = ?`
  );
  for (const row of rows) {
    if (!isString(row.artifact_relpath) || !isSafeArtifactRelativePath(row.artifact_relpath)) {
      mark.run(queue.provider_id, queue.model_prefix, row.artifact_relpath ?? "");
      continue;
    }
    try {
      if (deleteCallArtifact(row.artifact_relpath)) deleted++;
      mark.run(queue.provider_id, queue.model_prefix, row.artifact_relpath);
    } catch {
      errors++;
    }
  }
  const pendingRow = db
    .prepare(
      `SELECT COUNT(*) AS count FROM ${quoteIdentifier(RETIRED_PROVIDER_PURGE_ARTIFACTS)} WHERE provider_id = ? AND model_prefix = ? AND status = 'pending'`
    )
    .get(queue.provider_id, queue.model_prefix) as { count?: number } | undefined;
  return { deleted, errors, pending: Number(pendingRow?.count || 0) };
}

function runSinglePurge(db: SqliteAdapter, queue: QueueRow): RetiredProviderPurgeResult {
  let deletedRows = 0;
  const tx = db.transaction(() => {
    const context: PurgeContext = {
      providerId: queue.provider_id,
      modelPrefix: queue.model_prefix,
      connectionIds: collectIdsByProvider(
        db,
        "provider_connections",
        "provider",
        queue.provider_id
      ),
      providerNodeIds: new Set<string>(),
      comboIds: new Set<string>(),
      comboNames: new Set<string>(),
      quotaPoolIds: new Set<string>(),
      tokenLimitIds: new Set(),
      batchIds: collectIdsByModel(db, "batches", "model", {
        providerId: queue.provider_id,
        modelPrefix: queue.model_prefix,
        connectionIds: new Set(),
        providerNodeIds: new Set(),
        comboIds: new Set(),
        comboNames: new Set(),
        quotaPoolIds: new Set(),
        tokenLimitIds: new Set(),
        batchIds: new Set(),
      }),
    };
    context.providerNodeIds = collectProviderNodeIds(db, context);
    context.tokenLimitIds = collectTokenLimitIds(db, context);
    context.quotaPoolIds = collectQuotaPoolIds(db, context);
    captureCallLogArtifacts(db, context);
    deletedRows += purgeDataRows(db, context);
    db.prepare(
      `UPDATE ${quoteIdentifier(RETIRED_PROVIDER_PURGE_QUEUE)} SET status = 'artifacts_pending', attempts = attempts + 1, last_error = NULL, updated_at = datetime('now') WHERE provider_id = ? AND model_prefix = ?`
    ).run(queue.provider_id, queue.model_prefix);
  });
  tx();

  let deletedArtifacts = 0;
  let artifactErrors = 0;
  let pending = 1;
  while (pending > 0) {
    const result = processArtifacts(db, queue);
    deletedArtifacts += result.deleted;
    artifactErrors += result.errors;
    pending = result.pending;
    if (result.errors > 0 || (result.deleted === 0 && pending > 0)) break;
  }
  if (pending === 0 && hasTable(db, RETIRED_PROVIDER_PURGE_ARTIFACTS)) {
    // The queue row is the durable completion marker.  Once every path has
    // been handled, discard child rows so retired artifact paths do not remain
    // in the user database after a successful purge.
    db.prepare(
      `DELETE FROM ${quoteIdentifier(RETIRED_PROVIDER_PURGE_ARTIFACTS)} WHERE provider_id = ? AND model_prefix = ? AND status = 'deleted'`
    ).run(queue.provider_id, queue.model_prefix);
  }
  try {
    cleanupEmptyCallLogDirs();
  } catch {
    // Cosmetic only.
  }
  const status = pending === 0 ? "completed" : "artifacts_pending";
  db.prepare(
    `UPDATE ${quoteIdentifier(RETIRED_PROVIDER_PURGE_QUEUE)} SET status = ?, completed_at = CASE WHEN ? = 'completed' THEN datetime('now') ELSE completed_at END, updated_at = datetime('now'), last_error = ? WHERE provider_id = ? AND model_prefix = ?`
  ).run(
    status,
    status,
    artifactErrors > 0 ? `failed to delete ${artifactErrors} call-log artifact(s)` : null,
    queue.provider_id,
    queue.model_prefix
  );
  const updated = getQueueRow(db, queue.provider_id, queue.model_prefix);
  return {
    providerId: queue.provider_id,
    status: updated?.status ?? status,
    deletedRows,
    deletedArtifacts,
    artifactErrors,
    attempts: Number(updated?.attempts ?? queue.attempts + 1),
  };
}

export function runRetiredProviderPurge(db: SqliteAdapter): RetiredProviderPurgeResult[] {
  if (!hasTable(db, RETIRED_PROVIDER_PURGE_QUEUE)) return [];
  const rows = db
    .prepare(
      `SELECT provider_id, model_prefix, status, attempts FROM ${quoteIdentifier(RETIRED_PROVIDER_PURGE_QUEUE)} WHERE status <> 'completed' ORDER BY created_at`
    )
    .all() as QueueRow[];
  return rows.map((queue) => {
    try {
      return runSinglePurge(db, queue);
    } catch (error: unknown) {
      try {
        db.prepare(
          `UPDATE ${quoteIdentifier(RETIRED_PROVIDER_PURGE_QUEUE)} SET status = 'pending', last_error = ?, updated_at = datetime('now') WHERE provider_id = ? AND model_prefix = ?`
        ).run(
          error instanceof Error ? error.message : String(error),
          queue.provider_id,
          queue.model_prefix
        );
      } catch {
        // Keep the original error as the diagnostic.
      }
      console.error(`[DB] Retired provider purge failed for ${queue.provider_id}:`, error);
      return {
        providerId: queue.provider_id,
        status: "pending",
        deletedRows: 0,
        deletedArtifacts: 0,
        artifactErrors: 1,
        attempts: queue.attempts,
      };
    }
  });
}

export function runRetiredProviderPurgeAtStartup(db: SqliteAdapter): void {
  try {
    for (const result of runRetiredProviderPurge(db)) {
      console.log(
        `[DB] Retired provider purge (${result.providerId}): ${result.status}, ` +
          `${result.deletedRows} row(s), ${result.deletedArtifacts} artifact(s).`
      );
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("[DB] Retired provider purge deferred:", message);
  }
}

export function purgeRetiredProviderData(
  db: SqliteAdapter,
  providerId = RETIRED_PROVIDER_ID,
  modelPrefix = RETIRED_MODEL_PREFIX
): RetiredProviderPurgeResult {
  const queue = getQueueRow(db, providerId, modelPrefix);
  if (!queue)
    return {
      providerId,
      status: "missing",
      deletedRows: 0,
      deletedArtifacts: 0,
      artifactErrors: 0,
      attempts: 0,
    };
  if (queue.status === "completed")
    return {
      providerId,
      status: "completed",
      deletedRows: 0,
      deletedArtifacts: 0,
      artifactErrors: 0,
      attempts: queue.attempts,
    };
  return runSinglePurge(db, queue);
}
