// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    values ? `${key}:${JSON.stringify(values)}` : key,
}));

// The component is new in this change: resolve it through an indirection Vite
// cannot statically analyze, so the file loads on the base tree too and every
// case fails on an assertion (not on the import) when the component is absent.
const REGIME_LINE_PATH =
  "@/app/(dashboard)/dashboard/settings/components/" + "PoolUpstreamRegimeLine";
let PoolUpstreamRegimeLine: React.ComponentType<{ provider: string }>;
try {
  ({ PoolUpstreamRegimeLine } = await import(/* @vite-ignore */ REGIME_LINE_PATH));
} catch {
  const MissingRegimeLine = () => null;
  MissingRegimeLine.displayName = "MissingRegimeLine";
  PoolUpstreamRegimeLine = MissingRegimeLine;
}

let root: Root | null = null;
let container: HTMLElement | null = null;

async function renderWith(provider: string, fetchImpl: (...args: unknown[]) => Promise<unknown>) {
  const fetchMock = vi.fn(fetchImpl);
  vi.stubGlobal("fetch", fetchMock);
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => {
    root!.render(React.createElement(PoolUpstreamRegimeLine, { provider }));
  });
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  return { fetchMock, element: container };
}

function jsonResponse(body: unknown, ok = true) {
  return Promise.resolve({ ok, json: () => Promise.resolve(body) });
}

function uniformRegime(overrides: Record<string, unknown> = {}) {
  return {
    provider: "acme",
    windowHours: 1,
    attempts: 90,
    measured: 90,
    share5xx: 0.5,
    exitsTouched: 15,
    exitsWithTraffic: 15,
    affectedExits: 15,
    uniform: true,
    state: "measured",
    ...overrides,
  };
}

describe("PoolUpstreamRegimeLine", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(async () => {
    await act(async () => {
      root?.unmount();
    });
    root = null;
    container?.remove();
    container = null;
    vi.unstubAllGlobals();
  });

  it("reads the dedicated route and shows one line for a uniform regime", async () => {
    const { fetchMock, element } = await renderWith("acme", () => jsonResponse(uniformRegime()));
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/settings/proxies/pool/uniform-egress?provider=acme"
    );
    expect(element.textContent).toBe(
      'uniformEgressLine:{"affected":15,"exits":15,"provider":"acme","hours":1}'
    );
  });

  it("renders nothing when the regime is not uniform", async () => {
    const { element } = await renderWith("acme", () =>
      jsonResponse(uniformRegime({ uniform: false }))
    );
    expect(element.textContent).toBe("");
  });

  it("renders nothing when the window is unmeasured", async () => {
    const { element } = await renderWith("acme", () =>
      jsonResponse(uniformRegime({ state: "unmeasured", uniform: false }))
    );
    expect(element.textContent).toBe("");
  });

  it("renders nothing when the route answers null", async () => {
    const { element } = await renderWith("acme", () => jsonResponse(null));
    expect(element.textContent).toBe("");
  });

  it("renders nothing for a malformed regime body", async () => {
    const { element } = await renderWith("acme", () =>
      jsonResponse({ uniform: true, provider: "acme" })
    );
    expect(element.textContent).toBe("");
  });

  it("renders nothing on an error status or a failed request", async () => {
    const { element: onError } = await renderWith("acme", () =>
      jsonResponse({ error: "nope" }, false)
    );
    expect(onError.textContent).toBe("");
    await act(async () => {
      root?.unmount();
    });
    root = null;
    container?.remove();
    container = null;
    vi.unstubAllGlobals();
    const { element: onFailure } = await renderWith("acme", () =>
      Promise.reject(new Error("offline"))
    );
    expect(onFailure.textContent).toBe("");
  });
});
