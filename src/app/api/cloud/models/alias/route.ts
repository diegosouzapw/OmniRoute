import { NextResponse } from "next/server";
import { validateApiKey, getModelAliases, setModelAlias, isCloudEnabled } from "@/models";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { cloudModelAliasUpdateSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

// PUT /api/cloud/models/alias - Set model alias (for cloud/CLI)
export async function PUT(request: Request) {
  const authError = await requireManagementAuth(request, {
    alwaysRequireAuth: true,
    invalidApiKeyStatus: 401,
  });
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: { message: "Invalid request", details: [{ field: "body", message: "Invalid JSON body" }] } },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(cloudModelAliasUpdateSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { model, alias } = validation.data;

    // Check if alias already exists for different model
    const aliases = await getModelAliases();
    const existingModel = aliases[alias];
    if (existingModel && existingModel !== model) {
      return NextResponse.json(
        {
          error: `Alias '${alias}' already in use for model '${existingModel}'`,
        },
        { status: 400 }
      );
    }

    // Update alias
    await setModelAlias(alias, model);

    // Auto sync to Cloud if enabled
    await syncToCloudIfEnabled();

    return NextResponse.json({
      success: true,
      model,
      alias,
      message: `Alias '${alias}' set for model '${model}'`,
    });
  } catch (error) {
    console.log("Error updating alias:", error);
    return NextResponse.json({ error: "Failed to update alias" }, { status: 500 });
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
    console.log("Error syncing aliases to cloud:", error);
  }
}

// GET /api/cloud/models/alias - Get all aliases
export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const apiKey = authHeader?.replace("Bearer ", "");

    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 401 });
    }

    const isValid = await validateApiKey(apiKey);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    const aliases = await getModelAliases();

    return NextResponse.json({ aliases });
  } catch (error) {
    console.log("Error fetching aliases:", error);
    return NextResponse.json({ error: "Failed to fetch aliases" }, { status: 500 });
  }
}
