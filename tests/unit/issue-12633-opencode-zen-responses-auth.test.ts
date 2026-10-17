import test from "node:test";
import assert from "node:assert/strict";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";

// #12633 sent x-api-key on the Zen Responses endpoint. Measured 2026-10-14: that form now
// answers 403 FreeTierError there, while Bearer gets past that refusal, so Responses
// authenticates like chat. Messages (`claude`) keeps x-api-key.

test("openai-responses format on opencode-zen sends Authorization Bearer, not x-api-key", () => {
  const executor = new OpencodeExecutor("opencode-zen");
  executor._requestFormat = "openai-responses";
  const headers = executor.buildHeaders(
    { apiKey: "sk-zen-test" },
    true,
    null,
    "muse-spark-1.2-contributor-free"
  );

  assert.equal(headers["Authorization"], "Bearer sk-zen-test");
  assert.equal(headers["x-api-key"], undefined);
});

test("openai-responses format on the base opencode (oc) provider also sends Authorization Bearer", () => {
  const executor = new OpencodeExecutor("opencode");
  executor._requestFormat = "openai-responses";
  const headers = executor.buildHeaders(
    { apiKey: "sk-oc-test" },
    true,
    null,
    "muse-spark-1.2-contributor-free"
  );

  assert.equal(headers["Authorization"], "Bearer sk-oc-test");
  assert.equal(headers["x-api-key"], undefined);
});

test("openai-responses format on opencode-go (different upstream endpoint) keeps Authorization Bearer", () => {
  const executor = new OpencodeExecutor("opencode-go");
  executor._requestFormat = "openai-responses";
  const headers = executor.buildHeaders(
    { apiKey: "sk-go-test" },
    true,
    null,
    "muse-spark-1.2-contributor"
  );

  assert.equal(headers["Authorization"], "Bearer sk-go-test");
  assert.equal(headers["x-api-key"], undefined);
});

test("claude format keeps sending x-api-key (unchanged behavior)", () => {
  const executor = new OpencodeExecutor("opencode-zen");
  executor._requestFormat = "claude";
  const headers = executor.buildHeaders({ apiKey: "sk-claude-test" }, true, null, "some-model");

  assert.equal(headers["x-api-key"], "sk-claude-test");
  assert.equal(headers["Authorization"], undefined);
});
