import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { cleanupSemanticMemoryPoints } from "@/lib/memory/qdrant";
import { getMemorySettings } from "@/lib/memory/settings";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const memorySettings = await getMemorySettings();
    const result = await cleanupSemanticMemoryPoints({
      retentionDays: memorySettings.retentionDays,
    });
    return NextResponse.json({
      ok: result.ok,
      deletedCount: result.deletedCount,
      retentionDays: memorySettings.retentionDays,
    });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
