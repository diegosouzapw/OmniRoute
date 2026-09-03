import { test } from "node:test";
import assert from "node:assert/strict";

import { createThroughputWatchdog } from "../../../open-sse/services/throughputWatchdog.ts";
import {
  DEFAULT_RESILIENCE_SETTINGS,
  resolveResilienceSettings,
} from "../../../src/lib/resilience/settings.ts";

const chatText = (text: string) =>
  `data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`;
const heartbeat = 'event: ping\ndata: {"type":"ping"}\n\n';

test("healthy sustained useful output never trips the throughput watchdog", () => {
  let now = 0;
  const watchdog = createThroughputWatchdog({
    enabled: true,
    warmupMs: 1_000,
    windowMs: 2_000,
    minUsefulBytesPerSecond: 2,
    minUsefulBytes: 1,
    now: () => now,
  });

  for (now = 0; now <= 8_000; now += 1_000) {
    assert.equal(watchdog.observe(chatText("healthy output")).abort, false);
  }
});

test("slow output aborts only after warm-up plus a complete window", () => {
  let now = 0;
  const watchdog = createThroughputWatchdog({
    enabled: true,
    warmupMs: 1_000,
    windowMs: 2_000,
    minUsefulBytesPerSecond: 10,
    minUsefulBytes: 1,
    now: () => now,
  });

  assert.equal(watchdog.observe(chatText("x")).abort, false);
  now = 2_999;
  assert.equal(watchdog.observe(heartbeat).abort, false);
  now = 3_000;
  const decision = watchdog.observe(heartbeat);
  assert.equal(decision.abort, true);
  assert.equal(decision.reason, "throughput_too_low");
});

test("heartbeats, metadata, usage, and empty deltas do not count as useful output", () => {
  let now = 0;
  const watchdog = createThroughputWatchdog({
    enabled: true,
    warmupMs: 0,
    windowMs: 1_000,
    minUsefulBytesPerSecond: 1,
    minUsefulBytes: 1,
    now: () => now,
  });
  watchdog.observe(heartbeat);
  now = 500;
  watchdog.observe('data: {"usage":{"output_tokens":99}}\n\n');
  now = 999;
  watchdog.observe('data: {"choices":[{"delta":{}}]}\n\n');
  now = 1_000;
  const decision = watchdog.observe(heartbeat);
  assert.equal(decision.usefulBytes, 0);
  assert.equal(decision.abort, true);
});

test("tool-call and reasoning phases suspend judgement until assistant text resumes", () => {
  let now = 0;
  const watchdog = createThroughputWatchdog({
    enabled: true,
    warmupMs: 0,
    windowMs: 1_000,
    minUsefulBytesPerSecond: 100,
    minUsefulBytes: 1,
    now: () => now,
  });
  watchdog.observe(
    'data: {"choices":[{"delta":{"tool_calls":[{"function":{"name":"lookup"}}]}}]}\n\n'
  );
  now = 2_000;
  assert.equal(watchdog.observe(heartbeat).abort, false);
  assert.equal(watchdog.observe(heartbeat).protectedPhase, true);

  watchdog.observe('data: {"type":"response.reasoning_summary_text.delta","delta":"thinking"}\n\n');
  watchdog.observe(
    'event: content_block_delta\ndata: {"type":"content_block_delta","delta":{"type":"thinking_delta","thinking":"still thinking"}}\n\n'
  );
  now = 4_000;
  assert.equal(watchdog.observe(heartbeat).abort, false);
  assert.equal(watchdog.observe(chatText("answer")).protectedPhase, false);
});

test("Responses API output_text deltas count as useful assistant output", () => {
  let now = 0;
  const watchdog = createThroughputWatchdog({
    enabled: true,
    warmupMs: 0,
    windowMs: 1_000,
    minUsefulBytesPerSecond: 3,
    minUsefulBytes: 1,
    now: () => now,
  });
  watchdog.observe('data: {"type":"response.output_text.delta","delta":"hello"}\n\n');
  now = 1_000;
  const decision = watchdog.observe(heartbeat);
  assert.equal(decision.usefulBytes, 5);
  assert.equal(decision.abort, false);
});

test("disabled watchdog remains byte-path inert", () => {
  let now = 0;
  const watchdog = createThroughputWatchdog({ enabled: false, now: () => now });
  for (now = 0; now <= 120_000; now += 30_000) {
    assert.equal(watchdog.observe(heartbeat).abort, false);
  }
});

test("resilience settings keep the watchdog disabled by default and bound overrides", () => {
  assert.equal(DEFAULT_RESILIENCE_SETTINGS.streamRecovery.throughputWatchdog.enabled, false);
  assert.equal(resolveResilienceSettings(null).streamRecovery.throughputWatchdog.enabled, false);

  const resolved = resolveResilienceSettings({
    resilienceSettings: {
      streamRecovery: {
        throughputWatchdog: {
          enabled: true,
          warmupMs: -1,
          windowMs: 10,
          minUsefulBytesPerSecond: 0,
          minUsefulBytes: 0,
        },
      },
    },
  });
  assert.deepEqual(resolved.streamRecovery.throughputWatchdog, {
    enabled: true,
    warmupMs: 0,
    windowMs: 1_000,
    minUsefulBytesPerSecond: 1,
    minUsefulBytes: 1,
  });
});
