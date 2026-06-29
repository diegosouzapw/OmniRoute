import { test, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import {
  slmAvailable,
  __resetUltraEntryForTests,
} from "../../../open-sse/services/compression/engines/llmlingua/ultraEntry.ts";
import { __resetLlmlinguaWorkerForTests } from "../../../open-sse/services/compression/engines/llmlingua/worker.ts";

const require = createRequire(import.meta.url);

function depsResolve(): boolean {
  try {
    require.resolve("@atjsh/llmlingua-2");
    return true;
  } catch {
    return false;
  }
}

after(() => {
  __resetUltraEntryForTests();
  __resetLlmlinguaWorkerForTests();
});

test("slmAvailable() is false and fast when optional deps are absent", () => {
  if (depsResolve()) {
    console.log("skip: optional deps present — absent-probe test N/A");
    return;
  }
  const start = Date.now();
  const available = slmAvailable();
  const elapsed = Date.now() - start;
  assert.equal(available, false);
  assert.ok(elapsed < 1000, `expected <1000ms, got ${elapsed}ms`);
});

test("slmAvailable() result is cached (second call also fast)", () => {
  if (depsResolve()) return;
  const start = Date.now();
  slmAvailable();
  slmAvailable();
  assert.ok(Date.now() - start < 1000);
});

import { runLlmlinguaUltra } from "../../../open-sse/services/compression/engines/llmlingua/ultraEntry.ts";

test("runLlmlinguaUltra throws when the backend fail-opens (no gain)", async () => {
  if (depsResolve()) {
    console.log("skip: optional deps present — no-op path N/A");
    return;
  }
  // Deps absent → workerBackend returns the original text unchanged (no-op) → throw.
  await assert.rejects(
    () => runLlmlinguaUltra("hello world this is some prose to compress"),
    /no gain/
  );
});

import {
  prewarmLlmlinguaUltra,
  __setUltraSlmTestHooks,
} from "../../../open-sse/services/compression/engines/llmlingua/ultraEntry.ts";

test("prewarmLlmlinguaUltra fires exactly one warm call when available", async () => {
  let calls = 0;
  __setUltraSlmTestHooks({
    available: true,
    run: async (text) => {
      calls++;
      return text.slice(0, 1);
    },
  });
  try {
    const attempted = await prewarmLlmlinguaUltra();
    assert.equal(attempted, true);
    assert.equal(calls, 1);
  } finally {
    __resetUltraEntryForTests();
  }
});

test("prewarmLlmlinguaUltra swallows a warm-call failure", async () => {
  __setUltraSlmTestHooks({
    available: true,
    run: async () => {
      throw new Error("load failed");
    },
  });
  try {
    const attempted = await prewarmLlmlinguaUltra(); // must NOT throw
    assert.equal(attempted, true);
  } finally {
    __resetUltraEntryForTests();
  }
});

test("prewarmLlmlinguaUltra is a no-op when unavailable", async () => {
  __setUltraSlmTestHooks({ available: false });
  try {
    const attempted = await prewarmLlmlinguaUltra();
    assert.equal(attempted, false);
  } finally {
    __resetUltraEntryForTests();
  }
});

// ─── Task 7 — gated VPS live validation (Hard Rule #18) ──────────────────────
// These tests run the REAL ONNX model and are SKIPPED unless RUN_LLMLINGUA_INT=1
// AND the optional deps are present (only true on the VPS). Under the normal
// runner they print a skip line and pass as no-ops.
//
// VPS command (run ON the VPS, optional deps present, real ONNX model downloaded
// on the first call):
//
//   RUN_LLMLINGUA_INT=1 node --import tsx --import ./open-sse/utils/setupPolyfill.ts \
//     --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit \
//     tests/unit/compression/llmlingua-ultra-entry.test.ts
//
// Expected: "GATED real ultra-SLM compression" PASSES with a real shrink +
// ultraTier:"slm"; "GATED forced-unavailable ultra falls back to heuristic"
// PASSES with ultraTier:"heuristic".
import { ultraCompress } from "../../../open-sse/services/compression/ultra.ts";

test("GATED real ultra-SLM compression (RUN_LLMLINGUA_INT=1)", async () => {
  if (process.env.RUN_LLMLINGUA_INT !== "1") {
    console.log("skip: RUN_LLMLINGUA_INT!=1");
    return;
  }
  if (!depsResolve()) {
    console.log("skip: deps absent");
    return;
  }
  const LONG_PROSE =
    "The quick brown fox jumps over the lazy dog while the sun sets slowly behind the distant hills. ".repeat(
      120
    );
  const r = await ultraCompress([{ role: "user", content: LONG_PROSE }], {
    enabled: true,
    compressionRate: 0.5,
    minScoreThreshold: 0.3,
    slmFallbackToAggressive: false,
    maxTokensPerMessage: 0,
    ultraEngine: "slm",
  });
  const out = r.messages[0].content as string;
  assert.equal(typeof out, "string");
  assert.ok(out.length < LONG_PROSE.length, "expected a real SLM shrink");
  assert.equal(r.stats.ultraTier, "slm");
});

test("GATED forced-unavailable ultra falls back to heuristic", async () => {
  if (process.env.RUN_LLMLINGUA_INT !== "1") {
    console.log("skip: RUN_LLMLINGUA_INT!=1");
    return;
  }
  __setUltraSlmTestHooks({ available: false });
  try {
    const r = await ultraCompress(
      [{ role: "user", content: "the quick brown fox jumps over the lazy dog ".repeat(40) }],
      {
        enabled: true,
        compressionRate: 0.5,
        minScoreThreshold: 0.3,
        slmFallbackToAggressive: false,
        maxTokensPerMessage: 0,
        ultraEngine: "slm",
      }
    );
    assert.equal(r.stats.ultraTier, "heuristic");
  } finally {
    __resetUltraEntryForTests();
  }
});
