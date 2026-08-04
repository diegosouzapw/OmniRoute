import { preserveSpans, restorePreservedBlocks, type PreservedBlock } from "../preservation.ts";
import { detectRiskSpans, type RiskGateConfig } from "./riskGate.ts";
import type { RiskCategory } from "./riskPatterns.ts";

export interface RiskGateStats {
  spansProtected: number;
  categories: Partial<Record<RiskCategory, number>>;
}

export interface RiskMaskResult {
  maskedBody: Record<string, unknown>;
  blocks: PreservedBlock[];
  stats: RiskGateStats;
}

interface TextPart {
  type?: string;
  text?: string;
}

/** Mask one content string; returns masked text + blocks + per-category counts. */
function maskString(
  text: string,
  cfg: RiskGateConfig,
  tally: Partial<Record<RiskCategory, number>>
): { masked: string; blocks: PreservedBlock[] } {
  const spans = detectRiskSpans(text, cfg);
  if (!spans.length) return { masked: text, blocks: [] };
  for (const s of spans) tally[s.category] = (tally[s.category] ?? 0) + 1;
  const { text: masked, blocks } = preserveSpans(
    text,
    spans.map((s) => ({ start: s.start, end: s.end, kind: `risk_${s.category}` }))
  );
  return { masked, blocks };
}

/**
 * Mask risky spans in every message content (string or `{type:"text"}` parts).
 * Pure: clones touched messages, leaves the original body unmutated. Fail-open.
 */
export function applyRiskMask(body: Record<string, unknown>, cfg: RiskGateConfig): RiskMaskResult {
  const tally: Partial<Record<RiskCategory, number>> = {};
  const allBlocks: PreservedBlock[] = [];
  const messages = body.messages;
  if (!Array.isArray(messages)) {
    return { maskedBody: body, blocks: [], stats: { spansProtected: 0, categories: {} } };
  }

  let changed = false;
  const maskedMessages = messages.map((msg) => {
    const m = msg as { role?: unknown; content?: unknown };
    if (typeof m.content === "string") {
      const { masked, blocks } = maskString(m.content, cfg, tally);
      if (!blocks.length) return msg;
      changed = true;
      allBlocks.push(...blocks);
      return { ...m, content: masked };
    }
    if (Array.isArray(m.content)) {
      let partChanged = false;
      const parts = (m.content as TextPart[]).map((p) => {
        if (p && p.type === "text" && typeof p.text === "string") {
          const { masked, blocks } = maskString(p.text, cfg, tally);
          if (!blocks.length) return p;
          partChanged = true;
          allBlocks.push(...blocks);
          return { ...p, text: masked };
        }
        return p;
      });
      if (!partChanged) return msg;
      changed = true;
      return { ...m, content: parts };
    }
    return msg;
  });

  const maskedBody = changed ? { ...body, messages: maskedMessages } : body;
  return {
    maskedBody,
    blocks: allBlocks,
    stats: { spansProtected: allBlocks.length, categories: tally },
  };
}

/** Restore every masked span in the (possibly compressed) body. Fail-open. */
export function restoreRiskBlocks(
  body: Record<string, unknown>,
  blocks: PreservedBlock[]
): Record<string, unknown> {
  if (!blocks.length) return body;
  const messages = body.messages;
  if (!Array.isArray(messages)) return body;
  const restoreParts = (content: unknown): unknown => {
    if (typeof content === "string") return restorePreservedBlocks(content, blocks);
    if (Array.isArray(content)) {
      return (content as TextPart[]).map((p) =>
        p && p.type === "text" && typeof p.text === "string"
          ? { ...p, text: restorePreservedBlocks(p.text, blocks) }
          : p
      );
    }
    return content;
  };
  return {
    ...body,
    messages: messages.map((msg) => {
      const m = msg as { content?: unknown };
      if (typeof m.content === "string" || Array.isArray(m.content)) {
        return { ...m, content: restoreParts(m.content) };
      }
      return msg;
    }),
  };
}
