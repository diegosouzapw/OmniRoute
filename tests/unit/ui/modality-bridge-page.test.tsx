// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ModalityBridgePage from "@/app/(dashboard)/dashboard/settings/modality-bridge/page";
import SettingsPage from "@/app/(dashboard)/dashboard/settings/page";
import {
  getSectionItems,
  SIDEBAR_PRESETS,
  SIDEBAR_SECTIONS,
} from "@/shared/constants/sidebarVisibility";

const navigation = vi.hoisted(() => ({
  search: "",
  replace: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: navigation.replace }),
  useSearchParams: () => new URLSearchParams(navigation.search),
  usePathname: () => "/dashboard/settings/modality-bridge",
  redirect: navigation.redirect,
}));

vi.mock("next-intl", () => ({
  useTranslations: () => Object.assign((key: string) => key, { has: () => true }),
}));

vi.mock(
  "@/app/(dashboard)/dashboard/settings/components/modalityBridge/ModalityBridgeVisionTab",
  () => ({ default: () => <div data-testid="vision-tab">vision</div> })
);

const roots: Array<{ root: Root; el: HTMLDivElement }> = [];

function renderPage(): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => root.render(<ModalityBridgePage />));
  roots.push({ root, el });
  return el;
}

describe("Modality Bridge settings page", () => {
  beforeEach(() => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    navigation.search = "";
    navigation.replace.mockReset();
    navigation.redirect.mockReset();
  });

  afterEach(() => {
    for (const { root, el } of roots.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
  });

  it("renders the audio deep-link with all three modality tabs", () => {
    navigation.search = "tab=audio";
    const el = renderPage();
    expect(el.querySelectorAll('[role="tab"]')).toHaveLength(3);
    expect(el.textContent).toContain("modalityBridgeAudioComingSoon");
    expect(el.querySelector('[role="tab"][aria-selected="true"]')?.textContent).toContain(
      "modalityBridgeAudioTab"
    );
  });

  it("defaults invalid or missing tab values to Vision", () => {
    navigation.search = "tab=unsupported";
    const el = renderPage();
    expect(el.querySelector('[data-testid="vision-tab"]')).toBeTruthy();
  });

  it("updates the URL without scrolling when an operator changes tabs", () => {
    navigation.search = "tab=vision&source=sidebar";
    const el = renderPage();
    const videoTab = Array.from(el.querySelectorAll('[role="tab"]')).find((button) =>
      button.textContent?.includes("modalityBridgeVideoTab")
    ) as HTMLButtonElement | undefined;
    act(() => videoTab?.click());
    expect(navigation.replace).toHaveBeenCalledWith(
      "/dashboard/settings/modality-bridge?tab=video&source=sidebar",
      { scroll: false }
    );
  });

  it("redirects both legacy tab spellings to the dedicated page", async () => {
    await SettingsPage({ searchParams: Promise.resolve({ tab: "modality-bridge" }) });
    await SettingsPage({ searchParams: Promise.resolve({ tab: "modalityBridge" }) });
    expect(navigation.redirect).toHaveBeenNthCalledWith(1, "/dashboard/settings/modality-bridge");
    expect(navigation.redirect).toHaveBeenNthCalledWith(2, "/dashboard/settings/modality-bridge");
  });

  it("registers the sidebar item and exposes it in developer/admin presets", () => {
    const section = SIDEBAR_SECTIONS.find((candidate) => candidate.id === "configuration");
    expect(section).toBeTruthy();
    const item = section
      ? getSectionItems(section).find((candidate) => candidate.id === "settings-modality-bridge")
      : undefined;
    expect(item).toMatchObject({
      href: "/dashboard/settings/modality-bridge",
      i18nKey: "settingsModalityBridge",
      subtitleKey: "settingsModalityBridgeSubtitle",
      icon: "image_search",
    });

    for (const presetId of ["developer", "admin"] as const) {
      const preset = SIDEBAR_PRESETS.find((candidate) => candidate.id === presetId);
      expect(preset?.hiddenItems).not.toContain("settings-modality-bridge");
    }
  });
});
