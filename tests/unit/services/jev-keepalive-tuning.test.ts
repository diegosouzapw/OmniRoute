/**
 * Adaptive keepalive threshold tuning from Jev first-byte predictions — Unit Tests.
 *
 * Run: node --import tsx/esm --test tests/unit/services/jev-keepalive-tuning.test.ts
 */
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  applyJevKeepaliveTuning,
  buildKeepaliveTuningKey,
  recordJevFirstBytePrediction,
  __resetKeepaliveJevTuningForTests,
} from "../../../open-sse/utils/keepaliveJevTuning.ts";

const DEFAULT_MS = 1_000;
const SLOW_MS = 15_000;

const JEV_ENV_KEYS = ["OMNIROUTE_JEV_ENABLED", "OMNIROUTE_JEV_FEATURES"] as const;
const savedEnv = new Map<string, string | undefined>();
for (const key of JEV_ENV_KEYS) savedEnv.set(key, process.env[key]);

function recordLong(key: string, count: number): void {
  for (let i = 0; i < count; i += 1) recordJevFirstBytePrediction(key, true);
}

beforeEach(() => {
  process.env.OMNIROUTE_JEV_ENABLED = "on";
  process.env.OMNIROUTE_JEV_FEATURES = "keepalive";
  __resetKeepaliveJevTuningForTests();
});

afterEach(() => {
  for (const key of JEV_ENV_KEYS) {
    const value = savedEnv.get(key);
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe("buildKeepaliveTuningKey", () => {
  it("is stable for identical inputs", () => {
    const input = { model: "gpt-4o", hasTools: true };
    assert.equal(buildKeepaliveTuningKey(input), buildKeepaliveTuningKey(input));
    assert.equal(
      buildKeepaliveTuningKey({ model: "gpt-4o", hasTools: false }),
      buildKeepaliveTuningKey({ model: "gpt-4o", hasTools: false })
    );
  });

  it("treats null and undefined models consistently", () => {
    const fromNull = buildKeepaliveTuningKey({ model: null, hasTools: false });
    const fromUndefined = buildKeepaliveTuningKey({ model: undefined, hasTools: false });
    assert.equal(fromNull, fromUndefined);
    assert.equal(fromNull, "m=-|t=0");
  });

  it("distinguishes model identity and tool presence", () => {
    const a = buildKeepaliveTuningKey({ model: "gpt-4o", hasTools: false });
    const b = buildKeepaliveTuningKey({ model: "claude-sonnet-4", hasTools: false });
    const c = buildKeepaliveTuningKey({ model: "gpt-4o", hasTools: true });
    assert.notEqual(a, b);
    assert.notEqual(a, c);
  });
});

describe("applyJevKeepaliveTuning", () => {
  it("returns the static threshold when the keepalive lane is off, regardless of samples", () => {
    const key = buildKeepaliveTuningKey({ model: "lane-off-model", hasTools: false });
    recordLong(key, 5);
    process.env.OMNIROUTE_JEV_ENABLED = "off";
    assert.equal(applyJevKeepaliveTuning(DEFAULT_MS, key), DEFAULT_MS);
  });

  it("returns the static threshold when the enabled feature set excludes keepalive", () => {
    const key = buildKeepaliveTuningKey({ model: "feature-off-model", hasTools: false });
    recordLong(key, 5);
    process.env.OMNIROUTE_JEV_FEATURES = "compression";
    assert.equal(applyJevKeepaliveTuning(DEFAULT_MS, key), DEFAULT_MS);
  });

  it("returns the static threshold with fewer than 3 samples", () => {
    const key = buildKeepaliveTuningKey({ model: "few-samples-model", hasTools: false });
    recordLong(key, 2);
    assert.equal(applyJevKeepaliveTuning(DEFAULT_MS, key), DEFAULT_MS);
  });

  it("returns the static threshold for a null key", () => {
    assert.equal(applyJevKeepaliveTuning(DEFAULT_MS, null), DEFAULT_MS);
  });

  it("returns the static threshold when no samples exist for the key", () => {
    const key = buildKeepaliveTuningKey({ model: "unknown-model", hasTools: false });
    recordLong(buildKeepaliveTuningKey({ model: "other-model", hasTools: false }), 5);
    assert.equal(applyJevKeepaliveTuning(DEFAULT_MS, key), DEFAULT_MS);
  });

  it("lowers the default tier after 3 long-first-byte samples", () => {
    const key = buildKeepaliveTuningKey({ model: "slow-reasoner", hasTools: false });
    recordLong(key, 3);
    assert.equal(applyJevKeepaliveTuning(DEFAULT_MS, key), 750);
  });

  it("tunes exactly at the 50% long-first-byte rate boundary", () => {
    const key = buildKeepaliveTuningKey({ model: "half-slow", hasTools: true });
    recordJevFirstBytePrediction(key, true);
    recordJevFirstBytePrediction(key, true);
    recordJevFirstBytePrediction(key, false);
    recordJevFirstBytePrediction(key, false);
    assert.equal(applyJevKeepaliveTuning(DEFAULT_MS, key), 750);
  });

  it("returns the static threshold when long first bytes are below 50%", () => {
    const key = buildKeepaliveTuningKey({ model: "mostly-fast", hasTools: false });
    recordJevFirstBytePrediction(key, true);
    recordJevFirstBytePrediction(key, false);
    recordJevFirstBytePrediction(key, false);
    assert.equal(applyJevKeepaliveTuning(DEFAULT_MS, key), DEFAULT_MS);
  });

  it("never touches the slow tier", () => {
    const key = buildKeepaliveTuningKey({ model: "web-session-model", hasTools: false });
    recordLong(key, 10);
    assert.equal(applyJevKeepaliveTuning(SLOW_MS, key), SLOW_MS);
    assert.equal(applyJevKeepaliveTuning(2_001, key), 2_001);
  });

  it("never lowers the tuned threshold below its 750 ms ceiling or 500 ms floor", () => {
    const key = buildKeepaliveTuningKey({ model: "below-ceiling", hasTools: false });
    recordLong(key, 3);
    // Already below the ceiling: keep the tighter static value.
    assert.equal(applyJevKeepaliveTuning(600, key), 600);
    // Below the floor: the tuned value is floored at 500 ms.
    assert.equal(applyJevKeepaliveTuning(400, key), 500);
  });

  it("evicts the oldest key beyond the 128-key bound", () => {
    const keys: string[] = [];
    for (let i = 0; i < 129; i += 1) {
      const key = buildKeepaliveTuningKey({ model: `bulk-model-${i}`, hasTools: false });
      keys.push(key);
      recordLong(key, 3);
    }
    // The 129th distinct key evicted the first one; the rest stay tuned.
    assert.equal(applyJevKeepaliveTuning(DEFAULT_MS, keys[0]), DEFAULT_MS);
    assert.equal(applyJevKeepaliveTuning(DEFAULT_MS, keys[1]), 750);
    assert.equal(applyJevKeepaliveTuning(DEFAULT_MS, keys[128]), 750);
  });
});

describe("__resetKeepaliveJevTuningForTests", () => {
  it("clears recorded samples", () => {
    const key = buildKeepaliveTuningKey({ model: "reset-model", hasTools: false });
    recordLong(key, 4);
    assert.equal(applyJevKeepaliveTuning(DEFAULT_MS, key), 750);
    __resetKeepaliveJevTuningForTests();
    assert.equal(applyJevKeepaliveTuning(DEFAULT_MS, key), DEFAULT_MS);
  });
});
