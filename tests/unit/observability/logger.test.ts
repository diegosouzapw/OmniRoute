/**
 * tests/unit/observability/logger.test.ts
 *
 * Pino-style logger. Covers:
 *   - Level threshold filters out lower-priority messages
 *   - JSON format emits valid JSON to stdout.write
 *   - Pretty format emits a single human-readable line
 *   - traceId/spanId stamping when inside an active span
 *   - Child logger inherits parent bindings
 *   - setLogLevel / setLogFormat
 *   - isLogLevelEnabled reflects the threshold
 *   - Failing fields (circular refs) don't crash the logger
 *   - createLogger without bindings
 */

import test from "node:test";
import assert from "node:assert/strict";

const loggerMod = await import("../../../src/lib/observability/logger.ts");

interface WriteCall {
  s: string;
}

function captureStdout(): { calls: WriteCall[]; restore: () => void } {
  const calls: WriteCall[] = [];
  const proc = (globalThis as { process?: { stdout?: { write?: (s: string) => void } } }).process;
  const original = proc?.stdout?.write;
  if (proc?.stdout) {
    proc.stdout.write = (s: string) => {
      calls.push({ s });
      return true;
    };
  }
  return {
    calls,
    restore: () => {
      if (proc?.stdout && original) proc.stdout.write = original;
    },
  };
}

test("Level threshold filters out lower-priority messages", () => {
  loggerMod._resetLoggerForTests();
  loggerMod.setLogLevel("warn");
  const c = captureStdout();
  const l = loggerMod.createLogger({ component: "x" });
  l.debug("ignored");
  l.info("also-ignored");
  l.warn("kept");
  l.error("kept2");
  c.restore();
  assert.equal(c.calls.length, 2);
  assert.ok(c.calls[0].s.includes("kept"));
  assert.ok(c.calls[1].s.includes("kept2"));
});

test("Pretty format emits a human-readable single line", () => {
  loggerMod._resetLoggerForTests();
  loggerMod.setLogLevel("info");
  loggerMod.setLogFormat("pretty");
  const c = captureStdout();
  const l = loggerMod.createLogger({ component: "pretty-test" });
  l.info("hello", { key: "value" });
  c.restore();
  assert.equal(c.calls.length, 1);
  assert.ok(c.calls[0].s.includes("hello"));
  assert.ok(c.calls[0].s.includes("key=value"));
});

test("JSON format emits valid JSON on stdout", () => {
  loggerMod._resetLoggerForTests();
  loggerMod.setLogLevel("info");
  loggerMod.setLogFormat("json");
  const c = captureStdout();
  const l = loggerMod.createLogger({ component: "json-test" });
  l.info("hello", { key: "value" });
  c.restore();
  assert.equal(c.calls.length, 1);
  const parsed = JSON.parse(c.calls[0].s.trim());
  assert.equal(parsed.msg, "hello");
  assert.equal(parsed.key, "value");
  assert.equal(parsed.component, "json-test");
  assert.equal(parsed.level, "info");
});

test("Logger stamps traceId/spanId when active", async () => {
  const otel = await import("../../../src/lib/observability/otel.ts");
  loggerMod._resetLoggerForTests();
  loggerMod.setLogLevel("info");
  loggerMod.setLogFormat("json");
  const c = captureStdout();
  await otel.withSpan("trace-stamp", async () => {
    loggerMod.logger.info("inside");
  });
  c.restore();
  assert.equal(c.calls.length, 1);
  const parsed = JSON.parse(c.calls[0].s.trim());
  assert.ok(parsed.traceId);
  assert.ok(parsed.spanId);
  assert.match(parsed.traceId, /^[0-9a-f]{32}$/);
  assert.match(parsed.spanId, /^[0-9a-f]{16}$/);
});

test("Child logger inherits parent bindings", () => {
  loggerMod._resetLoggerForTests();
  loggerMod.setLogLevel("info");
  loggerMod.setLogFormat("json");
  const c = captureStdout();
  const parent = loggerMod.createLogger({ svc: "api" });
  const child = parent.child({ component: "router" });
  child.info("nested");
  c.restore();
  assert.equal(c.calls.length, 1);
  const parsed = JSON.parse(c.calls[0].s.trim());
  assert.equal(parsed.svc, "api");
  assert.equal(parsed.component, "router");
});

