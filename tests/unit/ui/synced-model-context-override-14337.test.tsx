// @vitest-environment jsdom
/**
 * #14337: synced/imported model rows carried no edit affordance, so the manual
 * context-window override #4125 added for custom models was unreachable for them
 * — even though the PUT compatOnly branch in /api/provider-models has always
 * accepted `contextWindowOverride` for a model with no customModels row.
 *
 * These cover the row's half of the contract:
 *  1) no handler -> the row is exactly as before (no affordance).
 *  2) handler -> a pencil opens an editor seeded with the current override.
 *  3) a value saves as a number; blank clears it (null), per #4125 semantics.
 *  4) an invalid value is reported, not silently written or dropped.
 *  5) an existing override is visible on the row without opening the editor.
 */
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/shared/components", () => ({
  Badge: ({ children, title }: any) => <span title={title}>{children}</span>,
  Button: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
}));

vi.mock(
  "../../../src/app/(dashboard)/dashboard/providers/[id]/components/ModelCompatPopover",
  () => ({ default: () => null })
);

vi.mock("@/shared/utils/modelCatalogSearch", () => ({
  getModelCatalogSourceLabel: () => "system",
  normalizeModelCatalogSource: () => "system",
}));

const { default: PassthroughModelRow } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/PassthroughModelRow");

const t = (key: string) => key;
const noopSync = () => {};

// React tracks input values itself, so a plain `input.value =` never reaches
// onChange. Same native-setter technique the sibling alias test uses.
const setInputValue = (input: HTMLInputElement, value: string) => {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
  setter.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
};

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function mount(props: Record<string, unknown> = {}) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      <PassthroughModelRow
        modelId="gpt-4o"
        fullModel="openai/gpt-4o"
        provider="openai"
        alias={null}
        onCopy={noopSync}
        onSetAlias={noopSync}
        t={t}
        effectiveModelNormalize={() => false}
        effectiveModelPreserveDeveloper={() => false}
        saveModelCompatFlags={noopSync}
        getUpstreamHeadersRecord={() => ({})}
        {...(props as any)}
      />
    );
  });
  containers.push({ root, el });
  return el;
}

const overrideButton = (el: HTMLElement) =>
  [...el.querySelectorAll("button")].find(
    (b) => b.getAttribute("title") === "contextWindowOverrideLabel"
  );

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
});

describe("synced model rows can carry a context-window override", () => {
  it("shows no affordance when the section supplies no handler", () => {
    // A row that cannot take an override must look exactly as it did before.
    const el = mount();
    expect(overrideButton(el)).toBeUndefined();
    expect(el.querySelector("input")).toBeNull();
  });

  it("opens an editor seeded with the current override", () => {
    const el = mount({
      contextWindowOverride: 128000,
      onSaveContextWindowOverride: async () => {},
    });
    const button = overrideButton(el)!;
    expect(button).toBeDefined();
    act(() => button.click());
    const input = el.querySelector("input") as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.value).toBe("128000");
  });

  it("saves a number and clears on blank", async () => {
    const saved: Array<[string, number | null]> = [];
    const el = mount({
      contextWindowOverride: null,
      onSaveContextWindowOverride: async (id: string, value: number | null) => {
        saved.push([id, value]);
      },
    });
    act(() => overrideButton(el)!.click());
    const input = el.querySelector("input") as HTMLInputElement;

    await act(async () => {
      setInputValue(input, "1000000");
    });
    await act(async () => {
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });
    expect(saved).toEqual([["gpt-4o", 1000000]]);

    // Blank clears the override rather than being rejected (#4125 semantics).
    act(() => overrideButton(el)!.click());
    const again = el.querySelector("input") as HTMLInputElement;
    await act(async () => {
      setInputValue(again, "");
    });
    await act(async () => {
      again.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });
    expect(saved[1]).toEqual(["gpt-4o", null]);
  });

  it("reports an invalid value instead of writing or discarding one", async () => {
    const saved: Array<number | null> = [];
    const el = mount({
      onSaveContextWindowOverride: async (_id: string, value: number | null) => {
        saved.push(value);
      },
    });
    act(() => overrideButton(el)!.click());
    const input = el.querySelector("input") as HTMLInputElement;
    await act(async () => {
      setInputValue(input, "0");
    });
    await act(async () => {
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });
    // NaN is the row's "invalid" signal; the section turns it into a message.
    expect(saved).toHaveLength(1);
    expect(Number.isNaN(saved[0] as number)).toBe(true);
    // The editor stays open so the value is not lost.
    expect(el.querySelector("input")).not.toBeNull();
  });

  it("shows an existing override without opening the editor", () => {
    const el = mount({
      contextWindowOverride: 200000,
      onSaveContextWindowOverride: async () => {},
    });
    expect(el.textContent).toContain("200,000");
  });

  it("escape leaves the override untouched", async () => {
    const saved: Array<number | null> = [];
    const el = mount({
      contextWindowOverride: 8000,
      onSaveContextWindowOverride: async (_id: string, value: number | null) => {
        saved.push(value);
      },
    });
    act(() => overrideButton(el)!.click());
    const input = el.querySelector("input") as HTMLInputElement;
    await act(async () => {
      setInputValue(input, "99");
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    expect(saved).toEqual([]);
    expect(el.textContent).toContain("8,000");
  });
});
