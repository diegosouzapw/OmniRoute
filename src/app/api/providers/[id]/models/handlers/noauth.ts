import { NextResponse } from "next/server";
import { NOAUTH_PROVIDERS } from "@/shared/constants/providers";
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { getModelsByProviderId } from "@/shared/constants/models";
import { getStaticModelsForProvider } from "@/lib/providers/staticModels";
import { isProviderBlockedByIdOrAlias } from "@/shared/utils/noAuthProviders";
import { getSettings, getModelIsHidden } from "@/lib/localDb";
import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  safeOutboundFetch,
} from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuard";
import { mergeLocalCatalogModels } from "../helpers";
import type { HandlerContext } from "./types";

/**
 * Handle no-auth providers that have no connection row.
 * Returns a NextResponse if handled, null otherwise.
 */
export async function handleNoAuth(
  providerId: string,
  excludeHidden: boolean
): Promise<NextResponse | null> {
  const isNoAuthProvider =
    (NOAUTH_PROVIDERS as Record<string, { noAuth?: boolean }>)[providerId]?.noAuth === true;
  if (!isNoAuthProvider) return null;

  if (isProviderBlockedByIdOrAlias(providerId, (await getSettings()).blockedProviders)) {
    return NextResponse.json({ error: "Provider is disabled" }, { status: 403 });
  }

  // #3611 — prefer the live public modelsUrl when present; fall back to local_catalog.
  const noAuthRegistryEntry = getRegistryEntry(providerId);
  const noAuthModelsUrl =
    typeof noAuthRegistryEntry?.modelsUrl === "string" &&
    noAuthRegistryEntry.modelsUrl.length > 0
      ? noAuthRegistryEntry.modelsUrl
      : null;

  if (noAuthModelsUrl) {
    try {
      const liveResponse = await safeOutboundFetch(noAuthModelsUrl, {
        ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
        guard: getProviderOutboundGuard(),
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (liveResponse.ok) {
        const data = (await liveResponse.json()) as Record<string, unknown>;
        const rawModels = (data.data || data.models || []) as Array<Record<string, unknown>>;
        const liveModels: Array<{ id: string; name: string }> = rawModels
          .map((item) => {
            const itemId = typeof item.id === "string" ? item.id.trim() : "";
            if (!itemId) return null;
            const itemName =
              typeof item.display_name === "string"
                ? item.display_name
                : typeof item.name === "string"
                  ? item.name
                  : itemId;
            return { id: itemId, name: itemName };
          })
          .filter((m): m is { id: string; name: string } => m !== null);

        if (liveModels.length > 0) {
          const visible = excludeHidden
            ? liveModels.filter((m) => !getModelIsHidden(providerId, m.id))
            : liveModels;
          return NextResponse.json({
            provider: providerId,
            connectionId: providerId,
            models: visible,
            source: "upstream",
          });
        }
      }
    } catch {
      // Live fetch failed — fall through to local_catalog below.
    }
  }

  const catalog = mergeLocalCatalogModels(
    getModelsByProviderId(providerId) || [],
    getStaticModelsForProvider(providerId) || []
  ).map((model) => ({ id: model.id, name: model.name || model.id }));
  const visible = excludeHidden
    ? catalog.filter((m) => !getModelIsHidden(providerId, m.id))
    : catalog;
  return NextResponse.json({
    provider: providerId,
    connectionId: providerId,
    models: visible,
    source: "local_catalog",
  });
}
