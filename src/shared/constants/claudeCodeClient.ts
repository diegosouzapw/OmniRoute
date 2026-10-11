/**
 * Wire-version data captured from the signed Claude Code binary.
 *
 * Keep this leaf dependency-free (no project imports) so server executors,
 * compatibility bridges, and client-facing identity presets can share one
 * source of truth.
 *
 * `CLAUDE_CODE_CLIENT_VERSION` is the captured pin. Runtime callers that
 * advertise the version on the wire must go through getClaudeCodeClientVersion()
 * so operators can bump past Anthropic's model gate without a rebuild (#12417).
 * The getter also reads a 6h cache of `@anthropic-ai/claude-code` on npm and
 * uses that version when it is newer than the pin. The dashboard override
 * (`cliVersions.ts`) wins over everything, then the env override. The lookup is fire-and-forget; a cold or failed fetch stays on the pin.
 */
import { getCliVersionOverride, type CliVersionSource } from "./cliVersions.ts";

export const CLAUDE_CODE_CLIENT_VERSION = "2.1.280";
export const CLAUDE_CODE_CLIENT_BUILD_REVISION = "1e2";
export const CLAUDE_CODE_CLIENT_BILLING_VERSION = `${CLAUDE_CODE_CLIENT_VERSION}.${CLAUDE_CODE_CLIENT_BUILD_REVISION}`;
export const CLAUDE_CODE_SDK_PACKAGE_VERSION = "0.112.1";
export const CLAUDE_CODE_RUNTIME_VERSION = "v26.3.0";

export type ClaudeCodeEntrypoint = "cli" | "sdk-cli";

const CLAUDE_VERSION_OVERRIDE_ENV = "CLAUDE_CODE_CLIENT_VERSION";
const CLAUDE_BUILD_REVISION_OVERRIDE_ENV = "CLAUDE_CODE_CLIENT_BUILD_REVISION";
const SAFE_HEADER_TOKEN_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,31}$/;
const DOTTED_TRIPLE_PATTERN = /^\d+\.\d+\.\d+$/;

const NPM_CLAUDE_CODE_LATEST_URL = "https://registry.npmjs.org/@anthropic-ai/claude-code/latest";
export const CLAUDE_CODE_VERSION_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
export const CLAUDE_CODE_VERSION_FETCH_TIMEOUT_MS = 20_000;

type FetchLike = typeof fetch;

let cachedVersion: string | null = null;
let cachedAt = 0;
let inFlight: Promise<string> | null = null;

function getSafeEnvValue(name: string, pattern: RegExp): string | null {
  const raw = typeof process === "undefined" ? undefined : process.env?.[name];
  if (typeof raw !== "string") return null;
  const normalized = raw.trim();
  if (!normalized || !pattern.test(normalized)) {
    return null;
  }
  return normalized;
}

function parseDottedTriple(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return DOTTED_TRIPLE_PATTERN.test(trimmed) ? trimmed : null;
}

function compareDottedTriple(a: string, b: string): number {
  const aParts = a.split(".").map((part) => Number.parseInt(part, 10) || 0);
  const bParts = b.split(".").map((part) => Number.parseInt(part, 10) || 0);
  for (let i = 0; i < 3; i += 1) {
    if (aParts[i] !== bParts[i]) return aParts[i] - bParts[i];
  }
  return 0;
}

function pickAtLeastPin(version: string | null): string {
  if (!version || compareDottedTriple(version, CLAUDE_CODE_CLIENT_VERSION) <= 0) {
    return CLAUDE_CODE_CLIENT_VERSION;
  }
  return version;
}

function readFreshCache(): string | null {
  if (!cachedVersion) return null;
  if (Date.now() - cachedAt >= CLAUDE_CODE_VERSION_CACHE_TTL_MS) return null;
  return cachedVersion;
}

function shouldAutoRefreshClaudeCodeVersion(): boolean {
  if (typeof process === "undefined") return false;
  return !process.env.NODE_TEST_CONTEXT && !process.env.VITEST && process.env.NODE_ENV !== "test";
}

/**
 * Sync hot path. Env override wins. Otherwise a cached registry version newer
 * than the pin, else the pin. Outside tests, a stale cache starts one
 * background refresh; this call itself never waits on the network.
 */
