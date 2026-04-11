import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";
import {
  applyThinkingBudgetSettings,
  setThinkingBudgetConfig,
  getThinkingBudgetConfig,
} from "@omniroute/open-sse/services/thinkingBudget.ts";
import { updateThinkingBudgetSchema } from "@/shared/validation/settingsSchemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

export async function GET() {
  try {
    const settings = await getSettings();
    applyThinkingBudgetSettings(settings);
    const config = getThinkingBudgetConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error("Error reading thinking budget config:", error);
    return NextResponse.json({ error: "Failed to read thinking budget config" }, { status: 500 });
  }
}

export async function PUT(request) {
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
    const validation = validateBody(updateThinkingBudgetSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const body = validation.data;

    // Apply config in-memory
    setThinkingBudgetConfig(body);

    // Persist to settings DB
    await updateSettings({ thinkingBudget: body });

    return NextResponse.json(getThinkingBudgetConfig());
  } catch (error) {
    console.error("Error updating thinking budget config:", error);
    return NextResponse.json({ error: "Failed to update thinking budget config" }, { status: 500 });
  }
}
