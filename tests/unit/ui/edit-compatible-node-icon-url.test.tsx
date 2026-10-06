// @vitest-environment jsdom
//
// Field-level icon URL validation for the compatible-provider Edit modal: an invalid
// iconUrl must surface as an inline field error BEFORE the onSave callback fires, and a
// valid data:image/*;base64 iconUrl must submit. Mirrors the shared validator
// (src/shared/validation/iconUrl.ts) used by both the UI and the server schema.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: EditCompatibleNodeModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/EditCompatibleNodeModal");

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

type ModalProps = React.ComponentProps<typeof EditCompatibleNodeModal>;

type ModalNode = NonNullable<ModalProps["node"]>;

function render(node: ModalNode, onSave?: ModalProps["onSave"]) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  const renderProps = (props: Partial<ModalProps>) => {
    act(() => {
      root.render(
        <EditCompatibleNodeModal
          isOpen
          node={node}
          onSave={onSave || (async () => {})}
          onClose={() => {}}
          {...props}
        />
      );
    });
  };
  renderProps({});
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
});

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
});

const NODE = {
  id: "oc-1",
  name: "My Node",
  prefix: "mynode",
  baseUrl: "https://api.example.com/v1",
  apiType: "chat",
  iconUrl: "https://example.com/logo.png",
};

describe("EditCompatibleNodeModal — iconUrl field-level validation", () => {
  it("shows an inline error for an unsafe scheme and does NOT call onSave", async () => {
    const onSave = vi.fn(async () => {});
    const { el } = render({ ...NODE, iconUrl: "javascript:alert(1)" });
    const modal = el.querySelector('[role="dialog"]')!;

    setInputValue(inputByLabel(modal, "iconUrlLabel"), "javascript:alert(1)");
    const buttons = Array.from(modal.querySelectorAll<HTMLButtonElement>("button"));
    const saveBtn = buttons.find((b) => b.textContent === "save");
    act(() => saveBtn!.click());
    await waitFor(() => modal.textContent?.includes("iconUrlInvalid") ?? false);

    expect(modal.textContent).toContain("iconUrlInvalid");
    expect(onSave).not.toHaveBeenCalled();
  });

  it("shows an inline error for a non-image data URL and does NOT call onSave", async () => {
    const onSave = vi.fn(async () => {});
    const { el } = render({ ...NODE, iconUrl: "data:text/html;base64,QUJD" });
    const modal = el.querySelector('[role="dialog"]')!;

    setInputValue(inputByLabel(modal, "iconUrlLabel"), "data:text/html;base64,QUJD");
    const buttons = Array.from(modal.querySelectorAll<HTMLButtonElement>("button"));
    const saveBtn = buttons.find((b) => b.textContent === "save");
    act(() => saveBtn!.click());
    await waitFor(() => modal.textContent?.includes("iconUrlInvalid") ?? false);

    expect(modal.textContent).toContain("iconUrlInvalid");
    expect(onSave).not.toHaveBeenCalled();
  });

  it("accepts a valid data:image/*;base64 iconUrl and calls onSave with it", async () => {
    const onSave = vi.fn(async () => {});
    const { el } = render({ ...NODE, iconUrl: "" }, onSave);
    const modal = el.querySelector('[role="dialog"]')!;

    setInputValue(inputByLabel(modal, "iconUrlLabel"), "data:image/png;base64,iVBORw0KGgo=");
    const buttons = Array.from(modal.querySelectorAll<HTMLButtonElement>("button"));
    const saveBtn = buttons.find((b) => b.textContent === "save");
    act(() => saveBtn!.click());
    await waitFor(() => onSave.mock.calls.length > 0);

    expect(modal.textContent).not.toContain("iconUrlInvalid");
    const payload = onSave.mock.calls[0][0];
    expect(payload.iconUrl).toBe("data:image/png;base64,iVBORw0KGgo=");
  });

  it("shows an inline error for an over-limit data URL and does NOT call onSave", async () => {
    const onSave = vi.fn(async () => {});
    const { el } = render({ ...NODE, iconUrl: "" }, onSave);
    const modal = el.querySelector('[role="dialog"]')!;
    const tooLong = "data:image/png;base64," + "A".repeat(256 * 1024);

    setInputValue(inputByLabel(modal, "iconUrlLabel"), tooLong);
    const buttons = Array.from(modal.querySelectorAll<HTMLButtonElement>("button"));
    const saveBtn = buttons.find((b) => b.textContent === "save");
    act(() => saveBtn!.click());
    await waitFor(() => modal.textContent?.includes("iconUrlInvalid") ?? false);

    expect(modal.textContent).toContain("iconUrlInvalid");
    expect(onSave).not.toHaveBeenCalled();
  });

  it("surfaces an error thrown by onSave instead of staying silent", async () => {
    const onSave = vi.fn(async () => {
      throw new Error("server said no");
    });
    const { el } = render({ ...NODE, iconUrl: "" }, onSave);
    const modal = el.querySelector('[role="dialog"]')!;

    setInputValue(inputByLabel(modal, "iconUrlLabel"), "data:image/png;base64,iVBORw0KGgo=");
    const buttons = Array.from(modal.querySelectorAll<HTMLButtonElement>("button"));
    const saveBtn = buttons.find((b) => b.textContent === "save");
    act(() => saveBtn!.click());
    await waitFor(() => modal.textContent?.includes("server said no") ?? false);

    const alert = modal.querySelector('[role="alert"]');
    expect(alert?.textContent).toContain("server said no");
    expect(alert?.getAttribute("aria-live")).toBe("assertive");
    expect(onSave).toHaveBeenCalledOnce();
  });

  it("clears a previous save error when the same node modal reopens", async () => {
    const onSave = vi.fn(async () => {
      throw new Error("server said no");
    });
    const { el, rerender } = render({ ...NODE, iconUrl: "" }, onSave);
    let modal = el.querySelector('[role="dialog"]')!;

    act(() =>
      Array.from(modal.querySelectorAll("button"))
        .find((button) => button.textContent === "save")!
        .click()
    );
    await waitFor(() => modal.textContent?.includes("server said no") ?? false);

    rerender({ isOpen: false });
    rerender({ isOpen: true });
    modal = el.querySelector('[role="dialog"]')!;
    expect(modal.textContent).not.toContain("server said no");
    expect(modal.querySelector('[role="alert"]')).toBeNull();
  });
});
