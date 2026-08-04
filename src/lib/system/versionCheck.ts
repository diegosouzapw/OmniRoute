/**
 * Latest-version discovery + comparison for the dashboard "Update Available" banner.
 *
 * #4100: the banner is gated on `isNewer(latest, current)`. Previously `latest` came
 * ONLY from `npm info omniroute version --json` (the `npm` CLI binary). When that binary
 * is absent (Docker / desktop / locked-down installs) or the registry is unreachable, the
 * call returned null and the banner silently never rendered — even when an update existed.
 *
 * This module keeps the fast `npm` CLI path as the primary source but adds two
 * npm-binary-free HTTP fallbacks, reachable with plain `fetch`:
 *   1. the npm registry JSON API (`registry.npmjs.org`), then
 *   2. the GitHub releases API (`api.github.com/.../releases/latest`) — the source the
 *      issue itself suggested, and the only one that still works on networks that reach
 *      GitHub (the same host `getNews()` already pulls from) but block the npm registry.
 * It logs a warning instead of degrading silently when ALL sources fail. Version parsing
 * is also hardened so a `v`-prefix or pre-release suffix no longer collapses the
 * comparison to `false` via `NaN`.
 */
import { execFile } from "child_process";
import { promisify } from "util";
import { createLogger } from "@/shared/utils/logger";
import { buildNpmExecOptions } from "@/lib/services/installers/utils";

const execFileAsync = promisify(execFile);
const log = createLogger("system/versionCheck");

/** npm-binary-free latest-version source: the registry JSON API. */
const NPM_REGISTRY_LATEST_URL = "https://registry.npmjs.org/omniroute/latest";

/**
 * Second npm-binary-free source: the GitHub releases API. Works on networks that allow
 * GitHub (where `getNews()` already succeeds) but block the npm registry — the most likely
 * surviving cause of "#4100 still not fixed" after the registry fallback shipped in v3.8.28.
 */
const GITHUB_RELEASES_LATEST_URL =
  "https://api.github.com/repos/diegosouzapw/OmniRoute/releases/latest";

const LOOKUP_TIMEOUT_MS = 10_000;
const MAX_VERSION_RESPONSE_BYTES = 16 * 1024;
const LATEST_VERSION_CACHE_TTL_MS = 10 * 60_000;
const MAX_LATEST_VERSION_CACHE_TTL_MS = 10 * 60_000;

type LatestVersionCacheEntry = { value: string; expiresAt: number };

let latestVersionCache: LatestVersionCacheEntry | null = null;
let latestVersionLookup: Promise<string | null> | null = null;
let latestVersionRefresh: Promise<string | null> | null = null;
let latestVersionCacheGeneration = 0;

// The pure semver helpers live in `./versionCompare` (dependency-free) so
// client-reachable modules can import them without pulling this file's
// server-only `child_process` import into the browser bundle. Re-exported here
// for back-compat with existing server-side importers.
export { normalizeVersion, isNewer } from "./versionCompare";

