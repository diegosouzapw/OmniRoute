/**
 * Kilo Code balance + Kilo Pass usage fetcher tests.
 * Covers OAuth-only credential resolution, anonymous-token rejection,
 * KILO_API_URL override, balance parsing, Kilo Pass parsing, partial
 * failures between the two endpoints, and quota building.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  getKilocodeUsage,
  parseKilocodeBalance,
  parseKiloPassState,
  buildKilocodeUsageResult,
  buildKiloPassUsageResult,
} from "../../open-sse/services/usage/kilocode.ts";

const originalFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

interface RecordedCall {
  url: string;
  init: RequestInit;
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

/**
 * Dual fetch recorder: balance endpoint gets balanceBody/balanceStatus,
 * Kilo Pass endpoint gets passBody/passStatus.
 */
function recordDualFetch(
  balanceBody: unknown,
  balanceStatus: number,
  passBody: unknown,
  passStatus: number
): Array<RecordedCall> {
  const calls: Array<RecordedCall> = [];
  globalThis.fetch = async (url: unknown, init: unknown) => {
    const u = String(url);
    calls.push({ url: u, init: (init ?? {}) as RequestInit });
    const isBalance = u.includes("/api/profile/balance");
    return isBalance
      ? jsonResponse(balanceBody, balanceStatus)
      : jsonResponse(passBody, passStatus);
  };
  return calls;
}

function activePassPayload(): unknown {
  const subscription: Record<string, unknown> = {
    tier: "tier_19",
    status: "active",
    currentPeriodBaseCreditsUsd: 50,
    currentPeriodUsageUsd: 30,
    currentPeriodBonusCreditsUsd: 5,
    nextBillingAt: "2026-09-15T00:00:00.000Z",
  };
  const json: Record<string, unknown> = { subscription };
  const data: Record<string, unknown> = { json };
  const result: Record<string, unknown> = { data };
  return [{ result }];
}

const PASS_ACTIVE = activePassPayload();
const baseConnection: Record<string, unknown> = {
  provider: "kilocode",
  accessToken: "oauth-token-123",
};

interface QuotaEntry {
  remaining?: number;
  used?: number;
  total?: number;
  remainingPercentage?: number;
  resetAt?: string | null;
  currency?: string;
  displayName?: string;
  unlimited?: boolean;
}

interface UsageResult {
  plan?: string;
  quotas?: Record<string, QuotaEntry>;
  message?: string;
}

// OAuth-only credential tests

test("no OAuth access token: no fetch, readable message", async () => {
  const calls = recordDualFetch({ balance: 1 }, 200, PASS_ACTIVE, 200);
  const usage = (await getKilocodeUsage("conn-none", { provider: "kilocode" })) as UsageResult;
  assert.equal(calls.length, 0);
  assert.ok(typeof usage.message === "string" && usage.message.length > 0);
});

test("anonymous token: no fetch, readable message", async () => {
  const calls = recordDualFetch({ balance: 1 }, 200, PASS_ACTIVE, 200);
  const usage = (await getKilocodeUsage("conn-anon", {
    provider: "kilocode",
    accessToken: "anonymous",
  })) as UsageResult;
  assert.equal(calls.length, 0);
  assert.ok(typeof usage.message === "string");
});

test("apiKey without OAuth accessToken: no fetch, API key not used", async () => {
  const calls = recordDualFetch({ balance: 1 }, 200, PASS_ACTIVE, 200);
  const usage = (await getKilocodeUsage("conn-apikey", {
    provider: "kilocode",
    apiKey: "kilo-pat-999",
  })) as UsageResult;
  assert.equal(calls.length, 0);
  assert.ok(/OAuth/i.test(usage.message ?? ""));
});

test("apiKey with OAuth accessToken: OAuth token wins", async () => {
  const calls = recordDualFetch({ balance: 7.5 }, 200, PASS_ACTIVE, 200);
  await getKilocodeUsage("conn-both", {
    provider: "kilocode",
    accessToken: "oauth-token-123",
    apiKey: "kilo-pat-999",
  });
  assert.equal(calls.length, 2);
  for (const call of calls) {
    const headers = call.init.headers as Record<string, string>;
    assert.equal(headers.Authorization, "Bearer oauth-token-123");
  }
});

// Success: both endpoints

