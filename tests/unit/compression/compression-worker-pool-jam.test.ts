import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { after, describe, it } from "node:test";
import type { Worker } from "node:worker_threads";
import {
  closeCompressionWorkerPoolForTests,
  CompressionWorkerPool,
} from "../../../open-sse/services/compression/compressionWorkerPool.ts";
import {
  __resetCompressionFailOpenNotifierForTests,
  notifyCompressionFailOpen,
} from "../../../open-sse/services/compression/failOpenNotifier.ts";
import {
  __resetLlmlinguaWorkerForTests,
  __setLlmlinguaWorkerHarnessForTests,
  llmlinguaWorkerSpecifier,
  workerBackend,
} from "../../../open-sse/services/compression/engines/llmlingua/worker.ts";

/**
 * Regression guards for insoln/OmniRoute#2: a synchronous throw from spawn()
 * (e.g. Turbopack's moduleContext MODULE_NOT_FOUND in the standalone build)
 * must fail-open the queued jobs instead of stranding them in pool.queue
 * forever (unbounded main-isolate heap leak).
 */
const body = {
  model: "gpt-test",
  messages: [{ role: "user", content: "word ".repeat(600) }],
};

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`timed out after ${ms}ms: ${label}`)), ms).unref()
    ),
  ]);
}

function throwingWorkerFactory(): () => Worker {
  return () => {
    const error = new Error("Cannot find module './compressionWorker.ts'");
    (error as NodeJS.ErrnoException).code = "MODULE_NOT_FOUND";
    throw error;
  };
}

/** Capture console.warn lines while the stub is installed. */
function captureWarn(): { lines: string[]; restore(): void } {
  const lines: string[] = [];
  const originalWarn = console.warn;
  console.warn = (message?: unknown) => {
    lines.push(String(message));
  };
  return {
    lines,
    restore() {
      console.warn = originalWarn;
    },
  };
}

/**
 * EventEmitter-based Worker stand-in: mirrors node:worker_threads' surface
 * (on/once/off, postMessage, terminate). Construction is observable so a
 * factory can busy the first worker(s), then start throwing.
 */
type FakeWorker = Worker & { messages: unknown[] };

function fakeWorker(): FakeWorker {
  const worker = new EventEmitter() as FakeWorker;
  worker.messages = [];
  worker.postMessage = ((message: unknown) => {
    worker.messages.push(message);
  }) as Worker["postMessage"];
  worker.terminate = (() => Promise.resolve(0)) as Worker["terminate"];
  return worker;
}

function workerFactoryThatThrowsAfter(first: FakeWorker): {
  factory: () => Worker;
  spawns: () => number;
} {
  let spawns = 0;
  return {
    factory: () => {
      spawns++;
      if (spawns === 1) return first;
      const error = new Error("Cannot find module './compressionWorker.ts'");
      (error as NodeJS.ErrnoException).code = "MODULE_NOT_FOUND";
      throw error;
    },
    spawns: () => spawns,
  };
}

after(async () => {
  await closeCompressionWorkerPoolForTests();
  __resetCompressionFailOpenNotifierForTests();
});

