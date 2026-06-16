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
    expect(text).toContain("Pipeline de camadas ativo");
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
    expect(text).toContain("Ligar Token Saver");
    expect(text).toContain("só rodam no modo Stacked");
  });
});

describe("CompressionHub inline config", () => {
  function setupInlineMock(putSpy?: (body: unknown) => void) {
    const json = (body: unknown, status = 200) =>
      new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    const engines = {
      engines: [
        {
          id: "session-dedup",
          name: "Session Dedup",
          description: "Cross-turn dedup",
          icon: "content_copy",
          stackable: true,
          stackPriority: 3,
          metadata: { stable: true },
          configSchema: [
            { key: "minRows", type: "number", label: "Min rows", defaultValue: 3, min: 1, max: 99 },
          ],
        },
        {
          id: "llmlingua",
          name: "LLMLingua-2",
          description: "Semantic pruning",
          icon: "psychology",
          stackable: true,
          stackPriority: 35,
          metadata: { stable: false },
          configSchema: [],
        },
      ],
    };
    vi.spyOn(globalThis, "fetch").mockImplementation(
      async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = input.toString();
        if (url.includes("/api/settings/compression"))
          return json({ enabled: true, defaultMode: "stacked" });
        if (url.includes("/api/compression/engines")) return json(engines);
        if (url.includes("/api/context/combos/default")) {
          if (init?.method === "PUT") {
            putSpy?.(JSON.parse(String(init.body)));
            return json({ id: "default-caveman", pipeline: [{ engine: "session-dedup" }] });
          }
          return json({
            id: "default-caveman",
            name: "Standard Savings",
            pipeline: [{ engine: "session-dedup" }],
          });
        }
        return json({}, 404);
      }
    );
  }

  it("expands an inline config form when the gear of an active generic engine is clicked", async () => {
    const puts: unknown[] = [];
    setupInlineMock((b) => puts.push(b));
    const { default: CompressionHub } =
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionHub");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CompressionHub />);
    });
    await flush();

    // Form not shown until the gear is clicked
    expect(container.textContent ?? "").not.toContain("Min rows");

    const gear = container.querySelector<HTMLButtonElement>(
      'button[aria-label="Configurar camada"]'
    );
    expect(gear).toBeTruthy();
    await act(async () => {
      gear!.click();
    });
    await flush();

    const text = container.textContent ?? "";
    expect(text).toContain("Min rows"); // inline form field
    expect(text).toContain("Salvar"); // save button

    // Saving persists via PUT /default with enabled:true + config
    const save = [...container.querySelectorAll("button")].find((b) => b.textContent === "Salvar");
    await act(async () => {
      save!.click();
    });
    await flush();
    expect(puts.length).toBe(1);
    expect((puts[0] as { engineId: string }).engineId).toBe("session-dedup");
    expect((puts[0] as { enabled: boolean }).enabled).toBe(true);
  });

  it("flags experimental (stable:false) engines as in-development", async () => {
    setupInlineMock();
    const { default: CompressionHub } =
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionHub");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CompressionHub />);
    });
    await flush();

    const text = container.textContent ?? "";
    expect(text).toContain("experimental");
    expect(text).toContain("Em desenvolvimento");
  });
});

describe("CompressionCombosPageClient", () => {
  it("renders the Hub on top and the named-combos manager below", async () => {
    setupFetchMock({ enabled: true, mode: "stacked", pipeline: [{ engine: "rtk" }] });
    const { default: CompressionCombosPageClient } = await import(
      "../../../src/app/(dashboard)/dashboard/context/combos/CompressionCombosPageClient"
    );

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CompressionCombosPageClient />);
    });
    await flush();

    const text = container.textContent ?? "";
    expect(text).toContain("Compression Hub");
    expect(text).toContain("Combos nomeados");
  });
});
