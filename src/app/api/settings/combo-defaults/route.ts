import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";
import { updateComboDefaultsSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const LEGACY_COMBO_RESILIENCE_KEYS = new Set([
  "timeoutMs",
  "healthCheckEnabled",
  "healthCheckTimeoutMs",
]);

function sanitizeComboRuntimeConfig(config?: Record<string, any> | null) {
  if (!config || typeof config !== "object") return {};
  return Object.fromEntries(
    Object.entries(config).filter(
      ([key, value]) =>
        value !== undefined && value !== null && !LEGACY_COMBO_RESILIENCE_KEYS.has(key)
    )
  );
}

function sanitizeProviderOverrides(overrides?: Record<string, any> | null) {
  if (!overrides || typeof overrides !== "object") return {};
  return Object.fromEntries(
    Object.entries(overrides).map(([providerId, config]) => [
      providerId,
      sanitizeComboRuntimeConfig(config),
    ])
  );
}

/**
 * GET /api/settings/combo-defaults
 * Returns the current combo global defaults and provider overrides
 */
export async function GET() {
  try {
    const settings: any = await getSettings();
    const comboDefaults = sanitizeComboRuntimeConfig(settings.comboDefaults);
    const providerOverrides = sanitizeProviderOverrides(settings.providerOverrides);
    return NextResponse.json({
      comboDefaults:
        Object.keys(comboDefaults).length > 0
          ? comboDefaults
          : {
              strategy: "priority",
              maxRetries: 1,
              retryDelayMs: 2000,
              handoffThreshold: 0.85,
              handoffModel: "",
              maxMessagesForSummary: 30,
              maxComboDepth: 3,
              trackMetrics: true,
            },
      providerOverrides,
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
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(updateComboDefaultsSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const body = validation.data;

    const updates: Record<string, any> = {};

    if (body.comboDefaults) {
      updates.comboDefaults = sanitizeComboRuntimeConfig(body.comboDefaults);
    }
    if (body.providerOverrides) {
      updates.providerOverrides = sanitizeProviderOverrides(body.providerOverrides);
    }

    const settings: any = await updateSettings(updates);
    return NextResponse.json({
      comboDefaults: sanitizeComboRuntimeConfig(settings.comboDefaults),
      providerOverrides: sanitizeProviderOverrides(settings.providerOverrides),
    });
  } catch (error) {
    console.log("Error updating combo defaults:", error);
    return NextResponse.json({ error: "Failed to update combo defaults" }, { status: 500 });
  }
}
