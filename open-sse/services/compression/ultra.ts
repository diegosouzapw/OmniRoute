import { pruneByScore } from "./ultraHeuristic.ts";
import { extractPreservedBlocks } from "./preservation.ts";
import { DEFAULT_ULTRA_CONFIG } from "./types.ts";
import type { UltraConfig, CompressionStats, CompressionMode } from "./types.ts";
import { extractTextContent, mapTextContent, type ChatMessageLike } from "./messageContent.ts";
import { slmAvailable, runLlmlinguaUltra } from "./engines/llmlingua/ultraEntry.ts";

const COMPRESSED_PREFIX = "[COMPRESSED:";

/**
 * Async sibling of `mapTextContent`: applies an async transform to each text part
 * of a message's content (string content → single call; array content → each
 * `{type:"text"}` part). Non-text parts and structure are preserved exactly.
 */
async function mapTextContentAsync(
  msg: Message,
  fn: (text: string) => Promise<string>
): Promise<Message> {
  if (typeof msg.content === "string") {
    return { ...msg, content: await fn(msg.content) };
  }
  if (Array.isArray(msg.content)) {
    const next: unknown[] = [];
    for (const part of msg.content) {
      const p = part as Record<string, unknown>;
      if (p && p["type"] === "text" && typeof p["text"] === "string") {
        next.push({ ...p, text: await fn(p["text"] as string) });
      } else {
        next.push(part);
      }
    }
    return { ...msg, content: next };
  }
  return msg;
}

/**
 * Prune PROSE only. Fenced code, inline code, URLs, CONST_CASE, versions, etc. are
 * tombstoned by `extractPreservedBlocks` and re-stitched verbatim, so the heuristic
 * NEVER mangles structured content (mirrors caveman.ts / llmlingua/index.ts).
 *
 * Without this, `pruneByScore` tokenizes the whole text and drops low-score tokens
 * (`b)`, `{`, `+`, …) inside code blocks, corrupting them while leaving the fence
 * markers intact — output that looks like valid code but isn't (B-ULTRA-CODE).
 */
