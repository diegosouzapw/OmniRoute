// src/lib/db/adapters/nodeSqliteAdapter.ts
import fs from "node:fs";
import type { SqliteAdapter, PreparedStatement, RunResult } from "./types";

const CHECKPOINT_INTERVAL_MS = 60_000;

export async function createNodeSqliteAdapter(filePath: string): Promise<SqliteAdapter> {
  // Suprimir ExperimentalWarning
  const origEmit = process.emit.bind(process);
  (process as NodeJS.Process).emit = function (name: string, ...args: unknown[]) {
    if (
      name === "warning" &&
      args[0] !== null &&
      typeof args[0] === "object" &&
      "name" in (args[0] as object) &&
      (args[0] as { name: string }).name === "ExperimentalWarning"
    ) {
      return false;
    }
    return origEmit(name as never, ...(args as never[]));
  } as typeof process.emit;

  const { DatabaseSync } = (await import("node:sqlite" as never)) as {
    DatabaseSync: new (path: string) => {
      prepare(sql: string): {
        run(...p: unknown[]): { changes: number | bigint; lastInsertRowid: number | bigint };
        get(...p: unknown[]): unknown;
        all(...p: unknown[]): unknown[];
      };
      exec(sql: string): void;
      close(): void;
    };
  };

  const db = new DatabaseSync(filePath);

  const MAX_STMT_CACHE_SIZE = 200;
  interface CachedStatement {
    stmt: ReturnType<typeof db.prepare>;
    sql: string;
  }
  const stmtCache = new Map<string, CachedStatement>();

  function getCached(sql: string) {
    let entry = stmtCache.get(sql);
    if (entry) {
      stmtCache.delete(sql);
      stmtCache.set(sql, entry);
    } else {
      const stmt = db.prepare(sql);
      if (stmtCache.size >= MAX_STMT_CACHE_SIZE) {
        const oldestKey = stmtCache.keys().next().value;
        if (oldestKey !== undefined) {
          const oldest = stmtCache.get(oldestKey);
          if (oldest?.stmt && "finalize" in oldest.stmt) {
            try { (oldest.stmt as any).finalize(); } catch {}
          }
          stmtCache.delete(oldestKey);
        }
      }
      entry = { stmt, sql };
      stmtCache.set(sql, entry);
    }
    return entry.stmt;
  }

  function runSavepoint<T>(fn: (...args: unknown[]) => T, ...args: unknown[]): T {
    const sp = `sp_${Math.random().toString(36).slice(2)}`;
    db.exec(`SAVEPOINT "${sp}"`);
    try {
      const result = fn(...args);
      db.exec(`RELEASE "${sp}"`);
      return result;
    } catch (err) {
      try {
        db.exec(`ROLLBACK TO "${sp}"`);
        db.exec(`RELEASE "${sp}"`);
      } catch {}
      throw err;
    }
  }

  const checkpointTimer = setInterval(() => {
    try {
      db.exec("PRAGMA wal_checkpoint(TRUNCATE)");
    } catch {}
  }, CHECKPOINT_INTERVAL_MS);
  (checkpointTimer as unknown as NodeJS.Timeout).unref?.();

  let _isOpen = true;

  function gracefulClose() {
    clearInterval(checkpointTimer as unknown as NodeJS.Timeout);
    try {
      db.exec("PRAGMA wal_checkpoint(TRUNCATE)");
    } catch {}
    try {
      for (const entry of stmtCache.values()) {
        if (entry.stmt && "finalize" in entry.stmt) {
          try { (entry.stmt as any).finalize(); } catch {}
        }
      }
      stmtCache.clear();
    } catch {}
    try {
      db.close();
    } catch {}
    _isOpen = false;
  }

  process.once("beforeExit", gracefulClose);
  process.once("SIGINT", () => {
    gracefulClose();
    process.exit(0);
  });
  process.once("SIGTERM", () => {
    gracefulClose();
    process.exit(0);
  });

  return {
    driver: "node:sqlite",

    get open() {
      return _isOpen;
    },

    get name() {
      return filePath;
    },

    prepare(sql: string): PreparedStatement {
      const stmt = getCached(sql);
      return {
        run(...params: unknown[]): RunResult {
          const r = stmt.run(...params);
          return {
            changes: Number(r.changes ?? 0),
            lastInsertRowid: Number(r.lastInsertRowid ?? 0),
          };
        },
        get(...params: unknown[]): unknown {
          return stmt.get(...params);
        },
        all(...params: unknown[]): unknown[] {
          return stmt.all(...params);
        },
      };
    },

    exec(sql: string): void {
      db.exec(sql);
    },

    pragma(pragmaStr: string, options?: { simple?: boolean }): unknown {
      const sql = `PRAGMA ${pragmaStr}`;
      if (options?.simple) {
        const row = db.prepare(sql).get() as Record<string, unknown> | undefined;
        if (!row) return null;
        return Object.values(row)[0] ?? null;
      }
      return db.prepare(sql).all();
    },

    transaction<T>(fn: (...args: unknown[]) => T): (...args: unknown[]) => T {
      return (...args: unknown[]) => runSavepoint(fn, ...args);
    },

    immediate(fn: () => void): void {
      runSavepoint(() => fn());
    },

    async backup(destination: string): Promise<void> {
      try {
        db.exec("PRAGMA wal_checkpoint(TRUNCATE)");
      } catch {}
      fs.copyFileSync(filePath, destination);
    },

    checkpoint(mode = "TRUNCATE"): void {
      try {
        db.exec(`PRAGMA wal_checkpoint(${mode})`);
      } catch {}
    },

    close(): void {
      gracefulClose();
    },

    get raw() {
      return db;
    },
  };
}
