// @vitest-environment jsdom
/**
 * HighlightableProviderCard — the wrapper owning the back-navigation
 * highlight concern: per-instance highlighted-id state initialized from
 * history.state, ref wiring into ProviderCard's imperative handle, and
 * click-time navigation recording.
 *
 * Complements providerPageHighlightLogic.test.tsx (pure utils) and
 * providerCardHandle.test.tsx (imperative handle) by covering the wiring
 * between them.
 */
import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import HighlightableProviderCard from "@/app/(dashboard)/dashboard/providers/components/HighlightableProviderCard";

vi.mock("next-intl", () => ({ useTranslations: () => (k: string) => k }));
vi.mock("@/shared/components/ProviderTestSlideOver", () => ({ default: () => null }));
vi.mock("@/shared/components/ProviderIcon", () => ({ default: () => null }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: () => {} }) }));
// Deterministic anchor so the click path does not depend on next/link's router.
vi.mock("next/link", () => ({
  __esModule: true,
  default: React.forwardRef(function MockLink(
    { href, children, ...rest }: { href: string; children: React.ReactNode },
    ref: React.Ref<HTMLAnchorElement>
  ) {
    return (
      <a href={href} ref={ref} {...rest}>
        {children}
      </a>
    );
  }),
}));

// jsdom does not implement scrollIntoView or animate. Plain no-ops (not
// vi.fn()) so per-test vi.spyOn never inherits call history through
// vi.restoreAllMocks() restoring a shared mock.
if (typeof Element.prototype.scrollIntoView === "undefined") {
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    value: () => {},
    writable: true,
    configurable: true,
  });
}
if (typeof Element.prototype.animate === "undefined") {
  Object.defineProperty(Element.prototype, "animate", {
    value: () => ({ cancel: () => {}, finished: Promise.resolve() }),
    writable: true,
    configurable: true,
  });
}

function renderCards(...providerIds: string[]) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(
      <>
        {providerIds.map((id) => (
          <HighlightableProviderCard
            key={id}
            providerId={id}
            provider={{ id, name: id }}
            stats={{ total: 1, connected: 1, error: 0, warning: 0 }}
            authType="apikey"
            onToggle={() => {}}
          />
        ))}
      </>
    );
  });
  return container;
}

describe("HighlightableProviderCard", () => {
  let container: HTMLDivElement | null = null;

  afterEach(() => {
    vi.restoreAllMocks();
    window.history.replaceState(null, "");
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  });

  it("scrolls and highlights on mount when history.state.providerId matches", () => {
    window.history.replaceState({ providerId: "openai" }, "");
    const scrollSpy = vi.spyOn(Element.prototype, "scrollIntoView");
    const animateSpy = vi.spyOn(Element.prototype, "animate");

    container = renderCards("openai");

    expect(scrollSpy).toHaveBeenCalledTimes(1);
    expect(scrollSpy).toHaveBeenCalledWith({ behavior: "auto", block: "center" });
    expect(animateSpy).toHaveBeenCalled();
  });

  it("does not scroll or highlight when history.state holds a different provider id", () => {
    window.history.replaceState({ providerId: "anthropic" }, "");
    const scrollSpy = vi.spyOn(Element.prototype, "scrollIntoView");
    const animateSpy = vi.spyOn(Element.prototype, "animate");

    container = renderCards("openai");

    expect(scrollSpy).not.toHaveBeenCalled();
    expect(animateSpy).not.toHaveBeenCalled();
  });

  it("does nothing when history.state is null", () => {
    const scrollSpy = vi.spyOn(Element.prototype, "scrollIntoView");
    const animateSpy = vi.spyOn(Element.prototype, "animate");

    container = renderCards("openai");

    expect(scrollSpy).not.toHaveBeenCalled();
    expect(animateSpy).not.toHaveBeenCalled();
  });

  it("among several cards only the one matching history.state.providerId reacts", () => {
    window.history.replaceState({ providerId: "cursor" }, "");
    const scrollSpy = vi.spyOn(Element.prototype, "scrollIntoView");
    const animateSpy = vi.spyOn(Element.prototype, "animate");

    container = renderCards("openai", "cursor", "kimi-coding");

    expect(scrollSpy).toHaveBeenCalledTimes(1);
    expect(animateSpy).toHaveBeenCalledTimes(1);
  });

  it("records the clicked provider id into history.state", () => {
    const replaceSpy = vi.spyOn(window.history, "replaceState");
    container = renderCards("openai");
    const link = container.querySelector("a");
    expect(link).not.toBeNull();

    act(() => {
      link!.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });

    expect(replaceSpy).toHaveBeenCalledWith({ providerId: "openai" }, "");
  });
});
