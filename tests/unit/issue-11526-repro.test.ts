import test from "node:test";
import assert from "node:assert/strict";
import { resolveStreamReadinessTimeout } from "../../open-sse/utils/streamReadinessPolicy.ts";
import {
  resolveFetchStartTimeout,
  CODEX_CLIENT_ABORT_MS,
} from "../../open-sse/utils/fetchStartTimeoutPolicy.ts";
import { getUpstreamTimeoutConfig } from "../../src/shared/utils/runtimeTimeouts.ts";

function items(count: number): Array<{ role: string; content: string }> {
  return Array.from({ length: count }, (_, index) => ({
    role: "user",
    content: `message ${index}`,
  }));
}

function tools(count: number): Array<{ type: string; name: string }> {
  return Array.from({ length: count }, (_, index) => ({ type: "function", name: `tool_${index}` }));
}

test("issue #11526: body-phase readiness watchdog stays comfortably under Codex's ~120s patience for the reported tool-heavy payload shape", () => {
  const result = resolveStreamReadinessTimeout({
    baseTimeoutMs: 80_000,
    provider: "nvidia",
    model: "some-nvidia-model",
    body: { input: items(68), tools: tools(16) },
  });

  assert.ok(
    result.timeoutMs < CODEX_CLIENT_ABORT_MS,
    `body-phase watchdog (${result.timeoutMs}ms) must stay under Codex's ~120s patience`
  );
});

test("issue #11526 (fixed): headers-phase watchdog for STREAMING requests is bounded under Codex's ~120s patience", () => {
  const { fetchTimeoutMs } = getUpstreamTimeoutConfig({});
  // Default FETCH_TIMEOUT_MS (600000ms) is still the flat non-streaming baseline —
  // the fix does not touch that default, it caps how much of it a STREAMING
  // request's headers-wait phase is allowed to consume.
  assert.equal(fetchTimeoutMs, 600_000);

  const streaming = resolveFetchStartTimeout({ baseTimeoutMs: fetchTimeoutMs, stream: true });
  assert.ok(
    streaming.timeoutMs <= CODEX_CLIENT_ABORT_MS,
    `headers-phase watchdog for streaming requests (${streaming.timeoutMs}ms) must not exceed a realistic client abort window (${CODEX_CLIENT_ABORT_MS}ms)`
  );
  assert.ok(streaming.capped, "expected the oversized default to be capped for streaming requests");
});

test("issue #11526 scope guard: non-streaming requests keep the flat FETCH_TIMEOUT_MS default", () => {
  const { fetchTimeoutMs } = getUpstreamTimeoutConfig({});
  const nonStreaming = resolveFetchStartTimeout({ baseTimeoutMs: fetchTimeoutMs, stream: false });

  assert.equal(nonStreaming.timeoutMs, fetchTimeoutMs);
  assert.equal(nonStreaming.capped, false);
});

test("issue #11526 scope guard: a base timeout already under the cap is left untouched for streaming requests", () => {
  const result = resolveFetchStartTimeout({ baseTimeoutMs: 30_000, stream: true });

  assert.equal(result.timeoutMs, 30_000);
  assert.equal(result.capped, false);
});
