import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-providers-client-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "providers-client-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const clientRoute = await import("../../src/app/api/providers/client/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET /api/providers/client never returns stored credentials (GHSA-qxg2-rm3h-4cxp)", async () => {
  const apiKey = "sk-client-route-secret-0123456789abcdef";
  await providers.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "client-route-secret",
    apiKey,
    accessToken: "access-token-secret-value",
    refreshToken: "refresh-token-secret-value",
    idToken: "id-token-secret-value",
  });

  const res = await clientRoute.GET();
  assert.equal(res.status, 200);
  const text = await res.text();
  for (const secret of [
    apiKey,
    "access-token-secret-value",
    "refresh-token-secret-value",
    "id-token-secret-value",
  ]) {
    assert.ok(!text.includes(secret), `response leaked ${secret.slice(0, 12)}…`);
  }
  const { connections } = JSON.parse(text);
  const conn = connections.find((c: { name: string }) => c.name === "client-route-secret");
  assert.ok(conn, "the connection metadata is still listed for the widgets");
  assert.equal(conn.provider, "openai");
});

test("the MITM listener binds to loopback only (GHSA-qxg2-rm3h-4cxp)", () => {
  const source = fs.readFileSync(
    path.join(import.meta.dirname, "../../src/mitm/server.cjs"),
    "utf8"
  );
  assert.match(source, /const MITM_LISTEN_HOST = "127\.0\.0\.1";/);
  const listens = [...source.matchAll(/server\.listen\(([^)]*)\)?/g)].map((m) => m[1]);
  assert.ok(listens.length > 0, "server.listen call present");
  for (const args of listens) {
    assert.match(args, /^LOCAL_PORT,\s*MITM_LISTEN_HOST\b/, `listen without a host: ${args}`);
  }
});
