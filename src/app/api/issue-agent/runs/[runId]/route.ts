import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { getIssueAgentRun } from "@/lib/issueAgent";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type RouteContext = {
  params: Promise<{ runId: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { runId } = await context.params;
  const run = getIssueAgentRun(runId);
  if (!run) {
    return createErrorResponse({ status: 404, message: "Issue-agent run not found" });
  }

  return NextResponse.json({ run }, { headers: { "Cache-Control": "no-store" } });
}
