// @vitest-environment jsdom
/**
 * KimiComboPresetCard — one-click "Kimi Coding" combo preset card offered on
 * the combos page (see kimiComboPreset.ts for the POST payload + why this
 * exists instead of a generic template picker).
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import KimiComboPresetCard from "@/app/(dashboard)/dashboard/combos/KimiComboPresetCard";

vi.mock("next-intl", () => ({ useTranslations: () => (k: string) => k }));

describe("KimiComboPresetCard", () => {
  let container: HTMLDivElement | null = null;

  afterEach(() => {
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  });

  function renderCard(props: {
    alreadyCreated: boolean;
    creating: boolean;
    onCreate: () => void;
  }) {
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => {
      root.render(<KimiComboPresetCard {...props} />);
    });
    return container;
  }

  it("renders the preset card with title/description/CTA when not already created", () => {
    const onCreate = vi.fn();
    const el = renderCard({ alreadyCreated: false, creating: false, onCreate });
    expect(el.textContent).toContain("kimiPresetTitle");
    expect(el.textContent).toContain("kimiPresetDescription");
    expect(el.textContent).toContain("kimiPresetCta");
    // Kimi-blue accent must be present on the card (KIMI_BRAND_COLOR = #1783FF).
    expect(el.querySelector("[class*='1783FF']")).not.toBeNull();
  });

  it("calls onCreate when the CTA button is clicked", () => {
    const onCreate = vi.fn();
    const el = renderCard({ alreadyCreated: false, creating: false, onCreate });
    const button = el.querySelector("button");
    expect(button).not.toBeNull();
    act(() => {
      button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onCreate).toHaveBeenCalledTimes(1);
  });

  it("renders nothing once the preset already exists", () => {
    const el = renderCard({ alreadyCreated: true, creating: false, onCreate: vi.fn() });
    expect(el.textContent).toBe("");
  });

  it("disables the CTA while creating", () => {
    const el = renderCard({ alreadyCreated: false, creating: true, onCreate: vi.fn() });
    const button = el.querySelector("button");
    expect(button?.hasAttribute("disabled")).toBe(true);
  });
});
