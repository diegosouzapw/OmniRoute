/**
 * @file route.ts
 * @description Import Raycast Pro credentials captured from macOS app traffic.
 *
 * @changes
 * - [2026-07-27] [Composer] - Initial Raycast token import route (local dev)
 */

import { NextResponse } from "next/server";
import { createProviderConnection } from "@/models";
import { RaycastService } from "@/lib/oauth/services/raycast";
import { raycastImportSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";
import { resolveProxyForProvider } from "@/models";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";

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
    const validation = validateBody(raycastImportSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { accessToken, deviceId, aid, signatureJwt, sigSecret } = validation.data;
    const raycastService = new RaycastService();
    const resolved = raycastService.validateCredentials({
      accessToken,
      deviceId,
      aid,
      signatureJwt,
      sigSecret,
    });

    const proxy = await resolveProxyForProvider("raycast");
    const models = await runWithProxyContext(proxy, () =>
      raycastService.probeModels({
        accessToken: accessToken.trim(),
        deviceId: deviceId.trim(),
        aid: resolved.aid,
        sigSecret: sigSecret?.trim(),
      })
    );

    const connection: any = await createProviderConnection({
      provider: "raycast",
      authType: "oauth",
      accessToken: accessToken.trim(),
      refreshToken: null,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      providerSpecificData: {
        deviceId: deviceId.trim(),
        aid: resolved.aid,
        sigSecret: sigSecret?.trim() || "",
        authMethod: "imported",
        modelCount: models.length,
        premiumModelCount: models.filter((m) => m.requires_better_ai).length,
      },
      testStatus: "active",
    });

    return NextResponse.json({
      success: true,
      connection: {
        id: connection.id,
        provider: connection.provider,
      },
      models: {
        total: models.length,
        premium: models.filter((m) => m.requires_better_ai).length,
        sample: models.slice(0, 8).map((m) => m.id),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Raycast import token error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET(request: Request) {
  const authResponse = await requireOAuthImportAuth(request);
  if (authResponse) return authResponse;

  const raycastService = new RaycastService();

  return NextResponse.json({
    provider: "raycast",
    method: "import_token",
    localDevOnly: true,
    instructions: raycastService.getCaptureInstructions(),
    requiredFields: [
      {
        name: "accessToken",
        label: "Bearer Token",
        description: "From Authorization: Bearer header on backend.raycast.com requests",
        type: "textarea",
      },
      {
        name: "deviceId",
        label: "Device ID",
        description: "From X-Raycast-DeviceId header",
        type: "text",
      },
      {
        name: "signatureJwt",
        label: "Signature JWT",
        description: "From X-Raycast-Signature header (AID decoded automatically)",
        type: "textarea",
      },
      {
        name: "sigSecret",
        label: "Signature Secret",
        description: "Optional override — defaults to community-extracted SIG_SECRET",
        type: "text",
      },
    ],
  });
}
