import test from "node:test";
import assert from "node:assert/strict";

const quotaPreflight = await import("../../open-sse/services/quotaPreflight.ts");

const {
  registerQuotaFetcher,
  registerQuotaWindows,
  getQuotaWindows,
  isQuotaPreflightEnabled,
  preflightQuota,
} = quotaPreflight;

function createConnection(providerSpecificData = {}) {
  return { providerSpecificData };
}

async function withPatchedConsole(methodName, replacement, fn) {
  const original = console[methodName];
  console[methodName] = replacement;
  try {
    return await fn();
  } finally {
    console[methodName] = original;
  }
}

test("isQuotaPreflightEnabled reads the provider flag strictly (back-compat helper)", () => {
  // The flag itself no longer gates preflightQuota internally — the caller
  // in auth.ts decides whether to invoke it. The helper is still exported
  // so the caller can honor the legacy force-on flag.
  assert.equal(isQuotaPreflightEnabled(createConnection({ quotaPreflightEnabled: true })), true);
  assert.equal(isQuotaPreflightEnabled(createConnection({ quotaPreflightEnabled: "true" })), false);
  assert.equal(isQuotaPreflightEnabled(createConnection()), false);
});

test("preflightQuota passes through when no fetcher is registered for the provider", async () => {
  const result = await preflightQuota(
    "provider-missing-fetcher",
    "conn-2",
    createConnection({ quotaPreflightEnabled: true })
  );

  assert.deepEqual(result, { proceed: true });
});

test("preflightQuota passes through when the fetcher throws or returns null", async () => {
  registerQuotaFetcher("provider-throws", async () => {
    throw new Error("boom");
  });
  registerQuotaFetcher("provider-null", async () => null);

  const enabled = createConnection({ quotaPreflightEnabled: true });

  assert.deepEqual(await preflightQuota("provider-throws", "conn-3", enabled), {
    proceed: true,
  });
  assert.deepEqual(await preflightQuota("provider-null", "conn-4", enabled), {
    proceed: true,
  });
});

// ─── Legacy single-signal path (no windows map on QuotaInfo) ──────────────

test("preflightQuota (legacy single-signal): warns at 20% remaining by default", async () => {
  const warnings: string[] = [];
  // 80% used = 20% remaining → hits the default 20% warn threshold.
  registerQuotaFetcher("provider-warn", async () => ({
    used: 80,
    total: 100,
    percentUsed: 0.8,
  }));

  const result = await withPatchedConsole(
    "warn",
    (message: string) => warnings.push(message),
    async () =>
      preflightQuota("provider-warn", "conn-5", createConnection({ quotaPreflightEnabled: true }))
  );

  assert.deepEqual(result, { proceed: true, quotaPercent: 0.8 });
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /approaching cutoff/i);
  assert.match(warnings[0], /20\.0% remaining/);
});

test("preflightQuota (legacy single-signal): blocks at 2% remaining by default", async () => {
  // 99% used = 1% remaining → below the default 2% cutoff → block.
  registerQuotaFetcher("provider-exhausted", async () => ({
    used: 99,
    total: 100,
    percentUsed: 0.99,
  }));

  const result = await preflightQuota(
    "provider-exhausted",
    "conn-6",
    createConnection({ quotaPreflightEnabled: true })
  );

  assert.equal(result.proceed, false);
  assert.equal(result.reason, "quota_exhausted");
  assert.equal(result.quotaPercent, 0.99);
});

test("preflightQuota (legacy single-signal): resolver override drives the decision (remaining %)", async () => {
  // 91% used = 9% remaining. Cutoff = 10 (remaining %) → block (9 ≤ 10).
  registerQuotaFetcher("provider-override-block", async () => ({
    used: 91,
    total: 100,
    percentUsed: 0.91,
  }));

  const result = await preflightQuota(
    "provider-override-block",
    "conn-override-1",
    createConnection({ quotaPreflightEnabled: true }),
    {
      resolveMinRemainingPercent: () => 10,
      resolveWarnRemainingPercent: () => 20,
    }
  );
  assert.equal(result.proceed, false);
  assert.equal(result.reason, "quota_exhausted");
});

test("preflightQuota (legacy single-signal): proceeds when remaining is above the cutoff", async () => {
  // 89% used = 11% remaining. Cutoff = 10 → proceed (11 > 10).
  registerQuotaFetcher("provider-override-pass", async () => ({
    used: 89,
    total: 100,
    percentUsed: 0.89,
  }));

  const result = await preflightQuota(
    "provider-override-pass",
    "conn-override-2",
    createConnection({ quotaPreflightEnabled: true }),
    { resolveMinRemainingPercent: () => 10 }
  );

  assert.equal(result.proceed, true);
});

