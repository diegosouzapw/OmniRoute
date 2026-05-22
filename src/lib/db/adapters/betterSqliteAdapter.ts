import type { SqliteAdapter, PreparedStatement, RunResult } from "./types";

export function createBetterSqliteAdapter(db: import("better-sqlite3").Database): SqliteAdapter {
  return {
    driver: "better-sqlite3",

    get open() {
      return db.open;
    },

    get name() {
      return db.name;
    },

    prepare(sql: string): PreparedStatement {
      const stmt = db.prepare(sql);
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
      db.close();
    },

    get raw() {
      return db;
    },
  };
}
