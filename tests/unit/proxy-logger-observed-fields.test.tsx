// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const TRAFFIC = {
  id: "log-traffic",
  timestamp: new Date().toISOString(),
  status: "success",
  proxy: { type: "http", host: "127.0.0.1", port: 8080, name: "reg-test" },
  tlsFingerprint: false,
  level: "provider",
  provider: "openai",
  targetUrl: "openai/gpt-5",
  latencyMs: 42,
  clientIp: "10.9.9.9",
  upstreamStatus: 200,
  egressIp: "203.0.113.9",
  correlationId: "corr-abcdef-123456",
  account: "conn-traff",
  rotationAccount: "rot-acc-01",
  error: null,
};

const NULL_STATUS = {
  ...TRAFFIC,
  id: "log-null",
  targetUrl: "openai/gpt-5-null",
  upstreamStatus: null,
  egressIp: null,
  correlationId: null,
  rotationAccount: null,
  account: null,
};

const LEVEL_TEST = {
  ...TRAFFIC,
  id: "log-level-test",
  level: "provider-test",
  targetUrl: "openai/connection-test",
  correlationId: null,
};

const SUFFIX_TEST = {
  ...TRAFFIC,
  id: "log-suffix-test",
  level: "provider",
  targetUrl: "openai/connection-test",
  correlationId: null,
};

const ROWS = [TRAFFIC, NULL_STATUS, LEVEL_TEST, SUFFIX_TEST];

function mockFetch() {
  const fetchMock = vi.fn(async (url: string) => {
    if (String(url).includes("/api/provider-nodes")) {
      return { ok: true, json: async () => ({ nodes: [] }) } as Response;
    }
    return { ok: true, json: async () => ROWS } as Response;
  });
  vi.stubGlobal("fetch", fetchMock);
}

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  return container;
}

async function renderLogger(container: HTMLElement) {
  const { default: ProxyLogger } = await import("@/shared/components/ProxyLogger");
  const root = createRoot(container);
  await act(async () => {
    root.render(<ProxyLogger />);
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  return root;
}

function clickButton(container: HTMLElement, key: string) {
  const buttons = Array.from(container.querySelectorAll("button"));
  const target = buttons.find((b) => b.textContent === key);
  expect(target, `button ${key}`).toBeDefined();
  return act(async () => {
    target!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

describe("ProxyLogger observed fields", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    window.localStorage.clear();
    mockFetch();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("renders the four observed fields and never renders null as 0", async () => {
    const container = makeContainer();
    await renderLogger(container);
    const html = container.innerHTML;
    expect(html).toContain("200");
    expect(html).not.toContain(">0<");
    expect(html).toContain("***");
    expect(html).not.toContain("203.0.113.9");
    expect(html).toContain("corr-abcdef");
    const link = container.querySelector('a[href*="/dashboard/logs?correlationId="]');
    expect(link).not.toBeNull();
    expect(link!.getAttribute("href")).not.toContain("?id=");
    expect(link!.getAttribute("href")).toContain(
      `correlationId=${encodeURIComponent("corr-abcdef-123456")}`
    );
    expect(html).not.toContain("conn-traff");
    container.remove();
  }, 15000);

  it("partitions connection tests by level or targetUrl suffix", async () => {
    const container = makeContainer();
    await renderLogger(container);
    await clickButton(container, "filterTests");
    let rows = container.querySelectorAll("tbody tr");
    expect(rows.length).toBe(2);
    await clickButton(container, "filterTraffic");
    rows = container.querySelectorAll("tbody tr");
    expect(rows.length).toBe(2);
    container.remove();
  }, 15000);
});
