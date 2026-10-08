import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chat-admission-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/chatAdmissionSettings.ts");

const ENV_NAMES = [
  "OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT",
  "OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO",
  "OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM",
] as const;

const DEFAULTS = settings.DEFAULT_CHAT_ADMISSION_SETTINGS;
const SETTINGS_KEY = "chatAdmissionSettings";

function clearEnvOverrides() {
  for (const name of ENV_NAMES) delete process.env[name];
}

function cleanupGlobalDb() {
  const holder = globalThis as { __omnirouteDb?: { open?: boolean; close?: () => void } };
  try {
    if (holder.__omnirouteDb?.open) holder.__omnirouteDb.close?.();
  } catch {
    // ignore — the instance is being discarded either way.
  }
  delete holder.__omnirouteDb;
}

// `SQLITE_FILE` in src/lib/db/core.ts is a module-level constant derived from DATA_DIR at
// import time, so every test in this file must reuse the SAME directory path — a fresh
// mkdtemp per test would leave the DB pointed at the first one. Wipe and recreate it
// instead; rmSync's own retry loop absorbs a transient EBUSY from the closing handle.
function resetStorage() {
  clearEnvOverrides();
  cleanupGlobalDb();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 10, retryDelay: 50 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();
}

function readRowValue(key: string): string | undefined {
  const row = core
    .getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get("settings", key) as { value?: string } | undefined;
  return row?.value;
}

/** Writes a raw row exactly as an operator hand-editing the DB would. */
function writeRawSettingsRow(value: string) {
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run("settings", SETTINGS_KEY, value);
}

/** The stored settings blob re-parsed, or `undefined` when no row exists. */
function readStoredSettingsBlob(): unknown {
  const raw = readRowValue(SETTINGS_KEY);
  return raw === undefined ? undefined : JSON.parse(raw);
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  clearEnvOverrides();
  cleanupGlobalDb();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 10, retryDelay: 50 });
});

test("readers fall back to defaults when neither env nor DB supply a value", () => {
  assert.deepEqual(settings.readChatAdmissionSettingsFromEnv(), DEFAULTS);
  assert.deepEqual(settings.readChatAdmissionSettingsFromDb(), DEFAULTS);
  assert.deepEqual(settings.getEffectiveChatAdmissionSettings(), DEFAULTS);
});

test("updateChatAdmissionSettings persists to the key_value schema and round-trips", async () => {
  const next = {
    chatMaxHeavyInFlight: 7,
    chatAdmissionHeapShedRatio: 0.4,
    chatAdmissionHealthyHeadroom: 3,
  };

  const returned = await settings.updateChatAdmissionSettings(next);

  assert.deepEqual(returned, next);
  assert.deepEqual(settings.readChatAdmissionSettingsFromDb(), next);
  assert.deepEqual(readStoredSettingsBlob(), next);
});

test("updateChatAdmissionSettings leaves other settings-namespace rows untouched", async () => {
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run("settings", "someOtherSetting", JSON.stringify("keep-me"));

  await settings.updateChatAdmissionSettings({
    chatMaxHeavyInFlight: 2,
    chatAdmissionHeapShedRatio: 0.5,
    chatAdmissionHealthyHeadroom: 1,
  });

  assert.equal(readRowValue("someOtherSetting"), JSON.stringify("keep-me"));
});

test("updateChatAdmissionSettings normalizes out-of-range input before persisting", async () => {
  await settings.updateChatAdmissionSettings({
    chatMaxHeavyInFlight: 0,
    chatAdmissionHeapShedRatio: 2,
    chatAdmissionHealthyHeadroom: Number.NaN,
  });

  assert.deepEqual(settings.readChatAdmissionSettingsFromDb(), {
    chatMaxHeavyInFlight: DEFAULTS.chatMaxHeavyInFlight,
    chatAdmissionHeapShedRatio: DEFAULTS.chatAdmissionHeapShedRatio,
    chatAdmissionHealthyHeadroom: DEFAULTS.chatAdmissionHealthyHeadroom,
  });
});

test("resetChatAdmissionSettings drops the stored row and returns effective defaults", async () => {
  await settings.updateChatAdmissionSettings({
    chatMaxHeavyInFlight: 4,
    chatAdmissionHeapShedRatio: 0.25,
    chatAdmissionHealthyHeadroom: 2,
  });
  assert.notDeepEqual(settings.readChatAdmissionSettingsFromDb(), DEFAULTS);

  const returned = await settings.resetChatAdmissionSettings();

  assert.equal(readRowValue(SETTINGS_KEY), undefined);
  assert.deepEqual(returned, DEFAULTS);
  assert.deepEqual(settings.readChatAdmissionSettingsFromDb(), DEFAULTS);
});

test("env parsing accepts valid values per field", () => {
  process.env.OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT = "6";
  process.env.OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO = "0.5";
  process.env.OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM = "0";

  assert.deepEqual(settings.readChatAdmissionSettingsFromEnv(), {
    chatMaxHeavyInFlight: 6,
    chatAdmissionHeapShedRatio: 0.5,
    chatAdmissionHealthyHeadroom: 0,
  });
});

test("env parsing rejects malformed values per field without discarding valid siblings", () => {
  // chatMaxHeavyInFlight requires a safe integer >= 1: "Infinity" is invalid.
  process.env.OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT = "Infinity";
  // The ratio keeps the runtime constant's strict rule: "1.2" is outside (0, 1].
  process.env.OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO = "1.2";
  process.env.OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM = "5";

  assert.deepEqual(settings.readChatAdmissionSettingsFromEnv(), {
    chatMaxHeavyInFlight: DEFAULTS.chatMaxHeavyInFlight,
    chatAdmissionHeapShedRatio: DEFAULTS.chatAdmissionHeapShedRatio,
    chatAdmissionHealthyHeadroom: 5,
  });
});

