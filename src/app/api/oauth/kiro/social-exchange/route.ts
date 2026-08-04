import { NextResponse } from "next/server";
import { z } from "zod";
import { KiroService } from "@/lib/oauth/services/kiro";
import {
  createProviderConnection,
  getProviderConnections,
  updateProviderConnection,
  isCloudEnabled,
} from "@/models";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { KIRO_CONFIG } from "@/lib/oauth/constants/oauth";
import { findKiroConnectionByIdentity } from "@/lib/oauth/kiroConnectionIdentity";
import { classifyKiroSocialPoll } from "@/lib/oauth/kiroSocialPoll";

const socialExchangeSchema = z.object({
  deviceCode: z.string().min(1, "Missing deviceCode or provider"),
  provider: z.enum(["google", "github"]),
  targetProvider: z.enum(["kiro", "amazon-q"]).optional(),
});

/**
 * POST /api/oauth/kiro/social-exchange
 * Poll device code for tokens (Google/GitHub social login device flow).
 * Frontend calls this repeatedly until authorization completes.
 */
export async function POST(request: Request) {
  if ((await isAuthRequired(request)) && !(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  const validation = validateBody(socialExchangeSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(
      { error: validation.error || "Missing deviceCode or provider" },
      { status: 400 }
    );
  }

  try {
    const { deviceCode, provider, targetProvider } = validation.data;

    const response = await fetch(KIRO_CONFIG.socialDevicePollUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceCode, clientId: KIRO_CONFIG.socialClientId }),
    });

    const data = await response.json();
    const poll = classifyKiroSocialPoll(response.ok, response.status, data);

    if (poll.kind === "pending") {
      return NextResponse.json({
        success: false,
        pending: true,
        error: poll.error,
      });
    }

    if (poll.kind === "error") {
      return NextResponse.json(
        {
          success: false,
          pending: false,
          error: poll.error,
        },
        { status: poll.status }
      );
    }

    const kiroService = new KiroService();
    const email = kiroService.extractEmailFromJWT(data.accessToken);

    const providerSpecificData: Record<string, any> = {
      authMethod: "imported",
      provider: provider.charAt(0).toUpperCase() + provider.slice(1),
    };

    if (data.profileArn) {
      providerSpecificData.profileArn = data.profileArn;
    }

    const resolvedProvider = targetProvider || "kiro";
    const record = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresAt: new Date(Date.now() + (data.expiresIn || 3600) * 1000).toISOString(),
      email: email || null,
      providerSpecificData,
      testStatus: "active",
      isActive: true,
    };
    const existing = await getProviderConnections({ provider: resolvedProvider });
    const match = findKiroConnectionByIdentity(existing, {
      authType: "oauth",
      profileArn: data.profileArn,
      email,
    });
    const connection: any =
      typeof match?.id === "string"
        ? await updateProviderConnection(match.id, record)
        : await createProviderConnection({
            provider: resolvedProvider,
            authType: "oauth",
            ...record,
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
  } catch (error: any) {
    console.error("Kiro social exchange error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function syncToCloudIfEnabled() {
  try {
    const cloudEnabled = await isCloudEnabled();
    if (!cloudEnabled) return;
    const machineId = await getConsistentMachineId();
    await syncToCloud(machineId);
  } catch (error) {
    console.log("Error syncing to cloud after Kiro OAuth:", error);
  }
}
