import {
  getStaticProviderCatalogGroup,
  resolveProviderCatalogEntry,
  type CompatibleProviderLabels,
  type CompatibleProviderNodeLike,
  type ProviderCatalogMetadata,
  type ResolvedProviderCatalogEntry,
  type StaticProviderCatalogCategory,
} from "@/lib/providers/catalog";
import {
  isClaudeCodeCompatibleProvider,
  supportsApiKeyOnFreeProvider,
} from "@/shared/constants/providers";
import { getModelsByProviderId } from "@/shared/constants/models";
import { providerHasServiceKind } from "@/lib/providers/serviceKindIndex";
import { compareTr, matchesSearch } from "@/shared/utils/turkishText";
import type { ProviderDisplayMode } from "./providerPageStorage";

export interface ProviderStatsSnapshot {
  total?: number;
  [key: string]: unknown;
}

export interface ProviderEntry<TProvider = Record<string, unknown>> {
  providerId: string;
  provider: TProvider;
  stats: ProviderStatsSnapshot;
  displayAuthType: "oauth" | "apikey" | "compatible" | "no-auth";
  toggleAuthType: "oauth" | "free" | "apikey" | "no-auth";
}

export type CompatibleProviderInfo = {
  id: string;
  name: string;
  color: string;
  textIcon: string;
  apiType?: string;
};

export type CompatibleProviderGroups = {
  openai: CompatibleProviderInfo[];
  anthropic: CompatibleProviderInfo[];
  claudeCode: CompatibleProviderInfo[];
};

export function shouldApplyConfiguredOnlyFilter(
  showConfiguredOnly: boolean,
  connectionCount: number
): boolean {
  return showConfiguredOnly && connectionCount > 0;
}

export function shouldFilterProviderEntriesForDisplayMode(
  displayMode: ProviderDisplayMode,
  connectionCount: number
): boolean {
  if (displayMode === "compact") return true;

  return shouldApplyConfiguredOnlyFilter(displayMode === "configured", connectionCount);
}

export function shouldShowFirstProviderHint(
  connectionCount: number,
  searchQuery?: string
): boolean {
  return connectionCount === 0 && !searchQuery?.trim();
}

type ProviderRecord<TProvider = Record<string, unknown>> = Record<string, TProvider>;

/**
 * Whether a provider connection should be counted on a provider card rendered in
 * the given section. Dual-auth providers (qoder, opencode, codebuddy-cn, …) are
 * OAuth-categorized but also accept a PAT/API key stored as authType "apikey";
 * their single OAuth card must count BOTH, else a working PAT connection shows as
 * "not connected" on the dashboard.
 */
export function connectionMatchesProviderCard(
  conn: { provider?: string; authType?: string } | null | undefined,
  providerId: string,
  cardAuthType: "oauth" | "free" | "apikey"
): boolean {
  if (!conn || conn.provider !== providerId) return false;
  if (cardAuthType === "free") return true;
  if (supportsApiKeyOnFreeProvider(providerId)) {
    return conn.authType === "oauth" || conn.authType === "apikey";
  }
  return conn.authType === cardAuthType;
}

type GetProviderStats = (
  providerId: string,
  authType: "oauth" | "free" | "apikey"
) => ProviderStatsSnapshot;

function getProviderSortLabel<TProvider>(entry: ProviderEntry<TProvider>): string {
  const provider = entry.provider as Record<string, unknown>;
  const name = typeof provider.name === "string" ? provider.name : "";
  return (name || entry.providerId).toLowerCase();
}

export function sortProviderEntriesByName<TProvider>(
  entries: ProviderEntry<TProvider>[]
): ProviderEntry<TProvider>[] {
  return [...entries].sort((a, b) => {
    const nameCompare = compareTr(getProviderSortLabel(a), getProviderSortLabel(b));
    if (nameCompare !== 0) return nameCompare;
    return a.providerId.localeCompare(b.providerId); // teknik sıralama: ASCII kasıtlı
  });
}

export function buildProviderEntries<TProvider = Record<string, unknown>>(
  providers: ProviderRecord<TProvider>,
  displayAuthType: ProviderEntry["displayAuthType"],
  toggleAuthType: ProviderEntry["toggleAuthType"],
  getProviderStats: GetProviderStats
): ProviderEntry<TProvider>[] {
  return Object.entries(providers).map(([providerId, provider]) => ({
    providerId,
    provider,
    stats: getProviderStats(providerId, toggleAuthType),
    displayAuthType,
    toggleAuthType,
  }));
}

export function buildMergedOAuthProviderEntries<TProvider = Record<string, unknown>>(
  oauthProviders: ProviderRecord<TProvider>,
  freeProviders: ProviderRecord<TProvider>,
  getProviderStats: GetProviderStats
): ProviderEntry<TProvider>[] {
  return [
    ...buildProviderEntries(oauthProviders, "oauth", "oauth", getProviderStats),
    ...buildProviderEntries(freeProviders, "oauth", "free", getProviderStats),
  ];
}

export function buildStaticProviderEntries(
  category: StaticProviderCatalogCategory,
  getProviderStats: GetProviderStats
): ProviderEntry<ProviderCatalogMetadata>[] {
  const group = getStaticProviderCatalogGroup(category);
  return buildProviderEntries(
    group.providers,
    group.displayAuthType,
    group.toggleAuthType,
    getProviderStats
  );
}

