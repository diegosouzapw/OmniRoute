import path from "path";
import { decideCertMigration, type CertMigrationDecision } from "./migration.ts";

// #14070: single source of truth for "which cert file is actually active
// (installed + trusted) for this run". `decideCertMigration()` only answers
// which MODEL is active; every caller that needs the concrete file path used
// to independently re-derive it, and three of the four call sites (the
// AgentBridge `state`/`diagnose`/`trust-cert` routes) hard-coded the legacy
// `server.crt` path regardless of the decision — so once a install adopted
// the root-CA model (`ca.crt`), those routes kept checking/trusting the
// wrong file forever. `startMitmInternal()` (`../manager.ts`) is the only
// place that got this right; this helper factors that logic out so every
// caller (including `manager.ts` itself) resolves the same path the same
// way.

/** The cert file actually active for this run, plus which model produced it. */
export interface ActiveCertInfo {
  certPath: string;
  mode: CertMigrationDecision;
}

/**
 * Resolve the cert file the active migration decision installs/trusts for
 * `certDir`. Mirrors `rootCa.ts`'s `ca.crt` filename under `"use-root-ca"`
 * and `generate.ts`'s `server.crt` filename under `"use-legacy-leaf"` — pure
 * path arithmetic, no filesystem I/O beyond what `decideCertMigration()`
 * itself performs (existence checks only).
 */
export function resolveActiveCertPath(certDir: string, rootCaEnabled: boolean): ActiveCertInfo {
  const mode = decideCertMigration(certDir, rootCaEnabled);
  const certPath =
    mode === "use-root-ca" ? path.join(certDir, "ca.crt") : path.join(certDir, "server.crt");
  return { certPath, mode };
}
