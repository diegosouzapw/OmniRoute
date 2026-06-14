import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-db-inspector-custom-hosts-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const mod = await import("../../src/lib/db/inspectorCustomHosts.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("listCustomHosts returns empty array initially", () => {
  const rows = mod.listCustomHosts();
  assert.deepEqual(rows, []);
});

test("addCustomHost inserts a host with defaults", () => {
  mod.addCustomHost("api.openai.com");

  const rows = mod.listCustomHosts();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].host, "api.openai.com");
  assert.equal(rows[0].enabled, true);
  assert.equal(rows[0].kind, "custom");
  assert.equal(rows[0].label, null);
  assert.equal(rows[0].last_seen_at, null);
  assert.ok(rows[0].added_at);
});

test("addCustomHost respects kind and label parameters", () => {
  mod.addCustomHost("api.anthropic.com", "llm", "Anthropic API");

  const rows = mod.listCustomHosts();
  const row = rows.find((r) => r.host === "api.anthropic.com");
  assert.ok(row);
  assert.equal(row.kind, "llm");
  assert.equal(row.label, "Anthropic API");
});

test("addCustomHost is idempotent — duplicate inserts are ignored", () => {
  mod.addCustomHost("api.openai.com");
  mod.addCustomHost("api.openai.com");

  const rows = mod.listCustomHosts();
  assert.equal(rows.length, 1);
});

test("toggleCustomHost disables an enabled host", () => {
  mod.addCustomHost("api.openai.com");
  mod.toggleCustomHost("api.openai.com", false);

  const rows = mod.listCustomHosts();
  assert.equal(rows[0].enabled, false);
});

test("toggleCustomHost re-enables a disabled host", () => {
  mod.addCustomHost("api.openai.com");
  mod.toggleCustomHost("api.openai.com", false);
  mod.toggleCustomHost("api.openai.com", true);

  const rows = mod.listCustomHosts();
  assert.equal(rows[0].enabled, true);
});

test("listCustomHosts with enabledOnly=true excludes disabled hosts", () => {
  mod.addCustomHost("api.openai.com");
  mod.addCustomHost("api.anthropic.com");
  mod.toggleCustomHost("api.anthropic.com", false);

  const all = mod.listCustomHosts();
  const enabledOnly = mod.listCustomHosts({ enabledOnly: true });

  assert.equal(all.length, 2);
  assert.equal(enabledOnly.length, 1);
  assert.equal(enabledOnly[0].host, "api.openai.com");
});

test("removeCustomHost deletes the host", () => {
  mod.addCustomHost("api.openai.com");
  mod.addCustomHost("api.anthropic.com");

  mod.removeCustomHost("api.openai.com");

  const rows = mod.listCustomHosts();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].host, "api.anthropic.com");
});

test("removeCustomHost is a no-op for non-existent hosts", () => {
  mod.addCustomHost("api.openai.com");
  mod.removeCustomHost("nonexistent.host");

  const rows = mod.listCustomHosts();
  assert.equal(rows.length, 1);
});

test("touchLastSeen updates last_seen_at timestamp", () => {
  mod.addCustomHost("api.openai.com");

  const before = mod.listCustomHosts()[0];
  assert.equal(before.last_seen_at, null);

  mod.touchLastSeen("api.openai.com");

  const after = mod.listCustomHosts()[0];
  assert.ok(after.last_seen_at !== null);
  assert.ok(Date.parse(after.last_seen_at as string) > 0);
});
