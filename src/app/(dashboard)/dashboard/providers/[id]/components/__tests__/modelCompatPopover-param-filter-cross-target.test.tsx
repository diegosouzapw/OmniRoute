// @vitest-environment jsdom
// Regression coverage for the cross-target write defect found while fixing #8910.
//
// ModelCompatPopover instances are not always keyed by a stable identity (CompatibleModelsSection
// keys by `${alias}:${modelId}`, PassthroughModelsSection by the full model string, and providerId
// is threaded from route/page state), so a re-render can re-point a LIVE, mounted popover at a
// different provider/model. When the draft for the old target failed to save, the save callback —
// now bound to the new target — used to PUT the old draft into the new target's config,
// destructively overwriting a model/provider the user never edited.
//
// Contract asserted here: a write always lands on the provider/model the draft was typed for, and
// an orphaned draft whose target is no longer displayed is preserved (retried later) rather than
// silently dropped or redirected.
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

async function flushEffects(rounds = 40) {
  await act(async () => {
    for (let i = 0; i < rounds; i += 1) await Promise.resolve();
  });
}

function blockInput() {
  return document.querySelector(
    'input[placeholder="compatBlockedParamsPlaceholder"]'
  ) as HTMLInputElement | null;
}

function renderPopover(props: { providerId: string; modelId: string }) {
  act(() => {
    root.render(
      <ModelCompatPopover
        t={(key) => key}
        providerId={props.providerId}
        modelId={props.modelId}
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

describe("ModelCompatPopover param-filter cross-target writes (#8910)", () => {
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

  it("never writes a draft typed for one model under a different model", async () => {
    const server: ParamFilterState = {
      block: [],
      allow: [],
      models: { "model-b": { block: ["bval"], allow: [] } },
      autoLearn: false,
    };
    const puts: { url: string; models?: Record<string, unknown> }[] = [];
    let getFails = true;

    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        if (init?.method === "PUT") {
          const body = JSON.parse(String(init.body));
          puts.push({ url, models: body.models });
          server.models = body.models ?? {};
          return { ok: true, json: async () => ({ success: true }) } as Response;
        }
        if (getFails) return { ok: false, status: 503, json: async () => ({}) } as Response;
        return { ok: true, json: async () => structuredClone(server) } as Response;
      })
    );

    renderPopover({ providerId: "openai", modelId: "model-a" });
    await openPopover();
    // The load failed, so the fields are empty; the user types a draft for model-a.
    await act(async () => setInputValue(blockInput()!, "aaa"));

    // A re-render re-points this live popover at model-b while model-a's draft is still dirty.
    // The close-time save for model-a runs here and fails (its GET is still 503).
    renderPopover({ providerId: "openai", modelId: "model-b" });
    await flushEffects();

    // The network recovers and the popover closes: the retried save must target model-a.
    getFails = false;
    await closePopoverByOutsideClick();

    // model-b's real server config is untouched...
    expect(server.models["model-b"]).toEqual({ block: ["bval"], allow: [] });
    // ...and the orphaned model-a draft is not silently dropped either — it lands on model-a.
    expect(server.models["model-a"]).toEqual({ block: ["aaa"], allow: [] });
    expect(puts.every((p) => p.url.includes("/openai/"))).toBe(true);
  });

  it("never writes a draft typed for one provider under a different provider", async () => {
    const byProvider: Record<string, ParamFilterState> = {
      alpha: { block: [], allow: [], models: {}, autoLearn: false },
      beta: {
        block: [],
        allow: [],
        models: { "gpt-test": { block: ["betaval"], allow: [] } },
        autoLearn: false,
      },
    };
    const puts: { providerId: string; models?: Record<string, unknown> }[] = [];
    let getFails = true;

    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        const providerId = url.match(/providers\/([^/]+)\//)![1];
        if (init?.method === "PUT") {
          const body = JSON.parse(String(init.body));
          puts.push({ providerId, models: body.models });
          byProvider[providerId].models = body.models ?? {};
          return { ok: true, json: async () => ({ success: true }) } as Response;
        }
        if (getFails) return { ok: false, status: 503, json: async () => ({}) } as Response;
        return { ok: true, json: async () => structuredClone(byProvider[providerId]) } as Response;
      })
    );

    renderPopover({ providerId: "alpha", modelId: "gpt-test" });
    await openPopover();
    await act(async () => setInputValue(blockInput()!, "alpha-only"));

    // Re-point the live popover at provider beta while alpha's draft is dirty and its save fails.
    renderPopover({ providerId: "beta", modelId: "gpt-test" });
    await flushEffects();

    getFails = false;
    await closePopoverByOutsideClick();

    // beta must receive no write at all; its stored config survives intact.
    expect(puts.filter((p) => p.providerId === "beta")).toEqual([]);
    expect(byProvider.beta.models).toEqual({ "gpt-test": { block: ["betaval"], allow: [] } });
    // The alpha draft is preserved and eventually persisted under alpha.
    expect(byProvider.alpha.models).toEqual({ "gpt-test": { block: ["alpha-only"], allow: [] } });
  });
});
