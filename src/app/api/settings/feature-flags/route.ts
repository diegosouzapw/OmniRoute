import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  FEATURE_FLAG_DEFINITIONS,
  type FeatureFlagDefinition,
} from "@/shared/constants/featureFlagDefinitions";
import {
  ADAPTIVE_VIRTUAL_LANES_FLAG_KEY,
  resolveAdaptiveVirtualLanesFlag,
} from "@/lib/admissionVirtualLanes";
import {
  getFeatureFlagOverrides,
  setFeatureFlagOverride,
  removeFeatureFlagOverride,
  clearAllFeatureFlagOverrides,
} from "@/lib/db/featureFlags";
import { resolveAllFeatureFlags } from "@/shared/utils/featureFlags";
import { getCcAliasGlobalState } from "@/lib/db/ccDiscoveryAliases";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const ACTIVE_VALUES = new Set(["true", "1", "yes"]);
const CC_DISCOVERY_ALIASES_FLAG_KEY = "EXPOSE_CC_DISCOVERY_ALIASES";

function isActive(value: string): boolean {
  return ACTIVE_VALUES.has(value);
}

/**
 * Standard feature-flag payload shape for GET /api/settings/feature-flags.
 * Flags whose gate resolves differently from the generic db-wins-over-env
 * order pass their own effectiveValue/source (see the special cases below).
 */
function flagPayload(
  definition: FeatureFlagDefinition,
  effectiveValue: string,
  source: "db" | "env" | "default"
) {
  return {
    key: definition.key,
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
  };
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

    const flags = resolved.map(({ key, effectiveValue, source, definition }) => {
      // Flags whose gate resolves with env-wins-over-db precedence (the
      // opposite of resolveAllFeatureFlags' generic db-wins-over-env order)
      // report the gate's own resolution so the dashboard never shows a source
      // that doesn't match actual gate behavior.
      if (key === CC_DISCOVERY_ALIASES_FLAG_KEY) {
        const gateState = getCcAliasGlobalState();
        return flagPayload(definition, gateState.enabled ? "true" : "false", gateState.source);
      }
      // #9654 U7: the adaptive virtual-lanes gate reads env at runtime
      // construction — env wins over any DB override, and a DB override gates
      // at next boot (see lib/admissionVirtualLanes.ts).
      if (key === ADAPTIVE_VIRTUAL_LANES_FLAG_KEY) {
        const state = resolveAdaptiveVirtualLanesFlag();
        return flagPayload(definition, state.enabled ? "true" : "false", state.source);
      }
      return flagPayload(definition, effectiveValue, source);
    });

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

    // Env-wins gates resolve with env > DB > default (the opposite of the
    // generic db-wins helper above), so report their true resolution here too —
    // the response must never tell an operator they enabled a gate that the env
    // var still overrides (#9654 U7).
    let reportedEffectiveValue = newEffectiveValue;
    let reportedSource = newSource;
    if (key === ADAPTIVE_VIRTUAL_LANES_FLAG_KEY) {
      const state = resolveAdaptiveVirtualLanesFlag();
      reportedEffectiveValue = state.enabled ? "true" : "false";
      reportedSource = state.source;
    }

    return NextResponse.json({
      key,
      effectiveValue: reportedEffectiveValue,
      source: reportedSource,
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
