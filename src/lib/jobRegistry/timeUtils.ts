/**
 * Timezone conversion helpers for JobRegistry.
 *
 * Generalized from warmupScheduler.toPacificTime(): converts a UTC Date into the
 * wall-clock Date of any IANA timezone. Used by cron scheduling to evaluate
 * "what time is it in the job's timezone" without pulling in a heavy tz library.
 */

/**
 * Convert a Date to the same wall-clock time in the given IANA timezone.
 * Returns a Date whose local fields (getHours() etc.) read as the target zone's
 * wall clock. Pure Intl - no DST logic here; cron-parser handles DST on the
 * scheduling side.
 */
export function convertToTimeZone(date: Date, timeZone: string): Date {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(date);
  const get = (t: string) => parseInt(parts.find((p) => p.type === t)?.value || "0", 10);
  return new Date(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second")
  );
}
