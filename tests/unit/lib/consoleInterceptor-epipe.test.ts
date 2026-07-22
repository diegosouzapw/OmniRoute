import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Issue #8181: a raw `process.stderr.write` into a broken pipe fails ASYNCHRONOUSLY, so the
// `try {} catch {}` around it in structuredLogger cannot catch it. The stream emits 'error';
// because nothing listens on process.stderr, Node re-throws it as an uncaughtException; the
// framework's handler logs that via console.error; consoleInterceptor's patched console.error
// appends to disk and re-writes to the same dead stream — closing a self-sustaining loop.
// Measured in a spawn harness: 3,387 uncaughtExceptions in 1.5s, versus 0 with an 'error'
// listener attached.
//
// The listener is the whole fix, but attaching one absorbs EVERY stream error on those
// streams, converting conditions that are fatal today (ENOSPC, EBADF) into silent no-ops.
// So EPIPE is absorbed and everything else is re-raised. The ENOSPC test below is the guard
// against that regression — it is the test that a latch-state assertion would not catch.
//
// Configure file logging BEFORE importing the interceptor: consoleInterceptor.ts reads
// getAppLogToFile() at module load, and tests/_setup/isolateDataDir.ts sets
// APP_LOG_TO_FILE ||= "false", which would otherwise make initConsoleInterceptor() a no-op
// and every assertion here vacuous. Static imports hoist, so this must be a dynamic import.
const dir = mkdtempSync(join(tmpdir(), "omniroute-interceptor-8181-"));
const logFile = join(dir, "logs", "application", "app.log");

// Capture the prior values so test.after() can put them back. test:unit:fast runs with
// --test-isolation=none, so these top-level mutations would otherwise leak into every later
// test file in the process, leaving file logging enabled against a path this file deletes.
const prevLogToFile = process.env.APP_LOG_TO_FILE;
const prevLogFilePath = process.env.APP_LOG_FILE_PATH;

process.env.APP_LOG_TO_FILE = "true";
process.env.APP_LOG_FILE_PATH = logFile;

const { initConsoleInterceptor, __consoleInterceptorInternals } =
  await import("../../../src/lib/consoleInterceptor.ts");

function withUncaughtRecorder(): {
  seen: () => unknown;
  restore: () => void;
} {
  let uncaught: unknown = null;
  const onUncaught = (err: unknown) => {
    uncaught = err;
  };
  process.on("uncaughtException", onUncaught);
  return {
    seen: () => uncaught,
    restore: () => process.removeListener("uncaughtException", onUncaught),
  };
}

const settle = () => new Promise((r) => setTimeout(r, 50));

test("init attaches an 'error' listener to process.stdout and process.stderr (#8181)", () => {
  __consoleInterceptorInternals.reset();
  const beforeOut = process.stdout.listenerCount("error");
  const beforeErr = process.stderr.listenerCount("error");

  initConsoleInterceptor();

  assert.ok(
    process.stdout.listenerCount("error") > beforeOut,
    "process.stdout must carry an 'error' listener — without one, an async EPIPE re-throws " +
      "as an uncaughtException and closes the #8181 loop"
  );
  assert.ok(
    process.stderr.listenerCount("error") > beforeErr,
    "process.stderr must carry an 'error' listener (#8181)"
  );
});

test("an EPIPE on process.stderr does not surface as an uncaughtException (#8181)", async () => {
  __consoleInterceptorInternals.reset();
  initConsoleInterceptor();
  const rec = withUncaughtRecorder();
  try {
    const err = Object.assign(new Error("write EPIPE"), { code: "EPIPE" });
    try {
      process.stderr.emit("error", err);
    } catch (syncThrow) {
      assert.fail(
        `EPIPE must be absorbed by the listener, not thrown synchronously: ${String(syncThrow)}`
      );
    }
    await settle();
    assert.equal(
      rec.seen(),
      null,
      `an EPIPE stream error must be absorbed, not raised: ${String(rec.seen())}`
    );
  } finally {
    rec.restore();
  }
});

// NOTE: there is deliberately no "emit EPIPE on process.stdout" test here. Emitting a
// synthetic 'error' on the real process.stdout destroys node:test's own reporting — the
// runner writes its results to that stream, so every subsequent per-test line is swallowed
// and the file reports a bare failure with no diagnostic. (Verified: a 3-test probe emitting
// on stdout reported `pass 3, fail 0` but printed only the file line.) The stdout path is
// covered structurally by the listener-count assertion above; its behaviour is identical to
// stderr's because both streams share one handler.
test("the same handler is registered on both streams, so stdout behaves as stderr does", () => {
  __consoleInterceptorInternals.reset();
  initConsoleInterceptor();

  const outListeners = process.stdout.listeners("error");
  const errListeners = process.stderr.listeners("error");
  const shared = outListeners.filter((fn) => errListeners.includes(fn));

  assert.ok(
    shared.length > 0,
    "process.stdout and process.stderr must share the interceptor's error handler — the " +
      "stdout EPIPE path cannot be exercised directly without breaking the test reporter, so " +
      "this identity check is what proves it is wired the same way"
  );
});

