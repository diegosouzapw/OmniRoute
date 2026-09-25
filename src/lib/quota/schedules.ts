/**
 * schedules.ts — Time-aware quota windows for a quota pool.
 *
 * A schedule answers two questions the static pool allocation cannot:
 *
 *   WHEN may OmniRoute use this account?   → days + start/end minute + mode
 *   HOW MUCH may it burn while it is in there?
 *       · reservePercent — how much must be LEFT on the account. Measured on the
 *         upstream saturation signal, which covers the WHOLE account, so a human
 *         (or another tool) sharing the same credentials always keeps that floor.
 *       · budgetValue/budgetUnit — how much OMNIROUTE itself may consume in the
 *         window. Measured on OmniRoute's own recorded consumption, so somebody
 *         else's traffic on the same account neither eats nor inflates it.
 *
 * Everything here is pure and clock-injectable: `nowMs` is always a parameter so
 * unit tests drive the calendar deterministically and the tested path never
 * calls Date.now() implicitly (same convention as accountBuckets.ts).
 *
 * Part of: Quota Sharing Engine — time-aware quotas.
 */

import type { QuotaWindow } from "./dimensions";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ScheduleMode = "allow" | "block";

/**
 * Units a per-window budget can be expressed in. See the migration for why
 * "percent" is absent: OmniRoute cannot attribute a share of an upstream
 * percentage to itself — that is what `reservePercent` covers.
 */
export type ScheduleBudgetUnit = "requests" | "tokens" | "usd";

/** "any" = whichever of the plan's windows is most consumed decides. */
export type ReserveWindow = QuotaWindow | "any";

/**
 * One "keep this much free" rule.
 *
 * Providers meter several windows at once (a 5h burst window next to a weekly
 * one, say), and they deserve different floors: a weekly reserve big enough to
 * survive the week would throttle every single burst if it were applied to the
 * 5h window too. So a reserve names the window it guards, and a schedule may
 * carry several. `percent` is fractional on purpose — on a large weekly budget
 * a whole point is a lot of quota to round away.
 */
export interface ReserveRule {
  window: ReserveWindow;
  percent: number;
}

export interface QuotaSchedule {
  id: string;
  poolId: string;
  label?: string;
  /** JS getDay() values, 0 = Sunday .. 6 = Saturday. */
  days: number[];
  /** Minutes from local midnight, 0..1439. */
  startMinute: number;
  /** Minutes from local midnight, 1..1440. `<= startMinute` wraps past midnight. */
  endMinute: number;
  /** IANA zone; undefined/null = server local time. */
  timezone?: string | null;
  mode: ScheduleMode;
  /** Per-window floors that must stay unspent. Empty = no reserve at all. */
  reserves: ReserveRule[];
  /** OmniRoute's own consumption allowance inside the window. */
  budgetValue?: number;
  budgetUnit?: ScheduleBudgetUnit;
  /** Rolling window the budget is counted over. */
  budgetWindow: QuotaWindow;
  priority: number;
  enabled: boolean;
}

export type ScheduleVerdict =
  /** The pool has no enabled schedules — schedules impose nothing. */
  | { kind: "unscheduled" }
  /** A window is open; its reserve/budget still have to be checked by the caller. */
  | { kind: "active"; schedule: QuotaSchedule }
  /** No window is open right now. */
  | {
      kind: "closed";
      reason: "blackout" | "outside-window";
      schedule?: QuotaSchedule;
      /** Seconds until the next allow window opens, when one is configured. */
      retryAfterSeconds?: number;
    };

export const MINUTES_PER_DAY = 1440;

// ---------------------------------------------------------------------------
// Calendar helpers
// ---------------------------------------------------------------------------

const DAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/**
 * Resolve `nowMs` to a (weekday, minute-of-day) pair in the schedule's zone.
 *
 * Falls back to the server's local time when `timezone` is empty or not a zone
 * this runtime knows — a bad zone string must never take the quota engine down.
 */
export function localDayAndMinute(
  nowMs: number,
  timezone?: string | null
): { day: number; minute: number } {
  if (timezone) {
    try {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).formatToParts(new Date(nowMs));

      const weekday = parts.find((p) => p.type === "weekday")?.value;
      const hour = Number(parts.find((p) => p.type === "hour")?.value);
      const minute = Number(parts.find((p) => p.type === "minute")?.value);
      const day = weekday ? DAY_INDEX[weekday] : undefined;

      if (day !== undefined && Number.isFinite(hour) && Number.isFinite(minute)) {
        // "24" is how hour12:false spells midnight in some ICU versions.
        return { day, minute: (hour % 24) * 60 + minute };
      }
    } catch {
      // Unknown IANA zone — fall through to server local time.
    }
  }

  const d = new Date(nowMs);
  return { day: d.getDay(), minute: d.getHours() * 60 + d.getMinutes() };
}

/**
 * Is `schedule` open at `nowMs`?
 *
 * A window whose `endMinute <= startMinute` wraps past midnight; `days` then
 * refers to the day the window STARTS on, so "Fri 22:00–02:00" is open during
 * the small hours of Saturday.
 */
