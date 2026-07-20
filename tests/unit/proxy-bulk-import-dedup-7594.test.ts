import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression test for #7594: bulk-importing proxies that share the same
// host:port but differ in username/password must create DISTINCT entries, not
// repeatedly update the first existing row. Rotating residential/gateway proxies
// commonly route every credential through one host:port, so host+port alone is
// not a stable identity — the credential tuple is.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-dedup-7594-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error) {
      const code = (error as NodeJS.ErrnoException)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
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

test("upsertProxy creates distinct entries for same host:port with different credentials (#7594)", async () => {
  const base = { name: "Gateway", type: "http" as const, host: "gw.proxy.local", port: 8080 };

  const first = await proxiesDb.upsertProxy({ ...base, username: "user-1", password: "pass-1" });
  const second = await proxiesDb.upsertProxy({ ...base, username: "user-2", password: "pass-2" });
  const third = await proxiesDb.upsertProxy({ ...base, username: "user-3", password: "pass-3" });

  assert.equal(first.action, "created");
  assert.equal(second.action, "created");
  assert.equal(third.action, "created");
  assert.notEqual(first.proxy?.id, second.proxy?.id);
  assert.notEqual(second.proxy?.id, third.proxy?.id);

  const { items: listed } = await proxiesDb.listProxies({ includeSecrets: true });
  assert.equal(listed.length, 3);
  assert.deepEqual(listed.map((p) => p.username).sort(), ["user-1", "user-2", "user-3"]);
});

test("upsertProxy still updates when the full credential tuple matches (#7594)", async () => {
  const payload = {
    name: "Gateway",
    type: "http" as const,
    host: "gw.proxy.local",
    port: 8080,
    username: "user-1",
    password: "pass-1",
  };

  const created = await proxiesDb.upsertProxy(payload);
  const again = await proxiesDb.upsertProxy({ ...payload, name: "Gateway Renamed" });

  assert.equal(created.action, "created");
  assert.equal(again.action, "updated");
  assert.equal(again.proxy?.id, created.proxy?.id);

  const { items: listed } = await proxiesDb.listProxies({ includeSecrets: true });
  assert.equal(listed.length, 1);
  assert.equal(listed[0].name, "Gateway Renamed");
});

test("upsertProxy updates an existing proxy when only its password changes (#7703)", async () => {
  const payload = {
    name: "Rotating Gateway",
    type: "http" as const,
    host: "rotate.proxy.local",
    port: 8080,
    username: "stable-user",
    password: "pass-a",
  };

  const created = await proxiesDb.upsertProxy(payload);
  const rotated = await proxiesDb.upsertProxy({ ...payload, password: "pass-b" });

  assert.equal(created.action, "created");
  assert.equal(rotated.action, "updated");
  assert.equal(rotated.proxy?.id, created.proxy?.id);

  const { items: listed } = await proxiesDb.listProxies({ includeSecrets: true });
  assert.equal(listed.length, 1);
  assert.equal(listed[0].password, "pass-b");
});

test("upsertProxy treats auth-less proxies on same host:port as the same entry (#7594)", async () => {
  const base = {
    name: "Open Gateway",
    type: "http" as const,
    host: "open.proxy.local",
    port: 3128,
  };

  const first = await proxiesDb.upsertProxy(base);
  const second = await proxiesDb.upsertProxy({ ...base, name: "Open Gateway 2" });

  assert.equal(first.action, "created");
  assert.equal(second.action, "updated");
  assert.equal(first.proxy?.id, second.proxy?.id);

  const { items: listed } = await proxiesDb.listProxies({ includeSecrets: true });
  assert.equal(listed.length, 1);
});
