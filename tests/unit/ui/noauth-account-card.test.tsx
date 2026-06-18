// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ── Import component (no module-level mocks needed) ──────────────────────────

const { default: NoAuthAccountCard } = await import(
  "../../../src/shared/components/NoAuthAccountCard"
);

// ── Helpers ──────────────────────────────────────────────────────────────────

const PROVIDER_ID = "mimocode";

function makeFingerprints(n: number): string[] {
  // Deterministic, distinguishable, > 10 chars each so the truncation is exercised.
  return Array.from({ length: n }, (_, i) => `fp${String(i).padStart(2, "0")}deadbeefcafe`);
}

function setupFetch(fingerprints: string[]) {
  const connections =
    fingerprints.length > 0
      ? [
          {
            id: "conn-1",
            provider: PROVIDER_ID,
            providerSpecificData: { fingerprints, accountProxies: [] },
          },
        ]
      : [];
  const mockFetch = vi.fn((url: string) => {
    if (String(url).includes("/api/providers")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ connections }),
      } as Response);
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) } as Response);
  });
  vi.stubGlobal("fetch", mockFetch);
  return mockFetch;
}

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderCard() {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  let counter = 0;
  act(() => {
    root.render(
      <NoAuthAccountCard
        providerId={PROVIDER_ID}
        providerName="MiMoCode"
        generateAccountId={() => `gen-${counter++}`}
      />
    );
  });
  containers.push({ root, el });
  return el;
}

async function waitForCondition(fn: () => boolean, timeoutMs = 2000) {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeoutMs) throw new Error("waitForCondition timed out");
    await new Promise((r) => setTimeout(r, 20));
  }
}

const grid = (el: HTMLElement) =>
  el.querySelector<HTMLElement>("[data-testid='noauth-account-grid']");

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
});

// ── Tests ──────────────────────────────────────────────────────────────────────

describe("NoAuthAccountCard compact grid", () => {
  it("renders the account list as a multi-column grid container", async () => {
    setupFetch(makeFingerprints(15));
    const el = renderCard();
    await waitForCondition(() => grid(el) !== null);
    const container = grid(el)!;
    // Must be a responsive grid (not the old single-column stack) so 15 accounts stay compact.
    expect(container.className).toContain("grid");
    expect(container.className).toMatch(/sm:grid-cols-2|lg:grid-cols-3/);
  });

  it("renders one chip per account fingerprint", async () => {
    setupFetch(makeFingerprints(15));
    const el = renderCard();
    await waitForCondition(() => grid(el)?.querySelectorAll("[data-account-id]").length === 15);
    expect(grid(el)!.querySelectorAll("[data-account-id]").length).toBe(15);
  });

  it("constrains height with vertical scroll so a long list never grows unbounded", async () => {
    setupFetch(makeFingerprints(15));
    const el = renderCard();
    await waitForCondition(() => grid(el) !== null);
    const container = grid(el)!;
    expect(container.className).toContain("overflow-y-auto");
    expect(container.className).toMatch(/max-h-/);
  });

  it("keeps a proxy control on every chip (shield icon)", async () => {
    setupFetch(makeFingerprints(3));
    const el = renderCard();
    await waitForCondition(() => grid(el)?.querySelectorAll("[data-account-id]").length === 3);
    const chips = Array.from(grid(el)!.querySelectorAll<HTMLElement>("[data-account-id]"));
    for (const chip of chips) {
      const proxyBtn = chip.querySelector("button[title]");
      expect(proxyBtn).toBeTruthy();
      expect(proxyBtn!.textContent).toContain("shield");
    }
  });

  it("opens the proxy editor when a chip's shield is clicked", async () => {
    setupFetch(makeFingerprints(3));
    const el = renderCard();
    await waitForCondition(() => grid(el)?.querySelectorAll("[data-account-id]").length === 3);
    const firstChip = grid(el)!.querySelector<HTMLElement>("[data-account-id]")!;
    const proxyBtn = firstChip.querySelector<HTMLButtonElement>("button[title]")!;
    act(() => {
      proxyBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await waitForCondition(() => el.textContent?.includes("Proxy for Account 1") ?? false);
    expect(el.textContent).toContain("Proxy for Account 1");
    // The editor exposes a host input (the proxy configuration surface).
    expect(el.querySelector("input[placeholder='Host']")).toBeTruthy();
  });
});
