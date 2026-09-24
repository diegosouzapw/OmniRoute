// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    values ? `${key}:${JSON.stringify(values)}` : key,
}));

import { PoolEgressObservation } from "@/app/(dashboard)/dashboard/settings/components/PoolEgressObservation";

const QUERY = "scope=provider&scopeId=openai";
let root: Root | null = null;
let container: HTMLElement | null = null;

async function renderWith(fetchImpl: (...args: unknown[]) => Promise<unknown>) {
  const fetchMock = vi.fn(fetchImpl);
  vi.stubGlobal("fetch", fetchMock);
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => {
    root!.render(React.createElement(PoolEgressObservation, { query: QUERY }));
  });
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  return { fetchMock, element: container };
}

function jsonResponse(body: unknown, ok = true) {
  return Promise.resolve({ ok, json: () => Promise.resolve(body) });
}

describe("PoolEgressObservation", () => {
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

  it("reads the dedicated route and shows the counts", async () => {
    const { fetchMock, element } = await renderWith(() =>
      jsonResponse({
        connections: 12,
        distinctExits: 5,
        maxConnectionsOnOneExit: 4,
        windowHours: 24,
      })
    );
    expect(fetchMock).toHaveBeenCalledWith(
      `/api/settings/proxies/pool/egress-observation?${QUERY}`
    );
    expect(element.textContent).toBe(
      'poolEgressObservation:{"exits":5,"connections":12,"max":4,"hours":24}'
    );
  });

  it("says no traffic was observed when the pool had no connection", async () => {
    const { element } = await renderWith(() =>
      jsonResponse({
        connections: 0,
        distinctExits: 0,
        maxConnectionsOnOneExit: 0,
        windowHours: 24,
      })
    );
    expect(element.textContent).toBe('poolEgressObservationEmpty:{"hours":24}');
  });

  it("renders nothing when the route answers null", async () => {
    const { element } = await renderWith(() => jsonResponse(null));
    expect(element.textContent).toBe("");
  });

  it("renders nothing on an error status", async () => {
    const { element } = await renderWith(() => jsonResponse({ error: "nope" }, false));
    expect(element.textContent).toBe("");
  });

  it("renders nothing when the request fails", async () => {
    const { element } = await renderWith(() => Promise.reject(new Error("offline")));
    expect(element.textContent).toBe("");
  });
});
