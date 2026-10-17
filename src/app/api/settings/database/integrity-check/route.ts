import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { runIntegrityCheck } from "@/lib/db/databaseSettings";

// On-demand storage integrity scan. Opening or saving storage settings only
// reads the last stored result; this explicit endpoint is the one settings
// path that runs the scan. The startup check, the scheduled maintenance and
// POST /api/db/health (scan plus repair) remain separate executors and are
// intentionally not merged here.
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = runIntegrityCheck();
    return NextResponse.json({
      integrityCheck: result.integrityCheck,
      lastIntegrityCheckAt: result.lastIntegrityCheckAt,
    });
  } catch (error) {
    console.error("Error running storage integrity check:", error);
    return NextResponse.json({ error: "Failed to run integrity check" }, { status: 500 });
  }
}
