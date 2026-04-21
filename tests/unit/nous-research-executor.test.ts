import test from "node:test";
import assert from "node:assert/strict";

import {
  buildNousResearchAgentKeyUrl,
  buildNousResearchChatUrl,
  buildNousResearchHeaders,
  getNousResearchInferenceBaseUrl,
  getNousResearchPortalBaseUrl,
  NousResearchExecutor,
} from "../../open-sse/executors/nous-research.ts";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";

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

test("Nous Research is wired to a specialized executor and normalizes portal/inference URLs", () => {
  assert.equal(hasSpecializedExecutor("nous-research"), true);
  const executor = getExecutor("nous-research");

  assert.ok(executor instanceof NousResearchExecutor);
  assert.equal(getNousResearchPortalBaseUrl(), "https://portal.nousresearch.com");
  assert.equal(getNousResearchInferenceBaseUrl(), "https://inference-api.nousresearch.com/v1");
  assert.equal(
    buildNousResearchAgentKeyUrl("https://portal.nousresearch.com/"),
    "https://portal.nousresearch.com/api/oauth/agent-key"
  );
  assert.equal(
    buildNousResearchChatUrl({
      providerSpecificData: { inferenceBaseUrl: "https://gateway.nous.example/v1/" },
    }),
    "https://gateway.nous.example/v1/chat/completions"
  );
});

test("Nous Research headers prefer the minted agent key over the OAuth access token", () => {
  const headers = buildNousResearchHeaders(
    {
      accessToken: "oauth-access-token",
      providerSpecificData: {
        agentKey: "nous-agent-key",
      },
    },
    false
  );

  assert.equal(headers.Authorization, "Bearer nous-agent-key");
  assert.equal(headers.Accept, "application/json");
});

test("Nous Research executor mints an agent key before sending chat completions", async () => {
  const calls: Array<{ url: string; init: RequestInit | undefined }> = [];

  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });

    if (calls.length === 1) {
      return jsonResponse({
        api_key: "nous-agent-key",
        key_id: "key-1",
        expires_at: "2030-01-01T00:00:00.000Z",
        expires_in: 1800,
        reused: false,
      });
    }

    return jsonResponse({
      id: "chatcmpl-nous",
      object: "chat.completion",
      created: 1,
      model: "anthropic/claude-sonnet-4.6",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "ok" },
          finish_reason: "stop",
        },
      ],
    });
  };

  const executor = getExecutor("nous-research");
  const persisted: Array<Record<string, unknown>> = [];
  const result = await executor.execute({
    model: "anthropic/claude-sonnet-4.6",
    body: {
      model: "anthropic/claude-sonnet-4.6",
      messages: [{ role: "user", content: "hello" }],
    },
    stream: false,
    credentials: {
      accessToken: "nous-oauth-access",
      refreshToken: "nous-refresh-token",
      providerSpecificData: {
        portalBaseUrl: "https://portal.nousresearch.com",
        inferenceBaseUrl: "https://inference-api.nousresearch.com/v1",
      },
    },
    onCredentialsRefreshed(newCredentials) {
      persisted.push(newCredentials as Record<string, unknown>);
    },
  });

  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, "https://portal.nousresearch.com/api/oauth/agent-key");
  assert.equal(calls[0].init?.method, "POST");
  assert.equal(calls[0].init?.headers?.Authorization, "Bearer nous-oauth-access");
  assert.equal(calls[1].url, "https://inference-api.nousresearch.com/v1/chat/completions");
  assert.equal(calls[1].init?.headers?.Authorization, "Bearer nous-agent-key");
  assert.equal(persisted.length, 1);
  assert.equal(
    (persisted[0].providerSpecificData as Record<string, unknown>).agentKey,
    "nous-agent-key"
  );
  assert.equal(result.url, "https://inference-api.nousresearch.com/v1/chat/completions");
});

test("Nous Research refreshCredentials refreshes the OAuth token before minting when the access token is expiring", async () => {
  const executor = new NousResearchExecutor("nous-research");
  const calls: Array<{ url: string; init: RequestInit | undefined }> = [];

  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });

    if (calls.length === 1) {
      return jsonResponse({
        access_token: "nous-access-next",
        refresh_token: "nous-refresh-next",
        expires_in: 3600,
      });
    }

    return jsonResponse({
      api_key: "nous-agent-key-next",
      key_id: "key-2",
      expires_in: 1800,
      reused: false,
    });
  };

  const refreshed = await executor.refreshCredentials(
    {
      accessToken: "nous-access-old",
      refreshToken: "nous-refresh-old",
      expiresAt: new Date(Date.now() + 30_000).toISOString(),
      providerSpecificData: {
        portalBaseUrl: "https://portal.nousresearch.com",
      },
    },
    null
  );

  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, "https://portal.nousresearch.com/api/oauth/token");
  assert.match(String(calls[0].init?.body || ""), /grant_type=refresh_token/);
  assert.match(String(calls[0].init?.body || ""), /client_id=hermes-cli/);
  assert.match(String(calls[0].init?.body || ""), /refresh_token=nous-refresh-old/);
  assert.equal(calls[1].url, "https://portal.nousresearch.com/api/oauth/agent-key");
  assert.equal(calls[1].init?.headers?.Authorization, "Bearer nous-access-next");
  assert.equal(refreshed?.accessToken, "nous-access-next");
  assert.equal(refreshed?.refreshToken, "nous-refresh-next");
  assert.equal(
    (refreshed?.providerSpecificData as Record<string, unknown>).agentKey,
    "nous-agent-key-next"
  );
});
