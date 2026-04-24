import { NextResponse } from "next/server";
import { getEvalScorecard, listEvalRuns } from "@/lib/localDb";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const suiteId = url.searchParams.get("suiteId")?.trim() || undefined;
    const limitValue = Number.parseInt(url.searchParams.get("limit") || "", 10);
    const limit = Number.isFinite(limitValue) && limitValue > 0 ? Math.min(limitValue, 100) : 50;

    return NextResponse.json({
      scorecard: getEvalScorecard({ suiteId, limit }),
      runs: listEvalRuns({ suiteId, limit }),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