function pruneProseOnly(text: string, rate: number, minScore: number): string {
  const { text: withPlaceholders, blocks } = extractPreservedBlocks(text);
  if (blocks.length === 0) return pruneByScore(text, rate, minScore);

  const placeholderToContent = new Map(blocks.map((b) => [b.placeholder, b.content]));
  const escaped = blocks.map((b) => b.placeholder.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const splitRe = new RegExp(`(${escaped.join("|")})`, "g");

  return withPlaceholders
    .split(splitRe)
    .map((part) => {
      if (!part) return "";
      const preserved = placeholderToContent.get(part);
      if (preserved !== undefined) return preserved; // verbatim — never pruned
      return pruneByScore(part, rate, minScore); // prose only
    })
    .join("");
}

/**
 * Compress one prose string with the SLM, preserving code/math/URLs verbatim.
 * Reuses `extractPreservedBlocks` (same tombstoning as `pruneProseOnly`), sends
 * ONLY prose to the worker backend, and re-stitches preserved blocks unchanged.
 * Any backend failure (throw / no-op) falls back to the Tier-A heuristic for that
 * segment, so the SLM NEVER touches structured content and NEVER fails the segment.
 */
async function compressProseSlm(text: string, cfg: UltraConfig): Promise<string> {
  const { text: withPlaceholders, blocks } = extractPreservedBlocks(text);
  if (blocks.length === 0) {
    return slmOrHeuristic(text, cfg);
  }
  const placeholderToContent = new Map(blocks.map((b) => [b.placeholder, b.content]));
  const escaped = blocks.map((b) => b.placeholder.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const splitRe = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = withPlaceholders.split(splitRe);
  const out: string[] = [];
  for (const part of parts) {
    if (!part) {
      out.push("");
      continue;
    }
    const preserved = placeholderToContent.get(part);
    if (preserved !== undefined) {
      out.push(preserved); // verbatim — never sent to the model
    } else {
      out.push(await slmOrHeuristic(part, cfg));
    }
  }
  return out.join("");
}

/** Run the SLM on a prose segment; on throw/no-op, fall back to the Tier-A pruner for it. */
async function slmOrHeuristic(prose: string, cfg: UltraConfig): Promise<string> {
  try {
    return await runLlmlinguaUltra(prose, {
      model: cfg.modelPath ? undefined : undefined,
      compressionRate: cfg.compressionRate,
      modelPath: cfg.modelPath,
    });
  } catch {
    return pruneByScore(prose, cfg.compressionRate, cfg.minScoreThreshold);
  }
}

export interface UltraCompressResult {
  messages: Array<{ role: string; content?: string | unknown[]; [key: string]: unknown }>;
  stats: CompressionStats;
}

type Message = ChatMessageLike;

/** Tier the ultra resolver records on the stats. */
export type UltraTier = "slm" | "heuristic-fallback" | "heuristic";

/**
 * Tier-A heuristic ultra (PURE, SYNCHRONOUS). Identical to the pre-B behaviour.
 * Used directly by the stacked sync engine (`cavemanAdapter`) and as the fallback
 * tier inside `ultraCompress`. `tier` lets the async resolver tag the resolved
 * tier as either "heuristic" (chosen directly) or "heuristic-fallback" (SLM failed).
 */
export function ultraCompressHeuristic(
  messages: Message[],
  config: Partial<UltraConfig> = {},
  tier: UltraTier = "heuristic"
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
      const pruned = pruneProseOnly(textPart, compressionRate, minScoreThreshold);
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
    ultraTier: tier,
  };

  return { messages: compressed, stats };
}

/**
 * Ultra compression with the two-tier resolver (Phase 4, Sub-project B).
 *
 * - `ultraEngine: "slm"` AND `slmAvailable()` → route prose through the SLM worker
 *   backend (Tier-B). On timeout / worker error / load failure / no-op → fall back
 *   to the Tier-A heuristic for THIS request and record "heuristic-fallback".
 * - otherwise → Tier-A heuristic ("heuristic").
 *
 * The structure-preservation wrapper (`extractPreservedBlocks` / re-stitch, inside
 * `pruneProseOnly` for Tier-A and `splitProseAndPreserved` inside the worker engine
 * path for Tier-B) wraps BOTH tiers, so code/math/URLs stay verbatim regardless.
 * A request is NEVER failed or left uncompressed because the SLM was unavailable.
 */
export async function ultraCompress(
  messages: Message[],
  config: Partial<UltraConfig> & { ultraEngine?: "heuristic" | "slm" } = {}
): Promise<UltraCompressResult> {
  if (config.ultraEngine !== "slm" || !slmAvailable()) {
    return ultraCompressHeuristic(messages, config, "heuristic");
  }

  const start = Date.now();
  const effectiveConfig: UltraConfig = { ...DEFAULT_ULTRA_CONFIG, ...config };
  const { maxTokensPerMessage } = effectiveConfig;

  let originalChars = 0;
  let compressedChars = 0;
  let anySlm = false;

  try {
    const compressed: Message[] = [];
    for (const msg of messages) {
      if (effectiveConfig.preserveSystemPrompt !== false && msg.role === "system") {
        compressed.push(msg);
        continue;
      }
      const text = extractTextContent(msg.content);
      if (!text || text.startsWith(COMPRESSED_PREFIX)) {
        compressed.push(msg);
        continue;
      }
      if (maxTokensPerMessage > 0 && Math.ceil(text.length / 4) <= maxTokensPerMessage) {
        compressed.push(msg);
        continue;
      }

      let messageOriginalChars = 0;
      let messageCompressedChars = 0;
      const next = (await mapTextContentAsync(msg, async (textPart) => {
        if (!textPart || textPart.startsWith(COMPRESSED_PREFIX)) return textPart;
        messageOriginalChars += textPart.length;
        const out = await compressProseSlm(textPart, effectiveConfig);
        if (out !== textPart) anySlm = true;
        messageCompressedChars += out.length;
        return out;
      })) as Message;
      originalChars += messageOriginalChars;
      compressedChars += messageCompressedChars;
      compressed.push(next);
    }

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
      techniquesUsed: anySlm ? ["ultra-slm"] : ["ultra-heuristic-pruning"],
      mode: "ultra" as CompressionMode,
      timestamp: Date.now(),
      durationMs: Date.now() - start,
      ultraTier: anySlm ? "slm" : "heuristic-fallback",
    };
    return { messages: compressed, stats };
  } catch {
    // Any unexpected error in the SLM path → whole-request fail-open to Tier-A.
    return ultraCompressHeuristic(messages, config, "heuristic-fallback");
  }
}
