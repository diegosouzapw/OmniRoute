// @vitest-environment jsdom
// The server merges the `engines` map by engine id, so the context settings panel sends only
// the engine a control changed. A whole-map PUT built from the panel's copy would overwrite
// engines another page (the Omniglyph page, the MCP tool) changed after the panel loaded.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    values ? `${key} ${Object.values(values).join(" ")}` : key,
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

function setupFetchMock(): { settingsPuts: Array<Record<string, unknown>> } {
  const settingsPuts: Array<Record<string, unknown>> = [];
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
  const initialConfig = {
    enabled: true,
    engines: { rtk: { enabled: true, level: "standard" }, caveman: { enabled: false } },
    activeComboId: null,
  };

  vi.spyOn(globalThis, "fetch").mockImplementation(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();
      const method = (init?.method ?? "GET").toUpperCase();
      if (url.includes("/api/settings/compression/mcp-accessibility")) {
        return json({ enabled: true, maxTextChars: 50000 });
      }
      if (url.includes("/api/settings/compression")) {
        if (method === "PUT") {
          const body = JSON.parse(String(init?.body ?? "{}"));
          settingsPuts.push(body);
          return json({ ...initialConfig, ...body });
        }
        return json(initialConfig);
      }
      return json({}, 404);
    }
  );
  return { settingsPuts };
}

async function mountPanel(): Promise<HTMLElement> {
  const { default: CompressionPanel } =
    await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
  let container!: HTMLElement;
  await act(async () => {
    container = mount(<CompressionPanel />);
  });
  await flush();
  return container;
}

function engineSwitch(container: HTMLElement, id: string): HTMLButtonElement {
  const button = container.querySelector(
    `[data-testid="engine-toggle-${id}"] button`
  ) as HTMLButtonElement | null;
  expect(button, `${id} toggle must exist`).toBeTruthy();
  return button!;
}

async function click(button: HTMLButtonElement) {
  await act(async () => {
    button.click();
  });
  await flush();
}

describe("CompressionPanel engines partial writes", () => {
  it("toggling one engine PUTs only that engine and keeps the others on screen", async () => {
    const { settingsPuts } = setupFetchMock();
    const container = await mountPanel();

    await click(engineSwitch(container, "caveman"));

    expect(settingsPuts).toEqual([{ engines: { caveman: { enabled: true } } }]);
    expect(engineSwitch(container, "caveman").getAttribute("aria-checked")).toBe("true");
    expect(engineSwitch(container, "rtk").getAttribute("aria-checked")).toBe("true");
  });

  it("toggling two engines in turn sends each one alone and keeps both on screen", async () => {
    const { settingsPuts } = setupFetchMock();
    const container = await mountPanel();

    await click(engineSwitch(container, "caveman"));
    await click(engineSwitch(container, "lite"));

    expect(settingsPuts).toEqual([
      { engines: { caveman: { enabled: true } } },
      { engines: { lite: { enabled: true } } },
    ]);
    for (const id of ["rtk", "caveman", "lite"]) {
      expect(engineSwitch(container, id).getAttribute("aria-checked"), id).toBe("true");
    }
  });

  it("changing an engine level PUTs that engine with its current switch state", async () => {
    const { settingsPuts } = setupFetchMock();
    const container = await mountPanel();
    const select = container.querySelector(
      `[data-testid="engine-row-rtk"] select`
    ) as HTMLSelectElement | null;
    expect(select, "rtk level select must exist").toBeTruthy();

    await act(async () => {
      select!.value = "aggressive";
      select!.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await flush();

    expect(settingsPuts).toEqual([{ engines: { rtk: { enabled: true, level: "aggressive" } } }]);
  });
});
