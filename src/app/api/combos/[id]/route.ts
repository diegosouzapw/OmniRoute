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
import { validateComboDAG } from "@omniroute/open-sse/services/combo.ts";
import { updateComboSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

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
    console.log("Error fetching combo:", error);
    return NextResponse.json({ error: "Failed to fetch combo" }, { status: 500 });
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
    const { id } = await params;
    const validation = validateBody(updateComboSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const currentCombo = await getComboById(id);
    if (!currentCombo) {
      return NextResponse.json({ error: "Combo not found" }, { status: 404 });
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
    const compositeValidation = validateCompositeTiersConfig(nextComboState);
    if (!compositeValidation.success) {
      return NextResponse.json({ error: compositeValidation.error }, { status: 400 });
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
        try {
          validateComboDAG(comboName, updatedCombos);
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
    console.log("Error updating combo:", error);
    return NextResponse.json({ error: "Failed to update combo" }, { status: 500 });
  }
}

// DELETE /api/combos/[id] - Delete combo
export async function DELETE(request, { params }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const success = await deleteCombo(id);

    if (!success) {
      return NextResponse.json({ error: "Combo not found" }, { status: 404 });
    }

    // Auto sync to Cloud if enabled
    await syncToCloudIfEnabled();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Error deleting combo:", error);
    return NextResponse.json({ error: "Failed to delete combo" }, { status: 500 });
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
