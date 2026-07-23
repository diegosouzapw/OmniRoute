import { createCompressionStats } from "../../stats.ts";
import type { CompressionResult } from "../../types.ts";
import type { CompressionEngine } from "../types.ts";
import { RELEVANCE_SCHEMA, validateRelevanceConfig, resolveRelevanceConfig } from "./configSchema.ts";
import { scoreSentences } from "./scorer.ts";

// Sentence-level "never drop" guard. We canNOT reuse ultraHeuristic's FORCE_PRESERVE_RE
// here: that token-level pattern includes `[._/\\]`, which matches the period ending EVERY
// prose sentence — gating on it would force-preserve everything and make the engine a
// permanent no-op (the same trap #17's UNIT_PRESERVE_RE avoids). Anchor on real signals:
// digits, URLs, error prefixes, code fences, stack `at`-frames, multi-segment paths, key=value.
const SENTENCE_PRESERVE_RE =
  /\d|https?:\/\/|(?:Error|Exception|TypeError|RangeError|SyntaxError|ReferenceError|Traceback):|```|^\s*at\s|\/[\w.-]+\/|\w+=\S/i;

// Split AFTER the sentence-final punctuation + its trailing whitespace, keeping that
// whitespace attached to the preceding sentence so a rejoin with "" preserves the
// original paragraph/line structure (e.g. `\n\n` between sentences survives).
const SENTENCE_SPLIT_RE = /(?<=[.!?]\s)/;

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

  const keepSet = new Set<number>();

  // 1) Force-preserved sentences (errors / code / numbers / URLs) are kept unconditionally
  //    and are "free" — they do NOT consume the budget, so they cannot starve the
  //    highest-relevance content (core-review issue: force-preserve starvation).
  for (const { s, i } of indexed) {
    if (SENTENCE_PRESERVE_RE.test(s)) keepSet.add(i);
  }

  // 2) Greedily admit non-force sentences by score desc, gated by overlapThreshold, until
  //    the budget fills. The array is sorted desc, so once below budget we can break.
  //    (Previously the threshold was dead code behind `|| kept < budget`.)
  let kept = 0;
  for (const { s, i, score } of sorted) {
    if (keepSet.has(i)) continue;
    if (kept >= budget) break;
    if (score >= cfg.overlapThreshold) {
      keepSet.add(i);
      kept += s.length + 1;
    }
  }

  // 3) Never drop everything: keep at least the single highest-scoring sentence.
  if (keepSet.size === 0 && sorted.length > 0) keepSet.add(sorted[0].i);

  if (keepSet.size === sentences.length) return { result: text, changed: false };

  const ordered = indexed.filter(({ i }) => keepSet.has(i)).sort((a, b) => a.i - b.i);
  const result = ordered.map(({ s }) => s).join("");
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

      // Note: the query is a string snapshot taken BEFORE compression, so compressing the
      // last user message against it is NOT circular — and that message commonly carries
      // the pasted context the feature is meant to trim ("docs longos colados"). So we do
      // NOT skip it (a core-review suggestion to skip the query message was rejected: it
      // would no-op the dominant single-message RAG use case).
      let anyChanged = false;
      const newMessages = messages.map((msg) => {
        const m = msg as Record<string, unknown>;
        if (m.role !== "user") return msg;

        // String content: compress in place.
        if (typeof m.content === "string") {
          const { result, changed } = applyRelevanceToText(m.content, query, cfg);
          if (!changed) return msg;
          anyChanged = true;
          return { ...m, content: result };
        }
        // Array/multimodal content: only safe when there is EXACTLY ONE text block.
        // Joining all text blocks and stamping the result into each would duplicate and
        // scramble per-block content (core-review issue: multimodal corruption).
        if (Array.isArray(m.content)) {
          const textBlocks = m.content.filter(
            (b) => b && typeof b === "object" && "text" in b
          );
          if (textBlocks.length !== 1) return msg; // 0 or ≥2 text blocks ⇒ no-op
          const { result, changed } = applyRelevanceToText(
            String((textBlocks[0] as { text: unknown }).text),
            query,
            cfg
          );
          if (!changed) return msg;
          anyChanged = true;
          const newContent = m.content.map((block) =>
            block === textBlocks[0]
              ? { ...(block as object), text: result }
              : block
          );
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
