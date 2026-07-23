// @vitest-environment jsdom
//
// Phase 1c regression tests for Issue #3501. AddApiKeyModal and EditConnectionModal
// were extracted from the god-component. This proves each mounts in isolation with
// its clean Props interface (Hard Rule #8, Rule #18 TDD gate).
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AddApiKeyModal from "../AddApiKeyModal";
import EditConnectionModal from "../EditConnectionModal";

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "openai" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock("next-intl", () => ({
  useTranslations: (ns?: string) => (k: string) => (ns ? `${ns}.${k}` : k),
}));

const cleanups: Array<() => void> = [];

function renderModal(node: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(node));
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  return container;
}

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  act(() => {
    setter?.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

function setTextareaValue(textarea: HTMLTextAreaElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set;
  act(() => {
    setter?.call(textarea, value);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

describe("conn-modals (Phase 1c extraction)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({ ok: true, json: async () => ({}), text: async () => "" } as Response)
      )
    );
    vi.stubGlobal("localStorage", {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
      clear: () => undefined,
    });
  });

  afterEach(() => {
    while (cleanups.length) cleanups.pop()?.();
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("AddApiKeyModal mounts standalone when isOpen=false", () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const c = renderModal(
      <AddApiKeyModal
        isOpen={false}
        provider="openai"
        providerName="OpenAI"
        isCompatible={false}
        onSave={onSave}
        onClose={vi.fn()}
      />
    );
    // When isOpen=false the modal renders nothing (null body) — no throw is the assertion.
    expect(c).toBeDefined();
  });

  it("AddApiKeyModal mounts standalone when isOpen=true", () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const c = renderModal(
      <AddApiKeyModal
        isOpen={true}
        provider="openai"
        providerName="OpenAI"
        isCompatible={false}
        onSave={onSave}
        onClose={vi.fn()}
      />
    );
    expect(c.querySelector("*")).not.toBeNull();
  });

  it("AddApiKeyModal renders OpenRouter preset outside advanced settings", () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const c = renderModal(
      <AddApiKeyModal
        isOpen={true}
        provider="openrouter"
        providerName="OpenRouter"
        isCompatible={true}
        onSave={onSave}
        onClose={vi.fn()}
      />
    );
    const presetInput = c.querySelector<HTMLInputElement>(
      '[data-testid="openrouter-preset-input"]'
    );
    expect(presetInput?.placeholder).toBe("@preset/slug");
    expect(presetInput?.closest("#add-api-key-advanced-settings")).toBeNull();
  });

  it("AddApiKeyModal asks for the Qwen Cloud region before showing the API key form", () => {
    const c = renderModal(
      <AddApiKeyModal
        isOpen={true}
        provider="qwen-cloud"
        providerName="Qwen Cloud"
        isCompatible={false}
        onSave={vi.fn().mockResolvedValue(undefined)}
        onClose={vi.fn()}
      />
    );

    expect(c.textContent).toContain("Which region are you using?");
    expect(
      Array.from(c.querySelectorAll<HTMLButtonElement>("[data-region]")).map(
        (button) => button.dataset.region
      )
    ).toEqual(["china-beijing", "global-sg"]);
    expect(c.querySelector('input[type="password"]')).toBeNull();
    expect(c.querySelector("select")).toBeNull();
  });

  it("AddApiKeyModal persists the region selected before the Qwen Cloud API key form", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => ({ valid: true }),
          text: async () => "",
        } as Response)
      )
    );
    const c = renderModal(
      <AddApiKeyModal
        isOpen={true}
        provider="qwen-cloud"
        providerName="Qwen Cloud"
        isCompatible={false}
        onSave={onSave}
        onClose={vi.fn()}
      />
    );

    const beijingButton = c.querySelector<HTMLButtonElement>('[data-region="china-beijing"]');
    expect(beijingButton).not.toBeNull();
    act(() => beijingButton!.click());

    expect(c.textContent).not.toContain("Which region are you using?");
    expect(c.querySelector("select")).toBeNull();
    const apiKeyInput = c.querySelector<HTMLInputElement>('input[type="password"]');
    expect(apiKeyInput).not.toBeNull();
    setInputValue(apiKeyInput!, "sk-sp-test");

    const saveButton = Array.from(c.querySelectorAll("button")).find(
      (button) => button.textContent === "providers.save"
    );
    expect(saveButton).toBeDefined();
    await act(async () => {
      saveButton!.click();
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        apiKey: "sk-sp-test",
        providerSpecificData: { region: "china-beijing" },
      })
    );
  });

  it("AddApiKeyModal applies Global to bulk Qwen Cloud additions", async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({ success: 1, failed: 0, total: 1, errors: [] }),
        text: async () => "",
      } as Response)
    );
    vi.stubGlobal("fetch", fetchMock);
    const c = renderModal(
      <AddApiKeyModal
        isOpen={true}
        provider="qwen-cloud"
        providerName="Qwen Cloud"
        isCompatible={false}
        onSave={vi.fn().mockResolvedValue(undefined)}
        onClose={vi.fn()}
      />
    );

    const globalButton = c.querySelector<HTMLButtonElement>('[data-region="global-sg"]');
    act(() => globalButton!.click());

    const bulkTab = Array.from(c.querySelectorAll("button")).find(
      (button) => button.textContent === "providers.bulkTabBulkAdd"
    );
    act(() => bulkTab!.click());
    const bulkInput = c.querySelector<HTMLTextAreaElement>("textarea");
    setTextareaValue(bulkInput!, "main|sk-global-test");
    const submitButton = Array.from(c.querySelectorAll("button")).find(
      (button) => button.textContent === "providers.bulkAddAllKeys"
    );
    await act(async () => {
      submitButton!.click();
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/providers/bulk",
      expect.objectContaining({
        body: expect.stringContaining('"region":"global-sg"'),
      })
    );
  });

  it("AddApiKeyModal does not infer a regional provider selection", () => {
    const c = renderModal(
      <AddApiKeyModal
        isOpen={true}
        provider="alibaba"
        providerName="Alibaba Cloud Model Studio"
        isCompatible={false}
        onSave={vi.fn().mockResolvedValue(undefined)}
        onClose={vi.fn()}
      />
    );

    expect(Array.from(c.querySelectorAll("h3")).map((heading) => heading.textContent)).toEqual([
      "Beijing",
      "Global",
    ]);
  });

  it("AddApiKeyModal labels the Token Plan global endpoint as Singapore", () => {
    const c = renderModal(
      <AddApiKeyModal
        isOpen={true}
        provider="bailian-coding-plan"
        providerName="Alibaba Token Plan"
        isCompatible={false}
        onSave={vi.fn().mockResolvedValue(undefined)}
        onClose={vi.fn()}
      />
    );

    expect(Array.from(c.querySelectorAll("h3")).map((heading) => heading.textContent)).toEqual([
      "Beijing",
      "Singapore",
    ]);
    expect(c.textContent).not.toContain("Global");
  });

  it("AddApiKeyModal returns null when provider is falsy", () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const c = renderModal(<AddApiKeyModal isOpen={true} onSave={onSave} onClose={vi.fn()} />);
    // No provider → renders null
    expect(c.textContent).toBe("");
  });

  it("EditConnectionModal mounts standalone when connection=null", () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const c = renderModal(
      <EditConnectionModal
        isOpen={false}
        connection={null}
        providerId="openai"
        onSave={onSave}
        onClose={vi.fn()}
      />
    );
    // connection=null → renders null — no throw is the assertion
    expect(c).toBeDefined();
  });

  it("EditConnectionModal mounts standalone with a connection", () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const connection = {
      id: "conn-1",
      name: "Test Connection",
      provider: "openai",
      authType: "apikey",
      priority: 1,
    };
    const c = renderModal(
      <EditConnectionModal
        isOpen={true}
        connection={connection}
        providerId="openai"
        onSave={onSave}
        onClose={vi.fn()}
      />
    );
    expect(c.querySelector("*")).not.toBeNull();
  });

  it("EditConnectionModal renders the API key value returned by the provider connection API", () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const fullApiKey = "test-provider-key-full-1234567890abcdef78b9";
    const connection = {
      id: "conn-full-key",
      name: "Test Connection",
      provider: "openai",
      authType: "apikey",
      priority: 1,
      apiKey: fullApiKey,
    };
    const c = renderModal(
      <EditConnectionModal
        isOpen={true}
        connection={connection}
        providerId="openai"
        onSave={onSave}
        onClose={vi.fn()}
      />
    );

    expect(c.textContent).toContain(fullApiKey);
    expect(c.textContent).not.toContain("test-p...78b9");
  });

  it("EditConnectionModal renders OpenRouter preset when provider comes from the page", () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const connection = {
      id: "conn-openrouter",
      name: "OpenRouter",
      authType: "apikey",
      priority: 1,
      providerSpecificData: { preset: "prefer" },
    };
    const c = renderModal(
      <EditConnectionModal
        isOpen={true}
        connection={connection}
        providerId="openrouter"
        onSave={onSave}
        onClose={vi.fn()}
      />
    );
    const presetInput = c.querySelector<HTMLInputElement>(
      '[data-testid="openrouter-preset-input"]'
    );
    expect(presetInput?.value).toBe("prefer");
    expect(presetInput?.placeholder).toBe("@preset/slug");
    expect(presetInput?.closest("#edit-connection-advanced-settings")).toBeNull();
  });

  it("EditConnectionModal keeps legacy alibaba-cn connections on the Beijing default", () => {
    const c = renderModal(
      <EditConnectionModal
        isOpen={true}
        connection={{
          id: "conn-alibaba-cn",
          name: "Alibaba China",
          provider: "alibaba-cn",
          authType: "apikey",
          priority: 1,
        }}
        providerId="alibaba"
        onSave={vi.fn().mockResolvedValue(undefined)}
        onClose={vi.fn()}
      />
    );

    const regionSelect = Array.from(c.querySelectorAll("select")).find((select) =>
      Array.from(select.options).some((option) => option.value === "china-beijing")
    );
    expect(regionSelect?.value).toBe("china-beijing");
  });

  it("EditConnectionModal renders without ReferenceError for oauth connection", () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const connection = {
      id: "conn-oauth",
      name: "OAuth Account",
      email: "user@example.com",
      provider: "claude",
      authType: "oauth",
      priority: 1,
    };
    // Must not throw; tests that ERROR_TYPE_LABELS and formatTimeAgo are properly imported
    expect(() =>
      renderModal(
        <EditConnectionModal
          isOpen={true}
          connection={connection}
          providerId="claude"
          onSave={onSave}
          onClose={vi.fn()}
        />
      )
    ).not.toThrow();
  });
});
