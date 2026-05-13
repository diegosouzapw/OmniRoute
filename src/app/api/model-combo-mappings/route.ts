/**
 * API: Model-Combo Mappings (#563)
 * GET  — List all mappings
 * POST — Create a new mapping
 */

import { z } from "zod";
import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getModelComboMappings, createModelComboMapping } from "@/lib/localDb";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";

const createMappingSchema = z.object({
  pattern: z.string().min(1, "Pattern is required").max(500),
  comboId: z.string().min(1, "ComboId is required"),
  priority: z.number().int().optional().default(0),
  enabled: z.boolean().optional().default(true),
  description: z.string().max(1000).optional().default(""),
});

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const mappings = await getModelComboMappings();
    return NextResponse.json({ mappings });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to list model-combo mappings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const rawBody = await request.json();
    const validation = validateBody(createMappingSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { data } = validation;
    const mapping = await createModelComboMapping({
      pattern: data.pattern.trim(),
      comboId: data.comboId,
      priority: data.priority,
      enabled: data.enabled,
      description: data.description,
    });

    return NextResponse.json({ mapping }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create model-combo mapping" },
      { status: 500 }
    );
  }
}
