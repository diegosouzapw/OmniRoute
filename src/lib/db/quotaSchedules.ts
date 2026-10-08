/**
 * db/quotaSchedules.ts — CRUD for the quota_schedules table.
 *
 * Time-aware quota windows for a quota pool: when OmniRoute may use the pool's
 * accounts, how much upstream quota it must leave behind (`reserve_percent`),
 * and how much it may consume itself inside the window (`budget_*`).
 * See migration 189 and src/lib/quota/schedules.ts for the semantics.
 *
 * All SQL goes through prepared statements — never raw string interpolation
 * (Hard Rule #5). Import getDbInstance from ./core (Hard Rule #5).
 *
 * The QuotaSchedule shape is imported type-only from the quota layer, so this
 * module stays the single mapping point between rows and the engine's type
 * without creating a runtime import cycle.
 */

import { getDbInstance } from "./core";
import type {
  QuotaSchedule,
  ReserveRule,
  ScheduleBudgetUnit,
  ScheduleMode,
} from "@/lib/quota/schedules";
import type { QuotaWindow } from "@/lib/quota/dimensions";

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
  transaction: <T>(fn: () => T) => () => T;
}

function getDb(): DbLike {
  return getDbInstance() as unknown as DbLike;
}

interface ScheduleRow {
  id: string;
  pool_id: string;
  label: string | null;
  days: string;
  start_minute: number;
  end_minute: number;
  timezone: string | null;
  mode: string;
  reserves: string | null;
  budget_value: number | null;
  budget_unit: string | null;
  budget_window: string;
  priority: number;
  enabled: number;
}

const VALID_MODES: ReadonlySet<string> = new Set<ScheduleMode>(["allow", "block"]);
const VALID_BUDGET_UNITS: ReadonlySet<string> = new Set<ScheduleBudgetUnit>([
  "requests",
  "tokens",
  "usd",
]);
const VALID_WINDOWS: ReadonlySet<string> = new Set<QuotaWindow>([
  "hourly",
  "5h",
  "daily",
  "weekly",
  "monthly",
]);

/**
 * Fail-SAFE mode normalization at the read boundary. A row whose mode is neither
 * "allow" nor "block" (corrupted row, or one written while the CHECK constraint
 * was bypassed) is read as "block": an unrecognised rule must never widen access.
 * Mirrors the `normalizePolicy` convention in db/quotaPools.ts.
 */
function normalizeMode(value: string): ScheduleMode {
  return VALID_MODES.has(value) ? (value as ScheduleMode) : "block";
}

/** Parse the CSV day list, dropping anything outside 0..6 and de-duplicating. */
export function parseDays(csv: string): number[] {
  const seen = new Set<number>();
  for (const part of csv.split(",")) {
    const trimmed = part.trim();
    // Number("") is 0, so an empty segment would otherwise read as Sunday and
    // turn a day-less row into a Sunday-only window.
    if (trimmed === "") continue;
    const n = Number(trimmed);
    if (Number.isInteger(n) && n >= 0 && n <= 6) seen.add(n);
  }
  return [...seen].sort((a, b) => a - b);
}

const VALID_RESERVE_WINDOWS: ReadonlySet<string> = new Set([...VALID_WINDOWS, "any"]);

/**
 * Parse the reserves JSON column, dropping anything malformed.
 *
 * A reserve that cannot be understood is discarded rather than guessed at: the
 * alternative — inventing a floor — would silently throttle a pool the operator
 * believes is unrestricted.
 */
export function parseReserves(raw: string | null): ReserveRule[] {
  if (!raw) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  const rules: ReserveRule[] = [];
  for (const entry of parsed) {
    if (typeof entry !== "object" || entry === null) continue;
    const { window, percent } = entry as { window?: unknown; percent?: unknown };
    if (typeof window !== "string" || !VALID_RESERVE_WINDOWS.has(window)) continue;
    if (typeof percent !== "number" || !Number.isFinite(percent)) continue;
    if (percent < 0 || percent > 100) continue;
    rules.push({ window: window as ReserveRule["window"], percent });
  }
  return rules;
}

function serializeReserves(reserves: ReserveRule[] | undefined): string | null {
  if (!reserves || reserves.length === 0) return null;
  return JSON.stringify(reserves);
}

function serializeDays(days: number[]): string {
  return [...new Set(days.filter((d) => Number.isInteger(d) && d >= 0 && d <= 6))]
    .sort((a, b) => a - b)
    .join(",");
}

