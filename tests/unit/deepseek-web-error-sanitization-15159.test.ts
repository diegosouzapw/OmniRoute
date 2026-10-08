import assert from "node:assert/strict";
import { test } from "node:test";

import { DeepSeekWebExecutor } from "../../open-sse/executors/deepseek-web.ts";

// Regression guard for audit #15159 / Hard Rule #12 — E-09.
//
// `open-sse/executors/deepseek-web.ts` had a file-local `errorResponse`
// builder that interpolated the raw upstream `errBody.msg` /
// `parsed.message` with no sanitizer. Because the file imports
// `sanitizeErrorMessage` elsewhere, the `check:error-helper` gate trusted
// the whole file and could not see the leak.
//
// This drives the real `execute()` path with a mocked fetch that returns a
// DeepSeek error JSON carrying a stack frame and an api key in `msg`, then
// asserts the client-facing body never contains either.

async function runWithMockedCompletion(
  errorBody: Record<string, unknown>,
  status = 500,
  contentType = "application/json"
) {
  const original = globalThis.fetch;
  globalThis.fetch = async (url: URL | string) => {
    const urlStr = typeof url === "string" ? url : url.toString();
    if (urlStr.includes("/users/current")) {
      return new Response(
        JSON.stringify({
          code: 0,
          data: { biz_data: { token: "test-access-token-123", email: "test@test.com" } },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (urlStr.includes("/chat_session/create")) {
      return new Response(
        JSON.stringify({
          code: 0,
          data: { biz_data: { chat_session: { id: "session-abc-123" } } },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (urlStr.includes("/create_pow_challenge")) {
      return new Response(
        JSON.stringify({
          code: 0,
          data: {
            biz_data: {
              challenge: {
                algorithm: "DeepSeekHashV1",
                challenge: "311b26ae1e0fe7375e242958ce46db5552a6c67fea3f96880dcd846c63a74286",
                salt: "1122334455667788",
                signature: "sig123",
                difficulty: 1000,
                expire_at: 1778891543095,
                expire_after: 300000,
                target_path: "/api/v0/chat/completion",
              },
            },
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (urlStr.includes("/chat_session/delete")) {
      return new Response(JSON.stringify({ code: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (urlStr.includes("/chat/completion")) {
      return new Response(JSON.stringify(errorBody), {
        status,
        headers: { "Content-Type": contentType },
      });
    }
    return new Response("Not found", { status: 404 });
  };
  try {
    const executor = new DeepSeekWebExecutor();
    return await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "Say hello" }] },
      stream: false,
      credentials: { apiKey: "test-user-token-1234" },
      signal: AbortSignal.timeout(10000),
    });
  } finally {
    globalThis.fetch = original;
  }
}

test("E-09: deepseek-web never surfaces a raw upstream errBody.msg in the client body", async () => {
  const raw =
    "upstream exploded\n    at Object.<anonymous> (/srv/app/client.ts:44:15) api_key=sk-1234567890abcdef";
  const result = await runWithMockedCompletion({ code: 10001, msg: raw }, 500);
  const text = await result.response.text();
  const body = JSON.parse(text) as { error: { message: string } };

  assert.equal(result.response.status, 500);
  assert.ok(!body.error.message.includes("at /srv/app/client.ts:44:15"), "stack frame leaked");
  assert.ok(!body.error.message.includes("/srv/app/"), "absolute path leaked");
  assert.ok(!body.error.message.includes("sk-1234567890abcdef"), "api key leaked");
});

test("E-09: deepseek-web never surfaces a raw upstream parsed.message in the client body", async () => {
  const raw = "auth failed: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
  // HTTP 200 + application/json routes through the parseDeepSeekErrorPayload
  // branch (:1053), which is where parsed.message leaks at :1060.
  const result = await runWithMockedCompletion({ code: 40002, msg: raw }, 200, "application/json");
  const text = await result.response.text();
  const body = JSON.parse(text) as { error: { message: string } };

  assert.equal(result.response.status, 429);
  assert.ok(!body.error.message.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"), "JWT leaked");
  assert.ok(!body.error.message.includes("Bearer"), "Bearer token leaked");
});
