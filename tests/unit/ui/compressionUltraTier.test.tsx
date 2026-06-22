// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// i18n does not resolve to a real locale in vitest/jsdom, so mock next-intl to echo
// the key. This test asserts ONLY on i18n-independent hooks (data-testid + values)
// and the captured PUT body.
vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));

const containers: HTMLElement[] = [];
const roots: Array<{ unmount: () => void }> = [];

function mount(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  roots.push(root);
  act(() => root.render(ui));
  return container;
}

beforeEach(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
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

function setupFetchMock(overrides?: Record<string, unknown>): { puts: CapturedPut[] } {
  const puts: CapturedPut[] = [];
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
  const initial = {
    enabled: true,
    autoTriggerTokens: 0,
    preserveSystemPrompt: true,
    engines: {},
    activeComboId: null,
    outputStyles: [],
    cavemanOutputMode: { enabled: false, intensity: "full", autoClarity: true },
    ultraEngine: "heuristic",
    ultraSlmPrewarm: false,
    ...overrides,
  };
  vi.spyOn(globalThis, "fetch").mockImplementation(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();
      const method = (init?.method ?? "GET").toUpperCase();
      if (url.includes("/api/settings/compression/mcp-accessibility")) return json({ enabled: true });
      if (url.includes("/api/settings/compression")) {
        if (method === "PUT") {
          const body = JSON.parse(String(init?.body ?? "{}"));
          puts.push({ url, body });
          return json({ ...initial, ...body });
        }
        return json(initial);
      }
      return json({}, 404);
    }
  );
  return { puts };
}

describe("CompressionPanel ultra SLM tier", () => {
  it("renders the ultra-engine select defaulting to heuristic", async () => {
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
      `[data-testid="ultra-engine-select"]`
    ) as HTMLSelectElement | null;
    expect(select, "ultra-engine select must render").toBeTruthy();
    expect(select?.value).toBe("heuristic");
    // The pre-warm toggle is hidden while heuristic is selected.
    expect(
      container.querySelector(`[data-testid="ultra-slm-prewarm-toggle"]`)
    ).toBeFalsy();
  });

  it("selecting SLM PUTs ultraEngine:'slm' and reveals the pre-warm toggle", async () => {
    const { puts } = setupFetchMock();
    const { default: CompressionPanel } = await import(
      "../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel"
    );
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const select = container.querySelector(
      `[data-testid="ultra-engine-select"]`
    ) as HTMLSelectElement;
    expect(select).toBeTruthy();
    await act(async () => {
      select.value = "slm";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await flush();

    const put = puts.find((p) => "ultraEngine" in p.body);
    expect(put, "a PUT carrying ultraEngine").toBeTruthy();
    expect(put!.body.ultraEngine).toBe("slm");

    // Pre-warm toggle now visible.
    const toggle = container.querySelector(`[data-testid="ultra-slm-prewarm-toggle"]`);
    expect(toggle, "pre-warm toggle must appear when slm is selected").toBeTruthy();
  });

  it("toggling pre-warm PUTs ultraSlmPrewarm:true when SLM is active", async () => {
    const { puts } = setupFetchMock({ ultraEngine: "slm", ultraSlmPrewarm: false });
    const { default: CompressionPanel } = await import(
      "../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel"
    );
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const toggle = container.querySelector(
      `[data-testid="ultra-slm-prewarm-toggle"] button, [data-testid="ultra-slm-prewarm-toggle"] input`
    ) as HTMLElement | null;
    expect(toggle, "pre-warm toggle must exist when slm preselected").toBeTruthy();
    await act(async () => {
      toggle!.click();
    });
    await flush();

    const put = puts.find((p) => "ultraSlmPrewarm" in p.body);
    expect(put, "a PUT carrying ultraSlmPrewarm").toBeTruthy();
    expect(put!.body.ultraSlmPrewarm).toBe(true);
  });
});
