// @vitest-environment jsdom
/**
 * KimiSponsorBanner (2026-07 partnership) — render gate (version window +
 * localStorage dismissal), CTA aff link, and discreet partner-link note.
 * See src/app/(dashboard)/dashboard/kimiSponsorBannerGate.ts for the version-gate
 * pure logic (covered separately by tests/unit/kimi-sponsor-banner-version-gate.test.ts).
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const STORAGE_KEY = "omniroute-kimi-sponsor-banner-dismissed-v1";
const KIMI_CODING_AFF_URL = "https://www.kimi.com/code?aff=omniroute";

vi.mock("next-intl", () => ({ useTranslations: () => (k: string) => k }));
vi.mock("@/shared/components/ProviderIcon", () => ({ default: () => null }));

async function renderBanner(version: string): Promise<HTMLDivElement> {
  vi.resetModules();
  vi.doMock("@/shared/constants/appConfig", () => ({
    APP_CONFIG: { name: "OmniRoute", description: "AI Gateway", version },
  }));
  const { default: KimiSponsorBanner } = await import(
    "../../../src/app/(dashboard)/dashboard/KimiSponsorBanner"
  );

  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(<KimiSponsorBanner />);
  });
  return container;
}

describe("KimiSponsorBanner", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    localStorage.removeItem(STORAGE_KEY);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    localStorage.removeItem(STORAGE_KEY);
    vi.doUnmock("@/shared/constants/appConfig");
  });

  it("renders with the CTA pointing at the Kimi Coding aff link inside the version window", async () => {
    const container = await renderBanner("3.8.49");
    expect(container.textContent).toContain("title");
    expect(container.textContent).toContain("cta");
    const link = container.querySelector("a[href]");
    expect(link).not.toBeNull();
    expect(link?.getAttribute("href")).toBe(KIMI_CODING_AFF_URL);
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toContain("noopener");
  });

  it("shows the discreet partner-link note near the CTA", async () => {
    const container = await renderBanner("3.8.49");
    // "partnerLinkNote" is the (mocked) translation key rendered as text, and
    // also set as the CTA anchor's title attribute.
    expect(container.textContent).toContain("partnerLinkNote");
    const link = container.querySelector("a[href]");
    expect(link?.getAttribute("title")).toBe("partnerLinkNote");
  });

  it("renders at the inclusive upper bound of the version window (v3.8.60)", async () => {
    const container = await renderBanner("3.8.60");
    expect(container.querySelector("a[href]")).not.toBeNull();
  });

  it("does not render past the sunset version (v3.8.61)", async () => {
    const container = await renderBanner("3.8.61");
    expect(container.querySelector("[role='complementary']")).toBeNull();
    expect(container.textContent).toBe("");
  });

  it("dismiss button hides the banner and persists the dismissal to localStorage", async () => {
    const container = await renderBanner("3.8.49");
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
    const container = await renderBanner("3.8.49");
    expect(container.querySelector("[role='complementary']")).toBeNull();
  });
});
