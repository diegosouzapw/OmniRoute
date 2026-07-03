/**
 * Discovery result by id — GET / DELETE /api/discovery/results/:id
 *
 * Auth: Tier 3 MANAGEMENT + strict local-only (see ../route.ts for the model).
 */

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { getDiscoveryResultById, deleteDiscoveryResult } from "@/lib/db/discoveryResults";

function parseId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (id === null) {
    return createErrorResponse({ status: 400, message: "Invalid discovery result id" });
  }

  try {
    const result = getDiscoveryResultById(id);
    if (!result) {
      return createErrorResponse({ status: 404, message: "Discovery result not found" });
    }
    return Response.json({ result });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to read discovery result");
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (id === null) {
    return createErrorResponse({ status: 400, message: "Invalid discovery result id" });
  }

  try {
    const removed = deleteDiscoveryResult(id);
    if (!removed) {
      return createErrorResponse({ status: 404, message: "Discovery result not found" });
    }
    return Response.json({ deleted: true, id });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to delete discovery result");
  }
}
