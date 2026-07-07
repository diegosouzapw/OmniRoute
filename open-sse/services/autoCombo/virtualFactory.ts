import { AutoComboConfig } from "./engine";
import { MODE_PACKS } from "./modePacks";
import { DEFAULT_WEIGHTS, ScoringWeights } from "./scoring";
import { AutoVariant } from "./autoPrefix";
import { getProviderConnections } from "@/lib/db/providers";
import { getSettings } from "@/lib/db/settings";
import { getProviderRegistry } from "./providerRegistryAccessor";
import type { ConnectionFields } from "@/lib/db/encryption";
import { NOAUTH_PROVIDERS } from "@/shared/constants/providers";
import { hasUsableWebSessionCredential } from "@/shared/providers/webSessionCredentials";
import { defaultLogger as log } from "@omniroute/open-sse/utils/logger";
import { getTokenLimit } from "../contextManager";
import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import {
  buildAutoCandidateFilter,
  tierToWeightVariant,
  type AutoCategory,
  type AutoTier,
} from "./suffixComposition";
import { buildFamilyCandidateFilter, type ModelFamily } from "./modelFamily";
import { getHiddenModelsByProvider } from "@/models";
import { filterPaidOnlyCandidates } from "./paidModelFilter";

/** #4235 Phase B: optional category/tier overlay for `auto/<category>:<tier>` combos.
 * #6453: optional `family` overlay for `auto/<family>` combos (e.g. `auto/glm`) —
 * mutually exclusive with category/tier, applied instead of them when present. */
export interface AutoComboSpec {
  category?: AutoCategory;
  tier?: AutoTier;
  family?: ModelFamily;
}

/** Minimal connection shape needed for virtual auto-combo factory */
interface VirtualFactoryConn extends ConnectionFields {
  id: string;
  provider: string;
  defaultModel?: string;
  expiresAt?: number | string | null;
  tokenExpiresAt?: number | string | null;
  providerSpecificData?: Record<string, unknown> | null;
}

type NoAuthProviderDefinition = {
  id?: string;
  alias?: string;
  noAuth?: boolean;
  serviceKinds?: string[];
};

export interface VirtualAutoComboCandidate {
  provider: string;
  connectionId: string;
  model: string;
  modelStr: string; // e.g., 'openai/gpt-4o'
  costPer1MTokens: number; // from providerRegistry
}

type VirtualAutoCombo = AutoComboConfig & {
  strategy: "auto";
  models: Array<{
    id: string;
    kind: "model";
    model: string;
    providerId: string;
    connectionId: string;
    weight: number;
    label: string;
  }>;
  /** MAX of candidates' context windows — safe to advertise because the
   * auto-combo context pre-filter routes oversized requests to large-window
   * candidates. null when the pool is empty. */
  advertisedContextLength: number | null;
  advertisedMaxOutputTokens: number | null;
  autoConfig: {
    candidatePool: string[];
    weights: ScoringWeights;
    explorationRate: number;
    routerStrategy: string;
  };
  config: {
    auto: {
      candidatePool: string[];
      weights: ScoringWeights;
      explorationRate: number;
      routerStrategy: string;
    };
  };
};

function toExpiryMs(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;

  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim().length > 0
        ? Number(value)
        : Number.NaN;

  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed < 10_000_000_000 ? parsed * 1000 : parsed;
  }

  if (typeof value === "string") {
    const timestamp = new Date(value).getTime();
    return Number.isFinite(timestamp) ? timestamp : null;
  }

  return null;
}

function hasUsableOAuthToken(conn: VirtualFactoryConn): boolean {
  if (typeof conn.accessToken !== "string" || conn.accessToken.trim().length === 0) return false;

  const expiryMs = toExpiryMs(conn.tokenExpiresAt) ?? toExpiryMs(conn.expiresAt);

  return expiryMs === null || expiryMs > Date.now();
}

function hasProviderSpecificSessionData(conn: VirtualFactoryConn): boolean {
  return hasUsableWebSessionCredential(conn.provider, conn.providerSpecificData);
}

function hasUsableConnectionCredential(conn: VirtualFactoryConn): boolean {
  const hasApiKey = typeof conn.apiKey === "string" && conn.apiKey.trim().length > 0;
  return hasApiKey || hasUsableOAuthToken(conn) || hasProviderSpecificSessionData(conn);
}

