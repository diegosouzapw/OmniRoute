import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/db/settings";
import { updateAutoDisableAccountsSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { normalizeAutoDisableBannedScope } from "@/shared/utils/autoDisableBanned";

function toAutoDisableResponse(settings: Record<string, unknown>) {
  return {
    enabled: Boolean(settings.autoDisableBannedAccounts),
    threshold:
      typeof settings.autoDisableBannedThreshold === "number"
        ? settings.autoDisableBannedThreshold
        : 3,
    scope: normalizeAutoDisableBannedScope(settings.autoDisableBannedScope),
  };
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const settings = await getSettings();
    return NextResponse.json(toAutoDisableResponse(settings));
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
      ...(body.scope !== undefined && { autoDisableBannedScope: body.scope }),
    });

    const settings = await getSettings();
    return NextResponse.json(toAutoDisableResponse(settings));
  } catch (error) {
    console.error("Error updating auto-disable accounts config:", error);
    return NextResponse.json(
      { error: "Failed to update auto-disable accounts config" },
      { status: 500 }
    );
  }
}
