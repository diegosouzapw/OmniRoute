/**
 * Pure parser for the "Import providers from file" wizard step (#6836).
 *
 * Supported inputs, one heterogeneous provider list per file:
 *   - CSV: `provider,name,apiKey,baseUrl(optional),priority(optional)` — one row per
 *     provider connection. A header row (first non-blank/non-comment line whose first
 *     column is literally "provider", case-insensitive) is detected and skipped.
 *   - JSON: an array of `{ provider, name, apiKey, baseUrl?, priority? }` objects.
 *
 * Modeled directly on `parseBulkProxyImport.ts` (same shape: entries + per-row errors +
 * skipped count, comment/blank-line skipping for CSV), swapping the row shape for
 * provider connections. Deliberately does NOT validate the `provider` id against the
 * provider catalog — that check belongs server-side in `bulkImportProviderSchema`
 * (`src/shared/validation/schemas/provider.ts`) so the parser stays a pure, dependency-free
 * client-side utility.
 */

export type ParsedProviderImportEntry = {
  provider: string;
  name: string;
  apiKey: string;
  baseUrl?: string;
  priority?: number;
};

export type ProviderImportParseError = {
  line: number;
  reason:
    | "importErrorMissingProvider"
    | "importErrorMissingName"
    | "importErrorMissingApiKey"
    | "importErrorInvalidPriority"
    | "importErrorMalformedRow"
    | "importErrorNotArray";
};

export type ProviderImportParseResult = {
  entries: ParsedProviderImportEntry[];
  errors: ProviderImportParseError[];
  skipped: number;
};

const CSV_HEADER_FIRST_COLUMN = "provider";

type PriorityParseResult = { ok: true; priority: number | undefined } | { ok: false };

/**
 * Parse+validate the optional `priority` field in isolation — split out of
 * `pushParsedEntry` purely to keep that function's cyclomatic complexity under the
 * repo's ratchet (each branch here would otherwise count toward the caller).
 */
function parseOptionalPriority(raw: unknown): PriorityParseResult {
  if (raw === undefined || raw === null || raw === "") return { ok: true, priority: undefined };
  const n = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(n) || n < 1 || n > 100) return { ok: false };
  return { ok: true, priority: n };
}

/**
 * Validate + normalize one already-split row of raw string fields into an entry,
 * pushing to `entries` on success or `errors` on failure. Shared by the CSV and
 * JSON code paths so both apply identical field rules.
 */
function pushParsedEntry(
  entries: ParsedProviderImportEntry[],
  errors: ProviderImportParseError[],
  lineNum: number,
  raw: { provider?: unknown; name?: unknown; apiKey?: unknown; baseUrl?: unknown; priority?: unknown }
): void {
  const provider = typeof raw.provider === "string" ? raw.provider.trim() : "";
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const apiKey = typeof raw.apiKey === "string" ? raw.apiKey.trim() : "";

  if (!provider) {
    errors.push({ line: lineNum, reason: "importErrorMissingProvider" });
    return;
  }
  if (!name) {
    errors.push({ line: lineNum, reason: "importErrorMissingName" });
    return;
  }
  if (!apiKey) {
    errors.push({ line: lineNum, reason: "importErrorMissingApiKey" });
    return;
  }

  const priorityResult = parseOptionalPriority(raw.priority);
  if (!priorityResult.ok) {
    errors.push({ line: lineNum, reason: "importErrorInvalidPriority" });
    return;
  }
  const priority = priorityResult.priority;

  const baseUrl = typeof raw.baseUrl === "string" ? raw.baseUrl.trim() : "";

  entries.push({
    provider,
    name,
    apiKey,
    ...(baseUrl ? { baseUrl } : {}),
    ...(priority !== undefined ? { priority } : {}),
  });
}

function parseCsv(text: string): ProviderImportParseResult {
  const lines = text.split("\n");
  const entries: ParsedProviderImportEntry[] = [];
  const errors: ProviderImportParseError[] = [];
  let skipped = 0;
  let headerSkipped = false;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i].trim();
    if (!raw || raw.startsWith("#")) {
      skipped++;
      continue;
    }

    const lineNum = i + 1;
    const parts = raw.split(",").map((p) => p.trim());

    if (!headerSkipped) {
      headerSkipped = true;
      if ((parts[0] || "").toLowerCase() === CSV_HEADER_FIRST_COLUMN) {
        skipped++;
        continue;
      }
    }

    if (parts.length < 3) {
      errors.push({ line: lineNum, reason: "importErrorMalformedRow" });
      continue;
    }

    const [provider, name, apiKey, baseUrl, priority] = parts;
    pushParsedEntry(entries, errors, lineNum, { provider, name, apiKey, baseUrl, priority });
  }

  return { entries, errors, skipped };
}

function parseJson(text: string): ProviderImportParseResult {
  const entries: ParsedProviderImportEntry[] = [];
  const errors: ProviderImportParseError[] = [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { entries, errors: [{ line: 1, reason: "importErrorMalformedRow" }], skipped: 0 };
  }

  if (!Array.isArray(parsed)) {
    return { entries, errors: [{ line: 1, reason: "importErrorNotArray" }], skipped: 0 };
  }

  parsed.forEach((row, idx) => {
    const lineNum = idx + 1;
    if (!row || typeof row !== "object") {
      errors.push({ line: lineNum, reason: "importErrorMalformedRow" });
      return;
    }
    const r = row as Record<string, unknown>;
    pushParsedEntry(entries, errors, lineNum, {
      provider: r.provider,
      name: r.name,
      apiKey: r.apiKey,
      baseUrl: r.baseUrl,
      priority: r.priority as number | string | undefined,
    });
  });

  return { entries, errors, skipped: 0 };
}

/**
 * Parse a provider import file's text content. `format` is decided by the caller from
 * the uploaded file's extension/MIME type ("csv" for `.csv`/text-csv, "json" otherwise).
 */
export function parseProviderImportFile(
  text: string,
  format: "csv" | "json"
): ProviderImportParseResult {
  return format === "json" ? parseJson(text) : parseCsv(text);
}
