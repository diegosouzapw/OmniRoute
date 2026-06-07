import { AutoComboConfig } from "./engine";
import { MODE_PACKS } from "./modePacks";
import { DEFAULT_WEIGHTS, ScoringWeights } from "./scoring";
import { AutoVariant } from "./autoPrefix";
import { getProviderConnections } from "@/lib/db/providers";
import { getProviderRegistry } from "./providerRegistryAccessor";
import type { ConnectionFields } from "@/lib/db/encryption";
import { NOAUTH_PROVIDERS } from "@/shared/constants/providers";
import { defaultLogger as log } from "@omniroute/open-sse/utils/logger";

/** Minimal connection shape needed for virtual auto-combo factory */
interface VirtualFactoryConn extends ConnectionFields {
  id: string;
  provider: string;
  defaultModel?: string;
  expiresAt?: number | string | null;
  tokenExpiresAt?: number | string | null;
}

type NoAuthProviderDefinition = {
  id?: string;
  alias?: string;
  noAuth?: boolean;
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

const SYNTHETIC_NOAUTH_CONNECTION_ID = "noauth";
const ZERO_CONFIG_NOAUTH_CHAT_PROVIDERS = new Set(["opencode"]);

function getFirstRegistryModelId(providerInfo: { models?: Array<{ id?: string }> } | undefined) {
  const firstModel = Array.isArray(providerInfo?.models) ? providerInfo.models[0] : undefined;
  return typeof firstModel?.id === "string" && firstModel.id.trim().length > 0
    ? firstModel.id
    : undefined;
}

function getNoAuthCandidates(excludedProviders: Set<string>): VirtualAutoComboCandidate[] {
  const registry = getProviderRegistry();
  const candidates: VirtualAutoComboCandidate[] = [];

  for (const providerDef of Object.values(NOAUTH_PROVIDERS) as NoAuthProviderDefinition[]) {
    if (providerDef?.noAuth !== true) continue;

    const providerId = providerDef.id;
    if (!providerId || excludedProviders.has(providerId)) continue;
    if (!ZERO_CONFIG_NOAUTH_CHAT_PROVIDERS.has(providerId)) continue;

    const providerInfo = registry[providerId];
    const modelId = getFirstRegistryModelId(providerInfo);
    if (!modelId) continue;

    // No-auth providers do not have provider_connections rows. Use the same
    // synthetic connection id returned by getProviderCredentials() so the
    // downstream combo path can still carry a stable target/account identity.
    // For OpenCode Free specifically, route through its alias (oc/...) because
    // opencode/... is a compatibility alias for the opencode-zen API-key tier.
    const registryAlias =
      typeof providerInfo?.alias === "string" && providerInfo.alias.trim().length > 0
        ? providerInfo.alias
        : null;
    const routingPrefix = providerDef.alias || registryAlias || providerId;
    candidates.push({
      provider: providerId,
      connectionId: SYNTHETIC_NOAUTH_CONNECTION_ID,
      model: modelId,
      modelStr: `${routingPrefix}/${modelId}`,
      costPer1MTokens: 0,
    });
  }

  return candidates;
}

/**
 * Creates a virtual AutoCombo configuration dynamically based on connected providers and a specified variant.
 * This combo is not persisted in the DB.
 */
export async function createVirtualAutoCombo(
  variant: AutoVariant | undefined
): Promise<VirtualAutoCombo> {
  const connections = (await getProviderConnections({ isActive: true })) as VirtualFactoryConn[];

  const validConnections = connections.filter((conn) => {
    const hasApiKey = typeof conn.apiKey === "string" && conn.apiKey.trim().length > 0;
    return hasApiKey || hasUsableOAuthToken(conn);
  });

  const candidatePool: VirtualAutoComboCandidate[] = [];
  for (const conn of validConnections) {
    const providerInfo = getProviderRegistry()[conn.provider];
    if (!providerInfo) continue; // Skip unknown providers

    let modelId: string | undefined = conn.defaultModel;
    if (!modelId) {
      const firstModel = providerInfo.models[0];
      modelId = firstModel?.id;
    }
    if (!modelId) continue; // Skip providers without a model

    candidatePool.push({
      provider: conn.provider,
      connectionId: conn.id,
      model: modelId,
      modelStr: `${conn.provider}/${modelId}`,
      costPer1MTokens: 0, // Not used in virtual auto-combo (LKGP uses session stickiness)
    });
  }

  candidatePool.push(
    ...getNoAuthCandidates(new Set(validConnections.map((conn) => conn.provider)))
  );

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
    };
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

  const providerPool = [...new Set(candidatePool.map((c) => c.provider))];
  const models = candidatePool.map((candidate, index) => ({
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
  };
}
