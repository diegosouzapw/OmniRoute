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

test("the MITM listener refuses non-loopback peers before any other listener (GHSA-qxg2-rm3h-4cxp)", () => {
  const source = fs.readFileSync(
    path.join(import.meta.dirname, "../../src/mitm/server.cjs"),
    "utf8"
  );
  // The listener stays dual-stack (the DNS spoof maps hosts to 127.0.0.1 and ::1), so
  // the loopback-only guarantee comes from the peer guard installed ahead of listen().
  const guard = source.indexOf('server.prependListener("connection"');
  const listen = source.indexOf("server.listen(LOCAL_PORT");
  assert.ok(guard > 0, "peer guard installed with prependListener");
  assert.ok(listen > guard, "peer guard is installed before the server listens");
  assert.match(source.slice(guard, listen), /guardLoopbackPeer\(socket\)/);
});
