import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";

/**
 * GET /api/settings/combo-defaults
 * Returns the current combo global defaults and provider overrides
 */
export async function GET() {
  try {
    const settings: any = await getSettings();
    return NextResponse.json({
      comboDefaults: settings.comboDefaults || {
        strategy: "priority",
        maxRetries: 1,
        retryDelayMs: 2000,
        timeoutMs: 120000,
        healthCheckEnabled: true,
        healthCheckTimeoutMs: 3000,
        maxComboDepth: 3,
        trackMetrics: true,
      },
      providerOverrides: settings.providerOverrides || {},
    });
  } catch (error) {
    console.log("Error fetching combo defaults:", error);
    return NextResponse.json({ error: "Failed to fetch combo defaults" }, { status: 500 });
  }
}

/**
 * PATCH /api/settings/combo-defaults
 * Update combo global defaults and/or provider overrides
 * Body: { comboDefaults?: {...}, providerOverrides?: {...} }
 */
export async function PATCH(request) {
  try {
    const body = await request.json();
    const updates: Record<string, any> = {};

    if (body.comboDefaults) {
      updates.comboDefaults = body.comboDefaults;
    }
    if (body.providerOverrides) {
      updates.providerOverrides = body.providerOverrides;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    const settings: any = await updateSettings(updates);
    return NextResponse.json({
      comboDefaults: settings.comboDefaults || {},
      providerOverrides: settings.providerOverrides || {},
    });
  } catch (error) {
    console.log("Error updating combo defaults:", error);
    return NextResponse.json({ error: "Failed to update combo defaults" }, { status: 500 });
  }
}
