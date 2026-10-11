import { z } from "zod";
import type { SafeOutboundFetchOptions } from "@/shared/network/safeOutboundFetch";
import {
  CODEX_CLI_RS_ORIGINATOR,
  DEFAULT_CODEX_CLIENT_VERSION,
  getCodexCliRsHeaders as buildCodexCliRsHeaders,
} from "@/shared/constants/codexClient";
import { getCliVersionOverride, type CliVersionSource } from "@/shared/constants/cliVersions";

export {
  DEFAULT_CODEX_CLIENT_VERSION,
  CODEX_CLI_RS_ORIGINATOR,
} from "@/shared/constants/codexClient";
const CODEX_VERSION_METADATA_URL = "https://registry.npmjs.org/@openai%2Fcodex/latest";
const CODEX_VERSION_RETRY_MS = 5 * 60 * 1000;
const CODEX_VERSION_METADATA_MAX_BYTES = 64 * 1024;
const codexVersionMetadataSchema = z.object({
  name: z.literal("@openai/codex"),
  version: z
    .string()
    .trim()
    .regex(/^(0|[1-9]\d{0,8})\.(0|[1-9]\d{0,8})\.(0|[1-9]\d{0,8})$/),
});

export type CodexClientVersionFetch = (
  input: string,
  init: SafeOutboundFetchOptions & { method: "GET"; headers: Record<string, string> }
) => Promise<Response>;

let cachedCodexVersion: string | null = null;
let codexVersionRefreshAt = 0;
let codexVersionRefresh: Promise<string> | null = null;
const DEFAULT_CODEX_USER_AGENT_PLATFORM = "Windows 10.0.26200";
const DEFAULT_CODEX_USER_AGENT_ARCH = "x64";
const CODEX_VERSION_OVERRIDE_ENV = "CODEX_CLIENT_VERSION";
const CODEX_USER_AGENT_OVERRIDE_ENV = "CODEX_USER_AGENT";
const CODEX_RELEASE_URL = "https://api.github.com/repos/openai/codex/releases/latest";
export const CODEX_VERSION_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
export const CODEX_VERSION_FETCH_TIMEOUT_MS = 20_000;
const SAFE_HEADER_TOKEN_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,31}$/;
const SAFE_HEADER_VALUE_PATTERN = /^[\x20-\x7E]{1,200}$/;
const SAFE_CODEX_SESSION_ID_PATTERN = /^[A-Za-z0-9._:-]{1,200}$/;
const CODEX_DOTTED_TRIPLE_PATTERN = /^(\d+)\.(\d+)\.(\d+)$/;

type CodexVersionCache = {
  fetchedAt: number;
  version: string;
};

type FetchLike = typeof fetch;

let versionCache: CodexVersionCache | null = null;
let versionInFlight: Promise<string> | null = null;

function getSafeEnvValue(name: string, pattern: RegExp): string | null {
  const raw = process.env[name];
  if (typeof raw !== "string") return null;
  const normalized = raw.trim();
  if (!normalized || !pattern.test(normalized)) {
    return null;
  }
  return normalized;
}

function parseCodexReleaseTag(tagName: unknown): string | null {
  if (typeof tagName !== "string") return null;
  const stripped = tagName.trim().replace(/^rust-v/, "");
  const match = CODEX_DOTTED_TRIPLE_PATTERN.exec(stripped);
  return match ? match[0] : null;
}

function compareDottedTriple(left: string, right: string): number {
  const leftParts = left.split(".").map((part) => Number.parseInt(part, 10));
  const rightParts = right.split(".").map((part) => Number.parseInt(part, 10));
  for (let i = 0; i < 3; i += 1) {
    if (leftParts[i] !== rightParts[i]) return leftParts[i] - rightParts[i];
  }
  return 0;
}

function pickCodexVersionAtLeastPin(candidate: string | null): string {
  if (candidate && compareDottedTriple(candidate, DEFAULT_CODEX_CLIENT_VERSION) > 0) {
    return candidate;
  }
  return DEFAULT_CODEX_CLIENT_VERSION;
}

