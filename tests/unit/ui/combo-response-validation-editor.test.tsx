// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ResponseValidationEditor,
  type ResponseValidationValue,
} from "@/app/(dashboard)/dashboard/combos/ResponseValidationEditor";

// Feature 4985 — the per-combo response-validation editor emits the declarative shape.

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot> | undefined;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  act(() => root?.unmount());
  root = undefined;
  container.remove();
  vi.restoreAllMocks();
});

function render(value: ResponseValidationValue | undefined, onChange: (v: unknown) => void) {
  act(() => {
    root = createRoot(container);
    root.render(<ResponseValidationEditor value={value} onChange={onChange} />);
  });
}

function setTextarea(testid: string, text: string) {
  const el = container.querySelector<HTMLTextAreaElement>(`[data-testid="${testid}"]`);
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLTextAreaElement.prototype,
    "value"
  )!.set!;
  act(() => {
    setter.call(el, text);
    el!.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

describe("ResponseValidationEditor (4985)", () => {
  it("turns forbidden-substring lines into an array (trimmed, no blanks)", () => {
    const onChange = vi.fn();
    render(undefined, onChange);
    setTextarea("rv-forbidden", "I cannot help\n\n  as an AI  \n");
    expect(onChange).toHaveBeenLastCalledWith({
      forbiddenSubstrings: ["I cannot help", "as an AI"],
    });
  });

  it("clears the whole config back to undefined when every field is emptied", () => {
    const onChange = vi.fn();
    render({ forbiddenSubstrings: ["x"] }, onChange);
    setTextarea("rv-forbidden", "");
    expect(onChange).toHaveBeenLastCalledWith(undefined);
  });

  it("adds a json-path predicate row with sane defaults", () => {
    const onChange = vi.fn();
    render(undefined, onChange);
    const addBtn = container.querySelector<HTMLButtonElement>('[data-testid="rv-predicate-add"]');
    act(() => addBtn!.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(onChange).toHaveBeenLastCalledWith({
      jsonPathPredicates: [{ path: "", condition: "exists" }],
    });
  });

  it("renders existing predicate rows from the value", () => {
    render(
      { jsonPathPredicates: [{ path: "choices[0].message.content", condition: "nonEmpty" }] },
      vi.fn()
    );
    const rows = container.querySelectorAll('[data-testid="rv-predicate-row"]');
    expect(rows.length).toBe(1);
    const pathInput = container.querySelector<HTMLInputElement>('[data-testid="rv-predicate-path"]');
    expect(pathInput?.value).toBe("choices[0].message.content");
  });
});
