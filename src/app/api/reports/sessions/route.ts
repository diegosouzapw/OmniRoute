import { createErrorResponse } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { listAgentSessions } from "@/lib/db/agentSessions";
import { getDbInstance } from "@/lib/db/core";

import { searchParamsObject, sessionsQuerySchema } from "../_lib";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const parsed = sessionsQuerySchema.safeParse(searchParamsObject(request));
  if (!parsed.success) {
    return createErrorResponse({
      status: 400,
      message: "Invalid query parameters",
      details: parsed.error.issues,
    });
  }

  try {
    return Response.json(listAgentSessions(getDbInstance(), parsed.data));
  } catch (error) {
    console.error("[reports] session list failed:", error);
    return createErrorResponse({ status: 500, message: "Failed to list sessions" });
  }
}
