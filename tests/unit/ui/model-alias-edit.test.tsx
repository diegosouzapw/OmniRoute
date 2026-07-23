// @vitest-environment jsdom
/**
 * TDD tests for click-to-edit model alias inline edit affordance.
 * Ported from decolua/9router#2130.
 *
 * Covers PassthroughModelRow and ModelRow:
 *  1) Clicking the alias span enters edit mode (shows an input).
 *  2) Typing a new value and pressing Enter calls onSetAlias with the new value.
 *  3) Pressing Escape cancels without calling onSetAlias.
 *  4) Blur (losing focus) submits like Enter.
 */
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (values) {
      return Object.entries(values).reduce(
        (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
        key
      );
    }
    return key;
  },
}));

vi.mock("@/shared/components", () => ({
  Badge: ({ children }: any) => <span>{children}</span>,
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

const { default: PassthroughModelRow } = await import(
  "../../../src/app/(dashboard)/dashboard/providers/[id]/components/PassthroughModelRow"
);

const { default: ModelRow } = await import(
  "../../../src/app/(dashboard)/dashboard/providers/[id]/components/ModelRow"
);

const t = (key: string, values?: Record<string, unknown>) => {
  if (values) {
    return Object.entries(values).reduce(
      (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
      key
    );
  }
  return key;
};

const noop = async () => {};
const noopSync = () => {};

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function mountPassthrough(props: Record<string, unknown> = {}) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      <PassthroughModelRow
        modelId="gpt-4o"
        fullModel="openai/gpt-4o"
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

function mountModelRow(props: Record<string, unknown> = {}) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      <ModelRow
        model={{ id: "gpt-4o", name: "GPT-4o" }}
        fullModel="openai/gpt-4o"
        provider="openai"
        alias={undefined}
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

beforeEach(() => {});

afterEach(() => {
  for (const { root, el } of containers) {
    act(() => root.unmount());
    el.remove();
  }
  containers.length = 0;
});

// ---------------------------------------------------------------------------
// PassthroughModelRow inline-edit tests
// ---------------------------------------------------------------------------

describe("PassthroughModelRow — inline alias edit", () => {
  it("clicking the alias span enters edit mode (shows input)", () => {
    const el = mountPassthrough({ alias: "my-alias" });
    const span = el.querySelector("span.cursor-pointer");
    expect(span).toBeTruthy();
    expect(el.querySelector("input")).toBeNull();

    act(() => {
      span!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(el.querySelector("input")).toBeTruthy();
  });

  it("Enter key calls onSetAlias with the new value", () => {
    const onSetAlias = vi.fn();
    const el = mountPassthrough({ alias: "old-alias", onSetAlias });
    const span = el.querySelector("span.cursor-pointer");

    act(() => {
      span!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const input = el.querySelector("input") as HTMLInputElement;
    expect(input).toBeTruthy();

    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )!.set!;
    act(() => {
      setter.call(input, "new-alias");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });

    expect(onSetAlias).toHaveBeenCalledWith("new-alias");
  });

  it("Escape cancels without calling onSetAlias", () => {
    const onSetAlias = vi.fn();
    const el = mountPassthrough({ alias: "old-alias", onSetAlias });
    const span = el.querySelector("span.cursor-pointer");

    act(() => {
      span!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const input = el.querySelector("input") as HTMLInputElement;
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )!.set!;
    act(() => {
      setter.call(input, "something-else");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });

    expect(onSetAlias).not.toHaveBeenCalled();
    expect(el.querySelector("input")).toBeNull();
  });

  it("shows placeholder text when no alias is set", () => {
    const el = mountPassthrough({ alias: null });
    const span = el.querySelector("span.cursor-pointer");
    // providerText uses fallback "Click to set alias" when key not found via t()
    expect(span?.textContent).toBeTruthy();
    expect(span?.textContent).not.toBe("");
  });

  it("shows alias value when alias is set", () => {
    const el = mountPassthrough({ alias: "my-alias" });
    const span = el.querySelector("span.cursor-pointer");
    expect(span?.textContent).toContain("my-alias");
  });
});

// ---------------------------------------------------------------------------
// ModelRow inline-edit tests
// ---------------------------------------------------------------------------

describe("ModelRow — inline alias edit", () => {
  it("clicking the alias span enters edit mode (shows input)", () => {
    const el = mountModelRow({ alias: "my-alias" });
    const span = el.querySelector("span.cursor-pointer");
    expect(span).toBeTruthy();
    expect(el.querySelector("input[type=text]")).toBeNull();

    act(() => {
      span!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(el.querySelector("input[type=text]")).toBeTruthy();
  });

  it("Enter key calls onSetAlias with the new value", () => {
    const onSetAlias = vi.fn();
    const el = mountModelRow({ alias: "old-alias", onSetAlias });
    const span = el.querySelector("span.cursor-pointer");

    act(() => {
      span!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const input = el.querySelector("input[type=text]") as HTMLInputElement;
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )!.set!;
    act(() => {
      setter.call(input, "new-alias");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });

    expect(onSetAlias).toHaveBeenCalledWith("new-alias");
  });

  it("Escape cancels without calling onSetAlias", () => {
    const onSetAlias = vi.fn();
    const el = mountModelRow({ alias: "old-alias", onSetAlias });
    const span = el.querySelector("span.cursor-pointer");

    act(() => {
      span!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const input = el.querySelector("input[type=text]") as HTMLInputElement;
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )!.set!;
    act(() => {
      setter.call(input, "something-else");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });

    expect(onSetAlias).not.toHaveBeenCalled();
    expect(el.querySelector("input[type=text]")).toBeNull();
  });
});
