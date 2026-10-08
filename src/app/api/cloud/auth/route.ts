import { NextResponse } from "next/server";
import { validateApiKey, getProviderConnections, getModelAliases } from "@/models";
import { getApiKeyMetadata } from "@/lib/db/apiKeys";
import { getRawProviderConnections } from "@/lib/db/providers";
import { hasManageScope } from "@/shared/constants/managementScopes";

// Verify API key and return provider credentials
export async function POST(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing API key" }, { status: 401 });
    }

    const apiKey = authHeader.slice(7);

    // Validate API key
    const isValid = await validateApiKey(apiKey);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    // Any valid key may learn which providers are configured, within the connections its key
    // policy allows. Fragments of the upstream secrets and the cloud project ids are for keys
    // that can manage the instance.
    const keyMetadata = await getApiKeyMetadata(apiKey);
    const canSeeConnectionDetail = !!keyMetadata && hasManageScope(keyMetadata.scopes);
    const allowedConnections = keyMetadata?.allowedConnections ?? [];

    // Get active provider connections. Only the presence of a credential is reported to a
    // key without detail access, so its rows are read without decrypting them.
    const activeConnections = canSeeConnectionDetail
      ? await getProviderConnections({ isActive: true })
      : await getRawProviderConnections({ isActive: true });
    const connections =
      !canSeeConnectionDetail && allowedConnections.length > 0
        ? activeConnections.filter((conn) => allowedConnections.includes(String(conn.id)))
        : activeConnections;

    // Helper to mask sensitive values
    // Shows at most a quarter of the value at each end, and never more than 4 characters.
    function maskSecret(value: string | null | undefined): string | null {
      if (!value) return null;
      if (value.length <= 8) return "****";
      const shown = Math.min(4, Math.floor(value.length / 4));
      return value.slice(0, shown) + "****" + value.slice(-shown);
    }

    function toOptionalString(value: unknown): string | null {
      return typeof value === "string" ? value : null;
    }

    // Map connections — NEVER expose raw credentials
    const mappedConnections = connections.map((conn) => ({
      provider: conn.provider,
      authType: conn.authType,
      hasApiKey: !!conn.apiKey,
      hasAccessToken: !!conn.accessToken,
      hasRefreshToken: !!conn.refreshToken,
      // Left out, not null, for a key without detail access, so a client can tell the
      // difference between "not configured" and "not shown to this key".
      ...(canSeeConnectionDetail
        ? {
            maskedApiKey: maskSecret(toOptionalString(conn.apiKey)),
            projectId: conn.projectId || null,
          }
        : {}),
      expiresAt: conn.expiresAt,
      priority: conn.priority,
      globalPriority: conn.globalPriority,
      defaultModel: conn.defaultModel,
      isActive: conn.isActive,
    }));

    // Get model aliases
    const modelAliases = await getModelAliases();

    return NextResponse.json({
      connections: mappedConnections,
      modelAliases,
    });
  } catch (error) {
    console.log("Cloud auth error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
