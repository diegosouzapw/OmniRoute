// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    values ? `${key}:${JSON.stringify(values)}` : key,
}));

import { PoolMemberEgressLines } from "@/app/(dashboard)/dashboard/settings/components/PoolMemberEgressLines";

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
    root!.render(React.createElement(PoolMemberEgressLines, { query: QUERY }));
  });
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  return { fetchMock, element: container };
}

function jsonResponse(body: unknown, ok = true) {
  return Promise.resolve({ ok, json: () => Promise.resolve(body) });
}

describe("PoolMemberEgressLines", () => {
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

  it("reads the dedicated route and shows one line per member", async () => {
    const { fetchMock, element } = await renderWith(() =>
      jsonResponse({
        windowHours: 24,
        members: [
          { host: "10.9.1.1", port: 21001, egressIp: "203.0.113.1", at: "2026-09-21T00:00:00Z" },
          { host: "10.9.1.2", port: 21002, egressIp: null, at: null },
        ],
      })
    );
    expect(fetchMock).toHaveBeenCalledWith(`/api/settings/proxies/pool/member-egress?${QUERY}`);
    const lines = element.querySelectorAll("p");
    expect(lines.length).toBe(2);
    expect(lines[0].textContent).toBe(
      'poolMemberEgress:{"host":"10.9.1.1","port":21001,"egressIp":"203.0.113.1","hours":24}'
    );
    expect(lines[1].textContent).toBe(
      'poolMemberEgressEmpty:{"host":"10.9.1.2","port":21002,"hours":24}'
    );
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

  it("labels the set-aside motive and end time instead of printing raw values", async () => {
    const endsAt = "2026-09-25T12:34:00.000Z";
    const { element } = await renderWith((url: unknown) =>
      String(url).startsWith("/api/admin/proxy-pool-visibility")
        ? jsonResponse({
            rankedBy: "health",
            members: [
              {
                id: "p1",
                name: "pool-a",
                display: "http://10.9.1.1:21001",
                userMasked: null,
                opaque: false,
                rank: 1,
                signal: "set-aside",
                setAside: {
                  kind: "ip_quota_429",
                  since: "2026-09-25T12:00:00.000Z",
                  endsAt,
                  streak: 2,
                },
              },
            ],
          })
        : jsonResponse(null)
    );
    const text = element.textContent ?? "";
    expect(text).toContain("http://10.9.1.1:21001");
    expect(text).toContain('poolSetAsideReason:{"kind":"poolSetAsideKindIpQuota429"}');
    expect(text).not.toContain("ip_quota_429");
    expect(text).not.toContain(endsAt);
  });

  it("labels a transport set-aside (#14802) instead of printing the raw kind", async () => {
    const { element } = await renderWith((url: unknown) =>
      String(url).startsWith("/api/admin/proxy-pool-visibility")
        ? jsonResponse({
            rankedBy: "health",
            members: [
              {
                id: "p1",
                name: "pool-a",
                display: "http://10.9.1.1:21001",
                userMasked: null,
                opaque: false,
                rank: 1,
                signal: "set-aside",
                setAside: {
                  kind: "transport",
                  since: "2026-09-25T12:00:00.000Z",
                  endsAt: "2026-09-25T12:34:00.000Z",
                  streak: 1,
                },
              },
            ],
          })
        : jsonResponse(null)
    );
    const text = element.textContent ?? "";
    expect(text).toContain('poolSetAsideReason:{"kind":"poolSetAsideKindProxyUnreachable"}');
    expect(text).not.toContain('"kind":"transport"');
  });
});
