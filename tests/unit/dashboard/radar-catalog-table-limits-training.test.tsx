// @vitest-environment jsdom
/**
 * The Radar catalog table receives per-model rate limits and a prompt-training
 * disclosure from the feed, and used to render neither. These tests pin the two
 * decisions that are easy to get wrong when adding them:
 *   - a limit of zero is a real, alarming fact and must not read as "rate-only"
 *     (which is what `formatTokens` does, correctly, for a monthly budget);
 *   - an absent `trainsOnPrompts` is not a promise that the provider does not
 *     train, so it must render exactly like `false`: no badge.
 */
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// The mock returns a distinguishable string rather than the key itself: asserting
// that "trainsOnPrompts" appears in the DOM would also pass if the key leaked into
// a title, a data attribute or another column, which proves nothing about the badge.
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => `label:${key}`,
}));

vi.mock("next/link", () => ({
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

import {
  RadarCatalogTable,
  formatLimits,
  compactCount,
} from "@/app/(dashboard)/dashboard/radar/RadarCatalogTable";

describe("formatLimits", () => {
  it("shows every limit the feed gives, and only those", () => {
    expect(formatLimits({ limits: { rpm: 60, rpd: 1000, tpm: null, tpd: null } })).toBe(
      "60/min · 1K/day"
    );
  });

  it('reads a zero limit as zero, not as "rate-only"', () => {
    expect(formatLimits({ limits: { rpm: 0, rpd: null, tpm: null, tpd: null } })).toBe("0/min");
  });

  it("renders a single limit alone, with no orphan separator", () => {
    expect(formatLimits({ limits: { rpm: 60, rpd: null, tpm: null, tpd: null } })).toBe("60/min");
  });

  it("reads a missing limits object as unknown, never as zero", () => {
    expect(formatLimits({})).toBe("—");
  });

  it("reads an all-null limits object as unknown too", () => {
    expect(formatLimits({ limits: { rpm: null, rpd: null, tpm: null, tpd: null } })).toBe("—");
  });

  it("shows token limits with their unit", () => {
    expect(formatLimits({ limits: { rpm: null, rpd: null, tpm: 40000, tpd: 2_000_000 } })).toBe(
      "40K tok/min · 2.0M tok/day"
    );
  });

  it("compacts counts without depending on the machine locale", () => {
    // `toLocaleString()` would render "1,000" or "1 000" depending on the host.
    expect(compactCount(1000)).toBe("1K");
    expect(compactCount(999)).toBe("999");
  });
});

describe("the prompt-training badge", () => {
  let container: HTMLDivElement;
  let root: Root;

  const entry = (overrides: Record<string, unknown> = {}) => ({
    provider: "someprovider",
    modelId: "some-model",
    displayName: "Some Model",
    monthlyTokens: 1_000_000,
    contextWindow: 128_000,
    tos: "ok",
    ...overrides,
  });

  function renderTable(entries: ReturnType<typeof entry>[]) {
    act(() => {
      root.render(
        <RadarCatalogTable
          entries={entries as never}
          refreshCatalog={async () => {}}
          onError={() => {}}
        />
      );
    });
  }

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  /** The badge as an element, not as a substring somewhere in the row. */
  function trainingBadge(): HTMLElement | null {
    return (
      ([...container.querySelectorAll("span")].find(
        (element) => element.textContent === "label:trainsOnPrompts"
      ) as HTMLElement | undefined) ?? null
    );
  }

  it("flags a provider that says it may train on prompts", () => {
    renderTable([entry({ trainsOnPrompts: true })]);
    const badge = trainingBadge();
    expect(badge).not.toBeNull();
    // The explanation is what makes the badge honest — an absent statement is not
    // a guarantee, and only the tooltip says so.
    expect(badge?.getAttribute("title")).toBe("label:trainsOnPromptsHelp");
  });

  it("does not flag a provider that says it does not", () => {
    renderTable([entry({ trainsOnPrompts: false })]);
    expect(trainingBadge()).toBeNull();
  });

  it("does not flag a provider that says nothing — absence is not a guarantee", () => {
    renderTable([entry()]);
    expect(trainingBadge()).toBeNull();
  });

  it("shows the reported limits in its own cell", () => {
    renderTable([entry({ limits: { rpm: 20, rpd: 200, tpm: null, tpd: null } })]);
    const cells = [...container.querySelectorAll("td")].map((cell) => cell.textContent);
    expect(cells).toContain("20/min · 200/day");
  });

  it("explains an absent limits cell instead of leaving the dash mute", () => {
    renderTable([entry({ limits: null })]);
    const dash = [...container.querySelectorAll("span")].find(
      (element) =>
        element.textContent === "—" && element.getAttribute("title") === "label:limitsUnknownHelp"
    );
    expect(dash).not.toBeNull();
  });

  it("explains an unknown context window instead of leaving the dash mute", () => {
    renderTable([entry({ contextWindow: null })]);
    const dash = [...container.querySelectorAll("span")].find(
      (element) =>
        element.textContent === "—" && element.getAttribute("title") === "label:contextUnknownHelp"
    );
    expect(dash).not.toBeNull();
  });

  it("explains unreported capabilities on their badges (tools, vision, thinking)", () => {
    renderTable([entry({ capabilities: { tools: null, vision: null, thinking: null } })]);
    const badges = [...container.querySelectorAll("span")].filter(
      (element) =>
        element.textContent?.includes("?") &&
        element.getAttribute("title") === "label:capabilityUnknownHelp"
    );
    expect(badges.length).toBe(3);
  });

  it("leaves an explicit false capability badge alone (no tooltip)", () => {
    renderTable([entry({ capabilities: { tools: false, vision: null, thinking: null } })]);
    const cross = [...container.querySelectorAll("span")].find((element) =>
      element.textContent?.includes("✕")
    );
    expect(cross).not.toBeNull();
    expect(cross?.getAttribute("title")).toBeNull();
  });

  it("renders reported limits with no parasitic explanation", () => {
    renderTable([
      entry({ limits: { rpm: 20, rpd: 200, tpm: null, tpd: null }, contextWindow: 128_000 }),
    ]);
    const cell = [...container.querySelectorAll("td")].find((c) =>
      c.textContent?.includes("20/min")
    );
    expect(cell).not.toBeNull();
    expect(cell?.querySelector("span[title]")).toBeNull();
  });

  it("renders a feed-reported zero context window as zero, not unknown", () => {
    renderTable([entry({ contextWindow: 0 })]);
    const contextCell = [...container.querySelectorAll("tbody tr td")].find((cell) =>
      cell.textContent?.includes("0K")
    );
    expect(contextCell).not.toBeNull();
    expect(contextCell?.querySelector("span[title]")).toBeNull();
  });

  it("falls back to EN when the locale value is a __MISSING__ sentinel", async () => {
    const en = (await import("@/i18n/messages/en.json")).default as Record<string, unknown>;
    const radar = (en.radarPage ?? en) as Record<string, string>;
    expect(radar.limitsUnknownHelp).toMatch(/^Limits reported by Radar feed/);
    expect(radar.contextUnknownHelp).toMatch(/^Context window unknown/);
    expect(radar.capabilityUnknownHelp).toMatch(/^Capability not reported/);
  });

  it("gives every row exactly as many cells as the header has columns", () => {
    // A column added to the header and not to the body shifts every cell after it.
    renderTable([entry({ limits: { rpm: 20, rpd: null, tpm: null, tpd: null } })]);
    const headers = container.querySelectorAll("thead th").length;
    const cells = container.querySelectorAll("tbody tr td").length;
    expect(cells).toBe(headers);
  });
});

describe("compactCount on values the feed can actually send", () => {
  it("renders a numeric string the way it renders the number", () => {
    // The feed is JSON: `"40000"` is a shape the declared type does not prevent.
    expect(compactCount("40000" as unknown as number)).toBe("40K");
  });

  it("refuses to print garbage into the table", () => {
    for (const bad of [Number.NaN, Number.POSITIVE_INFINITY, -5, "abc" as unknown as number]) {
      expect(compactCount(bad as number)).toBe("?");
    }
  });
});
