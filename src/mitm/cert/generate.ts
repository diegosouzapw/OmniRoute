import path from "path";
import fs from "fs";
import { resolveMitmDataDir } from "../dataDir.ts";
import { ANTIGRAVITY_TARGET } from "../targets/antigravity.ts";

// #6494: the proxy terminates TLS locally for all 4 antigravity/cloudcode
// hosts (see `TARGET_HOSTS` in server.cjs), but the generated cert previously
// only carried a SAN entry for the first one — every other host served a cert
// whose CN/SAN didn't match, breaking MITM interception. `ANTIGRAVITY_TARGET.hosts`
// is the single authoritative host list (kept in lock-step with server.cjs /
// dnsConfig.ts / mitmToolHosts.ts by their own drift tests) — reuse it here
// instead of hard-coding a second copy.
const TARGET_HOSTS: string[] = ANTIGRAVITY_TARGET.hosts;
const TARGET_HOST = TARGET_HOSTS[0];

/**
 * Generate self-signed SSL certificate using selfsigned (pure JS, no openssl needed)
 */
export async function generateCert(): Promise<{ key: string; cert: string }> {
  const certDir = path.join(resolveMitmDataDir(), "mitm");
  const keyPath = path.join(certDir, "server.key");
  const certPath = path.join(certDir, "server.crt");

  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    console.log("✅ SSL certificate already exists");
    return { key: keyPath, cert: certPath };
  }

  if (!fs.existsSync(certDir)) {
    fs.mkdirSync(certDir, { recursive: true });
  }

  // Dynamic import for optional dependency
  const { default: selfsigned } = await import("selfsigned");
  const attrs = [{ name: "commonName", value: TARGET_HOST }];
  const notAfter = new Date();
  notAfter.setFullYear(notAfter.getFullYear() + 1);
  const pems = await selfsigned.generate(attrs, {
    keySize: 2048,
    algorithm: "sha256",
    notAfterDate: notAfter,
    extensions: [
      {
        name: "subjectAltName",
        altNames: TARGET_HOSTS.map((value) => ({ type: 2, value })),
      },
    ],
  });

  fs.writeFileSync(keyPath, pems.private);
  fs.writeFileSync(certPath, pems.cert);

  console.log(`✅ Generated SSL certificate for ${TARGET_HOSTS.join(", ")}`);
  return { key: keyPath, cert: certPath };
}
