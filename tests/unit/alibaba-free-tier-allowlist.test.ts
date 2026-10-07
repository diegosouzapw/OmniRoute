/**
 * @file alibaba-free-tier-allowlist.test.ts
 * @description Tests for built-in Alibaba free-tier text model allowlists.
 *
 * @changes
 * - [2026-07-25] [Composer] - Add built-in allowlist regression tests
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  ALIBABA_FREE_TIER_TEXT_CAPABLE_MODELS,
  ALIBABA_NO_FREE_TIER_TEXT_MODELS,
  isAlibabaBuiltinFreeTierTextModel,
  isAlibabaBuiltinNoFreeTierTextModel,
  isAlibabaFreeTierAllowlistPackValid,
  loadAlibabaFreeTierAllowlistPack,
  resetAlibabaFreeTierAllowlistCache,
} from "../../open-sse/services/alibabaFreeTierAllowlist.ts";

test("built-in allowlist includes operator free models and excludes paid blocklist", () => {
  assert.ok(ALIBABA_FREE_TIER_TEXT_CAPABLE_MODELS.includes("qwen3.6-plus"));
  assert.ok(ALIBABA_FREE_TIER_TEXT_CAPABLE_MODELS.includes("glm-5.2"));
  assert.ok(ALIBABA_NO_FREE_TIER_TEXT_MODELS.includes("qwen3.7-max"));
  assert.ok(ALIBABA_NO_FREE_TIER_TEXT_MODELS.includes("glm-5.2-fast-preview"));
  assert.equal(isAlibabaBuiltinFreeTierTextModel("qwen3.6-plus"), true);
  assert.equal(isAlibabaBuiltinNoFreeTierTextModel("kimi-k2.7-code"), true);
  assert.equal(isAlibabaBuiltinFreeTierTextModel("qwen3.7-max"), false);
});

/**
 * The shipped `config/alibaba-free-tier-allowlist.json` carries a `validUntil`,
 * so asserting against it made this test a time bomb: it went red on its own on
 * 2026-08-28, the day after the pack expired, and stayed red on every PR and on
 * `main` (#11866). Nothing had changed — the clock moved.
 *
 * Production was never affected: an expired pack falls back to the embedded
 * list by design. So the contract worth pinning is the BEHAVIOR on both sides of
 * the expiry, with packs this test owns and dates it controls — never the
 * freshness of the catalog that ships in the repo.
 */
function withAllowlistPack(pack: Record<string, unknown>, assertions: () => void): void {
  const dir = mkdtempSync(join(tmpdir(), "alibaba-allowlist-"));
  const packPath = join(dir, "allowlist.json");
  writeFileSync(packPath, JSON.stringify(pack), "utf8");

  const previousPath = process.env.ALIBABA_FREE_TIER_ALLOWLIST_PATH;
  process.env.ALIBABA_FREE_TIER_ALLOWLIST_PATH = packPath;
  resetAlibabaFreeTierAllowlistCache();
  try {
    assertions();
  } finally {
    if (previousPath) process.env.ALIBABA_FREE_TIER_ALLOWLIST_PATH = previousPath;
    else delete process.env.ALIBABA_FREE_TIER_ALLOWLIST_PATH;
    resetAlibabaFreeTierAllowlistCache();
    rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

test("allowlist JSON pack overrides embedded lists while it is still valid", () => {
  withAllowlistPack(
    {
      asOf: "2026-07-28",
      validUntil: "2999-01-01",
      capable: ["pack-only-capable-model", "qwen3.6-plus"],
      noFreeTier: ["pack-only-paid-model"],
    },
    () => {
      const pack = loadAlibabaFreeTierAllowlistPack();
      assert.ok(pack, "a pack inside its validity window must load");
      assert.ok(isAlibabaFreeTierAllowlistPackValid(pack!));
      assert.ok(pack!.capable.includes("qwen3.6-plus"));
      // Positive anchor: the pack must actually REPLACE the embedded list, not
      // merely load. `pack-only-capable-model` exists nowhere else.
      assert.equal(isAlibabaBuiltinFreeTierTextModel("pack-only-capable-model"), true);
      assert.equal(isAlibabaBuiltinNoFreeTierTextModel("pack-only-paid-model"), true);
    }
  );
});

test("an expired allowlist pack is ignored and the embedded list serves instead", () => {
  // This is the path production has actually been on since 2026-08-27, and it
  // had no coverage at all — which is why the expiry surfaced as a red test
  // rather than as a deliberate, understood fallback.
  withAllowlistPack(
    {
      asOf: "2026-07-28",
      validUntil: "2026-08-27",
      capable: ["pack-only-capable-model"],
      noFreeTier: ["pack-only-paid-model"],
    },
    () => {
      assert.equal(loadAlibabaFreeTierAllowlistPack(), null, "expired pack must not load");
      assert.equal(isAlibabaBuiltinFreeTierTextModel("pack-only-capable-model"), false);
      // The embedded list must be what answers once the pack is rejected.
      assert.equal(isAlibabaBuiltinFreeTierTextModel("qwen3.6-plus"), true);
      assert.equal(isAlibabaBuiltinNoFreeTierTextModel("qwen3.7-max"), true);
    }
  );
});

test("isAlibabaFreeTierAllowlistPackValid compares against the instant it is given", () => {
  const pack = { asOf: "2026-07-28", validUntil: "2026-08-27", capable: ["x"], noFreeTier: [] };
  assert.equal(isAlibabaFreeTierAllowlistPackValid(pack, Date.parse("2026-08-26")), true);
  assert.equal(isAlibabaFreeTierAllowlistPackValid(pack, Date.parse("2026-08-28")), false);
  // No expiry declared means the pack never goes stale on its own.
  assert.equal(
    isAlibabaFreeTierAllowlistPackValid(
      { asOf: "2026-07-28", capable: ["x"], noFreeTier: [] },
      Date.parse("2999-01-01")
    ),
    true
  );
});
