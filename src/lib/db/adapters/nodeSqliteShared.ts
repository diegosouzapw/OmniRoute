import fs from "node:fs";
import type { PreparedStatement, RunResult, SqliteAdapter } from "./types";

export interface NodeSqliteDatabaseLike {
  prepare(sql: string): {
    run(...p: unknown[]): { changes: number | bigint; lastInsertRowid: number | bigint };
    get(...p: unknown[]): unknown;
    all(...p: unknown[]): unknown[];
    // node:sqlite (DatabaseSync) statements expose these tuning setters. They
    // are optional here so the shared adapter also accepts lighter test doubles.
    setAllowUnknownNamedParameters?(enabled: boolean): void;
    setAllowBareNamedParameters?(enabled: boolean): void;
  };
  exec(sql: string): void;
  close(): void;
}

const MAX_STMT_CACHE_SIZE = 200;

// node:sqlite hands back rows whose prototype is `null` (Object.create(null)),
// whereas better-sqlite3 (the driver we ship and run in production/CI) returns
// ordinary Object.prototype rows. The difference is invisible for normal
// property access but breaks callers that compare rows with structural
// equality that also checks the prototype (e.g. Node's assert.deepStrictEqual,
// used by unit tests written against the better-sqlite3 row shape). Normalize
// every row to a plain object so the node:sqlite fallback is behaviourally
// identical to the native better-sqlite3 path.
function toPlainRow<T>(row: T): T {
  if (row === null || typeof row !== "object") return row;
  return { ...(row as Record<string, unknown>) } as T;
}

// better-sqlite3 (the production/CI driver) and sql.js both accept `undefined`
// as a bound value and treat it as SQL NULL. node:sqlite is stricter and throws
// "Provided value cannot be bound to SQLite parameter N" for undefined. Several
// call sites pass undefined for absent optional columns (e.g. a capability sync
// that omits modalities_input), so coerce undefined -> null here to keep the
// node:sqlite fallback behaviourally compatible with the native driver. This
// handles both positional params and a single named-params object.
function normalizeBindParams(params: unknown[]): unknown[] {
  const [first] = params;
  const isLoneNamedParamsObject =
    params.length === 1 &&
    first !== null &&
    typeof first === "object" &&
    !Array.isArray(first) &&
    !Buffer.isBuffer(first) &&
    !(first instanceof Uint8Array);
  if (isLoneNamedParamsObject) {
    const source = first as Record<string, unknown>;
    const normalized: Record<string, unknown> = {};
    for (const key of Object.keys(source)) {
      normalized[key] = source[key] === undefined ? null : source[key];
    }
    return [normalized];
  }
  return params.map((value) => (value === undefined ? null : value));
}

export function createNodeSqliteAdapterFromDatabase(
  db: NodeSqliteDatabaseLike,
  filePath: string,
  onClose?: () => void
): SqliteAdapter {
  let _isOpen = true;
  let transactionDepth = 0;
  type NodeSqliteStatement = ReturnType<NodeSqliteDatabaseLike["prepare"]>;
  interface CachedStatement {
    stmt: NodeSqliteStatement;
  }
  const stmtCache = new Map<string, CachedStatement>();

  function finalizeStatement(stmt: NodeSqliteStatement | undefined) {
    if (stmt && "finalize" in stmt) {
      try {
        (stmt as NodeSqliteStatement & { finalize: () => void }).finalize();
      } catch {}
    }
  }

  function getCached(sql: string) {
    let entry = stmtCache.get(sql);
    if (entry) {
      stmtCache.delete(sql);
      stmtCache.set(sql, entry);
    } else {
      const stmt = db.prepare(sql);
      // better-sqlite3 (the production/CI driver) silently ignores named
      // parameters supplied in the bind object that the SQL text does not
      // reference. node:sqlite instead throws "Unknown named parameter '<x>'".
      // Several call sites deliberately pass a superset params object (e.g. an
      // UPDATE that omits @createdAt while the shared params builder still
      // includes it), so relax node:sqlite to match better-sqlite3 and keep the
      // fallback driver behaviourally compatible.
      stmt.setAllowUnknownNamedParameters?.(true);
      if (stmtCache.size >= MAX_STMT_CACHE_SIZE) {
        const oldestKey = stmtCache.keys().next().value;
        if (oldestKey !== undefined) {
          finalizeStatement(stmtCache.get(oldestKey)?.stmt);
          stmtCache.delete(oldestKey);
        }
      }
      entry = { stmt };
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

  function runImmediate(fn: () => void): void {
    if (transactionDepth > 0) {
      runSavepoint(fn);
      return;
    }

    db.exec("BEGIN IMMEDIATE");
    transactionDepth += 1;
    try {
      fn();
      db.exec("COMMIT");
    } catch (error) {
      try {
        db.exec("ROLLBACK");
      } catch {} // The failed transaction may already have released its write lock.
      throw error;
    } finally {
      transactionDepth -= 1;
    }
  }

  function close() {
    try {
      onClose?.();
    } catch {}
    try {
      for (const entry of stmtCache.values()) {
        finalizeStatement(entry.stmt);
      }
      stmtCache.clear();
    } catch {}
    try {
      db.close();
    } catch {}
    _isOpen = false;
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
          const r = stmt.run(...normalizeBindParams(params));
          return {
            changes: Number(r.changes ?? 0),
            lastInsertRowid: Number(r.lastInsertRowid ?? 0),
          };
        },
        get(...params: unknown[]): unknown {
          return toPlainRow(stmt.get(...normalizeBindParams(params)));
        },
        all(...params: unknown[]): unknown[] {
          return (stmt.all(...normalizeBindParams(params)) as unknown[]).map((row) =>
            toPlainRow(row)
          );
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
      return (...args: unknown[]) => {
        transactionDepth += 1;
        try {
          return runSavepoint(fn, ...args);
        } finally {
          transactionDepth -= 1;
        }
      };
    },
    immediate(fn: () => void): void {
      runImmediate(fn);
    },
    async backup(destination: string): Promise<void> {
      const { backup } = await import("node:sqlite");
      if (typeof backup === "function") {
        await backup(db as never, destination);
        return;
      }

      try {
        db.exec("PRAGMA wal_checkpoint(TRUNCATE)");
      } catch {}
      await fs.promises.copyFile(filePath, destination);
    },
    checkpoint(mode = "TRUNCATE"): void {
      try {
        db.exec(`PRAGMA wal_checkpoint(${mode})`);
      } catch {}
    },
    close,
    get raw() {
      return db;
    },
  };
}
