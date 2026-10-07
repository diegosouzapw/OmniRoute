/**
 * Cursor Agent CLI version for AgentService/Run impersonation.
 *
 * Wire header: `x-cursor-client-version: cli-${id}` where `id` is a dated
 * build like `2026.07.08-0c04a8a` (not the IDE `3.x` semver).
 *
 * Resolution: CURSOR_AGENT_CLI_VERSION env, then local install detect,
 * then a disk-cached installer scrape (stale-while-revalidate), then the pin.
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
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const INSTALL_URL = "https://cursor.com/install";
const REMOTE_TIMEOUT_MS = 20_000;
const VERSION_CACHE_FILE = "cursor-agent-cli-version.json";

let cachedVersion: string | null = null;
let cachedAt = 0;
let remoteRefreshInFlight: Promise<string | null> | null = null;

/** Test seam: override fetch for installer scrape. */
let fetchImpl: typeof fetch = fetch;
/** Test seam: override disk cache directory. */
let cacheDirOverride: string | null = null;

export function isCursorAgentCliVersionId(value: string): boolean {
  return VERSION_ID_RE.test(value);
}

/** Calendar date embedded in a `YYYY.MM.DD-<hash>` build id, or null. */
export function cursorAgentCliVersionDate(id: string): string | null {
  if (!isCursorAgentCliVersionId(id)) return null;
  return id.slice(0, 10);
}

/**
 * Prefer `candidate` only when its date is strictly later than `floor`.
 * A missing, invalid, or older-or-equal candidate keeps the floor (the pin).
 */
export function preferNewerCursorAgentCliVersion(floor: string, candidate: string | null): string {
  if (!candidate || !isCursorAgentCliVersionId(candidate)) return floor;
  const floorDate = cursorAgentCliVersionDate(floor);
  const candidateDate = cursorAgentCliVersionDate(candidate);
  if (!floorDate || !candidateDate || candidateDate <= floorDate) return floor;
  return candidate;
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
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REMOTE_TIMEOUT_MS);
  try {
    const response = await fetchImpl(INSTALL_URL, {
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const text = await response.text();
    return extractVersionIdFromInstallerScript(text);
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

function ensureRemoteVersion(): Promise<string | null> {
  if (remoteRefreshInFlight) return remoteRefreshInFlight;
  remoteRefreshInFlight = (async () => {
    const id = await fetchInstallerVersionId();
    if (id) writeDiskVersionCache({ version: id, fetchedAt: Date.now() });
    return id;
  })().finally(() => {
    remoteRefreshInFlight = null;
  });
  return remoteRefreshInFlight;
}

function resolveLocalCursorAgentCliVersion(now: number): string | null {
  const fromEnv = process.env.CURSOR_AGENT_CLI_VERSION?.trim();
  if (fromEnv && isCursorAgentCliVersionId(fromEnv)) return fromEnv;

  const home = process.env.HOME || process.env.USERPROFILE || homedir();
  const fromFs = detectCursorAgentCliVersionFromFs(home);
  if (fromFs) return fromFs;

  const disk = readDiskVersionCache();
  if (disk && now - disk.fetchedAt < CACHE_TTL_MS) {
    return preferNewerCursorAgentCliVersion(CURSOR_AGENT_CLI_VERSION, disk.version);
  }
  return null;
}

/**
 * CLI build id for `x-cursor-client-version`.
 * Env and a local install win. Otherwise https://cursor.com/install is fetched
 * (20s timeout, cached 6h) and used only when its date is strictly later than
 * the pin. A rejected or unusable fetch keeps the pin.
 */
export async function getCursorAgentCliVersion(): Promise<string> {
  const now = Date.now();
  if (cachedVersion && now - cachedAt < CACHE_TTL_MS) {
    return cachedVersion;
  }

  const local = resolveLocalCursorAgentCliVersion(now);
  if (local && local !== CURSOR_AGENT_CLI_VERSION) {
    cachedVersion = local;
    cachedAt = now;
    return cachedVersion;
  }

  const disk = readDiskVersionCache();
  if (disk && now - disk.fetchedAt < CACHE_TTL_MS) {
    const cached = preferNewerCursorAgentCliVersion(CURSOR_AGENT_CLI_VERSION, disk.version);
    if (cached !== CURSOR_AGENT_CLI_VERSION) {
      cachedVersion = cached;
      cachedAt = now;
      return cached;
    }
  }

  // Do not block the request on the installer scrape. Use the disk cache or
  // the pin now, and let the fetch land for the next call.
  if (!process.env.NODE_TEST_CONTEXT) void ensureRemoteVersion().catch(() => null);
  const resolved = preferNewerCursorAgentCliVersion(
    CURSOR_AGENT_CLI_VERSION,
    disk?.version ?? null
  );
  cachedVersion = resolved;
  cachedAt = Date.now();
  return resolved;
}

/**
 * Await a remote installer scrape (tests / warm-up). Writes disk cache on success.
 */
export async function refreshCursorAgentCliVersionFromInstaller(): Promise<string | null> {
  const id = await fetchInstallerVersionId();
  if (!id) return null;
  const resolved = preferNewerCursorAgentCliVersion(CURSOR_AGENT_CLI_VERSION, id);
  writeDiskVersionCache({ version: resolved, fetchedAt: Date.now() });
  cachedVersion = resolved;
  cachedAt = Date.now();
  return resolved;
}

/** Exposed for testing: reset the in-memory cache. */
export function resetCursorAgentCliVersionCache(): void {
  cachedVersion = null;
  cachedAt = 0;
  remoteRefreshInFlight = null;
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
