import { NextResponse } from "next/server";
import { reorderCombos } from "@/lib/localDb";
import { reorderCombosSchema } from "@/shared/validation/schemas";
import { validatedJsonBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { syncToCloudIfEnabled } from "@/lib/cloudSync";

// POST /api/combos/reorder - Persist combo ordering
export async function POST(request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const bodyResult = await validatedJsonBody(request, reorderCombosSchema);
  if (!bodyResult.success) return bodyResult.response;

  try {
    const combos = await reorderCombos(bodyResult.data.comboIds);
    await syncToCloudIfEnabled();

    return NextResponse.json({ combos });
  } catch (error) {
    console.error("[combos.reorder]", { err: error }, "Failed to reorder combos");
    return NextResponse.json({ error: "Failed to reorder combos" }, { status: 500 });
  }
}
