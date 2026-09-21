/**
 * CLIProxyAPI Management Health Preflight
 *
 * Pre-checks health of CLIProxy-backed OpenAI-compatible connections against the
 * /v0/management/auth-files endpoint before combo target dispatch.
 *
 * Key safety properties:
 * 1. Fail-open on any management failure or unknown status/models (never causes false-positive skips).
 * 2. In-memory TTL cache (30-60s) with singleflight concurrency coalescing.
 * 3. Only inspects demonstrably CLIProxy-backed connections (baseUrl containing "cliproxy"
 *    or port 8317 with explicit marker, or explicit cliproxy/management properties).
 * 4. Provider family isolation: Claude unavailable never skips Gemini/Codex/XAI on the same instance.
 * 5. Model quota awareness: skips only when all relevant accounts for that model/family are unavailable
 *    or specifically rejected/in cooldown for that model.
 * 6. Stale-rejection awareness: per-model "rejected" flags are honored only while their retry window
 *    is open or the producing account-level cooldown is still active.
 */

import {
  getCliproxyAccountHealth,
  type CliproxyAccountHealth,
  type CliproxyAccountHealthResult,
} from "./cliproxyAccountHealth.ts";

export type CliproxyBackendFamily =
  "claude" | "antigravity" | "gemini" | "codex" | "xai" | "unknown";

export interface CliproxyPreflightDecision {
  shouldSkip: boolean;
  reason?: string;
  detail?: string;
}

/**
 * Check whether a connection is demonstrably CLIProxy-backed.
 *
 * Rejects generic OpenAI-compatible connections unconditionally unless they
 * explicitly indicate CLIProxy usage.
 */
function hasExplicitCliproxyMarker(psd: Record<string, unknown>): boolean {
  return (
    psd.isCliproxy === true ||
    psd.cliproxy === true ||
    psd.cliproxyapi === true ||
    psd.prefix === "cliproxy" ||
    psd.backend === "cliproxy" ||
    psd.backend === "cliproxyapi" ||
    psd.cliproxyapiMode === "claude-native" ||
    typeof psd.managementKey === "string" ||
    typeof psd.managementPort === "number"
  );
}

function hasPortMarker(psd: Record<string, unknown>): boolean {
  return (
    psd.isCliproxy !== undefined ||
    psd.cliproxy !== undefined ||
    psd.cliproxyapiMode !== undefined ||
    psd.backend !== undefined
  );
}

