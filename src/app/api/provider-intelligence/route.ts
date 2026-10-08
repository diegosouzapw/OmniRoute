/**
 * API Route: /api/provider-intelligence
 *
 * GET — Resolve per-model intelligence for a provider's catalog models,
 *       with the winning source surfaced per entry.
 *
 * Resolution chain (highest priority first):
 *   1. user_override   — operator-set fitness entry
 *   2. arena_elo       — Arena leaderboard ELO
 *   3. models_dev_tier — persisted tier-derived fitness
 *
 * Management-authed. Errors route through sanitizeErrorMessage().
 */

import { NextRequest, NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import {
  getModelIntelligence,
  listModelIntelligence,
  type ModelIntelligenceEntry,
} from "@/lib/db/modelIntelligence";
import {
  findMatchingIntelligence,
  mergeProviderModels,
  type RankableModel,
} from "@/lib/freeProviderRankings";
import { getDbInstance } from "@/lib/db/core";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry";

export interface ProviderModelIntelligence {
  modelId: string;
  modelName: string;
  score: number;
  eloRaw: number | null;
  confidence: string | null;
  category: string;
  source: string;
  isFree: boolean;
}

function buildIntelMap(): Map<string, ModelIntelligenceEntry[]> {
  const entries = listModelIntelligence();
  const map = new Map<string, ModelIntelligenceEntry[]>();
  for (const entry of entries) {
    const existing = map.get(entry.model);
    if (existing) {
      existing.push(entry);
    } else {
      map.set(entry.model, [entry]);
    }
  }
  return map;
}

function resolveSource(
  modelId: string,
  category: string
): ModelIntelligenceEntry | null {
  return getModelIntelligence(modelId, category);
}

function isProviderFree(providerId: string): boolean {
  try {
    const db = getDbInstance();
    const row = db
      .prepare(
        `SELECT has_free_models FROM providers WHERE id = ? LIMIT 1`
      )
      .get(providerId) as { has_free_models?: number | null } | undefined;
    return Boolean(row?.has_free_models);
  } catch {
    return false;
  }
}

async function getProviderCatalog(providerId: string): Promise<RankableModel[]> {
  const entry = REGISTRY[providerId] as { models?: RankableModel[] } | undefined;
  const registryModels = entry?.models ?? [];
  const { getCustomModels } = await import("@/lib/db/models");
  const customModels = (await getCustomModels(providerId)) as RankableModel[];
  return mergeProviderModels(registryModels, Array.isArray(customModels) ? customModels : []);
}

export async function GET(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const url = new URL(request.url);
  const providerId = url.searchParams.get("provider")?.trim().toLowerCase();

  if (!providerId) {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "provider", message: "provider query param is required" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const catalog = await getProviderCatalog(providerId);
    const intelMap = buildIntelMap();
    const free = isProviderFree(providerId);

    const results: ProviderModelIntelligence[] = [];
    for (const model of catalog) {
      const modelId = model.id.toLowerCase();
      const modelName = model.name || model.id;

      // Priority chain: user_override > arena_elo > models_dev_tier
      const entry = resolveSource(modelId, "coding") ||
        resolveSource(modelId, "default") ||
        resolveSource(modelId, "review") ||
        resolveSource(modelId, "analysis") ||
        resolveSource(modelId, "documentation") ||
        resolveSource(modelId, "debugging") ||
        resolveSource(modelId, "planning");

      if (entry) {
        results.push({
          modelId: model.id,
          modelName,
          score: entry.score,
          eloRaw: entry.eloRaw,
          confidence: entry.confidence,
          category: entry.category,
          source: entry.source,
          isFree: free,
        });
      } else {
        // Fuzzy match via findMatchingIntelligence
        const fuzzy = findMatchingIntelligence(
          modelId,
          new Map(
            Array.from(intelMap.entries()).map(([k, v]) => [
              k,
              v.map((e) => ({
                score: e.score,
                eloRaw: e.eloRaw,
                confidence: e.confidence,
                category: e.category,
              })),
            ])
          )
        );
        if (fuzzy) {
          results.push({
            modelId: model.id,
            modelName,
            score: fuzzy.score,
            eloRaw: fuzzy.eloRaw,
            confidence: fuzzy.confidence,
            category: fuzzy.category,
            source: "*:inherited",
            isFree: free,
          });
        }
      }
    }

    return NextResponse.json({
      provider: providerId,
      modelCount: results.length,
      models: results,
    });
  } catch (err) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(err) },
      { status: 500 }
    );
  }
}