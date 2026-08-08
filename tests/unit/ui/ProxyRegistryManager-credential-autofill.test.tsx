// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const translate = (key: string) => key;

vi.mock("next-intl", () => ({
  useTranslations: () => translate,
}));

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

let root: Root;
let container: HTMLDivElement;
let postBody: Record<string, unknown> | undefined;

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
      if (url === "/api/settings/proxies") {
        return jsonResponse({ items: [SEEDED_PROXY] });
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
  it("keeps Edit → close → Add credentials blank and isolates both fields from autofill", async () => {
    const { default: ProxyRegistryManager } =
      await import("@/app/(dashboard)/dashboard/settings/components/ProxyRegistryManager");

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
  });
});
