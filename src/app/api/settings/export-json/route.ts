import { NextResponse } from "next/server";
import {
  getSettings,
  getProviderConnections,
  getProviderNodes,
  getCombos,
  getApiKeys,
} from "@/lib/localDb";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";
import {
  getAllUsageHistory,
  getAllDomainCostHistory,
  getAllDomainBudgets,
} from "@/lib/db/usageAnalytics";
import { isFreeModel, providerHasFreeModels } from "@/shared/utils/freeModels";

/**
 * When `settings.hidePaidModels === true`, exports must not leak paid model ids
 * via combos — otherwise a round-trip (export → share/store → import) silently
 * re-materialises the paid targets the operator asked to REMOVE (#6328).
 * Filter combo model steps in place; keep combo-ref steps untouched.
 */
export function filterPaidComboSteps<T extends { models?: unknown }>(combos: T[]): T[] {
  return combos.map((combo) => {
    if (!Array.isArray(combo.models)) return combo;
    const filtered = combo.models.filter((step) => {
      if (!step || typeof step !== "object") return true;
      const s = step as Record<string, unknown>;
      if (s.kind === "combo-ref") return true;
      const rawModel = typeof s.model === "string" ? s.model.trim() : "";
      if (!rawModel) return true;
      const provider =
        (typeof s.providerId === "string" && s.providerId.trim()) ||
        (typeof s.provider === "string" && s.provider.trim()) ||
        (rawModel.includes("/") ? rawModel.split("/")[0] : "");
      if (!provider) return true;
      if (!providerHasFreeModels(provider)) return false;
      const modelId = rawModel.startsWith(`${provider}/`)
        ? rawModel.slice(provider.length + 1)
        : rawModel;
      return isFreeModel(provider, { id: modelId });
    });
    return { ...combo, models: filtered };
  });
}

/**
 * GET /api/settings/export-json
 * Exports a legacy OmniRoute-compatible JSON backup.
 */
export async function GET(request: Request) {
  if (await isAuthRequired(request)) {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const url = new URL(request.url);
    // Telemetry/history tables grow indefinitely and inflate backups.
    // Exclude them by default — opt-in with ?includeHistory=true (#2125).
    const includeHistory = url.searchParams.get("includeHistory") === "true";

    const rawSettings = await getSettings();

    // REDACT sensitive security keys to maintain Zero-Trust posture
    // even if the admin shares their backup file.
    // Use destructuring (not delete) to avoid mutating a potentially cached object.
    const { password: _pw, requireLogin: _rl, ...safeSettings } = rawSettings;

    const providerConnections = await getProviderConnections();
    const providerNodes = await getProviderNodes();
    const combosRaw = await getCombos();
    const apiKeys = await getApiKeys();

    // #6328: honor hidePaidModels at the export boundary so backup files
    // cannot silently smuggle paid model ids back in on import.
    const combos = rawSettings.hidePaidModels === true
      ? filterPaidComboSteps(combosRaw as Array<{ models?: unknown }>)
      : combosRaw;

    const exportData: Record<string, unknown> = {
      settings: safeSettings,
      providerConnections,
      providerNodes,
      combos,
      apiKeys,
      // Metadata to identify export version
      _meta: {
        exportedAt: new Date().toISOString(),
        version: "omniroute-v3-legacy-export",
        includesHistory: includeHistory,
      },
    };

    // Only include telemetry/history tables when explicitly requested.
    // These tables (usage_history, domain_cost_history, domain_budgets) can contain
    // thousands of rows and make the config backup grow to many MBs.
    if (includeHistory) {
      exportData.usageHistory = getAllUsageHistory();
      exportData.domainCostHistory = getAllDomainCostHistory();
      exportData.domainBudgets = getAllDomainBudgets();
    }

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
