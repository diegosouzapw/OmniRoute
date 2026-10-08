/**
 * Codex rejects a replayed reasoning item whose encrypted_content cannot be verified with
 * HTTP 400 and an empty `code`. On the HTTP transport the body reached the client with
 * `code: "bad_request"`, so a Responses client could not tell "drop the reasoning and resend"
 * apart from any other bad request. The executor now normalizes it to
 * `invalid_encrypted_content`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-codex-replay-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { CodexExecutor, __setCodexWebSocketTransportForTesting } =
  await import("../../open-sse/executors/codex.ts");
const { readCodexReasoningReplayRejection } =
  await import("../../open-sse/executors/codex/reasoningReplayRejection.ts");
const { parseUpstreamError, createErrorResult } = await import("../../open-sse/utils/error.ts");

// Exact upstream wording observed on the Codex HTTP/SSE transport (upstream `code` is "").
const VERIFY_FAILED =
  "The encrypted content for item rs_0123456789abcdef could not be verified. Reason: Encrypted content could not be decrypted or parsed.";

function upstream400(error: Record<string, unknown>, status = 400): Response {
  return Response.json({ error }, { status });
}

test.afterEach(() => __setCodexWebSocketTransportForTesting(undefined));
// cleanupTempDataDir closes any DB handle the executor opened before deleting the dir.
test.after(async () => {
  await cleanupTempDataDir(TEST_DATA_DIR);
});

test("detects the rejection by message (empty upstream code) or by code", async () => {
  for (const error of [
    { message: VERIFY_FAILED, type: "invalid_request_error", param: null, code: "" },
    { message: VERIFY_FAILED, type: "invalid_request_error", code: null },
    { message: "rejected", type: "invalid_request_error", code: "invalid_encrypted_content" },
  ]) {
    const response = upstream400(error);
    assert.deepEqual(await readCodexReasoningReplayRejection(response), {
      message: error.message,
    });
    assert.equal(response.bodyUsed, false, "the original body stays readable");
  }
});

test("ignores other 400s, non-400 statuses and non-JSON bodies", async () => {
  assert.equal(
    await readCodexReasoningReplayRejection(
      upstream400({ message: "Unsupported parameter: 'temperature'.", code: null })
    ),
    null
  );
  assert.equal(
    await readCodexReasoningReplayRejection(upstream400({ message: VERIFY_FAILED }, 401)),
    null
  );
  assert.equal(
    await readCodexReasoningReplayRejection(new Response("not json", { status: 400 })),
    null
  );
});

async function executeAgainst(upstream: Response) {
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => upstream;
  try {
    return await executor.execute({
      model: "gpt-5.5",
      body: { model: "gpt-5.5", input: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: { accessToken: "codex-token" },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("the executor turns a replay rejection into invalid_encrypted_content", async () => {
  const result = await executeAgainst(
    upstream400({ message: VERIFY_FAILED, type: "invalid_request_error", param: null, code: "" })
  );
  assert.equal(result.response.status, 400);
  const body = await result.response.clone().json();
  assert.equal(body.error.code, "invalid_encrypted_content");
  assert.equal(body.error.type, "invalid_request_error");
  assert.match(body.error.message, /rs_0123456789abcdef/);
  assert.equal(body.error.message.includes("at /"), false);

  // What chatCore does next with the executor's response: the code must survive.
  const parsed = await parseUpstreamError(result.response, "codex");
  const client = createErrorResult(
    parsed.statusCode,
    parsed.message,
    parsed.retryAfterMs,
    parsed.errorCode as string,
    parsed.errorType as string,
    parsed.responseBody
  );
  assert.equal(client.response.status, 400);
  const clientBody = JSON.parse(await client.response.text());
  assert.equal(clientBody.error.code, "invalid_encrypted_content");
});

test("the executor leaves other 400s untouched", async () => {
  const result = await executeAgainst(
    upstream400({ message: "Unsupported parameter: 'temperature'.", type: "invalid_request_error" })
  );
  assert.equal(result.response.status, 400);
  const body = await result.response.json();
  assert.equal(body.error.message, "Unsupported parameter: 'temperature'.");
});
