/**
 * Unit tests for src/lib/chaos/chaosConfig.ts
 *
 * Regression coverage for #6679: the original PR queried `SELECT/INSERT/DELETE
 * ... FROM settings ...` against a table that was never created in this schema
 * (only `key_value` exists) — every read silently fell back to
 * DEFAULT_CHAOS_CONFIG and every write/reset threw at runtime. This module now
 * routes persistence through src/lib/db/settings.ts::getSettings/updateSettings
 * (the `key_value` table, namespace 'settings'), matching the repo convention
 * (CLAUDE.md → Database: never write raw SQL outside src/lib/db/).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chaos-config-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const chaosConfig = await import("../../src/lib/chaos/chaosConfig.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("getChaosConfig returns DEFAULT_CHAOS_CONFIG when nothing is persisted yet", async () => {
  const config = await chaosConfig.getChaosConfig();
  assert.deepEqual(config, chaosConfig.DEFAULT_CHAOS_CONFIG);
});

test("setChaosConfig persists via the settings store and getChaosConfig reads it back", async () => {
  const settingsDb = await import("../../src/lib/db/settings.ts");

  const written = await chaosConfig.setChaosConfig({
    enabled: true,
    defaultMode: "collaborative",
    providerOverrides: [{ providerId: "openai", modelId: "gpt-4o", enabled: true }],
    systemPrompt: "Custom prompt",
    timeoutMs: 60_000,
    maxTokens: 8192,
  });

  assert.equal(written.enabled, true);
  assert.equal(written.defaultMode, "collaborative");

  const readBack = await chaosConfig.getChaosConfig();
  assert.deepEqual(readBack, written);

  // Confirms the write actually lands in key_value (namespace 'settings'), not a
  // nonexistent `settings` table (the bug this fix replaces).
  const rawSettings = await settingsDb.getSettings();
  assert.equal((rawSettings as Record<string, unknown>).chaosModeConfig !== undefined, true);
});

test("setChaosConfig rejects invalid config (Zod parse, not raw SQL failure)", async () => {
  const invalidConfig = {
    enabled: true,
    defaultMode: "not-a-real-mode",
    providerOverrides: [],
    timeoutMs: 60_000,
    maxTokens: 4096,
  } as unknown as Awaited<ReturnType<typeof chaosConfig.getChaosConfig>>;

  await assert.rejects(() => chaosConfig.setChaosConfig(invalidConfig));
});

test("resetChaosConfig clears the stored config back to defaults", async () => {
  await chaosConfig.setChaosConfig({
    enabled: true,
    defaultMode: "parallel",
    providerOverrides: [],
    timeoutMs: 90_000,
    maxTokens: 2048,
  });
  assert.equal((await chaosConfig.getChaosConfig()).enabled, true);

  const reset = await chaosConfig.resetChaosConfig();
  assert.deepEqual(reset, chaosConfig.DEFAULT_CHAOS_CONFIG);
  assert.deepEqual(await chaosConfig.getChaosConfig(), chaosConfig.DEFAULT_CHAOS_CONFIG);
});

test("getChaosConfig falls back to defaults when the stored payload fails schema validation", async () => {
  const settingsDb = await import("../../src/lib/db/settings.ts");

  await settingsDb.updateSettings({
    chaosModeConfig: { enabled: "not-a-boolean", defaultMode: "parallel" },
  });

  const config = await chaosConfig.getChaosConfig();
  assert.deepEqual(config, chaosConfig.DEFAULT_CHAOS_CONFIG);
});

test("in-memory cache is invalidated on write so config updates are visible immediately", async () => {
  const first = await chaosConfig.getChaosConfig();
  assert.equal(first.enabled, false);

  await chaosConfig.setChaosConfig({
    enabled: true,
    defaultMode: "parallel",
    providerOverrides: [],
    timeoutMs: 120_000,
    maxTokens: 4096,
  });

  const second = await chaosConfig.getChaosConfig();
  assert.equal(second.enabled, true);
});
