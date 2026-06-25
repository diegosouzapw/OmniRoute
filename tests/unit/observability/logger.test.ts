/**
 * Tests for the structured logger (PR-004).
 *
 * Coverage:
 *  - log.*() emit NDJSON lines on stdout/stderr at the right level.
 *  - OMNIROUTE_LOG_LEVEL filters messages below the threshold.
 *  - AsyncLocalStorage context is merged into log records (tenantId, requestId).
 *  - setLogContext + withLogContext scope correctly.
 *  - Error log includes err.type, err.message, err.stack from a thrown Error.
 *  - Pretty format emits a single-line human-readable line.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { Writable } from "node:stream";

import {
  log,
  setLogContext,
  withLogContext,
  getLogContext,
  clearLogContext,
} from "@/lib/observability/logger";

/** In-memory stream that captures every write as a line. */
class CaptureStream extends Writable {
  public lines: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override _write(chunk: any, _enc: string, cb: () => void): void {
    const s = Buffer.isBuffer(chunk) ? chunk.toString("utf8") : String(chunk);
    for (const line of s.split("\n")) {
      if (line.length > 0) this.lines.push(line);
    }
    cb();
  }
}

function withCleanEnv<T>(fn: () => T): T {
  const prev = { ...process.env };
  delete process.env.OMNIROUTE_LOG_LEVEL;
  delete process.env.OMNIROUTE_LOG_FORMAT;
  try {
    return fn();
  } finally {
    process.env = prev;
    log.resetForTests();
  }
}

function captureStreams(): { stdout: CaptureStream; stderr: CaptureStream; restore: () => void } {
  const stdout = new CaptureStream();
  const stderr = new CaptureStream();
  const origStdout = process.stdout.write.bind(process.stdout);
  const origStderr = process.stderr.write.bind(process.stderr);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  process.stdout.write = stdout.write.bind(stdout) as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  process.stderr.write = stderr.write.bind(stderr) as any;
  return {
    stdout,
    stderr,
    restore: () => {
      process.stdout.write = origStdout;
      process.stderr.write = origStderr;
    },
  };
}

test("logger: info emits a JSON line to stdout", () => {
  withCleanEnv(() => {
    process.env.OMNIROUTE_LOG_LEVEL = "info";
    const { stdout, stderr, restore } = captureStreams();
    try {
      log.info("hello", { foo: "bar" });
    } finally {
      restore();
    }
    assert.equal(stdout.lines.length, 1);
    assert.equal(stderr.lines.length, 0);
    const rec = JSON.parse(stdout.lines[0]);
    assert.equal(rec.level, 30);
    assert.equal(rec.levelLabel, "info");
    assert.equal(rec.msg, "hello");
    assert.equal(rec.foo, "bar");
    assert.ok(rec.time);
    assert.equal(rec.pid, process.pid);
  });
});

test("logger: warn/error/fatal go to stderr", () => {
  withCleanEnv(() => {
    process.env.OMNIROUTE_LOG_LEVEL = "trace";
    const { stdout, stderr, restore } = captureStreams();
    try {
      log.warn("w");
      log.error("e", new Error("boom"));
      log.fatal("f", new Error("rip"));
    } finally {
      restore();
    }
    assert.equal(stdout.lines.length, 0);
    assert.equal(stderr.lines.length, 3);
    const err = JSON.parse(stderr.lines[1]);
    assert.equal(err.level, 50);
    assert.equal(err.err.type, "Error");
    assert.equal(err.err.message, "boom");
    assert.ok(err.err.stack);
  });
});

test("logger: level filtering respects OMNIROUTE_LOG_LEVEL", () => {
  withCleanEnv(() => {
    process.env.OMNIROUTE_LOG_LEVEL = "warn";
    const { stdout, stderr, restore } = captureStreams();
    try {
      log.trace("t");
      log.debug("d");
      log.info("i");
      log.warn("w");
      log.error("e");
    } finally {
      restore();
    }
    assert.equal(stdout.lines.length, 0);
    assert.equal(stderr.lines.length, 2);
    assert.match(stderr.lines[0], /"msg":"w"/);
    assert.match(stderr.lines[1], /"msg":"e"/);
  });
});

