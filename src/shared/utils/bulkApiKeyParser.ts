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
