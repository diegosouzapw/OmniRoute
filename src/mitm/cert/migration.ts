import path from "path";
import fs from "fs";

// #6684: migration gate between the legacy single self-signed leaf
// (`cert/generate.ts` → `server.crt`/`server.key`) and the new persisted
// root-CA + per-host-leaf model (`cert/rootCa.ts` → `ca.crt`/`ca.key`).
//
// A trusted MITM CA that can sign a certificate for ANY host is materially
// more powerful than today's fixed-SAN leaf, so switching an already-trusted
// install to the CA model must be an explicit, opt-in transition — never a
// silent upgrade that could re-trigger (or skip) an OS trust prompt a user
// isn't expecting. This module is a pure decision function so the gate is
// unit-testable without touching the filesystem beyond the passed-in dir.

export type CertMigrationDecision = "use-legacy-leaf" | "use-root-ca";

/**
 * Decide which cert model a run of the AgentBridge static server should use.
 *
 * - A pre-existing legacy leaf (`server.crt`/`server.key`) with no CA pair
 *   yet present means an already-trusted install: keep serving the legacy
 *   leaf this run (unchanged behavior) unless the operator has explicitly
 *   opted in via `rootCaEnabled`.
 * - Anything else (fresh install, or explicit opt-in) proceeds to the CA
 *   model — `loadOrCreateMitmCa()` will generate-once or load the persisted
 *   pair as appropriate.
 */
export function decideCertMigration(
  certDir: string,
  rootCaEnabled: boolean
): CertMigrationDecision {
  if (rootCaEnabled) return "use-root-ca";

  const hasLegacyLeaf =
    fs.existsSync(path.join(certDir, "server.crt")) &&
    fs.existsSync(path.join(certDir, "server.key"));
  const hasCaPair =
    fs.existsSync(path.join(certDir, "ca.crt")) && fs.existsSync(path.join(certDir, "ca.key"));

  if (hasLegacyLeaf && !hasCaPair) return "use-legacy-leaf";

  return "use-root-ca";
}
