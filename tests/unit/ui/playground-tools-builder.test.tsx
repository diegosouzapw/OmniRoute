// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

const { useToolsBuilder } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/hooks/useToolsBuilder"
);
const { default: ToolsBuilder } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/ToolsBuilder"
);

if (typeof Element.prototype.scrollIntoView === "undefined") {
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    value: () => {},
    writable: true,
    configurable: true,
  });
}

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

// Wrapper component to expose the useToolsBuilder hook
function ToolsBuilderWrapper({ onReady }: { onReady?: (builder: ReturnType<typeof useToolsBuilder>) => void }) {
  const builder = useToolsBuilder();
  React.useEffect(() => {
    onReady?.(builder);
  });
  return <ToolsBuilder toolsBuilder={builder} />;
}

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderToolsBuilder(onReady?: (b: ReturnType<typeof useToolsBuilder>) => void): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<ToolsBuilderWrapper onReady={onReady} />);
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

describe("ToolsBuilder", () => {
  it("renders Add tool form by default", () => {
    const el = renderToolsBuilder();
    expect(el.textContent).toContain("Add tool");
  });

  it("shows error when name is empty and Add is clicked", async () => {
    const el = renderToolsBuilder();

    const addBtn = el.querySelector("button[class*='bg-primary']") as HTMLButtonElement;
    expect(addBtn?.textContent?.trim()).toBe("+ Add tool");

    await act(async () => { addBtn.click(); });

    // Zod validation should show error
    expect(el.textContent).toMatch(/String must contain at least 1 character|Too small|name|required/i);
  });

  it("adds a valid tool to the list", async () => {
    const el = renderToolsBuilder();

    // Fill out the form
    const inputs = el.querySelectorAll("input[type='text']") as NodeListOf<HTMLInputElement>;
    const nameInput = inputs[0]; // first input = function name
    const descInput = inputs[1]; // second input = description

    act(() => {
      setInputValue(nameInput, "get_weather");
      setInputValue(descInput, "Get current weather");
    });

    // Parameters textarea already has valid JSON by default
    const addBtn = el.querySelector("button[class*='bg-primary']") as HTMLButtonElement;
    await act(async () => { addBtn.click(); });

    // Should show the tool in the list
    expect(el.textContent).toContain("get_weather");
    // Should show "1" in the Tools count
    expect(el.textContent).toContain("Tools (1)");
  });

  it("shows Zod error for invalid JSON in parameters", async () => {
    const el = renderToolsBuilder();

    const nameInput = el.querySelector("input[type='text']") as HTMLInputElement;
    act(() => setInputValue(nameInput, "my_func"));

    // Find the parameters textarea and set invalid JSON
    const textareas = el.querySelectorAll("textarea");
    const paramsTextarea = textareas[0]; // parameters textarea
    act(() => setInputValue(paramsTextarea, "not valid json"));

    const addBtn = el.querySelector("button[class*='bg-primary']") as HTMLButtonElement;
    await act(async () => { addBtn.click(); });

    // Should show JSON parse error
    expect(el.textContent).toContain("valid JSON");
  });

  it("removes a tool from the list", async () => {
    const el = renderToolsBuilder();

    // Add a tool first
    const inputs = el.querySelectorAll("input[type='text']") as NodeListOf<HTMLInputElement>;
    act(() => setInputValue(inputs[0], "to_remove"));
    const addBtn = el.querySelector("button[class*='bg-primary']") as HTMLButtonElement;
    await act(async () => { addBtn.click(); });

    expect(el.textContent).toContain("to_remove");

    // Click delete button
    const deleteBtn = el.querySelector("[aria-label='Remove tool to_remove']") as HTMLButtonElement;
    expect(deleteBtn).not.toBeNull();
    await act(async () => { deleteBtn.click(); });

    expect(el.textContent).not.toContain("to_remove");
    expect(el.textContent).not.toContain("Tools (1)");
  });

  it("shows edit mode for an existing tool", async () => {
    const el = renderToolsBuilder();

    // Add a tool
    const inputs = el.querySelectorAll("input[type='text']") as NodeListOf<HTMLInputElement>;
    act(() => setInputValue(inputs[0], "edit_me"));
    const addBtn = el.querySelector("button[class*='bg-primary']") as HTMLButtonElement;
    await act(async () => { addBtn.click(); });

    // Click edit button
    const editBtn = el.querySelector("[aria-label='Edit tool edit_me']") as HTMLButtonElement;
    expect(editBtn).not.toBeNull();
    await act(async () => { editBtn.click(); });

    // Should show Save/Cancel buttons
    expect(el.textContent).toContain("Save");
    expect(el.textContent).toContain("Cancel");
  });
});