export function isScheduleActive(schedule: QuotaSchedule, nowMs: number): boolean {
  if (!schedule.enabled || schedule.days.length === 0) return false;

  const { day, minute } = localDayAndMinute(nowMs, schedule.timezone);
  const { startMinute, endMinute } = schedule;

  if (endMinute > startMinute) {
    return schedule.days.includes(day) && minute >= startMinute && minute < endMinute;
  }

  // Wrapping window: the tail before midnight belongs to `day`, the head after
  // midnight belongs to the PREVIOUS day's occurrence.
  if (minute >= startMinute) return schedule.days.includes(day);
  if (minute < endMinute) return schedule.days.includes((day + 6) % 7);
  return false;
}

/**
 * Seconds until the earliest `allow` window opens, or undefined when none is
 * configured. Scans the next 8 local days, which always covers a weekly cycle.
 *
 * ponytail: local-minute arithmetic, so a DST jump inside the wait can shift the
 * hint by up to an hour. It only feeds Retry-After; tighten it with a real
 * zoned-date walk if clients ever need it exact.
 */
export function secondsUntilNextWindow(
  schedules: QuotaSchedule[],
  nowMs: number
): number | undefined {
  let best: number | undefined;

  for (const schedule of schedules) {
    if (!schedule.enabled || schedule.mode !== "allow" || schedule.days.length === 0) continue;
    const { day, minute } = localDayAndMinute(nowMs, schedule.timezone);

    for (let offset = 0; offset <= 7; offset++) {
      if (!schedule.days.includes((day + offset) % 7)) continue;
      const deltaMinutes = offset * MINUTES_PER_DAY + schedule.startMinute - minute;
      if (deltaMinutes <= 0) continue;
      if (best === undefined || deltaMinutes < best) best = deltaMinutes;
      break;
    }
  }

  return best === undefined ? undefined : best * 60;
}

// ---------------------------------------------------------------------------
// Resolution
// ---------------------------------------------------------------------------

/** priority DESC, then id ASC — deterministic for equal priorities. */
function byPriority(a: QuotaSchedule, b: QuotaSchedule): number {
  return b.priority - a.priority || a.id.localeCompare(b.id);
}

/**
 * Decide what the pool's schedules say about `nowMs`.
 *
 * A blackout always wins over an overlapping allow window, so one "block" row is
 * enough to carve a hole out of a broad permitted range without editing it.
 * A pool that only has "block" rows keeps blacklist semantics (open by default);
 * as soon as it has one "allow" row the allow rows become the whitelist.
 */
export function resolveActiveSchedule(schedules: QuotaSchedule[], nowMs: number): ScheduleVerdict {
  const enabled = schedules.filter((s) => s.enabled);
  if (enabled.length === 0) return { kind: "unscheduled" };

  const matching = enabled.filter((s) => isScheduleActive(s, nowMs)).sort(byPriority);

  const blackout = matching.find((s) => s.mode === "block");
  if (blackout) return { kind: "closed", reason: "blackout", schedule: blackout };

  const open = matching.find((s) => s.mode === "allow");
  if (open) return { kind: "active", schedule: open };

  const hasAllowWindows = enabled.some((s) => s.mode === "allow");
  if (!hasAllowWindows) return { kind: "unscheduled" };

  return {
    kind: "closed",
    reason: "outside-window",
    retryAfterSeconds: secondsUntilNextWindow(enabled, nowMs),
  };
}

// ---------------------------------------------------------------------------
// Budget bucket key
// ---------------------------------------------------------------------------

/**
 * Dimension-key namespace for a schedule's own-consumption budget.
 *
 * Distinct from both the pool-level rows ("<poolId>:<unit>:<window>") and the
 * per-model cap rows ("<poolId>:model:<model>"), so a budget never double-counts
 * against another counter and disappears with the schedule.
 */
export function scheduleBucketPoolId(poolId: string, scheduleId: string): string {
  return `${poolId}:sched:${scheduleId}`;
}

// ---------------------------------------------------------------------------
// Reserve floors
// ---------------------------------------------------------------------------

/**
 * Saturation per quota window, 0..1, as reported for the WHOLE account — so
 * third-party consumption counts against a floor exactly like OmniRoute's own.
 * A window the plan does not meter is simply absent.
 */
export type SaturationByWindow = Partial<Record<QuotaWindow, number>>;

/** The windows a schedule's reserves actually need a signal for. */
export function reservedWindows(schedule: QuotaSchedule): ReserveWindow[] {
  return [...new Set(schedule.reserves.map((r) => r.window))];
}

/**
 * The first reserve rule the account can no longer honour, or null when every
 * rule still has room.
 *
 * Rules are ANDed and evaluated in order, so the message names the floor the
 * operator actually hit. Fail-open per B16: a window with no usable signal is
 * treated as satisfied rather than as exhausted — a signal outage must not
 * masquerade as a drained account.
 */
export function failingReserve(
  schedule: QuotaSchedule,
  saturation: SaturationByWindow
): ReserveRule | null {
  const values = Object.values(saturation).filter((v): v is number => Number.isFinite(v));

  for (const rule of schedule.reserves) {
    const used =
      rule.window === "any"
        ? values.length > 0
          ? Math.max(...values)
          : undefined
        : saturation[rule.window];

    if (used === undefined || !Number.isFinite(used)) continue; // fail-open
    if ((1 - used) * 100 < rule.percent) return rule;
  }

  return null;
}
