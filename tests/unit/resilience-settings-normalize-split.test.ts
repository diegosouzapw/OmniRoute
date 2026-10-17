/**
 * Split-guard — resilience/settings ↔ settings/types + settings/normalize
 *
 * Guards the decomposition of the (fully pure) resilience settings module into
 * two leaves: settings/types.ts (the shape) and settings/normalize.ts (coercion
 * + per-section normalizers). Characterizes the coercers/normalizers and proves
 * the host still exposes DEFAULT_RESILIENCE_SETTINGS + resolve/merge/compat with
 * the re-exported types. DB-free — the whole layer is pure.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  asRecord,
  toInteger,
  toBoolean,
  normalizeProviderBreakerProfile,
  normalizeWaitForCooldownSettings,
  pruneResilienceSettingsToProvided,
} from "../../src/lib/resilience/settings/normalize.ts";

import {
  DEFAULT_RESILIENCE_SETTINGS,
  resolveResilienceSettings,
  mergeResilienceSettings,
  buildLegacyResilienceCompat,
} from "../../src/lib/resilience/settings.ts";
import type { ResilienceSettings } from "../../src/lib/resilience/settings.ts";

describe("resilience/settings normalize split-guard", () => {
  it("asRecord returns {} for non-objects and passes objects through", () => {
    assert.deepEqual(asRecord(null), {});
    assert.deepEqual(asRecord(42), {});
    assert.deepEqual(asRecord([1, 2]), {});
    assert.deepEqual(asRecord({ a: 1 }), { a: 1 });
  });

  it("toInteger clamps to [min,max], truncates, and falls back on NaN", () => {
    assert.equal(toInteger(5.9, 0), 5);
    assert.equal(toInteger("7", 0), 7);
    assert.equal(toInteger("nope", 3), 3);
    assert.equal(toInteger(-10, 0, { min: 1, max: 100 }), 1);
    assert.equal(toInteger(9999, 0, { min: 1, max: 100 }), 100);
  });

  it("toBoolean only accepts real booleans", () => {
    assert.equal(toBoolean(true, false), true);
    assert.equal(toBoolean("true", false), false);
    assert.equal(toBoolean(undefined, true), true);
  });

  it("normalizeProviderBreakerProfile keeps degradation below failure threshold", () => {
    const out = normalizeProviderBreakerProfile(
      { failureThreshold: 3, degradationThreshold: 10, resetTimeoutMs: 60000 },
      { failureThreshold: 5, degradationThreshold: 4, resetTimeoutMs: 30000 }
    );
    assert.equal(out.failureThreshold, 3);
    assert.equal(out.degradationThreshold, 2); // clamped to failureThreshold - 1
    assert.equal(out.resetTimeoutMs, 60000);
  });

  it("normalizeWaitForCooldownSettings derives ms and disables on zero retries/wait", () => {
    const on = normalizeWaitForCooldownSettings(
      { enabled: true, maxRetries: 2, maxRetryWaitSec: 30 },
      { enabled: true, maxRetries: 3, maxRetryWaitSec: 30, maxRetryWaitMs: 30000, budgetMs: 300000 }
    );
    assert.equal(on.enabled, true);
    assert.equal(on.maxRetryWaitMs, 30000);

    const off = normalizeWaitForCooldownSettings(
      { enabled: true, maxRetries: 0, maxRetryWaitSec: 30 },
      { enabled: true, maxRetries: 3, maxRetryWaitSec: 30, maxRetryWaitMs: 30000, budgetMs: 300000 }
    );
    assert.equal(off.enabled, false); // maxRetries 0 forces disabled
  });

  // #7360 follow-up: budgetMs caps the CUMULATIVE wait across all retries, not
  // just a single wait — without it, maxRetries x maxRetryWaitSec could exceed
  // the intended 5-minute give-up point.
  it("normalizeWaitForCooldownSettings floors budgetMs at maxRetryWaitMs and caps it at 5 minutes", () => {
    const floored = normalizeWaitForCooldownSettings(
      { maxRetryWaitSec: 90, budgetMs: 10000 },
      { enabled: true, maxRetries: 3, maxRetryWaitSec: 30, maxRetryWaitMs: 30000, budgetMs: 300000 }
    );
    assert.equal(floored.budgetMs, 90000, "budgetMs can never be smaller than a single wait");

    const capped = normalizeWaitForCooldownSettings(
      { budgetMs: 999999999 },
      { enabled: true, maxRetries: 3, maxRetryWaitSec: 30, maxRetryWaitMs: 30000, budgetMs: 300000 }
    );
    assert.equal(capped.budgetMs, 300000, "budgetMs is capped at 5 minutes");
  });

  it("host exposes DEFAULT_RESILIENCE_SETTINGS with the full section set", () => {
    const keys = Object.keys(DEFAULT_RESILIENCE_SETTINGS).sort();
    assert.deepEqual(keys, [
      "comboCooldownWait",
      "connectionCooldown",
      // Global default cadence for the background credential health check sweep.
      "credentialHealthCheck",
      // Opt-in latency term for p2c account selection (weight 0 = off).
      "p2cLatency",
      "providerBreaker",
      "providerCooldown",
      "providerQuotaOverrides",
      "quotaPreflight",
      "quotaShareConcurrencyLimit",
      "requestQueue",
      "streamRecovery",
      // Whether a stream content stall cools down the account (default off).
      "streamStallCooldown",
      // Token-refresh breaker scope + thresholds (per-connection isolation opt-in).
      "tokenRefreshBreaker",
      "waitForCooldown",
    ]);
  });

  it("host resolveResilienceSettings(null) yields normalized defaults", () => {
    const resolved: ResilienceSettings = resolveResilienceSettings(null);
    assert.equal(typeof resolved.requestQueue.requestsPerMinute, "number");
    assert.equal(typeof resolved.providerBreaker.oauth.failureThreshold, "number");
    // degradation is always kept below failure by the normalizer.
    assert.ok(
      resolved.providerBreaker.oauth.degradationThreshold <
        resolved.providerBreaker.oauth.failureThreshold ||
        resolved.providerBreaker.oauth.failureThreshold <= 1
    );
  });

  it("host mergeResilienceSettings applies a partial patch", () => {
    const base = resolveResilienceSettings(null);
    const merged = mergeResilienceSettings(base, {
      requestQueue: { concurrentRequests: 7 },
    });
    assert.equal(merged.requestQueue.concurrentRequests, 7);
    assert.equal(merged.requestQueue.requestsPerMinute, base.requestQueue.requestsPerMinute);
  });

  it("pruneResilienceSettingsToProvided keeps only values that differ from fresh defaults", () => {
    const fresh = resolveResilienceSettings(null);
    const merged = mergeResilienceSettings(fresh, {
      requestQueue: { concurrentRequests: 7 },
    });
    const sparse = pruneResilienceSettingsToProvided(merged, fresh);
    assert.deepEqual(sparse, { requestQueue: { concurrentRequests: 7 } });
  });

  it("pruneResilienceSettingsToProvided drops a value equal to the fresh default", () => {
    const fresh = resolveResilienceSettings(null);
    const sparse = pruneResilienceSettingsToProvided(
      { requestQueue: { maxWaitMs: fresh.requestQueue.maxWaitMs } },
      fresh
    );
    assert.deepEqual(sparse, {});
  });

  it("stored sparse object resolves to the same effective values as the full merge", () => {
    const stored: Record<string, unknown> = {};
    const sparseBase = resolveResilienceSettings({ resilienceSettings: stored });
    const mergedFull: ResilienceSettings = mergeResilienceSettings(sparseBase, {
      requestQueue: { maxWaitMs: 2000 },
    });
    const sparse = pruneResilienceSettingsToProvided(
      mergedFull as Record<string, unknown>,
      resolveResilienceSettings(null) as unknown as Record<string, unknown>
    );
    assert.deepEqual(sparse, { requestQueue: { maxWaitMs: 2000 } });
    const effective = resolveResilienceSettings({ resilienceSettings: sparse });
    assert.equal(effective.requestQueue.maxWaitMs, 2000);
    assert.equal(
      effective.requestQueue.requestsPerMinute,
      resolveResilienceSettings(null).requestQueue.requestsPerMinute
    );
  });

  it("an operator value different from the default survives while the default is pruned", () => {
    const fresh = resolveResilienceSettings(null);
    const sparse = pruneResilienceSettingsToProvided(
      {
        requestQueue: { maxWaitMs: 2000, requestsPerMinute: fresh.requestQueue.requestsPerMinute },
      },
      fresh as unknown as Record<string, unknown>
    );
    assert.deepEqual(sparse, { requestQueue: { maxWaitMs: 2000 } });
    const effective = resolveResilienceSettings({ resilienceSettings: sparse });
    assert.equal(effective.requestQueue.maxWaitMs, 2000);
    assert.equal(effective.requestQueue.requestsPerMinute, fresh.requestQueue.requestsPerMinute);
  });

  it("a full previously stored object resolves identically before and after pruning", () => {
    const legacyStored = resolveResilienceSettings(null);
    const before = resolveResilienceSettings({ resilienceSettings: legacyStored });
    const sparse = pruneResilienceSettingsToProvided(
      legacyStored as unknown as Record<string, unknown>,
      resolveResilienceSettings(null) as unknown as Record<string, unknown>
    );
    const after = resolveResilienceSettings({ resilienceSettings: sparse });
    assert.deepEqual(after, before);
  });

  it("top-level legacy retry keys survive the stored-partial resolve plus prune", () => {
    const currentSettings = {
      requestRetry: 1,
      maxRetryIntervalSec: 10,
      resilienceSettings: {},
    };
    const sparseBase = resolveResilienceSettings({
      ...currentSettings,
      resilienceSettings: {},
    });
    assert.equal(sparseBase.waitForCooldown.maxRetries, 1);
    assert.equal(sparseBase.waitForCooldown.maxRetryWaitSec, 10);
    const merged = mergeResilienceSettings(sparseBase, {
      requestQueue: { maxWaitMs: 2000 },
    });
    const sparse = pruneResilienceSettingsToProvided(merged, resolveResilienceSettings(null));
    const effective = resolveResilienceSettings({
      ...currentSettings,
      resilienceSettings: sparse,
    });
    assert.equal(effective.waitForCooldown.maxRetries, 1);
    assert.equal(effective.waitForCooldown.maxRetryWaitSec, 10);
    assert.equal(effective.requestQueue.maxWaitMs, 2000);
  });

  it("an unset flag leaf stays absent and follows the flag when set at import", () => {
    const script = [
      "import('./src/lib/resilience/settings.ts').then((m) => {",
      "  const fresh = m.resolveResilienceSettings(null);",
      "  const merged = m.mergeResilienceSettings(fresh, { requestQueue: { maxWaitMs: 2000 } });",
      "  const sparse = m.pruneResilienceSettingsToProvided(merged, fresh);",
      "  const effective = m.resolveResilienceSettings({ resilienceSettings: sparse });",
      "  process.stdout.write('SPARSE:' + JSON.stringify(sparse.streamRecovery ?? null) + '\\n');",
      "  process.stdout.write('EFFECTIVE:' + String(effective.streamRecovery.continueMidStream) + '\\n');",
      "});",
    ].join("\n");
    const run = (env: NodeJS.ProcessEnv) => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sparse-check-"));
      try {
        return execFileSync(process.execPath, ["--import", "tsx/esm", "--eval", script], {
          cwd: process.cwd(),
          env: { ...env, DATA_DIR: dir },
          encoding: "utf8",
          timeout: 120000,
        });
      } finally {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    };
    const baseEnv = { ...process.env };
    delete baseEnv.STREAM_RECOVERY_MIDSTREAM_ENABLED;
    const unsetOut = run(baseEnv);
    assert.match(unsetOut, /^SPARSE:\s*(\{\}|null)\s*$/m);
    assert.match(unsetOut, /^EFFECTIVE:false\s*$/m);
    const setOut = run({ ...baseEnv, STREAM_RECOVERY_MIDSTREAM_ENABLED: "true" });
    assert.match(setOut, /^EFFECTIVE:true\s*$/m);
  });

  it("pruning an empty merge result stores an empty object", () => {
    const fresh = resolveResilienceSettings(null);
    const sparse = pruneResilienceSettingsToProvided(fresh, fresh);
    assert.deepEqual(sparse, {});
  });

  it("host stores only operator-provided values after pruning defaults", () => {
    const routePath = path.resolve(process.cwd(), "src/app/api/resilience/route.ts");
    const source = fs.readFileSync(routePath, "utf8");
    assert.match(
      source,
      /resilienceSettings:\s*nextSparse\b/,
      "PATCH should store the pruned sparse object, not the full resolved one"
    );
    assert.match(
      source,
      /pruneResilienceSettingsToProvided/,
      "PATCH should prune merged values against fresh defaults before storing"
    );
    assert.match(
      source,
      /resolveResilienceSettings\(\{\s*\.\.\.currentSettings,\s*resilienceSettings:\s*storedResilience\s*,?\s*\}\)/,
      "PATCH should keep top-level legacy keys when resolving the stored partial"
    );
    assert.match(
      source,
      /resolveResilienceSettings\(\{\s*\.\.\.currentSettings,\s*resilienceSettings:\s*nextSparse\s*,?\s*\}\)/,
      "PATCH should keep top-level legacy keys when resolving the pruned patch"
    );
  });

  it("host buildLegacyResilienceCompat round-trips connection cooldown into profiles", () => {
    const compat = buildLegacyResilienceCompat(DEFAULT_RESILIENCE_SETTINGS);
    assert.equal(
      compat.profiles.oauth.transientCooldown,
      DEFAULT_RESILIENCE_SETTINGS.connectionCooldown.oauth.baseCooldownMs
    );
    assert.equal(
      compat.defaults.requestsPerMinute,
      DEFAULT_RESILIENCE_SETTINGS.requestQueue.requestsPerMinute
    );
  });
});
