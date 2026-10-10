/**
 * Frozen compatibility oracle for the context estimator and image pruner.
 *
 * Verbatim copy of `estimateTokens` (tree-building `extractImageTokens` +
 * `jsonLength`) and the full-recount `pruneOlderInlineImages` loop as they
 * existed BEFORE the fused-measurement/incremental-delta optimization
 * (branched from e82d6370f1). The optimization must reproduce these outputs
 * exactly — `tests/unit/context-manager-estimation-parity.test.ts` compares
 * the live implementations against this reference over seeded structures.
 *
 * Test-only. Never import from production code. The shared block matchers are
 * imported from the live module (they are unchanged by the optimization); the
 * placeholder substitution and token budgets are copied because they are
 * private and their behavior is part of the frozen contract.
 */
import {
  isInlineBase64ImageBlock,
  isInlineBase64DocumentBlock,
} from "../../open-sse/services/contextManager.ts";
import { jsonLength } from "../../open-sse/utils/jsonSize.ts";

const CHARS_PER_TOKEN = 4;
const IMAGE_TOKEN_ESTIMATE = 1200;
const DOCUMENT_TOKEN_ESTIMATE = IMAGE_TOKEN_ESTIMATE;
const IMAGE_REMOVED_PLACEHOLDER = "[Earlier image removed to fit context window]";
const DEFAULT_KEEP_LATEST_IMAGES = 2;

function replaceImageBlockWithPlaceholder(block: Record<string, unknown>): Record<string, unknown> {
  if (block.type === "input_image") {
    return { type: "input_text", text: IMAGE_REMOVED_PLACEHOLDER };
  }
  if (block.inlineData || block.inline_data) {
    return { text: IMAGE_REMOVED_PLACEHOLDER };
  }
  return { type: "text", text: IMAGE_REMOVED_PLACEHOLDER };
}

function extractImageTokens(node: unknown, seen: Set<unknown>): { node: unknown; tokens: number } {
  if (node === null || typeof node !== "object") {
    return { node, tokens: 0 };
  }
  if (seen.has(node)) return { node, tokens: 0 };
  seen.add(node);

  if (Array.isArray(node)) {
    let tokens = 0;
    const out = node.map((item) => {
      const record =
        item && typeof item === "object" && !Array.isArray(item)
          ? (item as Record<string, unknown>)
          : null;
      if (record && isInlineBase64ImageBlock(record)) {
        tokens += IMAGE_TOKEN_ESTIMATE;
        return { __image_token_estimate__: IMAGE_TOKEN_ESTIMATE };
      }
      if (record && isInlineBase64DocumentBlock(record)) {
        tokens += DOCUMENT_TOKEN_ESTIMATE;
        return { __document_token_estimate__: DOCUMENT_TOKEN_ESTIMATE };
      }
      const result = extractImageTokens(item, seen);
      tokens += result.tokens;
      return result.node;
    });
    return { node: out, tokens };
  }

  const record = node as Record<string, unknown>;
  if (isInlineBase64ImageBlock(record)) {
    return {
      node: { __image_token_estimate__: IMAGE_TOKEN_ESTIMATE },
      tokens: IMAGE_TOKEN_ESTIMATE,
    };
  }
  if (isInlineBase64DocumentBlock(record)) {
    return {
      node: { __document_token_estimate__: DOCUMENT_TOKEN_ESTIMATE },
      tokens: DOCUMENT_TOKEN_ESTIMATE,
    };
  }

  let tokens = 0;
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    const result = extractImageTokens(value, seen);
    out[key] = result.node;
    tokens += result.tokens;
  }
  return { node: out, tokens };
}

export function referenceEstimateTokens(text: unknown): number {
  if (!text) return 0;
  if (typeof text === "string") {
    return Math.ceil(text.length / CHARS_PER_TOKEN);
  }
  const { node, tokens: imageTokens } = extractImageTokens(text, new Set());
  return Math.ceil(jsonLength(node) / CHARS_PER_TOKEN) + imageTokens;
}

function getKeepLatestImagesOverride(): number | null {
  const envValue = process.env.CONTEXT_KEEP_LATEST_IMAGES;
  if (envValue) {
    const parsed = parseInt(envValue, 10);
    if (!isNaN(parsed) && parsed >= 0) return parsed;
  }
  return null;
}

export function referencePruneOlderInlineImages(
  messages: Record<string, unknown>[],
  options: { keepLatest?: number; targetTokens?: number } = {}
): { messages: Record<string, unknown>[]; pruned: number } {
  const keepLatest =
    options.keepLatest ?? getKeepLatestImagesOverride() ?? DEFAULT_KEEP_LATEST_IMAGES;
  const targetTokens = options.targetTokens;

  const locations: Array<{ messageIndex: number; contentIndex: number }> = [];
  for (let messageIndex = 0; messageIndex < messages.length; messageIndex++) {
    const content = messages[messageIndex]?.content;
    if (!Array.isArray(content)) continue;
    for (let contentIndex = 0; contentIndex < content.length; contentIndex++) {
      const part = content[contentIndex];
      if (
        part &&
        typeof part === "object" &&
        !Array.isArray(part) &&
        isInlineBase64ImageBlock(part as Record<string, unknown>)
      ) {
        locations.push({ messageIndex, contentIndex });
      }
    }
  }

  if (locations.length <= keepLatest) {
    return { messages, pruned: 0 };
  }

  const prunable = locations.slice(0, Math.max(0, locations.length - keepLatest));
  const next = messages.map((message) => {
    if (!Array.isArray(message.content)) return message;
    return { ...message, content: [...message.content] };
  });
  let pruned = 0;

  for (const location of prunable) {
    if (targetTokens != null && referenceEstimateTokens(next) <= targetTokens) break;
    const content = next[location.messageIndex].content as unknown[];
    const block = content[location.contentIndex] as Record<string, unknown>;
    content[location.contentIndex] = replaceImageBlockWithPlaceholder(block);
    pruned += 1;
  }

  return { messages: next, pruned };
}