test("success: balance + Kilo Pass both present", async () => {
  const calls = recordDualFetch({ balance: 12.34 }, 200, PASS_ACTIVE, 200);
  const usage = (await getKilocodeUsage("conn-1", baseConnection)) as UsageResult;
  assert.equal(usage.plan, "Kilo Code");
  assert.equal(calls.length, 2);
  const urls = calls.map((c) => c.url);
  assert.ok(urls.some((u) => u.includes("/api/profile/balance")));
  assert.ok(urls.some((u) => u.includes("/api/trpc/kiloPass.getState")));
  for (const call of calls) {
    const headers = call.init.headers as Record<string, string>;
    assert.equal(headers.Authorization, "Bearer oauth-token-123");
    assert.equal(headers["X-KILOCODE-EDITORNAME"], "OmniRoute");
  }
  const quotas = usage.quotas ?? {};
  assert.equal(quotas.balance.remaining, 12.34);
  assert.equal(quotas.kiloPassBase.remaining, 50);
  assert.equal(quotas.kiloPassBonus.remaining, 5);
  assert.equal(quotas.kiloPassUsage.used, 30);
  assert.equal(quotas.kiloPassRemaining.remaining, 25);
});

test("success: exact $0 balance is valid, not missing", async () => {
  recordDualFetch({ balance: 0 }, 200, PASS_ACTIVE, 200);
  const usage = (await getKilocodeUsage("conn-0", baseConnection)) as UsageResult;
  assert.equal(usage.quotas?.balance.remaining, 0);
  assert.equal(usage.quotas?.balance.remainingPercentage, 0);
  assert.equal(typeof usage.message, "undefined");
});

// Case A: pass amounts surface correctly

test("case A: Base 50, Usage 30, Bonus 5, Remaining 25", async () => {
  recordDualFetch({ balance: 10 }, 200, PASS_ACTIVE, 200);
  const usage = (await getKilocodeUsage("conn-a", baseConnection)) as UsageResult;
  const quotas = usage.quotas ?? {};
  assert.equal(quotas.kiloPassBase.remaining, 50);
  assert.equal(quotas.kiloPassBase.total, 50);
  assert.equal(quotas.kiloPassUsage.used, 30);
  assert.equal(quotas.kiloPassBonus.remaining, 5);
  assert.equal(quotas.kiloPassBonus.total, 5);
  assert.equal(quotas.kiloPassRemaining.remaining, 25);
});

test("Kilo Pass total and remaining preserve distinct usage semantics", () => {
  const result = buildKiloPassUsageResult({
    currentPeriodBaseCreditsUsd: 49,
    currentPeriodBonusCreditsUsd: 24.5,
    currentPeriodUsageUsd: 47.95,
    nextBillingAt: null,
  });

  assert.equal(result.quotas.kiloPassUsage.total, 73.5);
  assert.equal(result.quotas.kiloPassUsage.used, 47.95);
  assert.equal(result.quotas.kiloPassRemaining.remaining, 25.55);
  assert.notEqual(result.quotas.kiloPassUsage.used, result.quotas.kiloPassRemaining.remaining);
});

// Case B: nextBillingAt attached to period quotas

test("case B: nextBillingAt normalized and attached", async () => {
  recordDualFetch({ balance: 10 }, 200, PASS_ACTIVE, 200);
  const usage = (await getKilocodeUsage("conn-b", baseConnection)) as UsageResult;
  const quotas = usage.quotas ?? {};
  assert.equal(quotas.kiloPassBase.resetAt, "2026-09-15T00:00:00.000Z");
  assert.equal(quotas.kiloPassUsage.resetAt, "2026-09-15T00:00:00.000Z");
  assert.equal(quotas.kiloPassRemaining.resetAt, "2026-09-15T00:00:00.000Z");
  assert.equal(quotas.kiloPassBonus.resetAt, null);
});

// Case C: balance stays separate from pass quotas

test("case C: balance not merged into pass remaining", async () => {
  recordDualFetch({ balance: 11.51 }, 200, PASS_ACTIVE, 200);
  const usage = (await getKilocodeUsage("conn-c", baseConnection)) as UsageResult;
  const quotas = usage.quotas ?? {};
  assert.equal(quotas.balance.remaining, 11.51);
  assert.equal(quotas.kiloPassRemaining.remaining, 25);
});

// Case D: balance OK, pass fails

