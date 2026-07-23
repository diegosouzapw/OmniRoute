/**
 * Fase 3 / Epic A — dynamic per-SNI certificate authority for the TPROXY capture
 * mode. The legacy MITM cert is a single static self-signed cert (DNS-spoof of
 * known hosts); TPROXY intercepts ARBITRARY hosts, so it needs a local CA that
 * issues a leaf cert per SNI hostname on demand (cached). Built on `selfsigned`
 * (which supports CA-signing via `options.ca`), parsed/asserted with Node's
 * built-in `crypto.X509Certificate`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { X509Certificate } from "node:crypto";

const { generateMitmCa, issueLeafCert, DynamicCertStore } = await import(
  "../../src/mitm/tproxy/dynamicCert.ts"
);

test("generateMitmCa produces a CA certificate (basicConstraints CA, key+cert PEM)", async () => {
  const ca = await generateMitmCa("OmniRoute MITM CA (test)");
  assert.match(ca.key, /-----BEGIN (RSA )?PRIVATE KEY-----/);
  assert.match(ca.cert, /-----BEGIN CERTIFICATE-----/);
  const x = new X509Certificate(ca.cert);
  assert.equal(x.ca, true, "CA cert must have basicConstraints CA:TRUE");
  assert.match(x.subject, /OmniRoute MITM CA \(test\)/);
});

test("issueLeafCert issues a host leaf signed by the CA, with SAN + chain", async () => {
  const ca = await generateMitmCa("OmniRoute MITM CA (test)");
  const leaf = await issueLeafCert("api.stripe.com", ca);
  assert.match(leaf.key, /PRIVATE KEY-----/);
  // cert bundle = leaf + CA chain so clients can build the path
  const certs = leaf.cert.match(/-----BEGIN CERTIFICATE-----/g) ?? [];
  assert.ok(certs.length >= 2, "leaf bundle should include the leaf + CA cert");

  const leafX = new X509Certificate(leaf.cert);
  assert.equal(leafX.ca, false, "leaf must not be a CA");
  assert.match(leafX.subjectAltName ?? "", /api\.stripe\.com/);
  // signed by the CA → issuer matches CA subject
  const caX = new X509Certificate(ca.cert);
  assert.equal(leafX.issuer, caX.subject, "leaf issuer must equal CA subject");
  assert.ok(leafX.verify(caX.publicKey), "leaf signature must verify against the CA public key");
});

test("DynamicCertStore caches one SecureContext per hostname", async () => {
  const store = new DynamicCertStore("OmniRoute MITM CA (test)");
  const a1 = await store.getSecureContext("a.example.com");
  const a2 = await store.getSecureContext("a.example.com");
  const b1 = await store.getSecureContext("b.example.com");
  assert.equal(a1, a2, "same host → cached SecureContext instance");
  assert.notEqual(a1, b1, "different host → different SecureContext");
  assert.equal(store.size, 2, "two distinct hosts cached");
});

test("DynamicCertStore.createSNICallback resolves a context for the SNI host", async () => {
  const store = new DynamicCertStore("OmniRoute MITM CA (test)");
  const cb = store.createSNICallback();
  const ctx = await new Promise((resolve, reject) =>
    cb("dynamic.example.org", (err: Error | null, c: unknown) => (err ? reject(err) : resolve(c)))
  );
  assert.ok(ctx, "SNICallback must yield a SecureContext");
});

test("the CA exposes its cert PEM so it can be installed in the trust store", async () => {
  const store = new DynamicCertStore("OmniRoute MITM CA (test)");
  const caPem = await store.getCaCertPem();
  assert.match(caPem, /-----BEGIN CERTIFICATE-----/);
  assert.equal(new X509Certificate(caPem).ca, true);
});
