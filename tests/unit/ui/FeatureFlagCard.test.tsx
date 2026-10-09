// @vitest-environment jsdom
// Description-mode coverage for the feature-flag cards (#12740). Adapted from the
// render-helper structure of #13189's FeatureFlagCard.test.tsx (retroamx) — that PR's
// simpler `title`-attribute hover fix was superseded by #12740's persisted clamp/full
// toggle, but the component-rendering approach is reused and extended here for the two
// display modes, localStorage persistence, and SSR/hydration safety.
import React from "react";
import { act } from "react";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// next-intl: no local mock — falls through to the real-EN-text default mock in
// tests/_setup/vitestUiPolyfills.ts, so assertions can match production copy.

const { default: FeatureFlagCard } =
  await import("@/app/(dashboard)/dashboard/settings/components/FeatureFlagCard");
const { default: FeatureFlagsGrid } =
  await import("@/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid");

type Flag = React.ComponentProps<typeof FeatureFlagCard>["flag"];

const LONG_DESCRIPTION =
  "A very long description that would normally overflow past two lines of text in the card and get visually cut off.";

function makeFlag(overrides: Partial<Flag> = {}): Flag {
  return {
    key: "SOME_FLAG",
    label: "Some Flag",
    description: LONG_DESCRIPTION,
    category: "runtime",
    type: "boolean",
    enumValues: null,
    effectiveValue: "false",
    source: "default",
    requiresRestart: false,
    ...overrides,
  };
}

const containers: HTMLElement[] = [];

function renderCard(flag: Flag, descriptionMode?: "clamp" | "full"): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  act(() => {
    root.render(
      <FeatureFlagCard
        flag={flag}
        onToggle={() => {}}
        onReset={() => {}}
        saving={false}
        descriptionMode={descriptionMode}
      />
    );
  });
  return container;
}

function flagsResponse() {
  return {
    ok: true,
    status: 200,
    json: async () => ({
      flags: [makeFlag()],
      summary: { total: 1, active: 0, inactive: 1, overriddenByDb: 0, overriddenByEnv: 0 },
    }),
    text: async () => "",
    headers: { get: () => null },
  } as unknown as Response;
}

async function settle(): Promise<void> {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    await Promise.resolve();
  });
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  window.localStorage.clear();
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.resolve(flagsResponse()))
  );
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
  window.localStorage.clear();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("FeatureFlagCard", () => {
  it("renders the flag key", () => {
    const container = renderCard(makeFlag());
    expect(container.textContent).toContain("SOME_FLAG");
  });

  it("clamp mode (default) visually clamps the description but keeps the full text reachable via the hover tooltip", () => {
    const container = renderCard(makeFlag(), "clamp");

    const clamped = container.querySelector("p.line-clamp-2");
    expect(clamped).not.toBeNull();
    expect(clamped!.textContent).toBe(LONG_DESCRIPTION);

    // The full text must also exist in the DOM (readable by assistive tech /
    // findable by tests) via the tooltip element the clamped paragraph points at.
    const describedBy = clamped!.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    const tooltip = container.querySelector(`#${describedBy}[role="tooltip"]`);
    expect(tooltip).not.toBeNull();
    expect(tooltip!.textContent).toBe(LONG_DESCRIPTION);
  });

  it("full mode always expands the description and renders no clamp/tooltip", () => {
    const container = renderCard(makeFlag(), "full");

    expect(container.querySelector("p.line-clamp-2")).toBeNull();
    expect(container.querySelector('[role="tooltip"]')).toBeNull();
    expect(container.textContent).toContain(LONG_DESCRIPTION);
  });
});

describe("FeatureFlagsGrid — description mode toggle", () => {
  it("hydrates cleanly: SSR always renders clamp mode, and a persisted 'full' preference is applied only after mount, with no React hydration-mismatch warning", async () => {
    window.localStorage.setItem("ff-card-description-mode", "full");

    // Server render never touches localStorage (it's read inside a useEffect), so the
    // SSR markup must reflect the "clamp" default regardless of what is persisted.
    const ssrHtml = renderToString(<FeatureFlagsGrid />);
    expect(ssrHtml).toContain('aria-checked="true"');
    const clampButtonMarker = /role="radio" aria-checked="true"[^>]*>On hover</;
    expect(clampButtonMarker.test(ssrHtml)).toBe(true);

    const container = document.createElement("div");
    container.innerHTML = ssrHtml;
    document.body.appendChild(container);
    containers.push(container);

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    let root: Root | undefined;
    await act(async () => {
      root = hydrateRoot(container, <FeatureFlagsGrid />);
      await Promise.resolve();
      await Promise.resolve();
    });
    await settle();

    const hydrationWarnings = errorSpy.mock.calls.filter((call) =>
      String(call[0]).toLowerCase().includes("hydrat")
    );
    expect(hydrationWarnings).toHaveLength(0);
    errorSpy.mockRestore();

    // After the post-mount effect reads localStorage, the persisted "full" mode applies.
    const fullButton = Array.from(container.querySelectorAll('button[role="radio"]')).find(
      (el) => el.textContent === "Full text"
    );
    expect(fullButton?.getAttribute("aria-checked")).toBe("true");

    act(() => root?.unmount());
  });

  it("persists the description mode to localStorage when the toggle is used", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    containers.push(container);

    const root = createRoot(container);
    await act(async () => {
      root.render(<FeatureFlagsGrid />);
    });
    await settle();

    // Default is "clamp" and is written on mount too.
    expect(window.localStorage.getItem("ff-card-description-mode")).toBe("clamp");

    const fullButton = Array.from(container.querySelectorAll('button[role="radio"]')).find(
      (el) => el.textContent === "Full text"
    ) as HTMLButtonElement;
    expect(fullButton).toBeTruthy();

    await act(async () => {
      fullButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await settle();

    expect(window.localStorage.getItem("ff-card-description-mode")).toBe("full");
    expect(fullButton.getAttribute("aria-checked")).toBe("true");

    const clampButton = Array.from(container.querySelectorAll('button[role="radio"]')).find(
      (el) => el.textContent === "On hover"
    ) as HTMLButtonElement;
    await act(async () => {
      clampButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await settle();

    expect(window.localStorage.getItem("ff-card-description-mode")).toBe("clamp");

    act(() => root.unmount());
  });
});