test("env parsing treats blank values as unset", () => {
  process.env.OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT = "   ";
  process.env.OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO = "";
  process.env.OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM = "   ";

  assert.deepEqual(settings.readChatAdmissionSettingsFromEnv(), DEFAULTS);
  assert.deepEqual(settings.getChatAdmissionSettingsSource(), {
    chatMaxHeavyInFlight: "default",
    chatAdmissionHeapShedRatio: "default",
    chatAdmissionHealthyHeadroom: "default",
  });
});

test("env ratio boundary: 1 is accepted, 0 is rejected", () => {
  process.env.OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO = "1";
  assert.equal(settings.readChatAdmissionSettingsFromEnv().chatAdmissionHeapShedRatio, 1);

  process.env.OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO = "0";
  assert.equal(
    settings.readChatAdmissionSettingsFromEnv().chatAdmissionHeapShedRatio,
    DEFAULTS.chatAdmissionHeapShedRatio
  );
});

test("env parsing mirrors the runtime parser for the integer tunables", () => {
  // chatBodyAdmission.ts resolves these with parseInt, so "2.5" reads as 2 there too.
  process.env.OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT = "2.5";
  assert.equal(settings.readChatAdmissionSettingsFromEnv().chatMaxHeavyInFlight, 2);
});

test("a single env override does not collapse the other keys to their defaults", async () => {
  await settings.updateChatAdmissionSettings({
    chatMaxHeavyInFlight: 3,
    chatAdmissionHeapShedRatio: 0.2,
    chatAdmissionHealthyHeadroom: 4,
  });

  process.env.OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT = "9";

  assert.deepEqual(settings.getEffectiveChatAdmissionSettings(), {
    chatMaxHeavyInFlight: 9,
    chatAdmissionHeapShedRatio: 0.2,
    chatAdmissionHealthyHeadroom: 4,
  });
  assert.deepEqual(settings.getChatAdmissionSettingsSource(), {
    chatMaxHeavyInFlight: "env",
    chatAdmissionHeapShedRatio: "db",
    chatAdmissionHealthyHeadroom: "db",
  });
});

test("updateChatAdmissionSettings reports the effective value when an env override is set", async () => {
  process.env.OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT = "11";

  const returned = await settings.updateChatAdmissionSettings({
    chatMaxHeavyInFlight: 2,
    chatAdmissionHeapShedRatio: 0.6,
    chatAdmissionHealthyHeadroom: 2,
  });

  // The response must not advertise a value the runtime will not honour.
  assert.equal(returned.chatMaxHeavyInFlight, 11);
  // The written row keeps what the operator actually asked for.
  assert.deepEqual(readStoredSettingsBlob(), {
    chatMaxHeavyInFlight: 2,
    chatAdmissionHeapShedRatio: 0.6,
    chatAdmissionHealthyHeadroom: 2,
  });
});

test("readChatAdmissionSettingsFromDb tolerates unparsable and non-object rows", () => {
  for (const raw of ["{not json", "null", "42", '"a string"', "[]"]) {
    writeRawSettingsRow(raw);
    assert.deepEqual(settings.readChatAdmissionSettingsFromDb(), DEFAULTS, `row: ${raw}`);
  }
});

test("readChatAdmissionSettingsFromDb merges a partial row with defaults per field", () => {
  writeRawSettingsRow(JSON.stringify({ chatMaxHeavyInFlight: 5 }));

  assert.deepEqual(settings.readChatAdmissionSettingsFromDb(), {
    chatMaxHeavyInFlight: 5,
    chatAdmissionHeapShedRatio: DEFAULTS.chatAdmissionHeapShedRatio,
    chatAdmissionHealthyHeadroom: DEFAULTS.chatAdmissionHealthyHeadroom,
  });
});

test("readChatAdmissionSettingsFromDb rejects out-of-range fields in a hand-edited row", () => {
  writeRawSettingsRow(
    JSON.stringify({
      chatMaxHeavyInFlight: 2.5,
      chatAdmissionHeapShedRatio: 1.5,
      chatAdmissionHealthyHeadroom: -1,
    })
  );

  assert.deepEqual(settings.readChatAdmissionSettingsFromDb(), DEFAULTS);
});

test("readChatAdmissionSettingsFromDb ignores non-numeric field types", () => {
  writeRawSettingsRow(
    JSON.stringify({
      chatMaxHeavyInFlight: "7",
      chatAdmissionHeapShedRatio: null,
      chatAdmissionHealthyHeadroom: true,
    })
  );

  assert.deepEqual(settings.readChatAdmissionSettingsFromDb(), DEFAULTS);
});

test("getChatAdmissionSettingsSource reports db only for fields that survived validation", () => {
  writeRawSettingsRow(JSON.stringify({ chatMaxHeavyInFlight: 4, chatAdmissionHeapShedRatio: 9 }));

  assert.deepEqual(settings.getChatAdmissionSettingsSource(), {
    chatMaxHeavyInFlight: "db",
    // Present in the row but out of range, so the effective value is the default.
    chatAdmissionHeapShedRatio: "default",
    chatAdmissionHealthyHeadroom: "default",
  });
});
