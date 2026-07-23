// @vitest-environment jsdom
// Regression for #3973: the System Storage tab gained a "Manual VACUUM" button that
// POSTs to /api/settings/database/vacuum and surfaces the result. This guards that the
// button is rendered and wired to the vacuum endpoint (the only net-new runtime behavior
// in the PR beyond the structurally-tested settings-shell redirect).
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

import SystemStorageTab from "@/app/(dashboard)/dashboard/settings/components/SystemStorageTab";

let container: HTMLDivElement;
let root: Root;
const fetchCalls: Array<{ url: string; method: string }> = [];

beforeEach(() => {
  fetchCalls.length = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input.toString();
      const method = (init?.method || "GET").toUpperCase();
      fetchCalls.push({ url, method });
      // Keep the heavy DB-settings form unrendered (its shape is irrelevant to this
      // test): a non-ok GET leaves dbSettings null, so the `!dbSettingsLoading &&
      // dbSettings` form block is skipped while the Maintenance card stays rendered.
      if (method === "GET" && /\/api\/settings\/database$/.test(url)) {
        return Promise.resolve({ ok: false, status: 404, json: async () => ({}) } as unknown as Response);
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        // Permissive body covering every loader; vacuum returns a success payload.
        json: async () => ({ success: true, message: "VACUUM completed", backups: [] }),
      } as unknown as Response);
    })
  );
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("SystemStorageTab — Manual VACUUM button (#3973)", () => {
  it("POSTs to /api/settings/database/vacuum when the Manual VACUUM button is clicked", async () => {
    await act(async () => {
      root.render(<SystemStorageTab />);
    });
    // Let mount-time loaders settle.
    await act(async () => {
      await Promise.resolve();
    });

    const vacuumButton = Array.from(container.querySelectorAll("button")).find((b) =>
      (b.textContent || "").includes("Manual VACUUM")
    );
    expect(vacuumButton, "Manual VACUUM button should be rendered").toBeTruthy();

    await act(async () => {
      vacuumButton!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await Promise.resolve();
    });

    const vacuumCall = fetchCalls.find((c) => c.url.includes("/api/settings/database/vacuum"));
    expect(vacuumCall, "a POST to the vacuum endpoint should be issued").toBeTruthy();
    expect(vacuumCall!.method).toBe("POST");
  });
});
