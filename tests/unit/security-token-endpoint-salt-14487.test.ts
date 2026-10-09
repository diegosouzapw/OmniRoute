import assert from "node:assert/strict";
import { generateKeyPairSync, randomUUID } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  __resetServiceAccountTokenCache,
  getServiceAccountAccessToken,
  parseServiceAccountKey,
} from "../../src/lib/logExport/googleServiceAccount.ts";

const TOKEN_URI = "https://oauth2.googleapis.com/token";
const { privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
});
const key = { client_email: "fixture@example.invalid", private_key: privateKey };

for (const tokenUri of [
  "http://127.0.0.1/internal",
  "https://attacker.invalid/token",
  "https://oauth2.googleapis.com.attacker.invalid/token",
  "https://user:password@oauth2.googleapis.com/token",
  "https://oauth2.googleapis.com/token?forward=attacker",
  "https://oauth2.googleapis.com:8443/token",
]) {
  test(`Google service account rejects untrusted token_uri ${tokenUri}`, async () => {
    __resetServiceAccountTokenCache();
    const malicious = { ...key, token_uri: tokenUri };
    assert.throws(() => parseServiceAccountKey(JSON.stringify(malicious)), /token_uri/);
    let fetched = false;
    const fetchImpl: typeof fetch = async () => {
      fetched = true;
      return Response.json({ access_token: "fixture-token" });
    };
    await assert.rejects(getServiceAccountAccessToken(malicious, "scope", fetchImpl), /token_uri/);
    assert.equal(fetched, false, "must reject before posting a signed assertion");
  });
}

test("Google token exchange pins audience, rejects redirects and preserves caching", async () => {
  __resetServiceAccountTokenCache();
  const parsed = parseServiceAccountKey(JSON.stringify(key));
  assert.equal(parsed.token_uri, TOKEN_URI);
  let calls = 0;
  const fetchImpl: typeof fetch = async (url, init) => {
    calls++;
    assert.equal(url, TOKEN_URI);
    assert.equal(init?.redirect, "error");
    const assertion = new URLSearchParams(String(init?.body)).get("assertion");
    assert.ok(assertion);
    const claims = JSON.parse(Buffer.from(assertion.split(".")[1], "base64url").toString());
    assert.equal(claims.aud, TOKEN_URI);
    return Response.json({ access_token: "fixture-token", expires_in: 3600 });
  };
  assert.equal(await getServiceAccountAccessToken(key, "scope", fetchImpl), "fixture-token");
  assert.equal(await getServiceAccountAccessToken(parsed, "scope", fetchImpl), "fixture-token");
  assert.equal(calls, 1);
  await assert.rejects(
    getServiceAccountAccessToken(
      { ...key, token_uri: "http://attacker.invalid" },
      "scope",
      fetchImpl
    ),
    /token_uri/
  );
  assert.equal(calls, 1, "a cached token must not bypass endpoint validation");
});

async function withDataDir(run: (dir: string) => Promise<void>): Promise<void> {
  const priorDir = process.env.DATA_DIR;
  const priorSalt = process.env.OMNIROUTE_CLI_SALT;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-14487-"));
  process.env.DATA_DIR = dir;
  delete process.env.OMNIROUTE_CLI_SALT;
  try {
    await run(dir);
  } finally {
    if (priorDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = priorDir;
    if (priorSalt === undefined) delete process.env.OMNIROUTE_CLI_SALT;
    else process.env.OMNIROUTE_CLI_SALT = priorSalt;
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

const freshServer = () => import(`../../src/lib/machineToken.ts?security=${randomUUID()}`);
const freshCli = () => import(`../../bin/cli/utils/cliToken.mjs?security=${randomUUID()}`);

for (const failure of ["unwritable directory", "corrupt existing salt"]) {
  test(`server and CLI warn once for ${failure} without changing existing tokens`, async (t) => {
    const warnings: unknown[][] = [];
    t.mock.method(console, "warn", (...args: unknown[]) => warnings.push(args));
    await withDataDir(async (dir) => {
      if (failure === "unwritable directory") {
        // ENOTDIR is deterministic even when the test process runs as root.
        const blocked = path.join(dir, "file-not-directory");
        fs.writeFileSync(blocked, "fixture");
        process.env.DATA_DIR = blocked;
      } else {
        fs.writeFileSync(path.join(dir, "cli-token-salt.json"), '{"salt":"invalid"}');
      }
      const server = await freshServer();
      const cli = await freshCli();
      const token = server.getMachineTokenSync();
      assert.equal(token, server.getMachineTokenSync("omniroute-cli-auth-v1"));
      assert.equal(
        server.getLegacyCliTokenSync(),
        server.getLegacyCliTokenSync("omniroute-cli-auth-v1")
      );
      assert.equal(await cli.getCliToken(), token);
      server.getMachineTokenSync();
      await cli.getCliToken();
      assert.equal(warnings.length, 2, "one warning per module, not per token request");
      for (const warning of warnings) {
        assert.match(String(warning[0]), /CLI.*salt.*DATA_DIR/i);
        assert.equal(warning.length, 1, "do not attach raw filesystem errors or secrets");
        assert.ok(!String(warning[0]).includes(dir));
        assert.ok(!String(warning[0]).includes(token));
      }
    });
  });
}

test("persisted salts remain byte-compatible across server and CLI", async () => {
  await withDataDir(async (dir) => {
    const salt = "ab".repeat(32);
    const file = path.join(dir, "cli-token-salt.json");
    const contents = JSON.stringify({ salt });
    fs.writeFileSync(file, contents, { mode: 0o600 });
    const server = await freshServer();
    const cli = await freshCli();
    const token = server.getMachineTokenSync();
    assert.ok(token, "machine ID must be available for this compatibility assertion");
    assert.equal(token, server.getMachineTokenSync(salt));
    assert.equal(await cli.getCliToken(), token);
    assert.equal(server.getLegacyCliTokenSync(), server.getLegacyCliTokenSync(salt));
    assert.equal(fs.readFileSync(file, "utf8"), contents);
  });
});

test("explicit env salt still works when DATA_DIR cannot hold a salt file", async () => {
  await withDataDir(async (dir) => {
    const blocked = path.join(dir, "file-not-directory");
    fs.writeFileSync(blocked, "fixture");
    process.env.DATA_DIR = blocked;
    process.env.OMNIROUTE_CLI_SALT = "fixture-explicit-salt";
    const server = await freshServer();
    const cli = await freshCli();
    const token = server.getMachineTokenSync();
    assert.ok(token);
    assert.equal(await cli.getCliToken(), token);
  });
});
