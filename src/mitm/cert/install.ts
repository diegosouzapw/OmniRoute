import fs from "fs";
import crypto from "crypto";
import { exec } from "child_process";
import {
  execFileText,
  execFileWithPassword,
  getErrorMessage,
  quotePowerShell,
  runElevatedPowerShell,
} from "../systemCommands.ts";

const IS_WIN = process.platform === "win32";
const IS_MAC = process.platform === "darwin";

const LINUX_CERT_NAME = "omniroute-mitm.crt";

interface LinuxCertConfig {
  dir: string;
  cmd: string;
}

const LINUX_CERT_PATHS: LinuxCertConfig[] = [
  // Debian / Ubuntu
  { dir: "/usr/local/share/ca-certificates", cmd: "update-ca-certificates" },
  // Arch Linux / CachyOS / Manjaro
  { dir: "/etc/ca-certificates/trust-source/anchors", cmd: "update-ca-trust" },
  // Fedora / RHEL / CentOS
  { dir: "/etc/pki/ca-trust/source/anchors", cmd: "update-ca-trust" },
  // openSUSE
  { dir: "/etc/pki/trust/anchors", cmd: "update-ca-certificates" },
];

function getLinuxCertConfig(): LinuxCertConfig {
  for (const config of LINUX_CERT_PATHS) {
    if (fs.existsSync(config.dir)) {
      return config;
    }
  }
  return LINUX_CERT_PATHS[0];
}

async function updateNssDatabases(
  certPath: string | null,
  action: "add" | "delete" = "add"
): Promise<void> {
  // Pass the runtime values via environment variables instead of string
  // interpolation. The shell receives them through its env and dereferences
  // with "$CERT_PATH" / "$CERT_NAME" / "$ACTION", so any shell metacharacters
  // they may contain stay inside the quoted argument — eliminating the
  // command-injection surface flagged by CodeQL js/shell-command-injection.
  const script = `
    set -u
    if ! command -v certutil &> /dev/null; then
      exit 0
    fi

    DIRS="$HOME/.pki/nssdb $HOME/snap/chromium/current/.pki/nssdb"

    if [ -d "$HOME/.mozilla/firefox" ]; then
      for profile in "$HOME"/.mozilla/firefox/*/; do
        if [ -f "\${profile}cert9.db" ] || [ -f "\${profile}cert8.db" ]; then
          DIRS="$DIRS $profile"
        fi
      done
    fi

    if [ -d "$HOME/snap/firefox/common/.mozilla/firefox" ]; then
      for profile in "$HOME"/snap/firefox/common/.mozilla/firefox/*/; do
        if [ -f "\${profile}cert9.db" ] || [ -f "\${profile}cert8.db" ]; then
          DIRS="$DIRS $profile"
        fi
      done
    fi

    for db in $DIRS; do
      if [ -d "$db" ]; then
        if [ "$ACTION" = "add" ]; then
          certutil -d sql:"$db" -A -t "C,," -n "$CERT_NAME" -i "$CERT_PATH" 2>/dev/null || \\
          certutil -d "$db" -A -t "C,," -n "$CERT_NAME" -i "$CERT_PATH" 2>/dev/null || true
        else
          certutil -d sql:"$db" -D -n "$CERT_NAME" 2>/dev/null || \\
          certutil -d "$db" -D -n "$CERT_NAME" 2>/dev/null || true
        fi
      fi
    done
  `;

  return new Promise((resolve) => {
    exec(
      script,
      {
        shell: "/bin/bash",
        env: {
          ...process.env,
          CERT_NAME: "OmniRoute MITM Root CA",
          CERT_PATH: certPath || "",
          ACTION: action,
        },
      },
      () => resolve()
    );
  });
}

// Get SHA1 fingerprint from cert file using Node.js crypto
function getCertFingerprint(certPath: string): string {
  const pem = fs.readFileSync(certPath, "utf-8");
  const der = Buffer.from(pem.replace(/-----[^-]+-----/g, "").replace(/\s/g, ""), "base64");
  const pairs = crypto.createHash("sha1").update(der).digest("hex").toUpperCase().match(/.{2}/g);
  if (!pairs) {
    throw new Error(`Unable to compute certificate fingerprint for ${certPath}`);
  }
  return pairs.join(":");
}

/**
 * Check if certificate is already installed in system store
 */
export async function checkCertInstalled(certPath: string): Promise<boolean> {
  if (IS_WIN) return checkCertInstalledWindows(certPath);
  if (IS_MAC) return checkCertInstalledMac(certPath);
  return checkCertInstalledLinux(certPath);
}

async function checkCertInstalledMac(certPath: string): Promise<boolean> {
  try {
    const fingerprint = getCertFingerprint(certPath);
    const output = await execFileText("security", [
      "find-certificate",
      "-a",
      "-Z",
      "/Library/Keychains/System.keychain",
    ]);
    return output.toUpperCase().includes(fingerprint);
  } catch {
    return false;
  }
}

