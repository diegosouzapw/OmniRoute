import fs from "fs";
import { isAutomatedTestProcess } from "@/shared/utils/testProcess";
import { isNextBuildPhase } from "../buildPhase";
import type { SqliteAdapter } from "./adapters/types";
import { registerDbStateResetter } from "./stateReset";

/**
 * WAL maintenance owns the periodic `wal_checkpoint(TRUNCATE)` lifecycle that
 * used to live inside `core.ts`: interval parsing, the scheduler, and reading
 * the pragma result so a busy checkpoint warns instead of logging success.
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

const DEFAULT_WAL_TRUNCATE_INTERVAL_MS = 6 * 60 * 60 * 1000;
const DEFAULT_WAL_PASSIVE_INTERVAL_MS = 5 * 60 * 1000;
const DEFAULT_WAL_GUARD_MAX_BYTES = 256 * 1024 * 1024;
const RETRY_DELAY_MS = 60_000;

let walTimer: NodeJS.Timeout | null = null;
let walPassiveTimer: NodeJS.Timeout | null = null;
let retryTimer: NodeJS.Timeout | null = null;
let ticks = 0;
let busyStreak = 0;
let busyTotal = 0;
let lastBusyAt: string | null = null;
let lastOkAt: string | null = null;

function recordBusy(): void {
  busyStreak++;
  busyTotal++;
  lastBusyAt = new Date().toISOString();
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

export function getWalMaintenanceIntervalMs(env: NodeJS.ProcessEnv = process.env): number {
  const rawValue = env.OMNIROUTE_WAL_TRUNCATE_INTERVAL_MS;
  if (typeof rawValue === "string" && rawValue.trim().length > 0) {
    const parsed = Number(rawValue);
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed;
    }
  }
  return DEFAULT_WAL_TRUNCATE_INTERVAL_MS;
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
      `[DB] SQLite WAL checkpoint busy — ${outcome.logFrames} frames pending (streak ${streak})`
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
      if (stats.busy || (stats.checkpointedFrames ?? 0) > 0) {
        console.log(
          `[DB] WAL passive checkpoint (busy=${stats.busy ? 1 : 0} logFrames=${stats.logFrames} ` +
            `checkpointedFrames=${stats.checkpointedFrames} walMb=${formatWalMb(walBeforeBytes)})`
        );
      }
      const guardMaxBytes = getWalGuardMaxBytes(env);
      if (walBeforeBytes != null && walBeforeBytes > guardMaxBytes) {
        const startedAtMs = Date.now();
        const truncateStats = runCheckpointNow(db, "TRUNCATE", {
          sqliteFile,
          isCloud,
          isBuildPhase: isNextBuildPhase(),
        });
        console.log(
          `[DB] WAL above guard (${formatWalMb(walBeforeBytes)}MB > ${Math.floor(guardMaxBytes / (1024 * 1024))}MB); ` +
            `ran TRUNCATE in ${Date.now() - startedAtMs}ms ` +
            `(walMbAfter=${formatWalMb(getWalFileSizeBytes(sqliteFile))} busy=${truncateStats.busy ? 1 : 0} ` +
            `checkpointedFrames=${truncateStats.checkpointedFrames})`
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
  stopWalMaintenance();
  if (sqliteFile === null || isCloud || isNextBuildPhase() || isAutomatedTestProcess()) return;
  const intervalMs = getWalMaintenanceIntervalMs(env);
  if (intervalMs <= 0) {
    startWalPassiveScheduler(db, sqliteFile, env);
    return;
  }
  walTimer = setInterval(() => {
    try {
      if (!db.open) return;
      const walBeforeBytes = getWalFileSizeBytes(sqliteFile);
      const startedAtMs = Date.now();
      const outcome = runCheckpointNow(db, "TRUNCATE");
      if (outcome.skipped) return;
      ticks++;
      if (outcome.busy) {
        recordBusy();
        logCheckpointOutcome(outcome, "TRUNCATE", busyStreak);
        schedulePassiveRetry(db);
      } else if (outcome.ok) {
        recordOk();
        console.log(
          `[DB] Periodic SQLite WAL checkpoint completed (TRUNCATE) in ${Date.now() - startedAtMs}ms ` +
            `(walMbBefore=${formatWalMb(walBeforeBytes)} walMbAfter=${formatWalMb(getWalFileSizeBytes(sqliteFile))} ` +
            `busy=${outcome.busy ? 1 : 0} logFrames=${outcome.logFrames} checkpointedFrames=${outcome.checkpointedFrames})`
        );
      } else {
        logCheckpointOutcome(outcome, "TRUNCATE", busyStreak);
      }
    } catch {
      // A periodic scheduler must never throw into the event loop.
    }
  }, intervalMs);
  walTimer.unref?.();
  startWalPassiveScheduler(db, sqliteFile, env);
}

export function stopWalMaintenance(): void {
  if (walTimer) {
    clearInterval(walTimer);
    walTimer = null;
  }
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

export function __resetForTests(): void {
  stopWalMaintenance();
}

registerDbStateResetter(stopWalMaintenance);
