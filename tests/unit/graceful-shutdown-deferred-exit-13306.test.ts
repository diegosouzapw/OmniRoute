import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

type GracefulShutdownModule = typeof import("../../src/lib/gracefulShutdown.ts");

const gracefulShutdownUrl = pathToFileURL(join(process.cwd(), "src/lib/gracefulShutdown.ts")).href;

// #13306: on Windows, sql.js's Emscripten WASM build leaves pending libuv async-handle
// teardown work in flight after a statement has run (db.run()/adapter.exec()). Calling
// process.exit() tears the event loop down synchronously, and libuv's Windows async-handle
// close path asserts `!(handle->flags & UV_HANDLE_CLOSING)` while that teardown work is
// still pending -> hard abort (exit 127). The fix defers `process.exit(0)` by one macrotask
// after the shutdown cleanup promise resolves (mirrors the `setTimeout(() =>
// process.exit(0), n)` pattern already used throughout 9router's own shutdown call sites),
// giving sql.js's pending libuv work a chance to settle before the event loop tears down.
//
// The Windows abort itself cannot be reproduced here (Linux's unix libuv backend has no
// equivalent assertion, matching the reporter's own cross-platform matrix) — this test pins
// the *ordering* contract the fix depends on: process.exit(0) must not fire in the same
// microtask turn the cleanup promise resolves in, it must be deferred to a later macrotask.
test("graceful shutdown defers process.exit(0) to a macrotask after cleanup resolves (#13306)", async () => {
  const previousState = globalThis.__omnirouteShutdown;
  const previousRequestShutdown = globalThis.__omnirouteRequestShutdown;
  const previousCustomServerOwner = globalThis.__omnirouteCustomServerOwnsShutdown;
  const previousExit = process.exit;
  const listenersBefore = process.listeners("SIGTERM");

  delete globalThis.__omnirouteShutdown;
  delete globalThis.__omnirouteCustomServerOwnsShutdown;

  const exitCalls: Array<number | undefined> = [];
  process.exit = ((code?: number) => {
    exitCalls.push(code);
    return undefined as never;
  }) as typeof process.exit;

  let resolveCleanup!: () => void;
  const cleanupPromise = new Promise<void>((resolve) => {
    resolveCleanup = resolve;
  });
  globalThis.__omnirouteRequestShutdown = () => cleanupPromise;

  try {
    const shutdownModule = (await import(
      `${gracefulShutdownUrl}?issue13306=${Date.now()}`
    )) as GracefulShutdownModule;
    shutdownModule.initGracefulShutdown();

    const addedListener = process
      .listeners("SIGTERM")
      .find((listener) => !listenersBefore.includes(listener));
    assert.ok(addedListener, "initGracefulShutdown() must register a new SIGTERM listener");

    // Trigger the shutdown closure directly — do NOT emit a real SIGTERM in the test process.
    (addedListener as () => void)();
    resolveCleanup();

    // Let the shutdown closure's own `.then()` continuation run: it was attached to
    // `cleanupPromise` before this `await`, so it settles first on the microtask queue.
    await cleanupPromise;
    await Promise.resolve();

    assert.deepEqual(
      exitCalls,
      [],
      "process.exit(0) must not fire in the same microtask turn the cleanup promise resolves in"
    );

    // Now let a macrotask elapse — this is where the deferred process.exit(0) must land.
    await new Promise((resolve) => setTimeout(resolve, 10));

    assert.deepEqual(exitCalls, [0], "process.exit(0) must still run, deferred by one macrotask");
  } finally {
    process.exit = previousExit;
    for (const listener of process.listeners("SIGTERM")) {
      if (!listenersBefore.includes(listener)) process.removeListener("SIGTERM", listener);
    }
    if (previousState === undefined) delete globalThis.__omnirouteShutdown;
    else globalThis.__omnirouteShutdown = previousState;
    if (previousRequestShutdown === undefined) delete globalThis.__omnirouteRequestShutdown;
    else globalThis.__omnirouteRequestShutdown = previousRequestShutdown;
    if (previousCustomServerOwner === undefined) {
      delete globalThis.__omnirouteCustomServerOwnsShutdown;
    } else {
      globalThis.__omnirouteCustomServerOwnsShutdown = previousCustomServerOwner;
    }
  }
});