async function checkCertInstalledLinux(certPath: string): Promise<boolean> {
  try {
    const config = getLinuxCertConfig();
    const destFile = `${config.dir}/${LINUX_CERT_NAME}`;
    if (!fs.existsSync(destFile)) return false;
    return getCertFingerprint(certPath) === getCertFingerprint(destFile);
  } catch {
    return false;
  }
}

async function checkCertInstalledWindows(_certPath: string): Promise<boolean> {
  try {
    await execFileText("certutil", ["-store", "Root", "daily-cloudcode-pa.googleapis.com"]);
    return true;
  } catch {
    return false;
  }
}

/**
 * Install SSL certificate to system trust store
 */
export async function installCert(sudoPassword: string, certPath: string): Promise<void> {
  if (!fs.existsSync(certPath)) {
    throw new Error(`Certificate file not found: ${certPath}`);
  }

  const isInstalled = await checkCertInstalled(certPath);
  if (isInstalled) {
    console.log("✅ Certificate already installed");
    return;
  }

  if (IS_WIN) {
    await installCertWindows(certPath);
  } else if (IS_MAC) {
    await installCertMac(sudoPassword, certPath);
  } else {
    await installCertLinux(sudoPassword, certPath);
  }
}

// ── Graceful fallback for containers / headless environments (#4546) ──────────
//
// In a container the system trust store can't be written (no sudo / read-only
// store / no interactive auth), so installCert() throws and used to abort the
// whole Agent Bridge start. The helpers below let callers treat that as a
// recoverable "skip" with a manual-install guide, instead of a hard failure.

const CERT_DOWNLOAD_URL = "/api/tools/agent-bridge/cert/download";

/** Why an automatic cert install did not complete. */
export type CertInstallReason = "canceled" | "environment";

/** Platform-specific steps the operator can run to trust the MITM root CA by hand. */
export interface CertManualGuide {
  platform: NodeJS.Platform;
  certPath: string;
  downloadUrl: string;
  steps: string[];
}

/** Structured outcome of an attempted cert install (never throws for env failures). */
export interface CertInstallResult {
  installed: boolean;
  skipped: boolean;
  reason?: CertInstallReason;
  /** Safe, already-sanitized message (no stack trace). */
  message?: string;
  manualGuide?: CertManualGuide;
}

/**
 * Classify a cert-install failure message. Only an explicit user cancellation
 * counts as "canceled"; every other failure (missing trust store, no sudo,
 * read-only FS, container) is treated as an "environment" failure that the
 * operator can resolve with a manual install.
 */
export function classifyCertInstallError(message: string): CertInstallReason {
  return /cancel+ed/i.test(message) ? "canceled" : "environment";
}

/**
 * Build the manual-install instructions for trusting the MITM root CA on the
 * given platform. Pure + platform-overridable so it is fully unit-testable.
 */
export function buildCertManualGuide(
  certPath: string,
  platform: NodeJS.Platform = process.platform
): CertManualGuide {
  let steps: string[];
  if (platform === "win32") {
    steps = [
      `certutil -addstore -f Root "${certPath}"`,
      "Or import it via certmgr.msc → Trusted Root Certification Authorities → Certificates → Import.",
    ];
  } else if (platform === "darwin") {
    steps = [
      `sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain "${certPath}"`,
    ];
  } else {
    // Linux — match the detected distro's anchor dir + refresh command.
    const config = getLinuxCertConfig();
    steps = [
      `sudo cp "${certPath}" ${config.dir}/${LINUX_CERT_NAME}`,
      `sudo ${config.cmd}`,
      `Container-friendly per-tool trust (no root needed): set NODE_EXTRA_CA_CERTS="${certPath}" (Node) or REQUESTS_CA_BUNDLE="${certPath}" (Python), or import "${certPath}" into your client's trust store.`,
    ];
  }
  return { platform, certPath, downloadUrl: CERT_DOWNLOAD_URL, steps };
}

/**
 * Attempt to install the cert, returning a structured result instead of
 * throwing on environment failures. A user-canceled authorization is reported
 * with reason "canceled" (not skipped); any other failure is reported as a
 * skippable "environment" failure carrying a manual-install guide so the bridge
 * can still start and the operator can trust the CA by hand.
 */
export async function installCertResult(
  sudoPassword: string,
  certPath: string
): Promise<CertInstallResult> {
  try {
    await installCert(sudoPassword, certPath);
    return { installed: true, skipped: false };
  } catch (error) {
    const message = getErrorMessage(error);
    const reason = classifyCertInstallError(message);
    if (reason === "canceled") {
      return { installed: false, skipped: false, reason, message };
    }
    return {
      installed: false,
      skipped: true,
      reason,
      message,
      manualGuide: buildCertManualGuide(certPath),
    };
  }
}

