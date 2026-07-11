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
  hybridRetrieve: z.boolean().optional(),
  embedSource: z.enum(["local", "memory-auto"]).optional(),
  preferStablePrefix: z.boolean().optional(),
  backend: z.enum(["native", "remote"]).optional(),
  remoteBaseUrl: z.string().max(2000).optional(),
  remoteApiKey: z.string().max(2000).optional(),
  remoteTimeoutMs: z.number().int().min(100).max(30000).optional(),
  dlpEnabled: z.boolean().optional(),
  departmentReviewRequired: z.boolean().optional(),
  universalHandoff: z
    .object({
      enabled: z.boolean().optional(),
      trigger: z.enum(["always", "on-switch", "on-error"]).optional(),
      maxMessagesForSummary: z.number().int().min(5).max(100).optional(),
      handoffModel: z.string().optional(),
      ttlMinutes: z.number().int().min(1).max(10080).optional(),
      preserveSystemPrompt: z.boolean().optional(),
    })
    .optional(),
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
    const partial = validation.data as Record<string, unknown>;
    if (partial.universalHandoff && typeof partial.universalHandoff === "object") {
      const current = await getOmniContextSettings();
      partial.universalHandoff = {
        ...current.universalHandoff,
        ...(partial.universalHandoff as object),
      };
    }
    const settings = await saveOmniContextSettings(partial);
    invalidateOmniContextSettingsCache();
    return NextResponse.json(settings);
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
