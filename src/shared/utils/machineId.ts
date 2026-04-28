import { execFileSync, execSync } from "child_process";
import { existsSync, readFileSync } from "fs";

/**
 * Get raw machine ID using OS-specific methods.
 *
 * We use try/catch waterfall: try each OS method and fall through
 * to the next on failure. Platform checks are INSIDE try blocks so they
 * run at RUNTIME (not build time), avoiding Next.js SWC dead-code elimination.
 *
 * On Linux: skips Windows (REG.exe) and macOS (ioreg) strategies entirely.
 */
function getMachineIdRaw(): string {
  // Strategy 1: Windows — REG.exe query for MachineGuid
  try {
    if (process.platform !== "win32") {
      throw new Error("Not Windows");
    }
    const sysRoot = process.env.SystemRoot || process.env.windir || "C:\\Windows";
    const regPath = `${sysRoot}\\System32\\REG.exe`;
    if (existsSync(/* turbopackIgnore: true */ regPath)) {
      const output = execFileSync(
        regPath,
        ["QUERY", "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography", "/v", "MachineGuid"],
        { encoding: "utf8", timeout: 5000 }
      );
      const id = output
        .split("REG_SZ")[1]
        ?.replace(/\r+|\n+|\s+/gi, "")
        ?.toLowerCase();
      if (id && id.length > 8) return id;
    }
  } catch {
    // Not Windows or REG.exe failed — continue
  }

  // Strategy 2: macOS — ioreg IOPlatformUUID
  try {
    if (process.platform !== "darwin") {
      throw new Error("Not macOS");
    }
    const output = execSync("ioreg -rd1 -c IOPlatformExpertDevice", {
      encoding: "utf8",
      timeout: 5000,
    });
    if (output.includes("IOPlatformUUID")) {
      const id = output
        .split("IOPlatformUUID")[1]
        ?.split("\n")[0]
        ?.replace(/=|\s+|"/gi, "")
        ?.toLowerCase();
      if (id && id.length > 8) return id;
    }
  } catch {
    // Not macOS or ioreg not available — continue
  }

  // Strategy 3: Linux — read machine-id files directly (no `head` or pipe)
  try {
    for (const filePath of ["/etc/machine-id", "/var/lib/dbus/machine-id"]) {
      try {
        const content = readFileSync(/* turbopackIgnore: true */ filePath, "utf8")
          .trim()
          .toLowerCase();
        if (content.length > 8) return content;
      } catch {
        // Try the next candidate file
      }
    }
  } catch {
    // Files not readable — continue
  }

  // Strategy 4: Hostname fallback (works on all platforms)
  try {
    const hostname = execSync("hostname", { encoding: "utf8", timeout: 5000 });
    const id = hostname.trim().toLowerCase();
    if (id) return id;
  } catch {
    // hostname failed — continue
  }

  // Strategy 5: Node.js os.hostname() (no exec needed)
  try {
    const os = require("os");
    return os.hostname().toLowerCase();
  } catch {
    // Final fallback
  }

  return "unknown-machine";
}

/**
 * Get consistent machine ID using native registry/OS query with salt
 * This ensures the same physical machine gets the same ID across runs
 *
 * @param {string} salt - Optional salt to use (defaults to environment variable)
 * @returns {Promise<string>} Machine ID (16-character base32)
 */
export async function getConsistentMachineId(salt = null) {
  const saltValue = salt || process.env.MACHINE_ID_SALT || "endpoint-proxy-salt";
  try {
    const rawMachineId = getMachineIdRaw();
    // Create consistent ID using salt
    const crypto = await import("crypto");
    const hashedMachineId = crypto
      .createHash("sha256")
      .update(rawMachineId + saltValue)
      .digest("hex");
    // Return only first 16 characters for brevity
    return hashedMachineId.substring(0, 16);
  } catch (error) {
    console.log("Error getting machine ID:", error);
    // Fallback to random ID if node-machine-id fails
    try {
      const cryptoFallback = await import("crypto");
      return cryptoFallback.randomUUID();
    } catch {
      if (typeof globalThis !== "undefined" && globalThis.crypto && globalThis.crypto.randomUUID) {
        return globalThis.crypto.randomUUID();
      }
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        let r = 0;
        if (
          typeof globalThis !== "undefined" &&
          globalThis.crypto &&
          globalThis.crypto.getRandomValues
        ) {
          const arr = new Uint8Array(1);
          globalThis.crypto.getRandomValues(arr);
          r = arr[0] % 16;
        } else {
          r = (Date.now() % 16) | 0;
        }
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  }
}

/**
 * Get raw machine ID without hashing (for debugging purposes)
 * @returns {Promise<string>} Raw machine ID
 */
export async function getRawMachineId() {
  try {
    return getMachineIdRaw();
  } catch (error) {
    console.log("Error getting raw machine ID:", error);
    // Fallback to random ID if node-machine-id fails
    try {
      const cryptoFallback = await import("crypto");
      return cryptoFallback.randomUUID();
    } catch {
      if (typeof globalThis !== "undefined" && globalThis.crypto && globalThis.crypto.randomUUID) {
        return globalThis.crypto.randomUUID();
      }
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        let r = 0;
        if (
          typeof globalThis !== "undefined" &&
          globalThis.crypto &&
          globalThis.crypto.getRandomValues
        ) {
          const arr = new Uint8Array(1);
          globalThis.crypto.getRandomValues(arr);
          r = arr[0] % 16;
        } else {
          r = (Date.now() % 16) | 0;
        }
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  }
}

/**
 * Check if we're running in browser or server environment
 * @returns {boolean} True if in browser, false if in server
 */
export function isBrowser() {
  return typeof window !== "undefined";
}
