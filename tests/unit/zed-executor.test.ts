import test from "node:test";
import assert from "node:assert/strict";

import {
  ZedExecutor,
  buildZedAuthorizationHeader,
  buildZedChatHeaders,
  getZedChatUrl,
} from "../../open-sse/executors/zed.ts";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { extractZedQuotaSnapshot } from "../../src/lib/oauth/services/zed.ts";
import { OAUTH_PROVIDERS } from "../../src/shared/constants/providers.ts";

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

test("Zed stays an OAuth provider and resolves to the specialized executor", () => {
  assert.ok(OAUTH_PROVIDERS.zed);
  assert.equal(hasSpecializedExecutor("zed"), true);
  assert.ok(getExecutor("zed") instanceof ZedExecutor);
});

test("Zed helpers normalize the completion URL and native authorization header", () => {
  assert.equal(buildZedAuthorizationHeader("user-123", "zed-token"), "user-123 zed-token");
  assert.equal(getZedChatUrl(), "https://ai.zed.dev/completion");
  assert.equal(
    getZedChatUrl({
      baseUrl: "https://ai.zed.dev",
    }),
    "https://ai.zed.dev/completion"
  );

  const headers = buildZedChatHeaders(
    {
      accessToken: "zed-token",
      providerSpecificData: { userId: "user-123" },
    },
    false
  );

  assert.equal(headers.Authorization, "user-123 zed-token");
  assert.equal(headers.Accept, "application/json");
});

test("Zed quota snapshot parser extracts plan and usage counters from the profile payload", () => {
  const quota = extractZedQuotaSnapshot({
    plan: {
      plan_v3: "token_based_zed_student",
      usage: {
        edit_predictions: {
          used: 26,
          limit: null,
          remaining: null,
        },
      },
    },
    is_account_too_young: false,
    current_usage: {
      token_spend: {
        spend_in_cents: 1000,
        limit_in_cents: 2500,
        remaining_in_cents: 1500,
      },
      edit_predictions: {
        used: 26,
        limit: null,
        remaining: null,
      },
    },
    portal_url: "https://portal.withorb.com/view?token=zed",
  });

  assert.deepEqual(quota, {
    planRaw: "token_based_zed_student",
    isAccountTooYoung: false,
    tokenSpendUsedCents: 1000,
    tokenSpendLimitCents: 2500,
    tokenSpendRemainingCents: 1500,
    editPredictionsUsed: 26,
    editPredictionsLimitRaw: null,
    editPredictionsRemainingRaw: null,
    billingPortalUrl: "https://portal.withorb.com/view?token=zed",
  });
});

test("Zed executor sends chat requests with the native userId access token header", async () => {
  const executor = getExecutor("zed");
  const calls: Array<{ url: string; init: RequestInit | undefined }> = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return jsonResponse({
      id: "chatcmpl-zed",
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
      accessToken: "zed-token",
      providerSpecificData: {
        userId: "user-123",
      },
    },
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://ai.zed.dev/completion");
  assert.equal(
    (calls[0].init?.headers as Record<string, string>).Authorization,
    "user-123 zed-token"
  );
  assert.equal(result.url, "https://ai.zed.dev/completion");
});
