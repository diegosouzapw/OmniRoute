import { runtimeRequire as _require } from "./runtimeRequire";
import { isNextBuildPhase } from "../../buildPhase";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createBetterSqliteAdapter } from "./betterSqliteAdapter";
import { createBunSqliteAdapter, type BunSqliteDatabaseLike } from "./bunSqliteAdapter";
import {
  createNodeSqliteAdapterFromDatabase,
  type NodeSqliteDatabaseLike,
} from "./nodeSqliteShared";
import type { SqliteAdapter } from "./types";


type DriverLoader = (moduleName: string) => unknown;

type SpawnSyncLike = (
  command: string,
  args: string[],
  options: { timeout: number; stdio: "ignore"; cwd: string; windowsHide: boolean }
) => { status: number | null };

/** Returns whether better-sqlite3 may be loaded in this process. */
export type DriverProbe = () => boolean;

/**
 * #10627 — Windows driver-hang guard.
 *
 * The sync cascade's try/catch only covers drivers that THROW on load
 * (ERR_DLOPEN_FAILED, "Module did not self-register", ...). On Windows, a
 * mismatched-ABI native addon can HANG inside DllMain (loader lock) instead of
 * throwing — a hang never reaches the catch, so the fallback to node:sqlite /
 * sql.js never runs and the first DB touch in a runtime stalls forever at ~0%
 * CPU (the exact #10627 symptom: every request hangs, 0 bytes, no logs).
 *
 * The probe answers "can better-sqlite3 load AND open a database?" by loading
 * it in a CHILD PROCESS with a bounded timeout, so a hang becomes a timed-out
 * probe (verdict "bad") instead of a process-level deadlock. The verdict is
 * cached per process — the child spawn happens at most once.
 *
 * On POSIX this is a no-op returning true: broken addons throw there, which
 * the existing cascade already handles, and we don't want to pay a subprocess
 * spawn on every Linux/CI boot.
 */
export function createBetterSqliteProbe(options: {
  platform?: string;
  execPath?: string;
  spawn?: SpawnSyncLike;
  timeoutMs?: number;
}): DriverProbe {
  const {
    platform = process.platform,
    execPath = process.execPath,
    spawn = spawnSync as unknown as SpawnSyncLike,
    timeoutMs = 5_000,
  } = options;

  let verdict: boolean | null = null;
  return () => {
    if (verdict !== null) return verdict;
    if (platform !== "win32") {
      verdict = true;
      return verdict;
    }
    try {
      const result = spawn(execPath, ["-e", "require('better-sqlite3')(':memory:')"], {
        timeout: timeoutMs,
        stdio: "ignore",
        cwd: process.cwd(),
        windowsHide: true,
      });
      // status === null means the child was killed by the timeout — a hang.
      verdict = result.status === 0;
    } catch {
      verdict = false;
    }
    return verdict;
  };
}

/**
 * The production loader for the sync driver cascade.
 *
 * WHY A SWITCH INSTEAD OF PASSING `_require` DIRECTLY
 * ---------------------------------------------------
 * `createSyncDriverFactory(load)` takes the loader as a parameter so the driver
 * branches stay testable. But webpack (the Next.js server build) only recognizes a
 * require when it can read the module id as a literal at the call site:
 *
 *   _require("better-sqlite3")   →  a real external: `module.exports = require("better-sqlite3")`
 *   load("better-sqlite3")       →  unanalyzable, so the loader ITSELF is replaced
 *
 * In the second case webpack cannot see what `load` is, so the value passed in is
 * replaced by its "missing module" stub — a function whose only behavior is
 * `throw Error("Cannot find module '" + id + "'")` with `code = "MODULE_NOT_FOUND"`.
 * Every driver in the cascade then reports itself as not installed even though the
 * addon is present on disk, the whole cascade falls through to the sql.js WASM last
 * resort, and startup dies there instead — pointing the blame at sql.js rather than at
 * the bundling. Observed in the packaged v3.8.49 server build, where the driver chunk
 * contains that stub and NO `require("better-sqlite3")` external, while the previous
 * release's chunk (before the loader became injectable) contains the external and no
 * stub. Not reproducible from source: `tsx`/`node --test` resolve the injected
 * `_require` normally, so the existing unit tests pass either way.
 *
 * Naming each module in a direct `_require("<literal>")` call restores the externals
 * webpack emitted before the loader became injectable, while keeping the seam intact.
 * Keep the literals literal: hoisting them into a constant or a map keyed by variable
 * re-breaks the analysis.
 */
function requireSqliteDriver(moduleName: string): unknown {
  switch (moduleName) {
    case "bun:sqlite":
      return _require("bun:sqlite");
    case "better-sqlite3":
      return _require("better-sqlite3");
    case "node:sqlite":
      return _require("node:sqlite");
    default:
      throw new Error(`Unsupported SQLite driver module: ${moduleName}`);
  }
}

type NodeSqliteOptions = {
  readOnly?: boolean;
  timeout?: number;
};

// Forwards `readOnly` and, independently, `timeout` — the latter is node:sqlite's
// busy-timeout equivalent to better-sqlite3's `timeout`, natively supported by
// `DatabaseSync` since Node v24.0.0. Previously this dropped `timeout` entirely,
// so a caller's busy-timeout was only honored on the better-sqlite3 driver, not
// on the node:sqlite fallback (see src/lib/cursor/tokenExtractor.ts::tryIdeAuth).
function toNodeSqliteOptions(options?: Record<string, unknown>): NodeSqliteOptions | undefined {
  const nodeOptions: NodeSqliteOptions = {};
  if (options?.readonly === true) {
    nodeOptions.readOnly = true;
  }
  if (typeof options?.timeout === "number") {
    nodeOptions.timeout = options.timeout;
  }
  return Object.keys(nodeOptions).length > 0 ? nodeOptions : undefined;
}

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

