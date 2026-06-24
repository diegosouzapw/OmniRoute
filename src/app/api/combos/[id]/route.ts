import { NextResponse } from "next/server";
import {
  getComboById,
  updateCombo,
  deleteCombo,
  getComboByName,
  getCombos,
  isCloudEnabled,
} from "@/lib/localDb";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { validateCompositeTiersConfig } from "@/lib/combos/compositeTiers";
import { normalizeComboModels } from "@/lib/combos/steps";
import { validateComboDAG, clampComboDepth } from "@omniroute/open-sse/services/combo.ts";
import { updateComboSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
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
    console.log("Error fetching combo:", error);
    return comboErrorResponse("INTERNAL_001", 500, undefined, request);
  }
}

// PUT /api/combos/[id] - Update combo
export async function PUT(request, { params }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return comboErrorResponse(
      "COMBO_001",
      400,
      { field: "body", reason: "Invalid JSON body" },
      request
    );
  }

  try {
    const { id } = await params;
    const validation = validateBody(updateComboSchema, rawBody);
    if (isValidationFailure(validation)) {
      return comboErrorResponse(
        "COMBO_002",
        400,
        { issues: validation.error },
        request
      );
    }
    const currentCombo = (await getComboById(id)) as ComboRowShape | null;
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
    const compositeValidation = validateCompositeTiersConfig(nextComboState);
    if (compositeValidation.success === false) {
      const failure = compositeValidation as {
        success: false;
        error: { message: string; details: unknown[] };
      };
      return comboErrorResponse(
        "COMBO_003",
        400,
        { reason: failure.error.message, details: failure.error.details },
        request
      );
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
          return comboErrorResponse(
            "COMBO_005",
            400,
            { comboName, reason },
            request
          );
        }
      }
    }

    const combo = await updateCombo(id, body);

    // Auto sync to Cloud if enabled
    await syncToCloudIfEnabled();

    return NextResponse.json(combo);
  } catch (error) {
    console.log("Error updating combo:", error);
    return comboErrorResponse("INTERNAL_001", 500, undefined, request);
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
    console.log("Error deleting combo:", error);
    return comboErrorResponse("INTERNAL_001", 500, undefined, request);
  }
}

/**
 * Sync to Cloud if enabled
 */
async function syncToCloudIfEnabled() {
  try {
    const cloudEnabled = await isCloudEnabled();
    if (!cloudEnabled) return;

    const machineId = await getConsistentMachineId();
    await syncToCloud(machineId);
  } catch (error) {
    console.log("Error syncing to cloud:", error);
  }
}
