import assert from "node:assert/strict";
import test from "node:test";

import {
  OpencodeExecutor,
  resolveOpencodeTargetFormat,
} from "../../../open-sse/executors/opencode.ts";

// oc/muse-spark-1.2-contributor-free returns HTTP 400 with an empty assistant
// message right after `targetFormat:"openai-responses"` was added to its registry
// entry (#10874). Root cause: `PROVIDER_MODELS` is keyed by the provider's public
// ALIAS ("oc"), not its raw registry id ("opencode") — resolving the target format
// with the raw id missed the registry entry entirely, so `buildUrl()` kept picking
// `/chat/completions` while chatCore's own (correctly aliased) request translation
// had already switched the request BODY to the Responses API shape (`input:[...]`).
// Upstream received a Responses-shaped body at the Chat Completions endpoint and
// returned a degenerate empty response.

test("resolveOpencodeTargetFormat resolves the registry entry via the provider alias, not the raw id", () => {
  assert.equal(
    resolveOpencodeTargetFormat("opencode", "muse-spark-1.2-contributor-free"),
    "openai-responses"
  );
  assert.equal(resolveOpencodeTargetFormat("opencode", "muse-spark-1.2"), "openai-responses");
});

test("resolveOpencodeTargetFormat falls back to 'openai' for a model with no registry targetFormat", () => {
  assert.equal(resolveOpencodeTargetFormat("opencode", "hy3-free"), "openai");
});

test("resolveOpencodeTargetFormat falls back to 'openai' for an unknown provider (no alias, no direct match)", () => {
  assert.equal(resolveOpencodeTargetFormat("not-a-real-provider", "muse-spark-1.2"), "openai");
});

test("OpencodeExecutor.buildUrl uses /responses once _requestFormat is resolved through the alias (live-bug repro)", () => {
  const executor = new OpencodeExecutor("opencode");
  // Mirrors the first line of execute() — see #11045.
  (executor as unknown as { _requestFormat: string })._requestFormat = resolveOpencodeTargetFormat(
    "opencode",
    "muse-spark-1.2-contributor-free"
  );
  const url = executor.buildUrl("muse-spark-1.2-contributor-free", true);
  assert.ok(url.endsWith("/responses"), `expected URL to end with /responses, got: ${url}`);
});
