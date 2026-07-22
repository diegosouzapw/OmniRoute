// @vitest-environment jsdom
/**
 * Kimi (Moonshot AI) official-partnership card accent (2026-07). Presentation
 * only — see src/app/(dashboard)/dashboard/providers/featuredProviders.ts.
 *
 * NOTE on placement: this mirrors the sibling
 * src/app/(dashboard)/dashboard/providers/components/__tests__/providerCardAudioBadge.test.tsx
 * in every way EXCEPT location. That co-located `__tests__/` pattern is not
 * actually picked up by either blocking vitest script today:
 *  - vitest.mcp.config.ts's "src/app/(dashboard)/**\/__tests__/**\/*.test.tsx"
 *    glob never matches anything (unescaped parens in tinyglobby — verified:
 *    `glob(["src/app/(dashboard)/**\/__tests__/**\/*.test.tsx"])` returns []).
 *  - test:vitest:ui runs `vitest run --config vitest.config.ts tests/unit/ui`,
 *    and that positional path filter excludes anything outside tests/unit/ui.
 * Living under tests/unit/ui/ guarantees this file is discovered by both
 * vitest.config.ts's own "tests/unit/**\/*.test.tsx" include entry AND the
 * test:vitest:ui CLI filter, so it actually runs in the blocking `test-vitest`
 * CI job (see .github/workflows/ci.yml).
 */
import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ProviderCard from "@/app/(dashboard)/dashboard/providers/components/ProviderCard";

vi.mock("next-intl", () => ({ useTranslations: () => (k: string) => k }));
vi.mock("@/shared/components/ProviderTestSlideOver", () => ({ default: () => null }));
vi.mock("@/shared/components/ProviderIcon", () => ({ default: () => null }));

describe("ProviderCard — Kimi (Moonshot AI) official-supporter accent", () => {
  let container: HTMLDivElement | null = null;

  afterEach(() => {
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  });

  function renderCard(providerId: string, name: string) {
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => {
      root.render(
        <ProviderCard
          providerId={providerId}
          provider={{ id: providerId, name }}
          stats={{ total: 1, connected: 1, error: 0, warning: 0 }}
          authType="apikey"
          onToggle={() => {}}
        />
      );
    });
    return container;
  }

  it("renders the Official Supporter badge + Kimi-blue accent for kimi-coding", () => {
    const el = renderCard("kimi-coding", "Kimi Code CLI");
    // The next-intl mock returns the key itself; the providerText() helper falls
    // back to the English default only when t.has is undefined (as it is here),
    // so the rendered text is the hardcoded English fallback.
    expect(el.textContent).toContain("Official Supporter");

    // The card's own accent border/glow (KIMI_BRAND_COLOR = #1783FF) must be
    // present on some element in the tree — both the outer Card border classes
    // and the badge chip carry it.
    const accented = el.querySelector("[class*='1783FF']");
    expect(accented).not.toBeNull();
  });

  it("renders the Official Supporter badge for kimi-web and moonshot too", () => {
    const kimiWebEl = renderCard("kimi-web", "Kimi Web");
    expect(kimiWebEl.textContent).toContain("Official Supporter");

    const moonshotEl = renderCard("moonshot", "Kimi");
    expect(moonshotEl.textContent).toContain("Official Supporter");
  });

  it("does NOT render the Kimi badge or accent for an unrelated provider", () => {
    const el = renderCard("openai", "OpenAI");
    expect(el.textContent).not.toContain("Official Supporter");
    expect(el.querySelector("[class*='1783FF']")).toBeNull();
  });

  it("does NOT render the Kimi badge for the hidden kimi-coding-apikey alias id", () => {
    // kimi-coding-apikey is hiddenFromDashboard (folds into the kimi-coding card),
    // but featuredProviders.ts still lists it — verifying the card component
    // itself would still flag it correctly if it were ever rendered directly.
    const el = renderCard("kimi-coding-apikey", "Kimi Code API Key");
    expect(el.textContent).toContain("Official Supporter");
  });
});