test("logger: withLogContext merges per-request context", () => {
  withCleanEnv(() => {
    process.env.OMNIROUTE_LOG_LEVEL = "trace";
    const { stdout, restore } = captureStreams();
    try {
      withLogContext({ tenantId: "t-1", requestId: "req-abc", route: "/v1/chat" }, () => {
        log.info("inside-scope", { extra: 1 });
      });
      log.info("outside-scope");
    } finally {
      restore();
    }
    assert.equal(stdout.lines.length, 2);
    const inside = JSON.parse(stdout.lines[0]);
    assert.equal(inside.context.tenantId, "t-1");
    assert.equal(inside.context.requestId, "req-abc");
    assert.equal(inside.context.route, "/v1/chat");
    assert.equal(inside.extra, 1);
    const outside = JSON.parse(stdout.lines[1]);
    assert.equal(inside.msg, "inside-scope");
    assert.equal(outside.msg, "outside-scope");
    // Outside the scope, context should not be set.
    assert.equal(outside.context, undefined);
  });
});

test("logger: setLogContext applies globally within an async scope", () => {
  withCleanEnv(() => {
    process.env.OMNIROUTE_LOG_LEVEL = "trace";
    const { stdout, restore } = captureStreams();
    try {
      setLogContext({ tenantId: "global-tenant" });
      assert.equal(getLogContext()?.tenantId, "global-tenant");
      log.info("inside");
      clearLogContext();
      log.info("cleared");
    } finally {
      restore();
    }
    const inside = JSON.parse(stdout.lines[0]);
    const cleared = JSON.parse(stdout.lines[1]);
    assert.equal(inside.context?.tenantId, "global-tenant");
    assert.equal(cleared.context, undefined);
  });
});

test("logger: error log records Error type/message/stack", () => {
  withCleanEnv(() => {
    process.env.OMNIROUTE_LOG_LEVEL = "trace";
    const { stderr, restore } = captureStreams();
    try {
      const e = new TypeError("bad input");
      log.error("caught", e, { opId: "x" });
    } finally {
      restore();
    }
    const rec = JSON.parse(stderr.lines[0]);
    assert.equal(rec.levelLabel, "error");
    assert.equal(rec.err.type, "TypeError");
    assert.equal(rec.err.message, "bad input");
    assert.match(rec.err.stack, /TypeError: bad input/);
    assert.equal(rec.opId, "x");
  });
});

test("logger: pretty format emits a single-line human-readable record", () => {
  withCleanEnv(() => {
    process.env.OMNIROUTE_LOG_LEVEL = "trace";
    process.env.OMNIROUTE_LOG_FORMAT = "pretty";
    const { stdout, restore } = captureStreams();
    try {
      log.info("hello", { foo: "bar" });
    } finally {
      restore();
    }
    const line = stdout.lines[0];
    // Format: "<ISO time> INFO  hello {\"foo\":\"bar\"}"
    assert.match(line, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z INFO {3}hello /);
    assert.match(line, /"foo":"bar"/);
  });
});

test("logger: invalid OMNIROUTE_LOG_LEVEL falls back to info", () => {
  withCleanEnv(() => {
    process.env.OMNIROUTE_LOG_LEVEL = "bogus";
    const { stdout, stderr, restore } = captureStreams();
    try {
      log.debug("d");
      log.info("i");
      log.warn("w");
    } finally {
      restore();
    }
    assert.equal(stdout.lines.length, 1);
    assert.equal(stderr.lines.length, 1);
    assert.match(stdout.lines[0], /"msg":"i"/);
    assert.match(stderr.lines[0], /"msg":"w"/);
  });
});

test("logger: nested withLogContext scopes merge correctly", () => {
  withCleanEnv(() => {
    process.env.OMNIROUTE_LOG_LEVEL = "trace";
    const { stdout, restore } = captureStreams();
    try {
      withLogContext({ tenantId: "outer" }, () => {
        log.info("first");
        withLogContext({ requestId: "inner-req" }, () => {
          log.info("second");
        });
        log.info("third");
      });
    } finally {
      restore();
    }
    const first = JSON.parse(stdout.lines[0]);
    const second = JSON.parse(stdout.lines[1]);
    const third = JSON.parse(stdout.lines[2]);
    assert.equal(first.context.tenantId, "outer");
    assert.equal(first.context.requestId, undefined);
    assert.equal(second.context.tenantId, "outer");
    assert.equal(second.context.requestId, "inner-req");
    assert.equal(third.context.tenantId, "outer");
    assert.equal(third.context.requestId, undefined);
  });
});