async function fetchCodexReleaseTag(fetchImpl: FetchLike): Promise<string | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CODEX_VERSION_FETCH_TIMEOUT_MS);
  try {
    const response = await fetchImpl(CODEX_RELEASE_URL, {
      headers: {
        Accept: "application/json",
        "User-Agent": "OmniRoute-CodexVersion/1.0",
      },
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as { tag_name?: unknown };
    return parseCodexReleaseTag(payload?.tag_name);
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Refresh the advertised Codex CLI version from the latest GitHub release.
 * A fetched dotted triple newer than the pin replaces it; any failure, a
 * malformed tag, or an older release keeps the pin. Cached for six hours.
 */
export function resolveCodexClientVersion(fetchImpl: FetchLike = fetch): Promise<string> {
  const now = Date.now();
  if (versionCache && now - versionCache.fetchedAt < CODEX_VERSION_CACHE_TTL_MS) {
    return Promise.resolve(pickCodexVersionAtLeastPin(versionCache.version));
  }
  if (versionInFlight) return versionInFlight;

  versionInFlight = (async () => {
    const fetched = await fetchCodexReleaseTag(fetchImpl);
    const version = pickCodexVersionAtLeastPin(fetched ?? versionCache?.version ?? null);
    if (fetched) {
      versionCache = { fetchedAt: Date.now(), version };
    }
    return version;
  })();

  return versionInFlight.finally(() => {
    versionInFlight = null;
  });
}

export function getCachedCodexClientVersion(): string {
  return pickCodexVersionAtLeastPin(versionCache?.version ?? null);
}

export function seedCodexClientVersionCache(version: string, fetchedAt = Date.now()): void {
  if (!CODEX_DOTTED_TRIPLE_PATTERN.test(version)) {
    throw new TypeError(`Invalid Codex client version: ${version}`);
  }
  versionCache = { fetchedAt, version };
}

export function clearCodexClientVersionCache(): void {
  versionCache = null;
  versionInFlight = null;
}

export function getCodexClientVersion(): string {
  const override =
    getCliVersionOverride("codex") ||
    getSafeEnvValue(CODEX_VERSION_OVERRIDE_ENV, SAFE_HEADER_TOKEN_PATTERN);
  if (override) return override;
  // Discovery may cache a registry version, but never below the release pin.
  if (
    cachedCodexVersion &&
    compareDottedTriple(cachedCodexVersion, DEFAULT_CODEX_CLIENT_VERSION) >= 0
  ) {
    return cachedCodexVersion;
  }
  if (!process.env.NODE_TEST_CONTEXT && !versionCache && !versionInFlight) {
    void resolveCodexClientVersion();
  }
  return getCachedCodexClientVersion();
}

/** Bound registry body reads as well as the connection; a stalled body must not block discovery. */
async function readCodexVersionMetadata(response: Response, signal: AbortSignal): Promise<unknown> {
  if (!response.body) throw new Error("Empty Codex version metadata");
  const reader = response.body.getReader();
  const cancel = () => {
    void reader.cancel().catch(() => {});
  };
  signal.addEventListener("abort", cancel, { once: true });
  const decoder = new TextDecoder();
  let text = "";
  let bytes = 0;
  try {
    signal.throwIfAborted();
    while (true) {
      const { done, value } = await reader.read();
      signal.throwIfAborted();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > CODEX_VERSION_METADATA_MAX_BYTES) {
        cancel();
        throw new Error("Codex version metadata is too large");
      }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } finally {
    signal.removeEventListener("abort", cancel);
    reader.releaseLock();
  }
}

/** Refresh only during model discovery. Inference reads the validated cache synchronously. */
export function refreshCodexClientVersion(fetchImpl: CodexClientVersionFetch): Promise<string> {
  const override =
    getCliVersionOverride("codex") ||
    getSafeEnvValue(CODEX_VERSION_OVERRIDE_ENV, SAFE_HEADER_TOKEN_PATTERN);
  if (override || Date.now() < codexVersionRefreshAt) {
    return Promise.resolve(getCodexClientVersion());
  }
  if (codexVersionRefresh) return codexVersionRefresh;
  codexVersionRefresh = (async () => {
    let refreshAfter = CODEX_VERSION_RETRY_MS;
    try {
      const signal = AbortSignal.timeout(5_000);
      const response = await fetchImpl(CODEX_VERSION_METADATA_URL, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal,
        redirect: "error",
        allowRedirect: false,
        guard: "public-only",
        pinDns: true,
        retry: false,
      });
      if (response.ok) {
        const parsed = codexVersionMetadataSchema.safeParse(
          await readCodexVersionMetadata(response, signal)
        );
        if (parsed.success) {
          const current = (cachedCodexVersion || DEFAULT_CODEX_CLIENT_VERSION)
            .split(".")
            .map(Number);
          const difference =
            parsed.data.version
              .split(".")
              .map((part, index) => Number(part) - current[index])
              .find((part) => part !== 0) ?? 0;
          if (difference >= 0) {
            cachedCodexVersion = parsed.data.version;
            refreshAfter = CODEX_VERSION_CACHE_TTL_MS;
          }
        }
      } else {
        await response.body?.cancel();
      }
    } catch {
      // Registry unavailable or invalid: retain the last-known-good version or offline pin.
    }
    codexVersionRefreshAt = Date.now() + refreshAfter;
    return getCodexClientVersion();
  })();
  const current = codexVersionRefresh;
  void current.finally(() => {
    if (codexVersionRefresh === current) codexVersionRefresh = null;
  });
  return current;
}

export function resetCodexClientVersionCacheForTests(): void {
  cachedCodexVersion = null;
  codexVersionRefreshAt = 0;
  codexVersionRefresh = null;
}

/**
 * Which layer produced `getCodexClientVersion()` right now. Resolution is
 * dashboard override -> `CODEX_CLIENT_VERSION` env -> a discovered registry /
 * release version newer than the pin ("discovered") -> the captured default.
 * Side-effect free: unlike getCodexClientVersion() it never starts a refresh.
 * Note this is the NON-caller-aware chain; see resolveCodexAdvertisedVersion for
 * the inference path, which additionally forwards the caller's own version.
 */
export function getCodexClientVersionSource(): CliVersionSource {
  if (getCliVersionOverride("codex")) return "settings";
  if (getSafeEnvValue(CODEX_VERSION_OVERRIDE_ENV, SAFE_HEADER_TOKEN_PATTERN)) return "env";
  const discovered =
    cachedCodexVersion && compareDottedTriple(cachedCodexVersion, DEFAULT_CODEX_CLIENT_VERSION) >= 0
      ? cachedCodexVersion
      : getCachedCodexClientVersion();
  return discovered !== DEFAULT_CODEX_CLIENT_VERSION ? "discovered" : "default";
}

/**
 * Extract the Codex client version the CALLER actually reported, so OmniRoute
 * forwards it upstream instead of substituting a pinned default. The official
 * CLI sends it in User-Agent, e.g.
 *   codex_cli_rs/0.154.0 (Mac OS 26.6.2; arm64) ...
 *   codex_exec/0.154.0 (Mac OS 26.6.2; arm64) xterm-256color (codex_exec; 0.154.0)
 * Some clients also send a `version` header.
 *
 * Why this matters: the ChatGPT backend gates newer models on the client
 * version ("The 'gpt-6-astra' model requires a newer version of Codex").
 * A pinned default silently rots every time the user upgrades their CLI.
 *
 * Returns null when the caller sent nothing usable, so callers can fall back
 * to getCodexClientVersion().
 */
const CODEX_CLIENT_VERSION_IN_UA_PATTERN = /(?:codex[-_][A-Za-z0-9_]*|codex-cli)\/(\d+\.\d+\.\d+)/i;

export function getCodexClientVersionFromHeaders(
  clientHeaders?: Record<string, string> | null
): string | null {
  if (!clientHeaders) return null;

  const pick = (name: string): string | null => {
    const direct = clientHeaders[name];
    if (typeof direct === "string" && direct.trim()) return direct.trim();
    const lower = name.toLowerCase();
    for (const [k, v] of Object.entries(clientHeaders)) {
      if (k.toLowerCase() === lower && typeof v === "string" && v.trim()) {
        return v.trim();
      }
    }
    return null;
  };

  const fromVersionHeader = pick("version");
  if (fromVersionHeader && SAFE_HEADER_TOKEN_PATTERN.test(fromVersionHeader)) {
    return fromVersionHeader;
  }

  const userAgent = pick("user-agent");
  if (!userAgent) return null;

  const match = CODEX_CLIENT_VERSION_IN_UA_PATTERN.exec(userAgent);
  if (!match) return null;

  const version = match[1];
  return SAFE_HEADER_TOKEN_PATTERN.test(version) ? version : null;
}

/**
 * The version to advertise on the chatgpt.com/backend-api inference face.
 *
 * Precedence, highest first:
 *   1. the dashboard override (`settings.cliVersionOverrides.codex`), which is an
 *      explicit operator choice and therefore outranks the caller;
 *   2. the version the CALLER reported (see getCodexClientVersionFromHeaders);
 *   3. `CODEX_CLIENT_VERSION` env;
 *   4. a discovered registry/release version newer than the pin;
 *   5. the captured default.
 *
 * Layer 2 exists because the ChatGPT backend gates newer models on the client
 * version, so forwarding what the caller actually runs keeps a stale pin from
 * locking operators out of a model their own CLI supports. Step 1 was added
 * later so an operator can force one advertised version regardless of what the
 * caller sends.
 */
export function resolveCodexAdvertisedVersion(
  clientHeaders?: Record<string, string> | null
): string {
  return (
    getCliVersionOverride("codex") ||
    getCodexClientVersionFromHeaders(clientHeaders) ||
    getCodexClientVersion()
  );
}

export function getCodexUserAgent(versionOverride?: string | null): string {
  const override = getSafeEnvValue(CODEX_USER_AGENT_OVERRIDE_ENV, SAFE_HEADER_VALUE_PATTERN);
  if (override) {
    return override;
  }

  const version =
    versionOverride && SAFE_HEADER_TOKEN_PATTERN.test(versionOverride)
      ? versionOverride
      : getCodexClientVersion();

  return `codex-cli/${version} (${DEFAULT_CODEX_USER_AGENT_PLATFORM}; ${DEFAULT_CODEX_USER_AGENT_ARCH})`;
}

export function getCodexDefaultHeaders(): Record<string, string> {
  return {
    Version: getCodexClientVersion(),
    "Openai-Beta": "responses_websockets=2026-02-06",
    "User-Agent": getCodexUserAgent(),
  };
}

export function getCodexCliRsHeaders(): Record<string, string> {
  return buildCodexCliRsHeaders(getCodexClientVersion());
}

/**
 * Identity for the credential face (auth.openai.com: token exchange / refresh).
 * The real Codex client sends only `originator` + `User-Agent` on that face
 * (codex-rs login/default_client.rs default_headers()); the `Version` header
 * gate exists only on the chatgpt.com/backend-api inference face, so it is
 * deliberately omitted here. Mirrors sub2api v0.1.178
 * ApplyCodexCanonicalAuthIdentity.
 */
export function getCodexAuthIdentityHeaders(): Record<string, string> {
  return {
    "User-Agent": getCodexUserAgent(),
    originator: CODEX_CLI_RS_ORIGINATOR,
  };
}

/**
 * Canonical Codex CLI identity for server-initiated calls against the
 * chatgpt.com/backend-api face that are not tied to one end-client request
 * (usage / quota / models manifest / reset-credits). Same UA/version chain as
 * inference so these calls do not show up upstream as anonymous half-identities.
 */
export function getCodexBackendIdentityHeaders(): Record<string, string> {
  return {
    "User-Agent": getCodexUserAgent(),
    originator: CODEX_CLI_RS_ORIGINATOR,
    Version: getCodexClientVersion(),
  };
}

export function normalizeCodexSessionId(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return SAFE_CODEX_SESSION_ID_PATTERN.test(normalized) ? normalized : null;
}
