/**
 * Cursor Agent CLI version for AgentService/Run impersonation.
 *
 * Wire header: `x-cursor-client-version: cli-${id}` where `id` is a dated
 * build like `2026.07.08-0c04a8a` (not the IDE `3.x` semver).
 *
 * Resolution: CURSOR_AGENT_CLI_VERSION env → local install detect →
 * disk-cached installer scrape (stale-while-revalidate) → pin.
 */

import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import { CURSOR_AGENT_CLI_VERSION } from "./cursorAgentCliVersionPin.ts";
export { CURSOR_AGENT_CLI_VERSION };

const VERSION_ID_RE = /^\d{4}\.\d{2}\.\d{2}-[0-9a-f]+$/;
const CACHE_TTL_MS = 60 * 60 * 1000;
const INSTALL_URL = "https://cursor.com/install";
const REMOTE_TIMEOUT_MS = 5_000;
const VERSION_CACHE_FILE = "cursor-agent-cli-version.json";

let cachedVersion: string | null = null;
let cachedAt = 0;
let remoteRefreshInFlight: Promise<void> | null = null;
let remoteRefreshScheduled = false;

/** Test seam: override fetch for installer scrape. */
let fetchImpl: typeof fetch = fetch;
/** Test seam: override disk cache directory. */
let cacheDirOverride: string | null = null;

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
    // Prefer newest mtime (oakimov), break ties with lexicographic id.
    let newest: { name: string; mtimeMs: number } | null = null;
    for (const name of readdirSync(versionsDir)) {
      if (!isCursorAgentCliVersionId(name)) continue;
      try {
        const st = lstatSync(join(versionsDir, name));
        if (!st.isDirectory()) continue;
        const mtimeMs = st.mtimeMs;
        if (
          !newest ||
          mtimeMs > newest.mtimeMs ||
          (mtimeMs === newest.mtimeMs && name > newest.name)
        ) {
          newest = { name, mtimeMs };
        }
      } catch {
        /* skip vanished entries */
      }
    }
    return newest?.name ?? null;
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

type DiskVersionCache = { version: string; fetchedAt: number };

function resolveCacheDir(): string {
  if (cacheDirOverride) return cacheDirOverride;
  const dataDir = process.env.DATA_DIR?.trim();
  if (dataDir) return join(dataDir, "cache");
  return join(homedir(), ".omniroute", "cache");
}

function versionCachePath(): string {
  return join(resolveCacheDir(), VERSION_CACHE_FILE);
}

export function extractVersionIdFromInstallerScript(script: string): string | null {
  const match = script.match(/downloads\.cursor\.com\/lab\/([^/"'\s]+)\//);
  if (!match) return null;
  const id = match[1];
  return isCursorAgentCliVersionId(id) ? id : null;
}

function readDiskVersionCache(): DiskVersionCache | null {
  try {
    const raw = JSON.parse(readFileSync(versionCachePath(), "utf8")) as Record<string, unknown>;
    if (typeof raw.version !== "string" || !isCursorAgentCliVersionId(raw.version)) return null;
    if (typeof raw.fetchedAt !== "number" || !Number.isFinite(raw.fetchedAt)) return null;
    return { version: raw.version, fetchedAt: raw.fetchedAt };
  } catch {
    return null;
  }
}

function writeDiskVersionCache(cache: DiskVersionCache): void {
  try {
    const dir = resolveCacheDir();
    mkdirSync(dir, { recursive: true });
    writeFileSync(versionCachePath(), JSON.stringify(cache, null, 2));
  } catch {
    // Cache writes are best-effort.
  }
}

async function fetchInstallerVersionId(): Promise<string | null> {
  const response = await fetchImpl(INSTALL_URL, {
    signal: AbortSignal.timeout(REMOTE_TIMEOUT_MS),
  });
  if (!response.ok) return null;
  const text = await response.text();
  return extractVersionIdFromInstallerScript(text);
}

function scheduleRemoteVersionRefresh(): void {
  if (remoteRefreshInFlight || remoteRefreshScheduled) return;
  // Defer so sync header resolution never starts network in the same turn.
  remoteRefreshScheduled = true;
  setTimeout(() => {
    remoteRefreshScheduled = false;
    if (remoteRefreshInFlight) return;
    remoteRefreshInFlight = (async () => {
      try {
        const id = await fetchInstallerVersionId();
        if (id) writeDiskVersionCache({ version: id, fetchedAt: Date.now() });
      } catch {
        // Ignore — pin / stale cache remain valid.
      } finally {
        remoteRefreshInFlight = null;
      }
    })();
  }, 0);
}

/**
 * Resolve CLI build id synchronously for request headers.
 * Env → local FS → disk cache (refresh in background if stale) → pin.
 */
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

  const disk = readDiskVersionCache();
  if (disk) {
    cachedVersion = disk.version;
    cachedAt = now;
    // Stale-while-revalidate (oakimov): always serve disk cache; refresh in
    // background when fresh (keep warm) or stale.
    scheduleRemoteVersionRefresh();
    return cachedVersion;
  }

  scheduleRemoteVersionRefresh();
  return CURSOR_AGENT_CLI_VERSION;
}

/**
 * Await a remote installer scrape (tests / warm-up). Writes disk cache on success.
 */
export async function refreshCursorAgentCliVersionFromInstaller(): Promise<string | null> {
  try {
    const id = await fetchInstallerVersionId();
    if (id) {
      writeDiskVersionCache({ version: id, fetchedAt: Date.now() });
      cachedVersion = id;
      cachedAt = Date.now();
      return id;
    }
  } catch {
    /* ignore */
  }
  return null;
}

/** Exposed for testing: reset the in-memory cache. */
export function resetCursorAgentCliVersionCache(): void {
  cachedVersion = null;
  cachedAt = 0;
  remoteRefreshInFlight = null;
  remoteRefreshScheduled = false;
}

/** Exposed for testing: inject fetch + cache dir. */
export function configureCursorAgentCliVersionForTests(options: {
  fetchImpl?: typeof fetch;
  cacheDir?: string | null;
}): void {
  if (options.fetchImpl) fetchImpl = options.fetchImpl;
  if (options.cacheDir !== undefined) cacheDirOverride = options.cacheDir;
}

export function resetCursorAgentCliVersionTestHooks(): void {
  fetchImpl = fetch;
  cacheDirOverride = null;
  resetCursorAgentCliVersionCache();
}
