import { NextResponse } from "next/server";
import { getComboById, updateCombo, deleteCombo, getComboByName, getCombos } from "@/lib/localDb";
import { syncToCloudIfEnabled } from "@/lib/cloudSync";
import { validateCompositeTiersConfig } from "@/lib/combos/compositeTiers";
import { normalizeComboModels } from "@/lib/combos/steps";
import { validateComboDAG, clampComboDepth } from "@omniroute/open-sse/services/combo.ts";
import { updateComboSchema } from "@/shared/validation/schemas";
import { validatedJsonBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { QUOTA_MODEL_PREFIX } from "@/lib/quota/quotaModelNaming";
import { comboErrorResponse } from "@/lib/api/comboErrorResponse";

// Minimal shape for the fields we read off a combo row in this route.
// `getComboById` returns a structurally `JsonRecord`-typed object, so we
// narrow at the call sites rather than change the DB helper's return type.
type ComboRowShape = {
  name: string;
  id?: string;
  config?: unknown;
  models?: unknown;
  strategy?: string;
  isActive?: boolean;
  allowedProviders?: string[];
  system_message?: string;
  tool_filter_regex?: string;
  context_cache_protection?: boolean;
  context_length?: number | null;
};

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
      return comboErrorResponse("COMBO_007", 404, { id }, request);
    }

    return NextResponse.json(combo);
  } catch (error) {
    console.error("[combos.get]", { err: error }, "Error fetching combo");
    return NextResponse.json({ error: "Failed to fetch combo" }, { status: 500 });
  }
}

// PUT /api/combos/[id] - Update combo
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const bodyResult = await validatedJsonBody(request, updateComboSchema);
  if (!bodyResult.success) return bodyResult.response;
  const validation = { data: bodyResult.data };

  try {
    const { id } = await params;
    const currentCombo = await getComboById(id);
    if (!currentCombo) {
      return comboErrorResponse("COMBO_007", 404, { id }, request);
    }
    if (currentCombo.name.startsWith(QUOTA_MODEL_PREFIX)) {
      return comboErrorResponse(
        "COMBO_006",
        409,
        { name: currentCombo.name, source: "quota-share" },
        request
      );
    }
    const allCombos = await getCombos();

    const comboName = validation.data.name || currentCombo.name;
    const normalizedUpdate = { ...validation.data };
    if (normalizedUpdate.compressionOverride !== undefined) {
      const legacyCompressionOverride = normalizedUpdate.compressionOverride;
      const nextConfig: Record<string, unknown> =
        currentCombo.config &&
        typeof currentCombo.config === "object" &&
        !Array.isArray(currentCombo.config)
          ? { ...(currentCombo.config as Record<string, unknown>) }
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
            comboName: String(comboName),
            // `allCombos` from `getCombos()` is typed as the DB-shaped record
            // (JsonRecord & { version: 2; models: ComboStep[] }) which is
            // structurally compatible with the local ComboCollectionLike in
            // `normalizeComboModels` but TS does not infer the relationship.
            allCombos: allCombos as never,
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
        return comboErrorResponse(
          "COMBO_004",
          400,
          { name: body.name, conflictingId: existing.id },
          request
        );
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
          validateComboDAG(String(comboName), updatedCombos, new Set(), 0, configuredDepth);
        } catch (dagError) {
          // Sanitize the raw `dagError.message` — it can leak internal combo
          // names. Log full error server-side for debugging, return a
          // sanitized generic message to the client with a short reason tag.
          console.warn("Combo DAG validation failed:", dagError);
          const reason =
            dagError instanceof Error && /cycle/i.test(dagError.message)
              ? "cycle-detected"
              : dagError instanceof Error && /depth/i.test(dagError.message)
                ? "max-depth-exceeded"
                : "invalid-graph";
          return comboErrorResponse("COMBO_005", 400, { comboName, reason }, request);
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
    const existingCombo = (await getComboById(id)) as ComboRowShape | null;
    if (!existingCombo) {
      return comboErrorResponse("COMBO_007", 404, { id }, request);
    }
    if (existingCombo.name.startsWith(QUOTA_MODEL_PREFIX)) {
      return comboErrorResponse(
        "COMBO_006",
        409,
        { name: existingCombo.name, source: "quota-share" },
        request
      );
    }
    const success = await deleteCombo(id);

    if (!success) {
      return comboErrorResponse("COMBO_007", 404, { id }, request);
    }

    // Auto sync to Cloud if enabled
    await syncToCloudIfEnabled();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[combos.delete]", { err: error }, "Error deleting combo");
    return NextResponse.json({ error: "Failed to delete combo" }, { status: 500 });
  }
}
