import { machineIdSync } from "node-machine-id";

/**
 * Get consistent machine ID using node-machine-id with salt
 * This ensures the same physical machine gets the same ID across runs
 *
 * @param {string} salt - Optional salt to use (defaults to environment variable)
 * @returns {Promise<string>} Machine ID (16-character base32)
 */
export async function getConsistentMachineId(salt = null) {
  // For server-side, use node-machine-id with salt
  const saltValue = salt || process.env.MACHINE_ID_SALT || "endpoint-proxy-salt";
  try {
    const rawMachineId = machineIdSync();
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
    return crypto.randomUUID
      ? crypto.randomUUID()
      : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
  }
}

/**
 * Get raw machine ID without hashing (for debugging purposes)
 * @returns {Promise<string>} Raw machine ID
 */
export async function getRawMachineId() {
  // For server-side, use raw node-machine-id
  try {
    return machineIdSync();
  } catch (error) {
    console.log("Error getting raw machine ID:", error);
    // Fallback to random ID if node-machine-id fails
    return crypto.randomUUID
      ? crypto.randomUUID()
      : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
  }
}

/**
 * Check if we're running in browser or server environment
 * @returns {boolean} True if in browser, false if in server
 */
export function isBrowser() {
  return typeof window !== "undefined";
}