/**
 * @internal
 *
 * Builds the synchronous driver cascade. Keeping the loader injectable makes
 * the real node:sqlite branch testable without changing the public adapter API.
 */
export function createSyncDriverFactory(load: DriverLoader, betterSqliteProbe?: DriverProbe) {
  // #10627: when a probe is supplied, the better-sqlite3 branch is gated on it
  // so a Windows DllMain hang (which never throws, so never hits the catch)
  // cannot stall the request path. Default: no probe — existing callers/tests
  // keep the historical throw-only behavior.
  const mayLoadBetterSqlite = betterSqliteProbe ?? (() => true);
  return function tryOpenSync(
    filePath: string,
    options?: Record<string, unknown>
  ): SqliteAdapter | null {
    // 1. Bun native sqlite driver: preferred built-in driver when running under Bun
    if (process.versions.bun) {
      try {
        const { Database } = load("bun:sqlite") as {
          Database: new (p: string, options?: Record<string, unknown>) => BunSqliteDatabaseLike;
        };
        if (options?.fileMustExist === true && filePath !== ":memory:" && !existsSync(filePath)) {
          throw new Error(`SQLite file does not exist: ${filePath}`);
        }
        const bunOptions: Record<string, unknown> = {};
        if (options?.readonly === true) bunOptions.readonly = true;
        if (options?.create === false && filePath !== ":memory:") bunOptions.create = false;
        const db =
          Object.keys(bunOptions).length > 0
            ? new Database(filePath, bunOptions)
            : new Database(filePath);
        return createBunSqliteAdapter(db, filePath);
      } catch (err) {
        logSwallowedDriverError("bun:sqlite", err);
      }
    }

    // 2. better-sqlite3: preferred native driver on Node.js. Skipped on Bun and
    // during the Next.js production build. Build workers sometimes lose
    // NEXT_PHASE from process.env, so OMNIROUTE_BUILDING=1 (set by
    // build-next-isolated.mjs and inherited by the build workers) is the primary
    // build signal. Deliberately does NOT check isMainThread: at runtime many
    // worker threads (pino thread-stream, compression workers) legitimately use
    // better-sqlite3, and skipping it there would silently degrade to
    // node:sqlite / sql.js in production. During the build the native addon
    // cannot load: the Statement destructor aborts with SIGABRT on worker
    // teardown (node::RemoveEnvironmentCleanupHook). (#10060)
    if (!process.versions.bun && !isNextBuildPhase() && mayLoadBetterSqlite()) {
      try {
        const BetterSqlite = load("better-sqlite3") as {
          new (p: string, o?: object): import("better-sqlite3").Database;
        };
        const db = new BetterSqlite(filePath, options);
        return createBetterSqliteAdapter(db);
      } catch (err) {
        logSwallowedDriverError("better-sqlite3", err);
      }
    }

    // node:sqlite: built-in desde Node 22.5 — skip em Bun
    if (!process.versions.bun) {
      const [maj, min] = (process.versions.node ?? "0.0").split(".").map(Number);
      if (maj > 22 || (maj === 22 && min >= 5)) {
        try {
          if (options?.fileMustExist === true && filePath !== ":memory:" && !existsSync(filePath)) {
            throw new Error(`SQLite file does not exist: ${filePath}`);
          }
          const { DatabaseSync } = load("node:sqlite") as {
            DatabaseSync: new (p: string, options?: NodeSqliteOptions) => NodeSqliteDatabaseLike;
          };
          const nodeOptions = toNodeSqliteOptions(options);
          const db = nodeOptions
            ? new DatabaseSync(filePath, nodeOptions)
            : new DatabaseSync(filePath);
          return createNodeSqliteAdapterFromDatabase(db, filePath);
        } catch (err) {
          // continua
          logSwallowedDriverError("node:sqlite", err);
        }
      }
    }

    return null;
  };
}

// Production wiring: the real probe (child-process, timed, cached) guards the
// better-sqlite3 branch so a hang on Windows degrades to a failover instead of
// a request-path deadlock (#10627).
const openSyncDriver = createSyncDriverFactory(requireSqliteDriver, createBetterSqliteProbe({}));

/**
 * The installed-tarball smoke uses this paired marker to exercise the sql.js tier
 * even on runners where better-sqlite3 or node:sqlite is available. Requiring both
 * pack-boot-specific flags keeps this from becoming a general operator override.
 */
export function isPackBootForcedSqlJsSmoke(env: NodeJS.ProcessEnv): boolean {
  return env.OMNIROUTE_PACK_BOOT_SMOKE === "1" && env.OMNIROUTE_PACK_BOOT_FORCE_SQLJS === "1";
}

/** Tenta abrir com better-sqlite3 e node:sqlite sincronamente. Retorna null se ambos falharem. */
export function tryOpenSync(
  filePath: string,
  options?: Record<string, unknown>
): SqliteAdapter | null {
  if (isPackBootForcedSqlJsSmoke(process.env)) return null;
  return openSyncDriver(filePath, options);
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
