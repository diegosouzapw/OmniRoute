import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

type GracefulShutdownModule = typeof import("../../src/lib/gracefulShutdown.ts");

const gracefulShutdownUrl = pathToFileURL(join(process.cwd(), "src/lib/gracefulShutdown.ts")).href;
const shutdownSignals = ["SIGTERM", "SIGINT", "SIGHUP"] as const;

// #8045: on Windows, closing the console window delivers CTRL_CLOSE_EVENT, which
// Node/libuv maps to a JS-visible "SIGHUP" event (confirmed: nodejs/node#10165,
// Node process docs — "SIGHUP is generated on Windows when the console window is
// closed"). Before this fix, initGracefulShutdown() only registered SIGTERM/SIGINT,
// so the "close the window" path never ran cleanup() (WAL checkpoint(TRUNCATE) +
// closeDbInstance()), leaving storage.sqlite's WAL un-checkpointed for the next launch.
test("graceful shutdown listeners remain process-singletons across HMR module instances", async () => {
  const previousState = globalThis.__omnirouteShutdown;
  const previousRequestShutdown = globalThis.__omnirouteRequestShutdown;
  const previousCustomServerOwner = globalThis.__omnirouteCustomServerOwnsShutdown;
  const listenersBefore = new Map(
    shutdownSignals.map((signal) => [signal, process.listeners(signal)] as const)
  );
  delete globalThis.__omnirouteShutdown;
  delete globalThis.__omnirouteRequestShutdown;
  delete globalThis.__omnirouteCustomServerOwnsShutdown;

  try {
    const first = (await import(
      `${gracefulShutdownUrl}?phase4=shutdown-a`
    )) as GracefulShutdownModule;
    const second = (await import(
      `${gracefulShutdownUrl}?phase4=shutdown-b`
    )) as GracefulShutdownModule;

    first.initGracefulShutdown();
    assert.equal(globalThis.__omnirouteRequestShutdown, first.requestGracefulShutdown);
    for (const signal of shutdownSignals) {
      assert.equal(process.listenerCount(signal), listenersBefore.get(signal)!.length + 1);
    }

    second.initGracefulShutdown();
    for (const signal of shutdownSignals) {
      assert.equal(
        process.listenerCount(signal),
        listenersBefore.get(signal)!.length + 1,
        `${signal} listener must not be duplicated by HMR re-initialization`
      );
    }
  } finally {
    for (const signal of shutdownSignals) {
      const previousListeners = listenersBefore.get(signal)!;
      for (const listener of process.listeners(signal)) {
        if (!previousListeners.includes(listener)) process.removeListener(signal, listener);
      }
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

test("a custom server owner receives cleanup without duplicate process signal listeners", async () => {
  const previousState = globalThis.__omnirouteShutdown;
  const previousRequestShutdown = globalThis.__omnirouteRequestShutdown;
  const previousCustomServerOwner = globalThis.__omnirouteCustomServerOwnsShutdown;
  const listenerCounts = new Map(
    shutdownSignals.map((signal) => [signal, process.listenerCount(signal)] as const)
  );

  delete globalThis.__omnirouteShutdown;
  delete globalThis.__omnirouteRequestShutdown;
  globalThis.__omnirouteCustomServerOwnsShutdown = true;

  try {
    const shutdownModule = (await import(
      `${gracefulShutdownUrl}?phase4=custom-owner`
    )) as GracefulShutdownModule;
    shutdownModule.initGracefulShutdown();

    assert.equal(globalThis.__omnirouteRequestShutdown, shutdownModule.requestGracefulShutdown);
    for (const signal of shutdownSignals) {
      assert.equal(process.listenerCount(signal), listenerCounts.get(signal));
    }
  } finally {
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