// ─── New per-window path (windows map on QuotaInfo) ───────────────────────

test("preflightQuota (per-window): blocks if ANY window falls to its cutoff", async () => {
  // session: 50% used = 50% remaining (cutoff 5 → ok)
  // weekly:  82% used = 18% remaining (cutoff 20 → BLOCK, 18 ≤ 20)
  const infos: string[] = [];
  registerQuotaFetcher("provider-windows-block", async () => ({
    used: 82,
    total: 100,
    percentUsed: 0.82,
    windows: {
      session: { percentUsed: 0.5, resetAt: "2026-05-14T20:00:00Z" },
      weekly: { percentUsed: 0.82, resetAt: "2026-05-21T00:00:00Z" },
    },
  }));

  const result = await withPatchedConsole(
    "info",
    (message: string) => infos.push(message),
    async () =>
      preflightQuota(
        "provider-windows-block",
        "conn-windows-1",
        createConnection({ quotaPreflightEnabled: true }),
        {
          resolveMinRemainingPercent: (window) =>
            window === "session" ? 5 : window === "weekly" ? 20 : 2,
        }
      )
  );

  assert.equal(result.proceed, false);
  assert.equal(result.reason, "quota_exhausted");
  assert.equal(result.quotaPercent, 0.82);
  assert.equal(result.resetAt, "2026-05-21T00:00:00Z");
  assert.equal(infos.length, 1);
  assert.match(infos[0], /weekly/);
  assert.match(infos[0], /18\.0% remaining/);
});

test("preflightQuota (per-window): both above cutoffs → proceed", async () => {
  // session: 70% used = 30% remaining (cutoff 5 → ok)
  // weekly:  40% used = 60% remaining (cutoff 20 → ok)
  registerQuotaFetcher("provider-windows-pass", async () => ({
    used: 70,
    total: 100,
    percentUsed: 0.7,
    windows: {
      session: { percentUsed: 0.7, resetAt: null },
      weekly: { percentUsed: 0.4, resetAt: null },
    },
  }));

  const result = await preflightQuota(
    "provider-windows-pass",
    "conn-windows-2",
    createConnection({ quotaPreflightEnabled: true }),
    {
      resolveMinRemainingPercent: (window) => (window === "session" ? 5 : 20),
    }
  );

  assert.equal(result.proceed, true);
});

test("preflightQuota (per-window): resolver receives the window name, not null", async () => {
  const seenWindows: (string | null)[] = [];
  registerQuotaFetcher("provider-windows-resolver-witness", async () => ({
    used: 10,
    total: 100,
    percentUsed: 0.1,
    windows: {
      session: { percentUsed: 0.1, resetAt: null },
      weekly: { percentUsed: 0.05, resetAt: null },
    },
  }));

  await preflightQuota(
    "provider-windows-resolver-witness",
    "conn-windows-3",
    createConnection({ quotaPreflightEnabled: true }),
    {
      resolveMinRemainingPercent: (window) => {
        seenWindows.push(window);
        return 2;
      },
    }
  );

  assert.deepEqual(seenWindows.sort(), ["session", "weekly"]);
});

test("preflightQuota (per-window): omitted resolver falls back to the 2% remaining default", async () => {
  // weekly at 99% used = 1% remaining < 2% default → block.
  registerQuotaFetcher("provider-windows-default", async () => ({
    used: 99,
    total: 100,
    percentUsed: 0.99,
    windows: {
      session: { percentUsed: 0.1, resetAt: null },
      weekly: { percentUsed: 0.99, resetAt: null },
    },
  }));

  const result = await preflightQuota(
    "provider-windows-default",
    "conn-windows-4",
    createConnection({ quotaPreflightEnabled: true })
  );

  assert.equal(result.proceed, false);
  assert.equal(result.quotaPercent, 0.99);
});

// ─── Window registry ─────────────────────────────────────────────────────

test("registerQuotaWindows / getQuotaWindows round-trips", () => {
  registerQuotaWindows("test-provider", ["a", "b"]);
  assert.deepEqual([...getQuotaWindows("test-provider")], ["a", "b"]);
  // Unknown provider returns an empty list rather than undefined.
  assert.deepEqual([...getQuotaWindows("provider-with-no-registration-anywhere")], []);
});
