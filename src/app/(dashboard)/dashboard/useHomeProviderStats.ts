/**
 * Provider-stat and topology-node derivation for the home dashboard.
 *
 * Extracted verbatim from HomePageClient (which is size-frozen — see
 * config/quality/file-size-baseline.json) so the derivation logic and its regression
 * comments live in one reviewable module instead of inside a god-component. Behavior,
 * memo dependencies and data flow are unchanged: the same three values are computed
 * from the same four inputs, in the same order; the provider summaries stay internal —
 * HomePageClient never consumed them, before or after the extraction.
 *
 * `normalizeProviderId` also lives here because both this derivation and
 * HomePageClient's /api/provider-metrics effect canonicalize provider ids with it —
 * one alias map, one normalizer, no second inline copy.
 */
import { useMemo } from "react";
import { AI_PROVIDERS, NOAUTH_PROVIDERS, OAUTH_PROVIDERS } from "@/shared/constants/providers";
import {
  isProviderConnectionConnected,
  isProviderConnectionErrored,
  type ProviderConnectionStatusLike,
} from "@/shared/utils/providerConnectionStatus";
import { toNumber } from "@/shared/utils/numeric";
import { getProviderDisplayLabel } from "@/shared/utils/providerDisplayLabel";
import { resolveCompatibleProviderCatalogEntry } from "@/lib/providers/catalog";

/**
 * Provider summary as the home dashboard renders it. Moved verbatim out of HomePageClient
 * (size-frozen — see config/quality/file-size-baseline.json) so the derivation here and the
 * components that consume it share ONE contract.
 */
export type ProviderSummaryItem = {
  id: string;
  provider: {
    id: string;
    name: string;
    color?: string;
    textIcon?: string;
    alias?: string;
  };
  total: number;
  connected: number;
  errors: number;
  modelCount: number;
  authType: "free" | "oauth" | "apikey" | string;
};

/**
 * Model summary as `ProviderModelsModal` renders it. Moved verbatim out of HomePageClient
 * for the same reason as ProviderSummaryItem.
 */
export type ProviderModelSummary = {
  fullModel: string;
  alias?: string;
  model?: string;
};

/**
 * `provider_nodes` row as HomePageClient holds it in state. `type` and `iconUrl` are what
 * `resolveCompatibleProviderCatalogEntry` needs to pick the right logo/badge/colour, and
 * `createdAt` is what lets the topology order nodes by age.
 */
export type HomeProviderNode = {
  id: string;
  prefix?: string;
  name?: string;
  type?: string | null;
  apiType?: string | null;
  baseUrl?: string | null;
  iconUrl?: string | null;
  createdAt?: string | null;
};

type ProviderHealth = "active" | "error" | "idle";

/** One topology node: a provider with at least one enabled connection. */
export type HomeTopologyProvider = {
  id: string;
  provider: string;
  name?: string;
  iconUrl?: string;
  textIcon?: string;
  apiType?: string | null;
  createdAt?: string | null;
  /** Best global priority across this provider's enabled connections; see providerStats. */
  priority?: number;
  status: ProviderHealth;
};

/**
 * One `/api/providers` connection row as the home dashboard consumes it. The shared status
 * fields (isActive/testStatus/rateLimitedUntil) are inherited from
 * `ProviderConnectionStatusLike` and read only through
 * `isProviderConnectionConnected`/`isProviderConnectionErrored`.
 *
 * The rest are read directly. This derivation reads `provider` (selects a provider's
 * connections) and `globalPriority` (the sparse cross-provider ranking — see providerStats
 * below). HomePageClient's API-key health effect reads `id`, `name` and the two
 * `providerSpecificData` members, so they belong to the same one connection contract rather
 * than a second near-duplicate type.
 */
export type HomeProviderConnection = ProviderConnectionStatusLike & {
  id: string;
  name?: string;
  provider: string;
  globalPriority?: string | number | null;
  providerSpecificData?: {
    /** Per-key health, keyed by `primary` / `extra_<index>`. */
    apiKeyHealth?: Record<
      string,
      {
        status: "active" | "warning" | "invalid";
        failures: number;
        lastFailure: string | null;
      }
    >;
    extraApiKeys?: string[];
  } | null;
};

/**
 * One `/api/models` entry as this derivation consumes it: the `ProviderModelSummary` shape
 * `ProviderModelsModal` renders, plus `provider` — the only field matched against the model
 * keys, always present in the API response.
 */
export type HomeModelSummary = ProviderModelSummary & {
  provider: string;
};

/**
 * The internal per-provider stat feeding the topology derivation. Unlike ProviderSummaryItem,
 * the `provider` metadata carries only what the derivation threads through to a topology node
 * (no required id/name), plus the derived `priority` tier.
 */
