import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as workerThreads from "node:worker_threads";
import type { PreparedStatement, RunResult, SqliteAdapter } from "./types";
import type { PostgresConfig } from "../postgresConfig";
import { redactPostgresUrl } from "../postgresConfig";
import { buildBootstrapSql, POSTGRES_BOOTSTRAP_VERSION } from "./postgres/bootstrapSql";
import {
  PostgresAdapterError,
  toSqliteStyleMessage,
  type WorkerErrorPayload,
} from "./postgres/postgresErrors";
import { splitStatements } from "./postgres/sqlTokenizer";
import {
  ROWID_COLUMN,
  translateStatement,
  type TableSchema,
  type TranslatedStatement,
} from "./postgres/sqlTranslator";

const WRITER_LOCK_KEY = 7211002;
const TRANSLATION_CACHE_LIMIT = 4000;
const WORKER_PATH_ENV = "OMNIROUTE_PG_WORKER_PATH";

interface QueryResult {
  rows: Array<Record<string, unknown>>;
  rowCount: number;
  command: string | null;
}

interface WorkerResponse {
  ok: boolean;
  result?: unknown;
  error?: WorkerErrorPayload;
}

export interface PostgresAdapterOptions {
  resetSchema?: boolean;
}

function resolveWorkerPath(): string {
  const configured = process.env[WORKER_PATH_ENV];
  if (configured && fs.existsSync(configured)) return path.resolve(configured);
  const relativeCandidates = [
    ["postgres", "postgresWorker.mjs"],
    ["src", "lib", "db", "adapters", "postgres", "postgresWorker.mjs"],
    ["db-runtime", "postgres", "postgresWorker.mjs"],
    ["app", "src", "lib", "db", "adapters", "postgres", "postgresWorker.mjs"],
  ];
  const roots: string[] = [];
  try {
    roots.push(path.dirname(fileURLToPath(import.meta.url)));
  } catch {}
  roots.push(process.cwd());
  const migrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
  if (migrationsDir) roots.push(path.dirname(path.resolve(migrationsDir)));
  for (const root of roots) {
    let current = root;
    while (true) {
      for (const candidate of relativeCandidates) {
        const full = path.join(current, ...candidate);
        if (fs.existsSync(full)) return full;
      }
      const parent = path.dirname(current);
      if (parent === current) break;
      current = parent;
    }
  }
  throw new Error(
    `[DB] Cannot locate postgresWorker.mjs. Set ${WORKER_PATH_ENV} to the file shipped under src/lib/db/adapters/postgres/.`
  );
}

class PostgresSyncChannel {
  private readonly signal = new Int32Array(new SharedArrayBuffer(4));
  private readonly port: workerThreads.MessagePort;
  private readonly worker: workerThreads.Worker;
  private alive = true;
  private exitReason: string | null = null;

  constructor(
    private readonly config: PostgresConfig,
    resetSchema: boolean
  ) {
    const channel = new workerThreads.MessageChannel();
    this.port = channel.port1;
    const workerPath = resolveWorkerPath();
    const pgModulePath = process.env.OMNIROUTE_PG_MODULE_PATH ?? null;
    this.worker = new workerThreads.Worker(workerPath, {
      workerData: {
        port: channel.port2,
        signal: this.signal.buffer,
        pgModulePath,
        connection: {
          url: config.url,
          ssl: config.ssl,
          schema: config.schema,
          resetSchema,
          applicationName: config.applicationName,
          statementTimeoutMs: config.statementTimeoutMs,
          connectTimeoutMs: config.connectTimeoutMs,
        },
      },
      transferList: [channel.port2],
    });
    this.worker.unref();
    this.worker.on("exit", (code) => {
      this.alive = false;
      this.exitReason = `worker exited with code ${code}`;
    });
    this.worker.on("error", (error: Error) => {
      this.alive = false;
      this.exitReason = error.message;
    });
  }

  get isAlive(): boolean {
    return this.alive;
  }

