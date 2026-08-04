/**
 * Parses textarea input for bulk API key creation.
 *
 * Supported line formats (one per line):
 *   - `name|apiKey`
 *   - `apiKey` (auto-named as `Key N`)
 *   - `# comment` (skipped)
 *   - blank lines (skipped)
 *
 * `apiKey` may contain `|` — only the first `|` is treated as the separator.
 *
 * When `withAccountId` is enabled (Cloudflare Workers AI), each line carries a
 * per-key account id in a 3-field shape:
 *   - `name|accountId|apiKey`
 * Only the first two `|` are treated as separators, so an `apiKey` containing
 * `|` stays intact. Lines missing the `accountId` or `apiKey` field are flagged
 * as warnings and skipped.
 */

export interface BulkApiKeyEntry {
  name: string;
  apiKey: string;
  lineNumber: number;
  /** Per-key account id — only populated for providers parsed with `withAccountId` (Cloudflare). */
  accountId?: string;
}

export interface BulkApiKeyParseResult {
  entries: BulkApiKeyEntry[];
  warnings: string[];
}

export interface ParseBulkApiKeysOptions {
  /** Parse each line as the 3-field `name|accountId|apiKey` shape (Cloudflare Workers AI). */
  withAccountId?: boolean;
}

const MAX_BULK_LINES = 200;

export function parseBulkApiKeys(
  text: string,
  options: ParseBulkApiKeysOptions = {}
): BulkApiKeyParseResult {
  const lines = text.split(/\r?\n/);
  const entries: BulkApiKeyEntry[] = [];
  const warnings: string[] = [];
  let autoIdx = 1;

  if (lines.length > MAX_BULK_LINES) {
    warnings.push(
      `Input has ${lines.length} lines; only the first ${MAX_BULK_LINES} will be processed.`
    );
  }

  const bound = Math.min(lines.length, MAX_BULK_LINES);
  for (let i = 0; i < bound; i++) {
    const raw = lines[i].trim();
    if (!raw) continue;
    if (raw.startsWith("#")) continue;

    if (options.withAccountId) {
      const firstPipe = raw.indexOf("|");
      if (firstPipe === -1) {
        warnings.push(`Line ${i + 1}: expected name|accountId|apiKey, skipped`);
        continue;
      }
      const secondPipe = raw.indexOf("|", firstPipe + 1);
      if (secondPipe === -1) {
        warnings.push(`Line ${i + 1}: missing accountId or apiKey, skipped`);
        continue;
      }
      const namePart = raw.slice(0, firstPipe).trim();
      const accountId = raw.slice(firstPipe + 1, secondPipe).trim();
      const apiKey = raw.slice(secondPipe + 1).trim();
      const name = namePart || `Key ${autoIdx++}`;

      if (!accountId) {
        warnings.push(`Line ${i + 1}: empty accountId, skipped`);
        continue;
      }
      if (!apiKey) {
        warnings.push(`Line ${i + 1}: empty apiKey, skipped`);
        continue;
      }

      entries.push({ name, accountId, apiKey, lineNumber: i + 1 });
      continue;
    }

    const pipeIdx = raw.indexOf("|");
    let name: string;
    let apiKey: string;
    if (pipeIdx === -1) {
      name = `Key ${autoIdx++}`;
      apiKey = raw;
    } else {
      const namePart = raw.slice(0, pipeIdx).trim();
      apiKey = raw.slice(pipeIdx + 1).trim();
      name = namePart || `Key ${autoIdx++}`;
    }

    if (!apiKey) {
      warnings.push(`Line ${i + 1}: empty apiKey, skipped`);
      continue;
    }

    entries.push({ name, apiKey, lineNumber: i + 1 });
  }

  return { entries, warnings };
}

export const BULK_API_KEY_MAX_LINES = MAX_BULK_LINES;

// Strips a trailing " <digits>" suffix so a colliding name's numeric index can be
// regenerated instead of stacking (e.g. "Key 1" -> "Key", not "Key 1 2").
function stripTrailingIndex(name: string): string {
  const stripped = name.replace(/\s+\d+$/, "");
  return stripped.length > 0 ? stripped : name;
}

/**
 * Resolves name collisions across a batch of bulk-add entries.
 *
 * Background: `createProviderConnection` upserts apikey connections BY NAME
 * (see `src/lib/db/providers.ts` — same provider + auth_type "apikey" + same
 * `name` updates the existing row instead of inserting a new one, replacing
 * its `apiKey`/`priority`/`testStatus`). `parseBulkApiKeys` auto-names
 * unnamed lines "Key 1", "Key 2", ... per request, blind to names already
 * saved for the provider — and a batch can also contain the same custom
 * `name|apiKey` name twice. Either case previously reached the backend upsert
 * path and silently overwrote (or self-collapsed) an existing connection
 * instead of inserting a new one.
 *
 * This resolves every collision — against `existingNames` AND against names
 * already assigned earlier in the same batch — by gap-filling the smallest
 * free "<base> <n>" suffix, so a name is never reused and every entry reaches
 * the backend as a genuine insert.
 */
export function resolveBulkNameCollisions<T extends { name: string }>(
  entries: T[],
  existingNames: readonly string[] | null | undefined
): T[] {
  const used = new Set(
    (Array.isArray(existingNames) ? existingNames : [])
      .filter((n): n is string => typeof n === "string" && n.length > 0)
      .map((n) => n.toLowerCase())
  );

  return entries.map((entry) => {
    const lowerName = entry.name.toLowerCase();
    if (!used.has(lowerName)) {
      used.add(lowerName);
      return entry;
    }

    const base = stripTrailingIndex(entry.name);
    let idx = 1;
    let candidate = `${base} ${idx}`;
    while (used.has(candidate.toLowerCase())) {
      idx += 1;
      candidate = `${base} ${idx}`;
    }
    used.add(candidate.toLowerCase());
    return { ...entry, name: candidate };
  });
}
