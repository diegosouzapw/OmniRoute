/**
 * freeProviderRankings.ts — Compute rankings for free providers based on model ELO scores.
 *
 * Joins free providers (no-auth, OAuth, API key) with their models from the registry
 * and their intelligence scores from the `model_intelligence` DB table.
 *
 * Uses flexible matching to bridge naming gaps between registry model IDs
 * and Arena-normalized model names (e.g., "kimi-k2.6" vs "kimi-k2").
 */

import { NOAUTH_PROVIDERS, OAUTH_PROVIDERS, APIKEY_PROVIDERS } from "@/shared/constants/providers";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry";
import { listModelIntelligence } from "./db/modelIntelligence";
import { getProviderConnections } from "./db/providers";

export interface ProviderModelScore {
  modelId: string;
  modelName: string;
  score: number;
  eloRaw: number | null;
  confidence: string | null;
  category: string;
}

export interface FreeProviderRanking {
  id: string;
  name: string;
  icon: string;
  color: string;
  textIcon?: string;
  category: "noauth" | "oauth" | "apikey";
  topModel: ProviderModelScore | null;
  averageScore: number;
  modelCount: number;
}

/**
 * Get all free providers from all categories.
 */
function getFreeProviders() {
  const providers: Array<{
    id: string;
    name: string;
    icon: string;
    color: string;
    textIcon?: string;
    category: "noauth" | "oauth" | "apikey";
  }> = [];

  // No-auth providers are always free
  for (const [id, p] of Object.entries(NOAUTH_PROVIDERS)) {
    providers.push({
      id,
      name: p.name,
      icon: p.icon,
      color: p.color,
      textIcon: p.textIcon,
      category: "noauth",
    });
  }

  // OAuth providers with free tier
  for (const [id, p] of Object.entries(OAUTH_PROVIDERS)) {
    if ("hasFree" in p && p.hasFree) {
      providers.push({
        id,
        name: p.name,
        icon: p.icon,
        color: p.color,
        textIcon: "textIcon" in p ? (p as any).textIcon : undefined,
        category: "oauth",
      });
    }
  }

  // API key providers with free tier
  for (const [id, p] of Object.entries(APIKEY_PROVIDERS)) {
    if ("hasFree" in p && p.hasFree) {
      providers.push({
        id,
        name: p.name,
        icon: p.icon,
        color: p.color,
        textIcon: "textIcon" in p ? (p as any).textIcon : undefined,
        category: "apikey",
      });
    }
  }

  return providers;
}

/**
 * Get models for a provider from the registry.
 */
function getProviderModels(providerId: string) {
  const entry = REGISTRY[providerId];
  return entry?.models ?? [];
}

/**
 * Strip trailing version suffixes from a model ID for fuzzy matching.
 * E.g., "kimi-k2.6" → "kimi-k2", "gpt-5.5" → "gpt-5"
 */
export function stripVersionSuffix(id: string): string {
  return id.replace(/\.\d+(\.\d+)*$/, "");
}

/**
 * Find the best matching intelligence entry for a registry model ID.
 *
 * Strategy (in order):
 * 1. Exact match on normalized model ID
 * 2. Exact match on model ID with version suffix stripped
 * 3. Prefix match (intelligence entry model is a prefix of registry ID)
 *
 * @param modelId - The registry model ID (e.g., "kimi-k2.6")
 * @param intelMap - Map of normalized model names → intelligence entries
 * @returns The best matching intelligence entry, or null
 */
export function findMatchingIntelligence(
  modelId: string,
  intelMap: Map<
    string,
    Array<{ score: number; eloRaw: number | null; confidence: string | null; category: string }>
  >
): { score: number; eloRaw: number | null; confidence: string | null; category: string } | null {
  const normalizedId = modelId.toLowerCase();

  // Strategy 1: Exact match
  const exactMatches = intelMap.get(normalizedId);
  if (exactMatches && exactMatches.length > 0) {
    return exactMatches.reduce((prev, curr) => (curr.score > prev.score ? curr : prev));
  }

  // Strategy 2: Strip version suffix and match
  const stripped = stripVersionSuffix(normalizedId);
  if (stripped !== normalizedId) {
    const strippedMatches = intelMap.get(stripped);
    if (strippedMatches && strippedMatches.length > 0) {
      return strippedMatches.reduce((prev, curr) => (curr.score > prev.score ? curr : prev));
    }
  }

  // Strategy 3: Prefix match (intelligence entry model is a prefix of registry ID)
  let bestPrefixMatch: {
    score: number;
    eloRaw: number | null;
    confidence: string | null;
    category: string;
  } | null = null;
  for (const [modelName, entries] of intelMap) {
    if (normalizedId.startsWith(modelName + "-") || normalizedId.startsWith(modelName + ".")) {
      const best = entries.reduce((prev, curr) => (curr.score > prev.score ? curr : prev));
      if (!bestPrefixMatch || best.score > bestPrefixMatch.score) {
        bestPrefixMatch = best;
      }
    }
  }

  return bestPrefixMatch;
}

/**
 * Minimal shape of a provider connection needed to decide "configured" /
 * "non-exhausted". Matches the camelCase columns returned by
 * `getProviderConnections()` (`provider`, `testStatus`, `rateLimitedUntil`).
 */
export interface ConnectionState {
  provider: string;
  testStatus?: string | null;
  rateLimitedUntil?: string | null;
}

/**
 * Options controlling the additive "configured" / "available" filters.
 * Both default off (undefined/false) → output identical to current behavior.
 */
