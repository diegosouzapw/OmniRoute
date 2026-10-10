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

const badge = {
  id: "first-request",
  name: "First Request",
  description: "Sent your first request",
  icon: null,
  category: "usage",
  rarity: "common",
  criteria: "Send one request",
  hidden: 0,
  createdAt: "2026-08-26T00:00:00.000Z",
};

const badgeHeading = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("h2")).find((h) => h.textContent === "First Request");

async function openBadge() {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/level")) {
        return { ok: true, json: async () => ({ level: { totalXp: 0, currentLevel: 1 } }) };
      }
      if (url.endsWith("/earned")) {
        return { ok: true, json: async () => ({ badges: [] }) };
      }
      return { ok: true, json: async () => ({ badges: [badge] }) };
    })
  );
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  roots.push({ root, container });
  act(() => root.render(<ProfilePage />));
  for (let i = 0; i < 40 && !container.querySelector("button"); i++) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
  }
  const card = Array.from(container.querySelectorAll("button")).find((b) =>
    b.textContent?.includes("First Request")
  );
  expect(card).toBeTruthy();
  act(() => card!.dispatchEvent(new MouseEvent("click", { bubbles: true })));
  return container;
}

describe("Profile badge detail modal", () => {
  it("is a labelled modal dialog", async () => {
    const container = await openBadge();

    // The detail panel is open (its heading is rendered)...
    expect(badgeHeading(container)).toBeTruthy();
    // ...and it must be exposed to assistive technology as a dialog.
    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
    const labelId = dialog?.getAttribute("aria-labelledby");
    expect(labelId).toBeTruthy();
    expect(container.querySelector(`#${labelId}`)).toBe(badgeHeading(container));
  });

  it("closes on Escape", async () => {
    const container = await openBadge();
    expect(badgeHeading(container)).toBeTruthy();
    expect(container.querySelector('[role="dialog"]')).not.toBeNull();

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });

    expect(badgeHeading(container)).toBeUndefined();
  });
});
