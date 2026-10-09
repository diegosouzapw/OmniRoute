import test from "node:test";
import assert from "node:assert/strict";

import {
  getEventLoopStallStats,
  resetEventLoopStallStatsForTests,
  startEventLoopStallRecorder,
  stopEventLoopStallRecorder,
} from "../../src/lib/healthzLag.ts";

function runStallScenario(scenario: {
  thresholdMs: number;
  ticks: number[];
  sampler?: () => number;
}): { lines: string[]; count: number; maxMs: number } {
  let now = 0;
  const lines: string[] = [];
  const originalWarn = console.warn;
  console.warn = (message?: unknown, ...rest: unknown[]) => {
    lines.push([message, ...rest].map(String).join(" "));
  };
  try {
    resetEventLoopStallStatsForTests();
    startEventLoopStallRecorder({
      thresholdMs: scenario.thresholdMs,
      now: () => now,
      sampler: scenario.sampler,
      log: (message: string) => {
        lines.push(message);
      },
    });
    for (const at of scenario.ticks) {
      now = at;
      (
        globalThis as { __tickEventLoopStallRecorderForTests?: () => void }
      ).__tickEventLoopStallRecorderForTests?.();
    }
    const stats = getEventLoopStallStats();
    return { lines, count: stats.count, maxMs: stats.maxMs };
  } finally {
    console.warn = originalWarn;
    stopEventLoopStallRecorder();
    resetEventLoopStallStatsForTests();
  }
}

test("blocked loop logs one line near six seconds", () => {
  const { lines, count, maxMs } = runStallScenario({ thresholdMs: 5000, ticks: [0, 7000] });
  assert.equal(lines.length, 1);
  assert.match(lines[0], /event loop stalled 6(\.0)?s/);
  assert.match(lines[0], /rss=/);
  assert.match(lines[0], /heapUsed=/);
  assert.match(lines[0], /inflight=/);
  assert.equal(count, 1);
  assert.ok(maxMs >= 5900 && maxMs <= 6750, `maxMs ${maxMs} outside 5900..6750`);
});

test("healthy loop logs nothing", () => {
  const { lines, count } = runStallScenario({
    thresholdMs: 5000,
    ticks: [0, 1000, 2000, 3000, 4000],
  });
  assert.equal(lines.length, 0);
  assert.equal(count, 0);
});

test("two stalls count two and keep the longest", () => {
  const { count, maxMs } = runStallScenario({
    thresholdMs: 5000,
    ticks: [0, 7000, 8000, 15000],
  });
  assert.equal(count, 2);
  assert.ok(maxMs >= 5900 && maxMs <= 6750, `maxMs ${maxMs} outside 5900..6750`);
});

test("threshold zero disables the recorder", () => {
  const { lines, count } = runStallScenario({ thresholdMs: 0, ticks: [0, 7000, 14000] });
  assert.equal(lines.length, 0);
  assert.equal(count, 0);
});

test("unreadable threshold falls back to the default", () => {
  const saved = process.env.OMNIROUTE_EVENT_LOOP_STALL_THRESHOLD_MS;
  process.env.OMNIROUTE_EVENT_LOOP_STALL_THRESHOLD_MS = "not-a-number";
  let now = 0;
  const lines: string[] = [];
  try {
    resetEventLoopStallStatsForTests();
    startEventLoopStallRecorder({
      now: () => now,
      log: (message: string) => {
        lines.push(message);
      },
    });
    now = 7000;
    (
      globalThis as { __tickEventLoopStallRecorderForTests?: () => void }
    ).__tickEventLoopStallRecorderForTests?.();
    assert.equal(lines.length, 1);
    assert.match(lines[0], /event loop stalled 6(\.0)?s/);
    now = 8000;
    (
      globalThis as { __tickEventLoopStallRecorderForTests?: () => void }
    ).__tickEventLoopStallRecorderForTests?.();
    assert.equal(lines.length, 1);
  } finally {
    if (saved === undefined) delete process.env.OMNIROUTE_EVENT_LOOP_STALL_THRESHOLD_MS;
    else process.env.OMNIROUTE_EVENT_LOOP_STALL_THRESHOLD_MS = saved;
    stopEventLoopStallRecorder();
    resetEventLoopStallStatsForTests();
  }
});

