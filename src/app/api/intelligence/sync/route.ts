/**
 * API Route: /api/intelligence/sync
 *
 * POST — Trigger a manual Arena ELO intelligence sync.
 * GET — Get current intelligence sync status.
 * DELETE — Clear all synced arena_elo intelligence data.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { intelligenceSyncRequestSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

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
    const { dryRun = false } = validation.data;

    const { syncArenaElo } = await import("@/lib/arenaEloSync");
    const result = await syncArenaElo(dryRun);

    return NextResponse.json(result, { status: result.success ? 200 : 502 });
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
    return NextResponse.json(getArenaEloSyncStatus());
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
