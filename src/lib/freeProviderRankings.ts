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
 * Compute rankings for free providers based on ELO scores.
 *
 * @param category - Optional filter for task category (e.g., "coding", "default")
 * @param limit - Maximum number of providers to return
 */
export function computeFreeProviderRankings(
  category?: string,
  limit: number = 50
): FreeProviderRanking[] {
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

  return rankings.slice(0, limit);
}
