/**
 * @file route.ts
 * @description Auto-import Raycast Pro credentials from local macOS Keychain + DB.
 *
 * @changes
 * - [2026-07-27] [Composer] - One-click local Raycast credential extraction
 */

import { NextResponse } from "next/server";
import { createProviderConnection } from "@/models";
import { replaceSyncedAvailableModelsForConnection } from "@/lib/db/models";
import { RaycastService } from "@/lib/oauth/services/raycast";
import {
  extractLocalRaycastCredentials,
  isRaycastLocalExtractAvailable,
} from "@/lib/oauth/services/raycastLocal";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";
import { resolveProxyForProvider } from "@/models";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";

async function requireOAuthImportAuth(request: Request) {
  if (!(await isAuthRequired(request))) return null;
  if (await isAuthenticated(request)) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: Request) {
  const authResponse = await requireOAuthImportAuth(request);
  if (authResponse) return authResponse;

  return NextResponse.json({
    available: isRaycastLocalExtractAvailable(),
    platform: process.platform,
    requires: ["macOS", "Raycast.app installed", "sqlcipher CLI (brew install sqlcipher)"],
    sources: {
      bearerToken: "Keychain → Raycast / raycast-store_credentials → oauth.access_token",
      deviceId:
        "Raycast encrypted DB user.analyticsId (same as posthog.distinctId on disk)",
    },
  });
}

export async function POST(request: Request) {
  const authResponse = await requireOAuthImportAuth(request);
  if (authResponse) return authResponse;

  if (!isRaycastLocalExtractAvailable()) {
    return NextResponse.json(
      {
        error:
          "Raycast auto-import unavailable — need macOS, Raycast installed, and sqlcipher (`brew install sqlcipher`)",
      },
      { status: 400 }
    );
  }

  try {
    const local = extractLocalRaycastCredentials();
    const raycastService = new RaycastService();
    const resolved = raycastService.validateCredentials({
      accessToken: local.accessToken,
      deviceId: local.deviceId,
      aid: local.aid,
    });

    const proxy = await resolveProxyForProvider("raycast");
    const models = await runWithProxyContext(proxy, () =>
      raycastService.probeModels({
        accessToken: local.accessToken,
        deviceId: local.deviceId,
        aid: resolved.aid,
      })
    );

    const connection: any = await createProviderConnection({
      provider: "raycast",
      authType: "oauth",
      accessToken: local.accessToken,
      refreshToken: null,
      email: local.email || null,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      providerSpecificData: {
        deviceId: local.deviceId,
        aid: resolved.aid,
        authMethod: "auto_imported",
        username: local.username,
        hasProFeatures: local.hasProFeatures,
        hasBetterAI: local.hasBetterAI,
        extractSource: local.source,
        modelCount: models.length,
        premiumModelCount: models.filter((m) => m.requires_better_ai).length,
      },
      testStatus: "active",
    });

    await replaceSyncedAvailableModelsForConnection(
      "raycast",
      connection.id,
      models.map((model) => ({
        id: model.id,
        name: model.name || model.id,
      }))
    );

    return NextResponse.json({
      success: true,
      source: local.source,
      connection: {
        id: connection.id,
        provider: connection.provider,
        email: connection.email,
      },
      models: {
        total: models.length,
        premium: models.filter((m) => m.requires_better_ai).length,
        sample: models.slice(0, 12).map((m) => m.id),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Raycast auto-import error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
