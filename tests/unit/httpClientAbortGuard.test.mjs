"use strict";

import assert from "node:assert";
import { test } from "node:test";
import { EventEmitter } from "node:events";
import { spawn } from "node:child_process";
import {
  isClientAbortError,
  shouldSwallowUncaught,
  attachRequestStreamGuards,
  installProcessCrashGuard,
} from "../../scripts/dev/httpClientAbortGuard.mjs";
import * as sharedGuard from "../../src/shared/utils/httpClientAbortGuard.mjs";

// The dev server imports from scripts/dev/httpClientAbortGuard.mjs, while the
// TypeScript servers (apiBridgeServer, liveServer, embedWsProxy) import from
// src/shared/utils/httpClientAbortGuard.mjs. The scripts/dev copy must be a pure
// re-export of the shared implementation — verify they are the SAME functions
// (single source of truth, no drift).
test("scripts/dev guard re-exports the shared src implementation (single source of truth)", () => {
  assert.equal(isClientAbortError, sharedGuard.isClientAbortError);
  assert.equal(shouldSwallowUncaught, sharedGuard.shouldSwallowUncaught);
  assert.equal(attachRequestStreamGuards, sharedGuard.attachRequestStreamGuards);
  assert.equal(installProcessCrashGuard, sharedGuard.installProcessCrashGuard);
  // And the shared module exposes everything the TS servers rely on.
  for (const name of [
    "isClientAbortError",
    "shouldSwallowUncaught",
    "attachRequestStreamGuards",
    "installProcessCrashGuard",
  ]) {
    assert.equal(typeof sharedGuard[name], "function", `shared guard must export ${name}`);
  }
});

// Minimal stand-ins for IncomingMessage / ServerResponse that expose the
// `error` event (Node's http streams are EventEmitters).
function makeReq() {
  return new EventEmitter();
}
function makeRes() {
  const res = new EventEmitter();
  res.end = () => res;
  res.write = () => true;
  return res;
}

test("isClientAbortError matches the exact production crash signature", () => {
  // Reproduces the Node `abortIncoming` error seen in the app log:
  //   uncaughtException: aborted / Error: aborted (no code)
  const aborted = Object.assign(new Error("aborted"), {});
  assert.equal(isClientAbortError(aborted), true, "plain 'aborted' must be absorbed");

  for (const code of [
    "ECONNRESET",
    "EPIPE",
    "ERR_STREAM_PREMATURE_CLOSE",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ENOTCONN",
    "ECANCELED",
  ]) {
    const err = Object.assign(new Error(code), { code });
    assert.equal(isClientAbortError(err), true, `${code} must be absorbed`);
  }
});

test("isClientAbortError rejects genuine server errors", () => {
  const real = Object.assign(new Error("boom"), { code: "ENOSPC" });
  assert.equal(isClientAbortError(real), false);
  const noCode = new Error("something else entirely");
  assert.equal(isClientAbortError(noCode), false);
});

test("attachRequestStreamGuards swallows a client abort on req without throwing", () => {
  const req = makeReq();
  const res = makeRes();
  attachRequestStreamGuards(req, res);

  // Must NOT throw / bubble as uncaughtException.
  assert.doesNotThrow(() => {
    req.emit("error", Object.assign(new Error("aborted"), {}));
    res.emit("error", Object.assign(new Error("aborted"), {}));
  });
});

test("attachRequestStreamGuards is idempotent (no double listeners / no throw)", () => {
  const req = makeReq();
  const res = makeRes();
  attachRequestStreamGuards(req, res);
  assert.doesNotThrow(() => attachRequestStreamGuards(req, res));
  // A second abort must also be absorbed quietly.
  assert.doesNotThrow(() => {
    req.emit("error", Object.assign(new Error("ECONNRESET"), { code: "ECONNRESET" }));
  });
});

test("shouldSwallowUncaught absorbs the real 'aborted' uncaughtException signature", () => {
  // The exact error Node raises from http.Server#abortIncoming in the log:
  //   uncaughtException: aborted / Error: aborted (no code)
  const abortErr = new Error("aborted");
  assert.equal(shouldSwallowUncaught(abortErr, "uncaughtException"), true);
  assert.equal(shouldSwallowUncaught(abortErr, undefined), true);
  assert.equal(
    shouldSwallowUncaught(
      Object.assign(new Error("ECONNRESET"), { code: "ECONNRESET" }),
      "uncaughtException"
    ),
    true
  );
});

