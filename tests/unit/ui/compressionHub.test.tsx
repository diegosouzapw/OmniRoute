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

// ── Mock fetch ────────────────────────────────────────────────────────────

const ENGINES = [
  { id: "session-dedup", name: "Session Dedup", stackPriority: 3, stable: true },
  { id: "rtk", name: "RTK", stackPriority: 10, stable: true },
  { id: "caveman", name: "Caveman", stackPriority: 20, stable: true },
  { id: "llmlingua", name: "LLMLingua-2", stackPriority: 35, stable: false },
];

function enginePayload() {
  return {
    engines: ENGINES.map((e) => ({
      id: e.id,
      name: e.name,
      description: `${e.name} description`,
      icon: "compress",
      stackable: true,
      stackPriority: e.stackPriority,
      metadata: { stable: e.stable },
      configSchema: [],
    })),
  };
}

function setupFetchMock(opts: {
  enabled?: boolean;
  mode?: string;
  pipeline?: Array<{ engine: string }>;
}) {
  const { enabled = true, mode = "stacked", pipeline = [{ engine: "rtk" }] } = opts;
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  vi.spyOn(globalThis, "fetch").mockImplementation(async (input: RequestInfo | URL) => {
    const url = input.toString();
    if (url.includes("/api/settings/compression")) {
      return json({ enabled, defaultMode: mode });
    }
    if (url.includes("/api/compression/engines")) {
      return json(enginePayload());
    }
    if (url.includes("/api/context/combos/default")) {
      return json({ id: "default-caveman", name: "Standard Savings", pipeline });
    }
    if (url.includes("/api/context/combos")) {
      return json({ combos: [] });
    }
    if (url.includes("/api/combos")) {
      return json({ combos: [] });
    }
    if (url.includes("/api/compression/language-packs")) {
      return json({ packs: [] });
    }
    return json({}, 404);
  });
}

async function flush() {
  await act(async () => {
    for (let i = 0; i < 10; i++) await Promise.resolve();
  });
}

// ── Tests ─────────────────────────────────────────────────────────────────

describe("CompressionHub", () => {
  it("renders the master switch, mode selector, and the layered pipeline", async () => {
    setupFetchMock({ enabled: true, mode: "stacked", pipeline: [{ engine: "rtk" }] });
    const { default: CompressionHub } =
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionHub");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CompressionHub />);
    });
    await flush();

    const text = container.textContent ?? "";
    expect(text).toContain("Compression Hub");
    expect(text).toContain("Token Saver");
    expect(text).toContain("Stacked");
    // Active pipeline engine (from the default combo) renders
    expect(text).toContain("RTK");
    // Inactive engines from the catalog render too
    expect(text).toContain("Caveman");
    // Active-pipeline callout shows when enabled && stacked
    expect(text).toContain("Layer pipeline is active");
  });

  it("INVARIANT #1: no per-layer control issues a PUT/POST to /api/context/combos/default", { timeout: 20000 }, async () => {
    const comboWrites: { method: string }[] = [];
    const json = (body: unknown, status = 200) =>
      new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    vi.spyOn(globalThis, "fetch").mockImplementation(
      async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = input.toString();
        if (url.includes("/api/context/combos/default")) {
          if (init?.method === "PUT" || init?.method === "POST") {
            comboWrites.push({ method: init.method });
          }
          return json({ id: "default", name: "Default", pipeline: [{ engine: "rtk" }] });
        }
        if (url.includes("/api/settings/compression")) {
          return json({ enabled: true, defaultMode: "stacked" });
        }
        if (url.includes("/api/compression/engines")) {
          return json(enginePayload());
        }
        if (url.includes("/api/context/combos") || url.includes("/api/combos")) {
          return json({ combos: [] });
        }
        if (url.includes("/api/compression/language-packs")) {
          return json({ packs: [] });
        }
        return json({}, 404);
      }
    );

    const { default: CompressionHub } =
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionHub");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CompressionHub />);
    });
    await flush();

    // Click every on/off switch in the Hub (master + any layer controls that remain).
    const switches = Array.from(container.querySelectorAll('[role="switch"]'));
    for (const sw of switches) {
      await act(async () => {
        (sw as HTMLElement).click();
      });
      await flush();
    }

    expect(comboWrites).toHaveLength(0);
  });

  it("shows the activation warning when Token Saver is off", async () => {
    setupFetchMock({ enabled: false, mode: "off", pipeline: [] });
    const { default: CompressionHub } =
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionHub");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CompressionHub />);
    });
    await flush();

    const text = container.textContent ?? "";
    expect(text).toContain("Enable Token Saver");
    expect(text).toContain("only run in Stacked mode");
  });
});

describe("CompressionCombosPageClient", () => {
  it("renders the Hub on top and the named-combos manager below", async () => {
    setupFetchMock({ enabled: true, mode: "stacked", pipeline: [{ engine: "rtk" }] });
    const { default: CompressionCombosPageClient } =
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionCombosPageClient");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CompressionCombosPageClient />);
    });
    await flush();

    const text = container.textContent ?? "";
    expect(text).toContain("Compression Hub");
    expect(text).toContain("Named combos");
  });
});
