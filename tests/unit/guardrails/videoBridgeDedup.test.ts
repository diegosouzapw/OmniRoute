import assert from "node:assert/strict";
import test from "node:test";

import {
  deduplicateVideoFrames,
  resolveVideoDedupCandidateFrameCount,
  type VideoCaptionFrame,
} from "../../../src/lib/guardrails/videoBridgeHelpers.ts";
import { createVideoDedupFixtures } from "../../fixtures/videoBridgeDedupFixtures.ts";

const fixturesPromise = createVideoDedupFixtures();

test("dedup candidate count doubles the caption budget within the hard frame bound", () => {
  assert.equal(resolveVideoDedupCandidateFrameCount(1), 1);
  assert.equal(resolveVideoDedupCandidateFrameCount(3), 6);
  assert.equal(resolveVideoDedupCandidateFrameCount(8), 16);
  assert.equal(resolveVideoDedupCandidateFrameCount(9), 16);
  assert.equal(resolveVideoDedupCandidateFrameCount(Number.NaN), 1);
});

test("deduplication stops scheduling comparator work after abort", async () => {
  const controller = new AbortController();
  let comparisons = 0;
  const pending = deduplicateVideoFrames(
    [frame(1), frame(2), frame(3), frame(4), frame(5), frame(6)],
    {
      compare: async () => {
        comparisons += 1;
        await new Promise<void>((resolve) => setTimeout(resolve, 30));
        return 0.2;
      },
      signal: controller.signal,
    }
  );
  setTimeout(() => controller.abort(), 5);

  await assert.rejects(pending, /aborted/i);
  assert.equal(comparisons, 1);
});

const frame = (
  timestampSeconds: number,
  dataUri = "data:image/jpeg;base64,QQ=="
): VideoCaptionFrame => ({
  dataUri,
  timestampSeconds,
});

test("deduplication keeps the first frame and the final frame while dropping redundant middle frames", async () => {
  const result = await deduplicateVideoFrames([frame(1), frame(2), frame(3), frame(4)], {
    compare: async () => 0.01,
    threshold: 0.05,
  });

  assert.deepEqual(
    result.frames.map((item) => item.timestampSeconds),
    [1, 4]
  );
  assert.equal(result.dropped, 2);
});

test("deduplication keeps visually distinct frames", async () => {
  const result = await deduplicateVideoFrames([frame(1), frame(2), frame(3)], {
    compare: async () => 0.2,
    threshold: 0.05,
  });

  assert.equal(result.frames.length, 3);
  assert.equal(result.dropped, 0);
});

test("deduplication applies the final cap after comparison while preserving both endpoints", async () => {
  const result = await deduplicateVideoFrames(
    [frame(1), frame(2), frame(3), frame(4), frame(5), frame(6)],
    {
      compare: async (_previous, current) =>
        current.timestampSeconds === 2 || current.timestampSeconds === 4 ? 0.01 : 0.2,
      maxFrames: 3,
      threshold: 0.05,
    }
  );

  assert.deepEqual(
    result.frames.map((item) => item.timestampSeconds),
    [1, 5, 6]
  );
  assert.equal(result.dropped, 2, "only visual duplicates count as dedup drops");
});

test("the real grayscale policy preserves a small moving subject", async () => {
  const fixtures = await fixturesPromise;
  const result = await deduplicateVideoFrames([
    frame(1, fixtures.smallMotion[0]),
    frame(2, fixtures.smallMotion[1]),
    frame(3, fixtures.smallMotion[0]),
  ]);

  assert.deepEqual(
    result.frames.map((item) => item.timestampSeconds),
    [1, 2, 3]
  );
  assert.equal(result.dropped, 0);
});

test("the real grayscale policy drops a static fixture", async () => {
  const fixtures = await fixturesPromise;
  const result = await deduplicateVideoFrames([
    frame(1, fixtures.staticFrame),
    frame(2, fixtures.staticFrame),
    frame(3, fixtures.smallMotion[1]),
  ]);

  assert.deepEqual(
    result.frames.map((item) => item.timestampSeconds),
    [1, 3]
  );
  assert.equal(result.dropped, 1);
});

test("the real grayscale policy preserves a visible text change", async () => {
  const fixtures = await fixturesPromise;
  const result = await deduplicateVideoFrames([
    frame(1, fixtures.visibleText[0]),
    frame(2, fixtures.visibleText[1]),
    frame(3, fixtures.visibleText[0]),
  ]);

  assert.deepEqual(
    result.frames.map((item) => item.timestampSeconds),
    [1, 2, 3]
  );
  assert.equal(result.dropped, 0);
});

test("deduplication fails open for a malformed JPEG candidate", async () => {
  const fixtures = await fixturesPromise;
  const result = await deduplicateVideoFrames([
    frame(1, fixtures.staticFrame),
    frame(2, "data:image/jpeg;base64,bm90LWEtanBlZw=="),
    frame(3, fixtures.staticFrame),
  ]);

  assert.deepEqual(
    result.frames.map((item) => item.timestampSeconds),
    [1, 2, 3]
  );
  assert.equal(result.dropped, 0);
});
