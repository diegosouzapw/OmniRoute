import { NextResponse } from "next/server";
import {
  getParamFilterConfig,
  setParamFilterConfig,
  deleteParamFilterConfig,
} from "@/lib/db/paramFilters";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { updateParamFilterConfigSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

/**
 * GET /api/providers/[id]/param-filters
 * Returns the param filter config for a provider, or null if not configured.
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const config = getParamFilterConfig(id);
    return NextResponse.json(config ?? { block: [], allow: [], autoLearn: false });
  } catch (error) {
    return NextResponse.json(buildErrorBody(500, sanitizeErrorMessage(error)), { status: 500 });
  }
}

/**
 * PUT /api/providers/[id]/param-filters
 * Upsert the param filter config for a provider.
 * Body: { block?: string[], allow?: string[], models?: Record<string, { block?: string[], allow?: string[] }>, autoLearn?: boolean }
 */
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(buildErrorBody(400, "Invalid JSON body"), { status: 400 });
  }

  try {
    const { id } = await params;
    const validation = validateBody(updateParamFilterConfigSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { block, allow, models, autoLearn } = validation.data;

    setParamFilterConfig(id, {
      block: block ?? [],
      allow: allow ?? [],
      models,
      autoLearn: autoLearn ?? false,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(buildErrorBody(500, sanitizeErrorMessage(error)), { status: 500 });
  }
}

/**
 * DELETE /api/providers/[id]/param-filters
 * Remove the param filter config for a provider (reset to no filtering).
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    deleteParamFilterConfig(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(buildErrorBody(500, sanitizeErrorMessage(error)), { status: 500 });
  }
}