describe("CompressionWorkerPool spawn-failure queue drain", () => {
  it("fails open every queued job when spawn() throws synchronously", async () => {
    const pool = new CompressionWorkerPool({
      size: 2,
      workerFactory: throwingWorkerFactory(),
    });
    try {
      const jobs = [
        pool.run(body, "stacked"),
        pool.run(body, "stacked"),
        pool.run(body, "stacked"),
      ];
      const results = await withTimeout(Promise.all(jobs), 5000, "queued jobs never resolved");
      for (const result of results) {
        assert.deepEqual(result, { body, compressed: false, stats: null });
      }
    } finally {
      await pool.close();
    }
  });

  for (const transientCode of ["EMFILE", "ERR_WORKER_INIT_FAILED", undefined] as const) {
    const label = transientCode ?? "unknown no-code error";
    it(`retries after a transient ${label} spawn failure`, async () => {
      let spawns = 0;
      const worker = fakeWorker();
      const pool = new CompressionWorkerPool({
        size: 1,
        workerFactory: () => {
          spawns++;
          if (spawns === 1) {
            const error = new Error("temporary worker resource exhaustion");
            if (transientCode) (error as NodeJS.ErrnoException).code = transientCode;
            throw error;
          }
          return worker;
        },
      });
      try {
        assert.deepEqual(await pool.run(body, "stacked"), {
          body,
          compressed: false,
          stats: null,
        });
        const pending = pool.run(body, "stacked");
        assert.equal(spawns, 2, "transient failure must not permanently break the pool");
        const wireJob = worker.messages[0] as { id: number };
        worker.emit("message", {
          type: "result",
          id: wireJob.id,
          result: { body, compressed: false, stats: null },
        });
        await withTimeout(pending, 5000, "retry after transient failure hung");
      } finally {
        await pool.close();
      }
    });
  }

  it("treats ERR_WORKER_PATH as a permanent structural failure", async () => {
    let spawns = 0;
    const pool = new CompressionWorkerPool({
      size: 1,
      workerFactory: () => {
        spawns++;
        const error = new Error("invalid worker path");
        (error as NodeJS.ErrnoException).code = "ERR_WORKER_PATH";
        throw error;
      },
    });
    try {
      await withTimeout(pool.run(body, "stacked"), 5000, "first job never resolved");
      await withTimeout(pool.run(body, "stacked"), 5000, "post-break job hung");
      assert.equal(spawns, 1, "structural failures must permanently break the pool");
    } finally {
      await pool.close();
    }
  });

  it("keeps an existing healthy worker usable after structural capacity spawn failure", async () => {
    const first = fakeWorker();
    const { factory, spawns } = workerFactoryThatThrowsAfter(first);
    const pool = new CompressionWorkerPool({ size: 2, workerFactory: factory });
    try {
      const active = pool.run({ ...body, model: "active" }, "stacked");
      const failedCapacity = pool.run({ ...body, model: "capacity" }, "stacked");
      assert.equal(spawns(), 2, "second job must attempt to add pool capacity");
      assert.deepEqual(await failedCapacity, {
        body: { ...body, model: "capacity" },
        compressed: false,
        stats: null,
      });

      const firstWireJob = first.messages[0] as { id: number };
      first.emit("message", {
        type: "result",
        id: firstWireJob.id,
        result: { body: { ...body, model: "active-result" }, compressed: true, stats: null },
      });
      assert.equal((await active).compressed, true);

      const reused = pool.run({ ...body, model: "reuse" }, "stacked");
      const reusedWireJob = first.messages[1] as { id: number };
      assert.ok(reusedWireJob, "the existing worker must receive a later job");
      first.emit("message", {
        type: "result",
        id: reusedWireJob.id,
        result: { body: { ...body, model: "reuse-result" }, compressed: true, stats: null },
      });
      assert.equal((await reused).compressed, true, "the pool must not be permanently broken");
      assert.equal(spawns(), 2, "reusing an idle worker must not respawn");
    } finally {
      await pool.close();
    }
  });

  it("fails open immediately for jobs submitted after the pool broke", async () => {
    const pool = new CompressionWorkerPool({
      size: 1,
      workerFactory: throwingWorkerFactory(),
    });
    try {
      await withTimeout(pool.run(body, "stacked"), 5000, "first job never resolved");
      // A second wave must not hang waiting for a worker that can never spawn.
      const result = await withTimeout(pool.run(body, "stacked"), 5000, "post-break job hung");
      assert.deepEqual(result, { body, compressed: false, stats: null });
    } finally {
      await pool.close();
    }
  });

  it("fails open even when a non-Error throwable cannot be stringified", async () => {
    const hostile = {
      toString(): string {
        throw new Error("hostile toString");
      },
      valueOf(): string {
        throw new Error("hostile valueOf");
      },
    };
    const pool = new CompressionWorkerPool({
      size: 1,
      workerFactory: () => {
        throw hostile;
      },
    });
    try {
      const result = await withTimeout(pool.run(body, "stacked"), 5000, "hostile error hung");
      assert.deepEqual(result, { body, compressed: false, stats: null });
    } finally {
      await pool.close();
    }
  });

  it("keeps the queue drained: no job stays referenced after spawn failure", async () => {
    const pool = new CompressionWorkerPool({
      size: 1,
      workerFactory: throwingWorkerFactory(),
    });
    try {
      await withTimeout(pool.run(body, "stacked"), 5000, "job never resolved");
      // The internal queue must be empty — retained jobs hold the full request body.
      const queueLength = (pool as unknown as { queue: unknown[] }).queue.length;
      assert.equal(queueLength, 0);
    } finally {
      await pool.close();
    }
  });

  it("drains a queue populated across a healthy worker when a LATER spawn throws", async () => {
    // First worker takes job 1 and stays busy; jobs 2 and 3 queue behind it.
    // Its runtime error removes it, then replacement spawn throws synchronously
    // → both genuinely queued jobs (plus job 1 via fail()) settle fail-open.
    const first = fakeWorker();
    const { factory, spawns } = workerFactoryThatThrowsAfter(first);
    const pool = new CompressionWorkerPool({ size: 1, workerFactory: factory });
    try {
      const jobs = [
        pool.run(body, "stacked"),
        pool.run(body, "stacked"),
        pool.run(body, "stacked"),
      ];
      assert.equal(first.messages.length, 1, "first worker must be busy with job 1");
      first.emit("error", new Error("worker crashed before replying"));
      const results = await withTimeout(Promise.all(jobs), 5000, "populated queue never drained");
      for (const result of results) {
        assert.deepEqual(result, { body, compressed: false, stats: null });
      }
      const queueLength = (pool as unknown as { queue: unknown[] }).queue.length;
      assert.equal(queueLength, 0, "queue must be empty after the drain");
      assert.equal(spawns(), 2, "must not retry spawning after the throw");
    } finally {
      await pool.close();
    }
  });

  it("fails open (with a warn) when postMessage throws — run() never rejects", async () => {
    const cloneBomb = fakeWorker();
    cloneBomb.postMessage = (() => {
      throw new Error("DataCloneError: object could not be cloned");
    }) as Worker["postMessage"];
    const pool = new CompressionWorkerPool({ size: 1, workerFactory: () => cloneBomb });
    const warn = captureWarn();
    try {
      const result = await withTimeout(pool.run(body, "stacked"), 5000, "postMessage job hung");
      assert.deepEqual(result, { body, compressed: false, stats: null });
      assert.match(warn.lines[0] ?? "", /postMessage failed/);
    } finally {
      warn.restore();
      await pool.close();
    }
  });

  it("fails open (with a warn) on worker runtime error, exit, and job timeout", async () => {
    // error mid-job
    {
      const worker = fakeWorker();
      const pool = new CompressionWorkerPool({ size: 1, workerFactory: () => worker });
      const warn = captureWarn();
      try {
        const pending = pool.run(body, "stacked");
        worker.emit("error", new Error("boom inside worker"));
        assert.deepEqual(await withTimeout(pending, 5000, "error-path job hung"), {
          body,
          compressed: false,
          stats: null,
        });
        assert.match(warn.lines[0] ?? "", /worker error: boom inside worker/);
      } finally {
        warn.restore();
        await pool.close();
      }
    }
    // exit mid-job
    {
      const worker = fakeWorker();
      const pool = new CompressionWorkerPool({ size: 1, workerFactory: () => worker });
      const warn = captureWarn();
      try {
        const pending = pool.run(body, "stacked");
        worker.emit("exit", 1);
        assert.deepEqual(await withTimeout(pending, 5000, "exit-path job hung"), {
          body,
          compressed: false,
          stats: null,
        });
        assert.match(warn.lines[0] ?? "", /worker exit code 1/);
      } finally {
        warn.restore();
        await pool.close();
      }
    }
    // per-job timeout
    {
      const worker = fakeWorker();
      const pool = new CompressionWorkerPool({
        size: 1,
        timeoutMs: 20,
        workerFactory: () => worker,
      });
      const warn = captureWarn();
      try {
        const pending = pool.run(body, "stacked");
        assert.deepEqual(await withTimeout(pending, 5000, "timeout-path job hung"), {
          body,
          compressed: false,
          stats: null,
        });
        assert.match(warn.lines[0] ?? "", /worker job timeout/);
      } finally {
        warn.restore();
        await pool.close();
      }
    }
  });

  it("close() resolves the busy job and every queued job", async () => {
    const worker = fakeWorker();
    const pool = new CompressionWorkerPool({ size: 1, workerFactory: () => worker });
    try {
      const bodies = [body, { ...body, model: "queued-a" }, { ...body, model: "queued-b" }];
      const jobs = bodies.map((jobBody) => pool.run(jobBody, "stacked"));
      assert.equal(worker.messages.length, 1, "one job must be busy while two remain queued");
      await pool.close();
      const results = await withTimeout(Promise.all(jobs), 5000, "close stranded pool jobs");
      for (const [index, result] of results.entries()) {
        assert.deepEqual(result, { body: bodies[index], compressed: false, stats: null });
      }
    } finally {
      await pool.close();
    }
  });
});

