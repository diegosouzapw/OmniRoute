import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";
import { updateComboDefaultsSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isPaidModelTarget } from "@/shared/utils/freeModels";

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
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
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
              fallbackDelayMs: 0,
              handoffThreshold: 0.85,
              handoffModel: "",
              maxMessagesForSummary: 30,
              maxComboDepth: 3,
              trackMetrics: true,
              reasoningTokenBufferEnabled: true,
              zeroLatencyOptimizationsEnabled: false,
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
export async function PATCH(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
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

    // #6540: reject a paid-only handoffModel target when hidePaidModels is on.
    // Fails open on "unknown" (aliases/combo names) — mirrors the settings
    // route's PAID_MODEL_TARGET_BLOCKED check.
    if (
      typeof body.comboDefaults?.handoffModel === "string" &&
      body.comboDefaults.handoffModel.trim() !== ""
    ) {
      const currentSettings: any = await getSettings();
      if (currentSettings?.hidePaidModels === true) {
        if (isPaidModelTarget(body.comboDefaults.handoffModel) === "paid") {
          return NextResponse.json(
            {
              error: {
                code: "PAID_MODEL_TARGET_BLOCKED",
                message:
                  "This field cannot target a paid-only model while 'Hide paid models' is enabled.",
              },
            },
            { status: 400 }
          );
        }
      }
    }

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