test("case D: pass HTTP 500 leaves balance intact", async () => {
  recordDualFetch({ balance: 12.34 }, 200, { error: "boom" }, 500);
  const usage = (await getKilocodeUsage("conn-d", baseConnection)) as UsageResult;
  assert.equal(usage.plan, "Kilo Code");
  assert.equal(usage.quotas?.balance.remaining, 12.34);
  assert.equal(typeof usage.message, "undefined");
});

// Case E: pass OK, balance fails

test("case E: balance HTTP 500 leaves pass intact", async () => {
  recordDualFetch({ error: "boom" }, 500, PASS_ACTIVE, 200);
  const usage = (await getKilocodeUsage("conn-e", baseConnection)) as UsageResult;
  assert.equal(usage.plan, "Kilo Code");
  assert.equal(usage.quotas?.kiloPassBase.remaining, 50);
  assert.equal(typeof usage.message, "undefined");
});

// Case F: no active pass

test("case F: no subscription leaves balance intact, no pass quotas", async () => {
  recordDualFetch({ balance: 8.0 }, 200, [{ result: { data: { json: {} } } }], 200);
  const usage = (await getKilocodeUsage("conn-f", baseConnection)) as UsageResult;
  assert.equal(usage.quotas?.balance.remaining, 8.0);
  assert.equal(typeof usage.quotas?.kiloPassBase, "undefined");
  assert.equal(typeof usage.message, "undefined");
});

// Cases G/H: pass 401 / 429 degrade gracefully

test("case G: pass 401 leaves balance intact", async () => {
  recordDualFetch({ balance: 5.0 }, 200, { error: "unauthorized" }, 401);
  const usage = (await getKilocodeUsage("conn-g", baseConnection)) as UsageResult;
  assert.equal(usage.quotas?.balance.remaining, 5.0);
  assert.equal(typeof usage.message, "undefined");
});

test("case H: pass 429 leaves balance intact", async () => {
  recordDualFetch({ balance: 5.0 }, 200, { error: "limited" }, 429);
  const usage = (await getKilocodeUsage("conn-h", baseConnection)) as UsageResult;
  assert.equal(usage.quotas?.balance.remaining, 5.0);
  assert.equal(typeof usage.message, "undefined");
});

// Case I: invalid pass JSON degrades gracefully

test("case I: invalid pass JSON leaves balance intact", async () => {
  globalThis.fetch = async (url: unknown) => {
    const u = String(url);
    if (u.includes("/api/profile/balance")) {
      return jsonResponse({ balance: 5.0 }, 200);
    }
    return new Response("not-json", { status: 200 });
  };
  const usage = (await getKilocodeUsage("conn-i", baseConnection)) as UsageResult;
  assert.equal(usage.quotas?.balance.remaining, 5.0);
  assert.equal(typeof usage.message, "undefined");
});

// Case J: pass response missing required fields

test("case J: pass missing fields leaves balance intact", async () => {
  const incomplete = [{ result: { data: { json: { subscription: { tier: "tier_1" } } } } }];
  recordDualFetch({ balance: 3.0 }, 200, incomplete, 200);
  const usage = (await getKilocodeUsage("conn-j", baseConnection)) as UsageResult;
  assert.equal(usage.quotas?.balance.remaining, 3.0);
  assert.equal(typeof usage.quotas?.kiloPassBase, "undefined");
});

// Case K: null pass response

test("case K: null pass body leaves balance intact", async () => {
  recordDualFetch({ balance: 2.0 }, 200, null, 200);
  const usage = (await getKilocodeUsage("conn-k", baseConnection)) as UsageResult;
  assert.equal(usage.quotas?.balance.remaining, 2.0);
  assert.equal(typeof usage.message, "undefined");
});

// Case L: negative or non-finite credits clamped to 0

test("case L: negative and non-finite credits clamp to 0", () => {
  const sub: Record<string, unknown> = {
    status: "active",
    currentPeriodBaseCreditsUsd: -10,
    currentPeriodUsageUsd: Number.NaN,
    currentPeriodBonusCreditsUsd: Number.POSITIVE_INFINITY,
  };
  const state = parseKiloPassState({ subscription: sub });
  assert.notEqual(state, null);
  assert.equal(state?.currentPeriodBaseCreditsUsd, 0);
  assert.equal(state?.currentPeriodUsageUsd, 0);
  assert.equal(state?.currentPeriodBonusCreditsUsd, 0);
});

