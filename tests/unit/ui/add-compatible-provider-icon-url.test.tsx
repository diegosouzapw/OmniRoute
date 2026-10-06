// @vitest-environment jsdom
//
// Field-level icon URL validation for the compatible-provider Add modal: an invalid
// iconUrl must surface as an inline field error BEFORE a blind POST, instead of only
// failing after the request round-trip. Mirrors the shared validator
// (src/shared/validation/iconUrl.ts) used by both the UI and the server schema.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: AddCompatibleProviderModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/components/AddCompatibleProviderModal");

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

type ModalProps = React.ComponentProps<typeof AddCompatibleProviderModal>;

function render(props: Partial<ModalProps>) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  const renderProps = (nextProps: Partial<ModalProps>) => {
    act(() => {
      root.render(
        <AddCompatibleProviderModal
          isOpen
          mode="openai"
          onClose={() => {}}
          onCreated={() => {}}
          {...nextProps}
        />
      );
    });
  };
  renderProps(props);
  containers.push({ root, el });
  return { el, rerender: renderProps };
}

function inputByLabel(el: Element, label: string): HTMLInputElement {
  const inputs = Array.from(el.querySelectorAll<HTMLInputElement>("input"));
  const found = inputs.find((i) => {
    const labelEl = i.previousElementSibling || i.parentElement?.previousElementSibling;
    return labelEl?.textContent === label;
  });
  if (!found) throw new Error(`No input for label: ${label}`);
  return found;
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
  // Any POST that does reach the network should never happen for the invalid-input
  // cases under test — fail loudly if it does.
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ node: {} }) } as Response)
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

