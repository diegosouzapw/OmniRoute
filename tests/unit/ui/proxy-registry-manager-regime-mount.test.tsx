// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const translate = (key: string) => key;

vi.mock("next-intl", () => ({
  useTranslations: () => translate,
  useLocale: () => "en",
}));

// Imported STATICALLY on purpose (same reason as the credential-autofill
// guard): the Vite transform of the manager tree is paid during collection,
// not against the per-test timeout.
import ProxyRegistryManager from "@/app/(dashboard)/dashboard/settings/components/ProxyRegistryManager";

function jsonResponse(body: unknown): Response {
  return { ok: true, json: async () => body } as Response;
}

let root: Root;
let container: HTMLDivElement;
const fetched: string[] = [];

async function waitFor(assertion: () => void, timeoutMs = 5000) {
  const startedAt = Date.now();
  let lastError: unknown;
  while (Date.now() - startedAt <= timeoutMs) {
    try {
      assertion();
      return;
    } catch (error) {
      lastError = error;
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 20));
      });
    }
  }
  throw lastError;
}

async function click(element: HTMLElement) {
  await act(async () => {
    element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

function findButton(text: string): HTMLButtonElement {
  const button = Array.from(container.querySelectorAll("button")).find((candidate) =>
    candidate.textContent?.includes(text)
  );
  if (!button) throw new Error(`Button not found: ${text}`);
  return button;
}

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  if (!setter) throw new Error("HTMLInputElement value setter is unavailable");
  act(() => {
    setter.call(input, value);
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  fetched.length = 0;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);

  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      fetched.push(url);
      if (url === "/api/settings/proxies") {
        return jsonResponse({ items: [] });
      }
      if (url.startsWith("/api/settings/proxies/pool?")) {
        return jsonResponse({ members: [], strategy: "round-robin" });
      }
      if (url.startsWith("/api/settings/proxies/health")) {
        return jsonResponse({ items: [] });
      }
      if (url.startsWith("/api/settings/proxies/assignments")) {
        return jsonResponse({ items: [] });
      }
      if (url.startsWith("/api/settings/proxies/pool/egress-observation")) {
        return jsonResponse(null);
      }
      if (url.startsWith("/api/settings/proxies/pool/member-egress")) {
        return jsonResponse(null);
      }
      if (url.startsWith("/api/settings/proxies/pool/uniform-egress?provider=sentinel-provider")) {
        return jsonResponse({
          provider: "sentinel-provider",
          windowHours: 1,
          attempts: 90,
          measured: 90,
          share5xx: 0.5,
          exitsTouched: 15,
          exitsWithTraffic: 15,
          affectedExits: 15,
          uniform: true,
          state: "measured",
        });
      }
      if (url.startsWith("/api/settings/proxies/pool/uniform-egress")) {
        return jsonResponse(null);
      }
      throw new Error(`Unexpected fetch: ${url}`);
    })
  );
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("ProxyRegistryManager upstream regime mount", () => {
  it(
    "shows the regime line for a provider pool and fetches its provider",
    { timeout: 60000 },
    async () => {
      await act(async () => {
        root.render(<ProxyRegistryManager />);
      });
      await click(findButton("managePool"));

      const scopeIdInput = container.querySelector<HTMLInputElement>(
        '[data-testid="proxy-registry-pool-scopeid"]'
      );
      expect(scopeIdInput).not.toBeNull();
      setInputValue(scopeIdInput!, "sentinel-provider");
      await click(
        container.querySelector<HTMLButtonElement>('[data-testid="proxy-registry-pool-load"]')!
      );

      await waitFor(() => {
        const line = container.querySelector('[data-testid="proxy-registry-upstream-regime-line"]');
        if (!line) throw new Error("regime line not mounted");
        expect(line.textContent).toContain("uniformEgressLine");
      });
      expect(
        fetched.some((url) =>
          url.startsWith("/api/settings/proxies/pool/uniform-egress?provider=sentinel-provider")
        )
      ).toBe(true);
    }
  );
});
