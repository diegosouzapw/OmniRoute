"use client";

import { useReducer, useEffect, useRef, useCallback } from "react";
import { buildReplayFrames, type CompressionRunModel } from "./compressionFlowModel";

// ── Types ─────────────────────────────────────────────────────────────────

export type ReplaySpeed = 0.3 | 1 | 3;

export interface UseCompressionReplayReturn {
  /** The current in-progress frame (null when idle or complete). */
  currentFrame: CompressionRunModel | null;
  /** Index of the currently displayed frame (0-based). */
  frameIndex: number;
  /** Total number of frames available. */
  totalFrames: number;
  isPlaying: boolean;
  isComplete: boolean;
  speed: ReplaySpeed;
  setSpeed: (s: ReplaySpeed) => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
}

// ── Timing ────────────────────────────────────────────────────────────────

const BASE_STEP_MS = 400;

function stepMs(speed: ReplaySpeed): number {
  return Math.round(BASE_STEP_MS / speed);
}

// ── Reducer ───────────────────────────────────────────────────────────────

interface ReplayState {
  frameIndex: number; // -1 = not started
  isPlaying: boolean;
  speed: ReplaySpeed;
}

type ReplayAction =
  | { type: "RESET" }
  | { type: "PLAY"; frameIndex?: number }
  | { type: "PAUSE" }
  | { type: "TICK"; totalFrames: number }
  | { type: "SET_SPEED"; speed: ReplaySpeed };

const INITIAL_STATE: ReplayState = { frameIndex: -1, isPlaying: false, speed: 1 };

function replayReducer(state: ReplayState, action: ReplayAction): ReplayState {
  switch (action.type) {
    case "RESET":
      return { ...state, frameIndex: -1, isPlaying: false };
    case "PLAY":
      return {
        ...state,
        isPlaying: true,
        frameIndex: action.frameIndex !== undefined ? action.frameIndex : state.frameIndex,
      };
    case "PAUSE":
      return { ...state, isPlaying: false };
    case "TICK": {
      const next = state.frameIndex + 1;
      if (next >= action.totalFrames - 1) {
        return { ...state, frameIndex: action.totalFrames - 1, isPlaying: false };
      }
      return { ...state, frameIndex: next };
    }
    case "SET_SPEED":
      return { ...state, speed: action.speed };
    default:
      return state;
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────

/**
 * Drives frame-by-frame replay of a `CompressionRunModel`.
 *
 * Since compression is sub-ms synchronous, this hook artificially paces
 * the reveal using a `setInterval` (cleared on unmount or model change).
 * All state lives in a single `useReducer` to avoid cascading setState calls
 * inside effects (satisfies react-hooks/set-state-in-effect).
 */
export function useCompressionReplay(
  model: CompressionRunModel | null
): UseCompressionReplayReturn {
  const frames = model ? buildReplayFrames(model) : [];
  const totalFrames = frames.length;

  const [state, dispatch] = useReducer(replayReducer, INITIAL_STATE);
  const { frameIndex, isPlaying, speed } = state;

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Stable ref to totalFrames so the interval callback never closes over a stale value
  const totalFramesRef = useRef(totalFrames);
  const speedRef = useRef<ReplaySpeed>(speed);

  // Sync refs in event-handler-safe effects
  useEffect(() => {
    totalFramesRef.current = totalFrames;
  }, [totalFrames]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // Clear interval helper (stable — no deps)
  const clearTick = useCallback(() => {
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start the interval ticker
  const startTick = useCallback(() => {
    clearTick();
    intervalRef.current = setInterval(() => {
      // dispatch is stable — safe to call inside an interval callback
      dispatch({ type: "TICK", totalFrames: totalFramesRef.current });
    }, stepMs(speedRef.current));
  }, [clearTick]);

  // Stop ticker when isPlaying turns false (either from PAUSE, RESET, or TICK→done)
  useEffect(() => {
    if (!isPlaying) clearTick();
  }, [isPlaying, clearTick]);

  // Reset when model identity changes
  const modelRef = useRef(model);
  useEffect(() => {
    if (modelRef.current !== model) {
      modelRef.current = model;
      clearTick();
      dispatch({ type: "RESET" });
    }
  }, [model, clearTick]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTick();
  }, [clearTick]);

  // Public controls — called from event handlers, so setState inside is fine
  const play = useCallback(() => {
    if (totalFramesRef.current === 0) return;
    const restartIndex = frameIndex >= totalFramesRef.current - 1 ? 0 : undefined;
    dispatch({ type: "PLAY", ...(restartIndex !== undefined ? { frameIndex: restartIndex } : {}) });
    startTick();
  }, [frameIndex, startTick]);

  const pause = useCallback(() => {
    dispatch({ type: "PAUSE" });
    clearTick();
  }, [clearTick]);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
    clearTick();
  }, [clearTick]);

  const handleSetSpeed = useCallback(
    (s: ReplaySpeed) => {
      dispatch({ type: "SET_SPEED", speed: s });
      if (isPlaying) startTick();
    },
    [isPlaying, startTick]
  );

  const currentFrame = frameIndex >= 0 && frameIndex < frames.length ? frames[frameIndex] : null;

  const isComplete = totalFrames > 0 && frameIndex >= totalFrames - 1 && !isPlaying;

  return {
    currentFrame,
    frameIndex,
    totalFrames,
    isPlaying,
    isComplete,
    speed,
    setSpeed: handleSetSpeed,
    play,
    pause,
    reset,
  };
}