function rowToSchedule(row: ScheduleRow): QuotaSchedule {
  const schedule: QuotaSchedule = {
    id: row.id,
    poolId: row.pool_id,
    days: parseDays(row.days),
    startMinute: row.start_minute,
    endMinute: row.end_minute,
    timezone: row.timezone,
    mode: normalizeMode(row.mode),
    reserves: parseReserves(row.reserves),
    budgetWindow: VALID_WINDOWS.has(row.budget_window)
      ? (row.budget_window as QuotaWindow)
      : "daily",
    priority: row.priority,
    enabled: row.enabled === 1,
  };
  if (row.label != null) schedule.label = row.label;
  // A budget is only meaningful as a (value, unit) pair — an orphan half is
  // dropped so the enforce path never reads a value it cannot attribute.
  if (
    row.budget_value != null &&
    row.budget_unit != null &&
    VALID_BUDGET_UNITS.has(row.budget_unit)
  ) {
    schedule.budgetValue = row.budget_value;
    schedule.budgetUnit = row.budget_unit as ScheduleBudgetUnit;
  }
  return schedule;
}

function makeId(): string {
  return `sched-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

/** A schedule as submitted by a caller: the id and poolId are assigned here. */
export type ScheduleInput = Omit<QuotaSchedule, "id" | "poolId"> & { id?: string };

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * All schedules for a pool, ordered priority DESC then id ASC — the same order
 * `resolveActiveSchedule` applies, so the UI list reads as the engine resolves.
 * Returns [] when the table is missing (migration not yet applied): schedules
 * are additive, and their absence must never block traffic.
 */
export function listSchedules(poolId: string): QuotaSchedule[] {
  try {
    const rows = getDb()
      .prepare<ScheduleRow>(
        `SELECT id, pool_id, label, days, start_minute, end_minute, timezone, mode,
                reserves, budget_value, budget_unit, budget_window, priority, enabled
         FROM quota_schedules
         WHERE pool_id = ?
         ORDER BY priority DESC, id ASC`
      )
      .all(poolId);
    return rows.map(rowToSchedule);
  } catch {
    // Table absent (migration not run) or DB unavailable — fail-open.
    return [];
  }
}

/** Only the enabled rows — what the hot path needs. */
export function listEnabledSchedules(poolId: string): QuotaSchedule[] {
  return listSchedules(poolId).filter((s) => s.enabled);
}

/**
 * Replace a pool's entire schedule set in one transaction.
 *
 * Whole-set replacement (rather than per-row PATCH) keeps the editor honest: the
 * resolution rules are order- and overlap-sensitive, so the UI always reasons
 * about the complete set it is about to save.
 *
 * @returns the persisted schedules, in resolution order.
 */
export function replaceSchedules(poolId: string, schedules: ScheduleInput[]): QuotaSchedule[] {
  const db = getDb();

  const del = db.prepare(`DELETE FROM quota_schedules WHERE pool_id = ?`);
  const ins = db.prepare(
    `INSERT INTO quota_schedules
       (id, pool_id, label, days, start_minute, end_minute, timezone, mode,
        reserves, budget_value, budget_unit, budget_window, priority, enabled)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );

  db.transaction(() => {
    del.run(poolId);
    for (const s of schedules) {
      const hasBudget = s.budgetValue != null && s.budgetUnit != null;
      ins.run(
        s.id ?? makeId(),
        poolId,
        s.label ?? null,
        serializeDays(s.days),
        s.startMinute,
        s.endMinute,
        s.timezone ?? null,
        s.mode,
        serializeReserves(s.reserves),
        hasBudget ? s.budgetValue : null,
        hasBudget ? s.budgetUnit : null,
        s.budgetWindow,
        s.priority,
        s.enabled ? 1 : 0
      );
    }
  })();

  return listSchedules(poolId);
}

/**
 * Drop every schedule of a pool. Called when the pool itself is deleted — the
 * table has no FK cascade, for the same reason quota_allocation_model_caps has
 * none (avoiding a fragile 3-table cascade chain in SQLite).
 */
export function deleteSchedulesForPool(poolId: string): number {
  try {
    return getDb().prepare(`DELETE FROM quota_schedules WHERE pool_id = ?`).run(poolId).changes;
  } catch {
    return 0;
  }
}
