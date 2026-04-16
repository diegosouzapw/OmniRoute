/**
 * MCP Audit Logger — Records all MCP tool invocations for security and observability.
 *
 * Logs are written to the `mcp_tool_audit` SQLite table.
 * Input data is hashed (SHA-256) to avoid storing sensitive prompts.
 * Output is truncated to 200 chars for summary.
 */

import { hashInput, summarizeOutput } from "./schemas/audit.ts";

// ============ Database Connection ============

interface StatementLike<TRow = unknown> {
  get: (...params: unknown[]) => TRow | undefined;
  all: (...params: unknown[]) => TRow[];
  run: (...params: unknown[]) => unknown;
}

interface AuditDatabase {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
  pragma: (sql: string) => unknown;
  close: () => void;
  open?: boolean;
}

declare global {
  var __omnirouteMcpAuditDb: AuditDatabase | null | undefined;
}

interface AuditStatsRow {
  total: unknown;
  successRate: unknown;
  avgDuration: unknown;
}

interface AuditTopToolRow {
  tool: unknown;
  count: unknown;
}

interface AuditCountRow {
  total: unknown;
}

interface AuditEntryRow {
  id?: unknown;
  tool_name?: unknown;
  input_hash?: unknown;
  output_summary?: unknown;
  duration_ms?: unknown;
  api_key_id?: unknown;
  success?: unknown;
  error_code?: unknown;
  created_at?: unknown;
}

export interface McpAuditQuery {
  limit?: number;
  offset?: number;
  tool?: string;
  success?: boolean;
  apiKeyId?: string;
}

export interface McpAuditEntry {
  id: number;
  toolName: string;
  inputHash: string;
  outputSummary: string;
  durationMs: number;
  apiKeyId: string | null;
  success: boolean;
  errorCode: string | null;
  createdAt: string;
}

function toNullableString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function toBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  if (value === 1 || value === "1") return true;
  if (value === 0 || value === "0") return false;
  return fallback;
}

function toPositiveInt(value: unknown, fallback: number): number {
  const parsed = toNumber(value, fallback);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(0, Math.floor(parsed));
}

function mapAuditEntry(row: AuditEntryRow): McpAuditEntry {
  return {
    id: toPositiveInt(row.id, 0),
    toolName: toString(row.tool_name),
    inputHash: toString(row.input_hash),
    outputSummary: toString(row.output_summary),
    durationMs: toNumber(row.duration_ms, 0),
    apiKeyId: toNullableString(row.api_key_id),
    success: toBoolean(row.success, false),
    errorCode: toNullableString(row.error_code),
    createdAt: toString(row.created_at),
  };
}

function buildAuditFilterSql(filters: McpAuditQuery): { whereSql: string; params: unknown[] } {
  const clauses: string[] = [];
  const params: unknown[] = [];

  if (typeof filters.tool === "string" && filters.tool.trim().length > 0) {
    clauses.push("tool_name = ?");
    params.push(filters.tool.trim());
  }
  if (typeof filters.success === "boolean") {
    clauses.push("success = ?");
    params.push(filters.success ? 1 : 0);
  }
  if (typeof filters.apiKeyId === "string" && filters.apiKeyId.trim().length > 0) {
    clauses.push("api_key_id = ?");
    params.push(filters.apiKeyId.trim());
  }

  return {
    whereSql: clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : "",
    params,
  };
}

function getCachedAuditDb(): AuditDatabase | null {
  return globalThis.__omnirouteMcpAuditDb ?? null;
}

function setCachedAuditDb(database: AuditDatabase | null): void {
  globalThis.__omnirouteMcpAuditDb = database;
}

