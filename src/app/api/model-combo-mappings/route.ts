/**
 * API: Model-Combo Mappings (#563)
 * GET  — List all mappings
 * POST — Create a new mapping
 */

import { z } from "zod";
import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createModelComboMapping, getModelComboMappings } from "@/lib/localDb";
import { paginationSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { validatedJsonBody } from "@/shared/validation/helpers";

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
    const { searchParams } = new URL(request.url);
    const raw = {
      offset: searchParams.get("offset") || undefined,
      limit: searchParams.get("limit") || undefined,
    };
    const validation = validateBody(paginationSchema, raw);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { limit, offset } = validation.data;
    const result = await getModelComboMappings(limit !== undefined ? { limit, offset } : undefined);
    return NextResponse.json({ mappings: result.items, total: result.total });
  } catch (error) {
    console.error("Failed to list model-combo mappings:", error);
    return NextResponse.json({ error: "Failed to list model-combo mappings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const parsed = await validatedJsonBody(request, createMappingSchema);
    if (!parsed.success) {
      return parsed.response;
    }

    const { data } = parsed;
    const mapping = await createModelComboMapping({
      pattern: data.pattern.trim(),
      comboId: data.comboId,
      priority: data.priority,
      enabled: data.enabled,
      description: data.description,
    });

    return NextResponse.json({ mapping }, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create model-combo mapping:", error);
    return NextResponse.json({ error: "Failed to create model-combo mapping" }, { status: 500 });
  }
}
