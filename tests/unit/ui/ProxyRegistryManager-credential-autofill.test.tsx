// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const translate = (key: string) => key;

vi.mock("next-intl", () => ({
  useTranslations: () => translate,
  // #14466 / #14807: PoolSchedulesCard and ProxyHealthCell now call useLocale().
  useLocale: () => "en",
}));

// Imported STATICALLY on purpose. With a dynamic `await import()` inside each
// test body, the Vite transform of the component's dependency tree (~86s on a
// loaded box) was charged against the per-test timeout, so both guards timed
// out before asserting anything. At module scope that cost is paid during
// collection, which has no per-test budget. `vi.mock` above is hoisted by
// Vitest, so the next-intl stub is still in place for this import.
import ProxyRegistryManager from "@/app/(dashboard)/dashboard/settings/components/ProxyRegistryManager";

const SEEDED_PROXY = {
  id: "proxy-8855",
  name: "Seeded proxy",
  type: "http",
  host: "127.0.0.1",
  port: 8080,
  username: "stored-user",
  password: "stored-password",
  status: "active",
  family: "auto",
};

const DEAD_PROXY = {
  ...SEEDED_PROXY,
  id: "proxy-dead-10342",
  name: "Auto-disabled proxy",
  status: "dead",
};

let root: Root;
let container: HTMLDivElement;
let postBody: Record<string, unknown> | undefined;
let patchBody: Record<string, unknown> | undefined;
let responseItems: Array<typeof SEEDED_PROXY>;

function jsonResponse(body: unknown): Response {
  return { ok: true, json: async () => body } as Response;
}

function findButton(text: string): HTMLButtonElement {
  const button = Array.from(container.querySelectorAll("button")).find((candidate) =>
    candidate.textContent?.includes(text)
  );
  if (!button) throw new Error(`Button not found: ${text}`);
  return button;
}

function findCredentialInput(label: string): HTMLInputElement {
  const labelNode = Array.from(container.querySelectorAll("label")).find(
    (candidate) => candidate.textContent?.trim() === label
  );
  const input = labelNode?.parentElement?.querySelector<HTMLInputElement>("input");
  if (!input) throw new Error(`Credential input not found: ${label}`);
  return input;
}

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  if (!setter) throw new Error("HTMLInputElement value setter is unavailable");
  act(() => {
    setter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

async function click(element: HTMLElement) {
  await act(async () => {
    element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

async function waitFor(assertion: () => void, timeoutMs = 2000) {
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

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  postBody = undefined;
  patchBody = undefined;
  responseItems = [SEEDED_PROXY];
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);

  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url === "/api/settings/proxies" && init?.method === "POST") {
        postBody = JSON.parse(String(init.body));
        return jsonResponse({ item: { ...SEEDED_PROXY, ...postBody } });
      }
      if (url === "/api/settings/proxies" && init?.method === "PATCH") {
        patchBody = JSON.parse(String(init.body));
        return jsonResponse({ item: { ...responseItems[0], ...patchBody } });
      }
      if (url === "/api/settings/proxies") {
        return jsonResponse({ items: responseItems });
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

describe("ProxyRegistryManager credential autofill regression #8855", () => {
  // Explicit budgets: each flow chains several `waitFor` polls (2s each) plus
  // React act() flushes, which overruns Vitest's 5s default on a busy box.
  it(
    "keeps Edit → close → Add credentials blank and isolates both fields from autofill",
    { timeout: 60000 },
    async () => {
      await act(async () => {
        root.render(<ProxyRegistryManager />);
      });
      await waitFor(() => expect(container.textContent).toContain(SEEDED_PROXY.name));

      await click(findButton("edit"));
      const editUsername = findCredentialInput("labelUsername");
      const editPassword = findCredentialInput("labelPassword");
      expect(editUsername.value).toBe("");
      expect(editPassword.value).toBe("");

      setInputValue(editUsername, "edit-user-sentinel");
      setInputValue(editPassword, "edit-password-sentinel");
      await click(container.querySelector<HTMLButtonElement>('button[aria-label="close"]')!);
      await click(
        container.querySelector<HTMLButtonElement>('[data-testid="proxy-registry-open-create"]')!
      );

      const createUsername = findCredentialInput("labelUsername");
      const createPassword = findCredentialInput("labelPassword");
      expect(createUsername.value).toBe("");
      expect(createPassword.value).toBe("");

      expect.soft(createUsername.getAttribute("autocomplete")).toBe("off");
      expect.soft(createPassword.getAttribute("autocomplete")).toBe("new-password");
      for (const input of [createUsername, createPassword]) {
        expect.soft(input.getAttribute("data-1p-ignore")).toBe("true");
        expect.soft(input.getAttribute("data-lpignore")).toBe("true");
      }

      setInputValue(
        container.querySelector<HTMLInputElement>('[data-testid="proxy-registry-name-input"]')!,
        "New proxy"
      );
      setInputValue(
        container.querySelector<HTMLInputElement>('[data-testid="proxy-registry-host-input"]')!,
        "proxy.example.test"
      );
      await click(findButton("save"));
      await waitFor(() => expect(postBody).toBeDefined());

      expect([undefined, ""]).toContain(postBody?.username);
      expect([undefined, ""]).toContain(postBody?.password);
      expect(postBody?.username).not.toBe("edit-user-sentinel");
      expect(postBody?.password).not.toBe("edit-password-sentinel");
    }
  );

  it(
    "round-trips dead status through Edit and excludes it from pool candidates",
    { timeout: 60000 },
    async () => {
      responseItems = [DEAD_PROXY];

      await act(async () => {
        root.render(<ProxyRegistryManager />);
      });
      await waitFor(() => expect(container.textContent).toContain(DEAD_PROXY.name));

      await click(findButton("edit"));
      const statusSelect = container.querySelector<HTMLSelectElement>(
        '[data-testid="proxy-registry-status-select"]'
      );
      expect(statusSelect).not.toBeNull();
      expect(statusSelect?.value).toBe("dead");
      expect(statusSelect?.querySelector('option[value="dead"]')).not.toBeNull();

      await click(findButton("save"));
      await waitFor(() => expect(patchBody).toBeDefined());
      expect(patchBody).toMatchObject({ id: DEAD_PROXY.id, status: "dead" });

      await click(findButton("managePool"));
      const scopeSelect = container.querySelector<HTMLSelectElement>(
        '[data-testid="proxy-registry-pool-scope"]'
      );
      expect(scopeSelect).not.toBeNull();
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLSelectElement.prototype,
        "value"
      )?.set;
      if (!setter || !scopeSelect) throw new Error("Pool scope select is unavailable");
      act(() => {
        setter.call(scopeSelect, "global");
        scopeSelect.dispatchEvent(new Event("change", { bubbles: true }));
      });
      await click(
        container.querySelector<HTMLButtonElement>('[data-testid="proxy-registry-pool-load"]')!
      );
      await waitFor(() =>
        expect(
          container.querySelector('[data-testid="proxy-registry-pool-add-select"]')
        ).not.toBeNull()
      );

      const poolAddSelect = container.querySelector<HTMLSelectElement>(
        '[data-testid="proxy-registry-pool-add-select"]'
      );
      expect(poolAddSelect?.querySelector(`option[value="${DEAD_PROXY.id}"]`)).toBeNull();
    }
  );
});
