// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const copyToClipboard = vi.fn();

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}`,
}));

vi.mock("@/shared/utils/clipboard", () => ({ copyToClipboard }));

const roots: Root[] = [];

async function renderViewer() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  roots.push(root);

  const { default: ConsoleLogViewer } =
    await import("../../../src/shared/components/ConsoleLogViewer");

  await act(async () => {
    root.render(<ConsoleLogViewer />);
    await Promise.resolve();
  });
  await act(async () => {
    vi.advanceTimersByTime(0);
    await Promise.resolve();
  });

  return container;
}

describe("ConsoleLogViewer accessibility", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    copyToClipboard.mockResolvedValue(true);
    vi.useFakeTimers();
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          timestamp: "2026-08-26T00:00:00.000Z",
          level: "info",
          message: "ready",
        },
        {
          timestamp: "2026-08-26T00:00:01.000Z",
          level: "warn",
          message: "waiting",
        },
      ],
    });
  });

  afterEach(() => {
    for (const root of roots.splice(0)) {
      act(() => root.unmount());
    }
    document.body.innerHTML = "";
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("names icon-only controls and exposes keyboard-visible copy feedback", async () => {
    const container = await renderViewer();
    const refresh = container.querySelector<HTMLButtonElement>(
      'button[aria-label="common.refresh"]'
    );
    const copy = container.querySelector<HTMLButtonElement>(
      'button[aria-label="logs.consoleViewer.copyLogEntry"]'
    );

    expect(refresh).not.toBeNull();
    expect(refresh?.querySelector(".material-symbols-outlined")?.getAttribute("aria-hidden")).toBe(
      "true"
    );
    expect(copy).not.toBeNull();
    expect(copy?.className).toContain("focus-visible:opacity-100");
    expect(copy?.querySelector(".material-symbols-outlined")?.getAttribute("aria-hidden")).toBe(
      "true"
    );

    await act(async () => {
      copy?.click();
      await Promise.resolve();
    });

    const status = container.querySelector('[role="status"][aria-live="polite"]');
    expect(status?.textContent).toBe("common.copied");
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(container.querySelector('[role="status"]')).toBeNull();
  });

  it("keeps the latest copy announcement for its full timeout", async () => {
    const container = await renderViewer();
    const buttons = container.querySelectorAll<HTMLButtonElement>(
      'button[aria-label="logs.consoleViewer.copyLogEntry"]'
    );
    expect(buttons).toHaveLength(2);

    await act(async () => {
      buttons[0].click();
      await Promise.resolve();
      vi.advanceTimersByTime(1000);
      buttons[1].click();
      await Promise.resolve();
      vi.advanceTimersByTime(1000);
    });
    expect(container.querySelector('[role="status"]')?.textContent).toBe("common.copied");

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(container.querySelector('[role="status"]')).toBeNull();
  });

  it("clears pending copy feedback when unmounted", async () => {
    const container = await renderViewer();
    const copy = container.querySelector<HTMLButtonElement>(
      'button[aria-label="logs.consoleViewer.copyLogEntry"]'
    );

    await act(async () => {
      copy?.click();
      await Promise.resolve();
    });

    const root = roots.pop();
    act(() => root?.unmount());
    expect(vi.getTimerCount()).toBe(0);
  });
});
