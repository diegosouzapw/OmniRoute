import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";
import {
  getDefaultForwardingKeywordConfig,
  getForwardingKeywordConfig,
  setForwardingKeywordConfig,
} from "@omniroute/open-sse/config/forwardingKeywordRules.ts";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { updateForwardingKeywordRulesSchema } from "@/shared/validation/settingsSchemas";

export async function GET() {
  try {
    const settings = await getSettings();
    setForwardingKeywordConfig((settings as Record<string, unknown>).forwardingKeywordRules);

    return NextResponse.json({
      config: getForwardingKeywordConfig(),
      defaults: getDefaultForwardingKeywordConfig(),
    });
  } catch (error) {
    console.error("Error reading forwarding keyword settings:", error);
    return NextResponse.json(
      { error: "Failed to read forwarding keyword settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
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
    const validation = validateBody(updateForwardingKeywordRulesSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const body = validation.data;
    await updateSettings({ forwardingKeywordRules: body });
    setForwardingKeywordConfig(body);

    return NextResponse.json({
      config: getForwardingKeywordConfig(),
      defaults: getDefaultForwardingKeywordConfig(),
    });
  } catch (error) {
    console.error("Error updating forwarding keyword settings:", error);
    return NextResponse.json(
      { error: "Failed to update forwarding keyword settings" },
      { status: 500 }
    );
  }
}
