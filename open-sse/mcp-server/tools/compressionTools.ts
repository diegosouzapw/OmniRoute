/**
 * OmniRoute MCP Compression Tools — Manage and monitor prompt compression.
 *
 * Tools:
 *   1. omniroute_compression_status   — Get compression config, analytics, and cache stats
 *   2. omniroute_compression_configure — Update compression settings
 */

import { logToolCall } from "../audit.ts";
import {
  getCompressionSettings,
  updateCompressionSettings,
} from "../../../src/lib/db/compression.ts";
import { getCompressionAnalyticsSummary } from "../../../src/lib/db/compressionAnalytics.ts";
import { getCacheStatsSummary } from "../../../src/lib/db/compressionCacheStats.ts";
import { listCompressionCombos } from "../../../src/lib/db/compressionCombos.ts";
import type { McpToolExtraLike } from "../scopeEnforcement.ts";
import {
  getMcpDescriptionCompressionStats,
  snapshotMcpDescriptionCompressionStats,
} from "../descriptionCompressor.ts";

/**
 * Handle compression_status tool: return current compression config, analytics, and cache stats
 */
export async function handleCompressionStatus(
  args: Record<string, never>,
  extra?: McpToolExtraLike
): Promise<{
  enabled: boolean;
  strategy: string;
  settings: {
    maxTokens: number;
    autoTriggerMode: string;
    targetRatio: number;
    preserveSystemPrompt: boolean;
    mcpDescriptionCompressionEnabled: boolean;
  };
  analytics: {
    totalRequests: number;
    compressedRequests: number;
    tokensSaved: number;
    avgCompressionRatio: number;
    byMode: Record<string, { count: number; tokensSaved: number; avgSavingsPct: number }>;
    byEngine: Record<string, { count: number; tokensSaved: number; avgSavingsPct: number }>;
    byCompressionCombo: Record<string, { count: number; tokensSaved: number }>;
    validationFallbacks: number;
    requestsWithReceipts: number;
    realUsage: {
      requestsWithReceipts: number;
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
      cacheReadTokens: number;
      cacheWriteTokens: number;
      estimatedUsdSaved: number;
      bySource: Record<string, number>;
    };
    mcpDescriptionCompression: {
      descriptionsCompressed: number;
      charsBefore: number;
      charsAfter: number;
      charsSaved: number;
      estimatedTokensSaved: number;
      persistedEstimatedTokensSaved: number;
      persistedSnapshots: number;
      source: "mcp_metadata_estimate";
      notProviderUsage: true;
    };
  };
  cacheStats: {
    hits: number;
    misses: number;
    hitRate: string;
    tokensSaved: number;
  } | null;
}> {
  const start = Date.now();
  try {
    const settings = await getCompressionSettings();
    await snapshotMcpDescriptionCompressionStats();
    const analyticsSummary = getCompressionAnalyticsSummary();
    const mcpDescriptionStats = getMcpDescriptionCompressionStats();
    const cacheStats = getCacheStatsSummary();

    const result = {
      enabled: settings.enabled,
      strategy: settings.defaultMode || "standard",
      settings: {
        maxTokens: settings.autoTriggerTokens,
        autoTriggerMode: settings.autoTriggerMode ?? "lite",
        targetRatio: 0.7, // Default target ratio
        preserveSystemPrompt: settings.preserveSystemPrompt,
        mcpDescriptionCompressionEnabled: settings.mcpDescriptionCompressionEnabled !== false,
      },
      analytics: {
        totalRequests: analyticsSummary.totalRequests,
        compressedRequests: Object.values(analyticsSummary.byMode ?? {}).reduce(
          (sum, mode) => sum + mode.count,
          0
        ),
        tokensSaved: analyticsSummary.totalTokensSaved,
        avgCompressionRatio: analyticsSummary.avgSavingsPct,
        byMode: analyticsSummary.byMode ?? {},
        byEngine: analyticsSummary.byEngine ?? {},
        byCompressionCombo: analyticsSummary.byCompressionCombo ?? {},
        validationFallbacks: analyticsSummary.validationFallbacks,
        requestsWithReceipts: analyticsSummary.realUsage.requestsWithReceipts,
        realUsage: analyticsSummary.realUsage,
        mcpDescriptionCompression: {
          descriptionsCompressed: mcpDescriptionStats.descriptionsCompressed,
          charsBefore: mcpDescriptionStats.charsBefore,
          charsAfter: mcpDescriptionStats.charsAfter,
          charsSaved: mcpDescriptionStats.charsSaved,
          estimatedTokensSaved: mcpDescriptionStats.estimatedTokensSaved,
          persistedEstimatedTokensSaved:
            analyticsSummary.mcpDescriptionCompression.estimatedTokensSaved,
          persistedSnapshots: analyticsSummary.mcpDescriptionCompression.snapshots,
          source: "mcp_metadata_estimate" as const,
          notProviderUsage: true as const,
        },
      },
      cacheStats: cacheStats
        ? {
            hits: Math.round(cacheStats.cacheHitRate * (cacheStats.totalRequests || 1)),
            misses: Math.round((1 - cacheStats.cacheHitRate) * (cacheStats.totalRequests || 1)),
            hitRate: `${(cacheStats.cacheHitRate * 100).toFixed(2)}%`,
            tokensSaved: Math.round(cacheStats.avgNetSavings),
          }
        : null,
    };

    const duration = Date.now() - start;
    await logToolCall("omniroute_compression_status", args, result, duration, true);

    return result;
  } catch (error) {
    const duration = Date.now() - start;
    const errorMessage = error instanceof Error ? error.message : String(error);
    await logToolCall(
      "omniroute_compression_status",
      args,
      { error: errorMessage },
      duration,
      false,
      "ERROR"
    );
    throw error;
  }
}

