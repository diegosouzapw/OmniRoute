/**
 * #12071 — import-modal feedback helpers.
 *
 * POST /api/providers/import already returns per-row `{index,name,provider,message}`.
 * The modal used to keep only success/failed/total and drop `errors` on the floor.
 * These helpers stay a pure, dependency-free module so the hook can stay under the
 * LOC ratchet and the same formatter can be unit-tested without React.
 */

export type ImportRowError = {
  index?: number;
  name?: string;
  provider?: string;
  message: string;
};

export type ImportResult = {
  success: number;
  failed: number;
  total: number;
  errors: ImportRowError[];
};

const VISIBLE_ERROR_CAP = 10;

function asFiniteNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function asRowError(value: unknown): ImportRowError | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  if (typeof row.message !== "string" || !row.message.trim()) return null;
  return {
    ...(typeof row.index === "number" && Number.isFinite(row.index) ? { index: row.index } : {}),
    ...(typeof row.name === "string" && row.name.trim() ? { name: row.name.trim() } : {}),
    ...(typeof row.provider === "string" && row.provider.trim() ? { provider: row.provider.trim() } : {}),
    message: row.message.trim(),
  };
}

/** Keep counts plus a sanitized `errors` array. A missing/non-array field becomes []. */
export function normalizeImportResponse(data: unknown): ImportResult {
  const body = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
  const rawErrors = Array.isArray(body.errors) ? body.errors : [];
  return {
    success: asFiniteNumber(body.success),
    failed: asFiniteNumber(body.failed),
    total: asFiniteNumber(body.total),
    errors: rawErrors.map(asRowError).filter((row): row is ImportRowError => row !== null),
  };
}

export type ImportHttpOutcome = {
  result: ImportResult;
  shouldRefresh: boolean;
};

function httpFailureResult(status: number, data: unknown, fallback: ImportResult): ImportResult {
  if (fallback.errors.length > 0) {
    return { ...fallback, success: 0 };
  }
  const body = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
  const detail = typeof body.error === "string" ? body.error.trim() : "";
  const message = detail ? `HTTP ${status}: ${detail}` : `HTTP ${status}`;
  return {
    success: 0,
    failed: Math.max(1, fallback.failed),
    total: Math.max(1, fallback.total),
    errors: [{ message }],
  };
}

/**
 * Map an import HTTP response onto the modal result.
 * Non-ok statuses still populate `errors`. Refresh is a boolean so the hook
 * can await `onImported` outside this function (a throw there must not
 * overwrite a successful import result).
 */
export function applyImportHttpOutcome(
  res: { ok: boolean; status: number },
  data: unknown
): ImportHttpOutcome {
  const normalized = normalizeImportResponse(data);
  if (!res.ok) {
    return { result: httpFailureResult(res.status, data, normalized), shouldRefresh: false };
  }
  return { result: normalized, shouldRefresh: normalized.success > 0 };
}

/** Parse the import response body. Non-JSON becomes `{ ok: false, data: { error } }`. */
export async function readImportResponse(res: Response): Promise<{
  ok: boolean;
  status: number;
  data: unknown;
}> {
  try {
    return { ok: res.ok, status: res.status, data: await res.json() };
  } catch {
    return { ok: false, status: res.status, data: { error: "Invalid JSON body" } };
  }
}

export function networkImportFailure(err: unknown): ImportResult {
  return {
    success: 0,
    failed: 1,
    total: 1,
    errors: [{ message: err instanceof Error ? err.message : "Import request failed" }],
  };
}

/** First 10 rows plus the leftover count — same cap as AddApiKeyModal bulk import. */
export function visibleImportErrors(errors: ImportRowError[]): {
  shown: ImportRowError[];
  extra: number;
} {
  return {
    shown: errors.slice(0, VISIBLE_ERROR_CAP),
    extra: Math.max(0, errors.length - VISIBLE_ERROR_CAP),
  };
}

/** One line for the modal list: name, else provider, else 1-based row index. */
export function formatImportErrorLine(err: ImportRowError): string {
  const label =
    (typeof err.name === "string" && err.name.trim()) ||
    (typeof err.provider === "string" && err.provider.trim()) ||
    (typeof err.index === "number" && Number.isFinite(err.index) ? `row ${err.index + 1}` : "row");
  return `${label}: ${err.message}`;
}

/**
 * Positional CSV sample. Column 0 must be an *existing* managed provider id
 * or an already-registered OpenAI/Anthropic-compatible node id — this import
 * does not create new endpoint nodes. Header names are cosmetic; the parser
 * destructures by index (`provider,name,apiKey,baseUrl,priority`).
 */
export const PROVIDER_IMPORT_CSV_TEMPLATE = `# OmniRoute provider import (positional columns)
# Columns: provider, name, apiKey, baseUrl (optional), priority (optional, 1-100)
# The provider column must be an existing managed provider id (openai, anthropic, …)
# or an already-registered OpenAI/Anthropic-compatible node id.
# This import does not create new endpoint nodes. Add those first (Dashboard → Providers → Add OpenAI-Compatible).
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
`;

export function downloadTextFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  try {
    document.body.appendChild(link);
    link.click();
  } finally {
    link.remove();
    URL.revokeObjectURL(url);
  }
}

export function downloadProviderImportCsvTemplate(): void {
  downloadTextFile(PROVIDER_IMPORT_CSV_TEMPLATE, "omniroute-provider-import-template.csv", "text/csv");
}
