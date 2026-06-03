import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { runManualVacuum } from "@/lib/db/core";

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = runManualVacuum();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `VACUUM completed in ${result.duration}ms`,
        duration: result.duration,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "VACUUM failed",
          duration: result.duration,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("[API] VACUUM endpoint error:", error);
    return NextResponse.json(
      { error: "Failed to run VACUUM", details: error.message },
      { status: 500 }
    );
  }
}
