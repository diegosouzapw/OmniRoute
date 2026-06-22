import { NextResponse } from "next/server";
import { ModelsRequestContext } from "../types.ts";
import { asRecord } from "../utils.ts";

export async function handleCloudflare_aiModels(ctx: ModelsRequestContext): Promise<NextResponse> {
  const { provider, connectionId, connection, apiKey, proxy, maybeReturnCachedDiscovery, maybeReturnAutoFetchDisabled, buildDiscoveryFallbackResponse, buildDiscoveryErrorFallbackResponse, buildApiDiscoveryResponse, buildResponse, buildLocalCatalogResponse } = ctx;

  const cached = maybeReturnCachedDiscovery();
  if (cached) return cached;

  const autoDisabled = maybeReturnAutoFetchDisabled();
  if (autoDisabled) return autoDisabled;

  const pData = asRecord(connection.providerSpecificData);
  const accountId =
    (typeof pData.accountId === "string" && pData.accountId) ||
    process.env.CLOUDFLARE_ACCOUNT_ID;

  if (!accountId) {
    return NextResponse.json(
      { error: "Cloudflare Workers AI requires an Account ID in provider settings." },
      { status: 400 }
    );
  }

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/models/search`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return buildDiscoveryErrorFallbackResponse(
        new Error(`Cloudflare API returned ${res.status}`),
        {
          cacheWarning: `Cloudflare Workers AI returned status ${res.status}`,
          localWarning: `Cloudflare Workers AI returned status ${res.status}`,
        }
      );
    }

    const data = await res.json();
    const models = (data?.result || []).map((m: Record<string, unknown>) => ({
      id: m.id || m.name,
      name: m.name || m.id,
      ...(m.description ? { description: m.description } : {}),
    }));

    return buildApiDiscoveryResponse(models);
  } catch (err: unknown) {
    return buildDiscoveryErrorFallbackResponse(
      err,
      {
        cacheWarning: "Failed to fetch Cloudflare Workers AI models",
        localWarning: "Failed to fetch Cloudflare Workers AI models",
      }
    );
  }
}