function toNumber(value: unknown, fallback = 0): number {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim().length > 0
        ? Number(value)
        : Number.NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/**
 * Lazy-load the database connection.
 * Uses the same SQLite database as the main OmniRoute app.
 */
async function getDb(): Promise<AuditDatabase | null> {
  const cachedDb = getCachedAuditDb();
  if (cachedDb) return cachedDb;

  try {
    // Try importing the db module from the main app
    const { homedir } = await import("node:os");
    const { join } = await import("node:path");
    const { existsSync } = await import("node:fs");

    const dbPath = process.env.DATA_DIR
      ? join(process.env.DATA_DIR, "storage.sqlite")
      : join(homedir(), ".omniroute", "storage.sqlite");

    if (!existsSync(dbPath)) {
      console.error(`[MCP Audit] Database not found at ${dbPath} — audit logging disabled`);
      return null;
    }

    const Database = (await import("better-sqlite3")).default as unknown as new (
      dbPath: string
    ) => AuditDatabase;
    const database = new Database(dbPath);
    setCachedAuditDb(database);
    return database;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[MCP Audit] Failed to connect to database:", message);
    return null;
  }
}

export function closeAuditDb(): boolean {
  const database = getCachedAuditDb();
  if (!database) return false;

  setCachedAuditDb(null);

  try {
    try {
      if (database.open !== false) {
        database.pragma("wal_checkpoint(TRUNCATE)");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn("[MCP Audit] WAL checkpoint failed during close:", message);
    }
  } finally {
    try {
      database.close();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn("[MCP Audit] Failed to close database:", message);
    }
  }

  return true;
}

// ============ Audit Logger ============

/**
 * Log a tool invocation to the mcp_tool_audit table.
 *
 * Security: Input is hashed, never stored in clear text.
 * Output is truncated to a summary.
 */
export async function logToolCall(
  toolName: string,
  input: unknown,
  output: unknown,
  durationMs: number,
  success: boolean,
  errorCode?: string
): Promise<void> {
  try {
    const database = await getDb();
    if (!database) return; // Audit disabled if no DB

    const inputHash = await hashInput(input);
    const outputSummary = summarizeOutput(output);
    const apiKeyId = process.env.OMNIROUTE_API_KEY_ID || null;

    database
      .prepare(
        `INSERT INTO mcp_tool_audit (tool_name, input_hash, output_summary, duration_ms, api_key_id, success, error_code)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        toolName,
        inputHash,
        outputSummary,
        durationMs,
        apiKeyId,
        success ? 1 : 0,
        errorCode || null
      );
  } catch (err: unknown) {
    // Never let audit failure break tool execution
    const message = err instanceof Error ? err.message : String(err);
    console.error("[MCP Audit] Failed to log:", message);
  }
}

/**
 * Get recent audit entries (for dashboard/monitoring).
 */
export async function queryAuditEntries(
  filters: McpAuditQuery = {}
): Promise<{ entries: McpAuditEntry[]; total: number; limit: number; offset: number }> {
  try {
    const database = await getDb();
    const limit = Math.max(1, Math.min(500, toPositiveInt(filters.limit, 50)));
    const offset = Math.max(0, toPositiveInt(filters.offset, 0));
    if (!database) return { entries: [], total: 0, limit, offset };

    const { whereSql, params } = buildAuditFilterSql(filters);
    const totalRow = database
      .prepare<AuditCountRow>(`SELECT COUNT(*) as total FROM mcp_tool_audit ${whereSql}`)
      .get(...params);
    const rows = database
      .prepare<AuditEntryRow>(
        `SELECT
           id,
           tool_name,
           input_hash,
           output_summary,
           duration_ms,
           api_key_id,
           success,
           error_code,
           created_at
         FROM mcp_tool_audit
         ${whereSql}
         ORDER BY created_at DESC
         LIMIT ? OFFSET ?`
      )
      .all(...params, limit, offset);

    return {
      entries: rows.map(mapAuditEntry),
      total: toPositiveInt(totalRow?.total, 0),
      limit,
      offset,
    };
  } catch {
    return { entries: [], total: 0, limit: 50, offset: 0 };
  }
}

/**
 * Backward compatible helper for existing callers.
 */
export async function getRecentAuditEntries(limit = 50): Promise<McpAuditEntry[]> {
  const result = await queryAuditEntries({ limit, offset: 0 });
  return result.entries;
}

/**
 * Get audit stats for monitoring.
 */
export async function getAuditStats(): Promise<{
  totalCalls: number;
  successRate: number;
  avgDurationMs: number;
  topTools: Array<{ tool: string; count: number }>;
}> {
  try {
    const database = await getDb();
    if (!database) return { totalCalls: 0, successRate: 0, avgDurationMs: 0, topTools: [] };

    const stats = database
      .prepare(
        `SELECT 
           COUNT(*) as total,
           AVG(CASE WHEN success = 1 THEN 1.0 ELSE 0.0 END) as successRate,
           AVG(duration_ms) as avgDuration
         FROM mcp_tool_audit
         WHERE created_at > datetime('now', '-24 hours')`
      )
      .get() as AuditStatsRow | undefined;

    const topTools = database
      .prepare(
        `SELECT tool_name as tool, COUNT(*) as count
         FROM mcp_tool_audit
         WHERE created_at > datetime('now', '-24 hours')
         GROUP BY tool_name
         ORDER BY count DESC
         LIMIT 10`
      )
      .all() as AuditTopToolRow[];

    return {
      totalCalls: toNumber(stats?.total, 0),
      successRate: toNumber(stats?.successRate, 0),
      avgDurationMs: toNumber(stats?.avgDuration, 0),
      topTools: (topTools || []).map((entry) => ({
        tool: toString(entry.tool),
        count: toNumber(entry.count, 0),
      })),
    };
  } catch {
    return { totalCalls: 0, successRate: 0, avgDurationMs: 0, topTools: [] };
  }
}
