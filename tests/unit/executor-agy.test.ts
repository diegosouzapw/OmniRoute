import test from "node:test";
import assert from "node:assert/strict";

import { getExecutor, AntigravityExecutor } from "../../open-sse/executors/index.ts";

test("getExecutor('agy') returns AntigravityExecutor (not DefaultExecutor)", () => {
  const executor = getExecutor("agy");
  assert.ok(executor instanceof AntigravityExecutor, "agy provider should use AntigravityExecutor");
});

test("getExecutor('antigravity') returns AntigravityExecutor", () => {
  const executor = getExecutor("antigravity");
  assert.ok(executor instanceof AntigravityExecutor, "antigravity provider should use AntigravityExecutor");
});

test("getExecutor('agy') builds valid streaming URL", () => {
  const executor = getExecutor("agy");
  const url = executor.buildUrl("gemini-3-flash", true);
  assert.ok(
    url.includes("streamGenerateContent?alt=sse"),
    `expected streaming endpoint URL, got: ${url}`
  );
});

test("getExecutor('agy') builds valid non-streaming URL", () => {
  const executor = getExecutor("agy");
  const url = executor.buildUrl("gemini-3-flash", false);
  // Antigravity executor always uses streaming endpoint (buildUrl ignores stream flag)
  assert.ok(
    url.includes("streamGenerateContent?alt=sse"),
    `expected streaming endpoint URL (always), got: ${url}`
  );
});

test("getExecutor('agy') buildHeaders returns Bearer auth", () => {
  const executor = getExecutor("agy");
  const headers = executor.buildHeaders({ accessToken: "test-token" });
  assert.equal(headers.Authorization, "Bearer test-token");
});
