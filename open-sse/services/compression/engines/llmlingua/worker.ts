/**
 * LLMLingua-2 worker-thread stub (production path — NOT loaded in tests).
 *
 * PRODUCTION FOLLOW-UP (L1):
 *   Replace the stub body below with the real MobileBERT ONNX inference via
 *   the vendored/pinned `@atjsh/llmlingua-2` package running in a worker thread.
 *   The package must be vendored (pinned) at a specific version and ONNX model
 *   hash verified before loading. The worker MUST remain fail-open — any failure
 *   to load the model, initialise the pipeline, or classify tokens MUST result
 *   in returning the original text unchanged (not throwing to the caller).
 *
 *   VPS validation (Hard Rule #18): before enabling the real model, deploy to
 *   root@192.168.0.15 and run a documented live test confirming:
 *     (a) prose text is shorter after compression,
 *     (b) a message containing a fenced code block produces identical code bytes,
 *     (c) OOM / missing model → fail-open (original text returned, no crash).
 *
 *   NEVER apply to code blocks — the caller (index.ts) tombstones code blocks
 *   before calling this backend; this worker sees prose-only segments.
 *
 * CURRENT STATE (stub):
 *   This module exports a LlmlinguaBackend function that always fail-opens
 *   (returns the original text unchanged), so the engine can be registered and
 *   used in stacked pipelines without any ONNX dependency. It will produce
 *   compressed:false for every call, which is the correct safe default until the
 *   real model is wired up.
 */

import type { LlmlinguaBackend } from "./index.ts";

/**
 * Production worker backend stub.
 *
 * Currently fail-opens unconditionally.  When the real `@atjsh/llmlingua-2`
 * package is vendored and validated on the VPS, replace the body below with
 * the actual worker-thread dispatch:
 *
 * ```ts
 * // 1. Spawn / reuse a worker_threads.Worker running the ONNX pipeline.
 * // 2. Post the text to the worker via MessageChannel.
 * // 3. Await the reply with a per-call timeout (e.g. 5 000 ms).
 * // 4. On any error / timeout → return text (fail-open).
 * ```
 */
export const workerBackend: LlmlinguaBackend = async (text: string): Promise<string> => {
  // Stub: model not yet wired — fail-open by returning the original text.
  return text;
};
