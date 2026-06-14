import { NextResponse } from "next/server";
import { createProviderConnection } from "@/models";
import { traeImportSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";

/**
 * POST /api/oauth/trae/import
 *
 * Persist a pasted Trae SOLO Cloud-IDE-JWT (plus optional identity fields).
 * No public OAuth round-trip exists for solo.trae.ai — the user signs in via
 * the web client, copies the JWT (Authorization: Cloud-IDE-JWT <token>), and
 * pastes it here. JWT lifetime is ~14 days; re-import on expiry.
 *
 * Request body (JSON):
 *   accessToken    — required, the Cloud-IDE-JWT
 *   webId          — optional, common_params.web_id
 *   bizUserId      — optional, common_params.biz_user_id
 *   userUniqueId   — optional, common_params.user_unique_id
 *   scope          — optional, default "marscode-us"
 *   tenant         — optional, default "marscode"
 *   region         — optional, default "US-East"
 */
async function requireOAuthImportAuth(request: Request) {
  if (!(await isAuthRequired(request))) return null;
  if (await isAuthenticated(request)) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(request: Request) {
  const authResponse = await requireOAuthImportAuth(request);
  if (authResponse) return authResponse;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(traeImportSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { accessToken, webId, bizUserId, userUniqueId, scope, tenant, region } = validation.data;

    const connection: any = await createProviderConnection({
      provider: "trae",
      authType: "oauth",
      accessToken,
      refreshToken: null,
      // Trae JWTs we've observed expire ~14 days after issuance; expose that
      // hint to the dashboard so the user gets a heads-up before they break.
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      providerSpecificData: {
        webId: webId || "",
        bizUserId: bizUserId || "",
        userUniqueId: userUniqueId || "",
        scope: scope || "marscode-us",
        tenant: tenant || "marscode",
        region: region || "US-East",
        aiRegion: region || "US-East",
        appLanguage: "en",
        appVersion: "1.0.0.1229",
        userRegion: "US",
        userIdentity: "Free",
        authMethod: "imported",
      },
      testStatus: "active",
    });

    return NextResponse.json({
      success: true,
      connection: { id: connection.id, provider: connection.provider },
    });
  } catch (error: any) {
    console.error("Trae import token error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * GET /api/oauth/trae/import
 * Returns field metadata so a generic dashboard UI can render the paste form.
 */
export async function GET(request: Request) {
  const authResponse = await requireOAuthImportAuth(request);
  if (authResponse) return authResponse;

  return NextResponse.json({
    provider: "trae",
    method: "import_token",
    instructions:
      "Sign in to solo.trae.ai, then copy the JWT sent in the 'Authorization: Cloud-IDE-JWT <token>' header (DevTools → Network → any POST to core-normal.trae.ai). Paste it as accessToken. Optionally provide webId/bizUserId/userUniqueId for full identity propagation.",
    requiredFields: [
      {
        name: "accessToken",
        label: "Access Token (Cloud-IDE-JWT)",
        description: "JWT from Authorization header on solo.trae.ai requests.",
        type: "textarea",
        required: true,
      },
      { name: "webId", label: "Web ID", description: "common_params.web_id", type: "text" },
      {
        name: "bizUserId",
        label: "Biz User ID",
        description: "common_params.biz_user_id",
        type: "text",
      },
      {
        name: "userUniqueId",
        label: "User Unique ID",
        description: "common_params.user_unique_id (often equals bizUserId)",
        type: "text",
      },
      { name: "scope", label: "Scope", description: "default: marscode-us", type: "text" },
      { name: "tenant", label: "Tenant", description: "default: marscode", type: "text" },
      { name: "region", label: "Region", description: "default: US-East", type: "text" },
    ],
  });
}
