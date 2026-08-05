// @vitest-environment jsdom
// Regression coverage for the concurrency defects found while fixing #8910:
//   1. an edit landing after the PUT payload snapshot but before the PUT resolves must still
//      be persisted (lost update);
//   2. a save that failed must not be silently reverted on reopen, and the failure must be
//      visible in the panel.
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

async function flushEffects() {
  await act(async () => {
    for (let i = 0; i < 8; i += 1) await Promise.resolve();
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

describe("ModelCompatPopover param-filter save concurrency (#8910)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("persists an edit typed after the payload snapshot but before the PUT resolves", async () => {
    let serverState: ParamFilterState = { block: [], allow: [], models: {}, autoLearn: false };
    let releasePut: (() => void) | null = null;
    let holdPut = false;

    vi.stubGlobal(
      "fetch",
      vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
        if (init?.method === "PUT") {
          serverState = JSON.parse(String(init.body)) as ParamFilterState;
          if (holdPut) {
            await new Promise<void>((resolve) => {
              releasePut = resolve;
            });
          }
          return { ok: true, json: async () => ({ success: true }) } as Response;
        }
        return { ok: true, json: async () => structuredClone(serverState) } as Response;
      })
    );

    renderPopover();
    await openPopover();

    await act(async () => setInputValue(blockInput()!, "temperature"));
    holdPut = true;
    // Blur starts the save: GET resolves, payload is snapshotted, PUT is issued and held open.
    await act(async () => {
      blockInput()!.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
    });
    await flushEffects();
    expect(releasePut).not.toBeNull();

    // The user keeps typing while that PUT is still in flight, then closes the popover.
    await act(async () => setInputValue(blockInput()!, "temperature, seed"));
    await closePopoverByOutsideClick();

    holdPut = false;
    await act(async () => {
      releasePut?.();
      await Promise.resolve();
    });
    await flushEffects();

    expect(serverState.models).toEqual({
      "gpt-test": { block: ["temperature", "seed"], allow: [] },
    });
  });

  it("keeps the draft and surfaces the failure when the save fails, instead of reverting on reopen", async () => {
    const serverState: ParamFilterState = { block: [], allow: [], models: {}, autoLearn: false };
    let putAttempts = 0;

    vi.stubGlobal(
      "fetch",
      vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
        if (init?.method === "PUT") {
          putAttempts += 1;
          return { ok: false, status: 500, json: async () => ({}) } as Response;
        }
        return { ok: true, json: async () => structuredClone(serverState) } as Response;
      })
    );

    renderPopover();
    await openPopover();

    await act(async () => setInputValue(blockInput()!, "temperature"));
    await closePopoverByOutsideClick();
    expect(putAttempts).toBe(1);

    // Reopening must NOT clobber the unsaved draft with server state (#8910 complaint class).
    await openPopover();
    expect(blockInput()!.value).toBe("temperature");
    // The failure is visible to the user rather than silently swallowed.
    expect(document.querySelector('[role="alert"]')?.textContent).toContain("failed");

    // ...and the retained draft is actually retryable through the normal close path.
    await closePopoverByOutsideClick();
    expect(putAttempts).toBe(2);
  });

  it("clears the failure indicator once a later save succeeds", async () => {
    let serverState: ParamFilterState = { block: [], allow: [], models: {}, autoLearn: false };
    let failNextPut = true;

    vi.stubGlobal(
      "fetch",
      vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
        if (init?.method === "PUT") {
          if (failNextPut) return { ok: false, status: 500, json: async () => ({}) } as Response;
          serverState = JSON.parse(String(init.body)) as ParamFilterState;
          return { ok: true, json: async () => ({ success: true }) } as Response;
        }
        return { ok: true, json: async () => structuredClone(serverState) } as Response;
      })
    );

    renderPopover();
    await openPopover();
    await act(async () => setInputValue(blockInput()!, "temperature"));
    await act(async () => {
      blockInput()!.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
    });
    await flushEffects();
    expect(document.querySelector('[role="alert"]')).not.toBeNull();

    failNextPut = false;
    await act(async () => setInputValue(blockInput()!, "temperature, seed"));
    await act(async () => {
      blockInput()!.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
    });
    await flushEffects();

    expect(document.querySelector('[role="alert"]')).toBeNull();
    expect(serverState.models).toEqual({
      "gpt-test": { block: ["temperature", "seed"], allow: [] },
    });
  });
});
