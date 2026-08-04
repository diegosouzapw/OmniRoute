import { NextResponse } from "next/server";
import { z } from "zod";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { RESET_USAGE_HISTORY_PERIODS, resetUsageHistory } from "@/lib/db/cleanup";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

export const runtime = "nodejs";

const resetUsageHistorySchema = z.object({
  period: z.enum(RESET_USAGE_HISTORY_PERIODS),
});

export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  const validation = validateBody(resetUsageHistorySchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const result = await resetUsageHistory(validation.data.period);
    return NextResponse.json(
      {
        deleted: result.deleted,
        deletedUsageHistory: result.deletedUsageHistory,
        deletedDailySummary: result.deletedDailySummary,
        deletedHourlySummary: result.deletedHourlySummary,
        deletedCallLogs: result.deletedCallLogs,
        deletedCallLogArtifacts: result.deletedCallLogArtifacts,
        deletedRequestDetailLogs: result.deletedRequestDetailLogs,
        deletedProxyLogs: result.deletedProxyLogs,
        deletedRelayLogs: result.deletedRelayLogs,
        deletedCompressionAnalytics: result.deletedCompressionAnalytics,
        deletedCompressionRunTelemetry: result.deletedCompressionRunTelemetry,
        deletedRoutingDecisions: result.deletedRoutingDecisions,
        deletedQuotaConsumption: result.deletedQuotaConsumption,
        deletedTokenLedger: result.deletedTokenLedger,
        errors: result.errors,
      },
      { status: result.errors > 0 ? 500 : 200 }
    );
  } catch {
    return NextResponse.json(buildErrorBody(500, "Failed to reset usage history"), {
      status: 500,
    });
  }
}
