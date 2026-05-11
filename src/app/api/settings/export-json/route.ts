import { NextResponse } from "next/server";
import {
  getSettings,
  getProviderConnections,
  getProviderNodes,
  getCombos,
  getApiKeys,
} from "@/lib/localDb";
import { getDbInstance } from "@/lib/db/core";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";

/**
 * GET /api/settings/export-json
 * Exports a legacy 9router compatible JSON backup.
 */
export async function GET(request: Request) {
  if (await isAuthRequired(request)) {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const rawSettings = await getSettings();

    // REDACT sensitive security keys to maintain Zero-Trust posture
    // even if the admin shares their backup file.
    // Use destructuring (not delete) to avoid mutating a potentially cached object.
    const { password: _pw, requireLogin: _rl, ...safeSettings } = rawSettings;

    const providerConnections = await getProviderConnections();
    const providerNodes = await getProviderNodes();
    const combos = await getCombos();
    const apiKeys = await getApiKeys();

    const db = getDbInstance();
    const usageHistory = db.prepare("SELECT * FROM usage_history").all();
    const domainCostHistory = db.prepare("SELECT * FROM domain_cost_history").all();
    const domainBudgets = db.prepare("SELECT * FROM domain_budgets").all();

    const exportData = {
      settings: safeSettings,
      providerConnections,
      providerNodes,
      combos,
      apiKeys,
      usageHistory,
      domainCostHistory,
      domainBudgets,
      // Metadata to identify export version
      _meta: {
        exportedAt: new Date().toISOString(),
        version: "omniroute-v3-legacy-export",
      },
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
