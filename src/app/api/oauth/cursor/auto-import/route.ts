import { NextResponse } from "next/server";
import { access, constants, readFile } from "fs/promises";
import { homedir } from "os";
import { join } from "path";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";

/**
 * Known key names Cursor IDE has used over time to persist the auth token
 * and machine id in the local `state.vscdb`. Order matters — the first
 * exact match wins.
 */
const ACCESS_TOKEN_KEYS = ["cursorAuth/accessToken", "cursorAuth/token"] as const;
const MACHINE_ID_KEYS = [
  "storage.serviceMachineId",
  "storage.machineId",
  "telemetry.machineId",
] as const;

/**
 * Normalize a value read from Cursor's `state.vscdb`. Some entries are
 * stored as JSON-encoded strings (e.g. `'"abc"'`) — unwrap one level when
 * the decoded payload is itself a string. Anything else is returned as-is.
 */
export function normalizeVscDbValue<T>(value: T): T | string {
  if (typeof value !== "string") return value;
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "string" ? parsed : value;
  } catch {
    return value;
  }
}

interface VscDbRow {
  key: string;
  value: string;
}

interface ExtractedCursorTokens {
  accessToken?: string;
  machineId?: string;
}

/**
 * Pick the first matching access-token / machine-id from a set of rows.
 * Pure function — easy to unit-test without a SQLite handle.
 */
export function extractCursorTokensFromRows(rows: VscDbRow[]): ExtractedCursorTokens {
  const tokens: ExtractedCursorTokens = {};
  for (const row of rows) {
    if (!tokens.accessToken && (ACCESS_TOKEN_KEYS as readonly string[]).includes(row.key)) {
      const v = normalizeVscDbValue(row.value);
      if (typeof v === "string") tokens.accessToken = v;
    } else if (!tokens.machineId && (MACHINE_ID_KEYS as readonly string[]).includes(row.key)) {
      const v = normalizeVscDbValue(row.value);
      if (typeof v === "string") tokens.machineId = v;
    }
  }
  return tokens;
}

/**
 * Fuzzy-match access-token / machine-id from any rows whose key vaguely
 * resembles the expected pattern (e.g. `cursorAuth/someOtherAccessTokenKey`,
 * `storage.someMachineId`). Used only when the exact-key lookup yielded
 * nothing — guards against silent breakage when Cursor renames a key.
 */
export function fuzzyExtractCursorTokensFromRows(
  rows: VscDbRow[],
  existing: ExtractedCursorTokens = {}
): ExtractedCursorTokens {
  const tokens: ExtractedCursorTokens = { ...existing };
  for (const row of rows) {
    const key = row.key || "";
    const lower = key.toLowerCase();
    const value = normalizeVscDbValue(row.value);
    if (typeof value !== "string") continue;
    if (!tokens.accessToken && lower.includes("accesstoken")) tokens.accessToken = value;
    if (!tokens.machineId && lower.includes("machineid")) tokens.machineId = value;
  }
  return tokens;
}

/**
 * Resolve the candidate state.vscdb paths to probe for a given platform.
 * macOS now probes both the standard install and the Insiders channel
 * (port: 9router#161 — fixes false "Cursor database not found" on Macs
 * that only have Cursor Insiders installed).
 */
export function cursorDbCandidatePaths(
  platform: NodeJS.Platform,
  env: { home: string; appdata?: string }
): string[] {
  if (platform === "darwin") {
    return [
      join(env.home, "Library/Application Support/Cursor/User/globalStorage/state.vscdb"),
      join(
        env.home,
        "Library/Application Support/Cursor - Insiders/User/globalStorage/state.vscdb"
      ),
    ];
  }
  if (platform === "linux") {
    return [join(env.home, ".config/Cursor/User/globalStorage/state.vscdb")];
  }
  if (platform === "win32") {
    return [join(env.appdata || "", "Cursor/User/globalStorage/state.vscdb")];
  }
  return [];
}

/**
 * Try to read credentials from cursor-agent's auth.json
 * (written by `cursor-agent` CLI after login).
 */
async function tryAgentAuth(): Promise<{
  found: boolean;
  accessToken?: string;
  source?: string;
  error?: string;
}> {
  try {
    const authPath = join(homedir(), ".config", "cursor", "auth.json");
    const raw = await readFile(authPath, "utf-8");
    const auth = JSON.parse(raw);
    if (auth.accessToken && typeof auth.accessToken === "string") {
      return { found: true, accessToken: auth.accessToken, source: "cursor-agent" };
    }
    return { found: false, error: "cursor-agent auth.json has no accessToken" };
  } catch {
    return { found: false, error: "cursor-agent auth.json not found" };
  }
}

