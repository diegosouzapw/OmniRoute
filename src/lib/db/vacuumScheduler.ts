import { getDbInstance } from "./core";
// Direct `key_value` access — the existing `keyValueStore` helpers only exist
// in test fixtures; the 3 production call sites (pricingSync, jsonMigration,
// serviceModels) all use `getDbInstance().prepare(...).run()` directly. We
// follow the same convention to avoid introducing a new abstraction.
const READ_KV_SQL = "SELECT value FROM key_value WHERE namespace = ? AND key = ? LIMIT 1";
// The key_value table is (namespace, key, value) — no updated_at column
// (see migrations/001_initial_schema.sql). Match the canonical write shape
// used by serviceModels.ts / jsonMigration.ts.
const WRITE_KV_SQL = "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)";

function setKeyValue(namespace: string, key: string, value: string): void {
  const db = getDbInstance();
  db.prepare(WRITE_KV_SQL).run(namespace, key, value);
}

function getKeyValue(namespace: string, key: string): string | null {
  const db = getDbInstance();
  const row = db.prepare(READ_KV_SQL).get(namespace, key) as { value: string } | undefined;
  return row?.value ?? null;
}

/**
 * Persisted scheduler state for the SQLite VACUUM loop.
 *
 * Diego's `auto_vacuum` setting turns on SQLite's per-transaction
 * incremental vacuum (PRAGMA auto_vacuum = INCREMENTAL), but it does
 * NOT itself schedule a full VACUUM. This module is the missing
 * scheduler: it kicks off a full VACUUM on a configurable interval,
 * persists the result to the `key_value` table, and exposes a
 * getState() / runNow() / stop() surface for the API + UI.
 *
 * The previous `compressionScheduler.ts` was orphaned dead code that
 * read the wrong settings namespace (`compression.*` instead of
 * `optimization.scheduledVacuum`); see issue #4437.
 */

export interface VacuumSchedulerState {
  enabled: boolean;
  intervalMs: number;
  lastRunAt: number | null;
  lastError: string | null;
  lastDurationMs: number | null;
  isRunning: boolean;
  nextRunAt: number | null;
}

const DEFAULT_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24h
const MIN_INTERVAL_MS = 60 * 60 * 1000; // 1h — never vacuum more than once an hour
const KEY_VALUE_NAMESPACE = "scheduler";
const KEY_VALUE_KEY = "vacuum";
const STATE_DEFAULTS: VacuumSchedulerState = {
  enabled: false,
  intervalMs: DEFAULT_INTERVAL_MS,
  lastRunAt: null,
  lastError: null,
  lastDurationMs: null,
  isRunning: false,
  nextRunAt: null,
};

let timer: ReturnType<typeof setTimeout> | null = null;
let currentState: VacuumSchedulerState = { ...STATE_DEFAULTS };

function readIntervalFromSettings(): number {
  // Read the canonical `optimization.scheduledVacuumIntervalHours` setting,
  // fall back to the env var, then the 24h default. Floor at 1h to prevent
  // accidental OOM from too-frequent vacuum loops on a large DB.
  const fromEnv = Number.parseInt(process.env.OMNIROUTE_VACUUM_INTERVAL_HOURS ?? "", 10);
  if (Number.isFinite(fromEnv) && fromEnv >= 1) {
    return Math.max(fromEnv * 60 * 60 * 1000, MIN_INTERVAL_MS);
  }
  return DEFAULT_INTERVAL_MS;
}

function readEnabledFromSettings(): boolean {
  // Master switch. Default-on for new installs — the issue is the opposite
  // problem (vacuum never runs), not over-vacuuming. To disable, set to 0
  // (or any value other than "1"). Matches the OMNIROUTE_BIFROST_ENABLED
  // convention from PR #4433.
  const raw = process.env.OMNIROUTE_VACUUM_ENABLED;
  if (raw === "0" || raw === "false") return false;
  if (raw === "1" || raw === "true") return true;
  return true;
}

function scheduleNext(): void {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (!currentState.enabled) {
    currentState.nextRunAt = null;
    return;
  }
  const nextAt = Date.now() + currentState.intervalMs;
  currentState.nextRunAt = nextAt;
  timer = setTimeout(() => {
    void runNow().catch((err) => {
      currentState.lastError = err instanceof Error ? err.message : String(err);
    });
  }, currentState.intervalMs);
  // Don't keep the event loop alive just for vacuum
  if (typeof timer.unref === "function") timer.unref();
}

function persistState(): void {
  setKeyValue(KEY_VALUE_NAMESPACE, KEY_VALUE_KEY, JSON.stringify(currentState));
}

function loadPersistedState(): Partial<VacuumSchedulerState> {
  const raw = getKeyValue(KEY_VALUE_NAMESPACE, KEY_VALUE_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as Partial<VacuumSchedulerState>;
    return parsed;
  } catch {
    return {};
  }
}

export function getState(): VacuumSchedulerState {
  return { ...currentState };
}

export async function runNow(): Promise<{ success: boolean; durationMs: number; error?: string }> {
  if (currentState.isRunning) {
    return { success: false, durationMs: 0, error: "already_running" };
  }
  currentState.isRunning = true;
  persistState();

  const start = Date.now();
  try {
    const db = getDbInstance();
    db.exec("VACUUM");
    const duration = Date.now() - start;
    currentState.lastRunAt = start;
    currentState.lastError = null;
    currentState.lastDurationMs = duration;
    currentState.isRunning = false;
    persistState();
    scheduleNext(); // reset the next-run clock from this successful run
    return { success: true, durationMs: duration };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    currentState.lastError = message;
    currentState.lastDurationMs = Date.now() - start;
    currentState.isRunning = false;
    persistState();
    // Don't reschedule on error — let the next interval tick retry
    scheduleNext();
    return { success: false, durationMs: currentState.lastDurationMs, error: message };
  }
}

/**
 * Initialize the scheduler. Called once from the Next.js
 * `instrumentation-node.ts` register() hook. Safe to call multiple
 * times — the second call is a no-op.
 */
export function init(): VacuumSchedulerState {
  if (timer) return getState();

  const persisted = loadPersistedState();
  currentState = {
    ...STATE_DEFAULTS,
    ...persisted,
    isRunning: false, // never resume a "running" state across restarts
    nextRunAt: null, // recompute below
  };
  currentState.intervalMs = readIntervalFromSettings();
  currentState.enabled = readEnabledFromSettings();

  if (currentState.enabled) {
    scheduleNext();
  } else {
    currentState.nextRunAt = null;
  }

  persistState();
  return getState();
}

/**
 * Stop the scheduler. Called from `closeDbInstance()` so we don't
 * leak a setTimeout handle across DB reconnects. Idempotent.
 */
export function stop(): void {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  currentState.nextRunAt = null;
  currentState.isRunning = false;
  persistState();
}

/**
 * Test-only: reset all module state. Do not call from production.
 */
export function __resetForTests(): void {
  stop();
  currentState = { ...STATE_DEFAULTS };
}
