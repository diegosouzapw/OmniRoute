import fs from "fs";
import { isAutomatedTestProcess } from "@/shared/utils/testProcess";
import { isNextBuildPhase } from "../buildPhase";
import type { SqliteAdapter } from "./adapters/types";
import { registerDbStateResetter } from "./stateReset";

/**
 * WAL maintenance owns the periodic `wal_checkpoint(PASSIVE)` lifecycle that
 * used to live inside `core.ts`: interval parsing, the scheduler, busy
 * accounting, and reading the pragma result so a busy checkpoint warns
 * instead of logging success.
 *
 * There is deliberately no periodic TRUNCATE: truncating the WAL of a live
 * process rewrites the shared wal-index (storage.sqlite-shm) while other
 * handles and in-flight statements hold it mapped, which can crash the event
 * loop with SIGBUS (issue #13973). A WAL above the size guard uses RESTART
 * instead, which starts a new WAL file without rewriting the mapped index.
 */
export type WalCheckpointMode = "PASSIVE" | "FULL" | "RESTART" | "TRUNCATE";

export interface WalCheckpointOutcome {
  ok: boolean;
  busy: boolean;
  skipped: boolean;
  logFrames: number | null;
  checkpointedFrames: number | null;
  error: string | null;
}

export interface WalCheckpointContext {
  sqliteFile?: string | null;
  isCloud?: boolean;
  isBuildPhase?: boolean;
}

export interface WalMaintenanceState {
  ticks: number;
  busyStreak: number;
  busyTotal: number;
  lastBusyAt: string | null;
  lastOkAt: string | null;
}

const isCloud = typeof globalThis.caches === "object" && globalThis.caches !== null;

const DEFAULT_WAL_PASSIVE_INTERVAL_MS = 5 * 60 * 1000;
const DEFAULT_WAL_GUARD_MAX_BYTES = 256 * 1024 * 1024;
const RETRY_DELAY_MS = 60_000;

export const WAL_BUSY_NAMESPACE = "walMaintenance";
export const WAL_BUSY_KEY = "busyTotal";

let walPassiveTimer: NodeJS.Timeout | null = null;
let retryTimer: NodeJS.Timeout | null = null;
let ticks = 0;
let busyStreak = 0;
let busyTotal = 0;
let lastBusyAt: string | null = null;
let lastOkAt: string | null = null;
// Busy events counted in memory but not yet added to the persisted counter.
let pendingBusyDelta = 0;
// The handle the running scheduler was started with; used for the shutdown flush.
let activeDb: SqliteAdapter | null = null;
let truncateDeprecationWarned = false;

/**
 * Operators who set OMNIROUTE_WAL_TRUNCATE_INTERVAL_MS to a positive value believe a
 * periodic TRUNCATE is reclaiming their WAL on a timer. It is not: that scheduler was
 * removed because a live TRUNCATE can SIGBUS the process (issue #13973). Warn once per
 * process so the stale setting is visible instead of silently ignored.
 */
function warnPeriodicTruncateRemoved(env: NodeJS.ProcessEnv): void {
  if (truncateDeprecationWarned) return;
  const rawValue = env.OMNIROUTE_WAL_TRUNCATE_INTERVAL_MS;
  if (typeof rawValue !== "string" || rawValue.trim().length === 0) return;
  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed) || parsed <= 0) return;
  truncateDeprecationWarned = true;
  console.warn(
    "[DB] OMNIROUTE_WAL_TRUNCATE_INTERVAL_MS is no longer used and has no effect: periodic " +
      "live wal_checkpoint(TRUNCATE) was removed because truncating the WAL of a live " +
      "process can invalidate the shared wal-index mapping and crash the server with " +
      "SIGBUS (issue #13973). Runtime checkpoints are PASSIVE; the shutdown checkpoint " +
      "truncates the WAL."
  );
}

/**
 * Count one busy checkpoint. Memory only, on purpose: a busy checkpoint means the
 * database is contended RIGHT NOW, and a write here would wait up to `busy_timeout`
 * (2s) on the event loop. The increment is persisted later by flushBusyTotal() from
 * a non-busy scheduler tick or at shutdown.
 */
function recordBusy(): void {
  busyStreak++;
  busyTotal++;
  pendingBusyDelta++;
  lastBusyAt = new Date().toISOString();
}

/**
 * Add the pending busy events to the persisted counter. Best-effort and single-shot:
 * any failure (locked, closed, missing table) keeps the delta pending for the next
 * non-busy tick — there is no retry loop. The additive UPSERT stays correct when
 * several processes share the database file.
 */
export function flushBusyTotal(db: SqliteAdapter | null): boolean {
  if (pendingBusyDelta === 0 || !db || !db.open) return false;
  try {
    db.prepare(
      "INSERT INTO key_value(namespace, key, value) VALUES(?, ?, ?) " +
        "ON CONFLICT(namespace, key) DO UPDATE SET value = CAST(value AS INTEGER) + excluded.value"
    ).run(WAL_BUSY_NAMESPACE, WAL_BUSY_KEY, pendingBusyDelta);
    pendingBusyDelta = 0;
    return true;
  } catch {
    return false;
  }
}

