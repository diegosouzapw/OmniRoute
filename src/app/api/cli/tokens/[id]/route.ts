import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { revokeAccessToken } from "@/lib/db/accessTokens";

/**
 * DELETE /api/cli/tokens/:id — revoke an access token (by id or display prefix).
 * Admin-only (same enforcement as the collection route). Idempotent: revoking
 * an unknown/already-revoked token returns 404.
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { id } = await params;
  const revoked = revokeAccessToken(id);
  if (!revoked) {
    return NextResponse.json({ error: "Token not found or already revoked" }, { status: 404 });
  }
  return NextResponse.json({ success: true, id });
}
