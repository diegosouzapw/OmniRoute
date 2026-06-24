import { NextResponse } from "next/server";
import { getComboById, updateCombo, deleteCombo, getComboByName, getCombos } from "@/lib/localDb";
import { syncToCloudIfEnabled } from "@/lib/cloudSync";
import { validateCompositeTiersConfig } from "@/lib/combos/compositeTiers";
import { normalizeComboModels } from "@/lib/combos/steps";
import { validateComboDAG, clampComboDepth } from "@omniroute/open-sse/services/combo.ts";
import { updateComboSchema } from "@/shared/validation/schemas";
import { validatedJsonBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { QUOTA_MODEL_PREFIX } from "@/lib/quota/quotaModelNaming";

/**
 * Keys that were present in older combo configs (≤ v3.8.31) but have since been
 * removed from comboRuntimeConfigSchema. The dashboard modal sanitises the three
 * UI-level keys (timeoutMs, healthCheckEnabled, healthCheckTimeoutMs) before PUT,
 * but v3.8.31-era stored configs also carry these 12 keys which were spread back
 * into the body on edit+save. We strip them server-side so removed keys don't
 * accumulate in `combos.data` and so the next read produces a clean config.
 *
 * Idempotent — running twice is a no-op.
 */
const LEGACY_REMOVED_COMBO_CONFIG_KEYS = Object.freeze([
  "queueDepth",
  "fallbackDelayMs",
  "handoffProviders",
  "maxComboDepth",
  "manifestRouting",
  "complexityAwareRouting",
  "pipeline_enabled",
  "pipelineConcurrency",
  "shadowRouting",
  "evalRouting",
  "resetAwareEnabled",
  "resetAwareWindow",
]);

function stripLegacyComboConfigKeys(rawConfig) {
  if (!rawConfig || typeof rawConfig !== "object" || Array.isArray(rawConfig)) {
    return rawConfig;
  }
  let mutated = false;
  const next = {};
  for (const [key, value] of Object.entries(rawConfig)) {
    if (LEGACY_REMOVED_COMBO_CONFIG_KEYS.includes(key)) {
      mutated = true;
      continue;
    }
    next[key] = value;
  }
  return mutated ? next : rawConfig;
}

// GET /api/combos/[id] - Get combo by ID
export async function GET(request, { params }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const combo = await getComboById(id);

    if (!combo) {
      return NextResponse.json({ error: "Combo not found" }, { status: 404 });
    }

    return NextResponse.json(combo);
  } catch (error) {
    console.error("[combos.get]", { err: error }, "Error fetching combo");
    return NextResponse.json({ error: "Failed to fetch combo" }, { status: 500 });
  }
}

// PUT /api/combos/[id] - Update combo
export async function PUT(request, { params }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const bodyResult = await validatedJsonBody(request, updateComboSchema);
  if (!bodyResult.success) return bodyResult.response;
  const validation = { data: bodyResult.data };

  try {
    const { id } = await params;
    const currentCombo = await getComboById(id);
    if (!currentCombo) {
      return NextResponse.json({ error: "Combo not found" }, { status: 404 });
    }
    if (currentCombo.name.startsWith(QUOTA_MODEL_PREFIX)) {
      return NextResponse.json(
        buildErrorBody(
          409,
          "This combo is managed by Quota Share and cannot be edited here. Manage it from the Quota Share page."
        ),
        { status: 409 }
      );
    }
    const allCombos = await getCombos();

    const comboName = validation.data.name || currentCombo.name;
    const normalizedUpdate = { ...validation.data };
    if (normalizedUpdate.compressionOverride !== undefined) {
      const legacyCompressionOverride = normalizedUpdate.compressionOverride;
      const nextConfig =
        currentCombo.config &&
        typeof currentCombo.config === "object" &&
        !Array.isArray(currentCombo.config)
          ? { ...currentCombo.config }
          : {};
      if (legacyCompressionOverride) {
        nextConfig.compressionMode = legacyCompressionOverride;
      } else {
        delete nextConfig.compressionMode;
      }
      normalizedUpdate.config = nextConfig;
      delete normalizedUpdate.compressionOverride;
    }
    if (normalizedUpdate.config && typeof normalizedUpdate.config === "object") {
      normalizedUpdate.config = stripLegacyComboConfigKeys(normalizedUpdate.config);
    }

    const body = normalizedUpdate.models
      ? {
          ...normalizedUpdate,
          models: normalizeComboModels(normalizedUpdate.models, {
            comboName,
            allCombos,
          }),
        }
      : normalizedUpdate;
    const nextComboState = {
      ...currentCombo,
      ...body,
      name: comboName,
    };
    // Composite tiers reference step IDs from `combo.models`; if the request
    // doesn't change `config` or `models`, the merged state is identical to
    // what was last persisted and re-validating it can only fail when the
    // persisted data is stale (e.g. a stored combo whose tiers were authored
    // against a step that was later removed). The original validation
    // already happened on the write that produced the row, so trust it for
    // every other field-update (isActive toggle, name rename, message etc.)
    // and re-run only when the user is actually editing the graph.
    const touchesGraph = body.config !== undefined || body.models !== undefined;
    if (touchesGraph) {
      const compositeValidation = validateCompositeTiersConfig(nextComboState);
      if (!compositeValidation.success) {
        return NextResponse.json({ error: compositeValidation.error }, { status: 400 });
      }
    }

    // Check if name already exists (exclude current combo)
    if (body.name) {
      const existing = await getComboByName(body.name);
      if (existing && existing.id !== id) {
        return NextResponse.json({ error: "Combo name already exists" }, { status: 400 });
      }
    }

    // Validate nested combo DAG (no circular references, max depth)
    if (body.models) {
      // Update the combo in the list temporarily for validation
      const updatedCombos = allCombos.map((c) => (c.id === id ? { ...c, ...body } : c));
      if (comboName) {
        const configuredDepth = clampComboDepth(
          (nextComboState as { config?: { maxComboDepth?: unknown } }).config?.maxComboDepth
        );
        try {
          validateComboDAG(comboName, updatedCombos, new Set(), 0, configuredDepth);
        } catch (dagError) {
          return NextResponse.json({ error: dagError.message }, { status: 400 });
        }
      }
    }

    const combo = await updateCombo(id, body);

    // Auto sync to Cloud if enabled
    await syncToCloudIfEnabled();

    return NextResponse.json(combo);
  } catch (error) {
    console.error("[combos.put]", { err: error }, "Error updating combo");
    return NextResponse.json({ error: "Failed to update combo" }, { status: 500 });
  }
}

// DELETE /api/combos/[id] - Delete combo
export async function DELETE(request, { params }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const existingCombo = await getComboById(id);
    if (!existingCombo) {
      return NextResponse.json({ error: "Combo not found" }, { status: 404 });
    }
    if (existingCombo.name.startsWith(QUOTA_MODEL_PREFIX)) {
      return NextResponse.json(
        buildErrorBody(
          409,
          "This combo is managed by Quota Share and cannot be deleted here. Manage it from the Quota Share page."
        ),
        { status: 409 }
      );
    }
    const success = await deleteCombo(id);

    if (!success) {
      return NextResponse.json({ error: "Combo not found" }, { status: 404 });
    }

    // Auto sync to Cloud if enabled
    await syncToCloudIfEnabled();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[combos.delete]", { err: error }, "Error deleting combo");
    return NextResponse.json({ error: "Failed to delete combo" }, { status: 500 });
  }
}