/**
 * Try to read credentials from Cursor IDE's state.vscdb.
 *
 * On macOS this probes both `Cursor/` and `Cursor - Insiders/`, returns a
 * descriptive error if the DB exists but cannot be opened (e.g. WAL lock
 * because Cursor is currently running), tries multiple known key names,
 * normalizes JSON-encoded string values, and falls back to a fuzzy LIKE
 * lookup if exact keys are missing — guards against silent breakage when
 * Cursor renames a key in a future release.
 *
 * Linux and Windows code paths are unchanged.
 */
async function tryIdeAuth(): Promise<{
  found: boolean;
  accessToken?: string;
  machineId?: string;
  source?: string;
  error?: string;
}> {
  const platform = process.platform;
  const candidates = cursorDbCandidatePaths(platform, {
    home: homedir(),
    appdata: process.env.APPDATA,
  });

  if (candidates.length === 0) {
    return { found: false, error: "Unsupported platform" };
  }

  // Probe candidates (matters on macOS where there can be >1; on linux/win32
  // there is exactly one and we skip the probe to preserve the original
  // error message).
  let dbPath: string | undefined;
  if (platform === "darwin") {
    for (const path of candidates) {
      try {
        await access(path, constants.R_OK);
        dbPath = path;
        break;
      } catch {
        // continue probing
      }
    }
    if (!dbPath) {
      return {
        found: false,
        error:
          "Cursor database not found in known macOS locations. " +
          "Make sure Cursor IDE is installed and opened at least once.",
      };
    }
  } else {
    dbPath = candidates[0];
  }

  let db;
  try {
    const { tryOpenSync } = await import("@/lib/db/adapters/driverFactory");
    db = tryOpenSync(dbPath, { readonly: true, fileMustExist: true });
    if (!db) {
      if (platform === "darwin") {
        return {
          found: false,
          error: `Found Cursor database at ${dbPath} but could not open it (driver unavailable)`,
        };
      }
      return { found: false, error: "Cursor IDE database driver unavailable" };
    }
  } catch (error) {
    if (platform === "darwin") {
      const message = error instanceof Error ? error.message : String(error);
      return {
        found: false,
        error: `Found Cursor database at ${dbPath} but could not open it: ${message}`,
      };
    }
    return { found: false, error: "Cursor IDE database not found" };
  }

  try {
    const desiredKeys = [...ACCESS_TOKEN_KEYS, ...MACHINE_ID_KEYS];
    const placeholders = desiredKeys.map(() => "?").join(",");
    const rows = db
      .prepare(`SELECT key, value FROM itemTable WHERE key IN (${placeholders})`)
      .all(...desiredKeys) as VscDbRow[];

    let tokens = extractCursorTokensFromRows(rows);

    // Fuzzy fallback: only on macOS — original report (and observed schema
    // drift) is on darwin; other platforms keep exact-key behavior.
    if (platform === "darwin" && (!tokens.accessToken || !tokens.machineId)) {
      const fallbackRows = db
        .prepare(
          "SELECT key, value FROM itemTable " +
            "WHERE key LIKE '%cursorAuth/%' " +
            "OR key LIKE '%machineId%' " +
            "OR key LIKE '%serviceMachineId%'"
        )
        .all() as VscDbRow[];
      tokens = fuzzyExtractCursorTokensFromRows(fallbackRows, tokens);
    }

    db.close();

    if (!tokens.accessToken) {
      return { found: false, error: "Tokens not found in database" };
    }

    return {
      found: true,
      accessToken: tokens.accessToken,
      machineId: tokens.machineId,
      source: "cursor-ide",
    };
  } catch (error) {
    db?.close();
    console.error("Failed to read Cursor IDE database:", error);
    return { found: false, error: "Failed to read database" };
  }
}

/**
 * GET /api/oauth/cursor/auto-import
 * Auto-detect and extract Cursor tokens from:
 *   1. Cursor IDE's local SQLite database (state.vscdb) — includes machineId
 *   2. cursor-agent CLI's auth.json — fallback, no machineId
 *
 * 🔒 Auth-guarded: requires JWT cookie or Bearer API key (finding #258-4).
 */
export async function GET(request: Request) {
  if (await isAuthRequired(request)) {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    // Try Cursor IDE first (has both accessToken and machineId)
    const ideResult = await tryIdeAuth();
    if (ideResult.found) {
      return NextResponse.json({
        found: true,
        accessToken: ideResult.accessToken,
        machineId: ideResult.machineId,
        source: ideResult.source,
      });
    }

    // Fall back to cursor-agent CLI auth (accessToken only, no machineId)
    const agentResult = await tryAgentAuth();
    if (agentResult.found) {
      return NextResponse.json({
        found: true,
        accessToken: agentResult.accessToken,
        source: agentResult.source,
      });
    }

    return NextResponse.json({
      found: false,
      error: "No Cursor credentials found. Install Cursor IDE or login with cursor-agent.",
    });
  } catch (error) {
    console.error("Cursor auto-import error:", error);
    return NextResponse.json({ found: false, error: "Internal server error" }, { status: 500 });
  }
}
