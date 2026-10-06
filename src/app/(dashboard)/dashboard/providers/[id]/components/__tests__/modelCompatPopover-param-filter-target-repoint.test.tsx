// @vitest-environment jsdom
// Regression coverage for the two target-re-point defects found while fixing #8910.
//
// A ModelCompatPopover instance is not always keyed by a stable identity, so a re-render can
// re-point a LIVE, still-open popover at a different provider/model while a draft for the previous
// target is unsaved. Two failures followed from that:
//
//   1. (C10) The inputs are driven by blockText/allowText, which used to be written only by the
//      load effect — and that effect early-returned whenever a draft was dirty. Re-pointing
//      A -> B -> A therefore left B's server values on screen under A, and the next keystroke
//      snapshotted them into A's draft, persisting B's content into A's entry.
//   2. (C11) The pending draft lived in a single slot that every edit overwrote, so typing into
//      the new target destroyed the previous target's unsaved work, and the new target's
//      successful save cleared the failure indicator — a green UI over data never written.
//
// Contract asserted here: the fields always show the displayed target's own content (its pending
// draft when it has one), never another target's; and every target's unsaved draft survives until
// it is actually persisted to its own provider/model.
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

function renderPopover(modelId: string) {
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
}

// React 19 delegates onBlur through focusout — a bare "blur" event does not reach the handler.
async function blurBlockInput() {
  await act(async () => {
    blockInput()!.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
  });
  await flushEffects();
}

describe("ModelCompatPopover param-filter target re-point (#8910)", () => {
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

  it("restores the dirty draft into the fields on return, instead of showing the other model's values", async () => {
    const server: ParamFilterState = {
      block: [],
      allow: [],
      models: { "model-b": { block: ["secret-b"], allow: [] } },
      autoLearn: false,
    };
    let putFails = true;

    vi.stubGlobal(
      "fetch",
      vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
        if (init?.method === "PUT") {
          if (putFails) return { ok: false, status: 500, json: async () => ({}) } as Response;
          const body = JSON.parse(String(init.body));
          server.models = body.models ?? {};
          return { ok: true, json: async () => ({ success: true }) } as Response;
        }
        return { ok: true, json: async () => structuredClone(server) } as Response;
      })
    );

    renderPopover("model-a");
    const trigger = container.querySelector("button") as HTMLButtonElement;
    await act(async () => trigger.click());
    await flushEffects();

    // model-a has no server entry, so the field loads empty; the user types a draft whose save fails.
    await act(async () => setInputValue(blockInput()!, "aaa"));
    await blurBlockInput();
    expect(blockInput()!.value).toBe("aaa");

    // The live popover is re-pointed at model-b, which does have a server value...
    renderPopover("model-b");
    await flushEffects();
    expect(blockInput()!.value).toBe("secret-b");

    // ...and back to model-a, whose draft is still unsaved: the field must show model-a's draft.
    renderPopover("model-a");
    await flushEffects();
    expect(blockInput()!.value).toBe("aaa");

    // The user appends to what they can see and closes; the write must stay inside model-a.
    putFails = false;
    await act(async () => setInputValue(blockInput()!, `${blockInput()!.value}, extra`));
    await act(async () => {
      document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    await flushEffects();

    expect(server.models["model-a"]).toEqual({ block: ["aaa", "extra"], allow: [] });
    expect(JSON.stringify(server.models["model-a"])).not.toContain("secret-b");
    expect(server.models["model-b"]).toEqual({ block: ["secret-b"], allow: [] });
  });

  it("keeps one model's unsaved draft alive while the user edits another model", async () => {
    const server: ParamFilterState = { block: [], allow: [], models: {}, autoLearn: false };
    let putFails = true;

    vi.stubGlobal(
      "fetch",
      vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
        if (init?.method === "PUT") {
          if (putFails) return { ok: false, status: 500, json: async () => ({}) } as Response;
          const body = JSON.parse(String(init.body));
          server.models = body.models ?? {};
          return { ok: true, json: async () => ({ success: true }) } as Response;
        }
        return { ok: true, json: async () => structuredClone(server) } as Response;
      })
    );

    renderPopover("model-a");
    const trigger = container.querySelector("button") as HTMLButtonElement;
    await act(async () => trigger.click());
    await flushEffects();

    await act(async () => setInputValue(blockInput()!, "aaa"));
    await blurBlockInput();
    expect(document.querySelector('[role="alert"]')?.textContent).toContain("failed");

    // Re-pointed at model-b; the network recovers and the user edits model-b.
    renderPopover("model-b");
    await flushEffects();
    putFails = false;
    await act(async () => setInputValue(blockInput()!, "bbb"));
    await blurBlockInput();

    // model-a's draft must not have been destroyed by the model-b edit: both are persisted...
    expect(server.models["model-a"]).toEqual({ block: ["aaa"], allow: [] });
    expect(server.models["model-b"]).toEqual({ block: ["bbb"], allow: [] });
    // ...and with nothing left unsaved anywhere the failure indicator is finally cleared.
    expect(document.querySelector('[role="alert"]')).toBeNull();
  });

  it("does not report success while another target's draft is still unsaved", async () => {
    const byProvider: Record<string, ParamFilterState> = {
      alpha: { block: [], allow: [], models: {}, autoLearn: false },
      beta: { block: [], allow: [], models: {}, autoLearn: false },
    };
    let failing = new Set(["alpha"]);

    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        const providerId = url.match(/providers\/([^/]+)\//)![1];
        if (init?.method === "PUT") {
          if (failing.has(providerId)) {
            return { ok: false, status: 503, json: async () => ({}) } as Response;
          }
          const body = JSON.parse(String(init.body));
          byProvider[providerId].models = body.models ?? {};
          return { ok: true, json: async () => ({ success: true }) } as Response;
        }
        return { ok: true, json: async () => structuredClone(byProvider[providerId]) } as Response;
      })
    );

    const renderFor = (providerId: string) => {
      act(() => {
        root.render(
          <ModelCompatPopover
            t={(key) => key}
            providerId={providerId}
            modelId="gpt-test"
            effectiveModelNormalize={() => false}
            effectiveModelPreserveDeveloper={() => true}
            getUpstreamHeadersRecord={() => ({})}
            onCompatPatch={vi.fn()}
          />
        );
      });
    };

    renderFor("alpha");
    const trigger = container.querySelector("button") as HTMLButtonElement;
    await act(async () => trigger.click());
    await flushEffects();
    await act(async () => setInputValue(blockInput()!, "alpha-draft"));
    await blurBlockInput();
    expect(document.querySelector('[role="alert"]')?.textContent).toContain("failed");

    // beta saves fine, but alpha is still broken: the indicator must stay up.
    renderFor("beta");
    await flushEffects();
    await act(async () => setInputValue(blockInput()!, "beta-draft"));
    await blurBlockInput();

    expect(byProvider.beta.models).toEqual({ "gpt-test": { block: ["beta-draft"], allow: [] } });
    expect(byProvider.alpha.models).toEqual({});
    expect(document.querySelector('[role="alert"]')?.textContent).toContain("failed");

    // Once alpha recovers, the preserved draft is written to alpha and the indicator clears.
    failing = new Set();
    await act(async () => {
      document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    await flushEffects();
    expect(byProvider.alpha.models).toEqual({ "gpt-test": { block: ["alpha-draft"], allow: [] } });
  });
});
