import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getMemorySettings } from "@/lib/memory/settings";
import { cleanupSemanticMemoryPoints } from "@/lib/memory/qdrant";

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // reuse the existing retention policy from Memory settings
    const memorySettings = await getMemorySettings();
    const retentionDays = memorySettings.retentionDays;

    const result = await cleanupSemanticMemoryPoints({ retentionDays });
    return NextResponse.json({ ...result, retentionDays });
  } catch (error) {
    return NextResponse.json({ ok: false, deletedCount: 0, error: String(error) }, { status: 500 });
  }
}
