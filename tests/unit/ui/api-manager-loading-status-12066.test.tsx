// @vitest-environment jsdom

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

const translate = (key: string) => key;
vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => Object.assign(translate, { has: () => false, rich: translate }),
}));

const { default: ApiManagerPageClient } =
  await import("@/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient");

const roots: Array<{ root: ReturnType<typeof createRoot>; container: HTMLDivElement }> = [];

function mountPage() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  roots.push({ root, container });
  act(() => root.render(<ApiManagerPageClient />));
  return container;
}

afterEach(() => {
  for (const { root, container } of roots.splice(0)) {
    act(() => root.unmount());
    container.remove();
  }
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("API manager loading gate accessibility (#12066)", () => {
  it("exposes a busy polite status while the initial /api/keys fetch is pending", () => {
    // Never settles: the page stays on its skeleton gate for the whole test.
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => undefined))
    );

    const container = mountPage();
    const status = container.querySelector('[role="status"]');

    expect(status).not.toBeNull();
    expect(status?.getAttribute("aria-live")).toBe("polite");
    expect(status?.getAttribute("aria-busy")).toBe("true");
    // The only text in the accessibility tree during the gate is the loading label.
    expect(status?.textContent).toContain("loading");
    // The skeleton cards themselves stay decorative.
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
  });

  it("drops the loading status once /api/keys has settled", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: true, json: async () => ({}) }))
    );

    const container = mountPage();
    for (let i = 0; i < 40 && container.querySelector('[role="status"]'); i++) {
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });
    }

    expect(container.querySelector('[role="status"]')).toBeNull();
    expect(container.querySelector("h1")).not.toBeNull();
  });
});
