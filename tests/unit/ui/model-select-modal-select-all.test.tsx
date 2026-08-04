// @vitest-environment jsdom
//
// Select all / Unselect all for currently visible models in ModelSelectModal.
// Used by combo Create/Edit "Browse Catalog" (keepOpenOnSelect + batch callbacks).
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.has = () => false;
    return t;
  },
}));

const { default: ModelSelectModal } = await import("@/shared/components/ModelSelectModal");

const containers: HTMLElement[] = [];

async function renderModal(props: Partial<React.ComponentProps<typeof ModelSelectModal>> = {}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  await act(async () => {
    root.render(
      <ModelSelectModal
        isOpen={true}
        onClose={() => {}}
        onSelect={() => {}}
        showCombos={false}
        activeProviders={[{ provider: "openai" }]}
        keepOpenOnSelect
        {...props}
      />
    );
  });

  await act(async () => {});
  return { container, root };
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  // These tests exercise selection bookkeeping, not the confirm-above-threshold
  // UX (see modelSelectModalHelpers.ts::shouldConfirmSelectAll) — stub confirm
  // to always accept so assertions don't depend on how many models the fixture
  // catalog happens to expose.
  vi.stubGlobal("confirm", vi.fn(() => true));
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      if (url === "/api/provider-nodes") {
        return { ok: true, json: async () => ({ nodes: [] }) };
      }
      if (url === "/api/provider-models") {
        return { ok: true, json: async () => ({ models: {} }) };
      }
      if (url === "/api/combos") {
        return { ok: true, json: async () => ({ combos: [] }) };
      }
      return { ok: true, json: async () => ({}) };
    })
  );
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

describe("ModelSelectModal — Select all / Unselect all visible models", () => {
  it("does not render the toggle without batch callbacks", async () => {
    const { container } = await renderModal();
    expect(container.querySelector('[data-testid="model-select-toggle-all-visible"]')).toBeNull();
  });

  it("renders Select all when keepOpenOnSelect + batch callbacks are set", async () => {
    const { container } = await renderModal({
      onSelectMany: vi.fn(),
      onDeselectMany: vi.fn(),
      addedModelValues: [],
    });

    const toggle = container.querySelector(
      '[data-testid="model-select-toggle-all-visible"]'
    ) as HTMLButtonElement | null;
    expect(toggle, "expected Select all toggle").not.toBeNull();
    expect(toggle!.textContent).toMatch(/Select all/i);
  });

  it("calls onSelectMany with every visible model that is not yet added", async () => {
    const onSelectMany = vi.fn();
    const onDeselectMany = vi.fn();

    const { container } = await renderModal({
      onSelectMany,
      onDeselectMany,
      addedModelValues: [],
    });

    const toggle = container.querySelector(
      '[data-testid="model-select-toggle-all-visible"]'
    ) as HTMLButtonElement;
    expect(toggle).not.toBeNull();

    await act(async () => {
      toggle.click();
    });

    expect(onSelectMany).toHaveBeenCalledTimes(1);
    expect(onDeselectMany).not.toHaveBeenCalled();
    const selected = onSelectMany.mock.calls[0][0] as Array<{ value: string }>;
    expect(Array.isArray(selected)).toBe(true);
    expect(selected.length).toBeGreaterThan(1);
    expect(selected.every((m) => typeof m.value === "string" && m.value.length > 0)).toBe(true);
  });

  it("shows Unselect all and calls onDeselectMany when every visible model is already added", async () => {
    const probeSelect = vi.fn();
    const probe = await renderModal({
      onSelectMany: probeSelect,
      onDeselectMany: vi.fn(),
      addedModelValues: [],
    });
    const probeToggle = probe.container.querySelector(
      '[data-testid="model-select-toggle-all-visible"]'
    ) as HTMLButtonElement;
    await act(async () => {
      probeToggle.click();
    });
    const allValues = (probeSelect.mock.calls[0][0] as Array<{ value: string }>).map(
      (m) => m.value
    );
    expect(allValues.length).toBeGreaterThan(1);

    const onSelectMany = vi.fn();
    const onDeselectMany = vi.fn();
    const { container } = await renderModal({
      onSelectMany,
      onDeselectMany,
      addedModelValues: allValues,
    });

    const toggle = container.querySelector(
      '[data-testid="model-select-toggle-all-visible"]'
    ) as HTMLButtonElement;
    expect(toggle.textContent).toMatch(/Unselect all/i);

    await act(async () => {
      toggle.click();
    });

    expect(onDeselectMany).toHaveBeenCalledTimes(1);
    expect(onSelectMany).not.toHaveBeenCalled();
    const removed = onDeselectMany.mock.calls[0][0] as Array<{ value: string }>;
    expect(removed.map((m) => m.value).sort()).toEqual([...allValues].sort());
  });

  it("Select all only adds models that are not already in addedModelValues", async () => {
    const probeSelect = vi.fn();
    const probe = await renderModal({
      onSelectMany: probeSelect,
      onDeselectMany: vi.fn(),
      addedModelValues: [],
    });
    const probeToggle = probe.container.querySelector(
      '[data-testid="model-select-toggle-all-visible"]'
    ) as HTMLButtonElement;
    await act(async () => {
      probeToggle.click();
    });
    const allValues = (probeSelect.mock.calls[0][0] as Array<{ value: string }>).map(
      (m) => m.value
    );
    const alreadyAdded = [allValues[0]];

    const onSelectMany = vi.fn();
    const { container } = await renderModal({
      onSelectMany,
      onDeselectMany: vi.fn(),
      addedModelValues: alreadyAdded,
    });

    const toggle = container.querySelector(
      '[data-testid="model-select-toggle-all-visible"]'
    ) as HTMLButtonElement;
    await act(async () => {
      toggle.click();
    });

    const selected = onSelectMany.mock.calls[0][0] as Array<{ value: string }>;
    expect(selected.some((m) => m.value === alreadyAdded[0])).toBe(false);
    expect(selected.length).toBe(allValues.length - 1);
  });

  it("asks for confirmation before Select all above the threshold, and honors decline", async () => {
    const confirmSpy = vi.fn(() => false);
    vi.stubGlobal("confirm", confirmSpy);

    const onSelectMany = vi.fn();
    // openai (20 models) + anthropic (10 models) = 30 candidates, comfortably
    // above SELECT_ALL_CONFIRM_THRESHOLD (20) — see modelSelectModalHelpers.ts.
    const { container } = await renderModal({
      activeProviders: [{ provider: "openai" }, { provider: "anthropic" }],
      onSelectMany,
      onDeselectMany: vi.fn(),
      addedModelValues: [],
    });

    const toggle = container.querySelector(
      '[data-testid="model-select-toggle-all-visible"]'
    ) as HTMLButtonElement;

    await act(async () => {
      toggle.click();
    });

    expect(confirmSpy).toHaveBeenCalledTimes(1);
    // Declining the confirmation must abort the batch add entirely.
    expect(onSelectMany).not.toHaveBeenCalled();
  });
});
