/**
 * Cheap bounded admission cost features from an already-parsed request body.
 * Never re-parses, stringifies, clones, or invokes toJSON.
 */

import { estimateSizeFast } from "../../utils/estimateSize.ts";
import type { AdmissionCostFeatures } from "./types.ts";

export type AdmissionFeatureExtractionContext = {
  /** When set, wins over any body/wrapped stream field. */
  streaming?: boolean;
};

/**
 * Max tools/functions array entries inspected.
 * Uninspected tail is charged conservatively so truncation cannot undercharge cost.
 */
export const ADMISSION_TOOL_SCAN_BUDGET = 64;

type FeatureDraft = {
  messageCount: number;
  toolCount: number;
  requestedFanout: number | null;
  streaming: boolean | null;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function asArray(value: unknown): unknown[] | null {
  return Array.isArray(value) ? value : null;
}

function positiveInt(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return null;
  if (!Number.isSafeInteger(value)) {
    return Math.min(Number.MAX_SAFE_INTEGER, Math.floor(value));
  }
  return value;
}

function saturateCount(n: number): number {
  if (!Number.isFinite(n) || n <= 0) return 0;
  if (!Number.isSafeInteger(n)) {
    return Math.min(Number.MAX_SAFE_INTEGER, Math.floor(n));
  }
  return n;
}

/**
 * Count all recognized tool aliases/layers under one shared entry budget.
 * If their combined length cannot be inspected completely, saturate before indexed access
 * so an unseen alias or wrapped tail cannot undercharge heavier declarations.
 */
function countTools(layers: Array<Record<string, unknown>>): number {
  const sources: unknown[][] = [];
  const seen = new Set<unknown[]>();
  for (const layer of layers) {
    for (const value of [layer.tools, layer.functions]) {
      const source = asArray(value);
      if (!source || seen.has(source)) continue;
      seen.add(source);
      sources.push(source);
    }
  }

  let entryCount = 0;
  for (const source of sources) {
    if (source.length > ADMISSION_TOOL_SCAN_BUDGET - entryCount) {
      return Number.MAX_SAFE_INTEGER;
    }
    entryCount += source.length;
  }

  let total = 0;
  for (const source of sources) {
    for (let i = 0; i < source.length; i++) {
      const entry = source[i];
      if (isPlainObject(entry)) {
        const declarations = asArray(entry.functionDeclarations);
        if (declarations) {
          total = Math.min(Number.MAX_SAFE_INTEGER, total + saturateCount(declarations.length));
          continue;
        }
      }
      total = Math.min(Number.MAX_SAFE_INTEGER, total + 1);
    }
  }
  return total;
}

function countMessages(layer: Record<string, unknown>): number {
  const messages = asArray(layer.messages);
  const contents = asArray(layer.contents);
  const inputArr = asArray(layer.input);
  let count = Math.max(
    saturateCount(messages?.length ?? 0),
    saturateCount(contents?.length ?? 0),
    saturateCount(inputArr?.length ?? 0)
  );
  // Responses API: non-empty string `input` is one input item.
  if (count === 0 && typeof layer.input === "string" && layer.input.length > 0) {
    count = 1;
  }
  return count;
}

function readFanout(layer: Record<string, unknown>): number | null {
  const direct =
    positiveInt(layer.n) ?? positiveInt(layer.candidateCount) ?? positiveInt(layer.candidate_count);
  if (direct != null) return direct;
  // Known nested Gemini/Antigravity shape only — no recursive walk.
  if (isPlainObject(layer.generationConfig)) {
    return (
      positiveInt(layer.generationConfig.candidateCount) ??
      positiveInt(layer.generationConfig.candidate_count)
    );
  }
  return null;
}

function featureLayers(body: unknown): Array<Record<string, unknown>> {
  const top = isPlainObject(body) ? body : null;
  const wrapped = top && isPlainObject(top.request) ? top.request : null;
  const layers: Array<Record<string, unknown>> = [];
  if (top) layers.push(top);
  if (wrapped) layers.push(wrapped);
  return layers;
}

function absorbLayer(draft: FeatureDraft, layer: Record<string, unknown>): void {
  if (draft.messageCount === 0) {
    draft.messageCount = countMessages(layer);
  }
  if (draft.requestedFanout == null) {
    draft.requestedFanout = readFanout(layer);
  }
  if (draft.streaming == null && "stream" in layer) {
    draft.streaming = layer.stream === true;
  }
}

function resolveStreaming(
  draftStreaming: boolean | null,
  context?: AdmissionFeatureExtractionContext
): boolean {
  if (context && "streaming" in context && context.streaming !== undefined) {
    return context.streaming === true;
  }
  return draftStreaming ?? false;
}

/**
 * Inspect top-level fields and one known wrapper (`request`) only.
 * Prefer the first non-empty match for each feature family.
 */
export function extractAdmissionCostFeatures(
  body: unknown,
  context?: AdmissionFeatureExtractionContext
): AdmissionCostFeatures {
  const bodyBytes = estimateSizeFast(body);
  const layers = featureLayers(body);
  const draft: FeatureDraft = {
    messageCount: 0,
    toolCount: countTools(layers),
    requestedFanout: null,
    streaming: null,
  };
  for (const layer of layers) {
    absorbLayer(draft, layer);
  }

  // Conservative token estimate from already-measured body size (no re-walk/stringify).
  const estimatedInputTokens =
    bodyBytes > 0 ? Math.min(Number.MAX_SAFE_INTEGER, Math.ceil(bodyBytes / 4)) : 0;

  return {
    bodyBytes,
    estimatedInputTokens,
    messageCount: draft.messageCount,
    toolCount: draft.toolCount,
    requestedFanout: draft.requestedFanout ?? 1,
    streaming: resolveStreaming(draft.streaming, context),
  };
}
