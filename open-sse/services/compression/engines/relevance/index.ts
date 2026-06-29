import { createCompressionStats } from "../../stats.ts";
import type { CompressionResult } from "../../types.ts";
import type { CompressionEngine } from "../types.ts";
import { FORCE_PRESERVE_RE } from "../../ultraHeuristic.ts";
import { RELEVANCE_SCHEMA, validateRelevanceConfig, resolveRelevanceConfig } from "./configSchema.ts";
import { scoreSentences } from "./scorer.ts";

const SENTENCE_SPLIT_RE = /(?<=[.!?])\s+/;

function extractText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((block) => {
        if (block && typeof block === "object" && "text" in block) {
          return String((block as { text: unknown }).text);
        }
        return "";
      })
      .join(" ");
  }
  return "";
}

function splitSentences(text: string): string[] {
  return text.split(SENTENCE_SPLIT_RE).filter((s) => s.trim().length > 0);
}

function applyRelevanceToText(
  text: string,
  query: string,
  cfg: ReturnType<typeof resolveRelevanceConfig>
): { result: string; changed: boolean } {
  const sentences = splitSentences(text);
  if (sentences.length <= 1) return { result: text, changed: false };

  const scores = scoreSentences(sentences, query, cfg);
  const totalChars = text.length;
  const budget = Math.floor(totalChars * cfg.budgetPercent);

  const indexed = sentences.map((s, i) => ({ s, i, score: scores[i] }));
  const sorted = [...indexed].sort((a, b) => b.score - a.score);

  let kept = 0;
  const keepSet = new Set<number>();

  for (const { s, i, score } of sorted) {
    if (FORCE_PRESERVE_RE.test(s)) {
      keepSet.add(i);
      kept += s.length + 1;
      continue;
    }
    if (kept >= budget) continue;
    if (score >= cfg.overlapThreshold || kept < budget) {
      keepSet.add(i);
      kept += s.length + 1;
    }
  }

  if (keepSet.size === sentences.length) return { result: text, changed: false };

  const ordered = indexed.filter(({ i }) => keepSet.has(i)).sort((a, b) => a.i - b.i);
  const result = ordered.map(({ s }) => s).join(" ");
  return { result, changed: result !== text };
}

export const relevanceEngine: CompressionEngine = {
  id: "relevance",
  name: "Relevance",
  description: "Extractive sentence scoring against the last user query.",
  icon: "target",
  targets: ["messages"],
  stackable: true,
  stackPriority: 18,
  metadata: {
    id: "relevance",
    name: "Relevance",
    description: "Extractive sentence scoring against the last user query.",
    inputScope: "messages",
    targetLatencyMs: 2,
    supportsPreview: true,
    stable: true,
  },

  apply(body, options): CompressionResult {
    try {
      const messages = body.messages;
      if (!Array.isArray(messages)) return { body, compressed: false, stats: null };

      const cfg = resolveRelevanceConfig((options?.stepConfig as Record<string, unknown>) ?? {});

      let query = "";
      for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i] as Record<string, unknown>;
        if (msg.role === "user") {
          query = extractText(msg.content).trim();
          break;
        }
      }

      if (!query) return { body, compressed: false, stats: null };

      let anyChanged = false;
      const newMessages = messages.map((msg) => {
        const m = msg as Record<string, unknown>;
        if (m.role !== "user") return msg;

        const text = extractText(m.content);
        const { result, changed } = applyRelevanceToText(text, query, cfg);
        if (!changed) return msg;
        anyChanged = true;

        if (typeof m.content === "string") {
          return { ...m, content: result };
        }
        if (Array.isArray(m.content)) {
          const newContent = m.content.map((block) => {
            if (block && typeof block === "object" && "text" in block) {
              return { ...(block as object), text: result };
            }
            return block;
          });
          return { ...m, content: newContent };
        }
        return msg;
      });

      if (!anyChanged) return { body, compressed: false, stats: null };

      const newBody = { ...body, messages: newMessages };
      const stats = createCompressionStats(body, newBody, "stacked", ["relevance-extract"]);
      return { body: newBody, compressed: true, stats };
    } catch {
      return { body, compressed: false, stats: null };
    }
  },

  compress(body, config) {
    return this.apply(body, { stepConfig: config });
  },

  getConfigSchema() {
    return RELEVANCE_SCHEMA;
  },

  validateConfig(config) {
    return validateRelevanceConfig(config);
  },
};
