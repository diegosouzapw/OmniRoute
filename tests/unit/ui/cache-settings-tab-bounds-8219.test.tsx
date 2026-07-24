// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CacheSettingsTab from "@/app/(dashboard)/dashboard/settings/components/CacheSettingsTab";

// Regression coverage for #8219: CacheSettingsTab's client-side min/max TTL
// bounds (MIN_TTL_MS=100, MAX_TTL_MS=60000) gate the Save button and surface
// a validation message. This test proves those bounds actually work end to
// end against the (now-fixed) /api/settings/cache-config route.

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const roots: Array<{ root: Root; el: HTMLDivElement }> = [];

async function render(): Promise<HTMLDivElement> {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  await act(async () => {
    root.render(<CacheSettingsTab />);
  });
  roots.push({ root, el });
  return el;
}

function getInput(container: HTMLDivElement): HTMLInputElement {
  const input = container.querySelector("#model-catalog-ttl-ms");
  if (!input) throw new Error("TTL input not found");
  return input as HTMLInputElement;
}

function getSaveButton(container: HTMLDivElement): HTMLButtonElement {
  const buttons = Array.from(container.querySelectorAll("button"));
  const button = buttons.find((b) => b.textContent?.includes("modelCatalogCacheTtlSave"));
  if (!button) throw new Error("Save button not found");
  return button as HTMLButtonElement;
}

async function setInputValue(container: HTMLDivElement, value: string) {
  const input = getInput(container);
  // NOTE: this must be a *synchronous* act() — wrapping the dispatchEvent in
  // `act(async () => { ... })` silently no-ops the value change here (the
  // event fires but React's commit doesn't flush before the callback
  // resolves), leaving the input showing its pre-dispatch value.
  act(() => {
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )?.set;
    setter?.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
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

describe("CacheSettingsTab TTL bounds", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/api/settings/cache-config")) {
        if (init?.method === "PUT") {
          const body = JSON.parse(String(init.body));
          return new Response(
            JSON.stringify({ ok: true, modelCatalogCacheTtlMs: body.modelCatalogCacheTtlMs }),
            { status: 200 }
          );
        }
        return new Response(JSON.stringify({ modelCatalogCacheTtlMs: 1500 }), { status: 200 });
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

  it("loads the persisted TTL and enables Save only once a value is dirty and valid", async () => {
    const container = await render();
    await waitFor(() => getInput(container).value === "1500", "initial TTL to load");

    expect(getSaveButton(container).disabled).toBe(true); // not dirty yet
  });

  it("disables Save and shows an error below the minimum bound (100ms)", async () => {
    const container = await render();
    await waitFor(() => getInput(container).value === "1500", "initial TTL to load");

    await setInputValue(container, "50");
    await waitFor(
      () => container.textContent?.includes("modelCatalogTtlMinimumError") ?? false,
      "minimum bound error to render"
    );

    expect(getSaveButton(container).disabled).toBe(true);
  });

  it("disables Save and shows an error above the maximum bound (60000ms)", async () => {
    const container = await render();
    await waitFor(() => getInput(container).value === "1500", "initial TTL to load");

    await setInputValue(container, "70000");
    await waitFor(
      () => container.textContent?.includes("modelCatalogTtlMaximumError") ?? false,
      "maximum bound error to render"
    );

    expect(getSaveButton(container).disabled).toBe(true);
  });

  it("enables Save for an in-bounds value and PUTs modelCatalogCacheTtlMs", async () => {
    const container = await render();
    await waitFor(() => getInput(container).value === "1500", "initial TTL to load");

    await setInputValue(container, "5000");
    await waitFor(() => !getSaveButton(container).disabled, "Save to become enabled");

    act(() => {
      getSaveButton(container).click();
    });

    await waitFor(() => {
      const putCall = fetchMock.mock.calls.find(
        (call) =>
          String(call[0]).includes("/api/settings/cache-config") && call[1]?.method === "PUT"
      );
      return Boolean(putCall);
    }, "PUT request to be issued");

    const putCall = fetchMock.mock.calls.find(
      (call) => String(call[0]).includes("/api/settings/cache-config") && call[1]?.method === "PUT"
    );
    expect(putCall).toBeTruthy();
    expect(JSON.parse(String(putCall?.[1]?.body))).toEqual({ modelCatalogCacheTtlMs: 5000 });

    await waitFor(() => getInput(container).value === "5000", "input to reflect saved value");
  });
});
