import fs from "fs";
import crypto from "crypto";
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
const LINUX_CA_DIR = "/usr/local/share/ca-certificates";
const LINUX_CERT_DEST = `${LINUX_CA_DIR}/${LINUX_CERT_NAME}`;

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
    if (!fs.existsSync(LINUX_CERT_DEST)) return false;
    return getCertFingerprint(certPath) === getCertFingerprint(LINUX_CERT_DEST);
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
    await execFileWithPassword("sudo", ["-S", "mkdir", "-p", LINUX_CA_DIR], sudoPassword);
    await execFileWithPassword("sudo", ["-S", "cp", certPath, LINUX_CERT_DEST], sudoPassword);
    await execFileWithPassword("sudo", ["-S", "update-ca-certificates"], sudoPassword);
  } catch (error) {
    const message = getErrorMessage(error);
    const msg = message.includes("canceled")
      ? "User canceled authorization"
      : "Certificate install failed";
    throw new Error(msg);
  }
}

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
    if (fs.existsSync(LINUX_CERT_DEST)) {
      await execFileWithPassword("sudo", ["-S", "rm", "-f", LINUX_CERT_DEST], sudoPassword);
    }
    await execFileWithPassword("sudo", ["-S", "update-ca-certificates", "--fresh"], sudoPassword);
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
