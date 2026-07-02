import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getCompressionRunTelemetrySummary } from "@/lib/db/compressionRunTelemetry";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const summary = getCompressionRunTelemetrySummary();
    return NextResponse.json(summary);
  } catch {
    return NextResponse.json(
      {
        totalRuns: 0,
        totalTokensSaved: 0,
        runsWithStyles: 0,
        bypassCount: 0,
        totalOutputTokens: 0,
        appliedStyleCounts: {},
      },
      { status: 200 }
    );
  }
}
