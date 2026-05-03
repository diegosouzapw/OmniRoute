import { NextResponse } from "next/server";
import { z } from "zod";
import { getCompressionSettings, updateCompressionSettings } from "@/lib/db/compression";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

export const rtkConfigSchema = z
  .object({
    enabled: z.boolean().optional(),
    intensity: z.enum(["minimal", "standard", "aggressive"]).optional(),
    applyToToolResults: z.boolean().optional(),
    applyToCodeBlocks: z.boolean().optional(),
    applyToAssistantMessages: z.boolean().optional(),
    enabledFilters: z.array(z.string()).optional(),
    disabledFilters: z.array(z.string()).optional(),
    maxLinesPerResult: z.number().int().min(0).max(100000).optional(),
    maxCharsPerResult: z.number().int().min(0).max(1000000).optional(),
    deduplicateThreshold: z.number().int().min(2).max(100).optional(),
    customFiltersEnabled: z.boolean().optional(),
    trustProjectFilters: z.boolean().optional(),
    rawOutputRetention: z.enum(["never", "failures", "always"]).optional(),
    rawOutputMaxBytes: z.number().int().min(1024).max(10_000_000).optional(),
  })
  .strict();

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const settings = await getCompressionSettings();
  return NextResponse.json(settings.rtkConfig);
}

export async function PUT(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const validation = validateBody(rtkConfigSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  const current = await getCompressionSettings();
  const settings = await updateCompressionSettings({
    rtkConfig: { ...current.rtkConfig, ...validation.data },
  });
  return NextResponse.json(settings.rtkConfig);
}
