// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";
vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => key,
}));
import CodexAccountDetails from "../../../src/app/(dashboard)/dashboard/providers/[id]/components/CodexAccountDetails";
const cleanup: Array<() => void> = [];
afterEach(() => {
  cleanup.forEach((fn) => fn());
  cleanup.length = 0;
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});
function render() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  cleanup.push(() => act(() => root.unmount()));
  act(() =>
    root.render(
      <CodexAccountDetails
        pool={{
          parentConnectionId: "account-1",
          aggregate: { status: "fully_limited", limitedChildCount: 2 },
          children: ["codex", "spark"].map((scope) => ({
            key: { parentConnectionId: "account-1", scope },
            unavailable: true,
            cooldown: { active: true, rateLimitedUntil: "2099-01-01T00:00:00Z" },
            quota: {
              exhaustedWindow: null,
              observedAt: null,
              windows: {
                "5h": { usage: 20, limit: 100, usedPercentage: 20, resetAt: null },
                "7d": null,
              },
            },
          })) as never,
        }}
      />
    )
  );
  return container;
}
it("shows Codex usage without obsolete Spark and releases only the selected account", async () => {
  const fetch = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal("fetch", fetch);
  const el = render();
  expect(el.textContent).toContain("20%");
  expect(el.textContent).not.toContain("Spark");
  await act(async () => el.querySelector("button")!.click());
  expect(fetch).toHaveBeenCalledWith(
    "/api/providers/codex-cooldown",
    expect.objectContaining({ body: JSON.stringify({ connectionId: "account-1" }) })
  );
  expect(el.textContent).toContain("codexCooldownReleased");
  expect(el.querySelector("button")).toBeNull();
});
it("retains the cooldown and offers retry when release fails", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
  const el = render();
  await act(async () => el.querySelector("button")!.click());
  expect(el.querySelector("[role=alert]")).not.toBeNull();
  expect(el.querySelector("button")!.disabled).toBe(false);
});
