/**
 * Shared contract between `GET /api/logs/export` and the dashboard Export button (#13999).
 *
 * The route caps every export at `limit` rows (default 10k, hard max 50k) and reports the cap in
 * the streamed JSON header. The dashboard downloads the body as a Blob, so a
 * capped export used to land on disk silently truncated. The route now mirrors the cap metadata in
 * response headers — known before the first row streams — and the page reads them with
 * `readLogExportTruncation()` to tell the user what was left out. The header count is an estimate;
 * the dashboard reads the authoritative trailing count from at most 128 bytes of the Blob.
 *
 * No server-only imports: this module is loaded by a client component.
 */

export const LOG_EXPORT_DEFAULT_ROWS = 10_000;
export const LOG_EXPORT_MAX_ROWS = 50_000;

export const LOG_EXPORT_HEADERS = {
  count: "X-OmniRoute-Export-Count",
  countKind: "X-OmniRoute-Export-Count-Kind",
  capped: "X-OmniRoute-Export-Capped",
  limit: "X-OmniRoute-Export-Limit",
  totalAvailable: "X-OmniRoute-Export-Total-Available",
} as const;

export interface LogExportTruncation {
  /** Rows emitted, or the preflight estimate when a legacy response has no trailer. */
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

/** Preflight estimates: headers are sent before rows have been hydrated. */
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
    [LOG_EXPORT_HEADERS.countKind]: "estimate",
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
export function readLogExportTruncation(
  headers: HeaderSource,
  emittedCount: number | null = null
): LogExportTruncation | null {
  const capped = (headers.get(LOG_EXPORT_HEADERS.capped) || "").trim().toLowerCase() === "true";
  const limit = parseNonNegativeInt(headers.get(LOG_EXPORT_HEADERS.limit));
  const total = parseNonNegativeInt(headers.get(LOG_EXPORT_HEADERS.totalAvailable));
  const count = parseNonNegativeInt(headers.get(LOG_EXPORT_HEADERS.count));
  const emitted =
    emittedCount !== null && Number.isSafeInteger(emittedCount) && emittedCount >= 0
      ? emittedCount
      : null;

  const cappedByNumbers = limit !== null && total !== null && total > limit;
  const lostRows = emitted !== null && count !== null && emitted < count;
  if (!capped && !cappedByNumbers && !lostRows) return null;

  const exported = emitted ?? count ?? limit ?? 0;
  return {
    exported,
    total: total ?? exported,
    limit: limit ?? exported,
  };
}

/** Read the final top-level count without decoding or parsing a potentially large export. */
export async function readLogExportEmittedCount(
  blob: Pick<Blob, "size" | "slice">
): Promise<number | null> {
  const tail = await blob.slice(Math.max(0, blob.size - 128)).text();
  const match = /,"count":(\d+)\}\s*$/.exec(tail);
  return match ? parseNonNegativeInt(match[1]) : null;
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
