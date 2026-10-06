// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: () => {} }) }));
vi.mock("@/shared/components/ProviderTestSlideOver", () => ({ default: () => null }));
vi.mock("@/shared/components/ProviderIcon", () => ({
  default: ({ src }: { src?: string }) => (
    <span data-provider-icon="dynamic" data-provider-icon-src={src || ""} />
  ),
}));
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element -- deterministic next/image test double
    <img data-testid="next-image" src={src} alt={alt} />
  ),
}));

const { default: ProviderCard } =
  await import("@/app/(dashboard)/dashboard/providers/components/ProviderCard");

let container: HTMLDivElement | null = null;
let root: Root | null = null;

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

function renderCard(providerId: string, provider: { apiType?: string; iconUrl?: string } = {}) {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);

  act(() => {
    root!.render(
      <ProviderCard
        providerId={providerId}
        provider={{ id: providerId, name: providerId, ...provider }}
        stats={{ total: 0, connected: 0, error: 0, warning: 0 }}
        authType="apikey"
        onToggle={() => {}}
      />
    );
  });

  return container;
}

afterEach(() => {
  if (root) {
    act(() => root!.unmount());
    root = null;
  }
  container?.remove();
  container = null;
});

describe("ProviderCard — compatible-provider generic icon", () => {
  it.each([
    ["openai-compatible-chat", "chat-completions"],
    ["openai-compatible-responses", "responses"],
    ["anthropic-compatible-chat", "anthropic"],
    ["anthropic-compatible-cc-chat", "anthropic"],
  ])("uses the bundled generic asset for %s", (providerId, apiType) => {
    const rendered = renderCard(providerId, { apiType });

    expect(rendered.querySelector('[data-testid="next-image"]')?.getAttribute("src")).toBe(
      "/providers/cli-generic.svg"
    );
    expect(rendered.querySelector('[data-provider-icon="dynamic"]')).toBeNull();
  });

  it("preserves an operator-supplied icon URL instead of replacing it with the generic asset", () => {
    const iconUrl = "https://example.com/operator-compatible.svg";
    const rendered = renderCard("openai-compatible-custom", { iconUrl });

    expect(rendered.querySelector('[data-testid="next-image"]')).toBeNull();
    expect(
      rendered
        .querySelector('[data-provider-icon="dynamic"]')
        ?.getAttribute("data-provider-icon-src")
    ).toBe(iconUrl);
  });
});
