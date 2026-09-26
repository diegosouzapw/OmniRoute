// tests/unit/api-key-429-cooldown.test.ts
// Per-key 429 cooldown (#14573): a rate limit on one extra key must cool only that
// key — not mark it invalid, not disable the whole connection. The rotator skips
// cooling keys and picks them up again once cooldownUntil passes.
import { test, describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  getValidApiKey,
  recordKeyCooldown,
  parseRetryAfterMs,
  getAllKeyHealth,
  removeConnectionHealth,
  connectionHasExtraKeys,
  trackConnectionExtraKeys,
  hasEligibleKey,
  recordKeySuccess,
} from "../../open-sse/services/apiKeyRotator.ts";
import { recordKeyHealthStatus } from "../../open-sse/handlers/chatCore/keyHealth.ts";
import { shouldKeepConnectionActiveOnRateLimit } from "../../open-sse/handlers/chatCore/rateLimitConnectionGuard.ts";

const noopLog = { warn: () => {}, error: () => {} };
const touched: string[] = [];

function creds(connectionId: string, psd: Record<string, unknown> = {}) {
  touched.push(connectionId);
  return { connectionId, apiKey: "sk-test", accessToken: null, providerSpecificData: psd };
}

afterEach(() => {
  for (const c of touched.splice(0)) removeConnectionHealth(c);
});

describe("parseRetryAfterMs", () => {
  it("parses delta-seconds", () => {
    assert.equal(parseRetryAfterMs("30"), 30_000);
  });

  it("parses HTTP-date", () => {
    const future = new Date(Date.now() + 45_000).toUTCString();
    const ms = parseRetryAfterMs(future);
    assert.ok(ms !== null && ms > 30_000 && ms <= 45_000, `expected ~45s, got ${ms}`);
  });

  it("returns null for garbage", () => {
    assert.equal(parseRetryAfterMs("not-a-date"), null);
    assert.equal(parseRetryAfterMs(null), null);
    assert.equal(parseRetryAfterMs(undefined), null);
  });

  it("returns 0 (not null) for an expired HTTP-date", () => {
    const past = new Date(Date.now() - 1_000).toUTCString();
    assert.equal(parseRetryAfterMs(past), 0);
  });
});

describe("recordKeyCooldown + rotation skip", () => {
  it("sets cooldownUntil in the future and the rotator skips the cooling key", () => {
    const conn = "cd-skip-1";
    trackConnectionExtraKeys(conn, ["sk-extra-0"]);
    recordKeyCooldown(conn, "primary", 60_000);
    const h = getAllKeyHealth()[`${conn}:primary`];
    assert.ok(h.cooldownUntil !== null && h.cooldownUntil !== undefined);
    assert.ok(new Date(h.cooldownUntil).getTime() > Date.now());
    // status stays active — a 429 is temporary, not a credential failure
    assert.equal(h.status, "active");

    const pick = getValidApiKey(conn, "sk-primary", ["sk-extra-0"]);
    assert.equal(pick?.keyId, "extra_0");
  });

  it("auto-recovers the key once cooldownUntil passes", async () => {
    const conn = "cd-recover-1";
    trackConnectionExtraKeys(conn, ["sk-extra-0"]);
    recordKeyCooldown(conn, "primary", 1);
    await new Promise((resolve) => setTimeout(resolve, 5));
    const pick = getValidApiKey(conn, "sk-primary", ["sk-extra-0"]);
    assert.equal(pick?.keyId, "primary");
  });

  it("returns null when every key is cooling", () => {
    const conn = "cd-all-cooling";
    trackConnectionExtraKeys(conn, ["sk-extra-0"]);
    recordKeyCooldown(conn, "primary", 60_000);
    recordKeyCooldown(conn, "extra_0", 60_000);
    const pick = getValidApiKey(conn, "sk-primary", ["sk-extra-0"]);
    assert.equal(pick, null);
  });

  it("round-robin lands on sibling keys while one key cools", () => {
    const conn = "cd-siblings";
    trackConnectionExtraKeys(conn, ["sk-e0", "sk-e1"]);
    recordKeyCooldown(conn, "extra_0", 60_000);
    const seen = new Set<string>();
    for (let i = 0; i < 6; i++) {
      const pick = getValidApiKey(conn, "sk-p", ["sk-e0", "sk-e1"]);
      seen.add(pick!.keyId);
    }
    assert.ok(!seen.has("extra_0"), "cooling key must never be picked");
    assert.ok(seen.has("primary") && seen.has("extra_1"));
  });

  it("in-memory clear (success) is not overridden by a stale provided cooldown", () => {
    const conn = "stale-provided-override";
    const future = new Date(Date.now() + 60_000).toISOString();
    // Stale DB snapshot still carries a cooldown window while the in-memory
    // record was already cleared by recordKeySuccess.
    trackConnectionExtraKeys(conn, ["sk-stale-e0"]);
    const health = { extra_0: { cooldownUntil: future } } as never;
    recordKeyCooldown(conn, "extra_0", 60_000);
    recordKeySuccess(conn, "extra_0");
    const seen = new Set<string>();
    for (let i = 0; i < 4; i++) {
      seen.add(getValidApiKey(conn, "sk-stale-p", ["sk-stale-e0"], health)!.keyId);
    }
    assert.ok(seen.has("extra_0"), "cleared in-memory state must win over stale provided snapshot");
  });

  it("DB-provided health shadows in-memory cooldown for the same key (merged view)", () => {
    const conn = "cd-db-shadow";
    trackConnectionExtraKeys(conn, ["sk-e0"]);
    recordKeyCooldown(conn, "primary", 60_000);
    const dbHealth = {
      primary: { ...getAllKeyHealth()[`${conn}:primary`], cooldownUntil: null },
      extra_0: { status: "active", failures: 0, lastFailure: null, lastSuccess: null, totalRequests: 0, totalFailures: 0, cooldownUntil: null },
    };
    const pick = getValidApiKey(conn, "sk-p", ["sk-e0"], dbHealth as never);
    // the in-memory cooldown write happened after startup sync, so it still wins
    assert.equal(pick?.keyId, "extra_0");
  });
});

