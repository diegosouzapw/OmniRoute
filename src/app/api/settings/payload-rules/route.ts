import { NextResponse } from "next/server";
import { updateSettings } from "@/lib/localDb";
import {
  getPayloadRulesConfig,
  normalizePayloadRulesConfig,
} from "@omniroute/open-sse/services/payloadRules.ts";
import { updatePayloadRulesSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    return NextResponse.json(await getPayloadRulesConfig());
  } catch (error) {
    console.error("Error reading payload rules config:", error);
    return NextResponse.json({ error: "Failed to read payload rules config" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
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
    const validation = validateBody(updatePayloadRulesSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const normalizedConfig = normalizePayloadRulesConfig(validation.data);
    await updateSettings({ payloadRules: normalizedConfig });

    return NextResponse.json(normalizedConfig);
  } catch (error) {
    console.error("Error updating payload rules config:", error);
    return NextResponse.json({ error: "Failed to update payload rules config" }, { status: 500 });
  }
}
