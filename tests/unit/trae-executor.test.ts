import test from "node:test";
import assert from "node:assert/strict";

import {
  TraeExecutor,
  buildTraeSessionHeaders,
  getTraeBaseUrl,
  getTraeCandidateApiOrigins,
  normalizeTraeChatBaseUrl,
} from "../../open-sse/executors/trae.ts";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { OAUTH_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { getAccessToken, supportsTokenRefresh } from "../../open-sse/services/tokenRefresh.ts";

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

test("Trae stays an OAuth provider and resolves to the specialized executor", () => {
  assert.ok(OAUTH_PROVIDERS.trae);
  assert.equal(hasSpecializedExecutor("trae"), true);
  assert.ok(getExecutor("trae") instanceof TraeExecutor);
  assert.equal(supportsTokenRefresh("trae"), true);
});

test("Trae helpers derive API origins and normalize chat endpoints", () => {
  const origins = getTraeCandidateApiOrigins("https://www.trae.ai");
  assert.equal(origins[0], "https://www.trae.ai");
  assert.ok(origins.includes("https://api.trae.ai"));

  assert.equal(getTraeBaseUrl(), "");
  assert.equal(
    getTraeBaseUrl({
      loginHost: "https://www.trae.ai",
    }),
    ""
  );
  assert.equal(normalizeTraeChatBaseUrl("https://gateway.example.com/custom"), "");
  assert.equal(
    getTraeBaseUrl({
      baseUrl: "https://gateway.example.com/custom/v1",
    }),
    "https://gateway.example.com/custom/v1/chat/completions"
  );
  assert.equal(
    getTraeBaseUrl({
      baseUrl: "https://gateway.example.com/custom/chat/completions",
    }),
    "https://gateway.example.com/custom/chat/completions"
  );

  const headers = buildTraeSessionHeaders(
    {
      accessToken: "trae-token",
    },
    false
  );
  assert.equal(headers.Authorization, "Bearer trae-token");
  assert.equal(headers["x-cloudide-token"], "trae-token");
  assert.equal(headers.Accept, "application/json");
});

test("Trae executor rejects missing or known-bad chat base URLs", async () => {
  const executor = getExecutor("trae");

  await assert.rejects(
    () =>
      executor.execute({
        model: "claude-3-5-sonnet",
        body: {
          model: "claude-3-5-sonnet",
          messages: [{ role: "user", content: "hello" }],
        },
        stream: false,
        credentials: {
          accessToken: "trae-token",
          providerSpecificData: {
            loginHost: "https://www.trae.ai",
          },
        },
      }),
    /Trae requires an explicit chat base URL/
  );

  await assert.rejects(
    () =>
      executor.execute({
        model: "claude-3-5-sonnet",
        body: {
          model: "claude-3-5-sonnet",
          messages: [{ role: "user", content: "hello" }],
        },
        stream: false,
        credentials: {
          accessToken: "trae-token",
          providerSpecificData: {
            loginHost: "https://www.trae.ai",
            baseUrl: "https://api.trae.ai/v1/chat/completions",
          },
        },
      }),
    /public Trae chat URL guess currently returns 404\/HTML/
  );
});

test("Trae executor sends chat requests with Trae session headers", async () => {
  const executor = getExecutor("trae");
  const calls: Array<{ url: string; init: RequestInit | undefined }> = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return jsonResponse({
      id: "chatcmpl-trae",
      object: "chat.completion",
      created: 1,
      model: "claude-3-5-sonnet",
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
    model: "claude-3-5-sonnet",
    body: {
      model: "claude-3-5-sonnet",
      messages: [{ role: "user", content: "hello" }],
    },
    stream: false,
    credentials: {
      accessToken: "trae-token",
      providerSpecificData: {
        loginHost: "https://www.trae.ai",
        baseUrl: "https://gateway.example.com/trae/v1",
      },
    },
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://gateway.example.com/trae/v1/chat/completions");
  assert.equal(
    (calls[0].init?.headers as Record<string, string>).Authorization,
    "Bearer trae-token"
  );
  assert.equal(
    (calls[0].init?.headers as Record<string, string>)["x-cloudide-token"],
    "trae-token"
  );
  assert.equal(result.url, "https://gateway.example.com/trae/v1/chat/completions");
});

test("Trae refresh path exchanges the refresh token through ExchangeToken", async () => {
  const calls: Array<{ url: string; init: RequestInit | undefined }> = [];

  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });
    return jsonResponse({
      access_token: "trae-token-next",
      refresh_token: "trae-refresh-next",
      expires_in: 7200,
    });
  };

  const refreshed = await getAccessToken(
    "trae",
    {
      accessToken: "trae-token-old",
      refreshToken: "trae-refresh-old",
      providerSpecificData: {
        loginHost: "https://www.trae.ai",
      },
    },
    null
  );

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://www.trae.ai/cloudide/api/v3/trae/oauth/ExchangeToken");
  assert.equal(
    (calls[0].init?.headers as Record<string, string>)["x-cloudide-token"],
    "trae-token-old"
  );
  assert.equal(refreshed?.accessToken, "trae-token-next");
  assert.equal(refreshed?.refreshToken, "trae-refresh-next");
  assert.equal(
    (refreshed?.providerSpecificData as Record<string, unknown>).loginHost,
    "https://www.trae.ai"
  );
});
