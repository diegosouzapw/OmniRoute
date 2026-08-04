import type { CompressionResult } from "../types.ts";
import type { CompressionConfig } from "../types.ts";
import { applyRiskMask, restoreRiskBlocks } from "./riskGateStep.ts";
import type { RiskGateConfig } from "./riskGate.ts";

/** Resolve the effective risk-gate config (explicit option wins over config); enabled-gated. */
export function resolveRiskGate(options?: {
  riskGate?: RiskGateConfig;
  config?: CompressionConfig;
}): RiskGateConfig | undefined {
  const rg = options?.riskGate ?? options?.config?.riskGate;
  return rg?.enabled ? rg : undefined;
}

function attach(
  result: CompressionResult,
  mask: ReturnType<typeof applyRiskMask>
): CompressionResult {
  if (mask.blocks.length) result.body = restoreRiskBlocks(result.body, mask.blocks);
  if (result.stats) result.stats.riskGate = mask.stats;
  return result;
}

/** Outer mask→run→restore wrapper for a sync compression entry point. Byte-identical when gate absent. */
export function withRiskGate(
  body: Record<string, unknown>,
  riskGate: RiskGateConfig | undefined,
  run: (b: Record<string, unknown>) => CompressionResult
): CompressionResult {
  if (!riskGate) return run(body);
  const mask = applyRiskMask(body, riskGate);
  return attach(run(mask.maskedBody), mask);
}

/** Async variant of withRiskGate. */
export async function withRiskGateAsync(
  body: Record<string, unknown>,
  riskGate: RiskGateConfig | undefined,
  run: (b: Record<string, unknown>) => Promise<CompressionResult>
): Promise<CompressionResult> {
  if (!riskGate) return run(body);
  const mask = applyRiskMask(body, riskGate);
  return attach(await run(mask.maskedBody), mask);
}
