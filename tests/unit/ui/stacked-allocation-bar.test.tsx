// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    if (params && "percent" in params) return `${key}:${params.percent}`;
    return key;
  },
}));

const { default: StackedAllocationBar } = await import(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/components/StackedAllocationBar"
);

const ALLOCATIONS_3 = [
  { apiKeyId: "key_1", weight: 50, policy: "hard" as const },
  { apiKeyId: "key_2", weight: 30, policy: "soft" as const },
  { apiKeyId: "key_3", weight: 20, policy: "burst" as const },
];

const ALLOCATIONS_1 = [{ apiKeyId: "key_1", weight: 100, policy: "hard" as const }];

const KEY_LABELS: Record<string, string> = {
  key_1: "KeyOne",
  key_2: "KeyTwo",
  key_3: "KeyThree",
};

let container: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;

async function render(props: Parameters<typeof StackedAllocationBar>[0]) {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    root = createRoot(container!);
    root.render(<StackedAllocationBar {...props} />);
  });
}

describe("StackedAllocationBar", { timeout: 10000 }, () => {
  afterEach(() => {
    if (root && container) act(() => root!.unmount());
    container?.remove();
    container = null;
    root = null;
  });

  it("returns null when allocations is empty", async () => {
    await render({ allocations: [], usage: null, keyLabels: {} });
    // Nothing rendered — container should be empty
    expect(container!.innerHTML).toBe("");
  });

  it("renders 3 segments when given 3 allocations", async () => {
    await render({ allocations: ALLOCATIONS_3, usage: null, keyLabels: KEY_LABELS });
    // Each segment is a div inside the stacked bar flex container
    const bar = container!.querySelector(".flex.h-3.rounded");
    expect(bar).not.toBeNull();
    const segments = bar!.children;
    expect(segments.length).toBe(3);
  });

  it("each segment has the correct width style", async () => {
    await render({ allocations: ALLOCATIONS_3, usage: null, keyLabels: KEY_LABELS });
    const bar = container!.querySelector(".flex.h-3.rounded");
    expect(bar).not.toBeNull();
    const segments = bar!.children;
    expect((segments[0] as HTMLElement).style.width).toBe("50%");
    expect((segments[1] as HTMLElement).style.width).toBe("30%");
    expect((segments[2] as HTMLElement).style.width).toBe("20%");
  });

  it("renders 1 segment when given 1 allocation", async () => {
    await render({ allocations: ALLOCATIONS_1, usage: null, keyLabels: KEY_LABELS });
    const bar = container!.querySelector(".flex.h-3.rounded");
    expect(bar).not.toBeNull();
    expect(bar!.children.length).toBe(1);
    expect((bar!.children[0] as HTMLElement).style.width).toBe("100%");
  });

  it("renders segments with weight but no 'usedSuffix' text when usage is null", async () => {
    await render({ allocations: ALLOCATIONS_3, usage: null, keyLabels: KEY_LABELS });
    // Labels exist with weight
    expect(container!.innerHTML).toContain("KeyOne 50%");
    expect(container!.innerHTML).toContain("KeyTwo 30%");
    expect(container!.innerHTML).toContain("KeyThree 20%");
    // No "usedSuffix" text since no usage
    expect(container!.innerHTML).not.toContain("usedSuffix");
  });

  it("renders usedSuffix labels when usage is provided", async () => {
    const usage = {
      poolId: "pool_1",
      generatedAt: new Date().toISOString(),
      dimensions: [
        {
          unit: "tokens",
          window: "daily",
          limit: 1000,
          consumedTotal: 600,
          perKey: [
            { apiKeyId: "key_1", consumed: 400, fairShare: 500, deficit: -100, borrowing: false },
            { apiKeyId: "key_2", consumed: 120, fairShare: 300, deficit: 180, borrowing: false },
          ],
        },
      ],
    };
    await render({
      allocations: ALLOCATIONS_3,
      usage: usage as never,
      keyLabels: KEY_LABELS,
      dimensionIndex: 0,
    });
    // key_1: consumed 400, fairShare 500 → 80%
    expect(container!.innerHTML).toContain("usedSuffix:80");
    // key_2: consumed 120, fairShare 300 → 40%
    expect(container!.innerHTML).toContain("usedSuffix:40");
    // key_3 has no usage entry — no usedSuffix for that key
    expect(container!.innerHTML).toContain("KeyThree 20%");
  });

  it("renders the stackedBarTitle header", async () => {
    await render({ allocations: ALLOCATIONS_1, usage: null, keyLabels: KEY_LABELS });
    expect(container!.innerHTML).toContain("stackedBarTitle");
  });

  it("falls back to apiKeyId when keyLabel is not provided", async () => {
    await render({ allocations: ALLOCATIONS_1, usage: null, keyLabels: {} });
    // No label provided — apiKeyId "key_1" should appear
    expect(container!.innerHTML).toContain("key_1");
  });
});
