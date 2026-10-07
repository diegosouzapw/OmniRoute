// @vitest-environment jsdom
/**
 * VscodeCopilotBanner — dismissible home-page banner announcing the OmniCopilot
 * VS Code extension. No version gate (durable feature announcement), mirrors
 * KimiSponsorBanner's render/dismiss/persistence contract (see
 * tests/unit/ui/kimiSponsorBanner.test.tsx).
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const STORAGE_KEY = "omniroute-vscode-copilot-banner-dismissed-v1";
const MARKETPLACE_URL =
  "https://marketplace.visualstudio.com/items?itemName=diegosouzapw.omnicopilot";

vi.mock("next-intl", () => ({ useTranslations: () => (k: string) => k }));

async function renderBanner(): Promise<HTMLDivElement> {
  const { default: VscodeCopilotBanner } =
    await import("../../../src/app/(dashboard)/dashboard/VscodeCopilotBanner");

  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(<VscodeCopilotBanner />);
  });
  return container;
}

describe("VscodeCopilotBanner", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    localStorage.removeItem(STORAGE_KEY);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    localStorage.removeItem(STORAGE_KEY);
  });

  it("renders with the CTA pointing at the VS Code Marketplace listing", async () => {
    const container = await renderBanner();
    expect(container.querySelector("[role='complementary']")).not.toBeNull();
    expect(container.textContent).toContain("title");
    expect(container.textContent).toContain("cta");
    const link = container.querySelector("a[href]");
    expect(link).not.toBeNull();
    expect(link?.getAttribute("href")).toBe(MARKETPLACE_URL);
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toContain("noopener");
  });

  it("shows the Open VSX secondary note near the CTA", async () => {
    const container = await renderBanner();
    expect(container.textContent).toContain("secondaryNote");
  });

  it("dismiss button hides the banner and persists the dismissal to localStorage", async () => {
    const container = await renderBanner();
    expect(container.querySelector("[role='complementary']")).not.toBeNull();

    const dismissButton = container.querySelector("button");
    expect(dismissButton).not.toBeNull();
    act(() => {
      dismissButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.querySelector("[role='complementary']")).toBeNull();
    expect(localStorage.getItem(STORAGE_KEY)).toBe("true");
  });

  it("stays hidden across a fresh render once dismissed (localStorage persistence)", async () => {
    localStorage.setItem(STORAGE_KEY, "true");
    const container = await renderBanner();
    expect(container.querySelector("[role='complementary']")).toBeNull();
  });
});
