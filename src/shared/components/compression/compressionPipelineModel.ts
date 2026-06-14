/**
 * compressionPipelineModel — pure, deterministic reducer for editing a compression pipeline.
 *
 * All functions are side-effect-free: same inputs → same outputs.
 * Input arrays and step objects are never mutated.
 */

import type { CompressionPipelineStep } from "@omniroute/open-sse/services/compression/types.ts";

export type { CompressionPipelineStep };

export interface EngineCatalogEntry {
  id: string;
  stackPriority: number;
}

/** Look up the stackPriority for an engine id (unknown engines default to 50). */
function priority(id: string, catalog: EngineCatalogEntry[]): number {
  return catalog.find((c) => c.id === id)?.stackPriority ?? 50;
}

/**
 * Toggle an engine in/out of the pipeline.
 * - If present: remove it.
 * - If absent: add `{ engine: engineId }` then sort the whole pipeline ascending by
 *   each step's stackPriority (looked up from `catalog`; unknown → 50).
 */
export function togglePipelineStep(
  steps: CompressionPipelineStep[],
  engineId: string,
  catalog: EngineCatalogEntry[]
): CompressionPipelineStep[] {
  const existingIndex = steps.findIndex((s) => s.engine === engineId);

  if (existingIndex !== -1) {
    // Remove
    return steps.filter((_, i) => i !== existingIndex);
  }

  // Add then sort
  const added: CompressionPipelineStep[] = [
    ...steps,
    { engine: engineId as CompressionPipelineStep["engine"] },
  ];

  return added.slice().sort((a, b) => priority(a.engine, catalog) - priority(b.engine, catalog));
}

/**
 * Move a step up or down by one position. No-op at the boundaries or if engine not found.
 */
export function movePipelineStep(
  steps: CompressionPipelineStep[],
  engineId: string,
  dir: "up" | "down"
): CompressionPipelineStep[] {
  const idx = steps.findIndex((s) => s.engine === engineId);

  if (idx === -1) return steps.slice();

  if (dir === "up" && idx === 0) return steps.slice();
  if (dir === "down" && idx === steps.length - 1) return steps.slice();

  const result = steps.slice();
  const swapIdx = dir === "up" ? idx - 1 : idx + 1;
  [result[idx], result[swapIdx]] = [result[swapIdx], result[idx]];
  return result;
}

/**
 * Set the `intensity` of a step (no-op if engine not present).
 */
export function setStepIntensity(
  steps: CompressionPipelineStep[],
  engineId: string,
  intensity: string
): CompressionPipelineStep[] {
  const idx = steps.findIndex((s) => s.engine === engineId);
  if (idx === -1) return steps.slice();

  return steps.map((step, i) =>
    i === idx ? { ...step, intensity: intensity as CompressionPipelineStep["intensity"] } : step
  );
}

/**
 * Merge `config` into a step's existing config (no-op if engine not present).
 */
export function setStepConfig(
  steps: CompressionPipelineStep[],
  engineId: string,
  config: Record<string, unknown>
): CompressionPipelineStep[] {
  const idx = steps.findIndex((s) => s.engine === engineId);
  if (idx === -1) return steps.slice();

  return steps.map((step, i) =>
    i === idx ? { ...step, config: { ...step.config, ...config } } : step
  );
}

/**
 * Catalog entries whose id is NOT currently in `steps` (engines available to add).
 */
export function availableEngines(
  catalog: EngineCatalogEntry[],
  steps: CompressionPipelineStep[]
): EngineCatalogEntry[] {
  const inPipeline = new Set(steps.map((s) => s.engine));
  return catalog.filter((e) => !inPipeline.has(e.id));
}
