import { NextResponse } from "next/server";
import { z } from "zod";
import { getDefaultCompressionCombo, setEngineInDefaultCombo } from "@/lib/db/compressionCombos";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const engineToggleSchema = z
  .object({
    engineId: z.string().trim().min(1),
    enabled: z.boolean(),
    config: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const combo = getDefaultCompressionCombo();
  if (!combo) {
    return NextResponse.json({ error: "No default compression combo found" }, { status: 404 });
  }
  return NextResponse.json(combo);
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

  const validation = validateBody(engineToggleSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { engineId, enabled, config } = validation.data;
  const combo = setEngineInDefaultCombo(engineId, enabled, config);
  if (!combo) {
    return NextResponse.json({ error: "No default compression combo found" }, { status: 404 });
  }
  return NextResponse.json(combo);
}
