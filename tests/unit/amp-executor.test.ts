import test from "node:test";
import assert from "node:assert/strict";

import {
  AMP_DEFAULT_BASE_URL,
  AmpExecutor,
  buildAmpChatUrl,
  buildAmpHeaders,
  getAmpBaseUrl,
} from "../../open-sse/executors/amp.ts";
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

test("Amp is exposed as an API key provider instead of OAuth", () => {
  assert.ok(APIKEY_PROVIDERS.amp);
  assert.equal(OAUTH_PROVIDERS.amp, undefined);
});

test("Amp resolves to the specialized executor and normalizes base URLs", () => {
  assert.equal(hasSpecializedExecutor("amp"), true);

  const executor = getExecutor("amp");

  assert.ok(executor instanceof AmpExecutor);
  assert.equal(AMP_DEFAULT_BASE_URL, "https://api.ampcode.com/v1");
  assert.equal(getAmpBaseUrl(), AMP_DEFAULT_BASE_URL);
  assert.equal(
    getAmpBaseUrl({
      providerSpecificData: { baseUrl: "https://ampcode.com" },
    }),
    AMP_DEFAULT_BASE_URL
  );
  assert.equal(
    buildAmpChatUrl({
      providerSpecificData: { baseUrl: "https://gateway.example.com/custom/v1" },
    }),
    "https://gateway.example.com/custom/v1/chat/completions"
  );
});

test("Amp executor sends bearer auth to the normalized chat endpoint", async () => {
  const executor = getExecutor("amp");
  const calls: Array<{ url: string; init: RequestInit | undefined }> = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return jsonResponse({
      id: "chatcmpl-amp",
      object: "chat.completion",
      created: 1,
      model: "claude-sonnet-4-5-20250929",
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
    model: "claude-sonnet-4-5-20250929",
    body: {
      model: "claude-sonnet-4-5-20250929",
      messages: [{ role: "user", content: "hello" }],
    },
    stream: false,
    credentials: {
      apiKey: "sgamp-secret",
      providerSpecificData: {
        baseUrl: "https://ampcode.com",
      },
    },
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.ampcode.com/v1/chat/completions");
  assert.equal(
    (calls[0].init?.headers as Record<string, string>).Authorization,
    "Bearer sgamp-secret"
  );
  assert.equal(result.url, "https://api.ampcode.com/v1/chat/completions");
});

test("Amp header builder falls back to access tokens when no API key is stored", () => {
  const headers = buildAmpHeaders(
    {
      accessToken: "sgamp-oauthish-token",
    },
    false
  );

  assert.equal(headers.Authorization, "Bearer sgamp-oauthish-token");
  assert.equal(headers.Accept, "application/json");
});
