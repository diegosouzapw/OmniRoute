import { access, constants, readFile } from "fs/promises";
import { homedir } from "os";
import { join } from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import type { SqliteAdapter } from "@/lib/db/adapters/types";

const execFileAsync = promisify(execFile);

/**
 * Probe dependencies for {@link verifyLinuxCursorInstalled}. Injectable so the
 * guard can be unit-tested without spawning a real `which` process or touching
 * the filesystem — mirrors the `__setExecFileImpl` pattern in
 * `src/lib/cli-helper/tool-detector.ts`.
 */
export interface CursorInstallProbe {
  /** Runs `which <binary>`; rejects when the binary is not on PATH. */
  execFile?: (
    file: string,
    args: string[],
    options: { timeout: number }
  ) => Promise<{ stdout: string; stderr: string }>;
  /** Resolves when the path is readable; rejects otherwise (e.g. `fs.access`). */
  access?: (path: string, mode: number) => Promise<void>;
  /** Override the home directory used to locate the `.desktop` fallback. */
  home?: string;
}

/**
 * On Linux, verify that the Cursor IDE is actually installed before trusting
 * leftover config files (state.vscdb). A removed Cursor install can leave its
 * `~/.config/Cursor/...` directory behind, which would otherwise trigger a
 * false-positive auto-import and create a phantom Cursor provider connection.
 *
 * The check prefers `which cursor` and falls back to a readable
 * `~/.local/share/applications/cursor.desktop` entry (the desktop launcher a
 * package install drops even when the CLI shim is not on PATH).
 *
 * Port of decolua/9router#313 — only the linux probe is added; macOS/Windows
 * keep their existing behavior (no install probe).
 */
