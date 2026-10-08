// @vitest-environment jsdom

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

import { cumulativeXpForLevel } from "@/lib/gamification/xp";

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

const translate = (key: string, values?: Record<string, unknown>) =>
  values ? `${key}:${JSON.stringify(values)}` : key;
vi.mock("next-intl", () => ({
  useLocale: () => "de",
  useTranslations: () => Object.assign(translate, { has: () => false }),
}));

const { default: ProfilePage } = await import("@/app/(dashboard)/dashboard/profile/page");

const roots: Array<{ root: ReturnType<typeof createRoot>; container: HTMLDivElement }> = [];

afterEach(() => {
  for (const { root, container } of roots.splice(0)) {
    act(() => root.unmount());
    container.remove();
  }
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Profile XP numbers follow the UI locale", () => {
  it("groups thousands the German way, not with the runtime default", async () => {
    const level = 10;
    const totalXp = cumulativeXpForLevel(level) + 1500;
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        if (String(input).endsWith("/level")) {
          return { ok: true, json: async () => ({ level: { totalXp, currentLevel: level } }) };
        }
        return { ok: true, json: async () => ({ badges: [] }) };
      })
    );

    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    roots.push({ root, container });
    act(() => root.render(<ProfilePage />));
    for (let i = 0; i < 40 && container.querySelector('[role="status"]'); i++) {
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });
    }

    const text = container.textContent ?? "";
    expect(text).toContain("1.500 /");
    expect(text).toContain(`"count":"${totalXp.toLocaleString("de")}"`);
  });
});
