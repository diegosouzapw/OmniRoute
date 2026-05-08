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

export const compressionTools = {
  omniroute_compression_status: {
    name: "omniroute_compression_status",
    description:
      "Returns current compression configuration, strategy, analytics summary (requests compressed, tokens saved, avg ratio), and provider-aware cache statistics.",
    inputSchema: compressionStatusInput,
    handler: (args: z.infer<typeof compressionStatusInput>) => handleCompressionStatus(args),
  },
  omniroute_compression_configure: {
    name: "omniroute_compression_configure",
    description:
      "Configure compression settings at runtime. Supports enabling/disabling compression, changing strategy (off/lite/standard/aggressive/ultra/rtk/stacked), adjusting maxTokens threshold, targetRatio, auto-trigger mode, system prompt preservation, and MCP description compression.",
    inputSchema: compressionConfigureInput,
    handler: (args: z.infer<typeof compressionConfigureInput>) => handleCompressionConfigure(args),
  },
  omniroute_set_compression_engine: {
    name: "omniroute_set_compression_engine",
    description: "Set the active compression engine and Caveman/RTK runtime options.",
    inputSchema: setCompressionEngineInput,
    handler: (args: z.infer<typeof setCompressionEngineInput>) => handleSetCompressionEngine(args),
  },
  omniroute_list_compression_combos: {
    name: "omniroute_list_compression_combos",
    description: "List compression combos and their engine pipelines.",
    inputSchema: listCompressionCombosInput,
    handler: (_args: z.infer<typeof listCompressionCombosInput>) => handleListCompressionCombos(),
  },
  omniroute_compression_combo_stats: {
    name: "omniroute_compression_combo_stats",
    description: "Get compression analytics grouped by engine and compression combo.",
    inputSchema: compressionComboStatsInput,
    handler: (args: z.infer<typeof compressionComboStatsInput>) =>
      handleCompressionComboStats(args),
  },
};
