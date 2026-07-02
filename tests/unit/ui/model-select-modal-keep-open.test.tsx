// @vitest-environment jsdom
//
// Regression coverage for the "keepOpenOnSelect" prop added in feat/port-pr-1031.
// Mirrors the UX of upstream PR decolua/9router#1031: when a caller (e.g. combo
// creation) opts out of the auto-close-on-select behaviour, the modal renders a
// "Done" button in the footer so the user has a clear way to confirm they are
// finished adding entries.

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
        activeProviders={[]}
        {...props}
      />
    );
  });

  await act(async () => {});
  return container;
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

describe("ModelSelectModal keepOpenOnSelect", () => {
  it("does not render the Done button by default (auto-close behaviour preserved)", async () => {
    const container = await renderModal();
    const doneButton = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "done"
    );
    expect(doneButton).toBeUndefined();
  });

  it("renders the Done button when keepOpenOnSelect is true", async () => {
    const container = await renderModal({ keepOpenOnSelect: true });
    const doneButton = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "done"
    );
    expect(doneButton).toBeDefined();
  });

  it("clicking Done triggers onClose without invoking onSelect again", async () => {
    const onClose = vi.fn();
    const onSelect = vi.fn();
    const container = await renderModal({ keepOpenOnSelect: true, onClose, onSelect });

    const doneButton = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "done"
    );
    expect(doneButton).toBeDefined();

    await act(async () => {
      doneButton!.click();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("does not render the Done button when multiSelect is true (multiSelect owns its own footer)", async () => {
    // multiSelect already ships a Clear + Done footer driven by selectedModels.
    // keepOpenOnSelect must defer to it to avoid two competing Done buttons.
    const container = await renderModal({ keepOpenOnSelect: true, multiSelect: true });
    const doneButtons = Array.from(container.querySelectorAll("button")).filter(
      (b) => b.textContent?.trim() === "done"
    );
    // Exactly one Done button — the one inside the multiSelect footer, not a duplicate.
    expect(doneButtons.length).toBe(1);
  });
});
