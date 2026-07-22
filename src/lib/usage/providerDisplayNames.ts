/**
 * Provider display-name resolution for the usage analytics `byProvider`
 * breakdown (`src/app/api/usage/analytics/route.ts`).
 *
 * Raw `usage_history.provider` values are internal provider ids (e.g. a
 * dynamic compatible-provider uuid-suffixed id). This module maps those ids
 * to the friendly `name`/`prefix` configured on the matching `provider_nodes`
 * row, falling back to the raw id when no node matches, so analytics rows
 * show a readable label instead of an internal id.
 *
 * @module lib/usage/providerDisplayNames
 */
import { getProviderNodes } from "@/models";
import { getProviderById } from "@/shared/constants/providers";

function toStringValue(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function roundCost(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000;
}

function getProviderDisplayName(
  provider: unknown,
  providerDisplayNames: Map<string, string>
): string {
  const rawProvider = toStringValue(provider, "unknown");
  // Configured node name wins; static catalog covers built-ins (e.g. codex →
  // "OpenAI Codex") the nodes table doesn't know about; raw id is the last resort.
  return (
    providerDisplayNames.get(rawProvider) || getProviderById(rawProvider)?.name || rawProvider
  );
}

async function getProviderDisplayNames(): Promise<Map<string, string>> {
  const displayNames = new Map<string, string>();
  const providerNodes = (await getProviderNodes()) as Array<{
    id?: unknown;
    name?: unknown;
    prefix?: unknown;
  }>;

  for (const node of providerNodes) {
    const id = toStringValue(node.id);
    if (!id) continue;

    const displayName = toStringValue(node.name) || toStringValue(node.prefix) || id;
    displayNames.set(id, displayName);
  }

  return displayNames;
}

export interface ByProviderRow {
  provider: string;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  avgLatencyMs: number;
  successRatePct: number | string;
  cost: number;
}

/**
 * Builds the `byProvider` analytics rows, resolving each row's raw provider
 * id to its configured display name.
 */
export async function buildByProviderRows(
  providerRows: Array<Record<string, unknown>>,
  providerCostByProvider: Map<string, number>
): Promise<ByProviderRow[]> {
  const providerDisplayNames = await getProviderDisplayNames();
  return providerRows.map((row) => ({
    provider: getProviderDisplayName(row.provider, providerDisplayNames),
    requests: Number(row.requests),
    promptTokens: Number(row.promptTokens),
    completionTokens: Number(row.completionTokens),
    totalTokens: Number(row.totalTokens),
    avgLatencyMs: Math.round(Number(row.avgLatencyMs)),
    successRatePct:
      Number(row.requests) > 0
        ? Number((Number(row.successfulRequests) / Number(row.requests)) * 100).toFixed(2)
        : 0,
    cost: roundCost(providerCostByProvider.get(toStringValue(row.provider)) || 0),
  }));
}
