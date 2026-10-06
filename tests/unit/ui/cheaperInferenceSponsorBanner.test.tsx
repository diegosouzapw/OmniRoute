// @vitest-environment jsdom
/**
 * CheaperInferenceSponsorBanner — render gate (localStorage dismissal), CTA
 * pointing at the real cheaperinference.com destination, and discreet
 * partner-link note. Mirrors kimiSponsorBanner.test.tsx, minus the version gate
 * (this banner is a durable partnership, not a time-boxed offer).
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const STORAGE_KEY = "omniroute-cheaperinference-sponsor-banner-dismissed-v1";
const DISMISS_EVENT = "omniroute:cheaperinference-sponsor-banner-dismissed";
const CTA_URL = "https://cheaperinference.com/?utm_source=omniroute";

vi.mock("next-intl", () => ({ useTranslations: () => (k: string) => k }));
vi.mock("@/shared/components/ProviderIcon", () => ({ default: () => null }));

async function renderBanner(): Promise<HTMLDivElement> {
  vi.resetModules();
  const { default: CheaperInferenceSponsorBanner } =
    await import("../../../src/app/(dashboard)/dashboard/CheaperInferenceSponsorBanner");

  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(<CheaperInferenceSponsorBanner />);
  });
  return container;
}

describe("CheaperInferenceSponsorBanner", () => {
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

  it("renders with the CTA pointing at the branded short link", async () => {
    const container = await renderBanner();
    expect(container.textContent).toContain("title");
    expect(container.textContent).toContain("cta");
    const link = container.querySelector("a[href]");
    expect(link).not.toBeNull();
    expect(link?.getAttribute("href")).toBe(CTA_URL);
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toContain("noopener");
  });

  it("shows the discreet partner-link note near the CTA", async () => {
    const container = await renderBanner();
    expect(container.textContent).toContain("partnerLinkNote");
    const link = container.querySelector("a[href]");
    expect(link?.getAttribute("title")).toBe("partnerLinkNote");
  });

  it("hides after dismissal and stays hidden on re-render", async () => {
    const first = await renderBanner();
    const button = first.querySelector("button");
    expect(button).not.toBeNull();
    act(() => {
      button?.click();
    });
    expect(localStorage.getItem(STORAGE_KEY)).toBe("true");
    expect(first.textContent).not.toContain("title");

    // a fresh render (simulating a later visit) stays hidden
    const second = await renderBanner();
    expect(second.textContent).not.toContain("title");
  });

  it("re-renders visible again only after the key is cleared", async () => {
    const first = await renderBanner();
    const button = first.querySelector("button");
    act(() => {
      button?.click();
    });
    expect(localStorage.getItem(STORAGE_KEY)).toBe("true");

    localStorage.removeItem(STORAGE_KEY);
    const second = await renderBanner();
    expect(second.textContent).toContain("title");
  });
});