export async function verifyLinuxCursorInstalled(probe: CursorInstallProbe = {}): Promise<boolean> {
  const exec = probe.execFile ?? execFileAsync;
  const canAccess = probe.access ?? access;
  const home = probe.home ?? homedir();

  try {
    await exec("which", ["cursor"], { timeout: 5000 });
    return true;
  } catch {
    try {
      const desktopFile = join(home, ".local/share/applications/cursor.desktop");
      await canAccess(desktopFile, constants.R_OK);
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Known key names Cursor IDE has used over time to persist the auth token
 * and machine id in the local `state.vscdb`. Order matters — the first
 * exact match wins.
 */
const ACCESS_TOKEN_KEYS = ["cursorAuth/accessToken", "cursorAuth/token"] as const;
const REFRESH_TOKEN_KEYS = ["cursorAuth/refreshToken"] as const;
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
  refreshToken?: string;
  machineId?: string;
}

/**
 * Pick the first matching access-token / refresh-token / machine-id from a
 * set of rows. Pure function — easy to unit-test without a SQLite handle.
 */
export function extractCursorTokensFromRows(rows: VscDbRow[]): ExtractedCursorTokens {
  const tokens: ExtractedCursorTokens = {};
  for (const row of rows) {
    if (!tokens.accessToken && (ACCESS_TOKEN_KEYS as readonly string[]).includes(row.key)) {
      const v = normalizeVscDbValue(row.value);
      if (typeof v === "string") tokens.accessToken = v;
    } else if (
      !tokens.refreshToken &&
      (REFRESH_TOKEN_KEYS as readonly string[]).includes(row.key)
    ) {
      const v = normalizeVscDbValue(row.value);
      if (typeof v === "string") tokens.refreshToken = v;
    } else if (!tokens.machineId && (MACHINE_ID_KEYS as readonly string[]).includes(row.key)) {
      const v = normalizeVscDbValue(row.value);
      if (typeof v === "string") tokens.machineId = v;
    }
  }
  return tokens;
}

/**
 * Fuzzy-match access-token / refresh-token / machine-id from any rows whose
 * key vaguely resembles the expected pattern (e.g.
 * `cursorAuth/someOtherAccessTokenKey`, `storage.someMachineId`). Used only
 * when the exact-key lookup yielded nothing — guards against silent breakage
 * when Cursor renames a key.
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
    if (!tokens.refreshToken && lower.includes("refreshtoken") && !lower.includes("accesstoken")) {
      tokens.refreshToken = value;
    }
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
 * Try to read credentials from cursor-agent's local auth state.
 *
 * Probes two known candidate locations, in order:
 *   1. `~/.config/cursor/auth.json` — written by `cursor-agent` CLI after
 *      login (the official curl-installer convention).
 *   2. `~/.cursor/agent-cli-state.json` — a second candidate this codebase's
 *      own `src/shared/services/cliRuntime.ts` (`CLI_TOOLS.cursor.paths.state`)
 *      already lists but did not previously probe for auth. If it lacks a
 *      usable `accessToken` string field, this candidate is skipped
 *      gracefully.
 *
 * KNOWN LIMITATION: some `cursor-agent` releases may store the access/refresh
 * token in the OS keychain instead of a locally-readable file. When neither
 * candidate above yields a token, this function correctly reports
 * `{found: false}` even if `cursor-agent status` reports the CLI as
 * authenticated — this is a documented, accepted gap (see the renewal plan's
 * "Trade-offs Accepted" section), not a silent bug. Confirmed, not just
 * hypothetical: empirically validated against a real, authenticated
 * `cursor-agent` install (v2026.07.23, Homebrew Cask `cursor-cli`) on
 * 2026-07-31 — that install's `~/.cursor/agent-cli-state.json` exists but its
 * actual schema is `{version, hasShownAgentCommandTip,
 * hasClearedLegacyStatsigFields}`, with no `accessToken` field at all, while
 * `cursor-agent status --format json` reported `isAuthenticated: true`. This
 * candidate is correctly skipped for that install; the graceful-degradation
 * fallback below is confirmed correct, not a gap in this specific case.
 */
export async function tryAgentAuth(): Promise<{
  found: boolean;
  accessToken?: string;
  source?: string;
  error?: string;
}> {
  const candidates = [
    join(homedir(), ".config", "cursor", "auth.json"),
    join(homedir(), ".cursor", "agent-cli-state.json"),
  ];

  for (const authPath of candidates) {
    try {
      const raw = await readFile(authPath, "utf-8");
      const auth = JSON.parse(raw);
      if (auth.accessToken && typeof auth.accessToken === "string") {
        return { found: true, accessToken: auth.accessToken, source: "cursor-agent" };
      }
      // Schema differs from what this candidate is expected to hold — fall
      // through to the next candidate rather than treating it as found.
    } catch {
      // Not found or unreadable — continue probing the next candidate.
    }
  }

  return { found: false, error: "cursor-agent auth.json not found" };
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
 *
 * `options.timeoutMs` bounds the SQLite busy-timeout on the open (default
 * 2000ms, byte-identical for existing callers). The unattended sweep path
 * (`src/lib/cursor/renewal.ts`) passes a much shorter override — an
 * automated background job that fails to acquire the lock quickly should
 * fail fast and let the existing exponential circuit-breaker retry on a
 * later tick, rather than blocking the shared Node event loop for up to
 * ~2s per driver in the fallback cascade (worst case ~4s: better-sqlite3's
 * busy-timeout elapsing, then node:sqlite's). The one-shot, user-initiated
 * `/api/oauth/cursor/auto-import` modal action keeps the longer default,
 * since a single explicit click reasonably can wait longer for a better
 * one-time success rate.
 */
export async function tryIdeAuth(options?: { timeoutMs?: number }): Promise<{
  found: boolean;
  accessToken?: string;
  refreshToken?: string;
  machineId?: string;
  source?: string;
  error?: string;
}> {
  const timeoutMs = options?.timeoutMs ?? 2000;
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
    // On Linux, verify Cursor is actually installed before trusting leftover
    // config files — a removed install can leave ~/.config/Cursor behind and
    // would otherwise create a phantom Cursor connection (port: 9router#313).
    if (platform === "linux" && !(await verifyLinuxCursorInstalled())) {
      return {
        found: false,
        error:
          "Cursor config files found but Cursor IDE does not appear to be " +
          "installed. Skipping auto-import.",
      };
    }
    dbPath = candidates[0];
  }

  let db: SqliteAdapter | null;
  try {
    const { tryOpenSync } = await import("@/lib/db/adapters/driverFactory");
    // Bounded busy-timeout: tryIdeAuth() is now also called from an unattended
    // sweep tick (src/lib/cursor/renewal.ts::renewCursorConnection()) on every
    // near-expiry cycle, not just the explicit auto-import modal action, so a
    // WAL-lock collision with a running Cursor IDE needs a retry window on
    // every driver path (see driverFactory.ts::toNodeSqliteOptions()). The
    // sweep path overrides `timeoutMs` to a much shorter value (see the
    // options.timeoutMs doc comment above).
    db = tryOpenSync(dbPath, { readonly: true, fileMustExist: true, timeout: timeoutMs });
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
    const desiredKeys = [...ACCESS_TOKEN_KEYS, ...REFRESH_TOKEN_KEYS, ...MACHINE_ID_KEYS];
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
      refreshToken: tokens.refreshToken,
      machineId: tokens.machineId,
      source: "cursor-ide",
    };
  } catch (error) {
    db?.close();
    console.error("Failed to read Cursor IDE database:", error);
    return { found: false, error: "Failed to read database" };
  }
}
