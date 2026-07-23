// src/lib/db/adapters/sqljsAdapter.ts
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import type { SqliteAdapter, PreparedStatement, RunResult } from "./types";

const SAVE_DEBOUNCE_MS = 100;
const CHECKPOINT_INTERVAL_MS = 60_000;
const _require = createRequire(import.meta.url);

let _sqlJsLib: Awaited<ReturnType<(typeof import("sql.js"))["default"]>> | null = null;

function resolveSqlJsWasmPath(): string {
  const candidatePaths = [
    path.join(process.cwd(), "node_modules", "sql.js", "dist", "sql-wasm.wasm"),
    path.join(
      process.cwd(),
      ".next",
      "standalone",
      "node_modules",
      "sql.js",
      "dist",
      "sql-wasm.wasm"
    ),
  ];

  // Global Bun installs do not use the application's cwd as the package root.
  // Resolve the actual JavaScript entrypoint so sql.js can find its sibling WASM
  // asset when OmniRoute is launched from ~/.bun/install/global.
  try {
    const sqlJsEntry = _require.resolve("sql.js");
    candidatePaths.push(path.join(path.dirname(sqlJsEntry), "sql-wasm.wasm"));
  } catch {}
  // #8135: Use a dynamic expression to avoid Next.js bundler's static analysis
  // producing a "Can't resolve 'sql.js/package.json'" build warning. The package.json
  // resolution is only needed for the WASM path, and the try/catch is still required
  // at runtime since sql.js is an optional dependency.
  try {
    const pkgName = "sql.js" + "/package.json";
    const sqlJsPackage = _require.resolve(pkgName);
    candidatePaths.push(
      path.join(path.dirname(sqlJsPackage), "dist", "sql-wasm.wasm"),
      path.join(path.dirname(sqlJsPackage), "sql-wasm.wasm")
    );
  } catch {}

  for (const candidatePath of candidatePaths) {
    if (fs.existsSync(candidatePath)) {
      return candidatePath;
    }
  }

  throw new Error(
    `[sqljsAdapter] Could not locate sql-wasm.wasm. Checked:\n${candidatePaths.join("\n")}`
  );
}

/**
 * better-sqlite3's named-parameter convention lets callers bind with the bare
 * property name (e.g. `{ isActive: 1 }` for a SQL placeholder written as
 * `@isActive`, `:isActive`, or `$isActive` — better-sqlite3 strips the sigil
 * internally). sql.js's own named-bind path (`sqlite3_bind_parameter_index`)
 * requires the FULL name INCLUDING the sigil, and silently no-ops (does not
 * throw) for a key it can't resolve. Expand each bare key to all three
 * sigil-prefixed variants so sql.js matches whichever sigil the SQL actually
 * used, while passing through any key the caller already prefixed unchanged.
 */
function withNamedParamPrefixes(obj: Record<string, unknown>): Record<string, unknown> {
  const expanded: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (/^[:@$]/.test(key)) {
      expanded[key] = value;
      continue;
    }
    expanded[`@${key}`] = value;
    expanded[`:${key}`] = value;
    expanded[`$${key}`] = value;
  }
  return expanded;
}

/**
 * sql.js's own `stmt.bind()` dispatches on shape: an Array means positional
 * bind (each element -> bind index N), a plain object means named-parameter
 * bind. Callers here always pass their rest-args as an array, so a caller
 * doing `.all({ isActive: 1 })` for a named placeholder (mirrors
 * better-sqlite3's spread-args named-bind convention, see
 * betterSqliteAdapter.ts) ends up handing sql.js `[{isActive:1}]` — an ARRAY
 * containing the object — which sql.js treats as a single positional value
 * and rejects with "Wrong API use : tried to bind a value of an unknown
 * type (...)." (#6802). Unwrap a lone plain-object param back to the object
 * itself (sigil-expanded) so sql.js takes its named-bind path instead.
 */
function toBindValue(params: unknown[]): unknown[] | Record<string, unknown> | undefined {
  if (!params.length) return undefined;
  const [first] = params;
  const isLoneNamedParamsObject =
    params.length === 1 &&
    first !== null &&
    typeof first === "object" &&
    !Array.isArray(first) &&
    !Buffer.isBuffer(first) &&
    !(first instanceof Uint8Array);
  return isLoneNamedParamsObject
    ? withNamedParamPrefixes(first as Record<string, unknown>)
    : params;
}

async function loadSqlJs(): Promise<typeof _sqlJsLib> {
  if (_sqlJsLib) return _sqlJsLib;
  // Use a non-literal specifier so the bundler doesn't try to statically
  // resolve sql.js (and its package.json) during the build phase.
  // sql.js is an optional/fallback adapter — only needed at runtime when
  // better-sqlite3 and node:sqlite are both unavailable.
  const moduleName = "sql." + "js";
  const mod = (await import(
    /* webpackIgnore: true */
    moduleName
  )) as { default: (typeof import("sql.js"))["default"] };
  const initSqlJs = mod.default;
  const wasmPath = resolveSqlJsWasmPath();

  _sqlJsLib = await initSqlJs({
    locateFile(fileName) {
      if (fileName === "sql-wasm.wasm") {
        return wasmPath;
      }
      return fileName;
    },
  });
  return _sqlJsLib;
}