type HomeProviderStat = {
  id: string;
  provider: {
    name?: string;
    alias?: string;
    color?: string;
    textIcon?: string;
    iconUrl?: string;
    apiType?: string;
    createdAt?: string;
  };
  total: number;
  connected: number;
  errors: number;
  modelCount: number;
  authType: string;
  /** Best global priority across this provider's enabled connections; see providerStats. */
  priority?: number;
};

const PROVIDER_ALIAS_TO_ID = new Map(
  Object.entries(AI_PROVIDERS)
    .flatMap(([providerId, providerInfo]) =>
      providerInfo.alias ? [[providerInfo.alias.toLowerCase(), providerId]] : []
    )
    .filter((entry): entry is [string, string] => entry.length === 2)
);

export function normalizeProviderId(providerId?: string | null): string {
  const normalized = typeof providerId === "string" ? providerId.trim().toLowerCase() : "";
  if (!normalized) return "";
  return AI_PROVIDERS[normalized] ? normalized : PROVIDER_ALIAS_TO_ID.get(normalized) || normalized;
}

/**
 * Derives the provider summaries, the selected provider's model list, and the topology
 * nodes drawn on the home page.
 *
 * @param providerConnections `/api/providers` connections
 * @param models `/api/models` entries
 * @param providerNodes `/api/provider-nodes` rows (custom compatible providers)
 * @param selectedProvider the provider whose models modal is open, if any
 * @param tp `useTranslations("providers")` — compatible-provider display captions
 */
