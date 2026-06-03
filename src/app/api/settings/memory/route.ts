import { NextRequest, NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { MemorySettingsExtendedSchema } from "@/shared/schemas/memory";
import {
  invalidateMemorySettingsCache,
  normalizeMemorySettings,
  toMemorySettingsUpdates,
} from "@/lib/memory/settings";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = (await getSettings()) as Record<string, unknown>;
    return NextResponse.json(normalizeMemorySettings(settings));
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: { message: "Invalid JSON body", details: [] } },
      { status: 400 },
    );
  }

  const validation = validateBody(MemorySettingsExtendedSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  try {
    const updates = toMemorySettingsUpdates(validation.data);
    const settings = (await updateSettings(updates)) as Record<string, unknown>;
    invalidateMemorySettingsCache();

    return NextResponse.json(normalizeMemorySettings(settings));
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
