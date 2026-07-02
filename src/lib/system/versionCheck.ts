/**
 * Latest-version discovery + comparison for the dashboard "Update Available" banner.
 *
 * #4100: the banner is gated on `isNewer(latest, current)`. Previously `latest` came
 * ONLY from `npm info omniroute version --json` (the `npm` CLI binary). When that binary
 * is absent (Docker / desktop / locked-down installs) or the registry is unreachable, the
 * call returned null and the banner silently never rendered — even when an update existed.
 *
 * This module keeps the fast `npm` CLI path as the primary source but adds an
 * npm-binary-free HTTP fallback (the npm registry JSON API, reachable with plain `fetch`)
 * and logs a warning instead of degrading silently. Version parsing is also hardened so a
 * `v`-prefix or pre-release suffix no longer collapses the comparison to `false` via `NaN`.
 */
import { execFile } from "child_process";
import { promisify } from "util";
import { createLogger } from "@/shared/utils/logger";

const execFileAsync = promisify(execFile);
const log = createLogger("system/versionCheck");

/** npm-binary-free latest-version source: the registry JSON API. */
const NPM_REGISTRY_LATEST_URL = "https://registry.npmjs.org/omniroute/latest";

const LOOKUP_TIMEOUT_MS = 10_000;

/**
 * Strip a leading `v`, drop pre-release/build metadata (`-`/`+` suffix), split on `.`,
 * and return a numeric tuple. Returns null when the string is empty or any segment is
 * non-numeric, so callers can fail safe instead of comparing `NaN`.
 */
export function normalizeVersion(v: string): number[] | null {
  if (typeof v !== "string") return null;
  const cleaned = v.trim().replace(/^v/i, "").split(/[-+]/)[0];
  if (!cleaned) return null;
  const parts = cleaned.split(".").map((p) => Number(p));
  if (parts.length === 0 || parts.some((n) => !Number.isFinite(n))) return null;
  return parts;
}

/**
 * True iff `latest` is a strictly higher semver than `current`. Safe on null/garbage
 * (returns false rather than throwing or yielding a `NaN`-driven false positive).
 */
export function isNewer(latest: string | null | undefined, current: string): boolean {
  if (!latest) return false;
  const a = normalizeVersion(latest);
  const b = normalizeVersion(current);
  if (!a || !b) return false;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const av = a[i] ?? 0;
    const bv = b[i] ?? 0;
    if (av !== bv) return av > bv;
  }
  return false;
}

/** Latest published version via the `npm` CLI (fast when npm is on PATH, e.g. source installs). */
export async function getLatestVersionFromNpmCli(): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("npm", ["info", "omniroute", "version", "--json"], {
      timeout: LOOKUP_TIMEOUT_MS,
    });
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
export async function getLatestVersionFromRegistry(
  fetchImpl: typeof fetch = fetch
): Promise<string | null> {
  try {
    const res = await fetchImpl(NPM_REGISTRY_LATEST_URL, {
      signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { version?: unknown };
    return typeof data?.version === "string" && data.version ? data.version : null;
  } catch {
    return null;
  }
}

/**
 * Resolve the latest published version. Tries the `npm` CLI first (fast on source installs),
 * then falls back to the registry HTTP API (npm-binary-free). Logs a warning — instead of
 * silently degrading to "no update available" — when BOTH sources fail. Thunks are injectable
 * for tests.
 */
export async function resolveLatestVersion(opts?: {
  npmCli?: () => Promise<string | null>;
  registry?: () => Promise<string | null>;
}): Promise<string | null> {
  const npmCli = opts?.npmCli ?? getLatestVersionFromNpmCli;
  const registry = opts?.registry ?? (() => getLatestVersionFromRegistry());

  const viaCli = await npmCli();
  if (viaCli) return viaCli;

  const viaRegistry = await registry();
  if (viaRegistry) return viaRegistry;

  log.warn(
    "Latest-version lookup failed via both npm CLI and registry HTTP — the update banner will not show even if a newer release exists"
  );
  return null;
}
