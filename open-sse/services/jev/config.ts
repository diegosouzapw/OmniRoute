/**
 * Decision-model configuration: env contract, feature lanes and runtime
 * credential resolution.
 *
 * The lane is provider-agnostic: it can run against TypeSafe's System One wire
 * (the default) or any OpenAI-compatible classifier endpoint — either given
 * explicitly (`OMNIROUTE_JEV_BASE_URL` + `OMNIROUTE_JEV_MODEL`) or derived from
 * an existing OmniRoute provider connection (`OMNIROUTE_JEV_PROVIDER=<id>`),
 * whose stored base URL and credential are reused.
 *
 * Fail-open contract: every surface that consults the decision model keeps its
 * historical behavior when this module cannot resolve a runtime — the resolver
 * returns `null`, callers no-op.
 */
import { logger } from "../../utils/logger.ts";
import { DECISION_MODEL_REQUEST_HEADER } from "./types.ts";
import type { JevFeature } from "./types.ts";
import type { DecisionWire } from "./adapters.ts";

const log = logger("JEV");

export const DEFAULT_JEV_BASE_URL = "https://api.typesafe.ai";
export const DEFAULT_JEV_MODEL = "jev-latest";
export const DEFAULT_JEV_TIMEOUT_MS = 4_000;
export const DEFAULT_JEV_BLOCK_THRESHOLD = 0.9;

export const JEV_FEATURES = [
  "routing",
  "compression",
  "mcp",
  "tool_search",
  "cache",
  "keepalive",
  "tool_loop",
] as const;

/** Enabled feature lanes — a static key table, so a Record (not a Set). */
export type JevFeatureFlags = Partial<Record<JevFeature, true>>;

export type JevEnabledMode = "auto" | "on" | "off";

export interface JevEnvConfig {
  enabledMode: JevEnabledMode;
  apiKey: string | null;
  baseUrl: string | null;
  /** Explicit wire override; null = derive from the provider (typesafe default). */
  wire: DecisionWire | null;
  /** Provider id whose connection supplies the base URL (+ key fallback). */
  providerId: string | null;
  model: string | null;
  timeoutMs: number;
  features: JevFeatureFlags;
  blockThreshold: number;
  /** Opt-in to a classifier endpoint on OmniRoute's own gateway (recursion hazard). */
  allowSelfLoop: boolean;
}

export interface JevRuntime {
  apiKey: string;
  baseUrl: string;
  model: string;
  wire: DecisionWire;
  timeoutMs: number;
  blockThreshold: number;
}

type EnvLike = Record<string, string | undefined>;

/**
 * `on` is the ONLY opt-in. `auto` (and an unset value) keeps every lane off even when a
 * credential resolves: a TypeSafe key alone must never start sending request content to
 * the classifier or mutating MCP tool I/O (#15641 review; Hard Rule #20 spirit).
 */
function parseEnabledMode(raw: string | undefined): JevEnabledMode {
  const value = raw?.trim().toLowerCase();
  if (value === "0" || value === "false" || value === "off") return "off";
  if (value === "1" || value === "true" || value === "on") return "on";
  return "auto";
}

function parseWire(raw: string | undefined): DecisionWire | null {
  const value = raw?.trim().toLowerCase();
  return value === "typesafe" || value === "openai" ? value : null;
}

function isKnownFeature(token: string): token is JevFeature {
  return (JEV_FEATURES as readonly string[]).includes(token);
}

/**
 * Parse `OMNIROUTE_JEV_FEATURES`. `all`/`*` (or an empty value) enables every
 * lane; otherwise a comma-separated subset. Unknown tokens are ignored.
 */
export function parseJevFeatures(raw: string | undefined): JevFeatureFlags {
  const value = raw?.trim().toLowerCase();
  const flags: JevFeatureFlags = {};
  if (!value || value === "all" || value === "*") {
    for (const feature of JEV_FEATURES) flags[feature] = true;
    return flags;
  }
  for (const token of value.split(",")) {
    const feature = token.trim();
    if (isKnownFeature(feature)) flags[feature] = true;
  }
  return flags;
}

