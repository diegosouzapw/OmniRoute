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
  getProviderConnectionFamilyIds,
  isClaudeCodeCompatibleProvider,
  supportsApiKeyOnFreeProvider,
  supportsDualAuthProvider,
} from "@/shared/constants/providers";
import { getModelsByProviderId } from "@/shared/constants/models";
import { providerHasServiceKind } from "@/lib/providers/serviceKindIndex";
import { compareTr, matchesAnyToken, matchesSearch } from "@/shared/utils/turkishText";
import { fetchWithTimeout } from "@/shared/utils/fetchTimeout";
import {
  parseProviderDisplayModePreference,
  type ProviderDisplayMode,
} from "./providerPageStorage";
import { getFeaturedProviderRank } from "./featuredProviders";

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
  /** Optional operator-supplied remote icon URL (#2166). */
  iconUrl?: string;
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

export function syncSearchToUrl(searchQuery: string): void {
  syncProviderFiltersToUrl({ searchQuery });
}

/** All dashboard summary-chip category keys that are valid in `?cat=`. */
const PROVIDER_CATEGORY_URL_VALUES = new Set([
  "oauth",
  "ide",
  "free",
  "no-auth",
  "upstream-proxy",
  "apikey",
  "compatible",
  "webcookie",
  "search",
  "webfetch",
  "audio",
  "local",
  "cloudagent",
]);

/** Media/service-kind chip keys that are valid in `?media=`. */
const PROVIDER_SERVICE_KIND_URL_VALUES = new Set([
  "image",
  "video",
  "music",
  "tts",
  "stt",
  "embedding",
]);

export interface ProviderFilterUrlState {
  searchQuery?: string;
  modelSearchQuery?: string;
  displayMode?: ProviderDisplayMode;
  category?: string | null;
  showFreeOnly?: boolean;
  mediaKind?: string | null;
}

/**
 * Reflect the providers dashboard filters in the URL query string via
 * history.replaceState so a filtered view can be bookmarked/shared:
 *
 *   ?search=<name>  provider-name / id search (#8624)
 *   ?model=<name>   model-name search
 *   ?mode=all|configured|compact  display mode (All / Configured / Compact)
 *   ?cat=<key>      active summary category (oauth, ide, free, no-auth, …)
 *   ?media=<key>    media/service-kind filter (image, video, music, …)
 *
 * "Free Tier" is encoded as `?cat=free` (showFreeOnly). Params carrying no
 * filter are removed so the URL stays canonical and shareable.
 */
export function syncProviderFiltersToUrl(state: ProviderFilterUrlState): void {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  const params = url.searchParams;
  let changed = false;

  const setOrRemove = (key: string, value: string | null | undefined) => {
    const next = value != null && value.length > 0 ? value : null;
    const current = params.get(key);
    if (next === current) return;
    if (next === null) params.delete(key);
    else params.set(key, next);
    changed = true;
  };

  setOrRemove("search", state.searchQuery?.trim());
  setOrRemove("model", state.modelSearchQuery?.trim());
  setOrRemove("mode", state.displayMode && state.displayMode !== "all" ? state.displayMode : null);
  setOrRemove("cat", state.showFreeOnly ? "free" : state.category || null);
  setOrRemove("media", state.mediaKind || null);

  if (changed) {
    window.history.replaceState(window.history.state, "", url.toString());
  }
}

/** Parse the provider dashboard filters back out of URL query params. */
export function readProviderFiltersFromUrl(params: URLSearchParams): ProviderFilterUrlState {
  const state: ProviderFilterUrlState = {};

  const search = params.get("search");
  if (search) state.searchQuery = search;

  const model = params.get("model");
  if (model) state.modelSearchQuery = model;

  const mode = parseProviderDisplayModePreference(params.get("mode"));
  if (mode) state.displayMode = mode;

  const category = params.get("cat");
  if (category && PROVIDER_CATEGORY_URL_VALUES.has(category)) {
    if (category === "free") {
      state.showFreeOnly = true;
      state.category = null;
    } else {
      state.showFreeOnly = false;
      state.category = category;
    }
  }

  const media = params.get("media");
  if (media && PROVIDER_SERVICE_KIND_URL_VALUES.has(media)) {
    state.mediaKind = media;
  }

  return state;
}

