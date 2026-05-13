import { AutoComboConfig, SelectionResult } from "./engine";
import { MODE_PACKS } from "./modePacks";
import { DEFAULT_WEIGHTS, ScoringWeights } from "./scoring";
import { AutoVariant } from "./autoPrefix";
import { getProviderConnections } from "@/lib/db/providers";
import { getProviderRegistry } from "./providerRegistryAccessor";
import type { ConnectionFields } from "@/lib/db/encryption";
import { defaultLogger as log } from "@omniroute/open-sse/utils/logger";

/** Minimal connection shape needed for virtual auto-combo factory */
interface VirtualFactoryConn extends ConnectionFields {
  id: string;
  provider: string;
  defaultModel?: string;
  oauthExpiresAt?: number | string; // timestamp or ISO string
}

export interface VirtualAutoComboCandidate {
  provider: string;
  connectionId: string;
  model: string;
  modelStr: string; // e.g., 'openai/gpt-4o'
  costPer1MTokens: number; // from providerRegistry
}

/**
 * Creates a virtual AutoCombo configuration dynamically based on connected providers and a specified variant.
 * This combo is not persisted in the DB.
 */
export async function createVirtualAutoCombo(
  variant: AutoVariant | undefined
): Promise<AutoComboConfig> {
  const connections = (await getProviderConnections({ isActive: true })) as VirtualFactoryConn[];

  const validConnections = connections.filter((conn) => {
    const hasApiKey = !!conn.apiKey;
    let expiresAt: number;
    if (typeof conn.oauthExpiresAt === "string") {
      expiresAt = new Date(conn.oauthExpiresAt).getTime();
    } else {
      expiresAt = Number(conn.oauthExpiresAt) || 0;
    }
    const hasOAuthToken = !!conn.oauthToken && new Date(expiresAt) > new Date();
    return hasApiKey || hasOAuthToken;
  });

  if (validConnections.length === 0) {
    log.warn("AUTO", "No connected providers with valid credentials for virtual auto-combo");
    const emptyPool: string[] = [];
    return {
      id: `virtual-auto-${variant || "default"}`,
      name: `Auto ${variant || "Default"}`,
      type: "auto" as const,
      candidatePool: emptyPool,
      weights: { ...DEFAULT_WEIGHTS },
      explorationRate: 0.05,
      routerStrategy: "lkgp",
    };
  }

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

  const pool = candidatePool.map((c) => c.modelStr);

  return {
    id: `virtual-auto-${variant || "default"}`,
    name: `Auto ${variant || "Default"}`,
    type: "auto",
    candidatePool: pool,
    weights: weights,
    explorationRate: explorationRate,
    routerStrategy: routerStrategy,
  };
}
