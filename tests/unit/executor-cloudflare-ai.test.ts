import test from "node:test";
import assert from "node:assert/strict";

import { CloudflareAIExecutor } from "../../open-sse/executors/cloudflare-ai.ts";

test("CloudflareAIExecutor.buildUrl prefers providerSpecificData.accountId", () => {
  const executor = new CloudflareAIExecutor();
  const url = executor.buildUrl("@cf/meta/llama-3.3-70b-instruct", true, 0, {
    accountId: "top-level-id",
    providerSpecificData: { accountId: "provider-id" },
  });

  assert.equal(
    url,
    "https://api.cloudflare.com/client/v4/accounts/provider-id/ai/v1/chat/completions"
  );
});

test("CloudflareAIExecutor.buildUrl falls back to top-level credentials and environment", () => {
  const executor = new CloudflareAIExecutor();
  const originalAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  process.env.CLOUDFLARE_ACCOUNT_ID = "env-account-id";

  try {
    const fromTopLevel = executor.buildUrl("@cf/meta/llama-3.3-70b-instruct", false, 0, {
      accountId: "top-level-id",
    });
    const fromEnv = executor.buildUrl("@cf/meta/llama-3.3-70b-instruct", false, 0, {});

    assert.equal(
      fromTopLevel,
      "https://api.cloudflare.com/client/v4/accounts/top-level-id/ai/v1/chat/completions"
    );
    assert.equal(
      fromEnv,
      "https://api.cloudflare.com/client/v4/accounts/env-account-id/ai/v1/chat/completions"
    );
  } finally {
    if (originalAccountId === undefined) delete process.env.CLOUDFLARE_ACCOUNT_ID;
    else process.env.CLOUDFLARE_ACCOUNT_ID = originalAccountId;
  }
});

test("CloudflareAIExecutor.buildUrl throws when account ID is missing", () => {
  const executor = new CloudflareAIExecutor();
  const originalAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  delete process.env.CLOUDFLARE_ACCOUNT_ID;

  try {
    assert.throws(
      () => executor.buildUrl("@cf/meta/llama-3.3-70b-instruct", true, 0, {}),
      /Account ID/
    );
  } finally {
    if (originalAccountId === undefined) delete process.env.CLOUDFLARE_ACCOUNT_ID;
    else process.env.CLOUDFLARE_ACCOUNT_ID = originalAccountId;
  }
});

test("CloudflareAIExecutor.buildHeaders uses API key or access token and stream accept", () => {
  const executor = new CloudflareAIExecutor();
  const apiKeyHeaders = executor.buildHeaders({ apiKey: "cf-api-token" }, true);
  const accessTokenHeaders = executor.buildHeaders({ accessToken: "cf-access-token" }, false);

  assert.deepEqual(apiKeyHeaders, {
    "Content-Type": "application/json",
    Authorization: "Bearer cf-api-token",
    Accept: "text/event-stream",
  });
  assert.deepEqual(accessTokenHeaders, {
    "Content-Type": "application/json",
    Authorization: "Bearer cf-access-token",
  });
});

test("CloudflareAIExecutor.transformRequest is a passthrough for full model paths", () => {
  const executor = new CloudflareAIExecutor();
  const body = {
    model: "@cf/meta/llama-3.3-70b-instruct",
    messages: [{ role: "user", content: "hi" }],
  };

  assert.equal(executor.transformRequest("@cf/meta/llama-3.3-70b-instruct", body, true, {}), body);
});

test("CloudflareAIExecutor.execute uses inherited BaseExecutor flow successfully", async () => {
  const executor = new CloudflareAIExecutor();
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options) => {
    captured = { url: String(url), options };
    return new Response(
      JSON.stringify({
        id: "chatcmpl-cf",
        object: "chat.completion",
        choices: [{ index: 0, message: { role: "assistant", content: "ok" } }],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  try {
    const body = {
      model: "@cf/meta/llama-3.3-70b-instruct",
      messages: [{ role: "user", content: "hello" }],
    };
    const result = await executor.execute({
      model: "@cf/meta/llama-3.3-70b-instruct",
      body,
      stream: false,
      credentials: {
        apiKey: "cf-api-token",
        providerSpecificData: { accountId: "account-123" },
      },
    });

    assert.equal(result.response.status, 200);
    assert.equal(
      result.url,
      "https://api.cloudflare.com/client/v4/accounts/account-123/ai/v1/chat/completions"
    );
    assert.equal(result.transformedBody, body);
    assert.equal(captured.options.headers.Authorization, "Bearer cf-api-token");
    assert.equal(captured.options.body, JSON.stringify(body));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
