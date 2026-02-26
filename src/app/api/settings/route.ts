import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";
import bcrypt from "bcryptjs";
import { updateSettingsSchema, validateBody } from "@/shared/validation/schemas";
import { getRuntimePorts } from "@/lib/runtime/ports";

export async function GET() {
  try {
    const settings = await getSettings();
    const { password, ...safeSettings } = settings;

    const enableRequestLogs = process.env.ENABLE_REQUEST_LOGS === "true";
    const runtimePorts = getRuntimePorts();

    return NextResponse.json({
      ...safeSettings,
      enableRequestLogs,
      hasPassword: !!password || !!process.env.INITIAL_PASSWORD,
      runtimePorts,
      apiPort: runtimePorts.apiPort,
      dashboardPort: runtimePorts.dashboardPort,
    });
  } catch (error) {
    console.log("Error getting settings:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const rawBody = await request.json();

    // Zod validation
    const validation = validateBody(updateSettingsSchema, rawBody);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const body = validation.data;

    // If updating password, hash it
    if (body.newPassword) {
      const settings = await getSettings();
      const currentHash = settings.password;

      // Verify current password if it exists
      if (currentHash) {
        if (!body.currentPassword) {
          return NextResponse.json({ error: "Current password required" }, { status: 400 });
        }
        const isValid = await bcrypt.compare(body.currentPassword, currentHash);
        if (!isValid) {
          return NextResponse.json({ error: "Invalid current password" }, { status: 401 });
        }
      } else {
        // First time setting password, no current password needed
        // Allow empty currentPassword or default "123456"
        if (body.currentPassword && body.currentPassword !== "123456") {
          return NextResponse.json({ error: "Invalid current password" }, { status: 401 });
        }
      }

      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.newPassword, salt);
      delete body.newPassword;
      delete body.currentPassword;
    }

    const settings = await updateSettings(body);
    const { password, ...safeSettings } = settings;
    return NextResponse.json(safeSettings);
  } catch (error) {
    console.log("Error updating settings:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
