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
const RETRY_DELAY_MS = 60_000;

export const WAL_BUSY_NAMESPACE = "walMaintenance";
export const WAL_BUSY_KEY = "busyTotal";

let walTimer: NodeJS.Timeout | null = null;
let retryTimer: NodeJS.Timeout | null = null;
let ticks = 0;
let busyStreak = 0;
let busyTotal = 0;
let lastBusyAt: string | null = null;
let lastOkAt: string | null = null;

export function recordBusy(db: SqliteAdapter): void {
  busyStreak++;
  busyTotal++;
  lastBusyAt = new Date().toISOString();
  try {
    db.prepare(
      "INSERT INTO key_value(namespace, key, value) VALUES(?, ?, '1') " +
        "ON CONFLICT(namespace, key) DO UPDATE SET value = CAST(value AS INTEGER) + 1"
    ).run(WAL_BUSY_NAMESPACE, WAL_BUSY_KEY);
  } catch {
    // Best-effort: the in-memory counter stays authoritative for this session.
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
        recordBusy(db);
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

export function startWalMaintenance(
  db: SqliteAdapter,
  sqliteFile: string | null,
  env: NodeJS.ProcessEnv = process.env
): void {
  // stopWalMaintenance() zeroes session state, so capture prior first; gate stays before any DB touch.
  // No flush-on-stop: every busy is already persisted at the event.
  const priorBusyTotal = busyTotal;
  stopWalMaintenance();
  if (sqliteFile === null || isCloud || isNextBuildPhase() || isAutomatedTestProcess()) return;
  busyTotal = mergeBusyTotal(priorBusyTotal, loadPersistedBusyTotal(db));
  const intervalMs = getWalMaintenanceIntervalMs(env);
  if (intervalMs <= 0) return;
  walTimer = setInterval(() => {
    try {
      if (!db.open) return;
      const outcome = runCheckpointNow(db, "TRUNCATE");
      if (outcome.skipped) return;
      ticks++;
      if (outcome.busy) {
        recordBusy(db);
        logCheckpointOutcome(outcome, "TRUNCATE", busyStreak);
        schedulePassiveRetry(db);
      } else if (outcome.ok) {
        recordOk();
      } else {
        logCheckpointOutcome(outcome, "TRUNCATE", busyStreak);
      }
    } catch {
      // A periodic scheduler must never throw into the event loop.
    }
  }, intervalMs);
  walTimer.unref?.();
}

export function stopWalMaintenance(): void {
  if (walTimer) {
    clearInterval(walTimer);
    walTimer = null;
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
}

registerDbStateResetter(stopWalMaintenance);
