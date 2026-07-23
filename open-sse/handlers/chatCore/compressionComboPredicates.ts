/**
 * chatCore compression-combo predicates (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Pure predicates extracted from handleChatCore's compression setup: detect the built-in
 * RTK→caveman stacked pipeline and whether a runtime combo has at least one pipeline layer.
 * No handler state is captured; behaviour is byte-identical to the previous inline closures.
 */

import type { CompressionConfig } from "../../services/compression/types.ts";

export type RuntimeCompressionCombo = {
  id: string;
  pipeline: NonNullable<CompressionConfig["stackedPipeline"]>;
  languagePacks: string[];
  outputMode: boolean;
  outputModeIntensity: string;
};

export function isBuiltinStackedPipeline(
  pipeline: CompressionConfig["stackedPipeline"] | undefined
): boolean {
  if (!Array.isArray(pipeline) || pipeline.length !== 2) return false;
  const [first, second] = pipeline;
  return (
    first?.engine === "rtk" &&
    (first.intensity === undefined || first.intensity === "standard") &&
    !first.config &&
    second?.engine === "caveman" &&
    (second.intensity === undefined || second.intensity === "full") &&
    !second.config
  );
}

export function isStackedCompressionCombo(
  compressionCombo: RuntimeCompressionCombo | null
): compressionCombo is RuntimeCompressionCombo {
  // >= 1: a single-engine default combo (user enabled exactly one layer via the per-engine config
  // page) must still apply. applyCompressionComboConfig already guards length === 0.
  return Boolean(compressionCombo && compressionCombo.pipeline.length >= 1);
}
