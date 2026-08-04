/**
 * #3507 — the home Provider Topology pulse was dead because activeRequests was
 * hardcoded to [].  Fix: map the in-flight LiveRequest entries (pending/running)
 * from useLiveRequests to the { provider, model }[] shape expected by
 * <ProviderTopology>.
 *
 * selectActiveRequests() is a pure mapping function — no React required.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { selectActiveRequests } from "../../src/app/(dashboard)/home/topologyUtils.ts";

// ── helpers ──────────────────────────────────────────────────────────────────

function makeRequest(
  overrides: Partial<{
    id: string;
    model: string;
    provider: string;
    status: "pending" | "running" | "success" | "error";
  }>
) {
  return {
    id: "req-1",
    model: "gpt-4",
    provider: "openai",
    timestamp: Date.now(),
    status: "pending" as const,
    ...overrides,
  };
}

// ── tests ─────────────────────────────────────────────────────────────────────

test("selectActiveRequests: maps pending requests to {provider, model}", () => {
  const input = [makeRequest({ id: "a", provider: "anthropic", model: "claude-opus-4", status: "pending" })];
  const result = selectActiveRequests(input);
  assert.deepEqual(result, [{ provider: "anthropic", model: "claude-opus-4" }]);
});

test("selectActiveRequests: maps running requests to {provider, model}", () => {
  const input = [makeRequest({ id: "b", provider: "openai", model: "gpt-4o", status: "running" })];
  const result = selectActiveRequests(input);
  assert.deepEqual(result, [{ provider: "openai", model: "gpt-4o" }]);
});

test("selectActiveRequests: returns empty array for empty input", () => {
  assert.deepEqual(selectActiveRequests([]), []);
});

test("selectActiveRequests: maps multiple concurrent in-flight requests", () => {
  const input = [
    makeRequest({ id: "c1", provider: "anthropic", model: "claude-sonnet-4", status: "pending" }),
    makeRequest({ id: "c2", provider: "gemini", model: "gemini-2.5-pro", status: "running" }),
  ];
  const result = selectActiveRequests(input);
  assert.deepEqual(result, [
    { provider: "anthropic", model: "claude-sonnet-4" },
    { provider: "gemini", model: "gemini-2.5-pro" },
  ]);
});

test("selectActiveRequests: only extracts provider and model fields (not id/timestamp/etc)", () => {
  const input = [makeRequest({ id: "d", provider: "groq", model: "llama3-70b", status: "running" })];
  const result = selectActiveRequests(input);
  assert.equal(Object.keys(result[0]).length, 2);
  assert.ok("provider" in result[0]);
  assert.ok("model" in result[0]);
  assert.ok(!("id" in result[0]));
  assert.ok(!("timestamp" in result[0]));
});
