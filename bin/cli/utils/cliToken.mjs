import crypto from "node:crypto";

const SALT = "omniroute-cli-auth-v1";
export const CLI_TOKEN_HEADER = "x-omniroute-cli-token";

let _cached = null;

export async function getCliToken() {
  if (_cached !== null) return _cached;
  try {
    const { machineIdSync } = await import("node-machine-id");
    const mid = machineIdSync();
    _cached = crypto
      .createHash("sha256")
      .update(mid + SALT)
      .digest("hex")
      .substring(0, 32);
  } catch {
    _cached = "";
  }
  return _cached;
}
