// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { SAMPLE_METRICS } from "../../../src/app/(dashboard)/dashboard/context/omniglyph/sampleData.ts";

// i18n is not resolved in vitest/jsdom; the page hardcodes its engine copy in English
// anyway (catalog convention), so no next-intl mock is needed. Asserts are on
// i18n-independent content: headings, measured numbers, gate labels, data-testid hooks.

// ── Harness (mirrors tests/unit/ui/compressionPanel.test.tsx) ──────────────────
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

  // omniglyph absent from `engines` initially → disabled; rtk/caveman present so we can
  // assert they SURVIVE the PUT (the store persists the whole map as one row).
  const initialConfig = {
    enabled: true,
    engines: { rtk: { enabled: true, level: "standard" }, caveman: { enabled: false } },
  };

  vi.spyOn(globalThis, "fetch").mockImplementation(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();
      const method = (init?.method ?? "GET").toUpperCase();
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

// ── Tests ──────────────────────────────────────────────────────────────────────
describe("OmniglyphContextPage", () => {
  it("renders the four sections with the measured numbers and the real render", async () => {
    setupFetchMock();
    const { default: Page } = await import(
      "../../../src/app/(dashboard)/dashboard/context/omniglyph/OmniglyphContextPageClient"
    );
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<Page />);
    });
    await flush();

    const text = container.textContent ?? "";
    // Header + preview status
    expect(text).toContain("OmniGlyph");
    expect(text).toContain("Preview");
    // Economics
    expect(text).toContain("~10×");
    expect(text).toContain("59–70%");
    // Before → after: measured savings + the real rendered image
    expect(text).toContain(`−${SAMPLE_METRICS.savingsPct}% tokens on this block`);
    const img = container.querySelector("img");
    expect(img, "the rendered sample page <img> must be present").toBeTruthy();
    expect(img!.getAttribute("src")).toMatch(/^data:image\/png;base64,/);
    // Gates
    expect(text).toContain("claude-fable-5");
    expect(text).toContain("direct Anthropic");
    // Config control
    expect(container.querySelector('[data-testid="omniglyph-enable-toggle"]')).toBeTruthy();
  });

  it("enabling the engine PUTs the full engines map with omniglyph on, preserving the others", async () => {
    const { puts } = setupFetchMock();
    const { default: Page } = await import(
      "../../../src/app/(dashboard)/dashboard/context/omniglyph/OmniglyphContextPageClient"
    );
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<Page />);
    });
    await flush();

    const toggle = container.querySelector('[data-testid="omniglyph-enable-toggle"] button') as HTMLButtonElement | null;
    expect(toggle, "enable toggle button must exist").toBeTruthy();
    await act(async () => {
      toggle!.click();
    });
    await flush();

    expect(puts.length).toBe(1);
    const engines = puts[0]!.body.engines as Record<string, { enabled: boolean }>;
    expect(engines.omniglyph).toEqual({ enabled: true });
    // The other engines must survive the whole-map PUT.
    expect(engines.rtk?.enabled).toBe(true);
    expect(engines.caveman?.enabled).toBe(false);
  });
});
