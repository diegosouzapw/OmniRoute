/**
 * Shared JSONC-tolerant config reader for CLI-tools settings routes.
 *
 * Background: several upstream CLI tools (opencode, kilo, droid, cline, etc.)
 * ship config files that are JSON with the occasional trailing comma or a
 * stray comment — valid JSONC, but `JSON.parse()` rejects them with a
 * `SyntaxError`. Until this helper, every `readSettings`/`readConfig` helper
 * only caught `ENOENT` and re-threw, surfacing as a 500 that the dashboard
 * misread as "tool not installed".
 *
 * Behaviour:
 *  - strip trailing commas before parsing so JSONC files load cleanly;
 *  - on ANY read or parse failure, return the caller-supplied fallback
 *    (typically `null` or `{}`) instead of throwing, so the dashboard shows
 *    "installed but not configured" rather than "not installed".
 *
 * Ported from upstream `decolua/9router@6c10edf8`. Co-authored-by: Zireael.
 */
import { promises as fs } from "node:fs";

/**
 * Parse a JSON/JSONC string, returning `null` on syntax errors instead of
 * throwing. Trailing commas before `}` or `]` are stripped before parsing.
 */
export function parseJsoncOrNull<T = unknown>(content: string): T | null {
  try {
    const stripped = content.replace(/,(\s*[}\]])/g, "$1");
    return JSON.parse(stripped) as T;
  } catch {
    return null;
  }
}

/**
 * Read a JSON/JSONC config file. Returns `fallback` (default: `null`) on any
 * filesystem or parse error so callers can render an "installed but not
 * configured" state instead of crashing with a 500.
 */
export async function readJsoncConfig<T = unknown>(
  path: string,
  fallback: T | null = null
): Promise<T | null> {
  let content: string;
  try {
    content = await fs.readFile(path, "utf-8");
  } catch {
    return fallback;
  }
  const parsed = parseJsoncOrNull<T>(content);
  return parsed ?? fallback;
}
