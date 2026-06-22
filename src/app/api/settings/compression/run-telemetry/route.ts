import { NextResponse } from "next/server";
import { getCompressionRunTelemetrySummary } from "@/lib/db/compressionRunTelemetry";

export const dynamic = "force-dynamic";

export async function GET() {
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
