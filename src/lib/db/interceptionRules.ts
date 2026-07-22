/**
 * db/interceptionRules.ts — Per-model web-search / web-fetch interception rules (#3384).
 *
 * CRUD against the key_value table under namespace "interception_rules". Follows the
 * established key_value pattern from paramFilters.ts / databaseSettings.ts.
 *
 * Resolution precedence (see resolveInterceptSearch): per-model rule > provider-level
 * rule > undefined (caller falls back to the existing native-bypass defaults).
 */

import { getDbInstance } from "./core";

const NAMESPACE = "interception_rules";

// ── Types ───────────────────────────────────────────────────────────────────

export type FetchInterceptionBackend = "firecrawl" | "jina" | "tavily";

export interface ModelInterceptionRule {
  /** true = route through OmniRoute's /v1/search; false = force native passthrough. */
  interceptSearch?: boolean;
  /** true = route through OmniRoute's /v1/web/fetch; false = force native passthrough. */
  interceptFetch?: boolean;
  fetchBackend?: FetchInterceptionBackend;
  fetchProxyUrl?: string;
}

export interface ProviderInterceptionRules {
  /** Provider-level default, used when a model has no override. */
  interceptSearch?: boolean;
  interceptFetch?: boolean;
  fetchBackend?: FetchInterceptionBackend;
  fetchProxyUrl?: string;
  /** Per-model overrides (stricter/looser than provider-level). */
  models?: Record<string, ModelInterceptionRule>;
}

// ── Cache ───────────────────────────────────────────────────────────────────

let rulesCache: Map<string, ProviderInterceptionRules> | null = null;

function invalidateCache(): void {
  rulesCache = null;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function toNormalizedString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function toOptionalBool(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function toFetchBackend(value: unknown): FetchInterceptionBackend | undefined {
  return value === "firecrawl" || value === "jina" || value === "tavily" ? value : undefined;
}

function parseStoredValue(raw: unknown): unknown {
  if (typeof raw !== "string") return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function toModelInterceptionRule(raw: unknown): ModelInterceptionRule | null {
  if (!isRecord(raw)) return null;
  const rule: ModelInterceptionRule = {
    interceptSearch: toOptionalBool(raw.interceptSearch),
    interceptFetch: toOptionalBool(raw.interceptFetch),
    fetchBackend: toFetchBackend(raw.fetchBackend),
    fetchProxyUrl: toNormalizedString(raw.fetchProxyUrl) ?? undefined,
  };
  const hasAnyField = Object.values(rule).some((v) => v !== undefined);
  return hasAnyField ? rule : null;
}

function toModelInterceptionRules(raw: unknown): Record<string, ModelInterceptionRule> {
  const models: Record<string, ModelInterceptionRule> = {};
  if (!isRecord(raw)) return models;
  for (const [modelId, val] of Object.entries(raw)) {
    const rule = toModelInterceptionRule(val);
    if (rule) models[modelId] = rule;
  }
  return models;
}

function toProviderInterceptionRules(raw: unknown): ProviderInterceptionRules | null {
  if (!isRecord(raw)) return null;
  const models = toModelInterceptionRules(raw.models);
  return {
    interceptSearch: toOptionalBool(raw.interceptSearch),
    interceptFetch: toOptionalBool(raw.interceptFetch),
    fetchBackend: toFetchBackend(raw.fetchBackend),
    fetchProxyUrl: toNormalizedString(raw.fetchProxyUrl) ?? undefined,
    models: Object.keys(models).length > 0 ? models : undefined,
  };
}

// ── Read ────────────────────────────────────────────────────────────────────

function readNamespace(namespace: string): Record<string, unknown> {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all(namespace) as Array<{ key: string; value: string }>;

  const values: Record<string, unknown> = {};
  for (const row of rows) {
    values[row.key] = parseStoredValue(row.value);
  }
  return values;
}

function loadAllRules(): Map<string, ProviderInterceptionRules> {
  const raw = readNamespace(NAMESPACE);
  const map = new Map<string, ProviderInterceptionRules>();
  for (const [key, value] of Object.entries(raw)) {
    const parsed = toProviderInterceptionRules(value);
    if (parsed) map.set(key, parsed);
  }
  return map;
}

function loadRulesCached(): Map<string, ProviderInterceptionRules> {
  if (rulesCache === null) {
    rulesCache = loadAllRules();
  }
  return rulesCache;
}

// ── Public API ──────────────────────────────────────────────────────────────

/** Get the interception rules for a single provider, or null if not configured. */
export function getInterceptionRules(provider: string): ProviderInterceptionRules | null {
  return toNormalizedString(provider) ? (loadRulesCached().get(provider) ?? null) : null;
}

/** Upsert the entire interception rule set for a provider. Invalidates the cache. */
export function setInterceptionRules(provider: string, rules: ProviderInterceptionRules): void {
  const normalizedProvider = toNormalizedString(provider);
  if (!normalizedProvider) return;

  const db = getDbInstance();
  const stmt = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  );

  const normalized: ProviderInterceptionRules = {
    interceptSearch: rules.interceptSearch,
    interceptFetch: rules.interceptFetch,
    fetchBackend: rules.fetchBackend,
    fetchProxyUrl: rules.fetchProxyUrl,
    models: rules.models && Object.keys(rules.models).length > 0 ? rules.models : undefined,
  };

  stmt.run(NAMESPACE, normalizedProvider, JSON.stringify(normalized));
  invalidateCache();
}

/** Delete the interception rules for a provider. Resets that provider to default behavior. */
export function deleteInterceptionRules(provider: string): void {
  const normalizedProvider = toNormalizedString(provider);
  if (!normalizedProvider) return;

  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
    NAMESPACE,
    normalizedProvider
  );
  invalidateCache();
}

/**
 * Resolve the effective `interceptSearch` override for a provider/model pair.
 *
 * Precedence: per-model rule > provider-level rule > undefined (no override — the
 * caller should fall back to the existing native-bypass defaults).
 */
export function resolveInterceptSearch(
  provider: string | null | undefined,
  model: string | null | undefined
): boolean | undefined {
  const normalizedProvider = toNormalizedString(provider);
  if (!normalizedProvider) return undefined;

  const rules = getInterceptionRules(normalizedProvider);
  if (!rules) return undefined;

  const normalizedModel = toNormalizedString(model);
  if (normalizedModel && rules.models?.[normalizedModel]?.interceptSearch !== undefined) {
    return rules.models[normalizedModel].interceptSearch;
  }

  return rules.interceptSearch;
}

/**
 * Resolve the effective `interceptFetch` override for a provider/model pair.
 *
 * Precedence: per-model rule > provider-level rule > undefined (no override — the
 * caller should fall back to the existing native-bypass defaults). Structural twin of
 * resolveInterceptSearch above (#7339 / Phase 3 of #3384).
 */
export function resolveInterceptFetch(
  provider: string | null | undefined,
  model: string | null | undefined
): boolean | undefined {
  const normalizedProvider = toNormalizedString(provider);
  if (!normalizedProvider) return undefined;

  const rules = getInterceptionRules(normalizedProvider);
  if (!rules) return undefined;

  const normalizedModel = toNormalizedString(model);
  if (normalizedModel && rules.models?.[normalizedModel]?.interceptFetch !== undefined) {
    return rules.models[normalizedModel].interceptFetch;
  }

  return rules.interceptFetch;
}
