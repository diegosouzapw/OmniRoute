// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
vi.mock("next/link", () => ({ default: "a" }));

import UnpricedUsageBanner from "../../../src/app/(dashboard)/dashboard/UnpricedUsageBanner";

let root: Root;
let container: HTMLDivElement;

async function showReport(
  affected: number,
  policy: "fail_closed" | "count_as_zero" = "fail_closed"
) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        policy,
        limitedApiKeysAffected: affected,
        models: [
          {
            provider: "example",
            model: "no-price",
            requests: 2,
            apiKeys: 1,
            limitedApiKeys: affected,
          },
        ],
      }),
    })
  );
  await act(async () => {
    root.render(<UnpricedUsageBanner />);
  });
}

describe("UnpricedUsageBanner", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  it("keeps missing-price visibility informational when no limited key is affected", async () => {
    await showReport(0);
    expect(container.textContent).toContain("example/no-price");
    expect(container.querySelector('[role="status"]')).not.toBeNull();
    expect(container.querySelector('[role="alert"]')).toBeNull();
    expect(container.textContent).not.toContain("unpricedUsageFailClosed");
    expect(container.textContent).not.toContain("unpricedUsageCountAsZero");
  });

  it("alerts only when a fail-closed limited key is actually affected", async () => {
    await showReport(1);
    expect(container.querySelector('[role="alert"]')).not.toBeNull();
    expect(container.textContent).toContain("unpricedUsageFailClosed");
  });
});
