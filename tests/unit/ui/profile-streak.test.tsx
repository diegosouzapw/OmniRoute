// @vitest-environment jsdom

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

// Render the key plus its ICU arguments so the assertions can see the count that reached
// the `dayStreak` message (e.g. `dayStreak{"count":7}`).
const translate = (key: string, values?: Record<string, unknown>) =>
  values ? `${key}${JSON.stringify(values)}` : key;
vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => Object.assign(translate, { has: () => false }),
}));

const { default: ProfilePage } = await import("@/app/(dashboard)/dashboard/profile/page");

const roots: Array<{ root: ReturnType<typeof createRoot>; container: HTMLDivElement }> = [];

function stubFetch(levelBody: Record<string, unknown>) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/level")) {
        return { ok: true, json: async () => levelBody };
      }
      return { ok: true, json: async () => ({ badges: [] }) };
    })
  );
}

function mountProfile() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  roots.push({ root, container });
  act(() => root.render(<ProfilePage />));
  return container;
}

async function waitForLoad(container: HTMLDivElement) {
  for (let i = 0; i < 40 && container.querySelector('[role="status"]'); i++) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
  }
}

afterEach(() => {
  for (const { root, container } of roots.splice(0)) {
    act(() => root.unmount());
    container.remove();
  }
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Profile streak card", () => {
  it("renders the current streak from the level response", async () => {
    stubFetch({
      level: { totalXp: 150, currentLevel: 2 },
      streak: { current: 7, longest: 9 },
    });

    const container = mountProfile();
    await waitForLoad(container);

    const text = container.textContent ?? "";
    expect(text).toContain('dayStreak{"count":7}');
    expect(text).toContain("maintainStreak");
    expect(container.querySelector('[role="alert"]')).toBeNull();
  });

  it("hides the streak card when the current streak is 0", async () => {
    stubFetch({
      level: { totalXp: 150, currentLevel: 2 },
      streak: { current: 0, longest: 9 },
    });

    const container = mountProfile();
    await waitForLoad(container);

    const text = container.textContent ?? "";
    expect(text).not.toContain("dayStreak");
    expect(text).not.toContain("maintainStreak");
  });

  it("hides the streak card when the response carries no streak field", async () => {
    stubFetch({ level: { totalXp: 150, currentLevel: 2 } });

    const container = mountProfile();
    await waitForLoad(container);

    expect(container.textContent ?? "").not.toContain("dayStreak");
  });
});
