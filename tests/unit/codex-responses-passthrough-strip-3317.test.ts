import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-3317-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");

// #3317: a /v1/responses request against the built-in codex/ provider does an
// openai-responses -> openai-responses passthrough. The Codex upstream rejects
// client-only fields with 400 "Unsupported parameter": prompt_cache_retention,
// safety_identifier, user. The chat-completions path strips them, but the
// native passthrough (transformRequest returns body early) did not.
test("codex native responses passthrough strips client-only params (#3317)", async () => {
  const executor = new CodexExecutor();
  const body = {
    _nativeCodexPassthrough: true,
    model: "gpt-5.5",
    input: [{ role: "user", content: [{ type: "input_text", text: "reply ok" }] }],
    prompt_cache_retention: "24h",
    safety_identifier: "droid-user-123",
    user: "user-abc",
    max_output_tokens: 16,
  };

  const result = (await executor.transformRequest("gpt-5.5", body, false, {} as never)) as Record<
    string,
    unknown
  >;

  assert.equal(result.prompt_cache_retention, undefined, "prompt_cache_retention must be stripped");
  assert.equal(result.safety_identifier, undefined, "safety_identifier must be stripped");
  assert.equal(result.user, undefined, "user must be stripped");
  // The real request payload must survive the strip.
  assert.ok(Array.isArray(result.input), "input array preserved");
});

test.after(() => {
  try {
    core.resetDbInstance?.();
  } catch {
    /* ignore */
  }
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});
