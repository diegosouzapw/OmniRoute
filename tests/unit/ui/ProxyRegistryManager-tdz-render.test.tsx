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

// The component is imported STATICALLY on purpose. Pulling it in with a dynamic
// `await import()` inside the test body charged the whole Vite transform of its
// dependency tree (measured at ~86s on a loaded box) against the per-test
// timeout, so the guard timed out instead of asserting anything. At module
// scope that cost is paid during collection, which has no per-test budget.
// The regression itself is unaffected: the #5918 ReferenceError is thrown while
// the component body RENDERS, not while the module is evaluated.
import ProxyRegistryManager from "@/app/(dashboard)/dashboard/settings/components/ProxyRegistryManager";

describe("ProxyRegistryManager (TDZ regression #5918)", () => {
  it("server-renders without a use-before-init ReferenceError", () => {
    const html = renderToString(React.createElement(ProxyRegistryManager));
    // The heading key is rendered via the mocked translator (key echo).
    expect(html).toContain("title");
    expect(html).toContain("w-full border-t border-border");
    expect(html).toContain("flex w-full flex-wrap items-center justify-end gap-2");
  });
});
