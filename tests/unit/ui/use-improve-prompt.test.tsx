// @vitest-environment jsdom
// tests/unit/ui/use-improve-prompt.test.tsx
// Runs via Vitest (vitest.config.ts)
// Uses React DOM directly (no @testing-library/dom dep required).
import React, { act, useRef } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  useImprovePrompt,
} from "../../../src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt";
import type { ImprovePromptResult } from "../../../src/lib/playground/promptImprover";

// ─── Minimal hook test harness ────────────────────────────────────────────────

type HookResult<T> = { current: T };

function mountHook<T>(useHook: () => T): {
  hookRef: HookResult<T>;
  unmount: () => void;
} {
  const hookRef: HookResult<T> = { current: undefined as unknown as T };
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  function HookComponent() {
    const captureRef = useRef<T>(undefined as unknown as T);
    captureRef.current = useHook();
    // eslint-disable-next-line react-hooks/immutability -- test harness: intentionally writes to outer capture object from inside component
    hookRef.current = captureRef.current;
    return null;
  }

  act(() => {
    root.render(React.createElement(HookComponent));
  });

  return {
    hookRef,
    unmount: () => {
      act(() => root.unmount());
      container.remove();
    },
  };
}

// ─── Test fixtures ────────────────────────────────────────────────────────────

const MOCK_RESULT: ImprovePromptResult = {
  improvedSystem: "You are a concise assistant.",
  improvedPrompt: "Summarize this text in 3 bullet points.",
  tokensIn: 120,
  tokensOut: 80,
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("useImprovePrompt", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts with loading=false and no error", () => {
    const { hookRef: result, unmount } = mountHook(() => useImprovePrompt());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    unmount();
  });

  it("returns result and clears loading on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => MOCK_RESULT,
      }),
    );

    const { hookRef: result, unmount } = mountHook(() => useImprovePrompt());

    let returned: ImprovePromptResult | null = null;
    await act(async () => {
      returned = await result.current.improve({
        system: "You are helpful.",
        prompt: "Summarize this.",
        model: "gpt-4o",
      });
    });

    expect(returned).toEqual(MOCK_RESULT);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    unmount();
  });

  it("calls POST /api/playground/improve-prompt with correct body", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => MOCK_RESULT,
    });
    vi.stubGlobal("fetch", mockFetch);

    const { hookRef: result, unmount } = mountHook(() => useImprovePrompt());
    const req = {
      system: "You are helpful.",
      prompt: "Summarize this.",
      model: "gpt-4o",
      tone: "detailed" as const,
    };

    await act(async () => {
      await result.current.improve(req);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/playground/improve-prompt",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      }),
    );
    unmount();
  });

  it("sets error state and returns null when server returns non-ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ error: { message: "At least one field required" } }),
      }),
    );

    const { hookRef: result, unmount } = mountHook(() => useImprovePrompt());

    let returned: ImprovePromptResult | null = null;
    await act(async () => {
      returned = await result.current.improve({ model: "gpt-4o" });
    });

    expect(returned).toBeNull();
    expect(result.current.error).toBe("At least one field required");
    expect(result.current.loading).toBe(false);
    unmount();
  });

  it("sets error state when fetch throws (network error)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network failure")),
    );

    const { hookRef: result, unmount } = mountHook(() => useImprovePrompt());

    let returned: ImprovePromptResult | null = null;
    await act(async () => {
      returned = await result.current.improve({
        prompt: "Fix my prompt",
        model: "gpt-4o",
      });
    });

    expect(returned).toBeNull();
    expect(result.current.error).toBe("Network failure");
    expect(result.current.loading).toBe(false);
    unmount();
  });

  it("clears previous error on a successful subsequent call", async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: { message: "Server error" } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => MOCK_RESULT,
      });
    vi.stubGlobal("fetch", mockFetch);

    const { hookRef: result, unmount } = mountHook(() => useImprovePrompt());

    // First call — fails
    await act(async () => {
      await result.current.improve({ prompt: "test", model: "gpt-4o" });
    });
    expect(result.current.error).toBe("Server error");

    // Second call — succeeds
    await act(async () => {
      await result.current.improve({ prompt: "test", model: "gpt-4o" });
    });
    expect(result.current.error).toBeNull();
    unmount();
  });

  it("handles missing error message in response body gracefully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        json: async () => ({}),
      }),
    );

    const { hookRef: result, unmount } = mountHook(() => useImprovePrompt());

    await act(async () => {
      await result.current.improve({ prompt: "test", model: "gpt-4o" });
    });

    expect(result.current.error).toBe("HTTP 503");
    unmount();
  });
});