function parseUrlOrNull(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function baseUrlIndicatesCliproxy(psd: Record<string, unknown>): boolean {
  const rawBaseUrl = psd.baseUrl;
  if (typeof rawBaseUrl !== "string" || !rawBaseUrl.trim()) {
    return false;
  }
  const url = parseUrlOrNull(rawBaseUrl.trim());
  if (!url) {
    return false;
  }

  // Host contains "cliproxy" (e.g. cliproxy:8317, my-cliproxyapi.internal)
  if (url.hostname.toLowerCase().includes("cliproxy")) {
    return true;
  }

  // Port 8317 is CLIProxy default port, BUT port 8317 on a generic host
  // (such as localhost or an arbitrary IP) is ONLY considered CLIProxy-backed
  // when an explicit marker is present.
  return url.port === "8317" && hasPortMarker(psd);
}

/**
 * Check whether a connection is demonstrably CLIProxy-backed.
 *
 * Rejects generic OpenAI-compatible connections unconditionally unless they
 * explicitly indicate CLIProxy usage.
 */
export function isCliproxyBackedConnection(
  providerSpecificData?: Record<string, unknown> | null
): boolean {
  if (!providerSpecificData || typeof providerSpecificData !== "object") {
    return false;
  }
  return (
    hasExplicitCliproxyMarker(providerSpecificData) ||
    baseUrlIndicatesCliproxy(providerSpecificData)
  );
}

/**
 * Classify a model string into a CLIProxy backend family.
 *
 * Recognized families:
 *   - "claude"
 *   - "antigravity" (or gemini / agy)
 *   - "gemini"
 *   - "codex" (or openai / gpt)
 *   - "xai" (or grok)
 *   - "unknown" (triggers fail-open)
 */
const EXPLICIT_FAMILY_ALIASES: Readonly<Record<string, CliproxyBackendFamily>> = {
  claude: "claude",
  antigravity: "antigravity",
  agy: "antigravity",
  gemini: "gemini",
  codex: "codex",
  openai: "codex",
  gpt: "codex",
  xai: "xai",
  grok: "xai",
};

const MODEL_FAMILY_MATCHERS: ReadonlyArray<{
  readonly family: CliproxyBackendFamily;
  readonly prefixes: readonly string[];
  readonly substrings: readonly string[];
}> = [
  {
    family: "antigravity",
    prefixes: ["antigravity-", "antigravity/", "agy/"],
    substrings: ["antigravity"],
  },
  {
    family: "claude",
    prefixes: ["claude", "anthropic/"],
    substrings: ["claude-"],
  },
  {
    family: "gemini",
    prefixes: ["gemini", "google/gemini"],
    substrings: ["gemini-"],
  },
  {
    family: "codex",
    prefixes: ["codex/", "openai/", "gpt-", "o1-", "o3-", "o4-", "text-embedding"],
    substrings: ["codex"],
  },
  {
    family: "xai",
    prefixes: ["xai/", "grok-"],
    substrings: ["grok"],
  },
];

function resolveExplicitFamily(
  providerSpecificData?: Record<string, unknown> | null
): CliproxyBackendFamily | null {
  if (!providerSpecificData || typeof providerSpecificData !== "object") {
    return null;
  }
  const explicitFamily =
    providerSpecificData.cliproxyFamily ??
    providerSpecificData.backendFamily ??
    providerSpecificData.upstreamProvider;
  if (typeof explicitFamily !== "string" || !explicitFamily.trim()) {
    return null;
  }
  return EXPLICIT_FAMILY_ALIASES[explicitFamily.trim().toLowerCase()] ?? null;
}

function resolveModelFamily(cleanModel: string): CliproxyBackendFamily {
  for (const matcher of MODEL_FAMILY_MATCHERS) {
    const byPrefix = matcher.prefixes.some((prefix) => cleanModel.startsWith(prefix));
    const bySubstring = matcher.substrings.some((needle) => cleanModel.includes(needle));
    if (byPrefix || bySubstring) {
      return matcher.family;
    }
  }
  return "unknown";
}

/**
 * Classify a model string into a CLIProxy backend family.
 *
 * Recognized families:
 *   - "claude"
 *   - "antigravity" (or gemini / agy)
 *   - "gemini"
 *   - "codex" (or openai / gpt)
 *   - "xai" (or grok)
 *   - "unknown" (triggers fail-open)
 */
export function resolveCliproxyBackendFamily(
  modelStr: string | null | undefined,
  providerSpecificData?: Record<string, unknown> | null
): CliproxyBackendFamily {
  const explicit = resolveExplicitFamily(providerSpecificData);
  if (explicit !== null) {
    return explicit;
  }
  if (!modelStr || typeof modelStr !== "string") {
    return "unknown";
  }
  return resolveModelFamily(modelStr.toLowerCase().trim());
}

function parseModelId(modelStr: string): string {
  const trimmed = modelStr.trim();
  if (trimmed.includes("/")) {
    return trimmed.slice(trimmed.indexOf("/") + 1).trim();
  }
  return trimmed;
}

/**
 * Evaluate whether an account is actively cooling or unavailable.
 */
function isAccountUnavailable(account: CliproxyAccountHealth, now: number): boolean {
  if (account.disabled) return true;
  if (account.status.toLowerCase() === "disabled") return true;
  if (account.unavailable) {
    // If nextRetryAfter is provided and in the past, it's eligible to retry
    if (account.nextRetryAfter) {
      const retryTime = Date.parse(account.nextRetryAfter);
      if (!Number.isNaN(retryTime) && retryTime > now) {
        return true;
      }
    } else {
      return true;
    }
  }
  return false;
}

/**
 * Check whether a specific model quota signal indicates that the model is rejected
 * or currently cooling down.
 *
 * A per-model rejection is only authoritative while it is fresh (#14206): either
 * its own retry window (observed_at + Retry-After) is still open, or the
 * account-level cooldown that produced the observation is still active.
 * CLIProxyAPI rewrites model_quotas only when the next upstream response for
 * that model arrives, so a "rejected" flag can survive account recovery for
 * hours. Treating it as unconditionally blocking skips a credential that is
 * provably serving traffic (live 2026-09-21: 68 dispatched HTTP 200s while
 * auth-files still carried rejected=true with retry_after_s=0).
 */
function isModelQuotaRejected(
  account: CliproxyAccountHealth,
  modelId: string,
  now: number
): boolean {
  const modelQuota = account.modelQuotas[modelId];
  if (!modelQuota || !modelQuota.signals) return false;

  const signals = modelQuota.signals;
  const accountLevelCooldownActive = isAccountUnavailable(account, now);

  // Resolve the observation's own retry window when a Retry-After signal and a
  // parseable observed_at are both present. A zeroed duration yields a window
  // in the past, i.e. not fresh.
  let rejectionWindowMs: number | null = null;
  const retryAfterSecStr = signals["Retry-After"] || signals["retry-after"];
  if (retryAfterSecStr && modelQuota.observedAt) {
    const observedTime = Date.parse(modelQuota.observedAt);
    const retryAfterSec = Number.parseInt(retryAfterSecStr, 10);
    if (!Number.isNaN(observedTime) && !Number.isNaN(retryAfterSec)) {
      rejectionWindowMs = observedTime + retryAfterSec * 1000;
    }
  }
  const windowStillOpen = rejectionWindowMs !== null && rejectionWindowMs > now;

  // 1. Explicit rejected status in signals, authoritative only while fresh:
  //    its own retry window is open, or the account-level cooldown that
  //    produced the observation has not elapsed yet.
  const unifiedStatus = signals["Anthropic-Ratelimit-Unified-Status"]?.toLowerCase();
  const overageStatus = signals["Anthropic-Ratelimit-Unified-Overage-Status"]?.toLowerCase();
  if (unifiedStatus === "rejected" || overageStatus === "rejected") {
    return windowStillOpen || accountLevelCooldownActive;
  }

  // 2. Retry-After signal without an explicit rejected status (other
  //    providers): block only while the observed window is still open.
  return windowStillOpen;
}

export interface EvaluateCliproxyTargetHealthOptions {
  modelStr: string;
  accounts: CliproxyAccountHealth[];
  providerSpecificData?: Record<string, unknown> | null;
  now?: number;
}

const FAMILY_ACCOUNT_ALIASES: Readonly<
  Record<Exclude<CliproxyBackendFamily, "unknown">, readonly string[]>
> = {
  claude: ["claude"],
  antigravity: ["antigravity", "gemini"],
  gemini: ["gemini", "antigravity"],
  codex: ["codex", "openai", "gpt"],
  xai: ["xai", "grok"],
};

function accountMatchesFamily(
  acct: CliproxyAccountHealth,
  family: Exclude<CliproxyBackendFamily, "unknown">
): boolean {
  const aliases = FAMILY_ACCOUNT_ALIASES[family];
  const provider = acct.provider.toLowerCase().trim();
  const type = acct.type.toLowerCase().trim();
  return aliases.includes(provider) || aliases.includes(type);
}

/**
 * Pure evaluation function for target health against known CLIProxy accounts.
 *
 * Rules:
 * - Fail open if model family is unknown.
 * - Fail open if no accounts exist for the family (do not assume it's unusable).
 * - Skip only if relevant accounts exist and ALL are unavailable or rejected for that model.
 * - A single healthy relevant account => do NOT skip.
 */
export function evaluateCliproxyTargetHealth(
  options: EvaluateCliproxyTargetHealthOptions
): CliproxyPreflightDecision {
  const { modelStr, accounts, providerSpecificData } = options;
  const now = options.now ?? Date.now();

  const family = resolveCliproxyBackendFamily(modelStr, providerSpecificData);
  if (family === "unknown") {
    return { shouldSkip: false };
  }

  // Filter accounts belonging to this family. The alias table keeps families
  // isolated: a cooling Claude account never skips Gemini/Codex/XAI targets.
  const relevantAccounts = accounts.filter((acct) => accountMatchesFamily(acct, family));

  if (relevantAccounts.length === 0) {
    // Fail open: no accounts for this family in auth-files, could be configured differently
    return { shouldSkip: false };
  }

  const rawModelId = parseModelId(modelStr);

  // Check if every relevant account is blocked for this concrete model
  // (either account is disabled/cooling/unavailable OR this specific model quota is rejected/cooling).
  // If at least one account is available and not quota-rejected, we must NOT skip.
  for (const acct of relevantAccounts) {
    if (!isAccountUnavailable(acct, now) && !isModelQuotaRejected(acct, rawModelId, now)) {
      return { shouldSkip: false };
    }
  }

  return {
    shouldSkip: true,
    reason: `All ${relevantAccounts.length} ${family} accounts are unavailable or model ${rawModelId} quota rejected`,
  };
}

// ──────────────── In-Memory Cache with Singleflight ────────────────

export interface HealthCacheEntry {
  result: CliproxyAccountHealthResult;
  expiresAt: number;
}

export type HealthFetcher = (options: {
  host?: string;
  port?: number;
  managementKey?: string | null;
  timeoutMs?: number;
}) => Promise<CliproxyAccountHealthResult>;

export class CliproxyManagementHealthCache {
  private cache = new Map<string, HealthCacheEntry>();
  private inFlight = new Map<string, Promise<CliproxyAccountHealthResult>>();
  private readonly ttlMs: number;
  private readonly fetcher: HealthFetcher;

  constructor(options?: { ttlMs?: number; fetcher?: HealthFetcher }) {
    // Fail-open 30-60s TTL.
    this.ttlMs = options?.ttlMs ?? 45_000;
    this.fetcher = options?.fetcher ?? getCliproxyAccountHealth;
  }

  async getHealth(
    baseUrl: string,
    managementKey?: string | null,
    timeoutMs = 500
  ): Promise<CliproxyAccountHealthResult> {
    const key = this.makeCacheKey(baseUrl, managementKey);
    const cached = this.cache.get(key);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.result;
    }

    const ongoing = this.inFlight.get(key);
    if (ongoing) return ongoing;

    return this.fetchAndCache(key, baseUrl, managementKey, timeoutMs);
  }

  /**
   * Fetches management health with request-scoped singleflight. The key uses a
   * deterministic marker for the embedded service and does not include the
   * secret itself, so no management credential reaches cache keys, logs, or
   * diagnostic output.
   */
  async getDefaultHealth(timeoutMs = 500): Promise<CliproxyAccountHealthResult> {
    const key = "default";
    const cached = this.cache.get(key);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.result;
    }

    const ongoing = this.inFlight.get(key);
    if (ongoing) return ongoing;

    const promise = (async () => {
      try {
        const result = await this.fetcher({ timeoutMs });
        this.cache.set(key, { result, expiresAt: Date.now() + this.ttlMs });
        return result;
      } catch {
        return { state: "unreachable" as const, accounts: [], version: null };
      } finally {
        this.inFlight.delete(key);
      }
    })();
    this.inFlight.set(key, promise);
    return promise;
  }

  private makeCacheKey(baseUrl: string, managementKey?: string | null): string {
    // The distinction is needed only to avoid accidentally sharing a snapshot
    // across a credentialed and uncredentialed caller; never retain the key.
    return `${baseUrl.trim()}::${managementKey ? "credentialed" : "default"}`;
  }

  private fetchAndCache(
    key: string,
    baseUrl: string,
    managementKey: string | null | undefined,
    timeoutMs: number
  ): Promise<CliproxyAccountHealthResult> {
    let host = "127.0.0.1";
    let port = 8317;
    try {
      const url = new URL(baseUrl);
      host = url.hostname;
      if (url.port) port = Number.parseInt(url.port, 10);
    } catch {
      // URL parsing is defensive; isCliproxyBackedConnection already rejected
      // malformed URLs before this point.
    }

    const promise = (async () => {
      try {
        const result = await this.fetcher({ host, port, managementKey, timeoutMs });
        this.cache.set(key, { result, expiresAt: Date.now() + this.ttlMs });
        return result;
      } catch {
        return { state: "unreachable" as const, accounts: [], version: null };
      } finally {
        this.inFlight.delete(key);
      }
    })();
    this.inFlight.set(key, promise);
    return promise;
  }

  clear(): void {
    this.cache.clear();
    this.inFlight.clear();
  }
}

