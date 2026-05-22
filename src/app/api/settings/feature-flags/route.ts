import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { FEATURE_FLAG_DEFINITIONS } from "@/shared/constants/featureFlagDefinitions";
import {
  getFeatureFlagOverrides,
  setFeatureFlagOverride,
  removeFeatureFlagOverride,
  clearAllFeatureFlagOverrides,
} from "@/lib/db/featureFlags";
import { resolveAllFeatureFlags } from "@/shared/utils/featureFlags";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const ACTIVE_VALUES = new Set(["true", "1", "yes"]);

function isActive(value: string): boolean {
  return ACTIVE_VALUES.has(value);
}

/**
 * GET /api/settings/feature-flags
 * Returns all feature flags with their effective values and a summary.
 */
export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const resolved = resolveAllFeatureFlags();

    const flags = resolved.map(({ key, effectiveValue, source, definition }) => ({
      key,
      label: definition.label,
      description: definition.description,
      category: definition.category,
      type: definition.type,
      enumValues: definition.enumValues ?? null,
      defaultValue: definition.defaultValue,
      effectiveValue,
      source,
      requiresRestart: definition.requiresRestart,
      warningLevel: definition.warningLevel,
    }));

    const total = flags.length;
    const active = flags.filter((f) => isActive(f.effectiveValue)).length;
    const inactive = total - active;
    const overriddenByDb = flags.filter((f) => f.source === "db").length;
    const overriddenByEnv = flags.filter((f) => f.source === "env").length;

    return NextResponse.json({
      flags,
      summary: { total, active, inactive, overriddenByDb, overriddenByEnv },
    });
  } catch (error) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}

const putFeatureFlagSchema = z.object({
  key: z.string().min(1),
  value: z.string().optional(),
});

/**
 * PUT /api/settings/feature-flags
 * Set or remove a feature flag override.
 * Body: { key: string; value?: string }
 * If value is omitted, the override is removed.
 */
export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(putFeatureFlagSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { key, value } = validation.data;

  // Validate key against known definitions
  const definition = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === key);
  if (!definition) {
    return NextResponse.json({ error: `Unknown feature flag key: ${key}` }, { status: 400 });
  }

  // Validate enum values
  if (value !== undefined && definition.type === "enum" && definition.enumValues) {
    if (!definition.enumValues.includes(value)) {
      return NextResponse.json(
        {
          error: `Invalid value "${value}" for enum flag ${key}. Allowed: ${definition.enumValues.join(", ")}`,
        },
        { status: 400 }
      );
    }
  }

  try {
    // Capture previous state before modifying
    const allFlagsBefore = resolveAllFeatureFlags();
    const prevFlag = allFlagsBefore.find((f) => f.key === key);
    const previousValue = prevFlag?.effectiveValue ?? definition.defaultValue;
    const previousSource = prevFlag?.source ?? "default";

    if (value === undefined) {
      removeFeatureFlagOverride(key);
    } else {
      setFeatureFlagOverride(key, value);
    }

    // After write — get new effective value
    const allFlagsAfter = resolveAllFeatureFlags();
    const updatedFlag = allFlagsAfter.find((f) => f.key === key);
    const newEffectiveValue = updatedFlag?.effectiveValue ?? definition.defaultValue;
    const newSource = updatedFlag?.source ?? "default";

    return NextResponse.json({
      key,
      effectiveValue: newEffectiveValue,
      source: newSource,
      previousValue,
      previousSource,
      requiresRestart: definition.requiresRestart,
    });
  } catch (error) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}

/**
 * DELETE /api/settings/feature-flags
 * Clear all feature flag overrides.
 */
export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const overrides = getFeatureFlagOverrides();
    const count = Object.keys(overrides).length;

    clearAllFeatureFlagOverrides();

    return NextResponse.json({
      cleared: count,
      message: `Cleared ${count} feature flag override${count !== 1 ? "s" : ""}`,
    });
  } catch (error) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}