const TIMEOUT_MIN_MS = 250;
const TIMEOUT_MAX_MS = 300_000;

/** Last out-of-range timeout value we warned about, so a bad env warns ONCE
 *  (readJevEnvConfig runs on every hot-path gate, not just the 60 s refresh). */
let lastWarnedTimeoutValue: string | null | undefined = null;

/**
 * Parse `OMNIROUTE_JEV_TIMEOUT_MS`, CLAMPING an out-of-range value instead of
 * silently discarding it. The old behavior returned the 4 s default for any
 * value outside 250-60000, so an operator asking for a slow-by-design classifier
 * (e.g. an LLM behind the gateway, which legitimately needs 20-60 s) got 4 s and
 * an unexplained fail-open. Clamping keeps the request working; the warning is
 * deduped per distinct value so a hot-path gate can't turn it into log spam.
 */
function parseTimeoutMs(raw: string | undefined): number {
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return DEFAULT_JEV_TIMEOUT_MS;
  const floor = Math.floor(parsed);
  const clamped = Math.min(Math.max(floor, TIMEOUT_MIN_MS), TIMEOUT_MAX_MS);
  if (clamped !== floor && lastWarnedTimeoutValue !== raw) {
    lastWarnedTimeoutValue = raw;
    log.warn(
      `OMNIROUTE_JEV_TIMEOUT_MS=${raw} is out of range (${TIMEOUT_MIN_MS}-${TIMEOUT_MAX_MS} ms); clamped to ${clamped}ms`,
      { requested: raw, clamped }
    );
  }
  return clamped;
}

function parseBlockThreshold(raw: string | undefined): number {
  const parsed = Number(raw);
  if (Number.isFinite(parsed) && parsed > 0 && parsed <= 1) return parsed;
  return DEFAULT_JEV_BLOCK_THRESHOLD;
}

function stripTrailingSlashes(value: string): string {
  return value.replace(/\/+$/, "");
}

export function readJevEnvConfig(env: EnvLike = process.env): JevEnvConfig {
  const baseUrlRaw = env.OMNIROUTE_JEV_BASE_URL?.trim() || env.TYPESAFE_BASE_URL?.trim();
  const providerId = env.OMNIROUTE_JEV_PROVIDER?.trim();
  return {
    enabledMode: parseEnabledMode(env.OMNIROUTE_JEV_ENABLED),
    apiKey: env.OMNIROUTE_JEV_API_KEY?.trim() || env.TYPESAFE_API_KEY?.trim() || null,
    baseUrl: baseUrlRaw ? stripTrailingSlashes(baseUrlRaw) : null,
    wire: parseWire(env.OMNIROUTE_JEV_WIRE),
    providerId: providerId || null,
    model: env.OMNIROUTE_JEV_MODEL?.trim() || null,
    timeoutMs: parseTimeoutMs(env.OMNIROUTE_JEV_TIMEOUT_MS),
    features: parseJevFeatures(env.OMNIROUTE_JEV_FEATURES),
    blockThreshold: parseBlockThreshold(env.OMNIROUTE_JEV_BLOCK_THRESHOLD),
    allowSelfLoop:
      env.OMNIROUTE_JEV_ALLOW_SELF === "1" ||
      env.OMNIROUTE_JEV_ALLOW_SELF?.toLowerCase() === "true",
  };
}

/**
 * Synchronous, env-only gate for a single lane. Used on hot paths before any
 * credential/DB work: a lane that is off here can never engage, even when a
 * credential would resolve.
 */
export function isJevFeatureEnabled(feature: JevFeature, env: EnvLike = process.env): boolean {
  const config = readJevEnvConfig(env);
  if (config.enabledMode !== "on") return false;
  return config.features[feature] === true;
}

