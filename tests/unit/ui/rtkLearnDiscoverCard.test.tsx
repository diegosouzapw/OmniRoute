// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Passthrough i18n: t(key) → key, t(key, params) → "key:{json}" so assertions can read params.
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) =>
    params ? `${key}:${JSON.stringify(params)}` : key,
}));

const { default: RtkLearnDiscoverCard } =
  await import("@/app/(dashboard)/dashboard/context/rtk/RtkLearnDiscoverCard");

const containers: HTMLElement[] = [];
function mount(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  act(() => {
    createRoot(container).render(ui);
  });
  return container;
}
async function click(el: Element | null) {
  await act(async () => {
    (el as HTMLElement).click();
  });
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});
afterEach(() => {
  while (containers.length) containers.pop()?.remove();
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("RtkLearnDiscoverCard", () => {
  it("renders the discover + learn controls", () => {
    const c = mount(<RtkLearnDiscoverCard />);
    expect(c.querySelector("[data-testid='rtk-learn-discover']")).toBeTruthy();
    expect(c.querySelector("[data-testid='rtk-discover-button']")).toBeTruthy();
    expect(c.querySelector("[data-testid='rtk-learn-command']")).toBeTruthy();
  });

  it("discover: fetches /discover and renders ranked candidates", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({
              sampleCount: 3,
              candidates: [{ pattern: "Resolving deps", hits: 3 }],
            }),
            { status: 200, headers: { "content-type": "application/json" } }
          )
      )
    );
    const c = mount(<RtkLearnDiscoverCard />);
    await click(c.querySelector("[data-testid='rtk-discover-button']"));
    expect(fetch).toHaveBeenCalledWith("/api/context/rtk/discover");
    const results = c.querySelector("[data-testid='rtk-discover-results']");
    expect(results?.textContent).toContain("Resolving deps");
    expect(results?.textContent).toContain("discoverSamples"); // i18n key rendered with params
  });

  it("learn: requires a command, then fetches /learn?command= and shows the suggested filter", async () => {
    const fetchMock = vi.fn(
      async () =>
        new Response(
          JSON.stringify({
            sampleCount: 2,
            filter: { id: "suggested-npm-install", label: "npm install" },
          }),
          { status: 200, headers: { "content-type": "application/json" } }
        )
    );
    vi.stubGlobal("fetch", fetchMock);
    const c = mount(<RtkLearnDiscoverCard />);

    const input = c.querySelector("[data-testid='rtk-learn-command']") as HTMLInputElement;
    await act(async () => {
      // Set value via the native setter so React's onChange fires.
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )!.set!;
      setter.call(input, "npm install");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await click(c.querySelector("[data-testid='rtk-learn-button']"));

    expect(fetchMock).toHaveBeenCalledWith("/api/context/rtk/learn?command=npm%20install");
    const results = c.querySelector("[data-testid='rtk-learn-results']");
    expect(results?.textContent).toContain("suggested-npm-install");
  });

  it("shows a fail-soft error when discover fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("nope", { status: 500 }))
    );
    const c = mount(<RtkLearnDiscoverCard />);
    await click(c.querySelector("[data-testid='rtk-discover-button']"));
    expect(c.querySelector("[data-testid='rtk-ld-error']")).toBeTruthy();
  });
});
