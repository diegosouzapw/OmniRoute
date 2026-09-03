"use strict";

import assert from "node:assert";
import { test } from "node:test";

// Production calls installProcessCrashGuard() with NO argument in
// apiBridgeServer.ts / liveServer.ts / embedWsProxy.ts. The default logger
// must be callable; this file runs in its own node:test process, so the
// module-level installed flag starts unset and the no-arg path is exercised
// for real. Emitting "uncaughtException" through process.emit would trip the
// test runner's own listener, so the guard handler is invoked directly.
import { installProcessCrashGuard } from "../../../src/shared/utils/httpClientAbortGuard.mjs";

test("installProcessCrashGuard() with no argument swallows a client abort without throwing", () => {
  const warnings = [];
  const originalWarn = console.warn;
  console.warn = (...args) => warnings.push(args);
  try {
    installProcessCrashGuard();
    const handlers = process
      .listeners("uncaughtException")
      .filter((fn) => fn.toString().includes("swallowed client-abort"));
    assert.ok(handlers.length > 0, "guard handler must be registered");
    const abortErr = Object.assign(new Error("aborted"), { code: "ECONNRESET" });
    // A broken default logger (console is an object, not a function) throws
    // TypeError here — that is what took the production process down.
    assert.doesNotThrow(() => handlers[0](abortErr, "uncaughtException"));
    assert.equal(warnings.length, 1, "the swallowed abort must be logged once");
    assert.ok(String(warnings[0][1]).includes("swallowed client-abort"));
  } finally {
    console.warn = originalWarn;
  }
});