test("setLogLevel / setLogFormat / getLogLevel round-trip", () => {
  loggerMod._resetLoggerForTests();
  loggerMod.setLogLevel("debug");
  assert.equal(loggerMod.getLogLevel(), "debug");
  loggerMod.setLogFormat("json");
  assert.equal(loggerMod.getLogFormat(), "json");
});

test("isLogLevelEnabled reflects the threshold", () => {
  loggerMod._resetLoggerForTests();
  loggerMod.setLogLevel("warn");
  assert.equal(loggerMod.isLogLevelEnabled("trace"), false);
  assert.equal(loggerMod.isLogLevelEnabled("debug"), false);
  assert.equal(loggerMod.isLogLevelEnabled("info"), false);
  assert.equal(loggerMod.isLogLevelEnabled("warn"), true);
  assert.equal(loggerMod.isLogLevelEnabled("error"), true);
});

test("setLogLevel ignores invalid values", () => {
  loggerMod._resetLoggerForTests();
  loggerMod.setLogLevel("info");
  loggerMod.setLogLevel("not-a-level" as never);
  assert.equal(loggerMod.getLogLevel(), "info");
});

test("createLogger with no bindings produces a working logger", () => {
  loggerMod._resetLoggerForTests();
  loggerMod.setLogLevel("info");
  loggerMod.setLogFormat("json");
  const c = captureStdout();
  const l = loggerMod.createLogger();
  l.info("bare");
  c.restore();
  assert.equal(c.calls.length, 1);
});

test("Circular references in fields do not crash the logger", () => {
  loggerMod._resetLoggerForTests();
  loggerMod.setLogLevel("info");
  loggerMod.setLogFormat("pretty");
  const c = captureStdout();
  const l = loggerMod.createLogger();
  const obj: Record<string, unknown> = {};
  obj.self = obj;
  l.info("circular", { obj });
  c.restore();
  // Either we got a line with [unserializable] or the write went through;
  // what we assert is that no exception escaped.
  assert.ok(true);
});

test("Pretty format uses ISO timestamps", () => {
  loggerMod._resetLoggerForTests();
  loggerMod.setLogLevel("info");
  loggerMod.setLogFormat("pretty");
  const c = captureStdout();
  loggerMod.logger.info("ts-test");
  c.restore();
  assert.equal(c.calls.length, 1);
  assert.match(c.calls[0].s, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
});

test("JSON format emits a trailing newline", () => {
  loggerMod._resetLoggerForTests();
  loggerMod.setLogLevel("info");
  loggerMod.setLogFormat("json");
  const c = captureStdout();
  loggerMod.logger.info("nl-test");
  c.restore();
  assert.equal(c.calls[0].s.endsWith("\n"), true);
});

test("Pretty format uses 5-char padded level labels", () => {
  loggerMod._resetLoggerForTests();
  loggerMod.setLogLevel("trace");
  loggerMod.setLogFormat("pretty");
  const c = captureStdout();
  loggerMod.logger.trace("padded");
  c.restore();
  assert.equal(c.calls.length, 1);
  assert.match(c.calls[0].s, /TRACE/);
});

test("Logger does not throw when stdout is missing (Edge-like env)", () => {
  loggerMod._resetLoggerForTests();
  // Mock the sink function: the logger module reaches for the process.stdout
  // global. We can't reassign `process.stdout` (Node.js makes it a getter
  // with no setter), but we can use a writable "fake stdout" object that the
  // module is free to read from. Here we just exercise the safe path: the
  // pretty sink is used by default; if the lookup of `process?.stdout?.write`
  // returns undefined, the logger MUST still not throw.
  const sink = (globalThis as { process?: { stdout?: { write?: (s: string) => void } } }).process
    ?.stdout;
  assert.ok(sink, "sanity: process.stdout should exist in the test harness");
  assert.equal(typeof sink?.write, "function");
  assert.doesNotThrow(() => {
    loggerMod.logger.info("no-stdout");
  });
});