// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// ── Helpers ───────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];
const roots: Array<{ unmount: () => void }> = [];

function mountInContainer(ui: React.ReactElement): HTMLElement {
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
  // Restore mocks first so any in-flight fetch promises settle without blocking
  vi.restoreAllMocks();
  await act(async () => {
    while (roots.length > 0) {
      roots.pop()?.unmount();
    }
  });
  // Drain all remaining microtasks from effects that fired during unmount
  for (let i = 0; i < 10; i++) {
    await Promise.resolve();
  }
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
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
          key: "enabled",
          type: "boolean",
          label: "Enabled",
          defaultValue: true,
        },
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

const SETTINGS_PAYLOAD = {
  enabled: true,
  engines: { headroom: { enabled: true } },
  aggressive: {
    summarizerEnabled: true,
    maxTokensPerMessage: 2048,
    minSavingsThreshold: 0.05,
  },
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
    if (url.includes("/api/settings/compression")) {
      return new Response(JSON.stringify(SETTINGS_PAYLOAD), {
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
    if (url.includes("/api/compression/preview")) {
      return new Response(
        JSON.stringify({
          original: "The original context contains duplicated details and verbose wording.",
          compressed: "Original context, deduplicated.",
          originalTokens: 11,
          compressedTokens: 4,
          savingsPct: 63.6,
          diff: [{ type: "removed", text: "duplicated details and verbose wording" }],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
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

  it("does NOT render an engine on/off enable toggle (moved to the panel)", async () => {
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

    // The on/off enable control now lives only in the panel (/dashboard/context/settings).
    expect(container.querySelector("[data-toggle='enable']")).toBeNull();
    expect(container.textContent).not.toContain("Enable layer");
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

  it("keeps detailed config but renders no engine enable checkbox", async () => {
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

    // The on/off enable toggle (a checkbox with data-toggle="enable") is gone; the
    // detailed config form (the schema fields minus `enabled`) still renders.
    expect(container.querySelector("input[type='checkbox'][data-toggle='enable']")).toBeNull();
    expect(container.textContent).toContain("Min rows");
    expect(container.textContent).toContain("Configuration");
  });

  it("renders preview original, compressed text, and diff returned by the API", async () => {
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

    const previewButton = Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent === "Preview"
    );
    expect(previewButton).toBeTruthy();

    await act(async () => {
      previewButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await Promise.resolve();
    });

    expect(container.textContent).toContain(
      "The original context contains duplicated details and verbose wording."
    );
    expect(container.textContent).toContain("Original context, deduplicated.");
    expect(container.textContent).toContain("Diff");
    expect(container.textContent).toContain("duplicated details and verbose wording");
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

  it("points to the Compression Settings panel for enabling the layer", async () => {
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

    // The on/off + level live in the panel now; the page surfaces a link to it.
    const settingsLink = container.querySelector('a[href="/dashboard/context/settings"]');
    expect(settingsLink).not.toBeNull();
    expect(container.textContent).toContain("Compression Settings");
  });

  it("INVARIANT #1: handleSave writes the detailed sub-object to settings/compression, never PUTs combos/default", async () => {
    const AGGRESSIVE_PAYLOAD = {
      engines: [
        {
          id: "aggressive",
          name: "Aggressive",
          description: "Aggressive engine",
          icon: "🗜️",
          stackable: true,
          stackPriority: 30,
          metadata: { description: "Aggressive metadata" },
          configSchema: [
            { key: "enabled", type: "boolean", label: "Enabled", defaultValue: true },
            {
              key: "maxTokensPerMessage",
              type: "number",
              label: "Max tokens per message",
              defaultValue: 2048,
            },
          ],
        },
      ],
    };
    const settingsPuts: { body: Record<string, unknown> }[] = [];
    const comboWrites: { method: string }[] = [];
    vi.spyOn(globalThis, "fetch").mockImplementation(
      async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = input.toString();
        if (url.includes("/api/compression/engines")) {
          return new Response(JSON.stringify(AGGRESSIVE_PAYLOAD), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
        if (url.includes("/api/settings/compression")) {
          if (init?.method === "PUT") {
            settingsPuts.push({ body: JSON.parse(init.body as string) });
          }
          return new Response(
            JSON.stringify({
              enabled: true,
              engines: { aggressive: { enabled: true } },
              aggressive: { maxTokensPerMessage: 2048 },
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }
        if (url.includes("/api/context/combos/default")) {
          // A PUT/POST here would violate INVARIANT #1 (the route is a 410 shim).
          if (init?.method === "PUT" || init?.method === "POST") {
            comboWrites.push({ method: init.method });
          }
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
      }
    );

    const { EngineConfigPage } =
      await import("../../../src/shared/components/compression/EngineConfigPage");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<EngineConfigPage engineId="aggressive" />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    const salvarBtn = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("Save") || b.textContent?.includes("Salvar")
    );
    expect(salvarBtn).toBeTruthy();
    await act(async () => {
      salvarBtn?.click();
    });
    await act(async () => {
      await Promise.resolve();
    });

    // INVARIANT #1: no write ever lands on the deprecated default-combo route.
    expect(comboWrites).toHaveLength(0);
    // The detailed config persists to the engine's sub-object on settings/compression.
    expect(settingsPuts.length).toBeGreaterThan(0);
    const aggressivePut = settingsPuts.find(
      (c) => typeof c.body.aggressive === "object" && c.body.aggressive !== null
    );
    expect(aggressivePut).toBeDefined();
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
