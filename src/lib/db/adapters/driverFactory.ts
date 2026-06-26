// src/lib/db/adapters/driverFactory.ts
import fs from "node:fs";
import { createRequire } from "node:module";
import { createBetterSqliteAdapter } from "./betterSqliteAdapter";
import type { SqliteAdapter, PreparedStatement, RunResult } from "./types";

const _require = createRequire(import.meta.url);

declare global {
  var __omnirouteSqlJsAdapters: Map<string, SqliteAdapter> | undefined;
}

function getSqlJsCache(): Map<string, SqliteAdapter> {
  if (!globalThis.__omnirouteSqlJsAdapters) {
    globalThis.__omnirouteSqlJsAdapters = new Map();
  }
  return globalThis.__omnirouteSqlJsAdapters;
}

function buildNodeAdapterSync(
  db: {
    prepare(sql: string): {
      run(...p: unknown[]): { changes: number | bigint; lastInsertRowid: number | bigint };
      get(...p: unknown[]): unknown;
      all(...p: unknown[]): unknown[];
    };
    exec(sql: string): void;
    close(): void;
  },
  filePath: string
): SqliteAdapter {
  let _isOpen = true;
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

  function runSp<T>(fn: (...args: unknown[]) => T, ...args: unknown[]): T {
    const sp = `sp_${Math.random().toString(36).slice(2)}`;
    db.exec(`SAVEPOINT "${sp}"`);
    try {
      const r = fn(...args);
      db.exec(`RELEASE "${sp}"`);
      return r;
    } catch (e) {
      try {
        db.exec(`ROLLBACK TO "${sp}"`);
        db.exec(`RELEASE "${sp}"`);
      } catch {}
      throw e;
    }
  }

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
      if (options?.simple) {
        const row = db.prepare(`PRAGMA ${pragmaStr}`).get() as Record<string, unknown> | undefined;
        if (!row) return null;
        return Object.values(row)[0] ?? null;
      }
      return db.prepare(`PRAGMA ${pragmaStr}`).all();
    },
    transaction<T>(fn: (...args: unknown[]) => T): (...args: unknown[]) => T {
      return (...args: unknown[]) => runSp(fn, ...args);
    },
    immediate(fn: () => void): void {
      runSp(() => fn());
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
      try {
        for (const entry of stmtCache.values()) {
          if (entry.stmt && "finalize" in entry.stmt) {
            try { (entry.stmt as any).finalize(); } catch {}
          }
        }
        stmtCache.clear();
        db.close();
      } finally {
        _isOpen = false;
      }
    },
    get raw() {
      return db;
    },
  };
}

/** Tenta abrir com better-sqlite3 e node:sqlite sincronamente. Retorna null se ambos falharem. */
export function tryOpenSync(
  filePath: string,
  options?: Record<string, unknown>
): SqliteAdapter | null {
  // better-sqlite3: rápido, nativo — skip em Bun
  if (!process.versions.bun) {
    try {
      const BetterSqlite = _require("better-sqlite3") as {
        new (p: string, o?: object): import("better-sqlite3").Database;
      };
      const db = new BetterSqlite(filePath, options);
      return createBetterSqliteAdapter(db);
    } catch {
      // continua para próximo driver
    }
  }

  // node:sqlite: built-in desde Node 22.5 — skip em Bun
  if (!process.versions.bun) {
    const [maj, min] = (process.versions.node ?? "0.0").split(".").map(Number);
    if (maj > 22 || (maj === 22 && min >= 5)) {
      try {
        const { DatabaseSync } = _require("node:sqlite") as {
          DatabaseSync: new (p: string) => Parameters<typeof buildNodeAdapterSync>[0];
        };
        const db = new DatabaseSync(filePath);
        return buildNodeAdapterSync(db, filePath);
      } catch {
        // continua
      }
    }
  }

  return null;
}

/**
 * Pré-inicializa sql.js para um filePath.
 * Armazena em globalThis para acesso posterior via getSqlJsAdapter().
 * Idempotente — seguro chamar múltiplas vezes.
 */
export async function preInitSqlJs(filePath: string): Promise<SqliteAdapter> {
  const cache = getSqlJsCache();
  const existing = cache.get(filePath);
  if (existing) return existing;

  const { createSqlJsAdapter } = await import("./sqljsAdapter");
  const adapter = await createSqlJsAdapter(filePath);
  cache.set(filePath, adapter);
  return adapter;
}

/** Retorna adapter sql.js pré-inicializado ou null se ainda não inicializado. */
export function getSqlJsAdapter(filePath: string): SqliteAdapter | null {
  return getSqlJsCache().get(filePath) ?? null;
}

/**
 * Factory assíncrona completa: tenta todos os drivers em cascata.
 * Ordem: better-sqlite3 → node:sqlite → sql.js
 */
export async function openDatabaseAsync(
  filePath: string,
  options?: Record<string, unknown>
): Promise<SqliteAdapter> {
  const sync = tryOpenSync(filePath, options);
  if (sync) {
    console.log(`[DB] Driver: ${sync.driver} | file: ${filePath}`);
    return sync;
  }

  console.warn("[DB] Synchronous drivers unavailable — falling back to sql.js (WASM)");
  const adapter = await preInitSqlJs(filePath);
  console.log(`[DB] Driver: sql.js | file: ${filePath}`);
  return adapter;
}
