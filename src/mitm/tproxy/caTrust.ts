/**
 * Fase 3 / Epic A — OS trust-store install for the TPROXY dynamic CA (decrypt 4b/N).
 *
 * The decrypt capture mode issues per-SNI leaves from a dynamic CA (#4173); the
 * intercepted clients must trust that CA. This installs the CA cert into the OS
 * trust store under a DEDICATED slot (`omniroute-tproxy-ca.crt`), separate from
 * the static MITM cert (`omniroute-mitm.crt` in `cert/install.ts`), so the two
 * never clobber each other.
 *
 * Linux-only (TPROXY is Linux-only). Privileged commands run via the controlled
 * `execFileWithPassword` helper — `spawn` with arg arrays, no shell, no string
 * interpolation (Hard Rule #13). It already runs the target directly (no `sudo`)
 * when the process is root, so on the VPS no password is needed. Every effectful
 * seam is injectable so the command sequence is unit-testable without root.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileWithPassword } from "../systemCommands.ts";

/** Dedicated trust-store filename — distinct from the static MITM cert's slot. */
export const TPROXY_CA_CERT_NAME = "omniroute-tproxy-ca.crt";

/** Trust-store anchor dirs + refresh command, in detection order (Debian first). */
const LINUX_CERT_PATHS: ReadonlyArray<{ dir: string; cmd: string }> = [
  { dir: "/usr/local/share/ca-certificates", cmd: "update-ca-certificates" },
  { dir: "/etc/ca-certificates/trust-source/anchors", cmd: "update-ca-trust" },
  { dir: "/etc/pki/ca-trust/source/anchors", cmd: "update-ca-trust" },
  { dir: "/etc/pki/trust/anchors", cmd: "update-ca-certificates" },
];

export type SudoRunner = (command: string, args: string[], password: string) => Promise<unknown>;

export interface CaTrustDeps {
  /** Run a privileged command (sudo/arg-array; runs direct when root). */
  run: SudoRunner;
  /** Stage the CA PEM to a local file before the privileged copy. */
  writeFile: (filePath: string, data: string) => void;
  /** Remove the staged file (best-effort). */
  rmFile: (filePath: string) => void;
  /** Directory to stage the PEM in. */
  tmpDir: () => string;
  /** Resolve the trust-store anchor dir + refresh command for this distro. */
  certConfig: () => { dir: string; cmd: string };
  /** Host platform (Linux-only gate). */
  platform: () => string;
}

function detectCertConfig(): { dir: string; cmd: string } {
  for (const c of LINUX_CERT_PATHS) {
    if (fs.existsSync(c.dir)) return c;
  }
  return LINUX_CERT_PATHS[0];
}

const realDeps: CaTrustDeps = {
  run: execFileWithPassword,
  writeFile: (filePath, data) => fs.writeFileSync(filePath, data, { mode: 0o644 }),
  rmFile: (filePath) => {
    try {
      fs.unlinkSync(filePath);
    } catch {
      // best-effort cleanup
    }
  },
  tmpDir: () => os.tmpdir(),
  certConfig: detectCertConfig,
  platform: () => process.platform,
};

/**
 * Install the dynamic CA cert (PEM) into the OS trust store under the dedicated
 * TPROXY slot. Stages the PEM to a temp file, then (privileged) copies it into the
 * anchor dir and refreshes the trust store. Throws on non-Linux hosts.
 */
export async function installTproxyCa(
  caPem: string,
  sudoPassword = "",
  deps: Partial<CaTrustDeps> = {}
): Promise<void> {
  const d = { ...realDeps, ...deps };
  if (d.platform() !== "linux") {
    throw new Error("TPROXY CA trust install is Linux-only.");
  }
  const cfg = d.certConfig();
  const staged = path.join(d.tmpDir(), TPROXY_CA_CERT_NAME);
  const dest = `${cfg.dir}/${TPROXY_CA_CERT_NAME}`;
  d.writeFile(staged, caPem);
  try {
    await d.run("sudo", ["-S", "mkdir", "-p", cfg.dir], sudoPassword);
    await d.run("sudo", ["-S", "cp", staged, dest], sudoPassword);
    await d.run("sudo", ["-S", cfg.cmd], sudoPassword);
  } finally {
    d.rmFile(staged);
  }
}

/**
 * Remove the TPROXY CA from the OS trust store (its dedicated slot only — leaves
 * the static MITM cert untouched) and refresh. No-op on non-Linux hosts.
 */
export async function uninstallTproxyCa(
  sudoPassword = "",
  deps: Partial<CaTrustDeps> = {}
): Promise<void> {
  const d = { ...realDeps, ...deps };
  if (d.platform() !== "linux") return;
  const cfg = d.certConfig();
  const dest = `${cfg.dir}/${TPROXY_CA_CERT_NAME}`;
  await d.run("sudo", ["-S", "rm", "-f", dest], sudoPassword);
  await d.run("sudo", ["-S", cfg.cmd], sudoPassword);
}
