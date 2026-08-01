// @vitest-environment jsdom
/**
 * CursorAgentNudge (Cursor renewal plan, Task 5) — dismissible dashboard
 * banner suggesting `cursor-agent` installation when it's unavailable.
 * Mirrors tests/unit/ui/kimiSponsorBanner.test.tsx's technique for the same
 * useSyncExternalStore + localStorage dismissal pattern (KimiSponsorBanner.tsx
 * is the precedent this component follows), and this directory's own
 * __tests__/phase1d.test.tsx for the createRoot/act mounting convention.
 */
// NOTE ON WHICH CONFIG DISCOVERS THIS FILE (kept as a `//` block — see why
// below): unlike tests/unit/ui/use-provider-connections-cursor-refresh.test.tsx
// and tests/unit/ui/connectionsSearchFilter.test.tsx (which had to relocate
// out of their __tests__/ directories because vitest.mcp.config.ts's
// src/app/(dashboard)/**/__tests__/**/*.test.tsx glob spells out the
// (dashboard) path segment literally, which tinyglobby parses as an (empty)
// extglob group — matching nothing), THIS file's location IS correct per the
// plan: vitest.config.ts's glob (src/app/**/dashboard/providers/**/__tests__/
// **/*.test.tsx) never spells out (dashboard) literally — its ** wildcard
// swallows that segment regardless of its literal name — so it matches here
// without hitting the same bug. That means this file is collected only by
// vitest.config.ts (`npm run test:vitest:ui`), NOT by vitest.mcp.config.ts
// (`npm run test:vitest`) — confirmed via a direct `vitest list` probe
// against both configs. Both jobs are CI-blocking (`test:vitest:ui` was
// promoted from advisory to blocking per ci.yml's own comment, PR #7127),
// so this is a coverage-attribution quirk, not a real CI gap — this file
// still runs and gates merges, just via the sibling config.
// (This note is a `//` block, not part of the /** */ JSDoc above, because
// the glob patterns it quotes contain a literal `*/` sequence that would
// otherwise terminate a block comment early.)
import React from "react";
import { act } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CursorAgentNudge from "../CursorAgentNudge";

const STORAGE_KEY = "omniroute.cursorAgentNudgeDismissed";

vi.mock("next-intl", () => ({ useTranslations: () => (k: string) => k }));

function mockFetch(cursorAgentAvailable: boolean | null) {
  return vi.fn(async (url: string) => {
    if (cursorAgentAvailable === null) {
      return { ok: false, json: async () => ({}) } as Response;
    }
    return { ok: true, json: async () => ({ cursorAgentAvailable }) } as Response;
  });
}

async function flushEffects() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

function renderNudge(): HTMLDivElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(<CursorAgentNudge />);
  });
  return container;
}

describe("CursorAgentNudge", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    localStorage.removeItem(STORAGE_KEY);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    localStorage.removeItem(STORAGE_KEY);
    vi.unstubAllGlobals();
  });

  it("renders when cursorAgentAvailable is false", async () => {
    vi.stubGlobal("fetch", mockFetch(false));
    const container = renderNudge();
    await flushEffects();

    expect(container.querySelector("[role='complementary']")).not.toBeNull();
  });

  it("does not render when cursorAgentAvailable is true", async () => {
    vi.stubGlobal("fetch", mockFetch(true));
    const container = renderNudge();
    await flushEffects();

    expect(container.querySelector("[role='complementary']")).toBeNull();
  });

  it("does not render while the availability check is still pending or unreachable", async () => {
    vi.stubGlobal("fetch", mockFetch(null)); // res.ok === false -> stays in the "unknown" state
    const container = renderNudge();
    await flushEffects();

    expect(container.querySelector("[role='complementary']")).toBeNull();
  });

  it("fetches /api/providers/cursor/agent-availability, NOT /api/oauth/cursor/auto-import", async () => {
    const fetchMock = mockFetch(false);
    vi.stubGlobal("fetch", fetchMock);
    renderNudge();
    await flushEffects();

    expect(fetchMock).toHaveBeenCalledWith("/api/providers/cursor/agent-availability");
    for (const call of fetchMock.mock.calls) {
      expect(String(call[0])).not.toContain("/api/oauth/cursor/auto-import");
    }
  });

  it("dismiss button hides the banner and persists the dismissal to localStorage", async () => {
    vi.stubGlobal("fetch", mockFetch(false));
    const container = renderNudge();
    await flushEffects();
    expect(container.querySelector("[role='complementary']")).not.toBeNull();

    const dismissButton = container.querySelector("button");
    expect(dismissButton).not.toBeNull();
    act(() => {
      dismissButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.querySelector("[role='complementary']")).toBeNull();
    expect(localStorage.getItem(STORAGE_KEY)).toBe("true");
  });

  it("stays hidden across a fresh render once dismissed (localStorage persistence — no reappear)", async () => {
    localStorage.setItem(STORAGE_KEY, "true");
    vi.stubGlobal("fetch", mockFetch(false)); // still "unavailable" — dismissal alone must suppress it
    const container = renderNudge();
    await flushEffects();

    expect(container.querySelector("[role='complementary']")).toBeNull();
  });

  it("stays hidden after an actual unmount+remount of the same dismissed state", async () => {
    vi.stubGlobal("fetch", mockFetch(false));
    const first = document.createElement("div");
    document.body.appendChild(first);
    const firstRoot = createRoot(first);
    act(() => {
      firstRoot.render(<CursorAgentNudge />);
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const dismissButton = first.querySelector("button");
    act(() => {
      dismissButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    act(() => {
      firstRoot.unmount();
    });
    first.remove();

    const second = renderNudge();
    await flushEffects();
    expect(second.querySelector("[role='complementary']")).toBeNull();
  });

  it("hydrates without a mismatch warning (SSR always renders nothing before the fetch resolves)", async () => {
    vi.stubGlobal("fetch", mockFetch(false));

    const serverHtml = renderToString(<CursorAgentNudge />);
    // The component renders null on the server (available starts at null,
    // getServerSnapshot() returns true but `available !== false` short-circuits
    // the render to null regardless) — this proves that invariant holds.
    expect(serverHtml).toBe("");

    const container = document.createElement("div");
    container.innerHTML = serverHtml;
    document.body.appendChild(container);

    const errors: unknown[][] = [];
    const originalConsoleError = console.error;
    console.error = (...args: unknown[]) => {
      errors.push(args);
    };

    try {
      act(() => {
        hydrateRoot(container, <CursorAgentNudge />);
      });
    } finally {
      console.error = originalConsoleError;
    }

    const hydrationWarnings = errors.filter((args) =>
      args.some((a) => typeof a === "string" && /hydrat/i.test(a))
    );
    expect(hydrationWarnings).toEqual([]);
  });
});
