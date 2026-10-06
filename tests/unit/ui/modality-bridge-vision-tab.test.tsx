// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ModalityBridgeVisionTab from "@/app/(dashboard)/dashboard/settings/components/modalityBridge/ModalityBridgeVisionTab";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

type MountedRoot = { root: Root; el: HTMLDivElement };

const roots: MountedRoot[] = [];

async function waitFor(predicate: () => boolean, label: string): Promise<void> {
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

describe("ModalityBridgeVisionTab", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      // The Vision picker now reads the unified catalog (modelSource="catalog",
      // #10809), which returns `{ catalog: { provider: { models: [...] } } }`.
      if (url.includes("/api/models")) {
        return new Response(
          JSON.stringify({
            catalog: {
              openai: {
                models: [{ id: "gpt-4o-mini", capabilities: { vision: true } }],
              },
            },
          }),
          { status: 200 }
        );
      }
      if (url.includes("/api/modality-bridge/stats")) {
        return new Response(
          JSON.stringify({
            vision: { bridged: 3, cacheHits: 1, failures: 0, lastUsedAt: null },
            audio: { bridged: 0, cacheHits: 0, failures: 0, lastUsedAt: null },
          }),
          { status: 200 }
        );
      }
      if (url.includes("/api/guardrails/test")) {
        return new Response(
          JSON.stringify({
            blocked: false,
            results: [
              {
                guardrail: "vision-bridge",
                meta: { imagesProcessed: 1, visionModel: "openai/gpt-4o-mini" },
              },
            ],
            payload: {},
          }),
          { status: 200 }
        );
      }
      if (url.includes("/api/settings")) {
        if (init?.method === "PATCH") return new Response("{}", { status: 200 });
        return new Response(
          JSON.stringify({ visionBridgeModel: "legacy/model", visionBridgeEnabled: true }),
          { status: 200 }
        );
      }
      return new Response("{}", { status: 200 });
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

  async function render(): Promise<HTMLDivElement> {
    const el = document.createElement("div");
    document.body.appendChild(el);
    const root = createRoot(el);
    await act(async () => {
      root.render(<ModalityBridgeVisionTab />);
    });
    roots.push({ root, el });
    await waitFor(
      () => el.querySelector('[data-testid="modality-bridge-mode"]') !== null,
      "vision settings to load"
    );
    return el;
  }

  it("PATCHes only the new modalityBridge* key when toggling", async () => {
    const el = await render();
    const toggle = el.querySelector('[role="switch"]') as HTMLButtonElement | null;
    expect(toggle).toBeTruthy();

    await act(async () => {
      toggle?.click();
    });

    await waitFor(
      () =>
        fetchMock.mock.calls.some(
          ([url, init]) =>
            String(url).includes("/api/settings") &&
            (init as RequestInit | undefined)?.method === "PATCH"
        ),
      "settings PATCH"
    );
    const patch = fetchMock.mock.calls.find(
      ([url, init]) =>
        String(url).includes("/api/settings") &&
        (init as RequestInit | undefined)?.method === "PATCH"
    );
    const body = JSON.parse(String((patch?.[1] as RequestInit | undefined)?.body)) as Record<
      string,
      unknown
    >;
    expect(body).toHaveProperty("modalityBridgeVisionEnabled", false);
    expect(body).not.toHaveProperty("visionBridgeEnabled");
  });

  it("reads the legacy model as fallback when the new key is absent", async () => {
    const el = await render();
    expect(el.innerHTML).toContain("legacy/model");
    const modelLabel = Array.from(el.querySelectorAll("label")).find((label) =>
      label.textContent?.includes("modalityBridgeVisionModel")
    );
    const modelSelect = modelLabel?.parentElement?.querySelector("select") ?? null;
    const autoOption = modelSelect?.querySelector('option[value=""]') as HTMLOptionElement | null;
    expect(autoOption).toBeTruthy();
    expect(autoOption?.disabled).toBe(false);
  });

  it("renders the mode selector, live stats, and all three mode options", async () => {
    const el = await render();
    const select = el.querySelector(
      'select[data-testid="modality-bridge-mode"]'
    ) as HTMLSelectElement | null;
    expect(select).toBeTruthy();
    expect(Array.from(select?.options ?? []).map((option) => option.value)).toEqual([
      "auto",
      "describe",
      "reroute",
    ]);

    await waitFor(() => el.textContent?.includes("3 modalityBridgeStatsBridged") ?? false, "stats");
    expect(el.textContent).toContain("1 modalityBridgeStatsCacheHits");
    expect(el.textContent).toContain("3 requestlogger.attempts");
    expect(el.textContent).toContain("trafficInspector.timingTotalLatency: —");
    expect(el.textContent).toContain("avgLatency: —");
    expect(el.textContent).not.toContain("0 ms");
  });

  it("clamps advanced numeric settings to the schema bounds before PATCHing", async () => {
    const el = await render();
    const timeout = el.querySelector(
      '[data-testid="modality-bridge-timeout"]'
    ) as HTMLInputElement | null;
    expect(timeout).toBeTruthy();

    act(() => {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      setter?.call(timeout, "500");
      timeout?.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await act(async () => {
      timeout?.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(
      () =>
        fetchMock.mock.calls.some(([, init]) => {
          if ((init as RequestInit | undefined)?.method !== "PATCH") return false;
          const body = JSON.parse(String((init as RequestInit).body)) as Record<string, unknown>;
          return body.modalityBridgeVisionTimeout === 1000;
        }),
      "clamped timeout PATCH"
    );
  });

  it("renders the max description characters field, accepts a value, and PATCHes it", async () => {
    const el = await render();
    const maxChars = el.querySelector(
      '[data-testid="modality-bridge-max-chars"]'
    ) as HTMLInputElement | null;
    expect(maxChars).toBeTruthy();

    act(() => {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      setter?.call(maxChars, "2000");
      maxChars?.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await act(async () => {
      maxChars?.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(
      () =>
        fetchMock.mock.calls.some(([, init]) => {
          if ((init as RequestInit | undefined)?.method !== "PATCH") return false;
          const body = JSON.parse(String((init as RequestInit).body)) as Record<string, unknown>;
          return body.modalityBridgeVisionMaxChars === 2000;
        }),
      "maxChars PATCH"
    );
  });

  it("runs the guardrail self-test with an image and renders the bridge result", async () => {
    const el = await render();
    const button = Array.from(el.querySelectorAll("button")).find((candidate) =>
      candidate.textContent?.includes("modalityBridgeTestButton")
    );
    expect(button).toBeTruthy();

    await act(async () => {
      button?.click();
    });

    await waitFor(
      () => el.textContent?.includes("modalityBridgeTestOk") ?? false,
      "bridge self-test result"
    );
    const call = fetchMock.mock.calls.find(([url]) => String(url).includes("/api/guardrails/test"));
    expect(call).toBeTruthy();
    const body = JSON.parse(String((call?.[1] as RequestInit | undefined)?.body)) as {
      input?: { messages?: unknown[] };
      disabledGuardrails?: string[];
    };
    expect(body.input?.messages).toHaveLength(1);
    expect(body.disabledGuardrails).toEqual([
      "pii-masker",
      "prompt-injection",
      "credential-masker",
    ]);
  });

  it("#10703: filters the model dropdown to vision-capable models only", async () => {
    fetchMock.mockImplementation(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/api/models")) {
        return new Response(
          JSON.stringify({
            catalog: {
              openai: {
                models: [
                  { id: "gpt-4o-mini", capabilities: { vision: true } },
                  { id: "gpt-4o", capabilities: { vision: true } },
                ],
              },
              cmd: {
                models: [
                  { id: "gpt-5.3-codex", capabilities: { vision: false } },
                  { id: "deepseek/deepseek-v4-pro", input_modalities: ["text"] },
                ],
              },
            },
          }),
          { status: 200 }
        );
      }
      if (url.includes("/api/settings")) {
        if (init?.method === "PATCH") return new Response("{}", { status: 200 });
        return new Response(
          JSON.stringify({ visionBridgeModel: "openai/gpt-4o-mini", visionBridgeEnabled: true }),
          { status: 200 }
        );
      }
      return new Response("{}", { status: 200 });
    });

    const el = await render();
    await waitFor(
      () => el.querySelector('[data-testid="modality-bridge-vision-model-custom-input"]') !== null,
      "vision model picker to load"
    );

    // The filtered <select> must list vision-capable models only (empty placeholder excluded).
    const modelLabel = Array.from(el.querySelectorAll("label")).find((label) =>
      label.textContent?.includes("modalityBridgeVisionModel")
    );
    const modelSelect =
      (modelLabel?.parentElement?.querySelector("select") as HTMLSelectElement | null) ?? null;
    const optionValues = Array.from(modelSelect?.options ?? [])
      .map((o) => o.value)
      .filter(Boolean);
    expect(optionValues).toContain("openai/gpt-4o-mini");
    expect(optionValues).toContain("openai/gpt-4o");
    expect(optionValues).not.toContain("cmd/gpt-5.3-codex");
    expect(optionValues).not.toContain("cmd/deepseek/deepseek-v4-pro");
  });

  it("#10703: the custom model input lets operators type an unlisted vision model", async () => {
    const el = await render();
    await waitFor(
      () => el.querySelector('[data-testid="modality-bridge-vision-model-custom-input"]') !== null,
      "vision model picker to load"
    );

    const input = el.querySelector(
      '[data-testid="modality-bridge-vision-model-custom-input"]'
    ) as HTMLInputElement | null;
    expect(input).toBeTruthy();

    act(() => {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      setter?.call(input, "ollama/llava:13b");
      input?.dispatchEvent(new Event("input", { bubbles: true }));
    });

    await waitFor(
      () =>
        fetchMock.mock.calls.some(([, init]) => {
          if ((init as RequestInit | undefined)?.method !== "PATCH") return false;
          const body = JSON.parse(String((init as RequestInit).body)) as Record<string, unknown>;
          return body.modalityBridgeVisionModel === "ollama/llava:13b";
        }),
      "custom vision model PATCH"
    );
  });
});
