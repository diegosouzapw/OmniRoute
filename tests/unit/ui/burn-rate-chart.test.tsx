// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

// next-intl: no local mock — falls through to the real-EN-text default mock in
// tests/_setup/vitestUiPolyfills.ts (quotaShare.burnRateTitle = "Burn rate",
// .burnRateExhaustsIn = "Exhausts in" in en.json).

// recharts' ResponsiveContainer (pulled in by BurnRateChartInner) needs ResizeObserver,
// which jsdom does not implement.
beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

// Eagerly resolve the dynamic import so BurnRateChartInner actually renders instead of
// staying null forever (mirrors the pattern in playground-studio.test.tsx). Tracked via
// state (not a bare closure variable) so the resolution itself triggers the re-render
// that picks it up, instead of relying on some later, unrelated state update to do so.
vi.mock("next/dynamic", () => ({
  default: (fn: () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>) => {
    return function DynamicWrapper(props: Record<string, unknown>) {
      const [Component, setComponent] = React.useState<React.ComponentType<
        Record<string, unknown>
      > | null>(null);
      React.useEffect(() => {
        let mounted = true;
        fn().then((m) => {
          if (mounted) setComponent(() => m.default);
        });
        return () => {
          mounted = false;
        };
      }, []);
      if (!Component) return null;
      return React.createElement(Component, props);
    };
  },
}));

const { default: BurnRateChart } = await import(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/components/BurnRateChart"
);

let container: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;

async function render(props: Parameters<typeof BurnRateChart>[0]) {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    root = createRoot(container!);
    root.render(<BurnRateChart {...props} />);
  });
  // Let the mocked next/dynamic's `fn().then(setComponent)` resolve and commit the
  // re-render that swaps in BurnRateChartInner. The FIRST import of this module (which
  // pulls in recharts) needs a real transform, not just a microtask — polling a few
  // real ticks is more reliable here than a fixed Promise.resolve() count.
  for (let i = 0; i < 20 && container!.innerHTML === ""; i++) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
  }
}

describe("BurnRateChart", { timeout: 10000 }, () => {
  afterEach(() => {
    if (root && container) act(() => root!.unmount());
    container?.remove();
    container = null;
    root = null;
  });

  it("renders no-data state when usage is null", async () => {
    await render({ usage: null });
    // quotaShare.burnRateTitle in src/i18n/messages/en.json
    expect(document.body.innerHTML).toContain("Burn rate");
    expect(document.body.innerHTML).toContain("no data");
  });

  it("renders no-data state when burnRate is falsy", async () => {
    const usage = {
      dimensions: [],
      burnRate: null,
    };
    await render({ usage: usage as never });
    expect(document.body.innerHTML).toContain("no data");
  });

  it("renders chart when usage has burnRate data", async () => {
    const usage = {
      dimensions: [
        { unit: "tokens", window: "daily", limit: 100000, consumedTotal: 30000, perKey: [] },
      ],
      burnRate: { tokensPerSecond: 10, timeToExhaustionMs: 7_000_000 },
    };
    await render({ usage: usage as never });
    // Should not show no-data message
    expect(document.body.innerHTML).not.toContain("no data yet");
    // Should show exhaustion label (quotaShare.burnRateExhaustsIn in en.json)
    expect(document.body.innerHTML).toContain("Exhausts in");
  });
});
