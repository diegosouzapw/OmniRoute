/**
 * Node-level daily quota reset clock.
 *
 * TPD cooldown endpoint: operator-configured IANA timezone + local hour.
 * No default timezone. Do not call getMsUntilTomorrow() from here.
 */

export function isValidIanaTimeZone(tz: string): boolean {
  if (typeof tz !== "string" || tz.trim() === "") return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz.trim() }).format();
    return true;
  } catch {
    return false;
  }
}

export function isValidResetHour(hour: unknown): hour is number {
  return typeof hour === "number" && Number.isInteger(hour) && hour >= 0 && hour <= 23;
}

export function nodeDailyResetConfigured(timezone: unknown, hour: unknown): boolean {
  return typeof timezone === "string" && isValidIanaTimeZone(timezone) && isValidResetHour(hour);
}

type ZonedParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

// Formatter construction dominates zonedParts; the DST-gap walk below calls it
// hundreds of times, so reuse one formatter per (validated) IANA zone.
const zonedFormatters = new Map<string, Intl.DateTimeFormat>();

function zonedFormatter(timeZone: string): Intl.DateTimeFormat {
  let fmt = zonedFormatters.get(timeZone);
  if (!fmt) {
    fmt = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    zonedFormatters.set(timeZone, fmt);
  }
  return fmt;
}

function zonedParts(ms: number, timeZone: string): ZonedParts {
  const fmt = zonedFormatter(timeZone);
  const bag: Record<string, string> = {};
  for (const part of fmt.formatToParts(new Date(ms))) {
    if (part.type !== "literal") bag[part.type] = part.value;
  }
  return {
    year: Number(bag.year),
    month: Number(bag.month),
    day: Number(bag.day),
    hour: Number(bag.hour),
    minute: Number(bag.minute),
    second: Number(bag.second),
  };
}

function addCalendarDay(
  year: number,
  month: number,
  day: number
): {
  year: number;
  month: number;
  day: number;
} {
  const utc = Date.UTC(year, month - 1, day + 1);
  const dt = new Date(utc);
  return { year: dt.getUTCFullYear(), month: dt.getUTCMonth() + 1, day: dt.getUTCDate() };
}

/**
 * Offset-iteration wall-clock → epoch conversion. `exact` is false when the
 * iteration never lands on the wanted wall time, which is what a wall time
 * inside a DST gap (a local time that does not exist) does.
 */
function convergeWallTime(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  timeZone: string
): { ms: number; exact: boolean } {
  const wanted = Date.UTC(year, month - 1, day, hour, minute, second);
  let guess = wanted;
  for (let i = 0; i < 4; i++) {
    const p = zonedParts(guess, timeZone);
    const asIfUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    const delta = asIfUtc - wanted;
    if (delta === 0) return { ms: guess, exact: true };
    guess -= delta;
  }
  return { ms: guess, exact: false };
}

/** Gap-walk bound: one full day covers every civil gap, including a skipped calendar day. */
const MAX_GAP_WALK_MINUTES = 24 * 60;

/** Convert wall-clock time in `timeZone` to epoch ms. */
function zonedLocalToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  timeZone: string
): number {
  const first = convergeWallTime(year, month, day, hour, minute, second, timeZone);
  if (first.exact) return first.ms;
  // DST gap (New York 02:00 on spring-forward, Havana/Santiago 00:00): the offset
  // iteration settles an hour EARLY. Walk the wall clock forward minute by minute to
  // the first wall time that exists; gap widths vary (30 min, 1 h), so never add a
  // fixed offset.
  let date = { year, month, day };
  let minuteOfDay = hour * 60 + minute;
  for (let step = 0; step < MAX_GAP_WALK_MINUTES; step++) {
    minuteOfDay += 1;
    if (minuteOfDay >= 24 * 60) {
      minuteOfDay -= 24 * 60;
      date = addCalendarDay(date.year, date.month, date.day);
    }
    const h = Math.floor(minuteOfDay / 60);
    const candidate = convergeWallTime(
      date.year,
      date.month,
      date.day,
      h,
      minuteOfDay % 60,
      second,
      timeZone
    );
    if (candidate.exact) return candidate.ms;
  }
  return first.ms;
}

/**
 * Next local `hour:00:00` in `timezone` strictly after `nowMs`.
 * If now lands exactly on that instant, return the following cycle.
 */
export function nextDailyResetAtMs(timezone: string, hour: number, nowMs: number): number {
  const now = zonedParts(nowMs, timezone);
  let date = { year: now.year, month: now.month, day: now.day };
  let next = zonedLocalToUtc(date.year, date.month, date.day, hour, 0, 0, timezone);
  if (next <= nowMs) {
    date = addCalendarDay(date.year, date.month, date.day);
    next = zonedLocalToUtc(date.year, date.month, date.day, hour, 0, 0, timezone);
  }
  return next;
}

export function parseTpdLimitFromText(text: string): number | null {
  const m = /limit:\s*(\d+)/i.exec(text);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

export function isTpdRateLimit(errorText: string | null | undefined): boolean {
  return String(errorText || "")
    .toLowerCase()
    .includes("tpd rate limit");
}

export type TpdCooldownOptions = {
  timezone?: unknown;
  hour?: unknown;
  nowMs?: number;
  headerResetAtMs?: number | null;
};

/**
 * Cooldown for a TPD 429. Header reset wins; else the node clock.
 * Both missing → null (caller uses short 429, does not guess midnight).
 */
export function resolveTpdCooldownMs(
  errorText: string | null | undefined,
  options: TpdCooldownOptions = {}
): number | null {
  if (!isTpdRateLimit(errorText)) return null;
  const now = options.nowMs ?? Date.now();
  if (typeof options.headerResetAtMs === "number" && options.headerResetAtMs > now) {
    return options.headerResetAtMs - now;
  }
  if (typeof options.timezone === "string" && isValidResetHour(options.hour)) {
    if (!nodeDailyResetConfigured(options.timezone, options.hour)) return null;
    return nextDailyResetAtMs(options.timezone, options.hour, now) - now;
  }
  return null;
}

/**
 * Milliseconds until the next operator-configured daily reset, or null when
 * the clock is absent, invalid, or already passed. Shared by the non-TPD
 * daily-quota paths so configured and unconfigured behavior stay in one place.
 */
export function nextConfiguredResetMs(
  timezone: unknown,
  hour: unknown,
  nowMs: number
): number | null {
  if (typeof timezone !== "string" || !isValidResetHour(hour)) return null;
  if (!nodeDailyResetConfigured(timezone, hour)) return null;
  const ms = nextDailyResetAtMs(timezone, hour, nowMs) - nowMs;
  return ms > 0 ? ms : null;
}
