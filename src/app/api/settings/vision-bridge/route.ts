import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/db/settings";
import { VISION_BRIDGE_DEFAULTS } from "@/shared/constants/visionBridgeDefaults";

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json({
      visionBridgeEnabled: settings.visionBridgeEnabled ?? VISION_BRIDGE_DEFAULTS.enabled,
      visionBridgeModel: settings.visionBridgeModel ?? VISION_BRIDGE_DEFAULTS.model,
      visionBridgePrompt: settings.visionBridgePrompt ?? VISION_BRIDGE_DEFAULTS.prompt,
      visionBridgeTimeout: settings.visionBridgeTimeout ?? VISION_BRIDGE_DEFAULTS.timeoutMs,
      visionBridgeMaxImages:
        settings.visionBridgeMaxImages ?? VISION_BRIDGE_DEFAULTS.maxImagesPerRequest,
    });
  } catch (error) {
    console.error("Error reading vision bridge config:", error);
    return NextResponse.json({ error: "Failed to read vision bridge config" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    // Only pick the allowed keys
    const updates = {
      visionBridgeEnabled:
        typeof body.visionBridgeEnabled === "boolean" ? body.visionBridgeEnabled : undefined,
      visionBridgeModel:
        typeof body.visionBridgeModel === "string" ? body.visionBridgeModel : undefined,
      visionBridgePrompt:
        typeof body.visionBridgePrompt === "string" ? body.visionBridgePrompt : undefined,
      visionBridgeTimeout:
        typeof body.visionBridgeTimeout === "number" ? body.visionBridgeTimeout : undefined,
      visionBridgeMaxImages:
        typeof body.visionBridgeMaxImages === "number" ? body.visionBridgeMaxImages : undefined,
    };

    // Remove undefined
    Object.keys(updates).forEach(
      (key) =>
        updates[key as keyof typeof updates] === undefined &&
        delete updates[key as keyof typeof updates]
    );

    await updateSettings(updates);

    const settings = await getSettings();
    return NextResponse.json({
      visionBridgeEnabled: settings.visionBridgeEnabled ?? VISION_BRIDGE_DEFAULTS.enabled,
      visionBridgeModel: settings.visionBridgeModel ?? VISION_BRIDGE_DEFAULTS.model,
      visionBridgePrompt: settings.visionBridgePrompt ?? VISION_BRIDGE_DEFAULTS.prompt,
      visionBridgeTimeout: settings.visionBridgeTimeout ?? VISION_BRIDGE_DEFAULTS.timeoutMs,
      visionBridgeMaxImages:
        settings.visionBridgeMaxImages ?? VISION_BRIDGE_DEFAULTS.maxImagesPerRequest,
    });
  } catch (error) {
    console.error("Error updating vision bridge config:", error);
    return NextResponse.json({ error: "Failed to update vision bridge config" }, { status: 500 });
  }
}
