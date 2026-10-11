/**
 * Anthropic API-key usage wiring.
 *
 * The Claude Code OAuth fetcher does not apply to a platform.claude.com key.
 * A plain key has no usage endpoint, so the fetcher reads the per-minute
 * rate-limit windows from one /v1/messages response. The dashboard only asks
 * for that quota when the provider is in USAGE_SUPPORTED_PROVIDERS.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { USAGE_SUPPORTED_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { supportsProviderQuota } from "../../src/shared/utils/providerQuotaVisibility.ts";
import { USAGE_FETCHER_PROVIDERS, getUsageForProvider } from "../../open-sse/services/usage.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("anthropic is registered for both the fetcher and the dashboard gate", () => {
  assert.equal(
    USAGE_FETCHER_PROVIDERS.includes("anthropic" as (typeof USAGE_FETCHER_PROVIDERS)[number]),
    true
  );
  assert.equal(
    USAGE_SUPPORTED_PROVIDERS.includes("anthropic" as (typeof USAGE_SUPPORTED_PROVIDERS)[number]),
    true
  );
  assert.equal(supportsProviderQuota("anthropic"), true);
});

test("getUsageForProvider reads the four rate-limit windows for an anthropic key", async () => {
  let requested: { url: string; headers: Headers; model: string | null } | null = null;
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const rawBody = typeof init?.body === "string" ? init.body : null;
    const parsed = rawBody ? (JSON.parse(rawBody) as { model?: unknown }) : null;
    requested = {
      url: String(url),
      headers: new Headers(init?.headers),
      model: typeof parsed?.model === "string" ? parsed.model : null,
    };
    return new Response("{}", {
      status: 200,
      headers: {
        "anthropic-ratelimit-requests-limit": "1000",
        "anthropic-ratelimit-requests-remaining": "999",
        "anthropic-ratelimit-requests-reset": "2026-10-08T14:51:42Z",
        "anthropic-ratelimit-input-tokens-limit": "2000000",
        "anthropic-ratelimit-input-tokens-remaining": "1500000",
        "anthropic-ratelimit-input-tokens-reset": "2026-10-08T14:51:42Z",
        "anthropic-ratelimit-output-tokens-limit": "400000",
        "anthropic-ratelimit-output-tokens-remaining": "400000",
        "anthropic-ratelimit-output-tokens-reset": "2026-10-08T14:51:42Z",
        "anthropic-ratelimit-tokens-limit": "2400000",
        "anthropic-ratelimit-tokens-remaining": "1900000",
        "anthropic-ratelimit-tokens-reset": "2026-10-08T14:51:42Z",
      },
    });
  }) as typeof fetch;

  const result = (await getUsageForProvider({
    provider: "anthropic",
    apiKey: "sk-ant-test",
  })) as { plan?: string; quotas?: Record<string, { remaining: number; total: number }> };

  assert.equal(requested?.url, "https://api.anthropic.com/v1/messages");
  assert.equal(requested?.headers.get("x-api-key"), "sk-ant-test");
  assert.equal(requested?.model, "claude-haiku-4-5-20251001");
  assert.equal(result.plan, "API key");
  assert.equal(result.quotas?.requests.remaining, 999);
  assert.equal(result.quotas?.input_tokens.remaining, 1500000);
  assert.equal(result.quotas?.output_tokens.total, 400000);
  assert.equal(result.quotas?.tokens.remaining, 1900000);
});

test("a missing rate-limit header is skipped instead of failing the whole read", async () => {
  globalThis.fetch = (async () => {
    return new Response("{}", {
      status: 200,
      headers: {
        "anthropic-ratelimit-requests-limit": "1000",
        "anthropic-ratelimit-requests-remaining": "999",
      },
    });
  }) as typeof fetch;

  const result = (await getUsageForProvider({
    provider: "anthropic",
    apiKey: "sk-ant-test",
  })) as { quotas?: Record<string, unknown> };

  assert.deepEqual(Object.keys(result.quotas ?? {}), ["requests"]);
});

test("a thrown fetch error returns a fixed message and does not leak the cause", async () => {
  globalThis.fetch = (async () => {
    throw new Error("SECRET_LEAK /tmp/should-not-appear");
  }) as typeof fetch;

  const result = (await getUsageForProvider({
    provider: "anthropic",
    apiKey: "sk-ant-test",
  })) as { message?: string };

  assert.equal(result.message, "Anthropic usage request failed.");
  assert.equal(result.message?.includes("SECRET_LEAK"), false);
});
