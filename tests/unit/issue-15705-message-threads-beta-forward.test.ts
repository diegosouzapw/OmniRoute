// @ts-nocheck
import assert from "node:assert/strict";
import test from "node:test";

const { FORWARDABLE_CLIENT_BETAS, mergeClientAnthropicBeta } =
  await import("../../open-sse/config/anthropicHeaders.ts");

// Captured from @anthropic-ai/claude-code@2.1.291 binary: v("message_threads","message-threads-2026-08-12")
const THREADS_BETA = "message-threads-2026-08-12";

test("#15705 mergeClientAnthropicBeta forwards the client-negotiated message-threads beta", () => {
  assert.ok(FORWARDABLE_CLIENT_BETAS.includes(THREADS_BETA));
  const merged = mergeClientAnthropicBeta(
    "claude-code-20250219",
    ["claude-code-20250219", "effort-2025-11-24", THREADS_BETA].join(",")
  );
  assert.ok(merged.split(",").includes(THREADS_BETA), `${THREADS_BETA} must reach upstream`);
});

test("#15705 the beta is not invented when the client did not negotiate it", () => {
  const merged = mergeClientAnthropicBeta("claude-code-20250219", "effort-2025-11-24");
  assert.ok(!merged.split(",").includes(THREADS_BETA));
});
