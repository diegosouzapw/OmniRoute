/**
 * Minimal, dependency-free 5-field cron expression matcher (minute hour
 * day-of-month month day-of-week), evaluated against local server time.
 *
 * No cron/scheduling library exists anywhere in this codebase (checked
 * package.json + node_modules) and the established pattern for periodic
 * work (`src/lib/jobs/budgetResetJob.ts`, `reasoningCacheCleanupJob.ts`) is
 * a plain `setInterval` tick, not a scheduler. This keeps that pattern:
 * `matchesCron` only answers "is `date` inside the window this expression
 * describes", the caller (a `setInterval` tick) decides when to ask.
 */

type FieldRange = { min: number; max: number };

const FIELD_RANGES: [FieldRange, FieldRange, FieldRange, FieldRange, FieldRange] = [
  { min: 0, max: 59 }, // minute
  { min: 0, max: 23 }, // hour
  { min: 1, max: 31 }, // day of month
  { min: 1, max: 12 }, // month
  { min: 0, max: 6 }, // day of week (0 = Sunday)
];

function parseField(field: string, range: FieldRange): Set<number> | null {
  const values = new Set<number>();
  for (const part of field.split(",")) {
    const stepMatch = part.match(/^(\*|\d+-\d+|\d+)(?:\/(\d+))?$/);
    if (!stepMatch) return null;
    const [, base, stepRaw] = stepMatch;
    const step = stepRaw ? Number(stepRaw) : 1;
    if (!Number.isInteger(step) || step <= 0) return null;

    let start = range.min;
    let end = range.max;
    if (base !== "*") {
      if (base.includes("-")) {
        const [a, b] = base.split("-").map(Number);
        if (!Number.isInteger(a) || !Number.isInteger(b) || a > b) return null;
        start = a;
        end = b;
      } else {
        const n = Number(base);
        if (!Number.isInteger(n)) return null;
        start = n;
        end = n;
      }
    }
    if (start < range.min || end > range.max) return null;

    for (let v = start; v <= end; v += step) values.add(v);
  }
  return values.size > 0 ? values : null;
}

/**
 * Returns true when `date` falls inside the window described by `expr`.
 * An unparseable expression (wrong field count, out-of-range value, etc.)
 * always returns false rather than throwing — a malformed schedule should
 * silently never fire, not crash the job's tick.
 */
export function matchesCron(expr: string, date: Date): boolean {
  const fields = expr.trim().split(/\s+/);
  if (fields.length !== 5) return false;

  const parsed = fields.map((f, i) => parseField(f, FIELD_RANGES[i]));
  if (parsed.some((p) => p === null)) return false;
  const [minutes, hours, daysOfMonth, months, daysOfWeek] = parsed as Set<number>[];

  if (!minutes.has(date.getMinutes())) return false;
  if (!hours.has(date.getHours())) return false;
  if (!months.has(date.getMonth() + 1)) return false;

  // Standard cron semantics: when BOTH day-of-month and day-of-week are
  // restricted (not "*"), a date matching either one is sufficient (OR).
  // When only one is restricted, that one alone must match.
  const domRestricted = daysOfMonth.size < FIELD_RANGES[2].max - FIELD_RANGES[2].min + 1;
  const dowRestricted = daysOfWeek.size < FIELD_RANGES[4].max - FIELD_RANGES[4].min + 1;
  const domMatch = daysOfMonth.has(date.getDate());
  const dowMatch = daysOfWeek.has(date.getDay());

  if (domRestricted && dowRestricted) return domMatch || dowMatch;
  if (domRestricted) return domMatch;
  if (dowRestricted) return dowMatch;
  return true;
}
