import { NextResponse } from "next/server";
import {
  getDegradationReport,
  getDegradationSummary,
  hasAnyDegradation,
} from "@/domain/degradation";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const summaryStr = url.searchParams.get("summary");

    if (summaryStr === "true") {
      return NextResponse.json({
        summary: getDegradationSummary(),
        isDegraded: hasAnyDegradation(),
      });
    }

    const report = getDegradationReport();
    return NextResponse.json({
      active: hasAnyDegradation(),
      summary: getDegradationSummary(),
      features: report,
    });
  } catch (error) {
    console.error("[API ERROR] /api/health/degradation GET:", error);
    return NextResponse.json({ error: "Failed to fetch degradation report." }, { status: 500 });
  }
}
