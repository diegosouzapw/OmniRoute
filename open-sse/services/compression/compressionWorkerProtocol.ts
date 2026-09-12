import type { CompressionConfig, CompressionMode, CompressionResult } from "./types.ts";
import type { StackedCompressionStep } from "./strategySelector.ts";
import type {
  CompressionStage,
  CompressionWireFormat,
  ImageTransportFidelity,
} from "./engines/types.ts";

export interface CompressionWorkerOptions {
  model?: string;
  supportsVision?: boolean | null;
  providerTransport?: "direct" | "aggregator";
  provider?: string;
  imageTransportFidelity?: ImageTransportFidelity;
  sourceFormat?: CompressionWireFormat;
  targetFormat?: CompressionWireFormat;
  compressionStage?: CompressionStage;
  config?: CompressionConfig;
}
export interface CompressionWorkerJob {
  id: number;
  body: Record<string, unknown>;
  mode: CompressionMode;
  options?: CompressionWorkerOptions;
}
export type CompressionWorkerMessage =
  | { id: number; type: "step"; step: StackedCompressionStep }
  | { id: number; type: "result"; result: CompressionResult }
  | { id: number; type: "error"; error: string };

const WORKER_STACK_ENGINES = new Set(["caveman", "rtk", "standard"]);
export function isCompressionWorkerEligible(
  mode: CompressionMode,
  options?: CompressionWorkerOptions
): boolean {
  if (mode !== "standard" && mode !== "rtk" && mode !== "stacked") return false;
  if (mode === "stacked") {
    const pipeline = options?.config?.stackedPipeline;
    if (!Array.isArray(pipeline) || pipeline.length === 0) return false;
    if (
      pipeline.some((step) => {
        const engine = typeof step === "string" ? step : step.engine;
        return !WORKER_STACK_ENGINES.has(engine);
      })
    ) {
      return false;
    }
  }
  return true;
}