describe("compression fail-open observability", () => {
  it("notifies (rate-limited) when the worker path fails open", () => {
    const warn = captureWarn();
    try {
      notifyCompressionFailOpen();
      notifyCompressionFailOpen();
      notifyCompressionFailOpen();
    } finally {
      warn.restore();
    }
    assert.equal(warn.lines.length, 1);
    assert.match(warn.lines[0] ?? "", /fail-open|compression/i);
  });

  it("still logs a NEW distinct failure detail inside the rate-limit window", () => {
    const warn = captureWarn();
    try {
      notifyCompressionFailOpen("failure mode A");
      notifyCompressionFailOpen("failure mode A"); // suppressed
      notifyCompressionFailOpen("failure mode B"); // distinct detail — logged
    } finally {
      warn.restore();
    }
    assert.equal(warn.lines.length, 2);
    assert.match(warn.lines[1] ?? "", /failure mode B/);
  });

  it("keeps the distinct-detail rate limiter bounded without clearing suppression", () => {
    __resetCompressionFailOpenNotifierForTests();
    const warn = captureWarn();
    try {
      const details = Array.from(
        { length: 20 },
        (_, i) => `failure ${String.fromCharCode(97 + i)}`
      );
      for (const detail of details) notifyCompressionFailOpen(detail);
      notifyCompressionFailOpen(details[0]);
    } finally {
      warn.restore();
    }
    assert.equal(warn.lines.length, 16, "only the bounded set of distinct details may log");
  });

  it("logs a suppressed detail again after the rate-limit window expires", () => {
    __resetCompressionFailOpenNotifierForTests();
    const originalNow = Date.now;
    let now = 60_000;
    Date.now = () => now;
    const warn = captureWarn();
    try {
      notifyCompressionFailOpen("repeated failure");
      notifyCompressionFailOpen("repeated failure");
      now += 60_000;
      notifyCompressionFailOpen("repeated failure");
    } finally {
      warn.restore();
      Date.now = originalNow;
    }
    assert.equal(warn.lines.length, 2, "the detail must log again in a new window");
  });

  it("notifies on the broken-pool short-circuit, not only at spawn time", async () => {
    const pool = new CompressionWorkerPool({
      size: 1,
      workerFactory: throwingWorkerFactory(),
    });
    const warn = captureWarn();
    try {
      await withTimeout(pool.run(body, "stacked"), 5000, "first job never resolved");
      // Same detail string → rate-limited away; reset the window so the
      // post-break run must exercise the notifyCompressionFailOpen call in run().
      __resetCompressionFailOpenNotifierForTests();
      const result = await withTimeout(pool.run(body, "stacked"), 5000, "post-break job hung");
      assert.deepEqual(result, { body, compressed: false, stats: null });
      const postBreakWarnings = warn.lines.filter((line) => line.includes("pool broken"));
      assert.equal(postBreakWarnings.length, 1, "broken-pool run must notify fail-open");
      assert.match(postBreakWarnings[0] ?? "", /pool broken/);
    } finally {
      warn.restore();
      await pool.close();
    }
  });

  it("never calls the factory again once the pool is broken", async () => {
    let spawns = 0;
    const pool = new CompressionWorkerPool({
      size: 2,
      workerFactory: () => {
        spawns++;
        const error = new Error("Cannot find module './compressionWorker.ts'");
        (error as NodeJS.ErrnoException).code = "MODULE_NOT_FOUND";
        throw error;
      },
    });
    try {
      await withTimeout(pool.run(body, "stacked"), 5000, "first job never resolved");
      await withTimeout(pool.run(body, "stacked"), 5000, "post-break job hung");
      await withTimeout(pool.run(body, "stacked"), 5000, "third job hung");
      assert.equal(spawns, 1, "broken pool must not retry spawning");
    } finally {
      await pool.close();
    }
  });
});