describe("hasEligibleKey (connection guard input)", () => {
  it("true while any key is eligible", () => {
    const conn = "guard-eligible";
    trackConnectionExtraKeys(conn, ["sk-e0"]);
    recordKeyCooldown(conn, "primary", 60_000);
    assert.equal(hasEligibleKey(conn, "sk-p", ["sk-e0"]), true);
  });

  it("false when all keys cool or invalid", () => {
    const conn = "guard-none";
    trackConnectionExtraKeys(conn, ["sk-e0"]);
    recordKeyCooldown(conn, "primary", 60_000);
    recordKeyCooldown(conn, "extra_0", 60_000);
    assert.equal(hasEligibleKey(conn, "sk-p", ["sk-e0"]), false);
  });

  it("hasEligibleKey is a pure predicate: it never advances the rotation index", () => {
    const baseConn = "guard-baseline";
    trackConnectionExtraKeys(baseConn, ["sk-bl-e0"]);
    const baseline = [
      getValidApiKey(baseConn, "sk-bl-p", ["sk-bl-e0"])!.keyId,
      getValidApiKey(baseConn, "sk-bl-p", ["sk-bl-e0"])!.keyId,
      getValidApiKey(baseConn, "sk-bl-p", ["sk-bl-e0"])!.keyId,
    ];
    const conn = "guard-no-index-drift";
    trackConnectionExtraKeys(conn, ["sk-nd-e0"]);
    const withGuard = [
      (hasEligibleKey(conn, "sk-nd-p", ["sk-nd-e0"]),
      getValidApiKey(conn, "sk-nd-p", ["sk-nd-e0"])!.keyId),
      (hasEligibleKey(conn, "sk-nd-p", ["sk-nd-e0"]),
      getValidApiKey(conn, "sk-nd-p", ["sk-nd-e0"])!.keyId),
      (hasEligibleKey(conn, "sk-nd-p", ["sk-nd-e0"]),
      getValidApiKey(conn, "sk-nd-p", ["sk-nd-e0"])!.keyId),
    ];
    assert.deepEqual(withGuard, baseline, "predicate calls must not consume rotation steps");
  });

  it("connectionHasExtraKeys stays consistent", () => {
    const conn = "guard-extras";
    trackConnectionExtraKeys(conn, ["sk-e0"]);
    assert.equal(connectionHasExtraKeys(conn), true);
  });
});

