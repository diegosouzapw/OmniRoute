// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Minimal i18n stub — returns key as-is so assertions are stable.
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (values && typeof values.count !== "undefined" && typeof values.total !== "undefined") {
      return `${values.count}/${values.total} ${key}`;
    }
    return key;
  },
}));

// Stub fetch before importing the component.
const fetchCalls: string[] = [];
const mockFetch = vi.fn((url: string) => {
  fetchCalls.push(url);
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
    headers: {
      get: (name: string) => (name === "x-total-count" ? "0" : null),
    },
  } as unknown as Response);
});
vi.stubGlobal("fetch", mockFetch);

// Import component after mocks.
const { default: ComplianceTab } = await import(
  "../../../src/app/(dashboard)/dashboard/audit/ComplianceTab"
);

// ── Helpers ───────────────────────────────────────────────────────────────────

async function waitForCondition(fn: () => boolean, timeoutMs = 5000) {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeoutMs) throw new Error("waitForCondition timed out");
    await new Promise((r) => setTimeout(r, 20));
  }
}

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderTab() {
  // Must set IS_REACT_ACT_ENVIRONMENT before each render.
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<ComplianceTab />);
  });
  containers.push({ root, el });
  return el;
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  fetchCalls.length = 0;
  mockFetch.mockClear();
});

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("ComplianceTab — actor filter", { timeout: 30000 }, () => {
  it("renders the actor label, input and datalist", async () => {
    const el = renderTab();

    // Wait until fetch resolves and the component re-renders with the filter grid.
    await waitForCondition(() => el.querySelector('input[list="compliance-actors"]') !== null);

    // The actor label text should appear (i18n stub returns key as-is).
    expect(el.textContent).toContain("actor");

    // An input with list="compliance-actors" must exist.
    const actorInput = el.querySelector('input[list="compliance-actors"]');
    expect(actorInput).toBeTruthy();

    // A datalist with id="compliance-actors" must exist.
    const datalist = el.querySelector("datalist#compliance-actors");
    expect(datalist).toBeTruthy();
  });

  it("initial fetch does not include actor param", async () => {
    renderTab();

    // Wait until at least one fetch call is made.
    await waitForCondition(() => fetchCalls.length > 0);

    // The first fetch should not include an actor param (state is "").
    expect(fetchCalls[0]).not.toContain("actor=");
  });

  it("re-fetches with actor param after typing in the actor input", async () => {
    const el = renderTab();
    await waitForCondition(() => el.querySelector('input[list="compliance-actors"]') !== null);

    const beforeCount = fetchCalls.length;

    const actorInput = el.querySelector(
      'input[list="compliance-actors"]'
    ) as HTMLInputElement | null;
    expect(actorInput).toBeTruthy();

    // Simulate React controlled input change via nativeInputValueSetter + dispatchEvent.
    act(() => {
      if (actorInput) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(actorInput, "admin");
        actorInput.dispatchEvent(new Event("input", { bubbles: true }));
        actorInput.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });

    // Wait for a new fetch triggered by the actor state change.
    await waitForCondition(
      () => fetchCalls.slice(beforeCount).some((url) => url.includes("actor=admin")),
      5000
    );

    expect(fetchCalls.some((url) => url.includes("actor=admin"))).toBe(true);
  });

  it("clearFilters button exists and clicking it does not throw", async () => {
    const el = renderTab();
    await waitForCondition(() => el.querySelector('input[list="compliance-actors"]') !== null);

    // Find the clearFilters button (i18n stub returns key "clearFilters").
    const clearBtn = Array.from(el.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("clearFilters")
    );
    expect(clearBtn).toBeTruthy();

    // Clicking the button should not throw.
    expect(() => {
      act(() => {
        clearBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
    }).not.toThrow();
  });
});
