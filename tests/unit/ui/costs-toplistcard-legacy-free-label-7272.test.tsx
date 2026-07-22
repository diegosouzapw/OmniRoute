// @vitest-environment jsdom
// Regression for issue #7272: /dashboard/costs?range=all&apiKeyIds=...&groupBy=model
// crashed with "ReferenceError: t is not defined" because TopListCard referenced the
// bare `t` identifier from an outer component's scope instead of receiving the
// resolved label as a prop (mirroring the working CostBreakdownTable pattern).
//
// Lives under tests/unit/ui/ (not the top-level tests/unit/) because TopListCard's
// import chain (via `@/shared/components` -> ProviderIcon) transitively pulls in
// @lobehub/icons, which ships pure-ESM .js files the node:test runner (`npm run
// test:unit`) cannot load ("Unexpected token 'export'"). tests/unit/ui/*.test.tsx
// runs under the Vitest project (`npm run test:vitest:ui`, blocking in the
// `test-vitest` CI job) which handles the ESM import chain natively.
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";

const { TopListCard } = await import(
  "../../../src/app/(dashboard)/dashboard/costs/components/TopListCard"
);

let container: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;

async function render(props: Record<string, unknown>) {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    root = createRoot(container!);
    root.render(React.createElement(TopListCard, props));
  });
}

describe("TopListCard (#7272)", () => {
  afterEach(() => {
    if (root && container) act(() => root!.unmount());
    container?.remove();
    container = null;
    root = null;
  });

  it("renders the legacyFreeLabel prop for the zero-cost / !hasCostData branch without throwing", async () => {
    const rows = [{ model: "some-free-model", cost: 0, totalTokens: 100 }];

    await render({
      title: "Top Models",
      rows,
      nameKey: "model",
      valueKey: "cost",
      secondaryKey: "totalTokens",
      secondaryLabel: "tokens",
      locale: "en",
      hasCostData: false,
      legacyFreeLabel: "Legacy / Free",
    });

    expect(container?.innerHTML).toMatch(/Legacy \/ Free/);
  });

  it("renders the formatted cost when hasCostData is true (unaffected branch)", async () => {
    const rows = [{ model: "gpt-5", cost: 1.23, totalTokens: 500 }];

    await render({
      title: "Top Models",
      rows,
      nameKey: "model",
      valueKey: "cost",
      secondaryKey: "totalTokens",
      secondaryLabel: "tokens",
      locale: "en",
      hasCostData: true,
      legacyFreeLabel: "Legacy / Free",
    });

    expect(container?.innerHTML).not.toMatch(/Legacy \/ Free/);
  });
});
