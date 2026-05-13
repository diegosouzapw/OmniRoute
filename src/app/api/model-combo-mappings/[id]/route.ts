/**
 * API: Model-Combo Mapping by ID (#563)
 * PUT    — Update a mapping
 * DELETE — Delete a mapping
 */

import { z } from "zod";
import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  updateModelComboMapping,
  deleteModelComboMapping,
  getModelComboMappingById,
} from "@/lib/localDb";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";

const updateMappingSchema = z.object({
  pattern: z.string().min(1).max(500).optional(),
  comboId: z.string().min(1).optional(),
  priority: z.number().int().optional(),
  enabled: z.boolean().optional(),
  description: z.string().max(1000).optional(),
});

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const mapping = await getModelComboMappingById(id);
    if (!mapping) {
      return NextResponse.json({ error: "Mapping not found" }, { status: 404 });
    }
    return NextResponse.json({ mapping });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to get mapping" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const rawBody = await request.json();
    const validation = validateBody(updateMappingSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const mapping = await updateModelComboMapping(id, validation.data);

    if (!mapping) {
      return NextResponse.json({ error: "Mapping not found" }, { status: 404 });
    }

    return NextResponse.json({ mapping });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update mapping" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const deleted = await deleteModelComboMapping(id);

    if (!deleted) {
      return NextResponse.json({ error: "Mapping not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete mapping" },
      { status: 500 }
    );
  }
}
