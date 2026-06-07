// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/shared/components", () => ({
  Modal: ({
    isOpen,
    title,
    children,
    footer,
    onClose,
  }: {
    isOpen?: boolean;
    title?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    onClose?: () => void;
  }) =>
    isOpen
      ? React.createElement(
          "div",
          { "data-testid": "modal", "data-title": title },
          React.createElement("button", { onClick: onClose, "data-testid": "modal-close" }, "X"),
          children,
          footer,
        )
      : null,
  Button: ({
    children,
    onClick,
    disabled,
    loading,
    "data-testid": testId,
    variant,
  }: {
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    "data-testid"?: string;
    variant?: string;
  }) =>
    React.createElement(
      "button",
      {
        onClick,
        disabled: disabled || loading,
        "data-testid": testId,
        "data-variant": variant,
      },
      children,
    ),
  Input: ({
    value,
    onChange,
    placeholder,
    "data-testid": testId,
    className,
  }: {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    "data-testid"?: string;
    className?: string;
  }) =>
    React.createElement("input", {
      value,
      onChange,
      placeholder,
      "data-testid": testId,
      className,
    }),
  Select: ({
    children,
    value,
    onChange,
    className,
  }: {
    children: React.ReactNode;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
  }) => React.createElement("select", { value, onChange, className }, children),
}));

const MOCK_MEMORY = {
  id: "mem-1",
  type: "factual" as const,
  key: "user.name",
  content: "Alice",
  metadata: { source: "test" },
};

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

describe("EditMemoryModal", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
      true;
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("renders nothing when isOpen=false", async () => {
    const { default: EditMemoryModal } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/EditMemoryModal"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <EditMemoryModal
          memory={MOCK_MEMORY}
          isOpen={false}
          onClose={vi.fn()}
          onSaved={vi.fn()}
        />,
      );
    });
    expect(container.querySelector("[data-testid='modal']")).toBeNull();
  });

  it("renders modal with memory fields populated when isOpen=true", async () => {
    const { default: EditMemoryModal } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/EditMemoryModal"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <EditMemoryModal
          memory={MOCK_MEMORY}
          isOpen={true}
          onClose={vi.fn()}
          onSaved={vi.fn()}
        />,
      );
    });
    expect(container.querySelector("[data-testid='modal']")).toBeTruthy();
    // The key input should have value "user.name" and content textarea "Alice"
    const inputs = Array.from(container.querySelectorAll("input"));
    const keyInput = inputs.find((i) => i.value === "user.name");
    expect(keyInput).toBeTruthy();
    const textareas = Array.from(container.querySelectorAll("textarea"));
    const contentTextarea = textareas.find((ta) => ta.value === "Alice");
    expect(contentTextarea).toBeTruthy();
  });

  it("shows metadata JSON in textarea", async () => {
    const { default: EditMemoryModal } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/EditMemoryModal"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <EditMemoryModal
          memory={MOCK_MEMORY}
          isOpen={true}
          onClose={vi.fn()}
          onSaved={vi.fn()}
        />,
      );
    });
    const textareas = container.querySelectorAll("textarea");
    // Should have at least the content textarea and metadata textarea
    expect(textareas.length).toBeGreaterThanOrEqual(2);
    // The metadata textarea should contain the JSON
    const metadataTextarea = Array.from(textareas).find((ta) =>
      ta.value.includes('"source"'),
    );
    expect(metadataTextarea).toBeTruthy();
  });

  it("calls PUT /api/memory/[id] and invokes onSaved+onClose when save succeeds", async () => {
    const onSaved = vi.fn();
    const onClose = vi.fn();
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    const { default: EditMemoryModal } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/EditMemoryModal"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <EditMemoryModal
          memory={MOCK_MEMORY}
          isOpen={true}
          onClose={onClose}
          onSaved={onSaved}
        />,
      );
    });

    // Find and click Save button (text="save")
    const buttons = Array.from(container.querySelectorAll("button"));
    const saveBtn = buttons.find((b) => b.textContent === "save");
    expect(saveBtn).toBeTruthy();
    await act(async () => {
      saveBtn?.click();
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const fetchMock = globalThis.fetch as ReturnType<typeof vi.fn>;
    const putCalls = fetchMock.mock.calls.filter(
      (c: [string, { method?: string }]) =>
        typeof c[0] === "string" &&
        c[0].includes("mem-1") &&
        c[1] &&
        c[1].method === "PUT",
    );
    expect(putCalls.length).toBeGreaterThan(0);
    expect(onSaved).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("shows error message when PUT fails", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: { message: "update failed" } }),
    });

    const { default: EditMemoryModal } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/EditMemoryModal"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <EditMemoryModal
          memory={MOCK_MEMORY}
          isOpen={true}
          onClose={vi.fn()}
          onSaved={vi.fn()}
        />,
      );
    });

    const buttons = Array.from(container.querySelectorAll("button"));
    const saveBtn = buttons.find((b) => b.textContent === "save");
    await act(async () => {
      saveBtn?.click();
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    expect(container.textContent).toContain("update failed");
  });

  it("shows metadata validation error for invalid JSON", async () => {
    const { default: EditMemoryModal } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/EditMemoryModal"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <EditMemoryModal
          memory={MOCK_MEMORY}
          isOpen={true}
          onClose={vi.fn()}
          onSaved={vi.fn()}
        />,
      );
    });

    const textareas = Array.from(container.querySelectorAll("textarea"));
    // Find the metadata textarea (the one with JSON content)
    const metadataTextarea = textareas.find((ta) => ta.value.includes('"source"'));
    expect(metadataTextarea).toBeTruthy();

    // Use nativeInputValueSetter to set value and fire change event
    await act(async () => {
      if (metadataTextarea) {
        const nativeSetter = Object.getOwnPropertyDescriptor(
          window.HTMLTextAreaElement.prototype,
          "value",
        )?.set;
        nativeSetter?.call(metadataTextarea, "not valid json {{{");
        metadataTextarea.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
    // The error text should contain the i18n key
    expect(container.textContent).toContain("editModal.metadataInvalid");
  });

  it("calls onClose when modal close button is clicked", async () => {
    const onClose = vi.fn();
    const { default: EditMemoryModal } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/EditMemoryModal"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <EditMemoryModal
          memory={MOCK_MEMORY}
          isOpen={true}
          onClose={onClose}
          onSaved={vi.fn()}
        />,
      );
    });

    const closeBtn = container.querySelector("[data-testid='modal-close']") as HTMLButtonElement | null;
    expect(closeBtn).toBeTruthy();
    await act(async () => {
      closeBtn?.click();
    });
    expect(onClose).toHaveBeenCalled();
  });
});
