/**
 * CJS twin of the root-CA persistence + per-host leaf issuance used by
 * `src/mitm/server.cjs` (#6684).
 *
 * This file exists for the same reason the sibling `_internal/*.cjs` shims
 * do: `server.cjs` runs as a standalone CommonJS process (spawned via plain
 * `node server.cjs`, no TS/ESM loader — see `src/mitm/manager.ts`'s
 * `spawn(process.execPath, [MITM_SERVER_PATH], ...)`), so it cannot
 * `import()` the ESM/TS sources directly. The CA-generation and leaf-signing
 * parameters below are copied byte-for-byte from the proven, already-tested
 * TS implementation in `src/mitm/tproxy/dynamicCert.ts`
 * (`generateMitmCa`/`issueLeafCert`) — do not let this drift from that file;
 * any change to the signing options there should be mirrored here.
 *
 * Persistence layout mirrors `src/mitm/cert/rootCa.ts` exactly (same
 * `ca.key`/`ca.crt` file names under `<DATA_DIR>/mitm/`), so a CA generated
 * by one is loaded by the other without conversion.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const tls = require("tls");

const CA_KEY_FILE = "ca.key";
const CA_CERT_FILE = "ca.crt";

async function generateMitmCa(name) {
  const { default: selfsigned } = await import("selfsigned");
  const notAfter = new Date();
  notAfter.setFullYear(notAfter.getFullYear() + 10);
  const pems = await selfsigned.generate([{ name: "commonName", value: name || "OmniRoute MITM CA" }], {
    keySize: 2048,
    algorithm: "sha256",
    notAfterDate: notAfter,
    extensions: [
      { name: "basicConstraints", cA: true, critical: true },
      { name: "keyUsage", keyCertSign: true, cRLSign: true, critical: true },
    ],
  });
  return { key: pems.private, cert: pems.cert };
}

async function issueLeafCert(hostname, ca) {
  const { default: selfsigned } = await import("selfsigned");
  const notAfter = new Date();
  notAfter.setFullYear(notAfter.getFullYear() + 1);
  const pems = await selfsigned.generate([{ name: "commonName", value: hostname }], {
    keySize: 2048,
    algorithm: "sha256",
    notAfterDate: notAfter,
    extensions: [{ name: "subjectAltName", altNames: [{ type: 2, value: hostname }] }],
    ca: { key: ca.key, cert: ca.cert },
  });
  return { key: pems.private, cert: `${pems.cert.trim()}\n${ca.cert.trim()}\n` };
}

/** Load the persisted CA from `certDir`, generating + persisting one on first run. */
async function loadOrCreateMitmCa(certDir) {
  const keyPath = path.join(certDir, CA_KEY_FILE);
  const certPath = path.join(certDir, CA_CERT_FILE);

  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    return {
      key: fs.readFileSync(keyPath, "utf-8"),
      cert: fs.readFileSync(certPath, "utf-8"),
      keyPath,
      certPath,
    };
  }

  const ca = await generateMitmCa("OmniRoute MITM CA");

  if (!fs.existsSync(certDir)) fs.mkdirSync(certDir, { recursive: true });
  fs.writeFileSync(keyPath, ca.key);
  fs.writeFileSync(certPath, ca.cert);
  fs.chmodSync(keyPath, 0o600);

  return { key: ca.key, cert: ca.cert, keyPath, certPath };
}

/** Lazily issue + cache one `tls.SecureContext` per SNI host, signed by `ca`. */
class DynamicCertStore {
  constructor(ca) {
    this.ca = ca;
    this.contexts = new Map();
  }

  async getSecureContext(hostname) {
    const cached = this.contexts.get(hostname);
    if (cached) return cached;
    const leaf = await issueLeafCert(hostname, this.ca);
    const ctx = tls.createSecureContext({ key: leaf.key, cert: leaf.cert });
    this.contexts.set(hostname, ctx);
    return ctx;
  }

  createSNICallback() {
    return (servername, cb) => {
      this.getSecureContext(servername)
        .then((ctx) => cb(null, ctx))
        .catch((err) => cb(err instanceof Error ? err : new Error(String(err))));
    };
  }
}

module.exports = { loadOrCreateMitmCa, issueLeafCert, DynamicCertStore };
