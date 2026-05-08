/**
 * Auto-detect the installed Cursor IDE version from its local SQLite database.
 * Falls back to the hardcoded default when the DB is unavailable.
 * The detected version is cached in-memory for 1 hour to avoid repeated DB reads.
 *
 * Override the DB path with the CURSOR_STATE_DB_PATH env var for non-standard installs.
 */

import { homedir } from "os";
import { join } from "path";
import { createRequire } from "module";

const CACHE_TTL_MS = 60 * 60 * 1000;
const DB_KEY = "cursorupdate.lastUpdatedAndShown.version";
const FALLBACK_VERSION = "3.2.14";

let cachedVersion: string | null = null;
let cachedAt = 0;

export function getCursorDbPath(): string {
  if (process.env.CURSOR_STATE_DB_PATH) {
    return process.env.CURSOR_STATE_DB_PATH;
  }
  const home = process.env.HOME || process.env.USERPROFILE || homedir();
  const platform = process.platform;
  if (platform === "darwin") {
    return join(home, "Library/Application Support/Cursor/User/globalStorage/state.vscdb");
  }
  if (platform === "win32") {
    return join(process.env.APPDATA || home, "Cursor/User/globalStorage/state.vscdb");
  }
  return join(home, ".config/Cursor/User/globalStorage/state.vscdb");
}

export function getCursorVersion(): string {
  const now = Date.now();
  if (cachedVersion && now - cachedAt < CACHE_TTL_MS) {
    return cachedVersion;
  }

  try {
    const esmRequire = createRequire(import.meta.url);
    const Database = esmRequire("better-sqlite3");
    const db = new Database(getCursorDbPath(), { readonly: true, fileMustExist: true });
    try {
      const row = db.prepare("SELECT value FROM itemTable WHERE key = ?").get(DB_KEY) as
        | { value: string }
        | undefined;
      if (row?.value) {
        cachedVersion = row.value;
        cachedAt = now;
        return cachedVersion;
      }
    } finally {
      db.close();
    }
  } catch {
    // DB missing or unreadable — fall through to default
  }

  return FALLBACK_VERSION;
}

/** Exposed for testing: reset the in-memory cache so the next call re-reads the DB. */
export function resetCursorVersionCache(): void {
  cachedVersion = null;
  cachedAt = 0;
}
