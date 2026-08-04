import assert from "node:assert/strict";
import { afterEach, describe, it, mock } from "node:test";
import {
  __resetBasePathFetchForTests,
  installBasePathFetch,
} from "../../../src/shared/utils/basePathFetch";

describe("installBasePathFetch", () => {
  afterEach(() => {
    __resetBasePathFetchForTests();
  });

  it("is a no-op when basePath is empty", async () => {
    const native = mock.fn(async () => new Response("ok"));
    const originalFetch = globalThis.fetch;
    globalThis.fetch = native as unknown as typeof fetch;
    try {
      const uninstall = installBasePathFetch("");
      await fetch("/api/health/ping");
      // No-op install never wraps fetch, so the call keeps its original single-argument
      // shape (the caller passed no `init`) instead of the two-argument shape the wrapper
      // produces once basePath is set.
      assert.deepEqual(native.mock.calls[0].arguments, ["/api/health/ping"]);
      uninstall();
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("prefixes absolute paths on fetch when basePath is set", async () => {
    const native = mock.fn(async () => new Response("ok"));
    const originalFetch = globalThis.fetch;
    globalThis.fetch = native as unknown as typeof fetch;
    try {
      const uninstall = installBasePathFetch("/omniroute");
      await fetch("/api/health/ping");
      assert.deepEqual(native.mock.calls[0].arguments, ["/omniroute/api/health/ping", undefined]);
      uninstall();
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("does not double-prefix already-prefixed paths", async () => {
    const native = mock.fn(async () => new Response("ok"));
    const originalFetch = globalThis.fetch;
    globalThis.fetch = native as unknown as typeof fetch;
    try {
      const uninstall = installBasePathFetch("/omniroute");
      await fetch("/omniroute/api/health/ping");
      assert.deepEqual(native.mock.calls[0].arguments, ["/omniroute/api/health/ping", undefined]);
      uninstall();
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("restores native fetch after last uninstall", async () => {
    const native = mock.fn(async () => new Response("ok"));
    const originalFetch = globalThis.fetch;
    globalThis.fetch = native as unknown as typeof fetch;
    try {
      const a = installBasePathFetch("/omniroute");
      const b = installBasePathFetch("/omniroute");
      a();
      await fetch("/api/x");
      assert.deepEqual(native.mock.calls[0].arguments, ["/omniroute/api/x", undefined]);
      b();
      native.mock.resetCalls();
      await fetch("/api/x");
      // Once the last consumer uninstalls, fetch is native again — same single-argument
      // call shape as the no-op case above.
      assert.deepEqual(native.mock.calls[0].arguments, ["/api/x"]);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
