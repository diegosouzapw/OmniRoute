// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  ENGINE_IDS,
  engineMeta,
} from "../../../open-sse/services/compression/engineCatalog.ts";

// i18n does not resolve to a real locale in vitest/jsdom, so mock next-intl to echo
// the key. This test therefore asserts ONLY on i18n-independent strings: catalog
// labels/descriptions, engine ids, data-testid hooks, and the PUT request body.
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

// ── Harness ─────────────────────────────────────────────────────────────────

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
    while (roots.length > 0) {
      roots.pop()?.unmount();
    }
  });
  for (let i = 0; i < 10; i++) {
    await Promise.resolve();
  }
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
});

async function flush() {
  await act(async () => {
    for (let i = 0; i < 10; i++) await Promise.resolve();
  });
}

// ── Fetch stub ────────────────────────────────────────────────────────────────

interface CapturedPut {
  url: string;
  body: Record<string, unknown>;
}

function setupFetchMock(): { puts: CapturedPut[] } {
  const puts: CapturedPut[] = [];
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  const initialConfig = {
    enabled: true,
    defaultMode: "stacked",
    autoTriggerTokens: 0,
    cacheMinutes: 5,
    preserveSystemPrompt: true,
    comboOverrides: {},
    engines: {
      rtk: { enabled: true, level: "standard" },
      caveman: { enabled: false },
    },
    activeComboId: null,
    cavemanOutputMode: { enabled: false, intensity: "full", autoClarity: true },
  };

  vi.spyOn(globalThis, "fetch").mockImplementation(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();
      const method = (init?.method ?? "GET").toUpperCase();

      if (url.includes("/api/settings/compression/mcp-accessibility")) {
        if (method === "PUT") {
          puts.push({ url, body: JSON.parse(String(init?.body ?? "{}")) });
          return json({ enabled: true });
        }
        return json({ enabled: true, maxTextChars: 50000 });
      }

      if (url.includes("/api/settings/compression")) {
        if (method === "PUT") {
          const body = JSON.parse(String(init?.body ?? "{}"));
          puts.push({ url, body });
          // Echo a merged config so the panel keeps a coherent state.
          return json({ ...initialConfig, ...body });
        }
        return json(initialConfig);
      }

      return json({}, 404);
    }
  );

  return { puts };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("CompressionPanel", () => {
  it("renders a row for every engine id in the catalog", async () => {
    setupFetchMock();
    const { default: CompressionPanel } = await import(
      "../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel"
    );

    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    for (const id of ENGINE_IDS) {
      const row = container.querySelector(`[data-testid="engine-row-${id}"]`);
      expect(row, `expected a row for engine "${id}"`).toBeTruthy();
      // Catalog label/description are hardcoded English (i18n-independent).
      expect(container.textContent).toContain(engineMeta(id).label);
    }
  });

  it("shows the rtk level 'standard' as selected", async () => {
    setupFetchMock();
    const { default: CompressionPanel } = await import(
      "../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel"
    );

    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const select = container.querySelector(
      `[data-testid="engine-row-rtk"] select`
    ) as HTMLSelectElement | null;
    expect(select).toBeTruthy();
    expect(select?.value).toBe("standard");
  });

  it("toggling caveman PUTs engines.caveman.enabled === true", async () => {
    const { puts } = setupFetchMock();
    const { default: CompressionPanel } = await import(
      "../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel"
    );

    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    // The data-testid hook wraps the Toggle; its inner <button role="switch"> is the
    // clickable element.
    const toggle = container.querySelector(
      `[data-testid="engine-toggle-caveman"] button`
    ) as HTMLButtonElement | null;
    expect(toggle, "caveman toggle must exist").toBeTruthy();

    await act(async () => {
      toggle!.click();
    });
    await flush();

    const settingsPuts = puts.filter(
      (p) => p.url.includes("/api/settings/compression") && !p.url.includes("mcp-accessibility")
    );
    expect(settingsPuts.length).toBeGreaterThan(0);
    const lastEngines = settingsPuts
      .map((p) => p.body.engines as Record<string, { enabled: boolean }> | undefined)
      .filter(Boolean)
      .pop();
    expect(lastEngines).toBeTruthy();
    expect(lastEngines!.caveman.enabled).toBe(true);
    // Full engines map is sent (whole-row persistence), so rtk is not dropped.
    expect(lastEngines!.rtk.enabled).toBe(true);
  });

  it("derived-pipeline preview reflects the enabled engines", async () => {
    setupFetchMock();
    const { default: CompressionPanel } = await import(
      "../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel"
    );

    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const preview = container.querySelector(`[data-testid="derived-pipeline-preview"]`);
    expect(preview).toBeTruthy();
    // Only rtk is enabled in the initial config → preview mentions rtk, not caveman.
    expect(preview?.textContent).toContain("rtk");
    expect(preview?.textContent).not.toContain("caveman");
  });
});