/** Global singleton cache instance for combo execution */
export const defaultCliproxyManagementHealthCache = new CliproxyManagementHealthCache({
  ttlMs: 45_000,
});

export interface EvaluateCliproxyPreflightGateOptions {
  connection: {
    id: string;
    provider: string;
    providerSpecificData?: Record<string, unknown> | null;
  };
  modelStr: string;
  healthCache?: CliproxyManagementHealthCache;
  timeoutMs?: number;
}

/**
 * Gate entry point for evaluateExecuteTargetGates.
 *
 * Checks connection, fetches management health (cached + singleflight, bounded timeout),
 * and decides whether to skip.
 */
export async function evaluateCliproxyPreflightGate(
  options: EvaluateCliproxyPreflightGateOptions
): Promise<CliproxyPreflightDecision> {
  const { connection, modelStr } = options;
  const psd = connection.providerSpecificData;

  // 1. Only run for demonstrably CLIProxy-backed connections
  if (!isCliproxyBackedConnection(psd)) {
    return { shouldSkip: false };
  }

  // 2. Resolve management endpoint & key
  const cache = options.healthCache ?? defaultCliproxyManagementHealthCache;
  const timeoutMs = options.timeoutMs ?? 500; // Fast initial preflight timeout (spec requirement #5)

  let baseUrl = typeof psd?.baseUrl === "string" ? psd.baseUrl.trim() : "";
  if (!baseUrl) {
    const host = process.env.CLIPROXYAPI_HOST || "127.0.0.1";
    const port = process.env.CLIPROXYAPI_PORT || "8317";
    baseUrl = `http://${host}:${port}`;
  }

  // Per-connection provider data must not carry management secrets. The
  // established external-service convention is CLIPROXYAPI_MANAGEMENT_KEY;
  // embedded mode resolves its separate control-plane key inside
  // getCliproxyAccountHealth.
  const hasExternalManagementHost = Boolean(process.env.CLIPROXYAPI_HOST?.trim());
  const managementKey = process.env.CLIPROXYAPI_MANAGEMENT_KEY || null;

  const health =
    hasExternalManagementHost || managementKey
      ? await cache.getHealth(baseUrl, managementKey, timeoutMs)
      : await cache.getDefaultHealth(timeoutMs);

  // 3. Management errors fail open
  if (health.state !== "ready") {
    return { shouldSkip: false };
  }

  // 4. Pure health evaluation
  return evaluateCliproxyTargetHealth({
    modelStr,
    accounts: health.accounts,
    providerSpecificData: psd,
  });
}
