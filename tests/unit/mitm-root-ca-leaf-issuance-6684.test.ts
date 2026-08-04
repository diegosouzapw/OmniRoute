import test from "node:test";
import assert from "node:assert/strict";
import { X509Certificate } from "node:crypto";

import { generateMitmCa, issueLeafCert, DynamicCertStore } from "../../src/mitm/tproxy/dynamicCert.ts";
import { MITM_TOOL_HOSTS } from "../../src/shared/constants/mitmToolHosts.ts";

// #6684: leaf issuance for the full MITM_TOOL_HOSTS host set, reusing the CA
// module already proven for TPROXY (`tproxy/dynamicCert.ts`) — issuing per
// host is what lets the AgentBridge static server cover every tool host
// (previously only the 4 antigravity hosts had a matching SAN).

function allHosts(): string[] {
  const set = new Set<string>();
  for (const hosts of Object.values(MITM_TOOL_HOSTS)) {
    for (const h of hosts) set.add(h);
  }
  return [...set];
}

test("issueLeafCert: every MITM_TOOL_HOSTS host resolves a SecureContext without throwing", async () => {
  const ca = await generateMitmCa("Test MITM CA");
  const store = new DynamicCertStore("Test MITM CA", ca);
  for (const host of allHosts()) {
    const ctx = await store.getSecureContext(host);
    assert.ok(ctx, `expected a SecureContext for ${host}`);
  }
});

test("issueLeafCert: issued leaf SAN matches the requested hostname", async () => {
  const ca = await generateMitmCa("Test MITM CA");
  for (const host of allHosts()) {
    const leaf = await issueLeafCert(host, ca);
    const leafPem = leaf.cert.split(/(?=-----BEGIN CERTIFICATE-----)/)[0];
    const cert = new X509Certificate(leafPem);
    // Exact SAN-entry membership, not a host substring: `includes(host)` would also
    // pass for a SAN of "notexample.com" when host is "example.com", and CodeQL flags
    // it as js/incomplete-url-substring-sanitization (#746).
    const sanEntries = (cert.subjectAltName ?? "").split(",").map((entry) => entry.trim());
    assert.ok(
      sanEntries.includes(`DNS:${host}`),
      `expected SAN to include DNS:${host}, got ${cert.subjectAltName}`
    );
  }
});

test("issueLeafCert: the leaf chain validates against the CA cert", async () => {
  const ca = await generateMitmCa("Test MITM CA");
  const host = "chain-check.example.com";
  const leaf = await issueLeafCert(host, ca);
  const leafPem = leaf.cert.split(/(?=-----BEGIN CERTIFICATE-----)/)[0];
  const leafCert = new X509Certificate(leafPem);
  const caCert = new X509Certificate(ca.cert);
  assert.equal(leafCert.checkIssued(caCert), true);
  assert.equal(leafCert.verify(caCert.publicKey), true);
});

test("DynamicCertStore: repeated getSecureContext for the same host is cached (no re-issuance)", async () => {
  const ca = await generateMitmCa("Test MITM CA");
  const store = new DynamicCertStore("Test MITM CA", ca);
  const host = "cached-host.example.com";
  const first = await store.getSecureContext(host);
  const second = await store.getSecureContext(host);
  assert.equal(first, second, "expected the identical cached SecureContext instance");
  assert.equal(store.size, 1);
});

test("drift guard: a host added to mitmToolHosts.ts needs no matching entry in generate.ts/rootCa.ts", async () => {
  // SNICallback issues a leaf on demand for any hostname — there is no
  // per-host allowlist to keep in sync, unlike the legacy static leaf whose
  // single SAN list was scoped to ANTIGRAVITY_TARGET.hosts (#6494).
  const ca = await generateMitmCa("Test MITM CA");
  const store = new DynamicCertStore("Test MITM CA", ca);
  const neverRegisteredHost = "some-brand-new-tool-host.example.com";
  assert.ok(!allHosts().includes(neverRegisteredHost));
  const ctx = await store.getSecureContext(neverRegisteredHost);
  assert.ok(ctx);
});
