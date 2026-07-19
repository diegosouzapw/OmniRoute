import { NextResponse } from "next/server";
import { z } from "zod";
import { extractCodexAccountInfo } from "@/lib/oauth/services/codexImport";
import { parseCodexSessionJson } from "@/lib/oauth/utils/codexSessionImport";
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
 * Body: `{ accessToken: string, name?: string }` OR, defense-in-depth for
 * non-UI/API callers (#6636), the full session JSON object copied from
 * `chatgpt.com/api/auth/session` under `{ session: {...} }`.
 *
 * Inspired-by: https://github.com/decolua/9router/pull/1290
 */

const bodySchema = z.union([
  z.object({
    accessToken: z.string().trim().min(1, "accessToken is required"),
    name: z.string().trim().min(1).optional(),
  }),
  z.object({
    session: z.record(z.string(), z.unknown()),
    name: z.string().trim().min(1).optional(),
  }),
]);

type ResolvedBody = { accessToken: string; name?: string };

/** Resolve either request-body shape to a flat `{ accessToken, name }` pair. */
function resolveAccessToken(
  parsed: z.infer<typeof bodySchema>
): { ok: true; resolved: ResolvedBody } | { ok: false; error: string } {
  if ("accessToken" in parsed) {
    return { ok: true, resolved: { accessToken: parsed.accessToken, name: parsed.name } };
  }
  const result = parseCodexSessionJson(parsed.session);
  if (!result.ok) return { ok: false, error: result.error };
  return { ok: true, resolved: { accessToken: result.session.accessToken, name: parsed.name } };
}

/**
 * Parse + validate the request body (JSON parse, Zod schema, then the
 * accessToken/session-JSON union resolution). Returns either the resolved
 * `{ accessToken, name }` pair or a ready-to-return 400 error response —
 * keeps POST's own branch count flat as the accepted body shapes grow (#6636).
 */
async function parseRequestBody(
  request: Request
): Promise<{ ok: true; resolved: ResolvedBody } | { ok: false; response: NextResponse }> {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return {
      ok: false,
      response: NextResponse.json(buildErrorBody(400, "Invalid or empty JSON body"), {
        status: 400,
      }),
    };
  }

  const parsed = bodySchema.safeParse(rawBody);
  if (!parsed.success) {
    return {
      ok: false,
      response: NextResponse.json(
        buildErrorBody(400, parsed.error.issues[0]?.message ?? "Invalid request body"),
        { status: 400 }
      ),
    };
  }

  const resolved = resolveAccessToken(parsed.data);
  if (!resolved.ok) {
    return {
      ok: false,
      response: NextResponse.json(buildErrorBody(400, resolved.error), { status: 400 }),
    };
  }
  return { ok: true, resolved: resolved.resolved };
}

async function requireAuth(request: Request): Promise<NextResponse | null> {
  if (!(await isAuthRequired(request))) return null;
  if (await isAuthenticated(request)) return null;
  return NextResponse.json(buildErrorBody(401, "Unauthorized"), { status: 401 });
}

export async function POST(request: Request) {
  const authResponse = await requireAuth(request);
  if (authResponse) return authResponse;

  const body = await parseRequestBody(request);
  if (!body.ok) return body.response;

  const { accessToken, name } = body.resolved;
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
