"use strict";

import assert from "node:assert";
import { test } from "node:test";
import { EventEmitter } from "node:events";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  isClientAbortError,
  shouldSwallowUncaught,
  attachRequestStreamGuards,
  installProcessCrashGuard,
} from "../../../scripts/dev/httpClientAbortGuard.mjs";
import * as sharedGuard from "../../../src/shared/utils/httpClientAbortGuard.mjs";

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
    shouldSwallowUncaught(Object.assign(new Error("ECONNRESET"), { code: "ECONNRESET" }), "uncaughtException"),
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

// Production crash (2026-08-25 → 08-31, ~170 restarts, exit code 7):
// every real call site installs the guard with NO logger, so the old
// `const logger = log ?? console` default invoked the console OBJECT as a
// function inside the uncaughtException handler → TypeError inside
// process._fatalException → Node exit code 7. These children run the REAL
// production call shape; the process must survive benign aborts and still
// crash on genuine errors.
test("installProcessCrashGuard() with no logger swallows aborts instead of dying (exit-7 regression)", async () => {
  const guardPath = fileURLToPath(
    new URL("../../../src/shared/utils/httpClientAbortGuard.mjs", import.meta.url)
  );
  const script = `
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
  `;
  const { status, stdout, stderr } = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["--input-type=module", "-e", script, guardPath], {
      stdio: ["ignore", "pipe", "pipe"],
    });
    let out = "";
    let err = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("close", (status) => resolve({ status, stdout: out, stderr: err }));
    child.on("error", reject);
  });
  assert.equal(status, 0, `child must survive benign aborts; stderr: ${stderr}`);
  assert.match(stdout, /ALIVE/);
});

test("installProcessCrashGuard still crashes on genuine errors (no over-swallowing)", async () => {
  const guardPath = fileURLToPath(
    new URL("../../../src/shared/utils/httpClientAbortGuard.mjs", import.meta.url)
  );
  const script = `
    const { installProcessCrashGuard } = await import(process.argv[1]);
    installProcessCrashGuard();
    process.emit("uncaughtException", new Error("genuine failure"), "uncaughtException");
    console.log("SHOULD_NOT_REACH");
  `;
  const { status, stdout, stderr: _stderr } = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["--input-type=module", "-e", script, guardPath], {
      stdio: ["ignore", "pipe", "pipe"],
    });
    let out = "";
    let err = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("close", (status) => resolve({ status, stdout: out, stderr: err }));
    child.on("error", reject);
  });
  assert.notEqual(status, 0, "genuine errors must keep crash semantics");
  assert.doesNotMatch(stdout, /SHOULD_NOT_REACH/);
});