describe("recordKeyHealthStatus 429 handling", () => {
  it("429 with retryAfterMs cools the selected key and keeps status active", () => {
    const conn = "kh-429-cool";
    recordKeyHealthStatus(429, creds(conn, { selectedKeyId: "extra_0" }), noopLog, undefined, "", 30_000);
    const h = getAllKeyHealth()[`${conn}:extra_0`];
    assert.ok(h, "health entry expected");
    assert.ok(h.cooldownUntil !== null && new Date(h.cooldownUntil).getTime() > Date.now());
    assert.equal(h.status, "active");
    assert.equal(h.failures, 0);
  });

  it("429 without retryAfterMs applies the default cooldown", () => {
    const conn = "kh-429-default";
    recordKeyHealthStatus(429, creds(conn), noopLog);
    const h = getAllKeyHealth()[`${conn}:primary`];
    assert.ok(h.cooldownUntil !== null && h.cooldownUntil !== undefined);
  });

  it("429 does not touch sibling keys", () => {
    const conn = "kh-429-siblings";
    trackConnectionExtraKeys(conn, ["sk-e0"]);
    recordKeyHealthStatus(429, creds(conn, { selectedKeyId: "primary" }), noopLog);
    assert.equal(getAllKeyHealth()[`${conn}:extra_0`], undefined);
  });

  it("2xx still records success and clears cooldown", () => {
    const conn = "kh-2xx-recovers";
    recordKeyHealthStatus(429, creds(conn), noopLog, undefined, "", 60_000);
    recordKeyHealthStatus(200, creds(conn), noopLog);
    const h = getAllKeyHealth()[`${conn}:primary`];
    assert.equal(h.cooldownUntil, null);
    assert.equal(h.status, "active");
  });

  it("401 regression: still warns then invalidates, unaffected by cooldown logic", () => {
    const conn = "kh-401-regression";
    recordKeyHealthStatus(401, creds(conn), noopLog);
    recordKeyHealthStatus(401, creds(conn), noopLog);
    const h = getAllKeyHealth()[`${conn}:primary`];
    assert.equal(h.status, "invalid");
  });
});

describe("shouldKeepConnectionActiveOnRateLimit", () => {
  it("true when extras exist and at least one key is eligible", () => {
    const conn = "rlguard-keep";
    trackConnectionExtraKeys(conn, ["sk-e0"]);
    recordKeyCooldown(conn, "primary", 60_000);
    const creds = {
      apiKey: "sk-p",
      providerSpecificData: { extraApiKeys: ["sk-e0"], apiKeyHealth: getAllKeyHealth() },
    };
    assert.equal(shouldKeepConnectionActiveOnRateLimit(creds, conn), true);
  });

  it("false when every key is cooling (connection may be disabled)", () => {
    const conn = "rlguard-none";
    trackConnectionExtraKeys(conn, ["sk-e0"]);
    recordKeyCooldown(conn, "primary", 60_000);
    recordKeyCooldown(conn, "extra_0", 60_000);
    const creds = {
      apiKey: "sk-p",
      providerSpecificData: { extraApiKeys: ["sk-e0"], apiKeyHealth: getAllKeyHealth() },
    };
    assert.equal(shouldKeepConnectionActiveOnRateLimit(creds, conn), false);
  });

  it("false without connectionId or without extra keys", () => {
    const conn = "rlguard-noextras";
    trackConnectionExtraKeys(conn, []);
    const creds = { apiKey: "sk-p", providerSpecificData: { extraApiKeys: [] } };
    assert.equal(shouldKeepConnectionActiveOnRateLimit(creds, conn), false);
    assert.equal(shouldKeepConnectionActiveOnRateLimit(creds, null), false);
  });
});

describe("chatCore wiring (source-locked)", () => {
  const src = readFileSync(new URL("../../open-sse/handlers/chatCore.ts", import.meta.url), "utf8");

  it("streaming executor site records 429 into key health (not only 2xx/401/403)", () => {
    const i = src.indexOf("recordKeyHealthStatus(\n                  res.response.status,");
    assert.notEqual(i, -1, "streaming recordKeyHealthStatus call site must exist");
    // Only the condition head counts — comments inside the block must not satisfy this.
    const condStart = src.lastIndexOf("if (", i);
    const cond = src.slice(condStart, condStart + 600);
    assert.ok(
      cond.includes("HTTP_STATUS.RATE_LIMITED"),
      "streaming condition head must admit 429 via HTTP_STATUS.RATE_LIMITED"
    );
  });

  it("QUOTA_EXHAUSTED branch keeps the connection active when extra keys remain eligible", () => {
    const q = src.indexOf('errorType === PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED');
    assert.notEqual(q, -1);
    const block = src.slice(q, q + 9000);
    assert.ok(
      block.includes("shouldKeepConnectionActiveOnRateLimit"),
      "quota-exhausted path must consult the extra-keys guard before disabling the connection"
    );
  });
});
