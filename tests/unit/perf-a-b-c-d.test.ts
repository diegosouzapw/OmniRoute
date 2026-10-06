import assert from "node:assert/strict";
import { test } from "node:test";
import { logProxyEvent, flushProxyLogsSync } from "../../src/lib/proxyLogger.ts";
import { shouldStripCloudCodeThinking } from "../../open-sse/services/cloudCodeThinking.ts";

test("Part A: async proxy log batching queues entries without synchronous failure", () => {
  const sampleLog = {
    status: "success",
    provider: "test-provider",
    latencyMs: 15,
  };

  const logged = logProxyEvent(sampleLog);
  assert.equal(logged.provider, "test-provider");
  assert.equal(typeof logged.id, "string");

  // Ensure flush completes without throwing
  assert.doesNotThrow(() => {
    flushProxyLogsSync();
  });
});

test("Part D: pre-compiled regex in cloudCodeThinking model normalization", () => {
  assert.equal(shouldStripCloudCodeThinking("antigravity", "antigravity/claude-3-7-sonnet"), true);
  assert.equal(shouldStripCloudCodeThinking("antigravity", "models/gemini-2.5-pro"), false);
});
