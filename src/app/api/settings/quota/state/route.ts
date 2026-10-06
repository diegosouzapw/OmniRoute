/**
 * /api/settings/quota/state — Dashboard visibility endpoint for provider quota states.
 *
 * GET: Returns live quota states, reset timers, and aggregated usage analytics.
 * POST: Resets expired quota windows or purges a specific connection quota record.
 *
 * Auth: requireManagementAuth (dashboard session, manage-scope API key, or local CLI token).
 * Sanitization: all error responses via buildErrorBody (Hard Rule #12).
 * Validation: POST body validated with Zod.
 *
 * Part of: Quota-aware provider scheduling (Phase 2).
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getQuotaAnalyticsSummary } from "@/lib/quota/quotaAnalytics";
import { getActiveQuotaResetItems, resetExpiredQuotaWindows } from "@/lib/quota/quotaResetTimers";
import { clearProviderQuota } from "@/lib/quota/providerQuotaState";

const QuotaStateActionSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("reset_expired") }),
  z.object({
    action: z.literal("clear_connection"),
    connectionId: z.string().min(1),
    model: z.string().min(1),
  }),
]);

export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const analytics = getQuotaAnalyticsSummary();
    const resetTimers = getActiveQuotaResetItems();

    return NextResponse.json(
      {
        success: true,
        analytics,
        resetTimers,
        timestamp: new Date().toISOString(),
      },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to read quota state";
    return NextResponse.json(buildErrorBody(500, message), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json().catch(() => null);
    const parsed = QuotaStateActionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(buildErrorBody(400, parsed.error.message), {
        status: 400,
        headers: CORS_HEADERS,
      });
    }

    const { action } = parsed.data;

    if (action === "reset_expired") {
      const resetCount = resetExpiredQuotaWindows();
      return NextResponse.json(
        { success: true, resetCount, message: `Reset ${resetCount} expired quota windows.` },
        { headers: CORS_HEADERS }
      );
    }

    // action === "clear_connection"
    const { connectionId, model } = parsed.data;
    clearProviderQuota(connectionId);
    return NextResponse.json(
      { success: true, message: `Cleared quota state for connection ${connectionId} (${model}).` },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update quota state";
    return NextResponse.json(buildErrorBody(500, message), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }
}
