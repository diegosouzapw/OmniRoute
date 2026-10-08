// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../src/i18n/messages/en.json";

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
    root.render(
      <NextIntlClientProvider locale="en" messages={{ contextCombos: messages.contextCombos }}>
        {ui}
      </NextIntlClientProvider>
    );
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
  // NOTE: the master Token Saver toggle, mode selector, and layered-pipeline
  // preview this describe block used to assert on were removed by the Phase 2
  // Hub redesign (see the "Phase 2" comment at the top of CompressionHub.tsx —
  // the Hub is now a thin overview with just an active-profile selector + the
  // Context Editing toggle). That redesign, including the explicit assertion
  // that the master toggle/mode selector/reorder buttons no longer render, is
  // covered by compressionHub-active-selector.test.tsx.

  it(
    "INVARIANT #1: no per-layer control issues a PUT/POST to /api/context/combos/default",
    { timeout: 20000 },
    async () => {
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
    }
  );
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

describe("CompressionHub when the settings GET fails", () => {
  // The settings GET fails as it does while the server restarts; the combos GET keeps
  // answering. A failed load must offer a retry instead of the default-profile view,
  // whose select and Context Editing toggle would save the defaults over the stored row.
  const FAILURES = {
    "a 500": async () => new Response(JSON.stringify({ error: "unavailable" }), { status: 500 }),
    "a network error": async () => {
      throw new TypeError("Failed to fetch");
    },
  };

  function failSettingsGet(failure: keyof typeof FAILURES) {
    const json = (body: unknown, status = 200) =>
      new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input: RequestInfo | URL) => {
      const url = input.toString();
      if (url.includes("/api/settings/compression")) return FAILURES[failure]();
      if (url.includes("/api/context/combos")) return json({ combos: [] });
      return json({}, 404);
    });
  }

  async function mountHub() {
    const { default: CompressionHub } =
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionHub");
    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CompressionHub />);
    });
    await flush();
    return container;
  }

  function retryButton(container: HTMLElement) {
    return Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent === "Retry"
    );
  }

  it.each(Object.keys(FAILURES) as Array<keyof typeof FAILURES>)(
    "shows a retry in place of the default-profile view after %s",
    { timeout: 20000 },
    async (failure) => {
      failSettingsGet(failure);
      const container = await mountHub();

      expect(container.querySelector('[data-testid="active-profile-select"]')).toBeNull();
      expect(container.querySelectorAll('[role="switch"]')).toHaveLength(0);
      expect(container.textContent).toContain("Failed To Load");
      expect(retryButton(container)).toBeTruthy();
    }
  );

  it("returns with the stored settings once Retry answers", async () => {
    const json = (body: unknown, status = 200) =>
      new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockImplementation(async (input: RequestInfo | URL) => {
        const url = input.toString();
        if (url.includes("/api/settings/compression")) {
          return json({ enabled: true, defaultMode: "rtk", contextEditing: { enabled: true } });
        }
        if (url.includes("/api/context/combos")) {
          return json({
            combos: [{ id: "c1", name: "Alpha", pipeline: [{ engine: "rtk" }] }],
          });
        }
        return json({}, 404);
      });
    // The Hub's first call is the settings GET; only it fails.
    fetchSpy.mockImplementationOnce(
      async () => new Response(JSON.stringify({ error: "unavailable" }), { status: 500 })
    );
    const container = await mountHub();
    expect(container.textContent).toContain("Failed To Load");

    await act(async () => {
      retryButton(container)!.click();
    });
    await flush();

    expect(container.textContent).not.toContain("Failed To Load");
    // The stored row has Context Editing on, which the defaults do not.
    const toggle = container.querySelector('[role="switch"]');
    expect(toggle?.getAttribute("aria-checked")).toBe("true");
    const select = container.querySelector(
      '[data-testid="active-profile-select"]'
    ) as HTMLSelectElement | null;
    expect(Array.from(select?.options ?? []).some((option) => option.text === "Alpha")).toBe(true);
  });
});
