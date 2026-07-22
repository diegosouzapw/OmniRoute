import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { createBetterSqliteAdapter } from "./betterSqliteAdapter";
import { createBunSqliteAdapter, type BunSqliteDatabaseLike } from "./bunSqliteAdapter";
import {
  createNodeSqliteAdapterFromDatabase,
  type NodeSqliteDatabaseLike,
} from "./nodeSqliteShared";
import type { SqliteAdapter } from "./types";

const _require = createRequire(import.meta.url);

/**
 * Logs the underlying cause of a swallowed sync-driver failure (#7288
 * secondary finding). tryOpenSync() used to swallow both driver errors in
 * empty catch {} blocks, so an ABI mismatch or permission error never
 * reached the logs — only the generic "(falhou)"/"(indisponível)" strings
 * in core.ts's thrown message survived, making the failure undiagnosable.
 */
function logSwallowedDriverError(driver: string, err: unknown): void {
  const message = err instanceof Error ? err.message : String(err);
  console.debug(`[DB] Sync driver '${driver}' failed to open, will try next driver: ${message}`);
}

declare global {
  var __omnirouteSqlJsAdapters: Map<string, SqliteAdapter> | undefined;
  var __omnirouteSqlJsInitPromises: Map<string, Promise<SqliteAdapter>> | undefined;
  var __omnirouteSqlJsPreInitErrors: Map<string, string> | undefined;
}

function getSqlJsCache(): Map<string, SqliteAdapter> {
  if (!globalThis.__omnirouteSqlJsAdapters) {
    globalThis.__omnirouteSqlJsAdapters = new Map();
  }
  return globalThis.__omnirouteSqlJsAdapters;
}

function getSqlJsPreInitErrorCache(): Map<string, string> {
  if (!globalThis.__omnirouteSqlJsPreInitErrors) {
    globalThis.__omnirouteSqlJsPreInitErrors = new Map();
  }
  return globalThis.__omnirouteSqlJsPreInitErrors;
}

/**
 * Real cause of the most recent failed preInitSqlJs() attempt for a
 * filePath, if any (#7288). Lets callers replace the generic/misleading
 * "sql.js WASM ainda não foi pré-inicializado" message with the actual
 * reason sql.js itself couldn't open the file, once pre-init was genuinely
 * attempted (as opposed to never having run at all).
 */
export function getSqlJsPreInitError(filePath: string): string | undefined {
  return getSqlJsPreInitErrorCache().get(filePath);
}

/**
 * Cache das Promises de inicialização EM VOO (não resolvidas ainda), por filePath.
 * Separado de getSqlJsCache() (que só guarda o adapter já resolvido) para que
 * chamadores concorrentes (BATCH/STARTUP/HealthCheck/ProviderLimitsSync no boot)
 * compartilhem UMA única leitura+decode do arquivo em vez de cada um chamar
 * fs.readFileSync + WASM decode independentemente (#6628 — thundering herd).
 */
function getSqlJsPendingCache(): Map<string, Promise<SqliteAdapter>> {
  if (!globalThis.__omnirouteSqlJsInitPromises) {
    globalThis.__omnirouteSqlJsInitPromises = new Map();
  }
  return globalThis.__omnirouteSqlJsInitPromises;
}

/** Tenta abrir com better-sqlite3 e node:sqlite sincronamente. Retorna null se ambos falharem. */
export function tryOpenSync(
  filePath: string,
  options?: Record<string, unknown>
): SqliteAdapter | null {
  // Bun ships a supported SQLite implementation. Prefer it over the native
  // Node addon, which Bun intentionally skips because its ABI is incompatible.
  if (process.versions.bun) {
    try {
      const { Database } = _require("bun:sqlite") as {
        Database: new (p: string, options?: Record<string, unknown>) => BunSqliteDatabaseLike;
      };
      if (
        options?.fileMustExist === true &&
        filePath !== ":memory:" &&
        !existsSync(filePath)
      ) {
        throw new Error(`SQLite file does not exist: ${filePath}`);
      }
      const db = new Database(filePath, {
        ...(options?.readonly === true
          ? { readonly: true }
          : { readwrite: true, create: options?.fileMustExist !== true }),
      });
      return createBunSqliteAdapter(db, filePath);
    } catch (err) {
      logSwallowedDriverError("bun:sqlite", err);
    }
  }

  // better-sqlite3: rápido, nativo — skip em Bun
  if (!process.versions.bun) {
    try {
      const BetterSqlite = _require("better-sqlite3") as {
        new (p: string, o?: object): import("better-sqlite3").Database;
      };
      const db = new BetterSqlite(filePath, options);
      return createBetterSqliteAdapter(db);
    } catch (err) {
      // continua para próximo driver
      logSwallowedDriverError("better-sqlite3", err);
    }
  }

  // node:sqlite: built-in desde Node 22.5 — skip em Bun
  if (!process.versions.bun) {
    const [maj, min] = (process.versions.node ?? "0.0").split(".").map(Number);
    if (maj > 22 || (maj === 22 && min >= 5)) {
      try {
        const { DatabaseSync } = _require("node:sqlite") as {
          DatabaseSync: new (p: string) => NodeSqliteDatabaseLike;
        };
        const db = new DatabaseSync(filePath);
        return createNodeSqliteAdapterFromDatabase(db, filePath);
      } catch (err) {
        // continua
        logSwallowedDriverError("node:sqlite", err);
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
  if (existing) {
    if (existing.open) return existing;
    // Stale handle left over by a prior close/reload (e.g. gracefulShutdown or
    // resetDbInstance closed the underlying WASM db but this globalThis-backed
    // cache — deliberately shared across re-invocations for idempotency — still
    // holds the reference). Reusing it would make every subsequent query throw
    // the raw string "Database closed" straight from sql.js (#6560). Evict and
    // recreate instead of returning a dead connection.
    cache.delete(filePath);
  }

  // Share one in-flight load across concurrent callers for the same filePath
  // (#6628): without this, each of BATCH/STARTUP/HealthCheck/ProviderLimitsSync
  // independently fs.readFileSync + WASM-decode the same (possibly 300+MB) file
  // at boot, multiplying peak memory pressure by the number of racing callers.
  const pending = getSqlJsPendingCache();
  const inflight = pending.get(filePath);
  if (inflight !== undefined) return inflight;

  const initPromise = (async () => {
    const { createSqlJsAdapter } = await import("./sqljsAdapter");
    const adapter = await createSqlJsAdapter(filePath);
    cache.set(filePath, adapter);
    getSqlJsPreInitErrorCache().delete(filePath);
    return adapter;
  })();
  pending.set(filePath, initPromise);
  try {
    return await initPromise;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    getSqlJsPreInitErrorCache().set(filePath, message);
    throw err;
  } finally {
    pending.delete(filePath);
  }
}

/** Retorna adapter sql.js pré-inicializado ou null se ainda não inicializado. */
export function getSqlJsAdapter(filePath: string): SqliteAdapter | null {
  return getSqlJsCache().get(filePath) ?? null;
}

/**
 * Factory assíncrona completa: tenta todos os drivers em cascata.
 * Ordem: bun:sqlite → better-sqlite3 → node:sqlite → sql.js
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
