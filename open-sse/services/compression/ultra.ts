import { pruneByScore } from "./ultraHeuristic.ts";
import { DEFAULT_ULTRA_CONFIG } from "./types.ts";
import type { UltraConfig, CompressionStats, CompressionMode } from "./types.ts";
import { extractTextContent, mapTextContent, type ChatMessageLike } from "./messageContent.ts";

const COMPRESSED_PREFIX = "[COMPRESSED:";

export interface SLMInterface {
  compress(text: string, rate: number): Promise<string>;
}

export function createSLMStub(): SLMInterface {
  return {
    async compress(text: string, rate: number): Promise<string> {
      return pruneByScore(text, rate);
    },
  };
}

export interface UltraCompressResult {
  messages: Array<{ role: string; content?: string | unknown[]; [key: string]: unknown }>;
  stats: CompressionStats;
}

type Message = ChatMessageLike;

export function ultraCompress(
  messages: Message[],
  config: Partial<UltraConfig> = {}
): UltraCompressResult {
  const start = Date.now();
  const effectiveConfig: UltraConfig = {
    ...DEFAULT_ULTRA_CONFIG,
    ...config,
  };
  const { compressionRate, minScoreThreshold, maxTokensPerMessage } = effectiveConfig;

  let originalChars = 0;
  let compressedChars = 0;

  const compressed = messages.map((msg) => {
    if (effectiveConfig.preserveSystemPrompt !== false && msg.role === "system") return msg;
    const text = extractTextContent(msg.content);
    if (!text) return msg;
    if (text.startsWith(COMPRESSED_PREFIX)) return msg;
    if (maxTokensPerMessage > 0 && Math.ceil(text.length / 4) <= maxTokensPerMessage) {
      return msg;
    }

    let messageOriginalChars = 0;
    let messageCompressedChars = 0;
    const next = mapTextContent(msg, (textPart) => {
      if (!textPart || textPart.startsWith(COMPRESSED_PREFIX)) return textPart;
      messageOriginalChars += textPart.length;
      const pruned = pruneByScore(textPart, compressionRate, minScoreThreshold);
      messageCompressedChars += pruned.length;
      return pruned;
    }) as Message;
    originalChars += messageOriginalChars;
    compressedChars += messageCompressedChars;
    return next;
  });

  const originalTokens = Math.ceil(originalChars / 4);
  const compressedTokens = Math.ceil(compressedChars / 4);
  const savingsPercent =
    originalTokens > 0
      ? Math.round(((originalTokens - compressedTokens) / originalTokens) * 100 * 10) / 10
      : 0;

  const stats: CompressionStats = {
    originalTokens,
    compressedTokens,
    savingsPercent,
    techniquesUsed: ["ultra-heuristic-pruning"],
    mode: "ultra" as CompressionMode,
    timestamp: Date.now(),
    durationMs: Date.now() - start,
  };

  return { messages: compressed, stats };
}
