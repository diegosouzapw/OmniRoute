import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { revokeAccessToken } from "@/lib/db/accessTokens";

/**
 * DELETE /api/cli/tokens/:id — revoke an access token (by id or display prefix).
 * Admin-only (same enforcement as the collection route). Revoking an
 * already-revoked token returns 200 with alreadyRevoked so a retry after a
 * lost response succeeds. An unknown token is 404. A prefix that matches more
 * than one live token revokes nothing and returns 409.
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { id } = await params;
  const result = revokeAccessToken(id);
  if (result.ambiguous) {
    return NextResponse.json(
      { error: "Token prefix matches more than one token" },
      { status: 409 }
    );
  }
  if (!result.revoked) {
    return NextResponse.json({ error: "Token not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, id, alreadyRevoked: result.alreadyRevoked });
}
