/**
 * GET /v1/me/status accountQuotas + admin availableProviders.
 *
 * Covers: which connections a key sees (allowedConnections vs all active), the
 * sharedQuotaProviders filter, masked labels, and the cache-first quota read
 * (5 min staleness, 60 s per-connection refresh floor, in-flight dedupe, stale
 * fallback). All data access is stubbed through deps; no DB is opened.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  SELF_ACCOUNT_QUOTA_SCOPE,
  SELF_USAGE_SCOPE,
} from "../../src/shared/constants/selfServiceScopes.ts";
import {
  buildApiKeySelfServiceStatus,
  listApiKeyReachableProviders,
} from "../../src/lib/usage/apiKeySelfService.ts";
import { createQuotaRefreshTracker } from "../../src/lib/usage/apiKeySelfServiceAccounts.ts";

const NOW = Date.UTC(2026, 4, 27, 15, 30, 0);
const MINUTE = 60_000;

type Connection = Record<string, unknown>;
type CacheEntry = { quotas: Record<string, unknown> | null; plan: unknown; fetchedAt: string };
type QuotaEntry = {
  provider: string;
  connectionId: string;
  label: string;
  shared: boolean;
  plan?: unknown;
  quotas?: Record<string, { usedPercentage: number; remainingPercentage: number }>;
  fetchedAt: string | null;
  stale?: boolean;
  available?: boolean;
  reason?: string;
};

const QUOTAS = { session: { used: 20, remaining: 80, resetAt: "2026-05-27T18:00:00.000Z" } };

function makeDeps(overrides: Record<string, unknown> = {}) {
  return {
    now: () => NOW,
    getCostSummary: () => ({
      budget: null,
      totalCostMonth: 0,
      totalCostPeriod: 0,
      activeLimitUsd: 0,
      resetInterval: null,
      budgetResetAt: null,
      periodStartAt: null,
      nextResetAt: null,
      warningThreshold: null,
    }),
    checkBudget: () => ({ allowed: true, activeLimitUsd: 0 }),
    getDbInstance: () => ({ prepare: () => ({ get: () => ({}) }) }),
    getProviderConnectionById: async () => null,
    getProviderConnections: async () => [],
    fetchAndPersistProviderLimits: async () => {
      throw new Error("unexpected quota fetch");
    },
    getProviderLimitsCache: () => null,
    quotaRefreshTracker: createQuotaRefreshTracker(),
    getBudgetWindowTotal: () => 0,
    getApiKeyUsageLimitStatus: async () => {
      throw new Error("unexpected usage limit read");
    },
    listTokenLimits: () => [],
    getWindowUsage: () => 0,
    resetWindowIfElapsed: () => ({ periodStartAt: 0, nextResetAt: 0 }),
    getKeyQuotaStatus: () => ({
      enabled: false,
      limits: { tpmLimit: null, rpmLimit: null, monthlyAmountUsd: null },
      counters: { tpmUsed: 0, rpmUsed: 0, monthlyAmountUsd: 0 },
      tpmExceeded: false,
      rpmExceeded: false,
      monthlyExceeded: false,
      windowResetAtIso: "2026-05-27T15:31:00.000Z",
    }),
    ...overrides,
  };
}

function quotaMetadata(extra: Record<string, unknown> = {}) {
  return {
    id: "key-q",
    name: "quota key",
    scopes: [SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE],
    allowedConnections: [] as string[],
    ...extra,
  };
}

function freshCache(fetchedAtMs = NOW - MINUTE): CacheEntry {
  return { quotas: QUOTAS, plan: "Pro", fetchedAt: new Date(fetchedAtMs).toISOString() };
}

const ACTIVE: Connection[] = [
  { id: "conn-codex", provider: "codex", isActive: true, name: "Codex team" },
  { id: "conn-claude", provider: "claude", isActive: true, name: "Claude team" },
  { id: "conn-cursor", provider: "cursor", isActive: true, name: "Cursor team" },
  { id: "conn-off", provider: "claude", isActive: false, name: "Old claude" },
];

async function quotasFor(metadata: Record<string, unknown>, deps: Record<string, unknown>) {
  const status = await buildApiKeySelfServiceStatus(
    metadata as ReturnType<typeof quotaMetadata>,
    deps
  );
  return {
    status,
    entries: (status.accountQuotas ?? []) as QuotaEntry[],
  };
}

test("sharedQuotaProviders filters account quotas: null = all, [] = none, subset = only those", async () => {
  const deps = () =>
    makeDeps({
      getProviderConnections: async () => ACTIVE,
      getProviderLimitsCache: () => freshCache(),
    });

  const all = await quotasFor(quotaMetadata({ sharedQuotaProviders: null }), deps());
  assert.deepEqual(
    all.entries.map((entry) => entry.connectionId),
    ["conn-codex", "conn-claude", "conn-cursor"],
    "null shares every reachable active connection"
  );

  const unset = await quotasFor(quotaMetadata(), deps());
  assert.equal(unset.entries.length, 3, "a key with no settings row behaves like null");

  const none = await quotasFor(quotaMetadata({ sharedQuotaProviders: [] }), deps());
  assert.deepEqual(none.status.accountQuotas, []);
  assert.equal("accountQuota" in none.status, false);

  const subset = await quotasFor(quotaMetadata({ sharedQuotaProviders: ["claude"] }), deps());
  assert.deepEqual(
    subset.entries.map((entry) => entry.connectionId),
    ["conn-claude"],
    "inactive claude connection stays hidden"
  );
  assert.deepEqual(subset.status.accountQuota, subset.entries[0]);
});

test("an unrestricted key lists all active connections; a restricted key only its allowedConnections", async () => {
  const listCalls: unknown[] = [];
  const byIdCalls: string[] = [];
  const connections = new Map(ACTIVE.map((connection) => [connection.id as string, connection]));
  const deps = () =>
    makeDeps({
      getProviderConnections: async (filters: unknown) => {
        listCalls.push(filters);
        return ACTIVE;
      },
      getProviderConnectionById: async (id: string) => {
        byIdCalls.push(id);
        return connections.get(id) ?? null;
      },
      getProviderLimitsCache: () => freshCache(),
    });

  const unrestricted = await quotasFor(quotaMetadata(), deps());
  assert.deepEqual(listCalls, [{ isActive: true }]);
  assert.equal(unrestricted.entries.length, 3);

  listCalls.length = 0;
  const restricted = await quotasFor(
    quotaMetadata({ allowedConnections: ["conn-cursor", "conn-off", "conn-gone"] }),
    deps()
  );
  assert.deepEqual(listCalls, [], "a restricted key never enumerates other connections");
  assert.deepEqual(byIdCalls, ["conn-cursor", "conn-off", "conn-gone"]);
  assert.deepEqual(
    restricted.entries.map((entry) => entry.connectionId),
    ["conn-cursor"],
    "inactive and deleted connections are skipped"
  );
});

test("labels mask email-like account names and keep custom names", async () => {
  const deps = makeDeps({
    getProviderConnections: async () => [
      { id: "conn-a", provider: "codex", isActive: true, name: "john.doe@example.com" },
      { id: "conn-b", provider: "codex", isActive: true, name: "Team Codex" },
      { id: "conn-c", provider: "codex", isActive: true, email: "alice.smith@corp.io" },
      { id: "conn-d1234567", provider: "codex", isActive: true },
    ],
    getProviderLimitsCache: () => freshCache(),
  });

  const { entries } = await quotasFor(quotaMetadata(), deps);
  const labels = new Map(entries.map((entry) => [entry.connectionId, entry.label]));

  const masked = labels.get("conn-a") ?? "";
  assert.equal(masked.includes("john.doe"), false);
  assert.equal(masked.includes("example.com"), false);
  assert.match(masked, /^joh\*+@\*+com$/);
  assert.equal(labels.get("conn-b"), "Team Codex");
  const emailOnly = labels.get("conn-c") ?? "";
  assert.equal(emailOnly.includes("alice.smith@corp.io"), false);
  assert.match(emailOnly, /^ali\*+@/);
  assert.equal(labels.get("conn-d1234567"), "Account #conn-d");
  assert.equal(JSON.stringify(entries).includes("@example.com"), false);
});

test("a fresh cache entry is served without a live fetch", async () => {
  let fetches = 0;
  const cachedAt = NOW - 4 * MINUTE;
  const deps = makeDeps({
    getProviderConnections: async () => [ACTIVE[0]],
    getProviderLimitsCache: () => freshCache(cachedAt),
    fetchAndPersistProviderLimits: async () => {
      fetches += 1;
      throw new Error("must not fetch");
    },
  });

  const { entries } = await quotasFor(quotaMetadata(), deps);

  assert.equal(fetches, 0);
  assert.equal(entries[0].plan, "Pro");
  assert.equal(entries[0].quotas?.session.remainingPercentage, 80);
  assert.equal(entries[0].fetchedAt, new Date(cachedAt).toISOString());
  assert.equal("stale" in entries[0], false);
});

test("a cache entry older than 5 minutes is refreshed with the scheduled source", async () => {
  const sources: string[] = [];
  const deps = makeDeps({
    getProviderConnections: async () => [ACTIVE[0]],
    getProviderLimitsCache: () => freshCache(NOW - 6 * MINUTE),
    fetchAndPersistProviderLimits: async (_id: string, source: string) => {
      sources.push(source);
      return {
        usage: { plan: "Pro+", quotas: { session: { used: 55, remaining: 45 } } },
        cache: { fetchedAt: "2026-05-27T15:30:00.000Z" },
      };
    },
  });

  const { entries } = await quotasFor(quotaMetadata(), deps);

  assert.deepEqual(sources, ["scheduled"]);
  assert.equal(entries[0].plan, "Pro+");
  assert.equal(entries[0].quotas?.session.usedPercentage, 55);
  assert.equal(entries[0].fetchedAt, "2026-05-27T15:30:00.000Z");
  assert.equal("stale" in entries[0], false);
});

test("a failed refresh serves the old cache marked stale; with no cache it reports fetch_failed", async () => {
  const oldFetchedAt = NOW - 30 * MINUTE;
  const failing = async () => {
    throw new Error("upstream 503 at /internal/stack/trace.ts:12");
  };

  const withCache = await quotasFor(
    quotaMetadata(),
    makeDeps({
      getProviderConnections: async () => [ACTIVE[0]],
      getProviderLimitsCache: () => freshCache(oldFetchedAt),
      fetchAndPersistProviderLimits: failing,
    })
  );
  assert.equal(withCache.entries[0].stale, true);
  assert.equal(withCache.entries[0].fetchedAt, new Date(oldFetchedAt).toISOString());
  assert.equal(withCache.entries[0].quotas?.session.remainingPercentage, 80);

  const withoutCache = await quotasFor(
    quotaMetadata(),
    makeDeps({
      getProviderConnections: async () => [ACTIVE[0]],
      fetchAndPersistProviderLimits: failing,
    })
  );
  assert.equal(withoutCache.entries[0].available, false);
  assert.equal(withoutCache.entries[0].reason, "fetch_failed");
  assert.equal(withoutCache.entries[0].fetchedAt, null);
  assert.equal(JSON.stringify(withoutCache.status).includes("stack/trace"), false);
});

test("an upstream error served from the previous cache is reported stale with its original time", async () => {
  const deps = makeDeps({
    getProviderConnections: async () => [ACTIVE[0]],
    fetchAndPersistProviderLimits: async () => ({
      usage: {
        quotas: QUOTAS,
        plan: "Pro",
        _stale: true,
        _staleSince: "2026-05-27T14:00:00.000Z",
      },
      cache: { fetchedAt: "2026-05-27T14:00:00.000Z" },
    }),
  });

  const { entries } = await quotasFor(quotaMetadata(), deps);

  assert.equal(entries[0].stale, true);
  assert.equal(entries[0].fetchedAt, "2026-05-27T14:00:00.000Z");
});

test("a connection is refreshed at most once per 60 s, across calls and keys", async () => {
  let now = NOW;
  let fetches = 0;
  const tracker = createQuotaRefreshTracker();
  const deps = () =>
    makeDeps({
      now: () => now,
      quotaRefreshTracker: tracker,
      getProviderConnections: async () => [ACTIVE[0]],
      getProviderLimitsCache: () => freshCache(NOW - 10 * MINUTE),
      fetchAndPersistProviderLimits: async () => {
        fetches += 1;
        throw new Error("still down");
      },
    });

  await quotasFor(quotaMetadata(), deps());
  now = NOW + 30_000;
  const second = await quotasFor(quotaMetadata({ id: "other-key" }), deps());
  assert.equal(fetches, 1, "the second read inside the floor reuses the last attempt");
  assert.equal(second.entries[0].stale, true);

  now = NOW + 61_000;
  await quotasFor(quotaMetadata(), deps());
  assert.equal(fetches, 2, "after the floor a new refresh is allowed");
});

test("concurrent reads share one in-flight refresh", async () => {
  let fetches = 0;
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const tracker = createQuotaRefreshTracker();
  const deps = () =>
    makeDeps({
      quotaRefreshTracker: tracker,
      getProviderConnections: async () => [ACTIVE[0]],
      fetchAndPersistProviderLimits: async () => {
        fetches += 1;
        await gate;
        return { usage: { quotas: QUOTAS }, cache: { fetchedAt: "2026-05-27T15:30:00.000Z" } };
      },
    });

  const first = quotasFor(quotaMetadata(), deps());
  const second = quotasFor(quotaMetadata({ id: "key-2" }), deps());
  await new Promise((resolve) => setImmediate(resolve));
  release();
  const [a, b] = await Promise.all([first, second]);

  assert.equal(fetches, 1);
  assert.equal(a.entries[0].fetchedAt, "2026-05-27T15:30:00.000Z");
  assert.deepEqual(a.entries, b.entries);
});

test("providers without quota support are reported as not_supported without fetching", async () => {
  const deps = makeDeps({
    getProviderConnections: async () => [
      { id: "conn-groq", provider: "groq", isActive: true, name: "Groq" },
    ],
  });

  const { entries } = await quotasFor(quotaMetadata(), deps);

  assert.equal(entries[0].available, false);
  assert.equal(entries[0].reason, "not_supported");
  assert.equal(entries[0].fetchedAt, null);
});

test("availableProviders groups reachable active connections with counts and quota support", async () => {
  const providers = await listApiKeyReachableProviders([], {
    getProviderConnectionById: async () => null,
    getProviderConnections: async () => [
      ...ACTIVE,
      { id: "conn-claude-2", provider: "claude", isActive: true },
      { id: "conn-groq", provider: "groq", isActive: true },
    ],
  });

  assert.deepEqual(providers, [
    { provider: "claude", connectionCount: 2, quotaSupported: true },
    { provider: "codex", connectionCount: 1, quotaSupported: true },
    { provider: "cursor", connectionCount: 1, quotaSupported: true },
    { provider: "groq", connectionCount: 1, quotaSupported: false },
  ]);

  const restricted = await listApiKeyReachableProviders(["conn-codex", "conn-broken"], {
    getProviderConnectionById: async (id: string) => {
      if (id === "conn-broken") throw new Error("db down");
      return ACTIVE[0];
    },
    getProviderConnections: async () => {
      throw new Error("a restricted key must not enumerate connections");
    },
  });
  assert.deepEqual(restricted, [{ provider: "codex", connectionCount: 1, quotaSupported: true }]);
});
