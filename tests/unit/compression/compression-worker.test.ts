import assert from "node:assert/strict";
import { after, describe, it } from "node:test";
import {
  isCompressionWorkerEligible,
  isStrictlySerializable,
} from "../../../open-sse/services/compression/compressionWorkerProtocol.ts";
import {
  closeCompressionWorkerPoolForTests,
  CompressionWorkerPool,
} from "../../../open-sse/services/compression/compressionWorkerPool.ts";
import {
  applyCompression,
  applyCompressionAsync,
} from "../../../open-sse/services/compression/strategySelector.ts";
import type { CompressionConfig } from "../../../open-sse/services/compression/types.ts";

const body = {
  model: "gpt-test",
  messages: [
    { role: "system", content: "Answer accurately." },
    {
      role: "user",
      content:
        "Please basically actually simply carefully help with this very important task. ".repeat(
          80
        ),
    },
  ],
};
const config = {
  enabled: true,
  defaultMode: "stacked",
  autoTriggerTokens: 1,
  cacheMinutes: 0,
  preserveSystemPrompt: true,
  stackedPipeline: [{ engine: "rtk" }, { engine: "caveman" }],
} as CompressionConfig;

function comparable<T extends { stats: { durationMs?: number; timestamp: number } | null }>(
  result: T
) {
  if (!result.stats) return result;
  const {
    durationMs: _duration,
    timestamp: _timestamp,
    engineBreakdown,
    ...stats
  } = result.stats as T["stats"] & {
    engineBreakdown?: Array<Record<string, unknown>>;
  };
  const stableBreakdown = engineBreakdown?.map(({ durationMs: _stepDuration, ...step }) => step);
  return {
    ...result,
    stats: {
      ...stats,
      ...(stableBreakdown ? { engineBreakdown: stableBreakdown } : {}),
    },
  };
}

after(() => closeCompressionWorkerPoolForTests());

describe("compression worker eligibility", () => {
  it("accepts only standard, rtk, and approved rtk+caveman stacks", () => {
    assert.equal(isCompressionWorkerEligible(body, "standard", { config }), true);
    assert.equal(isCompressionWorkerEligible(body, "rtk", { config }), true);
    assert.equal(isCompressionWorkerEligible(body, "stacked", { config }), true);
    for (const mode of ["off", "lite", "aggressive", "ultra", "omniglyph"] as const) {
      assert.equal(isCompressionWorkerEligible(body, mode, { config }), false);
    }
    for (const engine of ["llmlingua", "omniglyph", "ccr", "session-dedup", "ultra"]) {
      assert.equal(
        isCompressionWorkerEligible(body, "stacked", {
          config: { ...config, stackedPipeline: [{ engine }] } as CompressionConfig,
        }),
        false
      );
    }
  });

  it("rejects functions, symbols, classes, special objects, cycles, and non-finite numbers", () => {
    for (const value of [
      () => undefined,
      Symbol("x"),
      new Date(),
      new Map(),
      new Set(),
      /x/,
      NaN,
      Infinity,
    ]) {
      assert.equal(isStrictlySerializable(value), false);
    }
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    assert.equal(isStrictlySerializable(cyclic), false);
  });
});

describe("compression worker execution", () => {
  it("matches the synchronous body and stats except timing fields", async () => {
    const sync = applyCompression(body, "stacked", { config });
    const async = await applyCompressionAsync(body, "stacked", { config });
    assert.deepEqual(comparable(async), comparable(sync));
  });

  it("preserves Responses bodies and hard-budget results", async () => {
    const responsesBody = {
      model: "gpt-test",
      input: [{ role: "user", content: [{ type: "input_text", text: "word ".repeat(600) }] }],
    };
    const hardBudgetConfig = { ...config, targetTokens: 100 };
    const sync = applyCompression(responsesBody, "stacked", { config: hardBudgetConfig });
    const async = await applyCompressionAsync(responsesBody, "stacked", {
      config: hardBudgetConfig,
    });
    assert.deepEqual(comparable(async), comparable(sync));
  });

  it("relays per-engine progress from the worker", async () => {
    const steps: string[] = [];
    await applyCompressionAsync(body, "stacked", {
      config,
      onEngineStep: (step) => steps.push(step.engine),
    });
    assert.deepEqual(steps, ["rtk", "caveman"]);
  });

  it("fails open without inline compression when a job times out", async () => {
    const pool = new CompressionWorkerPool({ size: 1, timeoutMs: 1, idleMs: 100 });
    try {
      const result = await pool.run(body, "stacked", { config });
      assert.deepEqual(result, { body, compressed: false, stats: null });
    } finally {
      await pool.close();
    }
  });

  it("keeps the parent event loop responsive while two workers overlap", async () => {
    const largeBody = {
      messages: Array.from({ length: 400 }, (_, index) => ({
        role: "user",
        content: `message ${index} ` + "basically actually simply ".repeat(400),
      })),
    };
    let ticked = false;
    const tick = new Promise<void>((resolve) =>
      setTimeout(() => {
        ticked = true;
        resolve();
      }, 0)
    );
    const jobs = Promise.all([
      applyCompressionAsync(largeBody, "standard", { config }),
      applyCompressionAsync(largeBody, "standard", { config }),
    ]);
    await tick;
    assert.equal(ticked, true);
    await jobs;
  });

  it("terminates the worker after run() completes (no leak)", async () => {
    // Fix for #13091: the previous code path removed the worker slot from the
    // Set but never called worker.terminate() on the idle-eviction path. With
    // the fix, remove() always terminates, so the worker's 'exit' event must
    // fire when the slot is removed — even on the run-completion path.
    const pool = new CompressionWorkerPool({ size: 1, timeoutMs: 5_000, idleMs: 60_000 });
    const exited: number[] = [];
    try {
      // Listen on a placeholder worker first to capture the thread ref.
      // Warm up the pool so a worker is actually created and then immediately
      // removed (run() -> finish() -> remove() -> terminate()).
      const exitPromise = new Promise<number>((resolve) => {
        const arm = () => {
          const active = (pool as unknown as {
            __getActiveWorkersForTests(): Set<{ on: (ev: string, cb: (code: number | null) => void) => void }>;
          }).__getActiveWorkersForTests();
          if (active.size === 1) {
            const [worker] = active;
            worker.on("exit", (code) => { exited.push(code ?? -1); resolve(code ?? -1); });
            return true;
          }
          return false;
        };
        if (!arm()) {
          // Active set might be 0 if removal happened before our listener — wait
          const t = setInterval(() => { if (arm()) clearInterval(t); }, 5);
        }
      });

      await pool.run(body, "stacked", { config });
      await exitPromise;

      assert.equal(
        exited.length,
        1,
        "worker should fire 'exit' after finish() calls terminate()"
      );
      assert.equal(
        (pool as unknown as {
          __getActiveWorkersForTests(): Set<unknown>;
        }).__getActiveWorkersForTests().size,
        0,
        "run() should leave the pool empty (no leak)"
      );
    } finally {
      await pool.close();
    }
  });
});
