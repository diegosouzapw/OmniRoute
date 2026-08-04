/**
 * LLMLingua-2 ONNX worker-thread entry point.
 *
 * Runs inside a `worker_threads.Worker` (spawned by `./worker.ts`). The heavy
 * optional deps (`@atjsh/llmlingua-2`, `@huggingface/transformers`, `js-tiktoken`)
 * are imported LAZILY/dynamically inside the message handler so this module LOADS
 * even when those deps are absent. The only static imports are present-by-default
 * modules: `node:worker_threads`, `./constants.ts`, `./modelStore.ts`.
 *
 * Protocol (request → reply over the worker MessageChannel):
 *   in : { id, text, model, compressionRate, modelPath }
 *   out: { id, ok: true,  text: <compressed> }   on success
 *        { id, ok: false, text: <original> }     on ANY failure (fail-open)
 *
 * Fail-open contract: missing deps, model download failure, inference error — all
 * resolve to the ORIGINAL text with `ok:false`. The parent treats either reply as
 * the value to return, so a failed compression is transparently the original prose.
 *
 * Code blocks NEVER reach this worker: the engine (index.ts) tombstones preserved
 * constructs before calling the backend; this worker sees prose-only segments.
 */

import { parentPort } from "node:worker_threads";
import {
  resolveLlmlinguaModel,
  configureTransformersEnv,
  type TransformersEnvLike,
} from "./modelStore.ts";
import type { LlmlinguaModelEntry } from "./constants.ts";

/**
 * Dynamic-import indirection. These four deps are OPTIONAL and not installed by
 * default, so a static `import(...)` of a literal specifier would make `tsc` fail
 * with TS2307. Routing the specifier through a runtime variable keeps the module
 * type-checkable while still loading the dep at runtime when present.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dynamicImport(specifier: string): Promise<any> {
  return import(/* @vite-ignore */ specifier);
}

/** Inbound message shape from the parent. */
interface WorkerRequest {
  id: number;
  text: string;
  model?: string;
  compressionRate?: number;
  modelPath?: string;
}

/**
 * Cache of built prompt-compressors keyed by `${factory}:${hfRepo}:${modelPath||""}`.
 * Values are Promises so concurrent first-calls share one in-flight build; a failed
 * build deletes its key so a later call can retry.
 * Typed `any` — the heavy lib has no static types here (no-explicit-any is warn-only).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const compressorCache = new Map<string, Promise<any>>();

function cacheKey(entry: LlmlinguaModelEntry, modelPath?: string): string {
  return `${entry.factory}:${entry.hfRepo}:${modelPath || ""}`;
}

/**
 * Build (or reuse) the LLMLingua-2 prompt compressor for a model entry.
 * All heavy imports are dynamic so this only runs the deps are actually present.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getCompressor(entry: LlmlinguaModelEntry, modelPath?: string): Promise<any> {
  const { env } = await dynamicImport("@huggingface/transformers");
  configureTransformersEnv(env as TransformersEnvLike, { modelPath });

  const { LLMLingua2 } = await dynamicImport("@atjsh/llmlingua-2");
  const { Tiktoken } = await dynamicImport("js-tiktoken/lite");
  const o200k_base = (await dynamicImport("js-tiktoken/ranks/o200k_base")).default;
  const oai = new Tiktoken(o200k_base);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { promptCompressor } = await (LLMLingua2 as any)[entry.factory](entry.hfRepo, {
    transformerJSConfig: { device: "cpu", dtype: entry.dtype },
    oaiTokenizer: oai,
    modelSpecificOptions: { subfolder: entry.subfolder },
    // MUST silence — the lib console.logs huge objects otherwise.
    logger: () => {},
  });

  return promptCompressor;
}

if (parentPort) {
  parentPort.on("message", async (msg: WorkerRequest) => {
    const { id, text } = msg;
    try {
      const entry = resolveLlmlinguaModel(msg.model);
      const key = cacheKey(entry, msg.modelPath);

      let pending = compressorCache.get(key);
      if (!pending) {
        pending = getCompressor(entry, msg.modelPath);
        compressorCache.set(key, pending);
        // If the build rejects, evict the key so a later call can retry.
        pending.catch(() => {
          compressorCache.delete(key);
        });
      }

      const compressor = await pending;
      const rate = typeof msg.compressionRate === "number" ? msg.compressionRate : 0.5;
      const out: string = await compressor.compress(text, { rate });

      parentPort!.postMessage({ id, ok: true, text: out });
    } catch {
      // Fail-open: ANY error → return the ORIGINAL text with ok:false.
      parentPort!.postMessage({ id, ok: false, text });
    }
  });
}
