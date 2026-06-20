import { ENGINE_CATALOG, engineMeta } from "./engineCatalog.ts";
import type { EngineToggle } from "./types.ts";

/** Maps single-mode engine ids to the effective CompressionMode name. */
const SINGLE_MODE_OF: Record<string, string> = {
  lite: "lite",
  caveman: "standard",
  aggressive: "aggressive",
  ultra: "ultra",
  rtk: "rtk",
};

export interface DerivedPlan {
  mode: string;
  stackedPipeline: Array<{ engine: string; intensity?: string }>;
}

/**
 * Derives the effective compression plan from the per-engine toggle map.
 *
 * Rules (evaluated in order):
 *  1. masterEnabled=false OR no engines on  → { mode:"off", stackedPipeline:[] }
 *  2. Exactly one engine on AND it is single-mode → that engine's standalone mode
 *  3. Otherwise → { mode:"stacked", stackedPipeline: enabled engines sorted by stackPriority }
 */
export function deriveDefaultPlan(
  engines: Record<string, EngineToggle>,
  masterEnabled: boolean,
): DerivedPlan {
  if (!masterEnabled) return { mode: "off", stackedPipeline: [] };

  const onIds = Object.keys(ENGINE_CATALOG).filter((id) => engines[id]?.enabled === true);

  if (onIds.length === 0) return { mode: "off", stackedPipeline: [] };

  if (onIds.length === 1 && engineMeta(onIds[0]).isSingleMode) {
    return { mode: SINGLE_MODE_OF[onIds[0]], stackedPipeline: [] };
  }

  const ordered = onIds.sort((a, b) => engineMeta(a).stackPriority - engineMeta(b).stackPriority);

  const stackedPipeline = ordered.map((id) => {
    const level = engines[id]?.level;
    return level ? { engine: id, intensity: level } : { engine: id };
  });

  return { mode: "stacked", stackedPipeline };
}
