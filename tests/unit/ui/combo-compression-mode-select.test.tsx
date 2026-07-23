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

describe("ComboCompressionModeSelect (#6760)", () => {
  it("hydrates the initial value from combo.config.compressionMode", async () => {
    const { ComboCompressionModeSelect } = await import(
      "../../../src/shared/components/compression/ComboCompressionModeSelect"
    );
    const combo = { id: "c1", config: { compressionMode: "lite" } };
    const container = mount(<ComboCompressionModeSelect combo={combo} />);
    await flush();
    const select = container.querySelector("select") as HTMLSelectElement;
    expect(select.value).toBe("lite");
  });

  it("hydrates from legacy combo.compressionOverride when config is absent", async () => {
    const { ComboCompressionModeSelect } = await import(
      "../../../src/shared/components/compression/ComboCompressionModeSelect"
    );
    const combo = { id: "c1", compressionOverride: "aggressive" };
    const container = mount(<ComboCompressionModeSelect combo={combo} />);
    await flush();
    const select = container.querySelector("select") as HTMLSelectElement;
    expect(select.value).toBe("aggressive");
  });

  it("PUTs the correct config payload to /api/combos/{id} on selection change", async () => {
    const { ComboCompressionModeSelect } = await import(
      "../../../src/shared/components/compression/ComboCompressionModeSelect"
    );
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input, init) => {
      calls.push({ url: input.toString(), init });
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });
    const combo = { id: "c1", config: { compressionMode: "lite" } };
    const container = mount(<ComboCompressionModeSelect combo={combo} />);
    await flush();
    const select = container.querySelector("select") as HTMLSelectElement;
    await act(async () => {
      select.value = "standard";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await flush();
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe("/api/combos/c1");
    expect(calls[0].init?.method).toBe("PUT");
    const body = JSON.parse(calls[0].init?.body as string);
    expect(body).toEqual({ config: { compressionMode: "standard" } });
  });

  it('selecting "Default" removes compressionMode from the PUT payload', async () => {
    const { ComboCompressionModeSelect } = await import(
      "../../../src/shared/components/compression/ComboCompressionModeSelect"
    );
    const calls: Array<{ init?: RequestInit }> = [];
    vi.spyOn(globalThis, "fetch").mockImplementation(async (_input, init) => {
      calls.push({ init });
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });
    const combo = { id: "c1", config: { compressionMode: "lite" } };
    const container = mount(<ComboCompressionModeSelect combo={combo} />);
    await flush();
    const select = container.querySelector("select") as HTMLSelectElement;
    await act(async () => {
      select.value = "";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await flush();
    const body = JSON.parse(calls[0].init?.body as string);
    expect(body).toEqual({ config: {} });
  });

  it("rolls back the displayed value when the PUT response is not OK", async () => {
    const { ComboCompressionModeSelect } = await import(
      "../../../src/shared/components/compression/ComboCompressionModeSelect"
    );
    vi.spyOn(globalThis, "fetch").mockImplementation(async () => {
      return new Response(JSON.stringify({ error: "nope" }), { status: 500 });
    });
    const combo = { id: "c1", config: { compressionMode: "lite" } };
    const container = mount(<ComboCompressionModeSelect combo={combo} />);
    await flush();
    const select = container.querySelector("select") as HTMLSelectElement;
    await act(async () => {
      select.value = "ultra";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await flush();
    expect(select.value).toBe("lite");
  });

  it("disables the control when disabled=true", async () => {
    const { ComboCompressionModeSelect } = await import(
      "../../../src/shared/components/compression/ComboCompressionModeSelect"
    );
    const combo = { id: "c1", config: { compressionMode: "lite" } };
    const container = mount(<ComboCompressionModeSelect combo={combo} disabled />);
    await flush();
    const select = container.querySelector("select") as HTMLSelectElement;
    expect(select.disabled).toBe(true);
  });
});
