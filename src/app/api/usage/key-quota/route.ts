import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  getKeyQuotaStatus,
  upsertKeyQuotaLimits,
  clearKeyQuotaLimits,
} from "@/lib/db/keyQuota";
import { setKeyQuotaSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

/**
 * GET /api/usage/key-quota?apiKeyId=... — per-key tpm/rpm/monthly quota status
 * (limits + current usage + exceeded flags).
 *
 * POST /api/usage/key-quota — upsert quota limits for a key. Omitted fields
 * keep their existing value; 0/null clears a dimension (unlimited).
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const apiKeyId = searchParams.get("apiKeyId");
    if (!apiKeyId) {
      return NextResponse.json({ error: "apiKeyId query param is required" }, { status: 400 });
    }
    const status = getKeyQuotaStatus(apiKeyId);
    return NextResponse.json(status);
  } catch (error) {
    console.error("Error fetching key quota:", error);
    return NextResponse.json({ error: "Failed to fetch key quota" }, { status: 500 });
  }
}

export async function POST(request: Request) {
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
    const validation = validateBody(setKeyQuotaSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { apiKeyId, tpmLimit, rpmLimit, monthlyAmountUsd } = validation.data;
    const limits = upsertKeyQuotaLimits(apiKeyId, { tpmLimit, rpmLimit, monthlyAmountUsd });
    return NextResponse.json({ success: true, apiKeyId, limits });
  } catch (error) {
    console.error("Error setting key quota:", error);
    return NextResponse.json({ error: "Failed to set key quota" }, { status: 500 });
  }
}

/**
 * DELETE /api/usage/key-quota?apiKeyId=... — remove quota limits + counters.
 */
export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const apiKeyId = searchParams.get("apiKeyId");
    if (!apiKeyId) {
      return NextResponse.json({ error: "apiKeyId query param is required" }, { status: 400 });
    }
    clearKeyQuotaLimits(apiKeyId);
    return NextResponse.json({ success: true, apiKeyId });
  } catch (error) {
    console.error("Error clearing key quota:", error);
    return NextResponse.json({ error: "Failed to clear key quota" }, { status: 500 });
  }
}
