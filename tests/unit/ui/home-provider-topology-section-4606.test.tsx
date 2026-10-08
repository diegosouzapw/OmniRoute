// @vitest-environment jsdom
//
// #4606: the provider-topology card was extracted into HomeProviderTopologySection
// and its activity fetch gated behind widget visibility in HomePageClient
// (`appearanceSettingsLoaded && showProviderTopologyOnHome`). This guards the
// extracted section: it renders the topology card and feeds live active-requests
// through selectActiveRequests into ProviderTopology (Rule #18 for the change).
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

// Use the shared next-intl test adapter backed by the real English messages.
// The contract is the visible legend, not the internal translation key names.
vi.mock("next/dynamic", () => ({
  default: () => (props: Record<string, unknown>) => (
    <div
      data-testid="provider-topology"
      data-providers={String((props.providers as unknown[])?.length ?? 0)}
    />
  ),
}));
vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div data-testid="card">{children}</div>,
}));
const liveRequestsMock = vi.fn(() => ({ activeRequests: [] as unknown[] }));
vi.mock("@/hooks/useLiveDashboard", () => ({
  useLiveRequests: () => liveRequestsMock(),
}));

const { HomeProviderTopologySection } =
  await import("../../../src/app/(dashboard)/dashboard/HomeProviderTopologySection");

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.clearAllMocks();
});

it("renders the topology card and forwards providers to ProviderTopology", () => {
  act(() => {
    root.render(
      <HomeProviderTopologySection
        providers={[
          { id: "p1", provider: "openai", name: "OpenAI" },
          { id: "p2", provider: "anthropic", name: "Anthropic" },
        ]}
        lastProvider="openai"
        errorProvider=""
      />
    );
  });

  expect(container.querySelector("[data-testid='card']")).not.toBeNull();
  const topology = container.querySelector("[data-testid='provider-topology']");
  expect(topology).not.toBeNull();
  expect(topology?.getAttribute("data-providers")).toBe("2");
  expect(container.querySelector("h2")?.textContent).toBe("Provider Topology");
  expect(container.querySelector("p")?.textContent).toBe("0 active · 0 error");
  const legend = Array.from(container.querySelectorAll("span"))
    .map((element) => element.textContent)
    .filter(Boolean);
  expect(legend).toEqual(["Active", "Recent", "Error"]);
});
