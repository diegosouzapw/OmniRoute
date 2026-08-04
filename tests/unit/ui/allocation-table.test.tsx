// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

// next-intl: no local mock — falls through to the real-EN-text default mock in
// tests/_setup/vitestUiPolyfills.ts. The previous `(key) => key` mock rendered
// "policyHard"/"policySoft" literally, which failed the "renders policy badges" test's
// lowercase "hard"/"soft" check below (case mismatch: "policyHard" vs "hard"). The real
// en.json copy for both keys is the plain lowercase word.

const { default: AllocationTable } = await import(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/components/AllocationTable"
);

const ALLOCATIONS = [
  { apiKeyId: "key_1", weight: 60, policy: "hard" as const },
  { apiKeyId: "key_2", weight: 40, policy: "soft" as const },
];

const KEY_LABELS: Record<string, string> = { key_1: "KeyOne", key_2: "KeyTwo" };

let container: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;

async function render(props: Parameters<typeof AllocationTable>[0]) {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    root = createRoot(container!);
    root.render(<AllocationTable {...props} />);
  });
}

describe("AllocationTable", { timeout: 10000 }, () => {
  afterEach(() => {
    if (root && container) act(() => root!.unmount());
    container?.remove();
    container = null;
    root = null;
  });

  it("renders empty state when no allocations", async () => {
    await render({ allocations: [], usage: null, keyLabels: {} });
    // quotaShare.noAllocations in src/i18n/messages/en.json
    expect(document.body.innerHTML).toContain("No keys allocated yet");
  });

  it("renders key labels", async () => {
    await render({ allocations: ALLOCATIONS, usage: null, keyLabels: KEY_LABELS });
    expect(document.body.innerHTML).toContain("KeyOne");
    expect(document.body.innerHTML).toContain("KeyTwo");
  });

  it("renders weights correctly", async () => {
    await render({ allocations: ALLOCATIONS, usage: null, keyLabels: KEY_LABELS });
    expect(document.body.innerHTML).toContain("60%");
    expect(document.body.innerHTML).toContain("40%");
  });

  it("renders policy badges", async () => {
    await render({ allocations: ALLOCATIONS, usage: null, keyLabels: KEY_LABELS });
    expect(document.body.innerHTML).toContain("hard");
    expect(document.body.innerHTML).toContain("soft");
  });

  it("renders consumed values from usage perKey data", async () => {
    const usage = {
      dimensions: [
        {
          unit: "tokens",
          window: "daily",
          limit: 1000,
          consumedTotal: 400,
          perKey: [
            { apiKeyId: "key_1", consumed: 300, fairShare: 600, deficit: -300, borrowing: false },
            { apiKeyId: "key_2", consumed: 100, fairShare: 400, deficit: 300, borrowing: true },
          ],
        },
      ],
      burnRate: null,
    };
    await render({ allocations: ALLOCATIONS, usage: usage as never, keyLabels: KEY_LABELS });
    expect(document.body.innerHTML).toContain("300");
    expect(document.body.innerHTML).toContain("100");
    // borrowing indicator for key_2 (quotaShare.borrowingIndicator in en.json)
    expect(document.body.innerHTML).toContain("borrowing");
  });
});
