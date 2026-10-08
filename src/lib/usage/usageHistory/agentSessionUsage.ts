/**
 * Agent-session attribution for saveRequestUsage (#14833): builds the per-request session
 * counters (priced at request time) and upserts the session inside the caller's transaction.
 * Both steps are best-effort — a failure degrades to an unattributed usage_history row and
 * never drops the row itself.
 */
import { resolveProviderId } from "@/shared/constants/providers";
import {
  hasAgentIdentity,
  type AgentContext,
} from "@omniroute/open-sse/handlers/chatCore/agentContext.ts";
import {
  recordAgentSessionUsage,
  type AgentSessionTokens,
  type AgentSessionUsage,
} from "../../db/agentSessions";
import { calculateCostDetailed } from "../costCalculator";
import {
  getLoggedInputTokens,
  getLoggedOutputTokens,
  getPromptCacheCreationTokens,
  getPromptCacheReadTokens,
  getReasoningTokens,
} from "../tokenAccounting";

export type { AgentContext };

export type AgentSessionUsageInput = {
  agentContext?: AgentContext | null;
  tokens?: unknown;
  provider?: string | null;
  model?: string | null;
  apiKeyId?: string | null;
  apiKeyName?: string | null;
  connectionId?: string | null;
  success?: boolean | null;
};

/** Upsert the request's agent session inside the caller's transaction; null when it has none. */
export function recordAgentSession(
  db: Parameters<typeof recordAgentSessionUsage>[0],
  usage: AgentSessionUsage | null
): string | null {
  if (!usage) return null;
  try {
    return recordAgentSessionUsage(db, usage);
  } catch (error) {
    console.warn("Failed to record agent session; saving the usage row without it:", error);
    return null;
  }
}

/** Session counters for this request, priced now so reports keep the price at request time. */
export async function buildAgentSessionUsage(
  entry: AgentSessionUsageInput,
  timestamp: string,
  serviceTier: string
): Promise<AgentSessionUsage | null> {
  if (!hasAgentIdentity(entry.agentContext)) return null;
  // Same token accounting as the usage_history row the session is linked to.
  const tokens: AgentSessionTokens = {
    input: getLoggedInputTokens(entry.tokens),
    output: getLoggedOutputTokens(entry.tokens),
    cacheRead: getPromptCacheReadTokens(entry.tokens),
    cacheCreation: getPromptCacheCreationTokens(entry.tokens),
    reasoning: getReasoningTokens(entry.tokens),
  };
  const provider = entry.provider ? resolveProviderId(entry.provider) : null;
  const model = entry.model || null;
  let pricing: { costUsd: number; priced: boolean };
  try {
    pricing = await calculateCostDetailed(provider || "", model || "", tokens, {
      provider,
      model,
      serviceTier,
    });
  } catch (error) {
    // Pricing only feeds the session counters; never let it drop the usage_history row.
    console.warn("Failed to price agent session usage; saving the usage row without it:", error);
    return null;
  }
  return {
    context: entry.agentContext,
    apiKeyId: entry.apiKeyId || null,
    apiKeyName: entry.apiKeyName || null,
    timestamp,
    success: entry.success !== false,
    tokens,
    costUsd: pricing.costUsd,
    priced: pricing.priced,
    provider,
    model,
    connectionId: entry.connectionId || null,
  };
}