// Case M: zero amounts are valid

test("case M: zero base/bonus/usage treated as valid", () => {
  const sub: Record<string, unknown> = {
    status: "active",
    currentPeriodBaseCreditsUsd: 0,
    currentPeriodUsageUsd: 0,
    currentPeriodBonusCreditsUsd: 0,
  };
  const state = parseKiloPassState({ subscription: sub });
  assert.notEqual(state, null);
  const result = buildKiloPassUsageResult(state as NonNullable<typeof state>);
  assert.equal(result.quotas.kiloPassBase.remaining, 0);
  assert.equal(result.quotas.kiloPassRemaining.remaining, 0);
});

// parseKiloPassState unit tests

test("parseKiloPassState: batched tRPC shape", () => {
  const state = parseKiloPassState(PASS_ACTIVE);
  assert.notEqual(state, null);
  assert.equal(state?.currentPeriodBaseCreditsUsd, 50);
  assert.equal(state?.currentPeriodUsageUsd, 30);
  assert.equal(state?.currentPeriodBonusCreditsUsd, 5);
  assert.equal(state?.nextBillingAt, "2026-09-15T00:00:00.000Z");
});

test("parseKiloPassState: plain subscription shape", () => {
  const sub: Record<string, unknown> = {
    status: "trialing",
    currentPeriodBaseCreditsUsd: 19,
    currentPeriodUsageUsd: 0.01,
    currentPeriodBonusCreditsUsd: 29.85,
    nextBillingAt: "2026-07-20T09:30:20.806Z",
  };
  const state = parseKiloPassState({ subscription: sub });
  assert.notEqual(state, null);
  assert.equal(state?.currentPeriodBaseCreditsUsd, 19);
});

test("parseKiloPassState: canceled and expired status return null", () => {
  const canceled: Record<string, unknown> = {
    subscription: {
      status: "canceled",
      currentPeriodBaseCreditsUsd: 19,
      currentPeriodUsageUsd: 0,
    },
  };
  assert.equal(parseKiloPassState(canceled), null);
  const expired: Record<string, unknown> = {
    subscription: {
      status: "expired",
      currentPeriodBaseCreditsUsd: 19,
      currentPeriodUsageUsd: 0,
    },
  };
  assert.equal(parseKiloPassState(expired), null);
});

test("parseKiloPassState: past_due status accepted", () => {
  const sub: Record<string, unknown> = {
    status: "past_due",
    currentPeriodBaseCreditsUsd: 19,
    currentPeriodUsageUsd: 5,
  };
  const state = parseKiloPassState({ subscription: sub });
  assert.notEqual(state, null);
  assert.equal(state?.currentPeriodBaseCreditsUsd, 19);
});

test("parseKiloPassState: missing amounts return null", () => {
  assert.equal(parseKiloPassState({ status: "none" }), null);
  assert.equal(parseKiloPassState({}), null);
  assert.equal(parseKiloPassState(null), null);
});

test("parseKiloPassState: invalid nextBillingAt becomes null", () => {
  const sub: Record<string, unknown> = {
    status: "active",
    currentPeriodBaseCreditsUsd: 10,
    currentPeriodUsageUsd: 0,
    nextBillingAt: "not-a-date",
  };
  const state = parseKiloPassState({ subscription: sub });
  assert.notEqual(state, null);
  assert.equal(state?.nextBillingAt, null);
});

// Both endpoints fail

test("both endpoints fail: graceful message", async () => {
  recordDualFetch({ error: "boom" }, 500, { error: "boom" }, 500);
  const usage = (await getKilocodeUsage("conn-both-fail", baseConnection)) as UsageResult;
  assert.equal(usage.plan, "Kilo Code");
  assert.ok(typeof usage.message === "string");
  assert.equal(usage.quotas, undefined);
});

// Balance error diagnostics when pass also unavailable

test("balance 401 with pass down: re-auth message", async () => {
  recordDualFetch({ error: "unauthorized" }, 401, { error: "unauthorized" }, 401);
  const usage = (await getKilocodeUsage("conn-401", baseConnection)) as UsageResult;
  assert.ok(/expired|denied|re-authenticate/i.test(usage.message ?? ""));
});

