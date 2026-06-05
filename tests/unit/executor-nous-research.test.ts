/**
 * Regression test for #2826 — NOUS-RESEARCH provider always returns 404 Not Found
 *
 * `nous-research` uses `executor: "default"`. `DefaultExecutor.buildUrl()`'s default
 * switch case returns `config.baseUrl` verbatim. Without `/chat/completions` appended
 * every outbound request hits `/v1` and gets a 404.
 *
 * Fix: set `baseUrl` in providerRegistry.ts to include `/chat/completions`.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

test("nous-research DefaultExecutor.buildUrl() returns a URL ending with /chat/completions", () => {
  const executor = new DefaultExecutor("nous-research");

  const url = executor.buildUrl("Hermes-4-405B", true, 0, null);

  assert.match(
    url,
    /\/chat\/completions$/,
    `Expected URL to end with /chat/completions, got: ${url}`
  );
});

test("nous-research DefaultExecutor.buildUrl() targets the correct inference endpoint", () => {
  const executor = new DefaultExecutor("nous-research");

  const url = executor.buildUrl("Hermes-4-70B", false, 0, null);

  assert.equal(
    url,
    "https://inference-api.nousresearch.com/v1/chat/completions"
  );
});