  call<T>(request: Record<string, unknown>, sql: string | null, timeoutMs: number): T {
    if (!this.alive)
      throw new PostgresAdapterError(
        `[DB] PostgreSQL worker unavailable: ${this.exitReason ?? "not running"}`,
        {},
        sql
      );
    Atomics.store(this.signal, 0, 0);
    this.port.postMessage(request);
    const waitResult = Atomics.wait(this.signal, 0, 0, timeoutMs);
    const message = workerThreads.receiveMessageOnPort(this.port);
    if (!message) {
      if (waitResult === "timed-out") {
        this.terminate();
        throw new PostgresAdapterError(
          `[DB] PostgreSQL worker did not answer within ${timeoutMs}ms; the connection was dropped`,
          { code: "57014" },
          sql
        );
      }
      this.terminate();
      throw new PostgresAdapterError("[DB] PostgreSQL worker stopped without answering", {}, sql);
    }
    const response = message.message as WorkerResponse;
    if (!response.ok) {
      const payload = response.error as WorkerErrorPayload;
      if (payload.code === "42883" && /omniroute_/.test(payload.message)) {
        throw new PostgresAdapterError(
          `${payload.message} (bootstrap helpers missing; restart the gateway to reinstall them)`,
          payload,
          sql
        );
      }
      throw new PostgresAdapterError(toSqliteStyleMessage(payload), payload, sql);
    }
    return response.result as T;
  }

  terminate(): void {
    this.alive = false;
    try {
      this.port.close();
    } catch {}
    void this.worker.terminate();
  }
}

function toBuffer(value: unknown): unknown {
  if (value instanceof Uint8Array && !Buffer.isBuffer(value))
    return Buffer.from(value.buffer, value.byteOffset, value.byteLength);
  return value;
}

function normalizeRows(rows: Array<Record<string, unknown>>): Array<Record<string, unknown>> {
  for (const row of rows) {
    if ("QUERY PLAN" in row) {
      row.detail = row["QUERY PLAN"];
      delete row["QUERY PLAN"];
    }
    for (const key of Object.keys(row)) {
      const value = row[key];
      if (value instanceof Uint8Array) row[key] = toBuffer(value);
    }
  }
  return rows;
}

function bindParams(translated: TranslatedStatement, params: unknown[]): unknown[] {
  if (params.length === 1) {
    const [first] = params;
    const isNamedObject =
      first !== null &&
      typeof first === "object" &&
      !Array.isArray(first) &&
      !Buffer.isBuffer(first) &&
      !(first instanceof Uint8Array) &&
      !(first instanceof Date);
    if (isNamedObject) {
      const record = first as Record<string, unknown>;
      if (translated.paramNames) {
        return translated.paramNames.map((name) => {
          for (const key of [name, `@${name}`, `:${name}`, `$${name}`]) {
            if (key in record) return record[key];
          }
          return null;
        });
      }
      return Object.values(record);
    }
  }
  if (params.length === 1 && Array.isArray(params[0]) && translated.paramCount !== 1)
    return params[0] as unknown[];
  return params;
}

