import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { test } from "node:test";
import { Worker } from "node:worker_threads";

import type { CompressionWorkerMessage } from "../../open-sse/services/compression/compressionWorkerProtocol.ts";

const standalone = resolve(process.env.OMNIROUTE_STANDALONE_DIR ?? ".build/next/standalone");
const workerFile = join(standalone, "open-sse/services/compression/compressionWorker.js");
const workerScope = join(standalone, "open-sse/services/compression/package.json");

function runWorker(): Promise<CompressionWorkerMessage> {
  return new Promise((resolveResult, reject) => {
    // Production starts the bundle with plain node; do not inherit the test runner's tsx loader.
    const worker = new Worker(workerFile, { execArgv: [] });
    const timer = setTimeout(() => {
      void worker.terminate();
      reject(new Error("standalone compression worker did not reply"));
    }, 30_000);
    worker.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    worker.on("message", (message: CompressionWorkerMessage) => {
      if (message.type !== "result" && message.type !== "error") return;
      clearTimeout(timer);
      void worker.terminate();
      resolveResult(message);
    });
    worker.postMessage({
      id: 12797,
      body: {
        messages: [
          {
            role: "user",
            content: "Please basically actually simply carefully help with this task. ".repeat(80),
          },
        ],
      },
      mode: "stacked",
      options: {
        config: {
          stackedPipeline: [{ engine: "rtk" }, { engine: "caveman" }],
        },
      },
    });
  });
}

test(
  "real standalone artifact starts the compression worker and returns a result",
  {
    skip: process.env.RUN_STANDALONE_INT !== "1" && "requires a real npm run build artifact",
  },
  async () => {
    assert.ok(existsSync(join(standalone, "server.js")), "build the real standalone server first");
    assert.ok(existsSync(workerFile), "postbuild must colocate the compression worker");
    assert.equal(JSON.parse(readFileSync(workerScope, "utf8")).type, "module");
    assert.ok(readFileSync(workerFile, "utf8").length > 1024, "placeholder was not replaced");

    const message = await runWorker();
    assert.equal(message.type, "result", message.type === "error" ? message.error : "");
    if (message.type !== "result") return;
    assert.equal(message.id, 12797);
    assert.ok(message.result.body.messages, "worker returned a compressed request body");
    assert.ok(message.result.stats, "real compression completed rather than failing open");
  }
);
