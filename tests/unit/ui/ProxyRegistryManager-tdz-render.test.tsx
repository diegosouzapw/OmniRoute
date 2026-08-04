// @vitest-environment jsdom
import React from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

// Regression guard for the #5918 TDZ crash: ProxyRegistryManager called
// `useProxyBatchOperations(load)` BEFORE the `const load = useCallback(...)`
// declaration in the component body, so every SERVER render threw
// `ReferenceError: Cannot access 'load' before initialization` — the whole
// /dashboard/system/proxy page 500'd in production (digest 539380095), caught
// only by the release-PR e2e smoke (the PR→release fast-gates render nothing).
// renderToString mirrors that SSR path exactly (no effects, no fetches) and is
// synchronous — this test fails-without-the-fix at the first render.

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("ProxyRegistryManager (TDZ regression #5918)", () => {
  it("server-renders without a use-before-init ReferenceError", { timeout: 30000 }, async () => {
    const { default: ProxyRegistryManager } =
      await import("@/app/(dashboard)/dashboard/settings/components/ProxyRegistryManager");
    const html = renderToString(React.createElement(ProxyRegistryManager));
    // The heading key is rendered via the mocked translator (key echo).
    expect(html).toContain("title");
  });
});
