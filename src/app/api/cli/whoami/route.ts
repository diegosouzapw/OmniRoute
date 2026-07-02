import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { extractBearer, ACCESS_TOKEN_PREFIX } from "@/server/authz/accessTokenAuth";
import { verifyAccessToken, getAccessToken } from "@/lib/db/accessTokens";

/**
 * GET /api/cli/whoami — report the current credential to the CLI.
 *
 * Requires a valid management credential (read scope is enough — it's a GET).
 * When the caller used a scoped CLI access token, returns its name/scope/expiry
 * so `omniroute connect --key` / `context current` can confirm what they hold.
 * Other credentials (dashboard session, manage-scope API key, loopback CLI
 * token) report `viaAccessToken: false`.
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const bearer = extractBearer(request);
  if (bearer && bearer.startsWith(ACCESS_TOKEN_PREFIX)) {
    const verified = verifyAccessToken(bearer);
    if (verified) {
      const record = getAccessToken(verified.id);
      return NextResponse.json({
        authenticated: true,
        viaAccessToken: true,
        id: verified.id,
        name: verified.name,
        scope: verified.scope,
        createdAt: record?.createdAt ?? null,
        lastUsedAt: record?.lastUsedAt ?? null,
        expiresAt: record?.expiresAt ?? null,
      });
    }
  }

  return NextResponse.json({ authenticated: true, viaAccessToken: false, scope: null });
}