function recordOk(): void {
  busyStreak = 0;
  lastOkAt = new Date().toISOString();
}

function toFiniteNumber(value: unknown): number | null {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function failOpen(): WalCheckpointOutcome {
  return {
    ok: true,
    busy: false,
    skipped: false,
    logFrames: null,
    checkpointedFrames: null,
    error: null,
  };
}

function parseCheckpointRow(result: unknown): WalCheckpointOutcome {
  const row = Array.isArray(result) ? result[0] : result;
  if (row === undefined || row === null) return failOpen();
  if (typeof row !== "object") return failOpen();
  const record = row as Record<string, unknown>;
  const busy = toFiniteNumber(record.busy);
  const logFrames = toFiniteNumber(record.log);
  const checkpointedFrames = toFiniteNumber(record.checkpointed);
  if (busy === null || logFrames === null || checkpointedFrames === null) return failOpen();
  return {
    ok: busy !== 1,
    busy: busy === 1,
    skipped: false,
    logFrames,
    checkpointedFrames,
    error: null,
  };
}

export function runCheckpointNow(
  db: SqliteAdapter,
  mode: WalCheckpointMode = "TRUNCATE",
  ctx: WalCheckpointContext = {}
): WalCheckpointOutcome {
  if (ctx.sqliteFile === null || ctx.isCloud === true || ctx.isBuildPhase === true) {
    return {
      ok: false,
      busy: false,
      skipped: true,
      logFrames: null,
      checkpointedFrames: null,
      error: null,
    };
  }
  try {
    return parseCheckpointRow(db.pragma(`wal_checkpoint(${mode})`));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      busy: false,
      skipped: false,
      logFrames: null,
      checkpointedFrames: null,
      error: message,
    };
  }
}

export function getWalPassiveIntervalMs(env: NodeJS.ProcessEnv = process.env): number {
  const rawValue = env.OMNIROUTE_WAL_PASSIVE_INTERVAL_MS;
  if (typeof rawValue === "string" && rawValue.trim().length > 0) {
    const parsed = Number(rawValue);
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed;
    }
  }
  return DEFAULT_WAL_PASSIVE_INTERVAL_MS;
}

export function getWalGuardMaxBytes(env: NodeJS.ProcessEnv = process.env): number {
  const rawValue = env.OMNIROUTE_WAL_GUARD_MAX_MB;
  if (typeof rawValue === "string" && rawValue.trim().length > 0) {
    const parsed = Number(rawValue);
    if (Number.isFinite(parsed) && parsed >= 1) {
      return Math.floor(parsed) * 1024 * 1024;
    }
  }
  return DEFAULT_WAL_GUARD_MAX_BYTES;
}

function getWalFileSizeBytes(sqliteFile: string | null): number | null {
  if (!sqliteFile) return null;
  try {
    return fs.statSync(`${sqliteFile}-wal`).size;
  } catch {
    return null;
  }
}

function formatWalMb(bytes: number | null): string {
  return bytes == null ? "null" : String(Math.round(bytes / (1024 * 1024)));
}

export function logCheckpointOutcome(
  outcome: WalCheckpointOutcome,
  mode: WalCheckpointMode,
  streak: number
): void {
  if (outcome.skipped) return;
  if (outcome.busy) {
    console.warn(
      `[DB] SQLite WAL checkpoint busy - ${outcome.logFrames} frames pending, ` +
        `${outcome.checkpointedFrames ?? 0} checkpointed this attempt (streak ${streak})`
    );
    return;
  }
  if (!outcome.ok) {
    console.warn(
      `[DB] SQLite WAL checkpoint failed (${mode}): ${outcome.error ?? "unknown error"}`
    );
    return;
  }
  console.log(`[DB] SQLite WAL checkpoint completed (${mode})`);
}

function schedulePassiveRetry(db: SqliteAdapter): void {
  if (retryTimer) return;
  retryTimer = setTimeout(() => {
    retryTimer = null;
    try {
      if (isCloud || isNextBuildPhase() || isAutomatedTestProcess()) return;
      if (!db.open) return;
      const outcome = runCheckpointNow(db, "PASSIVE");
      if (outcome.skipped) return;
      if (outcome.busy) {
        recordBusy();
        logCheckpointOutcome(outcome, "PASSIVE", busyStreak);
      } else if (outcome.ok) {
        recordOk();
        flushBusyTotal(db);
      } else {
        logCheckpointOutcome(outcome, "PASSIVE", busyStreak);
      }
    } catch {
      // A periodic retry must never throw into the event loop.
    }
  }, RETRY_DELAY_MS);
  retryTimer.unref?.();
}

