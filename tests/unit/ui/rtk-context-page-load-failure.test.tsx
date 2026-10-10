// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const containers: HTMLElement[] = [];
const roots: Array<{ unmount: () => void }> = [];

// Compile the page once during collection, like other UI fixtures; assertions measure
// the mounted request/UI lifecycle, not a cold Vite transform inside the first test.
const { default: RtkContextPageClient } =
  await import("../../../src/app/(dashboard)/dashboard/context/rtk/RtkContextPageClient");

function mount(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  roots.push(root);
  act(() => {
    root.render(ui);
  });
  return container;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(async () => {
  await act(async () => {
    while (roots.length > 0) roots.pop()?.unmount();
  });
  while (containers.length > 0) containers.pop()?.remove();
  vi.restoreAllMocks();
});

async function waitForState(assertion: () => void) {
  await vi.waitFor(async () => {
    await act(async () => {});
    assertion();
  });
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function rtkConfig() {
  return {
    enabled: true,
    intensity: "standard",
    applyToToolResults: true,
    applyToAssistantMessages: false,
    applyToCodeBlocks: false,
    enabledFilters: [],
    disabledFilters: [],
    maxLinesPerResult: 40,
    maxCharsPerResult: 4000,
    deduplicateThreshold: 30,
    customFiltersEnabled: false,
    trustProjectFilters: false,
    rawOutputRetention: "never",
    rawOutputMaxBytes: 8192,
  };
}

async function mountPage() {
  const container = mount(<RtkContextPageClient />);
  await waitForState(() => expect(container.textContent).toContain("Failed To Load"));
  return container;
}

function retryButton(container: HTMLElement) {
  return Array.from(container.querySelectorAll("button")).find(
    (button) => button.textContent === "Retry"
  );
}

describe("RtkContextPageClient when the settings GET fails", () => {
  // The page reads only the master flag from GET /api/settings/compression. A failed
  // GET must not fall back to enabled:false, which would show the "master switch is
  // OFF" banner while the stored flag is on.
  const FAILURES = {
    "a 500": async () => new Response(JSON.stringify({ error: "unavailable" }), { status: 500 }),
    "a network error": async () => {
      throw new TypeError("Failed to fetch");
    },
  };

  it.each(Object.keys(FAILURES) as Array<keyof typeof FAILURES>)(
    "shows a retry instead of the master-switch-off banner after %s",
    { timeout: 20000 },
    async (failure) => {
      vi.spyOn(globalThis, "fetch").mockImplementation(async (input: RequestInfo | URL) => {
        const url = input.toString();
        if (url.includes("/api/settings/compression")) return FAILURES[failure]();
        if (url.includes("/api/context/rtk/filters")) return json({ filters: [] });
        if (url.includes("/api/context/rtk/config")) return json(rtkConfig());
        if (url.includes("/api/context/analytics")) return json({});
        return json({}, 404);
      });
      const container = await mountPage();

      expect(container.textContent).toContain("Failed To Load");
      expect(container.textContent).not.toContain("master switch is OFF");
      // No control that depends on the loaded settings stays on screen.
      expect(container.querySelectorAll("input, select, textarea")).toHaveLength(0);
      expect(retryButton(container)).toBeTruthy();
    }
  );

  it("drops the master-switch-off banner once Retry answers", async () => {
    let settingsAttempts = 0;
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input: RequestInfo | URL) => {
      const url = input.toString();
      if (url.includes("/api/settings/compression")) {
        settingsAttempts += 1;
        return settingsAttempts === 1
          ? json({ error: "unavailable" }, 500)
          : json({ enabled: true });
      }
      if (url.includes("/api/context/rtk/filters")) return json({ filters: [] });
      if (url.includes("/api/context/rtk/config")) return json(rtkConfig());
      if (url.includes("/api/context/analytics")) return json({});
      return json({}, 404);
    });
    const container = await mountPage();
    expect(container.textContent).toContain("Failed To Load");

    await act(async () => {
      retryButton(container)!.click();
    });
    await waitForState(() =>
      expect(container.querySelectorAll("input, select, textarea").length).toBeGreaterThan(0)
    );

    expect(container.textContent).not.toContain("Failed To Load");
    // The stored flag is on, so the banner the defaults would show stays hidden.
    expect(container.textContent).not.toContain("master switch is OFF");
    expect(container.querySelectorAll("input, select, textarea").length).toBeGreaterThan(0);
  });

  it("does not finish mounting before a delayed settings failure is rendered", async () => {
    let answer!: (response: Response) => void;
    const settings = new Promise<Response>((resolve) => {
      answer = resolve;
    });
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockImplementation(async (input: RequestInfo | URL) => {
        const url = input.toString();
        if (url.includes("/api/settings/compression")) return settings;
        if (url.includes("/api/context/rtk/filters")) return json({ filters: [] });
        if (url.includes("/api/context/rtk/config")) return json(rtkConfig());
        if (url.includes("/api/context/analytics")) return json({});
        return json({}, 404);
      });
    let settled = false;
    const mounting = mountPage().then((container) => {
      settled = true;
      return container;
    });
    try {
      await vi.waitFor(() => expect(fetchSpy).toHaveBeenCalledWith("/api/settings/compression"));
      // Drain a real event-loop turn, not a guessed count of promise callbacks.
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
      expect(settled).toBe(false);
      answer(json({ error: "unavailable" }, 500));
      const container = await mounting;
      expect(container.textContent).toContain("Failed To Load");
      expect(retryButton(container)).toBeTruthy();
    } finally {
      answer(json({ error: "unavailable" }, 500));
      await mounting;
    }
  });
});