export function shouldShowProviderSection(
  category: string,
  activeCategory: string | null,
  showFreeOnly: boolean
): boolean {
  if (showFreeOnly) return category === "free";
  if (activeCategory) return activeCategory === category;

  // Free and Web Fetch are cross-cutting views assembled from providers that
  // already belong to a primary section. Rendering them in the default view
  // duplicates cards; they remain available through their summary filters.
  return category !== "free" && category !== "webfetch";
}

type ProviderRecord<TProvider = Record<string, unknown>> = Record<string, TProvider>;

const OAUTH_CARD_API_KEY_CONNECTION_PROVIDER_IDS = new Set(["kiro", "amazon-q", "kimi-coding"]);

export function getProviderConnectionsRequestUrl(providerId: string): string {
  const hasAliases = getProviderConnectionFamilyIds(providerId).length > 1;
  return hasAliases
    ? "/api/providers"
    : `/api/providers?provider=${encodeURIComponent(providerId)}`;
}

export function connectionBelongsToProviderPage(
  connectionProvider: string | null | undefined,
  providerId: string
): boolean {
  if (!connectionProvider) return false;
  return getProviderConnectionFamilyIds(providerId).includes(connectionProvider);
}

export function resolveProviderOAuthBackendId(
  providerId: string,
  provider: { oauthProviderId?: unknown } | null | undefined
): string {
  return typeof provider?.oauthProviderId === "string" && provider.oauthProviderId.length > 0
    ? provider.oauthProviderId
    : providerId;
}

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
  if (!conn || !connectionBelongsToProviderPage(conn.provider, providerId)) return false;
  if (cardAuthType === "free") return true;
  if (
    supportsApiKeyOnFreeProvider(providerId) ||
    supportsDualAuthProvider(providerId) ||
    OAUTH_CARD_API_KEY_CONNECTION_PROVIDER_IDS.has(providerId)
  ) {
    return conn.authType === "oauth" || conn.authType === "apikey" || conn.authType === "api_key";
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

/**
 * Sort provider entries alphabetically (via `sortProviderEntriesByName`), then
 * stable-pin sponsors first in explicit rank order (see `featuredProviders.ts`):
 * rank 1 block, then rank 2, then everything unranked — each block keeping the
 * alphabetical order established above. Presentation-only: this must never
 * influence routing/fallback order, only how the dashboard's provider category
 * grids are sorted.
 */
export function sortProviderEntriesFeaturedFirst<TProvider>(
  entries: ProviderEntry<TProvider>[]
): ProviderEntry<TProvider>[] {
  const sorted = sortProviderEntriesByName(entries);
  // A plain "featured first" pin would order Cheaper Inference above Kimi (the
  // alphabet), which is exactly what the explicit ranks prevent.
  const ranked: ProviderEntry<TProvider>[] = [];
  const rest: ProviderEntry<TProvider>[] = [];
  for (const entry of sorted) {
    (getFeaturedProviderRank(entry.providerId) === null ? rest : ranked).push(entry);
  }
  // Array.prototype.sort is stable in ES2019+, so equal-rank entries keep the
  // alphabetical order established above.
  ranked.sort(
    (a, b) =>
      (getFeaturedProviderRank(a.providerId) as number) -
      (getFeaturedProviderRank(b.providerId) as number)
  );
  return [...ranked, ...rest];
}

export function buildProviderEntries<TProvider = Record<string, unknown>>(
  providers: ProviderRecord<TProvider>,
  displayAuthType: ProviderEntry["displayAuthType"],
  toggleAuthType: ProviderEntry["toggleAuthType"],
  getProviderStats: GetProviderStats
): ProviderEntry<TProvider>[] {
  return Object.entries(providers)
    .filter(([, provider]) => !(provider as Record<string, unknown>).hiddenFromDashboard)
    .map(([providerId, provider]) => ({
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
  providerNodes: Array<{
    id: string;
    name?: string;
    type?: string;
    apiType?: string;
    iconUrl?: string | null;
  }>,
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
        iconUrl: node.iconUrl || undefined,
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
        iconUrl: node.iconUrl || undefined,
      });
      continue;
    }

    anthropic.push({
      id: node.id,
      name: node.name || labels.anthropicCompatibleName,
      color: "#D97757",
      textIcon: "AC",
      iconUrl: node.iconUrl || undefined,
    });
  }

  return { openai, anthropic, claudeCode };
}

export type LiveModelsByProviderId = Record<string, Array<{ id: string; name?: string }>>;

