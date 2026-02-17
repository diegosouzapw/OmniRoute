import fs from "fs";
import crypto from "crypto";
import { exec } from "child_process";
import { execWithPassword } from "../dns/dnsConfig";

const IS_WIN = process.platform === "win32";

// Get SHA1 fingerprint from cert file using Node.js crypto
function getCertFingerprint(certPath) {
  const pem = fs.readFileSync(certPath, "utf-8");
  const der = Buffer.from(pem.replace(/-----[^-]+-----/g, "").replace(/\s/g, ""), "base64");
  return crypto.createHash("sha1").update(der).digest("hex").toUpperCase().match(/.{2}/g).join(":");
}

/**
 * Check if certificate is already installed in system store
 */
export async function checkCertInstalled(certPath) {
  if (IS_WIN) {
    return checkCertInstalledWindows(certPath);
  }
  return checkCertInstalledMac(certPath);
}

function checkCertInstalledMac(certPath) {
  return new Promise((resolve) => {
    try {
      const fingerprint = getCertFingerprint(certPath);
      exec(
        `security find-certificate -a -Z /Library/Keychains/System.keychain | grep -i "${fingerprint}"`,
        (error) => {
          resolve(!error);
        }
      );
    } catch {
      resolve(false);
    }
  });
}

function checkCertInstalledWindows(certPath) {
  return new Promise((resolve) => {
    // Check Root store for our cert by subject name
    exec("certutil -store Root daily-cloudcode-pa.googleapis.com", (error) => {
      resolve(!error);
    });
  });
}

/**
 * Install SSL certificate to system trust store
 */
export async function installCert(sudoPassword, certPath) {
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
  } else {
    await installCertMac(sudoPassword, certPath);
  }
}

async function installCertMac(sudoPassword, certPath) {
  const command = `sudo -S security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain "${certPath}"`;
  try {
    await execWithPassword(command, sudoPassword);
    console.log(`✅ Installed certificate to system keychain: ${certPath}`);
  } catch (error) {
    const msg = error.message?.includes("canceled")
      ? "User canceled authorization"
      : "Certificate install failed";
    throw new Error(msg);
  }
}

async function installCertWindows(certPath) {
  // Use PowerShell elevated to add cert to Root store
  const psCommand = `Start-Process certutil -ArgumentList '-addstore','Root','${certPath.replace(/'/g, "''")}' -Verb RunAs -Wait`;
  return new Promise((resolve, reject) => {
    exec(`powershell -Command "${psCommand}"`, (error) => {
      if (error) {
        reject(new Error(`Failed to install certificate: ${error.message}`));
      } else {
        console.log(`✅ Installed certificate to Windows Root store`);
        resolve();
      }
    });
  });
}

/**
 * Uninstall SSL certificate from system store
 */
export async function uninstallCert(sudoPassword, certPath) {
  const isInstalled = await checkCertInstalled(certPath);
  if (!isInstalled) {
    console.log("Certificate not found in system store");
    return;
  }

  if (IS_WIN) {
    await uninstallCertWindows();
  } else {
    await uninstallCertMac(sudoPassword, certPath);
  }
}

async function uninstallCertMac(sudoPassword, certPath) {
  const fingerprint = getCertFingerprint(certPath).replace(/:/g, "");
  const command = `sudo -S security delete-certificate -Z "${fingerprint}" /Library/Keychains/System.keychain`;
  try {
    await execWithPassword(command, sudoPassword);
    console.log("✅ Uninstalled certificate from system keychain");
  } catch (err) {
    throw new Error("Failed to uninstall certificate");
  }
}

async function uninstallCertWindows() {
  const psCommand = `Start-Process certutil -ArgumentList '-delstore','Root','daily-cloudcode-pa.googleapis.com' -Verb RunAs -Wait`;
  return new Promise((resolve, reject) => {
    exec(`powershell -Command "${psCommand}"`, (error) => {
      if (error) {
        reject(new Error(`Failed to uninstall certificate: ${error.message}`));
      } else {
        console.log("✅ Uninstalled certificate from Windows Root store");
        resolve();
      }
    });
  });
}
