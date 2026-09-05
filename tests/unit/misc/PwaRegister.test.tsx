// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PwaRegister } from "../../../src/shared/components/PwaRegister";

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
    expect(getRegistrations).not.toHaveBeenCalled();
  });
});
