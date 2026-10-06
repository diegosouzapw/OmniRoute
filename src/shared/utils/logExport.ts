/**
 * Shared contract between `GET /api/logs/export` and the dashboard Export button (#13999).
 *
 * The route caps every export at `limit` rows (default 10k, hard max 50k) and reports the cap in
 * the streamed JSON header. The dashboard downloads the body as a Blob and never parses it, so a
 * capped export used to land on disk silently truncated. The route now mirrors the cap metadata in
 * response headers — known before the first row streams — and the page reads them with
 * `readLogExportTruncation()` to tell the user what was left out.
 *
 * No server-only imports: this module is loaded by a client component.
 */

export const LOG_EXPORT_DEFAULT_ROWS = 10_000;
export const LOG_EXPORT_MAX_ROWS = 50_000;

export const LOG_EXPORT_HEADERS = {
  count: "X-OmniRoute-Export-Count",
  capped: "X-OmniRoute-Export-Capped",
  limit: "X-OmniRoute-Export-Limit",
  totalAvailable: "X-OmniRoute-Export-Total-Available",
} as const;

export interface LogExportTruncation {
  /** Rows the export was allowed to include (the effective `limit`). */
  exported: number;
  /** Rows that matched the time range on the server. */
  total: number;
  /** The effective row limit the server applied. */
  limit: number;
}

type HeaderSource = { get(name: string): string | null };

function parseNonNegativeInt(value: string | null): number | null {
  if (value === null || !/^\d+$/.test(value.trim())) return null;
  const n = Number(value.trim());
  return Number.isSafeInteger(n) ? n : null;
}

/** Response headers the route sets for an export of `count` rows out of `totalAvailable`. */
export function buildLogExportHeaders({
  count,
  limit,
  totalAvailable,
}: {
  count: number;
  limit: number;
  totalAvailable: number;
}): Record<string, string> {
  const capped = totalAvailable > limit;
  return {
    [LOG_EXPORT_HEADERS.count]: String(count),
    [LOG_EXPORT_HEADERS.capped]: capped ? "true" : "false",
    [LOG_EXPORT_HEADERS.limit]: String(limit),
    [LOG_EXPORT_HEADERS.totalAvailable]: String(totalAvailable),
  };
}

/**
 * Returns the truncation details when the server capped the export, `null` otherwise.
 *
 * Fails closed toward warning: a response that says `capped: true` but carries unreadable numbers
 * still yields a truncation (with the numbers it could read), because telling the user nothing is
 * exactly the silent truncation this guards against.
 */
export function readLogExportTruncation(headers: HeaderSource): LogExportTruncation | null {
  const capped = (headers.get(LOG_EXPORT_HEADERS.capped) || "").trim().toLowerCase() === "true";
  const limit = parseNonNegativeInt(headers.get(LOG_EXPORT_HEADERS.limit));
  const total = parseNonNegativeInt(headers.get(LOG_EXPORT_HEADERS.totalAvailable));
  const count = parseNonNegativeInt(headers.get(LOG_EXPORT_HEADERS.count));

  const cappedByNumbers = limit !== null && total !== null && total > limit;
  if (!capped && !cappedByNumbers) return null;

  const exported = count ?? limit ?? 0;
  return {
    exported,
    total: total ?? exported,
    limit: limit ?? exported,
  };
}

/** URL the dashboard Export button calls: always asks for the server's maximum row cap. */
export function buildLogExportUrl(hours: number, type: string): string {
  const params = new URLSearchParams({
    hours: String(hours),
    type,
    limit: String(LOG_EXPORT_MAX_ROWS),
  });
  return `/api/logs/export?${params.toString()}`;
}
