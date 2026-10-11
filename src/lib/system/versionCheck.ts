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
// Bound on the version-metadata responses, so a misdirected or hostile URL
// cannot make the banner pin memory. It has to sit ABOVE what the two HTTP
// sources really send, or the fallbacks can never succeed at all: measured on
// 2026-09-21 from the published package, the registry per-version document is
// 29,609 bytes (it embeds the README) and GitHub's latest-release payload is
// 154,002 bytes (its `assets` array). The old 16 KiB cap was below both, so
// each body was cancelled mid-read, the throw was swallowed by the local
// `catch`, and both paths returned null -- the #14339 "unavailable" banner.
// 1 MiB keeps a real ceiling (~7x the largest observed payload) without
// pretending to parse unbounded input.
const MAX_VERSION_RESPONSE_BYTES = 1024 * 1024;
const LATEST_VERSION_CACHE_TTL_MS = 10 * 60_000;
const MAX_LATEST_VERSION_CACHE_TTL_MS = 10 * 60_000;

/** npm-binary-free dist-tags source: `{ latest, next, nightly, lts, … }`. */
const NPM_REGISTRY_DIST_TAGS_URL = "https://registry.npmjs.org/-/package/omniroute/dist-tags";

/** Dist-tags surfaced by `GET /api/system/version` (docs/ops/RELEASE_STRATEGY.md). */
const RELEASE_DIST_TAGS = ["latest", "next", "nightly", "lts"] as const;
type ReleaseDistTag = (typeof RELEASE_DIST_TAGS)[number];
export type ReleaseDistTags = Partial<Record<ReleaseDistTag, string>>;
const DIST_TAG_VERSION_RE = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;

type CachedLookupOptions<T> = {
  lookup?: () => Promise<T | null>;
  bypassCache?: boolean;
  storeResult?: boolean;
  now?: () => number;
  ttlMs?: number;
};

/**
 * A bounded-TTL cache with single-flight lookups: concurrent callers share one
 * in-flight lookup, an explicit refresh (`bypassCache`) bypasses an ordinary
 * in-flight lookup but coalesces with other refreshes, only non-null results
 * are cached, and `clear()` bumps a generation so an older in-flight result can
 * never repopulate the cache.
 */
function createCachedLookup<T>(defaultLookup: () => Promise<T | null>) {
  let cache: { value: T; expiresAt: number } | null = null;
  let ordinary: Promise<T | null> | null = null;
  let refresh: Promise<T | null> | null = null;
  let generation = 0;

  const clear = () => {
    cache = null;
    generation += 1;
  };

  const resolve = async (opts?: CachedLookupOptions<T>): Promise<T | null> => {
    const now = opts?.now ?? Date.now;
    if (!opts?.bypassCache && cache?.expiresAt > now()) {
      return cache.value;
    }

    const inFlight = opts?.bypassCache ? refresh : ordinary;
    if (inFlight) return inFlight;
    if (opts?.bypassCache) clear();

    const startedGeneration = generation;
    const lookup = opts?.lookup ?? defaultLookup;
    const ttlMs = Math.min(
      Math.max(opts?.ttlMs ?? LATEST_VERSION_CACHE_TTL_MS, 0),
      MAX_LATEST_VERSION_CACHE_TTL_MS
    );
    const pending = lookup().then((value) => {
      if (value && opts?.storeResult !== false && generation === startedGeneration) {
        cache = { value, expiresAt: now() + ttlMs };
      }
      return value;
    });
    if (opts?.bypassCache) refresh = pending;
    else ordinary = pending;

    try {
      return await pending;
    } finally {
      if (ordinary === pending) ordinary = null;
      if (refresh === pending) refresh = null;
    }
  };

  return { clear, resolve };
}

// The pure semver helpers live in `./versionCompare` (dependency-free) so
// client-reachable modules can import them without pulling this file's
// server-only `child_process` import into the browser bundle. Re-exported here
// for back-compat with existing server-side importers.
export { normalizeVersion, isNewer } from "./versionCompare";

/**
 * Latest published version via the `npm` CLI (fast when npm is on PATH, e.g. source installs).
 *
 * `execFn` is injectable for tests (same pattern as the CLI's own
 * `bin/cli/commands/update.mjs::getLatestVersion()`).
 */