/** Latest published version via the `npm` CLI (fast when npm is on PATH, e.g. source installs). */
export async function getLatestVersionFromNpmCli(): Promise<string | null> {
  try {
    // #5542 — win32 npm is npm.cmd; execFile without a shell throws "spawn npm ENOENT"
    // on Node ≥24 (nodejs/node#52554). buildNpmExecOptions enables the shell on win32.
    const { stdout } = await execFileAsync(
      "npm",
      ["info", "omniroute", "version", "--json"],
      buildNpmExecOptions(process.platform, { timeoutMs: LOOKUP_TIMEOUT_MS })
    );
    const parsed = JSON.parse(String(stdout).trim());
    return typeof parsed === "string" && parsed ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Latest published version via the npm registry HTTP API. Needs only network access — no
 * `npm` binary — so it works in Docker / desktop / locked-down installs.
 */
async function readBoundedJson(response: Response): Promise<unknown> {
  const declaredLength = Number(response.headers.get("Content-Length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_VERSION_RESPONSE_BYTES) {
    await response.body?.cancel();
    throw new Error("Version metadata response is too large");
  }

  if (!response.body) return response.json();
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_VERSION_RESPONSE_BYTES) {
        await reader.cancel();
        throw new Error("Version metadata response is too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(body));
}

export async function getLatestVersionFromRegistry(
  fetchImpl: typeof fetch = fetch
): Promise<string | null> {
  try {
    const res = await fetchImpl(NPM_REGISTRY_LATEST_URL, {
      signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    const data = (await readBoundedJson(res)) as { version?: unknown };
    return typeof data?.version === "string" && data.version ? data.version : null;
  } catch {
    return null;
  }
}

/**
 * Latest published version via the GitHub releases API. Needs only network access to
 * GitHub — no `npm` binary and no npm registry — so it covers installs that reach GitHub
 * (the same host `getNews()` pulls from) but cannot reach `registry.npmjs.org`. Reads the
 * `tag_name` of the latest release (e.g. `v3.8.39`); `normalizeVersion`/`isNewer` tolerate
 * the `v` prefix downstream.
 */
export async function getLatestVersionFromGitHub(
  fetchImpl: typeof fetch = fetch
): Promise<string | null> {
  try {
    const res = await fetchImpl(GITHUB_RELEASES_LATEST_URL, {
      signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS),
      headers: {
        // GitHub's API rejects requests without a User-Agent.
        "User-Agent": "omniroute-version-check",
        Accept: "application/vnd.github+json",
      },
    });
    if (!res.ok) return null;
    const data = (await readBoundedJson(res)) as { tag_name?: unknown };
    return typeof data?.tag_name === "string" && data.tag_name ? data.tag_name : null;
  } catch {
    return null;
  }
}

/**
 * Resolve the latest published version. Tries the `npm` CLI first (fast on source installs),
 * then the registry HTTP API, then the GitHub releases API — both npm-binary-free. Logs a
 * warning — instead of silently degrading to "no update available" — when ALL sources fail.
 * Thunks are injectable for tests.
 */
export function clearLatestVersionCache(): void {
  latestVersionCache = null;
  latestVersionCacheGeneration += 1;
}

/** Coalesce and briefly cache successful latest-version lookups. */
export async function resolveLatestVersionCached(opts?: {
  lookup?: () => Promise<string | null>;
  bypassCache?: boolean;
  storeResult?: boolean;
  now?: () => number;
  ttlMs?: number;
}): Promise<string | null> {
  const now = opts?.now ?? Date.now;
  if (!opts?.bypassCache && latestVersionCache?.expiresAt > now()) {
    return latestVersionCache.value;
  }

  const inFlight = opts?.bypassCache ? latestVersionRefresh : latestVersionLookup;
  if (inFlight) return inFlight;
  if (opts?.bypassCache) clearLatestVersionCache();

  const generation = latestVersionCacheGeneration;
  const lookup = opts?.lookup ?? resolveLatestVersion;
  const ttlMs = Math.min(
    Math.max(opts?.ttlMs ?? LATEST_VERSION_CACHE_TTL_MS, 0),
    MAX_LATEST_VERSION_CACHE_TTL_MS
  );
  const pending = lookup().then((value) => {
    if (value && opts?.storeResult !== false && latestVersionCacheGeneration === generation) {
      latestVersionCache = { value, expiresAt: now() + ttlMs };
    }
    return value;
  });
  if (opts?.bypassCache) latestVersionRefresh = pending;
  else latestVersionLookup = pending;

  try {
    return await pending;
  } finally {
    if (latestVersionLookup === pending) latestVersionLookup = null;
    if (latestVersionRefresh === pending) latestVersionRefresh = null;
  }
}

export async function resolveLatestVersion(opts?: {
  npmCli?: () => Promise<string | null>;
  registry?: () => Promise<string | null>;
  github?: () => Promise<string | null>;
}): Promise<string | null> {
  const npmCli = opts?.npmCli ?? getLatestVersionFromNpmCli;
  const registry = opts?.registry ?? (() => getLatestVersionFromRegistry());
  const github = opts?.github ?? (() => getLatestVersionFromGitHub());

  const viaCli = await npmCli();
  if (viaCli) return viaCli;

  const viaRegistry = await registry();
  if (viaRegistry) return viaRegistry;

  const viaGitHub = await github();
  if (viaGitHub) return viaGitHub;

  log.warn(
    "Latest-version lookup failed via npm CLI, registry HTTP, and GitHub releases — the update banner will not show even if a newer release exists"
  );
  return null;
}
