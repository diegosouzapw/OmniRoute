import type { SqliteAdapter, PreparedStatement, RunResult } from "./types";
import { instrumentSqliteAdapter } from "./slowDiagnostics";

// Same bound as the node:sqlite adapter (nodeSqliteShared.ts).
const MAX_STMT_CACHE_SIZE = 200;

export function createBetterSqliteAdapter(db: import("better-sqlite3").Database): SqliteAdapter {
  // Hot request paths prepare the same SQL on every call (call_logs INSERT, usage_history
  // statements), and SQLite was ~8% of main-thread busy time in a production profile, so
  // statements are cached by SQL text, least recently used first out.
  // Reuse is safe: the adapter only exposes synchronous run/get/all, never iterate()
  // or bind(), and SQLite recompiles a cached statement itself after a schema change.
  const stmtCache = new Map<string, import("better-sqlite3").Statement>();

  function getCached(sql: string) {
    let stmt = stmtCache.get(sql);
    if (stmt) {
      stmtCache.delete(sql);
      stmtCache.set(sql, stmt);
      return stmt;
    }
    stmt = db.prepare(sql);
    if (stmtCache.size >= MAX_STMT_CACHE_SIZE) {
      const oldestKey = stmtCache.keys().next().value;
      if (oldestKey !== undefined) stmtCache.delete(oldestKey);
    }
    stmtCache.set(sql, stmt);
    return stmt;
  }

  const adapter: SqliteAdapter = {
    driver: "better-sqlite3",

    get open() {
      return db.open;
    },

    get name() {
      return db.name;
    },

    get inTransaction() {
      return db.inTransaction;
    },

    prepare(sql: string): PreparedStatement {
      const stmt = getCached(sql);
      return {
        run: (...params: unknown[]): RunResult => stmt.run(...params) as unknown as RunResult,
        get: (...params: unknown[]): unknown => stmt.get(...params),
        all: (...params: unknown[]): unknown[] => stmt.all(...params),
      };
    },

    exec(sql: string): void {
      db.exec(sql);
    },

    pragma(pragmaStr: string, options?: { simple?: boolean }): unknown {
      return db.pragma(pragmaStr, options);
    },

    transaction<T>(fn: (...args: unknown[]) => T): (...args: unknown[]) => T {
      return db.transaction(fn) as (...args: unknown[]) => T;
    },

    immediate(fn: () => void): void {
      (db.transaction(fn) as unknown as { immediate: () => void }).immediate();
    },

    async backup(destination: string): Promise<void> {
      await db.backup(destination);
    },

    checkpoint(mode = "TRUNCATE"): void {
      try {
        db.pragma(`wal_checkpoint(${mode})`);
      } catch {}
    },

    close(): void {
      stmtCache.clear();
      db.close();
    },

    get raw() {
      return db;
    },
  };
  return instrumentSqliteAdapter(adapter);
}
