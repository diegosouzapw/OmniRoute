// @vitest-environment jsdom
/**
 * Regression guard for #7643 — the "Proxy Config" modal's saved-proxy
 * `<select>` must be alphabetized by name (backend returns them
 * recency-first, not name-first), and the modal must default to the
 * "Saved" tab whenever the target scope has no assignment yet AND at least
 * one saved proxy exists (previously it unconditionally fell back to
 * "Custom", even with a non-empty proxy pool).
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

import ProxyConfigModal from "@/shared/components/ProxyConfigModal";

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

type RegistryItem = {
  id: string;
  name: string;
  type?: string;
  host?: string;
  port?: number;
  source?: string;
};

function mockFetch(opts: { registryItems: RegistryItem[]; assignmentItems: unknown[] }) {
  return vi.fn((input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("/api/settings/proxies/assignments")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: opts.assignmentItems }),
      } as Response);
    }
    if (url.includes("/api/settings/proxies")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: opts.registryItems, socks5Enabled: true }),
      } as Response);
    }
    if (url.includes("/api/settings/proxy")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ proxy: null }),
      } as Response);
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) } as Response);
  });
}

async function renderModal(container: HTMLElement) {
  const root = createRoot(container);
  cleanupCallbacks.push(() => act(() => root.unmount()));
  await act(async () => {
    root.render(
      React.createElement(ProxyConfigModal, {
        isOpen: true,
        onClose: () => {},
        level: "global",
      })
    );
  });
  // Flush the async load effect's chained promises/state updates.
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
  return root;
}

describe("ProxyConfigModal saved-proxy sort + default tab (#7643)", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length) cleanupCallbacks.pop()!();
    globalThis.fetch = originalFetch;
  });

  it("renders the saved-proxy <select> options in ascending alphabetical order regardless of API order", async () => {
    globalThis.fetch = mockFetch({
      registryItems: [
        { id: "1", name: "Zebra", type: "http", host: "z.example.com", port: 8080 },
        { id: "2", name: "Apple", type: "http", host: "a.example.com", port: 8080 },
        { id: "3", name: "Mango", type: "http", host: "m.example.com", port: 8080 },
      ],
      assignmentItems: [],
    }) as unknown as typeof fetch;

    const container = makeContainer();
    await renderModal(container);

    const select = container.querySelector("select");
    expect(select).not.toBeNull();
    const optionLabels = Array.from(select!.querySelectorAll("option"))
      .map((opt) => opt.textContent || "")
      .filter((text) => text.trim().length > 0 && text !== "selectSavedProxyPlaceholder");
    expect(optionLabels[0]).toContain("Apple");
    expect(optionLabels[1]).toContain("Mango");
    expect(optionLabels[2]).toContain("Zebra");
  });

  it("defaults to the Saved tab when saved proxies exist and no assignment is set yet", async () => {
    globalThis.fetch = mockFetch({
      registryItems: [{ id: "1", name: "Apple", type: "http", host: "a.example.com", port: 8080 }],
      assignmentItems: [],
    }) as unknown as typeof fetch;

    const container = makeContainer();
    await renderModal(container);

    // The Saved tab is active exactly when the saved-proxy <select> is rendered
    // (mode === "saved" gates that block in ProxyConfigModal.tsx).
    expect(container.querySelector("select")).not.toBeNull();
    expect(container.querySelector('input[placeholder="hostPlaceholder"]')).toBeNull();
  });

  it("still defaults to the Custom tab when the saved-proxy pool is empty and no assignment is set", async () => {
    globalThis.fetch = mockFetch({
      registryItems: [],
      assignmentItems: [],
    }) as unknown as typeof fetch;

    const container = makeContainer();
    await renderModal(container);

    expect(container.querySelector("select")).toBeNull();
    expect(container.querySelector('input[placeholder="hostPlaceholder"]')).not.toBeNull();
  });

  it("still resolves to the Custom tab when an existing custom-proxy assignment is present", async () => {
    globalThis.fetch = mockFetch({
      registryItems: [
        {
          id: "custom-1",
          name: "Custom Global Proxy",
          type: "http",
          host: "10.0.0.5",
          port: 3128,
          source: "dashboard-custom",
        },
      ],
      assignmentItems: [{ scope: "global", scopeId: null, proxyId: "custom-1" }],
    }) as unknown as typeof fetch;

    const container = makeContainer();
    await renderModal(container);

    expect(container.querySelector("select")).toBeNull();
    expect(container.querySelector('input[placeholder="hostPlaceholder"]')).not.toBeNull();
  });
});
