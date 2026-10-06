// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { expect, it, vi } from "vitest";
import ModelCompatPopover from "../ModelCompatPopover";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

async function flushEffects(rounds = 40) {
  await act(async () => {
    for (let i = 0; i < rounds; i += 1) await Promise.resolve();
  });
}

it("does not lose the new target when unmounted during the older target save", async () => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  let server = {
    block: [] as string[],
    allow: [] as string[],
    models: {} as Record<string, { block: string[]; allow: string[] }>,
    autoLearn: false,
  };
  let releaseFirstPut: (() => void) | null = null;
  let putCount = 0;

  vi.stubGlobal(
    "fetch",
    vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      if (init?.method === "PUT") {
        putCount += 1;
        const body = JSON.parse(String(init.body)) as typeof server;
        if (putCount === 1) {
          await new Promise<void>((resolve) => {
            releaseFirstPut = resolve;
          });
        }
        server = body;
        return { ok: true, json: async () => ({ success: true }) } as Response;
      }
      return { ok: true, json: async () => structuredClone(server) } as Response;
    })
  );

  const renderFor = (modelId: string) => {
    act(() => {
      root.render(
        <ModelCompatPopover
          t={(key) => key}
          providerId="openai"
          modelId={modelId}
          effectiveModelNormalize={() => false}
          effectiveModelPreserveDeveloper={() => true}
          getUpstreamHeadersRecord={() => ({})}
          onCompatPatch={vi.fn()}
        />
      );
    });
  };
  const blockInput = () =>
    document.querySelector(
      'input[placeholder="compatBlockedParamsPlaceholder"]'
    ) as HTMLInputElement;
  const blurBlock = async () => {
    await act(async () => {
      blockInput().dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
    });
    await flushEffects();
  };

  renderFor("model-a");
  await act(async () => (container.querySelector("button") as HTMLButtonElement).click());
  await flushEffects();
  await act(async () => setInputValue(blockInput(), "aaa"));
  await blurBlock();
  expect(releaseFirstPut).not.toBeNull();

  renderFor("model-b");
  await flushEffects();
  await act(async () => setInputValue(blockInput(), "bbb"));
  await blurBlock();

  // Every close/unmount save is rejected while model-a owns paramSavingRef. The active save took
  // its key snapshot before model-b existed, so model-b has no later save scheduled.
  act(() => root.unmount());
  await act(async () => {
    releaseFirstPut?.();
    await Promise.resolve();
  });
  await flushEffects();


  expect(server.models).toEqual({
    "model-a": { block: ["aaa"], allow: [] },
    "model-b": { block: ["bbb"], allow: [] },
  });

  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});
