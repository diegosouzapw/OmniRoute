import { NextResponse, type Request } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";
import { setDefaultFastServiceTierEnabled } from "@omniroute/open-sse/executors/codex.ts";
import { updateCodexServiceTierSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

export async function GET() {
  try {
    const settings = await getSettings();
    const persisted =
      typeof settings.codexServiceTier === "string"
        ? JSON.parse(settings.codexServiceTier)
        : settings.codexServiceTier;

    return NextResponse.json({
      enabled: typeof persisted?.enabled === "boolean" ? persisted.enabled : false,
    });
  } catch (error) {
    console.error("[API ERROR] /api/settings/codex-service-tier GET:", error);
    return NextResponse.json({ error: "Failed to get config" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
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
    const validation = validateBody(updateCodexServiceTierSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const config = validation.data;
    await updateSettings({ codexServiceTier: config });
    setDefaultFastServiceTierEnabled(config.enabled);

    return NextResponse.json(config);
  } catch (error) {
    console.error("[API ERROR] /api/settings/codex-service-tier PUT:", error);
    return NextResponse.json({ error: "Failed to update config" }, { status: 500 });
  }
}
