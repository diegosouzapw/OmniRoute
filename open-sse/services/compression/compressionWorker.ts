import { parentPort } from "node:worker_threads";
import {
  applyCompression,
  applyStackedCompression,
  type StackedCompressionStep,
} from "./strategySelector.ts";
import { adaptBodyForCompression } from "./bodyAdapter.ts";
import type {
  CompressionWorkerJob,
  CompressionWorkerMessage,
} from "./compressionWorkerProtocol.ts";
import type { CompressionResult } from "./types.ts";

// #13154 follow-up: `applyCompression`'s sync/in-process "stacked" branch runs every body
// through `adaptBodyForCompression` first (Responses `input[]` and Kiro `conversationState`
// envelopes get flattened to `messages[]`, then restored after compression) — see
// strategySelector.ts's `runCompression`. Before the worker-eligibility gate widening in this
// same fix, essentially no real "stacked" call ever reached the worker (any `undefined`
// option key rejected it), so this branch calling `applyStackedCompression` directly on the
// raw body was dead code. Now that eligible calls are actually routed here, it must mirror
// that same adapt/restore step or Responses/Kiro bodies get miscompressed (wrong shape, and
// hard-budget post-pass warnings silently lost) only when the worker happens to run them.
function runStackedJob(
  job: CompressionWorkerJob,
  onEngineStep: (step: StackedCompressionStep) => void
): CompressionResult {
  const adapter = adaptBodyForCompression(
    job.body,
    job.options?.config?.codexResponsesConfig?.preserveToolNames
  );
  const result = applyStackedCompression(adapter.body, job.options?.config?.stackedPipeline, {
    ...job.options,
    onEngineStep,
  });
  return adapter.adapted ? { ...result, body: adapter.restore(result.body) } : result;
}

if (!parentPort) throw new Error("compressionWorker must run in a worker thread");
parentPort.on("message", (job: CompressionWorkerJob) => {
  try {
    const onEngineStep = (step: StackedCompressionStep) =>
      parentPort.postMessage({
        id: job.id,
        type: "step",
        step,
      } satisfies CompressionWorkerMessage);
    const result =
      job.mode === "stacked"
        ? runStackedJob(job, onEngineStep)
        : applyCompression(job.body, job.mode, job.options);
    parentPort.postMessage({
      id: job.id,
      type: "result",
      result,
    } satisfies CompressionWorkerMessage);
  } catch (error) {
    parentPort.postMessage({
      id: job.id,
      type: "error",
      error: error instanceof Error ? error.message : String(error),
    } satisfies CompressionWorkerMessage);
  }
});