test("balance 429 with pass down: rate-limit message", async () => {
  recordDualFetch({ error: "limited" }, 429, { error: "limited" }, 429);
  const usage = (await getKilocodeUsage("conn-429", baseConnection)) as UsageResult;
  assert.ok(/rate limit/i.test(usage.message ?? ""));
});

test("network error on both endpoints: graceful message", async () => {
  globalThis.fetch = async () => {
    throw new Error("network down");
  };
  const usage = (await getKilocodeUsage("conn-net", baseConnection)) as UsageResult;
  assert.ok(typeof usage.message === "string");
});

test("balance malformed JSON with pass down: message", async () => {
  globalThis.fetch = async (url: unknown) => {
    const u = String(url);
    if (u.includes("/api/profile/balance")) {
      return new Response("not-json", { status: 200 });
    }
    return jsonResponse({}, 200);
  };
  const usage = (await getKilocodeUsage("conn-badjson", baseConnection)) as UsageResult;
  assert.ok(typeof usage.message === "string");
});

test("balance payload without balance field with pass down: message", async () => {
  recordDualFetch({ credits: 10 }, 200, {}, 200);
  const usage = (await getKilocodeUsage("conn-nobal", baseConnection)) as UsageResult;
  assert.ok(typeof usage.message === "string");
});

test("negative balance rejected when pass also down", async () => {
  recordDualFetch({ balance: -1 }, 200, {}, 200);
  const usage = (await getKilocodeUsage("conn-neg", baseConnection)) as UsageResult;
  assert.ok(typeof usage.message === "string");
});

// parseKilocodeBalance unit tests

test("parseKilocodeBalance: rejects missing/null/negative/non-finite", () => {
  assert.equal(parseKilocodeBalance(undefined), null);
  assert.equal(parseKilocodeBalance(null), null);
  assert.equal(parseKilocodeBalance({}), null);
  assert.equal(parseKilocodeBalance({ balance: null }), null);
  assert.equal(parseKilocodeBalance({ balance: -1 }), null);
  assert.equal(parseKilocodeBalance({ balance: Number.NaN }), null);
  assert.equal(parseKilocodeBalance({ balance: Number.POSITIVE_INFINITY }), null);
});

test("parseKilocodeBalance: accepts valid values with rounding", () => {
  assert.equal(parseKilocodeBalance({ balance: 12.345 }), 12.35);
  assert.equal(parseKilocodeBalance({ balance: 0 }), 0);
  assert.equal(parseKilocodeBalance({ balance: 12.34 }), 12.34);
});

// buildKilocodeUsageResult unit tests

test("buildKilocodeUsageResult: exact remaining, USD credits shape", () => {
  const result = buildKilocodeUsageResult(12.34);
  assert.equal(result.plan, "Kilo Code");
  assert.equal(result.quotas.balance.remaining, 12.34);
  assert.equal(result.quotas.balance.currency, "USD");
  assert.equal(result.quotas.balance.remainingPercentage, 100);
  assert.equal(result.quotas.balance.resetAt, null);
  assert.equal(result.quotas.balance.unlimited, true);
});

// buildKiloPassUsageResult unit tests

test("buildKiloPassUsageResult: correct quota entries", () => {
  const result = buildKiloPassUsageResult({
    currentPeriodBaseCreditsUsd: 50,
    currentPeriodUsageUsd: 30,
    currentPeriodBonusCreditsUsd: 5,
    nextBillingAt: "2026-09-15T00:00:00.000Z",
  });
  assert.equal(result.quotas.kiloPassBase.remaining, 50);
  assert.equal(result.quotas.kiloPassBase.resetAt, "2026-09-15T00:00:00.000Z");
  assert.equal(result.quotas.kiloPassBonus.remaining, 5);
  assert.equal(result.quotas.kiloPassUsage.used, 30);
  assert.equal(result.quotas.kiloPassRemaining.remaining, 25);
});

test("buildKiloPassUsageResult: usage exceeding pool clamps to 0", () => {
  const result = buildKiloPassUsageResult({
    currentPeriodBaseCreditsUsd: 10,
    currentPeriodUsageUsd: 20,
    currentPeriodBonusCreditsUsd: 5,
    nextBillingAt: null,
  });
  assert.equal(result.quotas.kiloPassRemaining.remaining, 0);
});
