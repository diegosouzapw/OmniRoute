// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (!values) return key;
    return Object.entries(values).reduce(
      (message, [name, value]) => message.replace(`{${name}}`, String(value)),
      key
    );
  },
}));

type FetchCall = {
  url: string;
  method: string;
  body: any;
};

type MockResponse = {
  status?: number;
  body?: unknown;
};

const cleanupCallbacks: Array<() => void> = [];
let fetchCalls: FetchCall[] = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => {
    container.remove();
  });
  return container;
}

function jsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

function parseBody(init?: RequestInit) {
  if (typeof init?.body !== "string") return null;
  try {
    return JSON.parse(init.body);
  } catch {
    return init.body;
  }
}

function installFetchMock(handler: (url: string, init?: RequestInit) => MockResponse) {
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    const method = String(init?.method || "GET").toUpperCase();
    const body = parseBody(init);
    fetchCalls.push({ url, method, body });
    const response = handler(url, init);
    return jsonResponse(response.body ?? {}, response.status ?? 200);
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

async function flushEffects() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

async function renderProxyConfigModal(props?: Partial<React.ComponentProps<any>>) {
  const { default: ProxyConfigModal } = await import("@/shared/components/ProxyConfigModal");
  const container = makeContainer();
  const root: Root = createRoot(container);
  cleanupCallbacks.push(() => root.unmount());

  await act(async () => {
    root.render(
      <ProxyConfigModal
        isOpen
        onClose={vi.fn()}
        level="provider"
        levelId="claude"
        levelLabel="Claude"
        onSaved={vi.fn()}
        {...props}
      />
    );
  });
  await waitForModalToLoad(container);
  return { container, root };
}

async function waitForModalToLoad(container: HTMLElement) {
  for (let i = 0; i < 20; i++) {
    await flushEffects();
    if (!container.textContent?.includes("loading")) return;
  }
}

function getInput(container: HTMLElement, placeholder: string) {
  const input = Array.from(container.querySelectorAll("input")).find(
    (item) => item.getAttribute("placeholder") === placeholder
  );
  expect(input).toBeTruthy();
  return input as HTMLInputElement;
}

async function clickButton(container: HTMLElement, text: string) {
  const expected = text.toLowerCase();
  const buttons = Array.from(container.querySelectorAll("button"));
  const getText = (item: HTMLButtonElement) => item.textContent?.trim().toLowerCase() || "";
  const button =
    buttons.find((item) => getText(item) === expected) ||
    buttons.find(
      (item) => getText(item).endsWith(expected) && !getText(item).includes("savedproxy")
    ) ||
    buttons.find((item) => getText(item).includes(expected));
  expect(button).toBeTruthy();
  await act(async () => {
    button?.click();
  });
  await flushEffects();
}

async function waitForCall(predicate: (call: FetchCall) => boolean) {
  for (let i = 0; i < 20; i++) {
    await flushEffects();
    if (fetchCalls.some(predicate)) return;
  }
}

async function setInputValue(input: HTMLInputElement, value: string) {
  await act(async () => {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
    setter?.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await flushEffects();
}

function defaultProxyConfigResponses(url: string): MockResponse | null {
  if (url === "/api/settings/proxies") {
    return { body: { items: [], total: 0 } };
  }
  if (url.startsWith("/api/settings/proxies/assignments?") && url.includes("scope=provider")) {
    return { body: { items: [], total: 0 } };
  }
  if (url.startsWith("/api/settings/proxy?level=provider")) {
    return { body: { level: "provider", id: "claude", proxy: null } };
  }
  if (url === "/api/settings/proxy") {
    return { body: {} };
  }
  return null;
}

describe("ProxyConfigModal custom registry saves", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    fetchCalls = [];
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) {
      cleanupCallbacks.pop()?.();
    }
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("creates a dashboard-custom registry proxy, assigns it, and clears matching legacy config", async () => {
    installFetchMock((url, init) => {
      const method = String(init?.method || "GET").toUpperCase();
      const body = parseBody(init);

      if (method === "POST" && url === "/api/settings/proxies") {
        return {
          status: 201,
          body: { id: "custom-proxy-1", ...body, assignment: { proxyId: "custom-proxy-1" } },
        };
      }

      return defaultProxyConfigResponses(url) || { status: 404, body: {} };
    });

    const { container } = await renderProxyConfigModal();

    await setInputValue(getInput(container, "hostPlaceholder"), "custom.local");
    await setInputValue(getInput(container, "8080"), "3128");
    await clickButton(container, "save");
    await waitForCall((call) => call.method === "POST" && call.url === "/api/settings/proxies");

    const createCall = fetchCalls.find(
      (call) => call.method === "POST" && call.url === "/api/settings/proxies"
    );
    expect(createCall?.body).toMatchObject({
      name: "Custom Provider Proxy (Claude)",
      type: "http",
      host: "custom.local",
      port: 3128,
      status: "active",
      source: "dashboard-custom",
      assignment: {
        scope: "provider",
        scopeId: "claude",
      },
    });

    expect(
      fetchCalls.some((call) => call.method === "PUT" && call.url === "/api/settings/proxy")
    ).toBe(false);
    expect(
      fetchCalls.some(
        (call) => call.method === "PUT" && call.url === "/api/settings/proxies/assignments"
      )
    ).toBe(false);
    expect(
      fetchCalls.some(
        (call) =>
          call.method === "DELETE" && call.url === "/api/settings/proxy?level=provider&id=claude"
      )
    ).toBe(false);
  });

  it("updates an existing scope-owned dashboard-custom proxy instead of creating a duplicate", async () => {
    installFetchMock((url, init) => {
      const method = String(init?.method || "GET").toUpperCase();
      const body = parseBody(init);

      if (method === "GET" && url === "/api/settings/proxies") {
        return {
          body: {
            items: [
              {
                id: "custom-proxy-1",
                name: "Custom Provider Proxy (Claude)",
                type: "http",
                host: "old.local",
                port: 8080,
                source: "dashboard-custom",
              },
            ],
            total: 1,
          },
        };
      }
      if (url.startsWith("/api/settings/proxies/assignments?") && url.includes("scope=provider")) {
        return {
          body: {
            items: [
              { proxyId: "other-proxy", scope: "provider", scopeId: "other-provider" },
              { proxyId: "custom-proxy-1", scope: "provider", scopeId: "claude" },
            ],
            total: 1,
          },
        };
      }
      if (url === "/api/settings/proxies?id=custom-proxy-1&whereUsed=1") {
        return {
          body: {
            count: 1,
            assignments: [{ proxyId: "custom-proxy-1", scope: "provider", scopeId: "claude" }],
          },
        };
      }
      if (method === "PATCH" && url === "/api/settings/proxies") {
        return {
          body: { id: "custom-proxy-1", ...body, assignment: { proxyId: "custom-proxy-1" } },
        };
      }

      return defaultProxyConfigResponses(url) || { status: 404, body: {} };
    });

    const { container } = await renderProxyConfigModal();

    await setInputValue(getInput(container, "hostPlaceholder"), "updated.local");
    await clickButton(container, "authOptional");
    await setInputValue(getInput(container, "usernamePlaceholder"), "***");
    await setInputValue(getInput(container, "passwordPlaceholder"), "***");
    await clickButton(container, "save");
    await waitForCall((call) => call.method === "PATCH" && call.url === "/api/settings/proxies");

    expect(
      fetchCalls.some((call) => call.method === "POST" && call.url === "/api/settings/proxies")
    ).toBe(false);

    const updateCall = fetchCalls.find(
      (call) => call.method === "PATCH" && call.url === "/api/settings/proxies"
    );
    expect(updateCall?.body).toMatchObject({
      id: "custom-proxy-1",
      host: "updated.local",
      source: "dashboard-custom",
      assignment: {
        scope: "provider",
        scopeId: "claude",
      },
    });
    expect(updateCall?.body).not.toHaveProperty("username");
    expect(updateCall?.body).not.toHaveProperty("password");
    expect(
      fetchCalls.some(
        (call) => call.method === "PUT" && call.url === "/api/settings/proxies/assignments"
      )
    ).toBe(false);
    expect(
      fetchCalls.some(
        (call) =>
          call.method === "DELETE" && call.url === "/api/settings/proxy?level=provider&id=claude"
      )
    ).toBe(false);
  });

  it("creates a new dashboard-custom proxy when current assignment is a reusable manual proxy", async () => {
    installFetchMock((url, init) => {
      const method = String(init?.method || "GET").toUpperCase();
      const body = parseBody(init);

      if (method === "GET" && url === "/api/settings/proxies") {
        return {
          body: {
            items: [
              {
                id: "manual-proxy-1",
                name: "Shared Manual Proxy",
                type: "http",
                host: "shared.local",
                port: 8080,
                source: "manual",
              },
            ],
            total: 1,
          },
        };
      }
      if (url.startsWith("/api/settings/proxies/assignments?") && url.includes("scope=provider")) {
        return {
          body: {
            items: [{ proxyId: "manual-proxy-1", scope: "provider", scopeId: "claude" }],
            total: 1,
          },
        };
      }
      if (method === "POST" && url === "/api/settings/proxies") {
        return {
          status: 201,
          body: { id: "custom-proxy-2", ...body, assignment: { proxyId: "custom-proxy-2" } },
        };
      }

      return defaultProxyConfigResponses(url) || { status: 404, body: {} };
    });

    const { container } = await renderProxyConfigModal();

    await clickButton(container, "custom");
    await setInputValue(getInput(container, "hostPlaceholder"), "custom.local");
    await clickButton(container, "save");
    await waitForCall((call) => call.method === "POST" && call.url === "/api/settings/proxies");

    expect(
      fetchCalls.some((call) => call.method === "PATCH" && call.url === "/api/settings/proxies")
    ).toBe(false);
    expect(
      fetchCalls.some(
        (call) =>
          call.method === "POST" &&
          call.url === "/api/settings/proxies" &&
          call.body.assignment?.scope === "provider" &&
          call.body.assignment?.scopeId === "claude"
      )
    ).toBe(true);
    expect(
      fetchCalls.some(
        (call) => call.method === "PUT" && call.url === "/api/settings/proxies/assignments"
      )
    ).toBe(false);
  });
});

describe("ProxyConfigModal test connection (saved proxy)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    fetchCalls = [];
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) {
      cleanupCallbacks.pop()?.();
    }
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("includes proxyId when testing a saved SOCKS5 registry proxy so the server can load its stored credentials", async () => {
    installFetchMock((url, init) => {
      const method = String(init?.method || "GET").toUpperCase();
      if (method === "GET" && url === "/api/settings/proxies") {
        return {
          body: {
            items: [
              {
                id: "socks5-1",
                name: "Geonode SOCKS5",
                type: "socks5",
                host: "proxy.geonode.io",
                port: 12000,
                username: "***",
                password: "***",
                source: "manual",
              },
            ],
            total: 1,
            socks5Enabled: true,
          },
        };
      }
      if (url.startsWith("/api/settings/proxies/assignments?") && url.includes("scope=provider")) {
        return {
          body: { items: [{ proxyId: "socks5-1", scope: "provider", scopeId: "claude" }], total: 1 },
        };
      }
      if (method === "POST" && url === "/api/settings/proxy/test") {
        return { body: { success: true, publicIp: "1.2.3.4", latencyMs: 500 } };
      }
      return defaultProxyConfigResponses(url) || { status: 404, body: {} };
    });

    const { container } = await renderProxyConfigModal();
    await clickButton(container, "testConnection");
    await waitForCall((call) => call.method === "POST" && call.url === "/api/settings/proxy/test");

    const testCall = fetchCalls.find(
      (call) => call.method === "POST" && call.url === "/api/settings/proxy/test"
    );
    expect(testCall).toBeTruthy();
    expect(testCall?.body?.proxyId).toBe("socks5-1");
  }, 20000);
});
