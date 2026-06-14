// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import type { EngineConfigField } from "@omniroute/open-sse/services/compression/engines/types";

const containers: HTMLElement[] = [];

function mount(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
  vi.clearAllMocks();
});

const SCHEMA: EngineConfigField[] = [
  {
    key: "enabled",
    type: "boolean",
    label: "Enabled",
    description: "Enable this engine",
    defaultValue: false,
  },
  {
    key: "maxTokens",
    type: "number",
    label: "Max Tokens",
    defaultValue: 1000,
    min: 100,
    max: 8000,
  },
  {
    key: "prefix",
    type: "string",
    label: "Prefix",
    defaultValue: "",
  },
  {
    key: "strategy",
    type: "select",
    label: "Strategy",
    defaultValue: "fast",
    options: [
      { value: "fast", label: "Fast" },
      { value: "thorough", label: "Thorough" },
    ],
  },
  {
    key: "techniques",
    type: "multiselect",
    label: "Techniques",
    defaultValue: [],
    options: [
      { value: "strip-comments", label: "Strip Comments" },
      { value: "minify", label: "Minify" },
    ],
  },
];

const INITIAL_VALUE: Record<string, unknown> = {
  enabled: false,
  maxTokens: 1000,
  prefix: "hello",
  strategy: "fast",
  techniques: [],
};

describe("EngineConfigForm", () => {
  it("renders a checkbox for the boolean field", async () => {
    const { EngineConfigForm } =
      await import("../../../src/shared/components/compression/EngineConfigForm");
    const onChange = vi.fn();
    const container = mount(
      <EngineConfigForm schema={SCHEMA} value={INITIAL_VALUE} onChange={onChange} />
    );

    // Label text appears
    expect(container.textContent).toContain("Enabled");
    // Description appears
    expect(container.textContent).toContain("Enable this engine");
    // Checkbox exists
    const checkbox = container.querySelector("input[type='checkbox']") as HTMLInputElement | null;
    expect(checkbox).toBeTruthy();
    expect(checkbox?.checked).toBe(false);
  });

  it("renders a number input with min/max for the number field", async () => {
    const { EngineConfigForm } =
      await import("../../../src/shared/components/compression/EngineConfigForm");
    const onChange = vi.fn();
    const container = mount(
      <EngineConfigForm schema={SCHEMA} value={INITIAL_VALUE} onChange={onChange} />
    );

    expect(container.textContent).toContain("Max Tokens");
    const numInput = container.querySelector("input[type='number']") as HTMLInputElement | null;
    expect(numInput).toBeTruthy();
    expect(numInput?.getAttribute("min")).toBe("100");
    expect(numInput?.getAttribute("max")).toBe("8000");
  });

  it("renders a text input for the string field", async () => {
    const { EngineConfigForm } =
      await import("../../../src/shared/components/compression/EngineConfigForm");
    const onChange = vi.fn();
    const container = mount(
      <EngineConfigForm schema={SCHEMA} value={INITIAL_VALUE} onChange={onChange} />
    );

    expect(container.textContent).toContain("Prefix");
    const textInput = container.querySelector("input[type='text']") as HTMLInputElement | null;
    expect(textInput).toBeTruthy();
    expect(textInput?.value).toBe("hello");
  });

  it("renders a select with 2 options for the select field", async () => {
    const { EngineConfigForm } =
      await import("../../../src/shared/components/compression/EngineConfigForm");
    const onChange = vi.fn();
    const container = mount(
      <EngineConfigForm schema={SCHEMA} value={INITIAL_VALUE} onChange={onChange} />
    );

    expect(container.textContent).toContain("Strategy");
    const select = container.querySelector("select") as HTMLSelectElement | null;
    expect(select).toBeTruthy();
    const options = Array.from(select?.querySelectorAll("option") ?? []);
    expect(options).toHaveLength(2);
    expect(options[0].value).toBe("fast");
    expect(options[1].value).toBe("thorough");
  });

  it("renders 2 checkboxes for the multiselect field", async () => {
    const { EngineConfigForm } =
      await import("../../../src/shared/components/compression/EngineConfigForm");
    const onChange = vi.fn();
    const container = mount(
      <EngineConfigForm schema={SCHEMA} value={INITIAL_VALUE} onChange={onChange} />
    );

    expect(container.textContent).toContain("Techniques");
    expect(container.textContent).toContain("Strip Comments");
    expect(container.textContent).toContain("Minify");
    // boolean field checkbox + 2 multiselect checkboxes = 3 total
    const allCheckboxes = Array.from(container.querySelectorAll("input[type='checkbox']"));
    expect(allCheckboxes).toHaveLength(3); // boolean + 2 multiselect
  });

  it("calls onChange with flipped boolean when checkbox is toggled", async () => {
    const { EngineConfigForm } =
      await import("../../../src/shared/components/compression/EngineConfigForm");
    const onChange = vi.fn();
    const container = mount(
      <EngineConfigForm schema={SCHEMA} value={INITIAL_VALUE} onChange={onChange} />
    );

    // The first checkbox is the boolean field
    const checkbox = container.querySelector("input[type='checkbox']") as HTMLInputElement;
    expect(checkbox).toBeTruthy();

    // React listens to the native "click" event for checkboxes; setting
    // .checked + dispatching a MouseEvent("click") is what triggers the
    // synthetic onChange handler in jsdom.
    act(() => {
      checkbox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onChange).toHaveBeenCalledWith({ ...INITIAL_VALUE, enabled: true });
  });

  it("calls onChange with new number when number input changes", async () => {
    const { EngineConfigForm } =
      await import("../../../src/shared/components/compression/EngineConfigForm");
    const onChange = vi.fn();
    const container = mount(
      <EngineConfigForm schema={SCHEMA} value={INITIAL_VALUE} onChange={onChange} />
    );

    const numInput = container.querySelector("input[type='number']") as HTMLInputElement;
    expect(numInput).toBeTruthy();

    const nativeSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )?.set;

    act(() => {
      nativeSetter?.call(numInput, "2048");
      numInput.dispatchEvent(new Event("change", { bubbles: true }));
    });

    expect(onChange).toHaveBeenCalledWith({ ...INITIAL_VALUE, maxTokens: 2048 });
  });

  it("calls onChange with updated array when a multiselect option is checked", async () => {
    const { EngineConfigForm } =
      await import("../../../src/shared/components/compression/EngineConfigForm");
    const onChange = vi.fn();
    const container = mount(
      <EngineConfigForm schema={SCHEMA} value={INITIAL_VALUE} onChange={onChange} />
    );

    // The multiselect checkboxes are the 2nd and 3rd checkboxes
    const allCheckboxes = Array.from(
      container.querySelectorAll("input[type='checkbox']")
    ) as HTMLInputElement[];
    // Index 0 = boolean field, index 1 = "strip-comments", index 2 = "minify"
    const stripCommentsCheckbox = allCheckboxes[1];
    expect(stripCommentsCheckbox).toBeTruthy();

    // React listens to native "click" for checkboxes to trigger synthetic onChange.
    act(() => {
      stripCommentsCheckbox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onChange).toHaveBeenCalledWith({
      ...INITIAL_VALUE,
      techniques: ["strip-comments"],
    });
  });
});