/**
 * Handle compression_configure tool: update compression settings
 */
export async function handleCompressionConfigure(
  args: {
    enabled?: boolean;
    strategy?: string;
    autoTriggerMode?: string;
    maxTokens?: number;
    targetRatio?: number;
    preserveSystemPrompt?: boolean;
    mcpDescriptionCompressionEnabled?: boolean;
  },
  extra?: McpToolExtraLike
): Promise<{
  success: boolean;
  updated: Record<string, unknown>;
  settings: {
    enabled: boolean;
    strategy: string;
    autoTriggerMode: string;
    maxTokens: number;
    targetRatio: number;
    preserveSystemPrompt: boolean;
    mcpDescriptionCompressionEnabled: boolean;
  };
}> {
  const start = Date.now();
  try {
    const updates: Record<string, unknown> = {};

    if (args.enabled !== undefined) {
      updates.enabled = args.enabled;
    }
    if (args.strategy !== undefined) {
      updates.defaultMode = args.strategy;
    }
    if (args.autoTriggerMode !== undefined) {
      updates.autoTriggerMode = args.autoTriggerMode;
    }
    if (args.maxTokens !== undefined) {
      updates.autoTriggerTokens = args.maxTokens;
    }
    if (args.preserveSystemPrompt !== undefined) {
      updates.preserveSystemPrompt = args.preserveSystemPrompt;
    }
    if (args.mcpDescriptionCompressionEnabled !== undefined) {
      updates.mcpDescriptionCompressionEnabled = args.mcpDescriptionCompressionEnabled;
    }

    const settings = await updateCompressionSettings(updates);

    const result = {
      success: true,
      updated: updates,
      settings: {
        enabled: settings.enabled,
        strategy: settings.defaultMode || "standard",
        autoTriggerMode: settings.autoTriggerMode ?? "lite",
        maxTokens: settings.autoTriggerTokens,
        targetRatio: 0.7, // Default target ratio
        preserveSystemPrompt: settings.preserveSystemPrompt,
        mcpDescriptionCompressionEnabled: settings.mcpDescriptionCompressionEnabled !== false,
      },
    };

    const duration = Date.now() - start;
    await logToolCall("omniroute_compression_configure", args, result, duration, true);

    return result;
  } catch (error) {
    const duration = Date.now() - start;
    const errorMessage = error instanceof Error ? error.message : String(error);
    await logToolCall(
      "omniroute_compression_configure",
      args,
      { error: errorMessage },
      duration,
      false,
      "ERROR"
    );
    throw error;
  }
}

import { z } from "zod";
import {
  compressionStatusInput,
  compressionConfigureInput,
  setCompressionEngineInput,
  listCompressionCombosInput,
  compressionComboStatsInput,
} from "../schemas/tools.ts";
import { handleCcrRetrieve } from "../../services/compression/engines/ccr/index.ts";
import {
  listRtkCommandSamples,
  discoverRepeatedNoise,
  suggestFilter,
  commandToId,
} from "../../services/compression/engines/rtk/index.ts";
import { resolveCallerScopeContext } from "../scopeEnforcement.ts";
import { resolveMcpCallerApiKeyId } from "../mcpCallerIdentity.ts";

