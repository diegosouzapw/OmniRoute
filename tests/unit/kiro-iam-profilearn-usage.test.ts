import test from "node:test";
import assert from "node:assert/strict";

import {
  __testing,
  buildKiroUsageResult,
  discoverKiroProfileArn,
} from "@omniroute/open-sse/services/usage.ts";

const { getKiroUsage } = __testing;

// Real-world shape returned by GetUsageLimits for an AWS IAM Identity Center ("KIRO POWER")
// account — the usage is reported under resourceType "CREDIT" (not "AGENTIC_REQUEST").
const IAM_CREDIT_RESPONSE = {
  daysUntilReset: 0,
  nextDateReset: 1.782864e9,
  subscriptionInfo: { subscriptionTitle: "KIRO POWER", type: "Q_DEVELOPER_STANDALONE_POWER" },
  usageBreakdownList: [
    {
      currency: "USD",
      currentUsage: 3670,
      currentUsageWithPrecision: 3670.9,
      displayName: "Credit",
      resourceType: "CREDIT",
      unit: "INVOCATIONS",
      usageLimit: 10000,
      usageLimitWithPrecision: 10000.0,
    },
  ],
};

test("buildKiroUsageResult parses the IAM CREDIT breakdown into non-zero usage", () => {
  const result = buildKiroUsageResult(IAM_CREDIT_RESPONSE) as {
    plan: string;
    quotas: Record<string, { used: number; total: number; remaining: number }>;
  };
  assert.ok("quotas" in result, "must return quotas for a CREDIT breakdown");
  assert.equal(result.plan, "KIRO POWER");
  const credit = result.quotas.credit;
  assert.ok(credit, "CREDIT resource should map to a 'credit' quota key");
  assert.equal(credit.used, 3670.9);
  assert.equal(credit.total, 10000);
  assert.equal(credit.remaining, 10000 - 3670.9);
});

test("discoverKiroProfileArn prefers the region-matched profile ARN", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({
        profiles: [
          { arn: "arn:aws:codewhisperer:us-east-1:111111111111:profile/AAAA" },
          { arn: "arn:aws:codewhisperer:eu-central-1:820374639727:profile/RX4VNUHGHGAQ" },
        ],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )) as typeof fetch;
  try {
    const arn = await discoverKiroProfileArn(
      "tok",
      "https://q.eu-central-1.amazonaws.com",
      "eu-central-1"
    );
    assert.equal(arn, "arn:aws:codewhisperer:eu-central-1:820374639727:profile/RX4VNUHGHGAQ");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("discoverKiroProfileArn sends tokentype for API-key auth", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: string, init?: RequestInit) => {
    const headers = init?.headers as Record<string, string>;
    assert.equal(headers.tokentype, "API_KEY");
    return new Response(
      JSON.stringify({
        profiles: [{ arn: "arn:aws:codewhisperer:us-east-1:1:profile/APIKEY" }],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;
  try {
    const arn = await discoverKiroProfileArn(
      "api-key",
      "https://codewhisperer.us-east-1.amazonaws.com",
      "us-east-1",
      "api_key"
    );
    assert.equal(arn, "arn:aws:codewhisperer:us-east-1:1:profile/APIKEY");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("discoverKiroProfileArn falls back to the first profile when no region match", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({ profiles: [{ arn: "arn:aws:codewhisperer:us-east-1:1:profile/X" }] }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )) as typeof fetch;
  try {
    const arn = await discoverKiroProfileArn(
      "tok",
      "https://q.eu-west-1.amazonaws.com",
      "eu-west-1"
    );
    assert.equal(arn, "arn:aws:codewhisperer:us-east-1:1:profile/X");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("discoverKiroProfileArn returns undefined for empty profiles or non-ok response", async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ profiles: [] }), { status: 200 })) as typeof fetch;
    assert.equal(
      await discoverKiroProfileArn("tok", "https://q.eu-central-1.amazonaws.com", "eu-central-1"),
      undefined
    );

    globalThis.fetch = (async () => new Response("nope", { status: 403 })) as typeof fetch;
    assert.equal(
      await discoverKiroProfileArn("tok", "https://q.eu-central-1.amazonaws.com", "eu-central-1"),
      undefined
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// Regression: when a Kiro account added via Google/GitHub social-auth (authMethod "imported"
// with provider "Google" or "Github" — set by /api/oauth/kiro/social-exchange/route.ts) has its
// token rejected by the AWS CodeWhisperer quota API (401/403), surface a clear "auth expired,
// chat may still work" message instead of throwing a generic upstream-error blob.
test("getKiroUsage returns a friendly auth-expired message for social-auth Kiro on 401/403", async () => {
  const originalFetch = globalThis.fetch;
  // First call (ListAvailableProfiles for ARN discovery) succeeds with an ARN so we proceed
  // to GetUsageLimits, which then returns 401. The friendly branch only applies when the
  // GetUsageLimits call returned an auth-shaped error.
  let callIdx = 0;
  globalThis.fetch = (async (_url: string, init?: RequestInit) => {
    callIdx += 1;
    const target = String(
      (init?.headers as Record<string, string> | undefined)?.["x-amz-target"] || ""
    );
    if (target.endsWith("ListAvailableProfiles")) {
      return new Response(
        JSON.stringify({ profiles: [{ arn: "arn:aws:codewhisperer:us-east-1:1:profile/SOCIAL" }] }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    // GetUsageLimits → simulate the social-auth token rejection
    return new Response(JSON.stringify({ __type: "AccessDeniedException" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  try {
    const result = (await getKiroUsage("social-tok", {
      authMethod: "imported",
      provider: "Google",
    })) as { message?: string; quotas?: Record<string, unknown> };
    assert.ok(result, "should resolve, not throw");
    assert.ok(
      typeof result.message === "string" && /authentication expired/i.test(result.message),
      `expected an auth-expired message, got: ${JSON.stringify(result)}`
    );
    assert.deepEqual(result.quotas ?? {}, {});
    assert.ok(callIdx >= 2, "GetUsageLimits should have been called after profile discovery");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getKiroUsage sends tokentype for API-key quota requests", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: string, init?: RequestInit) => {
    const headers = init?.headers as Record<string, string>;
    assert.equal(headers.tokentype, "API_KEY");
    return new Response(
      JSON.stringify({
        usageBreakdownList: [
          {
            resourceType: "AGENTIC_REQUEST",
            currentUsageWithPrecision: 1,
            usageLimitWithPrecision: 10,
          },
        ],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;
  try {
    const result = (await getKiroUsage("api-key", {
      authMethod: "api_key",
      profileArn: "arn:aws:codewhisperer:us-east-1:1:profile/APIKEY",
      region: "us-east-1",
    })) as { quotas?: Record<string, { used: number }> };
    assert.equal(result.quotas?.agentic_request.used, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getKiroUsage returns a friendly rejected-token message on repeated 401/403", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    return new Response("denied", { status: 401 });
  }) as typeof fetch;
  try {
    const result = (await getKiroUsage("builder-tok", {
      authMethod: "builder-id",
      profileArn: "arn:aws:codewhisperer:us-east-1:1:profile/BID",
    })) as { message?: string; quotas?: Record<string, unknown> };
    assert.match(
      result.message || "",
      /quota API rejected the current token/i,
      `expected friendly rejected-token message, got: ${JSON.stringify(result)}`
    );
    assert.deepEqual(result.quotas ?? {}, {});
  } finally {
    globalThis.fetch = originalFetch;
  }
});
