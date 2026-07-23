/**
 * LLMLingua real-engine constants — pure data + types.
 *
 * NO imports of native deps (transformers.js, onnxruntime, etc). This module is
 * safe to import from anywhere (main thread, worker, tests) without pulling in
 * the heavy ONNX runtime.
 *
 * The real backend uses `@atjsh/llmlingua-2` (ONNX via `@huggingface/transformers`),
 * which downloads models from the HuggingFace Hub into a cache dir. Only the two
 * models PROVEN to work end-to-end are registered here.
 */

export type LlmlinguaFactory = "WithBERTMultilingual" | "WithXLMRoBERTa";

export interface LlmlinguaModelEntry {
  /** config value, e.g. "tinybert" */
  id: string;
  /** HuggingFace Hub repo id */
  hfRepo: string;
  factory: LlmlinguaFactory;
  dtype: "fp32";
  /** transformers.js subfolder option; "" for both proven models */
  subfolder: string;
  sizeMB: number;
  label: string;
}

export const DEFAULT_LLMLINGUA_MODEL = "tinybert";

/** Registry keyed by config `model` value. Only the two PROVEN models. */
export const LLMLINGUA_MODELS: Record<string, LlmlinguaModelEntry> = {
  tinybert: {
    id: "tinybert",
    hfRepo: "atjsh/llmlingua-2-js-tinybert-meetingbank",
    factory: "WithBERTMultilingual",
    dtype: "fp32",
    subfolder: "",
    sizeMB: 57,
    label: "TinyBERT (57MB, fast — default)",
  },
  "bert-base": {
    id: "bert-base",
    hfRepo: "Arcoldd/llmlingua4j-bert-base-onnx",
    factory: "WithBERTMultilingual",
    dtype: "fp32",
    subfolder: "",
    sizeMB: 710,
    label: "BERT-base (710MB, higher accuracy)",
  },
};

/** Per-call worker reply timeout → fail-open. */
export const LLMLINGUA_WORKER_TIMEOUT_MS = 5000;
/** Terminate the idle worker after this long to free model RAM. */
export const LLMLINGUA_WORKER_IDLE_MS = 300000;
