export function getRuntimePlatform(): string {
  return typeof process !== "undefined" && typeof process.platform === "string"
    ? process.platform
    : "unknown";
}

export function getRuntimeArch(): string {
  return typeof process !== "undefined" && typeof process.arch === "string"
    ? process.arch
    : "unknown";
}

export function getRuntimeNodeVersion(): string {
  return typeof process !== "undefined" && process.versions?.node
    ? process.versions.node
    : "unknown";
}

export function normalizeCloudCodePlatform(platform = getRuntimePlatform()): string {
  switch (platform) {
    case "win32":
      return "windows";
    case "darwin":
      return "macos";
    default:
      return platform || "unknown";
  }
}

export function normalizeCloudCodeArch(arch = getRuntimeArch()): string {
  switch (arch) {
    case "ia32":
      return "x86";
    default:
      return arch || "unknown";
  }
}

export function getCloudCodeNodeApiClientHeader(nodeVersion = getRuntimeNodeVersion()): string {
  return `gl-node/${nodeVersion.replace(/^v/, "")}`;
}
