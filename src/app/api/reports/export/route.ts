import { createErrorResponse } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  breakdownToCsv,
  buildAgentSessionReport,
  listAgentSessionsForExport,
  sessionsToCsv,
} from "@/lib/usage/agentSessionReports";

import { exportQuerySchema, searchParamsObject } from "../_lib";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const parsed = exportQuerySchema.safeParse(searchParamsObject(request));
  if (!parsed.success) {
    return createErrorResponse({
      status: 400,
      message: "Invalid query parameters",
      details: parsed.error.issues,
    });
  }

  const { type, ...filter } = parsed.data;
  try {
    const csv =
      type === "sessions"
        ? sessionsToCsv(listAgentSessionsForExport(filter))
        : breakdownToCsv((await buildAgentSessionReport(filter)).breakdowns[type]);
    const day = new Date().toISOString().slice(0, 10);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="omniroute-report-${type}-${day}.csv"`,
      },
    });
  } catch (error) {
    console.error("[reports] export failed:", error);
    return createErrorResponse({ status: 500, message: "Failed to export report" });
  }
}