/**
 * Models to match against for the model-name filter: the static curated
 * registry PLUS any live/synced catalog for that provider connection (#7250).
 * Aggregator providers (openrouter, kilocode, ...) declare a
 * single-entry static placeholder — matching only that entry means a search
 * for any real upstream model name can never match, silently hiding the
 * provider. When the live catalog is empty/unavailable we fall back to the
 * static-only list so already-correct static providers are unaffected.
 */
function getFilterableModelsForEntry(
  providerId: string,
  liveModelsByProviderId?: LiveModelsByProviderId
): Array<{ id: string; name?: string }> {
  const staticModels = getModelsByProviderId(providerId);
  const liveModels = liveModelsByProviderId?.[providerId];
  if (!liveModels || liveModels.length === 0) return staticModels;
  return [...staticModels, ...liveModels];
}

/**
 * Dashboard-card search identity for an imported connection (#12108).
 * Only `name` and `providerSpecificData.baseUrl` — those are the two
 * fields the issue asked for. id/tag/email stay on the detail-page
 * haystack (`matchesAccountQuery`); surfacing a provider card from an
 * account email would mix account-picker UX into the catalog filter.
 */
export type ProviderSearchConnection = {
  provider?: string | null;
  name?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
};

function connectionSearchHaystacks(conn: ProviderSearchConnection): string[] {
  const baseUrl = conn.providerSpecificData?.baseUrl;
  return [
    typeof conn.name === "string" ? conn.name : "",
    typeof baseUrl === "string" ? baseUrl : "",
  ];
}

export function filterConfiguredProviderEntries<TProvider>(
  entries: ProviderEntry<TProvider>[],
  showConfiguredOnly: boolean,
  searchQuery?: string,
  showFreeOnly?: boolean,
  modelSearchQuery?: string,
  serviceKindFilter?: string | null,
  liveModelsByProviderId?: LiveModelsByProviderId,
  connections?: ProviderSearchConnection[]
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
      if (
        matchesAnyToken(String(provider.name || ""), searchQuery) ||
        matchesAnyToken(entry.providerId, searchQuery)
      ) {
        return true;
      }
      // #12108: imported connections live under the canonical provider card.
      // Match their operator-visible name / baseUrl so "Grade-S-Node" or an
      // IP in the search box surfaces the OpenAI card instead of vanishing.
      // Same matcher as provider.name / providerId above (matchesAnyToken:
      // full-string first, then whitespace-token OR). The detail page uses
      // a single-substring haystack — that is a different surface, not a
      // bug in this filter.
      if (!connections || connections.length === 0) return false;
      return connections.some(
        (conn) =>
          connectionBelongsToProviderPage(conn.provider, entry.providerId) &&
          connectionSearchHaystacks(conn).some((haystack) =>
            matchesAnyToken(haystack, searchQuery)
          )
      );
    });
  }

  if (modelSearchQuery && modelSearchQuery.trim()) {
    const q = modelSearchQuery.trim();
    filtered = filtered.filter((entry) => {
      const models = getFilterableModelsForEntry(entry.providerId, liveModelsByProviderId);
      return models.some((m) => matchesSearch(m.id, q) || matchesSearch(m.name || "", q));
    });
  }

  return sortProviderEntriesFeaturedFirst(filtered);
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

/**
 * Result of `resolveProviderHeaderLink` — decides whether the provider name
 * link on the detail page header (`ProviderPageHeader`) points at the
 * static catalog `website` or at a Radar referral link.
 */
export interface ProviderHeaderLink {
  /** Effective URL for the header link, or `undefined` for no link at all. */
  website: string | undefined;
  /** True when `website` came from a Radar default referral, not the static catalog. */
  isReferralLink: boolean;
}

/**
 * Pure decision function for the provider-name link (D28 — referral links).
 * Deliberately DB-free and Radar-module-free: it takes the already-resolved
 * referral URL (or `undefined`/`null` when none applies) as a plain string
 * so this file — and the providers dashboard that depends on it — never has
 * to import `@/lib/radar` (which pulls in `better-sqlite3`, Node-only) to
 * render. The caller (`ProviderDetailPageClient`) is the one place allowed
 * to fetch the referral, via the local `/api/radar/referrals` route — same
 * pattern the Radar dashboard page already uses for its own data.
 *
 * With `RADAR_ENABLED` off, or no cache, or no default referral for the
 * provider, `referralUrl` is `null`/`undefined` and this returns the exact
 * same `website` the catalog already provided — byte-identical to today's
 * behavior.
 */