describe("AddCompatibleProviderModal — iconUrl field-level validation", () => {
  it("shows an inline error for an unsafe scheme and does NOT submit", async () => {
    const { el } = render({});
    const modal = el.querySelector('[role="dialog"]')!;

    setInputValue(inputByLabel(modal, "nameLabel"), "My Node");
    setInputValue(inputByLabel(modal, "prefixLabel"), "mynode");
    setInputValue(inputByLabel(modal, "iconUrlLabel"), "javascript:alert(1)");

    const buttons = Array.from(modal.querySelectorAll<HTMLButtonElement>("button"));
    const addBtn = buttons.find((b) => b.textContent === "add");
    act(() => addBtn!.click());
    await waitFor(() => modal.textContent?.includes("iconUrlInvalid") ?? false);

    expect(modal.textContent).toContain("iconUrlInvalid");
    // The invalid icon must never reach the API.
    expect(fetch).not.toHaveBeenCalled();
  });

  it("shows an inline error for a non-image data URL and does NOT submit", async () => {
    const { el } = render({});
    const modal = el.querySelector('[role="dialog"]')!;

    setInputValue(inputByLabel(modal, "nameLabel"), "My Node");
    setInputValue(inputByLabel(modal, "prefixLabel"), "mynode");
    setInputValue(inputByLabel(modal, "iconUrlLabel"), "data:text/html;base64,QUJD");

    const buttons = Array.from(modal.querySelectorAll<HTMLButtonElement>("button"));
    const addBtn = buttons.find((b) => b.textContent === "add");
    act(() => addBtn!.click());
    await waitFor(() => modal.textContent?.includes("iconUrlInvalid") ?? false);

    expect(modal.textContent).toContain("iconUrlInvalid");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("accepts a valid data:image/*;base64 iconUrl and submits", async () => {
    const { el } = render({});
    const modal = el.querySelector('[role="dialog"]')!;

    setInputValue(inputByLabel(modal, "nameLabel"), "My Node");
    setInputValue(inputByLabel(modal, "prefixLabel"), "mynode");
    setInputValue(inputByLabel(modal, "iconUrlLabel"), "data:image/png;base64,iVBORw0KGgo=");

    const buttons = Array.from(modal.querySelectorAll<HTMLButtonElement>("button"));
    const addBtn = buttons.find((b) => b.textContent === "add");
    act(() => addBtn!.click());
    await waitFor(() => (fetch as ReturnType<typeof vi.fn>).mock.calls.length > 0);

    expect(modal.textContent).not.toContain("iconUrlInvalid");
    const call = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(String(call[0])).toBe("/api/provider-nodes");
    const body = JSON.parse(String(call[1].body));
    expect(body.iconUrl).toBe("data:image/png;base64,iVBORw0KGgo=");
  });

  it("shows an inline error for an over-limit data URL and does NOT submit", async () => {
    const { el } = render({});
    const modal = el.querySelector('[role="dialog"]')!;
    const tooLong = "data:image/png;base64," + "A".repeat(256 * 1024);

    setInputValue(inputByLabel(modal, "nameLabel"), "My Node");
    setInputValue(inputByLabel(modal, "prefixLabel"), "mynode");
    setInputValue(inputByLabel(modal, "iconUrlLabel"), tooLong);

    const buttons = Array.from(modal.querySelectorAll<HTMLButtonElement>("button"));
    const addBtn = buttons.find((b) => b.textContent === "add");
    act(() => addBtn!.click());
    await waitFor(() => modal.textContent?.includes("iconUrlInvalid") ?? false);

    expect(modal.textContent).toContain("iconUrlInvalid");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("surfaces a server non-2xx validation error instead of staying silent", async () => {
    const onCreated = vi.fn();
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          json: () => Promise.resolve({ error: { message: "Icon URL too large" } }),
        } as Response)
      )
    );
    const { el } = render({ onCreated });
    const modal = el.querySelector('[role="dialog"]')!;

    setInputValue(inputByLabel(modal, "nameLabel"), "My Node");
    setInputValue(inputByLabel(modal, "prefixLabel"), "mynode");
    setInputValue(inputByLabel(modal, "iconUrlLabel"), "data:image/png;base64,iVBORw0KGgo=");

    const buttons = Array.from(modal.querySelectorAll<HTMLButtonElement>("button"));
    const addBtn = buttons.find((b) => b.textContent === "add");
    act(() => addBtn!.click());
    await waitFor(() => modal.textContent?.includes("Icon URL too large") ?? false);

    expect(modal.textContent).toContain("Icon URL too large");
    expect(onCreated).not.toHaveBeenCalled();
  });

  it("surfaces a network error when create fetch fails", async () => {
    const onCreated = vi.fn();
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("offline")))
    );
    const { el } = render({ onCreated });
    const modal = el.querySelector('[role="dialog"]')!;

    setInputValue(inputByLabel(modal, "nameLabel"), "My Node");
    setInputValue(inputByLabel(modal, "prefixLabel"), "mynode");
    setInputValue(inputByLabel(modal, "iconUrlLabel"), "data:image/png;base64,iVBORw0KGgo=");

    const buttons = Array.from(modal.querySelectorAll<HTMLButtonElement>("button"));
    const addBtn = buttons.find((b) => b.textContent === "add");
    act(() => addBtn!.click());
    await waitFor(() => modal.textContent?.includes("Network error") ?? false);

    const alert = modal.querySelector('[role="alert"]');
    expect(alert?.textContent).toContain("Network error");
    expect(alert?.getAttribute("aria-live")).toBe("assertive");
    expect(onCreated).not.toHaveBeenCalled();
  });

  it("clears a previous save error when the modal reopens", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("offline")))
    );
    const { el, rerender } = render({});
    let modal = el.querySelector('[role="dialog"]')!;

    setInputValue(inputByLabel(modal, "nameLabel"), "My Node");
    setInputValue(inputByLabel(modal, "prefixLabel"), "mynode");
    act(() =>
      Array.from(modal.querySelectorAll("button"))
        .find((button) => button.textContent === "add")!
        .click()
    );
    await waitFor(() => modal.textContent?.includes("Network error") ?? false);

    rerender({ isOpen: false });
    rerender({ isOpen: true });
    modal = el.querySelector('[role="dialog"]')!;
    expect(modal.textContent).not.toContain("Network error");
    expect(modal.querySelector('[role="alert"]')).toBeNull();
  });
});
