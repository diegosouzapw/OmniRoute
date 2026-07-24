// Resolves the persisted per-engine DETAIL sub-object (settings.headroom / .sessionDedup /
// .ccr) for a stacked-pipeline step. Extracted out of strategySelector.ts (frozen at cap by
// file-size-baseline.json — see scripts/check/check-file-size.mjs) rather than growing that
// file inline.
//
// #8056 wired settings.headroom.minRows into buildStepOptions so the dashboard value takes
// effect even when the stacked-pipeline step itself carries no config. #8388 extends the same
// merge to session-dedup and ccr, whose detail settings previously had nowhere to persist to
// (see compressionDetailNormalizers.ts on the DB write side of the same gap).
import type { CompressionConfig, CompressionPipelineStep } from "./types.ts";

export function resolveStepDetailConfig(
  engine: CompressionPipelineStep["engine"],
  config: CompressionConfig | undefined
): Record<string, unknown> {
  switch (engine) {
    case "headroom":
      return (config?.headroom as Record<string, unknown> | undefined) ?? {};
    case "session-dedup":
      return (config?.sessionDedup as Record<string, unknown> | undefined) ?? {};
    case "ccr":
      return (config?.ccr as Record<string, unknown> | undefined) ?? {};
    default:
      return {};
  }
}
