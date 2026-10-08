export const KIMI_CODING_BASE_URL = "https://api.kimi.com/coding/v1";
export const KIMI_CODING_MODELS_URL = `${KIMI_CODING_BASE_URL}/models`;
export const KIMI_CODING_OPENAI_URL = `${KIMI_CODING_BASE_URL}/chat/completions`;
export const KIMI_CODING_ANTHROPIC_URL = `${KIMI_CODING_BASE_URL}/messages?beta=true`;

export const KIMI_CODE_CLI_PLATFORM = "kimi_code_cli";
export const KIMI_CODE_CLI_VERSION = "2.1.1";

export type KimiCodeThinkingPolicy = {
  supportsThinking: boolean;
  alwaysThinking?: boolean;
  supportedThinkingEfforts?: string[];
  defaultThinkingEffort?: string;
};

// Kimi Code's public model contract can move ahead of the packaged CLI release.
// Keep offline fallback policy here; live /models metadata still takes precedence.
const KIMI_CODE_STATIC_THINKING_POLICIES: Record<string, KimiCodeThinkingPolicy> = {
  k3: {
    supportsThinking: true,
    supportedThinkingEfforts: ["low", "high", "max"],
    defaultThinkingEffort: "max",
  },
};

export function getKimiCodeStaticThinkingPolicy(modelId: unknown): KimiCodeThinkingPolicy | null {
  if (typeof modelId !== "string") return null;
  const normalizedModel = modelId.trim().toLowerCase().split("/").pop() || "";
  if (/^k3(?:$|-)/.test(normalizedModel)) return KIMI_CODE_STATIC_THINKING_POLICIES.k3;
  return KIMI_CODE_STATIC_THINKING_POLICIES[normalizedModel] || null;
}

export type KimiCodeDeviceIdentity = {
  deviceId?: unknown;
  deviceName?: unknown;
  deviceModel?: unknown;
  osVersion?: unknown;
};

export function sanitizeKimiHeaderValue(value: unknown, fallback = "unknown"): string {
  const text = String(value ?? "").trim();
  if (!text) return fallback;
  return text.replace(/[^\x20-\x7e]/g, "").trim() || fallback;
}

export function normalizeKimiDeviceId(value: unknown): string {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  const deviceId = sanitizeKimiHeaderValue(raw);
  if (!/^[0-9a-f]{32}$/i.test(deviceId)) return deviceId;
  return [
    deviceId.slice(0, 8),
    deviceId.slice(8, 12),
    deviceId.slice(12, 16),
    deviceId.slice(16, 20),
    deviceId.slice(20),
  ].join("-");
}

const KIMI_VERSION_OVERRIDE_ENV = "KIMI_CLI_VERSION";
const DOTTED_TRIPLE_PATTERN = /^\d+\.\d+\.\d+$/;
const NPM_KIMI_CODE_LATEST_URL = "https://registry.npmjs.org/@moonshot-ai/kimi-code/latest";
export const KIMI_CODE_VERSION_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
export const KIMI_CODE_VERSION_FETCH_TIMEOUT_MS = 20_000;

type FetchLike = typeof fetch;

let cachedVersion: string | null = null;
let cachedAt = 0;
let inFlight: Promise<string> | null = null;
let fetchImpl: FetchLike = fetch;

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
  if (!version || compareDottedTriple(version, KIMI_CODE_CLI_VERSION) <= 0) {
    return KIMI_CODE_CLI_VERSION;
  }
  return version;
}

function readEnvOverride(): string | null {
  const raw = typeof process === "undefined" ? undefined : process.env?.[KIMI_VERSION_OVERRIDE_ENV];
  const normalized = sanitizeKimiHeaderValue(raw, "");
  return normalized || null;
}

function readFreshCache(): string | null {
  if (!cachedVersion) return null;
  if (Date.now() - cachedAt >= KIMI_CODE_VERSION_CACHE_TTL_MS) return null;
  return cachedVersion;
}

/**
 * Sync hot path. Env override wins. Otherwise a cached registry version newer
 * than the pin, else the pin. Outside tests, a stale cache starts one
 * background refresh; this call itself never waits on the network.
 */
export function getKimiCodeCliVersion(): string {
  const override = readEnvOverride();
  if (override) return override;
  if (typeof process !== "undefined" && !process.env.NODE_TEST_CONTEXT && !readFreshCache() && !inFlight) {
    void refreshKimiCodeCliVersion();
  }
  return pickAtLeastPin(readFreshCache());
}

/**
 * Warm the npm cache (20s timeout, 6h TTL, coalesced, never rejects).
 * A failure, or a publish that is not newer than the pin, leaves the pin
 * (or the previous fresh cache) in place.
 */
export function refreshKimiCodeCliVersion(): Promise<string> {
  const override = readEnvOverride();
  if (override) return Promise.resolve(override);

  const fresh = readFreshCache();
  if (fresh) return Promise.resolve(pickAtLeastPin(fresh));

  if (inFlight) return inFlight;

  inFlight = (async () => {
    let resolved: string | null = null;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), KIMI_CODE_VERSION_FETCH_TIMEOUT_MS);
      try {
        const response = await fetchImpl(NPM_KIMI_CODE_LATEST_URL, {
          headers: {
            Accept: "application/json",
            "User-Agent": "OmniRoute-KimiCodeVersion/1.0",
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

    if (resolved && compareDottedTriple(resolved, KIMI_CODE_CLI_VERSION) > 0) {
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
export function resetKimiCodeCliVersionCache(): void {
  cachedVersion = null;
  cachedAt = 0;
  inFlight = null;
}

/** Test seam: replace the registry fetch. Production leaves the global fetch. */
export function setKimiCodeCliVersionFetch(next: FetchLike): void {
  fetchImpl = next;
}

export function resetKimiCodeCliVersionFetch(): void {
  fetchImpl = fetch;
}

export function getKimiCodeCliUserAgent(): string {
  return `kimi-code-cli/${getKimiCodeCliVersion()}`;
}

export function buildKimiCodeIdentityHeaders(
  identity: KimiCodeDeviceIdentity,
  version = getKimiCodeCliVersion()
): Record<string, string> {
  return {
    "X-Msh-Platform": KIMI_CODE_CLI_PLATFORM,
    "X-Msh-Version": sanitizeKimiHeaderValue(version, KIMI_CODE_CLI_VERSION),
    "X-Msh-Device-Name": sanitizeKimiHeaderValue(identity.deviceName),
    "X-Msh-Device-Model": sanitizeKimiHeaderValue(identity.deviceModel),
    "X-Msh-Os-Version": sanitizeKimiHeaderValue(identity.osVersion),
    "X-Msh-Device-Id": sanitizeKimiHeaderValue(normalizeKimiDeviceId(identity.deviceId)),
  };
}