test("empty threshold falls back to the default", () => {
  const saved = process.env.OMNIROUTE_EVENT_LOOP_STALL_THRESHOLD_MS;
  process.env.OMNIROUTE_EVENT_LOOP_STALL_THRESHOLD_MS = "";
  let now = 0;
  const lines: string[] = [];
  try {
    resetEventLoopStallStatsForTests();
    startEventLoopStallRecorder({
      now: () => now,
      log: (message: string) => {
        lines.push(message);
      },
    });
    now = 7000;
    (
      globalThis as { __tickEventLoopStallRecorderForTests?: () => void }
    ).__tickEventLoopStallRecorderForTests?.();
    assert.equal(lines.length, 1);
  } finally {
    if (saved === undefined) delete process.env.OMNIROUTE_EVENT_LOOP_STALL_THRESHOLD_MS;
    else process.env.OMNIROUTE_EVENT_LOOP_STALL_THRESHOLD_MS = saved;
    stopEventLoopStallRecorder();
    resetEventLoopStallStatsForTests();
  }
});

test("recorder state stays bounded over many ticks", () => {
  let now = 0;
  const lines: string[] = [];
  try {
    resetEventLoopStallStatsForTests();
    startEventLoopStallRecorder({
      thresholdMs: 5000,
      now: () => now,
      log: (message: string) => {
        lines.push(message);
      },
    });
    startEventLoopStallRecorder({ thresholdMs: 5000, now: () => now });
    const tick = (globalThis as { __tickEventLoopStallRecorderForTests?: () => void })
      .__tickEventLoopStallRecorderForTests;
    assert.equal(typeof tick, "function");
    for (let i = 1; i <= 50; i += 1) {
      now = i * 1000;
      tick?.();
    }
    const stats = getEventLoopStallStats();
    assert.deepEqual(Object.keys(stats).sort(), ["count", "maxMs"]);
    assert.equal(stats.count, 0);
  } finally {
    stopEventLoopStallRecorder();
    resetEventLoopStallStatsForTests();
  }
});

test("default clock measures ticks without throwing", () => {
  const lines: string[] = [];
  try {
    resetEventLoopStallStatsForTests();
    startEventLoopStallRecorder({
      thresholdMs: 5000,
      log: (message: string) => {
        lines.push(message);
      },
    });
    const tick = (globalThis as { __tickEventLoopStallRecorderForTests?: () => void })
      .__tickEventLoopStallRecorderForTests;
    assert.equal(typeof tick, "function");
    tick?.();
    const stats = getEventLoopStallStats();
    assert.equal(stats.count, 0);
    assert.equal(lines.length, 0);
  } finally {
    stopEventLoopStallRecorder();
    resetEventLoopStallStatsForTests();
  }
});

test("failing sampler falls back to zero and warns once", () => {
  let now = 0;
  let calls = 0;
  const lines: string[] = [];
  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (message?: unknown, ...rest: unknown[]) => {
    warnings.push([message, ...rest].map(String).join(" "));
  };
  try {
    resetEventLoopStallStatsForTests();
    startEventLoopStallRecorder({
      thresholdMs: 5000,
      now: () => now,
      sampler: () => {
        calls += 1;
        throw new Error("busy");
      },
      log: (message: string) => {
        lines.push(message);
      },
    });
    now = 7000;
    (
      globalThis as { __tickEventLoopStallRecorderForTests?: () => void }
    ).__tickEventLoopStallRecorderForTests?.();
    now = 15000;
    (
      globalThis as { __tickEventLoopStallRecorderForTests?: () => void }
    ).__tickEventLoopStallRecorderForTests?.();
    assert.equal(calls, 2);
    assert.equal(lines.length, 2);
    assert.match(lines[0], /inflight=0/);
    const samplerWarnings = warnings.filter((line) => line.includes("inflight sampler"));
    assert.equal(samplerWarnings.length, 1);
  } finally {
    console.warn = originalWarn;
    stopEventLoopStallRecorder();
    resetEventLoopStallStatsForTests();
  }
});