describe("llmlingua worker spawn specifier", () => {
  it("passes a URL object (not a file:// string) to Worker — ERR_WORKER_PATH on Node >= 21", () => {
    const specifier = llmlinguaWorkerSpecifier("/app/onnxWorker.js");
    assert.ok(specifier instanceof URL, "Worker entry must be a URL object, not a string");
    assert.equal(specifier.protocol, "file:");
    assert.equal(specifier.pathname, "/app/onnxWorker.js");
  });
});

describe("llmlingua worker fail-open catch paths", () => {
  /** Restore the real factory + dep gate after harness injection. */
  function restoreHarness(): void {
    __setLlmlinguaWorkerHarnessForTests({ factory: null, depsAvailable: null });
    __resetLlmlinguaWorkerForTests();
    __resetCompressionFailOpenNotifierForTests();
  }

  it("fails open every queued text with a rate-limited warn when spawn throws", async () => {
    let spawns = 0;
    __setLlmlinguaWorkerHarnessForTests({
      depsAvailable: true,
      factory: () => {
        spawns++;
        throw new Error("simulated MODULE_NOT_FOUND");
      },
    });
    const warn = captureWarn();
    try {
      const texts = ["first prose", "second prose", "third prose"];
      const results = await Promise.all(texts.map((t) => workerBackend(t, {})));
      for (const [i, out] of results.entries()) {
        assert.equal(out, texts[i], "every queued item must fail open with its original text");
      }
      const spawnWarnings = warn.lines.filter((l) => l.includes("llmlingua worker spawn failed"));
      assert.equal(spawnWarnings.length, 1, "spawn failure must warn (rate-limited to one)");
      assert.match(spawnWarnings[0] ?? "", /simulated MODULE_NOT_FOUND/);
      assert.ok(spawns >= 1, "the injected throwing factory must have been exercised");
    } finally {
      warn.restore();
      restoreHarness();
    }
  });

  it("fails open and respawns when postMessage throws", async () => {
    let spawns = 0;
    const flaky = fakeWorker();
    flaky.postMessage = (() => {
      throw new Error("DataCloneError: could not clone");
    }) as Worker["postMessage"];
    const healthy = fakeWorker();
    __setLlmlinguaWorkerHarnessForTests({
      depsAvailable: true,
      factory: () => {
        spawns++;
        return spawns === 1 ? flaky : healthy;
      },
    });
    const warn = captureWarn();
    try {
      const first = await workerBackend("flaky prose", {});
      assert.equal(first, "flaky prose", "postMessage failure must return the original text");
      const postWarnings = warn.lines.filter((l) => l.includes("postMessage failed"));
      assert.equal(postWarnings.length, 1, "postMessage failure must warn (rate-limited to one)");

      // The next call must RESPAWN (postMessage failure nulls the worker), not hang.
      const second = workerBackend("retry prose", {});
      const wireJob = healthy.messages[0] as { id: number };
      assert.ok(wireJob, "the respawned worker must receive the retried call");
      assert.equal((wireJob as { text?: string }).text, "retry prose");
      healthy.emit("message", { id: wireJob.id, ok: true, text: "compressed" });
      assert.equal(await second, "compressed");
      assert.equal(spawns, 2, "postMessage failure must respawn the worker on the next call");
    } finally {
      warn.restore();
      restoreHarness();
    }
  });
});

describe("fail-open notifier sanitization", () => {
  it("sanitizes secrets, absolute paths, and multiline log injection in the detail", () => {
    const warn = captureWarn();
    try {
      notifyCompressionFailOpen(
        "spawn failed /home/user/secret-token-path\ninjected second line sk-0123456789abcdef0123456789abcdef"
      );
    } finally {
      warn.restore();
    }
    assert.equal(warn.lines.length, 1);
    const line = warn.lines[0] ?? "";
    assert.equal(line.split("\n").length, 1, "detail must not introduce extra log lines");
    assert.doesNotMatch(line, /sk-[0-9a-f]{32}/, "secret-looking tokens must be redacted");
    assert.doesNotMatch(line, /\/home\/user\//, "absolute paths must not reach the log");
  });
});
