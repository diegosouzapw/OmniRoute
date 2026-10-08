/**
 * API Route: /api/intelligence/sync
 *
 * POST — Trigger a manual intelligence sync (Arena ELO and/or models_dev_tier rebuild).
 * GET  — Get current intelligence sync status + per-source health.
 * DELETE — Clear all synced arena_elo intelligence data.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { intelligenceSyncRequestSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import {
  getIntelligenceSourcesHealth,
  rebuildModelsDevTierIntelligence,
} from "@/lib/db/modelIntelligence";

export async function POST(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(intelligenceSyncRequestSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { dryRun = false, rebuildTier = false, syncArenaElo = false } = validation.data;

    const { syncArenaElo: _syncArenaElo, getArenaEloSyncStatus } = await import("@/lib/arenaEloSync");

    let arenaResult: Awaited<ReturnType<typeof _syncArenaElo>> | null = null;
    if (syncArenaElo || (!dryRun && !rebuildTier && !syncArenaElo)) {
      arenaResult = await _syncArenaElo(dryRun);
    }

    let tierResult: { success: boolean; source: string; modelCount: number; pruned: number } | null = null;
    if (rebuildTier) {
      if (dryRun) {
        tierResult = { success: true, source: "models_dev_tier", modelCount: 0, pruned: 0 };
      } else {
        tierResult = rebuildModelsDevTierIntelligence();
      }
    }

    const merged: Record<string, unknown> = { success: true };
    if (arenaResult) Object.assign(merged, arenaResult);
    if (tierResult) {
      merged.tier = { upserted: tierResult.modelCount * 7, pruned: tierResult.pruned };
    }

    return NextResponse.json(merged, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(err) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { getArenaEloSyncStatus } = await import("@/lib/arenaEloSync");
    const status = getArenaEloSyncStatus();
    const sourcesDetail = getIntelligenceSourcesHealth();

    return NextResponse.json({
      ...status,
      sourcesDetail,
    });
  } catch (err) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(err) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { clearSyncedIntelligence } = await import("@/lib/arenaEloSync");
    clearSyncedIntelligence();
    return NextResponse.json({ success: true, message: "Synced intelligence data cleared" });
  } catch (err) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(err) },
      { status: 500 }
    );
  }
}
