// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// ── Mock next-intl ─────────────────────────────────────────────────────────
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// ── Helpers ────────────────────────────────────────────────────────────────

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

// ── Mock fetch ─────────────────────────────────────────────────────────────

const COMBOS_PAYLOAD = {
  combos: [
    {
      id: "default-caveman",
      name: "Standard",
      description: "",
      pipeline: [
        { engine: "rtk", intensity: "standard" },
        { engine: "caveman", intensity: "full" },
      ],
      languagePacks: ["en"],
      outputMode: false,
      outputModeIntensity: "full",
      isDefault: true,
    },
  ],
};

const ROUTING_COMBOS_PAYLOAD = { combos: [] };

const LANGUAGE_PACKS_PAYLOAD = { packs: [] };

const ENGINES_PAYLOAD = {
  engines: [
    { id: "rtk", name: "RTK", icon: "filter_alt", stackPriority: 10, configSchema: [] },
    { id: "caveman", name: "Caveman", icon: "compress", stackPriority: 20, configSchema: [] },
    {
      id: "headroom",
      name: "Headroom",
      icon: "table_rows",
      stackPriority: 15,
      configSchema: [{ key: "minRows", type: "number", label: "Min rows", defaultValue: 8 }],
    },
  ],
};

// Individual assignment endpoints return empty assignments
const ASSIGNMENTS_PAYLOAD = { assignments: [] };

function setupFetchMock() {
  vi.spyOn(globalThis, "fetch").mockImplementation(async (input: RequestInfo | URL) => {
    const url = input.toString();
    if (url.includes("/api/compression/engines")) {
      return new Response(JSON.stringify(ENGINES_PAYLOAD), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (url.match(/\/api\/context\/combos\/[^/]+\/assignments/)) {
      return new Response(JSON.stringify(ASSIGNMENTS_PAYLOAD), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (url.includes("/api/context/combos")) {
      return new Response(JSON.stringify(COMBOS_PAYLOAD), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (url.includes("/api/combos")) {
      return new Response(JSON.stringify(ROUTING_COMBOS_PAYLOAD), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (url.includes("/api/compression/language-packs")) {
      return new Response(JSON.stringify(LANGUAGE_PACKS_PAYLOAD), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({}), { status: 404 });
  });
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe("CompressionCombosPageClient", () => {
  it("renders the saved combo card with its name", async () => {
    setupFetchMock();

    const CompressionCombosPageClient = (
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionCombosPageClient")
    ).default;

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CompressionCombosPageClient />);
    });

    // Flush async fetch effects
    await act(async () => {
      await Promise.resolve();
    });
    await act(async () => {
      await Promise.resolve();
    });

    // The combo card should be visible
    expect(container.textContent).toContain("Standard");
  });

  it("shows RTK and Caveman in active pipeline after editing the default combo", async () => {
    setupFetchMock();

    const CompressionCombosPageClient = (
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionCombosPageClient")
    ).default;

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CompressionCombosPageClient />);
    });

    // Flush fetch effects so the combo list renders
    await act(async () => {
      await Promise.resolve();
    });
    await act(async () => {
      await Promise.resolve();
    });

    // Click "editCombo" on the rendered combo card (button text = i18n key "editCombo")
    const editButtons = Array.from(container.querySelectorAll("button")).filter((b) =>
      b.textContent?.includes("editCombo")
    );
    expect(editButtons.length).toBeGreaterThan(0);

    await act(async () => {
      (editButtons[0] as HTMLButtonElement).click();
    });

    // Flush the async loadAssignments call inside editCombo
    await act(async () => {
      await Promise.resolve();
    });

    // The pipeline editor should now show the two active layers by display name
    const text = container.textContent ?? "";
    expect(text).toContain("RTK");
    expect(text).toContain("Caveman");
  });

  it("shows Headroom as an available engine to add", async () => {
    setupFetchMock();

    const CompressionCombosPageClient = (
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionCombosPageClient")
    ).default;

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CompressionCombosPageClient />);
    });

    // Flush fetch effects
    await act(async () => {
      await Promise.resolve();
    });
    await act(async () => {
      await Promise.resolve();
    });

    // Click edit on the combo to load the pipeline editor
    const editButtons = Array.from(container.querySelectorAll("button")).filter((b) =>
      b.textContent?.includes("editCombo")
    );
    await act(async () => {
      (editButtons[0] as HTMLButtonElement).click();
    });

    await act(async () => {
      await Promise.resolve();
    });

    // Headroom is not in the active pipeline, so it should appear as available
    expect(container.textContent).toContain("Headroom");
  });

  it("does not crash when engine catalog fetch fails (fail-soft)", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input: RequestInfo | URL) => {
      const url = input.toString();
      if (url.includes("/api/compression/engines")) {
        return new Response("error", { status: 500 });
      }
      if (url.includes("/api/context/combos")) {
        return new Response(JSON.stringify(COMBOS_PAYLOAD), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({}), { status: 200 });
    });

    const CompressionCombosPageClient = (
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionCombosPageClient")
    ).default;

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CompressionCombosPageClient />);
    });

    await act(async () => {
      await Promise.resolve();
    });
    await act(async () => {
      await Promise.resolve();
    });

    // Component should still be mounted without crashing
    expect(container).toBeTruthy();
    expect(container.parentNode).toBeTruthy();
  });
});
