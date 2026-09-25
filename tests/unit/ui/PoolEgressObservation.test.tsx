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

  it("shows the per-exit failures and the unattributed remainder", async () => {
    const { element } = await renderWith(() =>
      jsonResponse({
        connections: 4,
        distinctExits: 2,
        maxConnectionsOnOneExit: 3,
        windowHours: 24,
        failures: {
          byExit: [
            {
              exit: "203.0.113.1",
              failures: 3,
              byFamily: [
                { family: "server_error", count: 2 },
                { family: "unknown", count: 1 },
              ],
            },
          ],
          byFamily: [
            { family: "server_error", count: 2 },
            { family: "unknown", count: 1 },
          ],
          unattributed: 2,
        },
      })
    );
    const text = element.textContent ?? "";
    expect(text).toContain('poolEgressFailuresByExit:{"exit":"203.0.113.1","count":3}');
    expect(text).toContain("server_error: 2");
    expect(text).toContain('poolEgressFailuresUnattributed:{"count":2}');
    // The traffic sentence and the "no traffic" sentence must not be reused for failures:
    // they would read "1 exit used by 3 connections" / "No traffic observed" for 3 / 2
    // failed requests, contradicting the counts they display.
    expect(text.match(/poolEgressObservation:/g)).toHaveLength(1);
    expect(text).not.toContain("poolEgressObservationEmpty");
  });

  it("omits the unattributed line when every failure has an exit", async () => {
    const { element } = await renderWith(() =>
      jsonResponse({
        connections: 1,
        distinctExits: 1,
        maxConnectionsOnOneExit: 1,
        windowHours: 24,
        failures: {
          byExit: [{ exit: "203.0.113.9", failures: 1, byFamily: [] }],
          byFamily: [],
          unattributed: 0,
        },
      })
    );
    const text = element.textContent ?? "";
    expect(text).toContain('poolEgressFailuresByExit:{"exit":"203.0.113.9","count":1}');
    expect(text).not.toContain("poolEgressFailuresUnattributed");
  });

  it("keeps the summary line when the route has no failures key", async () => {
    const { element } = await renderWith(() =>
      jsonResponse({
        connections: 12,
        distinctExits: 5,
        maxConnectionsOnOneExit: 4,
        windowHours: 24,
      })
    );
    expect(element.textContent).toContain("poolEgressObservation");
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
