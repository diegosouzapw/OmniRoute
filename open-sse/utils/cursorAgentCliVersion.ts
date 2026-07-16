/**
 * Cursor Agent CLI version for AgentService/Run impersonation.
 *
 * Wire header: `x-cursor-client-version: cli-${id}` where `id` is a dated
 * build like `2026.07.08-0c04a8a` (not the IDE `3.x` semver).
 *
 * Resolution: CURSOR_AGENT_CLI_VERSION env → local install detect → pin.
 */

import { existsSync, lstatSync, readdirSync, realpathSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

/**
 * Pinned Agent CLI build id used when no local install is found (typical
 * headless OmniRoute). Bump when refreshing Cursor CLI impersonation.
 */
export const CURSOR_AGENT_CLI_VERSION = "2026.07.08-0c04a8a";

const VERSION_ID_RE = /^\d{4}\.\d{2}\.\d{2}-[0-9a-f]+$/;
const CACHE_TTL_MS = 60 * 60 * 1000;

let cachedVersion: string | null = null;
let cachedAt = 0;

export function isCursorAgentCliVersionId(value: string): boolean {
  return VERSION_ID_RE.test(value);
}

export function formatCursorAgentClientVersion(id: string): string {
  return `cli-${id}`;
}

/** Extract `versions/<id>` from a resolved agent binary path. */
export function extractVersionIdFromResolvedPath(resolvedPath: string): string | null {
  const parts = resolvedPath.split(/[/\\]/);
  const versionsIdx = parts.lastIndexOf("versions");
  if (versionsIdx < 0 || versionsIdx + 1 >= parts.length) return null;
  const id = parts[versionsIdx + 1];
  return isCursorAgentCliVersionId(id) ? id : null;
}

export function newestVersionInDir(versionsDir: string): string | null {
  try {
    if (!existsSync(versionsDir)) return null;
    const matches = readdirSync(versionsDir)
      .filter((name) => {
        if (!isCursorAgentCliVersionId(name)) return false;
        try {
          return lstatSync(join(versionsDir, name)).isDirectory();
        } catch {
          return false;
        }
      })
      .sort();
    return matches.length > 0 ? matches[matches.length - 1] : null;
  } catch {
    return null;
  }
}

function versionFromShim(shimPath: string): string | null {
  try {
    if (!existsSync(shimPath)) return null;
    const resolved = realpathSync(shimPath);
    return extractVersionIdFromResolvedPath(resolved);
  } catch {
    return null;
  }
}

function defaultVersionsDir(home: string): string {
  if (process.platform === "win32") {
    const localAppData = process.env.LOCALAPPDATA || join(home, "AppData", "Local");
    return join(localAppData, "cursor-agent", "versions");
  }
  return join(home, ".local", "share", "cursor-agent", "versions");
}

/**
 * Detect an installed Agent CLI build id from the filesystem.
 * @param home - injectable home for tests (defaults to os.homedir())
 */
export function detectCursorAgentCliVersionFromFs(home: string = homedir()): string | null {
  const localBin = join(home, ".local", "bin");
  for (const name of ["agent", "cursor-agent"]) {
    const fromShim = versionFromShim(join(localBin, name));
    if (fromShim) return fromShim;
  }

  const dataDir = process.env.CURSOR_DATA_DIR;
  const versionsDir = dataDir ? join(dataDir, "versions") : defaultVersionsDir(home);
  return newestVersionInDir(versionsDir);
}

export function getCursorAgentCliVersion(): string {
  const now = Date.now();
  if (cachedVersion && now - cachedAt < CACHE_TTL_MS) {
    return cachedVersion;
  }

  const fromEnv = process.env.CURSOR_AGENT_CLI_VERSION?.trim();
  if (fromEnv && isCursorAgentCliVersionId(fromEnv)) {
    cachedVersion = fromEnv;
    cachedAt = now;
    return cachedVersion;
  }

  const home = process.env.HOME || process.env.USERPROFILE || homedir();
  const fromFs = detectCursorAgentCliVersionFromFs(home);
  if (fromFs) {
    cachedVersion = fromFs;
    cachedAt = now;
    return cachedVersion;
  }

  return CURSOR_AGENT_CLI_VERSION;
}

/** Exposed for testing: reset the in-memory cache. */
export function resetCursorAgentCliVersionCache(): void {
  cachedVersion = null;
  cachedAt = 0;
}