const ccrRetrieveInput = z.object({
  hash: z
    .string()
    .min(6)
    .max(64)
    .describe("24-hex content hash from a [CCR retrieve hash=<hash>] marker"),
  mode: z
    .enum(["full", "head", "tail", "lines", "grep", "stats"])
    .optional()
    .describe("Retrieval mode: full (default) | head | tail | lines | grep | stats"),
  n: z.number().int().positive().max(10000).optional().describe("head/tail: number of lines"),
  start: z.number().int().positive().optional().describe("lines: 1-indexed inclusive start"),
  end: z.number().int().positive().optional().describe("lines: 1-indexed inclusive end"),
  pattern: z.string().max(512).optional().describe("grep: regex (validated safe; ReDoS-rejected)"),
  unique: z.boolean().optional().describe("grep: dedupe matching lines"),
});

export async function handleSetCompressionEngine(
  args: z.infer<typeof setCompressionEngineInput>
): Promise<{ success: boolean; settings: Record<string, unknown> }> {
  const updates: Record<string, unknown> = { enabled: true };
  if (args.engine) {
    updates.defaultMode = args.engine === "caveman" ? "standard" : args.engine;
    if (args.engine === "off") updates.enabled = false;
  }
  if (args.cavemanIntensity) {
    const current = await getCompressionSettings();
    updates.cavemanConfig = {
      ...(current.cavemanConfig ?? {}),
      intensity: args.cavemanIntensity,
    };
  }
  if (args.rtkIntensity) {
    const current = await getCompressionSettings();
    updates.rtkConfig = {
      ...(current.rtkConfig ?? {}),
      intensity: args.rtkIntensity,
    };
  }
  if (args.outputMode !== undefined) {
    const current = await getCompressionSettings();
    updates.cavemanOutputMode = {
      ...(current.cavemanOutputMode ?? {}),
      enabled: args.outputMode,
    };
  }
  const settings = await updateCompressionSettings(updates);
  return { success: true, settings: settings as unknown as Record<string, unknown> };
}

export async function handleListCompressionCombos(): Promise<{
  combos: ReturnType<typeof listCompressionCombos>;
}> {
  return { combos: listCompressionCombos() };
}

export async function handleCompressionComboStats(
  args: z.infer<typeof compressionComboStatsInput>
): Promise<Record<string, unknown>> {
  const summary = getCompressionAnalyticsSummary(args.since === "all" ? undefined : args.since);
  if (!args.comboId) return summary as unknown as Record<string, unknown>;
  return {
    comboId: args.comboId,
    summary,
    combo: summary.byCompressionCombo[args.comboId] ?? { count: 0, tokensSaved: 0 },
  };
}

// T07 — RTK learn/discover exposed via MCP (read-only; suggestions only). Mines the opt-in
// raw-output sample store, exactly like the /api/context/rtk/{discover,learn} routes.
const rtkDiscoverInput = z.object({
  limit: z.number().int().positive().max(2000).optional().describe("Max samples to scan (default 500)"),
});

const rtkLearnInput = z.object({
  command: z.string().min(1).max(500).describe("The command to learn an RTK filter draft for"),
  limit: z.number().int().positive().max(2000).optional().describe("Max samples to scan (default 500)"),
});

function resolveSampleLimit(limit?: number): number {
  if (!Number.isFinite(limit) || !limit || limit <= 0) return 500;
  return Math.min(2000, Math.floor(limit));
}

export async function handleRtkDiscover(
  args: z.infer<typeof rtkDiscoverInput>
): Promise<{ sampleCount: number; candidates: ReturnType<typeof discoverRepeatedNoise> }> {
  const start = Date.now();
  const samples = listRtkCommandSamples({ limit: resolveSampleLimit(args.limit) });
  const candidates = discoverRepeatedNoise(samples);
  const result = { sampleCount: samples.length, candidates };
  await logToolCall("omniroute_rtk_discover", args, result, Date.now() - start, true);
  return result;
}

export async function handleRtkLearn(
  args: z.infer<typeof rtkLearnInput>
): Promise<{ command: string; sampleCount: number; filter: ReturnType<typeof suggestFilter> }> {
  const start = Date.now();
  const command = args.command.trim();
  const targetId = commandToId(command);
  const matching = listRtkCommandSamples({ limit: resolveSampleLimit(args.limit) }).filter(
    (sample) => commandToId(sample.command) === targetId
  );
  const filter = suggestFilter(command, matching);
  const result = { command, sampleCount: matching.length, filter };
  await logToolCall("omniroute_rtk_learn", args, result, Date.now() - start, true);
  return result;
}

