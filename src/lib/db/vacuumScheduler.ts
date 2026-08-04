import { DEFAULT_DATABASE_SETTINGS } from "@/types/databaseSettings";
import { MAX_TIMER_TIMEOUT_MS } from "@/shared/utils/runtimeTimeouts";

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
 * SQLite's `auto_vacuum` pragma controls page reclamation behavior
 * inside SQLite itself; it does not schedule full VACUUM runs. This
 * module is the app-level scheduler for full VACUUM: it follows the
 * Storage page's scheduledVacuum / vacuumHour settings, persists the
 * result to the `key_value` table, and exposes a getState() / runNow() /
 * stop() surface for the API + UI.
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

export type ScheduledVacuum = (typeof DEFAULT_DATABASE_SETTINGS)["optimization"]["scheduledVacuum"];
export type VacuumScheduleSettings = {
  scheduledVacuum: ScheduledVacuum;
  vacuumHour: number;
};

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const NOMINAL_INTERVAL_MS: Record<ScheduledVacuum, number> = {
  never: 0,
  daily: DAY_MS,
  weekly: 7 * DAY_MS,
  monthly: 30 * DAY_MS,
};
const VALID_SCHEDULES = new Set<ScheduledVacuum>(["never", "daily", "weekly", "monthly"]);
const KEY_VALUE_NAMESPACE = "scheduler";
const KEY_VALUE_KEY = "vacuum";
const STATE_DEFAULTS: VacuumSchedulerState = {
  enabled: false,
  intervalMs: 0,
  lastRunAt: null,
  lastError: null,
  lastDurationMs: null,
  isRunning: false,
  nextRunAt: null,
};

let timer: ReturnType<typeof setTimeout> | null = null;
let currentState: VacuumSchedulerState = { ...STATE_DEFAULTS };

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function parseJsonSafe(raw: string | null): unknown {
  if (raw === null) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function readNamespace(namespace: string): Record<string, unknown> {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all(namespace) as Array<{ key: string; value: string | null }>;
  const values: Record<string, unknown> = {};
  for (const row of rows) values[row.key] = parseJsonSafe(row.value);
  return values;
}

function normalizeSchedule(value: unknown, fallback: ScheduledVacuum): ScheduledVacuum {
  return typeof value === "string" && VALID_SCHEDULES.has(value as ScheduledVacuum)
    ? (value as ScheduledVacuum)
    : fallback;
}

function normalizeVacuumHour(value: unknown, fallback: number): number {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(23, Math.max(0, Math.floor(numeric)));
}

function mergeOptimization(target: VacuumScheduleSettings, value: unknown): VacuumScheduleSettings {
  if (!isRecord(value)) return target;
  return {
    scheduledVacuum: normalizeSchedule(value.scheduledVacuum, target.scheduledVacuum),
    vacuumHour: normalizeVacuumHour(value.vacuumHour, target.vacuumHour),
  };
}

function readScheduleSettings(): VacuumScheduleSettings {
  let settings: VacuumScheduleSettings = {
    scheduledVacuum: DEFAULT_DATABASE_SETTINGS.optimization.scheduledVacuum,
    vacuumHour: DEFAULT_DATABASE_SETTINGS.optimization.vacuumHour,
  };

  const mainSettings = readNamespace("settings");
  const databaseSettingsValue = mainSettings.databaseSettings;
  if (isRecord(databaseSettingsValue)) {
    settings = mergeOptimization(settings, databaseSettingsValue.optimization);
  }
  settings = mergeOptimization(settings, mainSettings.optimization);

  const databaseSettings = readNamespace("databaseSettings");
  settings = mergeOptimization(settings, databaseSettings.optimization);
  settings = {
    scheduledVacuum: normalizeSchedule(
      databaseSettings["optimization.scheduledVacuum"] ?? databaseSettings.scheduledVacuum,
      settings.scheduledVacuum
    ),
    vacuumHour: normalizeVacuumHour(
      databaseSettings["optimization.vacuumHour"] ?? databaseSettings.vacuumHour,
      settings.vacuumHour
    ),
  };

  return settings;
}

function atVacuumHour(timestamp: number, hour: number): Date {
  const date = new Date(timestamp);
  date.setHours(hour, 0, 0, 0);
  return date;
}

function addFrequency(date: Date, frequency: Exclude<ScheduledVacuum, "never">): Date {
  const next = new Date(date.getTime());
  if (frequency === "daily") next.setDate(next.getDate() + 1);
  else if (frequency === "weekly") next.setDate(next.getDate() + 7);
  else next.setMonth(next.getMonth() + 1);
  return next;
}

export function resolveNextRunAt(
  settings: VacuumScheduleSettings,
  lastRunAt: number | null,
  now: number = Date.now()
): number | null {
  const frequency = settings.scheduledVacuum;
  if (frequency === "never") return null;

  const hour = normalizeVacuumHour(
    settings.vacuumHour,
    DEFAULT_DATABASE_SETTINGS.optimization.vacuumHour
  );
  let candidate: Date;
  if (typeof lastRunAt === "number" && Number.isFinite(lastRunAt) && lastRunAt > 0) {
    candidate = atVacuumHour(lastRunAt, hour);
    if (candidate.getTime() <= lastRunAt) candidate = addFrequency(candidate, frequency);
  } else {
    candidate = atVacuumHour(now, hour);
    if (candidate.getTime() <= now) candidate = addFrequency(candidate, "daily");
  }

  while (candidate.getTime() <= now) {
    candidate = addFrequency(candidate, frequency);
  }

  return candidate.getTime();
}

function applySchedule(now: number = Date.now(), anchorLastRunAt = currentState.lastRunAt): void {
  const settings = readScheduleSettings();
  currentState.enabled = settings.scheduledVacuum !== "never";
  currentState.intervalMs = NOMINAL_INTERVAL_MS[settings.scheduledVacuum];
  currentState.nextRunAt = resolveNextRunAt(settings, anchorLastRunAt, now);
}

function armTimer(): void {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (!currentState.enabled || currentState.nextRunAt === null || currentState.isRunning) {
    currentState.nextRunAt = null;
    return;
  }

  const delayMs = Math.max(0, currentState.nextRunAt - Date.now());
  timer = setTimeout(
    () => {
      if (currentState.nextRunAt !== null && currentState.nextRunAt > Date.now()) {
        armTimer();
        return;
      }
      void runNow().catch((err) => {
        currentState.lastError = err instanceof Error ? err.message : String(err);
      });
    },
    Math.min(delayMs, MAX_TIMER_TIMEOUT_MS)
  );
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

export function refresh(): VacuumSchedulerState {
  applySchedule();
  persistState();
  armTimer();
  return getState();
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
    refresh(); // reset the next-run clock from this successful run
    return { success: true, durationMs: duration };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    currentState.lastError = message;
    currentState.lastDurationMs = Date.now() - start;
    currentState.isRunning = false;
    applySchedule(Date.now(), Date.now());
    persistState();
    armTimer();
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
  return refresh();
}

export const initVacuumScheduler = init;
export const refreshVacuumScheduler = refresh;

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
