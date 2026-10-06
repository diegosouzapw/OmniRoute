import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { X509Certificate } from "node:crypto";

// #10467: POST /api/tools/agent-bridge/cert/regenerate called generateCert() with no
// arguments. generateCert() short-circuits when server.key and server.crt already exist,
// so the endpoint was a no-op on every machine that had ever started the bridge — the
// download route kept serving the old file, with the same md5 and, for anyone whose cert
// predates #6494, still missing the extra SANs. generateCert now takes { force } and the
// regenerate route is the one caller that passes it.

const certModule = "../../src/mitm/cert/generate.ts";

async function withTempDataDir<T>(fn: (dir: string) => Promise<T>): Promise<T> {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cert-10467-"));
  const previous = process.env.DATA_DIR;
  process.env.DATA_DIR = dir;
  try {
    return await fn(dir);
  } finally {
    if (previous === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previous;
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

const read = (p: string) => fs.readFileSync(p, "utf8");

test("generateCert() keeps the existing certificate when it is already on disk", async () => {
  await withTempDataDir(async () => {
    const { generateCert } = await import(certModule);

    const first = await generateCert();
    const certBefore = read(first.cert);
    const keyBefore = read(first.key);

    const second = await generateCert();

    assert.equal(second.cert, first.cert, "path should be stable");
    assert.equal(read(second.cert), certBefore, "certificate should not be replaced");
    assert.equal(read(second.key), keyBefore, "key should not be replaced");
  });
});

test("generateCert({ force: true }) mints a new certificate over the existing one", async () => {
  await withTempDataDir(async () => {
    const { generateCert } = await import(certModule);

    const first = await generateCert();
    const certBefore = read(first.cert);
    const keyBefore = read(first.key);

    const forced = await generateCert({ force: true });

    assert.equal(forced.cert, first.cert, "path should be stable");
    assert.notEqual(read(forced.cert), certBefore, "certificate should be replaced");
    assert.notEqual(read(forced.key), keyBefore, "key should be replaced");
  });
});

test("the forced certificate is still valid and carries every antigravity SAN", async () => {
  await withTempDataDir(async () => {
    const { generateCert } = await import(certModule);
    const { ANTIGRAVITY_TARGET } = await import("../../src/mitm/targets/antigravity.ts");

    await generateCert();
    const forced = await generateCert({ force: true });

    const x509 = new X509Certificate(fs.readFileSync(forced.cert));
    const sans = (x509.subjectAltName ?? "")
      .split(",")
      .map((entry) => entry.trim().replace(/^DNS:/, ""))
      .filter(Boolean);

    for (const host of ANTIGRAVITY_TARGET.hosts) {
      assert.ok(sans.includes(host), `forced cert is missing SAN for ${host}`);
    }
  });
});

test("generateCert({ force: true }) creates the certificate when none exists yet", async () => {
  await withTempDataDir(async () => {
    const { generateCert } = await import(certModule);

    const result = await generateCert({ force: true });

    assert.ok(fs.existsSync(result.cert), "certificate should exist");
    assert.ok(fs.existsSync(result.key), "key should exist");
  });
});
