import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import pino from "pino";

// Issue #6360: under CI load, unit-test FILES intermittently fail with
//   "A resource generated asynchronous activity after the test ended ...
//    ENOENT: no such file or directory, open '.../logs/application/app.log'"
// even though every subtest in the file passed. Root cause: the pino file
// transport is a worker-thread stream (`pino.transport()`, a `ThreadStream`)
// that opens/writes its destination asynchronously. `pino({ transport: {...} })`
// builds that stream internally but never attaches an `error` listener to it.
// When a test's `after()` hook removes the tmp DATA_DIR the log file lives
// under (as every test file's teardown already does) while the worker's
// open()/write() is still in flight, the worker reports the failure back as
// an `error` event on the main-thread stream — and since nothing is
// listening, Node's EventEmitter re-throws it as an uncaughtException. node:test
// then blames whichever file happens to be running when the async round-trip
// lands, which is why the failure moves between files on every rerun.
//
// We reproduce the exact mechanism deterministically (rather than racing real
// worker-thread timing, which is what makes the bug flaky in the first place):
// grab the real transport stream pino built via the public `pino.symbols.streamSym`
// handle and emit the same `error` event the worker would emit on a real ENOENT,
// after removing the tmp DATA_DIR exactly like a test teardown does.
//
// Configure file logging BEFORE importing the logger (buildLogger runs at import time).
const dir = mkdtempSync(join(tmpdir(), "omniroute-logger-6360-"));
const logFile = join(dir, "logs", "application", "app.log");
process.env.NODE_ENV = "production"; // JSON to file, simplest single-target-per-destination path
process.env.APP_LOG_TO_FILE = "true";
process.env.APP_LOG_FILE_PATH = logFile;
process.env.APP_LOG_LEVEL = "debug";

const { logger } = await import("../../src/shared/utils/logger.ts");

function flushLogger(): Promise<void> {
  return new Promise((resolveFlush) => {
    try {
      logger.flush(() => resolveFlush());
    } catch {
      resolveFlush();
    }
  });
}

test("logger's file transport stream carries an error listener (never an unhandled worker error)", () => {
  const stream = (logger as unknown as Record<symbol, unknown>)[pino.symbols.streamSym] as {
    listenerCount(event: string): number;
  };
  assert.ok(stream, "expected to retrieve the pino transport stream via pino.symbols.streamSym");
  assert.ok(
    stream.listenerCount("error") > 0,
    "the file-transport stream must have an 'error' listener attached — otherwise a worker " +
      "write failure (e.g. ENOENT after DATA_DIR is removed) re-throws as an uncaughtException (#6360)"
  );
});

test("logger must not crash the process when its worker transport reports a write failure after DATA_DIR is removed (#6360)", async () => {
  let uncaught: unknown = null;
  const onUncaughtException = (err: unknown) => {
    uncaught = err;
  };
  process.on("uncaughtException", onUncaughtException);

  try {
    logger.info({ phase: "before-removal" }, "line before DATA_DIR removal");

    // Simulate the teardown every test file already does: rip out DATA_DIR
    // while the logger's worker-thread transport is still alive.
    rmSync(dir, { recursive: true, force: true });
    assert.equal(existsSync(dir), false, "sanity: DATA_DIR must actually be gone");

    // Simulate the worker thread reporting the resulting write failure back to
    // the main thread — exactly what sonic-boom/thread-stream does on a real
    // ENOENT from a vanished destination directory.
    const stream = (logger as unknown as Record<symbol, unknown>)[pino.symbols.streamSym] as {
      emit(event: string, ...args: unknown[]): boolean;
    };
    stream.emit(
      "error",
      Object.assign(new Error(`ENOENT: no such file or directory, open '${logFile}'`), {
        code: "ENOENT",
      })
    );

    // Give any (mis)handling a tick to surface as an uncaughtException before
    // we assert — this is exactly the window in which #6360 fired "after the
    // test ended".
    await new Promise((r) => setTimeout(r, 50));

    assert.equal(
      uncaught,
      null,
      `logger transport write failure after DATA_DIR removal must not raise an uncaughtException: ${String(uncaught)}`
    );
  } finally {
    process.removeListener("uncaughtException", onUncaughtException);
  }
});

test.after(async () => {
  await flushLogger();
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true });
  }
});
