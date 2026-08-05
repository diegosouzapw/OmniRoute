// @vitest-environment jsdom
// Regression coverage for the load-effect clobber defects found while fixing #8910:
//   1. a draft typed while the initial load GET is still in flight must survive the load
//      result and still be persisted on close (otherwise keystrokes vanish silently);
//   2. after a failed initial load, the retained draft must not be destroyed by the next
//      successful reopen load — that reopen is the user's retry.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ModelCompatPopover from "../ModelCompatPopover";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

interface ParamFilterState {
  block: string[];
  allow: string[];
  models?: Record<string, { block: string[]; allow: string[] }>;
  autoLearn: boolean;
}

let container: HTMLDivElement;
let root: Root;

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

async function flushEffects(rounds = 12) {
  await act(async () => {
    for (let i = 0; i < rounds; i += 1) await Promise.resolve();
  });
}

function blockInput() {
  return document.querySelector(
    'input[placeholder="compatBlockedParamsPlaceholder"]'
  ) as HTMLInputElement | null;
}

function renderPopover() {
  act(() => {
    root.render(
      <ModelCompatPopover
        t={(key) => key}
        providerId="openai"
        modelId="gpt-test"
        effectiveModelNormalize={() => false}
        effectiveModelPreserveDeveloper={() => true}
        getUpstreamHeadersRecord={() => ({})}
        onCompatPatch={vi.fn()}
      />
    );
  });
}

async function openPopover() {
  const trigger = container.querySelector("button") as HTMLButtonElement;
  await act(async () => trigger.click());
  await flushEffects();
}

async function closePopoverByOutsideClick() {
  await act(async () => {
    document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
  });
  await flushEffects();
}

describe("ModelCompatPopover param-filter load clobber (#8910)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    try {
      act(() => root.unmount());
    } catch {
      // already unmounted by the test
    }
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("keeps and saves a draft typed while the initial load GET is still in flight", async () => {
    const serverState: ParamFilterState = {
      block: [],
      allow: [],
      models: { "gpt-test": { block: ["old"], allow: [] } },
      autoLearn: false,
    };
    const puts: ParamFilterState[] = [];
    let releaseGet: (() => void) | null = null;
    let heldFirstGet = false;

    vi.stubGlobal(
      "fetch",
      vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
        if (init?.method === "PUT") {
          puts.push(JSON.parse(String(init.body)) as ParamFilterState);
          return { ok: true, json: async () => ({ success: true }) } as Response;
        }
        if (!heldFirstGet) {
          heldFirstGet = true;
          await new Promise<void>((resolve) => {
            releaseGet = resolve;
          });
        }
        return { ok: true, json: async () => structuredClone(serverState) } as Response;
      })
    );

    renderPopover();
    const trigger = container.querySelector("button") as HTMLButtonElement;
    await act(async () => trigger.click());
    await flushEffects();

    // The field is already rendered while the load GET is still pending — the user types into it.
    await act(async () => setInputValue(blockInput()!, "temperature"));
    await act(async () => {
      releaseGet?.();
      await Promise.resolve();
    });
    await flushEffects();

    // The load result must not overwrite the dirty draft.
    expect(blockInput()!.value).toBe("temperature");

    await closePopoverByOutsideClick();

    expect(puts.length).toBe(1);
    expect(puts[0]?.models).toEqual({ "gpt-test": { block: ["temperature"], allow: [] } });
  });

  it("does not clobber a retained draft with the successful reopen load after a failed initial load", async () => {
    const serverState: ParamFilterState = {
      block: [],
      allow: [],
      models: { "gpt-test": { block: ["serverval"], allow: [] } },
      autoLearn: false,
    };
    const puts: ParamFilterState[] = [];
    let failGet = true;

    vi.stubGlobal(
      "fetch",
      vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
        if (init?.method === "PUT") {
          puts.push(JSON.parse(String(init.body)) as ParamFilterState);
          return { ok: true, json: async () => ({ success: true }) } as Response;
        }
        if (failGet) return { ok: false, status: 503, json: async () => ({}) } as Response;
        return { ok: true, json: async () => structuredClone(serverState) } as Response;
      })
    );

    renderPopover();
    // First open: the load GET fails, so nothing is loaded and the field stays empty.
    await openPopover();
    expect(blockInput()!.value).toBe("");

    await act(async () => setInputValue(blockInput()!, "temperature"));
    // Close: the save's own GET still fails, so the draft is retained and flagged as failed.
    await closePopoverByOutsideClick();
    expect(puts.length).toBe(0);

    // The network recovers and the user reopens the popover to retry the save.
    failGet = false;
    await openPopover();
    expect(blockInput()!.value).toBe("temperature");
    // The unsaved-state indicator must still be visible — nothing was persisted.
    expect(document.querySelector('[role="alert"]')).not.toBeNull();

    await closePopoverByOutsideClick();
    expect(puts.length).toBe(1);
    expect(puts[0]?.models).toEqual({ "gpt-test": { block: ["temperature"], allow: [] } });
  });
});
