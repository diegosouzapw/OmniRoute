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
 */

export interface BulkApiKeyEntry {
  name: string;
  apiKey: string;
  lineNumber: number;
}

export interface BulkApiKeyParseResult {
  entries: BulkApiKeyEntry[];
  warnings: string[];
}

const MAX_BULK_LINES = 200;

export function parseBulkApiKeys(text: string): BulkApiKeyParseResult {
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