const RUNTIME_POSITIVE_TTL_MS = 60_000;
const RUNTIME_NEGATIVE_TTL_MS = 15_000;

let runtimeCache: { at: number; value: JevRuntime | null } | null = null;

interface DecisionConnection {
  apiKey: string | null;
  baseUrl: string | null;
}

/**
 * Read a provider connection's credential + base URL. The row wins; the static
 * provider registry supplies the base URL when the row stores none (built-in
 * providers). Lazy imports keep this service out of client import graphs.
 */
async function readDecisionConnection(providerId: string): Promise<DecisionConnection | null> {
  let apiKey: string | null = null;
  let baseUrl: string | null = null;
  try {
    // Domain accessor (decrypts lazily) — no raw SQL from open-sse (#15641 review).
    const { getProviderConnections } = await import("../../../src/lib/db/providers.ts");
    const [connection] = await getProviderConnections({ provider: providerId, isActive: true });
    const key = connection?.apiKey;
    if (typeof key === "string" && key.length > 0) apiKey = key;
    const specific = connection?.providerSpecificData as { baseUrl?: unknown } | undefined;
    if (typeof specific?.baseUrl === "string" && specific.baseUrl.trim().length > 0) {
      baseUrl = stripTrailingSlashes(specific.baseUrl.trim());
    }
  } catch (error) {
    // Missing DB or decrypt failure reduce to "no row data" (fail-open), but stay visible.
    log.debug("Decision-model connection lookup failed; falling back to env/registry", {
      providerId,
      error: error instanceof Error ? error.name : typeof error,
    });
  }

  if (!baseUrl) {
    try {
      const { REGISTRY } = await import("../../config/providers/index.ts");
      const entry = REGISTRY[providerId];
      if (entry && typeof entry.baseUrl === "string" && entry.baseUrl.length > 0) {
        baseUrl = stripTrailingSlashes(entry.baseUrl);
      }
    } catch {
      // Registry unavailable — baseUrl stays null.
    }
  }

  if (!apiKey && !baseUrl) return null;
  return { apiKey, baseUrl };
}

/**
 * Resolve the runtime credential + connection settings. Returns `null` unless the
 * master switch is explicitly `on`, or when the configuration is incomplete (fail-open for
 * callers). Results are memoized (positive 60s / negative 15s) so hot paths
 * never hit the DB per request.
 *
 * Resolution order:
 *   - key:      OMNIROUTE_JEV_API_KEY || TYPESAFE_API_KEY || connection key
 *   - base URL: OMNIROUTE_JEV_BASE_URL || (explicit provider) connection/registry
 *               || the typesafe default (typesafe wire only)
 *   - wire:     OMNIROUTE_JEV_WIRE || (non-typesafe provider ? "openai" : "typesafe")
 *   - model:    OMNIROUTE_JEV_MODEL || "jev-latest" (typesafe wire only — an
 *               OpenAI-compatible classifier endpoint always needs an explicit
 *               model id)
 */
