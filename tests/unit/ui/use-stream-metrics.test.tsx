// @vitest-environment jsdom
// tests/unit/ui/use-stream-metrics.test.tsx
// Runs via Vitest (vitest.config.ts — includes tests/unit/**/*.test.tsx)
// Uses React DOM directly (no @testing-library/dom dep required).
import React, { act, useRef } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  useStreamMetrics,
} from "../../../src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics";
import type { UseStreamMetrics } from "../../../src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics";

// ─── Minimal hook test harness ────────────────────────────────────────────────
// Uses a React ref to capture hook values from inside the component — avoids
// react-hooks/immutability lint error (cannot write to outer const from inside component).

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
    // Expose the captured value through the outer hookRef via the React ref.
    // This is safe because captureRef lives inside the component.
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

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("useStreamMetrics", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts with initial zero/null metrics", () => {
    const { hookRef: result, unmount } = mountHook(() => useStreamMetrics());
    expect(result.current.metrics.ttftMs).toBeNull();
    expect(result.current.metrics.totalMs).toBeNull();
    expect(result.current.metrics.tps).toBeNull();
    expect(result.current.metrics.costUsd).toBeNull();
    expect(result.current.metrics.tokensIn).toBe(0);
    expect(result.current.metrics.tokensOut).toBe(0);
    unmount();
  });

  it("start() resets timing refs and updates metrics state", () => {
    const { hookRef: result, unmount } = mountHook(() => useStreamMetrics());

    act(() => {
      vi.setSystemTime(1000);
      result.current.start();
    });

    expect(result.current.metrics.ttftMs).toBeNull();
    expect(result.current.metrics.totalMs).toBeNull();
    expect(result.current.metrics.tokensIn).toBe(0);
    expect(result.current.metrics.tokensOut).toBe(0);
    unmount();
  });

  it("onFirstChunk() sets ttftMs relative to start", () => {
    const { hookRef: result, unmount } = mountHook(() => useStreamMetrics());

    act(() => {
      vi.setSystemTime(1000);
      result.current.start();
    });

    act(() => {
      vi.setSystemTime(1200);
      result.current.onFirstChunk();
    });

    expect(result.current.metrics.ttftMs).toBe(200);
    unmount();
  });

  it("onFirstChunk() is idempotent — only records first call", () => {
    const { hookRef: result, unmount } = mountHook(() => useStreamMetrics());

    act(() => {
      vi.setSystemTime(1000);
      result.current.start();
    });

    act(() => {
      vi.setSystemTime(1200);
      result.current.onFirstChunk();
    });

    act(() => {
      vi.setSystemTime(1500);
      result.current.onFirstChunk(); // should be ignored
    });

    expect(result.current.metrics.ttftMs).toBe(200);
    unmount();
  });

  it("finish() finalizes metrics with accumulated chunk tokens", () => {
    const { hookRef: result, unmount } = mountHook(() => useStreamMetrics());

    act(() => {
      vi.setSystemTime(1000);
      result.current.start();
    });

    act(() => {
      vi.setSystemTime(1200);
      result.current.onFirstChunk();
    });

    // onChunk accumulates in ref without flushing state
    result.current.onChunk(5);
    result.current.onChunk(5);
    result.current.onChunk(5);

    act(() => {
      vi.setSystemTime(3000);
      result.current.finish();
    });

    const m = result.current.metrics;
    expect(m.ttftMs).toBe(200);
    expect(m.totalMs).toBe(2000);
    expect(m.tokensOut).toBe(15);
    expect(m.tokensIn).toBe(0);
    // tps = 15 / (2000/1000) = 7.5
    expect(m.tps).toBeCloseTo(7.5);
    unmount();
  });

  it("finish(usage) overrides tokensIn + tokensOut with upstream values", () => {
    const { hookRef: result, unmount } = mountHook(() => useStreamMetrics());

    act(() => {
      vi.setSystemTime(1000);
      result.current.start();
    });

    act(() => {
      vi.setSystemTime(1200);
      result.current.onFirstChunk();
    });

    result.current.onChunk(5);
    result.current.onChunk(5);
    result.current.onChunk(5);

    act(() => {
      vi.setSystemTime(3000);
      result.current.finish({ prompt_tokens: 10, completion_tokens: 15 });
    });

    const m = result.current.metrics;
    expect(m.tokensIn).toBe(10);
    expect(m.tokensOut).toBe(15);
    expect(m.tps).toBeCloseTo(7.5);
    unmount();
  });

  it("finish(usage) with only prompt_tokens partial override", () => {
    const { hookRef: result, unmount } = mountHook(() => useStreamMetrics());

    act(() => {
      vi.setSystemTime(1000);
      result.current.start();
    });

    act(() => {
      vi.setSystemTime(1200);
      result.current.onFirstChunk();
    });

    result.current.onChunk(8);

    act(() => {
      vi.setSystemTime(3000);
      result.current.finish({ prompt_tokens: 20 });
    });

    const m = result.current.metrics;
    expect(m.tokensIn).toBe(20);
    expect(m.tokensOut).toBe(8);
    unmount();
  });

  it("computes costUsd when pricing is provided", () => {
    const pricing = { inUsdPer1k: 0.003, outUsdPer1k: 0.015 };
    const { hookRef: result, unmount } = mountHook(() => useStreamMetrics(pricing));

    act(() => {
      vi.setSystemTime(1000);
      result.current.start();
    });

    act(() => {
      vi.setSystemTime(1100);
      result.current.onFirstChunk();
    });

    act(() => {
      vi.setSystemTime(3000);
      result.current.finish({ prompt_tokens: 1000, completion_tokens: 500 });
    });

    // cost = (1000 * 0.003 + 500 * 0.015) / 1000 = 0.0105
    expect(result.current.metrics.costUsd).toBeCloseTo(0.0105);
    unmount();
  });

  it("costUsd is null when no pricing provided", () => {
    const { hookRef: result, unmount } = mountHook(() => useStreamMetrics());

    act(() => {
      vi.setSystemTime(1000);
      result.current.start();
    });
    act(() => {
      vi.setSystemTime(1200);
      result.current.finish({ prompt_tokens: 100, completion_tokens: 50 });
    });

    expect(result.current.metrics.costUsd).toBeNull();
    unmount();
  });

  it("reset() zeros all metrics", () => {
    const { hookRef: result, unmount } = mountHook(() => useStreamMetrics());

    act(() => {
      vi.setSystemTime(1000);
      result.current.start();
    });
    act(() => {
      vi.setSystemTime(1200);
      result.current.onFirstChunk();
    });
    act(() => {
      vi.setSystemTime(3000);
      result.current.finish({ prompt_tokens: 10, completion_tokens: 20 });
    });

    act(() => {
      result.current.reset();
    });

    const m = result.current.metrics;
    expect(m.ttftMs).toBeNull();
    expect(m.totalMs).toBeNull();
    expect(m.tps).toBeNull();
    expect(m.costUsd).toBeNull();
    expect(m.tokensIn).toBe(0);
    expect(m.tokensOut).toBe(0);
    unmount();
  });

  it("start() after previous run resets all accumulated state", () => {
    const { hookRef: result, unmount } = mountHook(() => useStreamMetrics());

    act(() => {
      vi.setSystemTime(1000);
      result.current.start();
    });
    act(() => {
      vi.setSystemTime(1200);
      result.current.onFirstChunk();
    });
    result.current.onChunk(10);
    act(() => {
      vi.setSystemTime(2000);
      result.current.finish({ prompt_tokens: 5, completion_tokens: 10 });
    });

    // Second run — fresh start
    act(() => {
      vi.setSystemTime(5000);
      result.current.start();
    });

    expect(result.current.metrics.ttftMs).toBeNull();
    expect(result.current.metrics.tokensIn).toBe(0);
    expect(result.current.metrics.tokensOut).toBe(0);
    unmount();
  });
});
