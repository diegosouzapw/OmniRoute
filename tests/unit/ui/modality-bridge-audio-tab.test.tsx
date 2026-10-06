// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ModalityBridgeAudioTab from "@/app/(dashboard)/dashboard/settings/components/modalityBridge/ModalityBridgeAudioTab";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const roots: Array<{ root: Root; el: HTMLDivElement }> = [];

async function waitFor(predicate: () => boolean, label: string): Promise<void> {
  const startedAt = Date.now();
  while (!predicate()) {
    if (Date.now() - startedAt > 2000) throw new Error(`Timed out waiting for: ${label}`);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
  }
}

describe("ModalityBridgeAudioTab", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/api/models/catalog")) {
        return Response.json({
          catalog: {
            deepgram: {
              provider: "Deepgram",
              models: [
                { id: "deepgram/nova-3", type: "audio", subtype: "transcription" },
                { id: "deepgram/aura", type: "audio", subtype: "speech" },
              ],
            },
            openai: {
              provider: "OpenAI",
              models: [{ id: "openai/gpt-5.6", type: "chat" }],
            },
          },
        });
      }
      if (url.includes("/api/models")) return Response.json({ models: [] });
      if (url.includes("/api/modality-bridge/stats")) {
        return Response.json({
          vision: { bridged: 0, cacheHits: 0, failures: 0, lastUsedAt: null },
          audio: { bridged: 4, cacheHits: 2, failures: 1, lastUsedAt: null },
        });
      }
      if (url.includes("/api/guardrails/test")) {
        return Response.json({
          blocked: false,
          results: [
            {
              guardrail: "audio-bridge",
              meta: { clipsProcessed: 1, sttModel: "deepgram/nova-3" },
            },
          ],
          payload: {},
        });
      }
      if (url.includes("/api/settings")) {
        if (init?.method === "PATCH") return Response.json({});
        return Response.json({
          modalityBridgeAudioEnabled: true,
          modalityBridgeAudioModel: "deepgram/nova-3",
          modalityBridgeAudioTimeout: 12_000,
          modalityBridgeAudioMaxClips: 2,
        });
      }
      return Response.json({});
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
      root.render(<ModalityBridgeAudioTab />);
    });
    roots.push({ root, el });
    await waitFor(
      () => el.querySelector('[data-testid="modality-bridge-audio-timeout"]') !== null,
      "audio settings"
    );
    return el;
  }

  it("shows only transcription models and exposes selectable Auto", async () => {
    const el = await render();
    expect(fetchMock).toHaveBeenCalledWith("/api/models/catalog");
    await waitFor(
      () =>
        Array.from(el.querySelectorAll("option")).some(
          (option) => option.value === "deepgram/nova-3"
        ),
      "STT models"
    );
    const optionValues = Array.from(el.querySelectorAll("option")).map((option) => option.value);
    expect(optionValues).toContain("");
    expect(optionValues).toContain("deepgram/nova-3");
    expect(optionValues).not.toContain("deepgram/aura");
    expect(optionValues).not.toContain("openai/gpt-5.6");
    expect(el.textContent).toContain("4 modalityBridgeStatsBridged");
    expect(el.textContent).toContain("5 requestlogger.attempts");
    expect(el.textContent).toContain("trafficInspector.timingTotalLatency: —");
    expect(el.textContent).toContain("avgLatency: —");
    expect(el.textContent).not.toContain("0 ms");
  });

  it("PATCHes only the new audio setting when toggled", async () => {
    const el = await render();
    const toggle = el.querySelector('[role="switch"]') as HTMLButtonElement;
    await act(async () => toggle.click());

    await waitFor(
      () => fetchMock.mock.calls.some(([, init]) => init?.method === "PATCH"),
      "audio PATCH"
    );
    const call = fetchMock.mock.calls.find(([, init]) => init?.method === "PATCH");
    const body = JSON.parse(String(call?.[1]?.body)) as Record<string, unknown>;
    expect(body).toEqual({ modalityBridgeAudioEnabled: false });
    expect(body).not.toHaveProperty("visionBridgeEnabled");
  });

  it("clamps the audio timeout before PATCHing", async () => {
    const el = await render();
    const timeout = el.querySelector(
      '[data-testid="modality-bridge-audio-timeout"]'
    ) as HTMLInputElement;
    act(() => {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      setter?.call(timeout, "500");
      timeout.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await act(async () => {
      timeout.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(
      () =>
        fetchMock.mock.calls.some(([, init]) => {
          if (init?.method !== "PATCH") return false;
          return JSON.parse(String(init.body)).modalityBridgeAudioTimeout === 1000;
        }),
      "clamped audio timeout"
    );
  });

  it("runs the Audio Bridge self-test with an input_audio part", async () => {
    const el = await render();
    const button = Array.from(el.querySelectorAll("button")).find((candidate) =>
      candidate.textContent?.includes("modalityBridgeAudioTestButton")
    );
    await act(async () => button?.click());
    await waitFor(
      () => el.textContent?.includes("modalityBridgeAudioTestOk") ?? false,
      "audio self-test result"
    );

    const call = fetchMock.mock.calls.find(([url]) => String(url).includes("/api/guardrails/test"));
    const body = JSON.parse(String(call?.[1]?.body)) as {
      input?: { messages?: Array<{ content?: Array<{ type?: string }> }> };
    };
    expect(body.input?.messages?.[0]?.content?.some((part) => part.type === "input_audio")).toBe(
      true
    );
  });
});
