import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auth-exclusive-lease-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "exclusive-lease-auth-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const leaseDb = await import("../../src/lib/db/exclusiveConnectionLeases.ts");
const auth = await import("../../src/sse/services/auth.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const quotaPreflight = await import("../../open-sse/services/quotaPreflight.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const oauthOccupancy = await import("../../open-sse/services/oauthSessionOccupancy.ts");

const OWNERS = Array.from(
  { length: 12 },
  (_, index) => `vlo_${String.fromCharCode(65 + index).repeat(43)}`
);

async function seedConnection(
  priority: number,
  overrides: {
    provider?: string;
    providerSpecificData?: Record<string, unknown>;
    testStatus?: string;
    rateLimitedUntil?: string | null;
  } = {}
): Promise<{ id: string }> {
  const provider = overrides.provider ?? "glm";
  const connection = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-managed-${priority}-${Math.random().toString(16).slice(2)}`,
    apiKey: `sk-${provider}-managed-${priority}-${Math.random().toString(16).slice(2)}`,
    isActive: true,
    testStatus: overrides.testStatus ?? "active",
    priority,
    rateLimitedUntil: overrides.rateLimitedUntil,
    providerSpecificData: overrides.providerSpecificData ?? {},
  });
  return connection as { id: string };
}

async function seedManagedKey(connectionIds: string[]): Promise<{ id: string }> {
  return apiKeysDb.createApiKey("managed-key", "test", ["lease:exclusive"], {
    allowedConnections: connectionIds,
  });
}

function context(owner: string, generation: number) {
  return {
    leaseOwnerId: owner,
    leaseOwnerHash: leaseDb.hashLeaseOwnerId(owner),
    ownerDiagnostic: "test-owner",
    generation,
  };
}

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fallback.clearAllModelLockouts();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);
test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("foreign top candidate is skipped and the existing selector chooses the next free candidate", async () => {
  const [top, next] = await Promise.all([seedConnection(1), seedConnection(2)]);
  const key = await seedManagedKey([top.id, next.id]);
  leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNERS[0],
    apiKeyId: key.id,
    provider: "glm",
    connectionId: top.id,
  });

  const selected = await auth.getProviderCredentials("glm", null, [top.id, next.id], "glm-4.6", {
    lease: { apiKeyId: key.id, context: context(OWNERS[1], 1), mode: "acquire" },
    materializeCredentials: false,
  });
  assert.equal(selected?.connectionId, next.id);
  assert.equal((selected as auth.ExclusiveLeaseSelectionResult).exclusiveLease.generation, 1);
});

test("all eligible candidates foreign returns WAITING without credentials", async () => {
  const [first, second] = await Promise.all([seedConnection(1), seedConnection(2)]);
  const key = await seedManagedKey([first.id, second.id]);
  leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNERS[0],
    apiKeyId: key.id,
    provider: "glm",
    connectionId: first.id,
  });
  leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNERS[1],
    apiKeyId: key.id,
    provider: "glm",
    connectionId: second.id,
  });

  const selected = await auth.getProviderCredentials(
    "glm",
    null,
    [first.id, second.id],
    "glm-4.6",
    {
      lease: { apiKeyId: key.id, context: context(OWNERS[2], 1), mode: "acquire" },
      materializeCredentials: false,
    }
  );
  assert.equal(selected?.waitingForCapacity, true);
  assert.equal(selected?.freeCount, 0);
  assert.equal("apiKey" in selected, false);
});

test("an eligible live owner binding is reused despite softer priority scoring", async () => {
  const [preferred, bound] = await Promise.all([seedConnection(1), seedConnection(2)]);
  const key = await seedManagedKey([preferred.id, bound.id]);
  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNERS[0],
    apiKeyId: key.id,
    provider: "glm",
    connectionId: bound.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;

  const selected = await auth.getProviderCredentials(
    "glm",
    null,
    [preferred.id, bound.id],
    "glm-4.6",
    {
      lease: {
        apiKeyId: key.id,
        context: context(OWNERS[0], acquired.lease.generation),
        mode: "request",
      },
    }
  );
  assert.equal(selected?.connectionId, bound.id);
  assert.match(selected?.apiKey ?? "", /^sk-glm-managed-2-/);
});

test("quota-preflight wrapper claims before returning even when live preflight is a no-op", async () => {
  const connection = await seedConnection(1);
  const key = await seedManagedKey([connection.id]);
  const selected = await auth.getProviderCredentialsWithQuotaPreflight(
    "glm",
    null,
    [connection.id],
    "glm-4.6",
    {
      lease: { apiKeyId: key.id, context: context(OWNERS[0], 1), mode: "acquire" },
      materializeCredentials: false,
      reserveOAuthSession: false,
    }
  );

  assert.equal(selected?.connectionId, connection.id);
  assert.equal((selected as auth.ExclusiveLeaseSelectionResult).exclusiveLease.generation, 1);
  assert.equal(leaseDb.getActiveExclusiveConnectionLease(OWNERS[0])?.connectionId, connection.id);
  assert.equal("apiKey" in selected, false);
});

test("lifecycle pre-acquire disables request-scoped OAuth occupancy reservation", async () => {
  const connection = await seedConnection(1, { provider: "codex" });
  const key = await seedManagedKey([connection.id]);
  const selected = await auth.getProviderCredentialsWithQuotaPreflight(
    "codex",
    null,
    [connection.id],
    "gpt-5.6-sol",
    {
      lease: { apiKeyId: key.id, context: context(OWNERS[0], 1), mode: "acquire" },
      materializeCredentials: false,
      reserveOAuthSession: false,
      sessionKey: "routing-session-not-owner",
    }
  );

  assert.equal(selected?.connectionId, connection.id);
  assert.equal(
    oauthOccupancy.getForeignOAuthSessionCount(connection.id, "some-other-routing-session"),
    0
  );
});

test("acquire is idempotent without adopting a caller-supplied placeholder generation", async () => {
  const connection = await seedConnection(1);
  const key = await seedManagedKey([connection.id]);
  const first = await auth.getProviderCredentialsWithQuotaPreflight(
    "glm",
    null,
    [connection.id],
    "glm-4.6",
    {
      lease: { apiKeyId: key.id, context: context(OWNERS[0], 1), mode: "acquire" },
      materializeCredentials: false,
      reserveOAuthSession: false,
    }
  );
  const second = await auth.getProviderCredentialsWithQuotaPreflight(
    "glm",
    null,
    [connection.id],
    "glm-4.6",
    {
      lease: { apiKeyId: key.id, context: context(OWNERS[0], 999), mode: "acquire" },
      materializeCredentials: false,
      reserveOAuthSession: false,
    }
  );

  assert.equal((first as auth.ExclusiveLeaseSelectionResult).exclusiveLease.generation, 1);
  assert.equal((second as auth.ExclusiveLeaseSelectionResult).exclusiveLease.generation, 1);
});

test("managed request distinguishes missing lease from stale generation", async () => {
  const connection = await seedConnection(1);
  const key = await seedManagedKey([connection.id]);
  const missing = await auth.getProviderCredentials("glm", null, [connection.id], "glm-4.6", {
    lease: { apiKeyId: key.id, context: context(OWNERS[0], 1), mode: "request" },
  });
  assert.equal(missing?.leaseRequired, true);

  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNERS[0],
    apiKeyId: key.id,
    provider: "glm",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;
  const stale = await auth.getProviderCredentials("glm", null, [connection.id], "glm-4.6", {
    lease: {
      apiKeyId: key.id,
      context: context(OWNERS[0], acquired.lease.generation + 1),
      mode: "request",
    },
  });
  assert.equal(stale?.leaseFenceStale, true);
});

test("unmanaged selection may receive a lease-capable connection while its lease is FREE", async () => {
  // #11775: listing a connection in a lease-capable key's allowlist is no longer a
  // static global reservation — ordinary routing keeps using it until an ACTIVE lease
  // is held (the ACTIVE case is covered by the tests below).
  const [managed, ordinary] = await Promise.all([seedConnection(1), seedConnection(2)]);
  await seedManagedKey([managed.id]);
  assert.equal((await apiKeysDb.getExclusiveLeaseConnectionIds()).has(managed.id), true);

  const selected = await auth.getProviderCredentials("glm", null, null, "glm-4.6");
  assert.ok(selected, "unmanaged selection still resolves a connection");
  assert.ok(
    [managed.id, ordinary.id].includes(selected.connectionId),
    `selected ${selected.connectionId} must be one of the two seeded connections`
  );
});

test("generic lease selection is provider-neutral across GLM and OpenAI fixtures", async () => {
  for (const [provider, model] of [
    ["glm", "glm-4.6"],
    ["openai", "gpt-4.1"],
  ] as const) {
    const connection = await seedConnection(1, { provider });
    const key = await seedManagedKey([connection.id]);
    const selected = await auth.getProviderCredentials(provider, null, [connection.id], model, {
      lease: { apiKeyId: key.id, context: context(OWNERS[0], 1), mode: "acquire" },
      materializeCredentials: false,
    });
    assert.equal(selected?.connectionId, connection.id, provider);
    leaseDb.releaseExclusiveConnectionLease({
      leaseOwnerId: OWNERS[0],
      generation: selected!.exclusiveLease.generation,
      apiKeyId: key.id,
    });
  }
});

test("managed capacity scales one owner per connection and the next owner waits", async () => {
  const connections = await Promise.all(
    Array.from({ length: 9 }, (_, index) => seedConnection(index + 1))
  );
  const key = await seedManagedKey(connections.map((connection) => connection.id));
  const selectedIds = new Set<string>();
  for (let index = 0; index < connections.length; index += 1) {
    const selected = await auth.getProviderCredentials(
      "glm",
      null,
      connections.map((connection) => connection.id),
      "glm-4.6",
      {
        lease: { apiKeyId: key.id, context: context(OWNERS[index], 1), mode: "acquire" },
        materializeCredentials: false,
      }
    );
    selectedIds.add(selected?.connectionId ?? "");
    if ([1, 2, 5, 9].includes(index + 1)) {
      assert.equal(
        selectedIds.size,
        index + 1,
        `${index + 1} owners must hold distinct connections`
      );
    }
  }
  assert.equal(selectedIds.size, 9);

  const waiting = await auth.getProviderCredentials(
    "glm",
    null,
    connections.map((connection) => connection.id),
    "glm-4.6",
    {
      lease: { apiKeyId: key.id, context: context(OWNERS[9], 1), mode: "acquire" },
      materializeCredentials: false,
    }
  );
  assert.equal(waiting?.waitingForCapacity, true);
});

for (const strategy of ["fill-first", "round-robin", "random", "p2c", "strict-random"]) {
  test(`managed filtering preserves the existing ${strategy} selector among FREE candidates`, async () => {
    await settingsDb.updateSettings({ fallbackStrategy: strategy });
    const [foreignTop, freeA, freeB] = await Promise.all([
      seedConnection(1),
      seedConnection(2),
      seedConnection(3),
    ]);
    const ids = [foreignTop.id, freeA.id, freeB.id];
    const key = await seedManagedKey(ids);
    const foreign = leaseDb.acquireExclusiveConnectionLease({
      leaseOwnerId: OWNERS[0],
      apiKeyId: key.id,
      provider: "glm",
      connectionId: foreignTop.id,
    });
    assert.equal(foreign.kind, "ACQUIRED");

    const selected = await auth.getProviderCredentials("glm", null, ids, "glm-4.6", {
      lease: { apiKeyId: key.id, context: context(OWNERS[1], 1), mode: "acquire" },
      materializeCredentials: false,
    });

    assert.ok([freeA.id, freeB.id].includes(selected?.connectionId));
    assert.notEqual(selected?.connectionId, foreignTop.id);
  });
}

test("managed live quota preflight rejects one candidate and claims the next without model execution", async () => {
  const [blocked, healthy] = await Promise.all([
    seedConnection(1, { providerSpecificData: { quotaPreflightEnabled: true } }),
    seedConnection(2, { providerSpecificData: { quotaPreflightEnabled: true } }),
  ]);
  const key = await seedManagedKey([blocked.id, healthy.id]);
  const calls: string[] = [];
  quotaPreflight.registerQuotaFetcher("glm", async (connectionId) => {
    calls.push(connectionId);
    return {
      used: connectionId === blocked.id ? 100 : 20,
      total: 100,
      percentUsed: connectionId === blocked.id ? 1 : 0.2,
      resetAt: new Date(Date.now() + 60_000).toISOString(),
    };
  });

  const selected = await auth.getProviderCredentialsWithQuotaPreflight(
    "glm",
    null,
    [blocked.id, healthy.id],
    "glm-4.6",
    {
      lease: { apiKeyId: key.id, context: context(OWNERS[0], 1), mode: "acquire" },
      materializeCredentials: false,
      reserveOAuthSession: false,
    }
  );

  assert.deepEqual(calls, [blocked.id, healthy.id]);
  assert.equal(selected?.connectionId, healthy.id);
  assert.equal(leaseDb.getActiveExclusiveConnectionLease(OWNERS[0])?.connectionId, healthy.id);
});

test("managed cached quota ineligibility transitions the live owner to a FREE connection", async () => {
  const [bound, free] = await Promise.all([
    seedConnection(1, {
      providerSpecificData: {
        limitPolicy: { enabled: true, thresholdPercent: 75, windows: ["daily"] },
      },
    }),
    seedConnection(2),
  ]);
  const key = await seedManagedKey([bound.id, free.id]);
  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNERS[0],
    apiKeyId: key.id,
    provider: "glm",
    connectionId: bound.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;
  quotaCache.setQuotaCache(bound.id, "glm", {
    daily: { remainingPercentage: 1, resetAt: new Date(Date.now() + 60_000).toISOString() },
  });

  const selected = await auth.getProviderCredentials("glm", null, [bound.id, free.id], "glm-4.6", {
    lease: {
      apiKeyId: key.id,
      context: context(OWNERS[0], acquired.lease.generation),
      mode: "request",
    },
    materializeCredentials: false,
  });

  assert.equal(selected?.connectionId, free.id);
  assert.equal(
    leaseDb.getActiveExclusiveConnectionLease(OWNERS[0])?.generation,
    acquired.lease.generation
  );
});

test("managed cooldown and terminal-auth ineligibility transition only to a FREE connection", async () => {
  for (const kind of ["cooldown", "terminal"] as const) {
    await resetStorage();
    const [bound, free] = await Promise.all([seedConnection(1), seedConnection(2)]);
    const key = await seedManagedKey([bound.id, free.id]);
    const acquired = leaseDb.acquireExclusiveConnectionLease({
      leaseOwnerId: OWNERS[0],
      apiKeyId: key.id,
      provider: "glm",
      connectionId: bound.id,
    });
    assert.equal(acquired.kind, "ACQUIRED");
    if (acquired.kind !== "ACQUIRED") return;
    await providersDb.updateProviderConnection(
      bound.id,
      kind === "cooldown"
        ? {
            testStatus: "unavailable",
            rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
          }
        : { testStatus: "banned" }
    );

    const selected = await auth.getProviderCredentials(
      "glm",
      null,
      [bound.id, free.id],
      "glm-4.6",
      {
        lease: {
          apiKeyId: key.id,
          context: context(OWNERS[0], acquired.lease.generation),
          mode: "request",
        },
        materializeCredentials: false,
      }
    );
    assert.equal(selected?.connectionId, free.id, kind);
  }
});

test("managed model lockout transitions the same generation to a FREE connection", async () => {
  const [bound, free] = await Promise.all([
    seedConnection(1, { provider: "gemini" }),
    seedConnection(2, { provider: "gemini" }),
  ]);
  const key = await seedManagedKey([bound.id, free.id]);
  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNERS[0],
    apiKeyId: key.id,
    provider: "gemini",
    connectionId: bound.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;
  await auth.markAccountUnavailable(
    bound.id,
    429,
    "synthetic model lockout",
    "gemini",
    "gemini-2.5-pro"
  );

  const selected = await auth.getProviderCredentials(
    "gemini",
    null,
    [bound.id, free.id],
    "gemini-2.5-pro",
    {
      lease: {
        apiKeyId: key.id,
        context: context(OWNERS[0], acquired.lease.generation),
        mode: "request",
      },
      materializeCredentials: false,
    }
  );
  assert.equal(selected?.connectionId, free.id);
  assert.equal(
    leaseDb.getActiveExclusiveConnectionLease(OWNERS[0])?.generation,
    acquired.lease.generation
  );
});

test("managed request invalidates an unsafe binding when no FREE failover target exists", async () => {
  const bound = await seedConnection(1);
  const key = await seedManagedKey([bound.id]);
  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNERS[0],
    apiKeyId: key.id,
    provider: "glm",
    connectionId: bound.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;
  await providersDb.updateProviderConnection(bound.id, {
    testStatus: "unavailable",
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
  });

  const selected = await auth.getProviderCredentials("glm", null, [bound.id], "glm-4.6", {
    lease: {
      apiKeyId: key.id,
      context: context(OWNERS[0], acquired.lease.generation),
      mode: "request",
    },
    materializeCredentials: false,
  });

  assert.equal(selected?.allRateLimited, true);
  assert.equal(leaseDb.getActiveExclusiveConnectionLease(OWNERS[0]), null);
});
