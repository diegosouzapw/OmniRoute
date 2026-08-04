// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { OUTPUT_STYLE_IDS } from "../../../open-sse/services/compression/outputStyles/catalog.ts";

// Locale is mutable per-test so we can exercise the locale gate (terse-cjk → zh only).
const intl = vi.hoisted(() => ({ locale: "en" }));
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => intl.locale,
}));

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
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  intl.locale = "en";
});

afterEach(async () => {
  vi.restoreAllMocks();
  await act(async () => {
    while (roots.length > 0) roots.pop()?.unmount();
  });
  while (containers.length > 0) containers.pop()?.remove();
  document.body.innerHTML = "";
});

async function flush() {
  await act(async () => {
    for (let i = 0; i < 10; i++) await Promise.resolve();
  });
}

function setupFetchMock() {
  const puts: Array<{ url: string; body: Record<string, unknown> }> = [];
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
  };
  vi.spyOn(globalThis, "fetch").mockImplementation(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();
      const method = (init?.method ?? "GET").toUpperCase();
      if (url.includes("/api/settings/compression/mcp-accessibility"))
        return json({ enabled: true });
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

describe("CompressionPanel output styles", () => {
  it("renders one row per catalog style", async () => {
    setupFetchMock();
    intl.locale = "zh-CN"; // a locale that matches every gated style, so all rows render
    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();
    for (const id of OUTPUT_STYLE_IDS) {
      const row = container.querySelector(`[data-testid="output-style-row-${id}"]`);
      expect(row, `expected a row for style "${id}"`).toBeTruthy();
      expect(row?.textContent).toContain(`compressionOutputStyle.${id}.label`);
    }
  });

  it("locale-gates terse-cjk: hidden under a non-zh locale", async () => {
    setupFetchMock();
    intl.locale = "en";
    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();
    // terse-cjk (locale "zh") must NOT be offered under "en"…
    expect(container.querySelector(`[data-testid="output-style-row-terse-cjk"]`)).toBeFalsy();
    // …while the non-gated styles still render.
    expect(container.querySelector(`[data-testid="output-style-row-terse-prose"]`)).toBeTruthy();
    expect(container.querySelector(`[data-testid="output-style-row-less-code"]`)).toBeTruthy();
  });

  it("locale-gates terse-cjk: offered under a zh locale (zh-CN base matches)", async () => {
    setupFetchMock();
    intl.locale = "zh-CN";
    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();
    expect(container.querySelector(`[data-testid="output-style-row-terse-cjk"]`)).toBeTruthy();
  });

  it("toggling a style PUTs an outputStyles selection", async () => {
    const { puts } = setupFetchMock();
    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();
    const toggle = container.querySelector(
      `[data-testid="output-style-toggle-terse-prose"] button, [data-testid="output-style-toggle-terse-prose"] input`
    ) as HTMLElement | null;
    expect(toggle).toBeTruthy();
    await act(async () => {
      toggle!.click();
    });
    await flush();
    const put = puts.find((p) => "outputStyles" in p.body);
    expect(put, "a PUT carrying outputStyles").toBeTruthy();
    expect(
      (put!.body.outputStyles as Array<{ id: string }>).some((s) => s.id === "terse-prose")
    ).toBe(true);
  });
});