export async function createSqlJsAdapter(filePath: string): Promise<SqliteAdapter> {
  const SQLLib = await loadSqlJs();
  if (!SQLLib) throw new Error("[sqljsAdapter] Failed to load sql.js");

  const buf = filePath !== ":memory:" && fs.existsSync(filePath) ? fs.readFileSync(filePath) : null;
  const db = new SQLLib.Database(buf ? new Uint8Array(buf) : undefined);

  let dirty = false;
  let saveTimer: ReturnType<typeof setTimeout> | null = null;
  let _isOpen = true;

  function persist(): void {
    if (filePath === ":memory:") return;
    const data = db.export();
    fs.writeFileSync(filePath, Buffer.from(data));
    dirty = false;
  }

  function scheduleSave(): void {
    dirty = true;
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveTimer = null;
      if (dirty) {
        try {
          persist();
        } catch (e) {
          console.error("[sqljsAdapter] save failed:", e);
        }
      }
    }, SAVE_DEBOUNCE_MS);
  }

  function runSavepoint<T>(fn: (...args: unknown[]) => T, ...args: unknown[]): T {
    const sp = `sp_${Math.random().toString(36).slice(2)}`;
    db.run(`SAVEPOINT "${sp}"`);
    try {
      const result = fn(...args);
      db.run(`RELEASE "${sp}"`);
      scheduleSave();
      return result;
    } catch (err) {
      try {
        db.run(`ROLLBACK TO "${sp}"`);
        db.run(`RELEASE "${sp}"`);
      } catch {}
      throw err;
    }
  }

  function makeStatement(sql: string): PreparedStatement {
    return {
      run(...params: unknown[]): RunResult {
        const stmt = db.prepare(sql);
        try {
          const bindValue = toBindValue(params);
          if (bindValue !== undefined) stmt.bind(bindValue);
          stmt.step();
          const changes = db.getRowsModified();
          const lastRows = db.exec("SELECT last_insert_rowid() as id");
          const lastInsertRowid = (lastRows[0]?.values?.[0]?.[0] as number | null | undefined) ?? 0;
          scheduleSave();
          return { changes, lastInsertRowid };
        } finally {
          stmt.free();
        }
      },
      get(...params: unknown[]): unknown {
        const stmt = db.prepare(sql);
        try {
          const bindValue = toBindValue(params);
          if (bindValue !== undefined) stmt.bind(bindValue);
          if (stmt.step()) return stmt.getAsObject();
          return undefined;
        } finally {
          stmt.free();
        }
      },
      all(...params: unknown[]): unknown[] {
        const stmt = db.prepare(sql);
        try {
          const bindValue = toBindValue(params);
          if (bindValue !== undefined) stmt.bind(bindValue);
          const rows: unknown[] = [];
          while (stmt.step()) rows.push(stmt.getAsObject());
          return rows;
        } finally {
          stmt.free();
        }
      },
    };
  }

  const checkpointTimer = setInterval(() => {
    if (dirty)
      try {
        persist();
      } catch {}
  }, CHECKPOINT_INTERVAL_MS);
  (checkpointTimer as unknown as NodeJS.Timeout).unref?.();

  const flush = (): void => {
    if (dirty)
      try {
        persist();
      } catch {}
  };
  process.on("beforeExit", flush);
  process.on("SIGINT", flush);
  process.on("SIGTERM", flush);

  function gracefulClose(): void {
    clearInterval(checkpointTimer as unknown as NodeJS.Timeout);
    if (saveTimer) clearTimeout(saveTimer);
    if (dirty)
      try {
        persist();
      } catch {}
    try {
      db.close();
    } catch {}
    _isOpen = false;
    // Without this, a closed adapter's whole closure (raw sql.js Database +
    // buffers) stays pinned in memory forever by these 3 process-level
    // listeners, compounding the OOM every failed boot leaves behind (#7494).
    process.removeListener("beforeExit", flush);
    process.removeListener("SIGINT", flush);
    process.removeListener("SIGTERM", flush);
  }

  return {
    driver: "sql.js",

    get open() {
      return _isOpen;
    },

    get name() {
      return filePath;
    },

    prepare(sql: string): PreparedStatement {
      return makeStatement(sql);
    },

    exec(sql: string): void {
      db.run(sql);
      scheduleSave();
    },

    pragma(pragmaStr: string, options?: { simple?: boolean }): unknown {
      const result = db.exec(`PRAGMA ${pragmaStr}`);
      if (!result.length) return null;
      const rows = result[0];
      if (options?.simple) {
        return rows.values?.[0]?.[0] ?? null;
      }
      return (rows.values ?? []).map((row: unknown[]) =>
        Object.fromEntries(rows.columns.map((col: string, i: number) => [col, row[i]]))
      );
    },

    transaction<T>(fn: (...args: unknown[]) => T): (...args: unknown[]) => T {
      return (...args: unknown[]) => runSavepoint(fn, ...args);
    },

    immediate(fn: () => void): void {
      runSavepoint(() => fn());
    },

    async backup(destination: string): Promise<void> {
      if (dirty) persist();
      if (filePath !== ":memory:") fs.copyFileSync(filePath, destination);
    },

    checkpoint(_mode = "TRUNCATE"): void {
      if (dirty)
        try {
          persist();
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