export interface FreeProviderRankingFilterOptions {
  /** Keep only providers that have ≥1 (active) connection configured. */
  configuredOnly?: boolean;
  /** Keep only providers that have ≥1 non-exhausted, non-rate-limited connection (implies configured). */
  availableOnly?: boolean;
}

// Terminal connection statuses — mirrors `isTerminalConnectionStatus`
// (`src/sse/services/auth.ts`). A connection in one of these states stays
// unavailable until credentials/settings change; it never self-recovers.
const TERMINAL_CONNECTION_STATUSES = new Set(["credits_exhausted", "banned", "expired"]);

/**
 * Pure predicate: is at least one of a provider's connections usable *right now*?
 *
 * A connection is usable when it is neither terminal (`testStatus` ∉
 * {credits_exhausted, banned, expired}) nor currently rate-limited
 * (`rateLimitedUntil` null or in the past — lazy recovery, matching the
 * Connection Cooldown rule in CLAUDE.md).
 *
 * NOTE: granularity is PROVIDER-level (connection = provider+account). Per-model
 * quota lockout (model lockout, `open-sse/services/accountFallback.ts`) is a
 * deferred Phase 3 and is intentionally NOT consulted here.
 */
export function isProviderUsable(connections: ConnectionState[], now: number = Date.now()): boolean {
  return connections.some((conn) => {
    const status = (conn.testStatus || "").trim().toLowerCase();
    if (TERMINAL_CONNECTION_STATUSES.has(status)) return false;
    if (conn.rateLimitedUntil) {
      const until = new Date(conn.rateLimitedUntil).getTime();
      if (Number.isFinite(until) && until > now) return false;
    }
    return true;
  });
}

/**
 * Pure filter over a ranking list + a snapshot of provider connections.
 *
 * - `configuredOnly`: keep only providers whose `id` appears in `connections`.
 * - `availableOnly` (implies configured): additionally require ≥1 usable
 *   connection per `isProviderUsable`.
 *
 * With both flags off/absent the input list is returned unchanged.
 * Fully synchronous + side-effect-free so it can be unit-tested without a DB.
 */
export function filterFreeProviderRankings(
  rankings: FreeProviderRanking[],
  connections: ConnectionState[],
  opts: FreeProviderRankingFilterOptions = {},
  now: number = Date.now()
): FreeProviderRanking[] {
  const { configuredOnly, availableOnly } = opts;
  if (!configuredOnly && !availableOnly) return rankings;

  const byProvider = new Map<string, ConnectionState[]>();
  for (const conn of connections) {
    const list = byProvider.get(conn.provider);
    if (list) {
      list.push(conn);
    } else {
      byProvider.set(conn.provider, [conn]);
    }
  }

  return rankings.filter((ranking) => {
    const conns = byProvider.get(ranking.id);
    if (!conns || conns.length === 0) return false; // not configured
    if (availableOnly) return isProviderUsable(conns, now);
    return true; // configuredOnly
  });
}

/**
 * Compute rankings for free providers based on ELO scores.
 *
 * @param category - Optional filter for task category (e.g., "coding", "default")
 * @param limit - Maximum number of providers to return
 * @param opts - Optional additive filters (configured-only / available-only).
 *   When set, live provider-connection state is read from the DB and providers
 *   with no configured / no usable connection are dropped. Both default off.
 */
export async function computeFreeProviderRankings(
  category?: string,
  limit: number = 50,
  opts: FreeProviderRankingFilterOptions = {}
): Promise<FreeProviderRanking[]> {
  const freeProviders = getFreeProviders();
  const intelligenceEntries = listModelIntelligence({
    source: "arena_elo",
    category: category || undefined,
  });

  // Create a map for fast lookup: model name → intelligence entries
  const intelMap = new Map<string, typeof intelligenceEntries>();
  for (const entry of intelligenceEntries) {
    const modelKey = entry.model.toLowerCase();
    if (!intelMap.has(modelKey)) {
      intelMap.set(modelKey, []);
    }
    intelMap.get(modelKey)!.push(entry);
  }

  const rankings: FreeProviderRanking[] = [];

  for (const provider of freeProviders) {
    const models = getProviderModels(provider.id);
    if (models.length === 0) continue;

    const modelScores: ProviderModelScore[] = [];

    for (const model of models) {
      const match = findMatchingIntelligence(model.id, intelMap);

      if (match) {
        modelScores.push({
          modelId: model.id,
          modelName: model.name,
          score: match.score,
          eloRaw: match.eloRaw,
          confidence: match.confidence,
          category: match.category,
        });
      }
    }

    if (modelScores.length === 0) continue;

    // Sort models by score descending
    modelScores.sort((a, b) => b.score - a.score);

    const topModel = modelScores[0];
    const averageScore = modelScores.reduce((sum, m) => sum + m.score, 0) / modelScores.length;

    rankings.push({
      ...provider,
      topModel,
      averageScore,
      modelCount: modelScores.length,
    });
  }

  // Sort providers by top model score descending, then by average score
  rankings.sort((a, b) => {
    if (a.topModel && b.topModel) {
      return b.topModel.score - a.topModel.score;
    }
    if (a.topModel) return -1;
    if (b.topModel) return 1;
    return b.averageScore - a.averageScore;
  });

  // Apply the additive configured/available filters (if requested) BEFORE the
  // limit slice, so `limit` counts providers that survive the filter.
  let filtered = rankings;
  if (opts.configuredOnly || opts.availableOnly) {
    const connections = (await getProviderConnections({ isActive: true })) as ConnectionState[];
    filtered = filterFreeProviderRankings(rankings, connections, opts);
  }

  return filtered.slice(0, limit);
}
