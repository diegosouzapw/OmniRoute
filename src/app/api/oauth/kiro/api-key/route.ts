import { NextResponse } from "next/server";
import { KiroService } from "@/lib/oauth/services/kiro";
import { createProviderConnection, isCloudEnabled } from "@/models";
import { syncToCloud } from "@/lib/cloudSync";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { kiroApiKeyImportSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";
import { buildKiroImportError } from "../import/route";
import { buildKiroApiKeyConnectionName, isKiroApiKeyImportClientError } from "./helpers";

async function requireKiroApiKeyImportAuth(request: Request) {
  if (!(await isAuthRequired(request))) return null;
  if (await isAuthenticated(request)) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/**
 * POST /api/oauth/kiro/api-key
 *
 * Imports a long-lived Kiro / AWS CodeWhisperer API key. API-key auth has no
 * refresh token; profile discovery is best-effort because AWS rejects
 * ListAvailableProfiles for some API keys while still accepting generation calls.
 */
export async function POST(request: Request) {
  const authResponse = await requireKiroApiKeyImportAuth(request);
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
    const { searchParams } = new URL(request.url);
    const targetProvider = searchParams.get("targetProvider") === "amazon-q" ? "amazon-q" : "kiro";
    const validation = validateBody(kiroApiKeyImportSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { apiKey, region } = validation.data;
    const kiroService = new KiroService();
    const credential = await kiroService.validateApiKey(apiKey, region || "us-east-1");
    const email = kiroService.extractEmailFromJWT(credential.accessToken);

    const connection: any = await createProviderConnection({
      provider: targetProvider,
      authType: "apikey",
      name: buildKiroApiKeyConnectionName(targetProvider, credential.region, apiKey),
      apiKey: credential.accessToken,
      accessToken: credential.accessToken,
      refreshToken: null,
      // Long-lived key with no scheduled refresh. Keep a future timestamp so
      // health/token paths do not treat the connection as immediately expired.
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      email: email || null,
      providerSpecificData: {
        profileArn: credential.profileArn,
        region: credential.region,
        authMethod: "api_key",
        provider: "API Key",
      },
      testStatus: "active",
    });

    await syncToCloudIfEnabled();

    return NextResponse.json({
      success: true,
      connection: {
        id: connection.id,
        provider: connection.provider,
        email: connection.email,
      },
    });
  } catch (error) {
    console.error("Kiro API key import error:", error);
    return NextResponse.json(
      { error: buildKiroImportError(error) },
      { status: isKiroApiKeyImportClientError(error) ? 400 : 500 }
    );
  }
}

async function syncToCloudIfEnabled() {
  try {
    const cloudEnabled = await isCloudEnabled();
    if (!cloudEnabled) return;

    const machineId = await getConsistentMachineId();
    await syncToCloud(machineId);
  } catch (error) {
    console.log("Error syncing to cloud after Kiro API key import:", error);
  }
}
