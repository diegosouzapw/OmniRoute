import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-t15070-"));
process.env.DATA_DIR = DIR;
const core = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/providers.ts");

test.beforeEach(() => core.resetDbInstance());
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(DIR, { recursive: true, force: true });
});

async function apikeyRows(provider: string) {
  const rows = (await db.getProviderConnections({ provider })) as Array<Record<string, unknown>>;
  return rows.filter((r) => r.authType === "apikey");
}

test("web-cookie provider, apikey path: same name + different session keeps both accounts", async () => {
  await db.createProviderConnection({
    provider: "claude-web",
    authType: "apikey",
    name: "work",
    apiKey: "session=A_SESSION",
    isActive: true,
  });
  await db.createProviderConnection({
    provider: "claude-web",
    authType: "apikey",
    name: "work",
    apiKey: "session=B_SESSION",
    isActive: true,
  });
  const keys = (await apikeyRows("claude-web")).map((r) => r.apiKey).sort();
  assert.deepEqual(keys, ["session=A_SESSION", "session=B_SESSION"]);
});

test("web-cookie provider, apikey path: same session re-added still dedups in place", async () => {
  await db.createProviderConnection({
    provider: "grok-web",
    authType: "apikey",
    name: "work",
    apiKey: "session=A_SESSION",
    isActive: true,
  });
  await db.createProviderConnection({
    provider: "grok-web",
    authType: "apikey",
    name: "renamed",
    apiKey: "session=A_SESSION",
    isActive: true,
  });
  assert.equal((await apikeyRows("grok-web")).length, 1);
});

test("ordinary apikey provider keeps the name-based upsert", async () => {
  await db.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "main",
    apiKey: "sk-old",
    isActive: true,
  });
  await db.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "main",
    apiKey: "sk-new",
    isActive: true,
  });
  const rows = await apikeyRows("openai");
  assert.equal(rows.length, 1);
  assert.equal(rows[0].apiKey, "sk-new");
});