function startWalPassiveScheduler(
  db: SqliteAdapter,
  sqliteFile: string | null,
  env: NodeJS.ProcessEnv
): void {
  if (walPassiveTimer) {
    clearInterval(walPassiveTimer);
    walPassiveTimer = null;
  }
  if (sqliteFile === null || isCloud || isNextBuildPhase() || isAutomatedTestProcess()) return;
  const intervalMs = getWalPassiveIntervalMs(env);
  if (intervalMs <= 0) return;
  walPassiveTimer = setInterval(() => {
    try {
      if (!db.open) return;
      const walBeforeBytes = getWalFileSizeBytes(sqliteFile);
      const stats = runCheckpointNow(db, "PASSIVE", {
        sqliteFile,
        isCloud,
        isBuildPhase: isNextBuildPhase(),
      });
      if (stats.skipped) return;
      ticks++;
      // Check the size guard on every tick, busy or not: a WAL that stays above the
      // guard while readers hold the database is exactly the case the operator must
      // hear about, and a busy tick must not hide it.
      const guardMaxBytes = getWalGuardMaxBytes(env);
      if (walBeforeBytes != null && walBeforeBytes > guardMaxBytes) {
        // Never TRUNCATE a live WAL: rewriting the shared wal-index under handles that
        // hold it mapped can SIGBUS the process (issue #13973). RESTART checkpoints
        // the WAL and starts a new one without changing the mapped file geometry.
        const restart = runCheckpointNow(db, "RESTART", {
          sqliteFile,
          isCloud,
          isBuildPhase: isNextBuildPhase(),
        });
        console.warn(
          `[DB] WAL above guard (${formatWalMb(walBeforeBytes)}MB > ${Math.floor(guardMaxBytes / (1024 * 1024))}MB); ` +
            `ran wal_checkpoint(RESTART) ok=${restart.ok} busy=${restart.busy}` +
            ` checkpointedFrames=${restart.checkpointedFrames}` +
            (restart.error ? ` error=${restart.error}` : "")
        );
      }
      if (stats.busy) {
        // Passive ticks carry the busy telemetry now that no TRUNCATE tick is left to
        // do it: a contended PASSIVE is the same "readers never let go" signal, and the
        // 60s retry gives a busy WAL a second chance long before the next 5m tick.
        recordBusy();
        logCheckpointOutcome(stats, "PASSIVE", busyStreak);
        schedulePassiveRetry(db);
        return;
      }
      if (stats.ok) {
        recordOk();
        flushBusyTotal(db);
      } else {
        logCheckpointOutcome(stats, "PASSIVE", busyStreak);
      }
      if ((stats.checkpointedFrames ?? 0) > 0) {
        console.log(
          `[DB] WAL passive checkpoint (logFrames=${stats.logFrames} ` +
            `checkpointedFrames=${stats.checkpointedFrames} walMb=${formatWalMb(walBeforeBytes)})`
        );
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn("[DB] WAL passive checkpoint failed:", message);
    }
  }, intervalMs);
  walPassiveTimer.unref?.();
}

export function startWalMaintenance(
  db: SqliteAdapter,
  sqliteFile: string | null,
  env: NodeJS.ProcessEnv = process.env
): void {
  warnPeriodicTruncateRemoved(env);
  // stopWalMaintenance() flushes what it can and zeroes session state, so capture the
  // in-memory total first; the gate stays before any DB touch.
  const priorBusyTotal = busyTotal;
  stopWalMaintenance();
  if (sqliteFile === null || isCloud || isNextBuildPhase() || isAutomatedTestProcess()) return;
  activeDb = db;
  busyTotal = mergeBusyTotal(priorBusyTotal, loadPersistedBusyTotal(db));
  startWalPassiveScheduler(db, sqliteFile, env);
}

export function stopWalMaintenance(): void {
  // Shutdown / restart: best-effort persist of busy events not flushed by a tick.
  flushBusyTotal(activeDb);
  activeDb = null;
  pendingBusyDelta = 0;
  if (walPassiveTimer) {
    clearInterval(walPassiveTimer);
    walPassiveTimer = null;
  }
  if (retryTimer) {
    clearTimeout(retryTimer);
    retryTimer = null;
  }
  ticks = 0;
  busyStreak = 0;
  busyTotal = 0;
  lastBusyAt = null;
  lastOkAt = null;
}

export function getWalMaintenanceState(): WalMaintenanceState {
  return { ticks, busyStreak, busyTotal, lastBusyAt, lastOkAt };
}

export function loadPersistedBusyTotal(db: SqliteAdapter): number {
  try {
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get(WAL_BUSY_NAMESPACE, WAL_BUSY_KEY) as { value: unknown } | undefined;
    const n = Number(row?.value);
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
  } catch (error) {
    // Boot read-path, not the hot scheduler path: never fail silently.
    console.warn(`[DB] WAL busy counter unreadable, starting from 0: ${String(error)}`);
    return 0;
  }
}

export function mergeBusyTotal(prior: number, loaded: number): number {
  // Both inputs floored, non-finite or negative → 0 (matches load fallback).
  const p = Number.isFinite(prior) && prior > 0 ? Math.floor(prior) : 0;
  const l = Number.isFinite(loaded) && loaded > 0 ? Math.floor(loaded) : 0;
  return Math.max(p, l);
}

export function __resetForTests(): void {
  stopWalMaintenance();
  truncateDeprecationWarned = false;
}

registerDbStateResetter(stopWalMaintenance);