export function createPostgresAdapter(
  config: PostgresConfig,
  options: PostgresAdapterOptions = {}
): SqliteAdapter {
  const channel = new PostgresSyncChannel(config, options.resetSchema === true);
  const queryTimeoutMs = config.statementTimeoutMs + 15_000;
  const schemaCache = new Map<string, TableSchema | null>();
  const translationCache = new Map<string, TranslatedStatement>();
  const idempotentDdlSeen = new Set<string>();
  let depth = 0;
  let savepointCounter = 0;
  let isOpen = true;
  const displayName =
    redactPostgresUrl(config.url) + (config.schema ? ` (schema ${config.schema})` : "");

  function rawQuery(sql: string, params?: unknown[], savepoint = depth > 0): QueryResult {
    const result = channel.call<QueryResult>(
      { op: "query", sql, params: params ?? [], savepoint, inTransaction: depth > 0 },
      sql,
      queryTimeoutMs
    );
    result.rows = normalizeRows(result.rows);
    return result;
  }

  function runScript(sql: string): void {
    channel.call({ op: "script", sql }, sql, Math.max(queryTimeoutMs, 120_000));
  }

  function lookupTable(name: string): TableSchema | null {
    const key = name.toLowerCase();
    if (schemaCache.has(key)) return schemaCache.get(key) ?? null;
    const rows = rawQuery(
      "SELECT column_name, data_type, is_identity, pk_position, unique_groups FROM omniroute_table_schema($1)",
      [name],
      false
    ).rows as Array<{
      column_name: string;
      data_type: string;
      is_identity: number;
      pk_position: number;
      unique_groups: string | null;
    }>;
    if (rows.length === 0) {
      schemaCache.set(key, null);
      return null;
    }
    const columns = rows.map((row) => row.column_name);
    const primaryKey = rows
      .filter((row) => row.pk_position > 0)
      .sort((a, b) => a.pk_position - b.pk_position)
      .map((row) => row.column_name);
    const groups = new Map<string, string[]>();
    for (const row of rows) {
      if (!row.unique_groups) continue;
      for (const group of row.unique_groups.split(",")) {
        const members = groups.get(group) ?? [];
        members.push(row.column_name);
        groups.set(group, members);
      }
    }
    const identity =
      rows.find((row) => row.is_identity === 1 && row.pk_position > 0)?.column_name ??
      rows.find((row) => row.is_identity === 1)?.column_name ??
      null;
    const columnTypes: Record<string, string> = {};
    for (const row of rows) columnTypes[row.column_name.toLowerCase()] = row.data_type;
    const schema: TableSchema = {
      columns,
      columnTypes,
      primaryKey,
      uniqueIndexes: Array.from(groups.values()),
      identityColumn: identity === ROWID_COLUMN && primaryKey.length ? null : identity,
    };
    schemaCache.set(key, schema);
    return schema;
  }

  const context = { lookupTable };

  function translate(sql: string): TranslatedStatement {
    const cached = translationCache.get(sql);
    if (cached) return cached;
    const translated = translateStatement(sql, context);
    if (translationCache.size >= TRANSLATION_CACHE_LIMIT) {
      const oldest = translationCache.keys().next().value;
      if (oldest !== undefined) translationCache.delete(oldest);
    }
    translationCache.set(sql, translated);
    return translated;
  }

  function invalidateSchema(tables: string[], forgetIdempotentDdl: boolean): void {
    if (tables.length === 0) {
      schemaCache.clear();
      translationCache.clear();
      idempotentDdlSeen.clear();
      return;
    }
    const affected = new Set(tables.map((table) => table.toLowerCase()));
    for (const table of affected) schemaCache.delete(table);
    for (const [sql, translated] of translationCache) {
      if (translated.tables.some((table) => affected.has(table.toLowerCase())))
        translationCache.delete(sql);
    }
    if (!forgetIdempotentDdl) return;
    for (const statement of idempotentDdlSeen) {
      if (tables.some((table) => statement.toLowerCase().includes(`"${table.toLowerCase()}"`)))
        idempotentDdlSeen.delete(statement);
    }
  }

  function isIdempotentDdl(statement: string): boolean {
    return /^(CREATE (UNIQUE )?(TABLE|INDEX) IF NOT EXISTS|ALTER TABLE .* ADD COLUMN IF NOT EXISTS)/i.test(
      statement
    );
  }

  function executeTranslated(translated: TranslatedStatement, params: unknown[]): QueryResult {
    if (translated.kind === "pragma") {
      return {
        rows: applyPragma(translated.pragma ?? "", false) as Array<Record<string, unknown>>,
        rowCount: 0,
        command: "PRAGMA",
      };
    }
    if (translated.kind === "noop") return { rows: [], rowCount: 0, command: null };
    if (translated.kind === "transaction") {
      for (const statement of translated.statements) executeTransactionStatement(statement);
      return { rows: [], rowCount: 0, command: "TRANSACTION" };
    }
    let last: QueryResult = { rows: [], rowCount: 0, command: null };
    const bound = bindParams(translated, params);
    let executedDdl = false;
    let executedStructuralDdl = false;
    const executedIdempotent: string[] = [];
    for (const statement of translated.statements) {
      if (translated.kind === "ddl" && isIdempotentDdl(statement)) {
        if (idempotentDdlSeen.has(statement)) continue;
        last = rawQuery(statement, bound);
        executedIdempotent.push(statement);
        executedDdl = true;
        continue;
      }
      last = rawQuery(statement, bound);
      if (translated.kind === "ddl") {
        executedDdl = true;
        executedStructuralDdl = true;
      }
    }
    if (executedDdl) invalidateSchema(translated.tables, executedStructuralDdl);
    for (const statement of executedIdempotent) idempotentDdlSeen.add(statement);
    return last;
  }

  function executeTransactionStatement(statement: string): void {
    const upper = statement.toUpperCase();
    if (upper === "BEGIN") {
      if (depth === 0) {
        rawQuery("BEGIN", [], false);
        depth = 1;
      }
      return;
    }
    if (upper === "COMMIT") {
      if (depth > 0) {
        rawQuery("COMMIT", [], false);
        depth = 0;
      }
      return;
    }
    if (upper === "ROLLBACK") {
      if (depth > 0) {
        rawQuery("ROLLBACK", [], false);
        depth = 0;
      }
      return;
    }
    rawQuery(statement, [], false);
  }

  function runOne(sql: string, params: unknown[]): RunResult {
    const translated = translate(sql);
    const result = executeTranslated(translated, params);
    let lastInsertRowid: number | bigint = 0;
    if (translated.kind === "insert" && result.rows.length > 0) {
      const first = result.rows[0];
      const candidate = translated.returningColumn
        ? first[translated.returningColumn]
        : (first.id ?? first[ROWID_COLUMN]);
      if (typeof candidate === "number") lastInsertRowid = candidate;
      else if (typeof candidate === "bigint") lastInsertRowid = candidate;
    }
    return { changes: result.rowCount, lastInsertRowid };
  }

  function beginTransaction(immediate: boolean): string | null {
    if (depth === 0) {
      rawQuery("BEGIN", [], false);
      depth = 1;
      if (immediate)
        rawQuery(
          `SELECT pg_advisory_xact_lock(${WRITER_LOCK_KEY}, hashtext(current_schema()))`,
          [],
          false
        );
      return null;
    }
    savepointCounter += 1;
    const name = `omniroute_tx_${savepointCounter}`;
    rawQuery(`SAVEPOINT ${name}`, [], false);
    depth += 1;
    return name;
  }

  function commitTransaction(savepoint: string | null): void {
    if (savepoint) {
      rawQuery(`RELEASE SAVEPOINT ${savepoint}`, [], false);
      depth -= 1;
      return;
    }
    rawQuery("COMMIT", [], false);
    depth = 0;
  }

  function rollbackTransaction(savepoint: string | null): void {
    try {
      if (savepoint) {
        rawQuery(`ROLLBACK TO SAVEPOINT ${savepoint}`, [], false);
        rawQuery(`RELEASE SAVEPOINT ${savepoint}`, [], false);
      } else {
        rawQuery("ROLLBACK", [], false);
      }
    } catch {
      depth = 0;
      return;
    }
    depth = savepoint ? depth - 1 : 0;
  }

  function runInTransaction<T>(fn: () => T, immediate: boolean): T {
    const savepoint = beginTransaction(immediate);
    try {
      const result = fn();
      commitTransaction(savepoint);
      return result;
    } catch (error) {
      rollbackTransaction(savepoint);
      throw error;
    }
  }

  function applyPragma(pragmaText: string, simple: boolean): unknown {
    const text = pragmaText.trim().replace(/;$/, "");
    const call = /^([A-Za-z_]+)\s*\(\s*["'`]?([^"'`)]*)["'`]?\s*\)$/.exec(text);
    const assignment = /^([A-Za-z_]+)\s*=\s*(.+)$/.exec(text);
    const name = (call?.[1] ?? assignment?.[1] ?? text).toLowerCase();
    const argument = call?.[2]?.trim() ?? null;
    const pick = (rows: Array<Record<string, unknown>>): unknown => {
      if (!simple) return rows;
      const first = rows[0];
      if (!first) return null;
      const firstKey = Object.keys(first)[0];
      return firstKey === undefined ? null : first[firstKey];
    };
    switch (name) {
      case "table_info":
      case "table_xinfo":
        return pick(
          rawQuery(
            'SELECT cid, name, type, "notnull", dflt_value, pk FROM omniroute_table_info($1)',
            [argument ?? ""],
            false
          ).rows
        );
      case "index_list":
        return pick(
          rawQuery(
            'SELECT seq, name, "unique", origin, partial FROM omniroute_index_list($1)',
            [argument ?? ""],
            false
          ).rows
        );
      case "index_info":
      case "index_xinfo":
      case "foreign_key_list":
      case "database_list":
        return pick([]);
      case "journal_mode":
        return pick([{ journal_mode: "wal" }]);
      case "page_size":
        return pick([{ page_size: 8192 }]);
      case "page_count": {
        const rows = rawQuery(
          "SELECT CEIL(pg_database_size(current_database()) / 8192.0)::bigint AS page_count",
          [],
          false
        ).rows;
        return pick(rows);
      }
      case "cache_size":
        return pick([{ cache_size: -2000 }]);
      case "freelist_count":
        return pick([{ freelist_count: 0 }]);
      case "quick_check":
        return pick([{ quick_check: "ok" }]);
      case "integrity_check":
        return pick([{ integrity_check: "ok" }]);
      case "wal_checkpoint":
        return pick([{ busy: 0, log: 0, checkpointed: 0 }]);
      case "user_version":
      case "schema_version":
      case "foreign_keys":
      case "auto_vacuum":
      case "synchronous":
      case "temp_store":
      case "mmap_size":
      case "busy_timeout":
      case "application_id":
        return pick([{ [name]: 0 }]);
      case "compile_options":
        return pick([]);
      default:
        return assignment ? null : pick([]);
    }
  }

  function ensureBootstrapped(): void {
    let version = 0;
    try {
      const rows = rawQuery("SELECT omniroute_bootstrap_version() AS version", [], false)
        .rows as Array<{ version: number }>;
      version = rows[0]?.version ?? 0;
    } catch {
      version = 0;
    }
    if (version >= POSTGRES_BOOTSTRAP_VERSION) return;
    runScript(buildBootstrapSql());
  }

  try {
    channel.call({ op: "connect" }, null, config.connectTimeoutMs + 15_000);
  } catch (error) {
    channel.terminate();
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`[DB] Cannot connect to PostgreSQL at ${displayName}: ${message}`);
  }
  ensureBootstrapped();

  const adapter: SqliteAdapter = {
    driver: "postgres",

    get open() {
      return isOpen && channel.isAlive;
    },

    get name() {
      return displayName;
    },

    get inTransaction() {
      return depth > 0;
    },

    prepare(sql: string): PreparedStatement {
      return {
        run: (...params: unknown[]): RunResult => runOne(sql, params),
        get: (...params: unknown[]): unknown => {
          const translated = translate(sql);
          const result = executeTranslated(translated, params);
          return result.rows[0];
        },
        all: (...params: unknown[]): unknown[] => {
          const translated = translate(sql);
          return executeTranslated(translated, params).rows;
        },
      };
    },

    exec(sql: string): void {
      for (const statement of splitStatements(sql)) {
        const translated = translateStatement(statement, context);
        executeTranslated(translated, []);
      }
    },

    pragma(pragmaStr: string, options?: { simple?: boolean }): unknown {
      return applyPragma(pragmaStr, options?.simple === true);
    },

    transaction<T>(fn: (...args: unknown[]) => T): (...args: unknown[]) => T {
      return (...args: unknown[]) => runInTransaction(() => fn(...args), false);
    },

    immediate(fn: () => void): void {
      runInTransaction(fn, true);
    },

    async backup(): Promise<void> {
      throw new Error(
        "[DB] File backups are not available on the PostgreSQL backend; use pg_dump against the database instead"
      );
    },

    checkpoint(): void {},

    close(): void {
      if (!isOpen) return;
      isOpen = false;
      try {
        channel.call({ op: "close" }, null, 10_000);
      } catch {}
      channel.terminate();
    },

    get raw() {
      return null;
    },
  };

  return adapter;
}
