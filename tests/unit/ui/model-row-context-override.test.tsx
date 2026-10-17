// @vitest-environment jsdom
/**
 * Catalog (native-provider) ModelRow gets the same opt-in context-window override
 * editor as PassthroughModelRow:
 *  1) no callback -> no affordance (row unchanged).
 *  2) an existing override shows as a 🪟 badge with the number.
 *  3) edit + Enter saves the number.
 *  4) blank saves null (clear).
 *  5) invalid saves NaN and keeps the editor open.
 *  6) Escape cancels without saving.
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

const { default: ModelRow } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/ModelRow");

const t = (key: string) => key;
const noop = () => {};

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
      <ModelRow
        model={{ id: "gpt-5", name: "GPT 5", source: "system" }}
        fullModel="openai/gpt-5"
        provider="openai"
        onCopy={noop}
        t={t}
        effectiveModelNormalize={() => false}
        effectiveModelPreserveDeveloper={() => false}
        saveModelCompatFlags={noop}
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

const pressKey = async (input: HTMLInputElement, key: string) => {
  await act(async () => {
    input.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
  });
};

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
});

describe("catalog ModelRow context-window override", () => {
  it("shows no affordance and no badge without a callback", () => {
    const el = mount({ contextWindowOverride: 5000 });
    expect(overrideButton(el)).toBeUndefined();
    expect(el.querySelector("input")).toBeNull();
    // Without a callback the row is exactly as before: not even a badge.
    expect(el.textContent).not.toContain("🪟");
  });

  it("shows an existing override as a badge with the number", () => {
    const el = mount({
      contextWindowOverride: 200000,
      onSaveContextWindowOverride: async () => {},
    });
    expect(el.textContent).toContain("🪟 200,000");
  });

  it("opens seeded with the current value and saves a number on Enter", async () => {
    const saved: Array<[string, number | null]> = [];
    const el = mount({
      contextWindowOverride: 128000,
      onSaveContextWindowOverride: async (id: string, value: number | null) => {
        saved.push([id, value]);
      },
    });
    act(() => overrideButton(el)!.click());
    const input = el.querySelector("input") as HTMLInputElement;
    expect(input.value).toBe("128000");
    await act(async () => setInputValue(input, "1000000"));
    await pressKey(input, "Enter");
    expect(saved).toEqual([["gpt-5", 1000000]]);
    // Saved successfully -> editor closes.
    expect(el.querySelector("input")).toBeNull();
  });

  it("saves null when the field is blank (clears the override)", async () => {
    const saved: Array<number | null> = [];
    const el = mount({
      contextWindowOverride: 8000,
      onSaveContextWindowOverride: async (_id: string, value: number | null) => {
        saved.push(value);
      },
    });
    act(() => overrideButton(el)!.click());
    const input = el.querySelector("input") as HTMLInputElement;
    await act(async () => setInputValue(input, ""));
    await pressKey(input, "Enter");
    expect(saved).toEqual([null]);
  });

  it("signals invalid input with NaN and keeps the editor open", async () => {
    const saved: Array<number | null> = [];
    const el = mount({
      onSaveContextWindowOverride: async (_id: string, value: number | null) => {
        saved.push(value);
      },
    });
    act(() => overrideButton(el)!.click());
    const input = el.querySelector("input") as HTMLInputElement;
    await act(async () => setInputValue(input, "0"));
    await pressKey(input, "Enter");
    expect(saved).toHaveLength(1);
    expect(Number.isNaN(saved[0] as number)).toBe(true);
    expect(el.querySelector("input")).not.toBeNull();
  });

  it("Escape cancels without saving", async () => {
    const saved: Array<number | null> = [];
    const el = mount({
      contextWindowOverride: 8000,
      onSaveContextWindowOverride: async (_id: string, value: number | null) => {
        saved.push(value);
      },
    });
    act(() => overrideButton(el)!.click());
    const input = el.querySelector("input") as HTMLInputElement;
    await act(async () => setInputValue(input, "99"));
    await pressKey(input, "Escape");
    expect(saved).toEqual([]);
    expect(el.querySelector("input")).toBeNull();
    expect(el.textContent).toContain("8,000");
  });
});
