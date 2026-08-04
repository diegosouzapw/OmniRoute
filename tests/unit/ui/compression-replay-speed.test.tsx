// @vitest-environment jsdom
/**
 * F5.2 finding (HIGH): changing replay speed mid-play was silently ignored — `startTick`
 * read `speedRef.current` synchronously but the ref was only synced in a post-render
 * effect, so the new interval kept the OLD cadence. This drives the hook with fake timers
 * to prove a mid-play speed change actually takes effect.
 */
import React, { act, useMemo, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useCompressionReplay } from "@/app/(dashboard)/dashboard/compression/studio/useCompressionReplay";
import { compressionEventToModel } from "@/app/(dashboard)/dashboard/compression/studio/compressionFlowModel";
import type {
  CompressionCompletedPayload,
} from "@/lib/events/types";

// 3 engine steps → buildReplayFrames yields 3 frames (indices 0,1,2).
const PAYLOAD: CompressionCompletedPayload = {
  requestId: "r1",
  comboId: "c",
  mode: "stacked",
  originalTokens: 1000,
  compressedTokens: 700,
  savingsPercent: 30,
  engineBreakdown: [
    { engine: "a", originalTokens: 1000, compressedTokens: 900, savingsPercent: 10, techniquesUsed: [], durationMs: 1 },
    { engine: "b", originalTokens: 900, compressedTokens: 800, savingsPercent: 11, techniquesUsed: [], durationMs: 1 },
    { engine: "c", originalTokens: 800, compressedTokens: 700, savingsPercent: 12, techniquesUsed: [], durationMs: 1 },
  ],
  timestamp: 1718000000000,
};

let api: ReturnType<typeof useCompressionReplay> | null = null;
function Harness() {
  // Memoize so the model identity is stable across re-renders (otherwise the
  // model-change effect would RESET on every render).
  const model = useMemo(() => compressionEventToModel(PAYLOAD), []);
  const hook = useCompressionReplay(model);
  // Capture in an effect (not during render) so we don't reassign a module-scoped
  // variable mid-render. The effect runs after each commit, so `api` tracks the latest.
  useEffect(() => {
    api = hook;
  });
  return null;
}

const containers: HTMLElement[] = [];
function mount(): void {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  act(() => {
    root.render(<Harness />);
  });
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  while (containers.length > 0) containers.pop()?.remove();
  document.body.innerHTML = "";
  api = null;
});

describe("useCompressionReplay — mid-play speed change (F5.2)", () => {
  it("applies a new speed to the running ticker (was silently ignored before the fix)", () => {
    mount();
    expect(api!.totalFrames).toBe(3);

    // Play at speed 1 (interval 400ms): one tick advances to frame 0.
    act(() => {
      api!.play();
    });
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(api!.frameIndex).toBe(0);

    // Speed up to 3 (interval ~133ms) WHILE playing, then advance only 133ms.
    // With the fix the ticker restarts at the faster cadence and advances;
    // without it the interval stayed at 400ms and 133ms would not tick.
    act(() => {
      api!.setSpeed(3);
    });
    act(() => {
      vi.advanceTimersByTime(133);
    });
    expect(api!.frameIndex).toBe(1);
    expect(api!.speed).toBe(3);
  });
});