test("shouldSwallowUncaught preserves crash semantics for genuine errors", () => {
  const realErr = new Error("genuine failure");
  assert.equal(shouldSwallowUncaught(realErr, "uncaughtException"), false);
  const realErr2 = Object.assign(new Error("disk full"), { code: "ENOSPC" });
  assert.equal(shouldSwallowUncaught(realErr2, "uncaughtException"), false);
});

test("installProcessCrashGuard does not throw on import and is idempotent", () => {
  assert.doesNotThrow(() => installProcessCrashGuard(() => {}));
  assert.doesNotThrow(() => installProcessCrashGuard(() => {}));
});
test("isClientAbortError matches OmniRoute SSE AbortError shapes (#fix-crash-guard-logger-7)", () => {
  // Exact production shape from the 2026-08-31 crash log:
  //   ⨯ unhandledRejection: Error [AbortError]: request_signal_aborted
  const sseAbort = Object.assign(new Error("request_signal_aborted"), { name: "AbortError" });
  assert.equal(isClientAbortError(sseAbort), true, "SSE teardown AbortError must be absorbed");
  // fetch / DOMException-style cancellation
  const domAbort = new DOMException("This operation was aborted", "AbortError");
  assert.equal(isClientAbortError(domAbort), true, "DOMException AbortError must be absorbed");
  // A genuine TypeError that merely MENTIONS 'abort' must NOT be absorbed.
  const typo = new TypeError("Cannot read properties of undefined (reading 'abort')");
  assert.equal(isClientAbortError(typo), false);
});

test("shouldSwallowUncaught absorbs SSE AbortError rejections", () => {
  const sseAbort = Object.assign(new Error("request_signal_aborted"), { name: "AbortError" });
  assert.equal(shouldSwallowUncaught(sseAbort, "unhandledRejection"), true);
});

test("isClientAbortError absorbs combo abort reasons (exact 2026-08-31 hedge-cancelled crash shape)", () => {
  // omniroute.log, 2026-08-31T23:47Z: the process died at this guard's own
  // uncaughtException re-throw with
  //   Error [AbortError]: hedge-cancelled
  //       at ... AbortController.abort ... handleDisconnect
  // targetTimeoutRunner.ts aborts with new Error("hedge-cancelled"); by the
  // time it escapes, the thrower has stamped name = "AbortError" on it.
  const relabelled = Object.assign(new Error("hedge-cancelled"), { name: "AbortError" });
  assert.equal(isClientAbortError(relabelled), true, "relabelled AbortError must be absorbed");
  const raw = new Error("hedge-cancelled");
  assert.equal(isClientAbortError(raw), true, "raw abort reason (name=Error) must be absorbed");
  const stalled = new Error("combo-per-model-timeout");
  assert.equal(
    isClientAbortError(stalled),
    true,
    "per-model timeout abort reason must be absorbed"
  );
  // Look-alikes that are genuine faults keep crash semantics (exact match only).
  assert.equal(isClientAbortError(new Error("hedge-cancelled: unexpected state")), false);
  assert.equal(
    isClientAbortError(new TypeError("Cannot read properties of undefined (reading 'hedge')")),
    false
  );
  assert.equal(
    isClientAbortError(Object.assign(new Error("disk full"), { code: "ENOSPC" })),
    false
  );
});

test("combo abort reasons in the guard stay in sync with comboAbortReasons.ts", async (t) => {
  let mod;
  try {
    mod = await import("../../open-sse/services/combo/comboAbortReasons.ts");
  } catch {
    t.skip("TypeScript loader (tsx) not active in this run");
    return;
  }
  for (const reason of [mod.COMBO_HEDGE_CANCELLED_REASON, mod.COMBO_PER_MODEL_TIMEOUT_REASON]) {
    assert.equal(typeof reason, "string");
    assert.equal(isClientAbortError(new Error(reason)), true, reason + " must be absorbed");
  }
});

test("shouldSwallowUncaught absorbs the hedge-cancelled uncaughtException (2026-08-31 crash)", () => {
  const hedged = Object.assign(new Error("hedge-cancelled"), { name: "AbortError" });
  assert.equal(shouldSwallowUncaught(hedged, "uncaughtException"), true);
  assert.equal(shouldSwallowUncaught(hedged, "unhandledRejection"), true);
  assert.equal(shouldSwallowUncaught(hedged, undefined), true);
});

