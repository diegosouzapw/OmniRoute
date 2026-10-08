import test from "node:test";
import assert from "node:assert/strict";

import { getClinepassUsage } from "../../open-sse/services/usage/clinepass.ts";
import { getUsageForProvider, USAGE_FETCHER_PROVIDERS } from "../../open-sse/services/usage.ts";
import { USAGE_SUPPORTED_PROVIDERS } from "../../open-sse/services/usage/supportedProviders.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

// Payload shape captured from api.cline.bot on 2026-10-03.
const LIVE_PAYLOAD = {
  success: true,
  data: {
    limits: [
      { type: "five_hour", percentUsed: 3, resetsAt: "2026-10-03T11:00:10.741812234Z" },
      { type: "weekly", percentUsed: 10, resetsAt: "2026-10-05T21:51:01.743898343Z" },
      { type: "monthly", percentUsed: 17, resetsAt: "2026-10-04T19:51:23.745920559Z" },
    ],
  },
};

function mockFetch(status: number, body: unknown, calls: Array<{ url: string; auth: string }>) {
  globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
    const headers = (init?.headers ?? {}) as Record<string, string>;
    calls.push({ url: String(url), auth: headers.Authorization });
    return new Response(JSON.stringify(body), { status });
  }) as typeof fetch;
}

test("maps the three ClinePass windows onto canonical session/weekly/monthly quotas", async () => {
  const calls: Array<{ url: string; auth: string }> = [];
  mockFetch(200, LIVE_PAYLOAD, calls);

  const result = (await getClinepassUsage("oauth-token")) as {
    quotas: Record<string, { used: number; total: number; remaining: number; resetAt: string }>;
  };

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.cline.bot/api/v1/users/me/plan/usage-limits");
  assert.equal(calls[0].auth, "Bearer workos:oauth-token");
  assert.deepEqual(Object.keys(result.quotas), ["session", "weekly", "monthly"]);
  assert.equal(result.quotas.session.used, 3);
  assert.equal(result.quotas.session.total, 100);
  assert.equal(result.quotas.session.remaining, 97);
  assert.equal(result.quotas.weekly.used, 10);
  assert.equal(result.quotas.monthly.remaining, 83);
  assert.equal(new Date(result.quotas.session.resetAt).toISOString(), "2026-10-03T11:00:10.741Z");
});

test("BYOK API key is sent as a plain Bearer token", async () => {
  const calls: Array<{ url: string; auth: string }> = [];
  mockFetch(200, LIVE_PAYLOAD, calls);
  await getClinepassUsage(undefined, "sk_byok");
  assert.equal(calls[0].auth, "Bearer sk_byok");
});

test("missing credentials return a message without calling upstream", async () => {
  const calls: Array<{ url: string; auth: string }> = [];
  mockFetch(200, LIVE_PAYLOAD, calls);
  const result = (await getClinepassUsage()) as { message?: string };
  assert.equal(calls.length, 0);
  assert.match(result.message ?? "", /credentials not available/);
});

test("rejected credentials and empty limits surface as messages, not quotas", async () => {
  mockFetch(401, { success: false, error: "Unauthorized" }, []);
  const rejected = (await getClinepassUsage("t")) as { message?: string; quotas?: unknown };
  assert.equal(rejected.quotas, undefined);
  assert.match(rejected.message ?? "", /rejected/);

  mockFetch(200, { success: true, data: { limits: [] } }, []);
  const empty = (await getClinepassUsage("t")) as { message?: string; quotas?: unknown };
  assert.equal(empty.quotas, undefined);
  assert.match(empty.message ?? "", /did not report any usage limits/);
});

test("clinepass is registered for quota display and dispatched by getUsageForProvider", async () => {
  assert.ok(USAGE_FETCHER_PROVIDERS.includes("clinepass"));
  assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("clinepass"));

  mockFetch(200, LIVE_PAYLOAD, []);
  const result = (await getUsageForProvider({
    provider: "clinepass",
    accessToken: "oauth-token",
  })) as { quotas?: Record<string, unknown> };
  assert.ok(result.quotas?.session);
});
