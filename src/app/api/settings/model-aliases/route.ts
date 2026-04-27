import { NextResponse } from "next/server";
import {
  getAllAliases,
  getCustomAliases,
  getBuiltInAliases,
  setCustomAliases,
  addCustomAlias,
  removeCustomAlias,
} from "@omniroute/open-sse/services/modelDeprecation.ts";
import { getSettings, updateSettings } from "@/lib/db/settings";
import {
  addModelAliasSchema,
  removeModelAliasSchema,
  updateModelAliasesSchema,
} from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

/**
 * GET /api/settings/model-aliases
 * Returns the full alias map, separated into built-in and custom.
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    return NextResponse.json({
      builtIn: getBuiltInAliases(),
      custom: getCustomAliases(),
      all: getAllAliases(),
    });
  } catch (error) {
    console.error("[API ERROR] /api/settings/model-aliases GET:", error);
    return NextResponse.json({ error: "Failed to get model aliases" }, { status: 500 });
  }
}

/**
 * PUT /api/settings/model-aliases
 * Update the custom aliases map.
 * Body: { aliases: { "old-model": "new-model", ... } }
 */
export async function PUT(request: Request) {
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
    const validation = validateBody(updateModelAliasesSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { aliases } = validation.data;
    setCustomAliases(aliases);
    await updateSettings({ modelAliases: JSON.stringify(aliases) });
    return NextResponse.json({ success: true, custom: getCustomAliases() });
  } catch (error) {
    console.error("[API ERROR] /api/settings/model-aliases PUT:", error);
    return NextResponse.json({ error: "Failed to update model aliases" }, { status: 500 });
  }
}

/**
 * POST /api/settings/model-aliases
 * Add a single custom alias.
 * Body: { from: "old-model", to: "new-model" }
 */
export async function POST(request: Request) {
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
    const validation = validateBody(addModelAliasSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { from, to } = validation.data;
    addCustomAlias(from, to);
    await updateSettings({ modelAliases: JSON.stringify(getCustomAliases()) });
    return NextResponse.json({ success: true, custom: getCustomAliases() });
  } catch (error) {
    console.error("[API ERROR] /api/settings/model-aliases POST:", error);
    return NextResponse.json({ error: "Failed to add alias" }, { status: 500 });
  }
}

/**
 * DELETE /api/settings/model-aliases
 * Remove a custom alias.
 * Body: { from: "old-model" }
 */
export async function DELETE(request: Request) {
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
    const validation = validateBody(removeModelAliasSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { from } = validation.data;
    const removed = removeCustomAlias(from);
    if (!removed) {
      return NextResponse.json({ error: "Alias not found" }, { status: 404 });
    }
    await updateSettings({ modelAliases: JSON.stringify(getCustomAliases()) });
    return NextResponse.json({ success: true, custom: getCustomAliases() });
  } catch (error) {
    console.error("[API ERROR] /api/settings/model-aliases DELETE:", error);
    return NextResponse.json({ error: "Failed to remove alias" }, { status: 500 });
  }
}