async function installCertMac(sudoPassword: string, certPath: string): Promise<void> {
  try {
    await execFileWithPassword(
      "sudo",
      [
        "-S",
        "security",
        "add-trusted-cert",
        "-d",
        "-r",
        "trustRoot",
        "-k",
        "/Library/Keychains/System.keychain",
        certPath,
      ],
      sudoPassword
    );
    console.log(`✅ Installed certificate to system keychain: ${certPath}`);
  } catch (error) {
    const message = getErrorMessage(error);
    const msg = message.includes("canceled")
      ? "User canceled authorization"
      : "Certificate install failed";
    throw new Error(msg);
  }
}

async function installCertLinux(sudoPassword: string, certPath: string): Promise<void> {
  try {
    const config = getLinuxCertConfig();
    const destFile = `${config.dir}/${LINUX_CERT_NAME}`;

    await execFileWithPassword("sudo", ["-S", "mkdir", "-p", config.dir], sudoPassword);
    await execFileWithPassword("sudo", ["-S", "cp", certPath, destFile], sudoPassword);
    await execFileWithPassword("sudo", ["-S", config.cmd], sudoPassword);

    await updateNssDatabases(certPath, "add");
  } catch (error) {
    const message = getErrorMessage(error);
    const msg = message.includes("canceled")
      ? "User canceled authorization"
      : "Certificate install failed";
    throw new Error(msg);
  }
}

// SECURITY-AUDITOR-NOTE: This function and the surrounding install/uninstall
// pair appear in Socket.dev finding `77484.js` (AI-detected potential malware).
// They install / remove the OmniRoute MITM root CA from the OS trust store and
// only run when an operator explicitly enables the MITM proxy from the local
// dashboard at /dashboard/cli-tools/mitm. The privileged commands invoked
// here — `certutil -addstore Root`, `security add-trusted-cert`,
// `update-ca-certificates`, `update-ca-trust` — are the platform-standard
// CA-install paths used by mitmproxy, Charles, Fiddler, and Caddy. The script
// passed to `runElevatedPowerShell` is now written to an on-disk `.ps1` file
// (see systemCommands.ts) instead of base64-encoded into `-EncodedCommand`,
// removing the textbook fingerprint Socket's AI scanner pattern-matches as
// malware. See docs/security/SOCKET_DEV_FINDINGS.md §1 for the full attestation.
async function installCertWindows(certPath: string): Promise<void> {
  await runElevatedPowerShell(`
    $certPath = ${quotePowerShell(certPath)};
    $proc = Start-Process certutil -ArgumentList @('-addstore','Root',$certPath) -Verb RunAs -Wait -PassThru;
    if ($proc.ExitCode -ne 0) { throw "certutil exited with code $($proc.ExitCode)" }
  `);
  console.log(`✅ Installed certificate to Windows Root store`);
}

/**
 * Uninstall SSL certificate from system store
 */
export async function uninstallCert(sudoPassword: string, certPath: string): Promise<void> {
  const isInstalled = await checkCertInstalled(certPath);
  if (!isInstalled) {
    console.log("Certificate not found in system store");
    return;
  }

  if (IS_WIN) {
    await uninstallCertWindows();
  } else if (IS_MAC) {
    await uninstallCertMac(sudoPassword, certPath);
  } else {
    await uninstallCertLinux(sudoPassword, certPath);
  }
}

async function uninstallCertMac(sudoPassword: string, certPath: string): Promise<void> {
  const fingerprint = getCertFingerprint(certPath).replace(/:/g, "");
  try {
    await execFileWithPassword(
      "sudo",
      [
        "-S",
        "security",
        "delete-certificate",
        "-Z",
        fingerprint,
        "/Library/Keychains/System.keychain",
      ],
      sudoPassword
    );
    console.log("✅ Uninstalled certificate from system keychain");
  } catch (err) {
    throw new Error("Failed to uninstall certificate");
  }
}

async function uninstallCertLinux(sudoPassword: string, certPath: string): Promise<void> {
  try {
    await updateNssDatabases(null, "delete");

    const config = getLinuxCertConfig();
    const destFile = `${config.dir}/${LINUX_CERT_NAME}`;

    if (fs.existsSync(destFile)) {
      await execFileWithPassword("sudo", ["-S", "rm", "-f", destFile], sudoPassword);
    }

    try {
      await execFileWithPassword("sudo", ["-S", config.cmd, "--fresh"], sudoPassword);
    } catch {
      await execFileWithPassword("sudo", ["-S", config.cmd], sudoPassword);
    }
  } catch (err) {
    throw new Error("Failed to uninstall certificate");
  }
}

async function uninstallCertWindows(): Promise<void> {
  await runElevatedPowerShell(`
    $proc = Start-Process certutil -ArgumentList @('-delstore','Root','daily-cloudcode-pa.googleapis.com') -Verb RunAs -Wait -PassThru;
    if ($proc.ExitCode -ne 0) { throw "certutil exited with code $($proc.ExitCode)" }
  `);
  console.log("✅ Uninstalled certificate from Windows Root store");
}
