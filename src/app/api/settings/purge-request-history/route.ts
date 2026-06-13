import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { purgeCallLogs, purgeDetailedLogs } from "@/lib/db/cleanup";
import { isAuthenticated } from "@/shared/utils/apiAuth";

export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const callLogs = await purgeCallLogs();
    const detailedLogs = await purgeDetailedLogs();
    const errors = callLogs.errors + detailedLogs.errors;

    return NextResponse.json(
      {
        deleted: callLogs.deleted,
        deletedArtifacts: callLogs.deletedArtifacts ?? 0,
        deletedDetailedLogs: detailedLogs.deleted,
        errors,
      },
      { status: errors > 0 ? 500 : 200 }
    );
  } catch {
    return NextResponse.json(buildErrorBody(500, "Failed to purge request history"), {
      status: 500,
    });
  }
}
