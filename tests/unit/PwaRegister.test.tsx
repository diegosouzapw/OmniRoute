// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PwaRegister } from "../../src/shared/components/PwaRegister";

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => {
    container.remove();
  });
  return container;
}

function mount() {
  const container = makeContainer();
  const root = createRoot(container);
  act(() => {
    root.render(<PwaRegister />);
  });
  cleanupCallbacks.push(() => root.unmount());
}

describe("PwaRegister", () => {
  const originalServiceWorker = (navigator as any).serviceWorker;
  const originalCaches = (globalThis as any).caches;

  afterEach(() => {
    cleanupCallbacks.splice(0).forEach((fn) => fn());
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    Object.defineProperty(navigator, "serviceWorker", {
      value: originalServiceWorker,
      configurable: true,
    });
    (globalThis as any).caches = originalCaches;
  });

  beforeEach(() => {
    cleanupCallbacks.length = 0;
    sessionStorage.clear();
  });

  it("unregisters leftover service workers and clears caches outside production", async () => {
    vi.stubEnv("NODE_ENV", "development");

    const unregister1 = vi.fn().mockResolvedValue(true);
    const unregister2 = vi.fn().mockResolvedValue(true);
    const getRegistrations = vi
      .fn()
      .mockResolvedValue([{ unregister: unregister1 }, { unregister: unregister2 }]);
    const register = vi.fn();
    Object.defineProperty(navigator, "serviceWorker", {
      value: { getRegistrations, register },
      configurable: true,
    });

    const cachesDelete = vi.fn().mockResolvedValue(true);
    const cachesKeys = vi.fn().mockResolvedValue(["omniroute-pwa-v1", "omniroute-pwa-v2"]);
    (globalThis as any).caches = { keys: cachesKeys, delete: cachesDelete };

    mount();
    // Flush the promise chains kicked off inside the effect.
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(getRegistrations).toHaveBeenCalledTimes(1);
    expect(unregister1).toHaveBeenCalledTimes(1);
    expect(unregister2).toHaveBeenCalledTimes(1);
    expect(cachesKeys).toHaveBeenCalledTimes(1);
    expect(cachesDelete).toHaveBeenCalledWith("omniroute-pwa-v1");
    expect(cachesDelete).toHaveBeenCalledWith("omniroute-pwa-v2");
    expect(register).not.toHaveBeenCalled();
  });

  it("drops a stale worker and reloads once when the served script changed", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const reload = vi.fn();
    vi.stubGlobal("location", { ...window.location, reload });

    const unregister = vi.fn().mockResolvedValue(true);
    const update = vi.fn().mockResolvedValue(undefined);
    const getRegistrations = vi
      .fn()
      .mockResolvedValue([
        { active: { scriptURL: "https://app.example/sw.js" }, unregister, update },
      ]);
    const register = vi.fn().mockResolvedValue({});
    Object.defineProperty(navigator, "serviceWorker", {
      value: { getRegistrations, register },
      configurable: true,
    });

    const cachesDelete = vi.fn().mockResolvedValue(true);
    const cachesKeys = vi.fn().mockResolvedValue(["omniroute-pwa-v3"]);
    (globalThis as any).caches = { keys: cachesKeys, delete: cachesDelete };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('const CACHE_NAME = "omniroute-pwa-v3-NEWBUILD";'),
    });
    vi.stubGlobal("fetch", fetchMock);

    mount();
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(unregister).toHaveBeenCalledTimes(1);
    expect(cachesDelete).toHaveBeenCalledWith("omniroute-pwa-v3");
    expect(reload).toHaveBeenCalledTimes(1);
    expect(register).not.toHaveBeenCalled();
  });

  it("still detects a stale cache when the served worker is minified", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const reload = vi.fn();
    vi.stubGlobal("location", { ...window.location, reload });

    const unregister = vi.fn().mockResolvedValue(true);
    Object.defineProperty(navigator, "serviceWorker", {
      value: {
        getRegistrations: vi
          .fn()
          .mockResolvedValue([{ active: { scriptURL: "https://app.example/sw.js" }, unregister }]),
        register: vi.fn().mockResolvedValue({}),
      },
      configurable: true,
    });
    (globalThis as any).caches = {
      keys: vi.fn().mockResolvedValue(["omniroute-pwa-v3"]),
      delete: vi.fn().mockResolvedValue(true),
    };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        text: () =>
          Promise.resolve('const CACHE_NAME="omniroute-pwa-v3-NEW";self.addEventListener'),
      })
    );

    mount();
    await act(async () => {
      for (let i = 0; i < 12; i++) await Promise.resolve();
    });

    expect(unregister).toHaveBeenCalledTimes(1);
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("does not reload again once the reset flag is set", async () => {
    vi.stubEnv("NODE_ENV", "production");
    sessionStorage.setItem("omniroute-sw-reset", "1");
    const reload = vi.fn();
    vi.stubGlobal("location", { ...window.location, reload });

    const register = vi.fn().mockResolvedValue({});
    Object.defineProperty(navigator, "serviceWorker", {
      value: {
        getRegistrations: vi
          .fn()
          .mockResolvedValue([
            { active: { scriptURL: "https://app.example/sw.js" }, unregister: vi.fn() },
          ]),
        register,
      },
      configurable: true,
    });
    (globalThis as any).caches = {
      keys: vi.fn().mockResolvedValue(["omniroute-pwa-v3"]),
      delete: vi.fn().mockResolvedValue(true),
    };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('const CACHE_NAME = "omniroute-pwa-v3-NEW";'),
      })
    );

    mount();
    await act(async () => {
      for (let i = 0; i < 12; i++) await Promise.resolve();
    });

    expect(reload).not.toHaveBeenCalled();
    expect(register).toHaveBeenCalledTimes(1);
  });

  it("registers the service worker in production without unregistering anything", async () => {
    vi.stubEnv("NODE_ENV", "production");

    const getRegistrations = vi.fn().mockResolvedValue([]);
    const register = vi.fn().mockResolvedValue({});
    Object.defineProperty(navigator, "serviceWorker", {
      value: { getRegistrations, register },
      configurable: true,
    });

    const cachesKeys = vi.fn().mockResolvedValue([]);
    (globalThis as any).caches = { keys: cachesKeys, delete: vi.fn() };

    mount();
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    // #11779: the worker URL carries the build id so a deploy installs a new
    // worker generation (byte-level stamping lands in sw.js via the build
    // pipeline; the register call must match that scheme).
    expect(register).toHaveBeenCalledWith(expect.stringMatching(/^\/sw\.js\?v=.+$/));
    // Production now inspects existing registrations to detect a worker left
    // over from a previous deploy, but with none present it still registers.
    expect(getRegistrations).toHaveBeenCalledTimes(1);
  });
});
