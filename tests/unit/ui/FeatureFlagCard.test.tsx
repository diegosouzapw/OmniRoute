// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

// next-intl: no local mock — falls through to the real-EN-text default mock in
// tests/_setup/vitestUiPolyfills.ts.

// ── Import after mocks ────────────────────────────────────────────────────────

const { default: FeatureFlagCard } =
  await import("@/app/(dashboard)/dashboard/settings/components/FeatureFlagCard");

type Flag = React.ComponentProps<typeof FeatureFlagCard>["flag"];

// ── Fixtures ──────────────────────────────────────────────────────────────────

function makeFlag(overrides: Partial<Flag> = {}): Flag {
  return {
    key: "SOME_FLAG",
    label: "Some Flag",
    description:
      "A very long description that would normally overflow past two lines of text in the card and get visually cut off.",
    category: "runtime",
    type: "boolean",
    enumValues: null,
    effectiveValue: "false",
    source: "default",
    requiresRestart: false,
    ...overrides,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];

function renderCard(flag: Flag): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  act(() => {
    root.render(
      <FeatureFlagCard flag={flag} onToggle={() => {}} onReset={() => {}} saving={false} />
    );
  });
  return container;
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("FeatureFlagCard", () => {
  it("renders the flag key", () => {
    const container = renderCard(makeFlag());
    expect(container.textContent).toContain("SOME_FLAG");
  });

  it("exposes the full description as a title attribute so a clamped description stays readable on hover", () => {
    const description =
      "A very long description that would normally overflow past two lines of text in the card and get visually cut off.";
    const container = renderCard(makeFlag({ description }));
    const descriptionEl = container.querySelector("p[title]");
    expect(descriptionEl).not.toBeNull();
    expect(descriptionEl!.getAttribute("title")).toBe(description);
    expect(descriptionEl!.textContent).toBe(description);
  });
});
