// @vitest-environment jsdom
//
// #12267 — the Allowed Combos picker keeps allowedCombos entries it cannot render
// (routing-rule names such as `rt-*`, accepted by matchesComboAccessRule()) instead
// of silently dropping them: they are shown read-only, counted, and survive the
// "All" toggle so a later "Restrict" + Save cannot persist `[]` (deny-all).
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    values && typeof values.count === "number" ? `${key}:${values.count}` : key,
}));

const { AllowedCombosSection } =
  await import("../../../src/app/(dashboard)/dashboard/api-manager/components/AllowedCombosSection");

const LOADED_COMBOS = [
  { id: "1", name: "cb-gpt-5.6-sol", models: ["a", "b"] },
  { id: "2", name: "cb-claude-opus-5", models: ["c"] },
];
const STORED_ACL = ["rt-gpt-5.6-sol", "rt-claude-opus-5", "cb-gpt-5.6-sol"];

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render(props: Partial<React.ComponentProps<typeof AllowedCombosSection>> = {}) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  const handlers = {
    onAllowAll: vi.fn(),
    onRestrict: vi.fn(),
    onToggleCombo: vi.fn(),
  };
  act(() => {
    root.render(
      <AllowedCombosSection
        allCombos={LOADED_COMBOS}
        allowAllCombos={false}
        selectedCombos={STORED_ACL}
        {...handlers}
        {...props}
      />
    );
  });
  containers.push({ root, el });
  return { el, ...handlers };
}

/** Text content without Material Symbols ligatures ("check", "lock"). */
function visibleText(node: Element): string {
  const clone = node.cloneNode(true) as Element;
  clone.querySelectorAll(".material-symbols-outlined").forEach((icon) => icon.remove());
  return clone.textContent?.trim() ?? "";
}

function buttonByText(el: HTMLElement, text: string): HTMLButtonElement {
  const button = Array.from(el.querySelectorAll("button")).find(
    (candidate) => visibleText(candidate) === text
  );
  if (!button) throw new Error(`button "${text}" not found`);
  return button;
}

function click(target: HTMLElement) {
  act(() => {
    target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

function preservedChips(el: HTMLElement): string[] {
  return Array.from(el.querySelectorAll('[data-testid="preserved-combo-rule"]')).map(
    (chip) => chip.textContent?.trim() ?? ""
  );
}

afterEach(() => {
  for (const { root, el } of containers) {
    act(() => root.unmount());
    el.remove();
  }
  containers.length = 0;
});

describe("AllowedCombosSection keeps unrenderable allowedCombos entries (#12267)", () => {
  it("shows stored rule-layer entries read-only and counts them with the rendered ones", () => {
    const { el } = render();

    expect(el.textContent).toContain("restrictedComboCount:3");
    expect(preservedChips(el)).toEqual(["rt-gpt-5.6-sol", "rt-claude-opus-5"]);
    expect(el.textContent).toContain("preservedComboRules:2");
    // The Combo entity that is stored is still rendered as a selected row.
    expect(buttonByText(el, "cb-gpt-5.6-sol2 models").className).toContain("bg-primary/10");
  });

  it("hands the rule-layer entries to onAllowAll when the All toggle clears the picker", () => {
    const { el, onAllowAll, onRestrict } = render();

    click(buttonByText(el, "all"));

    expect(onAllowAll).toHaveBeenCalledTimes(1);
    expect(onAllowAll).toHaveBeenCalledWith(["rt-gpt-5.6-sol", "rt-claude-opus-5"]);
    expect(onRestrict).not.toHaveBeenCalled();
  });

  it("hands an empty selection to onAllowAll when every entry is renderable", () => {
    const { el, onAllowAll } = render({ selectedCombos: ["cb-gpt-5.6-sol"] });

    click(buttonByText(el, "all"));

    expect(onAllowAll).toHaveBeenCalledWith([]);
  });

  it("switches back to Restrict without touching the selection", () => {
    const { el, onAllowAll, onRestrict } = render({ allowAllCombos: true });

    expect(preservedChips(el)).toEqual([]);
    expect(el.textContent).toContain("allCombosAllowed");

    click(buttonByText(el, "restrict"));

    expect(onRestrict).toHaveBeenCalledTimes(1);
    expect(onAllowAll).not.toHaveBeenCalled();
  });

  it("delegates rendered combo toggles to onToggleCombo", () => {
    const { el, onToggleCombo } = render();

    click(buttonByText(el, "cb-claude-opus-51 models"));

    expect(onToggleCombo).toHaveBeenCalledWith("cb-claude-opus-5");
  });

  it("renders nothing when no combos are loaded", () => {
    const { el } = render({ allCombos: [] });

    expect(el.innerHTML).toBe("");
  });
});
