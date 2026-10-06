// @vitest-environment jsdom
// Regression coverage for #8910: sibling model-row popovers for the same provider must serialize
// their whole-document param-filter updates so one successful save cannot erase the other.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import ModelCompatPopover from "../ModelCompatPopover";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));

type ParamFilterState = {
  block: string[];
  allow: string[];
  models?: Record<string, { block: string[]; allow: string[] }>;
  autoLearn: boolean;
};

let container: HTMLDivElement;
let root: Root;
let releaseFirstPut: (() => void) | null;

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

async function flushEffects(rounds = 60) {
  await act(async () => {
    for (let i = 0; i < rounds; i += 1) await Promise.resolve();
  });
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  releaseFirstPut = null;
});

afterEach(async () => {
  await act(async () => {
    releaseFirstPut?.();
    await Promise.resolve();
  });
  act(() => root.unmount());
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

it("preserves both model updates when sibling popovers save the same provider concurrently", async () => {
  let server: ParamFilterState = { block: [], allow: [], models: {}, autoLearn: false };
  let putCount = 0;

  vi.stubGlobal(
    "fetch",
    vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      if (init?.method === "PUT") {
        putCount += 1;
        const body = JSON.parse(String(init.body)) as ParamFilterState;
        if (putCount === 1) {
          await new Promise<void>((resolve) => {
            releaseFirstPut = resolve;
          });
        }
        server = { ...body, models: body.models ?? {} };
        return { ok: true, json: async () => ({ success: true }) } as Response;
      }
      return { ok: true, json: async () => structuredClone(server) } as Response;
    })
  );

  const props = (modelId: string) => ({
    t: (key: string) => key,
    providerId: "openai",
    modelId,
    effectiveModelNormalize: () => false,
    effectiveModelPreserveDeveloper: () => true,
    getUpstreamHeadersRecord: () => ({}),
    onCompatPatch: vi.fn(),
  });

  act(() => {
    root.render(
      <div>
        <div id="model-a">
          <ModelCompatPopover {...props("model-a")} />
        </div>
        <div id="model-b">
          <ModelCompatPopover {...props("model-b")} />
        </div>
      </div>
    );
  });

  const triggerA = container.querySelector("#model-a button") as HTMLButtonElement;
  const triggerB = container.querySelector("#model-b button") as HTMLButtonElement;
  const blockInput = () =>
    document.querySelector(
      'input[placeholder="compatBlockedParamsPlaceholder"]'
    ) as HTMLInputElement;

  await act(async () => triggerA.click());
  await flushEffects();
  await act(async () => setInputValue(blockInput(), "aaa"));
  await act(async () => {
    blockInput().dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
  });
  await flushEffects();
  expect(releaseFirstPut).not.toBeNull();

  await act(async () => {
    triggerB.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
  });
  await flushEffects();
  await act(async () => triggerB.click());
  await flushEffects();
  await act(async () => setInputValue(blockInput(), "bbb"));
  await act(async () => {
    blockInput().dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
  });
  await flushEffects();

  await act(async () => {
    releaseFirstPut?.();
    await Promise.resolve();
  });
  await flushEffects();

  expect(server.models).toEqual({
    "model-a": { block: ["aaa"], allow: [] },
    "model-b": { block: ["bbb"], allow: [] },
  });
});
