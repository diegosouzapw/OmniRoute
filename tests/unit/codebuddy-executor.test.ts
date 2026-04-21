import test from "node:test";
import assert from "node:assert/strict";

import {
  CodeBuddyExecutor,
  buildCodeBuddyHeaders,
  buildCodeBuddyUrl,
} from "../../open-sse/executors/codebuddy.ts";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { APIKEY_PROVIDERS, OAUTH_PROVIDERS } from "../../src/shared/constants/providers.ts";

const originalFetch = globalThis.fetch;

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
});

test("CodeBuddy is exposed as an API key provider instead of a browser OAuth provider", () => {
  assert.ok(APIKEY_PROVIDERS.codebuddy);
  assert.equal(OAUTH_PROVIDERS.codebuddy, undefined);
});

test("CodeBuddy resolves to the specialized executor and normalizes custom base URLs", () => {
  assert.equal(hasSpecializedExecutor("codebuddy"), true);

  const executor = getExecutor("codebuddy");

  assert.ok(executor instanceof CodeBuddyExecutor);
  assert.equal(executor.getProvider(), "codebuddy");
  assert.equal(
    buildCodeBuddyUrl({
      providerSpecificData: { baseUrl: "https://gateway.example.com/v1" },
    }),
    "https://gateway.example.com/v1/chat/completions"
  );
});

test("CodeBuddy executor sends the same secret as X-Api-Key and Bearer auth", async () => {
  const executor = getExecutor("codebuddy");
  const calls: Array<{ url: string; init: RequestInit | undefined }> = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return jsonResponse({
      id: "chatcmpl-codebuddy",
      object: "chat.completion",
      created: 1,
      model: "glm-5.1",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "ok" },
          finish_reason: "stop",
        },
      ],
    });
  };

  const result = await executor.execute({
    model: "glm-5.1",
    body: {
      model: "glm-5.1",
      messages: [{ role: "user", content: "hello" }],
    },
    stream: false,
    credentials: {
      apiKey: "codebuddy-secret",
      providerSpecificData: {
        baseUrl: "https://gateway.example.com/v1",
      },
    },
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://gateway.example.com/v1/chat/completions");
  assert.equal((calls[0].init?.headers as Record<string, string>)["X-Api-Key"], "codebuddy-secret");
  assert.equal(
    (calls[0].init?.headers as Record<string, string>).Authorization,
    "Bearer codebuddy-secret"
  );
  assert.equal(result.url, calls[0].url);
});

test("CodeBuddy header builder falls back to access tokens when no API key is stored", () => {
  const headers = buildCodeBuddyHeaders(
    {
      accessToken: "codebuddy-oauth-token",
    },
    false
  );

  assert.equal(headers["X-Api-Key"], "codebuddy-oauth-token");
  assert.equal(headers.Authorization, "Bearer codebuddy-oauth-token");
  assert.equal(headers.Accept, "application/json");
});
