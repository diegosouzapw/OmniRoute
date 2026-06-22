// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

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
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
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

function combo(id: string, name: string) {
  return {
    id,
    name,
    description: `${name} desc`,
    pipeline: [{ engine: "rtk", intensity: "standard" }],
    languagePacks: ["en"],
    outputMode: false,
    outputModeIntensity: "full",
    isDefault: false,
  };
}

function setupFetchMock() {
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
  const combos = [combo("c1", "Alpha"), combo("c2", "Bravo")];
  vi.spyOn(globalThis, "fetch").mockImplementation(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = input.toString();
    void init;
    if (url.includes("/api/context/combos/") && url.includes("/assignments")) return json({ assignments: [] });
    if (url.includes("/api/context/combos")) return json({ combos });
    if (url.includes("/api/combos")) return json({ combos: [] });
    if (url.includes("/api/compression/language-packs")) return json({ packs: [] });
    if (url.includes("/api/settings/compression")) return json({ activeComboId: "c2", enabled: true });
    return json({}, 404);
  });
}

describe("NamedCombosManager — active badge, no set-as-default", () => {
  async function render() {
    const { default: CompressionCombosPageClient } = await import(
      "../../../src/app/(dashboard)/dashboard/context/combos/CompressionCombosPageClient"
    );
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionCombosPageClient />);
    });
    await flush();
    return container;
  }

  it("renders no 'Set as default' button", async () => {
    setupFetchMock();
    const container = await render();
    expect(container.textContent).not.toContain("Set as default");
  });

  it("shows the '● Active' badge only on the combo whose id === activeComboId", async () => {
    setupFetchMock();
    const container = await render();
    expect(container.querySelector('[data-testid="active-badge-c2"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="active-badge-c1"]')).toBeNull();
  });
});
