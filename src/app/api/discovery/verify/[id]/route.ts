/**
 * Discovery verify — POST /api/discovery/verify/:id
 *
 * Marks a discovery finding as verified (status='verified', stamps verified_at).
 *
 * Auth: Tier 3 MANAGEMENT + strict local-only (see ../../results/route.ts).
 */

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { markVerified } from "@/lib/db/discoveryResults";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    return createErrorResponse({ status: 400, message: "Invalid discovery result id" });
  }

  try {
    const result = markVerified(id);
    if (!result) {
      return createErrorResponse({ status: 404, message: "Discovery result not found" });
    }
    return Response.json({ result });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to verify discovery result");
  }
}
