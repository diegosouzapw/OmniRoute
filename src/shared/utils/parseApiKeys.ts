/**
 * Parses a newline-separated string of API keys for bulk-paste support in the
 * Provider Connection modal.
 *
 * Rules:
 *  - Splits on `\n` and `\r\n`
 *  - Trims leading / trailing whitespace from every line
 *  - Skips blank (or whitespace-only) lines
 *  - Deduplicates within the pasted block and against already-existing keys
 *
 * @param raw      Raw text from the paste event, potentially containing
 *                 multiple newline-separated API keys.
 * @param existing Keys already present in the list; duplicate matches are
 *                 counted but not re-added.
 * @returns `added`      – array of new, unique keys to append.
 *          `duplicates` – number of keys that were skipped because they already
 *                         exist in `existing` or appear more than once in `raw`.
 */
export function parseExtraApiKeys(
  raw: string,
  existing: string[]
): { added: string[]; duplicates: number } {
  const existingSet = new Set(existing);
  const seen = new Set<string>();
  const added: string[] = [];
  let duplicates = 0;

  for (const line of raw.split(/\r?\n/)) {
    const key = line.trim();
    if (!key) continue;

    if (existingSet.has(key) || seen.has(key)) {
      duplicates++;
    } else {
      seen.add(key);
      added.push(key);
    }
  }

  return { added, duplicates };
}
