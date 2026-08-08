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

  return { compressor: promptCompressor, oai };
}

/**
 * Chunk-overflow guard for the BERT position-embedding table.
 *
 * The library's chunkContext() splits input at `max_seq_length - 2` = 510
 * o200k (tiktoken) tokens, then decodes each chunk to text and re-tokenizes it
 * with the model's wordpiece tokenizer for inference. The round-trip can
 * EXPAND (510 tiktoken tokens → 516 wordpiece tokens observed), and the
 * expanded sequence (plus [CLS]/[SEP]) overruns the model's
 * max_position_embeddings=512 → onnxruntime fails with a broadcast error on
 * `/bert/embeddings/Add_1` (512 by 516) and the whole call fail-opens.
 *
 * Fix: never hand the library a single text larger than MAX_SEG_TOKENS
 * o200k tokens. The library then emits one chunk per call and the wordpiece
 * round-trip stays safely under 512. Sentence-boundary backtracking keeps the
 * cuts at natural breaks so compression quality is unaffected.
 *
 * Empirically measured on the TinyBERT meetingbank model: o200k→wordpiece
 * expansion ≈ 1.09x, so cap 450 → max ~494 wordpiece (incl. [CLS]/[SEP]),
 * while cap 470 → ~514 and overflows the position-embedding table.
 */
const MAX_SEG_TOKENS = 450;

async function compressSegmented(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compressor: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  oai: any,
  text: string,
  rate: number
): Promise<string> {
  const tokens = oai.encode(text);
  if (tokens.length <= MAX_SEG_TOKENS) {
    return compressor.compress(text, { rate });
  }

  const segments: string[] = [];
  const END_TOKENS = new Set([".", "\n", "!", "?", ";"]);
  let st = 0;
  while (st < tokens.length) {
    let ed = Math.min(st + MAX_SEG_TOKENS, tokens.length);
    // Backtrack to the last sentence boundary inside the segment (≤ 80 tokens back).
    for (let j = 0; j < Math.min(80, ed - st); j++) {
      // js-tiktoken/lite exposes only encode/decode — decode a single-token slice.
      const tok = oai.decode(tokens.slice(ed - 1 - j, ed - j));
      if (END_TOKENS.has(tok)) {
        ed = ed - j;
        break;
      }
    }
    if (ed <= st) ed = Math.min(st + MAX_SEG_TOKENS, tokens.length); // no boundary — hard cut
    segments.push(oai.decode(tokens.slice(st, ed)));
    st = ed;
  }

  const out: string[] = [];
  for (const seg of segments) {
    out.push(await compressor.compress(seg, { rate }));
  }
  return out.join("\n");
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

      const { compressor, oai } = await pending;
      const rate = typeof msg.compressionRate === "number" ? msg.compressionRate : 0.5;
      const out: string = await compressSegmented(compressor, oai, text, rate);

      parentPort!.postMessage({ id, ok: true, text: out });
    } catch {
      // Fail-open: ANY error → return the ORIGINAL text with ok:false.
      parentPort!.postMessage({ id, ok: false, text });
    }
  });
}
