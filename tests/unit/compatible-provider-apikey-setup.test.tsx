// @vitest-environment jsdom
/**
 * Port of upstream decolua/9router PR #925.
 *
 * Bug: For openai-compatible / anthropic-compatible providers, the AddApiKeyModal
 * had no "Default Model" input and the saved payload omitted `defaultModel`, so the
 * created connection persisted with `defaultModel = null` and was effectively
 * unusable (no model to bind requests to). The fix adds a required Default Model
 * field for compatible providers and threads it through the save payload.
 *
 * Two TDD tests:
 *  1) Compatible provider: the "Default Model" input is rendered and its value
 *     is forwarded as `defaultModel` in the onSave payload.
 *  2) Non-compatible (first-party) provider: the field is NOT rendered, and
 *     `defaultModel` stays undefined in the payload (no regression for the
 *     existing first-party flow).
 */
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: AddApiKeyModal } = await import(
  "../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/AddApiKeyModal"
);

const DEFAULT_MODEL_INPUT_SELECTOR = 'input[data-testid="compat-default-model-input"]';

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
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )!.set!;
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

describe("AddApiKeyModal — compatible provider default-model field (PR #925)", () => {
  it("renders the Default Model input only when the provider is compatible", () => {
    const compatEl = render({
      provider: "openai-compatible:my-node",
      providerName: "My OpenAI Compatible",
      isCompatible: true,
    });
    expect(compatEl.querySelector(DEFAULT_MODEL_INPUT_SELECTOR)).toBeTruthy();

    const nonCompatEl = render({ provider: "openai", providerName: "OpenAI" });
    expect(nonCompatEl.querySelector(DEFAULT_MODEL_INPUT_SELECTOR)).toBeNull();
  });

  it("threads defaultModel from the form into the save payload for compatible providers", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const el = render({
      provider: "openai-compatible:my-node",
      providerName: "My OpenAI Compatible",
      isCompatible: true,
      onSave,
    });

    const nameInput = el.querySelector<HTMLInputElement>('input[placeholder="productionKey"]')!;
    const apiKeyInput = el.querySelector<HTMLInputElement>('input[type="password"]')!;
    const defaultModelInput = el.querySelector<HTMLInputElement>(DEFAULT_MODEL_INPUT_SELECTOR)!;
    setInputValue(nameInput, "My Connection");
    setInputValue(apiKeyInput, "sk-test-key");
    setInputValue(defaultModelInput, "gpt-4o-mini");

    const saveBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "save"
    )!;
    act(() => {
      saveBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await waitFor(() => onSave.mock.calls.length > 0);
    const payload = onSave.mock.calls[0][0];
    expect(payload.defaultModel).toBe("gpt-4o-mini");
  });
});
