// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const containers: HTMLElement[] = [];
const roots: Array<{ unmount: () => void }> = [];

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
  vi.restoreAllMocks();
  await act(async () => {
    while (roots.length > 0) roots.pop()?.unmount();
  });
  for (let i = 0; i < 10; i++) await Promise.resolve();
  while (containers.length > 0) containers.pop()?.remove();
  document.body.innerHTML = "";
});

async function flush() {
  await act(async () => {
    for (let i = 0; i < 10; i++) await Promise.resolve();
  });
}

function combo(id: string, name: string) {
  return {
    id,
    name,
    description: `${name} desc`,
    pipeline: [{ engine: "rtk", intensity: "standard" }],
    languagePacks: ["en"],
    outputMode: false,
    outputModeIntensity: "full",
    isDefault: false,
  };
}

function setupFetchMock() {
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
  const combos = [combo("c1", "Alpha"), combo("c2", "Bravo")];
  vi.spyOn(globalThis, "fetch").mockImplementation(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();
      void init;
      if (url.includes("/api/context/combos/") && url.includes("/assignments"))
        return json({ assignments: [] });
      if (url.includes("/api/context/combos")) return json({ combos });
      if (url.includes("/api/combos")) return json({ combos: [] });
      if (url.includes("/api/compression/language-packs")) return json({ packs: [] });
      if (url.includes("/api/settings/compression"))
        return json({ activeComboId: "c2", enabled: true });
      return json({}, 404);
    }
  );
}

describe("NamedCombosManager — active badge, no set-as-default", () => {
  async function render() {
    const { default: CompressionCombosPageClient } =
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionCombosPageClient");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionCombosPageClient />);
    });
    await flush();
    return container;
  }

  it("renders no 'Set as default' button", async () => {
    setupFetchMock();
    const container = await render();
    expect(container.textContent).not.toContain("Set as default");
  });

  it("shows the '● Active' badge only on the combo whose id === activeComboId", async () => {
    setupFetchMock();
    const container = await render();
    expect(container.querySelector('[data-testid="active-badge-c2"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="active-badge-c1"]')).toBeNull();
  });
});

describe("NamedCombosManager when the settings GET fails", () => {
  // The settings GET fails as it does while the server restarts. Its defaults
  // (activeComboId null, compressionEnabled false) suppress the master-switch warning,
  // hide the Active badge and disable the override selects, so a failed load must offer
  // a retry instead of that wrong view.
  const FAILURES = {
    "a 500": async () => new Response(JSON.stringify({ error: "unavailable" }), { status: 500 }),
    "a network error": async () => {
      throw new TypeError("Failed to fetch");
    },
  };

  function json(body: unknown, status = 200) {
    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }

  async function mountPage() {
    const { default: CompressionCombosPageClient } =
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionCombosPageClient");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionCombosPageClient />);
    });
    await flush();
    return container;
  }

  function retryButton(container: HTMLElement) {
    return Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent === "Retry"
    );
  }

  // The page mounts the Hub and the manager side by side; when the settings GET fails
  // for both, each shows its own Retry, and every one must be pressed to recover.
  async function clickAllRetryButtons(container: HTMLElement) {
    for (;;) {
      const retry = retryButton(container);
      if (!retry) return;
      await act(async () => {
        retry.click();
      });
      await flush();
    }
  }

  // The Hub's settings GET fires before the manager's, so the first two calls are the
  // ones that fail; both retries reach the stored row.
  function settingsFetch(settingsCalls: { count: number }, fail: () => Promise<Response>) {
    return vi.spyOn(globalThis, "fetch").mockImplementation(async (input: RequestInfo | URL) => {
      const url = input.toString();
      if (url.includes("/api/settings/compression")) {
        settingsCalls.count += 1;
        if (settingsCalls.count <= 2) return fail();
        return json({ activeComboId: "c2", enabled: false });
      }
      if (url.includes("/api/context/combos/")) return json({ assignments: [] });
      if (url.includes("/api/context/combos")) return json({ combos: [combo("c2", "Bravo")] });
      if (url.includes("/api/combos")) return json({ combos: [] });
      if (url.includes("/api/compression/language-packs")) return json({ packs: [] });
      return json({}, 404);
    });
  }

  it.each(Object.keys(FAILURES) as Array<keyof typeof FAILURES>)(
    "shows a retry in place of the defaulted manager after %s",
    { timeout: 20000 },
    async (failure) => {
      vi.spyOn(globalThis, "fetch").mockImplementation(async (input: RequestInfo | URL) => {
        const url = input.toString();
        if (url.includes("/api/settings/compression")) return FAILURES[failure]();
        if (url.includes("/api/context/combos/")) return json({ assignments: [] });
        if (url.includes("/api/context/combos")) return json({ combos: [combo("c2", "Bravo")] });
        if (url.includes("/api/combos")) return json({ combos: [] });
        if (url.includes("/api/compression/language-packs")) return json({ packs: [] });
        return json({}, 404);
      });
      const container = await mountPage();

      expect(container.textContent).toContain("Failed To Load");
      expect(
        container.querySelector('[data-testid="compression-master-switch-warning"]')
      ).toBeNull();
      expect(container.querySelector('[data-testid="active-badge-c2"]')).toBeNull();
      // No control that depends on the loaded settings stays on screen.
      expect(container.querySelectorAll("select")).toHaveLength(0);
      expect(retryButton(container)).toBeTruthy();
    }
  );

  it("shows the master-switch warning and the Active badge once Retry answers", async () => {
    const settingsCalls = { count: 0 };
    settingsFetch(settingsCalls, FAILURES["a 500"]);
    const container = await mountPage();
    expect(container.textContent).toContain("Failed To Load");

    await clickAllRetryButtons(container);

    expect(container.textContent).not.toContain("Failed To Load");
    expect(
      container.querySelector('[data-testid="compression-master-switch-warning"]')
    ).toBeTruthy();
    expect(container.querySelector('[data-testid="active-badge-c2"]')).toBeTruthy();
  });

  it("ignores a routing-combos answer from the load a retry superseded", async () => {
    let settingsCalls = 0;
    let releaseStaleRouting!: (response: Response) => void;
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input: RequestInfo | URL) => {
      const url = input.toString();
      if (url.includes("/api/settings/compression")) {
        settingsCalls += 1;
        if (settingsCalls <= 2) return FAILURES["a 500"]();
        return json({ activeComboId: "c2", enabled: false });
      }
      if (url.includes("/api/context/combos/")) return json({ assignments: [] });
      if (url.includes("/api/context/combos")) return json({ combos: [combo("c2", "Bravo")] });
      if (url.includes("/api/combos")) {
        // The first load's routing-combos GET stays open until after the retried load
        // has finished; its answer belongs to the run the retry superseded.
        if (!releaseStaleRouting) {
          return new Promise<Response>((resolve) => {
            releaseStaleRouting = (response) => resolve(response);
          });
        }
        return json({ combos: [] });
      }
      if (url.includes("/api/compression/language-packs")) return json({ packs: [] });
      return json({}, 404);
    });
    const container = await mountPage();
    await clickAllRetryButtons(container);
    expect(
      container.querySelector('[data-testid="compression-master-switch-warning"]')
    ).toBeTruthy();

    await act(async () => {
      releaseStaleRouting(json({ combos: [{ id: "stale", name: "StaleRoute", config: null }] }));
    });
    await flush();

    expect(container.textContent).not.toContain("StaleRoute");
  });
});