export const compressionTools = {
  omniroute_compression_status: {
    name: "omniroute_compression_status",
    description:
      "Returns current compression configuration, strategy, analytics summary (requests compressed, tokens saved, avg ratio), and provider-aware cache statistics.",
    scopes: ["read:compression"],
    inputSchema: compressionStatusInput,
    handler: (args: z.infer<typeof compressionStatusInput>) => handleCompressionStatus(args),
  },
  omniroute_compression_configure: {
    name: "omniroute_compression_configure",
    description:
      "Configure compression settings at runtime. Supports enabling/disabling compression, changing strategy (off/lite/standard/aggressive/ultra/rtk/stacked), adjusting maxTokens threshold, targetRatio, auto-trigger mode, system prompt preservation, and MCP description compression.",
    scopes: ["write:compression"],
    inputSchema: compressionConfigureInput,
    handler: (args: z.infer<typeof compressionConfigureInput>) => handleCompressionConfigure(args),
  },
  omniroute_set_compression_engine: {
    name: "omniroute_set_compression_engine",
    description: "Set the active compression engine and Caveman/RTK runtime options.",
    scopes: ["write:compression"],
    inputSchema: setCompressionEngineInput,
    handler: (args: z.infer<typeof setCompressionEngineInput>) => handleSetCompressionEngine(args),
  },
  omniroute_list_compression_combos: {
    name: "omniroute_list_compression_combos",
    description: "List compression combos and their engine pipelines.",
    scopes: ["read:compression"],
    inputSchema: listCompressionCombosInput,
    handler: (_args: z.infer<typeof listCompressionCombosInput>) => handleListCompressionCombos(),
  },
  omniroute_compression_combo_stats: {
    name: "omniroute_compression_combo_stats",
    description: "Get compression analytics grouped by engine and compression combo.",
    scopes: ["read:compression"],
    inputSchema: compressionComboStatsInput,
    handler: (args: z.infer<typeof compressionComboStatsInput>) =>
      handleCompressionComboStats(args),
  },
  omniroute_ccr_retrieve: {
    name: "omniroute_ccr_retrieve",
    description:
      "Retrieve the verbatim content block stored by the CCR compression engine. " +
      "When a large block is compressed, a marker `[CCR retrieve hash=<24hex> chars=N]` " +
      "is inserted. Pass the hash from the marker to this tool to get the original text back. " +
      "Optional `mode` (head/tail/lines/grep/stats) retrieves a slice or summary instead of the whole block; omit for the full block. " +
      "Scope: read:compression. Always available (sticky-on).",
    scopes: ["read:compression"],
    inputSchema: ccrRetrieveInput,
    handler: async (args: z.infer<typeof ccrRetrieveInput>, extra?: McpToolExtraLike) => {
      // Retrieve must use the SAME principal the CCR store used at compression time:
      // `String(apiKeyInfo.id)` (chatCore → getApiKeyMetadata(rawKey)). On MCP HTTP
      // transports the raw key lives in httpAuthContext (not in extra.authInfo, since
      // OmniRoute auth is API-key not OAuth-clientId) — resolve it to the same key id
      // so the block is found. Without this the caller resolved to "anonymous" and the
      // store-key never matched (#5649). Cross-tenant IDOR stays closed: a different
      // key → different id → miss; no key → undefined → anonymous bucket only.
      const apiKeyPrincipal = await resolveMcpCallerApiKeyId();
      if (apiKeyPrincipal) {
        return handleCcrRetrieve(args, apiKeyPrincipal);
      }
      // Fallback (unchanged): OAuth clientId / session scope context, then anonymous.
      const { callerId } = resolveCallerScopeContext(extra, ["read:compression"]);
      return handleCcrRetrieve(args, callerId === "anonymous" ? undefined : callerId);
    },
  },
  omniroute_rtk_discover: {
    name: "omniroute_rtk_discover",
    description:
      "Mine the opt-in RTK raw-output sample store for recurring noise lines and return them " +
      "as ranked candidates the operator can turn into strip/collapse filters. Read-only; " +
      "suggestions only. Scope: read:compression.",
    scopes: ["read:compression"],
    inputSchema: rtkDiscoverInput,
    handler: (args: z.infer<typeof rtkDiscoverInput>) => handleRtkDiscover(args),
  },
  omniroute_rtk_learn: {
    name: "omniroute_rtk_learn",
    description:
      "Suggest an RTK filter draft for a specific command, learned from that command's captured " +
      "outputs in the opt-in raw-output sample store. Read-only; returns a draft for the operator " +
      "to review and save. Scope: read:compression.",
    scopes: ["read:compression"],
    inputSchema: rtkLearnInput,
    handler: (args: z.infer<typeof rtkLearnInput>) => handleRtkLearn(args),
  },
};
