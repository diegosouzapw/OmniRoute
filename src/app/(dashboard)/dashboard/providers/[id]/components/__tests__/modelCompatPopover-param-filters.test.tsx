// @vitest-environment jsdom
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
  models: Record<string, { block: string[]; allow: string[] }>;
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
    await Promise.resolve();
  });
}

async function openPopover() {
  const trigger = container.querySelector("button") as HTMLButtonElement;
  await act(async () => trigger.click());
  await flushEffects();
}

describe("ModelCompatPopover model param filters (#8910)", () => {
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

  it("persists the latest block and allow drafts when an outside mousedown closes the popover", async () => {
    const apiPath = "/api/providers/openai/param-filters";
    let serverState: ParamFilterState = {
      block: ["provider-block"],
      allow: ["provider-allow"],
      models: {
        "other-model": { block: ["keep-block"], allow: ["keep-allow"] },
      },
      autoLearn: true,
    };
    const putBodies: unknown[] = [];
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      if (String(input) !== apiPath) throw new Error(`Unexpected param-filter URL: ${input}`);
      if (init?.method === "PUT") {
        const body = JSON.parse(String(init.body)) as ParamFilterState;
        putBodies.push(body);
        serverState = body;
      }
      return {
        ok: true,
        json: async () => structuredClone(serverState),
      } as Response;
    });
    vi.stubGlobal("fetch", fetchMock);

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

    await openPopover();
    const blockInput = document.querySelector(
      'input[placeholder="compatBlockedParamsPlaceholder"]'
    ) as HTMLInputElement;
    const allowInput = document.querySelector(
      'input[placeholder="compatAllowedParamsPlaceholder"]'
    ) as HTMLInputElement;

    await act(async () => {
      setInputValue(blockInput, "temperature, top_p");
      setInputValue(allowInput, "tools, response_format");
    });

    await act(async () => {
      document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    await flushEffects();

    expect(
      document.querySelector('input[placeholder="compatBlockedParamsPlaceholder"]')
    ).toBeNull();
    expect(putBodies).toEqual([
      {
        block: ["provider-block"],
        allow: ["provider-allow"],
        models: {
          "other-model": { block: ["keep-block"], allow: ["keep-allow"] },
          "gpt-test": {
            block: ["temperature", "top_p"],
            allow: ["tools", "response_format"],
          },
        },
        autoLearn: true,
      },
    ]);

    await openPopover();
    expect(
      (
        document.querySelector(
          'input[placeholder="compatBlockedParamsPlaceholder"]'
        ) as HTMLInputElement
      ).value
    ).toBe("temperature, top_p");
    expect(
      (
        document.querySelector(
          'input[placeholder="compatAllowedParamsPlaceholder"]'
        ) as HTMLInputElement
      ).value
    ).toBe("tools, response_format");
  });
});
