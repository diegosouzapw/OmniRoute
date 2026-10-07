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

// Anything that is not a (non-null) object is either a structured-clone-safe primitive
// or an unsupported value (e.g. a non-finite number, a function, a symbol). Isolated
// from `isStrictlySerializable` so the recursive walk below stays flat.
function isClonablePrimitive(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" || typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  return false;
}

// Date/Map/Set/RegExp are copied natively by structuredClone (not walked as plain
// objects), so they are always structured-clone-safe regardless of their contents.
const NATIVELY_CLONABLE_CTORS = [Date, Map, Set, RegExp] as const;
function isNativelyClonable(value: object): boolean {
  return NATIVELY_CLONABLE_CTORS.some((ctor) => value instanceof ctor);
}

// `seen` tracks only the current recursion PATH (ancestors), not every node ever visited:
// add before descending, remove after returning. That way a real cycle (a node reachable
// from itself) is still rejected, but two sibling branches that happen to reference the
// SAME non-cyclic sub-object (a false positive with a globally-shared `seen` set) are not.
export function isStrictlySerializable(value: unknown, seen = new Set<object>()): boolean {
  if (value === null || typeof value !== "object") return isClonablePrimitive(value);
  if (seen.has(value)) return false;
  seen.add(value);
  try {
    if (Array.isArray(value)) return value.every((entry) => isStrictlySerializable(entry, seen));
    if (isNativelyClonable(value)) return true;
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
