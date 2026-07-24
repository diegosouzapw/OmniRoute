// @vitest-environment jsdom
/**
 * ProviderCardHandle imperative API — highlight(), scrollIntoView(), getProviderId().
 *
 * NOTE on placement: see providerCardKimiPartnerAccent.test.tsx for rationale
 * on keeping tests in tests/unit/ui/ (both vitest configs discover it here).
 */
import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ProviderCard, {
  type ProviderCardHandle,
} from "@/app/(dashboard)/dashboard/providers/components/ProviderCard";

vi.mock("next-intl", () => ({ useTranslations: () => (k: string) => k }));
vi.mock("@/shared/components/ProviderTestSlideOver", () => ({ default: () => null }));
vi.mock("@/shared/components/ProviderIcon", () => ({ default: () => null }));

// jsdom does not implement scrollIntoView or animate
if (typeof Element.prototype.scrollIntoView === "undefined") {
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    value: vi.fn(),
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

describe("ProviderCardHandle imperative API", () => {
  let container: HTMLDivElement | null = null;
  let handle: ProviderCardHandle | null = null;

  afterEach(() => {
    handle = null;
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  });

  const PROVIDER_ID = "openai";
  const PROVIDER_NAME = "OpenAI";

  function renderAndCapture() {
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => {
      root.render(
        <ProviderCard
          ref={(h) => {
            handle = h;
          }}
          providerId={PROVIDER_ID}
          provider={{ id: PROVIDER_ID, name: PROVIDER_NAME }}
          stats={{ total: 1, connected: 1, error: 0, warning: 0 }}
          authType="apikey"
          onToggle={() => {}}
        />
      );
    });
  }

  it("getProviderId returns the providerId passed as a prop", () => {
    renderAndCapture();
    expect(handle).not.toBeNull();
    expect(handle!.getProviderId()).toBe(PROVIDER_ID);
  });

  it("scrollIntoView calls Element.scrollIntoView on the wrapper div", () => {
    renderAndCapture();
    const spy = vi.spyOn(Element.prototype, "scrollIntoView");
    act(() => {
      handle!.scrollIntoView();
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ behavior: "auto", block: "center" });
    spy.mockRestore();
  });

  it("highlight calls animate on the Card surface", () => {
    renderAndCapture();
    const spy = vi.spyOn(Element.prototype, "animate");
    act(() => {
      handle!.highlight();
    });
    expect(spy).toHaveBeenCalledTimes(1);
    const keyframes = spy.mock.calls[0][0] as Keyframe[];
    expect(keyframes).toHaveLength(3);
    expect((keyframes[0] as Record<string, string>).backgroundColor).toBe("rgba(59,130,246,0.22)");
    expect((keyframes[2] as Record<string, string>).backgroundColor).toBe("transparent");
    spy.mockRestore();
  });

  it("highlight focuses the link element", () => {
    renderAndCapture();
    const focusSpy = vi.fn();
    const link = container!.querySelector("a");
    if (link) link.focus = focusSpy;
    act(() => {
      handle!.highlight();
    });
    expect(focusSpy).toHaveBeenCalledTimes(1);
  });

  it("getProviderId returns the correct id for a different provider", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    let h: ProviderCardHandle | null = null;
    act(() => {
      root.render(
        <ProviderCard
          ref={(n) => {
            h = n;
          }}
          providerId="kimi-coding"
          provider={{ id: "kimi-coding", name: "Kimi Code CLI" }}
          stats={{ total: 0, connected: 0, error: 0, warning: 0 }}
          authType="oauth"
          onToggle={() => {}}
        />
      );
    });
    expect(h!.getProviderId()).toBe("kimi-coding");
  });
});
