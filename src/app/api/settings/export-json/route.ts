import { NextResponse } from "next/server";
import {
  getSettings,
  getProviderConnections,
  getProviderNodes,
  getCombos,
  getApiKeys,
} from "@/lib/localDb";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";

/**
 * GET /api/settings/export-json
 * Exports a legacy 9router compatible JSON backup.
 */
export async function GET(request: Request) {
  if (await isAuthRequired()) {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const settings = await getSettings();
    
    // REDACT sensitive security keys to maintain Zero-Trust posture 
    // even if the admin shares their backup file.
    if ("password" in settings) delete settings.password;
    if ("requireLogin" in settings) delete settings.requireLogin;

    const providerConnections = await getProviderConnections();
    const providerNodes = await getProviderNodes();
    const combos = await getCombos();
    const apiKeys = await getApiKeys();

    const exportData = {
      settings,
      providerConnections,
      providerNodes,
      combos,
      apiKeys,
      // Metadata to identify export version
      _meta: {
        exportedAt: new Date().toISOString(),
        version: "omniroute-v3-legacy-export"
      }
    };

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="omniroute-legacy-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.json"`,
      },
    });
  } catch (error) {
    console.error("[API] Error exporting JSON backup:", error);
    return NextResponse.json({ error: "Failed to export JSON" }, { status: 500 });
  }
}
