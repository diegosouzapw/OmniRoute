// @vitest-environment jsdom
//
// T06 — CompressionPipelineEditor (gaps v3.8.42). The drag-reorder logic itself lives in
// the pure `compressionPipelineModel` (covered by compression-pipeline-model.test.ts); here
// we assert the controlled-component wiring: rendering one row per step and reporting
// add/remove/patch edits through `onChange`.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../src/i18n/messages/en.json";

const { CompressionPipelineEditor } =
  await import("../../../src/shared/components/compression/CompressionPipelineEditor");

const TABLE = {
  rtk: ["standard", "aggressive"],
  caveman: ["lite", "full", "ultra"],
} as const;

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

function render(steps: { engine: string; intensity?: string }[], onChange: (s: unknown) => void) {
  act(() => {
    root.render(
      <NextIntlClientProvider locale="en" messages={{ contextCombos: messages.contextCombos }}>
        <CompressionPipelineEditor
          steps={steps}
          onChange={onChange}
          engineIntensities={TABLE as unknown as Record<string, readonly string[]>}
        />
      </NextIntlClientProvider>
    );
  });
}

describe("CompressionPipelineEditor (T06)", () => {
  it("renders one sortable row per step", () => {
    render(
      [
        { engine: "rtk", intensity: "standard" },
        { engine: "caveman", intensity: "full" },
      ],
      () => {}
    );
    expect(container.querySelector('[data-testid="compression-pipeline-editor"]')).toBeTruthy();
    expect(container.querySelectorAll('[data-testid^="pipeline-row-"]').length).toBe(2);
    // each row exposes a drag handle
    expect(container.querySelectorAll('[data-testid^="pipeline-drag-"]').length).toBe(2);
  });

  it("Add step appends a normalized step via onChange", () => {
    let received: { engine: string; intensity?: string }[] | null = null;
    render([{ engine: "rtk", intensity: "standard" }], (s) => {
      received = s as typeof received;
    });
    const addBtn = container.querySelector(
      '[data-testid="pipeline-add-step"]'
    ) as HTMLButtonElement;
    act(() => addBtn.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(received).not.toBeNull();
    expect(received!.length).toBe(2);
    expect(received![1].engine).toBe("rtk");
    // appended step is normalized (valid intensity for the engine)
    expect(TABLE.rtk).toContain(received![1].intensity);
  });

  it("Remove drops the row; the button is disabled when only one step remains", () => {
    let received: unknown[] | null = null;
    render(
      [
        { engine: "rtk", intensity: "standard" },
        { engine: "caveman", intensity: "full" },
      ],
      (s) => {
        received = s as unknown[];
      }
    );
    const removeBtn = container.querySelector(
      '[data-testid="pipeline-remove-0"]'
    ) as HTMLButtonElement;
    expect(removeBtn.disabled).toBe(false);
    act(() => removeBtn.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(received).toEqual([{ engine: "caveman", intensity: "full" }]);

    // single-step pipeline: remove is disabled (never below minLength 1)
    render([{ engine: "rtk", intensity: "standard" }], () => {});
    const onlyRemove = container.querySelector(
      '[data-testid="pipeline-remove-0"]'
    ) as HTMLButtonElement;
    expect(onlyRemove.disabled).toBe(true);
  });

  it("changing the engine re-normalizes the intensity through onChange", () => {
    let received: { engine: string; intensity?: string }[] | null = null;
    render([{ engine: "rtk", intensity: "aggressive" }], (s) => {
      received = s as typeof received;
    });
    const engineSelect = container.querySelector(
      '[data-testid="pipeline-row-0"] select[aria-label="Engine"]'
    ) as HTMLSelectElement;
    act(() => {
      engineSelect.value = "caveman";
      engineSelect.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(received).not.toBeNull();
    // 'aggressive' is not a caveman intensity → coerced to the first caveman intensity
    expect(received![0].engine).toBe("caveman");
    expect(TABLE.caveman).toContain(received![0].intensity);
    expect(received![0].intensity).toBe("lite");
  });
});
