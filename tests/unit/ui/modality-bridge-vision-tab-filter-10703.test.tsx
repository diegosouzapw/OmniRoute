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
    if (Date.now() - startedAt > 2000) throw new Error(`Timed out waiting for: ${label}`);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
  }
}

describe("ModalityBridgeVisionTab — model filtering (#10703)", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/api/models")) {
        return new Response(
          JSON.stringify({
            models: [
              { provider: "openai", model: "gpt-4o-mini", supportsVision: true },
              { provider: "cmd", model: "gpt-5.3-codex", supportsVision: false },
            ],
          }),
          { status: 200 }
        );
      }
      if (url.includes("/api/modality-bridge/stats")) {
        return new Response(
          JSON.stringify({
            vision: { bridged: 0, cacheHits: 0, failures: 0, lastUsedAt: null },
            audio: { bridged: 0, cacheHits: 0, failures: 0, lastUsedAt: null },
          }),
          { status: 200 }
        );
      }
      if (url.includes("/api/settings")) {
        if (init?.method === "PATCH") return new Response("{}", { status: 200 });
        return new Response(JSON.stringify({}), { status: 200 });
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

  it("only lists vision-capable models in the Vision model select", async () => {
    const el = await render();
    const modelLabel = Array.from(el.querySelectorAll("label")).find((label) =>
      label.textContent?.includes("modalityBridgeVisionModel")
    );
    const modelSelect = modelLabel?.parentElement?.querySelector("select") ?? null;
    expect(modelSelect).toBeTruthy();
    await waitFor(() => (modelSelect?.options.length ?? 0) > 1, "model options to load");
    const optionValues = Array.from(modelSelect?.options ?? []).map((o) => o.value);
    expect(optionValues).toContain("openai/gpt-4o-mini");
    expect(optionValues).not.toContain("cmd/gpt-5.3-codex");
  });
});
