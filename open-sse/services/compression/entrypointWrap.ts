import type { CompressionConfig, CompressionResult } from "./types.ts";
import type { CachingDetectionContext } from "./cachingAware.ts";
import type { RiskGateConfig } from "./riskGate/riskGate.ts";
import { resolveRiskGate, withRiskGate } from "./riskGate/strategyWrap.ts";
import {
  resolveQuantumLock,
  quantumCachingContext,
  withQuantumLock,
  withQuantumLockAsync,
} from "./quantumLock/index.ts";

export interface CompressionEntrypointOptions {
  config?: CompressionConfig;
  riskGate?: RiskGateConfig;
  cachingContext?: CachingDetectionContext;
}

export function withCompressionEntrypointGuards<T extends CompressionEntrypointOptions>(
  body: Record<string, unknown>,
  options: T | undefined,
  run: (body: Record<string, unknown>) => CompressionResult
): CompressionResult {
  return withQuantumLock(
    body,
    resolveQuantumLock(options),
    quantumCachingContext(body, options),
    (quantumBody) =>
      withRiskGate(quantumBody, resolveRiskGate(options), (riskBody) => run(riskBody))
  );
}

export function withCompressionEntrypointGuardsAsync<T extends CompressionEntrypointOptions>(
  body: Record<string, unknown>,
  options: T | undefined,
  run: (body: Record<string, unknown>) => Promise<CompressionResult>
): Promise<CompressionResult> {
  return withQuantumLockAsync(
    body,
    resolveQuantumLock(options),
    quantumCachingContext(body, options),
    run
  );
}
