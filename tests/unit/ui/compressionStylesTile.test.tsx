// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

const containers: HTMLElement[] = [];
const roots: Array<{ unmount: () => void }> = [];

function mount(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  roots.push(root);
  act(() => root.render(ui));
  return container;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(async () => {
  vi.restoreAllMocks();
  await act(async () => {
    while (roots.length > 0) roots.pop()?.unmount();
  });
  while (containers.length > 0) containers.pop()?.remove();
  document.body.innerHTML = "";
});

async function flush() {
  await act(async () => {
    for (let i = 0; i < 10; i++) await Promise.resolve();
  });
}

describe("CompressionStylesTile", () => {
  it("renders total savings and applied style ids from the summary endpoint", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          totalRuns: 4,
          totalTokensSaved: 1234,
          runsWithStyles: 3,
          bypassCount: 1,
          totalOutputTokens: 900,
          appliedStyleCounts: { "terse-prose": 3, "less-code": 1 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );
    const { default: CompressionStylesTile } =
      await import("../../../src/app/(dashboard)/dashboard/context/CompressionStylesTile");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionStylesTile />);
    });
    await flush();
    expect(container.textContent).toContain("1234");
    expect(container.textContent).toContain("terse-prose");
    expect(container.textContent).toContain("less-code");
  });
});
