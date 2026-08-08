// @vitest-environment jsdom
/**
 * ProviderPageHeader — conditional "Get API key" link rendered from the
 * existing `notice.apiKeyUrl` / `notice.signupUrl` catalog fields (#9270).
 *
 * Covers four scenarios:
 * - apiKeyUrl is set → link is rendered pointing to it
 * - only signupUrl is set → link falls back to signupUrl
 * - neither is set → no link (backward compatible)
 * - link attributes: href, target, rel, visible text
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import ProviderPageHeader from "@/app/(dashboard)/dashboard/providers/[id]/components/ProviderPageHeader";

const t = (key: string) => key;

const BASE_PROPS = {
  providerId: "test-provider",
  providerInfo: {
    id: "test-provider",
    name: "Test Provider",
    color: "#1783FF",
  },
  connectionsCount: 0,
  isOpenAICompatible: false,
  isAnthropicProtocolCompatible: false,
  onOpenTutorial: () => {},
  t,
};

describe("ProviderPageHeader — Get API key link", () => {
  let container: HTMLDivElement | null = null;

  afterEach(() => {
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  });

  function renderHeader(overrides: Record<string, unknown> = {}) {
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => {
      root.render(
        <ProviderPageHeader
          {...BASE_PROPS}
          {...overrides}
          providerInfo={{ ...BASE_PROPS.providerInfo, ...(overrides.providerInfo as Record<string, unknown> || {}) }}
        />
      );
    });
    return container;
  }

  it("renders a 'Get API key' link when notice.apiKeyUrl is set", () => {
    const el = renderHeader({
      providerInfo: {
        ...BASE_PROPS.providerInfo,
        notice: { apiKeyUrl: "https://example.com/api-keys" },
      },
    });
    const link = el.querySelector('a[href="https://example.com/api-keys"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
    expect(el.textContent).toContain("getApiKey");
  });

  it("renders a link via signupUrl when apiKeyUrl is absent", () => {
    const el = renderHeader({
      providerInfo: {
        ...BASE_PROPS.providerInfo,
        notice: { signupUrl: "https://example.com/signup" },
      },
    });
    const link = el.querySelector('a[href="https://example.com/signup"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("renders NO link when neither apiKeyUrl nor signupUrl is set", () => {
    const el = renderHeader();
    expect(el.querySelector("a[href]")).not.toBeNull(); // Back link is present
    // The notice link uses open_in_new icon — assert the notice anchor is absent
    // by checking no link with target="_blank" (other than the website header link
    // which isn't rendered because website is not set in this test)
    const externalLinks = el.querySelectorAll('a[target="_blank"]');
    expect(externalLinks.length).toBe(0);
  });

  it("renders NO link when notice field is entirely absent", () => {
    const el = renderHeader({
      providerInfo: {
        ...BASE_PROPS.providerInfo,
        notice: undefined,
      },
    });
    const externalLinks = el.querySelectorAll('a[target="_blank"]');
    expect(externalLinks.length).toBe(0);
  });

  it("prefers apiKeyUrl over signupUrl when both are set", () => {
    const el = renderHeader({
      providerInfo: {
        ...BASE_PROPS.providerInfo,
        notice: {
          apiKeyUrl: "https://example.com/api-keys",
          signupUrl: "https://example.com/signup",
        },
      },
    });
    // Should link to apiKeyUrl, not signupUrl
    expect(el.querySelector('a[href="https://example.com/api-keys"]')).not.toBeNull();
    expect(el.querySelector('a[href="https://example.com/signup"]')).toBeNull();
  });
});
