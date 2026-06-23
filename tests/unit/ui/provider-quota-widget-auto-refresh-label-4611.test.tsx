// @vitest-environment jsdom
//
// #4611: the auto-refresh countdown was extracted into its own
// `AutoRefreshButtonLabel` child so the per-second `setNow` tick re-renders only
// the label instead of the whole `ProviderQuotaWidget`. This guards the extracted
// child's three observable label states (Rule #18 for the maintainer-reviewed change).
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { AutoRefreshButtonLabel } from "../../../src/app/(dashboard)/home/ProviderQuotaWidget";

const tr = (_key: string, fallback: string) => fallback;

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
});

describe("AutoRefreshButtonLabel (#4611)", () => {
  it("shows 'Refreshing' while a refresh-all is in flight", () => {
    act(() => {
      root.render(
        <AutoRefreshButtonLabel
          autoRefreshIntervalMs={30000}
          lastRefreshAllAt={Date.now()}
          refreshingAll={true}
          tr={tr}
        />
      );
    });
    expect(container.textContent).toBe("Refreshing");
  });

  it("shows the static 'Refresh All' label when auto-refresh is disabled", () => {
    act(() => {
      root.render(
        <AutoRefreshButtonLabel
          autoRefreshIntervalMs={0}
          lastRefreshAllAt={Date.now()}
          refreshingAll={false}
          tr={tr}
        />
      );
    });
    expect(container.textContent).toBe("Refresh All");
  });

  it("shows the auto-refreshing countdown when an interval is configured", () => {
    act(() => {
      root.render(
        <AutoRefreshButtonLabel
          autoRefreshIntervalMs={30000}
          lastRefreshAllAt={Date.now()}
          refreshingAll={false}
          tr={tr}
        />
      );
    });
    expect(container.textContent).toContain("Auto-refreshing");
  });
});