// The regression guard, and the reason it runs in a child process.
//
// Attaching an 'error' listener silently makes EVERY stream error non-fatal, process-wide —
// ENOSPC, EBADF, ECONNRESET included. A test that only asserts internal latch/handler state
// passes while shipping exactly that regression, so the assertion has to be behavioural.
//
// It cannot be asserted in-process: the re-raise surfaces as an uncaughtException, and
// node:test attributes any uncaughtException during a test to that test and fails it. So we
// assert the real guarantee — "a non-EPIPE stream error still terminates the process" — by
// measuring a child's exit code, which is the semantics callers actually depend on.
test("a non-EPIPE stream error is still fatal: it must be re-raised (#8181)", async () => {
  const interceptor = fileURLToPath(
    new URL("../../../src/lib/consoleInterceptor.ts", import.meta.url)
  );
  const childDir = mkdtempSync(join(tmpdir(), "omniroute-interceptor-8181-child-"));
  const childFile = join(childDir, "reraise-probe.mts");

  writeFileSync(
    childFile,
    [
      `process.env.APP_LOG_TO_FILE = "true";`,
      `process.env.APP_LOG_FILE_PATH = ${JSON.stringify(join(childDir, "logs", "application", "app.log"))};`,
      `const m = await import(${JSON.stringify(interceptor)});`,
      `m.initConsoleInterceptor();`,
      `process.stderr.emit("error", Object.assign(new Error("disk full"), { code: "ENOSPC" }));`,
      `setTimeout(() => process.exit(0), 300);`, // if the error was absorbed, we exit 0 = regression
    ].join("\n")
  );

  const result = spawnSync(process.execPath, ["--import", "tsx/esm", childFile], {
    encoding: "utf8",
    timeout: 30_000,
    env: { ...process.env, DISABLE_SQLITE_AUTO_BACKUP: "true" },
  });

  rmSync(childDir, { recursive: true, force: true });

  assert.notEqual(
    result.status,
    0,
    "a non-EPIPE stream error must still terminate the process. Exit 0 means the interceptor's " +
      "'error' listener swallowed it, silently converting a condition that is fatal today into " +
      "a no-op for all code in the process, not just the interceptor."
  );
  assert.match(
    String(result.stderr),
    /ENOSPC/,
    "the original error must be re-raised unchanged, preserving its code"
  );
});

// The stdio guard must not depend on file logging. initConsoleInterceptor() returns early when
// APP_LOG_TO_FILE=false (and when the log directory cannot be created), but structuredLogger's
// raw stderr writes still happen in those configurations, so the loop would remain reachable
// if the listeners were only installed on the interception path.
test("the stdio guard is installed even when file logging is disabled (#8181)", () => {
  const probe = fileURLToPath(new URL("../../../src/lib/consoleInterceptor.ts", import.meta.url));
  const childDir = mkdtempSync(join(tmpdir(), "omniroute-interceptor-8181-nofile-"));
  const childFile = join(childDir, "nofile-probe.mts");

  writeFileSync(
    childFile,
    [
      `process.env.APP_LOG_TO_FILE = "false";`, // interception off
      `const m = await import(${JSON.stringify(probe)});`,
      `m.initConsoleInterceptor();`,
      `const ok = process.stderr.listenerCount("error") > 0 && process.stdout.listenerCount("error") > 0;`,
      `process.exit(ok ? 0 : 7);`,
    ].join("\n")
  );

  const result = spawnSync(process.execPath, ["--import", "tsx/esm", childFile], {
    encoding: "utf8",
    timeout: 30_000,
    env: { ...process.env, DISABLE_SQLITE_AUTO_BACKUP: "true", APP_LOG_TO_FILE: "false" },
  });

  rmSync(childDir, { recursive: true, force: true });

  assert.equal(
    result.status,
    0,
    "with APP_LOG_TO_FILE=false the interceptor does not patch console, but the stdio error " +
      "guard must still be installed: structuredLogger writes to stderr directly in that " +
      "configuration, so an async EPIPE would otherwise still become an uncaughtException"
  );
});

test("reset() removes the stream listeners and restores the original console methods", () => {
  __consoleInterceptorInternals.reset();
  const baselineErrListeners = process.stderr.listenerCount("error");
  const pristineConsoleError = console.error;

  initConsoleInterceptor();
  assert.notEqual(
    console.error,
    pristineConsoleError,
    "sanity: init must actually patch console.error"
  );

  __consoleInterceptorInternals.reset();

  assert.equal(
    process.stderr.listenerCount("error"),
    baselineErrListeners,
    "reset() must remove the listeners it added — otherwise repeated init across test files " +
      "under --test-isolation=none accumulates listeners"
  );
  assert.equal(
    console.error,
    pristineConsoleError,
    "reset() must restore the original console.error — 136 test sites mock console, and a " +
      "leaked patched method would be captured by their save/restore"
  );
});

test("re-init after reset() does not double-register stream listeners", () => {
  __consoleInterceptorInternals.reset();
  const baseline = process.stderr.listenerCount("error");

  initConsoleInterceptor();
  const afterFirst = process.stderr.listenerCount("error");
  __consoleInterceptorInternals.reset();
  initConsoleInterceptor();
  const afterSecond = process.stderr.listenerCount("error");

  assert.equal(afterSecond, afterFirst, "listener count must not grow across reset/re-init cycles");
  assert.ok(afterFirst > baseline, "sanity: init must add a listener");
});

test.after(() => {
  __consoleInterceptorInternals.reset();

  if (prevLogToFile === undefined) delete process.env.APP_LOG_TO_FILE;
  else process.env.APP_LOG_TO_FILE = prevLogToFile;

  if (prevLogFilePath === undefined) delete process.env.APP_LOG_FILE_PATH;
  else process.env.APP_LOG_FILE_PATH = prevLogFilePath;

  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
});
