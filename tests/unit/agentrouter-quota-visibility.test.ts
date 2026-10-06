import test from "node:test";
import assert from "node:assert/strict";

import { USAGE_SUPPORTED_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { supportsProviderQuota } from "../../src/shared/utils/providerQuotaVisibility.ts";
import {
  USAGE_FETCHER_PROVIDERS,
  getUsageForProvider,
} from "../../open-sse/services/usage.ts";
import {
  getAgentrouterUsage,
} from "../../open-sse/services/usage/agentrouter.ts";
import {
  invalidateAgentrouterQuotaCache,
  type AgentrouterQuota,
} from "../../open-sse/services/agentrouterQuotaFetcher.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

/**
 * #10078 — AgentRouter quota was missing from the dashboard:
 *  - USAGE_SUPPORTED_PROVIDERS (visibility gate) omitted "agentrouter", and
 *  - USAGE_FETCHER_PROVIDERS + getUsageForProvider (the provider-limits data
 *    path) had no "agentrouter" case, so /api/usage/provider-limits fell back
 *    to the generic "Usage API not implemented" message.
 * These three assertions are the permanent regression guard (RED before the
 * fix, GREEN after).
 */
test("#10078: agentrouter is present in USAGE_SUPPORTED_PROVIDERS", () => {
  assert.equal(
    USAGE_SUPPORTED_PROVIDERS.includes("agentrouter" as (typeof USAGE_SUPPORTED_PROVIDERS)[number]),
    true
  );
});

test("#10078: supportsProviderQuota('agentrouter') is true", () => {
  assert.equal(supportsProviderQuota("agentrouter"), true);
});

test("#10078: agentrouter is present in USAGE_FETCHER_PROVIDERS", () => {
  assert.equal(
    USAGE_FETCHER_PROVIDERS.includes("agentrouter" as (typeof USAGE_FETCHER_PROVIDERS)[number]),
    true
  );
});

test("#10078: getUsageForProvider shapes the AgentRouter balance into a USD quota", async () => {
  const connectionId = `agentrouter-vis-${Date.now()}`;
  globalThis.fetch = (async () => {
    return new Response(JSON.stringify({ data: { quota: 250_000 } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  const usage = (await getUsageForProvider({
    id: connectionId,
    provider: "agentrouter",
    providerSpecificData: { consoleApiKey: "system-access-token", newApiUserId: "42" },
  })) as {
    plan?: string;
    quotas?: Record<string, { displayName?: string; remainingPercentage?: number }>;
    remainingUsd?: number;
  };

  assert.equal(usage.plan, "AgentRouter");
  assert.ok(usage.quotas);
  const balance = usage.quotas.balance;
  assert.ok(balance, "expected a `balance` quota entry");
  assert.equal(balance.displayName, "Wallet Balance (USD)");
  assert.equal(usage.remainingUsd, 0.5);
});

test("#10078: getAgentrouterUsage returns a graceful message when console credentials are missing", async () => {
  const usage = (await getAgentrouterUsage(`missing-${Date.now()}`, {
    provider: "agentrouter",
  })) as { message?: string; quotas?: unknown };

  assert.equal(typeof usage.message, "string");
  assert.ok(/not available/i.test(usage.message || ""));
  assert.equal(usage.quotas, undefined);
});