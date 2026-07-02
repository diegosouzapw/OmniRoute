// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// next-intl: return the key so we can assert on stable strings.
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: AddApiKeyModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/AddApiKeyModal");

const FREE_TOGGLE = 'button[role="switch"][aria-label="importFreeModelsOnlyLabel"]';

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render(props: Record<string, unknown>) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      <AddApiKeyModal
        isOpen
        onSave={async () => undefined}
        onClose={() => {}}
        {...(props as any)}
      />
    );
  });
  containers.push({ root, el });
  return el;
}

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
  act(() => {
    setter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

async function waitFor(fn: () => boolean, timeoutMs = 2000) {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeoutMs) throw new Error("waitFor timed out");
    await new Promise((r) => setTimeout(r, 20));
  }
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ valid: true }) } as Response)
    )
  );
});

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
});

describe("AddApiKeyModal — import only free models", () => {
  it("shows the free-only toggle for a provider that has free models", () => {
    const el = render({ provider: "openrouter", providerName: "OpenRouter" });
    expect(el.querySelector(FREE_TOGGLE)).toBeTruthy();
  });

  it("hides the free-only toggle for a provider without free models", () => {
    const el = render({ provider: "anthropic", providerName: "Anthropic" });
    expect(el.querySelector(FREE_TOGGLE)).toBeNull();
  });

  it("includes importFreeModelsOnly in the saved payload when toggled on", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const el = render({ provider: "openrouter", providerName: "OpenRouter", onSave });

    const nameInput = el.querySelector<HTMLInputElement>('input[placeholder="productionKey"]')!;
    const apiKeyInput = el.querySelector<HTMLInputElement>('input[type="password"]')!;
    setInputValue(nameInput, "My OpenRouter");
    setInputValue(apiKeyInput, "sk-or-test-key");

    const toggle = el.querySelector<HTMLButtonElement>(FREE_TOGGLE)!;
    act(() => {
      toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const saveBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "save"
    )!;
    act(() => {
      saveBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await waitFor(() => onSave.mock.calls.length > 0);
    const payload = onSave.mock.calls[0][0];
    expect(payload.providerSpecificData?.importFreeModelsOnly).toBe(true);
  });
});

describe("AddApiKeyModal — quota scraping fields", () => {
  it("saves OpenCode Go workspace and auth cookie in providerSpecificData", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const el = render({ provider: "opencode-go", providerName: "OpenCode Go", onSave });

    const nameInput = el.querySelector<HTMLInputElement>('input[placeholder="productionKey"]')!;
    const apiKeyInput = el.querySelector<HTMLInputElement>('input[type="password"]')!;
    const workspaceInput = el.querySelector<HTMLInputElement>(
      'input[name="opencodeGoWorkspaceId"]'
    )!;
    const cookieInput = el.querySelector<HTMLInputElement>('input[name="opencodeGoAuthCookie"]')!;
    setInputValue(nameInput, "OpenCode Go");
    setInputValue(apiKeyInput, "sk-opencode-go-test");
    setInputValue(workspaceInput, "workspace-123");
    setInputValue(cookieInput, "auth=opencode-cookie");

    const saveBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "save"
    )!;
    act(() => {
      saveBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await waitFor(() => onSave.mock.calls.length > 0);
    const payload = onSave.mock.calls[0][0];
    expect(payload.providerSpecificData?.opencodeGoWorkspaceId).toBe("workspace-123");
    expect(payload.providerSpecificData?.opencodeGoAuthCookie).toBe("auth=opencode-cookie");
  });

  it("saves Ollama Cloud usage cookie in providerSpecificData", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const el = render({ provider: "ollama-cloud", providerName: "Ollama Cloud", onSave });

    const nameInput = el.querySelector<HTMLInputElement>('input[placeholder="productionKey"]')!;
    const apiKeyInput = el.querySelector<HTMLInputElement>('input[type="password"]')!;
    const cookieInput = el.querySelector<HTMLInputElement>('input[name="ollamaCloudUsageCookie"]')!;
    setInputValue(nameInput, "Ollama Cloud");
    setInputValue(apiKeyInput, "ollama-key");
    setInputValue(cookieInput, "__Secure-session=ollama-cookie");

    const saveBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "save"
    )!;
    act(() => {
      saveBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await waitFor(() => onSave.mock.calls.length > 0);
    const payload = onSave.mock.calls[0][0];
    expect(payload.providerSpecificData?.ollamaCloudUsageCookie).toBe(
      "__Secure-session=ollama-cookie"
    );
  });
});
