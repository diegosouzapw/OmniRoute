// #7937 — provider tab account search (cross-page substring match) + the
// `setAccountSearch` page-reset wired through useProviderConnections.
//
// NOTE ON LOCATION: this logically belongs next to
// `src/app/(dashboard)/dashboard/providers/[id]/__tests__/`, but that
// directory's `.test.tsx` collector (`vitest.mcp.config.ts`,
// `src/app/(dashboard)/**/__tests__/**/*.test.tsx`) does not actually match
// under the real glob engine (tinyglobby treats the literal `(dashboard)`
// path segment as an (empty) extglob group, matching nothing — confirmed via
// `check-test-discovery.mjs`'s own collector list vs. a direct
// `tinyglobby.globSync()` probe). Per the #7937 plan's fallback, this test
// lives under `tests/unit/ui/` instead, which IS collected + BLOCKING via
// `npm run test:vitest:ui` (ci.yml `test-vitest` job).
//
// 1. matchesAccountQuery / filterConnectionsByQuery — pure substring matcher
//    (id, tag, name, email), case-insensitive, empty-query pass-through.
// 2. useProviderConnections — accountSearch defaults to "", and setAccountSearch
//    resets `page` back to 0 (mirrors the existing setPage(0) on pill click).

import React, { act, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  matchesAccountQuery,
  filterConnectionsByQuery,
} from "@/app/(dashboard)/dashboard/providers/[id]/connectionsSearchFilter";
import type { ConnectionRowConnection } from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow";

// ---------------------------------------------------------------------------
// matchesAccountQuery / filterConnectionsByQuery — pure logic
// ---------------------------------------------------------------------------

const CONNECTIONS: ConnectionRowConnection[] = [
  { id: "conn-1", name: "Alice", email: "alice@gmail.com", providerSpecificData: { tag: "prod" } },
  { id: "conn-2", name: "Bob", email: "bob@example.com", providerSpecificData: { tag: "staging" } },
  { id: "conn-3", name: "Carol", email: "carol@gmail.com" },
  { id: "special-id-9", name: undefined, email: undefined },
];

describe("matchesAccountQuery / filterConnectionsByQuery — #7937", () => {
  it("returns every connection whose email contains the substring (partial, not exact)", () => {
    const result = filterConnectionsByQuery("@gmail.com", CONNECTIONS);
    expect(result.map((c) => c.id)).toEqual(["conn-1", "conn-3"]);
  });

  it("matches across the FULL list, not just a single page (cross-page search)", () => {
    // Simulate a >50-account list split across two pages; the match on
    // page 2 must be found even though we only pass the full array in.
    const page1 = CONNECTIONS.slice(0, 2);
    const page2 = CONNECTIONS.slice(2);
    const fullList = [...page1, ...page2];
    const result = filterConnectionsByQuery("carol", fullList);
    expect(result.map((c) => c.id)).toEqual(["conn-3"]);
  });

  it("matches on id and tag, not only email/name", () => {
    expect(matchesAccountQuery("special-id-9", CONNECTIONS[3])).toBe(true);
    expect(matchesAccountQuery("staging", CONNECTIONS[1])).toBe(true);
    expect(matchesAccountQuery("prod", CONNECTIONS[0])).toBe(true);
    expect(matchesAccountQuery("prod", CONNECTIONS[1])).toBe(false);
  });

  it("empty or whitespace-only query passes every connection through unchanged", () => {
    expect(filterConnectionsByQuery("", CONNECTIONS)).toBe(CONNECTIONS);
    expect(filterConnectionsByQuery("   ", CONNECTIONS)).toBe(CONNECTIONS);
  });

  it("is case-insensitive", () => {
    expect(matchesAccountQuery("ALICE", CONNECTIONS[0])).toBe(true);
    expect(matchesAccountQuery("GMAIL.COM", CONNECTIONS[0])).toBe(true);
    expect(matchesAccountQuery("PROD", CONNECTIONS[0])).toBe(true);
  });

  it("does not match a connection missing the queried field", () => {
    expect(matchesAccountQuery("anything", CONNECTIONS[3])).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// useProviderConnections — accountSearch state + page reset
// ---------------------------------------------------------------------------

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "test-provider" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/providers/test-provider",
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (values) {
      return Object.entries(values).reduce((acc, [k, v]) => acc.replace(`{${k}}`, String(v)), key);
    }
    return key;
  },
}));

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  }),
}));

const fetchStub = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({}),
  text: async () => "",
  headers: { get: () => null },
} as any);
vi.stubGlobal("fetch", fetchStub);

describe("useProviderConnections — accountSearch (#7937)", () => {
  let container: HTMLElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    fetchStub.mockClear();
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("defaults accountSearch to empty string and exposes setAccountSearch", async () => {
    const { useProviderConnections } = await import(
      "@/app/(dashboard)/dashboard/providers/[id]/hooks/useProviderConnections"
    );

    type HookResult = ReturnType<typeof useProviderConnections>;
    let result: HookResult | null = null;

    function TestWrapper() {
      const hookResult = useProviderConnections("openai", true, false);
      useEffect(() => {
        result = hookResult;
      }, [hookResult]);
      return <span />;
    }

    await act(async () => {
      root.render(<TestWrapper />);
    });

    expect(result!.accountSearch).toBe("");
    expect(typeof result!.setAccountSearch).toBe("function");
  });

  it("resets page to 0 when the search query changes", async () => {
    const { useProviderConnections } = await import(
      "@/app/(dashboard)/dashboard/providers/[id]/hooks/useProviderConnections"
    );

    type HookResult = ReturnType<typeof useProviderConnections>;
    let result: HookResult | null = null;

    function TestWrapper() {
      const hookResult = useProviderConnections("openai", true, false);
      useEffect(() => {
        result = hookResult;
      }, [hookResult]);
      return <span />;
    }

    await act(async () => {
      root.render(<TestWrapper />);
    });

    // Move off page 0 first (simulates the user having paged down).
    await act(async () => {
      result!.setPage(3);
    });
    expect(result!.page).toBe(3);

    // Changing the search query must reset pagination back to page 0.
    await act(async () => {
      result!.setAccountSearch("gmail");
    });
    expect(result!.accountSearch).toBe("gmail");
    expect(result!.page).toBe(0);
  });
});
