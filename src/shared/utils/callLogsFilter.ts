import { matchesSearch } from "./turkishText";

export type CallLogFilter = {
  combo?: unknown;
  search?: unknown;
  correlationId?: unknown;
  status?: unknown;
};

export type CallLogRow = {
  status?: number | string | null;
  model?: string | null;
  requestedModel?: string | null;
  provider?: string | null;
  account?: string | null;
  path?: string | null;
  apiKeyName?: string | null;
  apiKeyId?: string | null;
  comboName?: string | null;
  comboStepId?: string | null;
  comboExecutionKey?: string | null;
  error?: string | null;
  correlationId?: string | null;
  [key: string]: unknown;
};

/**
 * Whether the given filter requires a post-merge pass over call-log rows.
 */
export function callLogsFilterActive(filter: CallLogFilter): boolean {
  return Boolean(filter.combo || filter.search || filter.correlationId || filter.status);
}

function statusMatches(row: CallLogRow, statusFilter: unknown): boolean {
  const st = Number(row.status);
  if (statusFilter === "error") {
    return (Number.isFinite(st) && st >= 400) || row.error != null;
  }
  if (statusFilter === "ok") {
    return Number.isFinite(st) && st >= 200 && st < 300;
  }
  const code = Number.parseInt(String(statusFilter), 10);
  return !Number.isNaN(code) && st === code;
}

/**
 * Post-merge filter for call-log rows.
 *
 * The DB query (`getCallLogs`) applies the SQL WHERE clauses to persisted rows,
 * but in-memory entries (active/completed request history) bypass it. This is
 * the single place that re-applies the filter over the merged list so both
 * sources share identical semantics — otherwise a request that ran outside the
 * filtered combo (e.g. grok-cli via another combo) would leak into a
 * combo-scoped view.
 *
 * The search haystack mirrors the SQL columns from `getCallLogs` so re-checking
 * persisted rows is consistent with what the DB already matched.
 */
export function filterCallLogEntries(rows: CallLogRow[], filter: CallLogFilter): CallLogRow[] {
  if (!callLogsFilterActive(filter)) return rows;
  const q = filter.search ? String(filter.search) : null;
  const correlationId = filter.correlationId ? String(filter.correlationId) : null;
  return rows.filter((row) => {
    if (filter.combo && row.comboName == null) return false;
    if (filter.status && !statusMatches(row, filter.status)) return false;
    if (correlationId && !matchesSearch(row.correlationId || "", correlationId)) return false;
    if (q) {
      const haystack = [
        row.model,
        row.requestedModel,
        row.provider,
        row.account,
        row.path,
        row.status,
        row.apiKeyName,
        row.apiKeyId,
        row.comboName,
        row.comboStepId,
        row.comboExecutionKey,
        row.error,
        row.correlationId,
      ]
        .filter((v): v is string => typeof v === "string" && v.length > 0)
        .map((v) => String(v))
        .join(" ");
      if (!matchesSearch(haystack, q)) return false;
    }
    return true;
  });
}
