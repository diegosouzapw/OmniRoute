// @vitest-environment jsdom
//
// #4606: the provider-topology card was extracted into HomeProviderTopologySection
// and its activity fetch gated behind widget visibility in HomePageClient
// (`appearanceSettingsLoaded && showProviderTopologyOnHome`). This guards the
// extracted section: it renders the topology block and feeds live active-requests
// through selectActiveRequests into ProviderTopology (Rule #18 for the change).
//
// The section's outer wrapper is deliberately NO LONGER a `Card`: an opaque surface behind
// the diagram hides the page's graph-paper wallpaper, so the grouping frame is now a
// bordered but TRANSPARENT div and the wallpaper shows through the graph. The framing
// contract is asserted below (border + radius, no opaque surface class) instead of by
// looking for a Card. Recent Requests keeps its own solid Card internally, since a live
// data table needs a readable background — it is mocked here as a separate child.
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
// Both lazy children (ProviderTopology, HomeRecentRequests) come through next/dynamic.
// Distinguish them by the props each receives: only the topology gets `providers`.
vi.mock("next/dynamic", () => ({
  default: () => (props: Record<string, unknown>) =>
    props.providers !== undefined ? (
      <div
        data-testid="provider-topology"
        data-providers={String((props.providers as unknown[])?.length ?? 0)}
      />
    ) : (
      <div data-testid="recent-requests" data-enabled={String(props.enabled)} />
    ),
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

const render = (enabled?: boolean) =>
  act(() => {
    root.render(
      <HomeProviderTopologySection
        providers={[
          { id: "p1", provider: "openai", name: "OpenAI" },
          { id: "p2", provider: "anthropic", name: "Anthropic" },
        ]}
        lastProvider="openai"
        errorProvider=""
        {...(enabled === undefined ? {} : { enabled })}
      />
    );
  });

it("renders the topology block and forwards providers to ProviderTopology", () => {
  render();

  const topology = container.querySelector("[data-testid='provider-topology']");
  expect(topology).not.toBeNull();
  expect(topology?.getAttribute("data-providers")).toBe("2");
  expect(container.textContent).toContain("activeError");
  expect(container.textContent).toContain("active");
  expect(container.textContent).toContain("recent");
  expect(container.textContent).toContain("modelStatusError");
});

it("frames the section with a bordered but transparent block, not an opaque card", () => {
  render();

  // One grouping frame around header + diagram + feed…
  const frame = container.firstElementChild as HTMLElement | null;
  expect(frame).not.toBeNull();
  const frameClass = frame?.className ?? "";
  expect(frameClass).toMatch(/\bborder-2\b/);
  expect(frameClass).toMatch(/\brounded-card\b/);
  // …but no opaque fill: an opaque surface here would hide the page's graph-paper
  // wallpaper behind the graph, which is the regression this replaced.
  expect(frameClass).not.toMatch(/\bbg-(card|surface|white)\b/);
});

it("renders Recent Requests beside the diagram and passes the gate flag through", () => {
  render(false);

  const feed = container.querySelector("[data-testid='recent-requests']");
  expect(feed).not.toBeNull();
  // The feed polls on an interval, so it must receive the same visibility gate as the
  // WS subscription — otherwise a hidden widget keeps fetching.
  expect(feed?.getAttribute("data-enabled")).toBe("false");
});
