/**
 * Tests for the real LLMLingua worker-thread backend (`worker.ts` + `onnxWorker.ts`).
 *
 * The four optional deps (`@atjsh/llmlingua-2`, `@huggingface/transformers`,
 * `@tensorflow/tfjs`, `js-tiktoken`) are NOT installed in this worktree, so the
 * default path MUST fail-open WITHOUT spawning a worker:
 *
 *  1. Deps absent → fail-open, no spawn (ALWAYS runs here): the backend returns the
 *     ORIGINAL text unchanged, fast (no model load / worker spawn).
 *  2. Type smoke: `workerBackend` is a function.
 *  3. GATED real compression (RUN_LLMLINGUA_INT=1): real shrink with deps present;
 *     no-op skip here (deps absent).
 */

import { test, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

import {
  workerBackend,
  __resetLlmlinguaWorkerForTests,
} from "../../../open-sse/services/compression/engines/llmlingua/worker.ts";

const require = createRequire(import.meta.url);

/** Whether all four optional deps resolve in this environment. */
function depsResolve(): boolean {
  try {
    require.resolve("@atjsh/llmlingua-2");
    require.resolve("@huggingface/transformers");
    require.resolve("@tensorflow/tfjs");
    require.resolve("js-tiktoken");
    return true;
  } catch {
    return false;
  }
}

// Let the process exit cleanly: terminate any spawned worker + reset singletons.
after(() => {
  __resetLlmlinguaWorkerForTests();
});

test("deps absent → fail-open, no spawn, returns original text fast", async () => {
  const input = "hello world this is some prose";

  const start = Date.now();
  const out1 = await workerBackend(input, {});
  const elapsed = Date.now() - start;

  // EXACT original text (fail-open), unchanged.
  assert.equal(out1, input);
  // Fast: no model load / worker spawn (proves the optional-deps gate short-circuits).
  assert.ok(elapsed < 1000, `expected <1000ms, got ${elapsed}ms`);

  // Second call exercises the memoized gate — still fail-open, still fast.
  const out2 = await workerBackend(input, {});
  assert.equal(out2, input);
});

test("type smoke: workerBackend is a function", () => {
  assert.equal(typeof workerBackend, "function");
});

test("GATED real compression (RUN_LLMLINGUA_INT=1)", async () => {
  if (process.env.RUN_LLMLINGUA_INT !== "1") {
    console.log("skip: RUN_LLMLINGUA_INT!=1");
    return;
  }
  if (!depsResolve()) {
    console.log("skip: deps absent");
    return;
  }

  // Long prose well above any practical floor so compression has room to shrink.
  const LONG_PROSE =
    "The quick brown fox jumps over the lazy dog while the sun sets slowly behind the distant hills. ".repeat(
      120
    );

  const out = await workerBackend(LONG_PROSE, { model: "tinybert", compressionRate: 0.5 });
  assert.equal(typeof out, "string");
  assert.ok(out.length < LONG_PROSE.length, "expected a real shrink");
});
