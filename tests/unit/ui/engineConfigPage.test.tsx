// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// ── Helpers ───────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];

function mountInContainer(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
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

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

// ── Mock fetch ────────────────────────────────────────────────────────────

const ENGINE_PAYLOAD = {
  engines: [
    {
      id: "headroom",
      name: "Headroom",
      description: "Headroom engine description",
      icon: "🗜️",
      stackable: true,
      stackPriority: 1,
      metadata: { description: "Headroom metadata description" },
      configSchema: [
        {
          key: "minRows",
          type: "number",
          label: "Min rows",
          defaultValue: 8,
          min: 1,
          max: 1000,
        },
      ],
    },
  ],
};

const COMBO_PAYLOAD = {
  id: "default",
  name: "Default",
  description: "Default combo",
  pipeline: [],
  languagePacks: [],
  outputMode: null,
};

const ANALYTICS_PAYLOAD = {
  engineId: "headroom",
  runs: 0,
  tokensSaved: 0,
  avgSavingsPercent: 0,
  days: 7,
};

function setupFetchMock() {
  vi.spyOn(globalThis, "fetch").mockImplementation(async (input: RequestInfo | URL) => {
    const url = input.toString();
    if (url.includes("/api/compression/engines")) {
      return new Response(JSON.stringify(ENGINE_PAYLOAD), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (url.includes("/api/context/combos/default")) {
      return new Response(JSON.stringify(COMBO_PAYLOAD), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (url.includes("/api/context/analytics/engine")) {
      return new Response(JSON.stringify(ANALYTICS_PAYLOAD), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({}), { status: 404 });
  });
}

// ── Tests ─────────────────────────────────────────────────────────────────

describe("EngineConfigPage", () => {
  it("renders the engine name after fetching engine list", async () => {
    setupFetchMock();
    const { EngineConfigPage } =
      await import("../../../src/shared/components/compression/EngineConfigPage");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<EngineConfigPage engineId="headroom" />);
    });

    // Flush any pending microtasks from effects
    await act(async () => {
      await Promise.resolve();
    });

    expect(container.textContent).toContain("Headroom");
  });

  it("renders the enable toggle for the engine", async () => {
    setupFetchMock();
    const { EngineConfigPage } =
      await import("../../../src/shared/components/compression/EngineConfigPage");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<EngineConfigPage engineId="headroom" />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    // Either a checkbox or a button that says "Ativar"
    const hasToggle =
      container.querySelector("input[type='checkbox'][data-toggle='enable']") !== null ||
      container.querySelector("[data-toggle='enable']") !== null ||
      container.textContent?.includes("Ativar") === true;

    expect(hasToggle).toBe(true);
  });

  it("renders the config form field label from fetched schema (EngineConfigForm mounted)", async () => {
    setupFetchMock();
    const { EngineConfigPage } =
      await import("../../../src/shared/components/compression/EngineConfigPage");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<EngineConfigPage engineId="headroom" />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    // EngineConfigForm should render the "Min rows" field label from the schema
    expect(container.textContent).toContain("Min rows");
  });

  it("shows empty-state text when analytics returns runs=0", async () => {
    setupFetchMock();
    const { EngineConfigPage } =
      await import("../../../src/shared/components/compression/EngineConfigPage");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<EngineConfigPage engineId="headroom" />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    // Should show some "no data" copy
    const hasEmptyState =
      container.textContent?.includes("Sem dados") === true ||
      container.textContent?.includes("No data") === true;
    expect(hasEmptyState).toBe(true);
  });

  it("does not crash when all fetch calls fail (fail-soft)", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network error"));

    const { EngineConfigPage } =
      await import("../../../src/shared/components/compression/EngineConfigPage");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<EngineConfigPage engineId="headroom" />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    // Component should still be mounted (not crashed)
    expect(container).toBeTruthy();
    expect(container.parentNode).toBeTruthy();
  });
});
