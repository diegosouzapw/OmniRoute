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

interface CapturedPut {
  url: string;
  body: Record<string, unknown>;
}

function setupFetchMock(): { puts: CapturedPut[] } {
  const puts: CapturedPut[] = [];
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

  const initialConfig = {
    enabled: true,
    defaultMode: "off",
    autoTriggerTokens: 0,
    cacheMinutes: 5,
    preserveSystemPrompt: true,
    comboOverrides: {},
    activeComboId: null,
    contextEditing: { enabled: false },
  };
  const combos = [{ id: "c1", name: "RTK only", pipeline: [{ engine: "rtk" }] }];

  vi.spyOn(globalThis, "fetch").mockImplementation(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();
      const method = (init?.method ?? "GET").toUpperCase();
      if (url.includes("/api/context/combos/default")) return json({}, 404);
      if (url.includes("/api/context/combos")) return json({ combos });
      if (url.includes("/api/compression/engines")) return json({ engines: [] });
      if (url.includes("/api/settings/compression")) {
        if (method === "PUT") {
          const body = JSON.parse(String(init?.body ?? "{}"));
          puts.push({ url, body });
          return json({ ...initialConfig, ...body });
        }
        return json(initialConfig);
      }
      return json({}, 404);
    }
  );
  return { puts };
}

function setSelectValue(select: HTMLSelectElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, "value")!.set!;
  setter.call(select, value);
  select.dispatchEvent(new Event("change", { bubbles: true }));
}

describe("CompressionHub — active-profile selector", () => {
  async function render() {
    const { default: CompressionHub } =
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionHub");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionHub />);
    });
    await flush();
    return container;
  }

  it("renders the active-profile select with Default + each named combo", async () => {
    setupFetchMock();
    const container = await render();
    const select = container.querySelector(
      '[data-testid="active-profile-select"]'
    ) as HTMLSelectElement | null;
    expect(select).toBeTruthy();
    expect(container.textContent).toContain("Default (from panel)");
    expect(container.textContent).toContain("RTK only");
  });

  it("changing the select to a combo PUTs activeComboId === that id", async () => {
    const { puts } = setupFetchMock();
    const container = await render();
    const select = container.querySelector(
      '[data-testid="active-profile-select"]'
    ) as HTMLSelectElement;
    await act(async () => {
      setSelectValue(select, "c1");
    });
    await flush();
    const settingsPuts = puts.filter((p) => p.url.includes("/api/settings/compression"));
    expect(settingsPuts.length).toBeGreaterThan(0);
    expect(settingsPuts.pop()!.body.activeComboId).toBe("c1");
  });

  it("preview shows the Default fallback initially, and the combo engines once a combo is active", async () => {
    setupFetchMock();
    const container = await render();
    const preview = () => container.querySelector('[data-testid="active-profile-preview"]');
    expect(preview()).toBeTruthy();
    expect(preview()!.textContent).toContain("Default");
    const select = container.querySelector(
      '[data-testid="active-profile-select"]'
    ) as HTMLSelectElement;
    await act(async () => {
      setSelectValue(select, "c1");
    });
    await flush();
    expect(preview()!.textContent).toContain("rtk");
  });

  it("no longer renders the master Token Saver toggle, the mode selector, or reorder buttons", async () => {
    setupFetchMock();
    const container = await render();
    expect(container.querySelector('[aria-label="Toggle Token Saver"]')).toBeNull();
    expect(container.querySelector('[aria-label="Move up"]')).toBeNull();
    expect(container.querySelector('[aria-label="Move down"]')).toBeNull();
    // The Aggressive mode button's hint text is gone with the mode selector.
    expect(container.textContent).not.toContain("Summary plus aging");
  });
});
