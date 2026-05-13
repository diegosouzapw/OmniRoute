import test from "node:test";
import assert from "node:assert/strict";

const usageService = await import("../../open-sse/services/usage.ts");

const CURSOR_USAGE_URL = "https://cursor.com/api/dashboard/get-current-period-usage";

function makeJwt(payload: Record<string, unknown>): string {
  const b64url = (input: string) =>
    Buffer.from(input)
      .toString("base64")
      .replace(/=+$/, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = b64url(JSON.stringify(payload));
  return `${header}.${body}.signature`;
}

const SAMPLE_RESPONSE = {
  billingCycleStart: "1776672371000",
  billingCycleEnd: "1779264371000",
  planUsage: {
    totalSpend: 1529,
    includedSpend: 1529,
    remaining: 471,
    limit: 2000,
    autoPercentUsed: 13.20952380952381,
    apiPercentUsed: 3.155555555555556,
    totalPercentUsed: 10.193333333333333,
  },
  spendLimitUsage: { limitType: "user" },
  enabled: true,
};

interface CapturedRequest {
  url: string;
  init: RequestInit;
}

function installFetchMock(
  responder: (url: string, init: RequestInit) => Response | Promise<Response>
): { restore: () => void; calls: CapturedRequest[] } {
  const calls: CapturedRequest[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: any, init: RequestInit = {}) => {
    const url = typeof input === "string" ? input : (input as Request).url;
    calls.push({ url, init });
    return await responder(url, init);
  }) as typeof fetch;
  return {
    restore: () => {
      globalThis.fetch = original;
    },
    calls,
  };
}

test("cursor usage: happy path returns three windows with correct percentages and reset", async () => {
  const userId = "user_01TESTSTOREDID";
  const accessToken = makeJwt({ sub: `google-oauth2|${userId}` });

  const mock = installFetchMock(
    async () =>
      new Response(JSON.stringify(SAMPLE_RESPONSE), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
  );

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "cursor",
      accessToken,
      providerSpecificData: { userId },
    });

    assert.equal(usage.plan, "Cursor Pro");
    assert.deepEqual(Object.keys(usage.quotas), ["Total", "Auto + Composer", "API"]);

    const total = usage.quotas.Total;
    assert.equal(total.total, 20); // limit 2000 cents = $20
    assert.equal(total.used, 15.29); // totalSpend 1529 cents = $15.29
    assert.equal(total.remaining, 4.71);
    assert.ok(Math.abs(total.remainingPercentage - (100 - 10.193333333333333)) < 1e-6);
    assert.equal(total.unlimited, false);
    assert.equal(total.resetAt, new Date(Number("1779264371000")).toISOString());

    const auto = usage.quotas["Auto + Composer"];
    assert.equal(auto.total, 20);
    // 2000 cents * 13.2095% ≈ 264 cents = $2.64
    assert.equal(auto.used, 2.64);
    assert.ok(Math.abs(auto.remainingPercentage - (100 - 13.20952380952381)) < 1e-6);

    const api = usage.quotas.API;
    assert.equal(api.total, 20);
    // 2000 cents * 3.1556% ≈ 63 cents = $0.63
    assert.equal(api.used, 0.63);
    assert.ok(Math.abs(api.remainingPercentage - (100 - 3.155555555555556)) < 1e-6);
  } finally {
    mock.restore();
  }
});

test("cursor usage: sends correct cookie, origin, body, and method", async () => {
  const userId = "user_01HEADERCHECK";
  const accessToken = makeJwt({ sub: userId });

  const mock = installFetchMock(
    async () =>
      new Response(JSON.stringify(SAMPLE_RESPONSE), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
  );

  try {
    await usageService.getUsageForProvider({
      provider: "cursor",
      accessToken,
      providerSpecificData: { userId },
    });

    assert.equal(mock.calls.length, 1);
    const { url, init } = mock.calls[0];
    assert.equal(url, CURSOR_USAGE_URL);
    assert.equal(init.method, "POST");
    assert.equal(init.body, "{}");

    const headers = init.headers as Record<string, string>;
    assert.equal(headers.Cookie, `WorkosCursorSessionToken=${userId}::${accessToken}`);
    assert.equal(headers.Origin, "https://cursor.com");
    assert.match(headers.Referer, /^https:\/\/cursor\.com\/dashboard/);
    assert.equal(headers["Content-Type"], "application/json");
    assert.ok(headers["User-Agent"]);
  } finally {
    mock.restore();
  }
});

test("cursor usage: falls back to JWT sub when providerSpecificData.userId is missing", async () => {
  const userId = "user_01JWTFALLBACK";
  const accessToken = makeJwt({ sub: `google-oauth2|${userId}` });

  const mock = installFetchMock(
    async () =>
      new Response(JSON.stringify(SAMPLE_RESPONSE), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
  );

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "cursor",
      accessToken,
      providerSpecificData: {},
    });

    assert.equal(usage.plan, "Cursor Pro");
    assert.equal(mock.calls.length, 1);
    const headers = mock.calls[0].init.headers as Record<string, string>;
    // Cookie should use the full sub claim (google-oauth2|user_...) since Cursor accepts both forms.
    assert.equal(
      headers.Cookie,
      `WorkosCursorSessionToken=google-oauth2|${userId}::${accessToken}`
    );
  } finally {
    mock.restore();
  }
});

test("cursor usage: returns message and skips fetch when userId is unrecoverable", async () => {
  const mock = installFetchMock(async () => new Response("should not be called", { status: 500 }));

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "cursor",
      accessToken: "not-a-jwt-and-too-short",
      providerSpecificData: {},
    });

    assert.equal(mock.calls.length, 0);
    assert.match(usage.message, /missing user id/i);
    assert.equal(usage.quotas, undefined);
  } finally {
    mock.restore();
  }
});

test("cursor usage: 307 redirect surfaces as expired session message", async () => {
  const accessToken = makeJwt({ sub: "user_01EXPIRED" });
  const mock = installFetchMock(
    async () =>
      new Response("", {
        status: 307,
        headers: { Location: "https://api.workos.com/user_management/authorize?..." },
      })
  );

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "cursor",
      accessToken,
      providerSpecificData: { userId: "user_01EXPIRED" },
    });

    assert.equal(usage.plan, "Cursor");
    assert.match(usage.message, /session expired|Re-import/i);
    assert.equal(usage.quotas, undefined);
  } finally {
    mock.restore();
  }
});

test("cursor usage: empty planUsage returns informational message", async () => {
  const accessToken = makeJwt({ sub: "user_01EMPTY" });
  const mock = installFetchMock(
    async () =>
      new Response(
        JSON.stringify({ billingCycleStart: "0", billingCycleEnd: "0", planUsage: {} }),
        { status: 200, headers: { "content-type": "application/json" } }
      )
  );

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "cursor",
      accessToken,
      providerSpecificData: { userId: "user_01EMPTY" },
    });

    assert.equal(usage.plan, "Cursor");
    assert.match(usage.message, /No active plan usage/i);
  } finally {
    mock.restore();
  }
});
