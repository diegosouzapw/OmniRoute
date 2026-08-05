/**
 * GET /api/v1/quotas — report remaining quota for every provider connection.
 *
 * Uses the same saturation signals OmniRoute already tracks from upstream
 * rate-limit/quota headers and provider usage fetchers, so operators can check
 * key budgets via API instead of only watching live usage.
 *
 * Response:
 *   {
 *     connections: [
 *       {
 *         provider, connectionId, label,
 *         saturation: 0..1,        // usage estimate (1 = exhausted)
 *         remainingPercent: 0..100, // 100 * (1 - saturation)
 *         source: "provider_fetch" | "token_headers" | "none"
 *       }
 *     ],
 *     checkedAt
 *   }
 */
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getProviderConnections } from "@/lib/db/providers";
import { getSaturation } from "@/lib/quota/saturationSignals";

const DEFAULT_DIMENSION = { unit: "percent", window: "hourly" } as const;

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: { message: "Authentication required" } }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const providerFilter = searchParams.get("provider") ?? "";

  try {
    const rawConnections = await getProviderConnections(
      providerFilter ? { provider: providerFilter } : {}
    );

    const connections = [];
    for (const conn of rawConnections) {
      const provider =
        typeof conn.provider === "string"
          ? conn.provider
          : typeof conn.providerId === "string"
            ? conn.providerId
            : "";
      const connectionId =
        typeof conn.id === "string"
          ? conn.id
          : typeof conn.connectionId === "string"
            ? conn.connectionId
            : "";
      if (!provider || !connectionId) continue;

      let saturation = 0;
      let source: string = "none";
      try {
        saturation = await getSaturation(connectionId, provider, DEFAULT_DIMENSION, {
          providerId: provider,
          connectionId,
        });
        source = saturation > 0 ? "provider_fetch" : "none";
      } catch {
        saturation = 0;
        source = "error";
      }

      const label =
        typeof conn.displayName === "string" && conn.displayName.trim()
          ? conn.displayName
          : typeof conn.name === "string" && conn.name.trim()
            ? conn.name
            : connectionId;
      connections.push({
        provider,
        connectionId,
        label,
        saturation: Math.min(1, Math.max(0, saturation)),
        remainingPercent: Math.round((1 - Math.min(1, Math.max(0, saturation))) * 1000) / 10,
        source,
      });
    }

    connections.sort((a, b) => {
      if (a.provider !== b.provider) return a.provider.localeCompare(b.provider);
      return a.label.localeCompare(b.label);
    });

    return NextResponse.json({
      connections,
      total: connections.length,
      checkedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[quotas] error listing quota:", err);
    return NextResponse.json({ error: "Failed to list quotas" }, { status: 500 });
  }
}