export function getClaudeCodeClientVersion(): string {
  const override =
    getCliVersionOverride("claude") ||
    getSafeEnvValue(CLAUDE_VERSION_OVERRIDE_ENV, SAFE_HEADER_TOKEN_PATTERN);
  if (override) return override;
  if (shouldAutoRefreshClaudeCodeVersion() && !readFreshCache() && !inFlight) {
    void refreshClaudeCodeClientVersion();
  }
  return pickAtLeastPin(readFreshCache());
}

/**
 * Which layer produced `getClaudeCodeClientVersion()` right now. Resolution is
 * dashboard override -> `CLAUDE_CODE_CLIENT_VERSION` env -> a fresh npm-registry
 * cache newer than the pin ("discovered") -> the captured pin.
 */
export function getClaudeCodeClientVersionSource(): CliVersionSource {
  if (getCliVersionOverride("claude")) return "settings";
  if (getSafeEnvValue(CLAUDE_VERSION_OVERRIDE_ENV, SAFE_HEADER_TOKEN_PATTERN)) return "env";
  if (pickAtLeastPin(readFreshCache()) !== CLAUDE_CODE_CLIENT_VERSION) return "discovered";
  return "default";
}

/**
 * Warm the npm cache (5s timeout, 6h TTL, coalesced, never rejects).
 * Any failure — network, non-2xx, or a payload that is not a dotted triple —
 * leaves the pin (or the previous fresh cache) in place.
 */
export function refreshClaudeCodeClientVersion(fetchImpl: FetchLike = fetch): Promise<string> {
  const override =
    getCliVersionOverride("claude") ||
    getSafeEnvValue(CLAUDE_VERSION_OVERRIDE_ENV, SAFE_HEADER_TOKEN_PATTERN);
  if (override) return Promise.resolve(override);

  const fresh = readFreshCache();
  if (fresh) return Promise.resolve(pickAtLeastPin(fresh));

  if (inFlight) return inFlight;

  inFlight = (async () => {
    let resolved: string | null = null;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), CLAUDE_CODE_VERSION_FETCH_TIMEOUT_MS);
      try {
        const response = await fetchImpl(NPM_CLAUDE_CODE_LATEST_URL, {
          headers: {
            Accept: "application/json",
            "User-Agent": "OmniRoute-ClaudeCodeVersion/1.0",
          },
          signal: controller.signal,
        });
        if (response.ok) {
          const payload = (await response.json()) as { version?: unknown };
          resolved = parseDottedTriple(payload?.version);
        }
      } finally {
        clearTimeout(timeoutId);
      }
    } catch {
      resolved = null;
    }

    if (resolved && compareDottedTriple(resolved, CLAUDE_CODE_CLIENT_VERSION) > 0) {
      cachedVersion = resolved;
      cachedAt = Date.now();
    }
    return pickAtLeastPin(resolved ?? readFreshCache());
  })();

  const current = inFlight;
  void current.finally(() => {
    if (inFlight === current) inFlight = null;
  });
  return current;
}

/** Test seam: drop the registry cache so the next refresh hits the network. */
export function resetClaudeCodeClientVersionCache(): void {
  cachedVersion = null;
  cachedAt = 0;
  inFlight = null;
}

/**
 * The 3-character suffix on `cc_version=`. Overridable for the same reason as
 * the version above: it is captured alongside the version, so bumping only the
 * version advertises a `version.revision` pair no real binary emits.
 */
export function getClaudeCodeClientBuildRevision(): string {
  return (
    getSafeEnvValue(CLAUDE_BUILD_REVISION_OVERRIDE_ENV, SAFE_HEADER_TOKEN_PATTERN) ||
    CLAUDE_CODE_CLIENT_BUILD_REVISION
  );
}

export function getClaudeCodeClientBillingVersion(): string {
  return `${getClaudeCodeClientVersion()}.${getClaudeCodeClientBuildRevision()}`;
}

export function getClaudeCodeUserAgent(entrypoint: ClaudeCodeEntrypoint): string {
  return `claude-cli/${getClaudeCodeClientVersion()} (external, ${entrypoint})`;
}
