import { NextResponse } from "next/server";
import { getCombos, createCombo, getComboByName, isCloudEnabled } from "@/lib/localDb";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { createComboSchema, validateBody } from "@/shared/validation/schemas";
import { validateComboDAG } from "@omniroute/open-sse/services/combo.ts";

// GET /api/combos - Get all combos
export async function GET() {
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
  try {
    const body = await request.json();

    // Zod validation (covers name format, length, etc.)
    const validation = validateBody(createComboSchema, body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { name, models, strategy, config } = validation.data;

    // Check if name already exists
    const existing = await getComboByName(name);
    if (existing) {
      return NextResponse.json({ error: "Combo name already exists" }, { status: 400 });
    }

    // Validate nested combo DAG (no circular references, max depth)
    const allCombos = await getCombos();
    // Temporarily add the new combo to validate its graph
    const tempCombo = { name, models: models || [], strategy, config };
    try {
      validateComboDAG(name, [...allCombos, tempCombo]);
    } catch (dagError) {
      return NextResponse.json({ error: dagError.message }, { status: 400 });
    }

    const combo = await createCombo({ name, models: models || [], strategy, config });

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
