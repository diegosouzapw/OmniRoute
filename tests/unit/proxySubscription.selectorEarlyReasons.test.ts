import test from "node:test";
import assert from "node:assert/strict";
import fs, { readdirSync, readFileSync } from "node:fs";
import os from "node:os";
import path, { join } from "node:path";
import { IntlMessageFormat } from "intl-messageformat";

// Each early skip (flag off / no control URL / unmapped output) bumps a
// global counter while leaving the trigger result unchanged. Inputs go
// through the production reader (maybeSwitchOnSetAside), never hand-built.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-selector-early-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
process.env.PROXY_HEALTH_TCP_TIMEOUT_MS = "50";

const core = await import("../../src/lib/db/core.ts");
const trigger = await import("../../src/lib/proxySubscription/selectorTrigger.ts");
const early = await import("../../src/lib/proxySubscription/selectorEarlyReasons.ts");

const KEY = "socks5://@127.0.0.1:1080";

function resetAll() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  trigger.__resetSelectorTriggerForTesting();
  early.__resetSelectorEarlyReasonsForTesting();
}

test("flag off counts flag-off and leaves the result unchanged", async () => {
  resetAll();
  const prev = process.env.PROXY_SKIP_RECENTLY_FAILED;
  process.env.PROXY_SKIP_RECENTLY_FAILED = "false";
  try {
    trigger.__setAnyControlUrlConfiguredForTesting(true);
    const res = await trigger.maybeSwitchOnSetAside(KEY);
    assert.equal(res.switched, false);
    assert.equal(res.reason, "flag-off");
    assert.deepEqual(early.readSelectorEarlyReasons(), {
      "flag-off": 1,
      "no-control": 0,
      unmapped: 0,
    });
  } finally {
    if (prev === undefined) delete process.env.PROXY_SKIP_RECENTLY_FAILED;
    else process.env.PROXY_SKIP_RECENTLY_FAILED = prev;
    resetAll();
  }
});

test("missing control URL counts no-control", async () => {
  resetAll();
  try {
    trigger.__setAnyControlUrlConfiguredForTesting(false);
    const res = await trigger.maybeSwitchOnSetAside(KEY);
    assert.equal(res.switched, false);
    assert.equal(res.reason, "no-control");
    assert.deepEqual(early.readSelectorEarlyReasons(), {
      "flag-off": 0,
      "no-control": 1,
      unmapped: 0,
    });
  } finally {
    resetAll();
  }
});

test("unmapped output counts unmapped", async () => {
  resetAll();
  try {
    trigger.__setAnyControlUrlConfiguredForTesting(true);
    const res = await trigger.maybeSwitchOnSetAside(KEY);
    assert.equal(res.switched, false);
    assert.equal(res.reason, "unmapped");
    assert.deepEqual(early.readSelectorEarlyReasons(), {
      "flag-off": 0,
      "no-control": 0,
      unmapped: 1,
    });
  } finally {
    resetAll();
  }
});

test("read renders all three keys even at zero", () => {
  resetAll();
  try {
    assert.deepEqual(early.readSelectorEarlyReasons(), {
      "flag-off": 0,
      "no-control": 0,
      unmapped: 0,
    });
  } finally {
    resetAll();
  }
});

test("store stays bounded: fixed keys, reset returns to start level", async () => {
  resetAll();
  try {
    trigger.__setAnyControlUrlConfiguredForTesting(true);
    for (let i = 0; i < 5; i++) {
      await trigger.maybeSwitchOnSetAside(KEY);
    }
    const snap = early.readSelectorEarlyReasons();
    assert.deepEqual(Object.keys(snap).sort(), ["flag-off", "no-control", "unmapped"]);
    assert.equal(snap["unmapped"], 5);
    early.__resetSelectorEarlyReasonsForTesting();
    assert.deepEqual(early.readSelectorEarlyReasons(), {
      "flag-off": 0,
      "no-control": 0,
      unmapped: 0,
    });
  } finally {
    resetAll();
  }
});

test("concurrent callers count invocations", async () => {
  resetAll();
  try {
    trigger.__setAnyControlUrlConfiguredForTesting(true);
    const [a, b] = await Promise.all([
      trigger.maybeSwitchOnSetAside(KEY),
      trigger.maybeSwitchOnSetAside(KEY),
    ]);
    assert.equal(a.reason, "unmapped");
    assert.equal(b.reason, "unmapped");
    assert.equal(early.readSelectorEarlyReasons()["unmapped"], 2);
  } finally {
    resetAll();
  }
});

test("unknown reasons never grow the store", () => {
  resetAll();
  try {
    early.noteSelectorEarlyReason("bogus" as never);
    assert.deepEqual(early.readSelectorEarlyReasons(), {
      "flag-off": 0,
      "no-control": 0,
      unmapped: 0,
    });
  } finally {
    resetAll();
  }
});

const messagesDir = join(import.meta.dirname, "../../src/i18n/messages");
const localeFiles = readdirSync(messagesDir).filter((f) => f.endsWith(".json"));

test("early reason labels read in every locale and compile as ICU", () => {
  assert.ok(localeFiles.length >= 40, `expected the full locale set, got ${localeFiles.length}`);
  const keys = [
    "SELECTOR_EARLY_FLAG_OFF",
    "SELECTOR_EARLY_NO_CONTROL",
    "SELECTOR_EARLY_UNMAPPED",
  ] as const;
  const failures: string[] = [];
  for (const file of localeFiles) {
    const parsed = JSON.parse(readFileSync(join(messagesDir, file), "utf8"));
    const block = parsed?.settings?.proxySubscription?.error;
    for (const key of keys) {
      const value = block?.[key];
      if (typeof value !== "string" || value.length === 0) {
        failures.push(`${file}: ${key} missing`);
        continue;
      }
      try {
        new IntlMessageFormat(value, "en").format();
      } catch (err) {
        failures.push(`${file}: ${key}: ${(err as Error).message}`);
      }
    }
  }
  assert.deepEqual(failures, [], `invalid early-reason labels:\n${failures.join("\n")}`);
});