export function resolveProviderHeaderLink(
  staticWebsite: string | null | undefined,
  referralUrl: string | null | undefined
): ProviderHeaderLink {
  if (referralUrl) {
    return { website: referralUrl, isReferralLink: true };
  }
  return { website: staticWebsite ?? undefined, isReferralLink: false };
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

/** Parsed payload the providers dashboard renders its first paint from. */
export interface ProviderPageData {
  connections: any[];
  providerNodes: any[];
  ccCompatibleProviderEnabled: boolean;
  expirations: any | null;
  blockedProviders: string[] | null;
  settings: any | null;
  /** OpenRouter-sourced popularity/identity enrichment, keyed by provider slug. Empty if the sync hasn't run yet or the fetch failed. */
  openRouterProviderStats: OpenRouterProviderStatsEntry[];
}

/** Mirrors ProviderPopularityEntry from src/lib/catalog/openrouterProviderStats.ts (kept local to avoid a server-only import from a client component). */
export interface OpenRouterProviderStatsEntry {
  slug: string;
  displayName: string;
  headquarters?: string;
  statusPageUrl?: string | null;
  byokEnabled?: boolean;
  dataPolicy?: {
    training?: boolean;
    retainsPrompts?: boolean;
    termsOfServiceURL?: string;
    privacyPolicyURL?: string;
  };
  iconUrl?: string;
  modelCount: number;
  totalTokens: number;
  totalRequests: number;
  popularityRank: number;
}

// Bound each first-paint request so a single stalled connection cannot freeze
// the page on its skeleton. 20s is generous for a loopback dashboard API while
// still guaranteeing the skeleton clears in bounded time.
const PROVIDER_PAGE_FETCH_TIMEOUT_MS = 20_000;

/**
 * Load the four data sources the providers dashboard renders from, each bounded
 * by an AbortSignal timeout and independently degrading to a default.
 *
 * Why this exists (infinite-skeleton bug): the page used to gate its `loading`
 * flag on `await Promise.all([fetch(...) x4])` with **no** timeout. A bare
 * `fetch()` that never *settles* — e.g. the browser's 6-connection HTTP/1.1 pool
 * starved by the dashboard's RSC `<Link>` prefetch storm, or any stalled
 * connection — leaves `Promise.all` pending forever, so `setLoading(false)`
 * (which lives in the effect's `finally`) never runs and the Suspense skeleton
 * shows indefinitely. A `try/catch` cannot rescue a promise that never settles;
 * only a timeout/abort can. Here every request is time-bounded and failures
 * degrade to a default, so the loader always resolves within the timeout and the
 * page paints from whatever data arrived (matching the fast `/api/providers`).
 */
export async function loadProviderPageData(
  fetchImpl: typeof fetch = globalThis.fetch as typeof fetch,
  timeoutMs: number = PROVIDER_PAGE_FETCH_TIMEOUT_MS
): Promise<ProviderPageData> {
  const safeJson = async (url: string, init?: RequestInit): Promise<any | null> => {
    try {
      const res = await fetchWithTimeout(url, { ...init, timeoutMs, fetchFn: fetchImpl });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      // Timeout/abort/network error → degrade to the default; never hang.
      return null;
    }
  };

  const [connectionsData, nodesData, expirationsData, settingsData, openRouterStatsData] =
    await Promise.all([
      safeJson("/api/providers"),
      safeJson("/api/provider-nodes"),
      safeJson("/api/providers/expiration"),
      safeJson("/api/settings", { cache: "no-store" }),
      safeJson("/api/providers/openrouter-stats"),
    ]);

  return {
    connections: Array.isArray(connectionsData?.connections) ? connectionsData.connections : [],
    providerNodes: Array.isArray(nodesData?.nodes) ? nodesData.nodes : [],
    ccCompatibleProviderEnabled: nodesData?.ccCompatibleProviderEnabled === true,
    expirations: expirationsData ?? null,
    blockedProviders: Array.isArray(settingsData?.blockedProviders)
      ? settingsData.blockedProviders
      : null,
    settings: settingsData ?? null,
    openRouterProviderStats: Array.isArray(openRouterStatsData?.data)
      ? openRouterStatsData.data
      : [],
  };
}
