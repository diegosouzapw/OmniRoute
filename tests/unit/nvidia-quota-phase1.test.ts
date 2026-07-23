/**
 * #6846 Phase 1 — nvidia NIM static local RPM budget, per-model 429 lockout, and
 * per-connection concurrency cap. Mocked/synthetic fixtures only — no live network
 * calls against NVIDIA NIM (matches the issue's own stated test plan).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  acquireProviderDefaultSlot,
  getProviderDefaultRateLimit,
  getProviderConcurrencyCap,
  setProviderQuotaOverrides,
  __setProviderDefaultRateLimitsForTests,
} from "../../open-sse/services/providerDefaultRateLimit.ts";
import {
  hasPerModelQuota,
  lockModelIfPerModelQuota,
  isModelLocked,
} from "../../open-sse/services/accountFallback.ts";
import * as semaphore from "../../open-sse/services/rateLimitSemaphore.ts";
import { acquireNvidiaConcurrencySlot } from "../../open-sse/executors/default/nvidiaConcurrencyGate.ts";

// ── RPM budget ──────────────────────────────────────────────────────────────

test("nvidia has a real default RPM budget of 40/60s (source-of-truth constant)", () => {
  // No test override active — resolves the REAL PROVIDER_DEFAULT_RATE_LIMITS entry,
  // so an accidental future edit to the literal 40 is caught here too.
  const cfg = getProviderDefaultRateLimit("nvidia");
  assert.ok(cfg, "nvidia must have a registered default");
  assert.equal(cfg?.requests, 40);
  assert.equal(cfg?.windowMs, 60_000);
});

test("nvidia default RPM budget: 41st request in-window is throttled", () => {
  __setProviderDefaultRateLimitsForTests({ nvidia: { requests: 40, windowMs: 60_000 } });
  try {
    for (let i = 0; i < 40; i++) {
      assert.equal(
        acquireProviderDefaultSlot("nvidia", "conn-rpm"),
        0,
        `request ${i + 1}/40 proceeds`
      );
    }
    const wait = acquireProviderDefaultSlot("nvidia", "conn-rpm");
    assert.ok(wait > 0, "41st request in the same 60s window is throttled");
    assert.ok(wait <= 60_000, "wait never exceeds the window");
  } finally {
    __setProviderDefaultRateLimitsForTests(null);
  }
});

test("per-provider RPM override takes precedence over the static default", () => {
  setProviderQuotaOverrides({ nvidia: { rpm: 2 } });
  __setProviderDefaultRateLimitsForTests(null);
  try {
    const cfg = getProviderDefaultRateLimit("nvidia");
    assert.equal(cfg?.requests, 2, "override replaces the static 40 default");
    assert.equal(acquireProviderDefaultSlot("nvidia", "conn-override"), 0);
    assert.equal(acquireProviderDefaultSlot("nvidia", "conn-override"), 0);
    const wait = acquireProviderDefaultSlot("nvidia", "conn-override");
    assert.ok(wait > 0, "3rd request exceeds the overridden 2/min budget");
  } finally {
    setProviderQuotaOverrides(null);
  }
});

test("RPM override does not mutate PROVIDER_DEFAULT_RATE_LIMITS for other providers", () => {
  setProviderQuotaOverrides({ nvidia: { rpm: 2 } });
  try {
    assert.equal(getProviderDefaultRateLimit("openai"), undefined, "unrelated provider untouched");
  } finally {
    setProviderQuotaOverrides(null);
  }
});

// ── Per-model 429 lockout ────────────────────────────────────────────────────
//
// Plan Step 3 turned out to be already satisfied: issue #6773 (landed after this
// plan's research) already set `passthroughModels: true` on nvidia's provider
// registry entry (open-sse/config/providers/registry/nvidia/index.ts) so that a
// single model's 404/429 stays scoped to that model — `hasPerModelQuota()`
// already returns `true` for nvidia via its generic
// `getPassthroughProviders().has(provider)` branch, with zero new code needed
// here. This PR does NOT add a redundant `provider === "nvidia"` branch; these
// tests are a regression guard proving the requirement holds.

test('hasPerModelQuota("nvidia", <any model>) returns true (via #6773 passthroughModels)', () => {
  assert.equal(hasPerModelQuota("nvidia"), true);
  assert.equal(hasPerModelQuota("nvidia", "kimi-k2.6"), true);
  assert.equal(hasPerModelQuota("nvidia", "glm-4.7"), true);
});

test("429 on model A does not lock model B on the same nvidia connection", () => {
  const connectionId = "nvidia-conn-lockout";
  const locked = lockModelIfPerModelQuota(
    "nvidia",
    connectionId,
    "kimi-k2.6",
    "429 rate limit",
    5_000
  );
  assert.equal(locked, true, "lockModelIfPerModelQuota locks the offending model");
  assert.equal(isModelLocked("nvidia", connectionId, "kimi-k2.6"), true);
  assert.equal(
    isModelLocked("nvidia", connectionId, "glm-4.7"),
    false,
    "a different model on the same connection stays unlocked"
  );
});

// ── Per-connection concurrency cap ──────────────────────────────────────────

test("concurrency cap queues the 3rd concurrent request at cap=2, releases correctly", async () => {
  setProviderQuotaOverrides({ nvidia: { concurrency: 2 } });
  try {
    const release1 = await acquireNvidiaConcurrencySlot("nvidia", "conn-cap");
    const release2 = await acquireNvidiaConcurrencySlot("nvidia", "conn-cap");
    assert.ok(release1 && release2, "first two acquisitions resolve immediately");

    let thirdResolved = false;
    const thirdPromise = acquireNvidiaConcurrencySlot("nvidia", "conn-cap").then((release) => {
      thirdResolved = true;
      return release;
    });

    // Give the microtask queue a tick — the 3rd acquire must still be queued.
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.equal(thirdResolved, false, "3rd concurrent request queues instead of rejecting");

    release1?.();
    const release3 = await thirdPromise;
    assert.equal(thirdResolved, true, "3rd request resolves once a slot frees");
    release2?.();
    release3?.();
  } finally {
    setProviderQuotaOverrides(null);
  }
});

test("concurrency cap is scoped per-connection, not shared across two nvidia connections", async () => {
  setProviderQuotaOverrides({ nvidia: { concurrency: 1 } });
  try {
    const releaseA = await acquireNvidiaConcurrencySlot("nvidia", "conn-a");
    assert.ok(releaseA, "connection A gets its slot");

    let releaseBResolved = false;
    const releaseBPromise = acquireNvidiaConcurrencySlot("nvidia", "conn-b").then((release) => {
      releaseBResolved = true;
      return release;
    });
    const releaseB = await releaseBPromise;
    assert.equal(
      releaseBResolved,
      true,
      "a different connection is unaffected by connection A's saturated gate"
    );

    releaseA?.();
    releaseB?.();
  } finally {
    setProviderQuotaOverrides(null);
  }
});

test("the concurrency gate is a no-op for every non-nvidia provider", async () => {
  const release = await acquireNvidiaConcurrencySlot("openai", "some-connection");
  assert.equal(release, null, "non-nvidia providers never allocate a semaphore key");
});

test("the concurrency gate is a no-op without a connectionId", async () => {
  const release = await acquireNvidiaConcurrencySlot("nvidia", null);
  assert.equal(release, null, "no connectionId to scope the gate to");
});

test("getProviderConcurrencyCap resolves override -> static default -> fallback", () => {
  setProviderQuotaOverrides(null);
  assert.equal(
    getProviderConcurrencyCap("nvidia", 99),
    6,
    "nvidia's registered static default is 6 (mid-point of the issue's 4-8 range)"
  );
  assert.equal(
    getProviderConcurrencyCap("some-unregistered-provider", 99),
    99,
    "unregistered providers fall back to the caller-supplied default"
  );
  setProviderQuotaOverrides({ nvidia: { concurrency: 3 } });
  try {
    assert.equal(getProviderConcurrencyCap("nvidia", 99), 3, "override wins over the static default");
  } finally {
    setProviderQuotaOverrides(null);
  }
});

test("semaphore.getStats reflects nvidia's per-connection gate key", async () => {
  setProviderQuotaOverrides({ nvidia: { concurrency: 1 } });
  try {
    const release = await acquireNvidiaConcurrencySlot("nvidia", "conn-stats");
    assert.ok(release);
    const stats = semaphore.getStats();
    assert.ok(
      Object.prototype.hasOwnProperty.call(stats, "nvidia:conn-stats"),
      "gate key is scoped as `${provider}:${connectionId}`"
    );
    release?.();
  } finally {
    setProviderQuotaOverrides(null);
  }
});

// ── Failure-mode separation regression guard ────────────────────────────────

test("nvidia 429 does not trip the provider circuit breaker (unchanged 408/500/502/503/504-only classification)", () => {
  // This PR does not touch src/sse/handlers/chat.ts or the circuit breaker — this
  // is a documentation-alignment guard proving Phase 1 didn't accidentally widen
  // PROVIDER_BREAKER_FAILURE_STATUSES to include 429 (which would collapse the
  // per-model lockout this PR adds into a whole-connection/provider outage).
  const chatHandlerPath = path.join(
    process.cwd(),
    "src",
    "sse",
    "handlers",
    "chat.ts"
  );
  const source = fs.readFileSync(chatHandlerPath, "utf8");
  const match = source.match(/PROVIDER_BREAKER_FAILURE_STATUSES\s*=\s*new Set\(\[([^\]]+)\]\)/);
  assert.ok(match, "PROVIDER_BREAKER_FAILURE_STATUSES declaration found");
  const statuses = match![1].split(",").map((s) => Number(s.trim()));
  assert.deepEqual(
    statuses.sort((a, b) => a - b),
    [408, 500, 502, 503, 504]
  );
  assert.ok(!statuses.includes(429), "429 must never trip the provider circuit breaker");
});
