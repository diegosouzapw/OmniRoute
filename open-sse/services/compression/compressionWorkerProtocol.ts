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

function isPlainObject(value: object): value is Record<string, unknown> {
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

// `seen` tracks only the current recursion PATH (ancestors), not every node ever visited:
// add before descending, remove after returning. That way a real cycle (a node reachable
// from itself) is still rejected, but two sibling branches that happen to reference the
// SAME non-cyclic sub-object (a false positive with a globally-shared `seen` set) are not.
export function isStrictlySerializable(value: unknown, seen = new Set<object>()): boolean {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "boolean" ||
    typeof value === "number"
  ) {
    return typeof value !== "number" || Number.isFinite(value);
  }
  if (typeof value !== "object") return false;
  if (seen.has(value)) return false;
  seen.add(value);
  try {
    if (Array.isArray(value)) return value.every((entry) => isStrictlySerializable(entry, seen));
    if (!isPlainObject(value)) return false;
    return Object.values(value).every((entry) => isStrictlySerializable(entry, seen));
  } finally {
    seen.delete(value);
  }
}

const WORKER_STACK_ENGINES = new Set(["caveman", "rtk", "standard"]);
export function isCompressionWorkerEligible(
  body: Record<string, unknown>,
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
  return isStrictlySerializable({ body, mode, ...(options ? { options } : {}) });
}
