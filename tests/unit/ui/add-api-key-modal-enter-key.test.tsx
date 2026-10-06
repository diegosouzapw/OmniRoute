// @vitest-environment jsdom
//
// #10995 — Enter key in AddApiKeyModal triggers key validation without requiring a mouse click on Check.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: AddApiKeyModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/AddApiKeyModal");

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render(props: Record<string, unknown>) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      <AddApiKeyModal
        isOpen
        provider="openai"
        providerName="OpenAI"
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

function dispatchKeyDown(element: HTMLElement, key: string) {
  act(() => {
    element.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }));
  });
}

describe("AddApiKeyModal Enter key submit (#10995)", () => {
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    for (const { root, el } of containers) {
      act(() => root.unmount());
      el.remove();
    }
    containers.length = 0;
  });

  it("does not trigger validation on Enter when input is empty", () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ valid: true }),
    });
    global.fetch = fetchMock as any;

    const el = render({});
    const input = el.querySelector<HTMLInputElement>('input[type="password"]');
    expect(input).toBeTruthy();

    dispatchKeyDown(input!, "Enter");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("triggers validation on Enter key press when API key is provided", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ valid: true }),
    });
    global.fetch = fetchMock as any;

    const el = render({});
    const input = el.querySelector<HTMLInputElement>('input[type="password"]');
    expect(input).toBeTruthy();

    setInputValue(input!, "sk-test1234567890");
    dispatchKeyDown(input!, "Enter");

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/providers/validate",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("sk-test1234567890"),
      })
    );
  });
});
