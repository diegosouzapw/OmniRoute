import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import {
  getOmniContextSettings,
  invalidateOmniContextSettingsCache,
  saveOmniContextSettings,
} from "@/lib/omnicontext/settings";

const settingsSchema = z.object({
  enabled: z.boolean().optional(),
  injectBudgetTokens: z.number().int().min(100).max(32000).optional(),
  retrieveTimeoutMs: z.number().int().min(100).max(30000).optional(),
  gitProbeEnabled: z.boolean().optional(),
  autoPublish: z.enum(["off", "confirm", "draft-only"]).optional(),
});

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await getOmniContextSettings());
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
      { status: 400 }
    );
  }

  const validation = validateBody(settingsSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  try {
    const settings = await saveOmniContextSettings(validation.data);
    invalidateOmniContextSettingsCache();
    return NextResponse.json(settings);
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
