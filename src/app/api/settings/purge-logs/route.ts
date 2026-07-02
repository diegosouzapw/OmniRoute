import { NextResponse } from "next/server";
import { getCallLogRetentionDays } from "@/lib/logEnv";
import { deleteCallLogsBefore } from "@/lib/usage/callLogs";
import { isAuthenticated } from "@/shared/utils/apiAuth";

export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const retentionMs = getCallLogRetentionDays() * 24 * 60 * 60 * 1000;
    const cutoff = new Date(Date.now() - retentionMs).toISOString();
    const result = deleteCallLogsBefore(cutoff);
    return NextResponse.json({
      deleted: result.deletedRows,
      deletedArtifacts: result.deletedArtifacts,
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}
