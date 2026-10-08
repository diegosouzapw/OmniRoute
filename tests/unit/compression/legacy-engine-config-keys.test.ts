/**
 * Legacy per-engine settings rows (aggressiveConfig / ultraConfig / headroomConfig) share
 * their read case with the current keys (aggressive / ultra / headroom) in
 * getCompressionSettings. The settings query has no ORDER BY, so when both rows exist the
 * last one read wins — and with the (namespace, key) primary-key index the longer legacy
 * key always comes second: every save returns 200, but GET keeps serving the legacy
 * values. The current key must win when both rows exist.
 */
import { describe, it, beforeEach, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  DEFAULT_AGGRESSIVE_CONFIG,
  DEFAULT_HEADROOM_CONFIG,
  DEFAULT_ULTRA_CONFIG,
} from "../../../open-sse/services/compression/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-compression-legacy-keys-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { getCompressionSettings, updateCompressionSettings } =
  await import("../../../src/lib/db/compression.ts");

function seedRow(key: string, value: unknown): void {
  // Simulates a legacy row left by manual SQL, an outside tool, or a database from
  // another build — no app write path creates these keys.
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run("compression", key, JSON.stringify(value));
}

beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

afterEach(() => {
  core.resetDbInstance();
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

describe("current engine settings rows win over legacy rows", () => {
  it("aggressive beats legacy aggressiveConfig after a save", async () => {
    seedRow("aggressiveConfig", { ...DEFAULT_AGGRESSIVE_CONFIG, maxTokensPerMessage: 1111 });
    seedRow("aggressive", { ...DEFAULT_AGGRESSIVE_CONFIG, maxTokensPerMessage: 2222 });

    await updateCompressionSettings({
      aggressive: { ...DEFAULT_AGGRESSIVE_CONFIG, maxTokensPerMessage: 4096 },
    });

    const settings = await getCompressionSettings();
    assert.equal(settings.aggressive?.maxTokensPerMessage, 4096);
  });

  it("ultra beats legacy ultraConfig after a save", async () => {
    seedRow("ultraConfig", { ...DEFAULT_ULTRA_CONFIG, compressionRate: 0.1 });
    seedRow("ultra", { ...DEFAULT_ULTRA_CONFIG, compressionRate: 0.2 });

    await updateCompressionSettings({ ultra: { ...DEFAULT_ULTRA_CONFIG, compressionRate: 0.9 } });

    const settings = await getCompressionSettings();
    assert.equal(settings.ultra?.compressionRate, 0.9);
  });

  it("headroom beats legacy headroomConfig after a save", async () => {
    seedRow("headroomConfig", { minRows: 3 });
    seedRow("headroom", { minRows: 4 });

    await updateCompressionSettings({ headroom: { minRows: 50 } });

    const settings = await getCompressionSettings();
    assert.equal(settings.headroom?.minRows, 50);
  });

  it("legacy aggressiveConfig still applies when no current row exists", async () => {
    seedRow("aggressiveConfig", { ...DEFAULT_AGGRESSIVE_CONFIG, maxTokensPerMessage: 1111 });

    const settings = await getCompressionSettings();
    assert.equal(settings.aggressive?.maxTokensPerMessage, 1111);
  });

  it("legacy ultraConfig still applies when no current row exists", async () => {
    seedRow("ultraConfig", { ...DEFAULT_ULTRA_CONFIG, compressionRate: 0.1 });

    const settings = await getCompressionSettings();
    assert.equal(settings.ultra?.compressionRate, 0.1);
  });

  it("legacy headroomConfig still applies when no current row exists", async () => {
    seedRow("headroomConfig", { minRows: 7 });

    const settings = await getCompressionSettings();
    assert.equal(settings.headroom?.minRows, 7);
  });

  it("a corrupt current row still shadows a valid legacy row (deliberate)", async () => {
    // Presence, not usability: a BLOB current row (the #13456 corruption mode) is skipped
    // by the read loop but still suppresses the legacy row — the engine resets to defaults
    // and the corruption warn is the operator's signal to re-save.
    seedRow("aggressiveConfig", { ...DEFAULT_AGGRESSIVE_CONFIG, maxTokensPerMessage: 1111 });
    core
      .getDbInstance()
      .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
      .run("compression", "aggressive", Buffer.from("corrupt-blob"));

    const settings = await getCompressionSettings();
    assert.equal(
      settings.aggressive?.maxTokensPerMessage,
      DEFAULT_AGGRESSIVE_CONFIG.maxTokensPerMessage
    );
  });

  it("an unparseable-JSON current row still shadows a valid legacy row (deliberate)", async () => {
    // The other #13456 corruption mode: a string value that fails JSON.parse is skipped by
    // the read loop, but the key is still "present" — so the legacy row stays suppressed.
    seedRow("aggressiveConfig", { ...DEFAULT_AGGRESSIVE_CONFIG, maxTokensPerMessage: 1111 });
    core
      .getDbInstance()
      .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
      .run("compression", "aggressive", "{not valid json");

    const settings = await getCompressionSettings();
    assert.equal(
      settings.aggressive?.maxTokensPerMessage,
      DEFAULT_AGGRESSIVE_CONFIG.maxTokensPerMessage
    );
  });

  it("an unparseable-JSON legacy row resets the engine to defaults", async () => {
    core
      .getDbInstance()
      .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
      .run("compression", "ultraConfig", "{not valid json");

    const settings = await getCompressionSettings();
    assert.equal(settings.ultra?.compressionRate, DEFAULT_ULTRA_CONFIG.compressionRate);
  });

  it("non-object legacy value resets the engine to defaults", async () => {
    seedRow("headroomConfig", 5);

    const settings = await getCompressionSettings();
    assert.equal(settings.headroom?.minRows, DEFAULT_HEADROOM_CONFIG.minRows);
  });
});