export function useHomeProviderStats({
  providerConnections,
  models,
  providerNodes,
  selectedProvider,
  tp,
}: {
  providerConnections: HomeProviderConnection[];
  models: HomeModelSummary[];
  providerNodes: HomeProviderNode[];
  selectedProvider: ProviderSummaryItem | null;
  tp: (key: string) => string;
}) {
  const providerStats = useMemo<HomeProviderStat[]>(() => {
    const statFor = (
      providerId: string,
      providerInfo: HomeProviderStat["provider"],
      extraModelKeys: readonly string[] = []
    ): HomeProviderStat => {
      const connections = providerConnections.filter((conn) => conn.provider === providerId);
      const connected = connections.filter((connection) =>
        isProviderConnectionConnected(connection)
      ).length;
      const errors = connections.filter((connection) =>
        isProviderConnectionErrored(connection)
      ).length;

      const providerKeys = new Set(
        [providerId, providerInfo.alias, ...extraModelKeys].filter(Boolean) as string[]
      );
      const providerModels = models.filter((m) => providerKeys.has(m.provider));

      const authType = NOAUTH_PROVIDERS[providerId]
        ? "no-auth"
        : OAUTH_PROVIDERS[providerId]
          ? "oauth"
          : "apikey";

      // Best (lowest) global priority among this provider's ENABLED connections, or
      // undefined when none of them carries one.
      //
      // `global_priority` is the only priority that means anything ACROSS providers:
      // `priority` is assigned per provider as MAX(priority)+1 within that provider, so
      // codex#1, gemini#1 and kiro#1 all exist and comparing them is meaningless. It is also
      // sparse in practice — most connections have no global priority at all, and
      // `cleanNulls` (src/lib/db/caseMapping.ts) strips the key entirely rather than
      // returning null, so this is `number | undefined`, never `number | null`.
      //
      // A provider owns one topology node but may own many connections, so the tiers have to
      // collapse to one value: lowest wins, i.e. a provider is ranked by its best-placed
      // connection. Disabled connections are skipped because a disabled connection cannot
      // route, so its priority should not pull the provider forward.
      let priority: number | undefined;
      for (const connection of connections) {
        if (connection.isActive === false) continue;
        const candidate = toNumber(connection.globalPriority);
        if (!Number.isFinite(candidate) || candidate <= 0) continue;
        if (priority === undefined || candidate < priority) priority = candidate;
      }

      return {
        id: providerId,
        provider: providerInfo,
        total: connections.length,
        connected,
        errors,
        modelCount: providerModels.length,
        authType,
        priority,
      };
    };

    const builtIn = Object.entries(AI_PROVIDERS).map(([providerId, providerInfo]) =>
      statFor(providerId, providerInfo)
    );

    // Custom compatible providers are `provider_nodes` ROWS, not entries in the static
    // `AI_PROVIDERS` registry — their id is generated (`openai-compatible-chat-<uuid>`,
    // `anthropic-compatible-<uuid>`, …). Iterating AI_PROVIDERS alone therefore matched
    // none of their connections (measured: one active compatible connection, 0 of 298
    // static providers matched it), so an operator's own gateway never appeared as a
    // topology node at rest no matter how healthy it was.
    //
    // Their models are published under the node PREFIX, so that name is accepted as a
    // model key alongside the raw node id — the same accept-wide contract the catalog
    // surfaces use.
    //
    // Display metadata comes from `resolveCompatibleProviderCatalogEntry`, the SAME
    // resolver the provider pages use — not a second inline copy. Hand-rolling it here
    // (which is what this did) produced a node whose name/colour/badge/icon disagreed with
    // the very same node's card on the providers page: no icon_url was threaded, so the
    // topology fell through to the generic glyph while the card showed the real logo.
    // Anything display-related for a compatible node must come from this one function.
    const compatible = providerNodes
      .filter((node) => (node.id || "").trim() && !AI_PROVIDERS[(node.id || "").trim()])
      .map((node) => {
        const entry = resolveCompatibleProviderCatalogEntry(node, {
          ccCompatibleName: tp("ccCompatibleLabel"),
          anthropicCompatibleName: tp("anthropicCompatibleName"),
          openAiCompatibleName: tp("openaiCompatibleName"),
        });
        const prefix = (node.prefix || "").trim();
        return statFor(
          entry.id,
          {
            // `name` is the human caption; `alias` carries the PREFIX, which is what the
            // models are published under and what may appear in a model path. The two are
            // deliberately separate fields — a caption may contain spaces, a prefix may not.
            name: entry.name,
            alias: prefix || undefined,
            color: entry.color,
            textIcon: entry.textIcon,
            iconUrl: entry.iconUrl,
            // `apiType` picks the right OpenAI-compatible logo when the node has no
            // icon_url; `createdAt` is what puts a newly added node last in the ring.
            apiType: entry.apiType,
            createdAt: node.createdAt || undefined,
          },
          prefix ? [prefix] : []
        );
      });

    return [...builtIn, ...compatible];
  }, [providerConnections, models, providerNodes, tp]);

  const selectedProviderModels = useMemo(() => {
    if (!selectedProvider) return [];
    const providerKeys = new Set(
      [selectedProvider.id, selectedProvider.provider?.alias].filter(Boolean)
    );
    return models.filter((m) => providerKeys.has(m.provider));
  }, [selectedProvider, models]);

  const topologyProviders = useMemo(() => {
    const byProvider = new Map<string, HomeTopologyProvider>();
    const providerConfig = AI_PROVIDERS as Record<string, { name?: string }>;

    // A topology node is drawn ONLY for a provider that has at least one *enabled*
    // connection (`isActive !== false`), deduplicated to one node per provider — this
    // mirrors 9Router (`UsageStats.js` provider filter) and is the source of truth for
    // "what is connected". We deliberately do NOT seed nodes from `providerMetrics`:
    // that aggregates all-time `call_logs` with no time window and no connection check,
    // so a provider that was ever called once — or merely connection-tested — used to
    // linger as a ghost node forever after its connection was disabled or removed.
    // Connection health only affects the node's rest colour (green connected / red
    // errored); live + recent traffic still overrides it downstream via active/last/error.
    for (const stat of providerStats) {
      // `connected` counts enabled connections whose test status is healthy/unknown;
      // `errors` counts enabled connections that failed their test. Their sum is the
      // number of enabled connections — disabled ones (isActive === false) are in
      // neither, so a provider with only disabled connections is skipped here.
      const enabled = stat.connected + stat.errors;
      if (enabled <= 0) continue;

      const canonical = normalizeProviderId(stat.id);
      if (!canonical || byProvider.has(canonical)) continue;

      const resolvedName =
        getProviderDisplayLabel(stat.id, providerNodes) ||
        stat.provider?.name ||
        providerConfig[canonical]?.name ||
        stat.id;

      byProvider.set(canonical, {
        id: canonical,
        provider: canonical,
        name: resolvedName,
        // Threaded from `resolveCompatibleProviderCatalogEntry` (see providerStats) so the
        // topology renders the SAME logo/badge the providers page renders for this node.
        iconUrl: stat.provider?.iconUrl,
        textIcon: stat.provider?.textIcon,
        apiType: stat.provider?.apiType,
        createdAt: stat.provider?.createdAt,
        priority: stat.priority,
        status: stat.connected > 0 ? "active" : "error",
      });
    }

    return Array.from(byProvider.values());
  }, [providerStats, providerNodes]);

  // `providerStats` is deliberately NOT returned: it was a local intermediate inside
  // HomePageClient before this extraction and no caller ever read it. Exposing it would
  // widen the module's surface past what the extraction actually moved.
  return { selectedProviderModels, topologyProviders };
}
