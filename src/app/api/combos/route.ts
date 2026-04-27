import { NextResponse } from "next/server";
import { getCombos, createCombo, getComboByName, isCloudEnabled } from "@/lib/localDb";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { validateCompositeTiersConfig } from "@/lib/combos/compositeTiers";
import { normalizeComboModels } from "@/lib/combos/steps";
import { validateComboDAG } from "@omniroute/open-sse/services/combo.ts";
import { createComboSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

// GET /api/combos - Get all combos
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const combos = await getCombos();
    return NextResponse.json({ combos });
  } catch (error) {
    console.log("Error fetching combos:", error);
    return NextResponse.json({ error: "Failed to fetch combos" }, { status: 500 });
  }
}

// POST /api/combos - Create new combo
export async function POST(request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();

    // Zod validation (covers name format, length, etc.)
    const validation = validateBody(createComboSchema, body);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const allCombos = await getCombos();
    const normalizedModels = normalizeComboModels(validation.data.models, {
      comboName: validation.data.name,
      allCombos,
    });
    const comboInput = {
      ...validation.data,
      models: normalizedModels,
    };
    const { name, strategy, config } = comboInput;
    const compositeValidation = validateCompositeTiersConfig(comboInput);
    if (!compositeValidation.success) {
      return NextResponse.json({ error: compositeValidation.error }, { status: 400 });
    }

    // Check if name already exists
    const existing = await getComboByName(name);
    if (existing) {
      return NextResponse.json({ error: "Combo name already exists" }, { status: 400 });
    }

    // Validate nested combo DAG (no circular references, max depth)
    // Temporarily add the new combo to validate its graph
    const tempCombo = {
      ...comboInput,
      name,
      strategy,
      config,
    };
    try {
      validateComboDAG(name, [...allCombos, tempCombo]);
    } catch (dagError) {
      return NextResponse.json({ error: dagError.message }, { status: 400 });
    }

    const combo = await createCombo(comboInput);

    // Auto sync to Cloud if enabled
    await syncToCloudIfEnabled();

    return NextResponse.json(combo, { status: 201 });
  } catch (error) {
    console.log("Error creating combo:", error);
    return NextResponse.json({ error: "Failed to create combo" }, { status: 500 });
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
