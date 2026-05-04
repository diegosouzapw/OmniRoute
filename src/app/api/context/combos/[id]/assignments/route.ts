import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getAssignmentsForCompressionCombo,
  getCompressionCombo,
  updateAssignments,
} from "@/lib/db/compressionCombos";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

export const assignmentsUpdateSchema = z
  .object({
    routingComboIds: z.array(z.string().trim().min(1)),
  })
  .strict();

export async function GET(request: Request, { params }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const { id } = await params;
  if (!getCompressionCombo(id)) {
    return NextResponse.json({ error: "Compression combo not found" }, { status: 404 });
  }
  return NextResponse.json({ assignments: getAssignmentsForCompressionCombo(id) });
}

export async function PUT(request: Request, { params }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const { id } = await params;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(assignmentsUpdateSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const updated = updateAssignments(id, validation.data.routingComboIds);
  if (!updated) return NextResponse.json({ error: "Compression combo not found" }, { status: 404 });
  return NextResponse.json({ assignments: getAssignmentsForCompressionCombo(id) });
}
