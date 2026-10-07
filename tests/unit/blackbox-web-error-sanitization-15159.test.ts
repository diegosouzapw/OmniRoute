import assert from "node:assert/strict";
import { test } from "node:test";

import { BlackboxWebExecutor } from "../../open-sse/executors/blackbox-web.ts";

// Regression guard for audit #15159 / Hard Rule #12 — E-01.
//
// `open-sse/executors/blackbox-web.ts:512-517` interpolated the raw
// `error.message` from a failed fetch straight into a 502 body with no
// sanitizer. The file imports nothing from `utils/error`, so the
// `check:error-helper` gate trusted it and could not see the leak.
//
// Drives the real `execute()` fetch path with a fetch that throws a hostile
// message (stack frame + api key + JWT), then asserts the 502 body never
// contains any of them.

function mockFetchThrowing(message: string) {
  const original = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error(message);
  };
  return () => {
    globalThis.fetch = original;
  };
}

test("E-01: blackbox-web never surfaces a raw fetch error.message in the 502 body", async () => {
  const raw =
    "fetch failed at /srv/private/blackbox-key.json api_key=sk-1234567890abcdef\n    at Object.<anonymous> (/srv/app/client.ts:44:15)";
  const restore = mockFetchThrowing(raw);
  try {
    const executor = new BlackboxWebExecutor();
    const result = await executor.execute({
      model: "openai/gpt-5.4",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: { apiKey: "bb-session-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 502);
    const body = (await result.response.json()) as { error: { message: string } };
    assert.ok(!body.error.message.includes("at /srv/app/client.ts:44:15"), "stack frame leaked");
    assert.ok(!body.error.message.includes("/srv/app/"), "absolute path leaked");
    assert.ok(!body.error.message.includes("sk-1234567890abcdef"), "api key leaked");
  } finally {
    restore();
  }
});

test("E-01: blackbox-web never surfaces a raw fetch error.message for non-Error throws", async () => {
  const raw = "auth failed: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
  const restore = mockFetchThrowing(raw);
  try {
    const executor = new BlackboxWebExecutor();
    const result = await executor.execute({
      model: "openai/gpt-5.4",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: { apiKey: "bb-session-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 502);
    const body = (await result.response.json()) as { error: { message: string } };
    assert.ok(!body.error.message.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"), "JWT leaked");
    assert.ok(!body.error.message.includes("Bearer"), "Bearer token leaked");
  } finally {
    restore();
  }
});
