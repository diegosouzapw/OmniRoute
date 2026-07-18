// @vitest-environment jsdom
//
// #7530 — in-product guidance for Prompt Compression engines.
// Asserts the Settings -> Prompt Compression panel surfaces each engine's guidance
// detail (expand/collapse), shows the "safe default" indicator only for lossless
// engines, and links out to the full compression guide.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  ENGINE_IDS,
  engineMeta,
  isSafeDefault,
} from "../../../open-sse/services/compression/engineCatalog.ts";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

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

function setupFetchMock() {
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  const initialConfig = {
    enabled: true,
    autoTriggerTokens: 0,
    preserveSystemPrompt: true,
    engines: {},
    activeComboId: null,
    cavemanOutputMode: { enabled: false, intensity: "full", autoClarity: true },
  };

  vi.spyOn(globalThis, "fetch").mockImplementation(async (input: RequestInfo | URL) => {
    const url = input.toString();
    if (url.includes("/api/settings/compression/mcp-accessibility")) {
      return json({ enabled: true, maxTextChars: 50000 });
    }
    if (url.includes("/api/settings/compression")) {
      return json(initialConfig);
    }
    return json({}, 404);
  });
}

describe("CompressionPanel — engine guidance (#7530)", () => {
  it("links to the full compression guide", async () => {
    setupFetchMock();
    const { default: CompressionPanel } = await import(
      "@/app/(dashboard)/dashboard/context/settings/CompressionPanel"
    );

    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const link = container.querySelector('[data-testid="compression-guide-link"]');
    expect(link).toBeTruthy();
    expect(link?.getAttribute("href")).toContain("docs/compression/COMPRESSION_GUIDE.md");
  });

  it("shows the safe-default badge only for lossless engines", async () => {
    setupFetchMock();
    const { default: CompressionPanel } = await import(
      "@/app/(dashboard)/dashboard/context/settings/CompressionPanel"
    );

    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    for (const id of ENGINE_IDS) {
      const badge = container.querySelector(`[data-testid="engine-safe-default-${id}"]`);
      if (isSafeDefault(id)) {
        expect(badge, `${id} is lossless — expected the safe-default badge`).toBeTruthy();
      } else {
        expect(badge, `${id} is lossy — should NOT show the safe-default badge`).toBeFalsy();
      }
    }
  });

  it("expands an engine's guidance detail (tradeoffs + cache impact) on toggle", async () => {
    setupFetchMock();
    const { default: CompressionPanel } = await import(
      "@/app/(dashboard)/dashboard/context/settings/CompressionPanel"
    );

    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const engineId = "caveman";
    expect(
      container.querySelector(`[data-testid="engine-guidance-detail-${engineId}"]`)
    ).toBeFalsy();

    const toggle = container.querySelector(
      `[data-testid="engine-guidance-toggle-${engineId}"]`
    ) as HTMLButtonElement | null;
    expect(toggle, "guidance toggle button must exist").toBeTruthy();

    await act(async () => {
      toggle!.click();
    });
    await flush();

    const detail = container.querySelector(`[data-testid="engine-guidance-detail-${engineId}"]`);
    expect(detail).toBeTruthy();
    expect(detail?.textContent).toContain(engineMeta(engineId).guidance.tradeoffs);
  });
});
