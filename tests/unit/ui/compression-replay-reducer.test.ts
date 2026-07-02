/**
 * tests/unit/ui/compression-replay-reducer.test.ts
 *
 * F5.1 coverage gap (F3.2): the `useCompressionReplay` state machine was untested
 * (only buildReplayFrames was covered). This pins the pure reducer + timing.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  replayReducer,
  INITIAL_STATE,
  stepMs,
  type ReplayState,
} from "../../../src/app/(dashboard)/dashboard/compression/studio/useCompressionReplay.ts";

describe("replayReducer — compression replay state machine (F3.2)", () => {
  it("starts idle: frameIndex -1, not playing, speed 1", () => {
    assert.deepEqual(INITIAL_STATE, { frameIndex: -1, isPlaying: false, speed: 1 });
  });

  it("PLAY without frameIndex starts playing and keeps the current frame", () => {
    const s = replayReducer({ frameIndex: 2, isPlaying: false, speed: 1 }, { type: "PLAY" });
    assert.equal(s.isPlaying, true);
    assert.equal(s.frameIndex, 2);
  });

  it("PLAY with frameIndex restarts from that frame (used for replay-from-start)", () => {
    const s = replayReducer(INITIAL_STATE, { type: "PLAY", frameIndex: 0 });
    assert.equal(s.isPlaying, true);
    assert.equal(s.frameIndex, 0);
  });

  it("PAUSE stops playing but keeps the frame", () => {
    const s = replayReducer({ frameIndex: 1, isPlaying: true, speed: 1 }, { type: "PAUSE" });
    assert.equal(s.isPlaying, false);
    assert.equal(s.frameIndex, 1);
  });

  it("TICK advances one frame while below the last", () => {
    const start: ReplayState = { frameIndex: -1, isPlaying: true, speed: 1 };
    const a = replayReducer(start, { type: "TICK", totalFrames: 3 });
    assert.equal(a.frameIndex, 0);
    assert.equal(a.isPlaying, true);
    const b = replayReducer(a, { type: "TICK", totalFrames: 3 });
    assert.equal(b.frameIndex, 1);
    assert.equal(b.isPlaying, true);
  });

  it("TICK stops at the last frame and clears isPlaying (auto-stop at end)", () => {
    const atSecondLast: ReplayState = { frameIndex: 1, isPlaying: true, speed: 1 };
    const done = replayReducer(atSecondLast, { type: "TICK", totalFrames: 3 });
    assert.equal(done.frameIndex, 2, "lands on the last frame index (totalFrames-1)");
    assert.equal(done.isPlaying, false, "playback stops once the last frame is reached");
  });

  it("RESET returns to idle (-1, not playing) but preserves speed", () => {
    const s = replayReducer({ frameIndex: 2, isPlaying: true, speed: 3 }, { type: "RESET" });
    assert.equal(s.frameIndex, -1);
    assert.equal(s.isPlaying, false);
    assert.equal(s.speed, 3, "speed must survive a reset");
  });

  it("SET_SPEED changes speed without touching frame/play state", () => {
    const s = replayReducer({ frameIndex: 1, isPlaying: true, speed: 1 }, {
      type: "SET_SPEED",
      speed: 3,
    });
    assert.equal(s.speed, 3);
    assert.equal(s.frameIndex, 1);
    assert.equal(s.isPlaying, true);
  });

  it("unknown action is a no-op (returns the same state reference)", () => {
    const state: ReplayState = { frameIndex: 0, isPlaying: false, speed: 1 };
    // @ts-expect-error — exercising the default branch with an invalid action
    assert.equal(replayReducer(state, { type: "NOPE" }), state);
  });
});

describe("stepMs — frame pacing by speed (F3.2)", () => {
  it("maps speed to a shorter interval as speed rises", () => {
    assert.equal(stepMs(1), 400);
    assert.equal(stepMs(3), 133); // round(400/3)
    assert.equal(stepMs(0.3), 1333); // round(400/0.3)
    assert.ok(stepMs(3) < stepMs(1) && stepMs(1) < stepMs(0.3), "monotonic: faster = shorter");
  });
});
