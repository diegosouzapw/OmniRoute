import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { purgeCallLogs } from "@/lib/db/cleanup";
import { isAuthenticated } from "@/shared/utils/apiAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await purgeCallLogs();
    return NextResponse.json({
      deleted: result.deleted,
      deletedArtifacts: result.deletedArtifacts ?? 0,
      errors: result.errors,
    });
  } catch {
    return NextResponse.json(buildErrorBody(500, "Failed to purge call logs"), {
      status: 500,
    });
  }
}
