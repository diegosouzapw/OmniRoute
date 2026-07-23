import { NextResponse } from "next/server";
import {
  getInterceptionRules,
  setInterceptionRules,
  deleteInterceptionRules,
} from "@/lib/db/interceptionRules";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { updateInterceptionRulesSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

/**
 * GET /api/providers/[id]/interception-rules
 * Returns the web search/fetch interception rules for a provider, or the
 * all-undefined default when not configured (#3384/#7339).
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const config = getInterceptionRules(id);
    return NextResponse.json(config ?? { interceptSearch: undefined, interceptFetch: undefined });
  } catch (error) {
    return NextResponse.json(buildErrorBody(500, sanitizeErrorMessage(error)), { status: 500 });
  }
}

/**
 * PUT /api/providers/[id]/interception-rules
 * Upsert the interception rules for a provider.
 * Body: { interceptSearch?, interceptFetch?, fetchBackend?, fetchProxyUrl?, models? }
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
    const validation = validateBody(updateInterceptionRulesSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    setInterceptionRules(id, validation.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(buildErrorBody(500, sanitizeErrorMessage(error)), { status: 500 });
  }
}

/**
 * DELETE /api/providers/[id]/interception-rules
 * Remove the interception rules for a provider (reset to native-bypass defaults).
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    deleteInterceptionRules(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(buildErrorBody(500, sanitizeErrorMessage(error)), { status: 500 });
  }
}