function runGuardChild(script) {
  // Hand the child a file:// URL, not a filesystem path: dynamic import() of a
  // bare Windows path ("C:...") fails with ERR_UNSUPPORTED_ESM_URL_SCHEME.
  const guardUrl = new URL("../../src/shared/utils/httpClientAbortGuard.mjs", import.meta.url).href;
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["--input-type=module", "-e", script, guardUrl], {
      stdio: ["ignore", "pipe", "pipe"],
    });
    let out = "";
    let err = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("close", (status) => resolve({ status, stdout: out, stderr: err }));
    child.on("error", reject);
  });
}

// Production crash (2026-08-25 -> 08-31, ~170 restarts, exit code 7):
// every real call site installs the guard with NO logger, so the old
// "const logger = log ?? console" default invoked the console OBJECT as a
// function inside the uncaughtException handler -> TypeError inside
// process._fatalException -> Node exit code 7. These children run the REAL
// production call shape; the process must survive benign aborts and still
// crash on genuine errors.
test("installProcessCrashGuard() with no logger swallows aborts instead of dying (exit-7 regression)", async () => {
  const { status, stdout, stderr } = await runGuardChild(`
    const { installProcessCrashGuard } = await import(process.argv[1]);
    installProcessCrashGuard(); // production call sites pass NO logger
    process.emit(
      "uncaughtException",
      Object.assign(new Error("aborted"), { code: "ECONNRESET" }),
      "uncaughtException"
    );
    process.emit(
      "unhandledRejection",
      Object.assign(new Error("request_signal_aborted"), { name: "AbortError" }),
      Promise.resolve()
    );
    console.log("ALIVE");
    process.exit(0);
  `);
  assert.equal(status, 0, "child must survive benign aborts; stderr: " + stderr);
  assert.match(stdout, /ALIVE/);
});

test("installProcessCrashGuard() survives the real hedge-cancelled uncaughtException", async () => {
  // Replays the 2026-08-31 production crash through a real process: the abort
  // reason escapes an abort listener as an uncaughtException with the exact
  // name/message the log recorded. Pre-fix this exits non-zero at the re-throw.
  const { status, stdout, stderr } = await runGuardChild(`
    const { installProcessCrashGuard } = await import(process.argv[1]);
    installProcessCrashGuard();
    const ctl = new AbortController();
    ctl.signal.addEventListener("abort", () => {
      const err = ctl.signal.reason;
      err.name = "AbortError";
      throw err; // escapes the listener -> uncaughtException
    }, { once: true });
    process.once("exit", (code) => { if (code === 0) console.log("ALIVE"); });
    setTimeout(() => process.exit(0), 50);
    ctl.abort(new Error("hedge-cancelled"));
    // The verified production route: a leaked upstreamTimeouts abortPromise
    // listener rejected a promise nothing awaited -> unhandledRejection.
    Promise.reject(Object.assign(new Error("hedge-cancelled"), { name: "AbortError" }));
    // streamHandler.ts aborts with raw strings; undici can reject with them verbatim.
    Promise.reject("hedge-cancelled");
    Promise.reject("request_signal_aborted");
  `);
  assert.equal(status, 0, "child must survive hedge-cancelled; stderr: " + stderr);
  assert.match(stdout, /ALIVE/);
});

test("installProcessCrashGuard still crashes on genuine errors (no over-swallowing)", async () => {
  const { status, stdout } = await runGuardChild(`
    const { installProcessCrashGuard } = await import(process.argv[1]);
    installProcessCrashGuard();
    console.log("LOADED"); // proves the failure below is the re-throw, not a module-load error
    process.emit("uncaughtException", new Error("genuine failure"), "uncaughtException");
    console.log("SHOULD_NOT_REACH");
  `);
  assert.match(stdout, /LOADED/, "guard must have loaded before the genuine error was raised");
  assert.notEqual(status, 0, "genuine errors must keep crash semantics");
  assert.doesNotMatch(stdout, /SHOULD_NOT_REACH/);
});
test("isClientAbortError absorbs raw string abort reasons from streamHandler (undici rejects with signal.reason verbatim)", () => {
  for (const reason of [
    "hedge-cancelled",
    "combo-per-model-timeout",
    "request_signal_aborted",
    "client_closed",
    "cancelled",
  ]) {
    assert.equal(isClientAbortError(reason), true, reason + " must be absorbed");
    assert.equal(shouldSwallowUncaught(reason, "unhandledRejection"), true);
  }
  assert.equal(isClientAbortError("genuine failure"), false);
  assert.equal(isClientAbortError(""), false);
  assert.equal(isClientAbortError(42), false);
  assert.equal(isClientAbortError(null), false);
});
