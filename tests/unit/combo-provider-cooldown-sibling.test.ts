// tests/unit/combo-provider-cooldown-sibling.test.ts
// Regression test for the provider cooldown blocking sibling models after a 500.
// When gemini/gemma-4-31b-it returns 500, the provider cooldown must NOT block
// gemini/gemma-4-26b-a4b-it from being tried.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  recordProviderCooldown,
  isProviderInCooldown,
  clearCooldownState,
  getRemainingCooldownMs,
} from "../../open-sse/services/providerCooldownTracker.ts";
import { hasPerModelQuota } from "../../open-sse/services/accountFallback.ts";

const settings = {
  providerCooldown: {
    enabled: true,
    minRetryCooldownMs: 1000,
    maxRetryCooldownMs: 60000,
  },
};

test("provider cooldown records and blocks same provider", () => {
  clearCooldownState();
  recordProviderCooldown("openai", "conn-1", settings);
  assert.ok(isProviderInCooldown("openai", "conn-1", settings));
  assert.ok(getRemainingCooldownMs("openai", "conn-1", settings) > 0);
});

test("per-model-quota provider (gemini) has per-model quota = true", () => {
  assert.equal(hasPerModelQuota("gemini", "gemma-4-31b-it"), true);
  assert.equal(hasPerModelQuota("gemini", "gemma-4-26b-a4b-it"), true);
  assert.equal(hasPerModelQuota("github", "some-model"), true);
});

test("non-per-model-quota provider (openai) has per-model quota = false", () => {
  assert.equal(hasPerModelQuota("openai", "gpt-4"), false);
});

test("provider cooldown for gemini blocks sibling models (current behavior — the bug)", () => {
  clearCooldownState();
  // Simulate what combo.ts does: record cooldown for gemini after a 500
  recordProviderCooldown("gemini", "conn-1", settings);
  // Both models on the same provider/connection are blocked
  assert.ok(isProviderInCooldown("gemini", "conn-1", settings));
});

// ── Verify the fix: combo.ts skips cooldown for per-model-quota on 500 ──

test("fix: combo skips provider cooldown for per-model-quota provider on 500", () => {
  clearCooldownState();
  const provider = "gemini";
  const rawModel = "gemma-4-31b-it";
  const status = 500;

  // The fix condition: skip cooldown when status is 500 AND provider has per-model quota
  const shouldSkipCooldown = status === 500 && hasPerModelQuota(provider, rawModel);
  assert.equal(shouldSkipCooldown, true, "Gemini 500 should skip cooldown");

  // If the fix is applied, cooldown is NOT recorded
  if (!shouldSkipCooldown) {
    recordProviderCooldown(provider, "conn-1", settings);
  }
  assert.equal(
    isProviderInCooldown(provider, "conn-1", settings),
    false,
    "Gemini should NOT be in cooldown after 500 (sibling models must still be tried)"
  );
});

test("fix: combo still records cooldown for per-model-quota provider on 503", () => {
  clearCooldownState();
  const provider = "gemini";
  const rawModel = "gemma-4-31b-it";
  const status = 503;

  const shouldSkipCooldown = status === 500 && hasPerModelQuota(provider, rawModel);
  assert.equal(shouldSkipCooldown, false, "Gemini 503 should NOT skip cooldown");

  // Cooldown IS recorded for non-500 errors
  if (!shouldSkipCooldown) {
    recordProviderCooldown(provider, "conn-1", settings);
  }
  assert.equal(
    isProviderInCooldown(provider, "conn-1", settings),
    true,
    "Gemini should be in cooldown after 503"
  );
});

test("fix: combo still records cooldown for non-per-model-quota provider on 500", () => {
  clearCooldownState();
  const provider = "openai";
  const rawModel = "gpt-4";
  const status = 500;

  const shouldSkipCooldown = status === 500 && hasPerModelQuota(provider, rawModel);
  assert.equal(shouldSkipCooldown, false, "OpenAI 500 should NOT skip cooldown");

  if (!shouldSkipCooldown) {
    recordProviderCooldown(provider, "conn-1", settings);
  }
  assert.equal(
    isProviderInCooldown(provider, "conn-1", settings),
    true,
    "OpenAI should be in cooldown after 500"
  );
});

// ── Source guards: auth.ts must not model-lockout Gemini on 500 ──

test("source guard: auth.ts skips model lockout for per-model-quota providers on 500+", () => {
  const src = fs.readFileSync(
    path.join(process.cwd(), "src", "sse", "services", "auth.ts"),
    "utf-8"
  );
  // The fix adds an early return for status >= 500 that skips recordModelLockoutFailure
  assert.ok(
    src.includes("status >= 500") && src.includes("no model lockout"),
    "auth.ts must have a guard that skips model lockout for 500+ server errors on per-model-quota providers"
  );
  // Verify the early return sends cooldownMs: 0 (no cooldown for sibling models)
  assert.ok(
    src.includes("cooldownMs: 0") && src.includes("sibling models"),
    "auth.ts must return cooldownMs: 0 for per-model-quota 500 errors to allow sibling retries"
  );
});

test("source guard: combo.ts skips provider cooldown for per-model-quota on 500", () => {
  // The combo dispatcher was split out of combo.ts into open-sse/services/combo/*
  // (#12746 executeTarget → gates/attempt/loop, #12811 round-robin). The invariant
  // did not move: EVERY call site that records a provider cooldown after a failed
  // combo target must first exclude a 500 on a per-model-quota provider, or one
  // model's outage cools down its siblings. Scan the whole combo surface so the
  // guard follows the code instead of one file name.
  const comboDir = path.join(process.cwd(), "open-sse", "services", "combo");
  const comboFiles = [
    path.join(process.cwd(), "open-sse", "services", "combo.ts"),
    ...fs
      .readdirSync(comboDir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".ts"))
      .map((entry) => path.join(comboDir, entry.name)),
  ].filter((file) => fs.existsSync(file));

  const recordingFiles = comboFiles.filter((file) =>
    fs.readFileSync(file, "utf-8").includes("recordProviderCooldown(")
  );
  assert.ok(
    recordingFiles.length > 0,
    "no combo module records a provider cooldown — the guarded call site vanished"
  );
  for (const file of recordingFiles) {
    const normalized = fs.readFileSync(file, "utf-8").replace(/\s+/g, " ");
    assert.ok(
      /result\.status === 500[^;]{0,160}?hasPerModelQuota\(provider,/.test(normalized),
      `${path.basename(file)} must skip provider cooldown recording for per-model-quota providers on 500`
    );
  }
});
