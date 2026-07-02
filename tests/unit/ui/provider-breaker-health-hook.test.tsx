// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useProviderBreakerHealth } from "../../../src/hooks/useProviderBreakerHealth";

type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (error: unknown) => void;
};

function deferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

function okResponse(body: unknown): Response {
  return {
    ok: true,
    json: async () => body,
  } as Response;
}

describe("useProviderBreakerHealth", () => {
  let root: Root | null = null;
  let container: HTMLDivElement | null = null;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.useFakeTimers();
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (root) {
      act(() => root?.unmount());
    }
    root = null;
    container?.remove();
    container = null;
    document.body.innerHTML = "";
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("skips overlapping health polls while a request is in flight", async () => {
    const first = deferred<Response>();
    const second = deferred<Response>();
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise);
    vi.stubGlobal("fetch", fetchMock);

    function Probe() {
      const snapshot = useProviderBreakerHealth(5000);
      return <output>{Object.keys(snapshot.providerHealth).join(",")}</output>;
    }

    await act(async () => {
      root = createRoot(container!);
      root.render(<Probe />);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0]?.[1]).toMatchObject({ cache: "no-store" });

    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);

    await act(async () => {
      first.resolve(
        okResponse({
          providerHealth: { openai: { state: "closed" } },
          connectionHealth: {},
        })
      );
      await first.promise;
    });

    expect(container!.textContent).toBe("openai");

    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    second.resolve(okResponse({ providerHealth: {}, connectionHealth: {} }));
  });

  it("aborts an active health poll on unmount", async () => {
    let signal: AbortSignal | undefined;
    const fetchMock = vi.fn<typeof fetch>((_input, init) => {
      signal = init?.signal ?? undefined;
      return new Promise<Response>(() => {});
    });
    vi.stubGlobal("fetch", fetchMock);

    function Probe() {
      useProviderBreakerHealth(5000);
      return null;
    }

    await act(async () => {
      root = createRoot(container!);
      root.render(<Probe />);
    });

    expect(signal?.aborted).toBe(false);

    act(() => {
      root?.unmount();
      root = null;
    });

    expect(signal?.aborted).toBe(true);
  });
});
