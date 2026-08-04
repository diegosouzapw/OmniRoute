import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Issue #8181: `error()` and `fatal()` write to stderr with a raw `process.stderr.write`
// wrapped in `try {} catch {}`. The comment on that line says the raw write exists to avoid
// Next.js console patching "that triggers EPIPE loops" — but on a broken pipe the write fails
// ASYNCHRONOUSLY, so the catch never sees it. The stream emits 'error', and with no listener
// attached Node re-throws it as an uncaughtException. That is the ignition point of the loop.
//
// consoleInterceptor now attaches the listener that breaks the cycle; this guard is defence in
// depth so a known-dead stream is not written to at all.
const { __structuredLoggerInternals } =
  await import("../../../src/shared/utils/structuredLogger.ts");

test("isStreamWritable rejects a destroyed stream", () => {
  assert.equal(__structuredLoggerInternals.isStreamWritable({ destroyed: true }), false);
});

test("isStreamWritable rejects an ended stream", () => {
  assert.equal(__structuredLoggerInternals.isStreamWritable({ writableEnded: true }), false);
});

test("isStreamWritable accepts a healthy stream", () => {
  assert.equal(
    __structuredLoggerInternals.isStreamWritable({ destroyed: false, writableEnded: false }),
    true
  );
  // A stream object exposing neither flag (some fakes, and older stream shims) must not be
  // treated as dead — the guard is only allowed to skip writes it is certain about.
  assert.equal(__structuredLoggerInternals.isStreamWritable({}), true);
});

// The behavioural half. process.stderr cannot be destroyed in-process — the test runner writes
// its own diagnostics there — so this runs in a child, which also proves the property that
// actually matters: the process survives and file logging still happens.
test("error() with a destroyed stderr does not crash, and still writes to the log file (#8181)", () => {
  const loggerPath = fileURLToPath(
    new URL("../../../src/shared/utils/structuredLogger.ts", import.meta.url)
  );
  const dir = mkdtempSync(join(tmpdir(), "omniroute-rawwrite-8181-"));
  const logFile = join(dir, "logs", "application", "app.log");
  const childFile = join(dir, "probe.mts");

  writeFileSync(
    childFile,
    [
      `process.env.APP_LOG_TO_FILE = "true";`,
      `process.env.APP_LOG_FILE_PATH = ${JSON.stringify(logFile)};`,
      `process.env.APP_LOG_LEVEL = "debug";`,
      `const { createLogger } = await import(${JSON.stringify(loggerPath)});`,
      `const log = createLogger("guard-probe");`,
      `process.stderr.destroy();`, // the dead-stream condition
      `log.error("entry after stderr destroyed");`,
      `log.fatal("fatal after stderr destroyed");`,
      `setTimeout(() => process.exit(0), 200);`,
    ].join("\n")
  );

  const result = spawnSync(process.execPath, ["--import", "tsx/esm", childFile], {
    encoding: "utf8",
    timeout: 30_000,
    env: { ...process.env, DISABLE_SQLITE_AUTO_BACKUP: "true" },
  });

  assert.equal(
    result.status,
    0,
    `logging to a destroyed stderr must not crash the process; got exit ${result.status}`
  );

  assert.ok(existsSync(logFile), "the file sink must still receive entries when stderr is dead");
  const lines = readFileSync(logFile, "utf8")
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((l) => JSON.parse(l));
  const messages = lines.map((l: { message?: string }) => l.message);
  assert.ok(
    messages.includes("entry after stderr destroyed"),
    "error() must still reach writeToFile after the stderr write is skipped"
  );
  assert.ok(
    messages.includes("fatal after stderr destroyed"),
    "fatal() must still reach writeToFile after the stderr write is skipped"
  );

  rmSync(dir, { recursive: true, force: true });
});

// Guard against collateral damage: #1006's suppression policy must be untouched by this change.
test("the #1006 dedup/rate-limit policy is unchanged", () => {
  assert.equal(
    __structuredLoggerInternals.MAX_TRACKED_ERRORS,
    500,
    "MAX_TRACKED_ERRORS is part of the accepted #1006 policy and must not drift"
  );
  assert.equal(
    typeof __structuredLoggerInternals.pruneRecentErrors,
    "function",
    "pruneRecentErrors must remain exported for the existing dedup-bound test"
  );
});
