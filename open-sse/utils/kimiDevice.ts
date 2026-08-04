import { execFileSync } from "node:child_process";
import { arch, release, type as osType } from "node:os";

let cachedDeviceModel: string | null = null;

export function getKimiDeviceModel(): string {
  if (cachedDeviceModel !== null) return cachedDeviceModel;

  const type = osType();
  const version = release();
  const architecture = arch();
  if (type === "Darwin") {
    let productVersion = version;
    try {
      productVersion =
        execFileSync("/usr/bin/sw_vers", ["-productVersion"], {
          encoding: "utf8",
          timeout: 1000,
        }).trim() || version;
    } catch {
      // Fall back to the Darwin release when sw_vers is unavailable.
    }
    cachedDeviceModel = `macOS ${productVersion} ${architecture}`;
  } else if (type === "Windows_NT") {
    cachedDeviceModel = `Windows ${version} ${architecture}`;
  } else {
    cachedDeviceModel = `${type} ${version} ${architecture}`.trim();
  }

  return cachedDeviceModel;
}
