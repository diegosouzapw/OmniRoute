import { NextResponse } from "next/server";
import { getProviderConnectionById, updateProviderConnection } from "@/lib/db/providers";
import { getAccessToken, updateProviderCredentials } from "@/sse/services/tokenRefresh";

type RefreshResult = {
  accessToken?: string;
  expiresIn?: number;
  error?: string;
};

/**
 * POST /api/providers/[id]/refresh
 * Manually trigger an OAuth token refresh for a provider connection.
 * Useful when the dashboard shows a stale/expired token and the user
 * doesn't want to wait for the next auto-refresh cycle.
 *
 * T12 — Manual Token Refresh UI
 */
export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const connection = await getProviderConnectionById(id);
    if (!connection) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    if (connection.authType !== "oauth") {
      return NextResponse.json(
        { error: "Only OAuth connections support manual token refresh" },
        { status: 400 }
      );
    }

    if (!connection.refreshToken && !connection.accessToken) {
      return NextResponse.json(
        { error: "No token credentials available for refresh" },
        { status: 422 }
      );
    }

    if (typeof connection.provider !== "string" || connection.provider.length === 0) {
      return NextResponse.json({ error: "Connection provider is invalid" }, { status: 422 });
    }

    const provider = connection.provider;
    const credentials = {
      connectionId: id,
      accessToken: connection.accessToken,
      refreshToken: connection.refreshToken,
      expiresAt: connection.expiresAt,
      expiresIn: connection.expiresIn,
      idToken: connection.idToken,
      providerSpecificData: connection.providerSpecificData,
    };

    // Use the existing getAccessToken helper which knows how to refresh
    // tokens for each provider type (Claude, GitHub, Gemini, etc.)
    const newCredentials = (await getAccessToken(provider, credentials)) as RefreshResult | null;

    if (newCredentials && typeof newCredentials === "object" && newCredentials.error) {
      if (
        newCredentials.error === "unrecoverable_refresh_error" ||
        newCredentials.error === "refresh_token_reused" ||
        newCredentials.error === "invalid_grant"
      ) {
        await updateProviderConnection(id, {
          testStatus: "invalid",
          lastError: "Refresh token expired. Please re-authenticate this account.",
        });
        return NextResponse.json(
          { error: "Token refresh failed — provider returned no new token", requiresReauth: true },
          { status: 401 }
        );
      }
    }

    if (!newCredentials?.accessToken) {
      return NextResponse.json(
        { error: "Token refresh failed — provider returned no new token" },
        { status: 502 }
      );
    }

    // Persist new credentials to DB
    await updateProviderCredentials(id, newCredentials);

    const expiresAt = newCredentials.expiresIn
      ? new Date(Date.now() + newCredentials.expiresIn * 1000).toISOString()
      : null;

    return NextResponse.json({
      success: true,
      connectionId: id,
      provider,
      expiresAt,
      refreshedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[T12] Token refresh failed:", error);
    return NextResponse.json(
      { error: "Token refresh failed", details: (error as Error).message },
      { status: 500 }
    );
  }
}
