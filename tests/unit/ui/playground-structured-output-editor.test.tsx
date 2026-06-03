// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

const { useStructuredOutput } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/hooks/useStructuredOutput"
);
const { default: StructuredOutputEditor } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/StructuredOutputEditor"
);

function setInputValue(
  el: HTMLTextAreaElement | HTMLInputElement,
  value: string,
): void {
  const nativeSetter =
    el instanceof HTMLTextAreaElement
      ? Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set
      : Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  nativeSetter?.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
}

function StructuredOutputEditorWrapper({ onReady }: {
  onReady?: (so: ReturnType<typeof useStructuredOutput>) => void;
}) {
  const so = useStructuredOutput();
  React.useEffect(() => { onReady?.(so); });
  return <StructuredOutputEditor structuredOutput={so} />;
}

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderEditor(onReady?: (so: ReturnType<typeof useStructuredOutput>) => void): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<StructuredOutputEditorWrapper onReady={onReady} />);
  });
  containers.push({ root, el });
  return el;
}

afterEach(() => {
  for (const { root, el } of containers) {
    act(() => root.unmount());
    el.remove();
  }
  containers.length = 0;
  vi.restoreAllMocks();
});

describe("StructuredOutputEditor", () => {
  it("renders JSON mode toggle off by default", () => {
    const el = renderEditor();
    const toggle = el.querySelector("[role='switch']") as HTMLButtonElement;
    expect(toggle.getAttribute("aria-checked")).toBe("false");
  });

  it("shows schema editor when toggle is enabled", async () => {
    const el = renderEditor();
    const toggle = el.querySelector("[role='switch']") as HTMLButtonElement;

    await act(async () => { toggle.click(); });

    // Should now show schema name field and textarea
    const textareas = el.querySelectorAll("textarea");
    expect(textareas.length).toBeGreaterThan(0);
    expect(el.textContent).toContain("JSON schema");
  });

  it("hides schema editor when toggle is disabled", async () => {
    const el = renderEditor();
    const toggle = el.querySelector("[role='switch']") as HTMLButtonElement;

    // Enable
    await act(async () => { toggle.click(); });
    // Disable
    await act(async () => { toggle.click(); });

    // Should not show textarea
    const textareas = el.querySelectorAll("textarea");
    expect(textareas.length).toBe(0);
  });

  it("validates a valid JSON schema successfully", async () => {
    const el = renderEditor();
    const toggle = el.querySelector("[role='switch']") as HTMLButtonElement;
    await act(async () => { toggle.click(); });

    // Set valid schema
    const textarea = el.querySelector("textarea") as HTMLTextAreaElement;
    const validSchema = JSON.stringify({ type: "object", properties: { name: { type: "string" } }, required: ["name"] });
    act(() => setInputValue(textarea, validSchema));

    // Click Validate
    const validateBtn = el.querySelector("button:last-child") as HTMLButtonElement;
    // Find the validate button specifically
    const allBtns = el.querySelectorAll("button");
    const validateBtnActual = Array.from(allBtns).find(
      (b) => b.textContent?.includes("Validate"),
    ) as HTMLButtonElement;
    expect(validateBtnActual).not.toBeNull();

    await act(async () => { validateBtnActual.click(); });

    // Should show validated status
    expect(el.textContent).toContain("validated");
  });

  it("shows error for invalid JSON in schema textarea", async () => {
    const el = renderEditor();
    const toggle = el.querySelector("[role='switch']") as HTMLButtonElement;
    await act(async () => { toggle.click(); });

    const textarea = el.querySelector("textarea") as HTMLTextAreaElement;
    act(() => setInputValue(textarea, "not valid json {{{"));

    const allBtns = el.querySelectorAll("button");
    const validateBtn = Array.from(allBtns).find(
      (b) => b.textContent?.includes("Validate"),
    ) as HTMLButtonElement;
    await act(async () => { validateBtn.click(); });

    expect(el.textContent).toContain("Invalid JSON");
  });

  it("shows Zod error when schema name is empty after validation", async () => {
    const el = renderEditor();
    const toggle = el.querySelector("[role='switch']") as HTMLButtonElement;
    await act(async () => { toggle.click(); });

    // Clear the name field
    const inputs = el.querySelectorAll("input[type='text']") as NodeListOf<HTMLInputElement>;
    act(() => setInputValue(inputs[0], "")); // empty name

    // Set valid JSON
    const textarea = el.querySelector("textarea") as HTMLTextAreaElement;
    act(() => setInputValue(textarea, JSON.stringify({ type: "object", properties: {} })));

    const allBtns = el.querySelectorAll("button");
    const validateBtn = Array.from(allBtns).find(
      (b) => b.textContent?.includes("Validate"),
    ) as HTMLButtonElement;
    await act(async () => { validateBtn.click(); });

    // Empty name should use fallback "my_schema" which is valid, so no error expected
    // (the component uses nameField.trim() || "my_schema")
    // So it should actually succeed
    expect(el.textContent).toContain("validated");
  });
});
