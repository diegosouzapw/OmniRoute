import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

const TEST_LOG_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-logger-test-"));
process.env.DATA_DIR = TEST_LOG_DIR;

const { createLogger } = await import("../../src/shared/utils/structuredLogger.ts");

test.after(() => {
  fs.rmSync(TEST_LOG_DIR, { recursive: true, force: true });
});

/** Capture console output (info/warn/debug) during fn() execution */
function captureConsole(fn) {
  const lines = [];
  const origInfo = console.info;
  const origWarn = console.warn;
  const origDebug = console.debug;
  console.info = (...args) => lines.push(args.join(" "));
  console.warn = (...args) => lines.push(args.join(" "));
  console.debug = (...args) => lines.push(args.join(" "));
  try {
    fn();
  } finally {
    console.info = origInfo;
    console.warn = origWarn;
    console.debug = origDebug;
  }
  return lines.join("\n");
}

test("child() merges childMeta into log output", () => {
  const logger = createLogger("test-child");
  const output = captureConsole(() => {
    logger.child({ requestId: "req-123" }).info("hello");
  });
  assert.ok(output.includes("req-123"), `Expected requestId in output, got: ${output}`);
});

test("chained child() accumulates parent and grandchild meta", () => {
  const logger = createLogger("test-chain");
  const output = captureConsole(() => {
    logger.child({ traceId: "trace-abc" }).child({ spanId: "span-xyz" }).warn("nested");
  });
  assert.ok(output.includes("trace-abc"), `Expected traceId in output, got: ${output}`);
  assert.ok(output.includes("span-xyz"), `Expected spanId in output, got: ${output}`);
});

test("child meta does not bleed into sibling loggers", () => {
  const logger = createLogger("test-sibling");
  const childA = logger.child({ userId: "user-A" });
  const childB = logger.child({ userId: "user-B" });

  const outputA = captureConsole(() => childA.info("from A"));
  const outputB = captureConsole(() => childB.info("from B"));

  assert.ok(outputA.includes("user-A"), `user-A meta should appear in childA output, got: ${outputA}`);
  assert.ok(!outputB.includes("user-A"), `user-A meta should not appear in childB output, got: ${outputB}`);
  assert.ok(outputB.includes("user-B"), `user-B meta should appear in childB output, got: ${outputB}`);
});
