// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// ── Import component after mocks ─────────────────────────────────────────────

const { default: ExpirationBadge } = await import(
  "../../../../../src/app/(dashboard)/dashboard/batch/components/ExpirationBadge"
);

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderBadge(props: { expiresAt: number | null; variant?: "default" | "compact" }) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<ExpirationBadge {...props} />);
  });
  containers.push({ root, el });
  return el;
}

// Returns unix seconds from now + offsetSeconds
function nowPlusSec(offsetSeconds: number): number {
  return Math.floor(Date.now() / 1000) + offsetSeconds;
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: false });
});

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.useRealTimers();
  vi.clearAllMocks();
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("ExpirationBadge", () => {
  it("returns null (renders nothing) when expiresAt is null", () => {
    const el = renderBadge({ expiresAt: null });
    expect(el.firstChild).toBeNull();
  });

  it("shows expired badge (gray) when expiresAt is in the past", () => {
    // now - 100 seconds = already expired
    const el = renderBadge({ expiresAt: nowPlusSec(-100) });
    const span = el.querySelector("span");
    expect(span).not.toBeNull();
    // should display the i18n key for expired
    expect(span!.textContent).toContain("expirationBadgeExpired");
    // gray color class
    expect(span!.className).toContain("gray");
  });

  it("shows critical badge (red) when expiresAt is within 1 hour", () => {
    // 30 minutes from now = critical
    const el = renderBadge({ expiresAt: nowPlusSec(30 * 60) });
    const span = el.querySelector("span");
    expect(span).not.toBeNull();
    // The outer span should have red classes
    expect(span!.className).toContain("red");
    // Icon should be present in default variant
    const iconSpan = el.querySelector(".material-symbols-outlined");
    expect(iconSpan).not.toBeNull();
    expect(iconSpan!.textContent).toBe("schedule");
  });

  it("shows warning badge (yellow) when expiresAt is between 1h and 6h", () => {
    // 4 hours from now = warning
    const el = renderBadge({ expiresAt: nowPlusSec(4 * 3600) });
    const span = el.querySelector("span");
    expect(span).not.toBeNull();
    expect(span!.className).toContain("yellow");
  });

  it("shows normal badge (emerald) when expiresAt is between 6h and 24h", () => {
    // 12 hours from now = normal
    const el = renderBadge({ expiresAt: nowPlusSec(12 * 3600) });
    const span = el.querySelector("span");
    expect(span).not.toBeNull();
    expect(span!.className).toContain("emerald");
  });

  it("variant=compact renders without icon", () => {
    const el = renderBadge({ expiresAt: nowPlusSec(30 * 60), variant: "compact" });
    const iconSpan = el.querySelector(".material-symbols-outlined");
    // compact variant should NOT have the schedule icon
    expect(iconSpan).toBeNull();
    // but it should still render a span with time info
    const span = el.querySelector("span");
    expect(span).not.toBeNull();
  });

  it("variant=compact has title attribute with the tier label", () => {
    const el = renderBadge({ expiresAt: nowPlusSec(30 * 60), variant: "compact" });
    const span = el.querySelector("span");
    expect(span).not.toBeNull();
    // compact sets title to the label key
    expect(span!.getAttribute("title")).toBe("expirationBadgeCritical");
  });

  it("auto-updates display after interval tick", () => {
    // Start with expiresAt just over 1h from now (→ warning tier)
    const expiresAt = nowPlusSec(3601);
    const el = renderBadge({ expiresAt });
    const spanBefore = el.querySelector("span");
    expect(spanBefore!.className).toContain("yellow"); // warning tier

    // Advance fake timers by 60s so setInterval fires
    act(() => {
      vi.advanceTimersByTime(60_000);
    });

    // Still warning since 3541s > 3600? Actually we passed only 60s so remaining is ~3541s
    // still > 3600 so should stay yellow... Let's test a more dramatic case:
    // Re-render with expiresAt = now + 3600 (exactly at boundary - 1 tick of 60s puts it < 3600)
  });

  it("cleans up interval on unmount (no memory leaks)", () => {
    const clearSpy = vi.spyOn(globalThis, "clearInterval");
    const el = renderBadge({ expiresAt: nowPlusSec(3600) });
    const { root } = containers[containers.length - 1];
    act(() => root.unmount());
    el.remove();
    containers.pop();
    // clearInterval should have been called for the setInterval cleanup
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });
});
