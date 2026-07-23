/**
 * OmniRoute MCP Compression Tools — Manage and monitor prompt compression.
 *
 * Tools:
 *   1. omniroute_compression_status   — Get compression config, analytics, and cache stats
 *   2. omniroute_compression_configure — Update compression settings
 *   3. CCR lifecycle tools             — Store, retrieve, inspect, list, delete, and stats
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
  ccrStoreInput,
  ccrRetrieveInput,
  ccrInspectInput,
  ccrListInput,
  ccrDeleteInput,
  ccrStatsInput,
} from "../schemas/tools.ts";
import {
  MAX_CCR_MCP_FULL_BYTES,
  buildCcrReference,
  deleteCcrBlock,
  getCcrStoreStats,
  handleCcrRetrieve,
  inspectCcrBlock,
  listCcrBlocks,
  tryStoreBlock,
} from "../../services/compression/engines/ccr/index.ts";
import {
  listRtkCommandSamples,
  discoverRepeatedNoise,
  suggestFilter,
  commandToId,
} from "../../services/compression/engines/rtk/index.ts";
import { resolveCallerScopeContext } from "../scopeEnforcement.ts";
import { resolveMcpCallerApiKeyId } from "../mcpCallerIdentity.ts";

async function resolveCcrPrincipal(
  extra: McpToolExtraLike | undefined,
  scopes: readonly string[]
): Promise<string | undefined> {
  const apiKeyPrincipal = await resolveMcpCallerApiKeyId();
  if (apiKeyPrincipal) return apiKeyPrincipal;
  const { callerId } = resolveCallerScopeContext(extra, scopes);
  return callerId === "anonymous" ? undefined : callerId;
}

export function buildCcrStoreAuditInput(args: z.infer<typeof ccrStoreInput>) {
  return {
    bytes: Buffer.byteLength(args.content, "utf8"),
    contentType: args.contentType,
    ttlSeconds: args.ttlSeconds,
  };
}

export async function handleCcrStoreTool(
  args: z.infer<typeof ccrStoreInput>,
  extra?: McpToolExtraLike
) {
  const start = Date.now();
  const principal = await resolveCcrPrincipal(extra, ["write:compression"]);
  const result = tryStoreBlock(args.content, principal, {
    contentType: args.contentType,
    source: "mcp",
    ttlSeconds: args.ttlSeconds,
  });
  const auditInput = buildCcrStoreAuditInput(args);
  if (!result.stored) {
    const output = { stored: false as const, reason: result.reason };
    await logToolCall(
      "omniroute_ccr_store",
      auditInput,
      output,
      Date.now() - start,
      false,
      result.reason
    );
    return output;
  }
  const output = {
    stored: true as const,
    reference: buildCcrReference(result.hash, result.metadata.chars),
    metadata: result.metadata,
  };
  await logToolCall("omniroute_ccr_store", auditInput, output, Date.now() - start, true);
  return output;
}

export async function handleCcrRetrieveTool(
  args: z.infer<typeof ccrRetrieveInput>,
  extra?: McpToolExtraLike
) {
  const start = Date.now();
  const principal = await resolveCcrPrincipal(extra, ["read:compression"]);
  const metadata = inspectCcrBlock(args.hash, principal);
  if (!metadata) {
    const output = { found: false as const, error: "CCR block not found or expired" };
    await logToolCall(
      "omniroute_ccr_retrieve",
      args,
      output,
      Date.now() - start,
      false,
      "NOT_FOUND"
    );
    return output;
  }
  if ((!args.mode || args.mode === "full") && metadata.bytes > MAX_CCR_MCP_FULL_BYTES) {
    const output = {
      found: true as const,
      tooLargeForFull: true as const,
      metadata,
      suggestedModes: ["head", "tail", "lines", "grep", "stats"] as const,
    };
    await logToolCall("omniroute_ccr_retrieve", args, output, Date.now() - start, true);
    return output;
  }
  const queried = handleCcrRetrieve(args, principal);
  const refreshedMetadata = inspectCcrBlock(args.hash, principal) ?? metadata;
  const output =
    "content" in queried
      ? { found: true as const, metadata: refreshedMetadata, content: queried.content }
      : { found: true as const, metadata: refreshedMetadata, error: queried.error };
  await logToolCall(
    "omniroute_ccr_retrieve",
    args,
    {
      ...output,
      ...(typeof output.content === "string"
        ? { content: `[${Buffer.byteLength(output.content, "utf8")} bytes]` }
        : {}),
    },
    Date.now() - start,
    !("error" in output),
    "error" in output ? "INVALID_QUERY" : undefined
  );
  return output;
}

export async function handleCcrInspectTool(
  args: z.infer<typeof ccrInspectInput>,
  extra?: McpToolExtraLike
) {
  const start = Date.now();
  const principal = await resolveCcrPrincipal(extra, ["read:compression"]);
  const metadata = inspectCcrBlock(args.hash, principal);
  const output = metadata
    ? { found: true as const, reference: buildCcrReference(args.hash, metadata.chars), metadata }
    : { found: false as const };
  await logToolCall("omniroute_ccr_inspect", args, output, Date.now() - start, Boolean(metadata));
  return output;
}

export async function handleCcrListTool(
  args: z.infer<typeof ccrListInput>,
  extra?: McpToolExtraLike
) {
  const start = Date.now();
  const principal = await resolveCcrPrincipal(extra, ["read:compression"]);
  const result = listCcrBlocks(principal, args);
  const output = {
    ...result,
    entries: result.entries.map((metadata) => ({
      reference: buildCcrReference(metadata.hash, metadata.chars),
      metadata,
    })),
  };
  await logToolCall("omniroute_ccr_list", args, output, Date.now() - start, true);
  return output;
}

export async function handleCcrDeleteTool(
  args: z.infer<typeof ccrDeleteInput>,
  extra?: McpToolExtraLike
) {
  const start = Date.now();
  const principal = await resolveCcrPrincipal(extra, ["write:compression"]);
  const output = { deleted: deleteCcrBlock(args.hash, principal) };
  await logToolCall("omniroute_ccr_delete", args, output, Date.now() - start, true);
  return output;
}

export async function handleCcrStatsTool(
  args: z.infer<typeof ccrStatsInput>,
  extra?: McpToolExtraLike
) {
  const start = Date.now();
  const principal = await resolveCcrPrincipal(extra, ["read:compression"]);
  const output = getCcrStoreStats(principal);
  await logToolCall("omniroute_ccr_stats", args, output, Date.now() - start, true);
  return output;
}

export async function handleSetCompressionEngine(
  args: z.infer<typeof setCompressionEngineInput>
): Promise<{ success: boolean; settings: Record<string, unknown> }> {
  const updates: Record<string, unknown> = { enabled: true };
  const current = await getCompressionSettings();
  if (args.engine) {
    updates.defaultMode = args.engine === "caveman" ? "standard" : args.engine;
    if (args.engine === "off") {
      updates.enabled = false;
    } else if (args.engine !== "stacked") {
      const selectedEngine = args.engine === "caveman" ? "caveman" : args.engine;
      updates.engines = Object.fromEntries(
        Object.entries(current.engines).map(([id, toggle]) => [
          id,
          {
            ...toggle,
            enabled: id === selectedEngine,
            ...(id === "caveman" && args.cavemanIntensity ? { level: args.cavemanIntensity } : {}),
            ...(id === "rtk" && args.rtkIntensity ? { level: args.rtkIntensity } : {}),
          },
        ])
      );
    }
  }
  if (args.cavemanIntensity) {
    updates.cavemanConfig = {
      ...(current.cavemanConfig ?? {}),
      intensity: args.cavemanIntensity,
    };
  }
  if (args.rtkIntensity) {
    updates.rtkConfig = {
      ...(current.rtkConfig ?? {}),
      intensity: args.rtkIntensity,
    };
  }
  if (args.outputMode !== undefined) {
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
  limit: z
    .number()
    .int()
    .positive()
    .max(2000)
    .optional()
    .describe("Max samples to scan (default 500)"),
});

const rtkLearnInput = z.object({
  command: z.string().min(1).max(500).describe("The command to learn an RTK filter draft for"),
  limit: z
    .number()
    .int()
    .positive()
    .max(2000)
    .optional()
    .describe("Max samples to scan (default 500)"),
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
  omniroute_ccr_store: {
    name: "omniroute_ccr_store",
    description:
      "Store verbatim content in the caller-isolated in-memory CCR store and return a ccr:// reference plus the compatible CCR marker. Entries expire automatically and are not persisted across restarts.",
    scopes: ["write:compression"],
    inputSchema: ccrStoreInput,
    handler: handleCcrStoreTool,
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
    handler: handleCcrRetrieveTool,
  },
  omniroute_ccr_inspect: {
    name: "omniroute_ccr_inspect",
    description: "Inspect metadata for a caller-owned CCR block without returning its content.",
    scopes: ["read:compression"],
    inputSchema: ccrInspectInput,
    handler: handleCcrInspectTool,
  },
  omniroute_ccr_list: {
    name: "omniroute_ccr_list",
    description: "List paginated metadata for CCR blocks owned by the current caller.",
    scopes: ["read:compression"],
    inputSchema: ccrListInput,
    handler: handleCcrListTool,
  },
  omniroute_ccr_delete: {
    name: "omniroute_ccr_delete",
    description: "Delete a caller-owned block from the in-memory CCR store.",
    scopes: ["write:compression"],
    inputSchema: ccrDeleteInput,
    handler: handleCcrDeleteTool,
  },
  omniroute_ccr_stats: {
    name: "omniroute_ccr_stats",
    description:
      "Return caller-scoped CCR entry and byte usage, lifecycle counters, and in-memory store limits.",
    scopes: ["read:compression"],
    inputSchema: ccrStatsInput,
    handler: handleCcrStatsTool,
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
