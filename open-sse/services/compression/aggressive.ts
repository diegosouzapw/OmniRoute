import type { AggressiveConfig, CompressionStats, Summarizer } from "./types.ts";
import { DEFAULT_AGGRESSIVE_CONFIG } from "./types.ts";
import { compressToolResult } from "./toolResultCompressor.ts";
import { applyAging } from "./progressiveAging.ts";
import { RuleBasedSummarizer } from "./summarizer.ts";
import { cavemanCompress } from "./caveman.ts";
import { applyLiteCompression } from "./lite.ts";
import { extractTextContent, replaceTextContent, type ChatMessageLike } from "./messageContent.ts";

const COMPRESSED_MARKER_RE = /^\[COMPRESSED:/;

type ChatMessage = ChatMessageLike;

interface AggressiveCompressionResult {
  messages: ChatMessage[];
  stats: CompressionStats;
}

function setContent(msg: ChatMessage, newContent: string): ChatMessage {
  return replaceTextContent(msg, newContent) as ChatMessage;
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function compressAggressive(
  messages: ChatMessage[],
  config?: Partial<AggressiveConfig>,
  stats?: CompressionStats
): AggressiveCompressionResult {
  const cfg: AggressiveConfig = {
    ...DEFAULT_AGGRESSIVE_CONFIG,
    ...config,
    thresholds: { ...DEFAULT_AGGRESSIVE_CONFIG.thresholds, ...(config?.thresholds ?? {}) },
    toolStrategies: {
      ...DEFAULT_AGGRESSIVE_CONFIG.toolStrategies,
      ...(config?.toolStrategies ?? {}),
    },
  };

  const summarizer: Summarizer = new RuleBasedSummarizer();

  const resultStats: CompressionStats = stats ?? {
    originalTokens: 0,
    compressedTokens: 0,
    savingsPercent: 0,
    techniquesUsed: [],
    mode: "aggressive",
    timestamp: Date.now(),
  };

  const originalTokens = messages.reduce(
    (sum, m) => sum + estimateTokens(extractTextContent(m.content)),
    0
  );
  resultStats.originalTokens = originalTokens;

  let currentMessages = [...messages];
  let summarizerSavings = 0;
  let toolResultSavings = 0;
  let agingSavings = 0;

  // Step 1: Tool-result compression
  try {
    const afterToolResult = currentMessages.map((msg) => {
      if (cfg.preserveSystemPrompt !== false && msg.role === "system") return msg;
      if (msg.role !== "tool" && msg.role !== "function") return msg;
      const text = extractTextContent(msg.content);
      if (!text || COMPRESSED_MARKER_RE.test(text)) return msg;

      const result = compressToolResult(text, cfg.toolStrategies);
      if (result.strategy === "none" || result.saved <= 0) return msg;

      toolResultSavings += result.saved;
      return setContent(msg, result.compressed);
    });
    currentMessages = afterToolResult;
  } catch (err) {
    // Downgrade: skip tool-result compression, continue pipeline
  }

  // Step 2: Progressive aging
  try {
    const agingResult = applyAging(
      currentMessages,
      cfg.thresholds,
      summarizer,
      cfg.preserveSystemPrompt !== false
    );
    agingSavings = agingResult.saved;
    currentMessages = agingResult.messages as ChatMessage[];
  } catch (err) {
    // Downgrade: skip aging, continue with current messages
  }

  // Step 3: Fallback summarizer for remaining long messages
  if (cfg.summarizerEnabled) {
    try {
      currentMessages = currentMessages.map((msg) => {
        if (cfg.preserveSystemPrompt !== false && msg.role === "system") return msg;
        const text = extractTextContent(msg.content);
        if (!text || COMPRESSED_MARKER_RE.test(text)) return msg;
        if (text.length <= cfg.maxTokensPerMessage * 4) return msg;

        const summary = summarizer.summarize([msg], {
          maxLen: cfg.maxTokensPerMessage,
          preserveCode: true,
        });
        if (summary && summary.length < text.length) {
          summarizerSavings += estimateTokens(text) - estimateTokens(summary);
          return setContent(msg, `[COMPRESSED:summary] ${summary}`);
        }
        return msg;
      });
    } catch (err) {
      // Downgrade: skip fallback summarizer
    }
  }

  // Downgrade chain: if total savings < threshold, try caveman then lite
  const compressedTokens = currentMessages.reduce(
    (sum, m) => sum + estimateTokens(extractTextContent(m.content)),
    0
  );
  resultStats.compressedTokens = compressedTokens;
  resultStats.savingsPercent =
    originalTokens > 0 ? ((originalTokens - compressedTokens) / originalTokens) * 100 : 0;

  if (resultStats.savingsPercent < cfg.minSavingsThreshold * 100) {
    try {
      const cavemanResult = cavemanCompress({ messages: currentMessages });
      if (cavemanResult?.compressed && cavemanResult.stats) {
        const cavemanSavings = cavemanResult.stats.savingsPercent ?? 0;
        if (cavemanSavings > resultStats.savingsPercent) {
          currentMessages = (cavemanResult.body?.messages ?? currentMessages) as ChatMessage[];
          resultStats.compressedTokens = cavemanResult.stats.compressedTokens ?? compressedTokens;
          resultStats.savingsPercent = cavemanSavings;
          resultStats.techniquesUsed.push("caveman-fallback");
        }
      }
    } catch (err) {
      // Caveman failed, try lite
    }

    try {
      const liteResult = applyLiteCompression(
        { messages: currentMessages },
        { preserveSystemPrompt: cfg.preserveSystemPrompt !== false }
      );
      if (liteResult?.compressed && liteResult.stats) {
        const liteSavings = liteResult.stats.savingsPercent ?? 0;
        if (liteSavings > resultStats.savingsPercent) {
          currentMessages = (liteResult.body?.messages ?? currentMessages) as ChatMessage[];
          resultStats.compressedTokens = liteResult.stats.compressedTokens ?? compressedTokens;
          resultStats.savingsPercent = liteSavings;
          resultStats.techniquesUsed.push("lite-fallback");
        }
      }
    } catch (err) {
      // Lite also failed, return current messages as-is
    }
  }

  resultStats.techniquesUsed.push(
    ...(toolResultSavings > 0 ? ["toolResult"] : []),
    ...(agingSavings > 0 ? ["aging"] : []),
    ...(summarizerSavings > 0 ? ["summarizer"] : [])
  );

  resultStats.aggressive = {
    summarizerSavings,
    toolResultSavings,
    agingSavings,
  };

  return { messages: currentMessages, stats: resultStats };
}

export { DEFAULT_AGGRESSIVE_CONFIG };
