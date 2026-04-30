/**
 * A2A Skill: Provider Discovery
 *
 * Answers provider capability, availability, and routing-fit questions for agents.
 */

import type { A2ATask, TaskArtifact } from "../taskManager";
import {
  AI_PROVIDERS,
  AUDIO_ONLY_PROVIDERS,
  EMBEDDING_RERANK_PROVIDER_IDS,
  IMAGE_ONLY_PROVIDER_IDS,
  LOCAL_PROVIDERS,
  SEARCH_PROVIDERS,
  VIDEO_PROVIDER_IDS,
} from "@/shared/constants/providers";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";

type ProviderConnectionLike = {
  id?: string;
  provider?: string;
  name?: string | null;
  isActive?: boolean | null;
};

type CircuitBreakerLike = {
  name?: string;
  state?: string;
  failureCount?: number;
  retryAfterMs?: number;
};

type ProviderCandidate = {
  id: string;
  name: string;
  capabilities: string[];
  configured: boolean;
  active: boolean;
  health: "healthy" | "recovering" | "down" | "unknown";
  modelCount: number;
};

function detectCapability(task: A2ATask): string {
  const metadataCapability = task.input.metadata?.capability;
  if (typeof metadataCapability === "string" && metadataCapability.trim()) {
    return metadataCapability.toLowerCase();
  }

  const query = task.input.messages.at(-1)?.content?.toLowerCase() || "";
  if (query.includes("image") || query.includes("vision")) return "images";
  if (query.includes("video")) return "video";
  if (query.includes("audio") || query.includes("transcription") || query.includes("speech")) {
    return "audio";
  }
  if (query.includes("embed")) return "embeddings";
  if (query.includes("rerank")) return "rerank";
  if (query.includes("search") || query.includes("web")) return "search";
  if (query.includes("local") || query.includes("self-hosted")) return "local";
  return "chat";
}

function providerCapabilities(providerId: string): string[] {
  const capabilities = new Set<string>();
  const registryEntry = REGISTRY[providerId];

  if (registryEntry) capabilities.add("chat");
  if (IMAGE_ONLY_PROVIDER_IDS.has(providerId)) capabilities.add("images");
  if (VIDEO_PROVIDER_IDS.has(providerId)) capabilities.add("video");
  if (EMBEDDING_RERANK_PROVIDER_IDS.has(providerId)) {
    capabilities.add("embeddings");
    capabilities.add("rerank");
  }
  if (Object.prototype.hasOwnProperty.call(SEARCH_PROVIDERS, providerId)) {
    capabilities.add("search");
  }
  if (Object.prototype.hasOwnProperty.call(AUDIO_ONLY_PROVIDERS, providerId)) {
    capabilities.add("audio");
  }
  if (Object.prototype.hasOwnProperty.call(LOCAL_PROVIDERS, providerId)) {
    capabilities.add("local");
    capabilities.add("chat");
  }
  if (registryEntry?.models?.some((model) => model.supportsVision)) {
    capabilities.add("vision");
  }

  return [...capabilities].sort();
}

function healthFromBreaker(breaker?: CircuitBreakerLike): ProviderCandidate["health"] {
  if (!breaker?.state) return "unknown";
  if (breaker.state === "CLOSED") return "healthy";
  if (breaker.state === "HALF_OPEN") return "recovering";
  return "down";
}

function scoreCandidate(candidate: ProviderCandidate, requestedCapability: string): number {
  let score = 0;
  if (candidate.capabilities.includes(requestedCapability)) score += 100;
  if (requestedCapability === "chat" && candidate.capabilities.includes("chat")) score += 40;
  if (candidate.active) score += 30;
  if (candidate.configured) score += 20;
  if (candidate.health === "healthy") score += 20;
  if (candidate.health === "recovering") score += 5;
  if (candidate.health === "down") score -= 100;
  score += Math.min(candidate.modelCount, 25);
  return score;
}

export interface ProviderDiscoveryResult {
  artifacts: TaskArtifact[];
  metadata: {
    capability: string;
    totalCandidates: number;
    configuredCandidates: number;
    recommendedProvider: string | null;
    candidates: ProviderCandidate[];
  };
}

export async function executeProviderDiscovery(task: A2ATask): Promise<ProviderDiscoveryResult> {
  const [{ getProviderConnections }, { getAllCircuitBreakerStatuses }] = await Promise.all([
    import("@/lib/localDb"),
    import("@/shared/utils/circuitBreaker"),
  ]);

  const requestedCapability = detectCapability(task);
  const connections = ((await getProviderConnections().catch(() => [])) ||
    []) as ProviderConnectionLike[];
  const activeProviders = new Set(
    connections
      .filter((connection) => connection.provider && connection.isActive !== false)
      .map((connection) => connection.provider as string)
  );
  const configuredProviders = new Set(
    connections
      .filter((connection) => connection.provider)
      .map((connection) => connection.provider as string)
  );
  const breakers = new Map(
    getAllCircuitBreakerStatuses().map((breaker: CircuitBreakerLike) => [
      breaker.name || "",
      breaker,
    ])
  );

  const candidates = Object.entries(AI_PROVIDERS)
    .map(([providerId, provider]) => {
      const capabilities = providerCapabilities(providerId);
      return {
        id: providerId,
        name: provider.name || providerId,
        capabilities,
        configured: configuredProviders.has(providerId),
        active: activeProviders.has(providerId),
        health: healthFromBreaker(breakers.get(providerId)),
        modelCount: REGISTRY[providerId]?.models?.length || 0,
      } satisfies ProviderCandidate;
    })
    .filter((candidate) =>
      requestedCapability === "chat"
        ? candidate.capabilities.includes("chat")
        : candidate.capabilities.includes(requestedCapability)
    )
    .sort(
      (left, right) =>
        scoreCandidate(right, requestedCapability) - scoreCandidate(left, requestedCapability)
    );

  const top = candidates.slice(0, 10);
  const recommended = top[0] || null;
  const configuredCount = candidates.filter((candidate) => candidate.configured).length;

  return {
    artifacts: [
      {
        type: "text",
        content:
          top.length > 0
            ? [
                `Provider discovery for capability: ${requestedCapability}`,
                recommended ? `Recommended provider: ${recommended.name} (${recommended.id})` : "",
                "",
                ...top.map(
                  (candidate, index) =>
                    `${index + 1}. ${candidate.name} (${candidate.id}) - ${candidate.health}, ` +
                    `${candidate.configured ? "configured" : "not configured"}, ` +
                    `${candidate.modelCount} catalog models`
                ),
              ].join("\n")
            : `No providers matched capability: ${requestedCapability}`,
      },
    ],
    metadata: {
      capability: requestedCapability,
      totalCandidates: candidates.length,
      configuredCandidates: configuredCount,
      recommendedProvider: recommended?.id || null,
      candidates: top,
    },
  };
}