const SYNTHETIC_NOAUTH_CONNECTION_ID = "noauth";

function isChatAutoComboNoAuthProvider(providerDef: NoAuthProviderDefinition): boolean {
  if (providerDef.noAuth !== true) return false;
  if (!Array.isArray(providerDef.serviceKinds) || providerDef.serviceKinds.length === 0)
    return true;
  return providerDef.serviceKinds.includes("llm");
}

function getNoAuthCandidates(
  excludedProviders: Set<string>,
  blockedProviders: Set<string>
): VirtualAutoComboCandidate[] {
  const registry = getProviderRegistry();
  const candidates: VirtualAutoComboCandidate[] = [];

  for (const providerDef of Object.values(NOAUTH_PROVIDERS) as NoAuthProviderDefinition[]) {
    if (!isChatAutoComboNoAuthProvider(providerDef)) continue;

    const providerId = providerDef.id;
    if (!providerId || excludedProviders.has(providerId)) continue;
    if (
      blockedProviders.has(providerId) ||
      (typeof providerDef.alias === "string" && blockedProviders.has(providerDef.alias))
    )
      continue;

    const providerInfo = registry[providerId];
    const registryModels = Array.isArray(providerInfo?.models) ? providerInfo.models : [];
    if (registryModels.length === 0) continue;

    // No-auth providers do not have provider_connections rows. Use the same
    // synthetic connection id returned by getProviderCredentials() so the
    // downstream combo path can still carry a stable target/account identity.
    // Prefer provider aliases because some canonical provider IDs are reserved
    // for credentialed tiers with different routing semantics.
    const registryAlias =
      typeof providerInfo?.alias === "string" && providerInfo.alias.trim().length > 0
        ? providerInfo.alias
        : null;
    const routingPrefix = providerDef.alias || registryAlias || providerId;

    for (const model of registryModels) {
      const modelId = typeof model?.id === "string" && model.id.trim().length > 0 ? model.id : null;
      if (!modelId) continue;
      candidates.push({
        provider: providerId,
        connectionId: SYNTHETIC_NOAUTH_CONNECTION_ID,
        model: modelId,
        modelStr: `${routingPrefix}/${modelId}`,
        costPer1MTokens: 0,
      });
    }
  }

  return candidates;
}

/**
 * Creates a virtual AutoCombo configuration dynamically based on connected providers and a specified variant.
 * This combo is not persisted in the DB.
 */
/**
 * Aggregate the context window / max output to ADVERTISE for an auto combo.
 *
 * MAX across candidates (not min): the auto-combo context pre-filter
 * (combo.ts::filterTargetsByRequestCompatibility + the estimated-tokens
 * pre-filter) already routes oversized requests away from small-window
 * candidates, so advertising the largest window lets clients (e.g. opencode)
 * keep their smart auto-compaction calibrated to the best candidate instead
 * of compacting prematurely — or, worse, receiving 0 and disabling
 * compaction entirely (the "agent keeps forgetting things" bug).
 *
 * Unknown candidates resolve through getTokenLimit()'s fallback chain, so a
 * non-empty pool always yields a positive contextLength.
 */
export function computeAdvertisedLimits(candidates: Array<{ provider: string; model: string }>): {
  contextLength: number | null;
  maxOutputTokens: number | null;
} {
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return { contextLength: null, maxOutputTokens: null };
  }

  let contextLength: number | null = null;
  let maxOutputTokens: number | null = null;
  for (const candidate of candidates) {
    const limit = getTokenLimit(candidate.provider, candidate.model);
    if (Number.isFinite(limit) && limit > 0) {
      contextLength = contextLength === null ? limit : Math.max(contextLength, limit);
    }
    const output = getResolvedModelCapabilities({
      provider: candidate.provider,
      model: candidate.model,
    }).maxOutputTokens;
    if (typeof output === "number" && Number.isFinite(output) && output > 0) {
      maxOutputTokens = maxOutputTokens === null ? output : Math.max(maxOutputTokens, output);
    }
  }
  return { contextLength, maxOutputTokens };
}

