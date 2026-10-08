/**
 * GET /api/provider-intelligence?provider=<id>
 *
 * Returns per-model intelligence scores for all models belonging to the
 * specified provider. Reuses the same fuzzy-matching and model-list assembly
 * that powers the free-provider-rankings page.
 *
 * Auth: requireManagementAuth (same guard used by all other management API routes)
 */

import { NextRequest, NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { listModelIntelligence } from "@/lib/db/modelIntelligence";
import {
  mergeProviderModels,
  findMatchingIntelligence,
  type RankableModel,
} from "@/lib/freeProviderRankings";
import { isFreeModel } from "@/shared/utils/freeModels";
import { getCustomModels } from "@/lib/db/models";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry";

export interface ProviderModelIntelligence {
  modelId: string;
  modelName: string;
  score: number;
  eloRaw: number | null;
  confidence: string | null;
  category: string;
  isFree: boolean;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError as NextResponse;

  const provider = request.nextUrl.searchParams.get("provider");
  if (!provider || provider.trim() === "") {
    return NextResponse.json(
      { error: "Missing required query parameter: provider" },
      { status: 400 }
    );
  }

  const providerId = provider.trim();

  // Assemble models: static registry + user-added custom models (same as rankings page)
  const entry = REGISTRY[providerId];
  const registryModels: RankableModel[] = entry?.models ?? [];
  const customModels = (await getCustomModels(providerId)) as RankableModel[];
  const models = mergeProviderModels(
    registryModels,
    Array.isArray(customModels) ? customModels : []
  );

  // Load all intelligence entries (all sources — user_override > arena_elo > models_dev_tier)
  const intelligenceEntries = listModelIntelligence();

  // Build a lookup map: normalized model name → entries (same shape as rankings page)
  const intelMap = new Map<
    string,
    Array<{ score: number; eloRaw: number | null; confidence: string | null; category: string }>
  >();
  for (const ie of intelligenceEntries) {
    const key = ie.model.toLowerCase();
    const existing = intelMap.get(key);
    if (existing) {
      existing.push({
        score: ie.score,
        eloRaw: ie.eloRaw,
        confidence: ie.confidence,
        category: ie.category,
      });
    } else {
      intelMap.set(key, [
        {
          score: ie.score,
          eloRaw: ie.eloRaw,
          confidence: ie.confidence,
          category: ie.category,
        },
      ]);
    }
  }

  // Score each model
  const result: ProviderModelIntelligence[] = models.map((model) => {
    const match = findMatchingIntelligence(model.id, intelMap);
    return {
      modelId: model.id,
      modelName: model.name,
      score: match?.score ?? 0,
      eloRaw: match?.eloRaw ?? null,
      confidence: match?.confidence ?? null,
      category: match?.category ?? "",
      isFree: isFreeModel(providerId, { id: model.id }),
    };
  });

  // Sort by score descending
  result.sort((a, b) => b.score - a.score);

  return NextResponse.json(result);
}
