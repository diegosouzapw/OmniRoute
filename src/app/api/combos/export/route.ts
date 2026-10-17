import { NextResponse } from "next/server";
import { getCombos } from "@/lib/db/combos";
import { getSettings } from "@/lib/db/settings";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildCombosExport } from "@/lib/combos/portable";
import { filterPaidComboSteps } from "@/app/api/settings/export-json/route";

/**
 * GET /api/combos/export
 * Combos-only, secret-free file (see src/lib/combos/portable.ts): unlike the
 * full settings backup it carries no settings, connections or API keys, so it
 * can be shared between installs.
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const settings = await getSettings();
    const stored = await getCombos();
    // #6328: never re-materialise paid targets the operator asked to hide.
    const combos = settings.hidePaidModels === true ? filterPaidComboSteps(stored) : stored;
    const exportData = buildCombosExport(combos);
    const stamp = exportData._meta.exportedAt.replace(/[:.]/g, "-");

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="omniroute-combos-${stamp}.json"`,
      },
    });
  } catch (error) {
    console.error("[API] Error exporting combos:", error);
    return NextResponse.json({ error: "Failed to export combos" }, { status: 500 });
  }
}
