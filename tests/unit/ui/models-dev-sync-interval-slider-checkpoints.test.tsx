// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ModelsDevSyncTab from "@/app/(dashboard)/dashboard/settings/components/ModelsDevSyncTab";

// Regression coverage for the Model Database sync interval slider
// (Settings > AI > Model Database): the reference ticks (1h/6h/24h/7d) used
// to be laid out evenly with flex justify-between while the underlying
// <input type=range> ran a linear 1-168 hour scale, so the thumb position
// never matched the labels (59h landed visually on top of "6h").
//
// The slider now works in checkpoint space: position p in [0,3] maps linearly
// onto [1,6,24,168] hours. It slides freely (step=any) and on release snaps
// magnetically onto a checkpoint when dropped within threshold of one,
// otherwise keeps the freely chosen (interpolated) hour value.

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const roots: Array<{ root: Root; el: HTMLDivElement }> = [];

async function render(): Promise<HTMLDivElement> {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  await act(async () => {
    root.render(<ModelsDevSyncTab />);
  });
  roots.push({ root, el });
  return el;
}

function getSlider(container: HTMLDivElement): HTMLInputElement {
  const input = container.querySelector('input[type="range"]');
  if (!input) throw new Error("sync interval slider not found");
  return input as HTMLInputElement;
}

function getLabel(container: HTMLDivElement): string {
  const span = container.querySelector("span.text-blue-400");
  if (!span?.textContent) throw new Error("interval label not found");
  return span.textContent;
}

async function setSliderValue(container: HTMLDivElement, value: string) {
  const input = getSlider(container);
  // NOTE: synchronous act() on purpose — wrapping this in async act() lets the
  // commit flush late, so the change handler would read the pre-dispatch value.
  act(() => {
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )?.set;
    setter?.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

function releaseSlider(container: HTMLDivElement) {
  act(() => {
    getSlider(container).dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
  });
}

async function waitFor(predicate: () => boolean, label: string) {
  const startedAt = Date.now();
  while (!predicate()) {
    if (Date.now() - startedAt > 2000) {
      throw new Error(`Timed out waiting for: ${label}`);
    }
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
  }
}

describe("ModelsDevSyncTab interval slider checkpoints", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/api/settings/models-dev")) {
        return new Response(
          JSON.stringify({
            enabled: true,
            lastSync: null,
            lastSyncModelCount: 0,
            lastSyncCapabilityCount: 0,
            nextSync: null,
            intervalMs: 86400000,
            providerCount: 1,
            modelCount: 1,
            capabilityCount: 1,
          }),
          { status: 200 }
        );
      }
      if (url.includes("/api/settings")) {
        if (init?.method === "PATCH") {
          return new Response(JSON.stringify({ ok: true }), { status: 200 });
        }
        return new Response(
          JSON.stringify({ modelsDevSyncEnabled: true, modelsDevSyncInterval: 86400000 }),
          { status: 200 }
        );
      }
      return new Response(JSON.stringify({}), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    for (const { root, el } of roots.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    vi.unstubAllGlobals();
  });

  it("maps the saved 24h interval onto checkpoint position 2", async () => {
    const container = await render();
    await waitFor(() => getSlider(container).value === "2", "saved interval to load");

    expect(getLabel(container)).toBe("24h");
  });

  it("shows interpolated hours while dragging between checkpoints", async () => {
    const container = await render();
    await waitFor(() => getSlider(container).value === "2", "saved interval to load");

    // midpoint of the 6h..24h segment -> 15h
    await setSliderValue(container, "1.5");

    expect(getLabel(container)).toBe("15h");
    const patch = fetchMock.mock.calls.find((call) => call[1]?.method === "PATCH");
    expect(patch).toBeUndefined(); // dragging alone must not save
  });

  it("snaps onto 6h when released near that checkpoint", async () => {
    const container = await render();
    await waitFor(() => getSlider(container).value === "2", "saved interval to load");

    await setSliderValue(container, "0.9"); // within snap threshold of checkpoint 1
    releaseSlider(container);

    await waitFor(() => {
      return Boolean(fetchMock.mock.calls.find((call) => call[1]?.method === "PATCH"));
    }, "PATCH request to be issued");

    const patch = fetchMock.mock.calls.find((call) => call[1]?.method === "PATCH");
    expect(JSON.parse(String(patch?.[1]?.body))).toEqual({ modelsDevSyncInterval: 21600000 });
    expect(getSlider(container).value).toBe("1");
    expect(getLabel(container)).toBe("6h");
  });

  it("keeps the free value when released away from any checkpoint", async () => {
    const container = await render();
    await waitFor(() => getSlider(container).value === "2", "saved interval to load");

    await setSliderValue(container, "1.5"); // mid-segment, no snap
    releaseSlider(container);

    await waitFor(() => {
      return Boolean(fetchMock.mock.calls.find((call) => call[1]?.method === "PATCH"));
    }, "PATCH request to be issued");

    const patch = fetchMock.mock.calls.find((call) => call[1]?.method === "PATCH");
    expect(JSON.parse(String(patch?.[1]?.body))).toEqual({ modelsDevSyncInterval: 54000000 });
    expect(getSlider(container).value).toBe("1.5");
    expect(getLabel(container)).toBe("15h");
  });
});
