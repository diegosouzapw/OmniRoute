import test from "node:test";
import assert from "node:assert/strict";

import { KiroExecutor } from "../../open-sse/executors/kiro.ts";

// 2026-09-10 — the branded runtime.*.kiro.dev gateway (tried FIRST by
// KiroExecutor.execute() for any auth method other than api_key/idc/
// external_idp, Builder ID included) enforces a profileArn even for
// connections that legitimately have none. Verified live against a real,
// currently-working Builder ID kiro-cli session: the identical access token
// + request body gets `400 {"message":"profileArn is required for this
// request."}` from runtime.us-east-1.kiro.dev and a normal streaming
// response from codewhisperer.us-east-1.amazonaws.com. Because a plain 400
// was excluded from KIRO_ENDPOINT_FALLBACK_STATUSES (correctly — a malformed
// body can't be fixed by resending it elsewhere), every Builder ID
// connection's first request always failed here instead of ever reaching
// the host that would have served it.

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("KiroExecutor.execute falls back to the CodeWhisperer host when the branded gateway rejects a profileArn-less (Builder ID) account", async () => {
  const executor = new KiroExecutor();
  const originalFetch = globalThis.fetch;
  const calledUrls: string[] = [];
  const successResponse = new Response("ok", { status: 200 });

  executor.transformEventStreamToSSE = () =>
    new Response("data: [DONE]\n\n", {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });

  globalThis.fetch = (async (url: string) => {
    calledUrls.push(String(url));
    if (String(url).includes("runtime.us-east-1.kiro.dev")) {
      return jsonResponse(400, {
        message: "profileArn is required for this request.",
        reason: null,
      });
    }
    return successResponse;
  }) as typeof fetch;

  try {
    const result = await executor.execute({
      model: "claude-sonnet-4.5",
      body: { conversationState: {} },
      stream: true,
      credentials: {
        accessToken: "kiro-token",
        providerSpecificData: { authMethod: "builder-id" },
      },
    } as never);

    assert.equal(result.response.status, 200);
    assert.equal(calledUrls.length, 2, "must retry on the CodeWhisperer host after the gateway 400");
    assert.match(calledUrls[0], /runtime\.us-east-1\.kiro\.dev/);
    assert.match(calledUrls[1], /codewhisperer\.us-east-1\.amazonaws\.com/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("KiroExecutor.execute does not fall back on an unrelated 400 (a malformed body can't be fixed by resending it elsewhere)", async () => {
  const executor = new KiroExecutor();
  const originalFetch = globalThis.fetch;
  const calledUrls: string[] = [];

  globalThis.fetch = (async (url: string) => {
    calledUrls.push(String(url));
    return jsonResponse(400, { message: "Improperly formed request.", reason: null });
  }) as typeof fetch;

  try {
    const result = await executor.execute({
      model: "claude-sonnet-4.5",
      body: { conversationState: {} },
      stream: true,
      credentials: {
        accessToken: "kiro-token",
        providerSpecificData: { authMethod: "builder-id" },
      },
    } as never);

    assert.equal(result.response.status, 400);
    assert.equal(calledUrls.length, 1, "an unrelated 400 must not trigger the second candidate URL");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("KiroExecutor.execute still falls back on the pre-existing 401/403/404 statuses (regression)", async () => {
  const executor = new KiroExecutor();
  const originalFetch = globalThis.fetch;
  const calledUrls: string[] = [];
  const successResponse = new Response("ok", { status: 200 });

  executor.transformEventStreamToSSE = () =>
    new Response("data: [DONE]\n\n", {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });

  globalThis.fetch = (async (url: string) => {
    calledUrls.push(String(url));
    if (String(url).includes("runtime.us-east-1.kiro.dev")) {
      return new Response("forbidden", { status: 403 });
    }
    return successResponse;
  }) as typeof fetch;

  try {
    const result = await executor.execute({
      model: "claude-sonnet-4.5",
      body: { conversationState: {} },
      stream: true,
      credentials: {
        accessToken: "kiro-token",
        providerSpecificData: { authMethod: "builder-id" },
      },
    } as never);

    assert.equal(result.response.status, 200);
    assert.equal(calledUrls.length, 2);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("KiroExecutor.execute never tries the branded gateway for api_key/idc auth (single candidate URL, unaffected by this fix)", async () => {
  const executor = new KiroExecutor();
  const originalFetch = globalThis.fetch;
  const calledUrls: string[] = [];

  globalThis.fetch = (async (url: string) => {
    calledUrls.push(String(url));
    return jsonResponse(400, {
      message: "profileArn is required for this request.",
      reason: null,
    });
  }) as typeof fetch;

  try {
    const result = await executor.execute({
      model: "claude-sonnet-4.5",
      body: { conversationState: {} },
      stream: true,
      credentials: {
        accessToken: "kiro-token",
        providerSpecificData: { authMethod: "api_key" },
      },
    } as never);

    assert.equal(result.response.status, 400);
    assert.equal(calledUrls.length, 1);
    assert.match(calledUrls[0], /codewhisperer\.us-east-1\.amazonaws\.com/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
