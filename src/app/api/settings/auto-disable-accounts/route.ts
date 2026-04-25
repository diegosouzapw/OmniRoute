import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";
import { updateAutoDisableAccountsSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const settings = await getSettings();
    return NextResponse.json({
      enabled: settings.autoDisableBannedAccounts ?? false,
      threshold: settings.autoDisableBannedThreshold ?? 3,
    });
  } catch (error) {
    console.error("Error reading auto-disable accounts config:", error);
    return NextResponse.json(
      { error: "Failed to read auto-disable accounts config" },
      { status: 500 }
    );
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
    const validation = validateBody(updateAutoDisableAccountsSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const body = validation.data;

    await updateSettings({
      autoDisableBannedAccounts: body.enabled,
      ...(body.threshold !== undefined && { autoDisableBannedThreshold: body.threshold }),
    });

    const settings = await getSettings();
    return NextResponse.json({
      enabled: settings.autoDisableBannedAccounts ?? false,
      threshold: settings.autoDisableBannedThreshold ?? 3,
    });
  } catch (error) {
    console.error("Error updating auto-disable accounts config:", error);
    return NextResponse.json(
      { error: "Failed to update auto-disable accounts config" },
      { status: 500 }
    );
  }
}
