import { NextResponse } from "next/server";
import { z } from "zod";
import { createCompressionCombo, listCompressionCombos } from "@/lib/db/compressionCombos";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

export const pipelineStepSchema = z
  .object({
    engine: z.enum(["lite", "caveman", "aggressive", "ultra", "rtk"]),
    intensity: z.string().optional(),
    config: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export const compressionComboCreateSchema = z
  .object({
    id: z.string().trim().min(1).optional(),
    name: z.string().trim().min(1).max(120),
    description: z.string().max(1000).optional(),
    pipeline: z.array(pipelineStepSchema).min(1).optional(),
    languagePacks: z.array(z.string().trim().min(1)).optional(),
    outputMode: z.boolean().optional(),
    outputModeIntensity: z.string().optional(),
    isDefault: z.boolean().optional(),
  })
  .strict();

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return NextResponse.json({ combos: listCompressionCombos() });
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(compressionComboCreateSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const combo = createCompressionCombo(validation.data);
  return NextResponse.json(combo, { status: 201 });
}
