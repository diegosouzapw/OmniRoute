import { registerBuiltinCompressionEngines } from "./index.ts";
import { getCompressionEngine } from "./registry.ts";
import type { CompressionEngineApplyOptions } from "./types.ts";
import type { CompressionResult } from "../types.ts";

/**
 * Single-mode resolution for the async-only "omniglyph" engine. Selecting the
 * "omniglyph" mode IS the enable signal — run it alone, same pattern as the
 * "rtk" single mode. (B-MODE-ENGINE-DECOUPLE)
 *
 * Kept out of strategySelector's runCompressionAsync so the dispatcher stays
 * under the complexity gate; this helper owns the registry lookup + the
 * fail-safe pass-through when the engine (or its async entry) is unavailable.
 */
export async function applyOmniglyphSingleMode(
  body: Record<string, unknown>,
  options?: CompressionEngineApplyOptions
): Promise<CompressionResult> {
  registerBuiltinCompressionEngines();
  const engine = getCompressionEngine("omniglyph");
  if (!engine?.applyAsync) return { body, compressed: false, stats: null };
  return engine.applyAsync(body, options);
}
