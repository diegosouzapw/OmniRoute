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

function compressionCombo(id: string, name: string) {
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
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  const routingCombos = [
    { id: "rc1", name: "Routing Alpha", config: { compressionMode: "lite" } },
    { id: "rc2", name: "Routing Bravo" },
  ];
  vi.spyOn(globalThis, "fetch").mockImplementation(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();
      calls.push({ url, init });
      if (url.includes("/api/context/combos/") && url.includes("/assignments")) {
        return json({ assignments: [] });
      }
      if (url.includes("/api/context/combos")) {
        return json({ combos: [compressionCombo("cc1", "Named Combo")] });
      }
      if (url.includes("/api/combos/")) {
        return json({ ok: true });
      }
      if (url.includes("/api/combos")) {
        return json({ combos: routingCombos });
      }
      if (url.includes("/api/compression/language-packs")) {
        return json({ packs: [] });
      }
      if (url.includes("/api/settings/compression")) {
        return json({ activeComboId: null, enabled: true });
      }
      return json({}, 404);
    }
  );
  return calls;
}

describe("CompressionCombosPageClient — routing-combo compression mode selector (#6760)", () => {
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

  it("renders a compression-mode select per routing combo, hydrated from combo.config", async () => {
    setupFetchMock();
    const container = await render();
    expect(container.textContent).toContain("Routing Alpha");
    expect(container.textContent).toContain("Routing Bravo");
    const selects = Array.from(container.querySelectorAll("select")) as HTMLSelectElement[];
    // one per routing combo (2) — the shared ComboCompressionModeSelect renders exactly
    // the 6-option Default/Off/Lite/Standard/Aggressive/Ultra set.
    const modeSelects = selects.filter((s) => {
      const values = Array.from(s.options).map((o) => o.value);
      return values.join(",") === ",off,lite,standard,aggressive,ultra";
    });
    expect(modeSelects).toHaveLength(2);
    expect(modeSelects[0].value).toBe("lite");
    expect(modeSelects[1].value).toBe("");
  });

  it("changing the routing combo's selector PUTs /api/combos/{id} independently of the assignment checkbox", async () => {
    const calls = setupFetchMock();
    const container = await render();
    const selects = Array.from(container.querySelectorAll("select")) as HTMLSelectElement[];
    const modeSelects = selects.filter((s) => {
      const values = Array.from(s.options).map((o) => o.value);
      return values.join(",") === ",off,lite,standard,aggressive,ultra";
    });
    await act(async () => {
      modeSelects[0].value = "ultra";
      modeSelects[0].dispatchEvent(new Event("change", { bubbles: true }));
    });
    await flush();

    const putCalls = calls.filter(
      (c) => c.url === "/api/combos/rc1" && c.init?.method === "PUT"
    );
    expect(putCalls).toHaveLength(1);
    const body = JSON.parse(putCalls[0].init?.body as string);
    expect(body).toEqual({ config: { compressionMode: "ultra" } });

    // The assignment checkbox for the same routing combo still toggles independently.
    const checkbox = container.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement | null;
    expect(checkbox).toBeTruthy();
    const before = checkbox!.checked;
    await act(async () => {
      checkbox!.click();
    });
    await flush();
    expect(checkbox!.checked).toBe(!before);

    // The unrelated outputMode/outputModeIntensity fields were not touched by the change above.
    const outputModeIntensitySelect = selects.find((s) =>
      Array.from(s.options).some((o) => o.value === "full")
    ) as HTMLSelectElement;
    expect(outputModeIntensitySelect.value).toBe("full");
  });
});
