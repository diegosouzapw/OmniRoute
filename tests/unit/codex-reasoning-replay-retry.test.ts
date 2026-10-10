/**
 * Codex rejects replayed reasoning whose encrypted_content this account cannot decrypt
 * (cross-account / cross-model history, or a combo/account fallback) with HTTP 400. Instead of
 * surfacing that 400 to clients that cannot "resend without the reasoning item", the HTTP
 * executor retries ONCE on the same account with the ciphertext stripped. A repeated rejection
 * still reaches the client as the stable `invalid_encrypted_content` 400, and it never rotates
 * accounts (a different account cannot decrypt the foreign ciphertext either).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-codex-replay-retry-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { CodexExecutor, __setCodexWebSocketTransportForTesting } =
  await import("../../open-sse/executors/codex.ts");
const { stripUndecryptableReasoning } =
  await import("../../open-sse/executors/codex/reasoningReplayRejection.ts");
const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");

const VERIFY_FAILED =
  "The encrypted content for item rs_0123456789abcdef could not be verified. Reason: Encrypted content could not be decrypted or parsed.";

function upstreamError(error: Record<string, unknown>, status = 400): Response {
  return Response.json({ error }, { status });
}

function replayRejection(status = 400): Response {
  return upstreamError(
    { message: VERIFY_FAILED, type: "invalid_request_error", param: null, code: "" },
    status
  );
}

function sseOk(): Response {
  const event = { type: "response.completed", response: { id: "resp_1", status: "completed" } };
  return new Response(`data: ${JSON.stringify(event)}\n\n`, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

function requestBody() {
  return {
    model: "gpt-5.5",
    input: [
      {
        type: "reasoning",
        summary: [{ type: "summary_text", text: "keep this summary" }],
        encrypted_content: "foreign-secret",
      },
      { type: "reasoning", id: "rs_dropme", summary: [], encrypted_content: "ciphertext-only" },
      { type: "message", role: "user", content: [{ type: "input_text", text: "continue" }] },
    ],
  };
}

type Captured = { body: Record<string, unknown> };

async function executeAgainst(
  responses: Response[],
  body: Record<string, unknown> = requestBody(),
  log?: { warn: (...args: unknown[]) => void }
) {
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;
  const calls: Captured[] = [];
  globalThis.fetch = (async (_url: unknown, init?: { body?: unknown }) => {
    calls.push({ body: JSON.parse(String(init?.body ?? "{}")) });
    const next = responses.shift();
    if (!next) throw new Error("unexpected extra upstream call");
    return next;
  }) as typeof fetch;
  try {
    const result = await executor.execute({
      model: "gpt-5.5",
      body,
      stream: true,
      credentials: { accessToken: "codex-token" },
      log,
    });
    return { result, calls };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function encryptedItems(wireBody: Record<string, unknown>): unknown[] {
  return (wireBody.input as Record<string, unknown>[]).filter(
    (item) => item && item.encrypted_content !== undefined
  );
}

test.afterEach(() => __setCodexWebSocketTransportForTesting(undefined));
test.after(async () => {
  await cleanupTempDataDir(TEST_DATA_DIR);
});

test("stripUndecryptableReasoning removes ciphertext, drops empty items, never mutates", () => {
  const body = requestBody();
  const { body: stripped, removed } = stripUndecryptableReasoning(body);
  assert.equal(removed, 2);
  assert.deepEqual((stripped as { input: unknown[] }).input, [
    { type: "reasoning", summary: [{ type: "summary_text", text: "keep this summary" }] },
    { type: "message", role: "user", content: [{ type: "input_text", text: "continue" }] },
  ]);
  assert.equal(encryptedItems(body).length, 2, "the caller's body is untouched");

  const plain = { input: [{ type: "message", role: "user", content: "hi" }] };
  assert.deepEqual(stripUndecryptableReasoning(plain), { body: plain, removed: 0 });
  assert.deepEqual(stripUndecryptableReasoning(null), { body: null, removed: 0 });
});

test("retries once on the same account without the ciphertext and returns the success", async () => {
  const warnings: unknown[][] = [];
  const body = requestBody();
  const { result, calls } = await executeAgainst([replayRejection(), sseOk()], body, {
    warn: (...args: unknown[]) => warnings.push(args),
  });

  assert.equal(result.response.status, 200);
  assert.equal(calls.length, 2);
  assert.equal(encryptedItems(calls[0].body).length, 2, "first attempt keeps the ciphertext");
  assert.equal(encryptedItems(calls[1].body).length, 0, "retry carries no ciphertext");
  assert.equal(JSON.stringify(calls[1].body).includes("rs_dropme"), false);
  assert.ok(
    (calls[1].body.input as Record<string, unknown>[]).some(
      (item) => item.type === "message" && item.role === "user"
    )
  );
  assert.equal(encryptedItems(body).length, 2, "the caller's body is untouched");
  const logged = JSON.stringify(warnings);
  assert.match(logged, /2 encrypted reasoning item/);
  assert.equal(logged.includes("foreign-secret"), false, "ciphertext never reaches logs");
  assert.equal(logged.includes("ciphertext-only"), false, "ciphertext never reaches logs");
});

test("stops after one retry and relabels a repeated rejection", async () => {
  const { result, calls } = await executeAgainst([replayRejection(), replayRejection()]);
  assert.equal(calls.length, 2);
  assert.equal(result.response.status, 400);
  const body = await result.response.json();
  assert.equal(body.error.code, "invalid_encrypted_content");
  assert.equal(body.error.message.includes("at /"), false);
});

test("does not retry when the rejected history carries no encrypted reasoning", async () => {
  const { result, calls } = await executeAgainst([replayRejection()], {
    model: "gpt-5.5",
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
  });
  assert.equal(calls.length, 1);
  assert.equal(result.response.status, 400);
  assert.equal((await result.response.json()).error.code, "invalid_encrypted_content");
});

test("does not retry unrelated 400s", async () => {
  const { result, calls } = await executeAgainst([
    upstreamError({ message: "Unknown parameter: input[0].content", code: "unknown_parameter" }),
  ]);
  assert.equal(calls.length, 1);
  assert.equal(result.response.status, 400);
  assert.equal((await result.response.json()).error.code, "unknown_parameter");
});

test("does not retry the same message at a non-400 status", async () => {
  const { result, calls } = await executeAgainst([replayRejection(422)]);
  assert.equal(calls.length, 1);
  assert.equal(result.response.status, 422);
});

test("a final replay rejection never rotates accounts", () => {
  const text = JSON.stringify({
    error: {
      message: VERIFY_FAILED,
      type: "invalid_request_error",
      code: "invalid_encrypted_content",
    },
  });
  const verdict = checkFallbackError(400, text, 0, "gpt-5.5", "codex", null, null, {
    code: "invalid_encrypted_content",
    type: "invalid_request_error",
  });
  assert.equal(verdict.shouldFallback, false);
  assert.equal(verdict.cooldownMs, 0);
  assert.equal(checkFallbackError(400, VERIFY_FAILED, 0, "gpt-5.5", "codex").shouldFallback, false);
});
