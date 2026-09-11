import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createLogger, getLogLevel } from "../src/shared/logger.js";

function capture(): {
  warns: string[];
  errors: string[];
  restore: () => void;
} {
  const warns: string[] = [];
  const errors: string[] = [];
  const origWarn = console.warn;
  const origError = console.error;
  console.warn = (...args: unknown[]) => {
    warns.push(args.map(String).join(" "));
  };
  console.error = (...args: unknown[]) => {
    errors.push(args.map(String).join(" "));
  };
  return {
    warns,
    errors,
    restore() {
      console.warn = origWarn;
      console.error = origError;
    },
  };
}

describe("shared leveled logger (v1 parity)", () => {
  it("default level is warn", () => {
    assert.equal(getLogLevel(), "warn");
  });

  it("warn logger emits error+warn, suppresses info+debug", () => {
    const log = createLogger("warn");
    const cap = capture();
    try {
      log.error("e");
      log.warn("w");
      log.info("i");
      log.debug("d");
    } finally {
      cap.restore();
    }
    assert.equal(cap.errors.length, 1);
    assert.equal(cap.warns.length, 1);
  });

  it("error logger emits only error", () => {
    const log = createLogger("error");
    const cap = capture();
    try {
      log.error("e");
      log.warn("w");
      log.info("i");
      log.debug("d");
    } finally {
      cap.restore();
    }
    assert.equal(cap.errors.length, 1);
    assert.equal(cap.warns.length, 0);
  });

  it("info logger emits error+warn+info, suppresses debug", () => {
    const log = createLogger("info");
    const cap = capture();
    try {
      log.error("e");
      log.warn("w");
      log.info("i");
      log.debug("d");
    } finally {
      cap.restore();
    }
    assert.equal(cap.errors.length, 1);
    assert.equal(cap.warns.length, 2);
  });

  it("debug logger emits everything", () => {
    const log = createLogger("debug");
    const cap = capture();
    try {
      log.error("e");
      log.warn("w");
      log.info("i");
      log.debug("d");
    } finally {
      cap.restore();
    }
    assert.equal(cap.errors.length, 1);
    assert.equal(cap.warns.length, 3);
  });

  it("lines carry the namespace tag and the uppercased level", () => {
    const log = createLogger("debug");
    const cap = capture();
    try {
      log.warn("hello");
      log.error("boom");
    } finally {
      cap.restore();
    }
    assert.match(cap.warns[0], /\[omniroute-plugin\] \[WARN\] hello/);
    assert.match(cap.errors[0], /\[omniroute-plugin\] \[ERROR\] boom/);
  });

  it("child loggers append their tag after the namespace", () => {
    const log = createLogger("debug").child("[v2]");
    const cap = capture();
    try {
      log.info("hello");
    } finally {
      cap.restore();
    }
    assert.match(cap.warns[0], /\[omniroute-plugin\]\[v2\] \[INFO\] hello/);
  });

  it("always() emits regardless of level", () => {
    const log = createLogger("error");
    const cap = capture();
    try {
      log.always("breadcrumb");
    } finally {
      cap.restore();
    }
    assert.equal(cap.warns.length, 1);
    assert.match(cap.warns[0], /breadcrumb/);
  });
});