export async function getLatestVersionFromNpmCli(
  execFn: typeof execFileAsync = execFileAsync
): Promise<string | null> {
  try {
    // #5542 — win32 npm is npm.cmd; execFile without a shell throws "spawn npm ENOENT"
    // on Node ≥24 (nodejs/node#52554). buildNpmExecOptions enables the shell on win32.
    // #11885 — `--prefer-online` forces npm to revalidate its HTTP cache against the
    // registry. Without it `npm info` can return a stale cached version, the same known
    // bug class already fixed in the CLI's own copy for #4376 (see that fix's comment in
    // bin/cli/commands/update.mjs::getLatestVersion()) but never mirrored here — this is
    // the function backing the dashboard's "Update Available" banner.
    const { stdout } = await execFn(
      "npm",
      ["info", "omniroute", "version", "--json", "--prefer-online"],
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
async function readStreamChunks(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  signal?: AbortSignal
): Promise<{ chunks: Uint8Array[]; totalBytes: number }> {
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  const onAbort = () => {
    reader.cancel().catch(() => {});
  };

  if (signal) {
    signal.addEventListener("abort", onAbort, { once: true });
  }

  try {
    while (true) {
      if (signal?.aborted) {
        throw new Error("Version metadata request aborted");
      }
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
    if (signal) {
      signal.removeEventListener("abort", onAbort);
    }
    reader.releaseLock();
  }

  return { chunks, totalBytes };
}

function parseJsonFromChunks(chunks: Uint8Array[], totalBytes: number): unknown {
  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(body));
}

async function readBoundedJson(response: Response, signal?: AbortSignal): Promise<unknown> {
  const declaredLength = Number(response.headers.get("Content-Length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_VERSION_RESPONSE_BYTES) {
    await response.body?.cancel();
    throw new Error("Version metadata response is too large");
  }

  if (signal?.aborted) {
    await response.body?.cancel();
    throw new Error("Version metadata request aborted");
  }

  if (!response.body) return response.json();
  const reader = response.body.getReader();
  const { chunks, totalBytes } = await readStreamChunks(reader, signal);
  return parseJsonFromChunks(chunks, totalBytes);
}

export async function getLatestVersionFromRegistry(
  fetchImpl: typeof fetch = fetch
): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LOOKUP_TIMEOUT_MS);
  try {
    const res = await fetchImpl(NPM_REGISTRY_LATEST_URL, {
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = (await readBoundedJson(res, controller.signal)) as { version?: unknown };
    return typeof data?.version === "string" && data.version ? data.version : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
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
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LOOKUP_TIMEOUT_MS);
  try {
    const res = await fetchImpl(GITHUB_RELEASES_LATEST_URL, {
      signal: controller.signal,
      headers: {
        // GitHub's API rejects requests without a User-Agent.
        "User-Agent": "omniroute-version-check",
        Accept: "application/vnd.github+json",
      },
    });
    if (!res.ok) return null;
    const data = (await readBoundedJson(res, controller.signal)) as { tag_name?: unknown };
    return typeof data?.tag_name === "string" && data.tag_name ? data.tag_name : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const latestVersionCache = createCachedLookup<string>(() => resolveLatestVersion());
const distTagsCache = createCachedLookup<ReleaseDistTags>(() => resolveDistTags());

/**
 * Drop the cached latest version and dist-tags (after an update, or on an
 * explicit refresh), so the next read goes back to npm.
 */
export function clearLatestVersionCache(): void {
  latestVersionCache.clear();
  distTagsCache.clear();
}

/** Coalesce and briefly cache successful latest-version lookups. */
export async function resolveLatestVersionCached(
  opts?: CachedLookupOptions<string>
): Promise<string | null> {
  return latestVersionCache.resolve(opts);
}

/**
 * Coalesce and cache the npm dist-tags lookup with the same TTL and refresh
 * semantics as {@link resolveLatestVersionCached}.
 */
export async function resolveDistTagsCached(
  opts?: CachedLookupOptions<ReleaseDistTags>
): Promise<ReleaseDistTags | null> {
  return distTagsCache.resolve(opts);
}

/** Keep only the release dist-tags whose value looks like a published version. */
function sanitizeDistTags(raw: unknown): ReleaseDistTags | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const record = raw as Record<string, unknown>;
  const tags: ReleaseDistTags = {};
  for (const key of RELEASE_DIST_TAGS) {
    const value = record[key];
    if (typeof value === "string" && DIST_TAG_VERSION_RE.test(value)) tags[key] = value;
  }
  return Object.keys(tags).length ? tags : null;
}

/** Dist-tags via the `npm` CLI (`npm view omniroute dist-tags --json`). */
export async function getDistTagsFromNpmCli(
  execFn: typeof execFileAsync = execFileAsync
): Promise<ReleaseDistTags | null> {
  try {
    const { stdout } = await execFn(
      "npm",
      ["view", "omniroute", "dist-tags", "--json", "--prefer-online"],
      buildNpmExecOptions(process.platform, { timeoutMs: LOOKUP_TIMEOUT_MS })
    );
    return sanitizeDistTags(JSON.parse(String(stdout).trim()));
  } catch {
    return null;
  }
}

/** Dist-tags via the npm registry HTTP API — no `npm` binary needed. */
export async function getDistTagsFromRegistry(
  fetchImpl: typeof fetch = fetch
): Promise<ReleaseDistTags | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LOOKUP_TIMEOUT_MS);
  try {
    const res = await fetchImpl(NPM_REGISTRY_DIST_TAGS_URL, { signal: controller.signal });
    if (!res.ok) return null;
    return sanitizeDistTags(await readBoundedJson(res, controller.signal));
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Resolve the published dist-tags: `npm` CLI first, then the registry HTTP API.
 * Returns null (the route then falls back to the latest version alone) when both fail.
 */
export async function resolveDistTags(opts?: {
  npmCli?: () => Promise<ReleaseDistTags | null>;
  registry?: () => Promise<ReleaseDistTags | null>;
}): Promise<ReleaseDistTags | null> {
  const npmCli = opts?.npmCli ?? getDistTagsFromNpmCli;
  const registry = opts?.registry ?? (() => getDistTagsFromRegistry());
  return (await npmCli()) ?? (await registry());
}

/**
 * Resolve the latest published version. Tries the `npm` CLI first (fast on source installs),
 * then the registry HTTP API, then the GitHub releases API — both npm-binary-free. Logs a
 * warning — instead of silently degrading to "no update available" — when ALL sources fail.
 * Thunks are injectable for tests.
 */
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
