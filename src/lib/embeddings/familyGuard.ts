import { resolveComboTargets } from "@omniroute/open-sse/services/combo.ts";
import { detectEmbeddingDimensionConflict } from "@omniroute/open-sse/config/embeddingRegistry.ts";

/**
 * Embedding-combo family guard.
 *
 * When an embeddings request is routed through a combo, the generic combo
 * engine fails over between targets with no notion of vector-space family.
 * If a combo mixes embedding models of different dimensions, that failover
 * silently corrupts any vector store built on top of the proxy (vectors from
 * different models are not comparable).
 *
 * This resolves the combo's full leaf-target list (nested combos expanded) and
 * reports whether those targets span more than one known dimension, so the
 * caller can reject the request loudly instead of corrupting data on failover.
 */
export function findEmbeddingComboDimensionConflict(
  combo: Parameters<typeof resolveComboTargets>[0],
  allCombos: Parameters<typeof resolveComboTargets>[1]
): ReturnType<typeof detectEmbeddingDimensionConflict> {
  const targets = resolveComboTargets(combo, allCombos);
  const modelStrs = targets.map((t) => t.modelStr).filter(Boolean);
  return detectEmbeddingDimensionConflict(modelStrs);
}