export async function resolveJevRuntime(): Promise<JevRuntime | null> {
  const env = readJevEnvConfig();
  if (env.enabledMode !== "on") return null;

  const now = Date.now();
  if (runtimeCache) {
    const ttl = runtimeCache.value ? RUNTIME_POSITIVE_TTL_MS : RUNTIME_NEGATIVE_TTL_MS;
    if (now - runtimeCache.at < ttl) return runtimeCache.value;
  }

  // The typesafe row is consulted for the key even without an explicit provider
  // (dashboard-managed credentials); an explicit provider additionally supplies
  // its base URL.
  const connection = await readDecisionConnection(env.providerId ?? "typesafe");
  const apiKey = env.apiKey ?? connection?.apiKey ?? null;
  const wire: DecisionWire =
    env.wire ?? (env.providerId && env.providerId !== "typesafe" ? "openai" : "typesafe");
  let resolvedBaseUrl: string | null = env.baseUrl;
  if (!resolvedBaseUrl && env.providerId && connection) resolvedBaseUrl = connection.baseUrl;
  if (!resolvedBaseUrl && wire === "typesafe") resolvedBaseUrl = DEFAULT_JEV_BASE_URL;
  const model = env.model ?? (wire === "typesafe" ? DEFAULT_JEV_MODEL : null);

  // Self-loop guard: a classifier pointed back at OmniRoute's own gateway would
  // re-enter the routing/compression lanes on every nested request and classify
  // itself. Refuse unless the operator explicitly opts in.
  if (resolvedBaseUrl && isSelfGatewayBaseUrl(resolvedBaseUrl) && env.allowSelfLoop !== true) {
    log.warn(
      "Decision-model base URL points at OmniRoute's own gateway; refusing to avoid classifier recursion (set OMNIROUTE_JEV_ALLOW_SELF=1 to override)",
      { baseUrl: resolvedBaseUrl }
    );
    runtimeCache = { at: now, value: null };
    return null;
  }

  const value: JevRuntime | null =
    apiKey && resolvedBaseUrl && model
      ? {
          apiKey,
          baseUrl: resolvedBaseUrl,
          model,
          wire,
          timeoutMs: env.timeoutMs,
          blockThreshold: env.blockThreshold,
        }
      : null;

  runtimeCache = { at: now, value };
  if (!value && env.enabledMode === "on") {
    log.warn("Decision model is enabled but the configuration is incomplete; lanes stay inert", {
      hasKey: Boolean(apiKey),
      hasBaseUrl: Boolean(resolvedBaseUrl),
      hasModel: Boolean(model),
      wire,
      providerId: env.providerId ?? null,
    });
  }
  return value;
}

export function __resetJevRuntimeCacheForTests(): void {
  runtimeCache = null;
  lastWarnedTimeoutValue = null;
}

/**
 * True when the incoming request is itself a classifier call (see
 * `DECISION_MODEL_REQUEST_HEADER`); the decision lanes skip those.
 *
 * Accepts BOTH header shapes the call sites pass: a real `Headers` (with `.get()`)
 * and the plain `Record<string, string>` that `buildClientRawRequest` produces via
 * `Object.fromEntries(request.headers.entries())`. The record case is read
 * case-insensitively by scanning entries — a `.get()`-only implementation would
 * silently return false there and the self-loop guard would never engage. Kept
 * inline (no import of the chatCore header helper) to preserve layering:
 * `services/jev` must not depend on handler internals.
 */
export function isDecisionModelRequest(
  headers: { get?: (name: string) => string | null } | Record<string, unknown> | null | undefined
): boolean {
  if (!headers) return false;
  const get = (headers as { get?: (name: string) => string | null }).get;
  if (typeof get === "function") {
    try {
      if (get.call(headers, DECISION_MODEL_REQUEST_HEADER) === "1") return true;
    } catch {
      // fall through to the record scan
    }
  }
  const record = headers as Record<string, unknown>;
  for (const [name, value] of Object.entries(record)) {
    if (name.toLowerCase() === DECISION_MODEL_REQUEST_HEADER && value === "1") return true;
  }
  return false;
}

/**
 * True when a base URL points at OmniRoute's own gateway (loopback + the
 * server port). Self-loop classifier endpoints are refused unless
 * `OMNIROUTE_JEV_ALLOW_SELF=1`: the nested request re-enters the gateway, and
 * every lane that classifies would issue another classifier call.
 */
export function isSelfGatewayBaseUrl(baseUrl: string): boolean {
  try {
    const url = new URL(baseUrl);
    const host = url.hostname.toLowerCase();
    const loopback =
      host === "127.0.0.1" || host === "localhost" || host === "::1" || host === "[::1]";
    if (!loopback) return false;
    const port = url.port || (url.protocol === "https:" ? "443" : "80");
    return port === (process.env.PORT?.trim() || "20128");
  } catch {
    return false;
  }
}
