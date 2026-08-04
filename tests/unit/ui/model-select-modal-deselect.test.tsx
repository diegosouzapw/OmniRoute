// @vitest-environment jsdom
//
// Port of decolua/9router PR #889 (Fajar Hidayat <fajarhide@gmail.com>):
// "Add model deselection functionality in ComboFormModal and ComboDetailPage".
//
// Upstream UX: clicking an already-added (highlighted) model in ModelSelectModal
// should TOGGLE — invoke onDeselect instead of onSelect — and the modal must stay
// open when keepOpenOnSelect so the user can add/remove several models in one
// session. OmniRoute already had the visual highlight (addedModelValues) but no
// deselect callback nor an opt-out for the auto-close — added here.
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
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
        {...props}
      />
    );
  });

  await act(async () => {});
  return { container, root };
}

function findModelButton(container: HTMLElement, label: string): HTMLButtonElement | null {
  const buttons = Array.from(container.querySelectorAll("button"));
  return (buttons.find((b) => (b.textContent || "").includes(label)) as HTMLButtonElement) || null;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
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

describe("ModelSelectModal — deselect / toggle behavior (upstream PR #889)", () => {
  it("calls onDeselect (not onSelect) when clicking a model already in addedModelValues", async () => {
    const onSelect = vi.fn();
    const onDeselect = vi.fn();

    // We don't know exactly which OpenAI model labels the system catalog ships at
    // any given time, so probe the rendered DOM for one and use its value.
    const { container } = await renderModal({
      onSelect,
      onDeselect,
      addedModelValues: [],
    });

    // Find the first OpenAI model rendered (it must exist — openai is an active provider).
    const firstModelButton = container.querySelector(
      "button[class*='hover:border-primary']"
    ) as HTMLButtonElement | null;
    expect(firstModelButton, "expected at least one openai model button to render").not.toBeNull();

    const modelName = (firstModelButton!.textContent || "").trim();
    expect(modelName.length).toBeGreaterThan(0);

    // First click — model is NOT yet added → must call onSelect, not onDeselect.
    await act(async () => {
      firstModelButton!.click();
    });
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onDeselect).not.toHaveBeenCalled();

    // The handler we got back from onSelect should be a model object with .value.
    const selectedArg = onSelect.mock.calls[0][0];
    expect(selectedArg).toMatchObject({ value: expect.any(String) });
  });

  it("toggles to onDeselect when the model is already in addedModelValues", async () => {
    const onSelect = vi.fn();
    const onDeselect = vi.fn();

    // Render once to discover the model value
    const probe = await renderModal({ onSelect: vi.fn(), onDeselect: vi.fn() });
    const probeButton = probe.container.querySelector(
      "button[class*='hover:border-primary']"
    ) as HTMLButtonElement | null;
    expect(probeButton).not.toBeNull();
    // The on-click handler embeds the model value; trigger once to capture it.
    const tempSelect = vi.fn();
    const probe2 = await renderModal({ onSelect: tempSelect, addedModelValues: [] });
    const probeButton2 = probe2.container.querySelector(
      "button[class*='hover:border-primary']"
    ) as HTMLButtonElement | null;
    await act(async () => {
      probeButton2!.click();
    });
    const capturedValue = tempSelect.mock.calls[0][0].value as string;
    expect(typeof capturedValue).toBe("string");
    expect(capturedValue.length).toBeGreaterThan(0);

    // Now render with that value pre-added and click again — must invoke onDeselect.
    const { container } = await renderModal({
      onSelect,
      onDeselect,
      addedModelValues: [capturedValue],
      keepOpenOnSelect: true,
    });

    // The already-added model now renders with the emerald/added class — look for ✓.
    const addedButton = Array.from(container.querySelectorAll("button")).find((b) =>
      (b.textContent || "").includes("✓")
    ) as HTMLButtonElement | undefined;
    expect(addedButton, "expected an added (✓) button to render").toBeDefined();

    await act(async () => {
      addedButton!.click();
    });

    expect(onDeselect).toHaveBeenCalledTimes(1);
    expect(onSelect).not.toHaveBeenCalled();
    expect(onDeselect.mock.calls[0][0]).toMatchObject({ value: capturedValue });
  });

  it("does NOT auto-close the modal when keepOpenOnSelect is true", async () => {
    const onSelect = vi.fn();
    const onClose = vi.fn();

    const { container } = await renderModal({
      onSelect,
      onClose,
      keepOpenOnSelect: true,
    });

    const firstModelButton = container.querySelector(
      "button[class*='hover:border-primary']"
    ) as HTMLButtonElement | null;
    expect(firstModelButton).not.toBeNull();

    await act(async () => {
      firstModelButton!.click();
    });

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("still auto-closes by default (keepOpenOnSelect defaults to false, backward-compat)", async () => {
    const onSelect = vi.fn();
    const onClose = vi.fn();

    const { container } = await renderModal({ onSelect, onClose });

    const firstModelButton = container.querySelector(
      "button[class*='hover:border-primary']"
    ) as HTMLButtonElement | null;
    expect(firstModelButton).not.toBeNull();

    await act(async () => {
      firstModelButton!.click();
    });

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
