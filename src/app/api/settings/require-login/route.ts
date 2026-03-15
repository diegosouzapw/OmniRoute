import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";
import bcrypt from "bcryptjs";
import { updateRequireLoginSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

export async function GET() {
  try {
    const settings = await getSettings();
    const requireLogin = settings.requireLogin !== false;
    const hasPassword = !!settings.password || !!process.env.INITIAL_PASSWORD;
    const setupComplete = !!settings.setupComplete;
    return NextResponse.json({ requireLogin, hasPassword, setupComplete });
  } catch (error) {
    console.error("[API] Error fetching require-login settings:", error);
    return NextResponse.json(
      { requireLogin: true, hasPassword: true, setupComplete: true },
      { status: 200 }
    );
  }
}

/**
 * POST /api/settings/require-login — Set password and/or toggle requireLogin.
 * Used by the onboarding wizard security step.
 */
export async function POST(request: Request) {
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
    const validation = validateBody(updateRequireLoginSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const body = validation.data;
    const { requireLogin, password } = body;

    const updates: Record<string, any> = {};

    if (typeof requireLogin === "boolean") {
      updates.requireLogin = requireLogin;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      updates.password = hashedPassword;
    }

    await updateSettings(updates);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] Error updating require-login settings:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update settings" },
      { status: 500 }
    );
  }
}
