import test from "node:test";
import assert from "node:assert/strict";

const usage = await import("../../open-sse/services/usage.ts");
const { USAGE_SUPPORTED_PROVIDERS } = await import("../../src/shared/constants/providers.ts");

test("USAGE_SUPPORTED_PROVIDERS includes opencode-go", () => {
  assert.ok(
    (USAGE_SUPPORTED_PROVIDERS as string[]).includes("opencode-go"),
    "opencode-go must be in the usage-supported providers allowlist"
  );
});

test("getUsageForProvider returns helpful message when opencode-go has no apiKey", async () => {
  let called = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    called = true;
    return new Response("unexpected", { status: 500 });
  };

  try {
    const result = (await usage.getUsageForProvider({
      id: "opencode-go-no-key",
      provider: "opencode-go",
      apiKey: "",
    })) as { message?: string };

    assert.equal(called, false, "quota fetch must not run without an API key");
    assert.match(result.message ?? "", /OpenCode Go/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getUsageForProvider exposes OpenCode Go 5h, weekly, and monthly quotas", async () => {
  const originalFetch = globalThis.fetch;
  const reset5h = Date.now() + 2 * 60 * 60 * 1000;
  const resetWeekly = Date.now() + 4 * 24 * 60 * 60 * 1000;
  const resetMonthly = Date.now() + 20 * 24 * 60 * 60 * 1000;
  let requestUrl = "";
  let requestHeaders: Headers | null = null;

  globalThis.fetch = async (input, init) => {
    requestUrl = String(input);
    requestHeaders = new Headers(init?.headers as HeadersInit | undefined);

    return new Response(
      JSON.stringify({
        code: 200,
        success: true,
        data: {
          level: "pro",
          limits: [
            {
              type: "TOKENS_LIMIT",
              unit: 3,
              number: 5,
              percentage: 25,
              nextResetTime: reset5h,
            },
            {
              type: "TOKENS_LIMIT",
              unit: 6,
              number: 1,
              percentage: 50,
              nextResetTime: resetWeekly,
            },
            {
              type: "TIME_LIMIT",
              percentage: 10,
              currentValue: 6,
              usage: 60,
              nextResetTime: resetMonthly,
              usageDetails: [{ modelCode: "search-prime", usage: 3 }],
            },
          ],
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = (await usage.getUsageForProvider({
      id: "opencode-go-usage",
      provider: "opencode-go",
      apiKey: "Bearer opencode-go-key",
    })) as {
      plan?: string | null;
      quotas?: Record<
        string,
        {
          used: number;
          total: number;
          remaining: number;
          remainingPercentage: number;
          resetAt: string | null;
          displayName?: string;
          currency?: string;
          details?: Array<{ name: string; used: number }>;
        }
      >;
    };

    assert.equal(requestUrl, "https://api.z.ai/api/monitor/usage/quota/limit");
    assert.equal(requestHeaders?.get("Authorization"), "opencode-go-key");
    assert.equal(requestHeaders?.get("Content-Type"), "application/json");
    assert.equal(result.plan, "OpenCode Go Pro");
    assert.deepEqual(Object.keys(result.quotas ?? {}), ["session", "weekly", "mcp_monthly"]);

    assert.equal(result.quotas!.session.displayName, "5-hour rolling");
    assert.equal(result.quotas!.session.currency, "USD");
    assert.equal(result.quotas!.session.used, 3);
    assert.equal(result.quotas!.session.total, 12);
    assert.equal(result.quotas!.session.remaining, 9);
    assert.equal(result.quotas!.session.remainingPercentage, 75);
    assert.equal(result.quotas!.session.resetAt, new Date(reset5h).toISOString());

    assert.equal(result.quotas!.weekly.displayName, "Weekly");
    assert.equal(result.quotas!.weekly.used, 15);
    assert.equal(result.quotas!.weekly.total, 30);
    assert.equal(result.quotas!.weekly.remaining, 15);
    assert.equal(result.quotas!.weekly.remainingPercentage, 50);
    assert.equal(result.quotas!.weekly.resetAt, new Date(resetWeekly).toISOString());

    assert.equal(result.quotas!.mcp_monthly.displayName, "Monthly");
    assert.equal(result.quotas!.mcp_monthly.used, 6);
    assert.equal(result.quotas!.mcp_monthly.total, 60);
    assert.equal(result.quotas!.mcp_monthly.remaining, 54);
    assert.equal(result.quotas!.mcp_monthly.remainingPercentage, 90);
    assert.equal(result.quotas!.mcp_monthly.resetAt, new Date(resetMonthly).toISOString());
    assert.deepEqual(result.quotas!.mcp_monthly.details, [{ name: "search-prime", used: 3 }]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getUsageForProvider rejects invalid OpenCode Go API keys", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("nope", { status: 401 });

  try {
    await assert.rejects(
      () =>
        usage.getUsageForProvider({
          id: "opencode-go-401",
          provider: "opencode-go",
          apiKey: "bad-key",
        }),
      /Invalid OpenCode Go API key/
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