export function buildCompatibleProviderGroups(
  providerNodes: Array<{ id: string; name?: string; type?: string; apiType?: string }>,
  labels: {
    openaiCompatibleName: string;
    anthropicCompatibleName: string;
    claudeCodeCompatibleName: string;
  }
): CompatibleProviderGroups {
  const openai: CompatibleProviderInfo[] = [];
  const anthropic: CompatibleProviderInfo[] = [];
  const claudeCode: CompatibleProviderInfo[] = [];

  for (const node of providerNodes) {
    if (node.type === "openai-compatible") {
      openai.push({
        id: node.id,
        name: node.name || labels.openaiCompatibleName,
        color: "#10A37F",
        textIcon: "OC",
        apiType: node.apiType,
      });
      continue;
    }

    if (node.type !== "anthropic-compatible") continue;

    if (isClaudeCodeCompatibleProvider(node.id)) {
      claudeCode.push({
        id: node.id,
        name: node.name || labels.claudeCodeCompatibleName,
        color: "#B45309",
        textIcon: "CC",
      });
      continue;
    }

    anthropic.push({
      id: node.id,
      name: node.name || labels.anthropicCompatibleName,
      color: "#D97757",
      textIcon: "AC",
    });
  }

  return { openai, anthropic, claudeCode };
}

export function filterConfiguredProviderEntries<TProvider>(
  entries: ProviderEntry<TProvider>[],
  showConfiguredOnly: boolean,
  searchQuery?: string,
  showFreeOnly?: boolean,
  modelSearchQuery?: string,
  serviceKindFilter?: string | null
): ProviderEntry<TProvider>[] {
  let filtered = entries;

  // #4240: category (serviceKind) filter — keep providers whose declared OR
  // registry-derived serviceKinds include the selected kind. Composes with the
  // configured-only / free / search predicates below.
  if (serviceKindFilter) {
    filtered = filtered.filter((entry) => {
      const declared = (entry.provider as { serviceKinds?: string[] }).serviceKinds;
      return providerHasServiceKind(entry.providerId, declared, serviceKindFilter);
    });
  }

  if (showConfiguredOnly) {
    // no-auth providers never create a DB connection row (stats.total === 0) but
    // are always usable and appear unconditionally in the /v1/models catalog, so
    // they must not be hidden by the configured-only filter (#3290).
    filtered = filtered.filter(
      (entry) => entry.displayAuthType === "no-auth" || Number(entry.stats?.total || 0) > 0
    );
  }

  if (showFreeOnly) {
    filtered = filtered.filter((entry) => {
      const provider = entry.provider as Record<string, unknown>;
      return provider.hasFree === true;
    });
  }

  if (searchQuery && searchQuery.trim()) {
    filtered = filtered.filter((entry) => {
      const provider = entry.provider as Record<string, unknown>;
      return (
        matchesSearch(String(provider.name || ""), searchQuery) ||
        matchesSearch(entry.providerId, searchQuery)
      );
    });
  }

  if (modelSearchQuery && modelSearchQuery.trim()) {
    const q = modelSearchQuery.trim();
    filtered = filtered.filter((entry) => {
      const models = getModelsByProviderId(entry.providerId);
      return models.some((m) => matchesSearch(m.id, q) || matchesSearch(m.name, q));
    });
  }

  return sortProviderEntriesByName(filtered);
}

function pushUniqueProviderEntry<TProvider>(
  entries: ProviderEntry<TProvider>[],
  seenProviderIds: Set<string>,
  entry: ProviderEntry<TProvider>
) {
  if (seenProviderIds.has(entry.providerId)) return;

  seenProviderIds.add(entry.providerId);
  entries.push(entry);
}

export function buildCompactProviderEntries<TProvider>(
  groups: ProviderEntry<TProvider>[][],
  options: { deferNoAuth?: boolean } = {}
): ProviderEntry<TProvider>[] {
  const seenProviderIds = new Set<string>();
  const visibleEntries: ProviderEntry<TProvider>[] = [];
  const deferredNoAuthEntries: ProviderEntry<TProvider>[] = [];
  const seenDeferredNoAuthProviderIds = new Set<string>();

  for (const group of groups) {
    for (const entry of group) {
      if (options.deferNoAuth && entry.displayAuthType === "no-auth") {
        pushUniqueProviderEntry(deferredNoAuthEntries, seenDeferredNoAuthProviderIds, entry);
        continue;
      }

      pushUniqueProviderEntry(visibleEntries, seenProviderIds, entry);
    }
  }

  for (const entry of deferredNoAuthEntries) {
    pushUniqueProviderEntry(visibleEntries, seenProviderIds, entry);
  }

  return visibleEntries;
}

export function resolveDashboardProviderInfo(
  providerId: string,
  options?: {
    providerNode?: CompatibleProviderNodeLike | null;
    compatibleLabels?: CompatibleProviderLabels | null;
  }
): ResolvedProviderCatalogEntry | null {
  return resolveProviderCatalogEntry(providerId, options);
}

/**
 * Append or replace a provider node by `id`, never appending a duplicate (#4746).
 *
 * The compatible-provider "add" modals previously did `setProviderNodes((prev) => [...prev, node])`,
 * so adding the same provider twice (refresh-then-add, double-click, retry, or React StrictMode
 * double-invocation in dev) left the same `id` in the array twice — surfacing duplicate cards and
 * invalidating the `compatibleProviderGroups` memo on every no-op add. This upsert dedups by id:
 *  - new id  → append a new array,
 *  - same id, deep-equal payload → return `prev` unchanged (stable identity ⇒ memo does not re-run),
 *  - same id, changed payload → replace in place.
 */
export function upsertProviderNodeById<T extends { id?: string | null }>(prev: T[], node: T): T[] {
  if (!node || node.id == null) return [...prev, node];
  const idx = prev.findIndex((p) => p?.id === node.id);
  if (idx === -1) return [...prev, node];
  if (JSON.stringify(prev[idx]) === JSON.stringify(node)) return prev;
  const next = prev.slice();
  next[idx] = node;
  return next;
}
