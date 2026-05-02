import { applyLiteCompression } from "../lite.ts";
import { cavemanCompress } from "../caveman.ts";
import { compressAggressive } from "../aggressive.ts";
import { ultraCompress } from "../ultra.ts";
import { createCompressionStats } from "../stats.ts";
import type { CompressionEngine } from "./types.ts";

export const liteEngine: CompressionEngine = {
  id: "lite",
  metadata: {
    id: "lite",
    name: "Lite",
    description: "Fast whitespace, tool-result and image URL reduction.",
    inputScope: "messages",
    targetLatencyMs: 1,
    supportsPreview: true,
    stable: true,
  },
  apply(body, options) {
    return applyLiteCompression(body, {
      ...options,
      preserveSystemPrompt: options?.config?.preserveSystemPrompt !== false,
    });
  },
};

export const cavemanEngine: CompressionEngine = {
  id: "caveman",
  metadata: {
    id: "caveman",
    name: "Caveman",
    description: "Rule-based message compression with preservation and validation.",
    inputScope: "messages",
    targetLatencyMs: 1,
    supportsPreview: true,
    stable: true,
  },
  apply(body, options) {
    const cavemanConfig = {
      ...(options?.config?.cavemanConfig ?? {}),
      ...(options?.stepConfig ?? {}),
      ...(options?.config?.preserveSystemPrompt !== false
        ? {
            compressRoles: (options?.config?.cavemanConfig?.compressRoles ?? ["user"]).filter(
              (role) => role !== "system"
            ),
          }
        : {}),
    };
    return cavemanCompress(body as Parameters<typeof cavemanCompress>[0], cavemanConfig);
  },
};

export const aggressiveEngine: CompressionEngine = {
  id: "aggressive",
  metadata: {
    id: "aggressive",
    name: "Aggressive",
    description: "Summarization, tool result compression and progressive aging.",
    inputScope: "messages",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },
  apply(body, options) {
    const messages = (body.messages ?? []) as Array<{
      role: string;
      content?: string | Array<{ type: string; text?: string }>;
      [key: string]: unknown;
    }>;
    if (!Array.isArray(messages) || messages.length === 0) {
      return { body, compressed: false, stats: null };
    }
    const aggressiveConfig = {
      ...(options?.config?.aggressive ?? {}),
      ...(options?.stepConfig ?? {}),
      preserveSystemPrompt: options?.config?.preserveSystemPrompt !== false,
    };
    const result = compressAggressive(messages, aggressiveConfig);
    const compressedBody = { ...body, messages: result.messages };
    return {
      body: compressedBody,
      compressed: result.stats.savingsPercent > 0,
      stats: createCompressionStats(
        body,
        compressedBody,
        "aggressive",
        ["aggressive"],
        result.stats.rulesApplied,
        result.stats.durationMs
      ),
    };
  },
};

export const ultraEngine: CompressionEngine = {
  id: "ultra",
  metadata: {
    id: "ultra",
    name: "Ultra",
    description: "Heuristic token pruning with optional local SLM fallback.",
    inputScope: "messages",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },
  apply(body, options) {
    const messages = (body.messages ?? []) as Array<{
      role: string;
      content?: string | unknown[];
      [key: string]: unknown;
    }>;
    if (!Array.isArray(messages) || messages.length === 0) {
      return { body, compressed: false, stats: null };
    }
    const ultraConfig = {
      ...(options?.config?.ultra ?? {}),
      ...(options?.stepConfig ?? {}),
      preserveSystemPrompt: options?.config?.preserveSystemPrompt !== false,
    };
    const result = ultraCompress(messages, ultraConfig);
    const compressedBody = { ...body, messages: result.messages };
    return {
      body: compressedBody,
      compressed: result.stats.savingsPercent > 0,
      stats: createCompressionStats(
        body,
        compressedBody,
        "ultra",
        ["ultra"],
        result.stats.rulesApplied,
        result.stats.durationMs
      ),
    };
  },
};
