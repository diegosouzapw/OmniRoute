import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_FETCH = globalThis.fetch;

function createTempDataDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-combo-"));
}

async function withComboEnv(fn: (dataDir: string) => Promise<void>) {
  const dataDir = createTempDataDir();
  process.env.DATA_DIR = dataDir;
  // Mock fetch → simulates server offline so withRuntime falls back to DB
  globalThis.fetch = (async () => {
    throw new Error("server offline");
  }) as typeof fetch;

  const originalLog = console.log;
  console.log = () => {};

  try {
    await fn(dataDir);
  } finally {
    console.log = originalLog;
    globalThis.fetch = ORIGINAL_FETCH;
    fs.rmSync(dataDir, { recursive: true, force: true });

    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
}

test("combo create inserts a new combo via db module", async () => {
  await withComboEnv(async () => {
    const { runComboCreateCommand } = await import("../../bin/cli/commands/combo.mjs");
    const result = await runComboCreateCommand("my-combo", "priority", {});
    assert.equal(result, 0);

    // Verify via the same db module
    const { getComboByName } = await import("../../src/lib/db/combos.ts");
    const combo = await getComboByName("my-combo");
    assert.ok(combo);
    assert.equal(combo.name, "my-combo");
    assert.equal(combo.strategy, "priority");
  });
});

test("combo create fails if combo already exists", async () => {
  await withComboEnv(async () => {
    const { runComboCreateCommand } = await import("../../bin/cli/commands/combo.mjs");

    await runComboCreateCommand("dup-combo", "auto", {});
    const originalError = console.error;
    console.error = () => {};
    const result = await runComboCreateCommand("dup-combo", "auto", {});
    console.error = originalError;

    assert.equal(result, 1);
  });
});

test("combo delete removes the combo", async () => {
  await withComboEnv(async () => {
    const { runComboCreateCommand, runComboDeleteCommand } =
      await import("../../bin/cli/commands/combo.mjs");

    await runComboCreateCommand("to-delete", "weighted", {});
    const result = await runComboDeleteCommand("to-delete", { yes: true });
    assert.equal(result, 0);

    const { getComboByName } = await import("../../src/lib/db/combos.ts");
    const combo = await getComboByName("to-delete");
    assert.equal(combo, null);
  });
});

test("combo list returns 0 with empty combos table", async () => {
  await withComboEnv(async () => {
    const { runComboListCommand } = await import("../../bin/cli/commands/combo.mjs");
    const result = await runComboListCommand({});
    assert.equal(result, 0);
  });
});

test("combo switch updates active combo when server is offline", async () => {
  await withComboEnv(async () => {
    const { runComboCreateCommand, runComboSwitchCommand } =
      await import("../../bin/cli/commands/combo.mjs");

    await runComboCreateCommand("my-switch", "round-robin", {});
    const result = await runComboSwitchCommand("my-switch", {});
    assert.equal(result, 0);

    // Verify active combo written to key_value settings
    const { getSettings } = await import("../../src/lib/db/settings.ts");
    const settings = await getSettings();
    assert.equal((settings as Record<string, unknown>).activeCombo, "my-switch");
  });
});
