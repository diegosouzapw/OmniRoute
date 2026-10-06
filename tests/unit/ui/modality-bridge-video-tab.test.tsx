// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ModalityBridgeVideoTab from "@/app/(dashboard)/dashboard/settings/components/modalityBridge/ModalityBridgeVideoTab";

vi.mock("next-intl", () => ({
  useTranslations: (namespace?: string) => (key: string) =>
    namespace === "settings" && key === "degradationFull"
      ? "MISSING:settings.degradationFull"
      : key,
}));

const roots: Array<{ root: Root; element: HTMLDivElement }> = [];

async function waitFor(predicate: () => boolean, label: string): Promise<void> {
  const startedAt = Date.now();
  while (!predicate()) {
    if (Date.now() - startedAt > 2_000) throw new Error(`Timed out waiting for ${label}`);
    await act(async () => new Promise((resolve) => setTimeout(resolve, 10)));
  }
}

describe("ModalityBridgeVideoTab", () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  let failPatch = false;
  let failSettingsLoad = false;
  let runtimeMode: "ready" | "unavailable" | "network-error" = "ready";

  beforeEach(() => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    failPatch = false;
    failSettingsLoad = false;
    runtimeMode = "ready";
    fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/api/modality-bridge/video/runtime")) {
        if (runtimeMode === "network-error") throw new Error("network unreachable");
        if (runtimeMode === "unavailable") {
          return Response.json({
            available: false,
            reason: "ffmpeg binary not found on PATH",
          });
        }
        return Response.json({
          available: true,
          ffmpegVersion: "6.1.1",
          ffprobeVersion: "6.1.1",
        });
      }
      if (url.includes("/api/modality-bridge/stats")) {
        return Response.json({
          video: {
            attempts: 4,
            successes: 3,
            bridged: 3,
            cacheHits: 1,
            failures: 1,
            totalLatencyMs: 400,
            averageLatencyMs: 100,
            lastUsedAt: null,
          },
        });
      }
      if (url.includes("/api/models")) {
        return Response.json({
          models: [
            { provider: "openai", model: "gpt-4o-mini", supportsVision: true },
            { provider: "example", model: "text-only", supportsVision: false },
          ],
        });
      }
      if (url.includes("/api/settings")) {
        if (init?.method === "PATCH") {
          return failPatch
            ? Response.json({ error: "sanitized" }, { status: 500 })
            : Response.json({});
        }
        if (failSettingsLoad) return Response.json({ error: "sanitized" }, { status: 500 });
        return Response.json({
          modalityBridgeVideoEnabled: false,
          modalityBridgeVideoModel: "openai/gpt-4o-mini",
          modalityBridgeVideoFrameCount: 8,
          modalityBridgeVideoMaxVideos: 1,
          modalityBridgeVideoTimeout: 120_000,
        });
      }
      return Response.json({});
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    for (const { root, element } of roots.splice(0)) {
      act(() => root.unmount());
      element.remove();
    }
    vi.unstubAllGlobals();
  });

  async function render(props: { runtimeHostname?: string } = {}): Promise<HTMLDivElement> {
    const element = document.createElement("div");
    document.body.appendChild(element);
    const root = createRoot(element);
    await act(async () => root.render(<ModalityBridgeVideoTab {...props} />));
    roots.push({ root, element });
    await waitFor(
      () => element.querySelector('[data-testid="modality-bridge-video-frame-count"]') !== null,
      "Video Bridge settings"
    );
    return element;
  }

  async function renderWithoutWaiting(): Promise<HTMLDivElement> {
    const element = document.createElement("div");
    document.body.appendChild(element);
    const root = createRoot(element);
    await act(async () => root.render(<ModalityBridgeVideoTab />));
    roots.push({ root, element });
    return element;
  }

  it("shows ready runtime versions, video stats, and only vision-capable models", async () => {
    const element = await render();
    await waitFor(() => element.textContent?.includes("6.1.1") ?? false, "runtime status");
    await waitFor(
      () => Array.from(element.querySelectorAll("option")).some((option) => option.value),
      "model options"
    );
    const options = Array.from(element.querySelectorAll("option")).map((option) => option.value);
    expect(options).toContain("openai/gpt-4o-mini");
    expect(options).not.toContain("example/text-only");
    expect(element.textContent).toContain("4 requestlogger.attempts");
    expect(element.textContent).toContain("3 modalityBridgeStatsBridged");
    expect(element.textContent).toContain("1 modalityBridgeStatsFailures");
    expect(element.textContent).toContain("trafficInspector.timingTotalLatency: 400 ms");
    expect(element.textContent).toContain("avgLatency: 100 ms");
    expect(element.textContent).not.toContain("modalityBridgeVideoComingSoon");
  });

  it("labels runtime status as strict loopback without probing it from a LAN dashboard", async () => {
    const element = await render({ runtimeHostname: "192.168.0.15" });

    expect(element.textContent).toContain("authz.badge.strict");
    expect(element.textContent).toContain("endpoint.badgeLoopbackTooltip");
    expect(element.textContent).not.toContain("modalityBridgeVideoRuntimeUnavailable");
    expect(element.textContent).not.toContain("modalityBridgeVideoRuntimeInstall");
    expect(
      fetchMock.mock.calls.some(([input]) =>
        String(input).includes("/api/modality-bridge/video/runtime")
      )
    ).toBe(false);
  });

  it("labels a confirmed-missing runtime as unavailable with its reason", async () => {
    runtimeMode = "unavailable";
    const element = await render();
    await waitFor(
      () => element.textContent?.includes("modalityBridgeVideoRuntimeUnavailable") ?? false,
      "unavailable runtime status"
    );
    expect(element.textContent).toContain("ffmpeg binary not found on PATH");
    expect(element.textContent).not.toContain("modalityBridgeVideoRuntimeChecking");
    expect(element.textContent).not.toContain("modalityBridgeVideoRuntimeReady");
  });

  it("labels a probe that could not complete as unknown, never as unavailable (#11657)", async () => {
    runtimeMode = "network-error";
    const element = await render();
    // The frame-count field is settings-only and renders regardless of the
    // runtime probe outcome, so `render()`'s own wait is sufficient here —
    // there is no separate "unknown" DOM marker to poll for.
    expect(element.textContent).toContain("modalityBridgeVideoRuntimeChecking");
    expect(element.textContent).not.toContain("modalityBridgeVideoRuntimeUnavailable");
    expect(element.textContent).not.toContain("modalityBridgeVideoRuntimeInstall");
  });

  it("persists the enable toggle and clamps frame count to 16", async () => {
    const element = await render();
    const toggle = element.querySelector('[role="switch"]') as HTMLButtonElement;
    await act(async () => toggle.click());
    const frameCount = element.querySelector(
      '[data-testid="modality-bridge-video-frame-count"]'
    ) as HTMLInputElement;
    act(() => {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      setter?.call(frameCount, "99");
      frameCount.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await act(async () => {
      frameCount.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(
      () =>
        fetchMock.mock.calls.some(([, init]) => {
          if (init?.method !== "PATCH") return false;
          const body = JSON.parse(String(init.body)) as Record<string, unknown>;
          return body.modalityBridgeVideoFrameCount === 16;
        }),
      "clamped frame count PATCH"
    );
    const patches = fetchMock.mock.calls
      .filter(([, init]) => init?.method === "PATCH")
      .map(([, init]) => JSON.parse(String(init?.body)) as Record<string, unknown>);
    expect(patches).toContainEqual({ modalityBridgeVideoEnabled: true });
  });

  it("defaults to full analysis and persists an explicit focused-mode opt-in", async () => {
    const element = await render();
    const analysisMode = element.querySelector(
      '[data-testid="modality-bridge-video-analysis-mode"]'
    ) as HTMLSelectElement | null;

    expect(analysisMode).not.toBeNull();
    expect(analysisMode?.value).toBe("full");
    expect(Array.from(analysisMode?.options ?? []).map((option) => option.value)).toEqual([
      "full",
      "focused",
    ]);
    expect(Array.from(analysisMode?.options ?? []).map((option) => option.textContent)).toEqual([
      "health.degradationFull",
      "modalityBridgeTaskAware",
    ]);
    const description = element.querySelector("#modality-bridge-video-analysis-mode-description");
    expect(description?.textContent).toBe("modalityBridgeVideoDesc");
    await act(async () => {
      if (!analysisMode) return;
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLSelectElement.prototype,
        "value"
      )?.set;
      setter?.call(analysisMode, "focused");
      analysisMode.dispatchEvent(new Event("change", { bubbles: true }));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(
      () =>
        fetchMock.mock.calls.some(([, init]) => {
          if (init?.method !== "PATCH") return false;
          const body = JSON.parse(String(init.body)) as Record<string, unknown>;
          return body.modalityBridgeVideoAnalysisMode === "focused";
        }),
      "focused analysis-mode PATCH"
    );
    expect(description?.textContent).toBe("modalityBridgeTaskAwareDesc");
    const modePatches = fetchMock.mock.calls
      .filter(([, init]) => init?.method === "PATCH")
      .map(([, init]) => JSON.parse(String(init?.body)) as Record<string, unknown>)
      .filter((body) => body.modalityBridgeVideoAnalysisMode !== undefined);
    expect(modePatches).toEqual([{ modalityBridgeVideoAnalysisMode: "focused" }]);
  });

  it("caps the configurable timeout at the broker's 120 second hard deadline", async () => {
    const element = await render();
    const timeout = element.querySelector(
      '[data-testid="modality-bridge-video-timeout"]'
    ) as HTMLInputElement;
    expect(timeout.max).toBe("120000");
    act(() => {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      setter?.call(timeout, "180000");
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
          const body = JSON.parse(String(init.body)) as Record<string, unknown>;
          return body.modalityBridgeVideoTimeout === 120_000;
        }),
      "clamped timeout PATCH"
    );
  });

  it("shows a load error instead of silently applying defaults", async () => {
    failSettingsLoad = true;
    const element = await renderWithoutWaiting();
    await waitFor(() => element.querySelector('[role="alert"]') !== null, "load error");
    expect(element.textContent).toContain("publicSystem.error.title");
    expect(element.querySelector('[data-testid="modality-bridge-video-frame-count"]')).toBeNull();
  });

  it("shows a save error and rolls an optimistic numeric edit back after failed PATCH", async () => {
    const element = await render();
    failPatch = true;
    const frameCount = element.querySelector(
      '[data-testid="modality-bridge-video-frame-count"]'
    ) as HTMLInputElement;
    act(() => {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      setter?.call(frameCount, "12");
      frameCount.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await act(async () => {
      frameCount.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    await waitFor(() => element.querySelector('[role="alert"]') !== null, "save error");
    expect(frameCount.value).toBe("8");
  });
});
