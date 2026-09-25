/**
 * Proves the LLMLingua embedded-service sidecar performs REAL semantic
 * compression — not the historical stub that echoed `text` back unchanged
 * with a hardcoded `ratio: 0.5` (the defect this PR fixed).
 *
 * GATED behind RUN_SERVICES_INT=1 (same convention as
 * tests/integration/services/full-lifecycle.int.test.ts): this test runs a
 * real `npm install` of `@atjsh/llmlingua-2` + peers and downloads the
 * ~57 MB TinyBERT ONNX model from Hugging Face on first `/compress` call, so
 * it is slow and network-dependent — it does not run in default CI.
 *
 *   RUN_SERVICES_INT=1 node --import tsx/esm --test \
 *     tests/integration/services/llmlingua-sidecar-real-compression.int.test.ts
 *
 * What "real" means here, concretely:
 *   1. The response `text` is SHORTER than the input (the stub always
 *      returned the input verbatim).
 *   2. The response `text` DIFFERS from the input (the stub never rewrote
 *      anything).
 *   3. Two different prose inputs compress to DIFFERENT outputs (the stub's
 *      output was a pure function of the input's length only — echo).
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ENABLED = process.env.RUN_SERVICES_INT === "1";
const SKIP_REASON = "Set RUN_SERVICES_INT=1 to run the real LLMLingua sidecar compression test";

function maybeSkip(t: { skip: (reason?: string) => void }): boolean {
  if (!ENABLED) {
    t.skip(SKIP_REASON);
    return true;
  }
  return false;
}

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-llmlingua-sidecar-int-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const PORT = 20536;
const LONG_PROSE_A =
  "LLMLingua-2, a small-size yet powerful prompt compression method trained via data " +
  "distillation from GPT-4 for token classification with a BERT-level encoder, excels in " +
  "task-agnostic compression. It surpasses LLMLingua in handling out-of-domain data, offering " +
  "3x-6x faster performance. ".repeat(6);
const LONG_PROSE_B =
  "The quick brown fox jumps over the lazy dog while the sun sets slowly behind the distant " +
  "hills, and every evening the same fox returns to the same hollow log near the old stone " +
  "wall to sleep until dawn breaks over the valley. ".repeat(6);

let ServiceSupervisor: typeof import("../../../src/lib/services/ServiceSupervisor").ServiceSupervisor;
let installLlmlingua: typeof import("../../../src/lib/services/installers/llmlingua").install;
let resolveSpawnArgs: typeof import("../../../src/lib/services/installers/llmlingua").resolveSpawnArgs;
let sup: InstanceType<typeof ServiceSupervisor> | null = null;

before(async () => {
  if (!ENABLED) return;

  const core = await import("../../../src/lib/db/core.ts");
  core.getDbInstance();

  const installerMod = await import("../../../src/lib/services/installers/llmlingua.ts");
  installLlmlingua = installerMod.install;
  resolveSpawnArgs = installerMod.resolveSpawnArgs;

  const supervisorMod = await import("../../../src/lib/services/ServiceSupervisor.ts");
  ServiceSupervisor = supervisorMod.ServiceSupervisor;

  await installLlmlingua("latest");
});

after(async () => {
  if (sup) {
    await sup.stop().catch(() => undefined);
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("llmlingua sidecar — real compression (opt-in, RUN_SERVICES_INT=1)", () => {
  it("start()s the real sidecar and reports healthy", async (t) => {
    if (maybeSkip(t)) return;

    sup = new ServiceSupervisor({
      tool: "llmlingua",
      port: PORT,
      spawnArgs: () => resolveSpawnArgs(PORT),
      healthUrl: () => `http://127.0.0.1:${PORT}/health`,
      healthIntervalMs: 5_000,
      stopTimeoutMs: 15_000,
      logsBufferBytes: 5_242_880,
      probeBeforeSpawn: true,
    });

    const status = await sup.start();
    assert.equal(status.state, "running");
  });

  it("compresses real prose: shorter than input, and differs from it", async (t) => {
    if (maybeSkip(t)) return;

    const res = await fetch(`http://127.0.0.1:${PORT}/compress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Long compression budget: first call also pays the one-time ONNX model load.
      signal: AbortSignal.timeout(120_000),
      body: JSON.stringify({ text: LONG_PROSE_A, rate: 0.5 }),
    });
    assert.equal(res.status, 200);

    const data = (await res.json()) as { text: string; compressed: boolean; ratio: number };
    assert.equal(data.compressed, true);
    assert.ok(
      data.text.length < LONG_PROSE_A.length,
      `expected compressed text shorter than input (${LONG_PROSE_A.length} chars), got ${data.text.length}`
    );
    assert.notEqual(data.text, LONG_PROSE_A, "stub defect: response echoed the input unchanged");
    assert.ok(
      data.ratio > 0 && data.ratio < 1,
      `ratio must reflect real compression, got ${data.ratio}`
    );
  });

  it("two different prose inputs compress to different outputs (not a length-only echo)", async (t) => {
    if (maybeSkip(t)) return;

    // Sequential, not concurrent: ONNX token-classification inference is not
    // reentrant (see worker.ts's own FIFO-queue note for the same model).
    const resA = await fetch(`http://127.0.0.1:${PORT}/compress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(120_000),
      body: JSON.stringify({ text: LONG_PROSE_A, rate: 0.5 }),
    });
    const resB = await fetch(`http://127.0.0.1:${PORT}/compress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(120_000),
      body: JSON.stringify({ text: LONG_PROSE_B, rate: 0.5 }),
    });

    const dataA = (await resA.json()) as { text: string };
    const dataB = (await resB.json()) as { text: string };
    assert.notEqual(
      dataA.text,
      dataB.text,
      "two different inputs must not compress to the same output"
    );
  });
});