export async function createVirtualAutoCombo(
  variant: AutoVariant | undefined,
  spec?: AutoComboSpec
): Promise<VirtualAutoCombo> {
  const [connections, settings] = await Promise.all([
    getProviderConnections({ isActive: true }) as Promise<VirtualFactoryConn[]>,
    getSettings().catch(() => ({}) as Record<string, unknown>),
  ]);
  const blockedProviders = new Set(
    Array.isArray(settings.blockedProviders) ? (settings.blockedProviders as string[]) : []
  );
  const hiddenModelsMap = getHiddenModelsByProvider();

  const validConnections = connections.filter(hasUsableConnectionCredential);

  const candidatePool: VirtualAutoComboCandidate[] = [];
  for (const conn of validConnections) {
    // #5873: custom OpenAI-/Anthropic-compatible providers have dynamic connection
    // IDs (`*-compatible-*`) that are never keys of the static registry. Do NOT drop
    // them from `auto/` routing — only fall back to the registry's first model when
    // the connection has no explicit defaultModel.
    const providerInfo = getProviderRegistry()[conn.provider];

    let modelId: string | undefined = conn.defaultModel;
    if (!modelId && providerInfo) {
      const firstModel = providerInfo.models[0];
      modelId = firstModel?.id;
    }
    if (!modelId) continue; // Skip providers without a resolvable model

    // Skip models that the user has hidden in the dashboard
    const hiddenModels = hiddenModelsMap.get(conn.provider);
    if (hiddenModels?.has(modelId)) continue;

    candidatePool.push({
      provider: conn.provider,
      connectionId: conn.id,
      model: modelId,
      modelStr: `${conn.provider}/${modelId}`,
      costPer1MTokens: 0, // Not used in virtual auto-combo (LKGP uses session stickiness)
    });
  }

  candidatePool.push(
    ...getNoAuthCandidates(new Set(validConnections.map((conn) => conn.provider)), blockedProviders)
  );

  // #6512 (follow-up to #6328/#6495): when the operator opts into `hidePaidModels`,
  // exclude paid-only backends from EVERY `auto/*` candidate pool — not just the
  // `/v1/models` listing — so auto-routing never picks a model that will 402/403.
  // If this empties the pool the existing graceful empty-pool path below handles it
  // (consistent with the opt-in intent). Default OFF → pool unchanged.
  const paidFilteredPool = filterPaidOnlyCandidates(candidatePool, settings.hidePaidModels === true);
  if (paidFilteredPool !== candidatePool) {
    candidatePool.length = 0;
    candidatePool.push(...paidFilteredPool);
  }

  if (candidatePool.length === 0) {
    log.warn("AUTO", "No connected providers with valid credentials for virtual auto-combo");
    const emptyPool: string[] = [];
    const autoConfig = {
      candidatePool: emptyPool,
      weights: { ...DEFAULT_WEIGHTS },
      explorationRate: 0.05,
      routerStrategy: "lkgp",
    };
    return {
      id: `virtual-auto-${variant || "default"}`,
      name: `Auto ${variant || "Default"}`,
      type: "auto" as const,
      strategy: "auto",
      models: [],
      candidatePool: emptyPool,
      weights: autoConfig.weights,
      explorationRate: autoConfig.explorationRate,
      routerStrategy: autoConfig.routerStrategy,
      autoConfig,
      config: { auto: autoConfig },
      advertisedContextLength: null,
      advertisedMaxOutputTokens: null,
    };
  }

  // #4235 Phase B: narrow the pool by the `auto/<category>:<tier>` overlay
  // (vision/reasoning capability, free/premium model tier).
  //
  // Default behavior: when the filter yields zero candidates, return an EMPTY
  // pool — never silently fall back to the full pool. This makes
  // `auto/coding:free` actually mean "free tier only" and prevents a paid
  // expensive model from being picked just because no free provider is
  // connected. Operators who want the old "never break routing, lose the bias"
  // behavior can opt back in via the env var below.
  let effectivePool = candidatePool;
  // #6453: `auto/<family>` narrows by model family instead of category/tier. The
  // two overlays are mutually exclusive on the spec (family takes precedence when
  // both are somehow present, which callers never do in practice).
  const candidateFilter = spec?.family
    ? buildFamilyCandidateFilter(spec.family)
    : spec
      ? buildAutoCandidateFilter(spec.category, spec.tier)
      : null;
  if (candidateFilter) {
    const narrowed = candidatePool.filter((c) =>
      candidateFilter({ provider: c.provider, model: c.model })
    );
    const label = spec?.family
      ? `auto/${spec.family}`
      : `auto/${spec?.category ?? ""}${spec?.tier ? `:${spec.tier}` : ""}`;
    if (narrowed.length > 0) {
      effectivePool = narrowed;
    } else if (
      !spec?.family &&
      (process.env.OMNIROUTE_AUTO_FREE_FALLBACK_TO_FULL_POOL === "true" ||
        process.env.OMNIROUTE_AUTO_FREE_FALLBACK_TO_FULL_POOL === "1")
    ) {
      // Opt-in legacy behavior (category/tier only): warn loudly, then keep the full pool.
      log.warn(
        "AUTO",
        `${label} matched no connected models; falling back to the full pool (OMNIROUTE_AUTO_FREE_FALLBACK_TO_FULL_POOL=true)`
      );
    } else {
      // Family combos always degrade to an empty pool when unavailable — a family
      // is a hard identity constraint, not a soft optimization bias, so there is
      // no sensible "fall back to the full pool" behavior for it.
      log.warn(
        "AUTO",
        `${label} matched no connected models; returning an empty pool.${spec?.family ? "" : ' Set OMNIROUTE_AUTO_FREE_FALLBACK_TO_FULL_POOL=true to restore the legacy "use full pool" behavior.'}`
      );
      effectivePool = [];
    }
  }

  let weights: ScoringWeights = { ...DEFAULT_WEIGHTS };
  let explorationRate = 0.05; // Default exploration rate
  let routerStrategy = "lkgp"; // All auto variants use LKGP

  switch (variant) {
    case "coding":
      weights = { ...MODE_PACKS["quality-first"] };
      break;
    case "fast":
      weights = { ...MODE_PACKS["ship-fast"] };
      break;
    case "cheap":
      weights = { ...MODE_PACKS["cost-saver"] };
      break;
    case "offline":
      weights = { ...MODE_PACKS["offline-friendly"] };
      break;
    case "smart":
      weights = { ...MODE_PACKS["quality-first"] };
      explorationRate = 0.1; // Override default exploration rate
      break;
    case "lkgp":
      // LKGP is default for all auto variants, this variant just explicitly names it.
      // Use default weights.
      break;
    case undefined: // Default auto
      // Use default weights
      break;
  }

  // #4235 Phase B: category/tier weight overlay. A non-chat category leans
  // quality-first; the tier then refines toward latency (fast), cost (cheap/floor)
  // or availability (reliable). free/pro keep the base weights — their bias is the
  // candidate filter above (free → free-tier models, pro → premium models).
  if (spec) {
    if (spec.category && spec.category !== "chat") {
      weights = { ...MODE_PACKS["quality-first"] };
    }
    const weightVariant = tierToWeightVariant(spec.tier);
    if (weightVariant === "fast") {
      weights = { ...MODE_PACKS["ship-fast"] };
    } else if (weightVariant === "cheap") {
      weights = { ...MODE_PACKS["cost-saver"] };
    } else if (weightVariant === "reliability") {
      weights = { ...MODE_PACKS["reliability-first"] };
    }
  }

  const providerPool = [...new Set(effectivePool.map((c) => c.provider))];
  const models = effectivePool.map((candidate, index) => ({
    id: `virtual-auto-${variant || "default"}-${index + 1}-${candidate.provider}`,
    kind: "model" as const,
    model: candidate.modelStr,
    providerId: candidate.provider,
    connectionId: candidate.connectionId,
    weight: 1,
    label: candidate.provider,
  }));
  const autoConfig = {
    candidatePool: providerPool,
    weights,
    explorationRate,
    routerStrategy,
  };

  const advertisedLimits = computeAdvertisedLimits(effectivePool);

  return {
    id: `virtual-auto-${variant || "default"}`,
    name: `Auto ${variant || "Default"}`,
    type: "auto",
    strategy: "auto",
    models,
    candidatePool: providerPool,
    weights,
    explorationRate,
    routerStrategy,
    autoConfig,
    config: { auto: autoConfig },
    advertisedContextLength: advertisedLimits.contextLength,
    advertisedMaxOutputTokens: advertisedLimits.maxOutputTokens,
  };
}
