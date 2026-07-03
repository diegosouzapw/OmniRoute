import { NextResponse } from "next/server";
import { z } from "zod";
import { extractCodexAccountInfo } from "@/lib/oauth/services/codexImport";
import { createProviderConnection } from "@/models";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

/**
 * POST /api/oauth/codex/import-token
 *
 * Import a Codex (ChatGPT/OpenAI) connection from a bare access token — no
 * refresh token required. Covers users who only have a raw ChatGPT website
 * access token (e.g. copied from devtools/session storage) and have no path
 * through the refresh-token-requiring bulk import at /api/oauth/codex/import.
 *
 * The connection is created with authType "access_token": with no refresh
 * token, the executor's refreshCredentials() degrades to returning null on
 * expiry (forcing re-auth) instead of attempting a refresh-token exchange —
 * see open-sse/executors/codex.ts.
 *
 * Body: `{ accessToken: string, name?: string }`
 *
 * Inspired-by: https://github.com/decolua/9router/pull/1290
 */

const bodySchema = z.object({
  accessToken: z.string().trim().min(1, "accessToken is required"),
  name: z.string().trim().min(1).optional(),
});

async function requireAuth(request: Request): Promise<NextResponse | null> {
  if (!(await isAuthRequired(request))) return null;
  if (await isAuthenticated(request)) return null;
  return NextResponse.json(buildErrorBody(401, "Unauthorized"), { status: 401 });
}

export async function POST(request: Request) {
  const authResponse = await requireAuth(request);
  if (authResponse) return authResponse;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(buildErrorBody(400, "Invalid or empty JSON body"), { status: 400 });
  }

  const parsed = bodySchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      buildErrorBody(400, parsed.error.issues[0]?.message ?? "Invalid request body"),
      { status: 400 }
    );
  }

  const { accessToken, name } = parsed.data;
  const info = extractCodexAccountInfo(accessToken);

  if (!info.email && !info.chatgptAccountId && !name) {
    return NextResponse.json(
      buildErrorBody(
        400,
        "Could not decode any account info from the access token and no name was provided"
      ),
      { status: 400 }
    );
  }

  const providerSpecificData: Record<string, string> = {};
  if (info.chatgptAccountId) providerSpecificData.chatgptAccountId = info.chatgptAccountId;
  if (info.chatgptPlanType) providerSpecificData.chatgptPlanType = info.chatgptPlanType;

  try {
    const connection = await createProviderConnection({
      provider: "codex",
      authType: "access_token",
      accessToken,
      email: info.email,
      name: name || info.email,
      testStatus: "active",
      isActive: true,
      ...(Object.keys(providerSpecificData).length > 0 ? { providerSpecificData } : {}),
    });

    return NextResponse.json({
      success: true,
      connection: {
        id: connection.id,
        provider: connection.provider,
        email: connection.email,
        name: connection.name,
      },
    });
  } catch (error) {
    return NextResponse.json(
      buildErrorBody(
        500,
        sanitizeErrorMessage(error instanceof Error ? error.message : String(error))
      ),
      { status: 500 }
    );
  }
}
