import React, { act, useEffect } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createReactRootRegistry } from "../../_helpers/reactRootRegistry";

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  vi.useRealTimers();
});

describe("React fixture root cleanup", () => {
  it("unmounts effects while connected and cancels pending callbacks", async () => {
    vi.useFakeTimers();
    const registry = createReactRootRegistry();
    const container = document.createElement("div");
    document.body.appendChild(container);
    const callback = vi.fn();
    const cleanup = vi.fn();
    function Probe() {
      useEffect(() => {
        const timer = setTimeout(callback, 100);
        return () => {
          cleanup(container.isConnected);
          clearTimeout(timer);
        };
      }, []);
      return <span>mounted</span>;
    }
    await act(async () => registry.createRoot(container).render(<Probe />));
    expect(container.textContent).toBe("mounted");
    expect(vi.getTimerCount()).toBe(1);
    await registry.cleanup();
    expect(cleanup).toHaveBeenCalledExactlyOnceWith(true);
    expect(container.isConnected).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
    vi.runAllTimers();
    expect(callback).not.toHaveBeenCalled();
  });

  it("cleans multiple roots, is reusable and preserves unrelated DOM", async () => {
    const registry = createReactRootRegistry();
    const unrelated = document.createElement("aside");
    document.body.appendChild(unrelated);
    const cleanup = vi.fn();
    function Probe() {
      useEffect(() => cleanup, []);
      return <span>mounted</span>;
    }
    for (let round = 0; round < 2; round++) {
      const containers = [document.createElement("div"), document.createElement("div")];
      for (const container of containers) {
        document.body.appendChild(container);
        await act(async () => registry.createRoot(container).render(<Probe />));
      }
      await registry.cleanup();
      await registry.cleanup();
      expect(containers.every((container) => !container.isConnected)).toBe(true);
      expect(cleanup).toHaveBeenCalledTimes((round + 1) * 2);
      expect(unrelated.isConnected).toBe(true);
    }
    unrelated.remove();
  });

  it("rejects duplicate ownership of a container", async () => {
    const registry = createReactRootRegistry();
    const container = document.createElement("div");
    document.body.appendChild(container);
    registry.createRoot(container);
    expect(() => registry.createRoot(container)).toThrow("already has a root");
    await registry.cleanup();
  });
});
