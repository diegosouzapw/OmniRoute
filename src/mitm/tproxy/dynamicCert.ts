/**
 * Fase 3 / Epic A — dynamic per-SNI certificate authority for the TPROXY capture
 * mode.
 *
 * The legacy MITM cert (`cert/generate.ts`) is a single static self-signed cert,
 * which works only because AgentBridge DNS-spoofs a fixed set of known hosts.
 * TPROXY intercepts ARBITRARY hosts, so the listener must present a valid leaf
 * certificate for whatever SNI the client requests. This module runs a local CA
 * that issues a leaf per hostname on demand (signed by the CA, cached as a
 * `tls.SecureContext`). The CA cert is installed in the OS trust store
 * (reusing the existing cert/install path), so every issued leaf is trusted.
 *
 * Built on `selfsigned` (already a dependency; v5 supports CA-signing via
 * `options.ca`). Security note: a trusted MITM CA that signs any host is a
 * powerful capability — it is gated behind the explicit, local-only TPROXY
 * capture mode and the CA private key never leaves the machine.
 */
import tls from "node:tls";

export interface CaPair {
  /** PEM private key. */
  key: string;
  /** PEM certificate. */
  cert: string;
}

export interface LeafPair {
  /** PEM private key for the leaf. */
  key: string;
  /** PEM bundle: leaf certificate followed by the CA certificate (chain). */
  cert: string;
}

/** Generate a long-lived local CA (basicConstraints CA, keyCertSign). */
export async function generateMitmCa(name = "OmniRoute MITM CA"): Promise<CaPair> {
  const { default: selfsigned } = await import("selfsigned");
  const notAfter = new Date();
  notAfter.setFullYear(notAfter.getFullYear() + 10);
  const pems = await selfsigned.generate([{ name: "commonName", value: name }], {
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

/** Issue a leaf certificate for `hostname`, signed by `ca`. Returns leaf key +
 * a cert bundle (leaf + CA) so clients can build the trust path. */
export async function issueLeafCert(hostname: string, ca: CaPair): Promise<LeafPair> {
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

/**
 * Lazily creates a CA and issues/caches one `tls.SecureContext` per SNI host.
 * Pass an `existingCa` (e.g. loaded from disk) to keep the CA stable across
 * restarts so the trust store does not need re-installing.
 */
export class DynamicCertStore {
  private readonly caName: string;
  private caPromise: Promise<CaPair> | null = null;
  private readonly contexts = new Map<string, tls.SecureContext>();

  constructor(caName = "OmniRoute MITM CA", existingCa?: CaPair) {
    this.caName = caName;
    if (existingCa) this.caPromise = Promise.resolve(existingCa);
  }

  private getCa(): Promise<CaPair> {
    if (!this.caPromise) this.caPromise = generateMitmCa(this.caName);
    return this.caPromise;
  }

  /** The CA cert PEM — install this in the OS trust store. */
  async getCaCertPem(): Promise<string> {
    return (await this.getCa()).cert;
  }

  /** Get (creating + caching on first use) the SecureContext for an SNI host. */
  async getSecureContext(hostname: string): Promise<tls.SecureContext> {
    const cached = this.contexts.get(hostname);
    if (cached) return cached;
    const ca = await this.getCa();
    const leaf = await issueLeafCert(hostname, ca);
    const ctx = tls.createSecureContext({ key: leaf.key, cert: leaf.cert });
    this.contexts.set(hostname, ctx);
    return ctx;
  }

  /** Number of distinct hosts with a cached context. */
  get size(): number {
    return this.contexts.size;
  }

  /** An SNICallback for `tls.createServer`/`tls.TLSSocket` (`{ SNICallback }`). */
  createSNICallback(): (
    servername: string,
    cb: (err: Error | null, ctx?: tls.SecureContext) => void
  ) => void {
    return (servername, cb) => {
      this.getSecureContext(servername)
        .then((ctx) => cb(null, ctx))
        .catch((err) => cb(err instanceof Error ? err : new Error(String(err))));
    };
  }
}
