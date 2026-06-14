/**
 * Transformers.js local embedding (D8) — Xenova/all-MiniLM-L6-v2.
 *
 * IMPORTANT: @huggingface/transformers is imported lazily (await import())
 * ONLY when this function is called. Never imported at module level.
 * This satisfies D8 + D25 (serverExternalPackages + no bundle impact).
 */

import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import type { EmbeddingResult, EmbeddingError } from "./types";

const TRANSFORMERS_MODEL =
  process.env.MEMORY_TRANSFORMERS_MODEL || "Xenova/all-MiniLM-L6-v2";

// Singleton pipeline, initialized once
type PipelineFn = (text: string | string[], options?: Record<string, unknown>) => Promise<unknown>;
let _pipeline: PipelineFn | null = null;
let _pipelineLoading: Promise<PipelineFn> | null = null;

/** For testing: inject a mock pipeline factory. */
export function _injectPipeline(fn: PipelineFn | null): void {
  _pipeline = fn;
  _pipelineLoading = null;
}

async function getOrLoadPipeline(): Promise<PipelineFn> {
  if (_pipeline) return _pipeline;
  if (_pipelineLoading) return _pipelineLoading;

  _pipelineLoading = (async (): Promise<PipelineFn> => {
    // Lazy import — never at module level (D8, D25)
    const transformers = await import("@huggingface/transformers");
    const { pipeline } = transformers as { pipeline: (task: string, model: string, opts?: Record<string, unknown>) => Promise<PipelineFn> };
    const pipe = await pipeline("feature-extraction", TRANSFORMERS_MODEL, { dtype: "q8" });
    _pipeline = pipe;
    _pipelineLoading = null;
    return pipe;
  })();

  return _pipelineLoading;
}

/**
 * Convert Tensor-like output from transformers pipeline to Float32Array.
 * Transformers.js pipelines return a Tensor with `.data` (Float32Array or similar)
 * and `.dims` [batch, seq, hidden_size]. We flatten to hidden_size via mean pooling.
 */
function tensorToFloat32Array(output: unknown): Float32Array {
  // Handle Tensor objects from @huggingface/transformers
  const tensor = output as {
    data?: Float32Array | number[];
    dims?: number[];
    tolist?: () => number[][][];
  };

  if (tensor && tensor.data && tensor.dims) {
    const data = tensor.data instanceof Float32Array ? tensor.data : new Float32Array(tensor.data);
    const dims = tensor.dims;

    // Typical dims: [1, seq_len, hidden_size] or [seq_len, hidden_size]
    let seqLen: number;
    let hiddenSize: number;

    if (dims.length === 3) {
      // [batch=1, seq_len, hidden_size]
      seqLen = dims[1];
      hiddenSize = dims[2];
    } else if (dims.length === 2) {
      // [seq_len, hidden_size]
      seqLen = dims[0];
      hiddenSize = dims[1];
    } else {
      // Already flat — return as-is
      return data instanceof Float32Array ? data : new Float32Array(data);
    }

    // Mean pool over sequence dimension
    const result = new Float32Array(hiddenSize);
    for (let s = 0; s < seqLen; s++) {
      for (let h = 0; h < hiddenSize; h++) {
        result[h] += data[s * hiddenSize + h];
      }
    }
    for (let h = 0; h < hiddenSize; h++) {
      result[h] /= seqLen;
    }
    return result;
  }

  // Fallback: try tolist()
  if (tensor && typeof tensor.tolist === "function") {
    const list = tensor.tolist();
    if (Array.isArray(list) && Array.isArray(list[0])) {
      // [batch=1][seq_len][hidden]
      const inner = list[0];
      const hiddenSize2 = (inner[0] as number[]).length;
      const result2 = new Float32Array(hiddenSize2);
      for (const row of inner) {
        for (let h = 0; h < hiddenSize2; h++) {
          result2[h] += (row as number[])[h];
        }
      }
      for (let h = 0; h < hiddenSize2; h++) {
        result2[h] /= inner.length;
      }
      return result2;
    }
  }

  throw new Error("Cannot convert transformers output to Float32Array");
}

export async function embedTransformers(text: string): Promise<EmbeddingResult | EmbeddingError> {
  const t0 = Date.now();
  let pipe: PipelineFn;

  try {
    pipe = await getOrLoadPipeline();
  } catch (err: unknown) {
    const isTimeout =
      err instanceof Error &&
      (err.name === "AbortError" || err.message.toLowerCase().includes("timeout"));
    return {
      source: "transformers",
      model: TRANSFORMERS_MODEL,
      reason: isTimeout ? "timeout" : "model_load_failed",
      message: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
    };
  }

  try {
    const output = await pipe(text, { pooling: "mean", normalize: true });
    const vector = tensorToFloat32Array(output);
    return {
      vector,
      source: "transformers",
      model: TRANSFORMERS_MODEL,
      dimensions: vector.length,
      latencyMs: Date.now() - t0,
      cached: false,
    };
  } catch (err: unknown) {
    const isTimeout =
      err instanceof Error &&
      (err.name === "AbortError" || err.message.toLowerCase().includes("timeout"));
    return {
      source: "transformers",
      model: TRANSFORMERS_MODEL,
      reason: isTimeout ? "timeout" : "request_failed",
      message: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
    };
  }
}
